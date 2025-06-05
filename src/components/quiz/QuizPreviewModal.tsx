
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, User, CheckCircle } from 'lucide-react';
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [candidateName, setCandidateName] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = quiz.questionsList || [];
  const totalQuestions = questions.length + 1; // +1 for name question
  const currentQuestion = questions[currentQuestionIndex - 1]; // -1 because first question is name

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex === 0) {
      // Name question
      if (!candidateName.trim()) return;
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Quiz submitted:', {
      candidateName,
      answers,
      quiz: quiz.title
    });
    onClose();
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCandidateName('');
    setIsCompleted(false);
  };

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
          <DialogTitle className="text-2xl font-bold text-primary">
            {quiz.title}
          </DialogTitle>
          {quiz.description && (
            <p className="text-gray-600">{quiz.description}</p>
          )}
        </DialogHeader>

        {questions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No questions added to this quiz yet.</p>
            <p className="text-sm text-gray-400 mt-2">Add questions in the quiz editor to preview them.</p>
          </div>
        ) : !isCompleted ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Time limit: {getTotalTime()}</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                {currentQuestionIndex === 0 ? (
                  // Name Question
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-accent" />
                      <h3 className="text-lg font-semibold">What's your name?</h3>
                    </div>
                    <Input
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter your full name"
                      className="text-lg p-4"
                    />
                  </div>
                ) : (
                  // Quiz Questions
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">
                      {currentQuestion?.text}
                    </h3>

                    {currentQuestion?.type === 'multiple-choice' && (
                      <RadioGroup
                        value={answers[currentQuestion.id] || ''}
                        onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                      >
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}

                    {currentQuestion?.type === 'true-false' && (
                      <RadioGroup
                        value={answers[currentQuestion.id] || ''}
                        onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="True" id="true" />
                          <Label htmlFor="true" className="cursor-pointer">True</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="False" id="false" />
                          <Label htmlFor="false" className="cursor-pointer">False</Label>
                        </div>
                      </RadioGroup>
                    )}

                    {currentQuestion?.type === 'short-answer' && (
                      <Textarea
                        value={answers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        placeholder="Enter your answer here..."
                        rows={4}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              {currentQuestionIndex === totalQuestions - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-accent hover:bg-accent/90 text-white"
                  disabled={currentQuestionIndex === 0 ? !candidateName.trim() : !answers[currentQuestion?.id]}
                >
                  Finish Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === 0 ? !candidateName.trim() : !answers[currentQuestion?.id]}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          // Completion Screen
          <div className="text-center space-y-6 py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
              <p className="text-gray-600">Thank you for taking the quiz, {candidateName}.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold">Quiz Summary:</h4>
              <p>Name: {candidateName}</p>
              <p>Questions Answered: {Object.keys(answers).length}</p>
              <p>Quiz: {quiz.title}</p>
            </div>

            <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 text-white">
              Submit Quiz
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
