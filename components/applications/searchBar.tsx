"use client"

import { Application } from "@/types/application";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

interface Params {
    applications: Application[];
    setFilteredApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

export default function Search({applications, setFilteredApplications}: Params) {
    const [search, setSearch] = useState("")
    const fuse = useMemo(
        () =>
          new Fuse<Application>(applications, {
            keys: ["company"],
            threshold: 0.3,
          }),
        [applications]
      );
    // const filteredApplications = search ? fuse.search(search).map((result) => result.item): [];

    useEffect(() => {
      setFilteredApplications(search ? fuse.search(search).map((result) => result.item): applications)
    }, [search, applications])
    
    return (
        <div className="w-full md:max-w-sm">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7166]">
              Search
            </label>
            <input
              className="mt-2 w-full rounded-md border border-[#cfc7bc] bg-[#fbfaf7] px-3 py-2.5 text-sm text-[#221f1f] outline-none transition placeholder:text-[#9c9287] focus:border-[#756a5f] focus:bg-white focus:ring-2 focus:ring-[#d7cec2]"
              type="text"
              placeholder="Company name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* {filteredApplications.map((application) => (
                    <div key = {application.id}>
                        <p>Id: {application.id}</p>
                    </div>
                ))
            } */}

        </div>
    )

}
