
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';

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
  const [expandedSections, setExpandedSections] = useState({
    financeSubfields: true,
    softwareTools: true,
    certifications: true
  });

  if (!candidate) return null;

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };

  const isUnlocked = true; // For demo purposes

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

  const skillCategories = {
    financeSubfields: ["Financial Planning", "Budget Management", "Cost Analysis", "Risk Assessment"],
    softwareTools: ["SAP", "Oracle", "QuickBooks", "Tableau", "Power BI", "Excel Advanced"],
    certifications: ["CPA", "CFA Level 2", "FRM", "ACCA"]
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
            {/* LEFT SIDEBAR - Fixed Width */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Candidate Overview */}
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-24 h-24">
                    <Avatar className={`w-24 h-24 transition-all duration-500 ${!isUnlocked ? 'blur-sm' : ''}`}>
                      <AvatarImage src={candidate.photo} alt={candidate.name} />
                      <AvatarFallback className="text-2xl">{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {isUnlocked ? candidate.name : formatBlurredName(candidate.name)}
                      </h3>
                      <span className="text-xl">{getCountryFlag(candidate.country)}</span>
                    </div>
                    <p className="text-gray-600">{candidate.title}</p>
                  </div>

                  {/* Matching Score */}
                  <div className="flex justify-center">
                    <CircularProgress 
                      value={candidate.score} 
                      size={80} 
                      strokeWidth={6}
                      showPercentage={true}
                    />
                  </div>
                </div>

                <Separator />

                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className={!isUnlocked ? 'blur-sm' : ''}>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className={!isUnlocked ? 'blur-sm' : ''}>{candidate.phone}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Job Preferences */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Job Preferences</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Preferred Titles:</span>
                      <p className="text-gray-600">Finance Manager, FP&A Director</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Preferred Locations:</span>
                      <p className="text-gray-600">Dubai, Abu Dhabi, Riyadh</p>
                    </div>
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

                {/* Cover Letter */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Cover Letter</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-[#ff5f1b] text-[#ff5f1b] hover:bg-[#ff5f1b] hover:text-white"
                    onClick={() => setShowCoverLetter(!showCoverLetter)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Cover Letter
                  </Button>
                  {showCoverLetter && (
                    <div className="bg-gray-50 p-3 rounded-lg text-xs leading-relaxed">
                      Dear Hiring Manager,<br/><br/>
                      I am writing to express my strong interest in the Senior Finance Manager position. With over 8 years of progressive experience...
                    </div>
                  )}
                </div>

                {/* Documents */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Documents</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT - Scrollable */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              <div className="p-6 space-y-6">
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
                    <Briefcase className="w-5 h-5" />
                    Skills & Expertise
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Finance Subfields */}
                    <Collapsible open={expandedSections.financeSubfields} onOpenChange={() => toggleSection('financeSubfields')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <span className="font-medium text-blue-900">Finance Subfields</span>
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
                        <span className="font-medium text-purple-900">Software & Tools</span>
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
                        <span className="font-medium text-green-900">Certifications</span>
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
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">{candidate.education}</h4>
                    <p className="text-[#ff5f1b] font-medium">American University of Dubai</p>
                    <p className="text-sm text-gray-500">2012 - 2016</p>
                  </div>
                </div>

                {/* Nestira Skill Insights */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#ff5f1b]" />
                      📊 Nestira Skill Insights
                    </h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {mockAssessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {assessment.status === 'passed' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                          <span className="font-medium">{assessment.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={assessment.score} className="w-24" />
                          <span className="text-sm font-semibold w-12">{assessment.score}%</span>
                          <Badge variant={assessment.status === 'passed' ? 'default' : 'secondary'} 
                                 className={assessment.status === 'passed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {assessment.status === 'passed' ? 'Pass' : 'Needs Improvement'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Assign Assessment Button */}
                  <Button 
                    className="w-full bg-[#ff5f1b] hover:bg-[#e5551a] text-white font-bold py-3"
                    onClick={() => setShowQuizModal(true)}
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    🧠 Assign an Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="border-t bg-white p-4">
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm">
                <StickyNote className="w-4 h-4 mr-2" />
                Add Note
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white">
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
                    <p className="text-sm text-gray-600">Choose a finance assessment for {candidate.name}</p>
                  </div>
                  <div className="space-y-2">
                    {["FP&A Assessment", "Excel Proficiency Test", "IFRS Compliance Quiz", "Financial Modeling Challenge", "Risk Management Evaluation"].map((quiz) => (
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
