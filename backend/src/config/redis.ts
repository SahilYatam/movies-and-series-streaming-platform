import { createClient } from "redis"

export const redis = createClient({
    url: process.env.REDIS_URL,
})

redis.on("error", (error) => {
    console.error("Redis Client Error:", error);
})

export const connectRedis = async(): Promise<void> => {
    if(redis.isOpen) return;

    await redis.connect();

    console.log("Redis connected...");
}
