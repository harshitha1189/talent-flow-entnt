// src/mocks/db.ts
import { faker } from '@faker-js/faker';

export type Job = {
  id: string;
  title: string;
  slug: string;
  status: "Open" | "Closed";
  tags: string[];
  order: number;
  archived: boolean;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  jobId: string | null;
  stage: 'applied' | 'screen' | 'tech' | 'offer' | 'hired' | 'rejected';
  appliedDate: string; // ISO
  timeline: { id: string; label: string; date: string }[];
};

export type Assessment = {
  jobId: string;
  id: string;
  title: string;
  questions: { id: string; type: string; question: string; options?: string[] }[];
};

const rand = (n: number) => Math.floor(Math.random() * n);

export const db = {
  jobs: [] as Job[],
  candidates: [] as Candidate[],
  assessments: [] as Assessment[],
  submissions: {} as Record<string, unknown[]>, // store submit results per jobId
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function seedDB() {
  // Seed 25 jobs
  const jobTitles = [
    'Senior Software Engineer','Product Manager','UX Designer','Data Analyst','Marketing Specialist',
    'Backend Developer','Frontend Developer','DevOps Engineer','QA Engineer','Security Engineer',
    'Mobile Developer','Sales Representative','Content Writer','Customer Success Manager','BI Engineer',
    'Technical Program Manager','Machine Learning Engineer','Site Reliability Engineer','Support Engineer','Data Engineer',
    'Fullstack Developer','Cloud Architect','Solutions Engineer','Growth Marketer','Design Lead'
  ];

  db.jobs = jobTitles.slice(0, 25).map((title, i) => ({
    id: `job-${i + 1}`,
    title,
    slug: slugify(title) + `-${i + 1}`,
    status: Math.random() > 0.5 ? "Open" : "Closed",
    tags: faker.helpers.arrayElements(
      ["Engineering", "Product", "Design", "Marketing", "Remote", "Full-time", "Analytics"],
      rand(3) + 1
    ),
    order: i + 1,
    archived: false,
  }));

  // Seed 3 assessments (pick three jobs)
  db.assessments = [0, 1, 2].map((n) => {
    const job = db.jobs[n];
    return {
      jobId: job.id,
      id: `assess-${n + 1}`,
      title: `${job.title} - Technical Assessment`,
      questions: Array.from({ length: 12 }).map((_, i) => {
        const type = i % 3 === 0 ? 'coding' : i % 3 === 1 ? 'mcq' : 'short';

        let question: string;
        let options: string[] | undefined;

        if (type === 'coding') {
          question = `Coding Task ${i + 1}: Write a function to ${faker.hacker.verb()} ${faker.hacker.noun()}.`;
        } else if (type === 'mcq') {
          question = `MCQ ${i + 1}: ${faker.hacker.phrase()}`;
          options = faker.helpers.arrayElements(['A', 'B', 'C', 'D', 'E'], 4);
        } else {
          question = `Short Answer ${i + 1}: Explain ${faker.hacker.abbreviation()} in simple terms.`;
        }

        return {
          id: `q-${n + 1}-${i + 1}`,
          type,
          question,
          options,
        };
      }),
    };
  });

  // Seed 1000 candidates randomly assigned to jobs & stages
  const stages: Candidate['stage'][] = ['applied', 'screen', 'tech', 'offer', 'hired', 'rejected'];
  db.candidates = Array.from({ length: 1000 }).map((_, idx) => {
    const job = db.jobs[rand(db.jobs.length)];
    const stage = stages[rand(stages.length)];

    const appliedDate = faker.date
      .between({
        from: new Date('2023-01-01'),
        to: new Date('2024-12-31'),
      })
      .toISOString()
      .split('T')[0];

    const timeline = [
      { id: `t-${idx}-1`, label: 'Application Received', date: appliedDate },
    ];
    if (stage === 'screen' || stage === 'tech' || stage === 'offer' || stage === 'hired') {
      timeline.push({ id: `t-${idx}-2`, label: 'Screening Interview', date: appliedDate });
    }
    if (stage === 'tech' || stage === 'offer' || stage === 'hired') {
      timeline.push({ id: `t-${idx}-3`, label: 'Technical Assessment', date: appliedDate });
    }
    if (stage === 'offer' || stage === 'hired') {
      timeline.push({ id: `t-${idx}-4`, label: 'Offer Sent', date: appliedDate });
    }

    return {
      id: `cand-${idx + 1}`,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      jobId: job.id,
      stage,
      appliedDate,
      timeline,
    } as Candidate;
  });

  // Reset submissions
  db.submissions = {};
}

// Seed on import
seedDB();
