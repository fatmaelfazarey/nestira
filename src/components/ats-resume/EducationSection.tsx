
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

interface EducationItem {
  degree: string;
  institution: string;
  graduationYear: string;
  gpa?: string;
}

interface EducationSectionProps {
  data: EducationItem[];
  onChange: (education: EducationItem[]) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const hasData = data.length > 0;

  const addEducation = () => {
    const newEducation: EducationItem = {
      degree: '',
      institution: '',
      graduationYear: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (index: number, field: keyof EducationItem, value: string) => {
    const updated = data.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <CollapsibleSection
      title="Education"
      icon={<GraduationCap className="w-5 h-5 text-primary-c" />}
      hasData={hasData}
      isValid={data.length > 0 && data.every(edu => edu.degree && edu.institution)}
    >
      <div className="space-y-6">
        {data.map((education, index) => (
          <div key={index} className="p-4 border border-border-c rounded-lg bg-card/50">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-sm font-medium text-foreground">Education {index + 1}</h4>
              <Button
                onClick={() => removeEducation(index)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Degree *
                </label>
                <Input
                  placeholder="Master of Finance"
                  value={education.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Institution *
                </label>
                <Input
                  placeholder="NYU Stern School of Business"
                  value={education.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Graduation Year
                </label>
                <Input
                  type="number"
                  placeholder="2023"
                  min="1950"
                  max="2030"
                  value={education.graduationYear}
                  onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  GPA (Optional)
                </label>
                <Input
                  placeholder="3.8"
                  value={education.gpa || ''}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={addEducation}
          variant="outline"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
    </CollapsibleSection>
  );
}
