import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  MapPin, 
  Clock, 
  Building, 
  Star,
  ExternalLink,
  Share2,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Filter,
  Calendar,
  Target,
  Award
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

interface SavedJobsTabProps {
  jobs: Job[];
  onSave: (jobId: number) => void;
  onApply?: (jobId: number) => void;
  onViewDetails?: (jobId: number) => void;
  onMatchScoreClick?: (jobId: number) => void;
  onShare?: (jobId: number) => void;
  getMatchScoreColor: (score: number) => string;
  getMatchScoreLabel: (score: number) => string;
}

export function SavedJobsTab({ 
  jobs, 
  onSave, 
  onApply, 
  onViewDetails, 
  onMatchScoreClick,
  onShare,
  getMatchScoreColor,
  getMatchScoreLabel
}: SavedJobsTabProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'applied'>('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'all') {
      return matchesSearch;
    } else if (activeFilter === 'high') {
      return matchesSearch && job.matchScore >= 80;
    } else if (activeFilter === 'applied') {
      return matchesSearch && job.applied;
    }

    return matchesSearch;
  });

  const handleUnsave = (jobId: number) => {
    onSave(jobId);
    toast({
      title: "✔️ Job removed from saved list",
      description: `Job has been removed from your saved jobs`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
            activeFilter === 'all' ? 'border-primary-c bg-primary-c/5' : 'hover:border-primary-c/50'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5 text-secondary-c" />
              <h3 className="font-medium text-sm text-muted-c-foreground">Total Saved</h3>
            </div>
            <p className="text-2xl font-bold text-secondary-c">{jobs.length}</p>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
            activeFilter === 'high' ? 'border-success bg-success/5' : 'hover:border-success/50'
          }`}
          onClick={() => setActiveFilter('high')}
        >
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5 text-success" />
              <h3 className="font-medium text-sm text-muted-c-foreground">High Match</h3>
            </div>
            <p className="text-2xl font-bold text-success">{jobs.filter(job => job.matchScore >= 80).length}</p>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
            activeFilter === 'applied' ? 'border-warning bg-warning/5' : 'hover:border-warning/50'
          }`}
          onClick={() => setActiveFilter('applied')}
        >
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-warning" />
              <h3 className="font-medium text-sm text-muted-c-foreground">Applied</h3>
            </div>
            <p className="text-2xl font-bold text-warning">{jobs.filter(job => job.applied).length}</p>
          </CardContent>
        </Card>

        <Card className="bg-muted-c/5 border-muted-c/20">
          <CardContent className="p-4 text-center">
            <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Avg. Match</h3>
            <p className="text-2xl font-bold text-foreground">
              {jobs.length > 0 ? Math.round(jobs.reduce((acc, job) => acc + job.matchScore, 0) / jobs.length) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex items-center justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-c-foreground w-5 h-5" />
          <Input
            placeholder="Search saved jobs..."
            className="pl-10 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-c-foreground text-lg mb-4">
              {searchTerm || activeFilter !== 'all' 
                ? "No saved jobs match your current filters" 
                : "You haven't saved any jobs yet"}
            </p>
            {searchTerm || activeFilter !== 'all' ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter('all');
                }}
              >
                Clear Filters
              </Button>
            ) : (
              <p className="text-sm text-muted-c-foreground">
                Start browsing to keep your top picks in one place!
              </p>
            )}
          </div>
        ) : (
          filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className={`hover:shadow-lg transition-all duration-200 hover:scale-[1.01] ${
                job.matchScore >= 85 ? 'ring-2 ring-success/20 bg-success/5' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {job.title}
                          </h3>
                          {job.matchScore >= 85 && (
                            <Badge className="bg-success/20 text-success border-success/30 animate-pulse">
                              <Award className="w-3 h-3 mr-1" />
                              Recommended
                            </Badge>
                          )}
                          {job.applied && (
                            <Badge className="bg-success/20 text-success border-success/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Applied
                            </Badge>
                          )}
                        </div>
                        
                        {/* Enhanced Match Score - More Clickable */}
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            onClick={() => onMatchScoreClick && onMatchScoreClick(job.id)}
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onMatchScoreClick && onMatchScoreClick(job.id)}
                            className="text-xs hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200"
                          >
                            <Target className="w-3 h-3 mr-1" />
                            Match Breakdown
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

                        <p className="text-foreground mb-4 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="mb-4">
                          <h4 className="font-medium text-foreground mb-2">Key Requirements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {job.requirements.map((req, idx) => (
                              <Badge key={idx} variant="secondary-c" className="bg-accent-c/50">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button 
                            onClick={() => onApply && onApply(job.id)}
                            className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => onViewDetails && onViewDetails(job.id)}
                            className="hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200"
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => onShare && onShare(job.id)}
                            className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUnsave(job.id)}
                            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
                          >
                            <Star className="w-4 h-4 mr-2 fill-current" />
                            Unsave
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
