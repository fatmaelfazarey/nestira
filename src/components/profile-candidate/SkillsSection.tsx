
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, X, CheckCircle, Award } from "lucide-react";

interface SkillsSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState({ category: 'technical', value: '' });

  const financeSkills = [
    "Financial Modeling", "Risk Management", "Islamic Finance", "Portfolio Management",
    "Valuation", "M&A Analysis", "Credit Analysis", "Investment Banking",
    "Corporate Finance", "Financial Planning", "Budget Analysis", "Cash Flow Analysis"
  ];

  const softwareTools = [
    "Excel Advanced", "Bloomberg Terminal", "SAP", "Tableau", "Power BI",
    "Python", "R", "MATLAB", "VBA", "SQL", "QuickBooks", "Oracle"
  ];

  const certifications = [
    "CFA", "FRM", "CIPA", "ACCA", "CPA", "CAMS", "PMP", "CMA"
  ];

  const addSkill = (category: string, skill: string) => {
    const updated = { ...data };
    if (!updated[category].includes(skill)) {
      updated[category] = [...updated[category], skill];
      onChange(updated);
    }
    setNewSkill({ category, value: '' });
  };

  const removeSkill = (category: string, skillIndex: number) => {
    const updated = { ...data };
    updated[category] = updated[category].filter((_: any, i: number) => i !== skillIndex);
    onChange(updated);
  };

  const SkillInput = ({ category, placeholder, suggestions }: any) => (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input 
          placeholder={placeholder}
          value={newSkill.category === category ? newSkill.value : ''}
          onChange={(e) => setNewSkill({ category, value: e.target.value })}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newSkill.value.trim()) {
              addSkill(category, newSkill.value.trim());
            }
          }}
          className="flex-1 focus:ring-2 focus:ring-secondary-c/50"
        />
        <Button 
          size="sm"
          onClick={() => newSkill.value.trim() && addSkill(category, newSkill.value.trim())}
          className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {suggestions && (
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 6).map((skill: string) => (
            <Button
              key={skill}
              variant="outline"
              size="sm"
              onClick={() => addSkill(category, skill)}
              className="text-xs hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50"
              disabled={data[category].includes(skill)}
            >
              + {skill}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {data[category].map((skill: string, index: number) => (
          <Badge key={index} variant="secondary-c" className="flex items-center gap-1">
            {skill}
            <X 
              className="w-3 h-3 cursor-pointer hover:text-destructive" 
              onClick={() => removeSkill(category, index)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Star className="w-5 h-5 text-secondary-c" />
          Skills & Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Technical Skills */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary-c" />
            Technical Skills
          </h4>
          <SkillInput 
            category="technical"
            placeholder="Add technical skill..."
            suggestions={financeSkills}
          />
        </div>

        {/* Software & Tools */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Software & Tools</h4>
          <SkillInput 
            category="software"
            placeholder="Add software or tool..."
            suggestions={softwareTools}
          />
        </div>

        {/* Certifications */}
        <div>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success" />
            Certifications
          </h4>
          <SkillInput 
            category="certifications"
            placeholder="Add certification..."
            suggestions={certifications}
          />
        </div>

        {/* Languages */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Languages</h4>
          <SkillInput 
            category="languages"
            placeholder="Add language (e.g., Arabic - Native)..."
          />
        </div>

        {/* Skill Verification */}
        <Card className="bg-gradient-to-r from-success/10 to-primary-c/10 border-success/30">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Verify Your Skills</h4>
                  <p className="text-sm text-muted-c-foreground">Take assessments to boost credibility</p>
                </div>
              </div>
              <Button 
                size="sm"
                className="bg-success hover:bg-success/80 text-success-foreground"
              >
                Take Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
