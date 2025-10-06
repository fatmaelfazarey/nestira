import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ChevronUp
} from "lucide-react";
import { useState } from "react";
import { EmployerInfoCard } from "@/components/job-browser/EmployerInfoCard";

export default function SavedJobs() {
  const [expandedJobs, setExpandedJobs] = useState<number[]>([]);

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const savedJobs = [
    {
      id: 1,
      title: "Senior Financial Analyst",
      company: "Goldman Sachs",
      location: "New York, NY",
      salary: "$120k - $150k",
      type: "Full-time",
      posted: "2 days ago",
      match: 95,
      description: "Lead financial analysis and modeling for investment banking division. Work directly with senior management on strategic initiatives.",
      requirements: ["5+ years experience", "CFA preferred", "Advanced Excel/VBA"],
      saved: "2024-01-20",
      employer: {
        type: "company" as const,
        name: "HR Manager",
        companyName: "Goldman Sachs",
        industry: "Investment Banking",
        companySize: "1000+",
        location: "New York, NY",
        description: "Goldman Sachs is a leading global investment banking, securities and investment management firm.",
        isVerified: true,
        linkedinUrl: "https://linkedin.com/company/goldman-sachs",
        websiteUrl: "https://goldmansachs.com",
        allowMessages: true
      }
    },
    {
      id: 2,
      title: "Investment Banking Associate",
      company: "JP Morgan Chase",
      location: "London, UK",
      salary: "$140k - $180k",
      type: "Full-time",
      posted: "3 days ago",
      match: 88,
      description: "Execute M&A transactions and support senior bankers in client coverage. Prepare pitch materials and financial models.",
      requirements: ["MBA preferred", "Investment banking experience", "Strong analytical skills"],
      saved: "2024-01-18",
      employer: {
        type: "individual" as const,
        name: "Sarah Johnson",
        companyName: "JP Morgan Chase",
        industry: "Investment Banking",
        companySize: "1000+",
        location: "London, UK",
        description: "JP Morgan Chase is a global leader in financial services, offering solutions to the world's most important corporations.",
        isVerified: true,
        allowMessages: false
      }
    },
    {
      id: 3,
      title: "Risk Management Specialist",
      company: "Morgan Stanley",
      location: "Singapore",
      salary: "$110k - $140k",
      type: "Full-time",
      posted: "5 days ago",
      match: 82,
      description: "Develop and implement risk management frameworks. Monitor portfolio risk and prepare risk reports for senior management.",
      requirements: ["Risk management experience", "FRM certification", "Python/R skills"],
      saved: "2024-01-16",
      employer: {
        type: "company" as const,
        name: "Talent Acquisition",
        companyName: "Morgan Stanley",
        industry: "Financial Services",
        companySize: "501-1000",
        location: "Singapore",
        description: "Morgan Stanley is a leading global financial services firm providing investment banking, securities, wealth management and investment management services.",
        isVerified: false,
        websiteUrl: "https://morganstanley.com",
        allowMessages: true
      }
    },
    {
      id: 4,
      title: "Quantitative Analyst",
      company: "Deutsche Bank",
      location: "Frankfurt, Germany",
      salary: "$130k - $160k",
      type: "Full-time",
      posted: "1 week ago",
      match: 79,
      description: "Build mathematical models for trading strategies. Collaborate with traders and risk managers on quantitative solutions.",
      requirements: ["PhD in quantitative field", "Python/C++ proficiency", "Statistics background"],
      saved: "2024-01-14",
      employer: {
        type: "individual" as const,
        name: "Michael Weber",
        companyName: "Deutsche Bank",
        industry: "Investment Banking",
        companySize: "1000+",
        location: "Frankfurt, Germany",
        description: "Deutsche Bank is a leading commercial bank offering a range of financial products and services.",
        isVerified: true,
        linkedinUrl: "https://linkedin.com/company/deutsche-bank",
        allowMessages: true
      }
    },
    {
      id: 5,
      title: "Portfolio Manager",
      company: "Credit Suisse",
      location: "Zurich, Switzerland",
      salary: "$160k - $200k",
      type: "Full-time",
      posted: "1 week ago",
      match: 91,
      description: "Manage institutional client portfolios worth $500M+. Develop investment strategies and maintain client relationships.",
      requirements: ["CFA required", "Portfolio management experience", "Client relationship skills"],
      saved: "2024-01-12",
      employer: {
        type: "company" as const,
        name: "Recruitment Team",
        companyName: "Credit Suisse",
        industry: "Investment Banking",
        companySize: "1000+",
        location: "Zurich, Switzerland",
        description: "Credit Suisse is a global investment bank and financial services firm founded and based in Switzerland.",
        isVerified: true,
        websiteUrl: "https://credit-suisse.com",
        allowMessages: false
      }
    }
  ];

  const getMatchColor = (match: number) => {
    if (match >= 90) return { color: "text-success", bg: "bg-success/20" };
    if (match >= 80) return { color: "text-warning", bg: "bg-warning/20" };
    return { color: "text-primary-c", bg: "bg-primary-c/20" };
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Saved Jobs</h1>
          <p className="text-muted-c-foreground">Keep track of interesting opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-secondary-c/10 border-secondary-c/20 animate-scale-in">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Total Saved</h3>
              <p className="text-3xl font-bold text-secondary-c">12</p>
            </CardContent>
          </Card>
          <Card className="bg-success/10 border-success/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">High Match</h3>
              <p className="text-3xl font-bold text-success">5</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Applied</h3>
              <p className="text-3xl font-bold text-warning">3</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-c/10 border-primary-c/20 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">This Week</h3>
              <p className="text-3xl font-bold text-primary-c">4</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                placeholder="Search saved jobs..." 
                className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-secondary-c/50"
              />
              <Button 
                variant="outline"
                className="hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200"
              >
                Filter by Match
              </Button>
              <Button 
                variant="outline"
                className="hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200"
              >
                Sort by Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Jobs List */}
        <div className="space-y-6">
          {savedJobs.map((job, index) => {
            const matchColors = getMatchColor(job.match);
            const isExpanded = expandedJobs.includes(job.id);
            
            return (
              <Card 
                key={job.id} 
                className="hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-4 text-muted-c-foreground mb-2">
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
                              <span>{job.posted}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            className={`${matchColors.bg} ${matchColors.color} hover:scale-105 transition-transform duration-200`}
                          >
                            {job.match}% Match
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
                          >
                            <Star className="w-4 h-4 mr-2 fill-current" />
                            Unsave
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-muted-c-foreground">Salary Range:</span>
                          <p className="font-semibold text-foreground">{job.salary}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-c-foreground">Job Type:</span>
                          <p className="font-semibold text-foreground">{job.type}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-c-foreground">Saved:</span>
                          <p className="font-semibold text-foreground">{job.saved}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-foreground leading-relaxed">{job.description}</p>
                      </div>

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

                      {/* Expandable Employer Section */}
                      <div className="border-t border-border-c/50 pt-4 mb-4">
                        <Button
                          variant="ghost"
                          onClick={() => toggleJobExpansion(job.id)}
                          className="flex items-center gap-2 text-sm text-muted-c-foreground hover:text-foreground p-0 h-auto"
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

                      <div className="flex items-center gap-3">
                        <Button 
                          className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button 
                          variant="outline"
                          className="hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200"
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline"
                          className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200"
                        >
                          Share Job
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button 
            variant="outline"
            className="hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 hover:scale-105"
          >
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}
