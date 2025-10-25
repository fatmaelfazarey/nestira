// import { DashboardLayout } from '@/components/DashboardLayout';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Plus, Eye, Pencil, BarChart2, Archive, Delete, Pin, Trash, Trash2 } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { JobCreationModal } from '@/components/JobCreationModal';
// import { InternshipCreationModal } from '@/components/InternshipCreationModal';
// import { RoleSelectionModal } from '@/components/RoleSelectionModal';
// import { JobPreviewModal } from '@/components/JobPreviewModal';
// import { JobAnalyticsModal } from '@/components/JobAnalyticsModal';
// import { useToast } from '@/hooks/use-toast';
// import { addJob, deleteJob, getJobs, updateIntern, updateJob, updateStatus } from '@/store/employer store/store';
// import { AlertDialog } from '@radix-ui/react-alert-dialog';
// import empity from '@/assets/empity.png';


// const JobPosts = () => {
//   // const [jobs, setJobs] = useState([
//   //   {
//   //    
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Financial Analyst",
//   //     location: "Riyadh, Saudi Arabia", 
//   //     type: "Full-time",
//   //     status: "Paused",
//   //     applications: 12,
//   //     views: 89,
//   //     posted: "1 week ago",
//   //     function: "Finance",
//   //     level: "Mid-level",
//   //     industry: "Banking",
//   //     experience: "3-5 years",
//   //     skills: ["Data Analysis", "Excel", "Financial Modeling"],
//   //     certifications: ["CFA Level 1"],
//   //     employmentType: "Full-time",
//   //     workMode: "On-site",
//   //     description: "Looking for a detail-oriented Financial Analyst to join our team in Riyadh. You will be responsible for financial modeling and data analysis.",
//   //     salary: "$50,000 - $70,000",
//   //     languages: ["English", "Arabic"],
//   //     visaStatus: ["Saudi National", "Iqama Holder"]
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "Marketing Intern",
//   //     location: "Cairo, Egypt",
//   //     type: "Internship",
//   //     status: "Active",
//   //     applications: 31,
//   //     views: 203,
//   //     posted: "5 days ago",
//   //     function: "Marketing",
//   //     level: "Entry-level",
//   //     industry: "Technology",
//   //     experience: "0-1 years",
//   //     skills: ["Social Media", "Content Creation", "Analytics"],
//   //     certifications: [],
//   //     employmentType: "Internship",
//   //     workMode: "Hybrid",
//   //     description: "3-month marketing internship with mentorship and potential for full-time conversion.",
//   //     salary: "1,500 AED/month",
//   //     languages: ["English", "Arabic"],
//   //     visaStatus: ["Egyptian National"],
//   //     duration: "3 months",
//   //     mentorship: true,
//   //     conversionPath: true
//   //   }
//   // ]);

//   const [jobs, setJobs] = useState([]);
//   const [jobsFromAPI, setJobsFronAPI] = useState([])
//   const [jobsError, setJobsError] = useState<string | null>(null);
//   const [jobsLoading, setJobsLoading] = useState(false);

//   useEffect(() => {
//     fetchJobs();
//   }, []);
//   const fetchJobs = async () => {
//     const data = await getJobs(setJobsFronAPI, setJobsError, setJobsLoading);
//     if (data.success) {
//       console.log(data);
//       // setJobs({
//       //   id: data.data.id,
//       //   title: data.data.title,
//       //   location: data.data.location,
//       //   type: data.data.type,
//       //   status: data.data.status,
//       //   applications: data.data.applications,
//       //   views: data.data.views,
//       //   posted: data.data.created_at,
//       //   function: data.data.job_function,
//       //   level: data.data.career_level,
//       //   industry: data.data.industry,
//       //   experience: `${data.data.experience_required?.min} - ${data.data.experience_required?.max} years`,
//       //   skills: [...data.data.required_skills, ...data.data.preferred_skills],
//       //   certifications: [...data.data.required_certifications, ...data.data.preferred_certifications],
//       //   employmentType: data.data.employment_type,
//       //   workMode: data.data.work_mode,
//       //   description: data.data.description,
//       //   salary: "$80,000 - $120,000",
//       //   languages: data.data.languages,
//       //   visaStatus: data.data.visa_requirements
//       // })
//     }
//   }

