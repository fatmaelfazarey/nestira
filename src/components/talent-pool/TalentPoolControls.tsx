
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TalentPoolControlsProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortedCandidatesCount: number;
  totalCandidates: number;
}

export const TalentPoolControls: React.FC<TalentPoolControlsProps> = ({
  sortBy,
  setSortBy,
  sortedCandidatesCount,
  totalCandidates
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score">Match Score</SelectItem>
            <SelectItem value="experience">Experience Level</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="text-sm text-gray-600">
        Showing {sortedCandidatesCount} of {totalCandidates} candidates
      </div>
    </div>
  );
};
