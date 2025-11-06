import { useAuth } from '@/contexts/AuthContext';
import { IP } from '../Path';
import Assessments from '@/pages/Assessments';
const path = `${IP}/api/candidate/`;

export const useCandidateStore = () => {
    const { currentUser } = useAuth();


    const myApplications = async (setApplications: any) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}jobs/applications`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch job applications: ${errorMessage}`);
            }

            const data = await response.json();
            console.log('Raw API data:', data);

            setApplications(data.data)
            return {
                success: true,
                data: data.data,
                message: data.message
            };
        } catch (error) {
            console.error('Unexpected job applications error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    };

    const getAllJobs = async (setJobData: (data: any) => void, setJobsError: (error: string | null) => void, setJobsLoading: (loading: boolean) => void
    ): Promise<any> => {

        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        setJobsError(null);
        setJobsLoading(true);
        const url = `${path}jobs`;
        // const token = `Bearer ${localStorage.getItem('token')}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch jobs: ${errorMessage}`);
            }
            const data = await response.json();
            console.log('data', data);
            setJobData(data.data);
            return data;

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching jobs:', error.message);
                setJobsError(error.message);
            } else {
                console.error('Unexpected error:', error);
                setJobsError('Unexpected error occurred');
            }
        } finally {
            setJobsLoading(false);
        }
    }

    const updateJobView = async (jobId: number) => {

        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

        const url = `${path}jobs/views/${jobId}`;

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch jobs: ${errorMessage}`);
            }
            const data = await response.json();
            return data;

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching jobs:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    const saveJob = async (jobId: number) => {

        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}jobs/saved/${jobId}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch jobs: ${errorMessage}`);
            }
            const data = await response.json();
            return data;

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching jobs:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    const getSavedJobs = async (setJobData: (data: any) => void, setJobsError: (error: string | null) => void, setJobsLoading: (loading: boolean) => void
    ): Promise<any> => {
        setJobsError(null);
        setJobsLoading(true);
        // ${IP}/api/candidate/jobs/save


        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}jobs/save`;
        console.log('token ', token)
        // const token = `Bearer ${localStorage.getItem('token')}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch jobs: ${errorMessage}`);

            }
            const data = await response.json();
            console.log('data', data);
            setJobData(data.data);
            return data;

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching jobs:', error.message);
                setJobsError(error.message);
            } else {
                console.error('Unexpected error:', error);
                setJobsError('Unexpected error occurred');
            }
        } finally {
            setJobsLoading(false);
        }
    }

    const applyForJob = async (jobId: number, formData: FormData, setApplicationError: (error: string | null) => void) => {

        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

        const url = `${path}jobs/${jobId}/apply`;
        setApplicationError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                },
                body: formData
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                setApplicationError(errorMessage.message);
                throw new Error(`Failed to apply for job: ${errorMessage.message}`);

            }

            const data = await response.json();
            console.log('Applied for job response:', data);
            return data;
        } catch (error) {
            console.error('Error applying for job:', error);
            setApplicationError(error.message);
            return { success: false, error: error.message };
        }
    }

    const sendCVtoBackend = async (file: File) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${IP}/api/uploads/cv`;

        try {

            const formData = new FormData();
            formData.append('cv', file);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                },
                body: formData
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(`Failed to upload cv : ${errorMessage.message}`);
            }

            const data = await response.json();
            console.log('upload cv response:', data);
            return data;
        } catch (error) {
            console.error('Error upload cv :', error);
            return { success: false };
        }
    }

    const getCV = async (UID: string) => {
        if (!currentUser) {
            console.warn("No current user found");
            return false;
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${IP}/api/uploads/cv/Candidate-cv-${UID}.pdf`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to download CV");
            }


            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = downloadUrl;


            a.download = `Candidate-cv-${UID}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(downloadUrl);

            return true;
        } catch (error) {
            console.error("Error downloading CV:", error);
            return false;
        }
    };

    const getAssessments = async (
        setAssessments: (data: any) => void,
        setAssessmentsLoading: (loading: boolean) => void
    ) => {
        if (!currentUser) {
            console.warn("No current user found");
            return false;
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${IP}/api/candidate/assessments`;

        try {
            setAssessmentsLoading(true);

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch assessments: ${errorMessage}`);
            }

            const data = await response.json();
            console.log("data", data);

            setAssessments(data.data || []);
            return data;
        } catch (error) {
            console.error("Unexpected error:", error);
            setAssessments([]);
            return error;
        } finally {
            setAssessmentsLoading(false);
        }
    };

    const fetchAssessmentData = async (
        assessmentId: any,
        setAssessment: (data: any) => void,
        setAssessmentLoading: (loading: boolean) => void,
        setAssessmentError: (error: string | null) => void
    ) => {

        if (!currentUser) {
            console.warn("No current user found");
            setAssessmentError("User not authenticated");
            return { success: false };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${IP}/api/candidate/assessments/${assessmentId}`;

        setAssessmentLoading(true);
        setAssessmentError(null);

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch assessment data: ${errorMessage}`);
            }

            const data = await response.json();
            console.log("Assessment Data:", data);

            setAssessment(data?.data?.quiz || {});
            return { success: true, assessment: data?.data?.quiz };

        } catch (error: any) {
            console.error("Unexpected error:", error);
            setAssessment({});
            setAssessmentError(error.message);
            return { success: false, message: error.message };

        } finally {
            setAssessmentLoading(false);
        }
    };

    const submitAnswersData = async (answerData: any) => {

        console.log("answerData =>", answerData);

        if (!currentUser) {
            console.warn("No current user found");
            return { success: false };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${IP}/api/candidate/assessments/${answerData.id}/answer`;

        try {
            const formData = new FormData();

            const preparedAnswers = answerData.answers.map((q: any, index: number) => {

                if (q.type === "file_upload" && q.question_answer?.file instanceof File) {

                    const fileFieldName = `question_file_${q.questionId}_${index}`;

                    // Add the file to formData (real binary file)
                    formData.append(fileFieldName, q.question_answer.file);

                    // Replace the File object with only a reference
                    return {
                        ...q,
                        question_answer: {
                            ...q.question_answer,
                            file: fileFieldName,
                        }
                    };
                }

                return q;
            });

            // Attach updated answers as JSON
            formData.append("answerList", JSON.stringify(preparedAnswers));

            // Attach main task file if exists
            if (answerData.Task_File instanceof File) {
                formData.append("task_file", answerData.Task_File);
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    // ⚠️ Never set "Content-Type": fetch will set correct boundary for form-data
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend error:", data);
                const message = data?.errors?.[0]?.msg || data?.message || "Failed to submit assessment answers";
                return { success: false, message };
            }

            return { success: true, data };

        } catch (error) {
            console.error("Unexpected error:", error);
            return { success: false, message: "Unexpected error occurred" };
        }
    };



    return {
        myApplications,
        getAllJobs,
        updateJobView,
        saveJob,
        getSavedJobs,
        applyForJob,
        sendCVtoBackend,
        getCV,
        getAssessments,
        fetchAssessmentData,
        submitAnswersData

    };
};
