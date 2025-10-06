
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Plus, X } from "lucide-react";

interface EducationSectionProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const addEducation = () => {
    const newEdu = {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      gpa: ""
    };
    onChange([...data, newEdu]);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-secondary-c" />
          Education
        </CardTitle>
        <Button 
          size="sm"
          onClick={addEducation}
          className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((edu, index) => (
          <Card key={index} className="border hover:shadow-md transition-all duration-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-foreground">Education {index + 1}</h4>
                {data.length > 1 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Degree/Certificate *"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <Input 
                  placeholder="Institution *"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <Input 
                  placeholder="Start Year"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <Input 
                  placeholder="End Year"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
                <Input 
                  placeholder="GPA (optional)"
                  value={edu.gpa}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                  className="focus:ring-2 focus:ring-secondary-c/50"
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        {data.length === 0 && (
          <div className="text-center py-8">
            <GraduationCap className="w-12 h-12 text-muted-c-foreground mx-auto mb-4" />
            <p className="text-muted-c-foreground mb-4">No education added yet</p>
            <Button onClick={addEducation} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your Education
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
