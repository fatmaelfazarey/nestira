
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
            <div className="flex gap-3">
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

export function QuizBundleSelection({ roleTitle, onPathSelected }: QuizBundleSelectionProps) {
  const [availableQuizzes, setAvailableQuizzes] = useState<BundleQuiz[]>(suggestedBundle);
  const [selectedQuizzes, setSelectedQuizzes] = useState<BundleQuiz[]>([]);
  const [previewQuiz, setPreviewQuiz] = useState<BundleQuiz | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

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
    toast.info(`Editing ${quiz.title} - This would open the quiz editor`);
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = selectedQuizzes.findIndex((item) => item.id === active.id);
      const newIndex = selectedQuizzes.findIndex((item) => item.id === over?.id);
      const reorderedQuizzes = arrayMove(selectedQuizzes, oldIndex, newIndex);
      setSelectedQuizzes(reorderedQuizzes);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Quiz Templates */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Available Quiz Templates</h3>
          <div className="space-y-3">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="bg-blue-50 border border-blue-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{quiz.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{quiz.title}</h4>
                        <p className="text-sm text-gray-600">{quiz.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewQuiz(quiz);
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
                          handleSelectQuiz(quiz);
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
            ))}
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
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-3 min-h-[400px]">
              {selectedQuizzes.length === 0 ? (
                <Card className="border-2 border-dashed border-gray-300 bg-gray-50 h-full flex items-center justify-center">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <Plus className="w-12 h-12 mx-auto mb-2" />
                      <p>No quizzes selected yet</p>
                      <p className="text-sm">Add templates from the left or create custom quizzes</p>
                    </div>
                  </CardContent>
                </Card>
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

            <DragOverlay>
              {activeId ? (
                <div className="p-4 bg-white border rounded-lg shadow-lg opacity-90">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">
                      {selectedQuizzes.find(q => q.id === activeId)?.title}
                    </span>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

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
