import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { NextResponse, NextRequest } from "next/server";


//POST request to create a new application 
export async function POST(request: Request) {
    // const body = await request.json()
    
    // return NextResponse.json(body);
    
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        )
    }

    const body = await request.json();
    const application = await prisma.jobApplication.create({
        data: {
            company: body.company,
            position: body.position,
            status: body.status,
            location: body.location,
            salary: body.salary,
            jobUrl: body.jobUrl,
            dateApplied: new Date(body.dateApplied),
            notes: body.notes,
            // userId: "cmrvdhu7100001noud067yre9"
            userId: session.user.id
        }
    });
    return NextResponse.json(application);
};

//GET request to get all the applications for the user
export async function GET(request: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        );
    }
    
    const applications = await prisma.jobApplication.findMany(
        {
            where: {userId: session.user.id}
        }
    );

    return NextResponse.json(applications);
}

