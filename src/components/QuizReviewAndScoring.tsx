// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { CheckCircle2, Clock, X } from 'lucide-react';
// import { useEmployerStore } from '@/store/employer store/EmployerStore';
// import { toast } from 'sonner';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// interface QuizReviewAndScoringModalProps {
//     open: boolean;
//     onClose: () => void;
//     candidate: any
//     quiz: any
// }

// const QuizReviewAndScoring = ({ open, onClose, candidate, quiz }: QuizReviewAndScoringModalProps) => {
//     console.log('candidate => ', candidate)
//     console.log('quiz => ', quiz)

//     // setQuizReview: any, quizCandidateId: number, setQuizReviewLoading: any, setQuizReviewError: any

//     const { quizReview } = useEmployerStore();
//     const [quizReviewData, setQuizReviewData] = useState();
//     const [quizReviewLoading, setQuizReviewLoading] = useState();
//     const [quizReviewError, setQuizReviewError] = useState();


//     useEffect(() => {
//         fetchQuizReview()
//     }, [])


//     const fetchQuizReview = async () => {
//         const data = await quizReview(setQuizReviewData, candidate?.quiz_candidate_id, setQuizReviewLoading, setQuizReviewError);
//         if (!data.success) {
//             toast.error('failed to get quiz review');
//         }
//     }
//     return (
//         <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
//             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">



//                 <DialogHeader>
//                     <div className="flex items-center justify-between">
//                         <DialogTitle className="text-2xl font-bold text-primary">
//                             Quiz Preview: {quiz.quizName}
//                         </DialogTitle>
//                         <DialogClose asChild>
//                             <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                                 <X className="h-4 w-4" />
//                             </Button>
//                         </DialogClose>
//                     </div>
//                     {quiz.description && (
//                         <p className="text-gray-600">{quiz.description}</p>
//                     )}
//                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <div className="flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             <span>Time limit : {quiz.duration} </span>
//                         </div>
//                         <span>Total Questions: {quiz.questions_count} questions</span>
//                     </div>
//                 </DialogHeader>




//                 <DialogHeader>
//                     <div className="flex items-center justify-between">
//                         <DialogTitle className="text-2xl font-bold text-primary">
//                             Candidate Name: {candidate?.fullName}
//                         </DialogTitle>


//                     </div>

//                     <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
//                         <div className="flex items-center gap-2">

//                             <span>Status : {candidate?.status} </span>
//                         </div>
//                         <span>Score Status : {candidate?.status_score} </span>
//                     </div>
//                 </DialogHeader>



//                 <div className="mt-6">
//                     {quizReviewData?.questions.length === 0 ? (
//                         <div className="text-center py-8">
//                             <p className="text-gray-500">No questions added to this quiz yet.</p>
//                             <p className="text-sm text-gray-400 mt-2">Add questions in the quiz editor to preview them.</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-6">
//                             <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                                 <div className="flex items-center gap-2 text-green-800">
//                                     <CheckCircle2 className="w-5 h-5" />
//                                     <span className="font-medium">Preview Mode</span>
//                                 </div>
//                                 <p className="text-green-700 text-sm mt-1">
//                                     Correct answers are highlighted in green for review purposes.
//                                 </p>
//                             </div>

//                             {quizReviewData?.questions.map((question, index) => (
//                                 <Card key={question.id}>
//                                     <CardHeader>
//                                         <CardTitle className="text-lg">
//                                             Question {index + 1} of {questions.length}
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-4">
//                                         <h3 className="text-lg font-semibold">
//                                             {question.text}
//                                         </h3>

