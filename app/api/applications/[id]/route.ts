import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from "next/server";

export async function PATCH (request: Request, {params}: {params: Promise<{id: string}>}) {
    const body = await request.json()
    
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        )
    }
    
    const {id} = await params;

    const application = await prisma.jobApplication.findUnique({
        where: {id: id}
    })

    if (!application) {
        return NextResponse.json(
            {error: "Application not found"},
            {status: 404}
        )
    }
    
    if (application.userId !== session.user.id) {
        return NextResponse.json(
            {error: "Forbidden"},
            {status: 403}
        )
    }
    
    const updatedApplication = await prisma.jobApplication.update({
        where: {id},
        data: {
            company: body.company,
            position: body.position,
            status: body.status,
            location: body.location,
            salary: body.salary,
            jobUrl: body.jobUrl,
            dateApplied: new Date(body.dateApplied),
            notes: body.notes,
            userId: session.user.id
        }
    })

    return NextResponse.json(updatedApplication);
}

export async function DELETE (request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;

    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        )
    }

    const application = await prisma.jobApplication.findUnique({
        where: {id: id}
    })

    if (!application) {
        return NextResponse.json(
            {error: "Application not found"},
            {status: 404}
        )
    }

    if (application.userId !== session.user.id) {
        return NextResponse.json(
            {error: "Forbidden"},
            {status: 403}
        )
    }

    const deletedApplication = await prisma.jobApplication.delete({
        where: {id}
    });

    return NextResponse.json(deletedApplication);
}