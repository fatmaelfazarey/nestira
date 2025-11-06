import React, { useEffect, useState } from 'react'
import { useCandidateStore } from "@/store/candidate store/CandidateStore";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Download, Eye, Clock, AlertTriangle } from 'lucide-react';
import { IP } from '@/store/Path';

// Define proper TypeScript interfaces
interface Answer {
    questionId: number;
    type: string;
    question_answer: any;
    timestamp: string;
}

interface AnswersState {
    id: any;
    answers: Answer[];
}

interface Question {
    id: number;
    question_text: string;
    question_type: string;
    options?: string[];
    task_file_name?: string;
    task_file_path?: string;
}

interface Assessment {
    title?: string;
    description?: string;
    end_time?: string;
    status?: string;
    questions_count?: number;
    questionsList?: Question[];
}

const TakeAssessment = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();

    // Quiz Data with proper typing
    const [assessment, setAssessment] = useState<Assessment>({});

    // Loading & Error Handling
    const [assessmentLoading, setAssessmentLoading] = useState<boolean>(false);
    const [assessmentError, setAssessmentError] = useState<string | null>(null);

    // Answers State with proper structure
    const [answers, setAnswers] = useState<AnswersState>({ id: assessmentId, answers: [] });

    // Timer State
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [timerActive, setTimerActive] = useState<boolean>(false);
    const [timeWarningShown, setTimeWarningShown] = useState<boolean>(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

    // For File Upload Progress
    const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
    const { fetchAssessmentData, submitAnswersData } = useCandidateStore();

    // Calculate time left based on end_time from backend
    const calculateTimeLeft = (endTime: string): number => {
        try {
            if (!endTime) return 0;

            let end: Date;

            // Check if it's ISO format (contains T and Z)
            if (endTime.includes('T') && endTime.includes('Z')) {
                end = new Date(endTime);
            } else {
                // It's MySQL DATETIME format
                end = new Date(endTime.replace(' ', 'T') + 'Z');
            }

            const now = new Date();

            if (isNaN(end.getTime())) {
                console.error('Invalid end time:', endTime);
                return 0;
            }

            const difference = end.getTime() - now.getTime();
            return Math.max(0, Math.floor(difference / 1000));
        } catch (error) {
            console.error('Error calculating time left:', error);
            return 0;
        }
    };

    // Check if assessment has expired
    const hasAssessmentExpired = (endTime: string): boolean => {
        try {
            if (!endTime) return true;

            let end: Date;

            if (endTime.includes('T') && endTime.includes('Z')) {
                end = new Date(endTime);
            } else {
                end = new Date(endTime.replace(' ', 'T') + 'Z');
            }

            const now = new Date();

            if (isNaN(end.getTime())) {
                console.error('Invalid end time in expiry check:', endTime);
                return true;
            }

            return now >= end;
        } catch (error) {
            console.error('Error checking expiry:', error);
            return true;
        }
    };

    // Format seconds to HH:MM:SS
    const formatTime = (seconds: number): string => {
        if (isNaN(seconds) || seconds < 0) return '00:00:00';

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Auto-submit when time is up
    const autoSubmit = async () => {
        if (hasSubmitted) return;

        setTimerActive(false);
        setHasSubmitted(true);
        toast.warning('Time is up! Submitting your assessment automatically.');

        await submitAnswers();
    };

    // Submit answers to backend
 
    // const submitAnswers = async () => {
    //     try {
    //         if (!assessment.questionsList) return;

    //         const completedAnswers = assessment.questionsList.map((q: any) => {
    //             const existing = answers.answers.find(a => a.questionId === q.id);

    //             return existing || {
    //                 questionId: q.id,
    //                 type: q.question_type,
    //                 question_answer: null,
    //                 timestamp: new Date().toISOString()
    //             };
    //         });

    //         const payload = {
    //             id: assessmentId,
    //             answers: completedAnswers
    //         };

    //         console.log("FINAL SUBMITTED DATA ✅:", payload);

    //         const isSubmit = await submitAnswersData(payload);

    //         if (isSubmit.success) {
    //             toast.success('Assessment submitted successfully!');
    //         } else {
    //             toast.error('Failed to Submit');
    //         }

    //         setTimeout(() => {
    //             navigate('/candidate/assessments');
    //         }, 2000);

    //     } catch (error) {
    //         console.error('Error submitting assessment:', error);
    //         toast.error('Failed to submit assessment. Please try again.');
    //     }
    // };

    // Submit answers to backend - FIXED VERSION
const submitAnswers = async () => {
    try {
        if (!assessment.questionsList) {
            toast.error('No questions found to submit.');
            return;
        }

        // Create answers for ALL questions, including unanswered ones
        const completedAnswers = assessment.questionsList.map((question: Question) => {
            // Find existing answer if user answered this question
            const existingAnswer = answers.answers.find(a => a.questionId === question.id);
            
            if (existingAnswer) {
                // Return the existing answer if user provided one
                return existingAnswer;
            } else {
                // Return null answer for unanswered questions
                return {
                    questionId: question.id,
                    type: question.question_type,
                    question_answer: getDefaultAnswerForType(question.question_type),
                    timestamp: new Date().toISOString()
                };
            }
        });

        const payload = {
            id: assessmentId,
            answers: completedAnswers
        };

        console.log("FINAL SUBMITTED DATA ✅:", payload);
        console.log(`Submitting ${completedAnswers.length} questions:`, {
            answered: completedAnswers.filter(a => a.question_answer !== null && a.question_answer !== '').length,
            unanswered: completedAnswers.filter(a => a.question_answer === null || a.question_answer === '').length
        });

        const isSubmit = await submitAnswersData(payload);

        if (isSubmit.success) {
            toast.success('Assessment submitted successfully!');
        } else {
            toast.error('Failed to Submit');
        }

        setTimeout(() => {
            navigate('/candidate/assessments');
        }, 2000);

    } catch (error) {
        console.error('Error submitting assessment:', error);
        toast.error('Failed to submit assessment. Please try again.');
    }
};

// Helper function to get default null values for different question types
const getDefaultAnswerForType = (questionType: string): any => {
    switch (questionType) {
        case 'mcq':
        case 'true_false':
            return null; // or '' depending on your backend
        case 'short_answer':
            return '';
        case 'file_upload':
            return null;
        default:
            return null;
    }
};

// FIXED: Handle answer changes for different question types
const handleAnswerChange = (questionId: number, value: any, questionType: string) => {
    setAnswers(prev => {
        const newAnswer = {
            questionId: questionId,
            type: questionType,
            question_answer: value,
            timestamp: new Date().toISOString()
        };

        // Filter out existing answer for this question and add new one
        const filteredAnswers = prev.answers.filter(
            answer => answer.questionId !== questionId
        );

        const updatedAnswers = [...filteredAnswers, newAnswer];

        console.log(`Question ${questionId} answered:`, value);
        console.log(`Total answers: ${updatedAnswers.length}`);

        return {
            ...prev,
            answers: updatedAnswers
        };
    });
};

// FIXED: Check if question is answered (more accurate)
const isQuestionAnswered = (questionId: number): boolean => {
    const answer = answers.answers.find(answer => answer.questionId === questionId);
    if (!answer) return false;
    
    // Check if the answer has actual content based on question type
    const answerValue = answer.question_answer;
    
    if (answerValue === null || answerValue === undefined) return false;
    if (typeof answerValue === 'string' && answerValue.trim() === '') return false;
    if (typeof answerValue === 'object' && Object.keys(answerValue).length === 0) return false;
    
    return true;
};

// Calculate completion percentage (more accurate)
const completionPercentage = assessment.questionsList ?
    Math.round((answers.answers.filter(answer => isQuestionAnswered(answer.questionId)).length / assessment.questionsList.length) * 100) : 0;

    // Initialize timer based on backend end_time
    const initializeTimer = (endTime: string) => {
        if (!endTime) {
            console.log('No end time provided');
            return;
        }

        // Check if assessment has already expired
        if (hasAssessmentExpired(endTime)) {
            console.log('Assessment has expired on initialization');
            toast.error('This assessment has expired.');
            setTimeLeft(0);
            setTimerActive(false);
            return;
        }

        const initialTimeLeft = calculateTimeLeft(endTime);

        if (initialTimeLeft <= 0) {
            console.log('Time left is 0 or negative, auto-submitting');
            setTimeLeft(0);
            setTimerActive(false);
            autoSubmit();
            return;
        }

        setTimeLeft(initialTimeLeft);
        setTimerActive(true);

        // Show warning if less than 10 minutes left
        if (initialTimeLeft <= 600 && initialTimeLeft > 0) {
            toast.warning('Less than 10 minutes remaining!');
            setTimeWarningShown(true);
        }
    };

    // Fetch assessment data
    const fetchData = async () => {
        try {
            const result = await fetchAssessmentData(assessmentId, setAssessment, setAssessmentLoading, setAssessmentError);

            if (!result.success) {
                toast.error('Failed to get Assessment data. Please try again.');
                return;
            }

            const assessmentData = result.assessment || result.data?.quiz;

            if (!assessmentData) {
                console.error('No assessment data found in response:', result);
                toast.error('Invalid assessment data received.');
                return;
            }

            setAssessment(assessmentData);

            // Check if assessment has expired
            if (assessmentData.end_time) {
                setTimeout(() => {
                    if (hasAssessmentExpired(assessmentData.end_time)) {
                        console.log('Assessment is expired');
                        toast.error('This assessment has expired and is no longer available.');
                        setAssessmentError('Assessment expired');
                    } else {
                        console.log('Assessment is active');
                        toast.success('You can start the assessment now. Good luck!');
                    }
                }, 100);
            } else {
                toast.success('You can start the assessment now. Good luck!');
            }

        } catch (error) {
            console.error('Error in fetchData:', error);
            toast.error('Failed to load assessment data.');
        }
    }

    // IMPROVED: Handle answer changes for different question types
    // const handleAnswerChange = (questionId: number, value: any, questionType: string) => {
    //     setAnswers(prev => {
    //         const newAnswer = {
    //             questionId: questionId,
    //             type: questionType,
    //             question_answer: value,
    //             timestamp: new Date().toISOString()
    //         };

    //         // Filter out existing answer for this question and add new one
    //         const filteredAnswers = prev.answers.filter(
    //             answer => answer.questionId !== questionId
    //         );

    //         const updatedAnswers = [...filteredAnswers, newAnswer];

    //         return {
    //             ...prev,
    //             answers: updatedAnswers
    //         };
    //     });
    // };

    // Handle file upload with proper answer structure
    const handleFileUpload = (questionId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file size (example: 10MB limit)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error('File size too large. Please select a file smaller than 10MB.');
                event.target.value = '';
                return;
            }

            // Check file type
            const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            if (!allowedTypes.includes(fileExtension)) {
                toast.error('Invalid file type. Please select PDF, DOC, DOCX, or TXT file.');
                event.target.value = '';
                return;
            }

            // Simulate upload progress
            setUploadProgress(prev => ({ ...prev, [questionId]: 0 }));

            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    const newProgress = (prev[questionId] || 0) + 20;
                    if (newProgress >= 100) {
                        clearInterval(progressInterval);

                        // Create file answer object
                        const fileAnswer = {
                            file,
                            fileName: file.name,
                            fileSize: file.size,
                            uploadedAt: new Date().toISOString()
                        };

                        handleAnswerChange(questionId, fileAnswer, 'file_upload');
                        toast.success(`File "${file.name}" uploaded successfully`);
                        return { ...prev, [questionId]: 100 };
                    }
                    return { ...prev, [questionId]: newProgress };
                });
            }, 200);
        }
    };

    // FIXED: Get answer for a specific question from the answers array
    const getAnswerForQuestion = (questionId: number): any => {
        const answer = answers.answers.find(answer => answer.questionId === questionId);
        return answer ? answer.question_answer : null;
    };

    // FIXED: Check if question is answered
    // const isQuestionAnswered = (questionId: number): boolean => {
    //     return answers.answers.some(answer => answer.questionId === questionId);
    // };

    // Calculate completion percentage
    // const completionPercentage = assessment.questionsList ?
    //     Math.round((answers.answers.length / assessment.questionsList.length) * 100) : 0;

    const handleCvAction = (question: any, action: 'view' | 'download') => {
        if (!question.task_file_path) {
            toast.error('No file available');
            return;
        }

        try {
            const url = `${IP}/${question.task_file_path.replace(/^\/+/, '')}`;

            if (action === 'view') {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                const link = document.createElement('a');
                link.href = url;
                link.download = question.task_file_name || 'download';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('Download started');
            }
        } catch (error) {
            console.error('Error handling file:', error);
            toast.error('Error processing file');
        }
    };

    // Submit assessment manually
    const handleSubmit = async () => {
        if (hasSubmitted) {
            toast.info('Assessment has already been submitted.');
            return;
        }

        // Validate that all questions are answered
        const unansweredQuestions = assessment.questionsList?.filter((question: any) =>
            !isQuestionAnswered(question.id)
        );

        if (unansweredQuestions?.length > 0) {
            const confirmSubmit = window.confirm(
                `You have ${unansweredQuestions.length} unanswered question(s). Are you sure you want to submit?`
            );
            if (!confirmSubmit) return;
        }

        setTimerActive(false);
        setHasSubmitted(true);
        await submitAnswers();
    };

    // Get timer color based on remaining time
    const getTimerColor = () => {
        if (timeLeft <= 300) return 'text-red-600';
        if (timeLeft <= 900) return 'text-orange-600';
        return 'text-green-600';
    };

    // Get timer border color
    const getTimerBorderColor = () => {
        if (timeLeft <= 300) return 'border-red-500';
        if (timeLeft <= 900) return 'border-orange-500';
        return 'border-green-500';
    };

    // Check if assessment is expired or submitted
    const isAssessmentDisabled = hasSubmitted || timeLeft <= 0;

    // Render different question types (updated to use getAnswerForQuestion)
    const renderQuestion = (question: Question) => {
        const { id, question_text, question_type, options, task_file_name } = question;
        const answerValue = getAnswerForQuestion(id);

        switch (question_type) {
            case 'mcq':
                return (
                    <div className="mb-6 p-4 border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-3">{question_text}</h3>
                        <div className="space-y-2">
                            {options?.map((option: string, index: number) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name={`question-${id}`}
                                        value={option}
                                        checked={answerValue === option}
                                        onChange={(e) => handleAnswerChange(id, e.target.value, question_type)}
                                        className="w-4 h-4 text-orange-600"
                                        disabled={isAssessmentDisabled}
                                    />
                                    <span className="flex-1">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );

            case 'true_false':
                return (
                    <div className="mb-6 p-4 border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-3">{question_text}</h3>
                        <div className="space-y-2">
                            {options?.map((option: string, index: number) => (
                                <label key={index} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name={`question-${id}`}
                                        value={option}
                                        checked={answerValue === option}
                                        onChange={(e) => handleAnswerChange(id, e.target.value, question_type)}
                                        className="w-4 h-4 text-orange-600"
                                        disabled={isAssessmentDisabled}
                                    />
                                    <span className="flex-1">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );

            case 'short_answer':
                return (
                    <div className="mb-6 p-4 border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-3">{question_text}</h3>
                        <textarea
                            placeholder="Type your answer here..."
                            value={answerValue || ''}
                            onChange={(e) => handleAnswerChange(id, e.target.value, question_type)}
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
                            rows={4}
                            disabled={isAssessmentDisabled}
                        />
                    </div>
                );

            case 'file_upload':
                return (
                    <div className="mb-6 p-4 border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-3">{question_text}</h3>

                        {task_file_name && (
                            <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-700 mb-2">Provided file:</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-green-600 truncate flex-1">
                                        {task_file_name}
                                    </span>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 text-xs"
                                            onClick={() => handleCvAction(question, 'view')}
                                        >
                                            <Eye className="h-3 w-3 mr-1" />
                                            View
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 text-xs"
                                            onClick={() => handleCvAction(question, 'download')}
                                        >
                                            <Download className="h-3 w-3 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <input
                                    type="file"
                                    onChange={(e) => handleFileUpload(id, e)}
                                    className="w-full cursor-pointer"
                                    accept=".pdf,.doc,.docx,.txt"
                                    disabled={isAssessmentDisabled}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                                </p>
                            </div>

                            {uploadProgress[id] !== undefined && uploadProgress[id] < 100 && (
                                <div className="space-y-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-orange-600 h-2.5 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress[id]}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 block text-center">
                                        Uploading... {uploadProgress[id]}%
                                    </span>
                                </div>
                            )}

                            {answerValue && (
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-green-700 text-sm font-medium">
                                        ✓ File uploaded: {answerValue.fileName}
                                    </p>
                                    <p className="text-green-600 text-xs">
                                        Size: {(answerValue.fileSize / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="mb-6 p-4 border rounded-lg bg-white">
                        <h3 className="text-lg font-semibold mb-3">{question_text}</h3>
                        <p className="text-red-500">Unsupported question type: {question_type}</p>
                    </div>
                );
        }
    };

    // Effects
    useEffect(() => {
        fetchData();
    }, [assessmentId]);

    useEffect(() => {
        if (assessment.end_time && assessment.questionsList) {
            setTimeout(() => {
                initializeTimer(assessment.end_time!);
            }, 200);
        }
    }, [assessment.end_time, assessment.questionsList]);

    // Timer countdown effect
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (timerActive && timeLeft > 0 && !hasSubmitted) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1;

                    if (newTime === 300 && !timeWarningShown) {
                        toast.warning('Only 5 minutes remaining!');
                        setTimeWarningShown(true);
                    }

                    if (newTime === 60) {
                        toast.warning('Only 1 minute remaining!');
                    }

                    if (newTime <= 0) {
                        clearInterval(timer);
                        autoSubmit();
                        return 0;
                    }

                    return newTime;
                });
            }, 1000);
        } else if (timeLeft <= 0 && timerActive && !hasSubmitted) {
            autoSubmit();
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timerActive, timeLeft, timeWarningShown, hasSubmitted]);

    if (assessmentLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading assessment...</div>
            </div>
        );
    }

    if (assessmentError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-lg">Error: {assessmentError}</div>
                <Button
                    onClick={fetchData}
                    className="ml-4"
                    variant="outline"
                >
                    Retry
                </Button>
            </div>
        );
    }

    if (!assessment.questionsList || assessment.questionsList.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-center">
                    <p>No assessment questions found.</p>
                    <Button
                        onClick={fetchData}
                        className="mt-4"
                        variant="outline"
                    >
                        Reload Assessment
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Timer and Progress Section */}
                <div className="mb-6 space-y-4">
                    {/* Timer */}
                    {assessment.end_time && (
                        <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${getTimerBorderColor()}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Clock className={`h-5 w-5 ${getTimerColor()}`} />
                                    <span className="text-sm font-medium text-gray-700">Time Remaining:</span>
                                </div>
                                <div className={`text-xl font-bold ${getTimerColor()} font-mono`}>
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                            {timeLeft <= 300 && timeLeft > 0 && (
                                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>Time is running out! Submit your answers soon.</span>
                                </div>
                            )}
                            {timeLeft <= 0 && (
                                <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>Time has expired. Assessment will be submitted automatically.</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Progress Indicator */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Progress: {answers.answers.length} of {assessment.questionsList?.length} answered
                            </span>
                            <span className="text-sm font-medium text-orange-600">
                                {completionPercentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Assessment Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {assessment.title || 'Assessment'}
                    </h1>
                    <p className="text-gray-600 mb-4">{assessment.description || 'No description provided'}</p>
                    <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-500">
                        <span>Questions: {assessment.questions_count || 0}</span>
                        <span>Ends at: {assessment.end_time ? new Date(assessment.end_time.replace(' ', 'T') + 'Z').toLocaleString() : 'No time limit'}</span>
                        <span className={`px-2 py-1 rounded ${assessment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            Status: {assessment.status || 'unknown'}
                        </span>
                    </div>
                </div>

                {/* Questions List */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">Assessment Questions</h2>
                    <div className="space-y-6">
                        {assessment.questionsList?.map((question: Question, index: number) => (
                            <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start space-x-3 mb-4">
                                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium min-w-8 text-center">
                                        {index + 1}
                                    </span>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs capitalize">
                                        {question.question_type.replace('_', ' ')}
                                    </span>
                                    {isQuestionAnswered(question.id) && (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                            Answered
                                        </span>
                                    )}
                                    {isAssessmentDisabled && (
                                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                            {hasSubmitted ? 'Submitted' : 'Expired'}
                                        </span>
                                    )}
                                </div>
                                {renderQuestion(question)}
                            </div>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                            size="lg"
                            disabled={isAssessmentDisabled}
                        >
                            {hasSubmitted ? 'Submitted' : timeLeft <= 0 ? 'Time Expired' : 'Submit Assessment'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TakeAssessment;