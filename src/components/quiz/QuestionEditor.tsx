
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Edit, Trash2, Save, X, Plus } from 'lucide-react';
import { Question } from './types';

interface QuestionEditorProps {
  question: Question;
  index: number;
  onUpdate: (updates: Partial<Question>) => void;
  onRemove: () => void;
  dragHandleProps: any;
}

export function QuestionEditor({ 
  question, 
  index, 
  onUpdate, 
  onRemove, 
  dragHandleProps 
}: QuestionEditorProps) {
  const [isEditing, setIsEditing] = useState(question.isEditing || false);
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleSave = () => {
    onUpdate({ ...editedQuestion, isEditing: false });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion(question);
    setIsEditing(false);
    onUpdate({ isEditing: false });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedQuestion(question);
    onUpdate({ isEditing: true });
  };

  const handleTypeChange = (newType: string) => {
    const updatedQuestion = { ...editedQuestion, type: newType as Question['type'] };
    
    // Set default options based on type
    if (newType === 'multiple-choice' && !updatedQuestion.options) {
      updatedQuestion.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    } else if (newType === 'true-false') {
      updatedQuestion.options = ['True', 'False'];
    } else if (newType === 'short-answer') {
      updatedQuestion.options = undefined;
    }
    
    setEditedQuestion(updatedQuestion);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(editedQuestion.options || [])];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(editedQuestion.options || []), `Option ${(editedQuestion.options?.length || 0) + 1}`];
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = editedQuestion.options?.filter((_, i) => i !== index) || [];
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...dragHandleProps} className="cursor-move">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
          <Badge variant="outline" className="text-xs">
            {question.type.replace('-', ' ')}
          </Badge>
          {question.difficulty && (
            <Badge variant="secondary" className="text-xs">
              {question.difficulty}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              <Edit className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4 border-t pt-3">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text
            </label>
            <Textarea
              value={editedQuestion.text}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, text: e.target.value })}
              placeholder="Enter question text"
              rows={2}
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <Select value={editedQuestion.type} onValueChange={handleTypeChange}>
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

          {/* Options for Multiple Choice and True/False */}
          {(editedQuestion.type === 'multiple-choice' || editedQuestion.type === 'true-false') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer Options
              </label>
              <div className="space-y-2">
                {editedQuestion.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                    />
                    <input
                      type="radio"
                      name={`correct-${editedQuestion.id}`}
                      checked={editedQuestion.correctAnswer === option}
                      onChange={() => setEditedQuestion({ ...editedQuestion, correctAnswer: option })}
                      className="w-4 h-4"
                    />
                    {editedQuestion.type === 'multiple-choice' && editedQuestion.options && editedQuestion.options.length > 2 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(optionIndex)}
                        className="text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
                {editedQuestion.type === 'multiple-choice' && (
                  <Button variant="outline" size="sm" onClick={addOption}>
                    <Plus className="w-3 h-3 mr-1" />
                    Add Option
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Correct Answer for Short Answer */}
          {editedQuestion.type === 'short-answer' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Answer (for reference)
              </label>
              <Input
                value={editedQuestion.correctAnswer || ''}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })}
                placeholder="Enter expected answer"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="border-t pt-3">
          {question.text ? (
            <>
              <p className="font-medium text-gray-900 mb-2">{question.text}</p>
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-1">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full border ${
                        question.correctAnswer === option ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`} />
                      <span className="text-sm text-gray-600">{option}</span>
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'true-false' && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border ${
                      question.correctAnswer === 'True' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`} />
                    <span className="text-sm text-gray-600">True</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full border ${
                      question.correctAnswer === 'False' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`} />
                    <span className="text-sm text-gray-600">False</span>
                  </div>
                </div>
              )}
              {question.type === 'short-answer' && question.correctAnswer && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Expected: </span>
                  {question.correctAnswer}
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-500 italic">
              Click edit to add question content
            </div>
          )}
        </div>
      )}
    </div>
  );
}
