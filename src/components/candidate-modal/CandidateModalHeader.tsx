
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Unlock, UserPlus, X } from 'lucide-react';

interface CandidateModalHeaderProps {
  onUnlock: () => void;
  onInviteToApply: () => void;
  onClose: () => void;
}

export const CandidateModalHeader: React.FC<CandidateModalHeaderProps> = ({
  onUnlock,
  onInviteToApply,
  onClose
}) => {
  return (
    <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <DialogTitle className="text-xl">Candidate Profile</DialogTitle>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="bg-accent hover:bg-accent/90"
          onClick={onUnlock}
        >
          <Unlock className="w-4 h-4 mr-2" />
          Unlock Full Profile
        </Button>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={onInviteToApply}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite to Apply
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </DialogHeader>
  );
};
