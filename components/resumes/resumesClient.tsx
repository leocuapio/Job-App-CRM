"use client"

import NewResume from "@/components/resumes/newResume"
import { Resume } from "@/types/resume"
import type { Session } from "next-auth"
import { useEffect, useState } from "react"
import Resumes from "./resumes"

interface Params {
  session: Session
}

export default function ResumesClient({ session }: Params) {
  const [resumes, setResumes] = useState<Resume[]>([])

  async function getAllResumes () {
    const res = await fetch("/api/resumes")
    const data = await res.json()
    setResumes(data)
  }

  useEffect(() => {
    getAllResumes();
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-5">
      <header className="flex flex-col gap-5 border-b border-[#ded7cc] pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b7166]">
            Job Application CRM
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#221f1f] sm:text-4xl">
            Resumes
          </h1>
          <p className="mt-2 text-sm text-[#6d655c]">
            Signed in as{" "}
            <span className="font-medium text-[#221f1f]">{session.user?.email}</span>
          </p>
        </div>
        <NewResume getAllResumes = {getAllResumes} />
      </header>

      <main className="min-h-0 flex-1">
        <Resumes resumes = {resumes} getAllResumes={getAllResumes}/>
      </main>
    </div>
  )
}
