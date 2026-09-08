import "dotenv/config";

console.log("SERVER: dotenv loaded");

import http from "node:http";

console.log("SERVER: node:http loaded");

import { app } from "./app.js";

console.log("SERVER: app imported");

import { prisma } from "./config/prisma.js";

console.log("SERVER: prisma imported");

import { logger } from "./shared/index.js";

console.log("SERVER: logger imported");

import { connectDB } from "./config/db.js";
import { connectRedis, redis } from "./config/redis.js";

console.log("SERVER: db imported");

const PORT = Number(process.env.PORT) || 8015;
const SHUTDOWN_TIMEOUT = 10_000;

const httpServer = http.createServer(app);

let isShuttingDown = false;

const gracefulShutdown = async (signal: string): Promise<void> => {
    if (isShuttingDown) {
        logger.info("Shutdown already in progress, ignoring signal");
        return;
    }

    isShuttingDown = true;

    logger.info(`🛑 Shutting down (${signal})...`);

    const shutdownTimer = setTimeout(() => {
        logger.error("Force shutdown after timeout");
        process.exit(1);
    }, SHUTDOWN_TIMEOUT);

    try {
        await new Promise<void>((resolve, reject) => {
            httpServer.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });

        logger.info("🛑 HTTP server closed");

        await prisma.$disconnect();

        logger.info("🔌 PostgreSQL connection closed");

        await redis.quit()
        
        logger.info("🔌 Redis connection closed");

        clearTimeout(shutdownTimer);

        logger.info("✅ Shutdown complete");

        process.exit(0);
    } catch (error: unknown) {
        clearTimeout(shutdownTimer);

        if (error instanceof Error) {
            logger.error(`Error during shutdown: ${error.message}`, {
                stack: error.stack,
            });
        } else {
            logger.error("Unknown error during shutdown");
        }

        process.exit(1);
    }
};

const handleFatalError = async (
    type: string,
    error: Error,
): Promise<void> => {
    if (isShuttingDown) return;

    logger.error(`🚨 ${type.toUpperCase()} Error: ${error.message}`, {
        stack: error.stack,
    });

    await gracefulShutdown(type);
};

const startServer = async (): Promise<void> => {
    try {
        console.log("1. Starting server...");

        await connectDB();

        console.log("2. Database connected...");

        await connectRedis()

        console.log("3. Redis connected...")

        httpServer.listen(PORT, () => {
            console.log(`4. Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ FAILED TO START SERVER");
        console.error(error);
        console.error("Error stack:", error instanceof Error ? error.stack : error);

        process.exit(1);
    }
};

process.on("uncaughtException", (error: Error) => {
    console.error("🚨 UNCAUGHT EXCEPTION:");
    console.error(error);

    void handleFatalError("uncaughtException", error);
});

process.on("unhandledRejection", (reason: unknown) => {
    console.error("🚨 UNHANDLED REJECTION:");
    console.error(reason);

    const error =
        reason instanceof Error
            ? reason
            : new Error(String(reason));

    void handleFatalError("unhandledRejection", error);
});

process.once("SIGINT", () => {
    void gracefulShutdown("SIGINT");
});

process.once("SIGTERM", () => {
    void gracefulShutdown("SIGTERM");
});

startServer();