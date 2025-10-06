
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface ProgressTrackerProps {
  progress: number;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
  const steps = [
    { name: "Personal Info", threshold: 25 },
    { name: "Experience", threshold: 50 },
    { name: "Education", threshold: 75 },
    { name: "Skills", threshold: 100 }
  ];

  return (
    <div className="bg-card rounded-lg border border-border-c p-6 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Resume Progress</h3>
        <span className="text-sm font-medium text-secondary-c">{progress}% Complete</span>
      </div>
      
      <Progress value={progress} className="mb-4" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center gap-2">
            <CheckCircle 
              className={`w-4 h-4 ${
                progress >= step.threshold 
                  ? 'text-success' 
                  : 'text-muted-c-foreground'
              }`}
            />
            <span className={`text-sm ${
              progress >= step.threshold 
                ? 'text-success font-medium' 
                : 'text-muted-c-foreground'
            }`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
