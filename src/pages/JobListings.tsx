
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Pencil, BarChart2, Archive } from 'lucide-react';
import { useState } from 'react';
import { JobCreationModal } from '@/components/JobCreationModal';
import { JobPreviewModal } from '@/components/JobPreviewModal';
import { JobAnalyticsModal } from '@/components/JobAnalyticsModal';
import { useToast } from '@/hooks/use-toast';

const JobListings = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      type: "Full-time",
      status: "Active",
      applications: 23,
      views: 156,
      posted: "3 days ago",
      function: "Finance",
      level: "Senior",
      industry: "Financial Services",
      experience: "5+ years",
      skills: ["Financial Analysis", "Budget Management", "Risk Assessment"],
      certifications: ["CPA", "CFA"],
      employmentType: "Full-time",
      workMode: "Hybrid",
      description: "We are seeking an experienced Senior Finance Manager to lead our financial operations in Dubai. The ideal candidate will have strong analytical skills and experience in budget management.",
      salary: "$80,000 - $120,000",
      languages: ["English", "Arabic"],
      visaStatus: ["UAE Resident", "Work Permit Holder"]
    },
    {
      id: 2,
      title: "Financial Analyst",
      location: "Riyadh, Saudi Arabia", 
      type: "Full-time",
      status: "Paused",
      applications: 12,
      views: 89,
      posted: "1 week ago",
      function: "Finance",
      level: "Mid-level",
      industry: "Banking",
      experience: "3-5 years",
      skills: ["Data Analysis", "Excel", "Financial Modeling"],
      certifications: ["CFA Level 1"],
      employmentType: "Full-time",
      workMode: "On-site",
      description: "Looking for a detail-oriented Financial Analyst to join our team in Riyadh. You will be responsible for financial modeling and data analysis.",
      salary: "$50,000 - $70,000",
      languages: ["English", "Arabic"],
      visaStatus: ["Saudi National", "Iqama Holder"]
    },
    {
      id: 3,
      title: "Accounting Specialist",
      location: "Cairo, Egypt",
      type: "Contract",
      status: "Active",
      applications: 31,
      views: 203,
      posted: "5 days ago",
      function: "Accounting",
      level: "Entry-level",
      industry: "Manufacturing",
      experience: "1-3 years",
      skills: ["Bookkeeping", "QuickBooks", "Financial Reporting"],
      certifications: ["Certified Bookkeeper"],
      employmentType: "Contract",
      workMode: "Remote",
      description: "We need an Accounting Specialist for a 6-month contract position. Experience with QuickBooks and financial reporting is essential.",
      salary: "$30,000 - $45,000",
      languages: ["English", "Arabic"],
      visaStatus: ["Egyptian National", "Work Permit"]
    }
  ]);

  const [isJobCreationModalOpen, setIsJobCreationModalOpen] = useState(false);
  const [isJobPreviewModalOpen, setIsJobPreviewModalOpen] = useState(false);
  const [isJobEditModalOpen, setIsJobEditModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { toast } = useToast();

  const handleCreateNewJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Create new job clicked');
    setIsJobCreationModalOpen(true);
  };

  const handleJobCreated = (newJob: any) => {
    console.log('New job created:', newJob);
    setJobs(prevJobs => [newJob, ...prevJobs]);
    toast({
      title: "Job Posted Successfully!",
      description: `"${newJob.title}" has been posted and is now live.`,
    });
  };

  const handleViewJob = (e: React.MouseEvent, jobId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('View job:', jobId);
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsJobPreviewModalOpen(true);
    }
  };

  const handleEditJob = (e: React.MouseEvent, jobId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit job:', jobId);
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsJobEditModalOpen(true);
    }
  };

  const handleViewAnalytics = (e: React.MouseEvent, jobId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('View analytics for job:', jobId);
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setIsAnalyticsModalOpen(true);
    }
  };

  const handleArchiveJob = (e: React.MouseEvent, jobId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Archive job:', jobId);
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' }
          : job
      )
    );
    const currentJob = jobs.find(job => job.id === jobId);
    const newStatus = currentJob?.status === 'Active' ? 'paused' : 'activated';
    toast({
      title: "Job Status Updated",
      description: `Job has been ${newStatus}.`,
    });
  };

  const handleJobUpdated = (updatedJob: any) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      )
    );
    toast({
      title: "Job Updated Successfully!",
      description: `"${updatedJob.title}" has been updated.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
            <p className="text-gray-600">Manage your job postings and track performance</p>
          </div>
          <Button 
            className="bg-accent hover:bg-accent/90"
            onClick={handleCreateNewJob}
            type="button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Job
          </Button>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge 
                        variant={job.status === 'Active' ? 'default' : 'secondary'}
                        className={
                          job.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : job.status === 'Paused'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{job.location} • {job.type}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <button 
                        onClick={(e) => handleViewAnalytics(e, job.id)}
                        className="hover:text-primary cursor-pointer underline"
                      >
                        {job.applications} applications
                      </button>
                      <button 
                        onClick={(e) => handleViewAnalytics(e, job.id)}
                        className="hover:text-primary cursor-pointer underline"
                      >
                        {job.views} views
                      </button>
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleViewJob(e, job.id)}
                      title="Preview Job"
                      className="hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleEditJob(e, job.id)}
                      title="Edit Job"
                      className="hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleViewAnalytics(e, job.id)}
                      title="View Analytics"
                      className="hover:bg-gray-50 active:bg-gray-100"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleArchiveJob(e, job.id)}
                      title={job.status === 'Active' ? 'Pause Job' : 'Activate Job'}
                      className="hover:bg-gray-50 active:bg-gray-100"
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <JobCreationModal 
        open={isJobCreationModalOpen} 
        onOpenChange={setIsJobCreationModalOpen}
        onJobCreated={handleJobCreated}
      />

      {selectedJob && (
        <JobPreviewModal 
          open={isJobPreviewModalOpen}
          onOpenChange={setIsJobPreviewModalOpen}
          jobData={selectedJob}
        />
      )}

      {selectedJob && (
        <JobCreationModal 
          open={isJobEditModalOpen}
          onOpenChange={setIsJobEditModalOpen}
          onJobCreated={handleJobUpdated}
          existingJob={selectedJob}
          isEditing={true}
        />
      )}

      {selectedJob && (
        <JobAnalyticsModal 
          open={isAnalyticsModalOpen}
          onOpenChange={setIsAnalyticsModalOpen}
          jobData={selectedJob}
        />
      )}
    </DashboardLayout>
  );
};

export default JobListings;
