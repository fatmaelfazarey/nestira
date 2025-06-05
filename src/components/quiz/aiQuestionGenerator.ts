
import { Question, PersonalizationParams } from './types';

export function generateAIQuestions(params: PersonalizationParams): Question[] {
  const { role, skills, seniorityLevel } = params;
  const questions: Question[] = [];

  skills.forEach((skill, skillIndex) => {
    const skillQuestions = generateQuestionsForSkill(skill, role, seniorityLevel, skillIndex);
    questions.push(...skillQuestions);
  });

  return questions;
}

function generateQuestionsForSkill(
  skill: string, 
  role: string, 
  seniorityLevel: string, 
  skillIndex: number
): Question[] {
  const skillLower = skill.toLowerCase();
  const difficulty = getDifficultyForSeniority(seniorityLevel);
  
  if (skillLower.includes('excel')) {
    return generateExcelQuestions(difficulty, skillIndex);
  } else if (skillLower.includes('financial reporting')) {
    return generateFinancialReportingQuestions(difficulty, skillIndex);
  } else if (skillLower.includes('budgeting')) {
    return generateBudgetingQuestions(difficulty, skillIndex);
  } else if (skillLower.includes('tax')) {
    return generateTaxQuestions(difficulty, skillIndex);
  } else if (skillLower.includes('risk management')) {
    return generateRiskManagementQuestions(difficulty, skillIndex);
  } else {
    return generateGeneralQuestions(skill, difficulty, skillIndex);
  }
}

function getDifficultyForSeniority(seniorityLevel: string): 'easy' | 'medium' | 'hard' {
  switch (seniorityLevel) {
    case 'entry-level': return 'easy';
    case 'mid-level': return 'medium';
    case 'senior-level': return 'hard';
    default: return 'medium';
  }
}

function generateExcelQuestions(difficulty: string, skillIndex: number): Question[] {
  const baseId = `excel-${skillIndex}`;
  
  if (difficulty === 'easy') {
    return [
      {
        id: `${baseId}-1`,
        text: 'Which function is used to calculate the sum of a range of cells?',
        type: 'multiple-choice',
        options: ['SUM', 'TOTAL', 'ADD', 'COUNT'],
        correctAnswer: 'SUM',
        category: 'Excel',
        difficulty: 'easy'
      },
      {
        id: `${baseId}-2`,
        text: 'What does Ctrl+C do in Excel?',
        type: 'multiple-choice',
        options: ['Copy', 'Cut', 'Clear', 'Create'],
        correctAnswer: 'Copy',
        category: 'Excel',
        difficulty: 'easy'
      }
    ];
  } else if (difficulty === 'medium') {
    return [
      {
        id: `${baseId}-1`,
        text: 'Which function would you use to find the present value of an investment?',
        type: 'multiple-choice',
        options: ['NPV', 'PV', 'FV', 'PMT'],
        correctAnswer: 'PV',
        category: 'Excel',
        difficulty: 'medium'
      },
      {
        id: `${baseId}-2`,
        text: 'What does the VLOOKUP function do?',
        type: 'short-answer',
        correctAnswer: 'Searches for a value in the first column of a table and returns a value in the same row from another column',
        category: 'Excel',
        difficulty: 'medium'
      }
    ];
  } else {
    return [
      {
        id: `${baseId}-1`,
        text: 'How would you create a dynamic dashboard that updates automatically when data changes?',
        type: 'short-answer',
        correctAnswer: 'Use pivot tables, dynamic named ranges, and data validation with conditional formatting',
        category: 'Excel',
        difficulty: 'hard'
      },
      {
        id: `${baseId}-2`,
        text: 'What is the difference between INDEX/MATCH and VLOOKUP functions?',
        type: 'short-answer',
        correctAnswer: 'INDEX/MATCH is more flexible, can look left or right, and is more efficient for large datasets',
        category: 'Excel',
        difficulty: 'hard'
      }
    ];
  }
}

function generateFinancialReportingQuestions(difficulty: string, skillIndex: number): Question[] {
  const baseId = `financial-reporting-${skillIndex}`;
  
  return [
    {
      id: `${baseId}-1`,
      text: 'What is the primary purpose of financial statements?',
      type: 'multiple-choice',
      options: [
        'To comply with regulations',
        'To provide financial information to stakeholders',
        'To calculate taxes',
        'To track inventory'
      ],
      correctAnswer: 'To provide financial information to stakeholders',
      category: 'Financial Reporting',
      difficulty
    },
    {
      id: `${baseId}-2`,
      text: 'The accounting equation is: Assets = Liabilities + Equity',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'True',
      category: 'Financial Reporting',
      difficulty
    }
  ];
}

function generateBudgetingQuestions(difficulty: string, skillIndex: number): Question[] {
  const baseId = `budgeting-${skillIndex}`;
  
  return [
    {
      id: `${baseId}-1`,
      text: 'What is the first step in creating an annual budget?',
      type: 'multiple-choice',
      options: [
        'Set revenue targets',
        'Analyze historical data',
        'Define strategic goals',
        'Calculate expenses'
      ],
      correctAnswer: 'Define strategic goals',
      category: 'Budgeting',
      difficulty
    },
    {
      id: `${baseId}-2`,
      text: 'A variance analysis compares actual results to budgeted amounts',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 'True',
      category: 'Budgeting',
      difficulty
    }
  ];
}

function generateTaxQuestions(difficulty: string, skillIndex: number): Question[] {
  const baseId = `tax-${skillIndex}`;
  
  return [
    {
      id: `${baseId}-1`,
      text: 'What is the deadline for filing corporate tax returns?',
      type: 'multiple-choice',
      options: ['March 15', 'April 15', 'May 15', 'June 15'],
      correctAnswer: 'April 15',
      category: 'Tax Compliance',
      difficulty
    },
    {
      id: `${baseId}-2`,
      text: 'Explain the difference between tax avoidance and tax evasion',
      type: 'short-answer',
      correctAnswer: 'Tax avoidance is legal reduction of tax liability through proper planning, while tax evasion is illegal concealment of income or information',
      category: 'Tax Compliance',
      difficulty
    }
  ];
}

function generateRiskManagementQuestions(difficulty: string, skillIndex: number): Question[] {
  const baseId = `risk-management-${skillIndex}`;
  
  return [
    {
      id: `${baseId}-1`,
      text: 'What is the primary goal of risk management?',
      type: 'multiple-choice',
      options: [
        'Eliminate all risks',
        'Maximize profits',
        'Identify, assess, and mitigate risks',
        'Reduce costs'
      ],
      correctAnswer: 'Identify, assess, and mitigate risks',
      category: 'Risk Management',
      difficulty
    },
    {
      id: `${baseId}-2`,
      text: 'What does VaR (Value at Risk) measure?',
      type: 'short-answer',
      correctAnswer: 'The maximum potential loss in value of a portfolio over a specific time period at a given confidence level',
      category: 'Risk Management',
      difficulty
    }
  ];
}

function generateGeneralQuestions(skill: string, difficulty: string, skillIndex: number): Question[] {
  const baseId = `general-${skillIndex}`;
  
  return [
    {
      id: `${baseId}-1`,
      text: `What key skills are most important for ${skill}?`,
      type: 'short-answer',
      correctAnswer: `Relevant skills and competencies for ${skill}`,
      category: skill,
      difficulty
    },
    {
      id: `${baseId}-2`,
      text: `Describe a challenging situation you might face in ${skill}`,
      type: 'short-answer',
      correctAnswer: `Practical scenario and problem-solving approach for ${skill}`,
      category: skill,
      difficulty
    }
  ];
}
