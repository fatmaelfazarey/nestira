import { useState } from 'react';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Search, ChevronDown, X, Filter } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  location: string;
  experience: number;
  status: string;
  skills: string;
  score: number;
  subfield: string;
  software: string;
  erpVersion: string;
  certifications: string[];
  industry: string;
  visaStatus: string;
  employmentType: string;
  workMode: string;
  availability: string;
  languageProficiency: string;
  gender: string;
  educationLevel: string;
  specialNeeds: string[];
  cvCompleteness: string;
  academicExcellence: boolean;
  screeningTags: string[];
}

export default function TalentPool() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
  const [languageProficiency, setLanguageProficiency] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [educationLevel, setEducationLevel] = useState('all');
  const [selectedSpecialNeeds, setSelectedSpecialNeeds] = useState<string[]>([]);
  const [academicExcellence, setAcademicExcellence] = useState(false);
  const [selectedScreeningTags, setSelectedScreeningTags] = useState<string[]>([]);

  const mockCandidates: Candidate[] = [
    {
      id: 1,
      name: 'John Doe',
      location: 'United Arab Emirates',
      experience: 5,
      status: 'Available',
      skills: 'Accounting',
      score: 85,
      subfield: 'Audit',
      software: 'Excel (Advanced)',
      erpVersion: 'SAP FICO v4',
      certifications: ['CPA'],
      industry: 'Oil & Gas',
      visaStatus: 'Citizen',
      employmentType: 'Full-time',
      workMode: 'Onsite',
      availability: 'Immediate',
      languageProficiency: 'Bilingual',
      gender: 'No Preference',
      educationLevel: 'Bachelor\'s',
      specialNeeds: [],
      cvCompleteness: 'More than 80%',
      academicExcellence: true,
      screeningTags: ['Background Check', 'Work Experience'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: 'Saudi Arabia',
      experience: 8,
      status: 'Interviewing',
      skills: 'Financial Analysis',
      score: 92,
      subfield: 'FP&A',
      software: 'Power BI',
      erpVersion: 'Oracle Fusion',
      certifications: ['CMA'],
      industry: 'Tech',
      visaStatus: 'Residency Visa (Transferable)',
      employmentType: 'Full-time',
      workMode: 'Hybrid',
      availability: '1-2 weeks',
      languageProficiency: 'English',
      gender: 'Female Preferred',
      educationLevel: 'Master\'s',
      specialNeeds: [],
      cvCompleteness: 'More than 60%',
      academicExcellence: false,
      screeningTags: ['Urgent Hiring', 'Language Fit'],
    },
    {
      id: 3,
      name: 'Alice Johnson',
      location: 'Egypt',
      experience: 3,
      status: 'Shortlisted',
      skills: 'Tax Accounting',
      score: 78,
      subfield: 'Tax',
      software: 'Tableau',
      erpVersion: 'NetSuite',
      certifications: ['ACCA'],
      industry: 'Manufacturing',
      visaStatus: 'Residency Visa (Non-Transferable)',
      employmentType: 'Contract',
      workMode: 'Remote',
      availability: 'Immediate',
      languageProficiency: 'Arabic',
      gender: 'No Preference',
      educationLevel: 'Diploma',
      specialNeeds: [],
      cvCompleteness: 'More than 40%',
      academicExcellence: true,
      screeningTags: ['Visa Status', 'Custom Question'],
    },
  ];

  const filteredCandidates = mockCandidates.filter(candidate => {
    const locationMatch = locationFilter === 'all' || candidate.location === locationFilter;
    const experienceMatch = candidate.experience >= experienceRange[0];
    const statusMatch = statusFilter === 'all' || candidate.status === statusFilter;
    const skillsMatch = skillsFilter === 'all' || candidate.skills.toLowerCase().includes(skillsFilter.toLowerCase());
    const scoreMatch = candidate.score >= scoreRange[0];
    const subfieldMatch = selectedSubfields.length === 0 || selectedSubfields.includes(candidate.subfield);
    const softwareMatch = selectedSoftware.length === 0 || selectedSoftware.includes(candidate.software);
    const erpVersionMatch = erpVersion === 'all' || candidate.erpVersion === erpVersion;
    const certificationsMatch = selectedCertifications.length === 0 || candidate.certifications.some(cert => selectedCertifications.includes(cert));
    const industriesMatch = selectedIndustries.length === 0 || candidate.industry === selectedIndustries.join(', ');
    const visaStatusMatch = selectedVisaStatus.length === 0 || selectedVisaStatus.includes(candidate.visaStatus);
    const employmentTypeMatch = employmentType === 'all' || candidate.employmentType === employmentType;
    const workModeMatch = workMode === 'all' || candidate.workMode === workMode;
    const languageProficiencyMatch = languageProficiency === 'all' || candidate.languageProficiency === languageProficiency;
    const genderMatch = genderFilter === 'all' || candidate.gender === genderFilter;
    const educationLevelMatch = educationLevel === 'all' || candidate.educationLevel === educationLevel;
    const specialNeedsMatch = selectedSpecialNeeds.length === 0 || candidate.specialNeeds.some(need => selectedSpecialNeeds.includes(need));
    const academicExcellenceMatch = !academicExcellence || candidate.academicExcellence === academicExcellence;
    const screeningTagsMatch = selectedScreeningTags.length === 0 || candidate.screeningTags.some(tag => selectedScreeningTags.includes(tag));
    const searchMatch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      locationMatch &&
      experienceMatch &&
      statusMatch &&
      skillsMatch &&
      scoreMatch &&
      subfieldMatch &&
      softwareMatch &&
      erpVersionMatch &&
      certificationsMatch &&
      industriesMatch &&
      visaStatusMatch &&
      employmentTypeMatch &&
      workModeMatch &&
      languageProficiencyMatch &&
      genderMatch &&
      educationLevelMatch &&
      specialNeedsMatch &&
      academicExcellenceMatch &&
      screeningTagsMatch &&
      searchMatch
    );
  });

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
    setLanguageProficiency('all');
    setGenderFilter('all');
    setEducationLevel('all');
    setSelectedSpecialNeeds([]);
    setAcademicExcellence(false);
    setSelectedScreeningTags([]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Talent Pool</h1>

          {/* Search and Filters Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button onClick={() => setIsFilterOpen(true)} className="bg-accent hover:bg-accent/90">
              <Filter className="w-4 h-4 mr-2" />
              Open Filters
            </Button>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map(candidate => (
              <Card key={candidate.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{candidate.name}</CardTitle>
                  <CardDescription className="text-gray-500">{candidate.skills}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-gray-700">Location: {candidate.location}</p>
                  <p className="text-gray-700">Experience: {candidate.experience} years</p>
                  <p className="text-gray-700">Status: {candidate.status}</p>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-700">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

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
          languageProficiency={languageProficiency}
          setLanguageProficiency={setLanguageProficiency}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          educationLevel={educationLevel}
          setEducationLevel={setEducationLevel}
          selectedSpecialNeeds={selectedSpecialNeeds}
          setSelectedSpecialNeeds={setSelectedSpecialNeeds}
          academicExcellence={academicExcellence}
          setAcademicExcellence={setAcademicExcellence}
          selectedScreeningTags={selectedScreeningTags}
          setSelectedScreeningTags={setSelectedScreeningTags}
          resetAllFilters={resetAllFilters}
          filteredCandidatesCount={filteredCandidates.length}
        />

    </div>
  );
}
