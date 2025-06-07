
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
  availability: string;
  setAvailability: (value: string) => void;
  languageProficiency: string;
  setLanguageProficiency: (value: string) => void;
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  educationLevel: string;
  setEducationLevel: (value: string) => void;
  selectedSpecialNeeds: string[];
  setSelectedSpecialNeeds: (value: string[]) => void;
  cvCompleteness: string;
  setCvCompleteness: (value: string) => void;
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
  availability,
  setAvailability,
  languageProficiency,
  setLanguageProficiency,
  genderFilter,
  setGenderFilter,
  educationLevel,
  setEducationLevel,
  selectedSpecialNeeds,
  setSelectedSpecialNeeds,
  cvCompleteness,
  setCvCompleteness,
  academicExcellence,
  setAcademicExcellence,
  selectedScreeningTags,
  setSelectedScreeningTags,
  resetAllFilters,
  filteredCandidatesCount
}: FilterSidebarProps) => {
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

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
          {/* Basic Search */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Interviewing">Interviewing</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
              {filteredCandidatesCount} candidates found
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

            <div className="grid grid-cols-1 gap-4">
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
              <div className="grid grid-cols-1 gap-2">
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
            <div className="grid grid-cols-1 gap-4">
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
                <div className="grid grid-cols-1 gap-4">
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
                  <div className="grid grid-cols-1 gap-2">
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
                    onCheckedChange={(checked) => setAcademicExcellence(checked === true)}
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
          <div className="grid grid-cols-1 gap-6 p-4 bg-gray-50 rounded-lg">
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
          <div className="flex justify-between items-center pt-4 border-t sticky bottom-0 bg-white pb-4">
            <Button variant="outline" onClick={resetAllFilters}>
              Reset All Filters
            </Button>
            <div className="flex gap-2">
              <Button className="bg-accent hover:bg-accent/90" onClick={onClose}>
                Apply Filters ({filteredCandidatesCount})
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
