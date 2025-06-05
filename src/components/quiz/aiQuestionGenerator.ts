
import { PersonalizationParams, Question } from './types';

export function generateAIQuestions(params: PersonalizationParams): Question[] {
  const { role, skills, seniorityLevel } = params;
  
  const questions: Question[] = [];

  // Generate questions based on selected skills
  skills.forEach((skill, index) => {
    if (skill === 'Excel') {
      questions.push(
        {
          id: `excel-${index}-1`,
          text: 'Which Excel function is used to look up values in a table?',
          type: 'multiple-choice',
          options: ['VLOOKUP', 'SUMIF', 'COUNTIF', 'AVERAGE'],
          correctAnswer: 'VLOOKUP',
          category: 'Excel',
          difficulty: 'medium' as const
        },
        {
          id: `excel-${index}-2`,
          text: 'What is the shortcut key for creating a pivot table in Excel?',
          type: 'multiple-choice',
          options: ['Alt + N + V', 'Ctrl + P', 'F12', 'Ctrl + T'],
          correctAnswer: 'Alt + N + V',
          category: 'Excel',
          difficulty: 'hard' as const
        }
      );
    }

    if (skill === 'Financial Reporting') {
      questions.push(
        {
          id: `reporting-${index}-1`,
          text: 'What are the three main financial statements?',
          type: 'short-answer',
          correctAnswer: 'Income Statement, Balance Sheet, Cash Flow Statement',
          category: 'Financial Reporting',
          difficulty: 'easy' as const
        },
        {
          id: `reporting-${index}-2`,
          text: 'GAAP stands for Generally Accepted Accounting Principles.',
          type: 'true-false',
          correctAnswer: 'true',
          category: 'Financial Reporting',
          difficulty: 'easy' as const
        }
      );
    }

    if (skill === 'Budgeting') {
      questions.push(
        {
          id: `budgeting-${index}-1`,
          text: 'What is a variance analysis in budgeting?',
          type: 'short-answer',
          correctAnswer: 'Comparison between actual and budgeted amounts to identify differences',
          category: 'Budgeting',
          difficulty: 'medium' as const
        },
        {
          id: `budgeting-${index}-2`,
          text: 'Which budgeting method starts from zero and justifies every expense?',
          type: 'multiple-choice',
          options: ['Zero-based budgeting', 'Incremental budgeting', 'Flexible budgeting', 'Static budgeting'],
          correctAnswer: 'Zero-based budgeting',
          category: 'Budgeting',
          difficulty: 'medium' as const
        }
      );
    }

    if (skill === 'Tax Compliance') {
      questions.push(
        {
          id: `tax-${index}-1`,
          text: 'What is the current corporate tax rate in the US?',
          type: 'multiple-choice',
          options: ['21%', '25%', '30%', '35%'],
          correctAnswer: '21%',
          category: 'Tax Compliance',
          difficulty: 'medium' as const
        },
        {
          id: `tax-${index}-2`,
          text: 'Form 1120 is used for corporate tax returns.',
          type: 'true-false',
          correctAnswer: 'true',
          category: 'Tax Compliance',
          difficulty: 'easy' as const
        }
      );
    }

    if (skill === 'Risk Management') {
      questions.push(
        {
          id: `risk-${index}-1`,
          text: 'What does VaR stand for in risk management?',
          type: 'multiple-choice',
          options: ['Value at Risk', 'Variable at Risk', 'Variance at Risk', 'Volume at Risk'],
          correctAnswer: 'Value at Risk',
          category: 'Risk Management',
          difficulty: 'hard' as const
        },
        {
          id: `risk-${index}-2`,
          text: 'Diversification helps reduce systematic risk.',
          type: 'true-false',
          correctAnswer: 'false',
          category: 'Risk Management',
          difficulty: 'hard' as const
        }
      );
    }
  });

  // Adjust difficulty based on seniority level
  const adjustedQuestions = questions.map(q => ({
    ...q,
    difficulty: getSeniorityAdjustedDifficulty(q.difficulty, seniorityLevel) as 'easy' | 'medium' | 'hard'
  }));

  return adjustedQuestions;
}

function getSeniorityAdjustedDifficulty(baseDifficulty: string, seniorityLevel: string): string {
  if (seniorityLevel === 'entry-level') {
    return baseDifficulty === 'hard' ? 'medium' : baseDifficulty === 'medium' ? 'easy' : 'easy';
  } else if (seniorityLevel === 'senior-level') {
    return baseDifficulty === 'easy' ? 'medium' : baseDifficulty === 'medium' ? 'hard' : 'hard';
  }
  return baseDifficulty;
}
