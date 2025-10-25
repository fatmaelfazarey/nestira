
// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Switch } from '@/components/ui/switch';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   GraduationCap, 
//   Target, 
//   Clock, 
//   DollarSign, 
//   Users, 
//   BookOpen,
//   Trophy,
//   ArrowLeft,
//   Eye,
//   Plus,
//   Lightbulb,
//   Building,
//   Globe
// } from 'lucide-react';
// import { JobTitleSuggestions } from './job-creation/JobTitleSuggestions';
// import { SkillsSelector } from './job-creation/SkillsSelector';
// import { AIJobDescriptionGenerator } from './job-creation/AIJobDescriptionGenerator';

// interface InternshipCreationModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onInternshipCreated?: (internship: any) => void;
// }

// export function InternshipCreationModal({ open, onOpenChange, onInternshipCreated }: InternshipCreationModalProps) {
//   const [jobTitle, setJobTitle] = useState('');
//   const department = 'Finance & Accounting'; // Fixed department
//   const [industry, setIndustry] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [companyUrl, setCompanyUrl] = useState('');
//   const [location, setLocation] = useState('');
//   const [duration, setDuration] = useState('');
//   const [durationType, setDurationType] = useState('months');
//   const [stipendAmount, setStipendAmount] = useState('');
//   const [stipendCurrency, setStipendCurrency] = useState('AED');
//   const [preferredTechnicalSkills, setPreferredTechnicalSkills] = useState<string[]>([]);
//   const [requiredInterpersonalSkills, setRequiredInterpersonalSkills] = useState<string[]>([]);
//   const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
//   const [mentorshipProvided, setMentorshipProvided] = useState(true);
//   const [conversionOpportunity, setConversionOpportunity] = useState(false);
//   const [workMode, setWorkMode] = useState('');
//   const [description, setDescription] = useState('');
//   const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
//   const [languages, setLanguages] = useState<string[]>([]);

//   // Generate AI description when key fields change
//   useEffect(() => {
//     if (jobTitle && location && duration) {
//       generateAIDescription();
//     }
//   }, [jobTitle, location, duration, durationType]);

//   const generateAIDescription = async () => {
//     setIsGeneratingDescription(true);

//     // Simulate AI generation delay
//     setTimeout(() => {
//       const aiDescription = `Join our ${department} team as a ${jobTitle} for a ${duration} ${durationType} internship program in ${location}. This hands-on learning opportunity will provide you with real-world experience in financial operations, analytical thinking, and professional development.

// Key Responsibilities:
// • Assist with financial analysis and reporting tasks
// • Support budget preparation and variance analysis
// • Learn industry-standard financial software and tools
// • Participate in team meetings and strategic discussions
// • Complete assigned projects under senior staff guidance

// What Makes This Internship Special:
// • Direct mentorship from experienced professionals
// • Exposure to real client work and business challenges
// • Structured learning path with clear skill development goals
// • Networking opportunities within the finance industry
// • Potential pathway to full-time employment

// We're looking for motivated students or recent graduates who are eager to learn and contribute to our dynamic team. This internship will provide valuable experience that will jumpstart your career in finance.`;

//       setDescription(aiDescription);
//       setIsGeneratingDescription(false);
//     }, 2000);
//   };

//   const handleSubmit = () => {
//     console.log('Creating internship...');

//     const internshipData = {
//       id: Date.now(),
//       title: jobTitle,
//       location: location,
//       type: 'Internship',
//       status: 'Active',
//       applications: 0,
//       views: 0,
//       posted: 'Just now',
//       function: department,
//       level: 'Entry-level',
//       industry: industry,
//       experience: '0-1 years',
//       skills: preferredTechnicalSkills,
//       certifications: [],
//       employmentType: 'Internship',
//       workMode,
//       description,
//       languages,
//       visaStatus: [],
//       duration: `${duration} ${durationType}`,
//       stipend: `${stipendAmount} ${stipendCurrency}`,
//       mentorship: mentorshipProvided,
//       conversionPath: conversionOpportunity,
//       preferredTechnicalSkills,
//       requiredInterpersonalSkills,
//       learningOutcomes,
//       companyName,
//       companyUrl
//     };

//     if (onInternshipCreated) {
//       onInternshipCreated(internshipData);
//     }

//     onOpenChange(false);
//   };

