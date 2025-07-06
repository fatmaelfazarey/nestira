import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus, ArrowRight, Edit, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import { QuizPreviewModal } from './QuizPreviewModal';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuizBundleSelectionProps {
  roleTitle: string;
  onPathSelected: (path: 'bundle' | 'custom' | 'mixed', data?: any) => void;
  onEditQuiz?: (quiz: BundleQuiz) => void;
}

interface BundleQuiz {
  id: string;
  title: string;
  tags: string[];
  timeEstimate: string;
  description: string;
  icon: string;
  questionsList?: any[];
}

const suggestedBundle: BundleQuiz[] = [
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    tags: ['Communication', 'Problem Solving', 'Leadership'],
    timeEstimate: '15 min',
    description: 'Essential interpersonal and communication abilities',
    icon: '🤝',
    questionsList: [
      {
        id: 'ss1',
        text: 'How do you handle conflict in a team setting?',
        type: 'multiple-choice',
        options: ['Avoid it', 'Address it directly', 'Escalate to manager', 'Ignore it'],
        correctAnswer: 'Address it directly'
      }
    ]
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    tags: ['Critical Thinking', 'Analysis', 'Decision Making'],
    timeEstimate: '20 min',
    description: 'Cognitive abilities and analytical thinking',
    icon: '🧠',
    questionsList: [
      {
        id: 'lr1',
        text: 'If all A are B, and all B are C, then all A are C. This is an example of:',
        type: 'multiple-choice',
        options: ['Deductive reasoning', 'Inductive reasoning', 'Abductive reasoning', 'Circular reasoning'],
        correctAnswer: 'Deductive reasoning'
      }
    ]
  },
  {
    id: 'tools-software',
    title: 'Tools & Software',
    tags: ['Excel', 'SAP', 'PowerBI'],
    timeEstimate: '30 min',
    description: 'Proficiency with relevant tools and software',
    icon: '💻',
    questionsList: [
      {
        id: 'ts1',
        text: 'Which Excel function is used to look up values in a table?',
        type: 'multiple-choice',
        options: ['LOOKUP', 'VLOOKUP', 'FIND', 'SEARCH'],
        correctAnswer: 'VLOOKUP'
      }
    ]
  },
  {
    id: 'culture-fit',
    title: 'Culture Fit',
    tags: ['Values', 'Work Style', 'Team Dynamics'],
    timeEstimate: '10 min',
    description: 'Alignment with company culture and values',
    icon: '🏢',
    questionsList: [
      {
        id: 'cf1',
        text: 'What motivates you most in your work?',
        type: 'short-answer',
        correctAnswer: 'Sample answer about motivation and alignment with company values'
      }
    ]
  },
  {
    id: 'finance-technical',
    title: 'Finance Technical',
    tags: ['IFRS', 'Financial Analysis', 'Budgeting'],
    timeEstimate: '25 min',
    description: 'Core financial knowledge and technical skills',
    icon: '📊',
    questionsList: [
      {
        id: 'ft1',
        text: 'What is the primary purpose of IFRS?',
        type: 'multiple-choice',
        options: ['Tax reporting', 'Internal management', 'International standardization', 'Regulatory compliance'],
        correctAnswer: 'International standardization'
      }
    ]
  }
];

