
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface SkillsSelectorProps {
  label?: string;
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export function SkillsSelector({ 
  label, 
  skills, 
  onSkillsChange, 
  placeholder = "Add skills",
  suggestions = []
}: SkillsSelectorProps) {
  const [newSkill, setNewSkill] = useState('');

  const defaultSuggestions = [
    'Excel', 'Financial Modeling', 'SAP', 'PowerBI', 'Tableau', 'SQL',
    'Python', 'R', 'GAAP', 'IFRS', 'Risk Management', 'Budgeting',
    'Forecasting', 'Financial Analysis', 'Investment Analysis'
  ];

  const allSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  const addSuggestion = (suggestion: string) => {
    if (!skills.includes(suggestion)) {
      onSkillsChange([...skills, suggestion]);
    }
  };

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
        />
        <Button type="button" onClick={addSkill} variant="outline" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-2 py-1">
              {skill}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0"
                onClick={() => removeSkill(skill)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {allSuggestions.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Quick add:</span>
          <div className="flex flex-wrap gap-2">
            {allSuggestions
              .filter(suggestion => !skills.includes(suggestion))
              .slice(0, 8)
              .map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => addSuggestion(suggestion)}
                >
                  + {suggestion}
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
