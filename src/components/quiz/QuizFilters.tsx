
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter, Search, Flame } from 'lucide-react';

interface QuizFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  filterSource: string;
  onFilterSourceChange: (source: string) => void;
  trendingOnly: boolean;
  onTrendingOnlyChange: (trending: boolean) => void;
  selectedSkills: string[];
  onSelectedSkillsChange: (skills: string[]) => void;
}

const skillCategories = [
  {
    name: 'Finance, Auditing & Accounting Skills',
    emoji: '✅',
    skills: [
      'Financial Accounting (IFRS)', 'Financial Accounting (US GAAP)', 'Accounts Payable / Receivable (AP/AR)', 'Costing of Products and Services', 'Financial Math', 'Budgeting', 'Financial Planning & Analysis (FP&A)', 'Advanced Accounting (IFRS / GAAP)', 'Internal Auditing / ISAs', 'Financial Due Diligence', 'Financial Modeling in Excel'
    ]
  },
  {
    name: 'Behavioral & Cognitive Tests',
    emoji: '🧠',
    skills: [
      'DISC', 'Big 5 (OCEAN)', 'Culture Add', 'Behavioral Competency Profiler', 'Problem Solving', 'Critical Thinking', 'Numerical Reasoning'
    ]
  },
  {
    name: 'Communication & Interpersonal',
    emoji: '💬',
    skills: [
      'Communication', 'Active Listening', 'Presentation Skills'
    ]
  },
  {
    name: 'Tools Proficiency',
    emoji: '📊',
    skills: [
      'Microsoft Excel (Advanced)', 'Power BI', 'QuickBooks / Xero'
    ]
  }
];

export function QuizFilters({
  isOpen,
  onClose,
  searchQuery,
  onSearchQueryChange,
  filterSource,
  onFilterSourceChange,
  trendingOnly,
  onTrendingOnlyChange,
  selectedSkills,
  onSelectedSkillsChange,
}: QuizFiltersProps) {
  const handleSkillChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...selectedSkills, skill]
      : selectedSkills.filter(s => s !== skill);
    onSelectedSkillsChange(newSkills);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto pr-10">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-semibold text-gray-800">Filters & Sorting</span>
          </SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="flex items-center space-x-2 pt-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <Label htmlFor="trending-switch" className="font-semibold text-gray-700">Trending</Label>
            <Switch
              id="trending-switch"
              checked={trendingOnly}
              onCheckedChange={onTrendingOnlyChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">Source</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={filterSource}
              onValueChange={(value) => { if (value) onFilterSourceChange(value); }}
              className="justify-start"
              aria-label="Filter quizzes by source"
            >
              <ToggleGroupItem value="all">Show All</ToggleGroupItem>
              <ToggleGroupItem value="Nestira">Made by Nestira</ToggleGroupItem>
              <ToggleGroupItem value="Me">Made by Me</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-job-title" className="font-semibold text-gray-700">Filter by job title</Label>
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="search-job-title"
                placeholder="e.g. Financial Analyst"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">Filter by Skills</Label>
            <Accordion type="multiple" className="w-full" defaultValue={skillCategories.map(c => c.name)}>
              {skillCategories.map((category) => (
                <AccordionItem value={category.name} key={category.name}>
                  <AccordionTrigger className="text-base font-medium hover:no-underline py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.emoji}</span>
                      <span>{category.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pl-4 pb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-3">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={(checked) => {
                              handleSkillChange(skill, !!checked);
                            }}
                          />
                          <Label
                            htmlFor={`skill-${skill}`}
                            className="text-sm font-normal text-gray-600 cursor-pointer"
                          >
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
