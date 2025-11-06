import { useAuth } from '@/contexts/AuthContext';
import { IP } from '../Path';
// export const IP ='http://localhost:3000';
const path = `${IP}/api/employer/`;

export const useEmployerStore = () => {
    const { currentUser } = useAuth();

    const addJob = async (jobData: Record<string, any>, setError: (error: string | null) => void, setLoading: (loading: boolean) => void
    ): Promise<void> => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

        setLoading(true);
        setError(null);
        const url = `${IP}/api/employer/jobs`;
        try {

            console.log(jobData);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: jobData.title,
                    description: jobData.description,
                    job_function: jobData.function,
                    career_level: jobData.level,
                    industry: jobData.industry,
                    location: jobData.location,
                    work_mode: jobData.workMode,
                    employment_type: jobData.employmentType,
                    experience_required: {
                        max: Number(jobData.experience.split('-')[1]) || jobData.experience,
                        min: Number(jobData.experience.split('-')[0]) || jobData.experience,

                    },
                    salary: jobData.salary,
                    required_skills: jobData.skills,
                    preferred_skills: jobData.skills,
                    required_certifications: jobData.certifications,
                    preferred_certifications: jobData.certifications,
                    languages: jobData.languages,
                    visa_requirements: jobData.visaStatus,
                    gender_preference: jobData.gender,
                    benefits: jobData.benefits || '',
                    application_deadline: jobData.deadline,
                    score: jobData.minScore,
                    status: 'Active',
                    type: 'JOB'


                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add job");
            }
            const data = await response.json();
            console.log("Job added successfully");
            return data;
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addIntern = async (internData: Record<string, any>): Promise<void> => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${IP}/api/employer/intern`;
        try {

            console.log(internData);
            const response = await fetch(url, {
                method: "POST",
                headers: {

                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: internData.title,
                    description: internData.description,
                    job_function: internData.function,
                    industry: internData.industry,
                    location: internData.location,
                    work_mode: internData.workMode,
                    employment_type: internData.employmentType,
                    company_name: internData.companyName,
                    company_website: internData.companyUrl,
                    required_skills: internData.preferredTechnicalSkills,
                    preferred_skills: internData.requiredInterpersonalSkills,
                    languages: internData.languages,
                    application_deadline: internData.deadline,
                    status: internData.status,
                    type: 'INTERN',
                    duration: {
                        number: Number(internData.duration.trim().split(' ')[0]) || internData.duration,
                        type: internData.duration.trim().split(' ')[1] || internData.duration
                    },
                    compensation: {
                        monthly_stipend: Number(internData.stipend.trim().split(' ')[0]) || internData.stipend,
                        currency: internData.stipend.trim().split(' ')[1] || internData.stipend
                    },
                    mentorship_available: internData.mentorship,
                    conversion_to_fulltime: internData.conversionPath

                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add job");
            }
            const data = await response.json();
            console.log("Job added successfully");
            return data;
        } catch (err: any) {

        } finally {

        }
    };

    const getJobs = async (setJobData: (data: any) => void, setJobsError: (error: string | null) => void, setJobsLoading: (loading: boolean) => void
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

    const deleteJob = async (jobId: number) => {
        const url = `${path}jobs/${jobId}`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete job: ${errorMessage}`);

            }
            const data = await response.json();
            console.log('data', data);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error delete job :', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    }

    const updateStatus = async (jobId: number, status: string) => {

        const url = `${path}jobs/${jobId}`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        try {


            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update Status ");
            }
            const data = await response.json();
            console.log("Status updated successfully");
            return data;
        } catch (err: any) {
            console.error('Unexpected error:', err);
        } finally {

        }
    };

    const updateJob = async (jobId: number, newJobData: Record<string, any>) => {

        console.log('------------------', newJobData, '----------------')
        const url = `${path}jobs/${jobId}`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        try {


            const response = await fetch(url, {
                method: "PATCH",
                headers: {

                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: newJobData.title,
                    description: newJobData.description,
                    job_function: newJobData.function,
                    career_level: newJobData.level,
                    industry: newJobData.industry,
                    location: newJobData.location,
                    work_mode: newJobData.workMode,
                    employment_type: newJobData.employmentType,

                    salary: newJobData.salary,
                    required_skills: newJobData.skills,
                    preferred_skills: newJobData.skills,
                    required_certifications: newJobData.certifications,
                    preferred_certifications: newJobData.certifications,
                    languages: newJobData.languages,
                    visa_requirements: newJobData.visaStatus,
                    gender_preference: newJobData.gender,
                    benefits: newJobData.benefits || [],
                    application_deadline: newJobData.deadline,
                    score: newJobData.minScore,
                    status: newJobData.status,
                    type: 'JOB'
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update Status ");
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (err: any) {
            console.error('Unexpected error:', err);
        } finally {

        }
    };

    const updateIntern = async (jobId: number, internData: Record<string, any>) => {

        console.log('------------------', internData, '----------------')
        const url = `${path}jobs/${jobId}`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        try {


            const response = await fetch(url, {
                method: "PATCH",
                headers: {

                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: internData.title,
                    description: internData.description,
                    job_function: internData.function,
                    industry: internData.industry,
                    location: internData.location,
                    work_mode: internData.workMode,
                    employment_type: internData.employmentType,
                    company_name: internData.companyName,
                    company_website: internData.companyUrl,
                    required_skills: internData.preferredTechnicalSkills,
                    preferred_skills: internData.requiredInterpersonalSkills,
                    languages: internData.languages,
                    application_deadline: internData.deadline,
                    type: 'INTERN',
                    duration: {
                        number: Number(internData.duration.trim().split(' ')[0]) || internData.duration,
                        type: internData.duration.trim().split(' ')[1] || internData.duration
                    },
                    compensation: {
                        monthly_stipend: Number(internData.stipend.trim().split(' ')[0]) || '11',
                        currency: internData.stipend.trim().split(' ')[1] || 'internData.stipend'
                    },
                    mentorship_available: internData.mentorship,
                    conversion_to_fulltime: internData.conversionPath
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update Status ");
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (err: any) {
            console.error('Unexpected error:', err);
        } finally {

        }
    };

    const getJobsApplications = async (setApplicationData: any, setError: any) => {
        const url = `${path}jobs/applications`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        console.log('token :  ', token)
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    // 'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch applications: ${errorMessage}`);

            }
            const data = await response.json();
            console.log('data--------', data);
            setApplicationData(data.data);
            return data;

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching jobs:', error.message);
                setError(error.message);
            } else {
                console.error('Unexpected error:', error);
                setError('Unexpected error occurred');
            }
        }
    }
    const getAllJobsTitle = async (setJobsTitle: any) => {
        const url = `${path}jobs/title`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    // 'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to fetch titles: ${errorMessage}`);

            }
            const data = await response.json();
            console.log('data', data);
            setJobsTitle(jobTitles => [...jobTitles, data.data]);
            return data;

        } catch (error) {

            console.error('Unexpected error:', error);

        }
    }
    const updateHiringStage = async (newStage: any, jobId: number) => {
        const url = `${path}jobs/applications/hiringStage/${jobId}`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        try {


            const response = await fetch(url, {
                method: "PATCH",
                headers: {

                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hiring_stage: newStage
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update stage ");
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (err: any) {
            console.error('Unexpected error:', err);
        }
    }

    const getMatchedJobs = async (setMatchedJobs: any) => {
        // quiz/match-jobs
        const url = `${path}quiz/match-jobs`;
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to GET Matched jobs ");
            }
            const data = await response.json();
            console.log('Matched jobs : ', data);
            setMatchedJobs(data.data)
            return data;
        } catch (error) {
            console.error('Unexpected error:', error);
        }


    }

    // const addQuiz = async (quizData: any) => {

    //     if (!currentUser) {
    //         console.warn('No current user found');
    //         return { success: false, message: 'User not authenticated' };
    //     }

    //     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    //     const url = `${path}quiz`;
    //     const pad = (num) => String(num).padStart(2, '0');
    //     try {

    //         console.log('quizData ============= >', quizData);
    //         const response = await fetch(url, {
    //             method: "POST",
    //             headers: {

    //                 'Authorization': token,
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({

    //                 job_id: quizData.job_id,
    //                 title: quizData.title,
    //                 description: quizData.description,
    //                 questionsList: quizData.questionsList,
    //                 method: quizData.method,
    //                 totalQuestions: quizData.totalQuestions,
    //                 totalTime: `${pad(quizData.timeLimit.hours)}:${pad(quizData.timeLimit.minutes)}:${pad(quizData.timeLimit.seconds)}`
    //             }),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.error("Backend error:", errorData);

    //             const message = errorData?.errors?.[0]?.msg || errorData?.message || "Failed to add quiz";
    //             alert(message);
    //         }
    //         const data = await response.json();
    //         console.log("Quiz added successfully");
    //         return data;
    //     } catch (error: any) {
    //         console.error('Unexpected error:', error);
    //     }

    // }

    const getAllQuizzes = async (SetQuizzesData: any) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quizzes`;
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
                throw new Error(`Failed to fetch Quizzes: ${errorMessage}`);

            }
            const data = await response.json();
            SetQuizzesData(data.data);
            console.log('all quizess data : ', data.data)
            return data;

        } catch (error: any) {
            console.error('Unexpected error:', error);
        }
    }

    // const updatedQuizData = async (quizId: number, newQuizData: any) => {
    //     if (!currentUser) {
    //         console.warn('No current user found');
    //         return { success: false, message: 'User not authenticated' };
    //     }

    //     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    //     const url = `${path}quiz/${quizId}`;
    //     const pad = (num) => String(num).padStart(2, '0');
    //     console.log({

    //         job_id: newQuizData.job_id,
    //         title: newQuizData.title,
    //         description: newQuizData.description,
    //         questionsList: newQuizData.questionsList,
    //         method: newQuizData.method,
    //         totalQuestions: parseInt(newQuizData.totalQuestions, 10),
    //         totalTime: `${pad(newQuizData.timeLimit.hours)}:${pad(newQuizData.timeLimit.minutes)}:${pad(newQuizData.timeLimit.seconds)}`
    //     })


    //     try {

    //         // console.log('quizData ============= >', quizData);
    //         const response = await fetch(url, {
    //             method: "PATCH",
    //             headers: {

    //                 'Authorization': token,
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({

    //                 job_id: newQuizData.job_id,
    //                 title: newQuizData.title,
    //                 description: newQuizData.description,
    //                 questionsList: newQuizData.questionsList,
    //                 method: newQuizData.method,
    //                 totalQuestions: parseInt(newQuizData.totalQuestions, 10),
    //                 totalTime: `${pad(newQuizData.timeLimit.hours)}:${pad(newQuizData.timeLimit.minutes)}:${pad(newQuizData.timeLimit.seconds)}`
    //             }),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             console.error("Backend error:", errorData);

    //             const message = errorData?.errors?.[0]?.msg || errorData?.message || "Failed to update quiz";
    //             alert(message);
    //         }
    //         const data = await response.json();
    //         console.log("Failed to update quiz");
    //         return data;
    //     } catch (error: any) {
    //         console.error('Unexpected error:', error);
    //     }
    // }

    const updatedQuizData = async (quizId: number, newQuizData: any) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quiz/${quizId}`;
        const pad = (num: number) => String(num).padStart(2, '0');

        try {
            const formData = new FormData();

            formData.append('job_id', newQuizData.job_id);
            formData.append('title', newQuizData.title);
            formData.append('description', newQuizData.description);
            formData.append('method', newQuizData.method);
            formData.append('totalQuestions', parseInt(newQuizData.totalQuestions, 10));

            const formattedTime = `${pad(newQuizData.timeLimit.hours)}:${pad(newQuizData.timeLimit.minutes)}:${pad(newQuizData.timeLimit.seconds)}`;
            formData.append('totalTime', formattedTime);

            // Handle question files
            const preparedQuestions = newQuizData.questionsList.map((q: any, index: number) => {
                // If question type is "file_upload" and a new file is provided
                if (q.type === "file_upload" && q.file?.file instanceof File) {
                    formData.append(`question_file_${index}`, q.file.file);
                    return { ...q, file: `question_file_${index}` }; // Keep a reference in JSON
                }
                return q;
            });

            //  Append questionsList as JSON string
            formData.append('questionsList', JSON.stringify(preparedQuestions));

            // If a main task file exists for the quiz
            if (newQuizData.Task_File instanceof File) {
                formData.append('file_upload', newQuizData.Task_File);
            }

            //  Send request
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    'Authorization': token,
                    //  Don't set Content-Type manually; FormData will handle it
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend error:", data);
                const message = data?.errors?.[0]?.msg || data?.message || "Failed to update quiz";
                alert(message);
                return { success: false, message };
            }

            console.log("Quiz updated successfully");
            return { success: true, data };

        } catch (error: any) {
            console.error('Unexpected error:', error);
            return { success: false, message: 'Unexpected error occurred' };
        }
    };


    const addQuiz = async (quizData: any) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quiz`;
        const pad = (num: number) => String(num).padStart(2, '0');

        try {
            console.log('quizData ============= >', quizData);

            const formData = new FormData();

            formData.append('job_id', quizData.job_id);
            formData.append('title', quizData.title);
            formData.append('description', quizData.description);
            formData.append('method', quizData.method);

            const formattedTime = `${pad(quizData.timeLimit.hours)}:${pad(quizData.timeLimit.minutes)}:${pad(quizData.timeLimit.seconds)}`;
            formData.append('totalTime', formattedTime);
            formData.append('totalQuestions', quizData.totalQuestions);

            //  Handle question files before converting to JSON
            const preparedQuestions = quizData.questionsList.map((q: any, index: number) => {
                if (q.type === "file_upload" && q.file?.file instanceof File) {
                    // Add actual file from input or dropzone
                    formData.append(`question_file_${index}`, q.file.file);
                    // Keep only the file reference in JSON
                    return { ...q, file: `question_file_${index}` };
                }
                return q;
            });

            //  Append questionsList as JSON string
            formData.append('questionsList', JSON.stringify(preparedQuestions));

            // If a main task file exists
            if (quizData.Task_File instanceof File) {
                formData.append('file_upload', quizData.Task_File);
            }

            // Send request
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    //  Don't set Content-Type manually
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Backend error:", data);
                const message = data?.errors?.[0]?.msg || data?.message || "Failed to add quiz";
                alert(message);
                return { success: false, message };
            }

            console.log(" Quiz added successfully");
            return { success: true, data };

        } catch (error: any) {
            console.error('Unexpected error:', error);
            return { success: false, message: 'Unexpected error occurred' };
        }
    };


    const updateQuizStatus = async (quizId: Number, newStatus: string) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quiz/status/${quizId}`;
        try {

            // console.log('quizData ============= >', quizData);
            const response = await fetch(url, {
                method: "PATCH",
                headers: {

                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                    status: newStatus
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);

                const message = errorData?.errors?.[0]?.msg || errorData?.message || "Failed to update quiz status";
                alert(message);
            }
            const data = await response.json();
            console.log("Failed to update quiz status");
            return data;
        } catch (error: any) {
            console.error('Unexpected error:', error);
        }
    }

    const deleteQuiz = async (quizId: number) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quiz/${quizId}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                },
            });

            const data = await response.json();

            if (!response.ok) {
                const message = data?.errors?.[0]?.msg || data?.message || "Failed to delete quiz";
                console.error("Backend error:", message);
                alert(message);
                return { success: false, message };
            }

            console.log("Quiz deleted successfully");
            return data;

        } catch (error: any) {
            console.error('Unexpected error:', error);
            return { success: false, message: error.message || "Unexpected error" };
        }
    }

    const getCandidatesForQuiz = async (jobId: number, SetCandidateList: any) => {

        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quiz/candidates/${jobId}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
            }
            const data = await response.json();
            SetCandidateList(data.data);
            return data;
        } catch (error: any) {
            console.error('Unexpected error:', error);
        }
    }

    const assignCandidates = async (quizId: number, candidateIds: []) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quizzes/${quizId}/assign-candidates`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    candidateIds: candidateIds
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
            }
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error('Unexpected error:', error);
        }
    }

    const getAssignDataToQuiz = async (
        quizId: any,
        setData: any,
        setDataError: any,
        setDataLoading: any
    ) => {
        if (!currentUser) {
            console.warn('No current user found');
            setDataError('User not authenticated');
            return { success: false, message: 'User not authenticated' };
        }

        setDataLoading(true);
        setDataError(null);

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quizzes/${quizId}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch assign data");
            }

            if (!result.data) {
                throw new Error("No assign data returned from server");
            }

            setData(result.data);
            console.log("✅ Assigned Quiz Data:", result.data);

            return { success: true, data: result.data };

        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            setDataError(message);
            console.error("❌ Error fetching assigned data:", message);

            return { success: false, message };

        } finally {
            setDataLoading(false);
        }
    };

    const quizReview = async (setQuizReview: any, quizCandidateId: number, setQuizReviewLoading: any, setQuizReviewError: any) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        setQuizReviewLoading(true);
        setQuizReviewError(null);

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}quiz-candidates/${quizCandidateId}/review`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch assign data");
            }

            if (!result.data) {
                throw new Error("No  Quiz Review data returned from server");
            }

            setQuizReview(result.data);
            console.log(" Quiz Review Data:", result.data);
            return result;

        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            setQuizReviewError(message);
            console.error("Error fetching Quiz Review:", message);

            return { success: false, message };

        } finally {
            setQuizReviewLoading(false);
        }
    }

    // const updateQuestionScore = async (quizCandidateId: number, questionId: number, score: number, isCorrect: any) => {
    //     if (!currentUser) {
    //         console.warn('No current user found');
    //         return { success: false, message: 'User not authenticated' };
    //     }



    //     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    //     const url = `${path}quiz-candidates/score/${quizCandidateId}`;

    //     try {
    //         const response = await fetch(url, {
    //             method: "PATCH",
    //             headers: {
    //                 Authorization: token,
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         const result = await response.json();

    //         if (!response.ok) {
    //             throw new Error(result.message || "Failed to fetch assign data");
    //         }

    //         if (!result.data) {
    //             throw new Error("No  Quiz Review data returned from server");
    //         }


    //         console.log(" Quiz Review Data:", result.data);
    //         return result;

    //     } catch (error: any) {
    //         const message = error.message || "Unexpected error occurred";

    //         console.error("Error fetching Quiz Review:", message);

    //         return message;

    //     }
    // }


    const updateQuestionScore = async (
        quizCandidateId: number,
        questionId: number,
        score: number,
        isCorrect: boolean
    ) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        // const url = `${path}candidate-answer/${quizCandidateId}/score`;
        const url = `${path}quiz-candidates/${quizCandidateId}/score`;

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questionId,
                    score,
                    is_correct: isCorrect,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update score");
            }

            console.log("Score updated:", result.data);
            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error updating score:", message);
            return { success: false, message };
        }
    };


    return {

        addJob,
        addIntern,
        getJobs,
        deleteJob,
        updateStatus,
        updateJob,
        updateIntern,
        getJobsApplications,
        getAllJobsTitle,
        updateHiringStage,
        getMatchedJobs,
        addQuiz,
        getAllQuizzes,
        updatedQuizData,
        updateQuizStatus,
        deleteQuiz,
        getCandidatesForQuiz,
        assignCandidates,
        getAssignDataToQuiz,
        quizReview,
        updateQuestionScore
    };
};
