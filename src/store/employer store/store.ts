
import { Console } from "console";

const path = `http://localhost:3000/api/employer/`;
const token = `Bearer ${localStorage.getItem('token')}`;

// export const addJob = async (jobData: Record<string, any>, setError: (error: string | null) => void, setLoading: (loading: boolean) => void
// ): Promise<void> => {
//     setLoading(true);
//     setError(null);
//     const url = 'http://localhost:3000/api/employer/jobs';
//     try {

//         console.log(jobData);
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 'Authorization': token,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title: jobData.title,
//                 description: jobData.description,
//                 job_function: jobData.function,
//                 career_level: jobData.level,
//                 industry: jobData.industry,
//                 location: jobData.location,
//                 work_mode: jobData.workMode,
//                 employment_type: jobData.employmentType,
//                 experience_required: {
//                     max: Number(jobData.experience.split('-')[1]) || jobData.experience,
//                     min: Number(jobData.experience.split('-')[0]) || jobData.experience,

//                 },
//                 salary: jobData.salary,
//                 required_skills: jobData.skills,
//                 preferred_skills: jobData.skills,
//                 required_certifications: jobData.certifications,
//                 preferred_certifications: jobData.certifications,
//                 languages: jobData.languages,
//                 visa_requirements: jobData.visaStatus,
//                 gender_preference: jobData.gender,
//                 benefits: jobData.benefits || '',
//                 application_deadline: jobData.deadline,
//                 score: jobData.minScore,
//                 status: 'Active',
//                 type: 'JOB'


//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to add job");
//         }
//         const data = await response.json();
//         console.log("Job added successfully");
//         return data;
//     } catch (err: any) {
//         setError(err.message);
//     } finally {
//         setLoading(false);
//     }
// };

// export const addIntern = async (internData: Record<string, any>): Promise<void> => {

//     const url = 'http://localhost:3000/api/employer/intern';
//     try {

//         console.log(internData);
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {

//                 'Authorization': token,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title: internData.title,
//                 description: internData.description,
//                 job_function: internData.function,
//                 industry: internData.industry,
//                 location: internData.location,
//                 work_mode: internData.workMode,
//                 employment_type: internData.employmentType,
//                 company_name: internData.companyName,
//                 company_website: internData.companyUrl,
//                 required_skills: internData.preferredTechnicalSkills,
//                 preferred_skills: internData.requiredInterpersonalSkills,
//                 languages: internData.languages,
//                 application_deadline: internData.deadline,
//                 status: internData.status,
//                 type: 'INTERN',
//                 duration: {
//                     number: Number(internData.duration.trim().split(' ')[0]) || internData.duration,
//                     type: internData.duration.trim().split(' ')[1] || internData.duration
//                 },
//                 compensation: {
//                     monthly_stipend: Number(internData.stipend.trim().split(' ')[0]) || internData.stipend,
//                     currency: internData.stipend.trim().split(' ')[1] || internData.stipend
//                 },
//                 mentorship_available: internData.mentorship,
//                 conversion_to_fulltime: internData.conversionPath

//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to add job");
//         }
//         const data = await response.json();
//         console.log("Job added successfully");
//         return data;
//     } catch (err: any) {

//     } finally {

//     }
// };

// export const getJobs = async (setJobData: (data: any) => void, setJobsError: (error: string | null) => void, setJobsLoading: (loading: boolean) => void
// ): Promise<any> => {
//     setJobsError(null);
//     setJobsLoading(true);
//     const url = `${path}jobs`;
//     // const token = `Bearer ${localStorage.getItem('token')}`;
//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 'Authorization': token,
//                 'Content-Type': 'application/json',
//             }
//         });
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Failed to fetch jobs: ${errorMessage}`);

//         }
//         const data = await response.json();
//         console.log('data', data);
//         setJobData(data.data);
//         return data;

//     } catch (error) {
//         if (error instanceof Error) {
//             console.error('Error fetching jobs:', error.message);
//             setJobsError(error.message);
//         } else {
//             console.error('Unexpected error:', error);
//             setJobsError('Unexpected error occurred');
//         }
//     } finally {
//         setJobsLoading(false);
//     }
// }

// export const deleteJob = async (jobId: number) => {
//     const url = `${path}jobs/${jobId}`;
//     const token = `Bearer ${localStorage.getItem('token')}`;
//     try {
//         const response = await fetch(url, {
//             method: "DELETE",
//             headers: {
//                 'Authorization': token,
//                 'Content-Type': 'application/json',
//             }
//         });
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Failed to delete job: ${errorMessage}`);

