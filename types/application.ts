export type Application = {
    id: string;
    company: string;
    position: string;
    status: string;
    location: string;
    salary: number | null;
    jobUrl: string | null;
    dateApplied: Date;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };