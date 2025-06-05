
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface QuizDetailsCardProps {
  title: string;
  description: string;
  timeLimit: { hours: number; minutes: number; seconds: number };
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onTimeLimitChange: (timeLimit: { hours: number; minutes: number; seconds: number }) => void;
}

export function QuizDetailsCard({
  title,
  description,
  timeLimit,
  onTitleChange,
  onDescriptionChange,
  onTimeLimitChange
}: QuizDetailsCardProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Quiz Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Title *
          </label>
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
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
                onChange={(e) => onTimeLimitChange({ 
                  ...timeLimit, 
                  hours: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Minutes</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={timeLimit.minutes}
                onChange={(e) => onTimeLimitChange({ 
                  ...timeLimit, 
                  minutes: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">Seconds</label>
              <Input
                type="number"
                min="0"
                max="59"
                value={timeLimit.seconds}
                onChange={(e) => onTimeLimitChange({ 
                  ...timeLimit, 
                  seconds: parseInt(e.target.value) || 0 
                })}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