//         }
//         const data = await response.json();
//         console.log('data', data);
//         return data;
//     } catch (error) {
//         if (error instanceof Error) {
//             console.error('Error delete job :', error.message);
//         } else {
//             console.error('Unexpected error:', error);
//         }
//     }
// }

// export const updateStatus = async (jobId: number, status: string) => {

//     const url = `${path}jobs/${jobId}`;
//     const token = `Bearer ${localStorage.getItem('token')}`;
//     try {


//         const response = await fetch(url, {
//             method: "PATCH",
//             headers: {
//                 'Authorization': token,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 status: status,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to update Status ");
//         }
//         const data = await response.json();
//         console.log("Status updated successfully");
//         return data;
//     } catch (err: any) {
//         console.error('Unexpected error:', err);
//     } finally {

//     }
// };

// export const updateJob = async (jobId: number, newJobData: Record<string, any>) => {

//     console.log('------------------', newJobData, '----------------')
//     const url = `${path}jobs/${jobId}`;
//     // const token = `Bearer ${localStorage.getItem('token')}`;
//     try {


//         const response = await fetch(url, {
//             method: "PATCH",
//             headers: {

//                 'Authorization': token,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title: newJobData.title,
//                 description: newJobData.description,
//                 job_function: newJobData.function,
//                 career_level: newJobData.level,
//                 industry: newJobData.industry,
//                 location: newJobData.location,
//                 work_mode: newJobData.workMode,
//                 employment_type: newJobData.employmentType,

//                 salary: newJobData.salary,
//                 required_skills: newJobData.skills,
//                 preferred_skills: newJobData.skills,
//                 required_certifications: newJobData.certifications,
//                 preferred_certifications: newJobData.certifications,
//                 languages: newJobData.languages,
//                 visa_requirements: newJobData.visaStatus,
//                 gender_preference: newJobData.gender,
//                 benefits: newJobData.benefits || [],
//                 application_deadline: newJobData.deadline,
//                 score: newJobData.minScore,
//                 status: newJobData.status,
//                 type: 'JOB'
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to update Status ");
//         }
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (err: any) {
//         console.error('Unexpected error:', err);
//     } finally {

//     }
// };

// export const updateIntern = async (jobId: number, internData: Record<string, any>) => {

//     console.log('------------------', internData, '----------------')
//     const url = `${path}jobs/${jobId}`;
//     // const token = `Bearer ${localStorage.getItem('token')}`;
//     try {


//         const response = await fetch(url, {
//             method: "PATCH",
//             headers: {

//                 'Authorization': token,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title: internData.title,
//                 description: internData.description,
//                 job_function: internData.function,
//                 industry: internData.industry,
//                 location: internData.location,
//                 work_mode: internData.workMode,
//                 employment_type: internData.employmentType,
//                 company_name: internData.companyName,
//                 company_website: internData.companyUrl,
//                 required_skills: internData.preferredTechnicalSkills,
//                 preferred_skills: internData.requiredInterpersonalSkills,
//                 languages: internData.languages,
//                 application_deadline: internData.deadline,
//                 type: 'INTERN',
//                 duration: {
//                     number: Number(internData.duration.trim().split(' ')[0]) || internData.duration,
//                     type: internData.duration.trim().split(' ')[1] || internData.duration
//                 },
//                 compensation: {
//                     monthly_stipend: Number(internData.stipend.trim().split(' ')[0]) || '11',
//                     currency: internData.stipend.trim().split(' ')[1] || 'internData.stipend'
//                 },
//                 mentorship_available: internData.mentorship,
//                 conversion_to_fulltime: internData.conversionPath
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Failed to update Status ");
//         }
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (err: any) {
//         console.error('Unexpected error:', err);
//     } finally {

//     }
// };

// export const getJobsApplications = async (setApplicationData: any, setError: any) => {
//     const url = `${path}jobs/applications`;

//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 'Authorization': token,
//                 // 'Content-Type': 'application/json',
//             }
//         });
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Failed to fetch applications: ${errorMessage}`);

//         }
//         const data = await response.json();
//         console.log('data', data);
//         setApplicationData(data.data);
//         return data;

//     } catch (error) {
//         if (error instanceof Error) {
//             console.error('Error fetching jobs:', error.message);
//             setError(error.message);
//         } else {
//             console.error('Unexpected error:', error);
//             setError('Unexpected error occurred');
//         }
//     }
// }