//   const [isRoleSelectionModalOpen, setIsRoleSelectionModalOpen] = useState(false);
//   const [isJobCreationModalOpen, setIsJobCreationModalOpen] = useState(false);
//   const [isInternshipCreationModalOpen, setIsInternshipCreationModalOpen] = useState(false);
//   const [isJobPreviewModalOpen, setIsJobPreviewModalOpen] = useState(false);
//   const [isJobEditModalOpen, setIsJobEditModalOpen] = useState(false);
//   const [isInternshipEditModalOpen, setIsInternshipEditModalOpen] = useState(false);
//   const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const { toast } = useToast();

//   // const [isInternEditModalOpen, setIsInternEditModalOpen] = useState(false);

//   const handlePostNewRole = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('Post new role clicked');
//     setIsRoleSelectionModalOpen(true);
//   };

//   const handleResponseChange = (job: any) => {
//     setSelectedJob({
//       id: job.id,
//       title: job.title,
//       location: job.location,
//       type: job.type,
//       status: job.status,
//       applications: job.applications,
//       views: job.views,
//       posted: job.created_at,
//       function: job.job_function,
//       level: job.career_level,
//       industry: job.industry,
//       experience: `${job.experience_required?.min || 0} `,
//       skills: [...job.required_skills, ...job.preferred_skills],
//       certifications: [...(job.required_certifications || []),
//       ...(job.preferred_certifications || [])],
//       employmentType: job.employment_type,
//       workMode: job.work_mode,
//       description: job.description,
//       salary: "$80,000 - $120,000",
//       languages: job.languages,
//       visaStatus: job.visa_requirements
//     })
//   }

//   const handleRoleSelected = (roleType: 'job' | 'internship') => {
//     console.log('Role selected:', roleType);
//     if (roleType === 'job') {
//       setIsJobCreationModalOpen(true);
//     } else {
//       setIsInternshipCreationModalOpen(true);
//     }
//   };

//   const [addJobsError, setAddJobsError] = useState<string | null>(null);
//   const [addJobsLoading, SetAddJobsLoading] = useState(false);
//   const handleJobCreated = async (newJob: any) => {
//     // console.log('New job created:', newJob);
//     // setJobs(prevJobs => [newJob, ...prevJobs]);
//     const res = await addJob(newJob, setAddJobsError, SetAddJobsLoading);
//     if (res.success) {
//       toast({
//         title: "Job Posted Successfully!",
//         description: `"${newJob.title}" has been posted and is now live.`,
//       });
//       fetchJobs();
//     } else {
//       toast({
//         title: "faild to update job",
//       });
//     }
//     // toast({
//     //   title: "Job Posted Successfully!",
//     //   description: `"${newJob.title}" has been posted and is now live.`,
//     // });
//   };

//   const handleInternshipCreated = (newInternship: any) => {
//     console.log('New internship created:', newInternship);
//     setJobs(prevJobs => [newInternship, ...prevJobs]);
//     toast({
//       title: "Internship Posted Successfully!",
//       description: `"${newInternship.title}" internship has been posted and is now live.`,
//     });
//   };

//   const handleViewJob = (e: React.MouseEvent, jobId: number, job: any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('View job:', job);
//     // const job = jobs.find(j => j.id === jobId);
//     if (job) {
//       // setSelectedJob(job);
//       handleResponseChange(job)
//       setIsJobPreviewModalOpen(true);
//     }
//   };

//   const handleEditJob = (e: React.MouseEvent, job: any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log('Edit job:', job);
//     // const job = jobs.find(j => j.id === jobId);

//     if (job?.type === 'JOB') {
//       setSelectedJob(job);
//       setIsJobEditModalOpen(true);
//     } else if (job?.type === 'INTERN') {
//       alert('you edit a intern you dont hndle it')
//       setSelectedJob(job);
//       setIsInternshipCreationModalOpen(true);
//     }
//     // if (job) {
//     //   // handleResponseChange(job)
//     //   setSelectedJob(job);
//     //   setIsJobEditModalOpen(true);
//     // }
//   };

//   const handleEditIntern = (e: React.MouseEvent, job: any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log('Edit job:', job);
//     // const job = jobs.find(j => j.id === jobId);

//     if (job?.type === 'JOB') {
//       setSelectedJob(job);
//       setIsJobEditModalOpen(true);
//     } else if (job?.type === 'INTERN') {
//       alert('you edit a intern you dont hndle it')
//       setSelectedJob(job);
//       setIsInternshipCreationModalOpen(true);
//     }
//     // if (job) {
//     //   // handleResponseChange(job)
//     //   setSelectedJob(job);
//     //   setIsJobEditModalOpen(true);
//     // }
//   };

