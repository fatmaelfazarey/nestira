
import { Question } from './types';

export function generateAIQuestions(params: any): Question[] {
  console.log('Generating AI questions with params:', params);
  
  // Handle undefined or null params
  if (!params) {
    params = {};
  }

  const role = params.role || 'General';
  const mockQuestions: Question[] = [
    {
      id: `ai-${Date.now()}-1`,
      text: `What are the key responsibilities of a ${role}?`,
      type: 'multiple-choice',
      options: [
        'Financial analysis and reporting',
        'Budget planning and forecasting',
        'Risk assessment and management',
        'All of the above'
      ],
      correctAnswer: 'All of the above',
      category: 'Role-specific'
    },
    {
      id: `ai-${Date.now()}-2`,
      text: `Describe a challenging situation you faced in a ${role} position and how you resolved it.`,
      type: 'short-answer',
      category: 'Behavioral'
    },
    {
      id: `ai-${Date.now()}-3`,
      text: `${role} professionals must have strong analytical skills.`,
      type: 'true-false',
      correctAnswer: 'True',
      category: 'Skills Assessment'
    },
    {
      id: `ai-${Date.now()}-4`,
      text: `Which software tools are most important for a ${role}?`,
      type: 'multiple-choice',
      options: [
        'Excel and PowerBI',
        'SAP and Oracle',
        'Python and R',
        'Depends on the specific role'
      ],
      correctAnswer: 'Depends on the specific role',
      category: 'Technical'
    },
    {
      id: `ai-${Date.now()}-5`,
      text: `What trends are currently affecting the ${role} field?`,
      type: 'short-answer',
      category: 'Industry Knowledge'
    }
  ];

  return mockQuestions;
}
