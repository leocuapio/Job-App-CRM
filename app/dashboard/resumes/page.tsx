import ResumesClient from "@/components/resumes/resumesClient"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma";

export default async function ResumesPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null;
  }

  const resumes = await prisma.resume.findMany(
    {
        where: {userId: session.user.id}
    }
  )

  return <ResumesClient session={session!} initialResumes = {resumes}/>
}
