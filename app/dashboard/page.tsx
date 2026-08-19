import DashboardClient from "@/components/dashboard/dashboardClient"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()

  return <DashboardClient session={session!} />
}
