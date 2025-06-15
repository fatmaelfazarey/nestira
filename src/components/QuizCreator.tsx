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
import { StepTracker } from './quiz/StepTracker';
import { QuizMethodSelector } from './quiz/QuizMethodSelector';
import { RecommendedBundle } from './quiz/RecommendedBundle';

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

  // Progress: 0 = Job, 1 = Template, 2 = Customize, 3 = Finalize
  const [step, setStep] = useState(0);

  // Job Title for template logic
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  // Method: "smart" for template, "manual" for custom build
  const [method, setMethod] = useState<'smart' | 'manual'>('smart');
  // Store selected skills for customization step
  const [customSkills, setCustomSkills] = useState<string[]>([]);
  // To support adoption of suggested bundles
  const [adoptedBundle, setAdoptedBundle] = useState<string[] | null>(null);

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

  // Handler for moving between steps
  function goToStep(newStep: number) {
    setStep(newStep);
    // Optionally handle focus/UI tweaks
  }

  // ---------------------------
  // Role-aware bundle suggest logic
  // ---------------------------
  const recommendedBundles: Record<string, string[]> = {
    "financial analyst": ["Financial Math", "Modeling", "Excel", "Budgeting", "Communication"],
    "fp&a analyst": ["Financial Math", "Budgeting", "Modeling", "Excel", "Communication"],
    "accountant": ["IFRS", "Excel", "Accounts Payable", "Accounts Receivable"],
    "finance manager": ["Budgeting", "Risk Analysis", "DISC", "Critical Thinking"],
    // ... add more as needed
  };
  const recommendedSkills = selectedJobTitle
    ? recommendedBundles[selectedJobTitle.toLowerCase()] || []
    : [];

  // When user picks/adopts a bundle, update customSkills (but do not lose manual edits)
  const handleAdoptBundle = (skills: string[]) => {
    setCustomSkills(skills);
    setAdoptedBundle(skills);
    setMethod("smart");
    // If you want, auto-generate AI questions for these skills
    // ... consider settingStep(2) or similar ...
  };

  // Manual add skill
  const handleAddSkill = (skill: string) => {
    if (skill && !customSkills.includes(skill)) {
      setCustomSkills(prev => [...prev, skill]);
    }
  };
  // Remove skill
  const handleRemoveSkill = (skill: string) => {
    setCustomSkills(prev => prev.filter(s => s !== skill));
  };

  // On role/job title select, suggest smart template
  function handleJobTitleChange(title: string) {
    setSelectedJobTitle(title);
    setStep(1); // Step to template select
    // If there's a bundle adopt, set it as recommended
    if (recommendedBundles[title.toLowerCase()]) {
      setCustomSkills(recommendedBundles[title.toLowerCase()]);
    }
  }

  // Method selection (smart/manual)
  function handleMethodChange(newMethod: "smart" | "manual") {
    setMethod(newMethod);
    setAdoptedBundle(null);
    // Optionally reset to empty if manual; keep current state if smart
  }

  // ---------------------------
  // Rendering main steps
  // ---------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Step Tracker at top */}
      <StepTracker currentStep={step} />

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
      <div className="max-w-5xl mx-auto p-4">
        {/* ------ Job Selection Step ------ */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-2 text-gray-800 text-lg">Select the Role/Job Title</label>
              <select
                className="w-full border rounded px-4 py-2"
                value={selectedJobTitle}
                onChange={e => handleJobTitleChange(e.target.value)}
              >
                <option value="">Choose a job title...</option>
                <option value="FP&A Analyst">FP&A Analyst</option>
                <option value="Accountant">Accountant</option>
                <option value="Finance Manager">Finance Manager</option>
                {/* ... add more roles ... */}
              </select>
            </div>
            {selectedJobTitle && <Button onClick={() => goToStep(1)}>Next</Button>}
          </div>
        )}

        {/* ------ Template/Build Step ------ */}
        {step === 1 && (
          <div className="space-y-6">
            {selectedJobTitle && (
              <>
                {/* Show recommended bundle if present */}
                <RecommendedBundle 
                  jobTitle={selectedJobTitle}
                  onPreview={(skills) => {
                    setCustomSkills(skills);
                    setMethod("smart");
                    // Optionally preview questions here
                  }}
                  onAdopt={handleAdoptBundle}
                />
              </>
            )}
            <QuizMethodSelector selected={method} onChange={handleMethodChange} />
            <div className="flex justify-end">
              <Button onClick={() => goToStep(2)} className="mt-6 bg-accent text-white">Continue</Button>
            </div>
          </div>
        )}

        {/* ------ Customize Step ------ */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="font-medium block mb-2 text-gray-800 text-lg">Skills to Assess</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {customSkills.map(skill => (
                  <span key={skill} className="bg-accent/10 border rounded-sm px-2 py-1 text-xs flex gap-1 items-center">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-1 text-red-500 hover:underline">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  className="flex-1 border px-2 py-1 rounded text-sm"
                  placeholder="Add a skill..."
                  onKeyDown={e => {
                    if (e.key === "Enter" && e.currentTarget.value) {
                      handleAddSkill(e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const el = document.querySelector<HTMLInputElement>('input[placeholder="Add a skill..."]');
                    if (el && el.value.trim()) {
                      handleAddSkill(el.value.trim());
                      el.value = "";
                    }
                  }}
                >Add Skill</Button>
              </div>
            </div>
            {/* Seniority level select */}
            <div>
              <label className="font-medium block mb-2 text-gray-800 text-lg">Seniority Level</label>
              <select
                className="w-full border rounded px-4 py-2"
                value={personalizationParams?.seniorityLevel || ""}
                onChange={e => {
                  setPersonalizationParams(prev =>
                    ({ ...(prev || {}), seniorityLevel: e.target.value })
                  );
                }}
              >
                <option value="">Select seniority...</option>
                <option value="entry-level">Entry Level</option>
                <option value="mid-level">Mid Level</option>
                <option value="senior-level">Senior Level</option>
              </select>
            </div>
            {/* Continue to next step */}
            <div className="flex justify-end pt-2">
              <Button onClick={() => goToStep(3)} className="bg-accent text-white">Continue to Finalize</Button>
            </div>
          </div>
        )}

        {/* ------ Finalize Step ------ */}
        {step === 3 && (
          <div className="space-y-4">
            {/* AI Title/Description, Time Suggester */}
            <div>
              <label className="block font-medium mb-2 text-gray-800">Quiz Title</label>
              <input
                className="w-full border rounded px-3 py-2 mb-3"
                value={quizTitle}
                onChange={e => setQuizTitle(e.target.value)}
                placeholder="Quiz title (suggested by AI)"
              />
              <label className="block font-medium mb-2 text-gray-800">Quiz Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={quizDescription}
                onChange={e => setQuizDescription(e.target.value)}
                placeholder="Short summary for candidates"
              />
            </div>
            {/* Suggested time */}
            <div>
              <label className="block font-medium mb-2 text-gray-800">Suggested Time</label>
              <input
                className="w-32 border rounded px-3 py-2"
                type="number"
                min={5}
                step={5}
                value={timeLimit.minutes}
                onChange={e => setTimeLimit({ ...timeLimit, minutes: Number(e.target.value) })}
                placeholder="Minutes"
              />
            </div>
            {/* Preview and customize questions */}
            <QuizCustomizationPanel
              questions={questions}
              onUpdateQuestion={handleUpdateQuestion}
              onRemoveQuestion={handleRemoveQuestion}
              onReorderQuestions={handleReorderQuestions}
              onAddCustomQuestion={handleAddCustomQuestion}
            />
            {/* Final action */}
            <div className="flex justify-end">
              <Button onClick={handleSaveQuiz} className="bg-accent text-white" size="lg" disabled={!quizTitle.trim() || !questions.length}>
                {editingQuiz ? 'Update Quiz' : 'Create Quiz'}
              </Button>
            </div>
          </div>
        )}
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
