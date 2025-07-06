
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Briefcase, DollarSign, GraduationCap, Star, Unlock } from 'lucide-react';
import { getCountryFlag } from '@/utils/talentPoolUtils';

interface CandidateOverviewTabProps {
  candidate: any;
  isUnlocked: boolean;
}

export const CandidateOverviewTab: React.FC<CandidateOverviewTabProps> = ({
  candidate,
  isUnlocked
}) => {
  // Format name to show only first name and last initial
  const formatPreviewName = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1].charAt(0)}.`;
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};
