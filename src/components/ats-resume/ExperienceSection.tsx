
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceSectionProps {
  data: ExperienceItem[];
  onChange: (experiences: ExperienceItem[]) => void;
}

export function ExperienceSection({ data, onChange }: ExperienceSectionProps) {
  const hasData = data.length > 0;

  const addExperience = () => {
    const newExperience: ExperienceItem = {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (index: number, field: keyof ExperienceItem, value: string | boolean) => {
    const updated = data.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <CollapsibleSection
      title="Work Experience"
      icon={<Briefcase className="w-5 h-5 text-primary-c" />}
      hasData={hasData}
      isValid={data.length > 0 && data.every(exp => exp.title && exp.company)}
    >
      <div className="space-y-6">
        {data.map((experience, index) => (
          <div key={index} className="p-4 border border-border rounded-lg bg-card/50">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-sm font-medium text-foreground">Experience {index + 1}</h4>
              <Button
                onClick={() => removeExperience(index)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Job Title *
                </label>
                <Input
                  placeholder="Senior Financial Analyst"
                  value={experience.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Company *
                </label>
                <Input
                  placeholder="Goldman Sachs"
                  value={experience.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Location
                </label>
                <Input
                  placeholder="New York, NY"
                  value={experience.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Start Date
                </label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${index}`}
                  checked={experience.current}
                  onCheckedChange={(checked) => updateExperience(index, 'current', !!checked)}
                />
                <label
                  htmlFor={`current-${index}`}
                  className="text-sm font-medium text-foreground"
                >
                  I currently work here
                </label>
              </div>
              
              {!experience.current && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    End Date
                  </label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Job Description
              </label>
              <Textarea
                placeholder="• Conducted financial analysis and modeling for M&A transactions worth $500M+&#10;• Developed automated reporting systems reducing analysis time by 40%&#10;• Collaborated with cross-functional teams on strategic investment decisions"
                className="min-h-[120px]"
                value={experience.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
              />
              <p className="text-xs text-muted-c-foreground mt-1">
                Use bullet points and quantify your achievements where possible
              </p>
            </div>
          </div>
        ))}

        <Button
          onClick={addExperience}
          variant="outline"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </CollapsibleSection>
  );
}
