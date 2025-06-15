import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { QuizPersonalization, PersonalizationParams } from './quiz/QuizPersonalization';
import { AISuggestionPanel } from './quiz/AISuggestionPanel';
import { QuizCustomizationPanel } from './quiz/QuizCustomizationPanel';
import { QuizDetailsCard } from './quiz/QuizDetailsCard';
import { Question } from './quiz/types';
import { generateAIQuestions } from './quiz/aiQuestionGenerator';

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
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [personalizationParams, setPersonalizationParams] = useState<PersonalizationParams | null>(null);

  // Load editing quiz data
  useEffect(() => {
    if (editingQuiz) {
      setQuizTitle(editingQuiz.title || '');
      setQuizDescription(editingQuiz.description || '');
      setTimeLimit(editingQuiz.timeLimit || { hours: 0, minutes: 30, seconds: 0 });
      setQuestions(editingQuiz.questionsList || []);
      setPersonalizationParams(editingQuiz.personalizationParams || null);
    }
  }, [editingQuiz]);

  const handleGenerateQuestions = (params: PersonalizationParams) => {
    console.log('Generating questions for:', params);
    const generatedQuestions = generateAIQuestions(params);
    setAiSuggestedQuestions(generatedQuestions);
    setPersonalizationParams(params);
    setShowAISuggestions(true);
    
    toast.success(`Generated ${generatedQuestions.length} questions based on your criteria!`);
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
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Main Flow */}
          <div className="lg:col-span-3 space-y-6">
            {/* Step 1: Personalization */}
            <QuizPersonalization onGenerateQuestions={handleGenerateQuestions} />

            {/* Step 2: AI Suggestions */}
            <AISuggestionPanel
              questions={aiSuggestedQuestions}
              onAddToQuiz={handleAddToQuiz}
              onRegenerateQuestions={handleRegenerateQuestions}
              isVisible={showAISuggestions}
            />

            {/* Step 3: Quiz Customization */}
            <QuizCustomizationPanel
              questions={questions}
              onUpdateQuestion={handleUpdateQuestion}
              onRemoveQuestion={handleRemoveQuestion}
              onReorderQuestions={handleReorderQuestions}
              onAddCustomQuestion={handleAddCustomQuestion}
            />
          </div>

          {/* Right Column - Quiz Details */}
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
        </div>
      </div>

      {/* Footer CTA - Sticky */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveQuiz} 
            disabled={!isQuizComplete}
            className="bg-accent hover:bg-accent/90 text-white"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
          </Button>
        </div>
      </div>
    </div>
  );
}