//   const handleViewAnalytics = (e: React.MouseEvent, job: any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log('View analytics for job:', jobId);
//     // const job = jobs.find(j => j.id === jobId);
//     if (job) {
//       setSelectedJob(job);
//       setIsAnalyticsModalOpen(true);
//     }
//   };

//   const handleArchiveJob = async (e: React.MouseEvent, jobId: number, status: string) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const newStatus = status === 'Active' ? 'Paused' : 'Active';
//     // console.log('Archive job:', jobId);
//     // setJobs(prevJobs =>
//     //   prevJobs.map(job =>
//     //     job.id === jobId
//     //       ? { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' }
//     //       : job
//     //   )
//     // );
//     // const currentJob = jobs.find(job => job.id === jobId);
//     // const newStatus = currentJob?.status === 'Active' ? 'paused' : 'activated';

//     const res = await updateStatus(jobId, newStatus);
//     if (res.success) {
//       toast({
//         title: "Job Status Updated",
//         description: `Job has been ${newStatus}.`,
//       });
//       fetchJobs();
//     } else {
//       toast({
//         title: "faild to update status",
//       });
//     }

//   };

//   const handleJobUpdated = async (updatedJob: any) => {

//     console.log('-----------------------updated----------------------', updatedJob);
//     console.log('-----------------------updated----------------------');

//     const res = await updateJob(updatedJob.id, updatedJob);
//     if (res.success) {
//       toast({
//         title: "Job Updated Successfully!",
//         description: `"${updatedJob.title}" has been updated.`,
//       });
//       fetchJobs();
//     } else {
//       toast({
//         title: "faild to update job",
//       });
//     }


//   };

//   const handleInternUpdated = async (updatedIntern: any) => {

//     console.log('-----------------------updatedIntern----------------------', updatedIntern);
//     console.log('-----------------------updatedIntern----------------------');
//     const res = await updateIntern(updatedIntern.id, updatedIntern);
//     if (res.success) {
//       toast({
//         title: "Job Updated Successfully!",
//         description: `"${updatedIntern.title}" has been updated.`,
//       });
//       fetchJobs();
//     } else {
//       toast({
//         title: "faild to update job",
//       });
//     }


//   };

//   const handleDeleteJob = async (job) => {
//     const isDeleteJob = confirm(`Are You sure you want to delete ${job.title} `);
//     if (isDeleteJob) {
//       const deleted = await deleteJob(job.id);
//       if (deleted.success) {
//         toast({
//           title: "The job has been deleted successfully",
//         });
//         fetchJobs();
//       } else {
//         toast({
//           title: "Failed to delete job",
//         });
//       }
//     }

//   }

//   function getTimeAgo(createdAt) {
//     const now = new Date();
//     const created = new Date(createdAt);
//     const diffMs = now - created;

//     const seconds = Math.floor(diffMs / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(days / 365);

//     if (seconds < 60) return "just now";
//     if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
//     if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//     if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
//     if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
//     return `${years} year${years > 1 ? "s" : ""} ago`;
//   }

//   return (
//     <DashboardLayout>

//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Job Posts</h1>
//             <p className="text-gray-600">Manage your job posts and internships</p>
//           </div>
//           <Button
//             className="bg-accent hover:bg-accent/90"
//             onClick={handlePostNewRole}
//             type="button"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Post New Role
//           </Button>
//         </div>

//         <div className="grid gap-4">
//           {jobsFromAPI.length === 0 ? <div className='w-full flex flex-col justify-center items-center'>
//             <img src={empity} className='w-80' />
//             <p>No jobs found...</p>
//           </div> : jobsFromAPI.map((job) => (
//             <Card key={job.id} className="hover:shadow-md transition-shadow">
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-xl font-semibold">{job.title}</h3>
//                       <Badge
//                         variant={job.status === 'Active' ? 'default' : 'secondary'}
//                         className={
//                           job.status === 'Active'
//                             ? 'bg-green-100 text-green-800'
//                             : job.status === 'Paused'
//                               ? 'bg-yellow-100 text-yellow-800'
//                               : 'bg-gray-100 text-gray-800'
//                         }
//                       >
//                         {job.status}
//                       </Badge>
//                       {job.type === 'INTERN' && (
//                         <Badge className="bg-purple-100 text-purple-800">
//                           Internship
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-gray-600 mb-3">{job.location} • {job.type}</p>
//                     <div className="flex gap-6 text-sm text-gray-600">
//                       <button
//                         onClick={(e) => handleViewAnalytics(e, job.id)}
//                         className="hover:text-primary cursor-pointer underline"
//                       >
//                         {job.applications} applications
//                       </button>
//                       <button
//                         onClick={(e) => handleViewAnalytics(e, job.id)}
//                         className="hover:text-primary cursor-pointer underline"
//                       >
//                         {job.views} views
//                       </button>
//                       {/* <span>Posted {job.created_at}</span> */}
//                       <span>Posted {getTimeAgo(job.created_at)}</span>

