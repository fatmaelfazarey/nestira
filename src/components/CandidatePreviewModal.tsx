
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CandidateModalHeader } from '@/components/candidate-modal/CandidateModalHeader';
import { CandidateOverviewTab } from '@/components/candidate-modal/CandidateOverviewTab';
import { CandidateAssessmentsTab } from '@/components/candidate-modal/CandidateAssessmentsTab';
import { CandidateBehavioralTab } from '@/components/candidate-modal/CandidateBehavioralTab';
import { CandidateDocumentsTab } from '@/components/candidate-modal/CandidateDocumentsTab';
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
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <CandidateModalHeader
            onUnlock={handleUnlock}
            onInviteToApply={handleInviteToApply}
            onClose={onClose}
          />

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessments">Assessment Results</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral & Culture Fit</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
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

            <TabsContent value="documents">
              <CandidateDocumentsTab
                isUnlocked={isUnlocked}
                onUnlock={handleUnlock}
              />
            </TabsContent>
          </Tabs>
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
