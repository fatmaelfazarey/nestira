
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Sparkles } from 'lucide-react';

interface QuizPersonalizationProps {
  onGenerateQuestions: (params: PersonalizationParams) => void;
}

export interface PersonalizationParams {
  role: string;
  skills: string[];
  seniorityLevel: string;
}

const defaultSkills = ['Excel', 'Financial Reporting', 'Budgeting', 'Tax Compliance', 'Risk Management'];
const seniorityLevels = ['Entry Level', 'Mid Level', 'Senior Level'];

export function QuizPersonalization({ onGenerateQuestions }: QuizPersonalizationProps) {
  const [role, setRole] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [seniorityLevel, setSeniorityLevel] = useState('');

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleGenerateQuestions = () => {
    if (role && selectedSkills.length > 0 && seniorityLevel) {
      onGenerateQuestions({ role, skills: selectedSkills, seniorityLevel });
    }
  };

  const isComplete = role && selectedSkills.length > 0 && seniorityLevel;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="w-5 h-5 text-accent" />
          Let's Personalize Your Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Which role are you hiring for? *
          </label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial-analyst">Financial Analyst</SelectItem>
              <SelectItem value="accountant">Accountant</SelectItem>
              <SelectItem value="bookkeeper">Bookkeeper</SelectItem>
              <SelectItem value="controller">Controller</SelectItem>
              <SelectItem value="cfo">Chief Financial Officer</SelectItem>
              <SelectItem value="auditor">Auditor</SelectItem>
              <SelectItem value="tax-specialist">Tax Specialist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Skills Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            What skills would you like to assess? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {defaultSkills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => handleSkillToggle(skill)}
                />
                <label htmlFor={skill} className="text-sm text-gray-700 cursor-pointer">
                  {skill}
                </label>
              </div>
            ))}
          </div>

          {/* Custom Skill Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Add another skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAddCustomSkill}
              disabled={!customSkill.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Selected Skills Display */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Seniority Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Seniority level *
          </label>
          <Select value={seniorityLevel} onValueChange={setSeniorityLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select seniority level..." />
            </SelectTrigger>
            <SelectContent>
              {seniorityLevels.map((level) => (
                <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerateQuestions}
          disabled={!isComplete}
          className="w-full bg-accent hover:bg-accent/90 text-white"
          size="lg"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Questions
        </Button>
      </CardContent>
    </Card>
  );
}
