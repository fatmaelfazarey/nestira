import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Settings, Clock, Eye, Edit, Trash2, Info, Plus, ArrowRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

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
}

const suggestedBundle: BundleQuiz[] = [
  {
    id: 'finance-technical',
    title: 'Finance Technical',
    tags: ['IFRS', 'Financial Analysis', 'Budgeting'],
    timeEstimate: '25 min',
    description: 'Core financial knowledge and technical skills',
    icon: '📊'
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    tags: ['Communication', 'Problem Solving', 'Leadership'],
    timeEstimate: '15 min',
    description: 'Essential interpersonal and communication abilities',
    icon: '🤝'
  },
  {
    id: 'culture-fit',
    title: 'Culture Fit',
    tags: ['Values', 'Work Style', 'Team Dynamics'],
    timeEstimate: '10 min',
    description: 'Alignment with company culture and values',
    icon: '🏢'
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    tags: ['Critical Thinking', 'Analysis', 'Decision Making'],
    timeEstimate: '20 min',
    description: 'Cognitive abilities and analytical thinking',
    icon: '🧠'
  },
  {
    id: 'tools-software',
    title: 'Tools & Software',
    tags: ['Excel', 'SAP', 'PowerBI'],
    timeEstimate: '30 min',
    description: 'Proficiency with relevant tools and software',
    icon: '💻'
  }
];