//                                         {question.type === 'mcq' && (
//                                             <div className="space-y-3">
//                                                 {question.options?.map((option, optionIndex) => (
//                                                     <div
//                                                         key={optionIndex}
//                                                         className={`flex items-center space-x-3 p-3 rounded-lg border ${question.correctAnswer === option
//                                                             ? 'bg-green-50 border-green-200'
//                                                             : 'bg-gray-50 border-gray-200'
//                                                             }`}
//                                                     >
//                                                         <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${question.correctAnswer === option
//                                                             ? 'border-green-500 bg-green-500'
//                                                             : 'border-gray-300'
//                                                             }`}>
//                                                             {question.correctAnswer === option && (
//                                                                 <div className="w-2 h-2 rounded-full bg-white" />
//                                                             )}
//                                                         </div>
//                                                         <span className={`${question.correctAnswer === option
//                                                             ? 'text-green-800 font-medium'
//                                                             : 'text-gray-700'
//                                                             }`}>
//                                                             {option}
//                                                         </span>
//                                                         {question.correctAnswer === option && (
//                                                             <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
//                                                         )}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}

//                                         {question.type === 'true_false' && (
//                                             <div className="space-y-3">
//                                                 {['True', 'False'].map((option) => (
//                                                     <div
//                                                         key={option}
//                                                         className={`flex items-center space-x-3 p-3 rounded-lg border ${question.correctAnswer === option
//                                                             ? 'bg-green-50 border-green-200'
//                                                             : 'bg-gray-50 border-gray-200'
//                                                             }`}
//                                                     >
//                                                         <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${question.correctAnswer === option
//                                                             ? 'border-green-500 bg-green-500'
//                                                             : 'border-gray-300'
//                                                             }`}>
//                                                             {question.correctAnswer === option && (
//                                                                 <div className="w-2 h-2 rounded-full bg-white" />
//                                                             )}
//                                                         </div>
//                                                         <span className={`${question.correctAnswer === option
//                                                             ? 'text-green-800 font-medium'
//                                                             : 'text-gray-700'
//                                                             }`}>
//                                                             {option}
//                                                         </span>
//                                                         {question.correctAnswer === option && (
//                                                             <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
//                                                         )}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         )}

//                                         {question.type === 'short_answer' && (
//                                             <div className="space-y-2">
//                                                 <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
//                                                     <span className="text-gray-600 text-sm">Answer field (text input)</span>
//                                                 </div>
//                                                 {question.correctAnswer && (
//                                                     <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
//                                                         <div className="flex items-center gap-2">
//                                                             <CheckCircle2 className="w-4 h-4 text-green-600" />
//                                                             <span className="text-sm font-medium text-green-800">Expected Answer:</span>
//                                                         </div>
//                                                         <p className="text-green-700 mt-1">{question.correctAnswer}</p>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )}
//                                         {question.type === 'file_upload' && (

//                                             <>
//                                                 <div className="text-sm font-medium text-green-600">
//                                                     {question.task_file_name}
//                                                 </div>
//                                                 {/* <div className="flex gap-1">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="h-6 text-xs"
//                           onClick={() => handleCvAction(question, 'view')}
//                         >
//                           <Eye className="h-3 w-3 mr-1" />
//                           View
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="h-6 text-xs"
//                           onClick={() => handleCvAction(question, 'download')}
//                         >
//                           <Download className="h-3 w-3 mr-1" />
//                           Download
//                         </Button>
//                       </div> */}
//                                             </>
//                                         )}
//                                     </CardContent>
//                                 </Card>
//                             ))}

//                         </div>
//                     )}
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default QuizReviewAndScoring;




import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, X, Eye, Download } from 'lucide-react';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { IP } from '@/store/Path';

interface QuizReviewAndScoringModalProps {
    open: boolean;
    onClose: () => void;
    candidate: any;
    quiz: any;
}

interface Question {
    questionId: number;
    question_text: string;
    question_type: string;
    options: string[];
    correct_answer: string;
    task_file_name: string | null;
    task_file_path: string | null;
    candidateAnswerId: number;
    candidateAnswer: string;
    candidateAnswerFileName: string | null;
    candidateAnswerFilePath: string | null;
    is_correct: number | null;
    score: number | null;
}

interface QuizReviewData {
    quiz_candidate_id: number;
    score: string;
    status: string;
    status_score: string;
    questions: Question[];
}

