"use client"

import { useEffect, useState } from "react";
import { Application } from "@/types/application";
import EditApplication from "./editApplication";
import DeleteApplication from "./delApplication";


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
    const [delOpen, delSetOpen] = useState(false);

    const handleDelClickOpen = () => {
        delSetOpen(true);
    };

    const handleDelClose = () => {
        delSetOpen(false);
    };


    return (
        <div>
            {/* <pre>{JSON.stringify(applications, null, 2)}</pre> */}
            {/* {applications.map((application) => (
                <div key={application.id}>
                    <p className="text-white">{application.company}</p>
                    <p className="text-white">{application.id}</p>
                    <button className="text-white" onClick={() => {handleOpen(); setEditApp(application)}}>Edit</button> <br />
                    <button className="text-white" onClick={() => {handleDelClickOpen(); setDelApp(application)}}>Delete</button>
                </div>
            ))} */}
            <p>Want to Apply</p>
            {groupedApplications.Want.map((application) => (
                <div key={application.id}>
                    <p className="text-white">{application.company}</p>
                    <p className="text-white">{application.id}</p>
                    <button className="text-white" onClick={() => {handleOpen(); setEditApp(application)}}>Edit</button> <br />
                    <button className="text-white" onClick={() => {handleDelClickOpen(); setDelApp(application)}}>Delete</button>
                </div>
            ))}

            <p>Applied</p>
            {groupedApplications.Applied.map((application) => (
                <div key={application.id}>
                    <p className="text-white">{application.company}</p>
                    <p className="text-white">{application.id}</p>
                    <button className="text-white" onClick={() => {handleOpen(); setEditApp(application)}}>Edit</button> <br />
                    <button className="text-white" onClick={() => {handleDelClickOpen(); setDelApp(application)}}>Delete</button>
                </div>
            ))}

            <p>Interview</p>
            {groupedApplications.Interview.map((application) => (
                <div key={application.id}>
                    <p className="text-white">{application.company}</p>
                    <p className="text-white">{application.id}</p>
                    <button className="text-white" onClick={() => {handleOpen(); setEditApp(application)}}>Edit</button> <br />
                    <button className="text-white" onClick={() => {handleDelClickOpen(); setDelApp(application)}}>Delete</button>
                </div>
            ))}

            <p>Offer</p>
            {groupedApplications.Offer.map((application) => (
                <div key={application.id}>
                    <p className="text-white">{application.company}</p>
                    <p className="text-white">{application.id}</p>
                    <button className="text-white" onClick={() => {handleOpen(); setEditApp(application)}}>Edit</button> <br />
                    <button className="text-white" onClick={() => {handleDelClickOpen(); setDelApp(application)}}>Delete</button>
                </div>
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