
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
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
  Lock,
  FileText,
  Download,
  Award,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { getCountryFlag } from '@/utils/talentPoolUtils';
import { AssessmentAnswersModal } from '@/components/AssessmentAnswersModal';

interface CandidatePreviewModalProps {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (candidate: any) => void;
  onInviteToApply: (candidate: any) => void;
  isUnlocked: boolean;
}

export const CandidatePreviewModal: React.FC<CandidatePreviewModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onUnlock,
  onInviteToApply,
  isUnlocked
}) => {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  if (!candidate) return null;

  // Format name to show only first name and last initial
  const formatPreviewName = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
  };

  const handleViewAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setShowAssessmentModal(true);
  };

  // Mock assessment data
  const mockAssessments = [
    {
      name: "Financial Analysis Assessment",
      score: 85,
      completedDate: "2024-01-15",
      duration: "45 minutes",
      questions: [
        {
          id: 1,
          question: "What is the primary purpose of financial ratio analysis?",
          options: [
            "To calculate taxes",
            "To evaluate company performance and financial health",
            "To determine employee salaries",
            "To set product prices"
          ],
          correctAnswer: 1,
          candidateAnswer: 1,
          isCorrect: true
        },
        {
          id: 2,
          question: "Which of the following is a liquidity ratio?",
          options: [
            "Debt-to-equity ratio",
            "Current ratio",
            "Return on assets",
            "Price-to-earnings ratio"
          ],
          correctAnswer: 1,
          candidateAnswer: 0,
          isCorrect: false
        }
      ]
    },
    {
      name: "Excel Proficiency Test",
      score: 92,
      completedDate: "2024-01-20",
      duration: "30 minutes",
      questions: []
    }
  ];

  const LockedSection = ({ title, description, unlockText = "Unlock Profile" }: { title: string, description: string, unlockText?: string }) => (
    <div className="flex flex-col items-center justify-center py-12 px-8 text-center space-y-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        <Lock className="w-8 h-8 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 max-w-md">{description}</p>
      </div>
      <Button 
        onClick={() => onUnlock(candidate)}
        className="bg-accent hover:bg-accent/90"
      >
        <Unlock className="w-4 h-4 mr-2" />
        {unlockText}
      </Button>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-xl">Candidate Profile</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-accent hover:bg-accent/90"
                onClick={() => onUnlock(candidate)}
              >
                <Unlock className="w-4 h-4 mr-2" />
                Unlock Full Profile
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => onInviteToApply(candidate)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite to Apply
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessments">Assessment Results</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral & Culture Fit</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Header Section */}
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={candidate.photo} alt={candidate.name} />
                  <AvatarFallback className="text-2xl">{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {isUnlocked ? candidate.name : formatPreviewName(candidate.name)}
                    </h2>
                    <span className="text-2xl">{getCountryFlag(candidate.country)}</span>
                  </div>
                  <p className="text-lg text-gray-600">{candidate.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience} experience
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {candidate.salaryExpectation}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Skills & Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Industry Experience */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Industry Experience
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.industryExperience.map((industry: string) => (
                        <Badge key={industry} variant="outline">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Finance Subfields */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Finance Specializations
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.financeSubfields.map((subfield: string) => (
                        <Badge key={subfield} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {subfield}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Software Tools */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Software & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.softwareTools.map((tool: string) => (
                        <Badge key={tool} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Certifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Professional Summary */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Professional Summary</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Experienced {candidate.title.toLowerCase()} with {candidate.yearsOfExperience} years in the finance industry. 
                    Specialized in {candidate.financeSubfields.slice(0, 2).join(' and ')}, with extensive experience across {candidate.industryExperience.slice(0, 2).join(' and ')} sectors.
                    Proficient in {candidate.softwareTools.slice(0, 3).join(', ')} and certified in {candidate.certifications.slice(0, 2).join(' and ')}.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  {isUnlocked ? (
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">📧 john.doe@email.com</p>
                      <p className="flex items-center gap-2">📱 +1 (555) 123-4567</p>
                      <p className="flex items-center gap-2">💼 linkedin.com/in/johndoe</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="space-y-2 text-sm text-gray-500">
                        <p className="blur-sm select-none">📧 john.doe@email.com</p>
                        <p className="blur-sm select-none">📱 +1 (555) 123-4567</p>
                        <p className="blur-sm select-none">💼 linkedin.com/in/johndoe</p>
                      </div>
                      <p className="text-xs text-gray-600 mt-3 font-medium">
                        <Unlock className="w-3 h-3 inline mr-1" />
                        Unlock profile to show contact info
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments">
              {isUnlocked ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    {mockAssessments.map((assessment, index) => (
                      <Card key={index} className="hover:border-gray-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{assessment.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  Completed: {new Date(assessment.completedDate).toLocaleDateString()}
                                </span>
                                <span>{assessment.duration}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={assessment.score >= 70 ? "default" : "destructive"}
                                className={assessment.score >= 70 ? "bg-green-100 text-green-800" : ""}
                              >
                                {assessment.score}%
                              </Badge>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewAssessment(assessment)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <LockedSection
                  title="Assessment Results Locked"
                  description="Unlock to access this candidate's assessment scores and detailed performance analysis."
                />
              )}
            </TabsContent>

            <TabsContent value="behavioral">
              {isUnlocked ? (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Personality Profile</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Communication Style</h4>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">Direct & Clear</Badge>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Work Approach</h4>
                          <Badge variant="outline" className="bg-green-50 text-green-700">Detail-Oriented</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <LockedSection
                  title="Behavioral Profile Locked"
                  description="Unlock to access this candidate's behavioral fit profile. Complete candidate unlock to view detailed behavioral insights and culture fit analysis."
                />
              )}
            </TabsContent>

            <TabsContent value="documents">
              {isUnlocked ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium">Resume / CV</h4>
                              <p className="text-sm text-gray-500">Updated 2 weeks ago</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-green-600" />
                            <div>
                              <h4 className="font-medium">Cover Letter</h4>
                              <p className="text-sm text-gray-500">Finance Manager Application</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-purple-600" />
                            <div>
                              <h4 className="font-medium">CPA Certificate</h4>
                              <p className="text-sm text-gray-500">Professional Certification</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-gray-600" />
                            <div>
                              <h4 className="font-medium">Complete Profile Package</h4>
                              <p className="text-sm text-gray-500">All documents in one download</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download All
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <LockedSection
                  title="Documents Locked"
                  description="Unlock to access this candidate's CV, cover letter, certificates, and other uploaded documents."
                />
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AssessmentAnswersModal
        assessment={selectedAssessment}
        isOpen={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
      />
    </>
  );
};
