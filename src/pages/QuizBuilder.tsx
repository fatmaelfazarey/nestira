import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { QuizCreator } from '@/components/QuizCreator';
import { QuizPreviewModal } from '@/components/quiz/QuizPreviewModal';
import { QuizAssignModal } from '@/components/quiz/QuizAssignModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Play, ArrowLeft, UserPlus, Users, CheckCircle, XCircle, Search, Filter, Flame, Landmark, BrainCog, MessagesSquare, GanttChartSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const QuizBuilder = () => {
  const [showCreator, setShowCreator] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [previewQuiz, setPreviewQuiz] = useState<any>(null);
  const [assignQuiz, setAssignQuiz] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [trendingOnly, setTrendingOnly] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
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
      skills: ['Financial Math', 'Financial Planning & Analysis (FP&A)'],
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
      skills: ['Microsoft Excel (Advanced)', 'Financial Modeling in Excel'],
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
      skills: ['Internal Auditing / ISAs', 'Critical Thinking', 'Problem Solving'],
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

  const skillCategories = [
    {
      name: 'Finance, Auditing & Accounting Skills',
      icon: Landmark,
      skills: [
        'Financial Accounting (IFRS)', 'Financial Accounting (US GAAP)', 'Accounts Payable / Receivable (AP/AR)', 'Costing of Products and Services', 'Financial Math', 'Budgeting', 'Financial Planning & Analysis (FP&A)', 'Advanced Accounting (IFRS / GAAP)', 'Internal Auditing / ISAs', 'Financial Due Diligence', 'Financial Modeling in Excel'
      ]
    },
    {
      name: 'Behavioral & Cognitive Tests',
      icon: BrainCog,
      skills: [
        'DISC', 'Big 5 (OCEAN)', 'Culture Add', 'Behavioral Competency Profiler', 'Problem Solving', 'Critical Thinking', 'Numerical Reasoning'
      ]
    },
    {
      name: 'Communication & Interpersonal',
      icon: MessagesSquare,
      skills: [
        'Communication', 'Active Listening', 'Presentation Skills'
      ]
    },
    {
      name: 'Tools Proficiency',
      icon: GanttChartSquare,
      skills: [
        'Microsoft Excel (Advanced)', 'Power BI', 'QuickBooks / Xero'
      ]
    }
  ];

  const handleSkillChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter(s => s !== skill);
    setSelectedSkills(newSkills);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterSource('all');
    setTrendingOnly(false);
    setSelectedSkills([]);
  };

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
    const skillMatch = selectedSkills.length === 0 || selectedSkills.every(skill => quiz.skills?.includes(skill));
    return titleMatch && sourceMatch && trendingMatch && skillMatch;
  });

  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (filterSource !== 'all' ? 1 : 0) +
    (trendingOnly ? 1 : 0) +
    (selectedSkills.length > 0 ? 1 : 0);

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <Card className="border-orange-200 bg-orange-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-orange-500" />
                  <span className="text-lg font-semibold text-gray-800">Filters & Sorting</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <Label htmlFor="trending-switch" className="font-semibold text-gray-700">Trending</Label>
                  <Switch
                    id="trending-switch"
                    checked={trendingOnly}
                    onCheckedChange={setTrendingOnly}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">Source</Label>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={filterSource}
                    onValueChange={(value) => { if (value) setFilterSource(value); }}
                    className="flex flex-col items-start gap-2"
                    aria-label="Filter quizzes by source"
                  >
                    <ToggleGroupItem value="all" className="w-full justify-start">Show All</ToggleGroupItem>
                    <ToggleGroupItem value="Nestira" className="w-full justify-start">Made by Nestira</ToggleGroupItem>
                    <ToggleGroupItem value="Me" className="w-full justify-start">Made by Me</ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="search-job-title" className="font-semibold text-gray-700">Filter by job title</Label>
                   <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="search-job-title"
                      placeholder="e.g. Financial Analyst"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold text-gray-700">Filter by Skills</Label>
                  <Accordion type="multiple" className="w-full">
                    {skillCategories.map((category) => (
                      <AccordionItem value={category.name} key={category.name}>
                        <AccordionTrigger className="text-sm font-medium hover:no-underline py-2">
                          <div className="flex items-center gap-2">
                            <category.icon className="w-4 h-4 text-orange-500" />
                            <span className="text-xs">{category.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pl-4 pb-2">
                          <div className="space-y-2">
                            {category.skills.map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`skill-${skill}`}
                                  checked={selectedSkills.includes(skill)}
                                  onCheckedChange={(checked) => {
                                    handleSkillChange(skill, !!checked);
                                  }}
                                />
                                <Label
                                  htmlFor={`skill-${skill}`}
                                  className="text-xs font-normal text-gray-600 cursor-pointer"
                                >
                                  {skill}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <Button variant="outline" onClick={handleResetFilters} className="w-full">
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quiz Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {Object.keys(groupedQuizzes).length > 0 ? (
                Object.entries(groupedQuizzes).map(([jobTitle, quizzesInGroup]) => (
                  <div key={jobTitle}>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 px-1">{jobTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
