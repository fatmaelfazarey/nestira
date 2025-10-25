
const path = `http://localhost:3000/api/candidate/`;
const token = `Bearer ${localStorage.getItem('token')}`;
import { useAuth } from "@/contexts/AuthContext";


// export const getAllJobs = async (setJobData: (data: any) => void, setJobsError: (error: string | null) => void, setJobsLoading: (loading: boolean) => void
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

// export const updateJobView = async (jobId: number) => {
//     const url = `${path}jobs/views/${jobId}`;

//     try {
//         const response = await fetch(url, {
//             method: "PATCH",
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
//         return data;

//     } catch (error) {
//         if (error instanceof Error) {
//             console.error('Error fetching jobs:', error.message);
//         } else {
//             console.error('Unexpected error:', error);
//         }
//     }
// }

// export const saveJob = async (jobId: number) => {
//     const url = `${path}jobs/saved/${jobId}`;

//     try {
//         const response = await fetch(url, {
//             method: "POST",
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
//         return data;

//     } catch (error) {
//         if (error instanceof Error) {
//             console.error('Error fetching jobs:', error.message);
//         } else {
//             console.error('Unexpected error:', error);
//         }
//     }
// }

// export const getSavedJobs = async (setJobData: (data: any) => void, setJobsError: (error: string | null) => void, setJobsLoading: (loading: boolean) => void
// ): Promise<any> => {
//     setJobsError(null);
//     setJobsLoading(true);
//     // http://localhost:3000/api/candidate/jobs/save
//     const url = `${path}jobs/save`;
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

// export const applyForJob = async (jobId: number, formData: FormData, setApplicationError: (error: string | null) => void) => {
//     const url = `${path}jobs/${jobId}/apply`;
//     setApplicationError(null);

//     try {
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 'Authorization': token,
//             },
//             body: formData
//         });

//         if (!response.ok) {
//             const errorMessage = await response.json();
//             setApplicationError(errorMessage.message);
//             throw new Error(`Failed to apply for job: ${errorMessage.message}`);
//         }

//         const data = await response.json();
//         console.log('Applied for job response:', data);
//         return data;
//     } catch (error) {
//         console.error('Error applying for job:', error);
//         setApplicationError(error.message);
//         return { success: false };
//     }
// }

// export const myApplications = async (setApplications: any) => {
//     const { currentUser } = useAuth();

//     // if (!currentUser) {
//     //     console.log('No current user found');
//     //     return { success: false, message: 'No user authenticated' };
//     // }

//     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
//     const url = `${path}jobs/applications`;

//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': token,
//                 'Content-Type': 'application/json',
//             }
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Failed to fetch job applications: ${errorMessage}`);
//         }

//         const data = await response.json();
//         console.log('Raw API data:', data);

//         // Return raw data without transformation
//         setApplications(data.data)
//         return {
//             success: true,
//             data: data.data,
//             message: data.message
//         };
//     } catch (error) {
//         console.error('Unexpected job applications error:', error);
//         return {
//             success: false,
//             message: error instanceof Error ? error.message : 'Unknown error'
//         };
//     }
// };