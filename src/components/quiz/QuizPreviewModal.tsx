
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle2, X } from 'lucide-react';
import { Question } from './types';

interface QuizPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: {
    title: string;
    description: string;
    questionsList?: Question[];
    timeLimit?: { hours: number; minutes: number; seconds: number };
  };
}

export function QuizPreviewModal({ isOpen, onClose, quiz }: QuizPreviewModalProps) {
  const questions = quiz.questionsList || [];

  const getTotalTime = () => {
    const timeLimit = quiz.timeLimit || { hours: 0, minutes: 30, seconds: 0 };
    const { hours, minutes, seconds } = timeLimit;
    let timeString = '';
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    if (seconds > 0) timeString += `${seconds}s`;
    return timeString.trim() || '30m';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-primary">
              Quiz Preview: {quiz.title}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          {quiz.description && (
            <p className="text-gray-600">{quiz.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Time limit: {getTotalTime()}</span>
            </div>
            <span>{questions.length} questions</span>
          </div>
        </DialogHeader>

        {questions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No questions added to this quiz yet.</p>
            <p className="text-sm text-gray-400 mt-2">Add questions in the quiz editor to preview them.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Preview Mode</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Correct answers are highlighted in green for review purposes.
              </p>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1} of {questions.length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {question.text}
                  </h3>

                  {question.type === 'multiple-choice' && (
                    <div className="space-y-3">
                      {question.options?.map((option, optionIndex) => (
                        <div 
                          key={optionIndex} 
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            question.correctAnswer === option 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            question.correctAnswer === option 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {question.correctAnswer === option && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className={`${
                            question.correctAnswer === option 
                              ? 'text-green-800 font-medium' 
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                          {question.correctAnswer === option && (
                            <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="space-y-3">
                      {['True', 'False'].map((option) => (
                        <div 
                          key={option}
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            question.correctAnswer === option 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            question.correctAnswer === option 
                              ? 'border-green-500 bg-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {question.correctAnswer === option && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className={`${
                            question.correctAnswer === option 
                              ? 'text-green-800 font-medium' 
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                          {question.correctAnswer === option && (
                            <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'short-answer' && (
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-gray-600 text-sm">Answer field (text input)</span>
                      </div>
                      {question.correctAnswer && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Expected Answer:</span>
                          </div>
                          <p className="text-green-700 mt-1">{question.correctAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
