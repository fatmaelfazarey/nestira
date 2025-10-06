import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, AlertTriangle, Target, TrendingUp } from "lucide-react";

interface ATSScoreCardProps {
  score: number;
  targetJobTitle?: string;
  resumeData?: any;
}

export function ATSScoreCard({ score, targetJobTitle, resumeData }: ATSScoreCardProps) {
  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-secondary-c";
    return "text-destructive";
  };

  const getScoreText = () => {
    if (score >= 80) return "Excellent ATS compatibility";
    if (score >= 60) return "Good ATS compatibility";
    if (score >= 40) return "Fair ATS compatibility";
    return "Needs improvement";
  };

  const generateImprovements = () => {
    const improvements = [];
    
    if (!resumeData?.personalInfo?.summary || resumeData.personalInfo.summary.length < 50) {
      improvements.push({ text: "Add professional summary", status: "incomplete" });
    } else {
      improvements.push({ text: "Professional summary complete", status: "complete" });
    }

    if (resumeData?.experience?.length < 2) {
      improvements.push({ text: "Add more work experience", status: "incomplete" });
    } else {
      improvements.push({ text: "Work experience documented", status: "complete" });
    }

    const totalSkills = (resumeData?.skills?.technical?.length || 0) + (resumeData?.skills?.software?.length || 0);
    if (totalSkills < 5) {
      improvements.push({ text: "Add more relevant skills", status: "incomplete" });
    } else {
      improvements.push({ text: "Skills section well-populated", status: "complete" });
    }

    if (targetJobTitle) {
      const hasKeywords = JSON.stringify(resumeData).toLowerCase().includes(targetJobTitle.toLowerCase().split(' ')[0]);
      improvements.push({ 
        text: `Keywords for "${targetJobTitle}" ${hasKeywords ? 'detected' : 'missing'}`, 
        status: hasKeywords ? "complete" : "incomplete" 
      });
    }

    return improvements.slice(0, 4);
  };

  const improvements = generateImprovements();

  return (
    <Card className="shadow-sm border-border-c/50 rounded-xl bg-card-blue">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-c" />
          ATS Score
          {targetJobTitle && <TrendingUp className="w-4 h-4 text-secondary-c" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor()}`}>
            {score}%
          </div>
          <div className="text-sm text-muted-c-foreground mt-1">
            {getScoreText()}
          </div>
          {targetJobTitle && (
            <div className="text-xs text-secondary-c mt-1">
              Optimized for {targetJobTitle}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {improvements.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              {item.status === "complete" ? (
                <Check className="w-4 h-4 text-success flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-secondary-c flex-shrink-0" />
              )}
              <span className={`text-sm ${item.status === "complete" ? "text-foreground" : "text-secondary-c"}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {score < 80 && (
          <div className="p-3 bg-earnings rounded-xl border border-secondary-c/20 mt-4">
            <p className="text-sm text-earnings-foreground">
              <strong>Tip:</strong> {score < 40 ? 'Complete basic sections first' : 'Add industry keywords and quantify achievements'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
