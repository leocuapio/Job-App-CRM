import ApplicationsClient from "@/components/applications/applicationsClient"
import { auth } from "@/lib/auth"

export default async function ApplicationPage() {
  const session = await auth()

  return <ApplicationsClient session={session!} />
}
