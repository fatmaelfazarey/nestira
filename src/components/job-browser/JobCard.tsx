
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Clock, 
  Building, 
  Bookmark, 
  BookmarkCheck,
  ExternalLink,
  Share2,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  country: string;
  currency: string;
  employmentType: string;
  workMode: string;
  postedDate: string;
  salary: string;
  tags: string[];
  description: string;
  requirements: string[];
  saved: boolean;
  savedDate?: string;
  deadline?: string;
  applied?: boolean;
  matchScore: number;
  matchDetails: {
    skillsMatched: string[];
    skillsMissing: string[];
    toolsMatched: string[];
    toolsMissing: string[];
    certificationsMatched: string[];
    certificationsMissing: string[];
    experienceMatch: boolean;
    locationMatch: boolean;
  };
}

interface JobCardProps {
  job: Job;
  onSave: (jobId: number) => void;
  onApply?: (jobId: number) => void;
  onViewDetails?: (jobId: number) => void;
  onMatchScoreClick?: (jobId: number) => void;
  onShare?: (jobId: number) => void;
  getMatchScoreColor: (score: number) => string;
  getMatchScoreLabel: (score: number) => string;
}

export function JobCard({ 
  job, 
  onSave, 
  onApply, 
  onViewDetails, 
  onMatchScoreClick,
  onShare,
  getMatchScoreColor,
  getMatchScoreLabel
}: JobCardProps) {
  const { toast } = useToast();

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

  const getCurrencySymbol = (currency: string) => {
    const symbols = {
      'AED': 'د.إ',
      'SAR': 'ر.س',
      'QAR': 'ر.ق',
      'KWD': 'د.ك',
      'BHD': 'د.ب',
      'EGP': 'ج.م'
    };
    return symbols[currency as keyof typeof symbols] || currency;
  };

  const handleEasyApply = () => {
    if (onApply) {
      onApply(job.id);
    } else {
      toast({
        title: "Easy Apply Started",
        description: `Opening application for ${job.title} at ${job.company}`,
      });
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(job.id);
    } else {
      toast({
        title: "Application Started",
        description: `Starting application for ${job.title} at ${job.company}`,
      });
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(job.id);
    } else {
      toast({
        title: "Job Details",
        description: `Viewing details for ${job.title} at ${job.company}`,
      });
    }
  };

  const handleMatchScoreClick = () => {
    if (onMatchScoreClick) {
      onMatchScoreClick(job.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(job.id);
    }
  };

  const handleUnsave = () => {
    onSave(job.id);
    toast({
      title: "✔️ Job removed from saved list",
      description: `${job.title} at ${job.company} has been removed from your saved jobs`,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {job.title}
                  </h3>
                  {job.applied && (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Applied
                    </Badge>
                  )}
                </div>
                
                {/* Enhanced Match Score Badge - More Clickable */}
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    onClick={handleMatchScoreClick}
                    className={`${getMatchScoreColor(job.matchScore)} hover:scale-110 transition-all duration-200 font-semibold px-4 py-2 h-auto border-2 hover:border-opacity-80 hover:shadow-md group cursor-pointer rounded-md bg-background/80 backdrop-blur-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 group-hover:animate-pulse" />
                      <span className="text-sm font-bold">{job.matchScore}% Match</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                    <div className="text-xs opacity-80 mt-1">
                      {getMatchScoreLabel(job.matchScore)}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={job.saved ? handleUnsave : () => onSave(job.id)}
                className="hover:bg-secondary-c/10 transition-all duration-200"
              >
                {job.saved ? (
                  <BookmarkCheck className="w-5 h-5 text-secondary-c" />
                ) : (
                  <Bookmark className="w-5 h-5 text-muted-c-foreground hover:text-secondary-c" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-4 text-muted-c-foreground mb-3">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.company}</span>
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

            <div className="flex items-center gap-2 mb-4">
              <Badge className={getEmploymentTypeColor(job.employmentType)}>
                {job.employmentType}
              </Badge>
              <Badge className={getWorkModeColor(job.workMode)}>
                {job.workMode}
              </Badge>
              <Badge variant="outline" className="text-foreground">
                {getCurrencySymbol(job.currency)} {job.salary}
              </Badge>
              {job.savedDate && (
                <Badge variant="outline" className="text-xs">
                  Saved: {job.savedDate}
                </Badge>
              )}
            </div>

            <p className="text-foreground mb-4 leading-relaxed">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
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

            {/* Key Requirements with improved visibility */}
            {job.requirements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Key Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, idx) => (
                    <Badge 
                      key={idx} 
                      style={{ 
                        backgroundColor: '#ff5f1b', 
                        color: 'white',
                        border: '1px solid #ff5f1b'
                      }}
                      className="hover:bg-[#b23e00] transition-colors"
                    >
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button 
                onClick={handleEasyApply}
                className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 relative group"
              >
                Easy Apply
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Apply using your Nestira profile in seconds
                </div>
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleViewDetails}
                className="hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
