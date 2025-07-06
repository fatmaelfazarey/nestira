
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye } from 'lucide-react';
import { LockedSection } from './LockedSection';

interface CandidateAssessmentsTabProps {
  isUnlocked: boolean;
  onUnlock: () => void;
  onViewAssessment: (assessment: any) => void;
}

export const CandidateAssessmentsTab: React.FC<CandidateAssessmentsTabProps> = ({
  isUnlocked,
  onUnlock,
  onViewAssessment
}) => {
  // Mock assessment data
  const mockAssessments = [
    {
      name: "Financial Analysis Assessment",
      score: 85,
      completedDate: "2024-01-15",
      duration: "45 minutes",
      questions: [
        {
          id: 1,
          question: "What is the primary purpose of financial ratio analysis?",
          options: [
            "To calculate taxes",
            "To evaluate company performance and financial health",
            "To determine employee salaries",
            "To set product prices"
          ],
          correctAnswer: 1,
          candidateAnswer: 1,
          isCorrect: true
        },
        {
          id: 2,
          question: "Which of the following is a liquidity ratio?",
          options: [
            "Debt-to-equity ratio",
            "Current ratio",
            "Return on assets",
            "Price-to-earnings ratio"
          ],
          correctAnswer: 1,
          candidateAnswer: 0,
          isCorrect: false
        }
      ]
    },
    {
      name: "Excel Proficiency Test",
      score: 92,
      completedDate: "2024-01-20",
      duration: "30 minutes",
      questions: []
    }
  ];

  if (!isUnlocked) {
    return (
      <LockedSection
        title="Assessment Results Locked"
        description="Unlock to access this candidate's assessment scores and detailed performance analysis."
        onUnlock={onUnlock}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {mockAssessments.map((assessment, index) => (
          <Card key={index} className="hover:border-gray-300 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold">{assessment.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Completed: {new Date(assessment.completedDate).toLocaleDateString()}
                    </span>
                    <span>{assessment.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={assessment.score >= 70 ? "default" : "destructive"}
                    className={assessment.score >= 70 ? "bg-green-100 text-green-800" : ""}
                  >
                    {assessment.score}%
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewAssessment(assessment)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
