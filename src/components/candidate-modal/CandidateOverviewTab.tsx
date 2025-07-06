
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, Star, GraduationCap } from 'lucide-react';

interface CandidateOverviewTabProps {
  candidate: any;
  isUnlocked: boolean;
}

export const CandidateOverviewTab: React.FC<CandidateOverviewTabProps> = ({
  candidate,
  isUnlocked
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
