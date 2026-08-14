"use client"

import { useEffect, useState } from "react";
import { Application } from "@/types/application";
import EditApplication from "./editApplication";
import DeleteApplication from "./delApplication";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


interface Params {
    sortOption:  string;
    applications: Application[];
    getApplications: () => void;
    filteredApplications: Application[];
}
export default function Applications({sortOption, applications, getApplications, filteredApplications} : Params) {
    const [editApp, setEditApp] = useState<Application | null>(null);
    const [delApp, setDelApp] = useState<Application | null>(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sortedApplications = sortOption === "ascDateApplied" ? [...filteredApplications].sort((a,b) => {
        return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime()
    }) : sortOption === "decDateApplied" ? [...filteredApplications].sort((a,b) => {
        return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
    }) : filteredApplications

    const groupedApplications = {
        Want: sortedApplications.filter(app => app.status === "Want to Apply"),
        Applied: sortedApplications.filter(app => app.status === "Applied"),
        Interview: sortedApplications.filter(app => app.status === "Interview"),
        Offer: sortedApplications.filter(app => app.status === "Offer"),
    }

    const columns = [
        { key: "Want", title: "Want to Apply", tone: "bg-[#ede6dc] text-[#655846]" },
        { key: "Applied", title: "Applied", tone: "bg-[#dce8e2] text-[#405f52]" },
        { key: "Interview", title: "Interview", tone: "bg-[#dfe5f1] text-[#465a78]" },
        { key: "Offer", title: "Offer", tone: "bg-[#e7dfec] text-[#604c68]" },
    ] as const;

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatSalary = (salary: number | null) => {
        if (salary === null) return "Salary not listed";
        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(salary);
    };

    const [delOpen, delSetOpen] = useState(false);

    const handleDelClickOpen = () => {
        delSetOpen(true);
    };

    const handleDelClose = () => {
        delSetOpen(false);
    };


    return (
        <div className="grid gap-4 lg:grid-cols-4">
            {/* <pre>{JSON.stringify(applications, null, 2)}</pre> */}
            {/* {applications.map((application) => (
                <div key={application.id}>
                    <p className="text-white">{application.company}</p>
                    <p className="text-white">{application.id}</p>
                    <button className="text-white" onClick={() => {handleOpen(); setEditApp(application)}}>Edit</button> <br />
                    <button className="text-white" onClick={() => {handleDelClickOpen(); setDelApp(application)}}>Delete</button>
                </div>
            ))} */}
            {columns.map((column) => (
                <section
                    key={column.key}
                    className="min-h-64 rounded-lg border border-[#ded7cc] bg-[#fbfaf7] p-3"
                >
                    <div className="mb-3 flex items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-[#221f1f]">{column.title}</h2>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${column.tone}`}>
                            {groupedApplications[column.key].length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {groupedApplications[column.key].length === 0 ? (
                            <div className="rounded-md border border-dashed border-[#d8d0c5] px-3 py-8 text-center text-sm text-[#8a8075]">
                                No applications here yet.
                            </div>
                        ) : (
                            groupedApplications[column.key].map((application) => (
                                <article
                                    key={application.id}
                                    className="rounded-md border border-[#ded7cc] bg-white p-4 shadow-[0_10px_30px_rgba(34,31,31,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(34,31,31,0.09)]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="truncate text-base font-semibold text-[#221f1f]">
                                                {application.company}
                                            </h3>
                                            <p className="mt-1 truncate text-sm text-[#6d655c]">
                                                {application.position}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 gap-1">
                                            <button
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#d8d0c5] text-[#5f574f] transition hover:border-[#9f9285] hover:bg-[#f5f0e9] focus:outline-none focus:ring-2 focus:ring-[#d7cec2]"
                                                onClick={() => {handleOpen(); setEditApp(application)}}
                                                aria-label={`Edit ${application.company}`}
                                                title="Edit"
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </button>
                                            <button
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#ead2cb] text-[#9a4f43] transition hover:border-[#c99286] hover:bg-[#fbefec] focus:outline-none focus:ring-2 focus:ring-[#efcfc7]"
                                                onClick={() => {handleDelClickOpen(); setDelApp(application)}}
                                                aria-label={`Delete ${application.company}`}
                                                title="Delete"
                                            >
                                                <DeleteOutlineOutlinedIcon fontSize="small" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid gap-2 text-sm text-[#6d655c]">
                                        <p>{application.location || "Location not listed"}</p>
                                        <p>{formatSalary(application.salary)}</p>
                                        <p>Applied {formatDate(application.dateApplied)}</p>
                                    </div>

                                    {application.notes ? (
                                        <p className="mt-4 line-clamp-3 rounded-md bg-[#f6f3ee] px-3 py-2 text-sm leading-6 text-[#5f574f]">
                                            {application.notes}
                                        </p>
                                    ) : null}
                                </article>
                            ))
                        )}
                    </div>
                </section>
            ))}
            {editApp && 
            <EditApplication open = {open} handleClose= {handleClose} editApp = {editApp } refresh = {getApplications}/>
            }
            {delApp && 
            <DeleteApplication open = {delOpen} handleClose = {handleDelClose} delApp = {delApp} refresh = {getApplications}/>
            }
        </div>
    )
}
