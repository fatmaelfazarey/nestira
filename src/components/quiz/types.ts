
export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  isEditing?: boolean;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'voice-note';

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: string;
  status: string;
  createdAt: string;
  questionsList: Question[];
  personalizationParams?: PersonalizationParams | null;
  timeLimit: TimeLimit;
}

export interface PersonalizationParams {
  jobTitle?: string;
  yearsOfExperience?: number;
  industry?: string;
  skills?: string[];
  role?: string;
  seniorityLevel?: string;
}

export interface TimeLimit {
  hours: number;
  minutes: number;
  seconds: number;
}
