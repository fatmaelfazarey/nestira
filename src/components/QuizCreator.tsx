
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { QuizPersonalization } from './quiz/QuizPersonalization';
import { AISuggestionPanel } from './quiz/AISuggestionPanel';
import { QuizCustomizationPanel } from './quiz/QuizCustomizationPanel';
import { QuizDetailsCard } from './quiz/QuizDetailsCard';
import { Question } from './quiz/types';
import { generateAIQuestions } from './quiz/aiQuestionGenerator';
import { QuizStepper } from './quiz/QuizStepper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizCreatorProps {
  onSave: (quiz: any) => void;
  onCancel: () => void;
  editingQuiz?: any;
}

export function QuizCreator({ onSave, onCancel, editingQuiz }: QuizCreatorProps) {
  // Quiz state
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState({ hours: 0, minutes: 30, seconds: 0 });
  
  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [aiSuggestedQuestions, setAiSuggestedQuestions] = useState<Question[]>([]);
  
  // UI state
  const [personalizationParams, setPersonalizationParams] = useState<any | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: 'Job details' },
    { id: 2, name: 'Choose tests' },
    { id: 3, name: 'Add questions' },
    { id: 4, name: 'Finalize' },
  ];


  // Load editing quiz data
  useEffect(() => {
    if (editingQuiz) {
      setQuizTitle(editingQuiz.title || '');
      setQuizDescription(editingQuiz.description || '');
      setTimeLimit(editingQuiz.timeLimit || { hours: 0, minutes: 30, seconds: 0 });
      setQuestions(editingQuiz.questionsList || []);
      setPersonalizationParams(editingQuiz.personalizationParams || null);
      // Potentially set current step based on editingQuiz state
    }
  }, [editingQuiz]);

  const handleGenerateQuestions = (params: any) => {
    console.log('Generating questions for:', params);
    const generatedQuestions = generateAIQuestions(params);
    setAiSuggestedQuestions(generatedQuestions);
    setPersonalizationParams(params);
    
    toast.success(`Generated ${generatedQuestions.length} questions based on your criteria!`);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      // In a real scenario, we'd collect form data from QuizPersonalization here.
      // For now, we'll use mock data to generate questions for the next step.
      handleGenerateQuestions({ role: 'financial-analyst', skills: ['Excel', 'Budgeting'], seniorityLevel: 'mid-level' });
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleRegenerateQuestions = () => {
    if (personalizationParams) {
      handleGenerateQuestions(personalizationParams);
    }
  };

  const handleAddToQuiz = (question: Question) => {
    const newQuestion = { ...question, id: `quiz-${Date.now()}-${Math.random()}` };
    setQuestions(prev => [...prev, newQuestion]);
    toast.success('Question added to quiz!');
  };

  const handleAddCustomQuestion = () => {
    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      text: '',
      type: 'multiple-choice',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      isEditing: true
    };
    // Add custom questions at the beginning of the list
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const handleUpdateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, ...updates } : q)
    );
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleReorderQuestions = (reorderedQuestions: Question[]) => {
    setQuestions(reorderedQuestions);
  };

  const handleSaveQuiz = () => {
    if (!quizTitle.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    if (questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    const quiz = {
      id: editingQuiz?.id || Date.now(),
      title: quizTitle,
      description: quizDescription,
      questions: questions.length,
      duration: `${timeLimit.hours > 0 ? timeLimit.hours + 'h ' : ''}${timeLimit.minutes}min`,
      status: editingQuiz?.status || 'Draft',
      createdAt: editingQuiz?.createdAt || new Date().toISOString(),
      questionsList: questions,
      personalizationParams,
      timeLimit
    };

    onSave(quiz);
  };

  const isQuizComplete = quizTitle.trim() && questions.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">
                  {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
                </h1>
                <p className="text-sm text-gray-600">Powered by Nestira Finance</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveQuiz} 
                disabled={!isQuizComplete}
                className="bg-accent hover:bg-accent/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <QuizStepper steps={steps} currentStep={currentStep} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Main Flow */}
          <div className={currentStep < 4 ? "lg:col-span-3 space-y-6" : "lg:col-span-4 space-y-6"}>
            {currentStep === 1 && <QuizPersonalization />}
            
            {currentStep === 2 && (
              <AISuggestionPanel
                questions={aiSuggestedQuestions}
                onAddToQuiz={handleAddToQuiz}
                onRegenerateQuestions={handleRegenerateQuestions}
                isVisible={true}
              />
            )}

            {currentStep === 3 && (
              <QuizCustomizationPanel
                questions={questions}
                onUpdateQuestion={handleUpdateQuestion}
                onRemoveQuestion={handleRemoveQuestion}
                onReorderQuestions={handleReorderQuestions}
                onAddCustomQuestion={handleAddCustomQuestion}
              />
            )}
            {currentStep === 4 && (
               <Card>
                <CardHeader><CardTitle>Finalize Quiz</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Review your quiz settings and added questions before saving.</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <QuizDetailsCard
                      title={quizTitle}
                      description={quizDescription}
                      timeLimit={timeLimit}
                      onTitleChange={setQuizTitle}
                      onDescriptionChange={setQuizDescription}
                      onTimeLimitChange={setTimeLimit}
                    />
                    <QuizCustomizationPanel
                      questions={questions}
                      onUpdateQuestion={handleUpdateQuestion}
                      onRemoveQuestion={handleRemoveQuestion}
                      onReorderQuestions={handleReorderQuestions}
                      onAddCustomQuestion={handleAddCustomQuestion}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Quiz Details */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <QuizDetailsCard
                title={quizTitle}
                description={quizDescription}
                timeLimit={timeLimit}
                onTitleChange={setQuizTitle}
                onDescriptionChange={setQuizDescription}
                onTimeLimitChange={setTimeLimit}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA - Sticky */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)} className="mr-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
          )}
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleContinue} className="bg-accent hover:bg-accent/90 text-white">
                Continue
            </Button>
          ) : (
            <Button 
              onClick={handleSaveQuiz} 
              disabled={!isQuizComplete}
              className="bg-accent hover:bg-accent/90 text-white"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
