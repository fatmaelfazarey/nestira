import { useAuth } from '@/contexts/AuthContext';
import { IP } from '../Path';
import Assessments from '@/pages/Assessments';
const path = `${IP}/api/admin/`;

export const useAdminStore = () => {
    const { currentUser } = useAuth();
    const generateCandidatesEmbeddings = async (candidateId: string) => {
        if (!currentUser) {
            console.warn('No current user found');
            return { success: false, message: 'User not authenticated' };
        }

        console.log('generateCandidatesEmbeddings....')
        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}embed-data`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    candidateId: candidateId,
                }),
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Error during embedding:', errorMessage);
                throw new Error(`Failed to embed candidate dat : ${errorMessage}`);
            }
            const data = await response.json();
            alert("Embedding completed successfully:")
            console.log("Embedding completed successfully:", data);
            return data;

        } catch (error) {
            if (error instanceof Error) {
                alert("An error occurred while generating embeddings. This candidate will not appear in AI Search results.");
                console.error('Error during embedding:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const getMeetings = async (setMeetings: any, setLoading: any, setError: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }
        setLoading(true);
        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}meetings`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to GET Meeting");
            }
            setMeetings(result.data);
            return result;
        } catch (error: any) {
            setError(error.message);
            const message = error.message || "Unexpected error occurred";
            console.error("Error  GET Meeting:", message);
        } finally {
            setLoading(false);
        }
    }

    const setMeeingReaded = async (meetingID: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}meetings/${meetingID}`;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to GET Meeting");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  GET Meeting:", message);
        }
    }

    const addHelpArticle = async (articleData: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}add-help-article`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...articleData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to add help article");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  add-help-article:", message);
        }
    }

    const addPlan = async (planData: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}add-plan`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...planData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to add  ploan");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  add plan:", message);
        }
    }

    const getAllPlans = async () => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}plans`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to GET  plans");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  GET plans:", message);
        }
    }

    const deletePlan = async (planId: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}plan-delete/${planId}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                return result;
                throw new Error(result.message || "Failed to DELETE  plan");
            }
            console.log('result ', result)
            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  DELETE  plan :", message);
        }
    }

    const RecruitersJobsCount = async () => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}recruiters/jobs-count`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to GET  RecruitersJobsCount");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  GET RecruitersJobsCount:", message);
        }
    }

    const getBlogs = async (setBlog: any, setBlogsLoading: any, setBlogsError: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            setBlogsError("User not authenticated");
            return { success: false, message: "User not authenticated" };
        }

        setBlogsLoading(true);
        setBlogsError(null);

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}blogs`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to GET getBlogs");
            }

            setBlog(result);
            return result;

        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error GET getBlogs:", message);
            setBlogsError(message);
            return { success: false, message };
        } finally {
            setBlogsLoading(false);
        }
    };

    const getArticles = async (setArticles: any, setArticlessLoading: any, setArticlessError: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            setArticlessError("User not authenticated");
            return { success: false, message: "User not authenticated" };
        }

        setArticlessLoading(true);
        setArticlessError(null);

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}articles`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to GET getArticless");
            }

            setArticles(result);
            return result;

        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error GET getArticless:", message);
            setArticlessError(message);
            return { success: false, message };
        } finally {
            setArticlessLoading(false);
        }
    };

    const AddReport = async (reportData: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}add-article`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...reportData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to AddReport");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  AddReport:", message);
        }
    }

    const AddBlog = async (blogData: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}add-blog`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...blogData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to blogData");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  blogData:", message);
        }
    }

    const deleteBlog = async (blogId: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}blog/${blogId}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to deleteBlog");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  deleteBlog:", message);
        }
    }

    const deleteArticle = async (blogId: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}article/${blogId}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to deleteArticle");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  deleteArticle:", message);
        }
    }

    // const updateBlog = async () => {

    // }
    // const updateReport = async () => {

    // }
    const updateBlog = async (blogId: any, newData: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}blog/${blogId}`;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...newData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to updateBlog");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  updateBlog:", message);
        }
    }
    const updateReport = async (articleId: any, newData: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}article/${articleId}`;
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...newData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to updateReport");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  updateReport:", message);
        }
    }

    const sendCandidateEmail = async (candidateId: any, emailData: any) => {

        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}candidate/send-mail/${candidateId}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...emailData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to sendCandidateEmail");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  sendCandidateEmail:", message);
        }
    }

    const sendVerificationMail = async (candidateId: any, emailData: any) => {

        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}candidate/send-verification-mail/${candidateId}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    ...emailData
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to sendVerificationMail");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  sendVerificationMail:", message);
        }
    }

    const deleteCandidate = async (candidateId: any) => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}candidate/${candidateId}`;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to deleteCandidate");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  deleteCandidate:", message);
        }
    }

    const getAdminDashboardMetrics = async () => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}dashboard-metrics`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to GET  getAdminDashboardMetrics");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  GET getAdminDashboardMetrics:", message);
        }
    }

    const getAdminDashboardCharts = async () => {
        if (!currentUser) {
            console.warn("No current user found");
            return { success: false, message: "User not authenticated" };
        }

        const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
        const url = `${path}dashboard-charts`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                }
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to GET  getAdminDashboardCharts");
            }

            return result;
        } catch (error: any) {
            const message = error.message || "Unexpected error occurred";
            console.error("Error  GET getAdminDashboardCharts:", message);
        }
    }

    return {
        generateCandidatesEmbeddings,
        getMeetings,
        setMeeingReaded,
        addHelpArticle,
        addPlan,
        getAllPlans,
        deletePlan,
        RecruitersJobsCount,
        getBlogs,
        getArticles,
        AddReport,
        AddBlog,
        deleteBlog,
        deleteArticle,
        updateBlog,
        updateReport,
        sendCandidateEmail,
        sendVerificationMail,
        deleteCandidate,
        getAdminDashboardMetrics,
        getAdminDashboardCharts
    };
};
