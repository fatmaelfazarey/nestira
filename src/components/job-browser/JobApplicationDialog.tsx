
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Building, 
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  Sparkles,
  Send,
  Loader2
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  employmentType: string;
  workMode: string;
  postedDate: string;
  salary: string;
  tags: string[];
  description: string;
  requirements: string[];
  saved: boolean;
  deadline?: string;
}

interface JobApplicationDialogProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (jobId: number) => void;
}

export function JobApplicationDialog({ job, open, onClose, onSubmit }: JobApplicationDialogProps) {
  const { toast } = useToast();
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    experience: "5 years in financial analysis"
  });

  if (!job) return null;

  const generateCoverLetter = async () => {
    setIsGeneratingCoverLetter(true);
    
    // Simulate AI cover letter generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${job.title} position at ${job.company}. With ${personalInfo.experience} and expertise in ${job.tags.slice(0, 3).join(', ')}, I am confident that I would be a valuable addition to your team.

In my previous roles, I have developed strong analytical skills and hands-on experience with financial modeling, risk assessment, and market analysis. My background aligns well with your requirements for ${job.tags.slice(0, 2).join(' and ')}, and I am particularly excited about the opportunity to contribute to ${job.company}'s continued success in ${job.location}.

Key qualifications that make me an ideal candidate:
• Proven track record in financial analysis and reporting
• Strong proficiency in ${job.tags.slice(0, 2).join(' and ')}
• Experience working in ${job.workMode.toLowerCase()} environments
• Excellent problem-solving and communication skills

I am eager to discuss how my skills and passion for finance can contribute to your team's objectives. Thank you for considering my application.

Best regards,
${personalInfo.fullName}`;

    setCoverLetter(aiCoverLetter);
    setIsGeneratingCoverLetter(false);
    
    toast({
      title: "Cover Letter Generated!",
      description: "AI has created a personalized cover letter for you. Review and edit as needed.",
    });
  };

  const handleSubmit = () => {
    if (!coverLetter.trim()) {
      toast({
        title: "Cover Letter Required",
        description: "Please generate or write a cover letter before submitting.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(job.id);
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} at ${job.company} has been successfully submitted.`,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Apply for {job.title}
          </DialogTitle>
          <div className="flex items-center gap-4 text-muted-c-foreground">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          {/* Personal Information Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Summary</Label>
                  <Input
                    id="experience"
                    value={personalInfo.experience}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, experience: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Cover Letter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Cover Letter
                </CardTitle>
                <Button
                  onClick={generateCoverLetter}
                  disabled={isGeneratingCoverLetter}
                  className="bg-primary-c hover:bg-primary-c/90 text-primary-c-foreground"
                  size="sm"
                >
                  {isGeneratingCoverLetter ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Cover Letter
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {!coverLetter && (
                  <div className="text-center py-8 text-muted-c-foreground">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Click "Generate AI Cover Letter" to create a personalized cover letter</p>
                    <p className="text-sm">tailored specifically for this {job.title} position</p>
                  </div>
                )}
                <Textarea
                  placeholder="Your cover letter will appear here..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Skills: {job.tags.slice(0, 3).join(', ')}</Badge>
                  <Badge variant="outline">Experience: {personalInfo.experience}</Badge>
                  <Badge variant="outline">Role: {job.title}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline"
            onClick={onClose}
            className="hover:bg-muted-c/50 transition-all duration-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
