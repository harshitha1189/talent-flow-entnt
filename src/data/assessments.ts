import { Assessment } from '@/types/assessment';

export const sampleAssessments: Assessment[] = [
  {
    id: 'assessment_1',
    title: 'Senior Frontend Engineer Assessment',
    description: 'Technical assessment for frontend engineer position',
    sections: [
      {
        id: 'section_basic',
        title: 'Basic Information',
        questions: [
          {
            id: 'q_name',
            type: 'short-text',
            text: 'What is your full name?',
            required: true,
            validation: { maxLength: 100 },
          },
          {
            id: 'q_authorized',
            type: 'single-choice',
            text: 'Are you legally authorized to work in the United States?',
            required: true,
            options: ['Yes', 'No'],
          },
        ],
      },
      {
        id: 'section_technical',
        title: 'Technical Skills',
        questions: [
          {
            id: 'q_language',
            type: 'single-choice',
            text: 'What is your primary programming language?',
            required: true,
            options: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Other'],
          },
          {
            id: 'q_frameworks',
            type: 'multi-choice',
            text: 'Which frontend frameworks are you proficient in? (Select all that apply)',
            required: true,
            options: ['React', 'Vue.js', 'Angular', 'Svelte'],
          },
          {
            id: 'q_experience',
            type: 'numeric',
            text: 'How many years of professional software development experience do you have?',
            required: true,
            validation: { min: 0, max: 50 },
          },
          {
            id: 'q_project',
            type: 'long-text',
            text: 'Briefly describe a challenging technical project you worked on.',
            required: true,
            validation: { maxLength: 1000 },
          },
          {
            id: 'q_portfolio',
            type: 'file-upload',
            text: 'Upload your Portfolio or a code sample (PDF, ZIP, up to 10MB)',
            required: false,
            validation: { fileTypes: ['.pdf', '.zip'], maxFileSize: 10 },
          },
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
