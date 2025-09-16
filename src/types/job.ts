export interface Job {
  id: string;
  title: string;
  status: 'Open' | 'Closed';
  tags: string[];
  company?: string;
}

export interface FilterState {
  search: string;
  status: string;
  tags: string;
}