//   const handleLanguageChange = (language: string, checked: boolean) => {
//     if (checked) {
//       setLanguages([...languages, language]);
//     } else {
//       setLanguages(languages.filter(l => l !== language));
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
//             <GraduationCap className="w-6 h-6 text-green-600" />
//             Create Internship Opportunity
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-8 mt-6">
//           {/* Company Information */}
//           <Card className="shadow-sm border-l-4 border-l-blue-500 bg-blue-50/30">
//             <CardHeader className="pb-4 bg-blue-50/50">
//               <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-800">
//                 <Building className="w-5 h-5 text-blue-600" />
//                 Company Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="companyName" className="font-medium mb-2 block">
//                     Company Name
//                   </Label>
//                   <Input
//                     id="companyName"
//                     value={companyName}
//                     onChange={(e) => setCompanyName(e.target.value)}
//                     placeholder="e.g., ABC Financial Services"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="companyUrl" className="flex items-center gap-2 font-medium mb-2">
//                     <Globe className="w-4 h-4" />
//                     Company Website
//                   </Label>
//                   <Input
//                     id="companyUrl"
//                     value={companyUrl}
//                     onChange={(e) => setCompanyUrl(e.target.value)}
//                     placeholder="e.g., https://company.com"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="industry" className="font-medium mb-2 block">
//                   Industry
//                 </Label>
//                 <Select value={industry} onValueChange={setIndustry}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select industry" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Banking">Banking</SelectItem>
//                     <SelectItem value="Investment Management">Investment Management</SelectItem>
//                     <SelectItem value="Insurance">Insurance</SelectItem>
//                     <SelectItem value="Corporate Finance">Corporate Finance</SelectItem>
//                     <SelectItem value="Accounting Services">Accounting Services</SelectItem>
//                     <SelectItem value="Financial Technology">Financial Technology</SelectItem>
//                     <SelectItem value="Real Estate">Real Estate</SelectItem>
//                     <SelectItem value="Consulting">Consulting</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Internship Basics */}
//           <Card className="shadow-sm border-l-4 border-l-green-500 bg-green-50/30">
//             <CardHeader className="pb-4 bg-green-50/50">
//               <CardTitle className="flex items-center gap-2 text-lg font-semibold text-green-800">
//                 <Target className="w-5 h-5 text-green-600" />
//                 Internship Basics
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="jobTitle" className="flex items-center gap-2 font-medium mb-2">
//                     Role Title
//                   </Label>
//                   <JobTitleSuggestions value={jobTitle} onSelect={setJobTitle} isInternship={true} />
//                 </div>
//                 <div>
//                   <Label className="flex items-center gap-2 font-medium mb-2">
//                     Department
//                   </Label>
//                   <Input
//                     value={department}
//                     disabled
//                     className="bg-gray-100 cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="location" className="font-medium mb-2 block">
//                   Location
//                 </Label>
//                 <Input
//                   id="location"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="e.g., Dubai, UAE"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Duration & Compensation */}
//           <Card className="shadow-sm border-l-4 border-l-blue-500 bg-blue-50/30">
//             <CardHeader className="pb-4 bg-blue-50/50">
//               <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-800">
//                 <Clock className="w-5 h-5 text-blue-600" />
//                 Duration & Compensation
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label className="font-medium mb-2 block">Duration</Label>
//                   <div className="flex gap-2">
//                     <Input
//                       type="number"
//                       placeholder="Duration"
//                       value={duration}
//                       onChange={(e) => setDuration(e.target.value)}
//                       className="flex-1"
//                     />
//                     <Select value={durationType} onValueChange={setDurationType}>
//                       <SelectTrigger className="w-32">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="weeks">Weeks</SelectItem>
//                         <SelectItem value="months">Months</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div>
//                   <Label className="font-medium mb-2 block">
//                     <DollarSign className="w-4 h-4 inline mr-1" />
//                     Monthly Stipend
//                   </Label>
//                   <div className="flex gap-2">
//                     <Input
//                       type="number"
//                       placeholder="Amount"
//                       value={stipendAmount}
//                       onChange={(e) => setStipendAmount(e.target.value)}
//                       className="flex-1"
//                     />
//                     <Select value={stipendCurrency} onValueChange={setStipendCurrency}>
//                       <SelectTrigger className="w-24">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="AED">AED</SelectItem>
//                         <SelectItem value="USD">USD</SelectItem>
//                         <SelectItem value="SAR">SAR</SelectItem>
//                         <SelectItem value="EGP">EGP</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <Label className="font-medium mb-3 block">Work Mode</Label>
//                 <RadioGroup value={workMode} onValueChange={setWorkMode}>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="On-site" id="onsite" />
//                     <Label htmlFor="onsite">On-site</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="Remote" id="remote" />
//                     <Label htmlFor="remote">Remote</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="Hybrid" id="hybrid" />
//                     <Label htmlFor="hybrid">Hybrid</Label>
//                   </div>
//                 </RadioGroup>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Skills & Requirements */}
//           <Card className="shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
//             <CardHeader className="pb-4 bg-purple-50/50">
//               <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-800">
//                 <BookOpen className="w-5 h-5 text-purple-600" />
//                 Skills & Requirements
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <SkillsSelector
//                 label="Preferred Technical Skills"
//                 skills={preferredTechnicalSkills}
//                 onSkillsChange={setPreferredTechnicalSkills}
//                 placeholder="Add preferred technical skills"
//                 suggestions={['Excel', 'Financial Modeling', 'Power BI', 'SAP', 'QuickBooks', 'SQL', 'Python', 'Tableau']}
//               />