const additionalQuizzes: BundleQuiz[] = [
  {
    id: 'time-management',
    title: 'Time Management',
    tags: ['Productivity', 'Organization', 'Planning'],
    timeEstimate: '12 min',
    description: 'Evaluate ability to manage time and prioritize tasks effectively',
    icon: '⏰',
    questionsList: [
      {
        id: 'tm1',
        text: 'How do you prioritize multiple urgent tasks?',
        type: 'multiple-choice',
        options: ['First come, first served', 'Based on deadline', 'Based on impact', 'Ask supervisor'],
        correctAnswer: 'Based on impact'
      }
    ]
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    tags: ['Risk Management', 'Analysis', 'Decision Making'],
    timeEstimate: '18 min',
    description: 'Understanding of risk evaluation and mitigation strategies',
    icon: '⚠️',
    questionsList: [
      {
        id: 'ra1',
        text: 'What is the primary goal of risk assessment?',
        type: 'multiple-choice',
        options: ['Eliminate all risks', 'Identify and mitigate risks', 'Transfer all risks', 'Ignore minor risks'],
        correctAnswer: 'Identify and mitigate risks'
      }
    ]
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    tags: ['Analytics', 'Statistics', 'Interpretation'],
    timeEstimate: '22 min',
    description: 'Ability to analyze and interpret financial data',
    icon: '📈',
    questionsList: [
      {
        id: 'da1',
        text: 'Which measure best represents central tendency?',
        type: 'multiple-choice',
        options: ['Range', 'Standard deviation', 'Mean', 'Variance'],
        correctAnswer: 'Mean'
      }
    ]
  },
  {
    id: 'regulatory-compliance',
    title: 'Regulatory Compliance',
    tags: ['Compliance', 'Regulations', 'Legal'],
    timeEstimate: '16 min',
    description: 'Knowledge of financial regulations and compliance requirements',
    icon: '⚖️',
    questionsList: [
      {
        id: 'rc1',
        text: 'What is the main purpose of SOX compliance?',
        type: 'multiple-choice',
        options: ['Tax reporting', 'Financial transparency', 'HR management', 'Marketing compliance'],
        correctAnswer: 'Financial transparency'
      }
    ]
  },
  {
    id: 'presentation-skills',
    title: 'Presentation Skills',
    tags: ['Communication', 'Public Speaking', 'Visualization'],
    timeEstimate: '14 min',
    description: 'Ability to present financial information clearly and effectively',
    icon: '🎯',
    questionsList: [
      {
        id: 'ps1',
        text: 'What is the most important aspect of a financial presentation?',
        type: 'multiple-choice',
        options: ['Visual design', 'Data accuracy', 'Speaking confidence', 'Time management'],
        correctAnswer: 'Data accuracy'
      }
    ]
  },
  {
    id: 'ethics-integrity',
    title: 'Ethics & Integrity',
    tags: ['Ethics', 'Integrity', 'Professional Standards'],
    timeEstimate: '13 min',
    description: 'Understanding of professional ethics and integrity in finance',
    icon: '🛡️',
    questionsList: [
      {
        id: 'ei1',
        text: 'What should you do if you discover a material error in financial statements?',
        type: 'multiple-choice',
        options: ['Ignore if small', 'Report immediately', 'Fix quietly', 'Wait for audit'],
        correctAnswer: 'Report immediately'
      }
    ]
  }
];

