import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Users,
  Filter,
  Grid3X3,
  List,
  Search,
  Star,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Eye,
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Shuffle,
  FileText,
  Trophy,
  Lightbulb,
  Download,
  Settings,
  SlidersHorizontal,
  Plus,
  X,
  Unlock,
  UserPlus,
  Mail,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageSquare,
  RefreshCw,
  BookOpen,
  Calculator,
  Building2,
  Factory,
  Code2
} from "lucide-react";
import { AICandidateSearch } from "@/components/AICandidateSearch";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CandidateGridView } from "@/components/talent-pool/CandidateGridView";
import { CandidateTableView } from "@/components/talent-pool/CandidateTableView";
import { CandidateCountProgress } from "@/components/talent-pool/CandidateCountProgress";
import { CandidatePreviewModal } from "@/components/CandidatePreviewModal";
import { ExpandedCandidateModal } from "@/components/ExpandedCandidateModal";
import { FindMyMatchModal } from "@/components/FindMyMatchModal";
import { AdvancedFeaturesModal } from "@/components/AdvancedFeaturesModal";
import { useTalentPoolState } from "@/hooks/useTalentPoolState";
import { candidates } from "@/data/candidatesData";
import { CircularProgress } from "@/components/ui/circular-progress";
import { FolderManagementButton } from "@/components/FolderManagementButton";

