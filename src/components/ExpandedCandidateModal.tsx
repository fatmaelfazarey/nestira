
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Calendar, 
  Download, 
  MessageSquare, 
  Brain,
  StickyNote,
  X,
  Shield,
  Clock,
  DollarSign,
  Home,
  Play,
  FileText,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useState } from 'react';

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

  if (!candidate) return null;

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };

  const mockExperience = [
    {
      title: "Senior Financial Analyst",
      company: "Emirates NBD",
      duration: "2021 - Present",
      bullets: ["Led quarterly financial reporting for $2B portfolio", "Implemented SAP FICO modules reducing processing time by 40%"]
    },
    {
      title: "Financial Analyst",
      company: "ADNOC",
      duration: "2019 - 2021",
      bullets: ["Managed budget planning for upstream operations", "Developed KPI dashboards using Power BI"]
    }
  ];

  const mockAssessments = [
    { name: "Financial Modeling", score: 92, status: "passed" },
    { name: "Excel Advanced", score: 88, status: "passed" },
    { name: "IFRS Knowledge", score: 76, status: "needs-improvement" },
    { name: "Risk Analysis", score: 94, status: "passed" }
  ];

  const quizOptions = [
    "FP&A Assessment",
    "Excel Proficiency Test",
    "IFRS Compliance Quiz",
    "Financial Modeling Challenge",
    "Risk Management Evaluation"
  ];

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={candidate.photo} alt={candidate.name} />
                <AvatarFallback className="text-xl">{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  <Shield className="w-5 h-5 text-green-500" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300">{candidate.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-bold text-lg">{candidate.score}</span>
                        <span className="text-sm text-gray-500">/ 100</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <div>Technical Skills: 95/100</div>
                        <div>Experience Match: 90/100</div>
                        <div>Culture Fit: 88/100</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFavorite}
                className="text-yellow-500 hover:text-yellow-600"
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex h-[calc(95vh-140px)]">
            {/* Left Sidebar */}
            <div className="w-80 border-r bg-gray-50 dark:bg-gray-800 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{candidate.location}</span>
                    <span className="text-lg">{getCountryFlag(candidate.country)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <span>{candidate.yearsOfExperience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{candidate.phone}</span>
                  </div>
                </div>

                <Separator />

                {/* Job Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Job Preferences</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>Immediate availability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span>{candidate.salaryExpectation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span>Remote-ready</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Full-time</Badge>
                  </div>
                </div>

                <Separator />

                {/* Documents */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Documents</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Cover Letter
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-8">
                {/* Professional Summary */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {candidate.summary}
                  </p>
                </section>

                {/* Cover Letter */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Cover Letter</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCoverLetter(!showCoverLetter)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showCoverLetter ? 'Hide' : 'View'} Cover Letter
                    </Button>
                  </div>
                  {showCoverLetter && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">
                        Dear Hiring Manager,<br/><br/>
                        I am writing to express my strong interest in the Senior Finance Manager position. With over 8 years of progressive experience in financial analysis, planning, and team leadership, I am confident in my ability to contribute significantly to your organization's financial objectives...
                      </p>
                    </div>
                  )}
                </section>

                {/* Video Introduction */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Video Introduction</h3>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Watch Introduction (2:30)
                  </Button>
                </section>

                {/* Skills & Expertise */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.tags.map((tag, index) => (
                      <Tooltip key={tag}>
                        <TooltipTrigger>
                          <Badge variant="secondary" className="cursor-help">
                            {tag} {index < 3 ? `• ${88 + index * 2}%` : ''}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Skill level: {index < 3 ? 'Tested' : 'Self-reported'}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </section>

                {/* Experience Timeline */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Experience Timeline</h3>
                  <div className="space-y-4">
                    {mockExperience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-4 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{exp.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                          </div>
                          <span className="text-sm text-gray-500">{exp.duration}</span>
                        </div>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-medium">{candidate.education}</h4>
                    <p className="text-gray-600 dark:text-gray-400">American University of Dubai</p>
                    <p className="text-sm text-gray-500">2012 - 2016</p>
                  </div>
                </section>

                {/* Assessment Results */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Nestira Skill Insights</h3>
                    <Button variant="outline" size="sm">
                      <Brain className="w-4 h-4 mr-2" />
                      Add New Assessment
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {mockAssessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          {assessment.status === 'passed' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                          <span className="font-medium">{assessment.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={assessment.score} className="w-20" />
                          <span className="text-sm font-medium w-12">{assessment.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Job Preferences */}
                <section>
                  <h3 className="text-xl font-semibold mb-4">Job Preferences</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Preferred Cities:</span>
                      <p className="text-gray-600 dark:text-gray-400">Dubai, Abu Dhabi, Riyadh</p>
                    </div>
                    <div>
                      <span className="font-medium">Remote Ready:</span>
                      <p className="text-gray-600 dark:text-gray-400">Yes, fully equipped</p>
                    </div>
                    <div>
                      <span className="font-medium">Target Roles:</span>
                      <p className="text-gray-600 dark:text-gray-400">Finance Manager, FP&A Director</p>
                    </div>
                    <div>
                      <span className="font-medium">Languages:</span>
                      <p className="text-gray-600 dark:text-gray-400">English (Native), Arabic (Fluent)</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="border-t bg-white dark:bg-gray-900 p-4">
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm">
                <StickyNote className="w-4 h-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowQuizModal(true)}>
                <Brain className="w-4 h-4 mr-2" />
                Assign Quiz
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button className="bg-accent hover:bg-accent/90">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>

          {/* Quiz Selector Modal */}
          {showQuizModal && (
            <Dialog open={showQuizModal} onOpenChange={setShowQuizModal}>
              <DialogContent className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Select Assessment</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Choose a finance assessment for {candidate.name}</p>
                  </div>
                  <div className="space-y-2">
                    {quizOptions.map((quiz) => (
                      <Button
                        key={quiz}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          setShowQuizModal(false);
                          // Handle quiz assignment
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {quiz}
                      </Button>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
