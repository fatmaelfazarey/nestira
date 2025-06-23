
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus, ArrowRight } from 'lucide-react';
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
    id: 'soft-skills',
    title: 'Soft Skills',
    tags: ['Communication', 'Problem Solving', 'Leadership'],
    timeEstimate: '15 min',
    description: 'Essential interpersonal and communication abilities',
    icon: '🤝'
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
    id: 'finance-technical',
    title: 'Finance Technical',
    tags: ['IFRS', 'Financial Analysis', 'Budgeting'],
    timeEstimate: '25 min',
    description: 'Core financial knowledge and technical skills',
    icon: '📊'
  }
];

export function QuizBundleSelection({ roleTitle, onPathSelected }: QuizBundleSelectionProps) {
  const [availableQuizzes, setAvailableQuizzes] = useState<BundleQuiz[]>(suggestedBundle);
  const [selectedQuizzes, setSelectedQuizzes] = useState<BundleQuiz[]>([]);

  const selectedTotalTime = selectedQuizzes.reduce((acc, quiz) => {
    const minutes = parseInt(quiz.timeEstimate);
    return acc + minutes;
  }, 0);

  const handleSelectQuiz = (quiz: BundleQuiz) => {
    setSelectedQuizzes(prev => [...prev, quiz]);
    setAvailableQuizzes(prev => prev.filter(q => q.id !== quiz.id));
    toast.success(`${quiz.title} added to your quiz`);
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
    setSelectedQuizzes(prev => [...prev, newQuiz]);
    toast.success('Custom quiz added');
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
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toast.info(`Viewing ${quiz.title} details`)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSelectQuiz(quiz)}
                        className="h-8 w-8 p-0"
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
              <>
                {selectedQuizzes.map((quiz) => (
                  <Card key={quiz.id} className="bg-green-50 border border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{quiz.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{quiz.title}</h4>
                            <p className="text-sm text-gray-600">{quiz.description}</p>
                          </div>
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
              </>
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
    </div>
  );
}