function SortableQuizItem({ 
  quiz, 
  onEdit, 
  onRemove, 
  onPreview 
}: {
  quiz: BundleQuiz;
  onEdit: () => void;
  onRemove: () => void;
  onPreview: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: quiz.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="bg-green-50 border border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div 
                {...attributes} 
                {...listeners}
                className="cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-2xl">{quiz.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{quiz.title}</h4>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview();
                }}
                className="h-8 w-8 p-0 hover:bg-blue-100"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="h-8 w-8 p-0 hover:bg-yellow-100"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {quiz.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{quiz.timeEstimate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DraggableAvailableQuiz({ 
  quiz, 
  onSelect, 
  onPreview 
}: {
  quiz: BundleQuiz;
  onSelect: () => void;
  onPreview: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `available-${quiz.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="bg-blue-50 border border-blue-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3" {...attributes} {...listeners}>
              <GripVertical className="w-4 h-4 text-gray-400" />
              <span className="text-2xl">{quiz.icon}</span>
              <div>
                <h4 className="font-semibold text-gray-900">{quiz.title}</h4>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview();
                }}
                className="h-8 w-8 p-0 hover:bg-blue-100"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect();
                }}
                className="h-8 w-8 p-0 hover:bg-green-100"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {quiz.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{quiz.timeEstimate}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QuizBundleSelection({ roleTitle, onPathSelected, onEditQuiz }: QuizBundleSelectionProps) {
  const [availableQuizzes, setAvailableQuizzes] = useState<BundleQuiz[]>(suggestedBundle);
  const [selectedQuizzes, setSelectedQuizzes] = useState<BundleQuiz[]>([]);
  const [previewQuiz, setPreviewQuiz] = useState<BundleQuiz | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showMoreQuizzes, setShowMoreQuizzes] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const selectedTotalTime = selectedQuizzes.reduce((acc, quiz) => {
    const minutes = parseInt(quiz.timeEstimate);
    return acc + minutes;
  }, 0);

  const handleSelectQuiz = (quiz: BundleQuiz) => {
    setSelectedQuizzes(prev => [...prev, quiz]);
    setAvailableQuizzes(prev => prev.filter(q => q.id !== quiz.id));
    toast.success(`${quiz.title} added to your quiz`);
  };

  const handleRemoveQuiz = (quizId: string) => {
    const quiz = selectedQuizzes.find(q => q.id === quizId);
    if (quiz && !quiz.id.startsWith('custom-')) {
      setAvailableQuizzes(prev => [...prev, quiz]);
    }
    setSelectedQuizzes(prev => prev.filter(q => q.id !== quizId));
    toast.success('Quiz removed from bundle');
  };

  const handleEditQuiz = (quiz: BundleQuiz) => {
    if (onEditQuiz) {
      onEditQuiz(quiz);
    }
  };

  const handlePreviewQuiz = (quiz: BundleQuiz) => {
    setPreviewQuiz(quiz);
    setIsPreviewOpen(true);
  };

  const handleAddCustomQuiz = () => {
    const newQuiz: BundleQuiz = {
      id: `custom-${Date.now()}`,
      title: 'Custom Quiz',
      tags: ['Custom'],
      timeEstimate: '15 min',
      description: 'Your custom quiz',
      icon: '✏️',
      questionsList: []
    };
    setSelectedQuizzes(prev => [...prev, newQuiz]);
    toast.success('Custom quiz added');
  };

  const handleShowMoreQuizzes = () => {
    const newQuizzes = additionalQuizzes.filter(quiz => 
      !availableQuizzes.some(existing => existing.id === quiz.id) &&
      !selectedQuizzes.some(selected => selected.id === quiz.id)
    );
    setAvailableQuizzes(prev => [...prev, ...newQuizzes]);
    setShowMoreQuizzes(true);
    toast.success(`${newQuizzes.length} more quizzes loaded!`);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Handle dragging from available to selected
    if (activeId.startsWith('available-') && overId === 'quiz-bundle-droppable') {
      const quizId = activeId.replace('available-', '');
      const quiz = availableQuizzes.find(q => q.id === quizId);
      if (quiz) {
        setSelectedQuizzes(prev => [...prev, quiz]);
        setAvailableQuizzes(prev => prev.filter(q => q.id !== quizId));
        toast.success(`${quiz.title} added to your quiz bundle`);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Handle reordering within selected quizzes
    if (active.id !== over?.id && !active.id.toString().startsWith('available-')) {
      const oldIndex = selectedQuizzes.findIndex((item) => item.id === active.id);
      const newIndex = selectedQuizzes.findIndex((item) => item.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedQuizzes = arrayMove(selectedQuizzes, oldIndex, newIndex);
        setSelectedQuizzes(reorderedQuizzes);
      }
    }

    setActiveId(null);
  };

  const handleContinue = () => {
    if (selectedQuizzes.length === 0) {
      toast.error('Please select at least one quiz to continue');
      return;
    }
    
    onPathSelected('mixed', { 
      selectedQuizzes: selectedQuizzes,
      roleTitle 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Mix & Match Quiz Templates</h2>
        <p className="text-gray-600">
          Select from our recommended templates for <strong>{roleTitle}</strong> and add your own custom quizzes
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Quiz Templates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Available Quiz Templates</h3>
              {!showMoreQuizzes && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleShowMoreQuizzes}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Show More Quizzes
                </Button>
              )}
            </div>
            <div className="space-y-3">
              <SortableContext items={availableQuizzes.map(q => `available-${q.id}`)} strategy={verticalListSortingStrategy}>
                {availableQuizzes.map((quiz) => (
                  <DraggableAvailableQuiz
                    key={quiz.id}
                    quiz={quiz}
                    onSelect={() => handleSelectQuiz(quiz)}
                    onPreview={() => handlePreviewQuiz(quiz)}
                  />
                ))}
              </SortableContext>
              {availableQuizzes.length === 0 && (
                <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400">
                      <p>All templates have been added to your bundle</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Your Quiz Bundle */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Your Quiz Bundle</h3>
              <div className="text-sm text-gray-600">
                {selectedQuizzes.length} quizzes • ~{selectedTotalTime} min
              </div>
            </div>
            
            <div id="quiz-bundle-droppable" className="space-y-3 min-h-[400px] p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
              {selectedQuizzes.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Plus className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-medium">Drop quiz templates here</p>
                    <p className="text-sm">Or use the + button to add them</p>
                  </div>
                </div>
              ) : (
                <SortableContext items={selectedQuizzes.map(q => q.id)} strategy={verticalListSortingStrategy}>
                  {selectedQuizzes.map((quiz) => (
                    <SortableQuizItem
                      key={quiz.id}
                      quiz={quiz}
                      onEdit={() => handleEditQuiz(quiz)}
                      onRemove={() => handleRemoveQuiz(quiz.id)}
                      onPreview={() => handlePreviewQuiz(quiz)}
                    />
                  ))}
                </SortableContext>
              )}

              {/* Add Custom Quiz Button */}
              <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
                <CardContent className="p-4">
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={handleAddCustomQuiz}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Quiz
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Continue Button */}
            {selectedQuizzes.length > 0 && (
              <div className="pt-4">
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-[#ff5f1b] hover:bg-[#e54e0f]"
                  size="lg"
                >
                  Continue with Selected Quizzes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="p-4 bg-white border rounded-lg shadow-lg opacity-90">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">
                  {activeId.startsWith('available-') 
                    ? availableQuizzes.find(q => q.id === activeId.replace('available-', ''))?.title
                    : selectedQuizzes.find(q => q.id === activeId)?.title
                  }
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Quiz Preview Modal */}
      <QuizPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        quiz={{
          title: previewQuiz?.title || '',
          description: previewQuiz?.description || '',
          questionsList: previewQuiz?.questionsList || [],
          timeLimit: { hours: 0, minutes: parseInt(previewQuiz?.timeEstimate || '0'), seconds: 0 }
        }}
      />
    </div>
  );
}
