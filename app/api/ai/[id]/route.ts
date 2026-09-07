import { auth } from "@/lib/auth";
import { ai } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: Promise<{id: string}>}) {
    //Parses application/json 
    const input = `
        Analyze the following resume.

        Give me:
        1. 3 strengths
        2. 3 weaknesses
        3. 3 specific improvements
        `;

    const {id} = await params

    const session = await auth()
    if (!session?.user?.id) {
        return NextResponse.json(
            {error: "Unauthorized"},
            {status: 401}
        )
    }

    const resume = await prisma.resume.findUnique({
        where: {id}
    })

    if (!resume) {
        return NextResponse.json(
            {error: "Resume not found"},
            {status: 404}
        )
    }

    if (resume.userId !== session.user.id) {
        return NextResponse.json(
            {error: "Forbidden"},
            {status: 403}
        )
    }

    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash-lite",
            input: input + resume.extractedText
        });

        await prisma.resume.update({
            where: {id},
            data: {aiAnalysis: interaction.output_text}
        })
        
        console.log(interaction.output_text);
        return NextResponse.json(interaction.output_text)
    } catch (err) {
        return NextResponse.json(err)
    }
}