const TalentPool = () => {
  const {
    // Search and filters
    searchQuery, setSearchQuery,
    locationFilter, setLocationFilter,
    experienceRange, setExperienceRange,
    statusFilter, setStatusFilter,
    skillsFilter, setSkillsFilter,
    scoreRange, setScoreRange,
    assessmentScoreRange, setAssessmentScoreRange,
    selectedJob, setSelectedJob,
    hiringStageFilter, setHiringStageFilter,
    selectedSubfields, setSelectedSubfields,
    selectedSoftware, setSelectedSoftware,
    erpVersion, setErpVersion,
    selectedCertifications, setSelectedCertifications,
    selectedIndustries, setSelectedIndustries,
    selectedVisaStatus, setSelectedVisaStatus,
    employmentType, setEmploymentType,
    workMode, setWorkMode,
    availability, setAvailability,
    languageProficiency, setLanguageProficiency,
    genderFilter, setGenderFilter,
    educationLevel, setEducationLevel,
    selectedSpecialNeeds, setSelectedSpecialNeeds,
    cvCompleteness, setCvCompleteness,
    academicExcellence, setAcademicExcellence,
    selectedScreeningTags, setSelectedScreeningTags,

    // View and UI state
    viewMode, setViewMode,
    sortBy, setSortBy,
    isFilterSidebarOpen, setIsFilterSidebarOpen,

    // AI search
    aiSearchQuery, setAiSearchQuery,
    isAiSearching, setIsAiSearching,
    aiFilteredCandidates, setAiFilteredCandidates,
    handleAiSearch, handleClearAiSearch,

    // Candidate interactions
    favorites, setFavorites,
    unlockedCandidates, setUnlockedCandidates,
    selectedCandidate, setSelectedCandidate,

    // Score visibility
    isRevealed, setIsRevealed,
    scoreVisibility, setScoreVisibility,
    triggerReveal,

    // Helper functions
    hasActiveFilters,
    resetAllFilters
  } = useTalentPoolState();

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCandidate, setPreviewCandidate] = useState(null);
  const [showExpandedModal, setShowExpandedModal] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [showFindMyMatchModal, setShowFindMyMatchModal] = useState(false);

  // Filter candidates based on current filters
  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.location.includes(locationFilter));
    }

    // Experience filter
    if (experienceRange[0] > 0) {
      filtered = filtered.filter(candidate => candidate.yearsOfExperience >= experienceRange[0]);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.status === statusFilter);
    }

    // Skills filter
    if (skillsFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.experience.includes(skillsFilter));
    }

    // Score filter
    if (scoreRange[0] > 0) {
      filtered = filtered.filter(candidate => candidate.score >= scoreRange[0]);
    }

    // Assessment score filter
    if (assessmentScoreRange[0] > 0) {
      filtered = filtered.filter(candidate => candidate.score >= assessmentScoreRange[0]);
    }

    // Industry filter
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.industryExperience.some(industry => selectedIndustries.includes(industry))
      );
    }

    // Subfields filter
    if (selectedSubfields.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.financeSubfields.some(subfield => selectedSubfields.includes(subfield))
      );
    }

    // Software filter
    if (selectedSoftware.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.softwareTools.some(tool => selectedSoftware.includes(tool))
      );
    }

    // Certifications filter
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.certifications.some(cert => selectedCertifications.includes(cert))
      );
    }

    return aiFilteredCandidates || filtered;
  }, [
    candidates, searchQuery, locationFilter, experienceRange, statusFilter, skillsFilter,
    scoreRange, assessmentScoreRange, selectedIndustries, selectedSubfields, selectedSoftware,
    selectedCertifications, aiFilteredCandidates
  ]);

  const sortedCandidates = useMemo(() => {
    const candidatesToSort = [...filteredCandidates];

    switch (sortBy) {
      case 'score':
        return candidatesToSort.sort((a, b) => b.score - a.score);
      case 'experience':
        return candidatesToSort.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
      case 'name':
        return candidatesToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'recent':
        return candidatesToSort.sort((a, b) => new Date(b.profileAdded).getTime() - new Date(a.profileAdded).getTime());
      default:
        return candidatesToSort;
    }
  }, [filteredCandidates, sortBy]);

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success("Removed from favorites");
      } else {
        newFavorites.add(id);
        toast.success("Added to favorites");
      }
      return newFavorites;
    });
  };

  const handleRevealScores = () => {
    if (!isRevealed) {
      triggerReveal('manual');
      toast.success("Match scores revealed! 🎉");
    }
  };

  const handleUnlock = (candidate: any) => {
    setUnlockedCandidates(prev => new Set(prev).add(candidate.id));
    toast.success(`${candidate.name}'s profile unlocked!`);
  };

  const handleViewProfile = (candidate: any) => {
    setExpandedCandidate(candidate);
    setShowExpandedModal(true);
  };

  const handleInviteToApply = (candidate: any) => {
    toast.success(`Invitation sent to ${candidate.name}!`);
  };

  const handleJobSelected = (job: any) => {
    toast.success(`Searching candidates for ${job.title}...`);
    // Here you would implement the logic to filter candidates based on the job requirements
  };

  const handleAdvancedFeatureSelected = (filters: any) => {
    console.log('Advanced filters applied:', filters);
    // Apply the filters to the current filter state
    if (filters.location) setLocationFilter(filters.location);
    if (filters.experienceRange) setExperienceRange(filters.experienceRange);
    if (filters.skills) setSkillsFilter(filters.skills);
    // Add more filter applications as needed
    toast.success('Advanced filters applied!');
  };

  // Job titles for filter
  const jobTitles = {
    'finance-manager': 'Finance Manager',
    'financial-analyst': 'Financial Analyst',
    'accounting-manager': 'Accounting Manager'
  };

  const hiringStages = [
    'Applied',
    'Screening',
    'Interview',
    'Assessment',
    'Final Round',
    'Offer',
    'Hired',
    'Rejected'
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row min-w-0">
          {/* Main Content */}
          <div className="flex-1 p-responsive min-w-0">
            {/* Header */}
            <div className="mb-responsive">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-responsive-xl font-bold text-gray-900 truncate">Talent Pool</h1>
                  <p className="text-responsive text-gray-600 mt-1">Discover and connect with top finance professionals</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                  <FolderManagementButton />

                  <Button
                    variant="outline"
                    onClick={() => setIsFilterSidebarOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {hasActiveFilters() && (
                      <Badge variant="secondary" className="ml-1 ">
                        {Object.values({
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
                        }).filter(Boolean).length}
                      </Badge>
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

              {/* AI Search and Progress */}
              <div className="responsive-grid-2 gap-responsive mb-responsive">
                <div className="min-w-0">
                  <AICandidateSearch
                    onSearch={handleAiSearch}
                    onClear={handleClearAiSearch}
                    currentQuery={aiSearchQuery}
                    isSearching={isAiSearching}
                    onFindMyMatch={() => setShowFindMyMatchModal(true)}
                    onAdvancedFeatures={() => setIsFilterSidebarOpen(true)}
                  />
                </div>
                <div className="min-w-0">
                  <CandidateCountProgress
                    count={filteredCandidates.length}
                    total={candidates.length}
                  />
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 min-w-0">
                  <span className="text-responsive font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48 min-w-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-50">
                      <SelectItem value="score">Match Score</SelectItem>
                      <SelectItem value="experience">Experience Level</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="recent">Recently Added</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-responsive-sm text-gray-600 whitespace-nowrap">
                  Showing {sortedCandidates.length} of {candidates.length} candidates
                </div>
              </div>
            </div>

            {/* Candidates Display */}
            {viewMode === 'grid' ? (
              <CandidateGridView
                sortedCandidates={sortedCandidates}
                isRevealed={isRevealed}
                scoreVisibility={scoreVisibility}
                favorites={favorites}
                unlockedCandidates={unlockedCandidates}
                onToggleFavorite={handleToggleFavorite}
                onUnlock={handleUnlock}
                onViewProfile={handleViewProfile}
                onInviteToApply={handleInviteToApply}
              />
            ) : (
              <CandidateTableView
                sortedCandidates={sortedCandidates}
                isRevealed={isRevealed}
                scoreVisibility={scoreVisibility}
                favorites={favorites}
                unlockedCandidates={unlockedCandidates}
                onToggleFavorite={handleToggleFavorite}
                onUnlock={handleUnlock}
                onViewProfile={handleViewProfile}
                onInviteToApply={handleInviteToApply}
              />
            )}
          </div>

          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            experienceRange={experienceRange}
            setExperienceRange={setExperienceRange}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            skillsFilter={skillsFilter}
            setSkillsFilter={setSkillsFilter}
            scoreRange={scoreRange}
            setScoreRange={setScoreRange}
            assessmentScoreRange={assessmentScoreRange}
            setAssessmentScoreRange={setAssessmentScoreRange}
            selectedSubfields={selectedSubfields}
            setSelectedSubfields={setSelectedSubfields}
            selectedSoftware={selectedSoftware}
            setSelectedSoftware={setSelectedSoftware}
            erpVersion={erpVersion}
            setErpVersion={setErpVersion}
            selectedCertifications={selectedCertifications}
            setSelectedCertifications={setSelectedCertifications}
            selectedIndustries={selectedIndustries}
            setSelectedIndustries={setSelectedIndustries}
            selectedVisaStatus={selectedVisaStatus}
            setSelectedVisaStatus={setSelectedVisaStatus}
            employmentType={employmentType}
            setEmploymentType={setEmploymentType}
            workMode={workMode}
            setWorkMode={setWorkMode}
            availability={availability}
            setAvailability={setAvailability}
            languageProficiency={languageProficiency}
            setLanguageProficiency={setLanguageProficiency}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            educationLevel={educationLevel}
            setEducationLevel={setEducationLevel}
            selectedSpecialNeeds={selectedSpecialNeeds}
            setSelectedSpecialNeeds={setSelectedSpecialNeeds}
            cvCompleteness={cvCompleteness}
            setCvCompleteness={setCvCompleteness}
            academicExcellence={academicExcellence}
            setAcademicExcellence={setAcademicExcellence}
            selectedScreeningTags={selectedScreeningTags}
            setSelectedScreeningTags={setSelectedScreeningTags}
            resetAllFilters={resetAllFilters}
            filteredCandidatesCount={filteredCandidates.length}
            jobTitles={jobTitles}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            hiringStages={hiringStages}
            hiringStageFilter={hiringStageFilter}
            setHiringStageFilter={setHiringStageFilter}
          />
        </div>

        {/* Modals */}
        <ExpandedCandidateModal
          candidate={expandedCandidate}
          isOpen={showExpandedModal}
          onClose={() => setShowExpandedModal(false)}
          isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false}
          onToggleFavorite={() => expandedCandidate && handleToggleFavorite(expandedCandidate.id)}
          isUnlocked={expandedCandidate ? unlockedCandidates.has(expandedCandidate.id) : false}
        />

        <FindMyMatchModal
          isOpen={showFindMyMatchModal}
          onClose={() => setShowFindMyMatchModal(false)}
          onJobSelected={handleJobSelected}
        />
      </div>
    </DashboardLayout>
  );
};

export default TalentPool;
