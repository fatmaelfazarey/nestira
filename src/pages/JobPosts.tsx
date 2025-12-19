
// import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Pencil, BarChart2, Archive, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { JobCreationModal } from '@/components/JobCreationModal';
import { InternshipCreationModal } from '@/components/InternshipCreationModal';
import { RoleSelectionModal } from '@/components/RoleSelectionModal';
import { JobPreviewModal } from '@/components/JobPreviewModal';
import { JobAnalyticsModal } from '@/components/JobAnalyticsModal';
import { useToast } from '@/hooks/use-toast';
// import { addIntern, addJob, deleteJob, getJobs, updateIntern, updateJob, updateStatus } from '@/store/employer store/store';
import empity from '@/assets/empity.png';
import { useEmployerStore } from '@/store/employer store/EmployerStore';

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsError, setJobsError] = useState<string | null>(null);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [addJobsError, setAddJobsError] = useState<string | null>(null);
  const [addJobsLoading, setAddJobsLoading] = useState(false);

  // Modal states
  const [isRoleSelectionModalOpen, setIsRoleSelectionModalOpen] = useState(false);
  const [isJobCreationModalOpen, setIsJobCreationModalOpen] = useState(false);
  const [isInternshipCreationModalOpen, setIsInternshipCreationModalOpen] = useState(false);
  const [isJobPreviewModalOpen, setIsJobPreviewModalOpen] = useState(false);
  const [isJobEditModalOpen, setIsJobEditModalOpen] = useState(false);
  const [isInternshipEditModalOpen, setIsInternshipEditModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const { toast } = useToast();
  const { addIntern, addJob, deleteJob, getJobs, updateIntern, updateJob, updateStatus } = useEmployerStore()
  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const data = await getJobs(setJobs, setJobsError, setJobsLoading);
    if (!data.success) {
      toast({
        title: "Failed to fetch jobs",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Event handlers
  const handlePostNewRole = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRoleSelectionModalOpen(true);
  };

  const handleRoleSelected = (roleType: 'job' | 'internship') => {
    if (roleType === 'job') {
      setIsJobCreationModalOpen(true);
    } else {
      setIsInternshipCreationModalOpen(true);
    }
  };

  const handleJobCreated = async (newJob: any) => {
    const res = await addJob(newJob, setAddJobsError, setAddJobsLoading);
    if (res.success) {
      toast({
        title: "Job Posted Successfully!",
        description: `"${newJob.title}" has been posted and is now live.`,
      });
      fetchJobs();
      setIsJobCreationModalOpen(false);
    } else {
      toast({
        title: "Failed to post job",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInternshipCreated = async (newInternship: any) => {
    const res = await addIntern(newInternship);
    if (res.success) {
      toast({
        title: "Internship Posted Successfully!",
        description: `"${newInternship.title}" internship has been posted and is now live.`,
      });
      fetchJobs();
      setIsInternshipCreationModalOpen(false);
    } else {
      toast({
        title: "Failed to post internship",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleViewJob = (e: React.MouseEvent, job: any) => {
    console.log(job);
    e.preventDefault();
    e.stopPropagation();
    setSelectedJob(job);
    setIsJobPreviewModalOpen(true);
  };

  const handleEditJob = (e: React.MouseEvent, job: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (job?.type === 'JOB') {
      setSelectedJob(job);
      setIsJobEditModalOpen(true);
    } else if (job?.type === 'INTERN') {
      setSelectedJob(job);
      setIsInternshipEditModalOpen(true);
    }
  };

  const handleViewAnalytics = (e: React.MouseEvent, job: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedJob(job);
    setIsAnalyticsModalOpen(true);
  };

  const handleArchiveJob = async (e: React.MouseEvent, jobId: number, status: string) => {
    e.preventDefault();
    e.stopPropagation();

    // const newStatus = status === 'Active' ? 'Paused' : 'Active';
    // const newStatus = status === "Active" ? "Paused" : status === "Paused" ? "Cancel" : status;
const newStatus = status === "Active"
  ? "Paused"
  : status === "Paused"
  ? "Cancel"
  : "Active"; 

    const res = await updateStatus(jobId, newStatus);

    if (res.success) {
      toast({
        title: "Job Status Updated",
        description: `Job has been ${newStatus}.`,
      });
      fetchJobs();
    } else {
      toast({
        title: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const handleJobUpdated = async (updatedJob: any) => {
    const res = await updateJob(updatedJob.id, updatedJob);
    if (res.success) {
      toast({
        title: "Job Updated Successfully!",
        description: `"${updatedJob.title}" has been updated.`,
      });
      fetchJobs();
      setIsJobEditModalOpen(false);
    } else {
      toast({
        title: "Failed to update job",
        variant: "destructive"
      });
    }
  };

  const handleInternUpdated = async (updatedIntern: any) => {
    const res = await updateIntern(updatedIntern.id, updatedIntern);
    if (res.success) {
      toast({
        title: "Internship Updated Successfully!",
        description: `"${updatedIntern.title}" has been updated.`,
      });
      fetchJobs();
      setIsInternshipEditModalOpen(false);
    } else {
      toast({
        title: "Failed to update internship",
        variant: "destructive"
      });
    }
  };

  const handleDeleteJob = async (job: any) => {
    const isDeleteJob = confirm(`Are you sure you want to delete "${job.title}"?`);
    if (isDeleteJob) {
      const deleted = await deleteJob(job.id);
      if (deleted.success) {
        toast({
          title: "Job Deleted Successfully",
          description: `"${job.title}" has been deleted.`,
        });
        fetchJobs();
      } else {
        toast({
          title: "Failed to delete job",
          variant: "destructive"
        });
      }
    }
  };

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const prepareJobForPreview = (job: any) => {
    return {
      id: job.id,
      title: job.title,
      location: job.location,
      type: job.type,
      status: job.status,
      applications: job.applications,
      views: job.views,
      posted: job.created_at,
      function: job.job_function,
      level: job.career_level,
      industry: job.industry,
      experience: `${job.experience_required?.min || 0} `,
      skills: [...(job.required_skills || []), ...(job.preferred_skills || [])],
      certifications: [...(job.required_certifications || []), ...(job.preferred_certifications || [])],
      employmentType: job.employment_type,
      workMode: job.work_mode,
      description: job.description,
      salary: formatSalary(job)

      ,

      languages: job.languages || [],
      visaStatus: job.visa_requirements || []
    };
  };
  const formatSalary = (job: any) => {
    // Check for monthly stipend (internship/freelance)
    if (job.compensation?.monthly_stipend) {
      return `${job.compensation.monthly_stipend} ${job.compensation.currency} / month`;
    }

    // Check for salary range (min-max)
    if (job.salary?.min && job.salary?.max) {
      return `${job.salary.min} - ${job.salary.max} ${job.salary.currency}`;
    }

    // Check for fixed salary with period
    if (job.salary?.fixed && job.salary?.currency && job.salary?.period) {
      return `${job.salary.fixed} ${job.salary.currency} / ${job.salary.period}`;
    }

    // Check for simple salary string
    if (job.salary) {
      return job.salary;
    }

    // Default fallback
    return 'Not specified';
  };

  // Usage in your component:
  // const salaryDisplay = formatSalary(job);
  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Posts</h1>
            <p className="text-gray-600">Manage your job posts and internships</p>
          </div>
          <Button
            className="bg-accent hover:bg-accent/90"
            onClick={handlePostNewRole}
            type="button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Role
          </Button>
        </div>

        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <div className='w-full flex flex-col justify-center items-center py-12'>
              <img src={empity} className='w-80' alt="No jobs" />
              <p className="text-gray-500 mt-4">No jobs found...</p>
            </div>
          ) : jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge
                        // variant={job.status === 'Active' ? 'default' : 'secondary'}
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
                      {job.type === 'INTERN' && (
                        <Badge className="bg-purple-100 text-purple-800">
                          Internship
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{job.location} • {job.employment_type}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>{job.applications || 0} applications</span>
                      <span>{job.views || 0} views</span>
                      <span>Posted {getTimeAgo(job.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleViewJob(e, job)}
                      title="Preview Job"
                      className="hover:bg-secondary-c active:bg-gray-100"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleEditJob(e, job)}
                      title="Edit Job"
                      className="hover:bg-secondary-c active:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleViewAnalytics(e, job)}
                      title="View Analytics"
                      className="hover:bg-secondary-c active:bg-gray-100"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => handleArchiveJob(e, job.id, job.status)}
                      // title={job.status === 'Active' ? 'Pause Job' : 'Activate Job'}
                      title={job.status === "Active" ? "Paused" : job.status === "Paused" ? "Cancel" : job.status}
                      className="hover:bg-secondary-c active:bg-gray-100"
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteJob(job)}
                      title="Delete job"
                      className="hover:bg-secondary-c active:bg-gray-100 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <RoleSelectionModal
        open={isRoleSelectionModalOpen}
        onOpenChange={setIsRoleSelectionModalOpen}
        onRoleSelected={handleRoleSelected}
      />

      <JobCreationModal
        open={isJobCreationModalOpen}
        onOpenChange={setIsJobCreationModalOpen}
        onJobCreated={handleJobCreated}
      />

      <InternshipCreationModal
        open={isInternshipCreationModalOpen}
        onOpenChange={setIsInternshipCreationModalOpen}
        onInternshipCreated={handleInternshipCreated}
      />

      <InternshipCreationModal
        open={isInternshipEditModalOpen}
        onOpenChange={setIsInternshipEditModalOpen}
        onInternshipCreated={handleInternUpdated}
        existingJob={selectedJob}
        isEditing={true}
      />

      <JobCreationModal
        open={isJobEditModalOpen}
        onOpenChange={setIsJobEditModalOpen}
        onJobCreated={handleJobUpdated}
        existingJob={selectedJob}
        isEditing={true}
      />

      {
        selectedJob && (
          <JobPreviewModal
            open={isJobPreviewModalOpen}
            onOpenChange={setIsJobPreviewModalOpen}
            jobData={prepareJobForPreview(selectedJob)}
          />
        )
      }

      {
        selectedJob && (
          <JobAnalyticsModal
            open={isAnalyticsModalOpen}
            onOpenChange={setIsAnalyticsModalOpen}
            jobData={prepareJobForPreview(selectedJob)}
          />
        )
      }
    </div >
  );
};

export default JobPosts;