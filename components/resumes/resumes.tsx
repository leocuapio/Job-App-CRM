"use client"
import { Resume } from "@/types/resume";
import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteResume from "./delResume";

interface Params {
    resumes: Resume[];
    getAllResumes: () => void;
}

export default function Resumes({resumes, getAllResumes}: Params) {
    const [resume, setResume] = useState<Resume| null>(null);
    const [delResume, setDelResume] = useState<Resume | null>(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    async function getResumeLink() {
        if (resume){
            const res = await fetch(`/api/resumes/${resume.id}`)
            const data = await res.json()

            window.open(data)
            console.log(data)
         }
    };

    useEffect(() => {
        getResumeLink();
    }, [resume]);

    return (
        <section className="rounded-lg border border-[#ded7cc] bg-white p-6 shadow-[0_18px_60px_rgba(34,31,31,0.06)]">
          {resumes === null ? (
          <p className="text-sm text-[#6d655c]">
            No resumes yet. Add one to get started.
          </p>
        ) : (
          resumes.map(r => (
            <div
              key={r.id}
              className="flex items-center justify-between border-b border-[#eee8df] py-3 last:border-0"
            >
              <button
                onClick={() => setResume(r)}
                className="text-sm font-medium text-[#332f2b] hover:underline"
              >
                {r.fileName}
              </button>

              <button
                className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-[#ead2cb] px-2.5 text-xs font-semibold text-[#9a4f43] transition hover:border-[#c99286] hover:bg-[#fbefec] focus:outline-none focus:ring-2 focus:ring-[#efcfc7]"
                onClick={() => {
                  setDelResume(r);
                  setOpen(true);
                }}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
                Delete
              </button>
            </div>
          ))
        )}
        {delResume && (
          <DeleteResume open = {open} handleClose = {handleClose} delResume ={delResume} getAllResumes = {getAllResumes}/>
        )}

        </section>
    )
}