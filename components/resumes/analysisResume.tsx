"use client"

import { useState, useEffect, type ReactNode } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import InsightsIcon from '@mui/icons-material/Insights';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { Resume } from "@/types/resume";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 'calc(100% - 32px)', sm: 640 },
    maxHeight: 'calc(100vh - 32px)',
    overflowY: 'auto',
    bgcolor: '#fff',
    border: '1px solid #ded7cc',
    borderRadius: '8px',
    boxShadow: '0 28px 90px rgba(34,31,31,0.18)',
    p: { xs: 3, sm: 4 },
};

interface Params {
    open: boolean;
    handleClose: () => void;
    resume: Resume;
}

function stripInlineMarkdown(text: string) {
    return text
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/__(.+?)__/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .trim();
}

function sectionTheme(title: string) {
    const key = title.toLowerCase();
    if (key.includes("strength")) {
        return {
            icon: <CheckCircleOutlineIcon fontSize="small" />,
            wrap: "border-[#c9ddd0] bg-[#f4faf6]",
            heading: "text-[#2f5a40]",
        };
    }
    if (key.includes("weak")) {
        return {
            icon: <WarningAmberIcon fontSize="small" />,
            wrap: "border-[#ead2cb] bg-[#fdf6f4]",
            heading: "text-[#9a4f43]",
        };
    }
    if (key.includes("improv")) {
        return {
            icon: <LightbulbOutlinedIcon fontSize="small" />,
            wrap: "border-[#e4d7b8] bg-[#fbf7ee]",
            heading: "text-[#7a5c1e]",
        };
    }
    return {
        icon: <InsightsIcon fontSize="small" />,
        wrap: "border-[#eee8df] bg-[#fbfaf7]",
        heading: "text-[#332f2b]",
    };
}

function AnalysisContent({ text }: { text: string }) {
    const lines = text.replace(/\r\n/g, "\n").split("\n");
    const nodes: ReactNode[] = [];
    let listItems: string[] = [];
    let paragraphs: string[] = [];
    let currentTitle: string | null = null;
    let sectionKey = 0;

    const headingRe = /^(?:#{1,3}\s+|(?:\d+\.\s+)(?=[A-Za-z]))?(\*\*)?(.{2,80}?)(\*\*)?:?\s*$/;

    const isHeading = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed || /^\s*(?:[-*]|\d+[.)])\s+/.test(trimmed)) return false;
        const match = trimmed.match(headingRe);
        if (!match) return false;
        const title = stripInlineMarkdown(match[2]);
        const looksLikeTitle =
            title.length < 48 &&
            /strength|weak|improv|summary|overview|analysis|recommendation/i.test(title);
        const isMarkdownHeading = /^#{1,3}\s+/.test(trimmed) || /^\*\*.+\*\*:?\s*$/.test(trimmed);
        return looksLikeTitle || isMarkdownHeading;
    };

    const headingTitle = (line: string) => {
        const match = line.trim().match(headingRe);
        return stripInlineMarkdown(match?.[2] ?? line);
    };

    const flushList = () => {
        if (!listItems.length) return;
        nodes.push(
            <ul key={`list-${sectionKey}-${nodes.length}`} className="mt-2 space-y-2">
                {listItems.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-[#3b3631]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9a8f82]" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
        listItems = [];
    };

    const flushParagraphs = () => {
        if (!paragraphs.length) return;
        nodes.push(
            <div key={`p-${sectionKey}-${nodes.length}`} className="space-y-2">
                {paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-[#3b3631]">
                        {p}
                    </p>
                ))}
            </div>
        );
        paragraphs = [];
    };

    const wrapSection = (title: string | null, children: ReactNode[]) => {
        if (!children.length) return null;
        if (!title) {
            return (
                <div key={`plain-${sectionKey}`} className="rounded-lg border border-[#eee8df] bg-[#fbfaf7] p-4">
                    {children}
                </div>
            );
        }
        const theme = sectionTheme(title);
        return (
            <section
                key={`sec-${sectionKey}`}
                className={`rounded-lg border p-4 ${theme.wrap}`}
            >
                <div className={`mb-2 flex items-center gap-2 text-sm font-semibold ${theme.heading}`}>
                    {theme.icon}
                    {title}
                </div>
                {children}
            </section>
        );
    };

    const bodyNodes: ReactNode[] = [];
    const pushFlushed = () => {
        flushList();
        flushParagraphs();
        const chunk = nodes.splice(0);
        const wrapped = wrapSection(currentTitle, chunk);
        if (wrapped) bodyNodes.push(wrapped);
        sectionKey += 1;
    };

    for (const raw of lines) {
        const line = raw.trimEnd();
        const trimmed = line.trim();

        if (!trimmed) {
            flushList();
            flushParagraphs();
            continue;
        }

        if (isHeading(trimmed)) {
            pushFlushed();
            currentTitle = headingTitle(trimmed);
            continue;
        }

        const listMatch = trimmed.match(/^\s*(?:[-*]|\d+[.)])\s+(.*)$/);
        if (listMatch) {
            flushParagraphs();
            listItems.push(stripInlineMarkdown(listMatch[1]));
            continue;
        }

        flushList();
        paragraphs.push(stripInlineMarkdown(trimmed));
    }

    pushFlushed();

    if (!bodyNodes.length) {
        return (
            <div className="rounded-lg border border-[#eee8df] bg-[#fbfaf7] p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#3b3631]">
                    {stripInlineMarkdown(text)}
                </p>
            </div>
        );
    }

    return <div className="grid gap-3">{bodyNodes}</div>;
}

export default function ResumeAnalysis({open, handleClose, resume}: Params) {
    const [analysis, setAnalysis] = useState(resume.aiAnalysis || "")

    function handleModalClose() {
        handleClose();
    }

    async function handleClick() {
        const res = await fetch(`/api/ai/${resume.id}`, {
            method: "POST"
        });

        const data = await res.json();
        console.log(data);
        setAnalysis(data)
    }
    
    return (
        
        <div>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#eee8df] bg-[#fbfaf7] text-[#7b7166]">
                                <InsightsIcon fontSize="small" />
                            </div>
                            <div className="min-w-0">
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: '#221f1f', fontWeight: 700, lineHeight: 1.25 }}>
                                    Resume Analysis
                                </Typography>
                                <p id="modal-modal-description" className="mt-1 truncate text-sm text-[#6d655c]">
                                    {resume.fileName}
                                </p>
                            </div>
                        </div>
                        <IconButton
                            aria-label="Close analysis"
                            onClick={handleModalClose}
                            size="small"
                            sx={{ color: '#6d655c' }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>

                {analysis ? (
                    <AnalysisContent text={typeof analysis === "string" ? analysis : String(analysis)} />
                ): (
                    <div className="rounded-lg border border-dashed border-[#ded7cc] bg-[#fbfaf7] px-5 py-8 text-center">
                        <p className="text-sm font-medium text-[#332f2b]">
                            No analysis yet
                        </p>
                        <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-[#6d655c]">
                            Generate a review of this resume with strengths, weaknesses, and specific improvements.
                        </p>
                        <button
                            onClick={handleClick}
                            className="mt-5 inline-flex items-center justify-center rounded-md bg-[#221f1f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#393431] focus:outline-none focus:ring-2 focus:ring-[#221f1f] focus:ring-offset-2"
                        >
                            Start Analysis
                        </button>
                    </div>
    )}
                </Box>
            </Modal>
        </div>
    )
}
