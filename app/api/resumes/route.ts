import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import {PutObjectCommand} from "@aws-sdk/client-s3";

import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');



        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }
        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            )
        }

        const startofDay = new Date();
        startofDay.setHours(0,0,0,0);

        const startofTmrw = new Date(startofDay)
        startofTmrw.setDate(startofTmrw.getDate() + 1);
        const count = await prisma.resume.count({
            where: {
                userId: session.user.id,
                createdAt: {
                    gte: startofDay,
                    lt: startofTmrw
                }
            }
        })

        if (count >= 5) {
            return NextResponse.json(
                {error: "Too many requests"},
                {status: 429}
            )

        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const key = `resumes/${session.user.id}/${crypto.randomUUID()}-${file.name}`

        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: file.type
            })
        )

        const data = await prisma.resume.create({
            data: {
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                fileUrl: key,
                userId: session.user.id
            }
        })

        return NextResponse.json(
            { success: true, key, data }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to upload resume" },
            { status: 500 }
        )
    }
}

export async function GET(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "User not authenticated"},
            {status: 401}
        )
    }
    
    const resumes = await prisma.resume.findMany(
        {
            where: {userId: session.user.id}
        }
    )

    return NextResponse.json(resumes);
}