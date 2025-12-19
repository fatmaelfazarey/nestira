
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  FileText,
  Clock,
  MapPin,
  Building,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Loader2
} from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { EmployerInfoCard } from "@/components/job-browser/EmployerInfoCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EasyApplyModal } from "@/components/job-browser/EasyApplyModal";
import { useToast } from "@/hooks/use-toast";
import { JobDetailsDialog } from "@/components/job-browser/JobDetailsDialog";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";
import { useAuth } from "@/contexts/AuthContext";
// import { getSavedJobs, saveJob, updateJobView } from "@/store/candidate store/store";

// Types
interface Employer {
  type: "company" | "individual";
  name: string;
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  description: string;
  isVerified: boolean;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  allowMessages: boolean;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  posted: string;
  matchScore: number;
  description: string;
  requirements: string[];
  saved: string;
  employer: Employer;
}

interface Stats {
  totalSaved: number;
  highMatch: number;
  applied: number;
  thisWeek: number;
}

// Color configuration for stats cards
const STATS_COLORS = {
  secondary: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
  success: { bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600" },
  primary: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" }
} as const;

// Custom hooks
const useSavedJobs = () => {
  const { getSavedJobs, saveJob, updateJobView } = useCandidateStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();


  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSavedJobs(setJobs, setError, setLoading);

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch saved jobs");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch saved jobs";
      setError(errorMessage);
      toast({
        title: "Failed to fetch jobs",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }
    , [toast]);

  return { jobs, loading, error, fetchJobs, setJobs };
};

const useJobFilters = (jobs: Job[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<string>("date");

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.employer.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.saved).getTime() - new Date(a.saved).getTime();
        case 'match':
          return b.matchScore - a.matchScore;
        case 'salary':
          const getSalaryValue = (salary: string) => {
            const match = salary.match(/\$(\d+)k/);
            return match ? parseInt(match[1]) : 0;
          };
          return getSalaryValue(b.salary) - getSalaryValue(a.salary);
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });

    return filtered;
  }, [jobs, searchTerm, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filteredJobs: filteredAndSortedJobs
  };
};

const useJobStats = (jobs: Job[]) => {
  return useMemo((): Stats => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      totalSaved: jobs.length,
      highMatch: jobs.filter(job => job.matchScore >= 80).length,
      applied: jobs.filter(job => /* Add applied logic when available */ false).length,
      thisWeek: jobs.filter(job => new Date(job.saved) >= oneWeekAgo).length
    };
  }, [jobs]);
};

