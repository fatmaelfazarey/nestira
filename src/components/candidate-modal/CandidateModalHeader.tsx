
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Unlock, UserPlus, X } from 'lucide-react';

interface CandidateModalHeaderProps {
  candidate: any;
  onUnlock: () => void;
  onInviteToApply: () => void;
  onClose: () => void;
  isUnlocked: boolean;
}

export const CandidateModalHeader: React.FC<CandidateModalHeaderProps> = ({
  candidate,
  onUnlock,
  onInviteToApply,
  onClose,
  isUnlocked
}) => {
  return (
    <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b">
      <div className="flex items-center gap-3">
        <DialogTitle className="text-xl font-semibold">Candidate Profile</DialogTitle>
        <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Verified
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Unlock className="w-4 h-4 text-yellow-500" />
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
