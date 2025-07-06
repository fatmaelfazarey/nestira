
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CandidateSkillsBadgesProps {
  industryExperience: string[];
  financeSubfields: string[];
  softwareTools: string[];
  certifications: string[];
}

export const CandidateSkillsBadges: React.FC<CandidateSkillsBadgesProps> = ({
  industryExperience,
  financeSubfields,
  softwareTools,
  certifications
}) => {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Industry:</p>
        <div className="flex flex-wrap gap-1">
          {industryExperience.map((industry: string) => (
            <Badge key={industry} variant="outline" className="text-xs">
              {industry}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Subfields:</p>
        <div className="flex flex-wrap gap-1">
          {financeSubfields.map((subfield: string) => (
            <Badge key={subfield} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              {subfield}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Tools:</p>
        <div className="flex flex-wrap gap-1">
          {softwareTools.map((tool: string) => (
            <Badge key={tool} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              {tool}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Certs:</p>
        <div className="flex flex-wrap gap-1">
          {certifications.map((cert: string) => (
            <Badge key={cert} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              {cert}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};
