"use client"
import { Resume } from "@/types/resume";
import { useEffect, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteResume from "./delResume";
import InsightsIcon from '@mui/icons-material/Insights';
import ResumeAnalysis from "./analysisResume";

interface Params {
    resumes: Resume[];
    getAllResumes: () => void;
}

export default function Resumes({resumes, getAllResumes}: Params) {
    const [resume, setResume] = useState<Resume| null>(null);
    const [delResume, setDelResume] = useState<Resume | null>(null);
    const [resAnalysis, setResAnalysis] = useState<Resume | null>(null);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    async function getResumeLink() {
        if (resume){
            const res = await fetch(`/api/resumes/${resume.id}`);
            const data = await res.json();

            window.open(data);
            console.log(data);
         }
    };

    useEffect(() => {
        getResumeLink();
    }, [resume]);

    useEffect(() => {
    const isProcessing = resumes.some(
        r => r.processingStatus !== "COMPLETED"
    );

    if (!isProcessing) {
        return;
    }

    const interval = setInterval(() => {
        getAllResumes();
    }, 2000);

    return () => clearInterval(interval);
}, [resumes]);

    console.log(resumes)
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
              className="flex items-center justify-between gap-4 border-b border-[#eee8df] py-3 last:border-0"
            >
              <button
                onClick={() => setResume(r)}
                className="min-w-0 truncate text-left text-sm font-medium text-[#332f2b] hover:underline"
              >
                {r.fileName}
              </button>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-[#d7cec2] bg-[#fbfaf7] px-2.5 text-xs font-semibold text-[#3b3631] transition hover:border-[#b9aea0] hover:bg-[#f3eee6] focus:outline-none focus:ring-2 focus:ring-[#d7cec2]"
                  onClick={() => {
                    setResAnalysis(r);
                    handleModalOpen();
                  }}
                >
                  <InsightsIcon fontSize="small" />
                  Analysis
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
            </div>
          ))
        )}
        {delResume && (
          <DeleteResume open = {open} handleClose = {handleClose} delResume ={delResume} getAllResumes = {getAllResumes}/>
        )}

        {resAnalysis && (
          <ResumeAnalysis key = {resAnalysis.id} open = {modalOpen} handleClose={handleModalClose} resume={resAnalysis}/> 
        )}

        </section>
    )
}