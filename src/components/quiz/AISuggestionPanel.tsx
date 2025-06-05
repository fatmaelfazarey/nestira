
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, RefreshCw, Plus, Edit, Bot } from 'lucide-react';
import { Question } from './types';

interface AISuggestionPanelProps {
  questions: Question[];
  onAddToQuiz: (question: Question) => void;
  onRegenerateQuestions: () => void;
  isVisible: boolean;
}

export function AISuggestionPanel({ 
  questions, 
  onAddToQuiz, 
  onRegenerateQuestions, 
  isVisible 
}: AISuggestionPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isVisible) return null;

  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedQuestions = filteredQuestions.reduce((acc, question) => {
    const category = question.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" />
            AI-Suggested Questions
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerateQuestions}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Regenerate
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Grouped Questions */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.entries(groupedQuestions).map(([category, categoryQuestions]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{category}</h3>
                <Badge variant="outline" className="text-xs">
                  {categoryQuestions.length} questions
                </Badge>
              </div>
              
              <div className="space-y-2">
                {categoryQuestions.map((question) => (
                  <div 
                    key={question.id}
                    className="p-3 border rounded-lg hover:shadow-sm transition-shadow bg-white"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">
                        {question.text}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {question.type.replace('-', ' ')}
                          </Badge>
                          {question.difficulty && (
                            <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                              {question.difficulty}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAddToQuiz(question)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchQuery ? 'No questions match your search.' : 'No questions available.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
