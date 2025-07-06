
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CandidateModalHeader } from '@/components/candidate-modal/CandidateModalHeader';
import { CandidateSidebar } from '@/components/candidate-modal/CandidateSidebar';
import { CandidateOverviewTab } from '@/components/candidate-modal/CandidateOverviewTab';
import { CandidateAssessmentsTab } from '@/components/candidate-modal/CandidateAssessmentsTab';
import { CandidateBehavioralTab } from '@/components/candidate-modal/CandidateBehavioralTab';
import { AssessmentAnswersModal } from '@/components/AssessmentAnswersModal';

interface CandidatePreviewModalProps {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (candidate: any) => void;
  onInviteToApply: (candidate: any) => void;
  isUnlocked: boolean;
}

export const CandidatePreviewModal: React.FC<CandidatePreviewModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onUnlock,
  onInviteToApply,
  isUnlocked
}) => {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  if (!candidate) return null;

  const handleViewAssessment = (assessment: any) => {
    setSelectedAssessment(assessment);
    setShowAssessmentModal(true);
  };

  const handleUnlock = () => {
    onUnlock(candidate);
  };

  const handleInviteToApply = () => {
    onInviteToApply(candidate);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <CandidateModalHeader
            candidate={candidate}
            onUnlock={handleUnlock}
            onInviteToApply={handleInviteToApply}
            onClose={onClose}
            isUnlocked={isUnlocked}
          />

          <div className="flex">
            {/* Left Sidebar */}
            <div className="w-80 bg-gray-50 p-6 space-y-6">
              <CandidateSidebar
                candidate={candidate}
                isUnlocked={isUnlocked}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="behavioral" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Behavioral & Culture Fit
                  </TabsTrigger>
                  <TabsTrigger value="assessments">Assessment Results</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <CandidateOverviewTab
                    candidate={candidate}
                    isUnlocked={isUnlocked}
                  />
                </TabsContent>

                <TabsContent value="assessments">
                  <CandidateAssessmentsTab
                    isUnlocked={isUnlocked}
                    onUnlock={handleUnlock}
                    onViewAssessment={handleViewAssessment}
                  />
                </TabsContent>

                <TabsContent value="behavioral">
                  <CandidateBehavioralTab
                    isUnlocked={isUnlocked}
                    onUnlock={handleUnlock}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AssessmentAnswersModal
        assessment={selectedAssessment}
        isOpen={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
      />
    </>
  );
};
