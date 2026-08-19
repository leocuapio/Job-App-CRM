import DashboardTabs from "@/components/dashboard/dashboardTabs"
import { SignOut } from "@/components/applications/auth-components"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#221f1f]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col gap-5">
          <DashboardTabs />
          {children}
          <div className="flex justify-center pb-4">
            <SignOut />
          </div>
        </div>
      </div>
    </div>
  )
}