//               <SkillsSelector
//                 label="Required Interpersonal Skills"
//                 skills={requiredInterpersonalSkills}
//                 onSkillsChange={setRequiredInterpersonalSkills}
//                 placeholder="Add interpersonal skills"
//                 suggestions={['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Attention to Detail', 'Adaptability', 'Critical Thinking', 'Leadership']}
//               />

//               <SkillsSelector
//                 label="What They Will Learn"
//                 skills={learningOutcomes}
//                 onSkillsChange={setLearningOutcomes}
//                 placeholder="Add learning outcomes"
//                 suggestions={['Financial Analysis', 'Budget Planning', 'Risk Assessment', 'Client Communication', 'Data Analysis', 'Report Writing', 'Team Collaboration', 'Industry Software']}
//               />

//               <div className="space-y-4 pt-4 border-t">
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="mentorship"
//                     checked={mentorshipProvided}
//                     onCheckedChange={setMentorshipProvided}
//                   />
//                   <Label htmlFor="mentorship" className="font-medium">
//                     <Users className="w-4 h-4 inline mr-1" />
//                     Mentorship Provided
//                   </Label>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     id="conversion"
//                     checked={conversionOpportunity}
//                     onCheckedChange={setConversionOpportunity}
//                   />
//                   <Label htmlFor="conversion" className="font-medium">
//                     <Trophy className="w-4 h-4 inline mr-1" />
//                     Conversion to Full-time Opportunity
//                   </Label>
//                 </div>
//               </div>

//               <div>
//                 <Label className="font-medium mb-3 block">Languages Required</Label>
//                 <div className="flex gap-4">
//                   {['Arabic', 'English', 'Bilingual'].map((language) => (
//                     <div key={language} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={language}
//                         checked={languages.includes(language)}
//                         onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
//                       />
//                       <Label htmlFor={language} className="text-sm">{language}</Label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* AI-Generated Description */}
//           <Card className="shadow-sm border-l-4 border-l-indigo-500 bg-indigo-50/30">
//             <CardHeader className="pb-4 bg-indigo-50/50">
//               <CardTitle className="flex items-center gap-2 text-lg font-semibold text-indigo-800">
//                 <Lightbulb className="w-5 h-5 text-indigo-600" />
//                 AI-Generated Internship Description
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <AIJobDescriptionGenerator
//                 description={description}
//                 onDescriptionChange={setDescription}
//                 onRegenerate={generateAIDescription}
//                 isGenerating={isGeneratingDescription}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 mt-8 -mx-6 -mb-6">
//           <div className="flex justify-between items-center">
//             <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex items-center gap-2">
//               <ArrowLeft className="w-4 h-4" />
//               Back
//             </Button>
//             <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
//               <Plus className="w-4 h-4" />
//               Post Internship
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }



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
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Plus,
  Lightbulb,
  Building,
  Globe,
  AlertCircle
} from 'lucide-react';
import { JobTitleSuggestions } from './job-creation/JobTitleSuggestions';
import { SkillsSelector } from './job-creation/SkillsSelector';
import { AIJobDescriptionGenerator } from './job-creation/AIJobDescriptionGenerator';

interface InternshipCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInternshipCreated?: (internship: any) => void;
  existingJob?: any;
  isEditing?: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface InternshipFormData {
  companyName: string;
  companyUrl: string;
  industry: string;
  jobTitle: string;
  location: string;
  duration: string;
  durationType: string;
  stipendAmount: string;
  stipendCurrency: string;
  workMode: string;
  preferredTechnicalSkills: string[];
  requiredInterpersonalSkills: string[];
  learningOutcomes: string[];
  languages: string[];
  description: string;
}

class InternshipValidator {
  static validateCompanyName(name: string): ValidationError | null {
    if (!name || !name.trim()) {
      return { field: 'companyName', message: 'Company name is required' };
    }
    if (name.trim().length < 2) {
      return { field: 'companyName', message: 'Company name must be at least 2 characters long' };
    }
    if (name.trim().length > 100) {
      return { field: 'companyName', message: 'Company name must be less than 100 characters' };
    }
    return null;
  }

  static validateCompanyUrl(url: string): ValidationError | null {
    if (!url || !url.trim()) {
      return { field: 'companyUrl', message: 'Company website is required' };
    }

    // Basic URL validation
    // const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    // if (!urlPattern.test(url)) {
    //   return { field: 'companyUrl', message: 'Please enter a valid website URL' };
    // }
    if (!url) {
      return { field: 'companyUrl', message: 'Please enter a valid website URL' };
    }

    return null;
  }

