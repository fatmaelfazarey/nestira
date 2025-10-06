
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicInfoSection } from "./BasicInfoSection";
import { ProfessionalSummarySection } from "./ProfessionalSummarySection";
import { CoverLetterSection } from "./CoverLetterSection";
import { IndustrySection } from "./IndustrySection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SkillsSection } from "./SkillsSection";
import { JobPreferencesSection } from "./JobPreferencesSection";
import { VideoSection } from "./VideoSection";
import { BehavioralAssessmentSection } from "./BehavioralAssessmentSection";

interface ProfileFormProps {
  profileData: any;
  onProfileDataChange: (data: any) => void;
}

export function ProfileForm({ profileData, onProfileDataChange }: ProfileFormProps) {
  const updateSection = (section: string, data: any) => {
    onProfileDataChange({
      ...profileData,
      [section]: data
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <BasicInfoSection 
        data={profileData.basicInfo}
        onChange={(data) => updateSection('basicInfo', data)}
      />
      
      <IndustrySection 
        data={profileData.industry}
        onChange={(data) => updateSection('industry', data)}
      />
      
      <ExperienceSection 
        data={profileData.experience}
        onChange={(data) => updateSection('experience', data)}
      />
      
      <EducationSection 
        data={profileData.education}
        onChange={(data) => updateSection('education', data)}
      />
      
      <SkillsSection 
        data={profileData.skills}
        onChange={(data) => updateSection('skills', data)}
      />
      
      <JobPreferencesSection 
        data={profileData.preferences}
        onChange={(data) => updateSection('preferences', data)}
      />
      
      <ProfessionalSummarySection 
        data={profileData.summary}
        onChange={(data) => updateSection('summary', data)}
        profileData={profileData}
      />
      
      <CoverLetterSection 
        data={profileData.coverLetter}
        onChange={(data) => updateSection('coverLetter', data)}
        profileData={profileData}
      />
      
      <BehavioralAssessmentSection 
        data={profileData.behavioral}
        onChange={(data) => updateSection('behavioral', data)}
      />
      
      <VideoSection 
        data={profileData.video}
        onChange={(data) => updateSection('video', data)}
      />
    </div>
  );
}
