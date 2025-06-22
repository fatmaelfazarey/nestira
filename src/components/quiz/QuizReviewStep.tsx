
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Image, Users, CheckCircle } from 'lucide-react';

interface QuizReviewStepProps {
  roleTitle: string;
  selectedTests: any[];
  onCreateQuiz: (quizData: any) => void;
}

export function QuizReviewStep({ roleTitle, selectedTests, onCreateQuiz }: QuizReviewStepProps) {
  const [quizName, setQuizName] = useState(`${roleTitle} Assessment`);
  const [quizImage, setQuizImage] = useState<File | null>(null);

  const totalQuestions = selectedTests.reduce((acc, test) => acc + (test.questionCount || 10), 0);
  const totalTime = selectedTests.reduce((acc, test) => {
    const minutes = parseInt(test.timeEstimate || '15');
    return acc + minutes;
  }, 0);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setQuizImage(file);
    }
  };

  const handleCreateQuiz = () => {
    const quizData = {
      name: quizName,
      roleTitle,
      tests: selectedTests,
      totalQuestions,
      totalTime,
      image: quizImage
    };
    onCreateQuiz(quizData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Review & Create Your Quiz</h2>
        <p className="text-gray-600">
          Almost ready! Review your quiz details and create your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-name">Quiz Name</Label>
                <Input
                  id="quiz-name"
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                  placeholder="Enter quiz name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quiz-image">Quiz Image (Optional)</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="quiz-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  {quizImage && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Image className="w-3 h-3" />
                      Image uploaded
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedTests.map((test, index) => (
                  <div key={test.id || index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">{test.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {test.tags?.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{test.timeEstimate || '15 min'}</p>
                      <p className="text-xs text-gray-500">{test.questionCount || 10} questions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Quiz Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Quiz Name</span>
                  </div>
                  <span className="text-sm font-medium">{quizName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Role</span>
                  </div>
                  <span className="text-sm font-medium">{roleTitle}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Total Time</span>
                  </div>
                  <span className="text-sm font-medium">~{totalTime} min</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Questions</span>
                  </div>
                  <span className="text-sm font-medium">{totalQuestions}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">Tests</Badge>
                  </div>
                  <span className="text-sm font-medium">{selectedTests.length}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={handleCreateQuiz}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  disabled={!quizName.trim()}
                >
                  Create Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
