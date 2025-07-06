
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Eye, CheckCircle, Grid3X3, List } from "lucide-react";

interface TalentPoolHeaderProps {
  isFilterSidebarOpen: boolean;
  setIsFilterSidebarOpen: (open: boolean) => void;
  hasActiveFilters: () => boolean;
  isRevealed: boolean;
  handleRevealScores: () => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  searchQuery: string;
  locationFilter: string;
  experienceRange: number[];
  statusFilter: string;
  skillsFilter: string;
  scoreRange: number[];
  selectedIndustries: string[];
  selectedSubfields: string[];
  selectedSoftware: string[];
  selectedCertifications: string[];
}

export const TalentPoolHeader: React.FC<TalentPoolHeaderProps> = ({
  isFilterSidebarOpen,
  setIsFilterSidebarOpen,
  hasActiveFilters,
  isRevealed,
  handleRevealScores,
  viewMode,
  setViewMode,
  searchQuery,
  locationFilter,
  experienceRange,
  statusFilter,
  skillsFilter,
  scoreRange,
  selectedIndustries,
  selectedSubfields,
  selectedSoftware,
  selectedCertifications
}) => {
  const getActiveFiltersCount = () => {
    return Object.values({
      searchQuery: searchQuery !== '',
      locationFilter: locationFilter !== 'all',
      experienceRange: experienceRange[0] > 0,
      statusFilter: statusFilter !== 'all',
      skillsFilter: skillsFilter !== 'all',
      scoreRange: scoreRange[0] > 0,
      industries: selectedIndustries.length > 0,
      subfields: selectedSubfields.length > 0,
      software: selectedSoftware.length > 0,
      certifications: selectedCertifications.length > 0
    }).filter(Boolean).length;
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
        <p className="text-gray-600 mt-1">Discover and connect with top finance professionals</p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => setIsFilterSidebarOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters() && (
            <Badge variant="secondary" className="ml-1">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>

        <Button
          variant={isRevealed ? "default" : "outline"}
          onClick={handleRevealScores}
          disabled={isRevealed}
          className={isRevealed ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {isRevealed ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Scores Revealed
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Reveal Match Scores
            </>
          )}
        </Button>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className={viewMode === 'table' ? 'bg-white shadow-sm' : ''}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
