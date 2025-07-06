import { DashboardLayout } from '@/components/DashboardLayout';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Plus, Filter, MoreVertical, FileText, Users, Calendar, Award, UserCheck, UserX, UserMinus, Star, Info, Tag } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useMemo } from 'react';
import { FunnelFilters } from '@/components/FunnelFilters';

interface Candidate {
  id: number;
  firstName: string;
  lastName:string;
  flag: string;
  score: number;
  profilePhoto?: string;
  isLocked: boolean;
  tags?: string[];
  skillScores: {
    accounting: number;
    negotiation: number;
    communication: number;
    timeManagement: number;
    cultureFit: number;
  };
  detailedStatus: {
    text: string;
    color: 'green' | 'red' | 'yellow' | 'gray' | 'blue';
  };
  // Additional properties for filtering
  jobId: string;
  location?: string;
  experience?: number;
  status?: string;
  skills?: string;
  subfields?: string[];
  software?: string[];
  certifications?: string[];
  industries?: string[];
  visaStatus?: string;
  employmentType?: string;
  workMode?: string;
  languageProficiency?: string;
  gender?: string;
  educationLevel?: string;
}

interface Stage {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  candidates: Candidate[];
}

const RecruitmentBoard = () => {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(new Set());
  const [selectedJob, setSelectedJob] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const jobTitles: { [key: string]: string } = {
    'financial-analyst': 'Financial Analyst',
    'senior-accountant': 'Senior Accountant',
    'investment-manager': 'Investment Manager',
  };

  // Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('all');
  const [scoreRange, setScoreRange] = useState([0]);
  const [assessmentScoreRange, setAssessmentScoreRange] = useState([0]);
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
  const [hiringStageFilter, setHiringStageFilter] = useState<string[]>([]);

  // Simplified funnel tracker data
  const trackerStages = [
    { id: 'new', name: 'New Applicants', count: 24, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'shortlisted', name: 'Shortlisted', count: 8, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'interviewing', name: 'Interviewing', count: 5, icon: Calendar, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'offered', name: 'Offered', count: 2, icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'hired', name: 'Hired', count: 1, icon: UserCheck, color: 'text-green-600', bgColor: 'bg-green-50' },
  ];

  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'new',
      title: 'New Applicants',
      color: 'border-blue-200',
      bgColor: 'bg-blue-50/30',
      candidates: [
        { 
          id: 1, 
          firstName: 'Lupita', 
          lastName: 'Johnson', 
          flag: '🇺🇸', 
          score: 74, 
          isLocked: false,
          tags: ['Recommended', 'High Potential'],
          jobId: 'financial-analyst',
          location: 'United Arab Emirates (UAE)',
          experience: 5,
          status: 'Available',
          skills: 'Mid-Level',
          skillScores: { accounting: 71, negotiation: 64, communication: 78, timeManagement: 76, cultureFit: 82 },
          detailedStatus: { text: 'Assessed', color: 'green' },
        },
        { 
          id: 2, 
          firstName: 'Emma', 
          lastName: 'Lopez', 
          flag: '🇪🇬', 
          score: 40, 
          isLocked: true,
          tags: ['Flagged'],
          jobId: 'financial-analyst',
          location: 'Egypt',
          experience: 3,
          status: 'Interviewing',
          skills: 'Entry-Level',
          skillScores: { accounting: 30, negotiation: 26, communication: 27, timeManagement: 34, cultureFit: 82 },
          detailedStatus: { text: 'Assessed', color: 'green' },
        },
      ]
    },
    {
      id: 'shortlisted',
      title: 'Shortlisted',
      color: 'border-purple-200',
      bgColor: 'bg-purple-50/30',
      candidates: [
        { 
          id: 5, 
          firstName: 'Timothee', 
          lastName: 'Kaluuya', 
          flag: '🇱🇧', 
          score: 0, 
          isLocked: false,
          tags: ['Strong Candidate'],
          jobId: 'investment-manager',
          location: 'United Arab Emirates (UAE)',
          experience: 6,
          status: 'Shortlisted',
          skills: 'Senior-Level',
          skillScores: { accounting: 0, negotiation: 0, communication: 0, timeManagement: 0, cultureFit: 82 },
          detailedStatus: { text: 'Assessed', color: 'green' },
        },
        {
          id: 6,
          firstName: 'candidate18accountmanager',
          lastName: '',
          flag: '🇶🇦',
          score: 0,
          isLocked: true,
          tags: ['Rejected', 'Not a Fit'],
          jobId: 'senior-accountant',
          location: 'Qatar',
          experience: 2,
          status: 'Available',
          skills: 'Entry-Level',
          skillScores: { accounting: 0, negotiation: 0, communication: 0, timeManagement: 0, cultureFit: 0 },
          detailedStatus: { text: 'Invited', color: 'yellow' },
        },
      ]
    },
    {
      id: 'interviewing',
      title: 'Interviewing',
      color: 'border-orange-200',
      bgColor: 'bg-orange-50/30',
      candidates: [
        {
          id: 7,
          firstName: 'Charlotte',
          lastName: 'Cotillard',
          flag: '🇯🇴',
          score: 0,
          isLocked: false,
          tags: ['Interview Scheduled'],
          jobId: 'investment-manager',
          location: 'Jordan',
          experience: 8,
          status: 'Available',
          skills: 'Executive-Level',
          skillScores: { accounting: 29, negotiation: 24, communication: 25, timeManagement: 33, cultureFit: 82 },
          detailedStatus: { text: 'Assessed', color: 'green' },
        },
      ]
    },
    {
      id: 'offered',
      title: 'Offered',
      color: 'border-yellow-200',
      bgColor: 'bg-yellow-50/30',
      candidates: [
        {
          id: 8,
          firstName: 'Mia',
          lastName: 'Williams',
          flag: '🇴🇲',
          score: 0,
          isLocked: false,
          tags: ['Offer Extended'],
          jobId: 'financial-analyst',
          location: 'Oman',
          experience: 5,
          status: 'Available',
          skills: 'Mid-Level',
          skillScores: { accounting: 46, negotiation: 34, communication: 74, timeManagement: 63, cultureFit: 82 },
          detailedStatus: { text: 'Assessed', color: 'green' },
        },
      ]
    },
    {
      id: 'hired',
      title: 'Hired',
      color: 'border-green-200',
      bgColor: 'bg-green-50/30',
      candidates: []
    }
  ]);

  const hiringStages = useMemo(() => stages.map(s => s.title), [stages]);

  const calculateAssessmentScore = (skillScores: Candidate['skillScores']) => {
    const scores = Object.values(skillScores);
    const validScores = scores.filter(s => s > 0);
    if (validScores.length === 0) return 0;
    const sum = validScores.reduce((a, b) => a + b, 0);
    return Math.round(sum / validScores.length);
  };

  const allCandidatesFromStages = useMemo(() => {
    return stages.flatMap(stage =>
      stage.candidates.map(candidate => ({
        ...candidate,
        hiringStage: stage.title,
      }))
    );
  }, [stages]);

  const allFilteredCandidates = useMemo(() => {
    return allCandidatesFromStages.filter(candidate => {
      // Search query filter
      if (searchQuery && !`${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'all' && candidate.location !== locationFilter) {
        return false;
      }

      // Experience filter
      if (candidate.experience !== undefined && candidate.experience < experienceRange[0]) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && candidate.status !== statusFilter) {
        return false;
      }

      // Skills/Career level filter
      if (skillsFilter !== 'all' && candidate.skills !== skillsFilter) {
        return false;
      }

      // Score filter
      if (candidate.score < scoreRange[0]) {
        return false;
      }

      // Assessment score filter
      const assessmentScore = calculateAssessmentScore(candidate.skillScores);
      if (assessmentScore < assessmentScoreRange[0]) {
        return false;
      }

      // Job Post filter
      if (selectedJob !== 'all' && candidate.jobId !== selectedJob) {
        return false;
      }

      // Hiring stage filter
      if (hiringStageFilter.length > 0 && !hiringStageFilter.includes(candidate.hiringStage)) {
        return false;
      }

      // Subfields filter
      if (selectedSubfields.length > 0 && !selectedSubfields.some(subfield =>
        candidate.subfields?.includes(subfield))) {
        return false;
      }

      // Software filter
      if (selectedSoftware.length > 0 && !selectedSoftware.some(software =>
        candidate.software?.includes(software))) {
        return false;
      }

      // Certifications filter
      if (selectedCertifications.length > 0 && !selectedCertifications.some(cert =>
        candidate.certifications?.includes(cert))) {
        return false;
      }

      // Industries filter
      if (selectedIndustries.length > 0 && !selectedIndustries.some(industry =>
        candidate.industries?.includes(industry))) {
        return false;
      }

      // Visa status filter
      if (selectedVisaStatus.length > 0 && !selectedVisaStatus.includes(candidate.visaStatus || '')) {
        return false;
      }

      return true;
    });
  }, [
    allCandidatesFromStages,
    searchQuery,
    locationFilter,
    experienceRange,
    statusFilter,
    skillsFilter,
    scoreRange,
    assessmentScoreRange,
    selectedJob,
    hiringStageFilter,
    selectedSubfields,
    selectedSoftware,
    selectedCertifications,
    selectedIndustries,
    selectedVisaStatus
  ]);

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
        setSelectedCandidates(new Set(allFilteredCandidates.map(c => c.id)));
    } else {
        setSelectedCandidates(new Set());
    }
  };

  const handleSelectOne = (candidateId: number, checked: boolean) => {
      const newSelected = new Set(selectedCandidates);
      if(checked) {
          newSelected.add(candidateId);
      } else {
          newSelected.delete(candidateId);
      }
      setSelectedCandidates(newSelected);
  };
  
  const filteredCandidatesCount = allFilteredCandidates.length;

  const resetAllFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setExperienceRange([0]);
    setStatusFilter('all');
    setSkillsFilter('all');
    setScoreRange([0]);
    setAssessmentScoreRange([0]);
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
    setHiringStageFilter([]);
  };

  const resetFunnelFilters = () => {
    setSelectedJob('all');
    setScoreRange([0]);
    setAssessmentScoreRange([0]);
    setHiringStageFilter([]);
  };

  const getTagColor = (tag: string) => {
    const colors: { [key: string]: string } = {
      'Recommended': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Flagged': 'bg-orange-100 text-orange-800',
      'High Potential': 'bg-blue-100 text-blue-800',
      'Strong Candidate': 'bg-purple-100 text-purple-800',
      'Interview Scheduled': 'bg-yellow-100 text-yellow-800',
      'Offer Extended': 'bg-indigo-100 text-indigo-800',
      'Not a Fit': 'bg-gray-100 text-gray-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  const HiringStageBadge = ({ stageTitle }: { stageTitle: string }) => {
    let className = 'text-xs font-semibold h-auto py-1 px-2 border';
    let text = stageTitle.toUpperCase();

    switch (stageTitle) {
      case 'Hired':
        className += ' bg-teal-500 text-white border-teal-500';
        break;
      case 'Offered':
        className += ' bg-yellow-500 text-white border-yellow-500';
        break;
      case 'Interviewing':
        className += ' bg-orange-500 text-white border-orange-500';
        break;
      case 'Shortlisted':
        className += ' bg-purple-500 text-white border-purple-500';
        break;
      default:
        className += ' bg-blue-500 text-white border-blue-500';
        text = 'NEW APPLICANT';
    }
    
    return (
        <Badge variant="outline" className={className}>
            {text}
        </Badge>
    );
  };

  const handleStageChange = (candidateId: number, newStageId: string) => {
    setStages(prevStages => {
      const nextStages = prevStages.map(stage => ({ ...stage, candidates: [...stage.candidates] }));
      let candidateToMove: Candidate | undefined;

      for (const stage of nextStages) {
        const candidateIndex = stage.candidates.findIndex(c => c.id === candidateId);
        if (candidateIndex !== -1) {
          [candidateToMove] = stage.candidates.splice(candidateIndex, 1);
          break;
        }
      }

      if (candidateToMove) {
        const toStage = nextStages.find(stage => stage.id === newStageId);
        toStage?.candidates.push(candidateToMove);
      }

      return nextStages;
    });
  };

  const isAllSelected = selectedCandidates.size > 0 && selectedCandidates.size === allFilteredCandidates.length;
  const isIndeterminate = selectedCandidates.size > 0 && selectedCandidates.size < allFilteredCandidates.length;

  return (
    <DashboardLayout>
      <TooltipProvider>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recruitment Funnel</h1>
              <p className="text-gray-600">Nestira Finance - Manage your hiring pipeline</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedJob} onValueChange={setSelectedJob}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial-analyst">Financial Analyst</SelectItem>
                  <SelectItem value="senior-accountant">Senior Accountant</SelectItem>
                  <SelectItem value="investment-manager">Investment Manager</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFilterOpen(true)}>
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button className="bg-accent hover:bg-accent/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Candidate
              </Button>
            </div>
          </div>

          {/* Simplified Funnel Tracker - 5 Stages */}
          <Card className="p-4">
            <div className="grid grid-cols-5 gap-4">
              {trackerStages.map((stage) => {
                const IconComponent = stage.icon;
                return (
                  <div key={stage.id} className={`${stage.bgColor} rounded-lg p-4 text-center`}>
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${stage.color}`} />
                    <p className="text-sm font-medium text-gray-700">{stage.name}</p>
                    <p className={`text-2xl font-bold ${stage.color}`}>{stage.count}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Funnel Filters */}
          <FunnelFilters
            jobTitles={jobTitles}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            scoreRange={scoreRange}
            setScoreRange={setScoreRange}
            assessmentScoreRange={assessmentScoreRange}
            setAssessmentScoreRange={setAssessmentScoreRange}
            hiringStages={hiringStages}
            hiringStageFilter={hiringStageFilter}
            setHiringStageFilter={setHiringStageFilter}
            resetFunnelFilters={resetFunnelFilters}
          />

          {/* Recruitment Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="w-[50px] px-4">
                        <Checkbox
                          checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          % Nestira Insight Score
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Overall score based on Nestira's proprietary insights.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          % Assessment Score
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Average score from skill assessments.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableHead>
                      <TableHead>Hiring stage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allFilteredCandidates.map(candidate => {
                      const currentStage = stages.find(s => s.title === candidate.hiringStage);
                      const currentStageId = currentStage ? currentStage.id : '';
                      const assessmentScore = calculateAssessmentScore(candidate.skillScores);

                      return (
                      <TableRow key={candidate.id} data-state={selectedCandidates.has(candidate.id) ? "selected" : ""}>
                        <TableCell className="px-4">
                          <Checkbox
                            checked={selectedCandidates.has(candidate.id)}
                            onCheckedChange={(checked) => handleSelectOne(candidate.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={candidate.profilePhoto} />
                              <AvatarFallback>{candidate.firstName[0]}{candidate.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium whitespace-nowrap">{candidate.firstName} {candidate.lastName}</span>
                              <p className="text-sm text-muted-foreground">{jobTitles[candidate.jobId]}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {candidate.tags?.map((tag, index) => (
                              <Badge key={index} className={`text-xs ${getTagColor(tag)}`}>
                                {tag}
                              </Badge>
                            )) || '-'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="link" className="font-semibold p-0 h-auto text-blue-600 hover:text-blue-800">
                                {candidate.score > 0 ? `${candidate.score}%` : '-'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">Nestira Insight Score</h4>
                                <p className="text-sm text-muted-foreground">
                                  This score is calculated based on our proprietary model, considering various factors for job success.
                                </p>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>
                           <Popover>
                            <PopoverTrigger asChild>
                               <Button variant="link" className="font-semibold p-0 h-auto text-blue-600 hover:text-blue-800">
                                  {assessmentScore > 0 ? `${assessmentScore}%` : '-'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="font-medium leading-none">Assessment Score Breakdown</h4>
                                  <p className="text-sm text-muted-foreground">
                                    This is the average of the individual skill scores.
                                  </p>
                                </div>
                                <ul className="list-disc pl-5 mt-4 space-y-1 text-sm">
                                  <li>Accounting: {candidate.skillScores.accounting}%</li>
                                  <li>Negotiation: {candidate.skillScores.negotiation}%</li>
                                  <li>Communication: {candidate.skillScores.communication}%</li>
                                  <li>Time Management: {candidate.skillScores.timeManagement}%</li>
                                  <li>Culture Fit: {candidate.skillScores.cultureFit}%</li>
                                </ul>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={currentStageId}
                            onValueChange={(newStageId) => handleStageChange(candidate.id, newStageId)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {stages.map(stage => (
                                <SelectItem key={stage.id} value={stage.id}>
                                  {stage.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                           <div className="flex items-center gap-2 text-sm">
                              <span className={`w-2 h-2 rounded-full bg-${candidate.detailedStatus.color}-500`}></span>
                              <span className="whitespace-nowrap">{candidate.detailedStatus.text}</span>
                           </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View profile</DropdownMenuItem>
                              <DropdownMenuItem>Add tag</DropdownMenuItem>
                              <DropdownMenuItem>Move to stage</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Mark as rejected</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
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
            hiringStages={hiringStages}
            hiringStageFilter={hiringStageFilter}
            setHiringStageFilter={setHiringStageFilter}
            jobTitles={jobTitles}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
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
            filteredCandidatesCount={filteredCandidatesCount}
          />
        </div>
      </TooltipProvider>
    </DashboardLayout>
  );
};

export default RecruitmentBoard;
