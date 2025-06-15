
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Filter, Search, Flame, ChevronDown, ChevronUp } from 'lucide-react';

interface QuizFiltersProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  filterSource: string;
  onFilterSourceChange: (source: string) => void;
  trendingOnly: boolean;
  onTrendingOnlyChange: (trending: boolean) => void;
}

export function QuizFilters({
  searchQuery,
  onSearchQueryChange,
  filterSource,
  onFilterSourceChange,
  trendingOnly,
  onTrendingOnlyChange,
}: QuizFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <Card className="border-orange-200 bg-orange-50/30">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border">
                <Filter className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Filters & Sorting</h2>
            </div>
            <Button variant="ghost" size="icon" className="w-9 h-9">
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              <span className="sr-only">Toggle Filters</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-4 pt-0 space-y-6">
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
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