// Components
const StatsCard = ({
  title,
  value,
  color,
  delay
}: {
  title: string;
  value: number;
  color: keyof typeof STATS_COLORS;
  delay?: string;
}) => {
  const colors = STATS_COLORS[color];

  return (
    <Card
      className={`${colors.bg} ${colors.border} animate-scale-in`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <CardContent className="p-6 text-center">
        <h3 className="font-medium text-sm text-muted-foreground mb-2">{title}</h3>
        <p className={`text-3xl font-bold ${colors.text}`}>{value}</p>
      </CardContent>
    </Card>
  );
};

const JobCard = ({
  job,
  isExpanded,
  onToggleExpand,
  onApply,
  onViewDetails,
  onShare,
  onUnsave
}: {
  job: Job;
  isExpanded: boolean;
  onToggleExpand: (jobId: number) => void;
  onApply: (job: Job) => void;
  onViewDetails: (job: Job) => void;
  onShare: (jobId: number) => void;
  onUnsave: (jobId: number) => void;
}) => {
  const matchColors = getMatchColor(job.matchScore);
  const { isVerified } = useAuth();

  return (
    <Card className="hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02]">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2">
                {job.title}
              </h3>

              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-muted-foreground mb-2 text-sm sm:text-base">
                {/* <div className="flex items-center gap-1">
                  <Building className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium truncate">{job.company || job.employer.companyName}</span>
                </div> */}
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{job.location || job.employer.companyName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{job.posted}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col xs:flex-row sm:flex-col lg:flex-row items-start xs:items-center sm:items-end lg:items-center gap-2 sm:gap-3">
              {/* <Badge className={`${matchColors.bg} ${matchColors.color} hover:scale-105 transition-transform duration-200`}>
                {job.matchScore}% Match
              </Badge> */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUnsave(job.id)}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 whitespace-nowrap"
              >
                <Star className="w-4 h-4 mr-2 fill-current" />
                Unsave
              </Button>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div>
              <span className="text-xs sm:text-sm text-muted-foreground">Salary Range:</span>
              <p className="font-semibold text-foreground text-sm sm:text-base truncate">{job.salary?.max || job.salary || 'none'}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm text-muted-foreground">Job Type:</span>
              <p className="font-semibold text-foreground text-sm sm:text-base">{job.employmentType}</p>
            </div>
            {/* <div>
              <span className="text-xs sm:text-sm text-muted-foreground">Saved:</span>
              <p className="font-semibold text-foreground text-sm sm:text-base">{job.saved}</p>
            </div> */}
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-foreground leading-relaxed text-sm sm:text-base line-clamp-3">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Key Requirements:</h4>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {job.requirements.slice(0, 4).map((req, idx) => (
                <Badge key={idx} variant="secondary" className="bg-accent/50 text-xs sm:text-sm">
                  {req}
                </Badge>
              ))}
              {job.requirements.length > 4 && (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  +{job.requirements.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Expandable Section */}
          <div className="border-t border-border pt-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => onToggleExpand(job.id)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-0 h-auto w-full justify-start"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Company Details
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show Company Details
                </>
              )}
            </Button>

            {isExpanded && (
              <div className="mt-4">
                <EmployerInfoCard employer={job.employer} compact />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
            {/* <Button
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:scale-105 transition-all duration-200 flex-1 xs:flex-none justify-center"
              size="sm"
              onClick={() => onApply(job)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Apply Now
            </Button> */}
            <div className="relative group">
              <Button
                disabled={!isVerified}
                onClick={() => onApply(job)}
                className="bg-secondary-c text-secondary-c-foreground hover:bg-secondary-c-hover hover:scale-105 transition-all duration-200"
              >
                Apply Now
              </Button>

              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {isVerified
                  ? 'Apply using your Nestira profile in seconds'
                  : 'Please verify your account to apply for this job'}
              </div>
            </div>

            <Button
              variant="outline"
               disabled={!isVerified}
              className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 flex-1 xs:flex-none justify-center"
              size="sm"
              onClick={() => onViewDetails(job)}
            >
              View Details
            </Button>
            <Button
              variant="outline"
              className="hover:bg-green-100 hover:text-green-700 hover:border-green-300 flex-1 xs:flex-none justify-center"
              size="sm"
              onClick={() => onShare(job.id)}
            >
              Share Job
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingState = () => (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="ml-2 text-muted-foreground">Loading saved jobs...</span>
  </div>
);

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
      <Star className="w-12 h-12 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      {searchTerm ? "No matching jobs found" : "No saved jobs yet"}
    </h3>
    <p className="text-muted-foreground mb-6">
      {searchTerm
        ? "Try adjusting your search terms or filters"
        : "Start saving jobs that interest you to see them here"
      }
    </p>
    {!searchTerm && (
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        Browse Jobs
      </Button>
    )}
  </div>
);

// Main Component
export default function SavedJobs() {
  const { toast } = useToast();
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);
  const [showEasyApply, setShowEasyApply] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);


  const { jobs, loading, error, fetchJobs, setJobs } = useSavedJobs();
  const { searchTerm, setSearchTerm, sortBy, setSortBy, filteredJobs } = useJobFilters(jobs);
  const stats = useJobStats(jobs);
  const { getSavedJobs, saveJob, updateJobView } = useCandidateStore();
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const toggleJobExpansion = useCallback((jobId: number) => {
    setExpandedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  }, []);

  const handleSubmitApplication = useCallback((jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      toast({
        title: "✅ Application Submitted!",
        description: `Your application for ${job.title} at ${job.company} has been submitted.`,
      });
    }
  }, [jobs, toast]);

  const handleShareJob = useCallback((jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      navigator.clipboard.writeText(`${window.location.origin}/jobs/${jobId}`);
      toast({
        title: "Link copied!",
        description: "Job link has been copied to clipboard",
      });
    }
  }, [jobs, toast]);

  // const handleUnsaveJob = useCallback((jobId: number) => {
  //   handleSaveJob(jobId)
  //   // setJobs(prev => prev.filter(job => job.id !== jobId));
  //   // toast({
  //   //   title: "Job unsaved",
  //   //   description: "Job has been removed from your saved list",
  //   // });
  // }, [setJobs, toast]);

  const handleUnsaveJob = async (jobId: number) => {
    const response = await saveJob(jobId);
    if (response.success) {
      toast({
        title: response.message,
      });
    } else {
      console.log('job not save ');
    }
  };

  const handleApply = useCallback((job: Job) => {
    setSelectedJob(job);
    setShowEasyApply(true);
  }, []);

  const handleViewDetails = useCallback((job: Job) => {
    IncreaseView(job.id);
    setSelectedJob(job);
    setShowJobDetails(true);
  }, []);

  const IncreaseView = async (jobId: number) => {
    const updateViews = await updateJobView(jobId);
    if (!updateViews.success) {
      console.log('View not update')
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Jobs</h1>
          <p className="text-muted-foreground">Keep track of interesting opportunities</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Saved" value={stats.totalSaved} color="secondary" />
          <StatsCard title="High Match" value={stats.highMatch} color="success" delay="100ms" />
          <StatsCard title="Applied" value={stats.applied} color="warning" delay="200ms" />
          <StatsCard title="This Week" value={stats.thisWeek} color="primary" delay="300ms" />
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search by title, company, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="date">Date Saved</SelectItem>
                    <SelectItem value="match">Match Score</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                isExpanded={expandedJobs.includes(job.id)}
                onToggleExpand={toggleJobExpansion}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
                onShare={handleShareJob}
                onUnsave={handleUnsaveJob}
              />
            ))
          )}
        </div>

        {/* Load More (if needed) */}
        {filteredJobs.length > 0 && filteredJobs.length % 10 === 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300 hover:scale-105"
            >
              Load More Jobs
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <EasyApplyModal
        job={selectedJob}
        open={showEasyApply}
        onClose={() => setShowEasyApply(false)}
        onSubmit={handleSubmitApplication}
      />

      <JobDetailsDialog
        job={selectedJob}
        open={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        onSave={null}
        onApply={null}
      />
    </div>
  );
}

// Helper function
const getMatchColor = (match: number) => {
  if (match >= 90) return { color: "text-green-600", bg: "bg-green-100" };
  if (match >= 80) return { color: "text-amber-600", bg: "bg-amber-100" };
  return { color: "text-blue-600", bg: "bg-blue-100" };
};