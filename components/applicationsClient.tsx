"use client"

import Applications from "@/components/applications";
import ApplicationForm from "@/components/newApplicationForm";
import Search from "@/components/searchBar"
import SortApplications from "@/components/sortApplications";
import { Application } from "@/types/application";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";

interface Params {
    session: Session;
}

export default function ApplicationsClient({session}: Params) {

    const [sortOption, setsortOption] = useState<string>("default")
    const [applications, setApplications] = useState<Application[]>([])
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([])

    async function getApplications () {
      const res = await fetch("/api/applications")
      const data = await res.json();
      setApplications(data);
    }

    useEffect(() => {
      getApplications();
  }, [])

    return (
        <div className="flex flex-1 flex-col gap-5">
            <header className="flex flex-col gap-5 border-b border-[#ded7cc] pb-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7b7166]">
                  Job Application CRM
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-[#221f1f] sm:text-4xl">
                  Application Pipeline
                </h1>
                <p className="mt-2 text-sm text-[#6d655c]">
                  Signed in as <span className="font-medium text-[#221f1f]">{session.user?.email}</span>
                </p>
              </div>
              <ApplicationForm/>
            </header>

            <section className="flex flex-col gap-3 rounded-lg border border-[#ded7cc] bg-white p-4 shadow-[0_18px_60px_rgba(34,31,31,0.06)] md:flex-row md:items-end md:justify-between">
              <Search applications={applications} setFilteredApplications = {setFilteredApplications}/>
              <SortApplications setsortOption= {setsortOption} sortOption= {sortOption}/>
            </section>

            <main className="min-h-0 flex-1">
              <Applications sortOption = {sortOption} applications = {applications} getApplications = {getApplications} filteredApplications={filteredApplications}/>
            </main>
        </div>
    )
}
