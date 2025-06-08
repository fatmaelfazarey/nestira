
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Plus, RotateCcw } from 'lucide-react';
import { JobTitleSuggestions } from './job-creation/JobTitleSuggestions';
import { SkillsSelector } from './job-creation/SkillsSelector';
import { AIJobDescriptionGenerator } from './job-creation/AIJobDescriptionGenerator';

interface JobCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobCreationModal({ open, onOpenChange }: JobCreationModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    jobFunction: '',
    careerLevel: '',
    industry: '',
    location: '',
    city: '',
    experienceMin: '',
    experienceMax: '',
    employmentType: '',
    workMode: '',
    salaryOption: 'negotiable',
    salaryMin: '',
    salaryMax: '',
    salaryFixed: '',
    noticePeriod: '',
    minMatchingScore: '',
    assessmentRequired: false,
    genderPreference: 'both',
    description: '',
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [visaStatus, setVisaStatus] = useState<string[]>([]);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleJobTitleSelect = async (title: string) => {
    setFormData(prev => ({ ...prev, title }));
    
    // Simulate AI auto-population
    setTimeout(() => {
      const aiSuggestions = getAISuggestions(title);
      setFormData(prev => ({
        ...prev,
        jobFunction: aiSuggestions.jobFunction,
        careerLevel: aiSuggestions.careerLevel,
        industry: aiSuggestions.industry,
        experienceMin: aiSuggestions.experienceMin,
        experienceMax: aiSuggestions.experienceMax,
        employmentType: aiSuggestions.employmentType,
        workMode: aiSuggestions.workMode,
      }));
      setSkills(aiSuggestions.skills);
      setCertifications(aiSuggestions.certifications);
      setLanguages(aiSuggestions.languages);
      setVisaStatus(aiSuggestions.visaStatus);
      generateJobDescription();
    }, 500);
  };

  const getAISuggestions = (title: string) => {
    // Simulate AI logic based on job title
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('finance') || titleLower.includes('financial')) {
      return {
        jobFunction: 'Finance & Accounting',
        careerLevel: 'Mid-Level',
        industry: 'Financial Services',
        experienceMin: '3',
        experienceMax: '7',
        employmentType: 'full-time',
        workMode: 'hybrid',
        skills: ['Excel', 'Financial Modeling', 'SAP', 'PowerBI'],
        certifications: ['CFA', 'ACCA', 'CPA'],
        languages: ['English', 'Arabic'],
        visaStatus: ['citizen', 'residency-transferable'],
      };
    }
    
    return {
      jobFunction: 'General',
      careerLevel: 'Entry Level',
      industry: 'Technology',
      experienceMin: '1',
      experienceMax: '3',
      employmentType: 'full-time',
      workMode: 'on-site',
      skills: ['Communication', 'Problem Solving'],
      certifications: [],
      languages: ['English'],
      visaStatus: ['citizen'],
    };
  };

  const generateJobDescription = async () => {
    setIsGeneratingDescription(true);
    
    // Simulate AI description generation
    setTimeout(() => {
      const description = `We are seeking a qualified ${formData.title} to join our ${formData.industry} team. The ideal candidate will have ${formData.experienceMin}-${formData.experienceMax} years of experience in ${formData.jobFunction}.

Key Responsibilities:
• Lead and manage key financial processes
• Develop and maintain financial models
• Collaborate with cross-functional teams
• Ensure compliance with regulatory requirements

Requirements:
• ${formData.experienceMin}-${formData.experienceMax} years of relevant experience
• Strong proficiency in ${skills.join(', ')}
• ${certifications.length > 0 ? `Professional certifications: ${certifications.join(', ')}` : ''}
• Excellent communication skills in ${languages.join(' and ')}

We offer competitive compensation, comprehensive benefits, and opportunities for professional growth.`;
      
      setFormData(prev => ({ ...prev, description }));
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const handleVisaStatusChange = (value: string, checked: boolean) => {
    setVisaStatus(prev => 
      checked 
        ? [...prev, value]
        : prev.filter(v => v !== value)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job creation data:', { 
      ...formData, 
      skills, 
      certifications, 
      languages, 
      visaStatus 
    });
    
    alert('Job posted successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            🤖 AI-Powered Job Creation
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Job Basics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-600 flex items-center gap-2">
              🟧 Job Basics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Job Title *</Label>
                <JobTitleSuggestions
                  value={formData.title}
                  onSelect={handleJobTitleSelect}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Job Function</Label>
                <Select value={formData.jobFunction} onValueChange={(value) => handleInputChange('jobFunction', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-filled by AI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Finance & Accounting">Finance & Accounting</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Career Level</Label>
                <Select value={formData.careerLevel} onValueChange={(value) => handleInputChange('careerLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-filled by AI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level">Entry Level</SelectItem>
                    <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                    <SelectItem value="Senior Level">Senior Level</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-filled by AI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financial Services">Financial Services</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (Country)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. UAE"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="e.g. Dubai"
                />
              </div>
            </div>
          </div>

          {/* Experience & Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              🟦 Experience & Skills
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Years of Experience (Min)</Label>
                <Input
                  type="number"
                  value={formData.experienceMin}
                  onChange={(e) => handleInputChange('experienceMin', e.target.value)}
                  placeholder="Auto-filled by AI"
                />
              </div>

              <div className="space-y-2">
                <Label>Years of Experience (Max)</Label>
                <Input
                  type="number"
                  value={formData.experienceMax}
                  onChange={(e) => handleInputChange('experienceMax', e.target.value)}
                  placeholder="Auto-filled by AI"
                />
              </div>
            </div>

            <SkillsSelector
              label="Mandatory Skills"
              skills={skills}
              onSkillsChange={setSkills}
              placeholder="Auto-populated by AI"
            />

            <SkillsSelector
              label="Preferred Certifications"
              skills={certifications}
              onSkillsChange={setCertifications}
              placeholder="Auto-populated by AI"
            />
          </div>

          {/* Work & Contract Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-600 flex items-center gap-2">
              🟩 Work & Contract Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-filled by AI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="project-based">Project-based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Work Mode</Label>
                <Select value={formData.workMode} onValueChange={(value) => handleInputChange('workMode', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-filled by AI" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-site">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Visa Status (Multi-select)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'citizen', label: 'Citizen' },
                  { value: 'residency-transferable', label: 'Residency Visa (Transferable)' },
                  { value: 'residency-non-transferable', label: 'Residency Visa (Non-Transferable)' },
                  { value: 'visit-visa', label: 'Visit Visa' },
                  { value: 'no-visa', label: 'No Visa' },
                ].map((visa) => (
                  <div key={visa.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={visa.value}
                      checked={visaStatus.includes(visa.value)}
                      onCheckedChange={(checked) => handleVisaStatusChange(visa.value, checked as boolean)}
                    />
                    <Label htmlFor={visa.value} className="text-sm">{visa.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Gender Preference</Label>
              <RadioGroup 
                value={formData.genderPreference} 
                onValueChange={(value) => handleInputChange('genderPreference', value)}
                className="flex gap-6"
              >
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
          </div>

          {/* Scoring & Matching */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
              🟨 Scoring & Matching
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minMatchingScore">Minimum Matching Score (%)</Label>
                <Input
                  id="minMatchingScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.minMatchingScore}
                  onChange={(e) => handleInputChange('minMatchingScore', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label>Assessment Required?</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="assessment"
                    checked={formData.assessmentRequired}
                    onCheckedChange={(checked) => handleInputChange('assessmentRequired', checked as boolean)}
                  />
                  <Label htmlFor="assessment">Yes, require assessment</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Compensation & Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-600 flex items-center gap-2">
              🟫 Compensation & Availability
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Salary Option</Label>
                <RadioGroup 
                  value={formData.salaryOption} 
                  onValueChange={(value) => handleInputChange('salaryOption', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="negotiable" id="negotiable" />
                    <Label htmlFor="negotiable">✅ Negotiable</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="range" id="range" />
                      <Label htmlFor="range">🔘 Between (Min – Max)</Label>
                    </div>
                    {formData.salaryOption === 'range' && (
                      <div className="grid grid-cols-2 gap-2 ml-6">
                        <Input
                          type="number"
                          value={formData.salaryMin}
                          onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                          placeholder="Minimum"
                        />
                        <Input
                          type="number"
                          value={formData.salaryMax}
                          onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                          placeholder="Maximum"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">🔘 Fixed Amount</Label>
                    </div>
                    {formData.salaryOption === 'fixed' && (
                      <div className="ml-6">
                        <Input
                          type="number"
                          value={formData.salaryFixed}
                          onChange={(e) => handleInputChange('salaryFixed', e.target.value)}
                          placeholder="Fixed salary amount"
                        />
                      </div>
                    )}
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notice Period</Label>
                  <Select value={formData.noticePeriod} onValueChange={(value) => handleInputChange('noticePeriod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="less-than-1-month">&lt;1 Month</SelectItem>
                      <SelectItem value="1-2-months">1–2 Months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Languages Required</Label>
                  <SkillsSelector
                    skills={languages}
                    onSkillsChange={setLanguages}
                    placeholder="Auto-populated by AI"
                    suggestions={['Arabic', 'English', 'French', 'Spanish']}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI-Generated Job Description */}
          <AIJobDescriptionGenerator
            description={formData.description}
            onDescriptionChange={(value) => handleInputChange('description', value)}
            onRegenerate={generateJobDescription}
            isGenerating={isGeneratingDescription}
          />

          {/* Footer Actions */}
          <div className="flex justify-between gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ← Back
            </Button>
            <div className="flex gap-3">
              <Button type="button" variant="outline">
                Preview Job
              </Button>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                🟧 Post Job
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
