export interface AssessmentQuestion {
  id: string;
  type: 'single-choice' | 'multi-choice' | 'short-text' | 'long-text' | 'numeric' | 'file-upload';
  text: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    maxLength?: number;
    fileTypes?: string[];
    maxFileSize?: number; // MB
  };
  conditionalLogic?: {
    dependsOnQuestionId: string;
    condition: 'equals' | 'not-equals' | 'contains';
    value: string;
  };
}

export interface AssessmentSection {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  sections: AssessmentSection[];   
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: string | string[] | File;
}

export interface AssessmentSubmission {
  assessmentId: string;
  candidateId?: string;
  responses: AssessmentResponse[];
  submittedAt: string;
}
