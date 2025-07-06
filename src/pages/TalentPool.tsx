
import React, { useState, useMemo } from 'react';
import { toast } from "sonner";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CandidateGridView } from "@/components/talent-pool/CandidateGridView";
import { CandidateTableView } from "@/components/talent-pool/CandidateTableView";
import { CandidatePreviewModal } from "@/components/CandidatePreviewModal";
import { ExpandedCandidateModal } from "@/components/ExpandedCandidateModal";
import { TalentPoolHeader } from "@/components/talent-pool/TalentPoolHeader";
import { TalentPoolSearch } from "@/components/talent-pool/TalentPoolSearch";
import { TalentPoolControls } from "@/components/talent-pool/TalentPoolControls";
import { useTalentPoolState } from "@/hooks/useTalentPoolState";
import { candidates } from "@/data/candidatesData";

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
    setPreviewCandidate(candidate);
    setShowPreviewModal(true);
  };

  const handleInviteToApply = (candidate: any) => {
    toast.success(`Invitation sent to ${candidate.name}!`);
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <TalentPoolHeader
              isFilterSidebarOpen={isFilterSidebarOpen}
              setIsFilterSidebarOpen={setIsFilterSidebarOpen}
              hasActiveFilters={hasActiveFilters}
              isRevealed={isRevealed}
              handleRevealScores={handleRevealScores}
              viewMode={viewMode}
              setViewMode={setViewMode}
              searchQuery={searchQuery}
              locationFilter={locationFilter}
              experienceRange={experienceRange}
              statusFilter={statusFilter}
              skillsFilter={skillsFilter}
              scoreRange={scoreRange}
              selectedIndustries={selectedIndustries}
              selectedSubfields={selectedSubfields}
              selectedSoftware={selectedSoftware}
              selectedCertifications={selectedCertifications}
            />

            {/* AI Search and Progress */}
            <TalentPoolSearch
              handleAiSearch={handleAiSearch}
              handleClearAiSearch={handleClearAiSearch}
              aiSearchQuery={aiSearchQuery}
              isAiSearching={isAiSearching}
              totalCandidates={candidates.length}
              filteredCandidatesCount={filteredCandidates.length}
            />

            {/* Sort Controls */}
            <TalentPoolControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortedCandidatesCount={sortedCandidates.length}
              totalCandidates={candidates.length}
            />
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

      {/* Candidate Preview Modal */}
      <CandidatePreviewModal
        candidate={previewCandidate}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onUnlock={handleUnlock}
        onInviteToApply={handleInviteToApply}
        isUnlocked={previewCandidate ? unlockedCandidates.has(previewCandidate.id) : false}
      />

      {/* Expanded Candidate Modal */}
      <ExpandedCandidateModal
        candidate={expandedCandidate}
        isOpen={showExpandedModal}
        onClose={() => setShowExpandedModal(false)}
        isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false}
        onToggleFavorite={() => expandedCandidate && handleToggleFavorite(expandedCandidate.id)}
        onUnlock={handleUnlock}
        onInviteToApply={handleInviteToApply}
        isUnlocked={expandedCandidate ? unlockedCandidates.has(expandedCandidate.id) : false}
      />
    </div>
  );
};

export default TalentPool;
