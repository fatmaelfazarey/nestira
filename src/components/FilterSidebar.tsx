
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Search, ChevronDown, X, Filter } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  experienceRange: number[];
  setExperienceRange: (value: number[]) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  skillsFilter: string;
  setSkillsFilter: (value: string) => void;
  scoreRange: number[];
  setScoreRange: (value: number[]) => void;
  selectedSubfields: string[];
  setSelectedSubfields: (value: string[]) => void;
  selectedSoftware: string[];
  setSelectedSoftware: (value: string[]) => void;
  erpVersion: string;
  setErpVersion: (value: string) => void;
  selectedCertifications: string[];
  setSelectedCertifications: (value: string[]) => void;
  selectedIndustries: string[];
  setSelectedIndustries: (value: string[]) => void;
  selectedVisaStatus: string[];
  setSelectedVisaStatus: (value: string[]) => void;
  employmentType: string;
  setEmploymentType: (value: string) => void;
  workMode: string;
  setWorkMode: (value: string) => void;
  languageProficiency: string;
  setLanguageProficiency: (value: string) => void;
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  educationLevel: string;
  setEducationLevel: (value: string) => void;
  selectedSpecialNeeds: string[];
  setSelectedSpecialNeeds: (value: string[]) => void;
  academicExcellence: boolean;
  setAcademicExcellence: (value: boolean) => void;
  selectedScreeningTags: string[];
  setSelectedScreeningTags: (value: string[]) => void;
  resetAllFilters: () => void;
  filteredCandidatesCount: number;
}