const QuizReviewAndScoring = ({ open, onClose, candidate, quiz }: QuizReviewAndScoringModalProps) => {
    const { quizReview, updateQuestionScore } = useEmployerStore();
    const [quizReviewData, setQuizReviewData] = useState<QuizReviewData | null>(null);
    const [quizReviewLoading, setQuizReviewLoading] = useState(false);
    const [quizReviewError, setQuizReviewError] = useState<string | null>(null);
    const [manualScores, setManualScores] = useState<{ [key: number]: number }>({});
    const [manualCorrect, setManualCorrect] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (open && candidate?.quiz_candidate_id) {
            fetchQuizReview();
        }
    }, [open, candidate?.quiz_candidate_id]);

    const fetchQuizReview = async () => {
        setQuizReviewLoading(true);
        setQuizReviewError(null);
        try {
            // Call quizReview with the correct parameters based on your store function
            const result = await quizReview(
                setQuizReviewData,
                candidate?.quiz_candidate_id,
                setQuizReviewLoading,
                setQuizReviewError
            );

            if (result.success) {
                // The data should already be set by the store function via setQuizReviewData
                // But we also need to initialize manual scoring state
                if (result.data) {
                    initializeManualScoring(result.data.questions);
                }
            } else {
                toast.error(result.message || 'Failed to get quiz review');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quiz review';
            setQuizReviewError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setQuizReviewLoading(false);
        }
    };

    const initializeManualScoring = (questions: Question[]) => {
        const initialScores: { [key: number]: number } = {};
        const initialCorrect: { [key: number]: boolean } = {};

        questions.forEach((question: Question) => {
            if (question.is_correct === null) {
                initialScores[question.questionId] = question.score || 0;
                initialCorrect[question.questionId] = false;
            }
        });

        setManualScores(initialScores);
        setManualCorrect(initialCorrect);
    };

    const handleScoreChange = (questionId: number, score: number) => {
        setManualScores(prev => ({
            ...prev,
            [questionId]: Math.max(0, score)
        }));
    };

    const handleCorrectChange = (questionId: number, isCorrect: boolean) => {
        setManualCorrect(prev => ({
            ...prev,
            [questionId]: isCorrect
        }));
    };

    // const handleSaveScore = async (questionId: number) => {
    //     // Implement API call to save manual score
    //     const score = manualScores[questionId];
    //     const isCorrect = manualCorrect[questionId];

    //     // Here you would typically make an API call to update the score
    //     // For now, just show a success message
    //     toast.success(`Score ${score} saved for question ${questionId}`);

    //     // Optional: Update the local state to reflect the manual scoring
    //     if (quizReviewData) {
    //         const updatedQuestions = quizReviewData.questions.map(q =>
    //             q.questionId === questionId
    //                 ? { ...q, score, is_correct: isCorrect ? 1 : 0 }
    //                 : q
    //         );
    //         setQuizReviewData({
    //             ...quizReviewData,
    //             questions: updatedQuestions
    //         });
    //     }
    //     const isUpdated = updateQuestionScore (candidate?.quiz_candidate_id, questionId, score, isCorrect);
    //     if (isUpdated.success) {
    //         toast.success(`Score ${score} saved for question ${questionId}`);
    //     } else {
    //         toast.error('feild yo set score');
    //     }
    // };

    const handleSaveScore = async (questionId: number) => {
        const score = manualScores[questionId];
        const isCorrect = manualCorrect[questionId];

        const result = await updateQuestionScore(
            candidate.quiz_candidate_id,
            questionId,
            score,
            isCorrect
        );

        if (result.success) {
            toast.success('Score updated successfully');
            fetchQuizReview(); // refresh data
        } else {
            toast.error(result.message || 'Failed to update score');
        }
    };

    // const handleCvAction = (question: Question, action: 'view' | 'download') => {
    //     if (action === 'view' && question.candidateAnswerFilePath) {
    //         window.open(question.candidateAnswerFilePath, '_blank');
    //     } else if (action === 'download' && question.candidateAnswerFilePath) {
    //         // Implement download logic
    //         const link = document.createElement('a');
    //         link.href = question.candidateAnswerFilePath;
    //         link.download = question.candidateAnswerFileName || 'download';
    //         link.click();
    //     }
    // };

    const handleCvAction = (question: Question, action: 'view' | 'download') => {
        if (!question.candidateAnswerFilePath) {
            alert('No CV file available');
            return;
        }

        try {
            // Fixed the URL - added protocol and proper path handling
            const url = `${IP}/${question.candidateAnswerFilePath}`;

            if (action === 'view') {
                // Open in new tab
                window.open(url, '_blank');
            } else {
                // Download
                const link = document.createElement('a');
                link.href = url;
                link.download = question.candidateAnswerFilePath;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            // Remove the URL.revokeObjectURL call since we're not creating object URLs
            // setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Error handling CV file:', error);
            alert('Error processing CV file');
        }
    };

    const getAnswerStatus = (question: Question) => {
        if (question.is_correct === 1) return 'correct';
        if (question.is_correct === 0) return 'incorrect';
        return 'pending';
    };

    const getAnswerStatusColor = (status: string) => {
        switch (status) {
            case 'correct': return 'text-green-600';
            case 'incorrect': return 'text-red-600';
            case 'pending': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    const getAnswerStatusBg = (status: string) => {
        switch (status) {
            case 'correct': return 'bg-green-50 border-green-200';
            case 'incorrect': return 'bg-red-50 border-red-200';
            case 'pending': return 'bg-yellow-50 border-yellow-200';
            default: return 'bg-gray-50 border-gray-200';
        }
    };

    if (quizReviewLoading) {
        return (
            <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
                <DialogContent className="max-w-4xl">
                    <div className="flex justify-center items-center py-8">
                        <p>Loading quiz review...</p>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold text-primary">
                            Quiz Review: {quiz?.quizName}
                        </DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogClose>
                    </div>
                    {quiz?.description && (
                        <p className="text-gray-600">{quiz.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Time limit: {quiz?.duration}</span>
                        </div>
                        <span>Total Questions: {quizReviewData?.questions?.length || 0}</span>
                    </div>
                </DialogHeader>

                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold text-primary">
                            Candidate: {candidate?.fullName}
                        </DialogTitle>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-2">
                            <span>Status: {candidate?.status}</span>
                        </div>
                        <span>Score Status: {candidate?.status_score}</span>
                        <span>Final Score: {quizReviewData?.score || '0'}%</span>
                    </div>
                </DialogHeader>

                <div className="mt-6">
                    {!quizReviewData?.questions || quizReviewData.questions.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No questions found for this quiz.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-blue-800">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="font-medium">Review Mode</span>
                                </div>
                                <p className="text-blue-700 text-sm mt-1">
                                    Green indicates correct answers, red indicates incorrect answers.
                                    Questions requiring manual review are highlighted in yellow.
                                </p>
                            </div>

                            {quizReviewData.questions.map((question, index) => {
                                const answerStatus = getAnswerStatus(question);
                                const needsManualReview = question.is_correct === null;

                                return (
                                    <Card key={question.questionId} className={needsManualReview ? 'border-yellow-300 bg-yellow-50' : ''}>
                                        <CardHeader>
                                            <CardTitle className="text-lg flex justify-between items-center">
                                                <span>Question {index + 1} of {quizReviewData.questions.length}</span>
                                                <span className={`text-sm font-medium ${getAnswerStatusColor(answerStatus)}`}>
                                                    {answerStatus === 'correct' && '✓ Correct'}
                                                    {answerStatus === 'incorrect' && '✗ Incorrect'}
                                                    {answerStatus === 'pending' && '⏳ Needs Review'}
                                                </span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <h3 className="text-lg font-semibold">
                                                {question.question_text}
                                            </h3>

                                            {/* Candidate's Answer */}
                                            <div className={`p-3 rounded-lg border ${getAnswerStatusBg(answerStatus)}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-medium">Candidate's Answer:</span>
                                                    <span className={answerStatus === 'correct' ? 'text-green-700' : answerStatus === 'incorrect' ? 'text-red-700' : 'text-yellow-700'}>
                                                        {question.candidateAnswer || 'No answer provided'}
                                                    </span>
                                                </div>
                                                {question.score !== null && (
                                                    <div className="text-sm">
                                                        Score: {question.score} point(s)
                                                    </div>
                                                )}
                                            </div>

                                            {/* Manual Scoring for Pending Questions */}
                                            {needsManualReview && (
                                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                    <h4 className="font-medium text-yellow-800 mb-3">Manual Scoring Required</h4>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-sm font-medium">Correct:</label>
                                                            <input
                                                                type="checkbox"
                                                                checked={manualCorrect[question.questionId] || false}
                                                                onChange={(e) => handleCorrectChange(question.questionId, e.target.checked)}
                                                                className="w-4 h-4"
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-sm font-medium">Score:</label>
                                                            <input
                                                                type="number"
                                                                value={manualScores[question.questionId] || 0}
                                                                onChange={(e) => handleScoreChange(question.questionId, parseInt(e.target.value) || 0)}
                                                                className="w-20 px-2 py-1 border rounded text-sm"
                                                                min="0"
                                                                max="10"
                                                            />
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            className=" border-2 border-secondary-c  text-secondary-c hover:bg-secondary-c hover:text-white"
                                                            onClick={() => handleSaveScore(question.questionId)}
                                                        >
                                                            Save Score
                                                        </Button>

                                                    </div>
                                                </div>
                                            )}

                                            {/* Correct Answer Display */}
                                            {!needsManualReview && (
                                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                                    <div className="flex items-center gap-2 text-green-800">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        <span className="font-medium">Correct Answer:</span>
                                                    </div>
                                                    <p className="text-green-700 mt-1">{question.correct_answer}</p>
                                                </div>
                                            )}

                                            {/* Options for MCQ and True/False */}
                                            {(question.question_type === 'mcq' || question.question_type === 'true_false') && (
                                                <div className="space-y-2">
                                                    <span className="text-sm font-medium text-gray-700">Options:</span>
                                                    {question.options?.map((option, optionIndex) => (
                                                        <div
                                                            key={optionIndex}
                                                            className={`flex items-center space-x-3 p-3 rounded-lg border ${question.correct_answer === option
                                                                ? 'bg-green-50 border-green-200'
                                                                : question.candidateAnswer === option && question.candidateAnswer !== question.correct_answer
                                                                    ? 'bg-red-50 border-red-200'
                                                                    : 'bg-gray-50 border-gray-200'
                                                                }`}
                                                        >
                                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${question.correct_answer === option
                                                                ? 'border-green-500 bg-green-500'
                                                                : question.candidateAnswer === option && question.candidateAnswer !== question.correct_answer
                                                                    ? 'border-red-500 bg-red-500'
                                                                    : 'border-gray-300'
                                                                }`}>
                                                                {(question.correct_answer === option ||
                                                                    (question.candidateAnswer === option && question.candidateAnswer !== question.correct_answer)) && (
                                                                        <div className="w-2 h-2 rounded-full bg-white" />
                                                                    )}
                                                            </div>
                                                            <span className={`${question.correct_answer === option
                                                                ? 'text-green-800 font-medium'
                                                                : question.candidateAnswer === option && question.candidateAnswer !== question.correct_answer
                                                                    ? 'text-red-800 font-medium'
                                                                    : 'text-gray-700'
                                                                }`}>
                                                                {option}
                                                            </span>
                                                            {question.correct_answer === option && (
                                                                <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* File Upload Handling */}
                                            {question.question_type === 'file_upload' && question.candidateAnswerFileName && (
                                                <div className="space-y-2">
                                                    <span className="text-sm font-medium text-gray-700">Submitted File:</span>
                                                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                        <div className="text-sm font-medium text-blue-600">
                                                            {question.candidateAnswerFileName}
                                                        </div>
                                                        <div className="flex gap-2 ml-auto">
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
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default QuizReviewAndScoring;