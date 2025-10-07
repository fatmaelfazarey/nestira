import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User, Mail, Phone, MapPin, Lock, Briefcase, GraduationCap,
  Star, Plus, X, AlertCircle, CheckCircle, Building2, Globe, Target, DollarSign, Upload, Image
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function CandidateSignUp() {
  const [recruiterType, setRecruiterType] = useState<'individual' | 'company'>('individual');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [basicInfo, setBasicInfo] = useState({
    fullName: '', email: '', phone: '', location: '',
    businessEmail: '', linkedin: '', password: '', confirmPassword: '', role: ''
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const [experience, setExperience] = useState([
    { title: '', company: '', location: '', startDate: '', endDate: '', current: false, achievements: [''] }
  ]);

  const [education, setEducation] = useState([
    { degree: '', institution: '', startDate: '', endDate: '', gpa: '' }
  ]);

  const [skills, setSkills] = useState({
    technical: [],
    software: [],
    certifications: [],
    languages: []
  });

  const [newSkill, setNewSkill] = useState({ category: 'technical', value: '' });
  const [industry, setIndustry] = useState({
    industries: [],
    subfields: []
  });

  const [preferences, setPreferences] = useState({
    jobTitles: [],
    locations: [],
    workType: '',
    visaStatus: '',
    noticePeriod: '',
    salaryRange: { min: '', max: '', currency: 'AED' }
  });

  const [newJobTitle, setNewJobTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const [summary, setSummary] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateProgress = () => {
    let progress = 0;

    // Basic Info (25%)
    if (basicInfo.fullName && basicInfo.email && basicInfo.phone && basicInfo.location) progress += 15;
    if (basicInfo.role) progress += 5;
    if (basicInfo.linkedin || profilePhoto) progress += 5;

    // Experience (20%)
    if (experience[0].title && experience[0].company) progress += 20;

    // Education (15%)
    if (education[0].degree && education[0].institution) progress += 15;

    // Skills (15%)
    if (skills.technical.length > 0) progress += 5;
    if (skills.certifications.length > 0) progress += 5;
    if (skills.languages.length > 0) progress += 5;

    // Industry (10%)
    if (industry.industries.length > 0) progress += 10;

    // Summary (10%)
    if (summary) progress += 10;

    // Preferences (5%)
    if (preferences.workType) progress += 5;

    return progress;
  };

  const locations = [
    "Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE",
    "Riyadh, Saudi Arabia", "Jeddah, Saudi Arabia",
    "Doha, Qatar", "Cairo, Egypt", "Kuwait City, Kuwait"
  ];

  const INDUSTRIES = [
    "Banking", "FMCG", "Tech", "Real Estate", "Investment",
    "Insurance", "Consulting", "Healthcare", "Energy"
  ];

  const SUBFIELDS = {
    Banking: ["Investment Banking", "Retail Banking", "Corporate Banking", "Islamic Banking", "Financial Planning", "Risk Management"],
    FMCG: ["Supply Chain", "Brand Management", "Sales", "Distribution", "Marketing", "Product Development"],
    Tech: ["Software Development", "Data Science", "Cybersecurity", "Cloud Computing", "AI/ML", "DevOps"],
    "Real Estate": ["Property Management", "Development", "Investment", "Brokerage", "Asset Management"],
    Investment: ["Asset Management", "Private Equity", "Venture Capital", "Hedge Funds", "Portfolio Management"],
    Insurance: ["Underwriting", "Claims", "Actuarial", "Risk Management", "Reinsurance"],
    Consulting: ["Strategy", "Management", "Financial Advisory", "IT Consulting", "Operations"],
    Healthcare: ["Hospital Management", "Pharmaceuticals", "Medical Devices", "Healthcare IT", "Clinical Research"],
    Energy: ["Oil & Gas", "Renewable Energy", "Utilities", "Energy Trading", "Exploration"]
  };

  const technicalSkills = [
    "Financial Modeling", "Risk Management", "Portfolio Management",
    "Valuation", "Credit Analysis", "Investment Banking", "Islamic Finance",
    "M&A Analysis", "Budget Management", "Cost Analysis"
  ];

  const softwareTools = [
    "Excel Advanced", "Bloomberg Terminal", "SAP", "Tableau", "Power BI",
    "Python", "SQL", "QuickBooks", "Oracle Financials", "MATLAB"
  ];

  const certifications = [
    "CFA", "FRM", "CIPA", "ACCA", "CPA", "CAMS", "CIA", "CFP"
  ];

  const workTypes = ["Full-time", "Part-time", "Contract", "Remote", "Hybrid"];
  const visaStatuses = ["Citizen", "Resident", "Valid Work Visa", "Need Sponsorship"];
  const noticePeriods = ["Immediate", "15 days", "30 days", "60 days", "90 days"];
  const currencies = ["AED", "USD", "SAR", "QAR", "KWD", "EGP"];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      toast.success("Photo uploaded successfully");
    }
  };

  const addExperience = () => {
    setExperience([...experience, {
      title: '', company: '', location: '', startDate: '',
      endDate: '', current: false, achievements: ['']
    }]);
  };

  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(experience.filter((_, i) => i !== index));
    }
  };

  const addAchievement = (expIndex) => {
    const updated = [...experience];
    updated[expIndex].achievements.push('');
    setExperience(updated);
  };

  const addEducation = () => {
    setEducation([...education, {
      degree: '', institution: '', startDate: '', endDate: '', gpa: ''
    }]);
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    }
  };

  const addSkill = () => {
    if (newSkill.value.trim()) {
      const updated = { ...skills };
      if (!updated[newSkill.category].includes(newSkill.value.trim())) {
        updated[newSkill.category] = [...updated[newSkill.category], newSkill.value.trim()];
        setSkills(updated);
      }
      setNewSkill({ ...newSkill, value: '' });
    }
  };

  const removeSkill = (category, index) => {
    const updated = { ...skills };
    updated[category] = updated[category].filter((_, i) => i !== index);
    setSkills(updated);
  };

  const toggleIndustry = (ind) => {
    const industries = industry.industries.includes(ind)
      ? industry.industries.filter(i => i !== ind)
      : [...industry.industries, ind];
    setIndustry({ ...industry, industries });
  };

  const toggleSubfield = (subfield) => {
    const subfields = industry.subfields.includes(subfield)
      ? industry.subfields.filter(s => s !== subfield)
      : [...industry.subfields, subfield];
    setIndustry({ ...industry, subfields });
  };

  const addJobTitle = () => {
    if (newJobTitle.trim() && !preferences.jobTitles.includes(newJobTitle.trim())) {
      setPreferences({
        ...preferences,
        jobTitles: [...preferences.jobTitles, newJobTitle.trim()]
      });
      setNewJobTitle('');
    }
  };

  const removeJobTitle = (index) => {
    setPreferences({
      ...preferences,
      jobTitles: preferences.jobTitles.filter((_, i) => i !== index)
    });
  };

  const addLocation = () => {
    if (newLocation && !preferences.locations.includes(newLocation)) {
      setPreferences({
        ...preferences,
        locations: [...preferences.locations, newLocation]
      });
      setNewLocation('');
    }
  };

  const removeLocation = (index) => {
    setPreferences({
      ...preferences,
      locations: preferences.locations.filter((_, i) => i !== index)
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!basicInfo.fullName || !basicInfo.email || !basicInfo.phone || !basicInfo.location) {
          return "Please fill all required basic information fields";
        }
        if (!basicInfo.password || basicInfo.password.length < 6) {
          return "Password must be at least 6 characters";
        }
        if (basicInfo.password !== basicInfo.confirmPassword) {
          return "Passwords do not match";
        }
        return null;
      case 2:
        if (!experience[0].title || !experience[0].company) {
          return "Please add at least one work experience";
        }
        return null;
      case 3:
        if (!education[0].degree || !education[0].institution) {
          return "Please add at least one education entry";
        }
        return null;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    const error = validateStep(currentStep);
    if (error) {
      toast.error(error);
      return;
    }

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setLoading(true);

    const profileData = {
      role: "candidate" as const,
      basicInfo: {
        fullName: basicInfo.fullName,
        role: basicInfo.role,
        email: basicInfo.email,
        phone: basicInfo.phone,
        location: basicInfo.location,
        businessEmail: basicInfo.businessEmail,
        linkedin: basicInfo.linkedin
      },
      experience: experience.filter(exp => exp.title || exp.company),
      education: education.filter(edu => edu.degree || edu.institution),
      skills,
      industry,
      summary,
      coverLetter,
      preferences: {
        ...preferences,
        salaryRange: {
          min: preferences.salaryRange.min ? Number(preferences.salaryRange.min) : undefined,
          max: preferences.salaryRange.max ? Number(preferences.salaryRange.max) : undefined,
          currency: preferences.salaryRange.currency
        }
      },
      video: { status: 'not_started' as const },
      behavioral: { status: 'not_started' as const },
      profileCompletion: calculateProgress()
    };

    try {
      await signup(basicInfo.email, basicInfo.password, profileData);

      // TODO: Upload photo to Firebase Storage if profilePhoto exists

      toast.success('Account created successfully! Welcome aboard');

      setTimeout(() => {
        navigate('/candidate');
      }, 500);
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered!");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address!");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak! Use at least 6 characters.");
      } else {
        toast.error(error.message || 'Failed to create account');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Profile</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">Profile Completion</span>
              <span className="text-2xl font-bold text-blue-600">{calculateProgress()}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>Basic</span>
              <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>Experience</span>
              <span className={currentStep >= 3 ? "text-blue-600 font-medium" : ""}>Education</span>
              <span className={currentStep >= 4 ? "text-blue-600 font-medium" : ""}>Skills</span>
              <span className={currentStep >= 5 ? "text-blue-600 font-medium" : ""}>Industry</span>
              <span className={currentStep >= 6 ? "text-blue-600 font-medium" : ""}>Summary</span>
              <span className={currentStep >= 7 ? "text-blue-600 font-medium" : ""}>Preferences</span>
            </div>
          </CardContent>
        </Card>


        {/* Recruiter Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              I am recruiting as:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-all border-2 ${recruiterType === 'individual'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-400 hover:shadow-sm'
                  }`}
                onClick={() => {
                  setRecruiterType('individual');
                  navigate('/candidate/signup')
                }}
              >
                <CardContent className="p-6 text-center">
                  <User className={`w-12 h-12 mx-auto mb-3 ${recruiterType === 'individual' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold text-lg mb-2">Individual Recruiter</h3>
                  <p className="text-sm text-gray-600">Freelance HR or independent consultant</p>
                  {recruiterType === 'individual' && (
                    <CheckCircle className="w-6 h-6 mx-auto mt-3 text-blue-600" />
                  )}
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all border-2 ${recruiterType === 'company'
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-400 hover:shadow-sm'
                  }`}
                onClick={() => {
                  setRecruiterType('company');
                  navigate('/signup')
                }
                }
              >
                <CardContent className="p-6 text-center">
                  <Building2 className={`w-12 h-12 mx-auto mb-3 ${recruiterType === 'company' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <h3 className="font-semibold text-lg mb-2">Company Representative</h3>
                  <p className="text-sm text-gray-600">Representing a company or organization</p>
                  {recruiterType === 'company' && (
                    <CheckCircle className="w-6 h-6 mx-auto mt-3 text-blue-600" />
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>


        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    <strong>Getting Started:</strong> Fill in your basic information to create your account. All fields marked with * are required.
                  </p>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="photo-upload"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary-c hover:bg-secondary-c-hover text-white rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />Full Name *
                  </label>
                  <Input
                    value={basicInfo.fullName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, fullName: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />Desired Job Title
                  </label>
                  <Input
                    value={basicInfo.role}
                    onChange={(e) => setBasicInfo({ ...basicInfo, role: e.target.value })}
                    placeholder="e.g., Senior Financial Analyst"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />Email Address *
                  </label>
                  <Input
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4" />Phone Number *
                  </label>
                  <Input
                    value={basicInfo.phone}
                    onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />Location *
                  </label>
                  <Select value={basicInfo.location} onValueChange={(value) => setBasicInfo({ ...basicInfo, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" />Business Email (optional)
                  </label>
                  <Input
                    type="email"
                    value={basicInfo.businessEmail}
                    onChange={(e) => setBasicInfo({ ...basicInfo, businessEmail: e.target.value })}
                    placeholder="business@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4" />LinkedIn / Portfolio
                  </label>
                  <Input
                    value={basicInfo.linkedin}
                    onChange={(e) => setBasicInfo({ ...basicInfo, linkedin: e.target.value })}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4" />Password *
                  </label>
                  <Input
                    type="password"
                    value={basicInfo.password}
                    onChange={(e) => setBasicInfo({ ...basicInfo, password: e.target.value })}
                    placeholder="Min 6 characters"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4" />Confirm Password *
                  </label>
                  <Input
                    type="password"
                    value={basicInfo.confirmPassword}
                    onChange={(e) => setBasicInfo({ ...basicInfo, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Work Experience
              </CardTitle>
              <Button size="sm" onClick={addExperience} className="bg-secondary-c hover:bg-secondary-c-hover">
                <Plus className="w-4 h-4 mr-2" />Add Experience
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.map((exp, index) => (
                <Card key={index} className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Experience {index + 1}</h4>
                      {experience.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeExperience(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        placeholder="Job Title *"
                        value={exp.title}
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[index].title = e.target.value;
                          setExperience(updated);
                        }}
                      />
                      <Input
                        placeholder="Company Name *"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[index].company = e.target.value;
                          setExperience(updated);
                        }}
                      />
                      <Input
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => {
                          const updated = [...experience];
                          updated[index].location = e.target.value;
                          setExperience(updated);
                        }}
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => {
                            const updated = [...experience];
                            updated[index].current = e.target.checked;
                            setExperience(updated);
                          }}
                          className="w-4 h-4"
                        />
                        <label className="text-sm">Current Position</label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium">Key Achievements</label>
                      {exp.achievements.map((ach, achIndex) => (
                        <div key={achIndex} className="flex gap-2">
                          <Textarea
                            placeholder="• Describe your achievement..."
                            value={ach}
                            onChange={(e) => {
                              const updated = [...experience];
                              updated[index].achievements[achIndex] = e.target.value;
                              setExperience(updated);
                            }}
                            className="min-h-[60px]"
                          />
                          {exp.achievements.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updated = [...experience];
                                updated[index].achievements = updated[index].achievements.filter((_, i) => i !== achIndex);
                                setExperience(updated);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => addAchievement(index)}>
                        <Plus className="w-3 h-3 mr-1" />Add Achievement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Education
              </CardTitle>
              <Button size="sm" onClick={addEducation} className="bg-secondary-c hover:bg-secondary-c-hover">
                <Plus className="w-4 h-4 mr-2" />Add Education
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index} className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Education {index + 1}</h4>
                      {education.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeEducation(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Degree/Certificate *"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].degree = e.target.value;
                          setEducation(updated);
                        }}
                      />
                      <Input
                        placeholder="Institution *"
                        value={edu.institution}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].institution = e.target.value;
                          setEducation(updated);
                        }}
                      />
                      <Input
                        placeholder="Start Year"
                        value={edu.startDate}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].startDate = e.target.value;
                          setEducation(updated);
                        }}
                      />
                      <Input
                        placeholder="End Year"
                        value={edu.endDate}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].endDate = e.target.value;
                          setEducation(updated);
                        }}
                      />
                      <Input
                        placeholder="GPA (optional)"
                        value={edu.gpa}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[index].gpa = e.target.value;
                          setEducation(updated);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Skills & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Technical Skills */}
              <div>
                <h4 className="font-semibold mb-3">Technical Skills</h4>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add technical skill..."
                    value={newSkill.category === 'technical' ? newSkill.value : ''}
                    onChange={(e) => setNewSkill({ category: 'technical', value: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1"
                  />
                  <Button onClick={() => { setNewSkill({ category: 'technical', value: newSkill.value }); addSkill(); }} className="bg-secondary-c hover:bg-secondary-c-hover">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {technicalSkills.map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!skills.technical.includes(skill)) {
                          setSkills({ ...skills, technical: [...skills.technical, skill] });
                        }
                      }}
                      className="text-xs"
                      disabled={skills.technical.includes(skill)}
                    >
                      + {skill}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.technical.map((skill, index) => (
                    <Badge key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill('technical', index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Software & Tools */}
              <div>
                <h4 className="font-semibold mb-3">Software & Tools</h4>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add software or tool..."
                    value={newSkill.category === 'software' ? newSkill.value : ''}
                    onChange={(e) => setNewSkill({ category: 'software', value: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1"
                  />
                  <Button onClick={() => { setNewSkill({ category: 'software', value: newSkill.value }); addSkill(); }} className="bg-secondary-c hover:bg-secondary-c-hover">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {softwareTools.map((tool) => (
                    <Button
                      key={tool}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!skills.software.includes(tool)) {
                          setSkills({ ...skills, software: [...skills.software, tool] });
                        }
                      }}
                      className="text-xs"
                      disabled={skills.software.includes(tool)}
                    >
                      + {tool}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.software.map((tool, index) => (
                    <Badge key={index} className="flex items-center gap-1 bg-purple-100 text-purple-800">
                      {tool}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill('software', index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="font-semibold mb-3">Certifications</h4>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add certification..."
                    value={newSkill.category === 'certifications' ? newSkill.value : ''}
                    onChange={(e) => setNewSkill({ category: 'certifications', value: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1"
                  />
                  <Button onClick={() => { setNewSkill({ category: 'certifications', value: newSkill.value }); addSkill(); }} className="bg-secondary-c hover:bg-secondary-c-hover">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {certifications.map((cert) => (
                    <Button
                      key={cert}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!skills.certifications.includes(cert)) {
                          setSkills({ ...skills, certifications: [...skills.certifications, cert] });
                        }
                      }}
                      className="text-xs"
                      disabled={skills.certifications.includes(cert)}
                    >
                      + {cert}
                    </Button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.certifications.map((cert, index) => (
                    <Badge key={index} className="flex items-center gap-1 bg-green-100 text-green-800">
                      {cert}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill('certifications', index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-semibold mb-3">Languages</h4>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add language (e.g., Arabic - Native)..."
                    value={newSkill.category === 'languages' ? newSkill.value : ''}
                    onChange={(e) => setNewSkill({ category: 'languages', value: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1"
                  />
                  <Button onClick={() => { setNewSkill({ category: 'languages', value: newSkill.value }); addSkill(); }} className="bg-secondary-c hover:bg-secondary-c-hover">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((lang, index) => (
                    <Badge key={index} className="flex items-center gap-1 bg-purple-100 text-purple-800">
                      {lang}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill('languages', index)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Industry & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Select Industries</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {INDUSTRIES.map((ind) => (
                    <Button
                      key={ind}
                      variant={industry.industries.includes(ind) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleIndustry(ind)}
                      className={industry.industries.includes(ind) ? "bg-secondary-c hover:bg-secondary-c-hover" : ""}
                    >
                      {ind}
                    </Button>
                  ))}
                </div>
              </div>

              {industry.industries.length > 0 && (
                <>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <h4 className="font-medium text-green-800">Selected Industries</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industry.industries.map((ind) => (
                        <Badge key={ind} className="bg-green-100 text-green-800">
                          {ind}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Select Subfields</h4>
                    {industry.industries.map((ind) => (
                      <div key={ind} className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">{ind}</p>
                        <div className="flex flex-wrap gap-2">
                          {SUBFIELDS[ind]?.map((subfield) => (
                            <Button
                              key={subfield}
                              variant={industry.subfields.includes(subfield) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleSubfield(subfield)}
                              className={industry.subfields.includes(subfield) ? "bg-secondary-c hover:bg-secondary-c-hover" : ""}
                            >
                              {subfield}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {industry.subfields.length > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <h4 className="font-medium text-blue-800">Selected Subfields</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industry.subfields.map((sub) => (
                          <Badge key={sub} className="bg-blue-100 text-blue-800">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-semibold mb-2 block">Summary</label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Write a brief summary about yourself, your career goals, and what makes you unique..."
                  className="min-h-[120px]"
                />
                <p className="text-xs text-gray-500 mt-1">This will be visible to employers</p>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Cover Letter (Optional)</label>
                <Textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a general cover letter that can be customized for specific applications..."
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 7 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Job Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preferred Job Titles */}
              <div>
                <h4 className="font-semibold mb-3">Preferred Job Titles</h4>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add job title..."
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addJobTitle())}
                    className="flex-1"
                  />
                  <Button onClick={addJobTitle} className="bg-secondary-c hover:bg-secondary-c-hover">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.jobTitles.map((title, index) => (
                    <Badge key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800">
                      {title}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeJobTitle(index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Preferred Locations */}
              <div>
                <h4 className="font-semibold mb-3">Preferred Locations</h4>
                <div className="flex gap-2 mb-3">
                  <Select value={newLocation} onValueChange={setNewLocation}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Add location..." />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addLocation} className="bg-secondary-c hover:bg-secondary-c-hover">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {preferences.locations.map((loc, index) => (
                    <Badge key={index} className="flex items-center gap-1 bg-purple-100 text-purple-800">
                      {loc}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeLocation(index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Work Type</label>
                  <Select value={preferences.workType} onValueChange={(value) => setPreferences({ ...preferences, workType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Visa Status</label>
                  <Select value={preferences.visaStatus} onValueChange={(value) => setPreferences({ ...preferences, visaStatus: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visa status" />
                    </SelectTrigger>
                    <SelectContent>
                      {visaStatuses.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Notice Period</label>
                  <Select value={preferences.noticePeriod} onValueChange={(value) => setPreferences({ ...preferences, noticePeriod: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice period" />
                    </SelectTrigger>
                    <SelectContent>
                      {noticePeriods.map((period) => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-3 block flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Expected Salary Range
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={preferences.salaryRange.min}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      salaryRange: { ...preferences.salaryRange, min: e.target.value }
                    })}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={preferences.salaryRange.max}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      salaryRange: { ...preferences.salaryRange, max: e.target.value }
                    })}
                  />
                  <Select
                    value={preferences.salaryRange.currency}
                    onValueChange={(value) => setPreferences({
                      ...preferences,
                      salaryRange: { ...preferences.salaryRange, currency: value }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6"
          >
            Previous
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </span>
            ) : currentStep === 7 ? (
              'Create Account'
            ) : (
              'Next Step'
            )}
          </Button>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Already have an account? <Link to="/candidate/login" className="text-secondary-c hover:underline font-medium">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}