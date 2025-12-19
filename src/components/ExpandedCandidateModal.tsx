


// ExpandedCandidateModal.tsx
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Briefcase, Mail, Phone, Calendar, MessageSquare, X, Shield, Clock, DollarSign, Home, Play, Eye, CheckCircle, ChevronDown, ChevronUp, Award, Code, Building, GraduationCap, TrendingUp, Factory, Unlock, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { AddToFolderButton } from './AddToFolderButton';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import InviteModal from './InviteModal';
import { IP } from '@/store/Path';

interface Candidate {
  id: string;
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
  summary: string;
  country: string;
  profileAdded: string;
  salaryExpectation: string;
  industryExperience?: string[];
  financeSubfields?: string[];
}

interface UnlockedCandidateData {
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    bullets: string[];
  }>;
  softwareTools: string[];
  certifications: string[];
  coverLetter: string;
  allEducation: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  email: string;
  phone: string;
  photo: string;
  yearsOfExperience: number;
  summary: string;
  profileAdded: string;
  preferences?: {
    jobTitles: string[];
    workType: string;
    visaStatus: string;
    noticePeriod: string;
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
    locations: string[];
  };
  skills: {
    software: string[];
    certifications: string[];
    technical: string[];
    languages: string[];
  };
  industry: {
    industries: string[];
    subfields: string[];
  };
}

interface ExpandedCandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onUnlock?: (candidate: Candidate) => void;
  onInviteToApply?: (candidate: Candidate) => void;
  isUnlocked?: boolean;
}

