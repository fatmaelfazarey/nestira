
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Settings, Clock, Eye, Edit, Trash2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface QuizBundleSelectionProps {
  roleTitle: string;
  onPathSelected: (path: 'bundle' | 'custom', data?: any) => void;
}

interface BundleQuiz {
  id: string;
  title: string;
  tags: string[];
  timeEstimate: string;
  description: string;
}

const suggestedBundle: BundleQuiz[] = [
  {
    id: 'finance-technical',
    title: 'Finance Technical',
    tags: ['IFRS', 'Financial Analysis', 'Budgeting'],
    timeEstimate: '25 min',
    description: 'Core financial knowledge and technical skills'
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    tags: ['Communication', 'Problem Solving', 'Leadership'],
    timeEstimate: '15 min',
    description: 'Essential interpersonal and communication abilities'
  },
  {
    id: 'culture-fit',
    title: 'Culture Fit',
    tags: ['Values', 'Work Style', 'Team Dynamics'],
    timeEstimate: '10 min',
    description: 'Alignment with company culture and values'
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    tags: ['Critical Thinking', 'Analysis', 'Decision Making'],
    timeEstimate: '20 min',
    description: 'Cognitive abilities and analytical thinking'
  },
  {
    id: 'tools-software',
    title: 'Tools & Software',
    tags: ['Excel', 'SAP', 'PowerBI'],
    timeEstimate: '30 min',
    description: 'Proficiency with relevant tools and software'
  }
];

export function QuizBundleSelection({ roleTitle, onPathSelected }: QuizBundleSelectionProps) {
  const [selectedPath, setSelectedPath] = useState<'bundle' | 'custom' | null>(null);
  const [bundleQuizzes, setBundleQuizzes] = useState<BundleQuiz[]>(suggestedBundle);
  const [viewingQuiz, setViewingQuiz] = useState<BundleQuiz | null>(null);

  const totalTime = bundleQuizzes.reduce((acc, quiz) => {
    const minutes = parseInt(quiz.timeEstimate);
    return acc + minutes;
  }, 0);

  const handlePathSelection = (path: 'bundle' | 'custom') => {
    setSelectedPath(path);
  };

  const handleViewQuiz = (e: React.MouseEvent, quiz: BundleQuiz) => {
    e.stopPropagation();
    console.log('Viewing quiz:', quiz);
    setViewingQuiz(quiz);
    toast.success(`Viewing ${quiz.title}`, {
      description: quiz.description
    });
  };

  const handleEditQuiz = (e: React.MouseEvent, quiz: BundleQuiz) => {
    e.stopPropagation();
    console.log('Editing quiz:', quiz);
    toast.info(`Opening ${quiz.title} for editing`, {
      description: 'Quiz customization would open here'
    });
  };

  const handleDeleteQuiz = (e: React.MouseEvent, quizId: string) => {
    e.stopPropagation();
    const quiz = bundleQuizzes.find(q => q.id === quizId);
    if (quiz) {
      setBundleQuizzes(prev => prev.filter(q => q.id !== quizId));
      toast.success(`${quiz.title} removed`, {
        description: 'Quiz has been removed from the bundle'
      });
    }
  };

  const handleUseBundleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bundleQuizzes.length === 0) {
      toast.error('Cannot proceed with empty bundle', {
        description: 'Please add at least one quiz to continue'
      });
      return;
    }
    
    console.log('Using bundle with quizzes:', bundleQuizzes);
    toast.success('Using suggested bundle', {
      description: `Proceeding with ${bundleQuizzes.length} quizzes`
    });
    onPathSelected('bundle', { bundle: bundleQuizzes });
  };

  const handleStartBuildingClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Starting custom quiz builder');
    toast.info('Starting custom quiz builder', {
      description: 'Opening quiz customization tools'
    });
    onPathSelected('custom');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Quiz Creation Path</h2>
        <p className="text-gray-600">
          Based on <strong>{roleTitle}</strong>, here are your options:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Suggested Bundle Path */}
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
                <CardTitle className="text-xl">✅ Suggested Bundle</CardTitle>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generated based on role, seniority & function</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-600">
              Here's a recommended quiz bundle for <strong>{roleTitle}</strong>
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <Clock className="w-4 h-4" />
              <span>Total Time: ~{totalTime} minutes</span>
              <Badge variant="secondary">{bundleQuizzes.length} quizzes</Badge>
            </div>

            <div className="space-y-3">
              {bundleQuizzes.map((quiz) => (
                <div key={quiz.id} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{quiz.title}</h4>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-100"
                        onClick={(e) => handleViewQuiz(e, quiz)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-green-100"
                        onClick={(e) => handleEditQuiz(e, quiz)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-red-100"
                        onClick={(e) => handleDeleteQuiz(e, quiz.id)}
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
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
                </div>
              ))}
            </div>

            {selectedPath === 'bundle' && (
              <Button 
                onClick={handleUseBundleClick}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Use This Bundle
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Build Your Own Path */}
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
              <CardTitle className="text-xl">✏️ Build Your Own</CardTitle>
            </div>
            <p className="text-gray-600">
              Customize your quiz with specific tests and questions
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <h4 className="font-medium text-gray-700">Full Customization</h4>
                <p className="text-sm text-gray-500 mt-1">
                  You'll be able to:
                </p>
              </div>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Select tests from category dropdowns
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Browse AI-suggested questions based on role
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Add custom questions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  Control quiz structure and timing
                </li>
              </ul>
            </div>

            {selectedPath === 'custom' && (
              <Button 
                onClick={handleStartBuildingClick}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                Start Building
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {viewingQuiz && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
          <h3 className="font-semibold text-blue-800 mb-2">Currently Viewing: {viewingQuiz.title}</h3>
          <p className="text-blue-700 text-sm">{viewingQuiz.description}</p>
          <div className="flex gap-2 mt-2">
            {viewingQuiz.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3"
            onClick={() => setViewingQuiz(null)}
          >
            Close Preview
          </Button>
        </div>
      )}
    </div>
  );
}
