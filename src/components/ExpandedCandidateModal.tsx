
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  GraduationCap, 
  Calendar,
  Star,
  Unlock,
  UserPlus,
  X,
  Mail,
  Phone,
  Linkedin,
  User,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  Lock,
  Download,
  MessageSquare,
  FileText
} from 'lucide-react';
import { getCountryFlag } from '@/utils/talentPoolUtils';
import { CircularProgress } from '@/components/ui/circular-progress';

interface ExpandedCandidateModalProps {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (candidate: any) => void;
  onInviteToApply: (candidate: any) => void;
  isUnlocked: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ExpandedCandidateModal: React.FC<ExpandedCandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onUnlock,
  onInviteToApply,
  isUnlocked,
  isFavorite,
  onToggleFavorite
}) => {
  if (!candidate) return null;

  const assessmentData = {
    overallScore: 88,
    analyticalThinking: 92,
    financialKnowledge: 85,
    problemSolving: 90,
    attention: 84,
    communication: 87
  };

  const LockedSection = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            <h3 className="font-semibold">{title}</h3>
          </div>
          {!isUnlocked && (
            <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-medium">Locked</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${!isUnlocked ? 'blur-sm select-none pointer-events-none' : ''} transition-all duration-300`}>
        {children}
      </CardContent>
      {!isUnlocked && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Unlock to view {title.toLowerCase()}</p>
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => onUnlock(candidate)}
            >
              <Unlock className="w-4 h-4 mr-2" />
              Unlock Profile
            </Button>
          </div>
        </div>
      )}
    </Card>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 pr-12">
          <DialogTitle className="text-2xl font-bold">Candidate Profile</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFavorite}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            {!isUnlocked ? (
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => onUnlock(candidate)}
              >
                <Unlock className="w-4 h-4 mr-2" />
                Unlock Profile
              </Button>
            ) : (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => onInviteToApply(candidate)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite to Apply
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section - Always Visible */}
          <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <Avatar className="w-24 h-24">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback className="text-2xl bg-blue-100">{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-gray-900">{candidate.name}</h2>
                <span className="text-2xl">{getCountryFlag(candidate.country)}</span>
                <div className="ml-auto">
                  <CircularProgress value={candidate.score} size={80} strokeWidth={6} />
                </div>
              </div>
              <p className="text-xl text-gray-700 font-medium">{candidate.title}</p>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{candidate.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>{candidate.salaryExpectation}</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="assessment">Assessment Results</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Skills & Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Industry Experience */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Industry Experience
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.industryExperience.map((industry: string) => (
                        <Badge key={industry} variant="outline" className="text-sm py-1">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Finance Subfields */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Finance Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.financeSubfields.map((subfield: string) => (
                        <Badge key={subfield} variant="outline" className="text-sm py-1 bg-blue-50 text-blue-700 border-blue-200">
                          {subfield}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Software Tools */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Software & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.softwareTools.map((tool: string) => (
                        <Badge key={tool} variant="outline" className="text-sm py-1 bg-purple-50 text-purple-700 border-purple-200">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Certifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline" className="text-sm py-1 bg-green-50 text-green-700 border-green-200">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Professional Summary */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Professional Summary</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Experienced {candidate.title.toLowerCase()} with {candidate.yearsOfExperience} years in the finance industry. 
                    Specialized in {candidate.financeSubfields.slice(0, 2).join(' and ')}, with extensive experience across {candidate.industryExperience.slice(0, 2).join(' and ')} sectors.
                    Proficient in {candidate.softwareTools.slice(0, 3).join(', ')} and certified in {candidate.certifications.slice(0, 2).join(' and ')}.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information - Locked */}
              <LockedSection title="Contact Information" icon={Mail}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
                      {candidate.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <a href={`tel:${candidate.phone}`} className="text-green-600 hover:underline">
                      {candidate.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-blue-700" />
                    <a href="#" className="text-blue-700 hover:underline">
                      linkedin.com/in/johndoe
                    </a>
                  </div>
                </div>
              </LockedSection>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Work Experience</h3>
                  <div className="space-y-6">
                    <div className="border-l-2 border-blue-200 pl-4">
                      <h4 className="font-semibold text-lg">Senior Financial Analyst</h4>
                      <p className="text-gray-600">TechCorp Solutions • 2021 - Present</p>
                      <ul className="mt-2 text-gray-700 space-y-1">
                        <li>• Led financial planning and analysis for $50M revenue division</li>
                        <li>• Developed automated reporting systems reducing processing time by 40%</li>
                        <li>• Managed budget forecasting and variance analysis</li>
                      </ul>
                    </div>
                    <div className="border-l-2 border-blue-200 pl-4">
                      <h4 className="font-semibold text-lg">Financial Analyst</h4>
                      <p className="text-gray-600">Global Finance Inc • 2018 - 2021</p>
                      <ul className="mt-2 text-gray-700 space-y-1">
                        <li>• Conducted financial modeling and risk assessment</li>
                        <li>• Prepared monthly and quarterly financial reports</li>
                        <li>• Collaborated with cross-functional teams on cost optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6">
              {/* Assessment Results - Locked */}
              <LockedSection title="Assessment Results" icon={TrendingUp}>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{assessmentData.overallScore}%</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{assessmentData.analyticalThinking}%</div>
                      <div className="text-sm text-gray-600">Analytical Thinking</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{assessmentData.financialKnowledge}%</div>
                      <div className="text-sm text-gray-600">Financial Knowledge</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{assessmentData.problemSolving}%</div>
                      <div className="text-sm text-gray-600">Problem Solving</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600">{assessmentData.attention}%</div>
                      <div className="text-sm text-gray-600">Attention to Detail</div>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">{assessmentData.communication}%</div>
                      <div className="text-sm text-gray-600">Communication</div>
                    </div>
                  </div>
                </div>
              </LockedSection>

              {/* Assessment Actions - Locked */}
              <LockedSection title="Assessment Actions" icon={Target}>
                <div className="grid grid-cols-1 gap-3">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white justify-start text-left h-auto py-3 px-4">
                    <Target className="w-5 h-5 mr-3" />
                    <span>Assign Assessment</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
                    <Download className="w-5 h-5 mr-3" />
                    <span>Download CV</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
                    <Download className="w-5 h-5 mr-3" />
                    <span>Download Cover Letter</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
                    <User className="w-5 h-5 mr-3" />
                    <span>Download Profile</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
                    <MessageSquare className="w-5 h-5 mr-3" />
                    <span>Message Candidate</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-left h-auto py-3 px-4">
                    <FileText className="w-5 h-5 mr-3" />
                    <span>Add Note</span>
                  </Button>
                </div>
              </LockedSection>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              {/* Documents - Locked */}
              <LockedSection title="Documents & Files" icon={FileText}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div>
                        <div className="font-medium">Resume_JohnDoe_2024.pdf</div>
                        <div className="text-sm text-gray-500">Updated 2 weeks ago • 2.1 MB</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="font-medium">CoverLetter_JohnDoe.pdf</div>
                        <div className="text-sm text-gray-500">Updated 2 weeks ago • 1.5 MB</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-medium">CPA_Certificate.pdf</div>
                        <div className="text-sm text-gray-500">Verified • 1.2 MB</div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </LockedSection>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
