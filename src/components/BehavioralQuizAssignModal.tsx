
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Clock, Users, Target } from 'lucide-react';

interface BehavioralQuizAssignModalProps {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (candidate: any) => void;
}

export const BehavioralQuizAssignModal: React.FC<BehavioralQuizAssignModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onAssign
}) => {
  const handleAssign = () => {
    onAssign(candidate);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Assign Behavioral Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Behavioral Assessment Required</h3>
              <p className="text-sm text-gray-600 mb-4">
                Assign a behavioral quiz to {candidate?.name?.split(' ')[0]} to unlock their full profile and behavioral insights.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>15-20 minutes to complete</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span>Personality & culture fit analysis</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Target className="w-4 h-4 text-gray-500" />
              <span>Role-specific behavioral insights</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAssign} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              Assign Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
