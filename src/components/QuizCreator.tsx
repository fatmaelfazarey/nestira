
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, GripVertical, X, Bot, Edit, Trash2, Save } from 'lucide-react';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult 
} from '@hello-pangea/dnd';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer?: string;
  isEditing?: boolean;
}

interface QuizCreatorProps {
  onSave: (quiz: any) => void;
  onCancel: () => void;
}

const suggestedQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the primary purpose of financial statements?',
    type: 'multiple-choice',
    options: ['To comply with regulations', 'To provide financial information to stakeholders', 'To calculate taxes', 'To track inventory'],
    correctAnswer: 'To provide financial information to stakeholders'
  },
  {
    id: 'q2',
    text: 'Which of the following is NOT a current asset?',
    type: 'multiple-choice',
    options: ['Cash', 'Accounts Receivable', 'Inventory', 'Equipment'],
    correctAnswer: 'Equipment'
  },
  {
    id: 'q3',
    text: 'What does ROI stand for in finance?',
    type: 'multiple-choice',
    options: ['Return on Investment', 'Rate of Interest', 'Risk of Investment', 'Revenue over Income'],
    correctAnswer: 'Return on Investment'
  },
  {
    id: 'q4',
    text: 'The accounting equation is: Assets = Liabilities + Equity',
    type: 'true-false',
    correctAnswer: 'true'
  },
  {
    id: 'q5',
    text: 'What is depreciation in accounting?',
    type: 'short-answer',
    correctAnswer: 'The allocation of the cost of an asset over its useful life'
  }
];

export function QuizCreator({ onSave, onCancel }: QuizCreatorProps) {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState({ hours: 0, minutes: 30, seconds: 0 });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>(suggestedQuestions);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'suggested' && destination.droppableId === 'quiz') {
      // Moving from suggested to quiz
      const questionToMove = availableQuestions[source.index];
      const newQuestion = { ...questionToMove, id: `quiz-${Date.now()}` };
      
      setQuestions(prev => {
        const newQuestions = [...prev];
        newQuestions.splice(destination.index, 0, newQuestion);
        return newQuestions;
      });
    } else if (source.droppableId === 'quiz' && destination.droppableId === 'quiz') {
      // Reordering within quiz
      setQuestions(prev => {
        const newQuestions = [...prev];
        const [reorderedItem] = newQuestions.splice(source.index, 1);
        newQuestions.splice(destination.index, 0, reorderedItem);
        return newQuestions;
      });
    }
  };

  const addCustomQuestion = () => {
    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      text: '',
      type: 'multiple-choice',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      isEditing: true
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(prev => 
      prev.map(q => q.id === questionId ? { ...q, ...updates } : q)
    );
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const saveQuiz = () => {
    const quiz = {
      id: Date.now(),
      title: quizTitle,
      description: quizDescription,
      questions: questions.length,
      duration: `${timeLimit.hours > 0 ? timeLimit.hours + 'h ' : ''}${timeLimit.minutes}min`,
      status: 'Draft',
      createdAt: new Date().toISOString(),
      questionsList: questions
    };
    onSave(quiz);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={saveQuiz} disabled={!quizTitle || questions.length === 0}>
            <Save className="w-4 h-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <Input
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Enter quiz title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Enter quiz description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500">Hours</label>
                    <Input
                      type="number"
                      min="0"
                      value={timeLimit.hours}
                      onChange={(e) => setTimeLimit(prev => ({ ...prev, hours: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Minutes</label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timeLimit.minutes}
                      onChange={(e) => setTimeLimit(prev => ({ ...prev, minutes: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Seconds</label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={timeLimit.seconds}
                      onChange={(e) => setTimeLimit(prev => ({ ...prev, seconds: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-accent" />
                AI Suggested Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Droppable droppableId="suggested">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {availableQuestions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 cursor-move hover:border-accent transition-colors ${
                              snapshot.isDragging ? 'bg-accent/10 border-accent' : ''
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <GripVertical className="w-4 h-4 text-gray-400 mt-1" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700">{question.text}</p>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {question.type.replace('-', ' ')}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Builder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Quiz Questions ({questions.length})</span>
                <Button onClick={addCustomQuestion} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Question
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="quiz">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[400px] space-y-4 ${
                        snapshot.isDraggingOver ? 'bg-accent/5 rounded-lg' : ''
                      }`}
                    >
                      {questions.length === 0 ? (
                        <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
                          <div className="text-center">
                            <p className="text-gray-500 mb-2">Drag questions here or add custom ones</p>
                            <p className="text-sm text-gray-400">Your quiz questions will appear here</p>
                          </div>
                        </div>
                      ) : (
                        questions.map((question, index) => (
                          <Draggable key={question.id} draggableId={question.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`p-4 bg-white border rounded-lg shadow-sm ${
                                  snapshot.isDragging ? 'shadow-lg' : ''
                                }`}
                              >
                                <QuestionEditor
                                  question={question}
                                  index={index}
                                  onUpdate={(updates) => updateQuestion(question.id, updates)}
                                  onRemove={() => removeQuestion(question.id)}
                                  dragHandleProps={provided.dragHandleProps}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface QuestionEditorProps {
  question: Question;
  index: number;
  onUpdate: (updates: Partial<Question>) => void;
  onRemove: () => void;
  dragHandleProps: any;
}

function QuestionEditor({ question, index, onUpdate, onRemove, dragHandleProps }: QuestionEditorProps) {
  const [isEditing, setIsEditing] = useState(question.isEditing || false);

  const handleSave = () => {
    setIsEditing(false);
    onUpdate({ isEditing: false });
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
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4" />
          </Button>
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
        <div className="space-y-3 border-t pt-3">
          <Input
            value={question.text}
            onChange={(e) => onUpdate({ text: e.target.value })}
            placeholder="Enter question text"
          />
          
          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Answer Options:</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...question.options!];
                      newOptions[optionIndex] = e.target.value;
                      onUpdate({ options: newOptions });
                    }}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctAnswer === option}
                    onChange={() => onUpdate({ correctAnswer: option })}
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          )}

          <Button onClick={handleSave} size="sm">
            Save Changes
          </Button>
        </div>
      ) : (
        <div className="border-t pt-3">
          <p className="font-medium text-gray-900">{question.text}</p>
          {question.type === 'multiple-choice' && question.options && (
            <div className="mt-2 space-y-1">
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
        </div>
      )}
    </div>
  );
}
