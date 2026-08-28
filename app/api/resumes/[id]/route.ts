import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DeleteObject$, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/lib/s3";

export async function GET(req: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params

    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthenticated"},
            {status: 401}
        )
    }

    //Find the resume based on the id
    const resume = await prisma.resume.findUnique({
        where: {id}
    })

    if (!resume) {
        return NextResponse.json(
            {error: "No Resume detected"},
            {status: 404}
        )
    }

    if (session.user.id !== resume.userId) {
        return NextResponse.json(
            {error: "Forbidden"},
            {status: 403}
        )
    }

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: resume.fileUrl,
    })

    const pdf = await getSignedUrl(s3, command, {expiresIn: 3600})
    return NextResponse.json(pdf)
}

export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params

    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthenticated"},
            {status: 401}
        )
    }

    const resume = await prisma.resume.findUnique({
        where: {id}
    })

    if (!resume) {
        return NextResponse.json(
            { error: "Resume not found" },
            { status: 404 }
        );
    }

    if (session.user.id !== resume.userId) {
        return NextResponse.json(
            {error: "Forbidden"},
            {status: 403}
        )
    }

    const deletedResume = await prisma.resume.delete({
        where: {id}
    })

    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: resume?.fileUrl,
    })
    try {
        const response = await s3.send(command);
        console.log("Sucess", response)
    } catch (err) {
        console.error("Error", err)

    }

    return NextResponse.json(deletedResume);

}