export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  stage: 'Applied' | 'Interviewing' | 'Offered' | 'Hired' | 'Rejected';
  avatar?: string;  // optional avatar path
  role: string;
  applicationId: string;
  timeline: TimelineEvent[];
  notes?: string;
  appliedDate: string; // ✅ New field
}
