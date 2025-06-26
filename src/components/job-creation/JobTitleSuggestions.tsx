import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobTitleSuggestionsProps {
  value: string;
  onSelect: (title: string) => void;
  isInternship?: boolean;
}

export function JobTitleSuggestions({ value, onSelect, isInternship = false }: JobTitleSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const jobTitleSuggestions = [
    'Financial Analyst',
    'Senior Financial Analyst',
    'Finance Manager',
    'Senior Finance Manager',
    'Financial Controller',
    'CFO',
    'Accountant',
    'Senior Accountant',
    'Accounting Manager',
    'Financial Planning Analyst',
    'Investment Analyst',
    'Risk Analyst',
    'Treasury Analyst',
    'Budget Analyst',
    'Credit Analyst'
  ];

  const internshipTitleSuggestions = [
    'Finance Intern',
    'Accounting Intern',
    'Financial Analysis Intern',
    'Tax Preparation Intern',
    'Audit Intern',
    'Investment Banking Intern',
    'Corporate Finance Intern',
    'Financial Planning Intern',
    'Budget Analysis Intern',
    'Risk Management Intern',
    'Treasury Intern',
    'Accounts Payable Intern',
    'Accounts Receivable Intern',
    'Financial Reporting Intern',
    'Credit Analysis Intern'
  ];

  const currentSuggestions = isInternship ? internshipTitleSuggestions : jobTitleSuggestions;

  useEffect(() => {
    if (value.length > 0) {
      const filtered = currentSuggestions.filter(title =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, isInternship]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.value);
  };

  const handleSuggestionClick = (title: string) => {
    onSelect(title);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={handleInputChange}
        placeholder={isInternship ? "e.g. Finance Intern" : "e.g. Senior Financial Analyst"}
        className="w-full"
        onFocus={() => value.length > 0 && setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((title, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-left h-auto p-3 hover:bg-gray-50"
              onClick={() => handleSuggestionClick(title)}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">🤖</span>
                <span>{title}</span>
              </div>
            </Button>
          ))}
        </div>
      )}
      
      {value.length === 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Popular suggestions:</span>
          {currentSuggestions.slice(0, 4).map((title) => (
            <Badge
              key={title}
              variant="outline"
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleSuggestionClick(title)}
            >
              {title}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
