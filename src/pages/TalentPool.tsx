import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Star, MapPin, Briefcase, Unlock, Search, Calendar, DollarSign, Flag, Grid2X2, LayoutList, Kanban, Maximize2, ChevronDown, X, Filter } from 'lucide-react';
import { CandidateDetailModal } from '@/components/CandidateDetailModal';
import { ExpandedCandidateModal } from '@/components/ExpandedCandidateModal';
import { AICandidateSearch } from '@/components/AICandidateSearch';
import { aiSearchCandidates } from '@/utils/aiCandidateSearch';

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

  // New filter states
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
  const [genderFilter, setGenderFilter] = useState('no-preference');
  const [educationLevel, setEducationLevel] = useState('all');
  const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState([]);
  const [cvCompleteness, setCvCompleteness] = useState('all');
  const [academicExcellence, setAcademicExcellence] = useState(false);
  const [selectedScreeningTags, setSelectedScreeningTags] = useState([]);
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      country: "AE",
      experience: "8 years",
      score: 92,
      status: "Available",
      tags: ["CPA", "Excel Expert", "Financial Analysis"],
      photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
      phone: "+971 50 123 4567",
      yearsOfExperience: 8,
      education: "MBA Finance, American University of Dubai",
      summary: "Experienced finance professional with 8+ years in financial planning, analysis, and team leadership. Proven track record in implementing cost-saving initiatives and driving strategic financial decisions in multinational corporations.",
      profileAdded: "2024-01-15",
      salaryExpectation: "120,000 - 150,000 AED"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      title: "Financial Analyst",
      location: "Cairo, Egypt",
      country: "EG",
      experience: "5 years",
      score: 88,
      status: "Interviewing",
      tags: ["Power BI", "SQL", "Risk Management"],
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
      email: "ahmed.hassan@email.com",
      phone: "+20 10 123 4567",
      yearsOfExperience: 5,
      education: "Bachelor's in Finance, Cairo University",
      summary: "Detail-oriented financial analyst specializing in data analysis, risk assessment, and financial modeling. Expert in Power BI and SQL with strong analytical skills.",
      profileAdded: "2024-02-20",
      salaryExpectation: "80,000 - 100,000 EGP"
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      title: "Accounting Manager",
      location: "Riyadh, Saudi Arabia",
      country: "SA",
      experience: "6 years",
      score: 90,
      status: "Shortlisted",
      tags: ["SAP", "IFRS", "Team Leadership"],
      photo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face",
      email: "fatima.alzahra@email.com",
      phone: "+966 50 123 4567",
      yearsOfExperience: 6,
      education: "Master's in Accounting, King Saud University",
      summary: "Strategic accounting manager with expertise in SAP implementation, IFRS compliance, and team leadership. Successfully managed accounting teams of 15+ members.",
      profileAdded: "2024-03-10",
      salaryExpectation: "180,000 - 220,000 SAR"
    }
  ];

  const allSkills = Array.from(new Set(candidates.flatMap(c => c.tags)));

  // Filter options
  const financeSubfields = ["Audit", "Tax", "FP&A", "Treasury", "Fintech", "General Ledger (GL)", "Accounts Payable (AP)", "Accounts Receivable (AR)"];
  const softwareTools = ["Excel (Advanced)", "Power BI", "Tableau"];
  const erpVersions = ["SAP FICO v4", "SAP FICO v6", "Oracle Fusion", "NetSuite"];
  const certifications = ["CMA", "CPA", "ACCA", "SOCPA", "CIA", "DipIFR", "MBA"];
  const industries = ["Oil & Gas", "NGOs", "Manufacturing", "Tech", "Real Estate", "Retail"];
  const visaStatuses = ["Citizen", "Residency Visa (Transferable)", "Residency Visa (Non-Transferable)", "Visit Visa", "No Visa"];
  const employmentTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];
  const workModes = ["Onsite", "Hybrid", "Remote"];
  const availabilities = ["Immediate", "1 week", "2+ weeks"];
  const languages = ["Arabic", "English", "Bilingual"];
  const genderOptions = ["No Preference", "Males Only", "Females Only", "Male Preferred", "Female Preferred"];
  const educationLevels = ["High School", "Diploma", "Bachelor's", "Master's", "MBA", "Doctorate"];
  const specialNeeds = ["Cognitive Disabilities", "Physical Disabilities", "Hearing Disabilities", "Mobility Disabilities", "Learning Disability", "Communication Impairment"];
  const cvCompletenessOptions = ["More than 20%", "More than 40%", "More than 60%", "More than 80%"];
  const screeningTags = ["Background Check", "Urgent Hiring", "Remote Ready", "Work Experience", "Language Fit", "Visa Status", "Custom Question", "Work Authorization"];

  // Use AI filtered candidates if available, otherwise use regular filtering
  const baseCandidates = aiFilteredCandidates || candidates;

  const filteredCandidates = baseCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || candidate.location.includes(locationFilter);
    const matchesExperience = experienceRange[0] === 0 || candidate.yearsOfExperience >= experienceRange[0];
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSkills = skillsFilter === 'all' || candidate.tags.includes(skillsFilter);
    const matchesScore = scoreRange[0] === 0 || candidate.score >= scoreRange[0];
    
    return matchesSearch && matchesLocation && matchesExperience && matchesStatus && matchesSkills && matchesScore;
  });

  // Helper functions for multi-select
  const toggleMultiSelect = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

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
    setGenderFilter('no-preference');
    setEducationLevel('all');
    setSelectedSpecialNeeds([]);
    setCvCompleteness('all');
    setAcademicExcellence(false);
    setSelectedScreeningTags([]);
    setAiFilteredCandidates(null);
    setAiSearchQuery('');
  };

  const handleAiSearch = async (query: string) => {
    setIsAiSearching(true);
    setAiSearchQuery(query);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiResults = aiSearchCandidates(candidates, query);
    setAiFilteredCandidates(aiResults);
    setIsAiSearching(false);
  };

  const handleClearAiSearch = () => {
    setAiSearchQuery('');
    setAiFilteredCandidates(null);
  };

  const handleUnlock = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleExpandProfile = (candidate) => {
    setSelectedCandidate(null); // Close the current modal first
    setExpandedCandidate(candidate);
  };

  const toggleFavorite = (candidateId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(candidateId)) {
      newFavorites.delete(candidateId);
    } else {
      newFavorites.add(candidateId);
    }
    setFavorites(newFavorites);
  };

  const getCountryFlag = (countryCode) => {
    const flags = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };

  const formatDate = (dateString) => {
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

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCandidates.map((candidate) => (
        <Card key={candidate.id} className="hover:shadow-lg transition-shadow relative">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={candidate.photo} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {candidate.name}
                    <span className="text-lg">{getCountryFlag(candidate.country)}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{candidate.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(candidate.id)}
                  className="text-yellow-500 hover:text-yellow-600 p-1"
                >
                  <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                </Button>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-sm">
                  {candidate.score}
                </div>
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
              <Calendar className="w-4 h-4" />
              Joined {formatDate(candidate.profileAdded)}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              {candidate.salaryExpectation}
            </div>
            <div className="flex flex-wrap gap-1">
              {candidate.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center gap-2">
              <Badge 
                variant={candidate.status === 'Available' ? 'default' : 'secondary'}
                className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
              >
                {candidate.status}
              </Badge>
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent/90"
                onClick={() => handleUnlock(candidate)}
              >
                <Unlock className="w-4 h-4 mr-1" />
                Unlock
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
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
            <TableHead>Salary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCandidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={candidate.photo} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {candidate.name}
                      <span>{getCountryFlag(candidate.country)}</span>
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(candidate.profileAdded)}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{candidate.title}</TableCell>
              <TableCell>{candidate.location}</TableCell>
              <TableCell>{candidate.experience}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold text-sm">
                  {candidate.score}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={candidate.status === 'Available' ? 'default' : 'secondary'}
                  className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                >
                  {candidate.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{candidate.salaryExpectation}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(candidate.id)}
                    className="text-yellow-500 hover:text-yellow-600 p-1"
                  >
                    <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-accent hover:bg-accent/90"
                    onClick={() => handleUnlock(candidate)}
                  >
                    <Unlock className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Available', 'Interviewing', 'Shortlisted'].map((status) => (
        <div key={status} className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">
            {status} ({filteredCandidates.filter(c => c.status === status).length})
          </h3>
          <div className="space-y-3">
            {filteredCandidates
              .filter(candidate => candidate.status === status)
              .map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={candidate.photo} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm flex items-center gap-1">
                            {candidate.name}
                            <span className="text-xs">{getCountryFlag(candidate.country)}</span>
                          </div>
                          <div className="text-xs text-gray-500">{candidate.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(candidate.id)}
                          className="text-yellow-500 hover:text-yellow-600 p-1 h-6 w-6"
                        >
                          <Star className={`w-3 h-3 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                        </Button>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white font-bold text-xs">
                          {candidate.score}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {candidate.salaryExpectation}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {candidate.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                      {candidate.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                          +{candidate.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1 mt-3">
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs h-6 bg-accent hover:bg-accent/90"
                        onClick={() => handleUnlock(candidate)}
                      >
                        <Unlock className="w-3 h-3 mr-1" />
                        Unlock
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'table':
        return renderTableView();
      case 'kanban':
        return renderKanbanView();
      default:
        return renderGridView();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
            <p className="text-gray-600">Browse and filter finance professionals</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={currentView === 'grid' ? 'default' : 'outline'}
              onClick={() => setCurrentView('grid')}
              className="flex items-center gap-2"
            >
              <Grid2X2 className="w-4 h-4" />
              Grid View
            </Button>
            <Button 
              variant={currentView === 'table' ? 'default' : 'outline'}
              onClick={() => setCurrentView('table')}
              className="flex items-center gap-2"
            >
              <LayoutList className="w-4 h-4" />
              Table View
            </Button>
            <Button 
              variant={currentView === 'kanban' ? 'default' : 'outline'}
              onClick={() => setCurrentView('kanban')}
              className="flex items-center gap-2"
            >
              <Kanban className="w-4 h-4" />
              Kanban
            </Button>
          </div>
        </div>

        {/* AI Search Component */}
        <AICandidateSearch
          onSearch={handleAiSearch}
          isSearching={isAiSearching}
          currentQuery={aiSearchQuery}
          onClear={handleClearAiSearch}
        />

        {/* Enhanced Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Basic Filters Row */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Dubai">Dubai, UAE</SelectItem>
                    <SelectItem value="Cairo">Cairo, Egypt</SelectItem>
                    <SelectItem value="Riyadh">Riyadh, Saudi Arabia</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  </SelectContent>
                </Select>

                <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                  <Filter className="w-4 h-4 inline mr-1" />
                  {filteredCandidates.length} candidates found
                </div>
              </div>

              {/* 1. Job & Skill Filters */}
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">🔵 Job & Skill Filters</h3>
                
                {/* Finance Subfields */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Finance Subfields</label>
                  <div className="flex flex-wrap gap-2">
                    {financeSubfields.map((subfield) => (
                      <Badge
                        key={subfield}
                        variant={selectedSubfields.includes(subfield) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleMultiSelect(subfield, selectedSubfields, setSelectedSubfields)}
                      >
                        {subfield}
                        {selectedSubfields.includes(subfield) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Software & Tools */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Software & Tools</label>
                  <div className="flex flex-wrap gap-2">
                    {softwareTools.map((tool) => (
                      <Badge
                        key={tool}
                        variant={selectedSoftware.includes(tool) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleMultiSelect(tool, selectedSoftware, setSelectedSoftware)}
                      >
                        {tool}
                        {selectedSoftware.includes(tool) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ERP Version */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">ERP Version</label>
                    <Select value={erpVersion} onValueChange={setErpVersion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ERP Version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All ERP Systems</SelectItem>
                        {erpVersions.map((erp) => (
                          <SelectItem key={erp} value={erp}>{erp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Certifications</label>
                    <div className="flex flex-wrap gap-1">
                      {certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant={selectedCertifications.includes(cert) ? "default" : "secondary"}
                          className="cursor-pointer text-xs"
                          onClick={() => toggleMultiSelect(cert, selectedCertifications, setSelectedCertifications)}
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Industry Experience */}
              <div className="space-y-4 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">🟠 Industry Experience</h3>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <Badge
                      key={industry}
                      variant={selectedIndustries.includes(industry) ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => toggleMultiSelect(industry, selectedIndustries, setSelectedIndustries)}
                    >
                      {industry}
                      {selectedIndustries.includes(industry) && <X className="w-3 h-3 ml-1" />}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 3. Location & Visa */}
              <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">🟢 Location & Visa</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Visa Status</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {visaStatuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={status}
                          checked={selectedVisaStatus.includes(status)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedVisaStatus([...selectedVisaStatus, status]);
                            } else {
                              setSelectedVisaStatus(selectedVisaStatus.filter(s => s !== status));
                            }
                          }}
                        />
                        <label htmlFor={status} className="text-sm text-gray-700">{status}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Work Type & Availability */}
              <div className="space-y-4 p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">🔴 Work Type & Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Employment Type</label>
                    <Select value={employmentType} onValueChange={setEmploymentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Work Mode</label>
                    <Select value={workMode} onValueChange={setWorkMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        {workModes.map((mode) => (
                          <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Availability</label>
                    <Select value={availability} onValueChange={setAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Timeframes</SelectItem>
                        {availabilities.map((avail) => (
                          <SelectItem key={avail} value={avail}>{avail}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 5. Advanced Filters (Collapsible) */}
              <Collapsible open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
                <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-gray-900">🟣 Advanced Filters</h3>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isAdvancedFiltersOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Language Proficiency</label>
                        <Select value={languageProficiency} onValueChange={setLanguageProficiency}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Languages</SelectItem>
                            {languages.map((lang) => (
                              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Gender Filter</label>
                        <Select value={genderFilter} onValueChange={setGenderFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender Preference" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((option, index) => (
                              <SelectItem key={option} value={index === 0 ? 'no-preference' : option.toLowerCase().replace(/\s+/g, '-')}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Education Level</label>
                        <Select value={educationLevel} onValueChange={setEducationLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Education" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            {educationLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">CV Completeness</label>
                        <Select value={cvCompleteness} onValueChange={setCvCompleteness}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Completeness" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Completeness</SelectItem>
                            {cvCompletenessOptions.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Special Needs Accommodation</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {specialNeeds.map((need) => (
                          <div key={need} className="flex items-center space-x-2">
                            <Checkbox
                              id={need}
                              checked={selectedSpecialNeeds.includes(need)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSpecialNeeds([...selectedSpecialNeeds, need]);
                                } else {
                                  setSelectedSpecialNeeds(selectedSpecialNeeds.filter(n => n !== need));
                                }
                              }}
                            />
                            <label htmlFor={need} className="text-sm text-gray-700">{need}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="academic-excellence"
                        checked={academicExcellence}
                        onCheckedChange={setAcademicExcellence}
                      />
                      <label htmlFor="academic-excellence" className="text-sm font-medium text-gray-700">
                        Show candidates with strong academic performance
                      </label>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              {/* 6. Screening Tags */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">🧩 Screening Tags</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Add Screening Criteria</label>
                  <div className="flex flex-wrap gap-2">
                    {screeningTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedScreeningTags.includes(tag) ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleMultiSelect(tag, selectedScreeningTags, setSelectedScreeningTags)}
                      >
                        {tag}
                        {selectedScreeningTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience and Score Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Years of Experience: {experienceRange[0]}+ years
                  </label>
                  <Slider
                    value={experienceRange}
                    onValueChange={setExperienceRange}
                    max={15}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Minimum Score: {scoreRange[0]}%
                  </label>
                  <Slider
                    value={scoreRange}
                    onValueChange={setScoreRange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t">
                <Button variant="outline" onClick={resetAllFilters}>
                  Reset All Filters
                </Button>
                <div className="flex gap-2">
                  <Button className="bg-accent hover:bg-accent/90">
                    Apply Filters ({filteredCandidates.length})
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {renderCurrentView()}

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your filters.</p>
          </div>
        )}

        <CandidateDetailModal
          candidate={selectedCandidate}
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          isFavorite={selectedCandidate ? favorites.has(selectedCandidate.id) : false}
          onToggleFavorite={() => selectedCandidate && toggleFavorite(selectedCandidate.id)}
          onExpandProfile={() => selectedCandidate && handleExpandProfile(selectedCandidate)}
        />

        <ExpandedCandidateModal
          candidate={expandedCandidate}
          isOpen={!!expandedCandidate}
          onClose={() => setExpandedCandidate(null)}
          isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false}
          onToggleFavorite={() => expandedCandidate && toggleFavorite(expandedCandidate.id)}
        />
      </div>
    </DashboardLayout>
  );
};

export default TalentPool;
