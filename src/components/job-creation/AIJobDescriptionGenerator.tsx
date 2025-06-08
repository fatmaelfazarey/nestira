
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles } from 'lucide-react';

interface AIJobDescriptionGeneratorProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export function AIJobDescriptionGenerator({
  description,
  onDescriptionChange,
  onRegenerate,
  isGenerating
}: AIJobDescriptionGeneratorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="description" className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          📝 AI-Generated Job Description (Editable)
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <RotateCcw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </Button>
      </div>

      {isGenerating ? (
        <div className="border rounded-md p-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">AI is crafting your job description...</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      ) : (
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Job description will be auto-generated based on your inputs..."
          className="min-h-[200px] resize-none"
          rows={8}
        />
      )}

      {description && !isGenerating && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          This description was AI-generated and is fully editable
        </div>
      )}
    </div>
  );
}
