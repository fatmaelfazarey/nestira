import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { QuizPersonalization } from './quiz/QuizPersonalization';
import { QuizBundleSelection } from './quiz/QuizBundleSelection';
import { AISuggestionPanel } from './quiz/AISuggestionPanel';
import { QuizCustomizationPanel } from './quiz/QuizCustomizationPanel';
import { QuizReviewStep } from './quiz/QuizReviewStep';
import { QuizDetailsCard } from './quiz/QuizDetailsCard';
import { Question } from './quiz/types';
import { generateAIQuestions } from './quiz/aiQuestionGenerator';
import { QuizStepper } from './quiz/QuizStepper';

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
  
  // New state for the redesigned flow
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedPath, setSelectedPath] = useState<'bundle' | 'custom' | 'mixed' | null>(null);
  const [selectedTests, setSelectedTests] = useState<any[]>([]);
  const [editingQuizFromBundle, setEditingQuizFromBundle] = useState<any>(null);
  
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState<number | null>(null);

  const steps = [
    { id: 1, name: 'Job Role' },
    { id: 2, name: 'Mix & Match' },
    { id: 3, name: 'Customize' },
    { id: 4, name: 'Review & Create' },
  ];

  // Load editing quiz data
  useEffect(() => {
    if (editingQuiz) {
      setQuizTitle(editingQuiz.title || '');
      setQuizDescription(editingQuiz.description || '');
      setTimeLimit(editingQuiz.timeLimit || { hours: 0, minutes: 30, seconds: 0 });
      setQuestions(editingQuiz.questionsList || []);
      // Set current step to 3 (Customize) when editing
      setCurrentStep(3);
      // Set a default selected role if editing
      setSelectedRole({ title: editingQuiz.personalizationParams?.jobTitle || 'Role' });
    }
  }, [editingQuiz]);

  const handleRoleSelected = (roleData: any) => {
    console.log('Role selected:', roleData);
    setSelectedRole(roleData);
    setQuizTitle(`${roleData.title} Assessment`);
    setCurrentStep(2);
    
    // Generate initial AI questions based on the selected role
    const initialQuestions = generateAIQuestions({ role: roleData.title });
    setAiSuggestedQuestions(initialQuestions);
  };

  const handlePathSelected = (path: 'bundle' | 'custom' | 'mixed', data?: any) => {
    console.log('Path selected:', path, data);
    setSelectedPath(path);
    
    if (path === 'mixed' && data?.selectedQuizzes) {
      setSelectedTests(data.selectedQuizzes);
      setCurrentStep(3); // Go to customization for mixed
    } else if (path === 'custom') {
      setCurrentStep(3); // Go to customization for custom path
    }
  };

  const handleEditQuizFromBundle = (quiz: any) => {
    console.log('Editing quiz from bundle:', quiz);
    setEditingQuizFromBundle(quiz);
    setPreviousStep(currentStep);
    setCurrentStep(3);
    
    // Load the quiz questions for editing
    if (quiz.questionsList) {
      setQuestions(quiz.questionsList);
    }
  };

  const handleGenerateQuestions = (params: any) => {
    console.log('Generating questions with params:', params);
    const generatedQuestions = generateAIQuestions(params);
    setAiSuggestedQuestions(generatedQuestions);
    
    toast.success(`Generated ${generatedQuestions.length} questions based on your criteria!`);
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

  const handleCreateQuiz = (quizData: any) => {
    console.log('Creating quiz with data:', quizData);
    const quiz = {
      id: editingQuiz?.id || Date.now(),
      title: quizData.name,
      description: `Assessment for ${quizData.roleTitle}`,
      questions: quizData.totalQuestions,
      duration: `${quizData.totalTime}min`,
      status: editingQuiz?.status || 'Draft',
      createdAt: editingQuiz?.createdAt || new Date().toISOString(),
      questionsList: questions,
      selectedTests: quizData.tests,
      roleTitle: quizData.roleTitle,
      timeLimit: { hours: 0, minutes: quizData.totalTime, seconds: 0 }
    };

    onSave(quiz);
  };

  const canContinueFromStep1 = selectedRole !== null;
  const canContinueFromStep2 = selectedTests.length > 0;
  const canContinueFromStep3 = selectedPath === 'custom' && (questions.length > 0 || selectedTests.length > 0);

  const handleSaveQuiz = () => {
    if (!quizTitle.trim()) {
      toast.error('Please enter a quiz title');
      return;
    }

    if (questions.length === 0 && selectedTests.length === 0) {
      toast.error('Please add at least one question or test');
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
      selectedRole,
      selectedTests,
      timeLimit
    };

    onSave(quiz);
  };

  const handleBackClick = () => {
    if (editingQuizFromBundle && previousStep !== null) {
      // If we're editing a quiz from bundle, go back to previous step
      setCurrentStep(previousStep);
      setEditingQuizFromBundle(null);
      setPreviousStep(null);
    } else {
      // Normal back navigation
      setCurrentStep(prev => prev - 1);
    }
  };

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
                <h1 className="text-2xl font-bold text-[#00102c]">
                  {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
                </h1>
                <p className="text-sm text-gray-600">Powered by Nestira Finance</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <QuizStepper steps={steps} currentStep={currentStep} />
        
        <div className="min-h-[600px]">
          {currentStep === 1 && (
            <QuizPersonalization onRoleSelected={handleRoleSelected} />
          )}
          
          {currentStep === 2 && selectedRole && (
            <QuizBundleSelection 
              roleTitle={selectedRole.title}
              onPathSelected={handlePathSelected}
              onEditQuiz={handleEditQuizFromBundle}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              {editingQuizFromBundle && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Editing: {editingQuizFromBundle.title}
                  </h3>
                  <p className="text-sm text-blue-600">{editingQuizFromBundle.description}</p>
                </div>
              )}
              
              {selectedTests.length > 0 && !editingQuizFromBundle && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Selected Quiz Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedTests.map((test, index) => (
                      <div key={test.id || index} className="bg-white rounded p-3 border border-orange-300">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{test.icon || '📋'}</span>
                          <span className="font-medium text-sm">{test.title}</span>
                        </div>
                        <div className="text-xs text-gray-600">{test.timeEstimate}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AISuggestionPanel
                  questions={aiSuggestedQuestions}
                  onAddToQuiz={handleAddToQuiz}
                  onRegenerateQuestions={() => handleGenerateQuestions({ role: selectedRole?.title })}
                  isVisible={true}
                />
                <QuizCustomizationPanel
                  questions={questions}
                  onUpdateQuestion={handleUpdateQuestion}
                  onRemoveQuestion={handleRemoveQuestion}
                  onReorderQuestions={handleReorderQuestions}
                  onAddCustomQuestion={handleAddCustomQuestion}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && selectedRole && (
            <QuizReviewStep
              roleTitle={selectedRole.title}
              selectedTests={selectedTests}
              onCreateQuiz={handleCreateQuiz}
            />
          )}
        </div>
      </div>

      {/* Footer CTA - Sticky */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBackClick} className="mr-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
            </Button>
          )}
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          {currentStep < steps.length && currentStep !== 4 && (
            <Button 
              onClick={() => setCurrentStep(prev => prev + 1)} 
              className="bg-[#ff5f1b] hover:bg-[#e54e0f] text-white"
              disabled={
                (currentStep === 1 && !selectedRole) ||
                (currentStep === 2 && selectedTests.length === 0 && !editingQuizFromBundle)
              }
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
