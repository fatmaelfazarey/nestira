
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, GripVertical, Edit, Trash2 } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Question } from './types';
import { QuestionEditor } from './QuestionEditor';

interface QuizCustomizationPanelProps {
  questions: Question[];
  onUpdateQuestion: (questionId: string, updates: Partial<Question>) => void;
  onRemoveQuestion: (questionId: string) => void;
  onReorderQuestions: (questions: Question[]) => void;
  onAddCustomQuestion: () => void;
}

function SortableQuestionItem({ 
  question, 
  index, 
  onUpdate, 
  onRemove 
}: {
  question: Question;
  index: number;
  onUpdate: (updates: Partial<Question>) => void;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white border rounded-lg shadow-sm ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <QuestionEditor
        question={question}
        index={index}
        onUpdate={onUpdate}
        onRemove={onRemove}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export function QuizCustomizationPanel({
  questions,
  onUpdateQuestion,
  onRemoveQuestion,
  onReorderQuestions,
  onAddCustomQuestion
}: QuizCustomizationPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = questions.findIndex((item) => item.id === active.id);
      const newIndex = questions.findIndex((item) => item.id === over?.id);
      const reorderedQuestions = arrayMove(questions, oldIndex, newIndex);
      onReorderQuestions(reorderedQuestions);
    }

    setActiveId(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Customize Your Quiz ({questions.length})</span>
          <Button onClick={onAddCustomQuestion} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Question
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="min-h-[300px] space-y-4">
            {questions.length === 0 ? (
              <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">No questions added yet</p>
                  <p className="text-sm text-gray-400">
                    Add questions from AI suggestions or create custom ones
                  </p>
                </div>
              </div>
            ) : (
              <SortableContext items={questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
                {questions.map((question, index) => (
                  <SortableQuestionItem
                    key={question.id}
                    question={question}
                    index={index}
                    onUpdate={(updates) => onUpdateQuestion(question.id, updates)}
                    onRemove={() => onRemoveQuestion(question.id)}
                  />
                ))}
              </SortableContext>
            )}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="p-4 bg-white border rounded-lg shadow-lg opacity-90">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {questions.find(q => q.id === activeId)?.text}
                  </span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </CardContent>
    </Card>
  );
}
