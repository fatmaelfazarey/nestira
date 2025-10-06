import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  MapPin, 
  Clock, 
  Building, 
  Bookmark, 
  BookmarkCheck,
  Filter,
  X
} from "lucide-react";
import { JobCard } from "@/components/job-browser/JobCard";
import { FilterSidebar } from "@/components/job-browser/FilterSidebar";
import { SavedJobsTab } from "@/components/job-browser/SavedJobsTab";
import { JobDetailsDialog } from "@/components/job-browser/JobDetailsDialog";
import { JobApplicationDialog } from "@/components/job-browser/JobApplicationDialog";
import { MatchScoreDrawer } from "@/components/job-browser/MatchScoreDrawer";
import { useToast } from "@/hooks/use-toast";
import { EasyApplyModal } from "@/components/job-browser/EasyApplyModal";

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

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Financial Analyst",
    company: "Emirates NBD",
    location: "Dubai, UAE",
    country: "UAE",
    currency: "AED",
    employmentType: "Full-time",
    workMode: "Hybrid",
    postedDate: "2 days ago",
    salary: "15,000 - 22,000",
    tags: ["Excel", "Financial Modeling", "VBA", "Bloomberg"],
    description: "Lead financial analysis and modeling for investment banking division in Dubai.",
    requirements: ["5+ years experience", "CFA preferred", "Advanced Excel"],
    saved: false,
    matchScore: 92,
    matchDetails: {
      skillsMatched: ["Financial Analysis", "Excel", "VBA"],
      skillsMissing: ["Python"],
      toolsMatched: ["Bloomberg", "Excel"],
      toolsMissing: ["PowerBI"],
      certificationsMatched: ["CFA Level 1"],
      certificationsMissing: ["CFA Level 2"],
      experienceMatch: true,
      locationMatch: true
    }
  },
  {
    id: 2,
    title: "Investment Banking Associate",
    company: "Al Rajhi Capital",
    location: "Riyadh, Saudi Arabia",
    country: "KSA",
    currency: "SAR",
    employmentType: "Full-time",
    workMode: "On-site",
    postedDate: "3 days ago",
    salary: "18,000 - 25,000",
    tags: ["M&A", "DCF", "Pitch Decks", "Arabic"],
    description: "Execute M&A transactions and support senior bankers in client coverage.",
    requirements: ["MBA preferred", "Investment banking experience", "Arabic fluency"],
    saved: true,
    savedDate: "2024-01-20",
    deadline: "2024-01-25",
    applied: true,
    matchScore: 78,
    matchDetails: {
      skillsMatched: ["Financial Modeling", "M&A"],
      skillsMissing: ["Arabic", "Pitch Deck Creation"],
      toolsMatched: ["Excel"],
      toolsMissing: ["Bloomberg"],
      certificationsMatched: [],
      certificationsMissing: ["MBA"],
      experienceMatch: true,
      locationMatch: false
    }
  },
  {
    id: 3,
    title: "Risk Management Specialist",
    company: "QNB Group",
    location: "Doha, Qatar",
    country: "Qatar",
    currency: "QAR",
    employmentType: "Contract",
    workMode: "Remote",
    postedDate: "5 days ago",
    salary: "12,000 - 16,000",
    tags: ["Risk Assessment", "Python", "SQL", "Derivatives"],
    description: "Develop and implement risk management frameworks for regional operations.",
    requirements: ["Risk management experience", "FRM certification", "Python skills"],
    saved: false,
    matchScore: 65,
    matchDetails: {
      skillsMatched: ["Risk Assessment", "SQL"],
      skillsMissing: ["Python", "Derivatives"],
      toolsMatched: ["SQL"],
      toolsMissing: ["Python", "R"],
      certificationsMatched: [],
      certificationsMissing: ["FRM"],
      experienceMatch: true,
      locationMatch: true
    }
  },
  {
    id: 4,
    title: "Corporate Finance Manager",
    company: "CIB Egypt",
    location: "Cairo, Egypt",
    country: "Egypt",
    currency: "EGP",
    employmentType: "Full-time",
    workMode: "Hybrid",
    postedDate: "1 week ago",
    salary: "25,000 - 35,000",
    tags: ["Corporate Finance", "Financial Planning", "Budgeting", "Arabic"],
    description: "Lead corporate finance initiatives and strategic planning for Egyptian operations.",
    requirements: ["CPA/CFA preferred", "Corporate finance experience", "Arabic fluency"],
    saved: true,
    savedDate: "2024-01-18",
    applied: false,
    matchScore: 88,
    matchDetails: {
      skillsMatched: ["Corporate Finance", "Financial Planning", "Budgeting"],
      skillsMissing: ["Arabic"],
      toolsMatched: ["Excel", "SAP"],
      toolsMissing: [],
      certificationsMatched: ["CFA Level 1"],
      certificationsMissing: ["CFA Level 2"],
      experienceMatch: true,
      locationMatch: true
    }
  }
];

