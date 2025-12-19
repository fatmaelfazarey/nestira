
import { QuizPersonalization } from './quiz/QuizPersonalization';
import { QuizBundleSelection } from './quiz/QuizBundleSelection';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { QuizEditModal } from './quiz/QuizEditModal';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { toast } from 'sonner';

interface QuizCreatorProps {
  onSave: (quizData: any) => void;
  onCancel: () => void;
}

export function QuizCreator({ onSave, onCancel }: QuizCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [roleData, setRoleData] = useState<any>(null);
  const [showQuizEditor, setShowQuizEditor] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const { generateAiQuiz } = useEmployerStore();

  const handleRoleSelected = async (roleData: any) => {
    console.log('Role selected : => ', roleData);
    // {
    //     "title": "DevOps",
    //     "method": "search",
    //     "data": {
    //         "jobTitle": "DevOps",
    //         "searchQuery": "",
    //         "mcqCount": 3,
    //         "trueFalseCount": 2,
    //         "shortAnswerCount": 1,
    //         "jobDescription": "A Backend Developer responsible for building REST APIs using Node.js and Express, working with databases like MySQL, ensuring security and performance.",
    //         "questionTypes": {
    //             "mcq": 3,
    //             "trueFalse": 2,
    //             "shortAnswer": 1
    //         },
    //         "totalQuestions": 6
    //     }
    // }

    setRoleData(roleData);

    const defaultQuiz = {
      job_id: roleData?.data?.id || null,
      // id: `quiz-${Date.now()}`,
      role: roleData.title,
      title: `${roleData.title} Assessment`,
      description: `Custom assessment for ${roleData.title} position`,
      questionsList: [],
      timeLimit: { hours: 0, minutes: 30, seconds: 0 },
      // personalizationParams: roleData,
      method: roleData.method
    };


    if (roleData.method == 'search') {
      const quizGenerated = await generateAiQuiz(roleData.data);
      console.log('-------- quizGenerated --------', quizGenerated);
      //       {
      //     "success": true,
      //     "data": {
      //         "success": true,
      //         "quiz": {
      //             "job": "Backend Developer responsible for building REST APIs using Node.js and Express, working with databases like MySQL, ensuring security and performance.",
      //             "questionsList": [
      //                 {
      //                     "type": "mcq",
      //                     "question": "Which of the following is a commonly used framework for building REST APIs with Node.js?",
      //                     "options": [
      //                         "Django",
      //                         "Flask",
      //                         "Express",
      //                         "Ruby on Rails"
      //                     ],
      //                     "correctAnswer": "Express"
      //                 },
      //                 {
      //                     "type": "mcq",
      //                     "question": "Which database management system is NOT typically used by a Backend Developer for building REST APIs?",
      //                     "options": [
      //                         "MySQL",
      //                         "MongoDB",
      //                         "PostgreSQL",
      //                         "Redis"
      //                     ],
      //                     "correctAnswer": "Redis"
      //                 },
      //                 {
      //                     "type": "mcq",
      //                     "question": "Which of the following is NOT a common practice for ensuring security in REST APIs?",
      //                     "options": [
      //                         "Using HTTPS",
      //                         "Implementing rate limiting",
      //                         "Storing passwords in plain text",
      //                         "Using JSON Web Tokens (JWT)"
      //                     ],
      //                     "correctAnswer": "Storing passwords in plain text"
      //                 },
      //                 {
      //                     "type": "true_false",
      //                     "question": "A Backend Developer should focus on the front-end user interface design.",
      //                     "correctAnswer": false
      //                 },
      //                 {
      //                     "type": "true_false",
      //                     "question": "REST APIs should be stateless, meaning each request from client to server must contain all the information needed to understand and complete the request.",
      //                     "correctAnswer": true
      //                 },
      //                 {
      //                     "type": "short_answer",
      //                     "question": "What is the primary responsibility of a Backend Developer in the context of building REST APIs?",
      //                     "answer": "The primary responsibility of a Backend Developer is to build and maintain the server-side logic, including REST APIs, database interactions, and ensuring security and performance."
      //                 }
      //             ]
      //         }
      //     }
      // }
      if (quizGenerated.success) {
        defaultQuiz.questionsList = quizGenerated?.data?.quiz?.questionsList

      } else {
        toast.error('Faild to gnerate Quiz')
      }

    }


    setSelectedQuiz(defaultQuiz);
    setShowQuizEditor(true);
  };

  const handleSaveQuiz = (updatedQuiz: any) => {
    console.log('Saving quiz from QuizCreator:');
    console.log('Full Quiz Data:', updatedQuiz);


    const finalQuizData = {
      ...updatedQuiz,
      questionsList: updatedQuiz.questionsList,
      totalQuestions: updatedQuiz.questionsList.length,
      totalTime: `${updatedQuiz.timeLimit.hours * 60 + updatedQuiz.timeLimit.minutes + updatedQuiz.timeLimit.seconds / 60} min`,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    onSave(finalQuizData);
  };

  if (showQuizEditor && selectedQuiz) {
    return (
      <QuizEditModal
        isOpen={showQuizEditor}
        onClose={() => setShowQuizEditor(false)}
        quiz={selectedQuiz}
        onSave={handleSaveQuiz}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quizzes
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
          <p className="text-gray-600">Build a customized assessment for your candidates</p>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          <QuizPersonalization onRoleSelected={handleRoleSelected} />
        </CardContent>
      </Card>
    </div>
  );
}