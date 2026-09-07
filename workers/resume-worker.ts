import { Worker, Job } from 'bullmq';
import {redis} from "@/lib/redis"
import prisma from '@/lib/prisma';
import {GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from '@/lib/s3';
import { PDFParse } from "pdf-parse"


const worker = new Worker("resume-processing", async (job: Job) => {
  
  console.log("Processing job:", job.id)
  console.log("Resume ID:", job.data.resumeId);

  const resume = await prisma.resume.findUnique(
    {
        where: {id: job.data.resumeId}
    });

    if (!resume) {
        throw new Error("Error can't find Resume")
    };

  try {
    // get the resume file 

    await prisma.resume.update({
        where: {id: resume.id},
        data: {
            processingStatus: "PROCESSING"
        },
    });

    
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: resume.fileUrl
    })

    const response = await s3.send(command)
    console.log("S3 response:", response);

    if (!response.Body){
        throw new Error("Error: Did not find the resume based on fileUrl")
    }

    //transform to Uint8Array
    const buffarr = await response.Body.transformToByteArray()
    
    //PDFParse to get the text s
    const res = await new PDFParse(buffarr).getText()

    //save text into database
    await prisma.resume.update({
        where: {id: resume.id},
        data: {
            extractedText: res.text,
            processingStatus: "COMPLETED"
        },
    });

} catch (error){
    //save text into database
    await prisma.resume.update({
        where: {id: resume.id},
        data: {
            processingStatus: "FAILED"
        },
    });

    throw error;
}

},
{
    connection: redis,
});

worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
})

worker.on("failed", (job, err) => {
    console.log(`Job ${job?.id} failed: `, err)
})