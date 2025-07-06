
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CandidateCard } from './CandidateCard';

interface CandidateGridViewProps {
  sortedCandidates: any[];
  isRevealed: boolean;
  scoreVisibility: any;
  favorites: Set<number>;
  unlockedCandidates: Set<number>;
  onToggleFavorite: (id: number) => void;
  onUnlock: (candidate: any) => void;
  onViewProfile?: (candidate: any) => void;
  onInviteToApply?: (candidate: any) => void;
}

export const CandidateGridView: React.FC<CandidateGridViewProps> = ({
  sortedCandidates,
  isRevealed,
  scoreVisibility,
  favorites,
  unlockedCandidates,
  onToggleFavorite,
  onUnlock,
  onViewProfile,
  onInviteToApply
}) => {
  const handleViewProfile = (candidate: any) => {
    if (onViewProfile) {
      onViewProfile(candidate);
    }
  };

  const handleInviteToApply = (candidate: any) => {
    if (onInviteToApply) {
      onInviteToApply(candidate);
    }
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCandidates.map(candidate => {
          const isUnlocked = unlockedCandidates.has(candidate.id);
          const shouldShowScore = isRevealed && scoreVisibility.showScores || isUnlocked;
          const isFavorite = favorites.has(candidate.id);

          return (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isUnlocked={isUnlocked}
              shouldShowScore={shouldShowScore}
              isFavorite={isFavorite}
              scoreVisibility={scoreVisibility}
              onToggleFavorite={onToggleFavorite}
              onUnlock={onUnlock}
              onViewProfile={handleViewProfile}
              onInviteToApply={handleInviteToApply}
            />
          );
        })}
      </div>
    </TooltipProvider>
  );
};
