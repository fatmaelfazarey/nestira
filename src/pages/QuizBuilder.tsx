
import { useEffect, useState } from 'react';
// import { DashboardLayout } from '@/components/DashboardLayout';
import { QuizCreator } from '@/components/QuizCreator';
import { QuizPreviewModal } from '@/components/quiz/QuizPreviewModal';
import { QuizAssignModal } from '@/components/quiz/QuizAssignModal';
import { QuizEditModal } from '@/components/quiz/QuizEditModal';
import { QuizFilters } from '@/components/quiz/QuizFilters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Play, UserPlus, CheckCircle, XCircle, Filter, Landmark, BrainCog, MessagesSquare, GanttChartSquare, Edit, Trash2, Sigma, SigmaIcon, SquareSigmaIcon, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { useNavigate } from 'react-router-dom';

const QuizBuilder = () => {
  const [showCreator, setShowCreator] = useState(false);
  const [previewQuiz, setPreviewQuiz] = useState<any>(null);
  const [assignQuiz, setAssignQuiz] = useState<any>(null);
  const [editQuiz, setEditQuiz] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSource, setFilterSource] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [asignCandidates, setAssignCandidates] = useState()
  const { addQuiz, getAllQuizzes, updatedQuizData, updateQuizStatus, deleteQuiz, getCandidatesForQuiz, assignCandidates } = useEmployerStore();
  const [quizzes, setQuizzes] = useState([
    // { 
    //     id: 1, 
    //     title: 'Financial Analysis Basics', 
    //     description: 'Test basic financial analysis skills',
    //     questions: 15, 
    //     duration: '30 min', 
    //     status: 'Active', 
    //     isActive: true,
    //     assignedCandidates: 12,
    //     passedCandidates: 8,
    //     failedCandidates: 3,
    //     pendingCandidates: 1,
    //     source: 'Nestira',
    //     personalizationParams: { jobTitle: 'Financial Analyst' },
    //     skills: ['Financial Math', 'Financial Planning & Analysis (FP&A)'],
    //     questionsList: [
    //       { 
    //         id: 'q1', 
    //         text: 'What is the primary purpose of financial analysis?', 
    //         type: 'multiple-choice', 
    //         options: ['To predict stock prices', 'To evaluate financial performance', 'To calculate taxes', 'To prepare budgets'],
    //         correctAnswer: 'To evaluate financial performance'
    //       },
    //       { 
    //         id: 'q2', 
    //         text: 'A current ratio of 2.5 indicates good liquidity.', 
    //         type: 'true-false', 
    //         correctAnswer: 'True'
    //       }
    //     ],
    //     timeLimit: { hours: 0, minutes: 30, seconds: 0 }
    //   },
    //   { 
    //     id: 2, 
    //     title: 'Excel for Finance', 
    //     description: 'Advanced Excel skills assessment',
    //     questions: 20, 
    //     duration: '45 min', 
    //     status: 'Draft', 
    //     isActive: false,
    //     assignedCandidates: 0,
    //     passedCandidates: 0,
    //     failedCandidates: 0,
    //     pendingCandidates: 0,
    //     source: 'Nestira',

    //     personalizationParams: { jobTitle: 'Financial Analyst' },
    //     skills: ['Microsoft Excel (Advanced)', 'Financial Modeling in Excel'],
    //     questionsList: [
    //       { 
    //         id: 'q3', 
    //         text: 'Which Excel function is used to calculate net present value?', 
    //         type: 'multiple-choice', 
    //         options: ['NPV', 'PV', 'FV', 'IRR'],
    //         correctAnswer: 'NPV'
    //       }
    //     ],
    //     timeLimit: { hours: 0, minutes: 45, seconds: 0 }
    //   },
    //   { 
    //     id: 3, 
    //     title: 'Risk Management', 
    //     description: 'Risk assessment and management principles',
    //     questions: 12, 
    //     duration: '25 min', 
    //     status: 'Active', 
    //     isActive: true,
    //     assignedCandidates: 5,
    //     passedCandidates: 4,
    //     failedCandidates: 1,
    //     pendingCandidates: 0,
    //     source: 'Me',
    //     personalizationParams: { jobTitle: 'Risk Manager' },
    //     skills: ['Internal Auditing / ISAs', 'Critical Thinking', 'Problem Solving'],
    //     questionsList: [
    //       { 
    //         id: 'q4', 
    //         text: 'Describe the difference between systematic and unsystematic risk.', 
    //         type: 'short-answer',
    //         correctAnswer: 'Systematic risk affects the entire market, while unsystematic risk is specific to individual companies or sectors.'
    //       }
    //     ],
    //     timeLimit: { hours: 0, minutes: 25, seconds: 0 }
    //   },
  ]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const quizzesData = await getAllQuizzes(setQuizzes);
    if (quizzesData.success) {
      toast.success('Get quizzes done');
    } else {
      toast.error('Failed to fetch quizzes');
    }
  }

  // Main submit function
  const handleSubmitQuiz = async (quizData: any) => {
    try {
      console.log('quizData ===== => ', quizData)

      // Simulate sending to Backend
      const addNewQuiz = await addQuiz(quizData);
      if (addNewQuiz.success) {
        toast.success('Quiz created successfully!');
        fetchQuizzes();
      } else {
        // toast.error('Failed to Create new quiz');
        alert('Failed to Create new quiz')
      }
      setShowCreator(false);
      // Create new quiz object
      const newQuiz = {
        id: Math.max(...quizzes.map(q => q.id)) + 1,
        questions: quizData.questions?.length || 0,
        totalTime: `${quizData.timeLimit?.hours * 60 + quizData.timeLimit?.minutes + quizData.timeLimit?.seconds / 60}`,
        status: 'draft',
        isActive: false,
        assignedCandidates: 0,
        passedCandidates: 0,
        failedCandidates: 0,
        pendingCandidates: 0,
        source: 'Me',
        skills: quizData.personalizationParams?.skills || [],
        questionsList: quizData.questions || []
      };



    } catch (error) {
      console.error('❌ Submit error:', error);
      // toast.error('Failed to save quiz');
    }
  };


  // Function to update existing quiz
  const handleUpdateQuiz = async (updatedQuiz: any) => {
    try {
      // console.log('======= UPDATING QUIZ =======');
      // console.log('Updated Quiz Data:', updatedQuiz);
      // console.log('======= END UPDATE DATA =======');

      // await new Promise(resolve => setTimeout(resolve, 1000));

      const isUpdated = await updatedQuizData(updatedQuiz.id, updatedQuiz);
      if (isUpdated.success) {
        toast.success('Quiz updated successfully!');
        fetchQuizzes();
      } else {
        toast.success('Faild to update Quiz');
      }

      // setQuizzes(prev => prev.map(quiz =>
      //   quiz.id === updatedQuiz.id ? { ...quiz, ...updatedQuiz } : quiz
      // ));

      // toast.success('Quiz updated successfully!');
      setEditQuiz(null);

    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update quiz');
    }
  };



  const toggleQuizActive = async (quizId: number, newStatus: string) => {

    const isNewStatus = await updateQuizStatus(quizId, newStatus);
    if (isNewStatus.success) {
      toast.success('Quiz updated successfully!');
      fetchQuizzes();
    } else {
      toast.success('Faild to update Quiz');
    }
    // setQuizzes(prev => prev.map(quiz =>
    //   quiz.id === quizId
    //     ? { ...quiz, isActive: !quiz.isActive, status: !quiz.isActive ? 'active' : 'draft' }
    //     : quiz
    // ));
  };

  const assignQuizToCandidates = async (quiz: any, candidateIds: string[]) => {
    console.log('Assigning quiz:', quiz);
    console.log('to candidates:', candidateIds);

    try {
      const assign = await assignCandidates(quiz.id, candidateIds);
      if (assign.success) {
        toast.success(`Quiz "${quiz.title}" assigned to ${candidateIds.length} candidate(s)!`);
      }
    } catch (error) {
      console.log(error)
    }

    // toast.success(`Quiz "${quiz.title}" assigned to ${candidateIds.length} candidate(s)!`);
    setAssignQuiz(null);
  };

  const previewQuizHandler = (quiz: any) => {
    setPreviewQuiz(quiz);
  };

  const editQuizHandler = (quiz: any) => {
    setEditQuiz(quiz);
  };
  const handleRemoveQuiz = async (quiz: any) => {
    const isDelete = confirm('Are You sure You Want to delete this q');
    if (isDelete) {
      const deleted = await deleteQuiz(quiz.id);
      if (deleted.success) {
        toast.success('Deleted Done');
        fetchQuizzes();
      }
    }

  };

  const assignQuizHandler = async (quiz: any) => {

    console.log('quize assign ========> ', quiz)
    const assignCandidates = await getCandidatesForQuiz(quiz.job_id, setAssignQuiz)
    if (assignCandidates.success) {
      setAssignCandidates(assignCandidates.data)
      setAssignQuiz(quiz);
    } else {
      toast.error('Failed to get Candidates');
    }
    // setAssignQuiz(quiz);
  };

  const navigateToPassedCandidates = (quizId: number) => {
    toast.info('Navigating to passed candidates...');
  };

  const navigateToFailedCandidates = (quizId: number) => {
    toast.info('Navigating to failed candidates...');
  };

  const navigateToPendingCandidates = (quizId: number) => {
    toast.info('Navigating to pending candidates...');
  };

  const filteredQuizzes = Array.isArray(quizzes)
    ? quizzes.filter(quiz => {
      const titleMatch = (quiz.personalizationParams?.jobTitle ?? '').toLowerCase().includes(searchQuery.toLowerCase());
      const sourceMatch = filterSource === 'all' || quiz.source === filterSource;
      const skillMatch = selectedSkills.length === 0 || selectedSkills.every(skill => quiz.skills?.includes(skill));
      return titleMatch && sourceMatch && skillMatch;
    })
    : [];


  const activeFilterCount =
    (searchQuery ? 1 : 0) +
    (filterSource !== 'all' ? 1 : 0) +
    (selectedSkills.length > 0 ? 1 : 0);

  const skillCategories = [
    {
      name: 'Finance, Auditing & Accounting Skills',
      icon: Landmark,
      skills: [
        'Financial Accounting (IFRS)', 'Financial Accounting (US GAAP)', 'Accounts Payable / Receivable (AP/AR)',
        'Costing of Products and Services', 'Financial Math', 'Budgeting', 'Financial Planning & Analysis (FP&A)',
        'Advanced Accounting (IFRS / GAAP)', 'Internal Auditing / ISAs', 'Financial Due Diligence', 'Financial Modeling in Excel'
      ]
    },
    {
      name: 'Behavioral & Cognitive Tests',
      icon: BrainCog,
      skills: [
        'DISC', 'Big 5 (OCEAN)', 'Culture Add', 'Behavioral Competency Profiler',
        'Problem Solving', 'Critical Thinking', 'Numerical Reasoning'
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

  const categorizeQuizBySkills = (quiz: any) => {
    if (!quiz.skills || quiz.skills.length === 0) return 'Other';

    for (const category of skillCategories) {
      if (quiz.skills.some((skill: string) => category.skills.includes(skill))) {
        return category.name;
      }
    }
    return 'Other';
  };

  const groupedQuizzes = filteredQuizzes.reduce((acc, quiz) => {
    const category = categorizeQuizBySkills(quiz);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(quiz);
    return acc;
  }, {} as Record<string, typeof quizzes>);

  if (showCreator) {
    return (
      <div>
        <QuizCreator
          onSave={handleSubmitQuiz}
          onCancel={() => setShowCreator(false)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-start md:items-center md:flex-row flex-col gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Builder</h1>
            <p className="text-gray-600">Create and manage assessment quizzes</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters {activeFilterCount > 0 && (
                <span className="ml-2 bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <Button
              className="bg-[#ff5f1b] hover:bg-[#e54e0f] text-white"
              onClick={() => setShowCreator(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Quiz
            </Button>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="space-y-8">
          {Object.keys(groupedQuizzes).length > 0 ? (
            Object.entries(groupedQuizzes).map(([categoryName, quizzesInGroup]) => {
              const category = skillCategories.find(cat => cat.name === categoryName);
              const IconComponent = category?.icon || Landmark;

              return (
                <div key={categoryName}>
                  <div className="flex items-center gap-3 mb-4 px-1">
                    <IconComponent className="w-6 h-6 text-orange-500" />
                    <h2 className="text-xl font-semibold text-gray-800">{categoryName}</h2>
                  </div>
                  <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex md:flex-row min-w-[300px] md:min-w-min-[400px] flex-wrap">
                    {quizzesInGroup.map((quiz) => (
                      <Card key={quiz.id} className="hover:shadow-md transition-shadow flex-1">
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
                                onCheckedChange={() => toggleQuizActive(quiz.id, quiz.isActive ? 'draft' : 'active')}
                              />
                              <span className="text-xs text-gray-500">
                                {quiz.isActive ? 'active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{quiz.questions} questions</span>
                            <span>{quiz.duration}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${quiz.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                              {quiz.status}
                            </span>
                          </div>

                          {/* Candidate Statistics */}
                          {quiz.assignedCandidates > 0 && (
                            <div className="space-y-2 pt-2 border-t">
                              <div className="flex gap-4 text-xs">
                                <button
                                  className="flex items-center gap-1 text-gray-600 hover:text-gray-700 transition-colors cursor-pointer hover:underline"
                                  onClick={() => navigateToPassedCandidates(quiz.id)}
                                >
                                  <SquareSigmaIcon className="w-3 h-3" />
                                  <span>Assign To: {quiz.assignedCandidates}</span>
                                </button>
                                <button
                                  className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors cursor-pointer hover:underline"
                                  onClick={() => navigateToPassedCandidates(quiz.id)}
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Passed: {quiz.passedCandidates}</span>
                                </button>
                                <button
                                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors cursor-pointer hover:underline"
                                  onClick={() => navigateToFailedCandidates(quiz.id)}
                                >
                                  <XCircle className="w-3 h-3" />
                                  <span>Failed: {quiz.failedCandidates}</span>
                                </button>
                                {quiz.pendingCandidates > 0 && (
                                  <button
                                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition-colors cursor-pointer hover:underline"
                                    onClick={() => navigateToPendingCandidates(quiz.id)}
                                  >
                                    <span>Pending: {quiz.pendingCandidates}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex gap-2 flex-wrap">
                            {/* Edit button */}
                            {quiz.assignedCandidates == 0 && <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editQuizHandler(quiz)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => previewQuizHandler(quiz)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            {
                              quiz.assignedCandidates > 0 && <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`${quiz.id}`)}
                              >

                                <BarChart3 className="w-4 h-4 mr-1" />
                                Quiz Analytics
                              </Button>
                            }

                            {/* <Button
                              variant="outline"
                              size="sm"
                              onClick={() => previewQuizHandler(quiz)}
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Delete
                            </Button> */}



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

                            {quiz.assignedCandidates == 0 && <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveQuiz(quiz)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />Delete
                            </Button>}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })
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
          candidates={asignCandidates}
          onAssign={assignQuizToCandidates}
        />
      )}

      {editQuiz && (
        <QuizEditModal
          isOpen={!!editQuiz}
          onClose={() => setEditQuiz(null)}
          quiz={editQuiz}
          onSave={handleUpdateQuiz}
        />
      )}

      <QuizFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        filterSource={filterSource}
        onFilterSourceChange={setFilterSource}
        selectedSkills={selectedSkills}
        onSelectedSkillsChange={setSelectedSkills}
      />
    </div>
  );
};

export default QuizBuilder;