export const FilterSidebar = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  experienceRange,
  setExperienceRange,
  statusFilter,
  setStatusFilter,
  skillsFilter,
  setSkillsFilter,
  scoreRange,
  setScoreRange,
  selectedSubfields,
  setSelectedSubfields,
  selectedSoftware,
  setSelectedSoftware,
  erpVersion,
  setErpVersion,
  selectedCertifications,
  setSelectedCertifications,
  selectedIndustries,
  setSelectedIndustries,
  selectedVisaStatus,
  setSelectedVisaStatus,
  employmentType,
  setEmploymentType,
  workMode,
  setWorkMode,
  languageProficiency,
  setLanguageProficiency,
  genderFilter,
  setGenderFilter,
  educationLevel,
  setEducationLevel,
  selectedSpecialNeeds,
  setSelectedSpecialNeeds,
  academicExcellence,
  setAcademicExcellence,
  selectedScreeningTags,
  setSelectedScreeningTags,
  resetAllFilters,
  filteredCandidatesCount
}: FilterSidebarProps) => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  // Updated filter options
  const countries = [
    "United Arab Emirates",
    "Saudi Arabia",
    "Egypt",
    "Kuwait",
    "Qatar",
    "Bahrain",
    "Oman",
    "Jordan",
    "Lebanon",
    "Morocco",
    "Tunisia",
    "Algeria",
    "Iraq",
    "Sudan"
  ];

  const careerLevels = [
    "Mid-Level",
    "Executive-Level", 
    "C-Suite / Top-Level Management",
    "Entry-Level",
    "Senior-Level"
  ];

  const statusOptions = [
    "Available",
    "Interviewing", 
    "Shortlisted"
  ];

  const financeSubfields = ["Audit", "Tax", "FP&A", "Treasury", "Fintech", "General Ledger (GL)", "Accounts Payable (AP)", "Accounts Receivable (AR)"];
  const softwareTools = ["Excel (Advanced)", "Power BI", "Tableau"];
  const erpVersions = ["SAP FICO v4", "SAP FICO v6", "Oracle Fusion", "NetSuite"];
  const certifications = ["CMA", "CPA", "ACCA", "SOCPA", "CIA", "DipIFR", "MBA"];
  const industries = ["Oil & Gas", "NGOs", "Manufacturing", "Tech", "Real Estate", "Retail"];
  const visaStatuses = ["Citizen", "Residency Visa (Transferable)", "Residency Visa (Non-Transferable)", "Visit Visa", "No Visa"];
  const employmentTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];
  const workModes = ["Onsite", "Hybrid", "Remote"];
  const languages = ["Arabic", "English", "Bilingual"];
  const genderOptions = ["No Preference", "Males Only", "Females Only", "Male Preferred", "Female Preferred"];
  const educationLevels = ["High School", "Diploma", "Bachelor's", "Master's", "MBA", "Doctorate"];
  const specialNeeds = ["Cognitive Disabilities", "Physical Disabilities", "Hearing Disabilities", "Mobility Disabilities", "Learning Disability", "Communication Impairment"];
  const screeningTags = ["Background Check", "Urgent Hiring", "Remote Ready", "Work Experience", "Language Fit", "Visa Status", "Custom Question", "Work Authorization"];

  // Helper functions for multi-select
  const toggleMultiSelect = (item: string, selectedItems: string[], setSelectedItems: (value: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[500px] sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Candidates
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Quick Search & Basic Filters */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-background">
            <h3 className="font-semibold text-foreground mb-3">🔍 Quick Search</h3>
            
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Country</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Career Level</label>
                <Select value={skillsFilter} onValueChange={setSkillsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Career Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Career Levels</SelectItem>
                    {careerLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-lg">
              {filteredCandidatesCount} candidates found
            </div>
          </div>

          {/* Experience and Score Range */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-background">
            <h3 className="font-semibold text-foreground mb-3">📊 Experience & Score</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
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
                <label className="text-sm font-medium text-foreground">
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
          </div>

          {/* Skills & Expertise */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-background">
            <h3 className="font-semibold text-foreground mb-3">💼 Skills & Expertise</h3>
            
            {/* Finance Subfields */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Finance Subfields</label>
              <div className="flex flex-wrap gap-2">
                {financeSubfields.map((subfield) => (
                  <Badge
                    key={subfield}
                    variant={selectedSubfields.includes(subfield) ? "default" : "outline"}
                    className="cursor-pointer text-xs hover:bg-accent"
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
              <label className="text-sm font-medium text-foreground">Software & Tools</label>
              <div className="flex flex-wrap gap-2">
                {softwareTools.map((tool) => (
                  <Badge
                    key={tool}
                    variant={selectedSoftware.includes(tool) ? "default" : "outline"}
                    className="cursor-pointer text-xs hover:bg-accent"
                    onClick={() => toggleMultiSelect(tool, selectedSoftware, setSelectedSoftware)}
                  >
                    {tool}
                    {selectedSoftware.includes(tool) && <X className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Certifications</label>
              <div className="flex flex-wrap gap-1">
                {certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant={selectedCertifications.includes(cert) ? "default" : "outline"}
                    className="cursor-pointer text-xs hover:bg-accent"
                    onClick={() => toggleMultiSelect(cert, selectedCertifications, setSelectedCertifications)}
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Work Preferences */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-background">
            <h3 className="font-semibold text-foreground mb-3">🏢 Work Preferences</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Employment Type</label>
                <Select value={employmentType} onValueChange={setEmploymentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
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
                <label className="text-sm font-medium text-foreground">Work Mode</label>
                <Select value={workMode} onValueChange={setWorkMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Modes" />
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
                <label className="text-sm font-medium text-foreground">Visa Status</label>
                <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
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
                      <label htmlFor={status} className="text-sm text-foreground">{status}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Industry Experience */}
          <div className="space-y-4 p-4 border border-border rounded-lg bg-background">
            <h3 className="font-semibold text-foreground mb-3">🏭 Industry Experience</h3>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? "default" : "outline"}
                  className="cursor-pointer text-xs hover:bg-accent"
                  onClick={() => toggleMultiSelect(industry, selectedIndustries, setSelectedIndustries)}
                >
                  {industry}
                  {selectedIndustries.includes(industry) && <X className="w-3 h-3 ml-1" />}
                </Badge>
              ))}
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          <Collapsible open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
            <div className="space-y-4 p-4 border border-border rounded-lg bg-background">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h3 className="font-semibold text-foreground">⚙️ Additional Filters</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${isAdvancedFiltersOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Language Proficiency</label>
                    <Select value={languageProficiency} onValueChange={setLanguageProficiency}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Languages" />
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
                    <label className="text-sm font-medium text-foreground">Education Level</label>
                    <Select value={educationLevel} onValueChange={setEducationLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="academic-excellence"
                    checked={academicExcellence}
                    onCheckedChange={(checked) => setAcademicExcellence(checked === true)}
                  />
                  <label htmlFor="academic-excellence" className="text-sm font-medium text-foreground">
                    Show candidates with strong academic performance
                  </label>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t sticky bottom-0 bg-background pb-4">
            <Button variant="outline" onClick={resetAllFilters}>
              Reset All Filters
            </Button>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary/90" onClick={onClose}>
                Apply Filters ({filteredCandidatesCount})
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
