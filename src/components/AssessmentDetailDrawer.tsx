import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Shield, Monitor, MapPin, Camera, Maximize, MousePointer, Play, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

interface Assessment {
  name: string;
  score: number;
  status: string;
  opinion: string;
  questions?: Array<{
    id: number;
    question: string;
    candidateAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
}

interface AssessmentDetailDrawerProps {
  assessment: Assessment | null;
  isOpen: boolean;
  onClose: () => void;
  antiCheatData: {
    device: string;
    location: string;
    filledOnce: boolean;
    webcamEnabled: boolean;
    fullScreenActive: boolean;
    mouseInWindow: boolean;
  };
}

export function AssessmentDetailDrawer({
  assessment,
  isOpen,
  onClose,
  antiCheatData
}: AssessmentDetailDrawerProps) {
  if (!assessment) return null;

  // Mock questions data
  const mockQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of financial statements?",
      candidateAnswer: "To provide information about financial position and performance",
      correctAnswer: "To provide information about financial position and performance",
      isCorrect: true
    },
    {
      id: 2,
      question: "Which principle requires expenses to be matched with revenues?",
      candidateAnswer: "Matching principle",
      correctAnswer: "Matching principle",
      isCorrect: true
    },
    {
      id: 3,
      question: "What does GAAP stand for?",
      candidateAnswer: "Generally Accepted Accounting Practices",
      correctAnswer: "Generally Accepted Accounting Principles",
      isCorrect: false
    }
  ];

  const filterOptions = ['all', 'correct', 'incorrect'];
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredQuestions = mockQuestions.filter(q => {
    if (selectedFilter === 'correct') return q.isCorrect;
    if (selectedFilter === 'incorrect') return !q.isCorrect;
    return true;
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] max-w-[90vw] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-xl font-semibold">
            {assessment.name} - Detailed Results
          </SheetTitle>
        </SheetHeader>
        
        <div className="h-[calc(100vh-100px)] overflow-hidden">
          <div className="grid grid-cols-2 h-full">
            {/* Left Column - Answers Display */}
            <div className="border-r p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Candidate Answers</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Filter:</span>
                    <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-auto">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="correct" className="text-xs">Correct</TabsTrigger>
                        <TabsTrigger value="incorrect" className="text-xs">Incorrect</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredQuestions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        {question.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 space-y-2">
                          <p className="font-medium text-gray-900">
                            Question {index + 1}: {question.question}
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium text-gray-700">Candidate's Answer:</span>{' '}
                              <span className={question.isCorrect ? 'text-green-700' : 'text-red-700'}>
                                {question.candidateAnswer}
                              </span>
                            </p>
                            {!question.isCorrect && (
                              <p className="text-sm">
                                <span className="font-medium text-gray-700">Correct Answer:</span>{' '}
                                <span className="text-green-700">{question.correctAnswer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Anti-Cheat Monitor */}
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Anti-cheating Monitor */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#ff5f1b]" />
                  Anti-Cheating Monitor
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Device used
                      </span>
                      <span className="font-medium">{antiCheatData.device}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location
                      </span>
                      <span className="font-medium">{antiCheatData.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Filled only once from IP?</span>
                      <Badge variant={antiCheatData.filledOnce ? "default" : "destructive"} className={antiCheatData.filledOnce ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {antiCheatData.filledOnce ? "Yes" : "No"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Webcam enabled?
                      </span>
                      <Badge variant={antiCheatData.webcamEnabled ? "default" : "destructive"} className={antiCheatData.webcamEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {antiCheatData.webcamEnabled ? "Yes" : "No"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Maximize className="w-4 h-4" />
                        Full-screen mode active?
                      </span>
                      <Badge variant={antiCheatData.fullScreenActive ? "default" : "destructive"} className={antiCheatData.fullScreenActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {antiCheatData.fullScreenActive ? "Yes" : "No"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-2">
                        <MousePointer className="w-4 h-4" />
                        Mouse stayed in window?
                      </span>
                      <Badge variant={antiCheatData.mouseInWindow ? "default" : "destructive"} className={antiCheatData.mouseInWindow ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {antiCheatData.mouseInWindow ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Assessment Video */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Assessment Recording</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <div className="aspect-video bg-black flex items-center justify-center relative">
                    <img 
                      src="/lovable-uploads/d3a8d219-4f65-455c-9c59-efdfff1fd41b.png" 
                      alt="Assessment video preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                        <Play className="w-6 h-6 mr-2" />
                        Watch Full Recording
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Assessment Recording</span>
                      <span>15:42 / 45:00</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-[#ff5f1b] h-1 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
