import IORedis from "ioredis";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const redis = new IORedis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null
});
