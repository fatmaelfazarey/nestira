
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Target, 
  Clock, 
  DollarSign, 
  Users, 
  BookOpen,
  Trophy,
  ArrowLeft,
  Eye,
  Plus
} from 'lucide-react';
import { JobTitleSuggestions } from './job-creation/JobTitleSuggestions';
import { SkillsSelector } from './job-creation/SkillsSelector';

interface InternshipCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInternshipCreated?: (internship: any) => void;
}

export function InternshipCreationModal({ open, onOpenChange, onInternshipCreated }: InternshipCreationModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('months');
  const [stipendAmount, setStipendAmount] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [developmentAreas, setDevelopmentAreas] = useState<string[]>([]);
  const [preferredMajors, setPreferredMajors] = useState<string[]>([]);
  const [mentorshipProvided, setMentorshipProvided] = useState(true);
  const [conversionOpportunity, setConversionOpportunity] = useState(false);
  const [workMode, setWorkMode] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log('Creating internship...');
    
    const internshipData = {
      id: Date.now(),
      title: jobTitle,
      location: location,
      type: 'Internship',
      status: 'Active',
      applications: 0,
      views: 0,
      posted: 'Just now',
      function: department,
      level: 'Entry-level',
      industry: department,
      experience: '0-1 years',
      skills,
      certifications: [],
      employmentType: 'Internship',
      workMode,
      description,
      languages,
      visaStatus: [],
      duration: `${duration} ${durationType}`,
      stipend: stipendAmount,
      mentorship: mentorshipProvided,
      conversionPath: conversionOpportunity,
      developmentAreas,
      preferredMajors
    };

    if (onInternshipCreated) {
      onInternshipCreated(internshipData);
    }

    onOpenChange(false);
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setLanguages([...languages, language]);
    } else {
      setLanguages(languages.filter(l => l !== language));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <GraduationCap className="w-6 h-6 text-green-600" />
            Create Internship Opportunity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Internship Basics */}
          <Card className="shadow-sm border-l-4 border-l-green-500 bg-green-50/30">
            <CardHeader className="pb-4 bg-green-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-green-800">
                <Target className="w-5 h-5 text-green-600" />
                Internship Basics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle" className="flex items-center gap-2 font-medium mb-2">
                    Role Title
                  </Label>
                  <JobTitleSuggestions value={jobTitle} onSelect={setJobTitle} />
                </div>
                <div>
                  <Label htmlFor="department" className="flex items-center gap-2 font-medium mb-2">
                    Department
                  </Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finance & Accounting">Finance & Accounting</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Human Resources">Human Resources</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="font-medium mb-2 block">
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

          {/* Duration & Compensation */}
          <Card className="shadow-sm border-l-4 border-l-blue-500 bg-blue-50/30">
            <CardHeader className="pb-4 bg-blue-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                <Clock className="w-5 h-5 text-blue-600" />
                Duration & Compensation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium mb-2 block">Duration</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={durationType} onValueChange={setDurationType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="font-medium mb-2 block">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Monthly Stipend
                  </Label>
                  <Input
                    type="number"
                    placeholder="Amount in AED"
                    value={stipendAmount}
                    onChange={(e) => setStipendAmount(e.target.value)}
                  />
                </div>
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
            </CardContent>
          </Card>

          {/* Learning & Development */}
          <Card className="shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
            <CardHeader className="pb-4 bg-purple-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-800">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Learning & Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SkillsSelector
                label="Required Skills"
                skills={skills}
                onSkillsChange={setSkills}
                placeholder="Add required skills"
              />

              <SkillsSelector
                label="Skill Development Areas"
                skills={developmentAreas}
                onSkillsChange={setDevelopmentAreas}
                placeholder="What skills will they develop?"
                suggestions={['Communication', 'Leadership', 'Project Management', 'Data Analysis', 'Digital Marketing']}
              />

              <SkillsSelector
                label="Preferred Majors or Backgrounds"
                skills={preferredMajors}
                onSkillsChange={setPreferredMajors}
                placeholder="Add preferred academic backgrounds"
                suggestions={['Business Administration', 'Finance', 'Marketing', 'Computer Science', 'Engineering']}
              />

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="mentorship"
                    checked={mentorshipProvided}
                    onCheckedChange={setMentorshipProvided}
                  />
                  <Label htmlFor="mentorship" className="font-medium">
                    <Users className="w-4 h-4 inline mr-1" />
                    Mentorship Provided
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="conversion"
                    checked={conversionOpportunity}
                    onCheckedChange={setConversionOpportunity}
                  />
                  <Label htmlFor="conversion" className="font-medium">
                    <Trophy className="w-4 h-4 inline mr-1" />
                    Conversion to Full-time Opportunity
                  </Label>
                </div>
              </div>

              <div>
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

          {/* Description */}
          <Card className="shadow-sm border-l-4 border-l-indigo-500 bg-indigo-50/30">
            <CardHeader className="pb-4 bg-indigo-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-indigo-800">
                Internship Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the internship opportunity, responsibilities, and what the intern will learn..."
                className="min-h-32"
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 mt-8 -mx-6 -mb-6">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Post Internship
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
