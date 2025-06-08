import { DashboardLayout } from '@/components/DashboardLayout';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Plus, Filter, MoreHorizontal, Eye, MessageSquare, ArrowRight, FileText, Users, Calendar, Award, UserCheck, UserX, UserMinus, Star } from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useMemo } from 'react';

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  flag: string;
  score: number;
  profilePhoto?: string;
  tags: string[];
  lastAction?: string;
  salaryRange?: string;
  isLocked: boolean;
  // Additional properties for filtering
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState('financial-analyst');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('all');
  const [scoreRange, setScoreRange] = useState([0]);
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Funnel tracker data
  const trackerStages = [
    { id: 'inbox', name: 'CV Inbox', count: 24, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'shortlisted', name: 'Shortlisted', count: 8, icon: Users, color: 'text-sky-600', bgColor: 'bg-sky-50' },
    { id: 'interviewed', name: 'Interviewed', count: 5, icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'offered', name: 'Offered', count: 2, icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'hired', name: 'Hired', count: 1, icon: UserCheck, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'rejected', name: 'Rejected', count: 6, icon: UserX, color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 'screened-out', name: 'Screened Out', count: 3, icon: UserMinus, color: 'text-gray-600', bgColor: 'bg-gray-50' },
    { id: 'recommended', name: 'Recommended', count: 4, icon: Star, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const [stages, setStages] = useState<Stage[]>([
    {
      id: 'new',
      title: 'New',
      color: 'border-blue-200',
      bgColor: 'bg-blue-50/30',
      candidates: [
        { 
          id: 1, 
          firstName: 'Sarah', 
          lastName: 'Johnson', 
          flag: '🇺🇸', 
          score: 92, 
          tags: ['Cover Letter'], 
          lastAction: 'Applied 2h ago', 
          isLocked: false,
          location: 'United Arab Emirates (UAE)',
          experience: 5,
          status: 'Available',
          skills: 'Mid-Level',
          subfields: ['FP&A'],
          software: ['Excel (Advanced)'],
          certifications: ['CPA'],
          industries: ['Tech'],
          visaStatus: 'Citizen'
        },
        { 
          id: 2, 
          firstName: 'Ahmed', 
          lastName: 'Hassan', 
          flag: '🇪🇬', 
          score: 88, 
          tags: ['Assessment Quiz'], 
          isLocked: true,
          location: 'Egypt',
          experience: 3,
          status: 'Interviewing',
          skills: 'Entry-Level',
          subfields: ['Audit'],
          software: ['Power BI'],
          certifications: ['ACCA'],
          industries: ['Manufacturing'],
          visaStatus: 'Residency Visa (Transferable)'
        },
      ]
    },
    {
      id: 'pre-screened',
      title: 'Pre-Screened',
      color: 'border-sky-200',
      bgColor: 'bg-sky-50/30',
      candidates: [
        { 
          id: 3, 
          firstName: 'Fatima', 
          lastName: 'Al-Zahra', 
          flag: '🇸🇦', 
          score: 90, 
          tags: ['Shortlisted'], 
          lastAction: 'Screened yesterday', 
          isLocked: false,
          location: 'Saudi Arabia',
          experience: 7,
          status: 'Shortlisted',
          skills: 'Senior-Level',
          subfields: ['Treasury'],
          software: ['Tableau'],
          certifications: ['CMA'],
          industries: ['Oil & Gas'],
          visaStatus: 'Citizen'
        },
        { 
          id: 4, 
          firstName: 'Omar', 
          lastName: 'Khan', 
          flag: '🇵🇰', 
          score: 85, 
          tags: ['Phone Screen'], 
          isLocked: true,
          location: 'Kuwait',
          experience: 4,
          status: 'Available',
          skills: 'Mid-Level',
          subfields: ['Tax'],
          software: ['Excel (Advanced)'],
          certifications: ['SOCPA'],
          industries: ['Real Estate'],
          visaStatus: 'Visit Visa'
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
          firstName: 'Layla', 
          lastName: 'Mahmoud', 
          flag: '🇱🇧', 
          score: 93, 
          tags: ['Interview Pending'], 
          lastAction: 'Shortlisted 1d ago', 
          isLocked: false,
          location: 'United Arab Emirates (UAE)',
          experience: 6,
          status: 'Shortlisted',
          skills: 'Senior-Level',
          subfields: ['Fintech'],
          software: ['Power BI'],
          certifications: ['MBA'],
          industries: ['Tech'],
          visaStatus: 'Residency Visa (Transferable)'
        },
      ]
    },
    {
      id: 'interviewing',
      title: 'Interviewing',
      color: 'border-yellow-200',
      bgColor: 'bg-yellow-50/30',
      candidates: [
        { 
          id: 6, 
          firstName: 'Sami', 
          lastName: 'Yusuf', 
          flag: '🇯🇴', 
          score: 91, 
          tags: ['In Interview'], 
          lastAction: 'Interview Scheduled', 
          isLocked: false,
          location: 'Oman',
          experience: 8,
          status: 'Interviewing',
          skills: 'Executive-Level',
          subfields: ['General Ledger (GL)'],
          software: ['Tableau'],
          certifications: ['CIA'],
          industries: ['NGOs'],
          visaStatus: 'Citizen'
        },
      ]
    },
    {
      id: 'hired',
      title: 'Hired',
      color: 'border-green-200',
      bgColor: 'bg-green-50/30',
      candidates: [
        { 
          id: 7, 
          firstName: 'Zainab', 
          lastName: 'Ali', 
          flag: '🇮🇶', 
          score: 95, 
          tags: ['Hired'], 
          lastAction: 'Offer Accepted', 
          isLocked: false,
          location: 'Bahrain',
          experience: 10,
          status: 'Available',
          skills: 'C-Suite / Top-Level Management',
          subfields: ['Accounts Payable (AP)'],
          software: ['Excel (Advanced)'],
          certifications: ['DipIFR'],
          industries: ['Retail'],
          visaStatus: 'Residency Visa (Non-Transferable)'
        },
      ]
    }
  ]);

  // Filter candidates based on selected filters
  const filteredStages = useMemo(() => {
    return stages.map(stage => ({
      ...stage,
      candidates: stage.candidates.filter(candidate => {
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
      })
    }));
  }, [stages, searchQuery, locationFilter, experienceRange, statusFilter, skillsFilter, scoreRange, 
      selectedSubfields, selectedSoftware, selectedCertifications, selectedIndustries, selectedVisaStatus]);

  // Count filtered candidates
  const filteredCandidatesCount = filteredStages.reduce((total, stage) => total + stage.candidates.length, 0);

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
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source and destination stages
    const sourceStage = stages.find(stage => 
      stage.candidates.some(candidate => candidate.id.toString() === activeId)
    );
    const destStage = stages.find(stage => stage.id === overId) || 
                     stages.find(stage => 
                       stage.candidates.some(candidate => candidate.id.toString() === overId)
                     );

    if (!sourceStage || !destStage || sourceStage.id === destStage.id) return;

    const candidate = sourceStage.candidates.find(c => c.id.toString() === activeId);
    if (!candidate) return;

    setStages(prevStages => {
      return prevStages.map(stage => {
        if (stage.id === sourceStage.id) {
          return {
            ...stage,
            candidates: stage.candidates.filter(c => c.id.toString() !== activeId)
          };
        }
        if (stage.id === destStage.id) {
          return {
            ...stage,
            candidates: [...stage.candidates, candidate]
          };
        }
        return stage;
      });
    });

    setActiveId(null);
  };

  const SortableCandidate = ({ candidate }: { candidate: Candidate }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: candidate.id.toString() });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${isDragging ? 'opacity-50' : ''}`}
      >
        <CandidateCard candidate={candidate} />
      </div>
    );
  };

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
    <Card className={`cursor-pointer hover:shadow-md transition-all duration-200 ${candidate.isLocked ? 'opacity-60' : ''}`}>
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{candidate.flag}</span>
              <span className="font-medium text-sm">
                {candidate.isLocked ? candidate.firstName : `${candidate.firstName} ${candidate.lastName}`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                {candidate.score}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem className="text-xs">
                    <Eye className="w-3 h-3 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">
                    <MessageSquare className="w-3 h-3 mr-2" />
                    Message
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">
                    <ArrowRight className="w-3 h-3 mr-2" />
                    Move
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {candidate.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
          
          {candidate.lastAction && (
            <p className="text-xs text-gray-500">{candidate.lastAction}</p>
          )}
          
          {!candidate.isLocked && candidate.salaryRange && (
            <p className="text-xs font-medium text-green-600">{candidate.salaryRange}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const DroppableStage = ({ stage }: { stage: Stage }) => {
    const {
      setNodeRef,
      isOver,
    } = useSortable({ id: stage.id });

    return (
      <div
        ref={setNodeRef}
        className={`flex-shrink-0 w-80 ${stage.bgColor} border ${stage.color} rounded-lg transition-all duration-200 ${
          isOver ? 'ring-2 ring-accent ring-opacity-50 border-accent' : ''
        }`}
      >
        <div className="p-4 border-b border-gray-200 bg-white/50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{stage.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {stage.candidates.length}
            </Badge>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="p-3 space-y-3">
            <SortableContext items={stage.candidates.map(c => c.id.toString())} strategy={verticalListSortingStrategy}>
              {stage.candidates.map((candidate) => (
                <SortableCandidate key={candidate.id} candidate={candidate} />
              ))}
            </SortableContext>
            
            <Button variant="ghost" className="w-full border border-dashed border-gray-300 text-gray-500 hover:text-gray-700 text-xs py-2">
              <Plus className="w-3 h-3 mr-2" />
              Add Candidate
            </Button>
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <DashboardLayout>
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

        {/* Funnel Tracker */}
        <Card className="p-4">
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
            {trackerStages.map((stage) => {
              const IconComponent = stage.icon;
              return (
                <div key={stage.id} className={`${stage.bgColor} rounded-lg p-3 text-center`}>
                  <IconComponent className={`w-5 h-5 mx-auto mb-1 ${stage.color}`} />
                  <p className="text-xs font-medium text-gray-700">{stage.name}</p>
                  <p className={`text-lg font-bold ${stage.color}`}>{stage.count}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recruitment Funnel */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-6">
            <SortableContext items={filteredStages.map(s => s.id)}>
              {filteredStages.map((stage) => (
                <DroppableStage key={stage.id} stage={stage} />
              ))}
            </SortableContext>
          </div>
          
          <DragOverlay>
            {activeId ? (
              <div className="rotate-3 opacity-90">
                <CandidateCard candidate={stages.flatMap(s => s.candidates).find(c => c.id.toString() === activeId)!} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

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
    </DashboardLayout>
  );
};

export default RecruitmentBoard;
