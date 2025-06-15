
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter } from 'lucide-react';

interface FunnelFiltersProps {
  jobTitles: { [key: string]: string };
  selectedJob: string;
  setSelectedJob: (value: string) => void;
  scoreRange: number[];
  setScoreRange: (value: number[]) => void;
  assessmentScoreRange: number[];
  setAssessmentScoreRange: (value: number[]) => void;
  hiringStages: string[];
  hiringStageFilter: string[];
  setHiringStageFilter: (value:string[]) => void;
  resetFunnelFilters: () => void;
}

export const FunnelFilters = ({
  jobTitles,
  selectedJob,
  setSelectedJob,
  scoreRange,
  setScoreRange,
  assessmentScoreRange,
  setAssessmentScoreRange,
  hiringStages,
  hiringStageFilter,
  setHiringStageFilter,
  resetFunnelFilters
}: FunnelFiltersProps) => {

  const handleHiringStageChange = (stage: string, checked: boolean | 'indeterminate') => {
    if (checked) {
      setHiringStageFilter([...hiringStageFilter, stage]);
    } else {
      setHiringStageFilter(hiringStageFilter.filter(s => s !== stage));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Filter className="w-5 h-5 text-accent" />
          Filter Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Job Post Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Job Post</label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger>
                <SelectValue placeholder="All Job Posts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Posts</SelectItem>
                {Object.entries(jobTitles).map(([key, title]) => (
                  <SelectItem key={key} value={key}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hiring Stage Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Hiring Stage</label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-2">
              {hiringStages.map((stage) => (
                <div key={stage} className="flex items-center space-x-2">
                  <Checkbox
                    id={`funnel-stage-${stage}`}
                    checked={hiringStageFilter.includes(stage)}
                    onCheckedChange={(checked) => handleHiringStageChange(stage, checked)}
                  />
                  <label htmlFor={`funnel-stage-${stage}`} className="text-sm text-gray-700 font-normal">{stage}</label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Score Filters */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Min Nestira Insight Score: {scoreRange[0]}%
            </label>
            <Slider
              value={scoreRange}
              onValueChange={setScoreRange}
              max={100}
              min={0}
              step={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Min Assessment Score: {assessmentScoreRange[0]}%
            </label>
            <Slider
              value={assessmentScoreRange}
              onValueChange={setAssessmentScoreRange}
              max={100}
              min={0}
              step={5}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={resetFunnelFilters}>Reset These Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};
