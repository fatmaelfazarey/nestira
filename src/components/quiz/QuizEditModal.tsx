
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QuizEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: any;
  onSave: (updatedQuiz: any) => void;
}

export function QuizEditModal({ isOpen, onClose, quiz, onSave }: QuizEditModalProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock AI suggested questions based on the quiz type
  const aiQuestions = [
    {
      id: 'role1',
      category: 'Role-specific',
      text: `What are the key responsibilities of a ${quiz?.title?.includes('Finance') ? 'Financial Analyst' : 'Accounting Manager'}?`,
      type: 'multiple choice',
      count: 1
    },
    {
      id: 'behavioral1',
      category: 'Behavioral',
      text: `Describe a challenging situation you faced in a ${quiz?.title?.includes('Finance') ? 'Financial Analyst' : 'Accounting Manager'} position and how you resolved it.`,
      type: 'short answer',
      count: 1
    },
    {
      id: 'skills1',
      category: 'Skills Assessment',
      text: `${quiz?.title?.includes('Finance') ? 'Financial Analyst' : 'Accounting Manager'} professionals must have strong`,
      type: 'multiple choice',
      count: 1
    }
  ];

  const handleAddQuestion = (question: any) => {
    setSelectedQuestions(prev => [...prev, { ...question, id: `selected-${Date.now()}` }]);
  };

  const handleSave = () => {
    onSave({
      ...quiz,
      customQuestions: selectedQuestions
    });
    onClose();
  };

  const filteredQuestions = aiQuestions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Customize Quiz: {quiz?.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-orange-800 mb-2">Selected Quiz Templates</h3>
          <div className="flex gap-3">
            <div className="bg-white rounded p-3 border border-orange-300 flex items-center gap-2">
              <span className="text-lg">{quiz?.icon || '💻'}</span>
              <div>
                <span className="font-medium text-sm">{quiz?.title}</span>
                <div className="text-xs text-gray-600">{quiz?.timeEstimate}</div>
              </div>
            </div>
            <div className="bg-white rounded p-3 border border-orange-300 flex items-center gap-2">
              <span className="text-lg">✏️</span>
              <div>
                <span className="font-medium text-sm">Custom Quiz</span>
                <div className="text-xs text-gray-600">15 min</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* AI-Suggested Questions */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 font-bold">🤖</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI-Suggested Questions</h3>
                <Button variant="outline" size="sm" className="mt-1">
                  🔄 Regenerate
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-4 overflow-y-auto max-h-96">
              {['Role-specific', 'Behavioral', 'Skills Assessment'].map((category) => {
                const questionsInCategory = filteredQuestions.filter(q => q.category === category);
                if (questionsInCategory.length === 0) return null;
                
                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{category}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {questionsInCategory.length} question{questionsInCategory.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    
                    {questionsInCategory.map((question) => (
                      <Card key={question.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <p className="text-sm mb-2">{question.text}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {question.type}
                            </Badge>
                            <Button 
                              size="sm" 
                              onClick={() => handleAddQuestion(question)}
                              className="h-8"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customize Your Quiz */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customize Your Quiz ({selectedQuestions.length})</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Question
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-lg min-h-96 flex items-center justify-center">
              {selectedQuestions.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p className="mb-2">No questions added yet</p>
                  <p className="text-sm">Add questions from AI suggestions or create custom ones</p>
                </div>
              ) : (
                <div className="w-full p-4 space-y-3">
                  {selectedQuestions.map((question, index) => (
                    <Card key={question.id} className="border border-gray-200">
                      <CardContent className="p-3">
                        <p className="text-sm">{question.text}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline" className="text-xs">
                            {question.type}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedQuestions(prev => prev.filter(q => q.id !== question.id))}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#ff5f1b] hover:bg-[#e54e0f]">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
