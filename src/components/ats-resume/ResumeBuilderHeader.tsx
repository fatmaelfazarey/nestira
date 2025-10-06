
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSpreadsheet, Upload, Download, Eye, Target } from "lucide-react";

interface ResumeBuilderHeaderProps {
  onBuildFromScratch: () => void;
  onUploadCV: () => void;
  onPreview: () => void;
  onDownload: () => void;
  atsScore: number;
  targetJobTitle: string;
  onTargetJobTitleChange: (title: string) => void;
}

export function ResumeBuilderHeader({ 
  onBuildFromScratch, 
  onUploadCV, 
  onPreview, 
  onDownload, 
  atsScore,
  targetJobTitle,
  onTargetJobTitleChange
}: ResumeBuilderHeaderProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <FileSpreadsheet className="w-8 h-8 text-primary-c" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Resume Maker</h1>
          <p className="text-muted-c-foreground">Create an ATS-optimized resume for finance professionals with AI assistance</p>
        </div>
      </div>

      {/* Target Job Title */}
      <Card className="border-secondary-c/20 bg-secondary-c/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-secondary-c" />
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Target Job Title (helps optimize ATS score)
              </label>
              <Input
                placeholder="e.g., Senior Financial Analyst, Investment Banking Associate"
                value={targetJobTitle}
                onChange={(e) => onTargetJobTitleChange(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entry Points */}
      <Card className="border-border-c shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={onBuildFromScratch}
              className="h-auto p-4 bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground flex-col items-start text-left"
            >
              <FileSpreadsheet className="w-6 h-6 mb-2" />
              <div>
                <div className="font-semibold">Build from Scratch</div>
                <div className="text-sm opacity-90">Guided form with AI assistance and industry templates</div>
              </div>
            </Button>
            
            <Button 
              onClick={onUploadCV}
              variant="outline"
              className="h-auto p-4 flex-col items-start text-left hover:bg-accent-c"
            >
              <Upload className="w-6 h-6 mb-2" />
              <div>
                <div className="font-semibold">Upload Resume for Auto-Fill</div>
                <div className="text-sm text-muted-c-foreground">AI will parse and optimize your existing resume</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border-c shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-c-foreground">ATS Score:</div>
            <div className={`text-lg font-bold ${atsScore >= 80 ? 'text-success' : atsScore >= 60 ? 'text-warning' : 'text-destructive'}`}>
              {atsScore}%
            </div>
          </div>
          {targetJobTitle && (
            <div className="text-sm text-muted-c-foreground">
              Targeting: <span className="font-medium text-foreground">{targetJobTitle}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={onPreview} variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={onDownload} className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
