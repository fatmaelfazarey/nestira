
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText, Save } from "lucide-react";

interface ActionsPanelProps {
  onPreview: () => void;
  onDownloadPDF: () => void;
  onDownloadDOCX: () => void;
  onSaveToProfile: () => void;
}

export function ActionsPanel({ onPreview, onDownloadPDF, onDownloadDOCX, onSaveToProfile }: ActionsPanelProps) {
  return (
    <Card className="shadow-sm border-border-c">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onPreview}
          className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview Resume
        </Button>
        
        <Button 
          onClick={onDownloadPDF}
          variant="outline"
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        
        <Button 
          onClick={onDownloadDOCX}
          variant="outline"
          className="w-full"
        >
          <FileText className="w-4 h-4 mr-2" />
          Download DOCX
        </Button>

        <Button 
          onClick={onSaveToProfile}
          variant="outline" 
          className="w-full border-success text-success hover:bg-success hover:text-success-foreground"
        >
          <Save className="w-4 h-4 mr-2" />
          Save to Profile
        </Button>
      </CardContent>
    </Card>
  );
}
