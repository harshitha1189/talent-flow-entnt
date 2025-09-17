export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  applicationId: string;
  appliedDate: string;
  stage: "applied" | "screen" | "tech" | "offer" | "hired" | "rejected";  
  avatar?: string;  
  notes?: string;   
  timeline: {
    id: string;
    label: string;
    date: string;
  }[];
}

