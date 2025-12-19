
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Copy, Trash2, Save, CheckCircle, XCircle, Upload, FileText } from 'lucide-react';
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
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState({ hours: 0, minutes: 0, seconds: 0 });

  console.log('Quiz --------- ', quiz)
  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title || '');
      setDescription(quiz.description || '');
      setTimeLimit(quiz.timeLimit);
      setSelectedQuestions(quiz.questionsList || []);// quiz.method=='search'
    }
  }, [quiz]);

  const aiQuestions = [
    {
      id: 'role1',
      category: 'Role-specific',
      text: `What are the key responsibilities of a ${quiz?.personalizationParams?.title || 'this role'}?`,
      type: 'mcq',
      count: 1
    },
    {
      id: 'behavioral1',
      category: 'Behavioral',
      text: `Describe a challenging situation you faced in a ${quiz?.personalizationParams?.title || 'similar'} position and how you resolved it.`,
      type: 'short_answer',
      count: 1
    },
    {
      id: 'skills1',
      category: 'Skills Assessment',
      text: `${quiz?.personalizationParams?.title || 'Professionals'} in this role must have strong analytical skills.`,
      type: 'true_false',
      count: 1
    },
    {
      id: 'technical1',
      category: 'Technical',
      text: `Which software tools are most important for a ${quiz?.personalizationParams?.title || 'this role'}?`,
      type: 'mcq',
      count: 1
    },
    {
      id: 'industry1',
      category: 'Industry Knowledge',
      text: `What trends are currently affecting the ${quiz?.personalizationParams?.title || 'this'} field?`,
      type: 'short_answer',
      count: 1
    },
    {
      id: 'file1',
      category: 'Document Submission',
      text: `Submit your analysis document for ${quiz?.personalizationParams?.title || 'this role'}`,
      type: 'file_upload',
      count: 1
    }
  ];

  const handleAddQuestion = (question: any) => {
    const newQuestion = {
      ...question,
      id: `selected-${Date.now()}`,
      text: question.text,
      type: question.type,
      options: question.type === 'mcq' ? ['Option 1', 'Option 2', 'Option 3', 'Option 4'] : undefined,
      correctAnswer: '',
      isEditing: true,
      file: question.type === 'file_upload' ? null : undefined
    };
    setSelectedQuestions(prev => [...prev, newQuestion]);
    setEditingQuestion(newQuestion);
  };

  const handleAddCustomQuestion = () => {
    const newQuestion = {
      id: `custom-${Date.now()}`,
      text: '',
      type: 'mcq',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: '',
      isEditing: true
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, questionId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload only PDF, Word, or Excel files');
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        file: file // Store the actual file object for upload
      };

      handleUpdateQuestion(questionId, { file: fileData });
    }
  };

  const handleRemoveFile = (questionId: string) => {
    handleUpdateQuestion(questionId, { file: null });
  };

  const handleSaveQuestion = () => {
    if (editingQuestion) {
      if (!editingQuestion.text.trim()) {
        alert('Please enter question text');
        return;
      }

      if ((editingQuestion.type === 'mcq' || editingQuestion.type === 'true_false') &&
        !editingQuestion.correctAnswer) {
        alert('Please select a correct answer');
        return;
      }

      handleUpdateQuestion(editingQuestion.id, {
        ...editingQuestion,
        isEditing: false
      });
      setEditingQuestion(null);
    }
  };

  const handleCancelEdit = () => {
    if (editingQuestion) {
      if (!editingQuestion.text.trim()) {
        handleRemoveQuestion(editingQuestion.id);
      } else {
        handleUpdateQuestion(editingQuestion.id, {
          isEditing: false
        });
      }
      setEditingQuestion(null);
    }
  };

  const handleSaveQuiz = async () => {
    // Prepare files for upload
    const questionsWithFiles = await Promise.all(
      selectedQuestions.map(async (question) => {
        if (question.type === 'file_upload' && question.file && question.file.file) {
          // In a real implementation, you would upload the file here
          // and get back a file URL or reference
          // For now, we'll keep the file object and handle upload in the parent
          return question;
        }
        return question;
      })
    );

    const updatedQuiz = {
      ...quiz,
      title,
      description,
      timeLimit,
      questionsList: questionsWithFiles,
      totalQuestions: selectedQuestions.length
    };

    onSave(updatedQuiz);
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

  const updateTimeLimit = (field: string, value: number) => {
    setTimeLimit(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderQuestionPreview = (question: any) => {
    return (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{question.text}</h3>

          {question.type === 'mcq' && question.options && (
            <div className="space-y-3">
              {question.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${question.correctAnswer === option
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                    }`}>
                    {question.correctAnswer === option && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className={`flex-1 ${question.correctAnswer === option
                    ? 'text-green-700 font-medium'
                    : 'text-gray-700'
                    }`}>
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === 'true_false' && (
            <div className="space-y-3">
              {['True', 'False'].map((option) => (
                <div key={option} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${question?.correctAnswer === option
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                    }`}>
                    {question.correctAnswer === option && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className={`flex-1 ${question === option
                    ? 'text-green-700 font-medium'
                    : 'text-gray-700'
                    }`}>
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === 'short_answer' && (
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Text input field will appear here</p>
                <div className="h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Answer field</span>
                </div>
              </div>
              {question.correctAnswer && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Expected Answer:</span>
                  </div>
                  <p className="text-green-700">{question.correctAnswer}</p>
                </div>
              )}
            </div>
          )}

          {question.type === 'file_upload' && (
            <div className="space-y-3">
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">File upload field will appear here</p>
                <p className="text-xs text-gray-500">Supports PDF, Word, Excel files (max 10MB)</p>
              </div>
              {question.file && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">{question.file.name}</p>
                        <p className="text-xs text-blue-600">
                          {formatFileSize(question.file.size)} • {question.file.type}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Attached
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <Badge variant="outline" className="text-xs">
            {question.type.replace('_', ' ')}
          </Badge>
          <div className="flex items-center gap-4">
            <span>Question {selectedQuestions.findIndex(q => q.id === question.id) + 1}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Quiz: {quiz?.title || 'Untitled Quiz'}
          </DialogTitle>

          {/* Quiz Title & Description */}
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Quiz Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter quiz description"
                rows={2}
              />
            </div>
            <div className='flex  flex-col'>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left ">
                Time Limit
              </label>
              <div className='flex md:flex-row flex-col gap-2 w-full '>
                <div className='text-left w-full'>
                  <label className="block text-xs text-gray-500">Hours</label>
                  <Input
                    type="number"
                    min="0"
                    value={timeLimit.hours}
                    onChange={(e) => updateTimeLimit('hours', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className='text-left w-full'>
                  <label className="block text-xs text-gray-500">Minutes</label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={timeLimit.minutes}
                    onChange={(e) => updateTimeLimit('minutes', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className='text-left w-full'>
                  <label className="block text-xs text-gray-500">Seconds</label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={timeLimit.seconds}
                    onChange={(e) => updateTimeLimit('seconds', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>



        <div className=" flex flex-col-reverse md:flex-row gap-6 ">
          {/* AI-Suggested Questions */}
          {quiz.method != 'search' && (<div className="space-y-4 overflow-scroll w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-orange-600 font-bold">🤖</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI-Suggested Questions</h3>
                <p className="text-sm text-gray-600">Based on {quiz?.personalizationParams?.title || 'selected role'}</p>
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
              {['Role-specific', 'Behavioral', 'Technical', 'Skills Assessment', 'Industry Knowledge', 'Document Submission'].map((category) => {
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
                      <Card key={question.id} className="border border-gray-200 hover:border-gray-300 transition-colors">
                        <CardContent className="p-4">
                          <p className="text-sm mb-2">{question.text}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {question.type.replace('_', ' ')}
                            </Badge>
                            <Button
                              size="sm"
                              onClick={() => handleAddQuestion(question)}
                              className="h-8 text-primary-c"
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
          </div>)}


          {/* Customize Your Quiz */}
          <div className="space-y-4 overflow-scroll w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your Quiz Questions ({selectedQuestions.length})</h3>
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
                      Editing Question {selectedQuestions.findIndex(q => q.id === editingQuestion.id) + 1}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {editingQuestion.type.replace('_', ' ')}
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
                    Question Text *
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
                      if (value === 'mcq' && !editingQuestion.options) {
                        updates.options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
                      } else if (value === 'true_false') {
                        updates.options = ['True', 'False'];
                      } else if (value === 'short_answer' || value === 'file_upload') {
                        updates.options = undefined;
                        updates.correctAnswer = '';
                      }
                      handleUpdateQuestion(editingQuestion.id, updates);
                    }}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="true_false">True/False</SelectItem>
                      <SelectItem value="short_answer">Short Answer</SelectItem>
                      <SelectItem value="file_upload">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(editingQuestion.type === 'mcq' || editingQuestion.type === 'true_false') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Answer Options *
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
                          {editingQuestion.type === 'mcq' && editingQuestion.options && editingQuestion.options.length > 2 && (
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
                      {editingQuestion.type === 'mcq' && (
                        <Button variant="outline" size="sm" onClick={addOption} className="mt-2">
                          <Plus className="w-3 h-3 mr-1" />
                          Add Option
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {editingQuestion.type === 'short_answer' && (
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

                {editingQuestion.type === 'file_upload' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach File (Optional)
                    </label>
                    {editingQuestion.file ? (
                      <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">
                              {getFileIcon(editingQuestion.file.type)}
                            </div>
                            <div>
                              <p className="font-medium text-green-800">{editingQuestion.file.name}</p>
                              <p className="text-sm text-green-600">
                                {formatFileSize(editingQuestion.file.size)} • {editingQuestion.file.type}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveFile(editingQuestion.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 mb-2">Upload a file for reference</p>
                        <p className="text-xs text-gray-500 mb-4">Supports PDF, Word, Excel files (max 10MB)</p>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          onChange={(e) => handleFileUpload(e, editingQuestion.id)}
                          className="hidden"
                          id={`file-upload-${editingQuestion.id}`}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById(`file-upload-${editingQuestion.id}`)?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      This file will be attached to the question for candidate reference
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveQuestion}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!editingQuestion.text.trim() ||
                      ((editingQuestion.type === 'mcq' || editingQuestion.type === 'true_false') &&
                        !editingQuestion.correctAnswer)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Question
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-lg h-full flex flex-col">
                {selectedQuestions.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="text-center text-gray-500 mb-6">
                      <p className="mb-2 text-lg font-medium">No questions added yet</p>
                      <p className="text-sm">Add questions from AI suggestions or create custom ones</p>
                    </div>
                    <Button
                      onClick={handleAddCustomQuestion}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6"
                      size="lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Your First Question
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 space-y-6 overflow-y-auto">
                    {selectedQuestions.map((question, index) => (
                      <Card
                        key={question.id}
                        className="border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                        onClick={() => {
                          handleUpdateQuestion(question.id, { isEditing: true });
                          setEditingQuestion({ ...question, isEditing: true });
                        }}
                      >
                        <CardContent className="p-4">
                          {renderQuestionPreview(question)}

                          <div className="flex justify-end mt-4 pt-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpdateQuestion(question.id, { isEditing: true });
                                setEditingQuestion({ ...question, isEditing: true });
                              }}
                            >
                              Edit Question
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <div className="pt-4">
                      <Button
                        onClick={handleAddCustomQuestion}
                        variant="outline"
                        className="w-full border-dashed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Question
                      </Button>
                    </div>
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
          <Button
            onClick={handleSaveQuiz}
            className="bg-green-600 hover:bg-green-700"
            disabled={!title.trim() || selectedQuestions.length === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Quiz ({selectedQuestions.length} questions)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}