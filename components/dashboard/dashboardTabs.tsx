"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Job Applications", href: "/dashboard/jobApplications" },
  { label: "Resumes", href: "/dashboard/resumes" },
  { label: "Settings", href: "/dashboard/settings"},
]

export default function DashboardTabs() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Dashboard navigation"
      className="border-b border-[#ded7cc]"
    >
      <div className="-mb-px flex gap-6 overflow-x-auto sm:gap-8">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-[#221f1f] text-[#221f1f]"
                  : "border-transparent text-[#6d655c] hover:border-[#cfc7bc] hover:text-[#393431]"
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
