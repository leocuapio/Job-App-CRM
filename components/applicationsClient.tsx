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
        <div>
            <div className="text-center">
              <p className="text-gray-300">Signed in as:</p>
              <p className="text-white">{session.user?.email}</p>
              <Search applications={applications} setFilteredApplications = {setFilteredApplications}/>
              <ApplicationForm/>
              <SortApplications setsortOption= {setsortOption} sortOption= {sortOption}/>
            </div>
            <div className="text-center">
              <p className="text-gray-300">Data fetched from DB with Prisma:</p>
            </div>
            <div className="bg-neutral-900 rounded p-3">
              <Applications sortOption = {sortOption} applications = {applications} getApplications = {getApplications} filteredApplications={filteredApplications}/>
            </div>{" "}
        </div>
    )
}