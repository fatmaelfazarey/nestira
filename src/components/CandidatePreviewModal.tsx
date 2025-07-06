
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
  Heart,
  Users
} from 'lucide-react';
import { getCountryFlag } from '@/utils/talentPoolUtils';

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
  if (!candidate) return null;

  // Format name to show only first name and last initial
  const formatPreviewName = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl">Candidate Preview</DialogTitle>
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

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback className="text-2xl">{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{formatPreviewName(candidate.name)}</h2>
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

          {/* Behavioral & Culture Fit Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Behavioral & Culture Fit
                </h3>
                {!isUnlocked && (
                  <Button
                    size="sm"
                    onClick={() => onUnlock(candidate)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Unlock Profile
                  </Button>
                )}
              </div>
              
              {isUnlocked ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Work Style</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          Detail-oriented
                        </Badge>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          Collaborative
                        </Badge>
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          Analytical
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Communication Style</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                          Direct
                        </Badge>
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                          Data-driven
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Cultural Values</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        Innovation
                      </Badge>
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        Excellence
                      </Badge>
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        Integrity
                      </Badge>
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        Teamwork
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-gray-500">
                  <div className="blur-sm select-none">
                    <p className="text-sm">Work Style: Detail-oriented, Collaborative, Analytical</p>
                    <p className="text-sm">Communication: Direct, Data-driven</p>
                    <p className="text-sm">Values: Innovation, Excellence, Integrity, Teamwork</p>
                  </div>
                  <p className="text-xs text-gray-400 italic">
                    Behavioral profile is hidden. Click "Unlock Profile" to reveal detailed insights.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
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

          {/* Contact Information Blurred */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="blur-sm select-none">📧 john.doe@email.com</p>
                <p className="blur-sm select-none">📱 +1 (555) 123-4567</p>
                <p className="blur-sm select-none">💼 linkedin.com/in/johndoe</p>
              </div>
              <p className="text-xs text-gray-400 mt-2 italic">
                Contact details are hidden. Click "Unlock Full Profile" to reveal.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