  static validateIndustry(industry: string): ValidationError | null {
    if (!industry) {
      return { field: 'industry', message: 'Industry is required' };
    }
    return null;
  }

  static validateJobTitle(title: string): ValidationError | null {
    if (!title || !title.trim()) {
      return { field: 'jobTitle', message: 'Job title is required' };
    }
    if (title.trim().length < 2) {
      return { field: 'jobTitle', message: 'Job title must be at least 2 characters long' };
    }
    if (title.trim().length > 100) {
      return { field: 'jobTitle', message: 'Job title must be less than 100 characters' };
    }
    return null;
  }

  static validateLocation(location: string): ValidationError | null {
    if (!location || !location.trim()) {
      return { field: 'location', message: 'Location is required' };
    }
    if (location.trim().length < 2) {
      return { field: 'location', message: 'Location must be at least 2 characters long' };
    }
    return null;
  }

  static validateDuration(duration: string, durationType: string): ValidationError | null {
    if (!duration || !duration.trim()) {
      return { field: 'duration', message: 'Duration is required' };
    }

    const durationNum = parseInt(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      return { field: 'duration', message: 'Duration must be a positive number' };
    }

    if (durationType === 'months' && durationNum > 24) {
      return { field: 'duration', message: 'Duration cannot exceed 24 months' };
    }

    if (durationType === 'weeks' && durationNum > 104) {
      return { field: 'duration', message: 'Duration cannot exceed 104 weeks' };
    }

    return null;
  }

  static validateStipend(amount: string): ValidationError | null {
    if (!amount || !amount.trim()) {
      return { field: 'stipendAmount', message: 'Stipend amount is required' };
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum < 0) {
      return { field: 'stipendAmount', message: 'Stipend amount must be a valid number' };
    }

    if (amountNum > 100000) {
      return { field: 'stipendAmount', message: 'Stipend amount seems too high' };
    }

    return null;
  }

  static validateWorkMode(workMode: string): ValidationError | null {
    if (!workMode) {
      return { field: 'workMode', message: 'Work mode is required' };
    }
    return null;
  }

  static validateSkills(skills: string[], field: string, min: number = 1): ValidationError | null {
    if (skills.length < min) {
      const fieldName = field === 'preferredTechnicalSkills' ? 'Technical skills' :
        field === 'requiredInterpersonalSkills' ? 'Interpersonal skills' :
          'Learning outcomes';
      return { field, message: `${fieldName} are required (minimum ${min})` };
    }

    if (skills.length > 20) {
      return { field, message: 'Cannot exceed 20 skills' };
    }

    return null;
  }

  static validateLanguages(languages: string[]): ValidationError | null {
    if (languages.length === 0) {
      return { field: 'languages', message: 'At least one language is required' };
    }
    return null;
  }

  static validateDescription(description: string): ValidationError | null {
    if (!description || !description.trim()) {
      return { field: 'description', message: 'Description is required' };
    }
    if (description.trim().length < 50) {
      return { field: 'description', message: 'Description must be at least 50 characters long' };
    }
    if (description.trim().length > 5000) {
      return { field: 'description', message: 'Description must be less than 5000 characters' };
    }
    return null;
  }

  static validateForm(data: InternshipFormData, durationType: string): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate all fields
    const validations = [
      this.validateCompanyName(data.companyName),
      this.validateCompanyUrl(data.companyUrl),
      this.validateIndustry(data.industry),
      this.validateJobTitle(data.jobTitle),
      this.validateLocation(data.location),
      this.validateDuration(data.duration, durationType),
      this.validateStipend(data.stipendAmount),
      this.validateWorkMode(data.workMode),
      this.validateSkills(data.preferredTechnicalSkills, 'preferredTechnicalSkills'),
      this.validateSkills(data.requiredInterpersonalSkills, 'requiredInterpersonalSkills'),
      this.validateSkills(data.learningOutcomes, 'learningOutcomes'),
      this.validateLanguages(data.languages),
      this.validateDescription(data.description)
    ];

