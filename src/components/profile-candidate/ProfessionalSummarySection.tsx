
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Loader } from "lucide-react";
import { useState } from "react";
import { aiAutofillService } from "@/services/aiAutofillService";

interface ProfessionalSummarySectionProps {
  data: string;
  onChange: (data: string) => void;
  profileData: any;
}

export function ProfessionalSummarySection({ data, onChange, profileData }: ProfessionalSummarySectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIRegenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedSummary = await aiAutofillService.generatePersonalSummary(
        profileData.skills?.technical || [],
        profileData.experience?.[0]?.company || "",
        profileData.basicInfo?.role || ""
      );
      onChange(generatedSummary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="w-5 h-5 text-secondary-c" />
          Professional Summary
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAIRegenerate}
          disabled={isGenerating}
          className="hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200"
        >
          {isGenerating ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-info-light rounded-lg border border-info/20">
          <p className="text-sm text-info">
            <strong>Tip:</strong> Include your role, years of experience, key expertise, and what makes you unique in the finance sector.
          </p>
        </div>
        
        <Textarea 
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a compelling summary that highlights your finance expertise, achievements, and career goals..."
          className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-secondary-c/50"
        />
        
        <div className="text-xs text-muted-c-foreground">
          {data?.length || 0}/500 characters
        </div>
      </CardContent>
    </Card>
  );
}
