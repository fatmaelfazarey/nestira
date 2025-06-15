import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { QuizCreator } from '@/components/QuizCreator';
import { QuizPreviewModal } from '@/components/quiz/QuizPreviewModal';
import { QuizAssignModal } from '@/components/quiz/QuizAssignModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Play, ArrowLeft, UserPlus, Users, CheckCircle, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { QuizFilters } from '@/components/quiz/QuizFilters';

const QuizBuilder = () => {
  const [showCreator, setShowCreator] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [previewQuiz, setPreviewQuiz] = useState<any>(null);
  const [assignQuiz, setAssignQuiz] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [trendingOnly, setTrendingOnly] = useState(false);
  const [quizzes, setQuizzes] = useState([
    { 
      id: 1, 
      title: 'Financial Analysis Basics', 
      description: 'Test basic financial analysis skills',
      questions: 15, 
      duration: '30 min', 
      status: 'Active', 
      isActive: true,
      assignedCandidates: 12,
      passedCandidates: 8,
      failedCandidates: 3,
      pendingCandidates: 1,
      source: 'Nestira',
      isTrending: true,
      personalizationParams: { jobTitle: 'Financial Analyst' },
      questionsList: [
        { 
          id: 'q1', 
          text: 'What is the primary purpose of financial analysis?', 
          type: 'multiple-choice', 
          options: ['To predict stock prices', 'To evaluate financial performance', 'To calculate taxes', 'To prepare budgets'],
          correctAnswer: 'To evaluate financial performance'
        },
        { 
          id: 'q2', 
          text: 'A current ratio of 2.5 indicates good liquidity.', 
          type: 'true-false', 
          correctAnswer: 'True'
        }
      ],
      timeLimit: { hours: 0, minutes: 30, seconds: 0 }
    },
    { 
      id: 2, 
      title: 'Excel for Finance', 
      description: 'Advanced Excel skills assessment',
      questions: 20, 
      duration: '45 min', 
      status: 'Draft', 
      isActive: false,
      assignedCandidates: 0,
      passedCandidates: 0,
      failedCandidates: 0,
      pendingCandidates: 0,
      source: 'Nestira',
      isTrending: false,
      personalizationParams: { jobTitle: 'Financial Analyst' },
      questionsList: [
        { 
          id: 'q3', 
          text: 'Which Excel function is used to calculate net present value?', 
          type: 'multiple-choice', 
          options: ['NPV', 'PV', 'FV', 'IRR'],
          correctAnswer: 'NPV'
        }
      ],
      timeLimit: { hours: 0, minutes: 45, seconds: 0 }
    },
    { 
      id: 3, 
      title: 'Risk Management', 
      description: 'Risk assessment and management principles',
      questions: 12, 
      duration: '25 min', 
      status: 'Active', 
      isActive: true,
      assignedCandidates: 5,
      passedCandidates: 4,
      failedCandidates: 1,
      pendingCandidates: 0,
      source: 'Me',
      isTrending: true,
      personalizationParams: { jobTitle: 'Risk Manager' },
      questionsList: [
        { 
          id: 'q4', 
          text: 'Describe the difference between systematic and unsystematic risk.', 
          type: 'short-answer',
          correctAnswer: 'Systematic risk affects the entire market, while unsystematic risk is specific to individual companies or sectors.'
        }
      ],
      timeLimit: { hours: 0, minutes: 25, seconds: 0 }
    },
  ]);

  const handleSaveQuiz = (newQuiz: any) => {
    if (editingQuiz) {
      // Update existing quiz, preserving fields like 'source'
      setQuizzes(prev => prev.map(quiz => 
        quiz.id === editingQuiz.id ? { ...quiz, ...newQuiz } : quiz
      ));
      toast.success('Quiz updated successfully!');
    } else {
      // Create new quiz
      setQuizzes(prev => [...prev, { ...newQuiz, isActive: false, source: 'Me' }]);
      toast.success('Quiz created successfully!');
    }
    setShowCreator(false);
    setEditingQuiz(null);
  };

  const toggleQuizActive = (quizId: number) => {
    setQuizzes(prev => prev.map(quiz => 
      quiz.id === quizId 
        ? { ...quiz, isActive: !quiz.isActive, status: !quiz.isActive ? 'Active' : 'Draft' }
        : quiz
    ));
  };

  const assignQuizToCandidates = (quiz: any, candidateIds: string[]) => {
    console.log('Assigning quiz:', quiz.title, 'to candidates:', candidateIds);
    toast.success(`Quiz "${quiz.title}" assigned to ${candidateIds.length} candidate(s)!`);
    setAssignQuiz(null);
  };

  const previewQuizHandler = (quiz: any) => {
    console.log('Opening preview for quiz:', quiz);
    setPreviewQuiz(quiz);
  };

  const editQuizHandler = (quiz: any) => {
    console.log('Opening edit for quiz:', quiz);
    setEditingQuiz(quiz);
    setShowCreator(true);
  };

  const assignQuizHandler = (quiz: any) => {
    console.log('Opening assign for quiz:', quiz);
    setAssignQuiz(quiz);
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    const titleMatch = (quiz.personalizationParams?.jobTitle ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    const sourceMatch = filterSource === 'all' || quiz.source === filterSource;
    const trendingMatch = !trendingOnly || quiz.isTrending;
    return titleMatch && sourceMatch && trendingMatch;
  });

  const groupedQuizzes = filteredQuizzes.reduce((acc, quiz) => {
    const jobTitle = quiz.personalizationParams?.jobTitle || 'Other';
    if (!acc[jobTitle]) {
      acc[jobTitle] = [];
    }
    acc[jobTitle].push(quiz);
    return acc;
  }, {} as Record<string, typeof quizzes>);

  if (showCreator) {
    return (
      <DashboardLayout>
        <QuizCreator 
          onSave={handleSaveQuiz}
          onCancel={() => {
            setShowCreator(false);
            setEditingQuiz(null);
          }}
          editingQuiz={editingQuiz}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Builder</h1>
            <p className="text-gray-600">Create and manage assessment quizzes</p>
          </div>
          <Button 
            className="bg-accent hover:bg-accent/90 text-white"
            onClick={() => setShowCreator(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Quiz
          </Button>
        </div>

        <QuizFilters
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          filterSource={filterSource}
          onFilterSourceChange={setFilterSource}
          trendingOnly={trendingOnly}
          onTrendingOnlyChange={setTrendingOnly}
        />

        <div className="space-y-8">
          {Object.keys(groupedQuizzes).length > 0 ? (
            Object.entries(groupedQuizzes).map(([jobTitle, quizzesInGroup]) => (
              <div key={jobTitle}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 px-1">{jobTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quizzesInGroup.map((quiz) => (
                    <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{quiz.title}</CardTitle>
                            {quiz.assignedCandidates > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {quiz.assignedCandidates} assigned
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={quiz.isActive}
                              onCheckedChange={() => toggleQuizActive(quiz.id)}
                            />
                            <span className="text-xs text-gray-500">
                              {quiz.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{quiz.questions} questions</span>
                          <span>{quiz.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            quiz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {quiz.status}
                          </span>
                        </div>
                        
                        {/* Candidate Statistics */}
                        {quiz.assignedCandidates > 0 && (
                          <div className="space-y-2 pt-2 border-t">
                            <div className="flex gap-4 text-xs">
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                <span>Passed: {quiz.passedCandidates}</span>
                              </div>
                              <div className="flex items-center gap-1 text-red-600">
                                <XCircle className="w-3 h-3" />
                                <span>Failed: {quiz.failedCandidates}</span>
                              </div>
                              {quiz.pendingCandidates > 0 && (
                                <div className="flex items-center gap-1 text-orange-600">
                                  <span>Pending: {quiz.pendingCandidates}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2 flex-wrap">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => editQuizHandler(quiz)}
                          >
                            <Settings className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => previewQuizHandler(quiz)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          {quiz.isActive && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => assignQuizHandler(quiz)}
                            >
                              <UserPlus className="w-4 h-4 mr-1" />
                              Assign
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No quizzes match your filters.</p>
            </div>
          )}
        </div>
      </div>

      {previewQuiz && (
        <QuizPreviewModal
          isOpen={!!previewQuiz}
          onClose={() => setPreviewQuiz(null)}
          quiz={previewQuiz}
        />
      )}

      {assignQuiz && (
        <QuizAssignModal
          isOpen={!!assignQuiz}
          onClose={() => setAssignQuiz(null)}
          quiz={assignQuiz}
          onAssign={assignQuizToCandidates}
        />
      )}
    </DashboardLayout>
  );
};

export default QuizBuilder;
