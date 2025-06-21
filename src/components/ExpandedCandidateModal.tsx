import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, Briefcase, Mail, Phone, Calendar, Download, MessageSquare, StickyNote, X, Shield, Clock, DollarSign, Home, Play, FileText, Eye, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Award, Code, Building, GraduationCap, User, TrendingUp, Info, Brain, HelpCircle, Monitor, MapPinIcon, Camera, Maximize, MousePointer, ExternalLink, Factory, Users, Target, Zap, Lock } from 'lucide-react';
import { useState } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { AssessmentAnswersModal } from './AssessmentAnswersModal';

interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  experience: string;
  score: number;
  status: string;
  tags: string[];
  photo: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  education: string;
  summary: string;
  country: string;
  profileAdded: string;
  salaryExpectation: string;
}

interface ExpandedCandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ExpandedCandidateModal({
  candidate,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite
}: ExpandedCandidateModalProps) {
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuizzes, setSelectedQuizzes] = useState<number[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [showAssessmentAnswers, setShowAssessmentAnswers] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    industry: true,
    financeSubfields: true,
    softwareTools: true,
    certifications: true,
    scenarioContext: false
  });

  if (!candidate) return null;

  const getCountryFlag = (countryCode: string) => {
    const flags: {
      [key: string]: string;
    } = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };

  const isUnlocked = true; // For demo purposes

  const mockExperience = [{
    title: "Senior Financial Analyst",
    company: "Emirates NBD",
    duration: "2021 - Present",
    bullets: ["Led quarterly financial reporting for $2B portfolio", "Implemented SAP FICO modules reducing processing time by 40%"]
  }, {
    title: "Financial Analyst",
    company: "ADNOC",
    duration: "2019 - 2021",
    bullets: ["Managed budget planning for upstream operations", "Developed KPI dashboards using Power BI"]
  }];

  const mockAssessments = [{
    name: "Technical Challenge: Financial Forecasting & Budget Variance Analysis",
    score: 100,
    status: "passed",
    opinion: "Excellent analytical skills in financial modeling and variance analysis. Demonstrated strong understanding of forecasting methodologies and budget management principles.",
    questions: [
      {
        id: 1,
        question: "How would you approach creating a 3-year financial forecast for a company experiencing 15% quarterly growth?",
        options: [
          "Use simple linear projection based on current growth",
          "Apply multiple forecasting methods including scenario analysis and sensitivity testing",
          "Copy last year's budget and add 15% growth",
          "Focus only on revenue growth without considering operational scaling"
        ],
        correctAnswer: 1,
        candidateAnswer: 1,
        isCorrect: true
      },
      {
        id: 2,
        question: "Your department shows a 20% budget variance. What's your systematic approach to analysis?",
        options: ["Blame external market conditions", "Conduct root cause analysis by expense category and timing differences", "Request budget increase for next quarter", "Wait until year-end to address"],
        correctAnswer: 1,
        candidateAnswer: 1,
        isCorrect: true
      }
    ]
  }, {
    name: "Critical Thinking Scenario: Budget Crisis Resolution",
    score: 37,
    status: "needs-improvement",
    opinion: "Shows basic analytical skills but needs improvement in complex problem-solving scenarios and stakeholder management.",
    questions: [
      {
        id: 1,
        question: "Your project is 50% over budget. What's your first action?",
        options: [
          "Cut all non-essential features immediately",
          "Analyze spending to identify the biggest cost drivers",
          "Ask for more budget from stakeholders",
          "Continue as planned and hope for the best"
        ],
        correctAnswer: 1,
        candidateAnswer: 0,
        isCorrect: false
      },
      {
        id: 2,
        question: "How do you communicate budget issues to stakeholders?",
        options: ["Hide the issue", "Present data and solutions", "Blame external factors", "Wait until the end"],
        correctAnswer: 1,
        candidateAnswer: 2,
        isCorrect: false
      }
    ]
  }, {
    name: "Culture Fit Simulation: Team Conflict & Collaboration",
    score: 47,
    status: "needs-improvement", 
    opinion: "Demonstrates some cultural awareness but could benefit from better alignment with company values and conflict resolution skills.",
    questions: [
      {
        id: 1,
        question: "Two team members disagree on project approach. How do you handle it?",
        options: [
          "Let them figure it out themselves",
          "Facilitate a discussion to find common ground",
          "Choose one approach arbitrarily",
          "Escalate to management immediately"
        ],
        correctAnswer: 1,
        candidateAnswer: 0,
        isCorrect: false
      },
      {
        id: 2,
        question: "How do you ensure everyone's voice is heard in meetings?",
        options: ["Let natural leaders speak", "Actively ask for input from all members", "Stick to the agenda only", "Keep meetings short"],
        correctAnswer: 1,
        candidateAnswer: 1,
        isCorrect: true
      }
    ]
  }];

  const antiCheatData = {
    device: "Desktop",
    location: "Lagos (LA), NG",
    filledOnce: false,
    webcamEnabled: true,
    fullScreenActive: true,
    mouseInWindow: true,
    noCopyPaste: true,
    noMinimize: true,
    cameraPosition: "Behind candidate"
  };

  const skillCategories = {
    industry: ["Banking", "Insurance", "Investment Management", "Corporate Finance"],
    financeSubfields: ["Financial Planning", "Budget Management", "Cost Analysis", "Risk Assessment"],
    softwareTools: ["SAP", "Oracle", "QuickBooks", "Tableau", "Power BI", "Excel Advanced"],
    certifications: ["CPA", "CFA Level 2", "FRM", "ACCA"]
  };

  const availableQuizzes = [
    { id: 1, title: "FP&A Assessment", duration: "45 min", difficulty: "Intermediate", category: "Core Finance" },
    { id: 2, title: "Excel Proficiency Test", duration: "30 min", difficulty: "Advanced", category: "Tools" },
    { id: 3, title: "IFRS Compliance Quiz", duration: "25 min", difficulty: "Expert", category: "Core Finance" },
    { id: 4, title: "Financial Modeling Challenge", duration: "60 min", difficulty: "Advanced", category: "Thinking" },
    { id: 5, title: "Risk Management Evaluation", duration: "40 min", difficulty: "Intermediate", category: "Core Finance" }
  ];

  // Mock behavioral data
  const behavioralData = {
    summary: "Collaborative and integrity-driven accountant who prefers clear processes, team input, and supervisory guidance when making complex decisions.",
    keyTraits: [
      { label: "Collaboration-Focused", tooltip: "Tends to seek input from peers before acting", color: "bg-blue-100 text-blue-800" },
      { label: "Process-Oriented", tooltip: "Prefers established procedures and clear guidelines", color: "bg-green-100 text-green-800" },
      { label: "Detail-Conscious", tooltip: "Shows high attention to accuracy and completeness", color: "bg-purple-100 text-purple-800" },
      { label: "Risk-Aware", tooltip: "Considers potential consequences before making decisions", color: "bg-orange-100 text-orange-800" },
      { label: "Team-Dependent", tooltip: "Values team consensus in decision-making", color: "bg-teal-100 text-teal-800" },
      { label: "Structured", tooltip: "Thrives in organized, well-defined environments", color: "bg-indigo-100 text-indigo-800" }
    ],
    traitIndicators: [
      { name: "Risk Tolerance", value: 35, color: "bg-orange-500", level: "Caution" },
      { name: "Decision-Making Style", value: 70, color: "bg-green-500", level: "Strong" },
      { name: "Integrity Signal", value: 85, color: "bg-green-500", level: "Strong" },
      { name: "Peer Dependency", value: 60, color: "bg-yellow-500", level: "Moderate" }
    ],
    cultureFit: "Prefers structured, process-driven teams with clear expectations and collaborative decision-making.",
    environmentFit: [
      { label: "Structured Teams", icon: "🏢" },
      { label: "Cross-functional Work", icon: "🤝" },
      { label: "Deadline-Driven", icon: "⏱️" },
      { label: "Role Clarity", icon: "🎯" }
    ]
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatBlurredName = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0]} ${'*'.repeat(nameParts[1].length)}`;
    }
    return nameParts[0];
  };

  const handleDownloadCV = () => {
    // Generate and download CV PDF
    console.log('Downloading CV PDF for', candidate.name);
  };

  const handleDownloadCoverLetter = () => {
    // Generate and download cover letter PDF
    console.log('Downloading Cover Letter PDF for', candidate.name);
  };

  const handleDownloadProfile = () => {
    // Generate and download profile summary PDF
    console.log('Downloading Profile PDF for', candidate.name);
  };

  const handleAssignQuiz = (quizId: number) => {
    console.log('Assigning quiz', quizId, 'to candidate', candidate.id);
    setShowQuizModal(false);
  };

  const handleQuizSelection = (quizId: number, checked: boolean) => {
    if (checked) {
      setSelectedQuizzes(prev => [...prev, quizId]);
    } else {
      setSelectedQuizzes(prev => prev.filter(id => id !== quizId));
    }
  };

  const handleSelectAll = () => {
    setSelectedQuizzes(availableQuizzes.map(quiz => quiz.id));
  };

  const handleDeselectAll = () => {
    setSelectedQuizzes([]);
  };

  const handleAssignSelected = () => {
    console.log('Assigning quizzes', selectedQuizzes, 'to candidate', candidate.id);
    setShowQuizModal(false);
    setSelectedQuizzes([]);
  };

  const removeSelectedQuiz = (quizId: number) => {
    setSelectedQuizzes(prev => prev.filter(id => id !== quizId));
  };

  const handleBehavioralAssessment = () => {
    window.open('https://chatgpt.com/g/g-6849be2aace4819189a69fa95518fd38-nestira-behavioral-assessment-assistant', '_blank');
  };

  const handleDownloadFitReport = () => {
    console.log('Downloading Behavioral Fit Report for', candidate.name);
  };

  const handleShowAnswers = (assessment: any) => {
    setSelectedAssessment(assessment);
    setShowAssessmentAnswers(true);
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
              <Shield className="w-5 h-5 text-green-500" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onToggleFavorite} className="text-yellow-500 hover:text-yellow-600">
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex h-[calc(95vh-140px)]">
            {/* LEFT SIDEBAR - Fixed Width */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Profile Section */}
                <div className="text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={candidate.photo} alt={candidate.name} />
                      <AvatarFallback className="text-lg font-semibold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {isUnlocked ? candidate.name : formatBlurredName(candidate.name)}
                    </h3>
                    <p className="text-[#ff5f1b] font-medium">{candidate.title}</p>
                    
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{candidate.yearsOfExperience} years</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{candidate.profileAdded}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{candidate.salaryExpectation}</span>
                    </div>

                    {/* Contact Information - Moved here */}
                    <div className="space-y-2 pt-2">
                      {isUnlocked ? (
                        <>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-blue-600 hover:underline cursor-pointer">{candidate.email}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{candidate.phone}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">***@*****.com</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-400">+*** *** ****</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Match Score */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Match Score</h4>
                  <div className="text-center">
                    <CircularProgress 
                      value={candidate.score}
                      size={80}
                      strokeWidth={8}
                      className="mx-auto mb-2"
                    />
                    <p className="text-sm text-gray-600">Overall Match</p>
                  </div>
                </div>

                <Separator />

                {/* View Cover Letter Button */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="w-full text-[#ff5f1b] border-[#ff5f1b] hover:bg-[#ff5f1b] hover:text-white" 
                    onClick={() => setShowCoverLetter(!showCoverLetter)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Cover Letter
                    {showCoverLetter ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                  </Button>
                  
                  {showCoverLetter && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border text-sm">
                      <p className="text-gray-700 mb-2">
                        I am excited to apply for the Financial Analyst position. With my experience in financial planning and analysis...
                      </p>
                      <Button size="sm" variant="outline" onClick={handleDownloadCoverLetter}>
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Job Preferences */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Job Preferences</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium mb-1">Preferred Titles:</p>
                      <p className="text-gray-800">Finance Manager, FP&A Director</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 font-medium mb-1">Preferred Locations:</p>
                      <p className="text-gray-800">Dubai, Abu Dhabi, Riyadh</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">Immediate availability</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">120,000 - 150,000 AED</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">Remote-ready</span>
                    </div>
                    
                    <Badge className="bg-green-100 text-green-800 text-xs">Full-time</Badge>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-[#ff5f1b] hover:bg-[#e5551a] text-white"
                    onClick={() => setShowQuizModal(true)}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Assign Assessment
                  </Button>
                  
                  <Button variant="outline" className="w-full" onClick={handleDownloadCV}>
                    <Download className="w-4 h-4 mr-2" />
                    Download CV 
                  </Button>
                  
                  <Button variant="outline" className="w-full" onClick={handleDownloadCoverLetter}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Cover Letter
                  </Button>
                  
                  <Button variant="outline" className="w-full" onClick={handleDownloadProfile}>
                    <User className="w-4 h-4 mr-2" />
                    Download Profile
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Candidate
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <StickyNote className="w-4 h-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT - Tabbed Interface */}
            <div className="flex-1 overflow-hidden bg-gray-50">
              <Tabs defaultValue="overview" className="h-full flex flex-col">
                <div className="border-b bg-white px-6">
                  <TabsList className="grid w-full max-w-2xl grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="behavioral-culture" className="bg-gradient-to-r from-purple-50 to-blue-50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-blue-100 text-purple-700 data-[state=active]:text-purple-800">
                      <Brain className="w-4 h-4 mr-2 text-[#ff5f1b]" />
                      Behavioral & Culture Fit
                    </TabsTrigger>
                    <TabsTrigger value="assessment-results">Assessment Results</TabsTrigger>
                  </TabsList>
                </div>

                {/* Overview Tab */}
                <TabsContent value="overview" className="flex-1 overflow-y-auto p-6 space-y-6 mt-0">
                  {/* Video Introduction */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Video Introduction</p>
                        <Button variant="outline" className="mt-2">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Introduction (2:30)
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Professional Summary */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Summary</p>
                      <p className="text-gray-700 leading-relaxed">{candidate.summary}</p>
                    </div>
                  </div>

                  {/* Skills & Expertise */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Skills & Expertise
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Industry */}
                      <Collapsible open={expandedSections.industry} onOpenChange={() => toggleSection('industry')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                          <span className="font-medium text-orange-900 flex items-center gap-2">
                            <Factory className="w-4 h-4" />
                            Industry
                          </span>
                          {expandedSections.industry ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="flex flex-wrap gap-2 p-3">
                            {skillCategories.industry.map(industry => (
                              <Badge key={industry} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Finance Subfields */}
                      <Collapsible open={expandedSections.financeSubfields} onOpenChange={() => toggleSection('financeSubfields')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                          <span className="font-medium text-blue-900 flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Finance Subfields
                          </span>
                          {expandedSections.financeSubfields ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="flex flex-wrap gap-2 p-3">
                            {skillCategories.financeSubfields.map(skill => (
                              <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Software & Tools */}
                      <Collapsible open={expandedSections.softwareTools} onOpenChange={() => toggleSection('softwareTools')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                          <span className="font-medium text-purple-900 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Software & Tools
                          </span>
                          {expandedSections.softwareTools ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="flex flex-wrap gap-2 p-3">
                            {skillCategories.softwareTools.map(tool => (
                              <Badge key={tool} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Certifications */}
                      <Collapsible open={expandedSections.certifications} onOpenChange={() => toggleSection('certifications')}>
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          <span className="font-medium text-green-900 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Certifications
                          </span>
                          {expandedSections.certifications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                          <div className="flex flex-wrap gap-2 p-3">
                            {skillCategories.certifications.map(cert => (
                              <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  {/* Experience Timeline */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Experience Timeline
                    </h3>
                    <div className="space-y-6">
                      {mockExperience.map((exp, index) => (
                        <div key={index} className="relative pl-6 border-l-2 border-gray-200 last:border-l-0">
                          <div className="absolute w-3 h-3 bg-[#ff5f1b] rounded-full -left-[7px] top-1"></div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                                <p className="text-[#ff5f1b] font-medium">{exp.company}</p>
                              </div>
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                            </div>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {exp.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </h3>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">{candidate.education}</h4>
                      <p className="text-[#ff5f1b] font-medium">American University of Dubai</p>
                      <p className="text-sm text-gray-500">2012 - 2016</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Behavioral & Culture Fit Tab */}
                <TabsContent value="behavioral-culture" className="flex-1 overflow-y-auto p-6 mt-0">
                  {!isUnlocked ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-8 bg-white rounded-lg shadow-sm border">
                        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlock to access this candidate's behavioral fit profile</h3>
                        <p className="text-gray-600">Complete candidate unlock to view detailed behavioral insights and culture fit analysis.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Section 1: Behavioral Summary */}
                      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <MessageSquare className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-900">Behavioral Summary</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{behavioralData.summary}</p>
                      </div>

                      {/* Section 2: Key Traits */}
                      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Target className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-900">Key Traits</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {behavioralData.keyTraits.map((trait, index) => (
                            <Tooltip key={index}>
                              <TooltipTrigger>
                                <Badge variant="secondary" className={`${trait.color} text-sm px-3 py-1 rounded-full cursor-help`}>
                                  {trait.label}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{trait.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Trait Indicators */}
                      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Zap className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-900">Trait Indicators</h3>
                        </div>
                        <div className="space-y-4">
                          {behavioralData.traitIndicators.map((indicator, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">{indicator.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  indicator.level === 'Strong' ? 'bg-green-100 text-green-800' :
                                  indicator.level === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-orange-100 text-orange-800'
                                }`}>
                                  {indicator.level}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`${indicator.color} h-2 rounded-full transition-all duration-300`}
                                  style={{ width: `${indicator.value}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Culture Fit Snapshot */}
                      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <Users className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-900">Culture Fit Snapshot</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4">{behavioralData.cultureFit}</p>
                        <div className="flex flex-wrap gap-2">
                          {behavioralData.environmentFit.map((env, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              <span className="mr-1">{env.icon}</span>
                              {env.label}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Section 5: Scenario Context (Collapsible) */}
                      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
                        <Collapsible open={expandedSections.scenarioContext} onOpenChange={() => toggleSection('scenarioContext')}>
                          <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <div className="flex items-start gap-3">
                              <FileText className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                              <h3 className="text-lg font-semibold text-gray-900">How were these insights generated?</h3>
                            </div>
                            {expandedSections.scenarioContext ? <ChevronUp className="w-5 h-4" /> : <ChevronDown className="w-5 h-4" />}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4">
                            <div className="space-y-3">
                              <p className="text-gray-700">
                                Insights are based on 5 real-world behavioral scenarios for this role. Candidate responses were analyzed using Nestira's GPT-powered Trait Engine.
                              </p>
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-medium text-gray-800 mb-2">Sample Scenario:</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  "You discover a significant error in last quarter's financial report that was already submitted to stakeholders. How do you handle this situation?"
                                </p>
                                <p className="text-xs text-gray-500">
                                  <strong>Analysis:</strong> Response indicated strong integrity signals and preference for collaborative problem-solving.
                                </p>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      {/* Footer Button */}
                      <div className="flex justify-center pt-4">
                        <Button variant="outline" onClick={handleDownloadFitReport} className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Fit Report (PDF)
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Assessment Results Tab */}
                <TabsContent value="assessment-results" className="flex-1 overflow-y-auto p-6 mt-0">
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                          <Brain className="w-6 h-6 text-[#ff5f1b]" />
                          Assessment Results
                        </h3>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Technical real-world scenario assessments with detailed results and analysis</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Overall Score Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                          <div className="relative">
                            <div className="text-6xl font-bold text-blue-900 mb-2">61%</div>
                            <div className="absolute -top-2 -right-2">
                              <Badge className="bg-blue-600 text-white">Overall</Badge>
                            </div>
                          </div>
                        </div>
                        <h4 className="text-xl font-semibold text-blue-900 mb-4">Average Assessment Score</h4>
                        <div className="flex items-center justify-center gap-6 text-sm text-blue-700">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                            <span>Your candidate pool average</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            <span>Your best candidate score</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Assessment Tests Section */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 border border-emerald-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-emerald-600 rounded-xl">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-emerald-900">Technical Real Scenario Tests</h4>
                          <p className="text-emerald-700">Comprehensive assessment of technical capabilities</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {mockAssessments.map((assessment, index) => (
                          <div key={index} className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2">{assessment.name}</h5>
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-3xl font-bold text-gray-800">{assessment.score}%</span>
                                  <Badge 
                                    variant={assessment.score >= 70 ? "default" : "destructive"} 
                                    className={assessment.score >= 70 ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}
                                  >
                                    {assessment.status === "passed" ? "Passed" : "Needs Improvement"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{assessment.opinion}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                              onClick={() => handleShowAnswers(assessment)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Detailed Results
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Anti-cheating Monitor Section */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-8 border border-orange-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-orange-600 rounded-xl">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-orange-900">Security & Integrity Monitor</h4>
                          <p className="text-orange-700">Real-time assessment monitoring data</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-5 h-5 text-orange-600 hover:text-orange-700" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Real-time monitoring data during assessment</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="bg-white rounded-xl p-6 border border-orange-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700 flex items-center gap-2">
                              <Monitor className="w-4 h-4" />
                              Device used
                            </span>
                            <span className="font-semibold text-orange-900">{antiCheatData.device}</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700 flex items-center gap-2">
                              <MapPinIcon className="w-4 h-4" />
                              Location
                            </span>
                            <span className="font-semibold text-orange-900">{antiCheatData.location}</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700 text-sm">Single IP session</span>
                            <Badge variant={antiCheatData.filledOnce ? "default" : "destructive"} className={antiCheatData.filledOnce ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {antiCheatData.filledOnce ? "Yes" : "No"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700 flex items-center gap-2">
                              <Camera className="w-4 h-4" />
                              Webcam active
                            </span>
                            <Badge variant={antiCheatData.webcamEnabled ? "default" : "destructive"} className={antiCheatData.webcamEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {antiCheatData.webcamEnabled ? "Yes" : "No"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700 flex items-center gap-2">
                              <Maximize className="w-4 h-4" />
                              Full-screen mode
                            </span>
                            <Badge variant={antiCheatData.fullScreenActive ? "default" : "destructive"} className={antiCheatData.fullScreenActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {antiCheatData.fullScreenActive ? "Always" : "Violated"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <span className="text-gray-700 flex items-center gap-2">
                              <MousePointer className="w-4 h-4" />
                              Mouse tracking
                            </span>
                            <Badge variant={antiCheatData.mouseInWindow ? "default" : "destructive"} className={antiCheatData.mouseInWindow ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                              {antiCheatData.mouseInWindow ? "Clean" : "Suspicious"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Recording Section */}
                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8 border border-purple-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-600 rounded-xl">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-purple-900">Assessment Recording</h4>
                          <p className="text-purple-700">Complete session recording with timeline markers</p>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl overflow-hidden border border-purple-200">
                        <div className="aspect-video bg-black flex items-center justify-center relative">
                          <img 
                            src="/lovable-uploads/d3a8d219-4f65-455c-9c59-efdfff1fd41b.png" 
                            alt="Complete assessment recording"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                              <Play className="w-5 h-5 mr-2" />
                              Watch Full Recording
                            </Button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between text-sm mb-4">
                            <span className="font-semibold text-gray-900">Complete Assessment Session</span>
                            <span className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded">56:12 / 1:40:00</span>
                          </div>
                          
                          {/* Enhanced Timeline with Chunks */}
                          <div className="space-y-4">
                            <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                              {/* Chunk 1: Technical Challenge */}
                              <div 
                                className="absolute top-0 left-0 bg-blue-500 h-3 rounded-l-full" 
                                style={{ width: '45%' }}
                                title="Technical Challenge: Financial Forecasting & Budget Variance Analysis"
                              ></div>
                              {/* Chunk 2: Critical Thinking */}
                              <div 
                                className="absolute top-0 bg-orange-500 h-3" 
                                style={{ left: '45%', width: '30%' }}
                                title="Critical Thinking Scenario: Budget Crisis Resolution"
                              ></div>
                              {/* Chunk 3: Culture Fit */}
                              <div 
                                className="absolute top-0 bg-purple-500 h-3 rounded-r-full" 
                                style={{ left: '75%', width: '25%' }}
                                title="Culture Fit Simulation: Team Conflict & Collaboration"
                              ></div>
                              {/* Progress indicator */}
                              <div 
                                className="absolute top-0 left-0 bg-green-600 h-3 opacity-80 rounded-l-full" 
                                style={{ width: '56%' }}
                              ></div>
                            </div>
                            
                            {/* Chunk Labels */}
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <div>
                                  <div className="font-medium text-blue-900">Technical Challenge</div>
                                  <div className="text-blue-700">0:00-45:00</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <div>
                                  <div className="font-medium text-orange-900">Critical Thinking</div>
                                  <div className="text-orange-700">45:00-1:15:00</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <div>
                                  <div className="font-medium text-purple-900">Culture Fit</div>
                                  <div className="text-purple-700">1:15:00-1:40:00</div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Quick Jump Buttons */}
                            <div className="flex flex-wrap gap-2 pt-2">
                              <Button size="sm" variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                                Jump to Technical
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100">
                                Jump to Critical Thinking  
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
                                Jump to Culture Fit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Enhanced Quiz Selector Modal */}
          {showQuizModal && (
            <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
              <DialogContent className="max-w-3xl max-h-[90vh]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Assign Assessment to {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600">Select one or more assessments to assign to this candidate</p>
                  </div>

                  {/* Select All/Deselect All */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-t border-b">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSelectAll}
                      disabled={selectedQuizzes.length === availableQuizzes.length}
                    >
                      Select All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDeselectAll}
                      disabled={selectedQuizzes.length === 0}
                    >
                      Deselect All
                    </Button>
                    <span className="text-sm text-gray-600">
                      {selectedQuizzes.length} of {availableQuizzes.length} selected
                    </span>
                  </div>

                  {/* Selected Quizzes Preview */}
                  {selectedQuizzes.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Selected Assessments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuizzes.map(quizId => {
                          const quiz = availableQuizzes.find(q => q.id === quizId);
                          return quiz ? (
                            <Badge 
                              key={quizId} 
                              variant="secondary" 
                              className="cursor-pointer hover:bg-red-100"
                              onClick={() => removeSelectedQuiz(quizId)}
                            >
                              {quiz.title} <X className="w-3 h-3 ml-1" />
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Quiz List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {availableQuizzes.map(quiz => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedQuizzes.includes(quiz.id)}
                            onCheckedChange={(checked) => handleQuizSelection(quiz.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <h4 className="font-medium">{quiz.title}</h4>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {quiz.duration}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {quiz.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                {quiz.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer Actions */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowQuizModal(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white"
                      onClick={handleAssignSelected}
                      disabled={selectedQuizzes.length === 0}
                    >
                      Assign Selected ({selectedQuizzes.length})
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Assessment Answers Modal */}
          <AssessmentAnswersModal
            assessment={selectedAssessment}
            isOpen={showAssessmentAnswers}
            onClose={() => setShowAssessmentAnswers(false)}
          />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
