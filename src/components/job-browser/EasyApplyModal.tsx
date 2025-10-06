
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Upload, 
  Briefcase,
  DollarSign,
  TrendingUp,
  X,
  Send,
  CheckCircle,
  Mic,
  Video,
  MessageSquare,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: number;
  title: string;
  company: string;
  matchScore: number;
}

interface EasyApplyModalProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (jobId: number) => void;
}

// Mock profile data - in real app, this would come from profile context/API
const mockProfileData = {
  fullName: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+971 50 123 4567",
  location: "Dubai, UAE",
  resume: "Sarah_Johnson_Resume.pdf",
  preferredTitles: ["Financial Analyst", "Investment Analyst", "Risk Analyst"],
  expectedSalary: "AED 15,000 - 22,000",
  workMode: "Hybrid",
  summary: "Experienced financial analyst with 5+ years in investment banking and risk management. CFA Level 2 candidate with expertise in financial modeling and market analysis.",
  skills: ["Financial Modeling", "Excel/VBA", "Risk Assessment", "Bloomberg Terminal", "Python"],
  certifications: ["CFA Level 1", "FRM Part 1"],
  availability: "Available immediately"
};

export function EasyApplyModal({ job, open, onClose, onSubmit }: EasyApplyModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: mockProfileData.fullName,
    email: mockProfileData.email,
    phone: mockProfileData.phone,
    location: mockProfileData.location,
    message: "",
    messageType: "text" as "text" | "voice" | "video",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please consent to share your profile with the recruiter",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(job.id);
    onClose();
    
    toast({
      title: "✅ Application Sent Successfully!",
      description: `Your application for ${job.title} at ${job.company} has been submitted.`,
    });
    
    setIsSubmitting(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const handleMessageTypeChange = (type: "text" | "voice" | "video") => {
    setFormData(prev => ({ ...prev, messageType: type, message: "" }));
  };

  const handleEditProfile = () => {
    // Navigate to profile page
    window.location.href = '/profile';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Easy Apply
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-secondary-c/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Match Score */}
          <div className="flex items-center justify-center">
            <Badge 
              className={`${getMatchScoreColor(job.matchScore)} bg-background border-2 px-4 py-2 text-sm font-semibold`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              {job.matchScore}% Match for this role
            </Badge>
          </div>

          <div className="text-center">
            <p className="text-muted-c-foreground">
              Applying for <span className="font-medium text-foreground">{job.title}</span> at{" "}
              <span className="font-medium text-foreground">{job.company}</span>
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary-c" />
                Basic Information
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleEditProfile}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="bg-muted-c/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-muted-c/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-muted-c/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-muted-c/30"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Resume Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-c" />
              Resume
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-muted-c/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary-c" />
                <div>
                  <p className="font-medium text-foreground">{mockProfileData.resume}</p>
                  <p className="text-sm text-muted-c-foreground">Last updated: Jan 15, 2024</p>
                </div>
              </div>
              <Button variant="outline" size="sm" type="button">
                <Upload className="w-4 h-4 mr-2" />
                Replace
              </Button>
            </div>
          </div>

          <Separator />

          {/* Job Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-c" />
              Job Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-muted-c-foreground">Preferred Titles</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {mockProfileData.preferredTitles.slice(0, 2).map((title) => (
                    <Badge key={title} variant="secondary-c" className="text-xs">
                      {title}
                    </Badge>
                  ))}
                  {mockProfileData.preferredTitles.length > 2 && (
                    <Badge variant="secondary-c" className="text-xs">
                      +{mockProfileData.preferredTitles.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-c-foreground">Expected Salary</Label>
                <p className="text-sm font-medium text-foreground mt-2">{mockProfileData.expectedSalary}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-c-foreground">Work Mode</Label>
                <p className="text-sm font-medium text-foreground mt-2">{mockProfileData.workMode}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Quick Preview</h3>
            
            <div className="bg-muted-c/30 rounded-lg p-4 space-y-3">
              <div>
                <Label className="text-sm text-muted-c-foreground">Professional Summary</Label>
                <p className="text-sm text-foreground mt-1">{mockProfileData.summary}</p>
              </div>
              
              <div>
                <Label className="text-sm text-muted-c-foreground">Key Skills</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {mockProfileData.skills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-muted-c-foreground">Certifications</Label>
                <div className="flex flex-wrap gap-1 mt-2">
                  {mockProfileData.certifications.map((cert) => (
                    <Badge key={cert} className="text-xs bg-primary-c/20 text-primary-c">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm text-muted-c-foreground">Availability</Label>
                <p className="text-sm font-medium text-success mt-1">{mockProfileData.availability}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Message to Recruiter */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-c" />
              Message to Recruiter
            </h3>
            
            {/* Message Type Selection */}
            <div className="flex items-center gap-2 mb-4">
              <Button
                type="button"
                variant={formData.messageType === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMessageTypeChange("text")}
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Text
              </Button>
              <Button
                type="button"
                variant={formData.messageType === "voice" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMessageTypeChange("voice")}
                className="flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                Voice Note
              </Button>
              <Button
                type="button"
                variant={formData.messageType === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMessageTypeChange("video")}
                className="flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Video
              </Button>
            </div>

            {/* Message Input Based on Type */}
            <div className="space-y-2">
              {formData.messageType === "text" && (
                <Textarea
                  placeholder="Write your message to the recruiter..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="bg-muted-c/30"
                />
              )}
              
              {formData.messageType === "voice" && (
                <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
                  <div className="text-center">
                    <Mic className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-c-foreground mb-4">Record a voice message</p>
                    <Button type="button" variant="outline" size="sm">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  </div>
                </div>
              )}
              
              {formData.messageType === "video" && (
                <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
                  <div className="text-center">
                    <Video className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-c-foreground mb-4">Record a video message</p>
                    <Button type="button" variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I consent to share my profile and documents with the recruiter
              </Label>
              <p className="text-xs text-muted-c-foreground">
                Your information will only be shared with the hiring company for this specific role.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={!formData.consent || isSubmitting}
              className="flex-1 bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending Application...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Application
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
