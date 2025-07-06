
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Star, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { getCountryFlag } from '@/utils/talentPoolUtils';
import { AddToFolderButton } from '@/components/AddToFolderButton';
import { CandidateSkillsBadges } from './CandidateSkillsBadges';
import { CandidateActions } from './CandidateActions';

interface CandidateCardProps {
  candidate: any;
  isUnlocked: boolean;
  shouldShowScore: boolean;
  isFavorite: boolean;
  scoreVisibility: any;
  onToggleFavorite: (id: number) => void;
  onUnlock: (candidate: any) => void;
  onViewProfile: (candidate: any) => void;
  onInviteToApply: (candidate: any) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  isUnlocked,
  shouldShowScore,
  isFavorite,
  scoreVisibility,
  onToggleFavorite,
  onUnlock,
  onViewProfile,
  onInviteToApply
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 relative">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <span>{candidate.name}</span>
                <span className="text-lg">{getCountryFlag(candidate.country)}</span>
              </CardTitle>
              <p className="text-sm text-gray-600">{candidate.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  {shouldShowScore ? (
                    <div className={`transition-all ease-in-out duration-300 ${scoreVisibility.isAnimating ? 'animate-scale-in' : ''}`}>
                      <CircularProgress value={candidate.score} size={60} strokeWidth={4} />
                    </div>
                  ) : (
                    <div className="relative">
                      <CircularProgress value={0} size={60} strokeWidth={4} className="opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-gray-400 text-center">Hidden</span>
                      </div>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {shouldShowScore ? `Matching Score: ${candidate.score}%` : 'Use filters, job post, or AI search to reveal match'}
                </p>
              </TooltipContent>
            </Tooltip>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onToggleFavorite(candidate.id)} 
              className="text-yellow-500 hover:text-yellow-600 p-1"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add to Folder Button */}
        <div className="mb-3">
          <AddToFolderButton candidate={candidate} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {candidate.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4" />
          {candidate.experience} experience
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          {candidate.salaryExpectation}
        </div>

        <CandidateSkillsBadges
          industryExperience={candidate.industryExperience}
          financeSubfields={candidate.financeSubfields}
          softwareTools={candidate.softwareTools}
          certifications={candidate.certifications}
        />

        <CandidateActions
          candidate={candidate}
          isUnlocked={isUnlocked}
          onViewProfile={onViewProfile}
          onUnlock={onUnlock}
          onInviteToApply={onInviteToApply}
        />
      </CardContent>
    </Card>
  );
};
