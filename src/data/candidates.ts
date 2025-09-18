import { Candidate } from '@/types/candidate';

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@email.com',
    stage: 'applied',
    avatar: '/avatars/1.jpg',
    role: 'Frontend Developer',
    applicationId: 'APP-2024-001',
    appliedDate: '2023-10-01',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Oct 01, 2023' },
      { id: '2', label: 'Rejected after Application', date: 'Oct 03, 2023' }
    ],
    notes: 'Notes about Arjun Mehta with skills in Frontend Developer',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    stage: 'tech', // reached tech before rejection
    avatar: '/avatars/2.jpg',
    role: 'UX Designer',
    applicationId: 'APP-2024-002',
    appliedDate: '2023-09-18',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 18, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Sep 20, 2023' },
      { id: '3', label: 'Rejected after Assessment', date: 'Sep 22, 2023' }
    ],
    notes: 'Notes about Priya Sharma with skills in UX Designer',
  },
  {
    id: '3',
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    stage: 'offer', // reached offer & accepted
    avatar: '/avatars/3.jpg',
    role: 'DevOps Engineer',
    applicationId: 'APP-2024-003',
    appliedDate: '2023-09-29',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 29, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Oct 01, 2023' },
      { id: '3', label: 'Screening Interview', date: 'Oct 03, 2023' },
      { id: '4', label: 'Offer Sent', date: 'Oct 05, 2023' },
      { id: '5', label: 'Offer Accepted', date: 'Oct 07, 2023' }
    ],
    notes: 'Notes about Rohit Kumar with skills in DevOps Engineering',
  },
  {
    id: '4',
    name: 'Aisha Khan',
    email: 'aisha.khan@email.com',
    stage: 'screen', // reached interview, then rejected
    avatar: '/avatars/4.jpg',
    role: 'Product Manager',
    applicationId: 'APP-2024-004',
    appliedDate: '2023-09-30',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 30, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Oct 02, 2023' },
      { id: '3', label: 'Screening Interview', date: 'Oct 04, 2023' },
      { id: '4', label: 'Rejected after Interview', date: 'Oct 06, 2023' }
    ],
    notes: 'Notes about Aisha Khan with skills in Product Management',
  },
  {
    id: '5',
    name: 'Karan Patel',
    email: 'karan.patel@email.com',
    stage: 'offer', // reached offer but rejected
    avatar: '/avatars/5.jpg',
    role: 'Backend Developer',
    applicationId: 'APP-2024-005',
    appliedDate: '2023-10-10',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Oct 10, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Oct 12, 2023' },
      { id: '3', label: 'Screening Interview', date: 'Oct 14, 2023' },
      { id: '4', label: 'Offer Sent', date: 'Oct 16, 2023' },
      { id: '5', label: 'Rejected after Offer', date: 'Oct 18, 2023' }
    ],
    notes: 'Notes about Karan Patel with skills in Java & Spring Boot',
  },
  {
    id: '6',
    name: 'Ishita Nair',
    email: 'ishita.nair@email.com',
    stage: 'offer', // reached offer & accepted
    avatar: '/avatars/6.jpg',
    role: 'Data Scientist',
    applicationId: 'APP-2024-006',
    appliedDate: '2023-09-25',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 25, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Sep 27, 2023' },
      { id: '3', label: 'Screening Interview', date: 'Sep 29, 2023' },
      { id: '4', label: 'Offer Sent', date: 'Oct 01, 2023' },
      { id: '5', label: 'Offer Accepted', date: 'Oct 03, 2023' }
    ],
    notes: 'PhD in Machine Learning, published researcher',
  },
  {
    id: '7',
    name: 'Aditya Verma',
    email: 'aditya.verma@email.com',
    stage: 'screen',
    avatar: '/avatars/7.jpg',
    role: 'QA Engineer',
    applicationId: 'APP-2024-007',
    appliedDate: '2023-10-06',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Oct 06, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Oct 08, 2023' },
      { id: '3', label: 'Screening Interview', date: 'Oct 10, 2023' },
      { id: '4', label: 'Rejected after Interview', date: 'Oct 12, 2023' }
    ],
    notes: 'Automation testing and Selenium expert',
  },
  {
    id: '8',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@email.com',
    stage: 'applied',
    avatar: '/avatars/8.jpg',
    role: 'Marketing Manager',
    applicationId: 'APP-2024-008',
    appliedDate: '2023-09-14',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 14, 2023' },
      { id: '2', label: 'Rejected after Application', date: 'Sep 16, 2023' }
    ],
    notes: 'Notes about Sneha Gupta with skills in Digital Marketing',
  },
  {
    id: '9',
    name: 'Sahil Reddy',
    email: 'sahil.reddy@email.com',
    stage: 'tech',
    avatar: '/avatars/9.jpg',
    role: 'Mobile App Developer',
    applicationId: 'APP-2024-009',
    appliedDate: '2023-09-29',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 29, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Oct 01, 2023' },
      { id: '3', label: 'Rejected after Assessment', date: 'Oct 03, 2023' }
    ],
    notes: 'React Native and Flutter experience',
  },
  {
    id: '10',
    name: 'Meera Iyer',
    email: 'meera.iyer@email.com',
    stage: 'offer',
    avatar: '/avatars/10.jpg',
    role: 'HR Specialist',
    applicationId: 'APP-2024-010',
    appliedDate: '2023-09-18',
    timeline: [
      { id: '1', label: 'Application Received', date: 'Sep 18, 2023' },
      { id: '2', label: 'Technical Assessment', date: 'Sep 20, 2023' },
      { id: '3', label: 'Screening Interview', date: 'Sep 22, 2023' },
      { id: '4', label: 'Offer Sent', date: 'Sep 24, 2023' },
      { id: '5', label: 'Offer Accepted', date: 'Sep 26, 2023' }
    ],
    notes: 'Expert in recruitment and onboarding',
  },
  // -------- Candidates 11 to 20 --------
{
  id: '11',
  name: 'Rohit Kumar',
  email: 'rohit.kumar@email.com',
  stage: 'offer',
  avatar: '/avatars/11.jpg',
  role: 'DevOps Engineer',
  applicationId: 'APP-2024-011',
  appliedDate: '2023-10-16',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 16, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 18, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 20, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 22, 2023' },
    { id: '5', label: 'Offer Accepted', date: 'Oct 24, 2023' }
  ],
  notes: 'Exceptional AWS and Kubernetes expertise',
},
{
  id: '12',
  name: 'Tanvi Rathi',
  email: 'tanvi.rathi@email.com',
  stage: 'tech',
  avatar: '/avatars/12.jpg',
  role: 'Software Tester',
  applicationId: 'APP-2024-012',
  appliedDate: '2023-10-15',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 15, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 17, 2023' },
    { id: '3', label: 'Rejected after Assessment', date: 'Oct 19, 2023' }
  ],
  notes: 'Specialist in automation frameworks',
},
{
  id: '13',
  name: 'Kunal Saxena',
  email: 'kunal.saxena@email.com',
  stage: 'screen',
  avatar: '/avatars/13.jpg',
  role: 'Database Admin',
  applicationId: 'APP-2024-013',
  appliedDate: '2023-10-14',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 14, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 16, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 18, 2023' },
    { id: '4', label: 'Rejected after Interview', date: 'Oct 20, 2023' }
  ],
  notes: 'Specialist in SQL and NoSQL',
},
{
  id: '14',
  name: 'Aditya Verma',
  email: 'aditya.verma@email.com',
  stage: 'offer',
  avatar: '/avatars/14.jpg',
  role: 'QA Engineer',
  applicationId: 'APP-2024-014',
  appliedDate: '2023-10-13',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 13, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 15, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 17, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 19, 2023' },
    { id: '5', label: 'Offer Accepted', date: 'Oct 21, 2023' }
  ],
  notes: 'Automation testing and Selenium expert',
},
{
  id: '15',
  name: 'Sneha Kapoor',
  email: 'sneha.kapoor@email.com',
  stage: 'applied',
  avatar: '/avatars/15.jpg',
  role: 'Marketing Analyst',
  applicationId: 'APP-2024-015',
  appliedDate: '2023-10-12',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 12, 2023' },
    { id: '2', label: 'Rejected after Application', date: 'Oct 14, 2023' }
  ],
  notes: 'Strong analytical skills',
},
{
  id: '16',
  name: 'Raj Malhotra',
  email: 'raj.malhotra@email.com',
  stage: 'screen',
  avatar: '/avatars/16.jpg',
  role: 'Cloud Engineer',
  applicationId: 'APP-2024-016',
  appliedDate: '2023-10-11',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 11, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 13, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 15, 2023' },
    { id: '4', label: 'Rejected after Interview', date: 'Oct 17, 2023' }
  ],
  notes: 'Strong Azure and GCP knowledge',
},
{
  id: '17',
  name: 'Vikram Singh',
  email: 'vikram.singh@email.com',
  stage: 'offer',
  avatar: '/avatars/17.jpg',
  role: 'AI Engineer',
  applicationId: 'APP-2024-017',
  appliedDate: '2023-10-10',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 10, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 12, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 14, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 16, 2023' },
    { id: '5', label: 'Rejected after Offer', date: 'Oct 18, 2023' }
  ],
  notes: 'Specialist in NLP and CV models',
},
{
  id: '18',
  name: 'Simran Kaur',
  email: 'simran.kaur@email.com',
  stage: 'offer',
  avatar: '/avatars/18.jpg',
  role: 'Product Designer',
  applicationId: 'APP-2024-018',
  appliedDate: '2023-10-09',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 09, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 11, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 13, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 15, 2023' },
    { id: '5', label: 'Offer Accepted', date: 'Oct 17, 2023' }
  ],
  notes: 'Expertise in Figma and design systems',
},
{
  id: '19',
  name: 'Meera Iyer',
  email: 'meera.iyer@email.com',
  stage: 'applied',
  avatar: '/avatars/19.jpg',
  role: 'UX Researcher',
  applicationId: 'APP-2024-019',
  appliedDate: '2023-10-08',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 08, 2023' },
    { id: '2', label: 'Rejected after Application', date: 'Oct 10, 2023' }
  ],
  notes: 'Strong UX and research skills',
},
{
  id: '20',
  name: 'Yash Thakur',
  email: 'yash.thakur@email.com',
  stage: 'tech',
  avatar: '/avatars/20.jpg',
  role: 'Machine Learning Intern',
  applicationId: 'APP-2024-020',
  appliedDate: '2023-10-07',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 07, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 09, 2023' },
    { id: '3', label: 'Rejected after Assessment', date: 'Oct 11, 2023' }
  ],
  notes: 'Strong Python background',
},
// -------- Candidates 21 to 30 --------
{
  id: '21',
  name: 'Ishita Nair',
  email: 'ishita.nair@email.com',
  stage: 'offer',
  avatar: '/avatars/21.jpg',
  role: 'Data Scientist',
  applicationId: 'APP-2024-021',
  appliedDate: '2023-10-06',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 06, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 08, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 10, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 12, 2023' },
    { id: '5', label: 'Offer Accepted', date: 'Oct 14, 2023' }
  ],
  notes: 'Great researcher with ML expertise',
},
{
  id: '22',
  name: 'Rohit Kumar',
  email: 'rohit.kumar@email.com',
  stage: 'screen',
  avatar: '/avatars/22.jpg',
  role: 'DevOps Engineer',
  applicationId: 'APP-2024-022',
  appliedDate: '2023-10-05',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 05, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 07, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 09, 2023' },
    { id: '4', label: 'Rejected after Interview', date: 'Oct 11, 2023' }
  ],
  notes: 'Strong Kubernetes and AWS knowledge',
},
{
  id: '23',
  name: 'Shreya Kapoor',
  email: 'shreya.kapoor@email.com',
  stage: 'offer',
  avatar: '/avatars/23.jpg',
  role: 'Research Analyst',
  applicationId: 'APP-2024-023',
  appliedDate: '2023-10-04',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 04, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 06, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 08, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 10, 2023' },
    { id: '5', label: 'Rejected after Offer', date: 'Oct 12, 2023' }
  ],
  notes: 'Great at market analysis',
},
{
  id: '24',
  name: 'Vikram Singh',
  email: 'vikram.singh@email.com',
  stage: 'tech',
  avatar: '/avatars/24.jpg',
  role: 'AI Engineer',
  applicationId: 'APP-2024-024',
  appliedDate: '2023-10-03',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 03, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 05, 2023' },
    { id: '3', label: 'Rejected after Assessment', date: 'Oct 07, 2023' }
  ],
  notes: 'Specialist in NLP and CV models',
},
{
  id: '25',
  name: 'Divya Menon',
  email: 'divya.menon@email.com',
  stage: 'applied',
  avatar: '/avatars/25.jpg',
  role: 'Finance Analyst',
  applicationId: 'APP-2024-025',
  appliedDate: '2023-10-02',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 02, 2023' },
    { id: '2', label: 'Rejected after Application', date: 'Oct 04, 2023' }
  ],
  notes: 'Experience in financial modeling and forecasting',
},
{
  id: '26',
  name: 'Nikhil Kapoor',
  email: 'nikhil.kapoor@email.com',
  stage: 'screen',
  avatar: '/avatars/26.jpg',
  role: 'UI Developer',
  applicationId: 'APP-2024-026',
  appliedDate: '2023-10-01',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Oct 01, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 03, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 05, 2023' },
    { id: '4', label: 'Rejected after Interview', date: 'Oct 07, 2023' }
  ],
  notes: 'Good Angular and Vue.js background',
},
{
  id: '27',
  name: 'Riya Banerjee',
  email: 'riya.banerjee@email.com',
  stage: 'applied',
  avatar: '/avatars/27.jpg',
  role: 'Project Coordinator',
  applicationId: 'APP-2024-027',
  appliedDate: '2023-09-30',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Sep 30, 2023' },
    { id: '2', label: 'Rejected after Application', date: 'Oct 02, 2023' }
  ],
  notes: 'Experience managing agile teams',
},
{
  id: '28',
  name: 'Mohit Sinha',
  email: 'mohit.sinha@email.com',
  stage: 'tech',
  avatar: '/avatars/28.jpg',
  role: 'Content Strategist',
  applicationId: 'APP-2024-028',
  appliedDate: '2023-09-29',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Sep 29, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Oct 01, 2023' },
    { id: '3', label: 'Rejected after Assessment', date: 'Oct 03, 2023' }
  ],
  notes: 'Good copywriting skills',
},
{
  id: '29',
  name: 'Ananya Joshi',
  email: 'ananya.joshi@email.com',
  stage: 'offer',
  avatar: '/avatars/29.jpg',
  role: 'Business Analyst',
  applicationId: 'APP-2024-029',
  appliedDate: '2023-09-28',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Sep 28, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Sep 30, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 02, 2023' },
    { id: '4', label: 'Offer Sent', date: 'Oct 04, 2023' },
    { id: '5', label: 'Offer Accepted', date: 'Oct 06, 2023' }
  ],
  notes: 'Great with data visualization and dashboards',
},
{
  id: '30',
  name: 'Kabir Chawla',
  email: 'kabir.chawla@email.com',
  stage: 'screen',
  avatar: '/avatars/30.jpg',
  role: 'System Analyst',
  applicationId: 'APP-2024-030',
  appliedDate: '2023-09-27',
  timeline: [
    { id: '1', label: 'Application Received', date: 'Sep 27, 2023' },
    { id: '2', label: 'Technical Assessment', date: 'Sep 29, 2023' },
    { id: '3', label: 'Screening Interview', date: 'Oct 01, 2023' },
    { id: '4', label: 'Rejected after Interview', date: 'Oct 03, 2023' }
  ],
  notes: 'Skilled in requirements gathering',
},

];