export default function JobBrowser() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"browse" | "saved">("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [showEasyApply, setShowEasyApply] = useState(false);
  const [showMatchDrawer, setShowMatchDrawer] = useState(false);
  const [sortBy, setSortBy] = useState<"match" | "date" | "deadline">("match");
  const [filters, setFilters] = useState({
    location: [],
    careerLevel: [],
    workMode: [],
    jobType: [],
    industry: [],
    country: []
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "browse" ? true : job.saved;
    const matchesCountry = filters.country.length === 0 || filters.country.includes(job.country);
    
    return matchesSearch && matchesTab && matchesCountry;
  });

  const savedJobs = jobs.filter(job => job.saved).sort((a, b) => {
    if (sortBy === "match") return b.matchScore - a.matchScore;
    if (sortBy === "date") return new Date(b.savedDate || "").getTime() - new Date(a.savedDate || "").getTime();
    if (sortBy === "deadline") {
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  const handleSaveJob = (jobId: number) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { 
        ...job, 
        saved: !job.saved,
        savedDate: !job.saved ? new Date().toISOString().split('T')[0] : undefined
      } : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    if (job && !job.saved) {
      toast({
        title: "✅ Job saved to your list",
        description: `${job.title} at ${job.company} has been saved`,
      });
    }
  };

  const handleApplyToJob = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      // Update the job to mark it as applied
      setJobs(prev => prev.map(j => 
        j.id === jobId ? { ...j, applied: true } : j
      ));
      setSelectedJob(job);
      setShowEasyApply(true);
    }
  };

  const handleViewJobDetails = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowJobDetails(true);
    }
  };

  const handleMatchScoreClick = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setShowMatchDrawer(true);
    }
  };

  const handleSubmitApplication = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      toast({
        title: "✅ Application Submitted Successfully!",
        description: `Your application for ${job.title} at ${job.company} has been submitted.`,
      });
    }
  };

  const handleShareJob = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      navigator.clipboard.writeText(`${window.location.origin}/jobs/${jobId}`);
      toast({
        title: "Job link copied!",
        description: "Share this opportunity with your network",
      });
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "bg-success/20 text-success border-success/30";
    if (score >= 60) return "bg-warning/20 text-warning border-warning/30";
    return "bg-destructive/20 text-destructive border-destructive/30";
  };

  const getMatchScoreLabel = (score: number) => {
    if (score >= 85) return "High Match";
    if (score >= 60) return "Medium Match";
    return "Low Match";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border-c p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Job Browser</h1>
              <p className="text-muted-c-foreground mt-1">Find your next finance opportunity in MENA</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={activeTab === "browse" ? "default" : "outline"}
                onClick={() => setActiveTab("browse")}
                className="transition-all duration-200"
              >
                Browse Jobs
              </Button>
              <Button
                variant={activeTab === "saved" ? "default" : "outline"}
                onClick={() => setActiveTab("saved")}
                className="transition-all duration-200"
              >
                Saved Jobs ({savedJobs.length})
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-c-foreground w-5 h-5" />
            <Input
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Filter Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <FilterSidebar 
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-start"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Results Count and Sort */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-c-foreground">
              {filteredJobs.length} jobs found
            </p>
            {activeTab === "saved" && savedJobs.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-c-foreground">Sort by:</span>
                <Button
                  variant={sortBy === "match" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("match")}
                >
                  Match Score
                </Button>
                <Button
                  variant={sortBy === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("date")}
                >
                  Most Recent
                </Button>
                <Button
                  variant={sortBy === "deadline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("deadline")}
                >
                  Deadline
                </Button>
              </div>
            )}
          </div>

          {/* Content based on active tab */}
          {activeTab === "browse" ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSave={handleSaveJob}
                  onApply={handleApplyToJob}
                  onViewDetails={handleViewJobDetails}
                  onMatchScoreClick={handleMatchScoreClick}
                  onShare={handleShareJob}
                  getMatchScoreColor={getMatchScoreColor}
                  getMatchScoreLabel={getMatchScoreLabel}
                />
              ))}
            </div>
          ) : (
            <SavedJobsTab 
              jobs={savedJobs} 
              onSave={handleSaveJob}
              onApply={handleApplyToJob}
              onViewDetails={handleViewJobDetails}
              onMatchScoreClick={handleMatchScoreClick}
              onShare={handleShareJob}
              getMatchScoreColor={getMatchScoreColor}
              getMatchScoreLabel={getMatchScoreLabel}
            />
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-c-foreground text-lg">No jobs found matching your criteria</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    location: [],
                    careerLevel: [],
                    workMode: [],
                    jobType: [],
                    industry: [],
                    country: []
                  });
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Job Details Dialog */}
      <JobDetailsDialog
        job={selectedJob}
        open={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        onSave={handleSaveJob}
        onApply={handleApplyToJob}
      />

      {/* Job Application Dialog */}
      <JobApplicationDialog
        job={selectedJob}
        open={showJobApplication}
        onClose={() => setShowJobApplication(false)}
        onSubmit={handleSubmitApplication}
      />

      {/* Easy Apply Modal */}
      <EasyApplyModal
        job={selectedJob}
        open={showEasyApply}
        onClose={() => setShowEasyApply(false)}
        onSubmit={handleSubmitApplication}
      />

      {/* Match Score Drawer */}
      <MatchScoreDrawer
        job={selectedJob}
        open={showMatchDrawer}
        onClose={() => setShowMatchDrawer(false)}
      />
    </div>
  );
}
