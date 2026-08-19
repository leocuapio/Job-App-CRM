import { Resume } from "@/types/resume";
import { useEffect, useState } from "react";

interface Params {
    resumes: Resume[];
    getAllResumes: () => void;
}

export default function Resumes({resumes, getAllResumes}: Params) {
    const [resume, setResume] = useState<Resume| null>(null)
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
    }, [resume])

    return (
        <section className="rounded-lg border border-[#ded7cc] bg-white p-6 shadow-[0_18px_60px_rgba(34,31,31,0.06)]">
          {resumes === null ? 
          <p className="text-sm text-[#6d655c]">No resumes yet. Add one to get started.</p>
          : resumes.map(r => (
            <div key= {r.id}>
              <button onClick={() => {setResume(r)}}>{r.fileName}</button>
            </div>
          ))
          }
        </section>
    )
}