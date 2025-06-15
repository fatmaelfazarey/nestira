import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Grid2X2, LayoutList, Filter, SlidersHorizontal, CheckCircle, Target, TrendingUp, ArrowUpDown, Users, Lock, FileText, RotateCcw } from 'lucide-react';
import { CandidateDetailModal } from '@/components/CandidateDetailModal';
import { ExpandedCandidateModal } from '@/components/ExpandedCandidateModal';
import { AICandidateSearch } from '@/components/AICandidateSearch';
import { FilterSidebar } from '@/components/FilterSidebar';
import { FindMyMatchModal } from '@/components/FindMyMatchModal';
import { CandidateGridView } from '@/components/talent-pool/CandidateGridView';
import { CandidateTableView } from '@/components/talent-pool/CandidateTableView';
import { useTalentPoolState } from '@/hooks/useTalentPoolState';
import { candidates } from '@/data/candidatesData';

const TalentPool = () => {
  const {
    // State values
    searchQuery, setSearchQuery,
    locationFilter, setLocationFilter,
    experienceRange, setExperienceRange,
    statusFilter, setStatusFilter,
    skillsFilter, setSkillsFilter,
    scoreRange, setScoreRange,
    selectedCandidate, setSelectedCandidate,
    expandedCandidate, setExpandedCandidate,
    favorites, setFavorites,
    currentView, setCurrentView,
    aiSearchQuery, setAiSearchQuery,
    isAiSearching, setIsAiSearching,
    aiFilteredCandidates, setAiFilteredCandidates,
    isFilterSidebarOpen, setIsFilterSidebarOpen,
    unlockedCandidates, setUnlockedCandidates,
    isFindMyMatchOpen, setIsFindMyMatchOpen,
    matchedJobPost, setMatchedJobPost,
    isRevealed, setIsRevealed,
    revealTrigger, setRevealTrigger,
    scoreVisibility, setScoreVisibility,
    sortBy, setSortBy,
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
    assessmentScoreRange, setAssessmentScoreRange,
    selectedJob, setSelectedJob,
    hiringStageFilter, setHiringStageFilter,
    
    // Helper functions
    hasActiveFilters,
    triggerReveal,
    resetAllFilters,
    handleAiSearch,
    handleClearAiSearch
  } = useTalentPoolState();

  const allSkills = Array.from(new Set(candidates.flatMap(c => c.tags)));

  const jobTitles = {
    "all": "All Job Posts",
    "senior-financial-analyst": "Senior Financial Analyst",
    "accountant": "Accountant",
    "finance-manager": "Finance Manager",
  };
  const hiringStages = ["Sourced", "Applied", "Phone Screen", "Assessment", "Interview", "Offer", "Hired"];

  // Use AI filtered candidates if available, otherwise use regular filtering
  const baseCandidates = aiFilteredCandidates || candidates;
  const filteredCandidates = baseCandidates.filter(candidate => {
    const matchesSearch = searchQuery === '' || candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) || candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || candidate.location.includes(locationFilter);
    const matchesExperience = experienceRange[0] === 0 || candidate.yearsOfExperience >= experienceRange[0];
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSkills = skillsFilter === 'all' || candidate.tags.includes(skillsFilter);
    const matchesScore = scoreRange[0] === 0 || candidate.score >= scoreRange[0];
    const matchesAssessmentScore = assessmentScoreRange[0] === 0 || (candidate.assessmentScore && candidate.assessmentScore >= assessmentScoreRange[0]);
    const matchesHiringStage = hiringStageFilter.length === 0 || (candidate.hiringStage && hiringStageFilter.includes(candidate.hiringStage));
    
    // Check new filters
    const matchesSubfields = selectedSubfields.length === 0 || selectedSubfields.some(subfield => candidate.financeSubfields.includes(subfield));
    const matchesSoftware = selectedSoftware.length === 0 || selectedSoftware.some(software => candidate.softwareTools.includes(software));
    const matchesCertifications = selectedCertifications.length === 0 || selectedCertifications.some(cert => candidate.certifications.includes(cert));
    const matchesIndustries = selectedIndustries.length === 0 || selectedIndustries.some(industry => candidate.industryExperience.includes(industry));
    
    return matchesSearch && matchesLocation && matchesExperience && matchesStatus && matchesSkills && matchesScore && matchesAssessmentScore && matchesHiringStage && matchesSubfields && matchesSoftware && matchesCertifications && matchesIndustries;
  });

  // Show all candidates if not revealed, otherwise show filtered/matched candidates
  const candidatesToShow = isRevealed ? filteredCandidates : candidates;

  // Sort candidates based on selected sorting method
  const sortedCandidates = [...candidatesToShow].sort((a, b) => {
    switch (sortBy) {
      case 'score':
        return b.score - a.score;
      case 'experience':
        return b.yearsOfExperience - a.yearsOfExperience;
      case 'availability':
        if (a.status === 'Available' && b.status !== 'Available') return -1;
        if (b.status === 'Available' && a.status !== 'Available') return 1;
        return 0;
      default:
        return 0;
    }
  });

  // Get the actual filtered candidates count for display
  const getFilteredCount = () => {
    if (!hasActiveFilters() && !aiFilteredCandidates && !matchedJobPost) {
      return candidates.length;
    }
    return filteredCandidates.length;
  };

  const handleUnlock = (candidate: any) => {
    const newUnlockedCandidates = new Set<number>([...unlockedCandidates, candidate.id]);
    setUnlockedCandidates(newUnlockedCandidates);
    
    // Store the unlocked candidate with full details in localStorage
    const existingUnlocked = JSON.parse(localStorage.getItem('unlockedCandidates') || '[]');
    const candidateWithUnlockDate = {
      ...candidate,
      unlockedDate: new Date().toISOString()
    };
    
    // Check if candidate is not already unlocked
    if (!existingUnlocked.find((c: any) => c.id === candidate.id)) {
      const updatedUnlocked = [...existingUnlocked, candidateWithUnlockDate];
      localStorage.setItem('unlockedCandidates', JSON.stringify(updatedUnlocked));
    }
    
    // Show the expanded candidate modal directly
    setExpandedCandidate(candidate);
  };

  const handleApplyFilters = () => {
    setIsFilterSidebarOpen(false);
  };

  const handleExpandProfile = (candidate: any) => {
    setSelectedCandidate(null);
    setExpandedCandidate(candidate);
  };

  const toggleFavorite = (candidateId: number) => {
    const newFavorites = new Set<number>(favorites);
    if (newFavorites.has(candidateId)) {
      newFavorites.delete(candidateId);
    } else {
      newFavorites.add(candidateId);
    }
    setFavorites(newFavorites);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'table':
        return (
          <div className="w-full overflow-hidden">
            <CandidateTableView
              sortedCandidates={sortedCandidates}
              isRevealed={isRevealed}
              scoreVisibility={scoreVisibility}
              favorites={favorites}
              unlockedCandidates={unlockedCandidates}
              onToggleFavorite={toggleFavorite}
              onUnlock={handleUnlock}
            />
          </div>
        );
      default:
        return (
          <CandidateGridView
            sortedCandidates={sortedCandidates}
            isRevealed={isRevealed}
            scoreVisibility={scoreVisibility}
            favorites={favorites}
            unlockedCandidates={unlockedCandidates}
            onToggleFavorite={toggleFavorite}
            onUnlock={handleUnlock}
          />
        );
    }
  };

  const handleJobPostSelected = (jobPost: any) => {
    console.log('Selected job post:', jobPost);
    setMatchedJobPost(jobPost);
    triggerReveal('job-match');
    const searchQuery = `${jobPost.title}, ${jobPost.subfields.join(', ')}, ${jobPost.requirements.join(', ')}, ${jobPost.location}`;
    handleAiSearch(searchQuery);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title with View Toggle */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 py-[10px]">Talent Pool</h1>
              <p className="text-gray-600">Browse and filter finance professionals</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={currentView === 'grid' ? 'default' : 'outline'} 
              onClick={() => setCurrentView('grid')} 
              className="flex items-center gap-2"
            >
              <Grid2X2 className="w-4 h-4" />
              Grid
            </Button>
            <Button 
              variant={currentView === 'table' ? 'default' : 'outline'} 
              onClick={() => setCurrentView('table')} 
              className="flex items-center gap-2"
            >
              <LayoutList className="w-4 h-4" />
              Table
            </Button>
          </div>
        </div>

        {/* Guidance Line */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-orange-600" />
          <p className="text-orange-800 font-medium">Search talents using one of the 3 methods below to show matching talents!</p>
        </div>

        {/* Search Section */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 lg:w-3/4">
              <AICandidateSearch 
                onSearch={handleAiSearch} 
                isSearching={isAiSearching} 
                currentQuery={aiSearchQuery} 
                onClear={handleClearAiSearch} 
                onFindMyMatch={null} 
              />
            </div>

            <div className="lg:w-1/4 flex flex-col gap-4">
              <Button 
                onClick={() => setIsFilterSidebarOpen(true)} 
                className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white px-6 py-3 font-bold border-0 shadow-lg w-full h-12"
              >
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters ({getFilteredCount()})
              </Button>
              
              <Button 
                onClick={() => setIsFindMyMatchOpen(true)} 
                className="bg-[#86e5a1] hover:bg-[#6dd387] text-[#00102c] px-6 py-3 font-bold border-0 shadow-lg w-full h-12"
              >
                <FileText className="w-5 h-5 mr-2" />
                From Job Post
              </Button>

              <Button 
                onClick={resetAllFilters} 
                variant="outline"
                className="px-6 py-3 font-bold border-gray-300 hover:bg-gray-50 w-full h-12"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Matching Stats Bar */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Total Talents in Nestira:</span>
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 font-bold">
                  {candidates.length.toLocaleString()}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Matching Results:</span>
                <Badge variant="outline" className={`font-bold ${isRevealed ? 'bg-orange-100 text-orange-800 border-orange-300 animate-pulse' : 'bg-gray-100 text-gray-600 border-gray-300'}`}>
                  {isRevealed ? sortedCandidates.length : '-'}
                </Badge>
              </div>
            </div>
            {matchedJobPost && (
              <div className="text-sm text-orange-700 bg-orange-100 px-3 py-1 rounded-full">
                Matched for: {matchedJobPost.title}
              </div>
            )}
          </div>
        </div>

        {/* Score visibility status banner */}
        {isRevealed && scoreVisibility.showScores && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    🎯 Results ranked by match relevance
                  </span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                    {revealTrigger === 'ai-search' && 'AI Search Active'}
                    {revealTrigger === 'filters' && 'Filters Applied'}
                    {revealTrigger === 'job-match' && 'Job Match Active'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-700">Sort by:</span>
                  <Button variant={sortBy === 'score' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('score')} className="text-xs">
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                    Score
                  </Button>
                  <Button variant={sortBy === 'experience' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('experience')} className="text-xs">
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                    Experience
                  </Button>
                  <Button variant={sortBy === 'availability' ? 'default' : 'outline'} size="sm" onClick={() => setSortBy('availability')} className="text-xs">
                    <ArrowUpDown className="w-3 h-3 mr-1" />
                    Availability
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {renderCurrentView()}

        {sortedCandidates.length === 0 && isRevealed && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your criteria.</p>
          </div>
        )}

        <FilterSidebar 
          isOpen={isFilterSidebarOpen} 
          onClose={handleApplyFilters}
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
          filteredCandidatesCount={getFilteredCount()}
          jobTitles={jobTitles}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          hiringStages={hiringStages}
          hiringStageFilter={hiringStageFilter}
          setHiringStageFilter={setHiringStageFilter}
        />

        <FindMyMatchModal isOpen={isFindMyMatchOpen} onClose={() => setIsFindMyMatchOpen(false)} onJobSelected={handleJobPostSelected} />

        <CandidateDetailModal candidate={selectedCandidate} isOpen={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} isFavorite={selectedCandidate ? favorites.has(selectedCandidate.id) : false} onToggleFavorite={() => selectedCandidate && toggleFavorite(selectedCandidate.id)} onExpandProfile={() => selectedCandidate && handleExpandProfile(selectedCandidate)} />

        <ExpandedCandidateModal candidate={expandedCandidate} isOpen={!!expandedCandidate} onClose={() => setExpandedCandidate(null)} isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false} onToggleFavorite={() => expandedCandidate && toggleFavorite(expandedCandidate.id)} />
      </div>
    </DashboardLayout>
  );
};

export default TalentPool;