    validations.forEach(error => {
      if (error) errors.push(error);
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export function InternshipCreationModal({ open, onOpenChange, onInternshipCreated, isEditing, existingJob }: InternshipCreationModalProps) {
  const [jobTitle, setJobTitle] = useState('');
  const department = 'Finance & Accounting';
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [durationType, setDurationType] = useState('months');
  const [stipendAmount, setStipendAmount] = useState('');
  const [stipendCurrency, setStipendCurrency] = useState('AED');
  const [preferredTechnicalSkills, setPreferredTechnicalSkills] = useState<string[]>([]);
  const [requiredInterpersonalSkills, setRequiredInterpersonalSkills] = useState<string[]>([]);
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
  const [mentorshipProvided, setMentorshipProvided] = useState(true);
  const [conversionOpportunity, setConversionOpportunity] = useState(false);
  const [workMode, setWorkMode] = useState('');
  const [description, setDescription] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Reset form when modal opens/closes
  // useEffect(() => {
  //   console.log('existingIntern ,', existingJob);
  //   if (!open) {
  //     // Reset form state when modal closes
  //     setJobTitle('');
  //     setIndustry('');
  //     setCompanyName('');
  //     setCompanyUrl('');
  //     setLocation('');
  //     setDuration('');
  //     setDurationType('months');
  //     setStipendAmount('');
  //     setStipendCurrency('AED');
  //     setPreferredTechnicalSkills([]);
  //     setRequiredInterpersonalSkills([]);
  //     setLearningOutcomes([]);
  //     setWorkMode('');
  //     setDescription('');
  //     setLanguages([]);
  //     setValidationErrors([]);
  //     setTouchedFields(new Set());
  //     setHasAttemptedSubmit(false);
  //   }
  //   // if (existingJob && isEditing) {
  //   //   setJobTitle(existingJob.title);
  //   //   setIndustry(existingJob.industry);
  //   //   setCompanyName(existingJob.company_name);
  //   //   setCompanyUrl(existingJob.company_website);
  //   //   setLocation(existingJob.location);
  //   //   setDuration(existingJob.duration.number);
  //   //   setDurationType(existingJob.duration.type);
  //   //   setStipendAmount(existingJob.compensation.monthly_stipend);
  //   //   setStipendCurrency(existingJob.compensation.currency);
  //   //   setPreferredTechnicalSkills(existingJob.preferred_skills);
  //   //   setRequiredInterpersonalSkills(existingJob.required_skills);
  //   //   setLearningOutcomes([existingJob.benefits]);
  //   //   setWorkMode(existingJob.work_mode);
  //   //   setDescription(existingJob.description);
  //   //   setLanguages(existingJob.languages);
  //   //   setValidationErrors([]);
  //   //   setTouchedFields(new Set());
  //   //   setHasAttemptedSubmit(false);
  //   // }
  // }, [open, isEditing, existingJob]);

  // Reset form when modal opens/closes

  useEffect(() => {
    console.log('------------------existingJob:', existingJob);
    if (!open) {
      // Reset form state when modal closes
      setJobTitle('');
      setIndustry('');
      setCompanyName('');
      setCompanyUrl('');
      setLocation('');
      setDuration('');
      setDurationType('months');
      setStipendAmount('');
      setStipendCurrency('AED');
      setPreferredTechnicalSkills([]);
      setRequiredInterpersonalSkills([]);
      setLearningOutcomes([]);
      setWorkMode('');
      setDescription('');
      setLanguages([]);
      setValidationErrors([]);
      setTouchedFields(new Set());
      setHasAttemptedSubmit(false);
    } else if (existingJob && isEditing) {
      // Set form values when opening in edit mode - using the actual data structure
      setJobTitle(existingJob.title || '');
      setIndustry(existingJob.industry || '');
      setCompanyName(existingJob.company_name || '');
      setCompanyUrl(existingJob.company_website || '');
      setLocation(existingJob.location || '');

      // Handle duration from the duration object
      setDuration(existingJob.duration?.number?.toString() || '');
      setDurationType(existingJob.duration?.type || 'months');

      // Handle stipend from compensation object
      setStipendAmount(existingJob.compensation?.monthly_stipend?.toString() || '');
      setStipendCurrency(existingJob.compensation?.currency || 'AED');

      // Handle skills - note the field names are different
      setPreferredTechnicalSkills(existingJob.preferred_skills || []);
      setRequiredInterpersonalSkills(existingJob.required_skills || []);

      // Handle learning outcomes - you might need to adjust this based on your data
      setLearningOutcomes(existingJob.learning_outcomes || []);

      setWorkMode(existingJob.work_mode || '');
      setDescription(existingJob.description || '');
      setLanguages(existingJob.languages || []);

      // Handle mentorship and conversion
      setMentorshipProvided(existingJob.mentorship_available === 1);
      setConversionOpportunity(existingJob.conversion_to_fulltime === 1);

      setValidationErrors([]);
      setTouchedFields(new Set());
      setHasAttemptedSubmit(false);
    }
  }, [open, isEditing, existingJob]);

  // Generate AI description when key fields change
  useEffect(() => {
    if (jobTitle && location && duration) {
      generateAIDescription();
    }
  }, [jobTitle, location, duration, durationType]);

  // Field validation on blur
  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
    validateField(field);
  };

  const validateField = (field: string) => {
    const formData = getFormData();
    let error: ValidationError | null = null;

    switch (field) {
      case 'companyName':
        error = InternshipValidator.validateCompanyName(formData.companyName);
        break;
      case 'companyUrl':
        error = InternshipValidator.validateCompanyUrl(formData.companyUrl);
        break;
      case 'industry':
        error = InternshipValidator.validateIndustry(formData.industry);
        break;
      case 'jobTitle':
        error = InternshipValidator.validateJobTitle(formData.jobTitle);
        break;
      case 'location':
        error = InternshipValidator.validateLocation(formData.location);
        break;
      case 'duration':
        error = InternshipValidator.validateDuration(formData.duration, durationType);
        break;
      case 'stipendAmount':
        error = InternshipValidator.validateStipend(formData.stipendAmount);
        break;
      case 'workMode':
        error = InternshipValidator.validateWorkMode(formData.workMode);
        break;
      case 'preferredTechnicalSkills':
        error = InternshipValidator.validateSkills(formData.preferredTechnicalSkills, field);
        break;
      case 'requiredInterpersonalSkills':
        error = InternshipValidator.validateSkills(formData.requiredInterpersonalSkills, field);
        break;
      case 'learningOutcomes':
        error = InternshipValidator.validateSkills(formData.learningOutcomes, field);
        break;
      case 'languages':
        error = InternshipValidator.validateLanguages(formData.languages);
        break;
      case 'description':
        error = InternshipValidator.validateDescription(formData.description);
        break;
    }

    setValidationErrors(prev => {
      const filtered = prev.filter(e => e.field !== field);
      return error ? [...filtered, error] : filtered;
    });
  };

  const getFormData = (): InternshipFormData => ({
    companyName,
    companyUrl,
    industry,
    jobTitle,
    location,
    duration,
    durationType,
    stipendAmount,
    stipendCurrency,
    workMode,
    preferredTechnicalSkills,
    requiredInterpersonalSkills,
    learningOutcomes,
    languages,
    description
  });

  const getFieldError = (field: string): string | null => {
    const error = validationErrors.find(e => e.field === field);
    return error ? error.message : null;
  };

  const isFieldTouched = (field: string): boolean => {
    return touchedFields.has(field) || hasAttemptedSubmit;
  };

  const generateAIDescription = async () => {
    setIsGeneratingDescription(true);

    setTimeout(() => {
      const aiDescription = `Join our ${department} team as a ${jobTitle} for a ${duration} ${durationType} internship program in ${location}. This hands-on learning opportunity will provide you with real-world experience in financial operations, analytical thinking, and professional development.

Key Responsibilities:
• Assist with financial analysis and reporting tasks
• Support budget preparation and variance analysis
• Learn industry-standard financial software and tools
• Participate in team meetings and strategic discussions
• Complete assigned projects under senior staff guidance

What Makes This Internship Special:
• Direct mentorship from experienced professionals
• Exposure to real client work and business challenges
• Structured learning path with clear skill development goals
• Networking opportunities within the finance industry
• Potential pathway to full-time employment

We're looking for motivated students or recent graduates who are eager to learn and contribute to our dynamic team. This internship will provide valuable experience that will jumpstart your career in finance.`;

      setDescription(aiDescription);
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setHasAttemptedSubmit(true);

    // Mark all fields as touched
    const allFields = [
      'companyName', 'companyUrl', 'industry', 'jobTitle', 'location',
      'duration', 'stipendAmount', 'workMode', 'preferredTechnicalSkills',
      'requiredInterpersonalSkills', 'learningOutcomes', 'languages', 'description'
    ];
    setTouchedFields(new Set(allFields));

    // Validate entire form
    const formData = getFormData();
    const validation = InternshipValidator.validateForm(formData, durationType);
    setValidationErrors(validation.errors);

    if (!validation.isValid) {
      // Scroll to first error
      const firstErrorField = validation.errors[0]?.field;
      if (firstErrorField) {
        const element = document.querySelector(`[data-field="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    console.log('Creating internship...');

    const internshipData = {
      id: (existingJob && isEditing) ? existingJob.id : Date.now(),
      title: jobTitle,
      location: location,
      type: 'Internship',
      status: 'Active',
      applications: 0,
      views: 0,
      posted: 'Just now',
      function: department,
      level: 'Entry-level',
      industry: industry,
      experience: '0-1 years',
      skills: preferredTechnicalSkills,
      certifications: [],
      employmentType: 'Internship',
      workMode,
      description,
      languages,
      visaStatus: [],
      duration: `${duration} ${durationType}`,
      stipend: `${stipendAmount} ${stipendCurrency}`,
      mentorship: mentorshipProvided,
      conversionPath: conversionOpportunity,
      preferredTechnicalSkills,
      requiredInterpersonalSkills,
      learningOutcomes,
      companyName,
      companyUrl
    };

    if (onInternshipCreated) {
      onInternshipCreated(internshipData);
    }
    // onInternshipCreated(internshipData);
    onOpenChange(false);
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setLanguages([...languages, language]);
    } else {
      setLanguages(languages.filter(l => l !== language));
    }
    // Validate immediately when language changes
    validateField('languages');
  };

  const handleSkillsChange = (skills: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, field: string) => {
    setter(skills);
    // Validate immediately when skills change
    validateField(field);
  };

  const hasErrors = validationErrors.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <GraduationCap className="w-6 h-6 text-green-600" />
            Create Internship Opportunity
          </DialogTitle>
        </DialogHeader>

        {hasErrors && hasAttemptedSubmit && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the {validationErrors.length} error{validationErrors.length > 1 ? 's' : ''} before submitting the form.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8 mt-6">
          {/* Company Information */}
          <Card className="shadow-sm border-l-4 border-l-blue-500 bg-blue-50/30" data-field="companyName">
            <CardHeader className="pb-4 bg-blue-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-blue-800">
                <Building className="w-5 h-5 text-blue-600" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName" className="font-medium mb-2 block">
                    Company Name *
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onBlur={() => handleFieldBlur('companyName')}
                    placeholder="e.g., ABC Financial Services"
                    className={getFieldError('companyName') && isFieldTouched('companyName') ? 'border-red-500' : ''}
                  />
                  {getFieldError('companyName') && isFieldTouched('companyName') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {getFieldError('companyName')}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyUrl" className="flex items-center gap-2 font-medium mb-2">
                    <Globe className="w-4 h-4" />
                    Company Website *
                  </Label>
                  <Input
                    id="companyUrl"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    onBlur={() => handleFieldBlur('companyUrl')}
                    placeholder="e.g., https://company.com"
                    className={getFieldError('companyUrl') && isFieldTouched('companyUrl') ? 'border-red-500' : ''}
                  />
                  {getFieldError('companyUrl') && isFieldTouched('companyUrl') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {getFieldError('companyUrl')}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="industry" className="font-medium mb-2 block">
                  Industry *
                </Label>
                <Select
                  value={industry}
                  onValueChange={(value) => {
                    setIndustry(value);
                    validateField('industry');
                  }}
                >
                  <SelectTrigger
                    className={getFieldError('industry') && isFieldTouched('industry') ? 'border-red-500' : ''}
                    onBlur={() => handleFieldBlur('industry')}
                  >
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="Investment Management">Investment Management</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Corporate Finance">Corporate Finance</SelectItem>
                    <SelectItem value="Accounting Services">Accounting Services</SelectItem>
                    <SelectItem value="Financial Technology">Financial Technology</SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
                {getFieldError('industry') && isFieldTouched('industry') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('industry')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Internship Basics */}
          <Card className="shadow-sm border-l-4 border-l-green-500 bg-green-50/30" data-field="jobTitle">
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
                    Role Title *
                  </Label>
                  <JobTitleSuggestions
                    value={jobTitle}
                    onSelect={(value) => {
                      setJobTitle(value);
                      validateField('jobTitle');
                    }}
                    isInternship={true}
                    className={getFieldError('jobTitle') && isFieldTouched('jobTitle') ? 'border-red-500' : ''}
                    onBlur={() => handleFieldBlur('jobTitle')}
                  />
                  {getFieldError('jobTitle') && isFieldTouched('jobTitle') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {getFieldError('jobTitle')}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2 font-medium mb-2">
                    Department
                  </Label>
                  <Input
                    value={department}
                    disabled
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div data-field="location">
                <Label htmlFor="location" className="font-medium mb-2 block">
                  Location *
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onBlur={() => handleFieldBlur('location')}
                  placeholder="e.g., Dubai, UAE"
                  className={getFieldError('location') && isFieldTouched('location') ? 'border-red-500' : ''}
                />
                {getFieldError('location') && isFieldTouched('location') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('location')}
                  </p>
                )}
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
                <div data-field="duration">
                  <Label className="font-medium mb-2 block">Duration *</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      onBlur={() => handleFieldBlur('duration')}
                      className={`flex-1 ${getFieldError('duration') && isFieldTouched('duration') ? 'border-red-500' : ''}`}
                      min="1"
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
                  {getFieldError('duration') && isFieldTouched('duration') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {getFieldError('duration')}
                    </p>
                  )}
                </div>
                <div data-field="stipendAmount">
                  <Label className="font-medium mb-2 block">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Monthly Stipend *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={stipendAmount}
                      onChange={(e) => setStipendAmount(e.target.value)}
                      onBlur={() => handleFieldBlur('stipendAmount')}
                      className={`flex-1 ${getFieldError('stipendAmount') && isFieldTouched('stipendAmount') ? 'border-red-500' : ''}`}
                      min="0"
                      step="0.01"
                    />
                    <Select value={stipendCurrency} onValueChange={setStipendCurrency}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AED">AED</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="SAR">SAR</SelectItem>
                        <SelectItem value="EGP">EGP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {getFieldError('stipendAmount') && isFieldTouched('stipendAmount') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {getFieldError('stipendAmount')}
                    </p>
                  )}
                </div>
              </div>

              <div data-field="workMode">
                <Label className="font-medium mb-3 block">Work Mode *</Label>
                <RadioGroup
                  value={workMode}
                  onValueChange={(value) => {
                    setWorkMode(value);
                    validateField('workMode');
                  }}
                >
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
                {getFieldError('workMode') && isFieldTouched('workMode') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('workMode')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card className="shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
            <CardHeader className="pb-4 bg-purple-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-800">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Skills & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div data-field="preferredTechnicalSkills">
                <SkillsSelector
                  label="Preferred Technical Skills *"
                  skills={preferredTechnicalSkills}
                  onSkillsChange={(skills) => handleSkillsChange(skills, setPreferredTechnicalSkills, 'preferredTechnicalSkills')}
                  placeholder="Add preferred technical skills"
                  suggestions={['Excel', 'Financial Modeling', 'Power BI', 'SAP', 'QuickBooks', 'SQL', 'Python', 'Tableau']}
                  error={getFieldError('preferredTechnicalSkills') && isFieldTouched('preferredTechnicalSkills')}
                />
                {getFieldError('preferredTechnicalSkills') && isFieldTouched('preferredTechnicalSkills') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('preferredTechnicalSkills')}
                  </p>
                )}
              </div>

              <div data-field="requiredInterpersonalSkills">
                <SkillsSelector
                  label="Required Interpersonal Skills *"
                  skills={requiredInterpersonalSkills}
                  onSkillsChange={(skills) => handleSkillsChange(skills, setRequiredInterpersonalSkills, 'requiredInterpersonalSkills')}
                  placeholder="Add interpersonal skills"
                  suggestions={['Communication', 'Teamwork', 'Problem Solving', 'Time Management', 'Attention to Detail', 'Adaptability', 'Critical Thinking', 'Leadership']}
                  error={getFieldError('requiredInterpersonalSkills') && isFieldTouched('requiredInterpersonalSkills')}
                />
                {getFieldError('requiredInterpersonalSkills') && isFieldTouched('requiredInterpersonalSkills') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('requiredInterpersonalSkills')}
                  </p>
                )}
              </div>

              <div data-field="learningOutcomes">
                <SkillsSelector
                  label="What They Will Learn *"
                  skills={learningOutcomes}
                  onSkillsChange={(skills) => handleSkillsChange(skills, setLearningOutcomes, 'learningOutcomes')}
                  placeholder="Add learning outcomes"
                  suggestions={['Financial Analysis', 'Budget Planning', 'Risk Assessment', 'Client Communication', 'Data Analysis', 'Report Writing', 'Team Collaboration', 'Industry Software']}
                  error={getFieldError('learningOutcomes') && isFieldTouched('learningOutcomes')}
                />
                {getFieldError('learningOutcomes') && isFieldTouched('learningOutcomes') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('learningOutcomes')}
                  </p>
                )}
              </div>

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

              <div data-field="languages">
                <Label className="font-medium mb-3 block">Languages Required *</Label>
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
                {getFieldError('languages') && isFieldTouched('languages') && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {getFieldError('languages')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI-Generated Description */}
          <Card className="shadow-sm border-l-4 border-l-indigo-500 bg-indigo-50/30" data-field="description">
            <CardHeader className="pb-4 bg-indigo-50/50">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-indigo-800">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                AI-Generated Internship Description *
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AIJobDescriptionGenerator
                description={description}
                onDescriptionChange={(value) => {
                  setDescription(value);
                  validateField('description');
                }}
                onRegenerate={generateAIDescription}
                isGenerating={isGeneratingDescription}
                error={getFieldError('description') && isFieldTouched('description')}
              />
              {getFieldError('description') && isFieldTouched('description') && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {getFieldError('description')}
                </p>
              )}
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
            <div className="flex items-center gap-4">
              {hasErrors && hasAttemptedSubmit && (
                <span className="text-red-500 text-sm">
                  {validationErrors.length} error{validationErrors.length > 1 ? 's' : ''} to fix
                </span>
              )}
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                disabled={hasErrors && hasAttemptedSubmit}
              >
                <Plus className="w-4 h-4" />
                Post Internship
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}