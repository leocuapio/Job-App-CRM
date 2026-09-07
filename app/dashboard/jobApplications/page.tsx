import prisma from "@/lib/prisma"
import ApplicationsClient from "@/components/applications/applicationsClient"
import { auth } from "@/lib/auth"

export default async function ApplicationPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return null;
  };

  const applications = await prisma.jobApplication.findMany(
    {
      where: { userId: session.user.id }
    }
);
  return <ApplicationsClient session={session!} initialApplications = {applications} />
}