export function ExpandedCandidateModal({
  candidate,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onUnlock,
  onInviteToApply,
  isUnlocked = false
}: ExpandedCandidateModalProps) {
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [internalIsUnlocked, setInternalIsUnlocked] = useState(isUnlocked);
  const [unlockData, setUnlockData] = useState<UnlockedCandidateData | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const { UnlockCandidates } = useEmployerStore();
  const [expandedSections, setExpandedSections] = useState({
    industry: true,
    financeSubfields: true,
    softwareTools: true,
    certifications: true
  });

  useEffect(() => {
    if (internalIsUnlocked && candidate) {
      fetchUnlockCandidateData();
    }
  }, [internalIsUnlocked, candidate]);

  const fetchUnlockCandidateData = async () => {
    if (!candidate) return;
    try {
      const result = await UnlockCandidates(setUnlockData, candidate.id);
      if (result?.success) {
        setUnlockData(result.data);
      }
    } catch (error) {
      console.error("Error fetching unlock data:", error);
    }
  };

  if (!candidate) return null;

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

  const handleUnlock = () => {
    setInternalIsUnlocked(true);
    if (onUnlock) {
      onUnlock(candidate);
    }
  };

  const handleInviteToApply = () => {
    setShowInviteModal(true);
    if (onInviteToApply) {
      onInviteToApply(candidate);
    }
  };

  const effectiveIsUnlocked = internalIsUnlocked || isUnlocked;

  const displayData = effectiveIsUnlocked && unlockData ? {
    email: unlockData.email,
    phone: unlockData.phone,
    summary: unlockData.summary,
    yearsOfExperience: unlockData.yearsOfExperience,
    profileAdded: unlockData.profileAdded,
    experience: unlockData.experience,
    education: unlockData.allEducation,
    softwareTools: unlockData.softwareTools,
    certifications: unlockData.certifications,
    coverLetter: unlockData.coverLetter,
    industries: unlockData.industry?.industries || candidate.industryExperience,
    subfields: unlockData.industry?.subfields || candidate.financeSubfields,
    preferences: unlockData.preferences,
    videoUrl: unlockData.videoUrl
  } : {
    email: '',
    phone: '',
    summary: candidate.summary,
    yearsOfExperience: candidate.yearsOfExperience,
    profileAdded: candidate.profileAdded,
    experience: [],
    education: [],
    softwareTools: [],
    certifications: [],
    coverLetter: '',
    industries: candidate.industryExperience,
    subfields: candidate.financeSubfields,
    preferences: undefined
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-scroll p-0 bg-gray-50">
          <div className="flex items-center justify-between p-6 border-b bg-white">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
              <Shield className="w-5 h-5 text-green-500" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <div className="flex items-center gap-2">
              <AddToFolderButton
                candidate={candidate}
                variant="outline"
                size="sm"
              />
              {!effectiveIsUnlocked && (
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90"
                  onClick={handleUnlock}
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Unlock
                </Button>
              )}
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleInviteToApply}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite to Apply
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
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
                      {effectiveIsUnlocked ? candidate.name : formatBlurredName(candidate.name)}
                    </h3>
                    <p className="text-[#ff5f1b] font-medium">{candidate.title}</p>

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{displayData.yearsOfExperience} years</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{displayData.profileAdded}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>{candidate.salaryExpectation}</span>
                    </div>

                    <div className="space-y-2 pt-2">
                      {effectiveIsUnlocked ? (
                        <>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span className="text-blue-600 hover:underline cursor-pointer">{displayData.email}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{displayData.phone}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-2">
                          <p className="text-sm text-gray-500">Unlock to show contact info</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

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

                {effectiveIsUnlocked && displayData.coverLetter && (
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
                        <pre className="w-full whitespace-pre-wrap break-words text-gray-700 mb-2">
                          {displayData.coverLetter}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Job Preferences</h4>

                  <div className="space-y-3 text-sm">
                    {displayData.preferences?.jobTitles && displayData.preferences.jobTitles.length > 0 && (
                      <div>
                        <p className="text-gray-600 font-medium mb-1">Preferred Titles:</p>
                        <span>
                          {displayData.preferences.jobTitles.map((item, index) => (
                            <span key={index}>
                              {item}
                              {index < displayData.preferences.jobTitles.length - 1 && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {displayData.preferences?.locations && displayData.preferences.locations.length > 0 && (
                      <div>
                        <p className="text-gray-600 font-medium mb-1">Preferred Locations:</p>
                        <span>
                          {displayData.preferences.locations.map((item, index) => (
                            <span key={index}>
                              {item}
                              {index < displayData.preferences.locations.length - 1 && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{displayData.preferences?.noticePeriod} availability</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{candidate.salaryExpectation}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-800">{displayData.preferences?.workType}</span>
                    </div>

                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {displayData.preferences?.workType}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Candidate
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gray-50">
              <Tabs defaultValue="overview" className="h-full flex flex-col">
                <div className="border-b bg-white px-6">
                  <TabsList className="grid w-full max-w-3xl grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="flex-1 overflow-y-auto p-6 space-y-6 mt-0">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-center min-h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center w-full">
                        {!displayData.videoUrl ?
                          (<>
                            <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600">Video Introduction</p>
                            <Button variant="outline" className="mt-2">
                              <Play className="w-4 h-4 mr-2" />
                              Watch Introduction (2:30)
                            </Button>
                          </>)
                          : (<>
                            <video
                              src={`${IP}${displayData.videoUrl}`}
                              controls
                              className="w-full rounded-lg"
                            />
                          </>)
                        }



                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Summary</p>
                      <p className="text-gray-700 leading-relaxed">{displayData.summary}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Skills & Expertise
                    </h3>

                    <div className="space-y-4">
                      {displayData.industries && displayData.industries.length > 0 && (
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
                              {displayData.industries.map(industry => (
                                <Badge key={industry} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                  {industry}
                                </Badge>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}

                      {displayData.subfields && displayData.subfields.length > 0 && (
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
                              {displayData.subfields.map(skill => (
                                <Badge key={skill} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}

                      {displayData.softwareTools && displayData.softwareTools.length > 0 && (
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
                              {displayData.softwareTools.map(tool => (
                                <Badge key={tool} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}

                      {displayData.certifications && displayData.certifications.length > 0 && (
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
                              {displayData.certifications.map(cert => (
                                <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  </div>

                  {effectiveIsUnlocked && displayData.experience && displayData.experience.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Experience Timeline
                      </h3>
                      <div className="space-y-6">
                        {displayData.experience.map((exp, index) => (
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
                  )}

                  {effectiveIsUnlocked && displayData.education && displayData.education.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Education
                      </h3>
                      <div>
                        {displayData.education.map((item, index) => (
                          <div className="space-y-2 mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0" key={index}>
                            <h4 className="font-semibold text-gray-900">{item.degree}</h4>
                            <p className="text-[#ff5f1b] font-medium">{item.institution}</p>
                            <p className="text-sm text-gray-500">{item.startDate} - {item.endDate}</p>
                            {item.gpa && (
                              <p className="text-sm text-gray-600">GPA: {item.gpa}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <InviteModal
            showModal={showInviteModal}
            setShowModal={setShowInviteModal}
            candidate={candidate}
          />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}



























