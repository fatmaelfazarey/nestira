
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Building, 
  DollarSign,
  Users,
  Calendar,
  ExternalLink,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { EmployerInfoCard } from "./EmployerInfoCard";

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
  employer?: {
    type: "individual" | "company";
    name: string;
    companyName?: string;
    logo?: string;
    industry?: string;
    companySize?: string;
    location?: string;
    description?: string;
    isVerified: boolean;
    linkedinUrl?: string;
    websiteUrl?: string;
    allowMessages?: boolean;
  };
}

interface JobDetailsDialogProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onSave: (jobId: number) => void;
  onApply: (jobId: number) => void;
}

export function JobDetailsDialog({ job, open, onClose, onSave, onApply }: JobDetailsDialogProps) {
  if (!job) return null;

  const getWorkModeColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'remote': return 'bg-success/20 text-success';
      case 'hybrid': return 'bg-warning/20 text-warning';
      case 'on-site': return 'bg-primary-c/20 text-primary-c';
      default: return 'bg-muted-c text-muted-c-foreground';
    }
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time': return 'bg-primary-c/20 text-primary-c';
      case 'part-time': return 'bg-secondary-c/20 text-secondary-c';
      case 'contract': return 'bg-warning/20 text-warning';
      default: return 'bg-muted-c text-muted-c-foreground';
    }
  };

  // Mock employer data - in real implementation, this would come from the job data
  const mockEmployer = job.employer || {
    type: "company" as const,
    name: "HR Manager",
    companyName: job.company,
    logo: undefined,
    industry: "Financial Services",
    companySize: "51-200",
    location: "Dubai, UAE",
    description: "We are a leading financial services company in the MENA region, committed to providing innovative solutions and fostering professional growth.",
    isVerified: Math.random() > 0.5, // Random for demo
    linkedinUrl: "https://linkedin.com/company/" + job.company.toLowerCase().replace(/\s+/g, '-'),
    websiteUrl: "https://" + job.company.toLowerCase().replace(/\s+/g, '') + ".com",
    allowMessages: true
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                {job.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-muted-c-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span className="font-medium text-lg">{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.postedDate}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSave(job.id)}
              className="hover:bg-secondary-c/10 transition-all duration-200"
            >
              {job.saved ? (
                <BookmarkCheck className="w-5 h-5 text-secondary-c" />
              ) : (
                <Bookmark className="w-5 h-5 text-muted-c-foreground hover:text-secondary-c" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Badge className={getEmploymentTypeColor(job.employmentType)}>
              {job.employmentType}
            </Badge>
            <Badge className={getWorkModeColor(job.workMode)}>
              {job.workMode}
            </Badge>
            <Badge variant="outline" className="text-foreground">
              <DollarSign className="w-3 h-3 mr-1" />
              {job.salary}
            </Badge>
            {job.deadline && (
              <Badge variant="destructive">
                <Calendar className="w-3 h-3 mr-1" />
                Deadline: {job.deadline}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-c rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground/90">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills & Tags */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary-c"
                    className="bg-accent-c/50 text-accent-c-foreground hover:bg-accent-c/70 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar with Employer Info */}
          <div className="lg:col-span-1">
            <EmployerInfoCard employer={mockEmployer} />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between pt-4">
          <Button 
            variant="outline"
            onClick={onClose}
            className="hover:bg-muted-c/50 transition-all duration-200"
          >
            Close
          </Button>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Company Website
            </Button>
            <Button 
              onClick={() => onApply(job.id)}
              className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 relative group"
            >
              Easy Apply
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Apply using your Nestira profile in seconds
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
