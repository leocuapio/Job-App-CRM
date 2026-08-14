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
        <div>
            <p>Search</p>
            <input type="text" placeholder="company" value={search} onChange={(e) => setSearch(e.target.value)}/>
            {/* {filteredApplications.map((application) => (
                    <div key = {application.id}>
                        <p>Id: {application.id}</p>
                    </div>
                ))
            } */}

        </div>
    )

}