
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Loader } from "lucide-react";
import { useState } from "react";
import { aiAutofillService } from "@/services/aiAutofillService";

interface CoverLetterSectionProps {
  data: string;
  onChange: (data: string) => void;
  profileData: any;
}

export function CoverLetterSection({ data, onChange, profileData }: CoverLetterSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedCoverLetter = await aiAutofillService.generateCoverLetter(
        profileData.summary || "",
        profileData.experience || [],
        profileData.skills?.technical || [],
        profileData.basicInfo?.role || ""
      );
      onChange(generatedCoverLetter);
    } catch (error) {
      console.error("Failed to generate cover letter:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="w-5 h-5 text-secondary-c" />
          Cover Letter
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAIGenerate}
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
            <strong>Tip:</strong> Your cover letter will be generated based on your profile information. 
            Customize it for specific job applications to highlight relevant experience.
          </p>
        </div>
        
        <Textarea 
          value={data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your personalized cover letter will appear here. Click 'AI Generate' to create one based on your profile..."
          className="min-h-[200px] transition-all duration-200 focus:ring-2 focus:ring-secondary-c/50"
        />
        
        <div className="text-xs text-muted-c-foreground">
          {data?.length || 0}/1000 characters
        </div>
      </CardContent>
    </Card>
  );
}
