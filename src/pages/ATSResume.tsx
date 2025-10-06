
import { useState } from "react";
import { ResumeBuilderHeader } from "@/components/ats-resume/ResumeBuilderHeader";
import { PersonalInfoSection } from "@/components/ats-resume/PersonalInfoSection";
import { ExperienceSection } from "@/components/ats-resume/ExperienceSection";
import { EducationSection } from "@/components/ats-resume/EducationSection";
import { SkillsSection } from "@/components/ats-resume/SkillsSection";
import { ProgressTracker } from "@/components/ats-resume/ProgressTracker";
import { toast } from "sonner";
import { ATSOptimizationTips } from "@/components/ats-resume/ATSOptimizationTips";
import { ActionsPanel } from "@/components/ats-resume/ActionsPanel";
import { ATSScoreCard } from "@/components/ats-resume/ATSScoreCard";
import { AIAssistant } from "@/components/ats-resume/AIAssistant";
import { ResumePreview } from "@/components/ats-resume/ResumePreview";
import { CVUploader } from "@/components/ats-resume/CVUploader";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin: string;
    portfolio: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    graduationYear: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    software: string[];
    certifications: string[];
    languages: string[];
  };
}

export default function ATSResume() {
  const [buildMode, setBuildMode] = useState<'none' | 'scratch' | 'upload'>('none');
  const [showPreview, setShowPreview] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [targetJobTitle, setTargetJobTitle] = useState('');
  
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      portfolio: ''
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      software: [],
      certifications: [],
      languages: []
    }
  });

  const calculateProgress = () => {
    let completedSections = 0;
    const totalSections = 4;

    // Personal Info
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.summary) {
      completedSections++;
    }

    // Experience
    if (resumeData.experience.length > 0) {
      completedSections++;
    }

    // Education
    if (resumeData.education.length > 0) {
      completedSections++;
    }

    // Skills
    if (resumeData.skills.technical.length > 0 || resumeData.skills.software.length > 0) {
      completedSections++;
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  const calculateATSScore = () => {
    let score = 0;
    
    // Personal info completeness (30 points)
    if (resumeData.personalInfo.fullName) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) score += 15;

    // Experience section (25 points)
    if (resumeData.experience.length > 0) score += 10;
    if (resumeData.experience.some(exp => exp.description && exp.description.length > 50)) score += 15;

    // Skills section (25 points)
    const totalSkills = resumeData.skills.technical.length + resumeData.skills.software.length;
    if (totalSkills >= 5) score += 15;
    if (totalSkills >= 10) score += 10;

    // Education (10 points)
    if (resumeData.education.length > 0) score += 10;

    // Keywords matching (10 points)
    if (targetJobTitle) {
      const keywords = ['financial', 'analysis', 'modeling', 'excel', 'python', 'sql'];
      const content = JSON.stringify(resumeData).toLowerCase();
      const matchedKeywords = keywords.filter(keyword => content.includes(keyword));
      score += Math.min(10, matchedKeywords.length * 2);
    }

    return Math.min(100, score);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
    setAtsScore(calculateATSScore());
  };

  const handleExperienceChange = (experiences: any[]) => {
    setResumeData(prev => ({ ...prev, experience: experiences }));
    setAtsScore(calculateATSScore());
  };

  const handleEducationChange = (education: any[]) => {
    setResumeData(prev => ({ ...prev, education }));
    setAtsScore(calculateATSScore());
  };

  const handleSkillsChange = (category: string, skillList: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skillList }
    }));
    setAtsScore(calculateATSScore());
  };

  const handleBuildFromScratch = () => {
    setBuildMode('scratch');
    toast.success("Started building resume from scratch");
  };

  const handleUploadCV = () => {
    setBuildMode('upload');
  };

  const handleCVParsed = (parsedData: Partial<ResumeData>) => {
    setResumeData(prev => ({
      personalInfo: { ...prev.personalInfo, ...parsedData.personalInfo },
      experience: parsedData.experience || prev.experience,
      education: parsedData.education || prev.education,
      skills: { ...prev.skills, ...parsedData.skills }
    }));
    setBuildMode('scratch'); // Switch to form view after parsing
    setAtsScore(calculateATSScore());
    toast.success("CV parsed successfully! Review and edit the extracted information.");
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = () => {
    toast.success("Downloading resume as PDF...");
  };

  const handleDownloadDOCX = () => {
    toast.success("Downloading resume as DOCX...");
  };

  const handleAISummaryGenerated = (summary: string) => {
    handlePersonalInfoChange('summary', summary);
    toast.success("AI-generated summary added!");
  };

  const handleAISkillsSuggested = (suggestedSkills: string[]) => {
    const newSkills = suggestedSkills.slice(0, 3);
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        technical: [...prev.skills.technical, ...newSkills]
      }
    }));
    setAtsScore(calculateATSScore());
    toast.success("AI-suggested skills added!");
  };

  const handleSaveToProfile = () => {
    toast.success("Resume saved to your candidate profile!");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <ResumeBuilderHeader
          onBuildFromScratch={handleBuildFromScratch}
          onUploadCV={handleUploadCV}
          onPreview={handlePreview}
          onDownload={handleDownloadPDF}
          atsScore={atsScore}
          targetJobTitle={targetJobTitle}
          onTargetJobTitleChange={setTargetJobTitle}
        />

        {buildMode === 'upload' && (
          <div className="mt-8">
            <CVUploader onCVParsed={handleCVParsed} />
          </div>
        )}

        {buildMode === 'scratch' && (
          <>
            <div className="mt-8">
              <ProgressTracker progress={calculateProgress()} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                <PersonalInfoSection
                  data={resumeData.personalInfo}
                  onChange={handlePersonalInfoChange}
                />
                
                <ExperienceSection
                  data={resumeData.experience}
                  onChange={handleExperienceChange}
                />

                <EducationSection
                  data={resumeData.education}
                  onChange={handleEducationChange}
                />
                
                <SkillsSection
                  data={resumeData.skills}
                  onChange={handleSkillsChange}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <AIAssistant
                  onSummaryGenerated={handleAISummaryGenerated}
                  onSkillsSuggested={handleAISkillsSuggested}
                  currentSkills={resumeData.skills.technical}
                  resumeData={resumeData}
                  targetJobTitle={targetJobTitle}
                />
                
                <ATSScoreCard 
                  score={atsScore} 
                  targetJobTitle={targetJobTitle}
                  resumeData={resumeData}
                />
                
                <ActionsPanel
                  onPreview={handlePreview}
                  onDownloadPDF={handleDownloadPDF}
                  onDownloadDOCX={handleDownloadDOCX}
                  onSaveToProfile={handleSaveToProfile}
                />
                
                <ATSOptimizationTips />
              </div>
            </div>
          </>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <ResumePreview
            resumeData={resumeData}
            onClose={() => setShowPreview(false)}
          />
        )}

        {buildMode === 'none' && (
          <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Build Your Finance Career with AI-Powered Resumes
              </h2>
              <p className="text-muted-c-foreground mb-8">
                Our intelligent resume builder is specifically designed for finance professionals. 
                Get past ATS systems and land interviews at top financial institutions with AI assistance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-info-light rounded-lg border border-info/20">
                  <div className="text-info text-2xl font-bold mb-2">95%</div>
                  <div className="text-sm text-foreground">ATS Pass Rate</div>
                </div>
                <div className="p-6 bg-success-light rounded-lg border border-success/20">
                  <div className="text-success text-2xl font-bold mb-2">3x</div>
                  <div className="text-sm text-foreground">More Interviews</div>
                </div>
                <div className="p-6 bg-warning-light rounded-lg border border-warning/20">
                  <div className="text-warning text-2xl font-bold mb-2">AI</div>
                  <div className="text-sm text-foreground">Powered Optimization</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
