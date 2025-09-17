export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
}

export type Candidate = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role: any;
  id: string;
  name: string;
  email: string;
  jobId: string | null;
  stage: 'applied' | 'screen' | 'tech' | 'offer' | 'hired' | 'rejected'; // 👈 all lowercase
  appliedDate: string;
  timeline: { id: string; label: string; date: string }[];
};
