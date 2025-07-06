
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
  Mail,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react';
import { getCountryFlag } from '@/utils/talentPoolUtils';
import { InviteToApplyModal } from '@/components/InviteToApplyModal';
import { BehavioralQuizAssignModal } from '@/components/BehavioralQuizAssignModal';

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
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showQuizAssignModal, setShowQuizAssignModal] = useState(false);

  if (!candidate) return null;

  // Format name to show only first name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  // Format name to show first name + last initial
  const formatPreviewName = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
  };

  const handleUnlockClick = () => {
    // Check if behavioral data exists (simulate check)
    const hasBehavioralData = candidate.behavioralData || Math.random() > 0.5;
    
    if (!hasBehavioralData) {
      setShowQuizAssignModal(true);
    } else {
      onUnlock(candidate);
    }
  };

  const handleInviteClick = () => {
    setShowInviteModal(true);
  };

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
                onClick={handleUnlockClick}
              >
                <Unlock className="w-4 h-4 mr-2" />
                {isUnlocked ? 'Unlocked' : 'Unlock'}
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleInviteClick}
              >
                <Mail className="w-4 h-4 mr-2" />
                Invite to Apply
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessment">Assessment Results</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral & Culture Fit</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Header Section */}
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={candidate.photo} alt={candidate.name} />
                  <AvatarFallback className="text-2xl">{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {isUnlocked ? candidate.name : getFirstName(candidate.name)}
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
              <Card className={isUnlocked ? "bg-white" : "bg-gray-50"}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className={isUnlocked ? "text-gray-700" : "blur-sm select-none text-gray-500"}>
                      📧 {isUnlocked ? `${candidate.name.toLowerCase().replace(' ', '.')}@email.com` : 'john.doe@email.com'}
                    </p>
                    <p className={isUnlocked ? "text-gray-700" : "blur-sm select-none text-gray-500"}>
                      📱 {isUnlocked ? '+1 (555) 987-6543' : '+1 (555) 123-4567'}
                    </p>
                    <p className={isUnlocked ? "text-gray-700" : "blur-sm select-none text-gray-500"}>
                      💼 {isUnlocked ? `linkedin.com/in/${candidate.name.toLowerCase().replace(' ', '')}` : 'linkedin.com/in/johndoe'}
                    </p>
                  </div>
                  {!isUnlocked && (
                    <p className="text-xs text-gray-400 mt-2 italic">
                      Contact details are hidden. Click "Unlock" to reveal full profile.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessment" className="space-y-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Assessment Results</h3>
                    <p className="text-gray-600">
                      Technical and skills assessment results will be displayed here once the candidate completes an assessment.
                    </p>
                    <Button variant="outline" className="mt-4">
                      Assign Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavioral" className="space-y-6 mt-6">
              {isUnlocked ? (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Personality Summary
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Leadership</span>
                            <span className="text-sm text-gray-600">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Communication</span>
                            <span className="text-sm text-gray-600">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Problem Solving</span>
                            <span className="text-sm text-gray-600">78%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{width: '78%'}}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Team Collaboration</span>
                            <span className="text-sm text-gray-600">88%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-600 h-2 rounded-full" style={{width: '88%'}}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Culture Fit Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Strong alignment with collaborative work environments</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Thrives in fast-paced, results-oriented settings</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Prefers structured processes over ambiguous tasks</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Excellent fit for client-facing roles</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                        <Lock className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700">Unlock to access this candidate's behavioral fit profile</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        Complete candidate unlock to view detailed behavioral insights and culture fit analysis.
                      </p>
                      <Button 
                        className="bg-accent hover:bg-accent/90 mt-4"
                        onClick={handleUnlockClick}
                      >
                        <Unlock className="w-4 h-4 mr-2" />
                        Unlock Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <InviteToApplyModal
        candidate={candidate}
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={onInviteToApply}
      />

      <BehavioralQuizAssignModal
        candidate={candidate}
        isOpen={showQuizAssignModal}
        onClose={() => setShowQuizAssignModal(false)}
        onAssign={(candidate) => {
          setShowQuizAssignModal(false);
          onUnlock(candidate);
        }}
      />
    </>
  );
};
