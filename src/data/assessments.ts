import { Assessment } from '@/types/assessment';

export const sampleAssessments: Assessment[] = [
  // ---------- FRONTEND ----------
  {
    id: 'assessment_frontend',
    title: 'Frontend Developer Assessment',
    description: 'Assessment for candidates applying to frontend developer roles',
    sections: [
      {
        id: 'section_basic',
        title: 'Basic Information',
        questions: [
          { id: 'q_name', type: 'short-text', text: 'What is your full name?', required: true, validation: { maxLength: 2 } },
          { id: 'q_authorized', type: 'single-choice', text: 'Are you legally eligible to work in India?', required: true, options: ['Yes', 'No'] },
          { id: 'q_location', type: 'short-text', text: 'Which city are you currently located in?', required: true, validation: { maxLength: 3 } },
        ],
      },
      {
        id: 'section_technical',
        title: 'Frontend Skills',
        questions: [
          { id: 'q_language', type: 'single-choice', text: 'What is your primary frontend programming language?', required: true, options: ['JavaScript', 'TypeScript', 'Other'] },
          { id: 'q_frameworks', type: 'multi-choice', text: 'Which frontend frameworks are you proficient in? (Select all that apply)', required: true, options: ['React', 'Vue.js', 'Angular', 'Svelte'] },
          { id: 'q_css', type: 'short-text', text: 'Which CSS libraries or frameworks have you used (e.g., Tailwind, Bootstrap)?', required: false },
          { id: 'q_project_ui', type: 'long-text', text: 'Describe a UI you built that you are most proud of.', required: true, validation: { maxLength: 100 } },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ---------- BACKEND ----------
  {
    id: 'assessment_backend',
    title: 'Backend Developer Assessment',
    description: 'Assessment for candidates applying to backend developer roles',
    sections: [
      {
        id: 'section_basic',
        title: 'Basic Information',
        questions: [
          { id: 'q_name', type: 'short-text', text: 'What is your full name?', required: true, validation: { maxLength: 1 } },
          { id: 'q_authorized', type: 'single-choice', text: 'Are you legally eligible to work in India?', required: true, options: ['Yes', 'No'] },
          { id: 'q_location', type: 'short-text', text: 'Which city are you currently located in?', required: true, validation: { maxLength: 3 } },
        ],
      },
      {
        id: 'section_technical',
        title: 'Backend Skills',
        questions: [
          { id: 'q_language', type: 'single-choice', text: 'What is your primary backend programming language?', required: true, options: ['Java', 'Node.js', 'Python', 'Go', 'Other'] },
          { id: 'q_db', type: 'multi-choice', text: 'Which databases have you worked with?', required: true, options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
          { id: 'q_api', type: 'long-text', text: 'Describe a REST or GraphQL API you designed or worked on.', required: true, validation: { maxLength: 300 } },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ---------- DATA SCIENCE ----------
  {
    id: 'assessment_data',
    title: 'Data Scientist Assessment',
    description: 'Assessment for candidates applying to data scientist roles',
    sections: [
      {
        id: 'section_basic',
        title: 'Basic Information',
        questions: [
          { id: 'q_name', type: 'short-text', text: 'What is your full name?', required: true, validation: { maxLength: 1 } },
          { id: 'q_authorized', type: 'single-choice', text: 'Are you legally eligible to work in India?', required: true, options: ['Yes', 'No'] },
          { id: 'q_location', type: 'short-text', text: 'Which city are you currently located in?', required: true, validation: { maxLength: 3 } },
        ],
      },
      {
        id: 'section_technical',
        title: 'Data Skills',
        questions: [
          { id: 'q_tools', type: 'multi-choice', text: 'Which data science tools do you use regularly?', required: true, options: ['Python', 'R', 'SQL', 'TensorFlow', 'PyTorch'] },
          { id: 'q_ml', type: 'long-text', text: 'Explain a machine learning model you built and how you evaluated its performance.', required: true, validation: { maxLength: 500 } },
          { id: 'q_viz', type: 'short-text', text: 'Which visualization tools/libraries have you used (e.g., Tableau, PowerBI, Matplotlib)?', required: false },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ---------- PRODUCT ----------
  {
    id: 'assessment_product',
    title: 'Product Manager Assessment',
    description: 'Assessment for candidates applying to product manager roles',
    sections: [
      {
        id: 'section_basic',
        title: 'Basic Information',
        questions: [
          { id: 'q_name', type: 'short-text', text: 'What is your full name?', required: true, validation: { maxLength: 1 } },
          { id: 'q_authorized', type: 'single-choice', text: 'Are you legally eligible to work in India?', required: true, options: ['Yes', 'No'] },
          { id: 'q_location', type: 'short-text', text: 'Which city are you currently located in?', required: true, validation: { maxLength: 3 } },
        ],
      },
      {
        id: 'section_pm',
        title: 'Product Thinking',
        questions: [
          { id: 'q_case', type: 'long-text', text: 'How would you improve user retention for a mobile app with declining daily active users?', required: true, validation: { maxLength: 300 } },
          { id: 'q_metrics', type: 'short-text', text: 'What are the top 3 metrics you track for a new product launch?', required: true },
          { id: 'q_collab', type: 'long-text', text: 'Describe a situation where you had to balance engineering constraints with business needs.', required: true, validation: { maxLength: 300} },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Utility to create empty assessment
export const createEmptyAssessment = (): Assessment => ({
  id: `assessment_${Date.now()}`,
  title: '',
  description: '',
  sections: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
