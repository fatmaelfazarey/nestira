
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, X, Calendar } from "lucide-react";

interface ExperienceSectionProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function ExperienceSection({ data, onChange }: ExperienceSectionProps) {
  const addExperience = () => {
    const newExp = {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      achievements: [""]
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...data];
    updated[expIndex].achievements.push("");
    onChange(updated);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...data];
    updated[expIndex].achievements[achIndex] = value;
    onChange(updated);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...data];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_: any, i: number) => i !== achIndex);
    onChange(updated);
  };

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-secondary-c" />
          Work Experience
        </CardTitle>
        <Button 
          size="sm"
          onClick={addExperience}
          className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((exp, index) => (
          <Card key={index} className="border hover:shadow-md transition-all duration-200 rounded-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-foreground">Experience {index + 1}</h4>
                {data.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeExperience(index)}
                    className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input 
                  placeholder="Job Title *"
                  value={exp.title}
                  onChange={(e) => updateExperience(index, 'title', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <Input 
                  placeholder="Company Name *"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <Input 
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Current Position</label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Start Date</label>
                  <Input 
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                    className="focus:ring-2 focus:ring-secondary-c/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">End Date</label>
                  <Input 
                    type="month"
                    value={exp.current ? "" : exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="focus:ring-2 focus:ring-secondary-c/50"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Key Achievements</label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => addAchievement(index)}
                    className="hover:bg-secondary-c/10 hover:text-secondary-c"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                {exp.achievements.map((achievement: string, achIndex: number) => (
                  <div key={achIndex} className="flex gap-2">
                    <Textarea 
                      placeholder="• Describe your achievement with specific metrics and impact..."
                      value={achievement}
                      onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                      className="min-h-[60px] flex-1 focus:ring-2 focus:ring-secondary-c/50"
                    />
                    {exp.achievements.length > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeAchievement(index, achIndex)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {data.length === 0 && (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 text-muted-c-foreground mx-auto mb-4" />
            <p className="text-muted-c-foreground mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
