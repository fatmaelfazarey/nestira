
export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer?: string;
  isEditing?: boolean;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface PersonalizationParams {
  role: string;
  skills: string[];
  seniorityLevel: string;
}
