

// TalentPool.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Users,
  Filter,
  Grid3X3,
  List,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { AICandidateSearch } from "@/components/AICandidateSearch";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CandidateGridView } from "@/components/talent-pool/CandidateGridView";
import { CandidateTableView } from "@/components/talent-pool/CandidateTableView";
import { CandidateCountProgress } from "@/components/talent-pool/CandidateCountProgress";
import { ExpandedCandidateModal } from "@/components/ExpandedCandidateModal";
import { FindMyMatchModal } from "@/components/FindMyMatchModal";
import { useTalentPoolState } from "@/hooks/useTalentPoolState";
import { FolderManagementButton } from "@/components/FolderManagementButton";
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import InviteModal from '@/components/InviteModal';
import LoadingState from '@/components/LoadingState';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  country: string;
  experience: string;
  score: number;
  status: string;
  tags: string[];
  salaryExpectation: string;
  industryExperience: string[];
  financeSubfields: string[];
}

const TalentPool = () => {
  const {
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
    viewMode, setViewMode,
    sortBy, setSortBy,
    isFilterSidebarOpen, setIsFilterSidebarOpen,
    aiSearchQuery, setAiSearchQuery,
    isAiSearching, setIsAiSearching,
    aiFilteredCandidates, setAiFilteredCandidates,
    handleClearAiSearch,
    favorites, setFavorites,
    unlockedCandidates, setUnlockedCandidates,
    isRevealed,
    scoreVisibility,
    triggerReveal,
    hasActiveFilters,
    resetAllFilters
  } = useTalentPoolState();

  const [showExpandedModal, setShowExpandedModal] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState<Candidate | null>(null);
  const [showFindMyMatchModal, setShowFindMyMatchModal] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidatesLoading, setCandidatesLoading] = useState(true);
  const [candidatesError, setCandidatesError] = useState<string | null>(null);
  const { getAllCandidates, aiSearch, getJob, UnlockCandidates } = useEmployerStore();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteCandidate, setInviteCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      setCandidatesLoading(true);
      setCandidatesError(null);
      const response = await getAllCandidates(setCandidates, setCandidatesLoading, setCandidatesError);

      if (response?.success) {
        setCandidates(response.data);
      } else {
        throw new Error(response?.message || 'Failed to get candidates');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load candidates';
      setCandidatesError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setCandidatesLoading(false);
    }
  };

  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    if (searchQuery) {
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (candidate.tags && candidate.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(candidate => 
        candidate.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (workMode !== 'all') {
      filtered = filtered.filter(candidate => 
        candidate.location?.toLowerCase().includes(workMode.toLowerCase())
      );
    }

    if (experienceRange[0] > 0) {
      filtered = filtered.filter(candidate => {
        const expYears = parseInt(candidate.experience) || 0;
        return expYears >= experienceRange[0];
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(candidate => candidate.status === statusFilter);
    }

    if (scoreRange[0] > 0) {
      filtered = filtered.filter(candidate => candidate.score >= scoreRange[0]);
    }

    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.industryExperience?.some(industry => 
          selectedIndustries.some(selected => 
            industry.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    if (selectedSubfields.length > 0) {
      filtered = filtered.filter(candidate =>
        candidate.financeSubfields?.some(subfield => 
          selectedSubfields.some(selected => 
            subfield.toLowerCase().includes(selected.toLowerCase())
          )
        )
      );
    }

    if (aiFilteredCandidates && aiFilteredCandidates.length > 0) {
      const ordered = aiFilteredCandidates
        .map(id => filtered.find(candidate => candidate.id === id))
        .filter((candidate): candidate is Candidate => candidate !== undefined);
      return ordered;
    }

    return filtered;
  }, [
    candidates, searchQuery, locationFilter, experienceRange, statusFilter, skillsFilter,
    scoreRange, assessmentScoreRange, selectedIndustries, selectedSubfields, selectedSoftware,
    selectedCertifications, aiFilteredCandidates, workMode
  ]);

  const sortedCandidates = useMemo(() => {
    if (aiFilteredCandidates && aiFilteredCandidates.length > 0) {
      return filteredCandidates;
    }

    const candidatesToSort = [...filteredCandidates];

    switch (sortBy) {
      case 'score':
        return candidatesToSort.sort((a, b) => b.score - a.score);
      case 'experience':
        return candidatesToSort.sort((a, b) => {
          const expA = parseInt(a.experience) || 0;
          const expB = parseInt(b.experience) || 0;
          return expB - expA;
        });
      case 'name':
        return candidatesToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'recent':
        return candidatesToSort.sort((a, b) => b.id.localeCompare(a.id));
      default:
        return candidatesToSort;
    }
  }, [filteredCandidates, sortBy, aiFilteredCandidates]);

  const handleToggleFavorite = useCallback((id: string) => {
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
  }, [setFavorites]);

  const handleUnlock = useCallback(async (candidate: Candidate) => {
    try {
      const result = await UnlockCandidates(null, candidate.id);
      if (result?.success) {
        setUnlockedCandidates(prev => new Set(prev).add(candidate.id));
        toast.success(`${candidate.name}'s profile unlocked!`);
      } else {
        throw new Error(result?.message || 'Failed to unlock candidate');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to unlock candidate';
      toast.error(errorMessage);
    }
  }, [setUnlockedCandidates, UnlockCandidates]);

  const handleViewProfile = useCallback((candidate: Candidate) => {
    setExpandedCandidate(candidate);
    setShowExpandedModal(true);
  }, []);

  const handleInviteToApply = useCallback((candidate: Candidate) => {
    setShowInviteModal(true);
    setInviteCandidate(candidate);
  }, []);

  const jobToText = useCallback((job: any): string => {
    const safeJoin = (arr: any[] | undefined) =>
      Array.isArray(arr) && arr.length > 0 ? arr.join(', ') : '';

    return `
${job.title || ''}
${job.description || ''}
${job.job_function || ''}
${job.career_level || ''}
${job.industry || ''}
${job.location || ''}
${job.work_mode || ''}
${job.employment_type || ''}
${job.experience_required?.min || ''} - ${job.experience_required?.max || ''}
${job.salary?.min || ''} - ${job.salary?.max || ''} ${job.salary?.currency || ''} per ${job.salary?.period || ''}
${safeJoin(job.required_skills)}
${safeJoin(job.preferred_skills)}
${safeJoin(job.required_certifications)}
${safeJoin(job.preferred_certifications)}
${safeJoin(job.languages)}
${safeJoin(job.visa_requirements)}
${job.gender_preference || ''}
${job.status || ''}
${job.score || ''}
${job.company_name || ''}
${job.company_website || ''}
`.trim();
  }, []);

  const handleAiSearch = useCallback(async (query: string) => {
    setIsAiSearching(true);
    setCandidatesLoading(true);
    try {
      const searchResult = await aiSearch(query);
      if (searchResult.success) {
        setAiFilteredCandidates(searchResult.ids);
        toast.success(`Found ${searchResult.ids.length} matching candidates`);
      } else {
        throw new Error(searchResult.message || 'AI search failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'AI search failed';
      toast.error(errorMessage);
    } finally {
      setIsAiSearching(false);
      setCandidatesLoading(false);
    }
  }, [aiSearch, setIsAiSearching, setAiFilteredCandidates]);

  const handleJobSelected = useCallback(async (job: any) => {
    try {
      const jobData = await getJob(job.id);
      if (jobData?.success) {
        const jobText = jobToText(jobData.data);
        await handleAiSearch(jobText);
        toast.success(`Searching candidates for ${job.title}...`);
      } else {
        throw new Error('Failed to get job details');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process job selection';
      toast.error(errorMessage);
    }
  }, [getJob, jobToText, handleAiSearch]);

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

  if (!candidatesLoading && !candidatesError && candidates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates available</h3>
          <p className="text-gray-600 mb-4">The talent pool is currently empty.</p>
          <Button onClick={fetchCandidates}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row min-w-0">
        <div className="flex-1 p-6 min-w-0">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">Talent Pool</h1>
                <p className="text-gray-600 mt-1">Discover and connect with top finance professionals</p>
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
                    <Badge variant="secondary" className="ml-1">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 min-w-0">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
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

              <div className="text-sm text-gray-600 whitespace-nowrap">
                Showing {sortedCandidates.length} of {candidates.length} candidates
              </div>
            </div>
          </div>

          {candidatesLoading && (
            <LoadingState LoadingStateMessage='Talent Pool' />
          )}

          {candidatesError && (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-white rounded-lg border border-gray-200 shadow-sm mx-4 my-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load candidates</h3>
                <p className="text-gray-600 mb-4 max-w-md">{candidatesError}</p>
                <Button
                  onClick={fetchCandidates}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!candidatesError && filteredCandidates.length === 0 && candidates.length > 0 && (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-white rounded-lg border border-gray-200 shadow-sm mx-4 my-6">
              <div className="text-center">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No candidates match your filters</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                <Button onClick={resetAllFilters}>
                  Clear all filters
                </Button>
              </div>
            </div>
          )}

          {!candidatesError && filteredCandidates.length > 0 && (
            viewMode === 'grid' ? (
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
            )
          )}
        </div>

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

      <ExpandedCandidateModal
        candidate={expandedCandidate}
        isOpen={showExpandedModal}
        onClose={() => setShowExpandedModal(false)}
        isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false}
        onToggleFavorite={() => expandedCandidate && handleToggleFavorite(expandedCandidate.id)}
        isUnlocked={expandedCandidate ? unlockedCandidates.has(expandedCandidate.id) : false}
        onUnlock={handleUnlock}
        onInviteToApply={handleInviteToApply}
      />

      <FindMyMatchModal
        isOpen={showFindMyMatchModal}
        onClose={() => setShowFindMyMatchModal(false)}
        onJobSelected={handleJobSelected}
      />

      {inviteCandidate && (
        <InviteModal
          showModal={showInviteModal}
          setShowModal={setShowInviteModal}
          candidate={inviteCandidate}
        />
      )}
    </div>
  );
};

export default TalentPool;















