
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Lightbulb } from "lucide-react";

export function ATSOptimizationTips() {
  const tips = [
    "Use standard section headings",
    "Include relevant keywords",
    "Use simple formatting",
    "Avoid images and graphics",
    "Save as .docx or .pdf"
  ];

  return (
    <Card className="shadow-sm border-border-c">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning" />
          ATS Optimization Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-success flex-shrink-0" />
            <span className="text-sm text-foreground">{tip}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
