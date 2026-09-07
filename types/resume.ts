export type Resume = {
    id: string,
    fileName: string,
    fileSize: number,
    fileType: string,
    fileUrl: string,
    extractedText: string | null,
    processingStatus: string | null,
    aiAnalysis: string | null,
}