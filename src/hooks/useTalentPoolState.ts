import { useState, useEffect } from 'react';
import { candidates } from '@/data/candidatesData';
import { aiSearchCandidates } from '@/utils/aiCandidateSearch';

export const useTalentPoolState = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('all');
  const [scoreRange, setScoreRange] = useState([0]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [expandedCandidate, setExpandedCandidate] = useState<any>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set<number>());
  const [currentView, setCurrentView] = useState('grid');
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredCandidates, setAiFilteredCandidates] = useState<any>(null);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [unlockedCandidates, setUnlockedCandidates] = useState<Set<number>>(new Set<number>());
  const [isFindMyMatchOpen, setIsFindMyMatchOpen] = useState(false);
  const [matchedJobPost, setMatchedJobPost] = useState<any>(null);

  // Reveal logic state
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealTrigger, setRevealTrigger] = useState<string | null>(null);

  // Score visibility state
  const [scoreVisibility, setScoreVisibility] = useState({
    showScores: false,
    triggerMethod: null,
    isAnimating: false
  });
  const [sortBy, setSortBy] = useState('score');

  // Filter states
  const [assessmentScoreRange, setAssessmentScoreRange] = useState([0]);
  const [selectedJob, setSelectedJob] = useState('all');
  const [hiringStageFilter, setHiringStageFilter] = useState<string[]>([]);
  const [selectedSubfields, setSelectedSubfields] = useState<string[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [erpVersion, setErpVersion] = useState('all');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedVisaStatus, setSelectedVisaStatus] = useState<string[]>([]);
  const [employmentType, setEmploymentType] = useState('all');
  const [workMode, setWorkMode] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [languageProficiency, setLanguageProficiency] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [educationLevel, setEducationLevel] = useState('all');
  const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState<string[]>([]);
  const [cvCompleteness, setCvCompleteness] = useState('all');
  const [academicExcellence, setAcademicExcellence] = useState(false);
  const [selectedScreeningTags, setSelectedScreeningTags] = useState<string[]>([]);

  // Check if any filters are applied
  const hasActiveFilters = () => {
    return searchQuery !== '' || 
           locationFilter !== 'all' || 
           experienceRange[0] > 0 || 
           statusFilter !== 'all' || 
           skillsFilter !== 'all' || 
           scoreRange[0] > 0 ||
           assessmentScoreRange[0] > 0 ||
           selectedJob !== 'all' ||
           hiringStageFilter.length > 0 ||
           selectedSubfields.length > 0 || 
           selectedSoftware.length > 0 || 
           erpVersion !== 'all' || 
           selectedCertifications.length > 0 || 
           selectedIndustries.length > 0 || 
           selectedVisaStatus.length > 0 || 
           employmentType !== 'all' || 
           workMode !== 'all' || 
           availability !== 'all' ||
           languageProficiency !== 'all' || 
           genderFilter !== 'all' || 
           educationLevel !== 'all' || 
           selectedSpecialNeeds.length > 0 || 
           cvCompleteness !== 'all' || 
           academicExcellence || 
           selectedScreeningTags.length > 0;
  };

  // Trigger reveal function
  const triggerReveal = (trigger: string) => {
    setIsRevealed(true);
    setRevealTrigger(trigger);
    setScoreVisibility({
      showScores: true,
      triggerMethod: trigger,
      isAnimating: true
    });
    setTimeout(() => {
      setScoreVisibility(prev => ({
        ...prev,
        isAnimating: false
      }));
    }, 500);
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setExperienceRange([0]);
    setStatusFilter('all');
    setSkillsFilter('all');
    setScoreRange([0]);
    setAssessmentScoreRange([0]);
    setSelectedJob('all');
    setHiringStageFilter([]);
    setSelectedSubfields([]);
    setSelectedSoftware([]);
    setErpVersion('all');
    setSelectedCertifications([]);
    setSelectedIndustries([]);
    setSelectedVisaStatus([]);
    setEmploymentType('all');
    setWorkMode('all');
    setAvailability('all');
    setLanguageProficiency('all');
    setGenderFilter('all');
    setEducationLevel('all');
    setSelectedSpecialNeeds([]);
    setCvCompleteness('all');
    setAcademicExcellence(false);
    setSelectedScreeningTags([]);
    setAiFilteredCandidates(null);
    setAiSearchQuery('');
    setMatchedJobPost(null);

    setIsRevealed(false);
    setRevealTrigger(null);
    setScoreVisibility({
      showScores: false,
      triggerMethod: null,
      isAnimating: false
    });
  };

  // AI search handler
  const handleAiSearch = async (query: string) => {
    setIsAiSearching(true);
    setAiSearchQuery(query);
    triggerReveal('ai-search');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const aiResults = aiSearchCandidates(candidates, query);
    setAiFilteredCandidates(aiResults);
    setIsAiSearching(false);
  };

  // Clear AI search
  const handleClearAiSearch = () => {
    setAiSearchQuery('');
    setAiFilteredCandidates(null);
    setMatchedJobPost(null);

    if (revealTrigger === 'ai-search' && !hasActiveFilters()) {
      setIsRevealed(false);
      setRevealTrigger(null);
      setScoreVisibility({
        showScores: false,
        triggerMethod: null,
        isAnimating: false
      });
    }
  };

  // Effect to handle filter changes
  useEffect(() => {
    if (hasActiveFilters() && !isRevealed) {
      triggerReveal('filters');
    } else if (!hasActiveFilters() && isRevealed && revealTrigger === 'filters') {
      setIsRevealed(false);
      setRevealTrigger(null);
      setScoreVisibility({
        showScores: false,
        triggerMethod: null,
        isAnimating: false
      });
    }
  }, [searchQuery, locationFilter, experienceRange, statusFilter, skillsFilter, scoreRange, assessmentScoreRange, selectedJob, hiringStageFilter, selectedSubfields, selectedSoftware, erpVersion, selectedCertifications, selectedIndustries, selectedVisaStatus, employmentType, workMode, availability, languageProficiency, genderFilter, educationLevel, selectedSpecialNeeds, cvCompleteness, academicExcellence, selectedScreeningTags]);

  return {
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
    
    // Helper functions
    hasActiveFilters,
    triggerReveal,
    resetAllFilters,
    handleAiSearch,
    handleClearAiSearch
  };
};
