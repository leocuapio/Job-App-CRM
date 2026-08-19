import ResumesClient from "@/components/resumes/resumesClient"
import { auth } from "@/lib/auth"

export default async function ResumesPage() {
  const session = await auth()

  return <ResumesClient session={session!} />
}
