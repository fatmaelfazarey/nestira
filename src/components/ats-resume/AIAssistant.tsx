
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2, Sparkles, Brain } from "lucide-react";
import { aiAutofillService } from "@/services/aiAutofillService";
import { toast } from "sonner";

interface AIAssistantProps {
  onSummaryGenerated: (summary: string) => void;
  onSkillsSuggested: (skills: string[]) => void;
  currentSkills: string[];
  resumeData?: any;
  targetJobTitle?: string;
}

export function AIAssistant({ 
  onSummaryGenerated, 
  onSkillsSuggested, 
  currentSkills, 
  resumeData,
  targetJobTitle 
}: AIAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const experience = resumeData?.experience?.map((exp: any) => `${exp.title} at ${exp.company}`).join(', ') || '';
      const summary = await aiAutofillService.generatePersonalSummary(currentSkills, experience, targetJobTitle);
      onSummaryGenerated(summary);
      toast.success("AI-generated professional summary created!");
    } catch (error) {
      toast.error("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestSkills = async () => {
    setIsSuggesting(true);
    try {
      const suggestions = await aiAutofillService.suggestSkills(currentSkills, targetJobTitle);
      onSkillsSuggested(suggestions);
      toast.success("AI skill suggestions added!");
    } catch (error) {
      toast.error("Failed to suggest skills");
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleOptimizeForATS = async () => {
    setIsOptimizing(true);
    try {
      const content = JSON.stringify(resumeData);
      const result = await aiAutofillService.optimizeForATS(content, targetJobTitle);
      toast.success("Resume optimized for ATS! Check the improvements.");
    } catch (error) {
      toast.error("Failed to optimize resume");
    } finally {
      setIsOptimizing(false);
    }
  };

  const hasResumeData = resumeData?.personalInfo?.fullName || resumeData?.experience?.length > 0;

  return (
    <Card className="shadow-sm border-border-c bg-gradient-to-br from-info-light to-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-secondary-c" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={handleGenerateSummary}
          disabled={isGenerating}
          variant="outline"
          className="w-full"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          Generate Summary
        </Button>
        
        <Button 
          onClick={handleSuggestSkills}
          disabled={isSuggesting}
          variant="outline"
          className="w-full"
        >
          {isSuggesting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          Suggest Skills
        </Button>

        {hasResumeData && (
          <Button 
            onClick={handleOptimizeForATS}
            disabled={isOptimizing}
            variant="outline"
            className="w-full border-secondary-c text-secondary-c hover:bg-secondary-c hover:text-secondary-c-foreground"
          >
            {isOptimizing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Brain className="w-4 h-4 mr-2" />
            )}
            Optimize for ATS
          </Button>
        )}

        <div className="text-xs text-muted-c-foreground mt-3 p-2 bg-background/50 rounded border">
          {targetJobTitle ? (
            <p>🎯 AI optimizing for: <strong>{targetJobTitle}</strong></p>
          ) : (
            <p>💡 Add a target job title for better AI suggestions</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
