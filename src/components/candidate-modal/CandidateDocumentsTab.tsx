
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download, Award, Eye } from 'lucide-react';
import { LockedSection } from './LockedSection';

interface CandidateDocumentsTabProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const CandidateDocumentsTab: React.FC<CandidateDocumentsTabProps> = ({
  isUnlocked,
  onUnlock
}) => {
  if (!isUnlocked) {
    return (
      <LockedSection
        title="Documents Locked"
        description="Unlock to access this candidate's CV, cover letter, certificates, and other uploaded documents."
        onUnlock={onUnlock}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">Resume / CV</h4>
                  <p className="text-sm text-gray-500">Updated 2 weeks ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-medium">Cover Letter</h4>
                  <p className="text-sm text-gray-500">Finance Manager Application</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-medium">CPA Certificate</h4>
                  <p className="text-sm text-gray-500">Professional Certification</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium">Complete Profile Package</h4>
                  <p className="text-sm text-gray-500">All documents in one download</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