export function QuizBundleSelection({ roleTitle, onPathSelected }: QuizBundleSelectionProps) {
  const [selectedPath, setSelectedPath] = useState<'bundle' | 'custom' | 'mixed' | null>(null);
  const [bundleQuizzes, setBundleQuizzes] = useState<BundleQuiz[]>(suggestedBundle);
  const [selectedQuizzes, setSelectedQuizzes] = useState<BundleQuiz[]>([]);
  const [customQuizzes, setCustomQuizzes] = useState<BundleQuiz[]>([]);

  const totalTime = bundleQuizzes.reduce((acc, quiz) => {
    const minutes = parseInt(quiz.timeEstimate);
    return acc + minutes;
  }, 0);

  const selectedTotalTime = [...selectedQuizzes, ...customQuizzes].reduce((acc, quiz) => {
    const minutes = parseInt(quiz.timeEstimate);
    return acc + minutes;
  }, 0);

  const handlePathSelection = (path: 'bundle' | 'custom' | 'mixed') => {
    setSelectedPath(path);
    if (path === 'bundle') {
      onPathSelected(path, { bundle: bundleQuizzes });
    } else if (path === 'custom') {
      onPathSelected(path);
    } else if (path === 'mixed') {
      // Keep the current state for mixed mode
    }
  };

  const handleViewQuiz = (quiz: BundleQuiz) => {
    toast.info(`Viewing ${quiz.title} quiz details`);
    console.log('Viewing quiz:', quiz);
  };

  const handleEditQuiz = (quiz: BundleQuiz) => {
    toast.info(`Opening ${quiz.title} for editing`);
    console.log('Editing quiz:', quiz);
  };

  const handleDeleteQuiz = (quizId: string) => {
    setBundleQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
    toast.success('Quiz removed from bundle');
  };

  const handleSelectQuiz = (quiz: BundleQuiz) => {
    setSelectedQuizzes(prev => [...prev, quiz]);
    setBundleQuizzes(prev => prev.filter(q => q.id !== quiz.id));
    toast.success(`${quiz.title} added to your quiz`);
  };

  const handleDeselectQuiz = (quiz: BundleQuiz) => {
    setSelectedQuizzes(prev => prev.filter(q => q.id !== quiz.id));
    setBundleQuizzes(prev => [...prev, quiz]);
    toast.info(`${quiz.title} removed from your quiz`);
  };

  const handleAddCustomQuiz = () => {
    const newQuiz: BundleQuiz = {
      id: `custom-${Date.now()}`,
      title: 'Custom Quiz',
      tags: ['Custom'],
      timeEstimate: '15 min',
      description: 'Your custom quiz',
      icon: '✏️'
    };
    setCustomQuizzes(prev => [...prev, newQuiz]);
    toast.success('Custom quiz added');
  };

  const handleRemoveCustomQuiz = (quizId: string) => {
    setCustomQuizzes(prev => prev.filter(quiz => quiz.id !== quizId));
    toast.success('Custom quiz removed');
  };

  const handleFinalizeMixed = () => {
    const allSelectedQuizzes = [...selectedQuizzes, ...customQuizzes];
    onPathSelected('mixed', { 
      selectedQuizzes: allSelectedQuizzes,
      roleTitle 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Quiz Creation Path</h2>
        <p className="text-gray-600">
          Based on <strong>{roleTitle}</strong>, here are your options:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Bundle */}
        <Card 
          className={`cursor-pointer transition-all ${
            selectedPath === 'bundle' 
              ? 'ring-2 ring-blue-500 border-blue-200 shadow-lg' 
              : 'hover:shadow-md'
          }`}
          onClick={() => handlePathSelection('bundle')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-lg">✅ Use Recommended</CardTitle>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Complete bundle ready to use</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-600 text-sm">
              Use our complete quiz bundle for <strong>{roleTitle}</strong>
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>Total Time: ~{totalTime} minutes</span>
              <Badge variant="secondary">{bundleQuizzes.length} quizzes</Badge>
            </div>

            {selectedPath === 'bundle' && (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePathSelection('bundle');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Use Complete Bundle
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Mix & Match - NEW */}
        <Card 
          className={`cursor-pointer transition-all ${
            selectedPath === 'mixed' 
              ? 'ring-2 ring-[#ff5f1b] border-orange-200 shadow-lg' 
              : 'hover:shadow-md'
          }`}
          onClick={() => handlePathSelection('mixed')}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="text-2xl">🎯</div>
              <CardTitle className="text-lg">⚡ Mix & Match</CardTitle>
            </div>
            <p className="text-gray-600 text-sm">
              Combine recommended quizzes with your own custom tests
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border-2 border-dashed border-orange-200 rounded-lg text-center bg-orange-50">
                <div className="text-2xl mb-2">🔧</div>
                <h4 className="font-medium text-gray-700">Best of Both Worlds</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Pick & choose from our suggestions, plus add your own
                </p>
              </div>
            </div>

            {selectedPath === 'mixed' && (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePathSelection('mixed');
                }}
                className="w-full bg-[#ff5f1b] hover:bg-[#e54e0f]"
                size="lg"
              >
                Start Mixing
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Build From Scratch */}
        <Card 
          className={`cursor-pointer transition-all ${
            selectedPath === 'custom' 
              ? 'ring-2 ring-purple-500 border-purple-200 shadow-lg' 
              : 'hover:shadow-md'
          }`}
          onClick={() => handlePathSelection('custom')}
        >
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-600" />
              <CardTitle className="text-lg">✏️ Start From Scratch</CardTitle>
            </div>
            <p className="text-gray-600 text-sm">
              Build completely custom quiz with full control
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-700">Full Customization</h4>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Create questions from scratch
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  AI-suggested questions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Complete control over structure
                </li>
              </ul>
            </div>

            {selectedPath === 'custom' && (
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePathSelection('custom');
                }}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Start Building
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mix & Match Interface */}
      {selectedPath === 'mixed' && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Quizzes */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Available Quiz Templates</h3>
              <div className="space-y-3">
                {bundleQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{quiz.icon}</span>
                          <h4 className="font-medium">{quiz.title}</h4>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewQuiz(quiz)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSelectQuiz(quiz)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{quiz.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {quiz.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{quiz.timeEstimate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Selected Quizzes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Your Quiz Bundle</h3>
                <div className="text-sm text-gray-600">
                  {selectedQuizzes.length + customQuizzes.length} quizzes • ~{selectedTotalTime} min
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Selected Template Quizzes */}
                {selectedQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{quiz.icon}</span>
                          <h4 className="font-medium">{quiz.title}</h4>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditQuiz(quiz)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeselectQuiz(quiz)}
                          >
                            <Trash2 className="w-3 h-3" />
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
                        <span className="text-xs text-gray-500">{quiz.timeEstimate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Custom Quizzes */}
                {customQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{quiz.icon}</span>
                          <h4 className="font-medium">{quiz.title}</h4>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditQuiz(quiz)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveCustomQuiz(quiz.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">Custom</Badge>
                        <span className="text-xs text-gray-500">{quiz.timeEstimate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

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

                {/* Continue Button */}
                {(selectedQuizzes.length > 0 || customQuizzes.length > 0) && (
                  <div className="pt-4">
                    <Button 
                      onClick={handleFinalizeMixed}
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
          </div>
        </div>
      )}
    </div>
  );
}
