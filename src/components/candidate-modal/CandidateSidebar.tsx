import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, DollarSign, Mail, Phone, Check } from 'lucide-react';
import { getCountryFlag } from '@/utils/talentPoolUtils';

interface CandidateSidebarProps {
  candidate: any;
  isUnlocked: boolean;
}

export const CandidateSidebar: React.FC<CandidateSidebarProps> = ({
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
      {/* Profile Photo */}
      <div className="flex justify-center">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={candidate.photo} alt={candidate.name} />
            <AvatarFallback className="text-4xl">{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          {isUnlocked ? candidate.name : formatPreviewName(candidate.name)}
        </h2>
        <p className="text-lg text-orange-600 font-medium">{candidate.title}</p>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Briefcase className="w-4 h-4" />
          <span>{candidate.yearsOfExperience} years</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>2024-01-15</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>{candidate.salaryExpectation}</span>
        </div>
      </div>

      {/* Contact Info */}
      {isUnlocked && (
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-blue-600">sarah.johnson@email.com</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>+971 50 123 4567</span>
          </div>
        </div>
      )}

      {/* Match Score */}
      <div className="pt-6 border-t">
        <h3 className="font-semibold text-gray-800 mb-4">MATCH SCORE</h3>
        <div className="text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#22c55e"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${candidate.score * 2.83} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">{candidate.score}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Overall Match</p>
        </div>
      </div>
    </div>
  );
};