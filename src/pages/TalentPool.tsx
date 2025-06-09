import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Star, MapPin, Briefcase, Unlock, Calendar, DollarSign, Grid2X2, LayoutList, Kanban, Filter, SlidersHorizontal, CheckCircle, Target, TrendingUp, ArrowUpDown, Eye, Users, Lock, FileText, RotateCcw } from 'lucide-react';
import { CandidateDetailModal } from '@/components/CandidateDetailModal';
import { ExpandedCandidateModal } from '@/components/ExpandedCandidateModal';
import { AICandidateSearch } from '@/components/AICandidateSearch';
import { FilterSidebar } from '@/components/FilterSidebar';
import { FindMyMatchModal } from '@/components/FindMyMatchModal';
import { aiSearchCandidates } from '@/utils/aiCandidateSearch';
import { CircularProgress } from '@/components/ui/circular-progress';
import React from 'react';

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('all');
  const [scoreRange, setScoreRange] = useState([0]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [currentView, setCurrentView] = useState('grid');
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiFilteredCandidates, setAiFilteredCandidates] = useState(null);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [unlockedCandidates, setUnlockedCandidates] = useState(new Set());
  const [isFindMyMatchOpen, setIsFindMyMatchOpen] = useState(false);
  const [matchedJobPost, setMatchedJobPost] = useState(null);

  // New state for reveal logic
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealTrigger, setRevealTrigger] = useState(null); // 'filters', 'ai-search', 'job-match'

  // Score visibility state (keeping existing logic)
  const [scoreVisibility, setScoreVisibility] = useState({
    showScores: false,
    triggerMethod: null,
    isAnimating: false
  });
  const [sortBy, setSortBy] = useState('score');

  // New filter states - properly initialized
  const [selectedSubfields, setSelectedSubfields] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [erpVersion, setErpVersion] = useState('all');
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedVisaStatus, setSelectedVisaStatus] = useState([]);
  const [employmentType, setEmploymentType] = useState('all');
  const [workMode, setWorkMode] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [languageProficiency, setLanguageProficiency] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [educationLevel, setEducationLevel] = useState('all');
  const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState([]);
  const [cvCompleteness, setCvCompleteness] = useState('all');
  const [academicExcellence, setAcademicExcellence] = useState(false);
  const [selectedScreeningTags, setSelectedScreeningTags] = useState([]);

  // ... keep existing code (candidates data)
  const candidates = [{
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Finance Manager",
    location: "Dubai, UAE",
    country: "AE",
    experience: "8 years",
    score: 92,
    status: "Available",
    tags: ["CPA", "Excel Expert", "Financial Analysis"],
    industryExperience: ["Banking", "FMCG", "Tech"],
    financeSubfields: ["Financial Planning", "Budget Management", "Cost Analysis"],
    softwareTools: ["SAP", "Oracle", "QuickBooks", "Tableau"],
    certifications: ["CPA", "CFA Level 2", "FRM"],
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    email: "sarah.johnson@email.com",
    phone: "+971 50 123 4567",
    yearsOfExperience: 8,
    education: "MBA Finance, American University of Dubai",
    summary: "Experienced finance professional with 8+ years in financial planning, analysis, and team leadership. Proven track record in implementing cost-saving initiatives and driving strategic financial decisions in multinational corporations.",
    profileAdded: "2024-01-15",
    salaryExpectation: "120,000 - 150,000 AED"
  }, {
    id: 2,
    name: "Ahmed Hassan",
    title: "Financial Analyst",
    location: "Cairo, Egypt",
    country: "EG",
    experience: "5 years",
    score: 88,
    status: "Interviewing",
    tags: ["Power BI", "SQL", "Risk Management"],
    industryExperience: ["Oil & Gas", "Manufacturing"],
    financeSubfields: ["Risk Assessment", "Financial Modeling", "Data Analysis"],
    softwareTools: ["Power BI", "SQL Server", "Python", "R"],
    certifications: ["FRM", "PMP"],
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
    email: "ahmed.hassan@email.com",
    phone: "+20 10 123 4567",
    yearsOfExperience: 5,
    education: "Bachelor's in Finance, Cairo University",
    summary: "Detail-oriented financial analyst specializing in data analysis, risk assessment, and financial modeling. Expert in Power BI and SQL with strong analytical skills.",
    profileAdded: "2024-02-20",
    salaryExpectation: "80,000 - 100,000 EGP"
  }, {
    id: 3,
    name: "Fatima Al-Zahra",
    title: "Accounting Manager",
    location: "Riyadh, Saudi Arabia",
    country: "SA",
    experience: "6 years",
    score: 90,
    status: "Shortlisted",
    tags: ["SAP", "IFRS", "Team Leadership"],
    industryExperience: ["Real Estate", "Retail"],
    financeSubfields: ["Management Accounting", "IFRS Compliance", "Team Leadership"],
    softwareTools: ["SAP", "Microsoft Dynamics", "Excel Advanced"],
    certifications: ["ACCA", "IFRS Certificate"],
    photo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face",
    email: "fatima.alzahra@email.com",
    phone: "+966 50 123 4567",
    yearsOfExperience: 6,
    education: "Master's in Accounting, King Saud University",
    summary: "Strategic accounting manager with expertise in SAP implementation, IFRS compliance, and team leadership. Successfully managed accounting teams of 15+ members.",
    profileAdded: "2024-03-10",
    salaryExpectation: "180,000 - 220,000 SAR"
  }];
  const allSkills = Array.from(new Set(candidates.flatMap(c => c.tags)));

  // Use AI filtered candidates if available, otherwise use regular filtering
  const baseCandidates = aiFilteredCandidates || candidates;
  const filteredCandidates = baseCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) || candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || candidate.location.includes(locationFilter);
    const matchesExperience = experienceRange[0] === 0 || candidate.yearsOfExperience >= experienceRange[0];
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSkills = skillsFilter === 'all' || candidate.tags.includes(skillsFilter);
    const matchesScore = scoreRange[0] === 0 || candidate.score >= scoreRange[0];
    
    // Check new filters
    const matchesSubfields = selectedSubfields.length === 0 || selectedSubfields.some(subfield => candidate.financeSubfields.includes(subfield));
    const matchesSoftware = selectedSoftware.length === 0 || selectedSoftware.some(software => candidate.softwareTools.includes(software));
    const matchesCertifications = selectedCertifications.length === 0 || selectedCertifications.some(cert => candidate.certifications.includes(cert));
    const matchesIndustries = selectedIndustries.length === 0 || selectedIndustries.some(industry => candidate.industryExperience.includes(industry));
    
    return matchesSearch && matchesLocation && matchesExperience && matchesStatus && matchesSkills && matchesScore && matchesSubfields && matchesSoftware && matchesCertifications && matchesIndustries;
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

  // Check if any filters are applied that should reveal candidates - FIXED
  const hasActiveFilters = () => {
    return searchQuery !== '' || 
           locationFilter !== 'all' || 
           experienceRange[0] !== 0 || 
           statusFilter !== 'all' || 
           skillsFilter !== 'all' || 
           scoreRange[0] !== 0 || 
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

  // Trigger reveal when filters are applied
  const triggerReveal = trigger => {
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

  // New utility functions
  const getScoreColor = score => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };
  const formatBlurredName = name => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0]} ${'*'.repeat(nameParts[1].length)}`;
    }
    return nameParts[0];
  };
  const handleUnlock = candidate => {
    setUnlockedCandidates(prev => new Set([...prev, candidate.id]));
    setExpandedCandidate(candidate);
  };

  // Progress bar component for candidate count
  const CandidateCountProgress = ({
    count,
    total
  }) => {
    const percentage = count / total * 100;
    let progressColor = 'bg-red-500';
    if (percentage > 70) {
      progressColor = 'bg-green-500';
    } else if (percentage > 30) {
      progressColor = 'bg-orange-500';
    }
    return <div className="flex items-center gap-3">
        <div className="flex-1">
          <Progress value={percentage} className="h-2" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {count} of {total}
        </span>
      </div>;
  };

  // Helper functions for multi-select
  const toggleMultiSelect = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  // FIXED resetAllFilters function
  const resetAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setExperienceRange([0]);
    setStatusFilter('all');
    setSkillsFilter('all');
    setScoreRange([0]);
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

    // Reset reveal state
    setIsRevealed(false);
    setRevealTrigger(null);
    setScoreVisibility({
      showScores: false,
      triggerMethod: null,
      isAnimating: false
    });
  };
  const handleAiSearch = async (query: string) => {
    setIsAiSearching(true);
    setAiSearchQuery(query);

    // Trigger reveal for AI search
    triggerReveal('ai-search');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const aiResults = aiSearchCandidates(candidates, query);
    setAiFilteredCandidates(aiResults);
    setIsAiSearching(false);
  };
  const handleClearAiSearch = () => {
    setAiSearchQuery('');
    setAiFilteredCandidates(null);
    setMatchedJobPost(null);

    // Reset reveal state if only AI search was active
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
  const handleExpandProfile = candidate => {
    setSelectedCandidate(null);
    setExpandedCandidate(candidate);
  };
  const toggleFavorite = candidateId => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(candidateId)) {
      newFavorites.delete(candidateId);
    } else {
      newFavorites.add(candidateId);
    }
    setFavorites(newFavorites);
  };
  const getCountryFlag = countryCode => {
    const flags = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };
  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };
  const renderGridView = () => <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCandidates.map(candidate => {
        const isUnlocked = unlockedCandidates.has(candidate.id);
        const shouldBlur = !isRevealed;
        return <Card key={candidate.id} className="hover:shadow-lg transition-all duration-300 relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 blur-sm">
                        <AvatarImage src={candidate.photo} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-full flex items-center justify-center">
                        <Unlock className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="transition-all duration-500">
                          {formatBlurredName(candidate.name)}
                        </span>
                        <span className="text-lg">{getCountryFlag(candidate.country)}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          {isRevealed && scoreVisibility.showScores ? <div className={`transition-all duration-500 ${scoreVisibility.isAnimating ? 'animate-scale-in' : ''}`}>
                              <CircularProgress value={candidate.score} size={60} strokeWidth={4} />
                            </div> : <div className="relative">
                              <CircularProgress value={0} size={60} strokeWidth={4} className="opacity-30" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs text-gray-400 text-center">Hidden</span>
                              </div>
                            </div>}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {isRevealed && scoreVisibility.showScores ? `Matching Score: ${candidate.score}%` : 'Use filters, job post, or AI search to reveal match'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Button variant="ghost" size="sm" onClick={() => toggleFavorite(candidate.id)} className="text-yellow-500 hover:text-yellow-600 p-1">
                      <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {candidate.experience} experience
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  {candidate.salaryExpectation}
                </div>

                <div className="flex items-center gap-2.5">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Industry:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.industryExperience.map(industry => <Badge key={industry} variant="outline" className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                        {industry}
                      </Badge>)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Subfields:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.financeSubfields.map(subfield => <Badge key={subfield} variant="outline" className={`text-xs bg-blue-50 text-blue-700 border-blue-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                        {subfield}
                      </Badge>)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Tools:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.softwareTools.map(tool => <Badge key={tool} variant="outline" className={`text-xs bg-purple-50 text-purple-700 border-purple-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                        {tool}
                      </Badge>)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Certs:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.certifications.map(cert => <Badge key={cert} variant="outline" className={`text-xs bg-green-50 text-green-700 border-green-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                        {cert}
                      </Badge>)}
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <Badge variant={candidate.status === 'Available' ? 'default' : 'secondary'} className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}>
                    {candidate.status}
                  </Badge>
                  <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => handleUnlock(candidate)}>
                    <Unlock className="w-4 h-4 mr-1" />
                    Unlock
                  </Button>
                </div>
              </CardContent>
            </Card>;
      })}
      </div>
    </TooltipProvider>;
  const renderTableView = () => <TooltipProvider>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Subfields</TableHead>
              <TableHead>Tools</TableHead>
              <TableHead>Certifications</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map(candidate => {
            const shouldBlur = !isRevealed;
            return <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8 blur-sm">
                          <AvatarImage src={candidate.photo} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-full flex items-center justify-center">
                          <Unlock className="w-3 h-3 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2 transition-all duration-500">
                          {formatBlurredName(candidate.name)}
                          <span>{getCountryFlag(candidate.country)}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.title}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          {isRevealed && scoreVisibility.showScores ? <div className={`transition-all duration-500 ${scoreVisibility.isAnimating ? 'animate-scale-in' : ''}`}>
                              <CircularProgress value={candidate.score} size={40} strokeWidth={3} showPercentage={true} compact={true} />
                            </div> : <div className="relative">
                              <CircularProgress value={0} size={40} strokeWidth={3} className="opacity-30" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs text-gray-400">-</span>
                              </div>
                            </div>}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {isRevealed && scoreVisibility.showScores ? `Matching Score: ${candidate.score}%` : 'Use filters, job post, or AI search to reveal match'}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Badge variant={candidate.status === 'Available' ? 'default' : 'secondary'} className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.industryExperience.slice(0, 2).map(industry => <Badge key={industry} variant="outline" className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          {industry}
                        </Badge>)}
                      {candidate.industryExperience.length > 2 && <Badge variant="outline" className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          +{candidate.industryExperience.length - 2}
                        </Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.financeSubfields.slice(0, 2).map(subfield => <Badge key={subfield} variant="outline" className={`text-xs bg-blue-50 text-blue-700 border-blue-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          {subfield}
                        </Badge>)}
                      {candidate.financeSubfields.length > 2 && <Badge variant="outline" className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          +{candidate.financeSubfields.length - 2}
                        </Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.softwareTools.slice(0, 2).map(tool => <Badge key={tool} variant="outline" className={`text-xs bg-purple-50 text-purple-700 border-purple-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          {tool}
                        </Badge>)}
                      {candidate.softwareTools.length > 2 && <Badge variant="outline" className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          +{candidate.softwareTools.length - 2}
                        </Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {candidate.certifications.slice(0, 2).map(cert => <Badge key={cert} variant="outline" className={`text-xs bg-green-50 text-green-700 border-green-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          {cert}
                        </Badge>)}
                      {candidate.certifications.length > 2 && <Badge variant="outline" className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}>
                          +{candidate.certifications.length - 2}
                        </Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{candidate.salaryExpectation}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleFavorite(candidate.id)} className="text-yellow-500 hover:text-yellow-600 p-1">
                        <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => handleUnlock(candidate)}>
                        <Unlock className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>;
          })}
          </TableBody>
        </Table>
      </Card>
    </TooltipProvider>;
  const renderCurrentView = () => {
    switch (currentView) {
      case 'table':
        return renderTableView();
      default:
        return renderGridView();
    }
  };
  const handleJobPostSelected = (jobPost: any) => {
    console.log('Selected job post:', jobPost);
    setMatchedJobPost(jobPost);

    // Trigger reveal for job match
    triggerReveal('job-match');
    const searchQuery = `${jobPost.title}, ${jobPost.subfields.join(', ')}, ${jobPost.requirements.join(', ')}, ${jobPost.location}`;
    handleAiSearch(searchQuery);
  };

  // Effect to handle filter changes
  React.useEffect(() => {
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
  }, [searchQuery, locationFilter, experienceRange, statusFilter, skillsFilter, scoreRange, selectedSubfields, selectedSoftware, erpVersion, selectedCertifications, selectedIndustries, selectedVisaStatus, employmentType, workMode, availability, languageProficiency, genderFilter, educationLevel, selectedSpecialNeeds, cvCompleteness, academicExcellence, selectedScreeningTags]);
  return <DashboardLayout>
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
          {/* Main Flex Container */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - AI Search (75%) */}
            <div className="flex-1 lg:w-3/4">
              <AICandidateSearch 
                onSearch={handleAiSearch} 
                isSearching={isAiSearching} 
                currentQuery={aiSearchQuery} 
                onClear={handleClearAiSearch} 
                onFindMyMatch={null} 
              />
            </div>

            {/* Right Column - Buttons (25%) */}
            <div className="lg:w-1/4 flex flex-col gap-4">
              <Button 
                onClick={() => setIsFilterSidebarOpen(true)} 
                className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white px-6 py-3 font-bold border-0 shadow-lg w-full h-12"
              >
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters ({sortedCandidates.length})
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
        {isRevealed && scoreVisibility.showScores && <Card className="bg-blue-50 border-blue-200">
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
          </Card>}

        {renderCurrentView()}

        {sortedCandidates.length === 0 && isRevealed && <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your criteria.</p>
          </div>}

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
          filteredCandidatesCount={sortedCandidates.length} 
        />

        <FindMyMatchModal isOpen={isFindMyMatchOpen} onClose={() => setIsFindMyMatchOpen(false)} onJobSelected={handleJobPostSelected} />

        <CandidateDetailModal candidate={selectedCandidate} isOpen={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} isFavorite={selectedCandidate ? favorites.has(selectedCandidate.id) : false} onToggleFavorite={() => selectedCandidate && toggleFavorite(selectedCandidate.id)} onExpandProfile={() => selectedCandidate && handleExpandProfile(selectedCandidate)} />

        <ExpandedCandidateModal candidate={expandedCandidate} isOpen={!!expandedCandidate} onClose={() => setExpandedCandidate(null)} isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false} onToggleFavorite={() => expandedCandidate && toggleFavorite(expandedCandidate.id)} />
      </div>
    </DashboardLayout>;
};

export default TalentPool;