//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={(e) => handleViewJob(e, job.id, job)}
//                       title="Preview Job"
//                       className="hover:bg-secondary-c active:bg-gray-100"
//                     >
//                       <Eye className="w-4 h-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={(e) => handleEditJob(e, job)}
//                       title="Edit Job"
//                       className="hover:bg-secondary-c active:bg-gray-100"
//                     >
//                       <Pencil className="w-4 h-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={(e) => handleViewAnalytics(e, job)}
//                       title="View Analytics"
//                       className="hover:bg-secondary-c active:bg-gray-100"
//                     >
//                       <BarChart2 className="w-4 h-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={(e) => handleArchiveJob(e, job.id, job.status)}
//                       title={job.status === 'Active' ? 'Pause Job' : 'Activate Job'}
//                       className="hover:bg-secondary-c active:bg-gray-100"
//                     >
//                       <Archive className="w-4 h-4" />
//                     </Button>

//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleDeleteJob(job)}
//                       title='delete job'
//                       className="hover:bg-secondary-c active:bg-gray-100"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>

//       <RoleSelectionModal
//         open={isRoleSelectionModalOpen}
//         onOpenChange={setIsRoleSelectionModalOpen}
//         onRoleSelected={handleRoleSelected}
//       />

//       <JobCreationModal
//         open={isJobCreationModalOpen}
//         onOpenChange={setIsJobCreationModalOpen}
//         onJobCreated={handleJobCreated}
//       />

//       {/* <InternshipCreationModal
//         open={isInternshipCreationModalOpen}
//         onOpenChange={setIsInternshipCreationModalOpen}
//         onInternshipCreated={handleInternUpdated}
//           existingJob={selectedJob}
//           isEditing={true}
//       />
//   */}
//       <InternshipCreationModal
//         open={isInternshipCreationModalOpen}
//         onOpenChange={setIsInternshipCreationModalOpen}
//         onInternshipCreated={handleInternshipCreated}
//       />
//       {
//         selectedJob && (

//           <InternshipCreationModal
//             open={isInternshipEditModalOpen}
//             onOpenChange={setIsInternshipEditModalOpen}
//             onInternshipCreated={handleInternUpdated}
//             existingJob={selectedJob}
//             isEditing={true}
//           />

//         )
//       }

//       {selectedJob && (
//         <JobPreviewModal
//           open={isJobPreviewModalOpen}
//           onOpenChange={setIsJobPreviewModalOpen}
//           jobData={selectedJob}
//         />
//       )}

//       {selectedJob && (
//         <JobCreationModal
//           open={isJobEditModalOpen}
//           onOpenChange={setIsJobEditModalOpen}
//           onJobCreated={handleJobUpdated}

//           existingJob={selectedJob}
//           isEditing={true}
//         />
//       )}


//       {selectedJob && (
//         <JobAnalyticsModal
//           open={isAnalyticsModalOpen}
//           onOpenChange={setIsAnalyticsModalOpen}
//           jobData={selectedJob}
//         />
//       )}
//     </DashboardLayout>
//   );
// };

// export default JobPosts;




import { DashboardLayout } from '@/components/DashboardLayout';
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

    const newStatus = status === 'Active' ? 'Paused' : 'Active';
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
    <DashboardLayout>
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
                      title={job.status === 'Active' ? 'Pause Job' : 'Activate Job'}
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

      {selectedJob && (
        <JobPreviewModal
          open={isJobPreviewModalOpen}
          onOpenChange={setIsJobPreviewModalOpen}
          jobData={prepareJobForPreview(selectedJob)}
        />
      )}

      {selectedJob && (
        <JobAnalyticsModal
          open={isAnalyticsModalOpen}
          onOpenChange={setIsAnalyticsModalOpen}
          jobData={prepareJobForPreview(selectedJob)}
        />
      )}
    </DashboardLayout>
  );
};

export default JobPosts;