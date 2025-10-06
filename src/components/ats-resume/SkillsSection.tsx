
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Award } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";
import { VisualTag } from "./VisualTag";

interface SkillsSectionProps {
  data: {
    technical: string[];
    software: string[];
    certifications: string[];
    languages: string[];
  };
  onChange: (category: string, skills: string[]) => void;
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkills, setNewSkills] = useState({
    technical: '',
    software: '',
    certifications: '',
    languages: ''
  });

  const hasData = Object.values(data).some(arr => arr.length > 0);

  const addSkill = (category: keyof typeof data) => {
    const skill = newSkills[category].trim();
    if (skill && !data[category].includes(skill)) {
      onChange(category, [...data[category], skill]);
      setNewSkills(prev => ({ ...prev, [category]: '' }));
    }
  };

  const removeSkill = (category: keyof typeof data, index: number) => {
    const updated = data[category].filter((_, i) => i !== index);
    onChange(category, updated);
  };

  const skillCategories = [
    { key: 'technical' as const, label: 'Technical Skills', variant: 'skill' as const, placeholder: 'e.g., Financial Modeling, Risk Management' },
    { key: 'software' as const, label: 'Software & Tools', variant: 'tool' as const, placeholder: 'e.g., Excel, Bloomberg, Python' },
    { key: 'certifications' as const, label: 'Certifications', variant: 'certification' as const, placeholder: 'e.g., CFA, FRM' },
    { key: 'languages' as const, label: 'Languages', variant: 'industry' as const, placeholder: 'e.g., English (Native), Spanish (Fluent)' }
  ];

  return (
    <CollapsibleSection
      title="Skills & Expertise"
      icon={<Award className="w-5 h-5 text-primary-c" />}
      hasData={hasData}
      isValid={data.technical.length > 0}
    >
      <div className="space-y-6">
        {skillCategories.map(({ key, label, variant, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-medium text-foreground mb-3 block">
              {label}
            </label>
            
            <div className="flex gap-2 mb-3">
              <Input
                placeholder={placeholder}
                value={newSkills[key]}
                onChange={(e) => setNewSkills(prev => ({ ...prev, [key]: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && addSkill(key)}
                className="transition-all duration-200 focus:shadow-sm"
              />
              <Button
                onClick={() => addSkill(key)}
                size="sm"
                className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {data[key].map((skill, index) => (
                <VisualTag
                  key={index}
                  label={skill}
                  variant={variant}
                  removable
                  onRemove={() => removeSkill(key, index)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
