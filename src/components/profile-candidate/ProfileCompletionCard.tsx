
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface ProfileCompletionCardProps {
  completion: number;
}

export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
  const completionItems = [
    { task: "Basic Information", completed: completion >= 25, points: 20 },
    { task: "Professional Summary", completed: completion >= 40, points: 15 },
    { task: "Work Experience", completed: completion >= 60, points: 25 },
    { task: "Education", completed: completion >= 75, points: 15 },
    { task: "Skills & Certifications", completed: completion >= 90, points: 15 },
    { task: "Job Preferences", completed: completion >= 100, points: 10 }
  ];

  return (
    <Card className="animate-scale-in rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">Profile Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-secondary-c mb-2">{completion}%</div>
          <Progress value={completion} className="h-3 mb-2" />
          <p className="text-sm text-muted-c-foreground">
            Complete your profile to stand out
          </p>
        </div>
        
        <div className="space-y-3">
          {completionItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <div className="w-4 h-4 border border-muted-c-foreground rounded-full" />
                )}
                <span className={`text-sm ${item.completed ? 'text-success' : 'text-muted-c-foreground'}`}>
                  {item.task}
                </span>
              </div>
              <span className="text-xs text-muted-c-foreground">+{item.points}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
