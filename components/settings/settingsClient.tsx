"use client"

import type { Session } from "next-auth"

interface Params {
  session: Session
}

export default function SettingsClient({ session }: Params) {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <header className="flex flex-col gap-5 border-b border-[#ded7cc] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b7166]">
            Job Application CRM
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#221f1f] sm:text-4xl">
            Settings
          </h1>
          <p className="mt-2 text-sm text-[#6d655c]">
            Signed in as{" "}
            <span className="font-medium text-[#221f1f]">{session.user?.email}</span>
          </p>
        </div>
      </header>
      <main className="min-h-0 flex-1">
        <section className="rounded-lg border border-[#ded7cc] bg-white p-6 shadow-[0_18px_60px_rgba(34,31,31,0.06)]">
          <p className="text-sm text-[#6d655c]">Your settings will go here</p>
        </section>
      </main>
    </div>
  )
}
