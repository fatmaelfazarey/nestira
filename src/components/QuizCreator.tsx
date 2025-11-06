
import { QuizPersonalization } from './quiz/QuizPersonalization';
import { QuizBundleSelection } from './quiz/QuizBundleSelection';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { QuizEditModal } from './quiz/QuizEditModal';

interface QuizCreatorProps {
  onSave: (quizData: any) => void;
  onCancel: () => void;
}

export function QuizCreator({ onSave, onCancel }: QuizCreatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [roleData, setRoleData] = useState<any>(null);
  const [showQuizEditor, setShowQuizEditor] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

  const handleRoleSelected = (roleData: any) => {
    console.log('Role selected:', roleData);
    setRoleData(roleData);


    const defaultQuiz = {
      job_id: roleData.data.id,
      id: `quiz-${Date.now()}`,
      title: `${roleData.title} Assessment`,
      description: `Custom assessment for ${roleData.title} position`,
      questionsList: [],
      timeLimit: { hours: 0, minutes: 30, seconds: 0 },
      // personalizationParams: roleData,
      method: roleData.method
    };

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