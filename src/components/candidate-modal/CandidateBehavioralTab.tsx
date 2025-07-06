
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LockedSection } from './LockedSection';

interface CandidateBehavioralTabProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const CandidateBehavioralTab: React.FC<CandidateBehavioralTabProps> = ({
  isUnlocked,
  onUnlock
}) => {
  if (!isUnlocked) {
    return (
      <LockedSection
        title="Behavioral Profile Locked"
        description="Unlock to access this candidate's behavioral fit profile. Complete candidate unlock to view detailed behavioral insights and culture fit analysis."
        onUnlock={onUnlock}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Personality Profile</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Communication Style</h4>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">Direct & Clear</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Work Approach</h4>
              <Badge variant="outline" className="bg-green-50 text-green-700">Detail-Oriented</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
