import http from "node:http";

import { app } from "./app.js";
import { prisma } from "./config/prisma.js";
import { logger } from "./shared/index.js";
import { connectDB } from "./config/db.js";

const PORT = Number(process.env.PORT) || 8000;
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
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        logger.error("❌ Failed to start server", { error });
        process.exit(1);
    }
};


process.on("uncaughtException", (error: Error) => {
    void handleFatalError("uncaughtException", error);
});

process.on("unhandledRejection", (reason: unknown) => {
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