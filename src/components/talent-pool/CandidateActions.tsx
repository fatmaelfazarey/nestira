
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Unlock, UserPlus } from 'lucide-react';

interface CandidateActionsProps {
  candidate: any;
  isUnlocked: boolean;
  onViewProfile: (candidate: any) => void;
  onUnlock: (candidate: any) => void;
  onInviteToApply: (candidate: any) => void;
}

export const CandidateActions: React.FC<CandidateActionsProps> = ({
  candidate,
  isUnlocked,
  onViewProfile,
  onUnlock,
  onInviteToApply
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-gray-500">
        Last active: 2 days ago
      </div>
      
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 text-xs"
          onClick={() => onViewProfile(candidate)}
        >
          <Eye className="w-3 h-3 mr-1" />
          View Profile
        </Button>
        
        {!isUnlocked ? (
          <Button 
            size="sm" 
            className="bg-accent hover:bg-accent/90 flex-1 text-xs"
            onClick={() => onUnlock(candidate)}
          >
            <Unlock className="w-3 h-3 mr-1" />
            Unlock
          </Button>
        ) : (
          <Button 
            size="sm" 
            className="bg-green-600 hover:bg-green-700 text-white flex-1 text-xs"
            onClick={() => onInviteToApply(candidate)}
          >
            <UserPlus className="w-3 h-3 mr-1" />
            Invite
          </Button>
        )}
      </div>
    </div>
  );
};
