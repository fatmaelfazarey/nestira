
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter, Search, Flame, Landmark, BrainCog, MessagesSquare, GanttChartSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  filterSource: string;
  onFilterSourceChange: (source: string) => void;
  selectedSkills: string[];
  onSelectedSkillsChange: (skills: string[]) => void;
}

// Only these 4 skill categories
const skillCategories = [
  {
    name: 'Finance, Auditing & Accounting Skills',
    icon: Landmark,
    skills: [
      'Financial Accounting (IFRS)', 'Financial Accounting (US GAAP)', 'Accounts Payable / Receivable (AP/AR)', 'Costing of Products and Services', 'Financial Math', 'Budgeting', 'Financial Planning & Analysis (FP&A)', 'Advanced Accounting (IFRS / GAAP)', 'Internal Auditing / ISAs', 'Financial Due Diligence', 'Financial Modeling in Excel'
    ]
  },
  {
    name: 'Behavioral & Cognitive Tests',
    icon: BrainCog,
    skills: [
      'DISC', 'Big 5 (OCEAN)', 'Culture Add', 'Behavioral Competency Profiler', 'Problem Solving', 'Critical Thinking', 'Numerical Reasoning'
    ]
  },
  {
    name: 'Communication & Interpersonal',
    icon: MessagesSquare,
    skills: [
      'Communication', 'Active Listening', 'Presentation Skills'
    ]
  },
  {
    name: 'Tools Proficiency',
    icon: GanttChartSquare,
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
  selectedSkills,
  onSelectedSkillsChange,
}: QuizFiltersProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localFilterSource, setLocalFilterSource] = useState(filterSource);
  
  const [localSelectedSkills, setLocalSelectedSkills] = useState(selectedSkills);

  useEffect(() => {
    if (isOpen) {
      setLocalSearchQuery(searchQuery);
      setLocalFilterSource(filterSource);
      setLocalSelectedSkills(selectedSkills);
    }
  }, [isOpen, searchQuery, filterSource, selectedSkills]);

  const handleSkillChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...localSelectedSkills, skill]
      : localSelectedSkills.filter(s => s !== skill);
    setLocalSelectedSkills(newSkills);
  };

  const handleResetFilters = () => {
    setLocalSearchQuery('');
    setLocalFilterSource('all');
    setLocalSelectedSkills([]);
  };

  const handleApplyFilters = () => {
    onSearchQueryChange(localSearchQuery);
    onFilterSourceChange(localFilterSource);
    onSelectedSkillsChange(localSelectedSkills);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-semibold text-gray-800">Filters & Sorting</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          
          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">Source</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={localFilterSource}
              onValueChange={(value) => { if (value) setLocalFilterSource(value); }}
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
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
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
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-orange-500" />
                      <span>{category.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pl-4 pb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-3">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={localSelectedSkills.includes(skill)}
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
        <SheetFooter>
          <Button variant="outline" onClick={handleResetFilters}>Reset</Button>
          <Button onClick={handleApplyFilters} className="bg-accent hover:bg-accent/90 text-white">Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
