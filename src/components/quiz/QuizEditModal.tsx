
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Copy, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuizEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: any;
  onSave: (updatedQuiz: any) => void;
}

export function QuizEditModal({ isOpen, onClose, quiz, onSave }: QuizEditModalProps) {
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>(quiz?.questionsList || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  // Mock AI suggested questions based on the quiz type
  const aiQuestions = [
    {
      id: 'role1',
      category: 'Role-specific',
      text: `What are the key responsibilities of a Financial Analyst?`,
      type: 'multiple choice',
      count: 1
    },
    {
      id: 'behavioral1',
      category: 'Behavioral',
      text: `Describe a challenging situation you faced in a Financial Analyst position and how you resolved it.`,
      type: 'short answer',
      count: 1
    },
    {
      id: 'skills1',
      category: 'Skills Assessment',
      text: `Financial Analyst professionals must have strong`,
      type: 'multiple choice',
      count: 1
    }
  ];

  const handleAddQuestion = (question: any) => {
    const newQuestion = {
      ...question,
      id: `selected-${Date.now()}`,
      text: question.text,
      type: question.type.replace(' ', '-'),
      options: question.type === 'multiple choice' ? ['Option 1', 'Option 2', 'Option 3', 'Option 4'] : undefined,
      correctAnswer: ''
    };
    setSelectedQuestions(prev => [...prev, newQuestion]);
    setEditingQuestion(newQuestion);
  };

  const handleAddCustomQuestion = () => {
    const newQuestion = {
      id: `custom-${Date.now()}`,
      text: '',
      type: 'multiple-choice',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: ''
    };
    setSelectedQuestions(prev => [...prev, newQuestion]);
    setEditingQuestion(newQuestion);
  };

  const handleUpdateQuestion = (questionId: string, updates: any) => {
    setSelectedQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, ...updates } : q)
    );
    if (editingQuestion?.id === questionId) {
      setEditingQuestion(prev => ({ ...prev, ...updates }));
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
    if (editingQuestion?.id === questionId) {
      setEditingQuestion(null);
    }
  };

  const handleSave = () => {
    onSave({
      ...quiz,
      questionsList: selectedQuestions
    });
    onClose();
  };

  const filteredQuestions = aiQuestions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateOption = (index: number, value: string) => {
    if (!editingQuestion) return;
    const newOptions = [...(editingQuestion.options || [])];
    newOptions[index] = value;
    handleUpdateQuestion(editingQuestion.id, { options: newOptions });
  };

  const addOption = () => {
    if (!editingQuestion) return;
    const newOptions = [...(editingQuestion.options || []), `Option ${(editingQuestion.options?.length || 0) + 1}`];
    handleUpdateQuestion(editingQuestion.id, { options: newOptions });
  };

  const removeOption = (index: number) => {
    if (!editingQuestion) return;
    const newOptions = editingQuestion.options?.filter((_, i) => i !== index) || [];
    handleUpdateQuestion(editingQuestion.id, { options: newOptions });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Customize Quiz: {quiz?.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 h-[80vh]">
          {/* AI-Suggested Questions */}
          <div className="space-y-4 overflow-hidden">
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

            <div className="space-y-4 overflow-y-auto flex-1">
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
          <div className="space-y-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customize Your Quiz ({selectedQuestions.length})</h3>
              <Button size="sm" onClick={handleAddCustomQuestion}>
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Question
              </Button>
            </div>

            {editingQuestion ? (
              <div className="space-y-4 border rounded-lg p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">
                      Question {selectedQuestions.findIndex(q => q.id === editingQuestion.id) + 1}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {editingQuestion.type.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveQuestion(editingQuestion.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text
                  </label>
                  <Textarea
                    value={editingQuestion.text}
                    onChange={(e) => handleUpdateQuestion(editingQuestion.id, { text: e.target.value })}
                    placeholder="Enter question text"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <Select 
                    value={editingQuestion.type} 
                    onValueChange={(value) => {
                      const updates: any = { type: value };
                      if (value === 'multiple-choice' && !editingQuestion.options) {
                        updates.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
                      } else if (value === 'true-false') {
                        updates.options = ['True', 'False'];
                      } else if (value === 'short-answer') {
                        updates.options = undefined;
                      }
                      handleUpdateQuestion(editingQuestion.id, updates);
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="short-answer">Short Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(editingQuestion.type === 'multiple-choice' || editingQuestion.type === 'true-false') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer Options
                    </label>
                    <div className="space-y-2">
                      {editingQuestion.options?.map((option: string, optionIndex: number) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <input
                            type="radio"
                            name={`correct-${editingQuestion.id}`}
                            checked={editingQuestion.correctAnswer === option}
                            onChange={() => handleUpdateQuestion(editingQuestion.id, { correctAnswer: option })}
                            className="w-4 h-4"
                          />
                          {editingQuestion.type === 'multiple-choice' && editingQuestion.options && editingQuestion.options.length > 2 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(optionIndex)}
                              className="text-red-600 p-1"
                            >
                              ✕
                            </Button>
                          )}
                        </div>
                      ))}
                      {editingQuestion.type === 'multiple-choice' && (
                        <Button variant="outline" size="sm" onClick={addOption} className="mt-2">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Option
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {editingQuestion.type === 'short-answer' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expected Answer (for reference)
                    </label>
                    <Input
                      value={editingQuestion.correctAnswer || ''}
                      onChange={(e) => handleUpdateQuestion(editingQuestion.id, { correctAnswer: e.target.value })}
                      placeholder="Enter expected answer"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg h-full flex flex-col">
                {selectedQuestions.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p className="mb-2">No questions added yet</p>
                      <p className="text-sm">Add questions from AI suggestions or create custom ones</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-3 overflow-y-auto">
                    {selectedQuestions.map((question, index) => (
                      <Card 
                        key={question.id} 
                        className={`border cursor-pointer transition-colors ${
                          editingQuestion?.id === question.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setEditingQuestion(question)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Question {index + 1}</span>
                            <Badge variant="outline" className="text-xs">
                              {question.type.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {question.text || 'Click to edit question'}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
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
