import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { resumeQueue } from "./lib/queue";

async function main() {
    const job = await resumeQueue.add("test-job", {
        message: "Hello from BullMQ",
    })

    console.log("Job added:", job.id)

    await resumeQueue.close();
}

main();