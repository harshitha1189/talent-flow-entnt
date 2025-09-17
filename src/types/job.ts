// src/types/job.ts

export type JobStatus = "Open" | "Closed";  // ✅ match MSW/db.ts

export type Job = {
  company?: string;
  id: string;
  title: string;
  slug: string;
  status: "Open" | "Closed";
  tags: string[];
  order: number;
  archived?: boolean; 
  
};


export interface FilterState {
  search: string;
  status: "" | JobStatus;
  tags: string;
  archived?: boolean;
}
