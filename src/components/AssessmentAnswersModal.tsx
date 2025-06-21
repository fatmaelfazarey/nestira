
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  candidateAnswer: number;
  isCorrect: boolean;
}

interface Assessment {
  name: string;
  score: number;
  questions: Question[];
}

interface AssessmentAnswersModalProps {
  assessment: Assessment | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AssessmentAnswersModal({
  assessment,
  isOpen,
  onClose
}: AssessmentAnswersModalProps) {
  if (!assessment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {assessment.name} - Questions & Answers
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Overall Score</span>
            <Badge variant={assessment.score >= 70 ? "default" : "destructive"} 
                   className={assessment.score >= 70 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {assessment.score}%
            </Badge>
          </div>
          
          <Separator />
          
          <div className="space-y-6">
            {assessment.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 mt-1">
                    {question.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </h4>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded border text-sm ${
                            optionIndex === question.candidateAnswer
                              ? question.isCorrect
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : 'bg-red-50 border-red-200 text-red-800'
                              : optionIndex === question.correctAnswer
                              ? 'bg-blue-50 border-blue-200 text-blue-800'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            <div className="flex gap-1">
                              {optionIndex === question.candidateAnswer && (
                                <Badge variant="outline" className="text-xs">
                                  Your Answer
                                </Badge>
                              )}
                              {optionIndex === question.correctAnswer && (
                                <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                                  Correct
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
