import { prisma } from "./prisma.js";
import { logger } from "../shared/index.js";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export const connectDB = async (): Promise<void> => {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await prisma.$connect();

            await prisma.$queryRaw`SELECT 1`;

            logger.info("🔌 PostgreSQL connected successfully");

            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error(
                    `PostgreSQL connection attempt ${attempt} failed`,
                    {
                        message: error.message,
                        stack: error.stack,
                        attempt,
                        maxRetries: MAX_RETRIES,
                    }
                );
            } else {
                logger.error(
                    `PostgreSQL connection attempt ${attempt} failed with unknown error`,
                    {
                        attempt,
                        maxRetries: MAX_RETRIES,
                    }
                );
            }

            if (attempt === MAX_RETRIES) {
                logger.error(
                    "❌ All PostgreSQL connection attempts failed. Exiting..."
                );

                if (error instanceof Error) {
                    throw error;
                }

                throw new Error(
                    "PostgreSQL connection failed with non-Error rejection"
                );
            }

            logger.info(
                `🔁 Retrying PostgreSQL connection in ${RETRY_DELAY_MS}ms (${attempt}/${MAX_RETRIES})`
            );

            await sleep(RETRY_DELAY_MS);
        }
    }
};

function sleep (ms: number): Promise<void>{
    return new Promise((resolve) => setTimeout(resolve, ms));
};