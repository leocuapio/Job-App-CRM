"use client"

import Applications from "@/components/applications/applications";
import ApplicationForm from "@/components/applications/newApplicationForm";
import Search from "@/components/applications/searchBar"
import SortApplications from "@/components/applications/sortApplications";
import { Application } from "@/types/application";
import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import TableRowsIcon from "@mui/icons-material/TableRows";

const VIEW_STORAGE_KEY = "job-applications-view";

interface Params {
    session: Session;
    initialApplications: Application[];
}

export default function ApplicationsClient({session, initialApplications}: Params) {

    const [sortOption, setsortOption] = useState<string>("default")
    const [applications, setApplications] = useState<Application[]>(initialApplications)
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
    const [view, setView] = useState<"board" | "table">("board")

    useEffect(() => {
      const stored = sessionStorage.getItem(VIEW_STORAGE_KEY)
      if (stored === "board" || stored === "table") {
        setView(stored)
      }
    }, [])

    function selectView(next: "board" | "table") {
      setView(next)
      sessionStorage.setItem(VIEW_STORAGE_KEY, next)
    }

    async function getApplications () {
      const res = await fetch("/api/applications")
      const data = await res.json();
      setApplications(data);
    }

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
              <ApplicationForm onCreated={(application) => setApplications((current) => [application, ...current])} />
            </header>

            <section className="flex flex-col gap-3 rounded-lg border border-[#ded7cc] bg-white p-4 shadow-[0_18px_60px_rgba(34,31,31,0.06)] md:flex-row md:items-end md:justify-between">
              <Search applications={applications} setFilteredApplications = {setFilteredApplications}/>
              <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-end">
                <SortApplications setsortOption= {setsortOption} sortOption= {sortOption}/>
                <div className="w-full md:w-auto">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7166]">
                    View
                  </p>
                  <div
                    role="group"
                    aria-label="Application view"
                    className="mt-2 inline-flex w-full rounded-md border border-[#cfc7bc] bg-[#fbfaf7] p-0.5 md:w-auto"
                  >
                    <button
                      type="button"
                      aria-pressed={view === "board"}
                      onClick={() => selectView("board")}
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-[5px] px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#d7cec2] md:flex-none ${
                        view === "board"
                          ? "bg-white text-[#221f1f] shadow-[0_1px_4px_rgba(34,31,31,0.08)]"
                          : "text-[#6d655c] hover:text-[#393431]"
                      }`}
                    >
                      <ViewKanbanIcon fontSize="small" />
                      Board
                    </button>
                    <button
                      type="button"
                      aria-pressed={view === "table"}
                      onClick={() => selectView("table")}
                      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-[5px] px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#d7cec2] md:flex-none ${
                        view === "table"
                          ? "bg-white text-[#221f1f] shadow-[0_1px_4px_rgba(34,31,31,0.08)]"
                          : "text-[#6d655c] hover:text-[#393431]"
                      }`}
                    >
                      <TableRowsIcon fontSize="small" />
                      Table
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <main className="min-h-0 flex-1">
              <Applications sortOption = {sortOption} applications = {applications} getApplications = {getApplications} filteredApplications={filteredApplications} view={view}/>
            </main>
        </div>
    )
}
