import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Briefcase, 
  Target, 
  Settings, 
  DollarSign, 
  Brain, 
  MapPin, 
  Award, 
  Globe, 
  Users, 
  TrendingUp,
  ChevronDown,
  X,
  ArrowLeft,
  Eye,
  Plus
} from 'lucide-react';
import { JobTitleSuggestions } from './job-creation/JobTitleSuggestions';
import { SkillsSelector } from './job-creation/SkillsSelector';
import { AIJobDescriptionGenerator } from './job-creation/AIJobDescriptionGenerator';
import { JobPreviewModal } from './JobPreviewModal';

interface JobCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJobCreated?: (job: any) => void;
  existingJob?: any;
  isEditing?: boolean;
}

export function JobCreationModal({ open, onOpenChange, onJobCreated, existingJob, isEditing }: JobCreationModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobFunction, setJobFunction] = useState('');
  const [careerLevel, setCareerLevel] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [maxExperience, setMaxExperience] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [employmentType, setEmploymentType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [visaStatus, setVisaStatus] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [minScore, setMinScore] = useState('');
  const [assessmentRequired, setAssessmentRequired] = useState(false);
  const [salaryMode, setSalaryMode] = useState('negotiable');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [salaryFixed, setSalaryFixed] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScoringOpen, setIsScoringOpen] = useState(true);
  const [isCompensationOpen, setIsCompensationOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Populate form with existing job data when editing
  useEffect(() => {
    if (isEditing && existingJob) {
      setJobTitle(existingJob.title || '');
      setJobFunction(existingJob.function || '');
      setCareerLevel(existingJob.level || '');
      setIndustry(existingJob.industry || '');
      setLocation(existingJob.location || '');
      setMinExperience(existingJob.experience?.split('-')[0] || '');
      setMaxExperience(existingJob.experience?.split('-')[1]?.replace(' years', '') || '');
      setSkills(existingJob.skills || []);
      setCertifications(existingJob.certifications || []);
      setEmploymentType(existingJob.employmentType || '');
      setWorkMode(existingJob.workMode || '');
      setVisaStatus(existingJob.visaStatus || []);
      setLanguages(existingJob.languages || []);
      setDescription(existingJob.description || '');
    } else {
      // Reset form when not editing
      setJobTitle('');
      setJobFunction('');
      setCareerLevel('');
      setIndustry('');
      setLocation('');
      setMinExperience('');
      setMaxExperience('');
      setSkills([]);
      setCertifications([]);
      setEmploymentType('');
      setWorkMode('');
      setVisaStatus([]);
      setGender('');
      setLanguages([]);
      setDescription('');
    }
  }, [isEditing, existingJob, open]);

  // Auto-generate description when key fields are filled
  useEffect(() => {
    if (jobTitle && jobFunction && careerLevel && minExperience && !isEditing) {
      console.log('Triggering auto-generation for:', { jobTitle, jobFunction, careerLevel, minExperience });
      generateJobDescription();
    }
  }, [jobTitle, jobFunction, careerLevel, minExperience, isEditing]);

  const handleJobTitleChange = (title: string) => {
    setJobTitle(title);
    console.log('Job title changed to:', title);
    if (title.length > 2 && !isEditing) {
      simulateAIAutoFill(title);
    }
  };

  const simulateAIAutoFill = (title: string) => {
    console.log('Auto-filling fields for title:', title);
    setTimeout(() => {
      if (title.toLowerCase().includes('finance') || title.toLowerCase().includes('financial')) {
        setJobFunction('Finance & Accounting');
        setCareerLevel('Mid-Level');
        setIndustry('Financial Services');
        setMinExperience('3');
        setMaxExperience('7');
        setSkills(['Excel', 'Financial Modeling', 'SAP', 'Financial Analysis']);
        setCertifications(['CPA', 'CFA']);
        setLanguages(['English', 'Arabic']);
        setEmploymentType('Full-time');
        setWorkMode('Hybrid');
        setVisaStatus(['Citizen', 'Residency Visa (Transferable)']);
        setGender('both');
      }
    }, 1000);
  };

  const generateJobDescription = () => {
    console.log('Starting job description generation...');
    setIsGenerating(true);
    setTimeout(() => {
      const desc = `We are seeking a highly skilled ${jobTitle} to join our dynamic ${jobFunction} team in ${location || 'our office'}. 

The ideal candidate will have ${minExperience}-${maxExperience || minExperience} years of experience in ${jobFunction.toLowerCase()} and demonstrate expertise in the following areas:

Key Requirements:
• ${minExperience}-${maxExperience || minExperience} years of relevant experience in ${jobFunction.toLowerCase()}
• Strong proficiency in: ${skills.join(', ')}
• ${certifications.length > 0 ? `Professional certifications: ${certifications.join(', ')}` : 'Industry-relevant certifications preferred'}
• Excellent ${languages.join(' and ')} communication skills
• ${careerLevel} professional with proven track record

Responsibilities:
• Lead financial analysis and reporting initiatives
• Collaborate with cross-functional teams to drive business results
• Ensure compliance with industry regulations and standards
• Mentor junior team members and contribute to process improvements

We offer a competitive compensation package and excellent career growth opportunities in a ${workMode.toLowerCase()} work environment.`;
      
      setDescription(desc);
      setIsGenerating(false);
      console.log('Job description generated successfully');
    }, 2000);
  };

  const handleRegenerateDescription = () => {
    console.log('Regenerating job description...');
    generateJobDescription();
  };

  const handlePreviewJob = () => {
    console.log('Opening job preview...');
    setIsPreviewOpen(true);
  };

  const handleVisaStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setVisaStatus([...visaStatus, status]);
    } else {
      setVisaStatus(visaStatus.filter(s => s !== status));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setLanguages([...languages, language]);
    } else {
      setLanguages(languages.filter(l => l !== language));
    }
  };

  const handleSubmit = () => {
    console.log(isEditing ? 'Updating job...' : 'Posting job...');
    
    // Create job object
    const jobData = {
      id: isEditing ? existingJob.id : Date.now(),
      title: jobTitle,
      location: location,
      type: employmentType,
      status: isEditing ? existingJob.status : 'Active',
      applications: isEditing ? existingJob.applications : 0,
      views: isEditing ? existingJob.views : 0,
      posted: isEditing ? existingJob.posted : 'Just now',
      function: jobFunction,
      level: careerLevel,
      industry,
      experience: `${minExperience}-${maxExperience} years`,
      skills,
      certifications,
      employmentType,
      workMode,
      description,
      languages,
      visaStatus
    };

    // Call the callback
    if (onJobCreated) {
      onJobCreated(jobData);
    }

    // Close modal
    onOpenChange(false);
  };

  const getJobPreviewData = () => {
    const getSalaryText = () => {
      if (salaryMode === 'range' && salaryMin && salaryMax) {
        return `${salaryMin} - ${salaryMax}`;
      } else if (salaryMode === 'fixed' && salaryFixed) {
        return salaryFixed;
      }
      return 'Negotiable';
    };

    const getExperienceText = () => {
      if (minExperience && maxExperience) {
        return `${minExperience}-${maxExperience} years`;
      } else if (minExperience) {
        return `${minExperience}+ years`;
      }
      return '';
    };

    return {
      title: jobTitle,
      function: jobFunction,
      level: careerLevel,
      industry,
      location,
      experience: getExperienceText(),
      skills,
      certifications,
      employmentType,
      workMode,
      description,
      salary: getSalaryText(),
      languages,
      visaStatus
    };
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              <Plus className="w-6 h-6 text-accent" />
              {isEditing ? 'Edit Job Post' : 'Create New Job Post'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 mt-6">
            {/* Job Basics Section - Blue Theme */}
            <Card className="shadow-sm border-l-4 border-l-blue-500 bg-blue-50/30">
              <CardHeader className="pb-4 bg-blue-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Job Basics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle" className="flex items-center gap-2 font-medium mb-2">
                      <Target className="w-4 h-4" />
                      Job Title
                    </Label>
                    <JobTitleSuggestions value={jobTitle} onSelect={handleJobTitleChange} />
                  </div>
                  <div>
                    <Label htmlFor="jobFunction" className="flex items-center gap-2 font-medium mb-2">
                      <Settings className="w-4 h-4" />
                      Job Function
                    </Label>
                    <Select value={jobFunction} onValueChange={setJobFunction}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select function" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Finance & Accounting">Finance & Accounting</SelectItem>
                        <SelectItem value="Investment Banking">Investment Banking</SelectItem>
                        <SelectItem value="Risk Management">Risk Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="careerLevel" className="flex items-center gap-2 font-medium mb-2">
                      <TrendingUp className="w-4 h-4" />
                      Career Level
                    </Label>
                    <Select value={careerLevel} onValueChange={setCareerLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                        <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                        <SelectItem value="Senior Level">Senior Level</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="industry" className="flex items-center gap-2 font-medium mb-2">
                      <Briefcase className="w-4 h-4" />
                      Industry
                    </Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Financial Services">Financial Services</SelectItem>
                        <SelectItem value="Banking">Banking</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-2 font-medium mb-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Dubai, UAE"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience & Skills Section - Green Theme */}
            <Card className="shadow-sm border-l-4 border-l-green-500 bg-green-50/30">
              <CardHeader className="pb-4 bg-green-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-green-800">
                  <Award className="w-5 h-5 text-green-600" />
                  Experience & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-medium mb-2 block">Years of Experience</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minExperience}
                        onChange={(e) => setMinExperience(e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxExperience}
                        onChange={(e) => setMaxExperience(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <SkillsSelector
                  label="Must-have Skills"
                  skills={skills}
                  onSkillsChange={setSkills}
                  placeholder="Add required skills"
                />

                <SkillsSelector
                  label="Preferred Certifications"
                  skills={certifications}
                  onSkillsChange={setCertifications}
                  placeholder="Add certifications"
                  suggestions={['CPA', 'CFA', 'FRM', 'ACCA', 'CIA', 'CISA']}
                />
              </CardContent>
            </Card>

            {/* Work & Contract Preferences Section - Purple Theme */}
            <Card className="shadow-sm border-l-4 border-l-purple-400 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-600">
                  <Users className="w-5 h-5 text-purple-600" />
                  Work & Contract Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-medium mb-3 block">Employment Type</Label>
                    <RadioGroup value={employmentType} onValueChange={setEmploymentType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Full-time" id="full-time" />
                        <Label htmlFor="full-time">Full-Time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Part-time" id="part-time" />
                        <Label htmlFor="part-time">Part-Time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Internship" id="internship" />
                        <Label htmlFor="internship">Internship</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Project-based" id="project" />
                        <Label htmlFor="project">Project-based</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="font-medium mb-3 block">Work Mode</Label>
                    <RadioGroup value={workMode} onValueChange={setWorkMode}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="On-site" id="onsite" />
                        <Label htmlFor="onsite">On-site</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Remote" id="remote" />
                        <Label htmlFor="remote">Remote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Hybrid" id="hybrid" />
                        <Label htmlFor="hybrid">Hybrid</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Label className="font-medium mb-3 block">Visa Status</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Citizen', 'Residency Visa (Transferable)', 'Residency Visa (Non-Transferable)', 'Visit Visa', 'No Visa'].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={status}
                          checked={visaStatus.includes(status)}
                          onCheckedChange={(checked) => handleVisaStatusChange(status, checked as boolean)}
                        />
                        <Label htmlFor={status} className="text-sm">{status}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Label className="font-medium mb-3 block">Gender Preference</Label>
                  <RadioGroup value={gender} onValueChange={setGender}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <Label className="font-medium mb-3 block">Languages Required</Label>
                  <div className="flex gap-4">
                    {['Arabic', 'English', 'Bilingual'].map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={languages.includes(language)}
                          onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                        />
                        <Label htmlFor={language} className="text-sm">{language}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring & Matching Section - Orange Theme - Now Always Open */}
            <Card className="shadow-sm border-l-4 border-l-orange-500 bg-orange-50/30">
              <CardHeader className="pb-4 bg-orange-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-orange-800">
                  <Target className="w-5 h-5 text-orange-600" />
                  Scoring & Matching
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="minScore" className="font-medium mb-2 block">
                    Minimum Matching Score (%)
                  </Label>
                  <Input
                    id="minScore"
                    type="number"
                    placeholder="e.g., 75"
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="assessment"
                    checked={assessmentRequired}
                    onCheckedChange={setAssessmentRequired}
                  />
                  <Label htmlFor="assessment" className="font-medium">
                    Assessment Required?
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Compensation & Availability Section - Emerald Theme - Now Always Open */}
            <Card className="shadow-sm border-l-4 border-l-emerald-500 bg-emerald-50/30">
              <CardHeader className="pb-4 bg-emerald-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-emerald-800">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  Compensation & Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-medium mb-3 block">Salary Option</Label>
                  <RadioGroup value={salaryMode} onValueChange={setSalaryMode}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="negotiable" id="negotiable" />
                      <Label htmlFor="negotiable">Negotiable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="range" id="range" />
                      <Label htmlFor="range">Between</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed</Label>
                    </div>
                  </RadioGroup>

                  {salaryMode === 'range' && (
                    <div className="flex gap-2 items-center mt-3">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-gray-500">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  )}

                  {salaryMode === 'fixed' && (
                    <Input
                      type="number"
                      placeholder="Fixed salary"
                      value={salaryFixed}
                      onChange={(e) => setSalaryFixed(e.target.value)}
                      className="mt-3 w-48"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="noticePeriod" className="font-medium mb-2 block">
                    Notice Period
                  </Label>
                  <Select value={noticePeriod} onValueChange={setNoticePeriod}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1month">&lt;1 Month</SelectItem>
                      <SelectItem value="1-2months">1–2 Months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* AI-Generated Job Description Section - Indigo Theme */}
            <Card className="shadow-sm border-l-4 border-l-indigo-500 bg-indigo-50/30">
              <CardHeader className="pb-4 bg-indigo-50/50">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-indigo-800">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  AI-Generated Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIJobDescriptionGenerator
                  description={description}
                  onDescriptionChange={setDescription}
                  onRegenerate={handleRegenerateDescription}
                  isGenerating={isGenerating}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sticky Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 mt-8 -mx-6 -mb-6">
            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handlePreviewJob} className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview Job
                </Button>
                <Button onClick={handleSubmit} className="bg-accent hover:bg-accent/90 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {isEditing ? 'Update Job' : 'Post Job'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <JobPreviewModal 
        open={isPreviewOpen} 
        onOpenChange={setIsPreviewOpen}
        jobData={getJobPreviewData()}
      />
    </>
  );
}
