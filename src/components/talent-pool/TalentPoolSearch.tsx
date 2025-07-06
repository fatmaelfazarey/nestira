
import React from 'react';
import { AICandidateSearch } from "@/components/AICandidateSearch";
import { CandidateCountProgress } from "@/components/talent-pool/CandidateCountProgress";

interface TalentPoolSearchProps {
  handleAiSearch: (query: string) => Promise<void>;
  handleClearAiSearch: () => void;
  aiSearchQuery: string;
  isAiSearching: boolean;
  totalCandidates: number;
  filteredCandidatesCount: number;
}

export const TalentPoolSearch: React.FC<TalentPoolSearchProps> = ({
  handleAiSearch,
  handleClearAiSearch,
  aiSearchQuery,
  isAiSearching,
  totalCandidates,
  filteredCandidatesCount
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2">
        <AICandidateSearch
          onSearch={handleAiSearch}
          onClear={handleClearAiSearch}
          currentQuery={aiSearchQuery}
          isSearching={isAiSearching}
        />
      </div>
      <div>
        <CandidateCountProgress
          total={totalCandidates}
          count={filteredCandidatesCount}
        />
      </div>
    </div>
  );
};
