import { DashboardLayout } from '@/components/DashboardLayout';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Eye, Calendar, Users, Clock, CheckCircle, XCircle, Clock4, FileText } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QuizReviewAndScoring from '@/components/QuizReviewAndScoring';

interface AssignedCandidate {
    status: string;
    end_time: string | null;
    fullName: string;
    candidate_id: string;
    status_score: string;
    quiz_candidate_id: number;
}

interface QuizData {
    quizId: number;
    quizName: string;
    description: string;
    quizStatus: string;
    questions_count: number;
    duration: string;
    assigned_candidates: number;
    passed_candidates: number;
    failed_candidates: number;
    pending_candidates: number;
    assignedCandidates: AssignedCandidate[];
}

const Quiz = () => {
    const { quizId } = useParams();
    const [data, setData] = useState<QuizData | null>(null);
    const [dataError, setDataError] = useState<string | null>(null);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [scoreFilter, setScoreFilter] = useState<string>('all');
    const [quizReview, setQuizReview] = useState(false);
    const [passCandidate, setPassCandidate] = useState();


    const { getAssignDataToQuiz } = useEmployerStore();

    useEffect(() => {
        fetchData();
    }, [quizId]);

    const fetchData = async () => {
        const result = await getAssignDataToQuiz(quizId, setData, setDataError, setDataLoading);

        if (result.success && result.data) {
            // Handle array response - take first item if it's an array
            const quizData = Array.isArray(result.data) ? result.data[0] : result.data;
            console.log(' Processed Quiz Data:', quizData);
            setData(quizData);
        }
    }

    // Filter candidates based on search and filters
    const filteredCandidates = data?.assignedCandidates?.filter(candidate => {
        const matchesSearch = candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
        const matchesScore = scoreFilter === 'all' || candidate.status_score === scoreFilter;

        return matchesSearch && matchesStatus && matchesScore;
    }) || [];

    // Get status color and icon
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'in_progress':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get score status color and icon
    const getScoreStatusColor = (statusScore: string) => {
        switch (statusScore) {
            case 'pass':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'failed':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'pending':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getScoreStatusIcon = (statusScore: string) => {
        switch (statusScore) {
            case 'pass':
                return <CheckCircle className="w-4 h-4" />;
            case 'failed':
                return <XCircle className="w-4 h-4" />;
            case 'pending':
                return <Clock4 className="w-4 h-4" />;
            default:
                return <Clock4 className="w-4 h-4" />;
        }
    };

    const getDisplayStatus = (status: string) => {
        switch (status) {
            case 'completed':
                return 'completed';
            case 'in_progress':
                return 'In Progress';
            case 'pending':
                return 'Not Started';
            default:
                return status;
        }
    };

    const getDisplayScoreStatus = (statusScore: string) => {
        switch (statusScore) {
            case 'pass':
                return 'Passed';
            case 'failed':
                return 'Failed';
            case 'pending':
                return 'pending Review';
            default:
                return statusScore;
        }
    };

    // Handle view answers and set score
    const handleViewAnswers = (candidate: AssignedCandidate) => {
        setQuizReview(true);
        setPassCandidate(candidate);
        console.log('Viewing answers for candidate:', candidate);
        // Here you would navigate to a page where you can view answers and set scores
        // For example: navigate(`/quiz/${quizId}/candidate/${candidate.candidate_id}/answers`);
        // alert(`View answers and set score for ${candidate.fullName} and quiz_candidate_id ${candidate.quiz_candidate_id} and `);
    };

    // Safe data access with defaults
    const quizStatus = data?.quizStatus || 'unknown';
    const quizName = data?.quizName || 'Loading...';
    const description = data?.description || '';

    if (dataLoading) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-lg">Loading quiz data...</div>
                </div>
            </DashboardLayout>
        );
    }

    if (dataError) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-red-500 text-lg">Error: {dataError}</div>
                    <Button onClick={fetchData} className="ml-4" variant="outline">
                        Retry
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout>
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-lg">No quiz data found.</div>
                    <Button onClick={fetchData} className="ml-4" variant="outline">
                        Retry
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-background">
                <div className="space-y-6 p-6">
                    {/* Quiz Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{quizName}</h1>
                            <p className="text-gray-600 mt-2">{description}</p>
                        </div>
                        <Badge className={`text-sm px-3 py-1 ${quizStatus === 'active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : quizStatus === 'completed'
                                ? 'bg-orange-100 text-orange-800 border-orange-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                            {quizStatus ? quizStatus.charAt(0).toUpperCase() + quizStatus.slice(1) : 'Unknown'}
                        </Badge>
                    </div>

                    {/* Quiz Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
                        <Card className="w-full">
                            <CardContent className="p-4 sm:p-6 w-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Questions</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.questions_count || 0}</p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="w-full">
                            <CardContent className="p-4 sm:p-6 w-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Duration</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.duration || 'N/A'}</p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="w-full">
                            <CardContent className="p-4 sm:p-6 w-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Assigned Candidates</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{data.assigned_candidates || 0}</p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
                                        <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="w-full">
                            <CardContent className="p-4 sm:p-6 w-full">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Completed</p>
                                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                                            {((data.passed_candidates || 0) + (data.failed_candidates || 0))}/{data.assigned_candidates || 0}
                                        </p>
                                    </div>
                                    <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Results Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-emerald-50 border-emerald-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-emerald-700">Passed</p>
                                        <p className="text-2xl font-bold text-emerald-900">{data.passed_candidates || 0}</p>
                                    </div>
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-red-50 border-red-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-red-700">Failed</p>
                                        <p className="text-2xl font-bold text-red-900">{data.failed_candidates || 0}</p>
                                    </div>
                                    <XCircle className="w-8 h-8 text-red-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-amber-50 border-amber-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-amber-700">pending Review</p>
                                        <p className="text-2xl font-bold text-amber-900">{data.pending_candidates || 0}</p>
                                    </div>
                                    <Clock4 className="w-8 h-8 text-amber-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Candidates Section */}
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap  w-full ">
                                <CardTitle>Assigned Candidates ({filteredCandidates.length})</CardTitle>

                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-between ">
                                    {/* Search */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <Input
                                            placeholder="Search candidates..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 w-full"
                                        />
                                    </div>

                                    {/* Filters */}
                                    <div className="flex gap-2 ">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex items-center gap-2">
                                                    <Filter className="w-4 h-4" />
                                                    Status
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                                                    All Status
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                                                    Not Started
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setStatusFilter('in_progress')}>
                                                    In Progress
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                                                    completed
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="flex items-center gap-2">
                                                    <Filter className="w-4 h-4" />
                                                    Result
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => setScoreFilter('all')}>
                                                    All Results
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setScoreFilter('pass')}>
                                                    Passed
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setScoreFilter('failed')}>
                                                    Failed
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setScoreFilter('pending')}>
                                                    pending Review
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {filteredCandidates.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    {data.assignedCandidates?.length === 0
                                        ? 'No candidates assigned to this quiz yet.'
                                        : 'No candidates found matching your filters.'
                                    }
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredCandidates.map((candidate) => (
                                        <Card key={candidate.quiz_candidate_id} className="hover:shadow-md transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-wrap">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="font-semibold text-lg text-gray-900">
                                                                {candidate.fullName}
                                                            </h3>
                                                            <Badge className={getStatusColor(candidate.status)}>
                                                                {getDisplayStatus(candidate.status)}
                                                            </Badge>
                                                            {candidate.status_score && (
                                                                <Badge className={`flex items-center gap-1 ${getScoreStatusColor(candidate.status_score)}`}>
                                                                    {getScoreStatusIcon(candidate.status_score)}
                                                                    {getDisplayScoreStatus(candidate.status_score)}
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>
                                                                {candidate.end_time
                                                                    ? `completed: ${new Date(candidate.end_time).toLocaleDateString()}`
                                                                    : 'Not completed yet'
                                                                }
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Candidate ID:</span> {candidate.candidate_id}
                                                        </div>
                                                    </div> */}
                                                    </div>

                                                    <div className="flex gap-2">
                                                        {/* Only show View Details for pending and in_progress */}
                                                        {/* {(candidate.status === 'pending' || candidate.status === 'in_progress') && (
                                                            <Button variant="outline" className="flex items-center gap-2" disabled>
                                                                <Eye className="w-4 h-4" />
                                                                View Details
                                                            </Button>
                                                        )} */}

                                                        {/* Show View Answers & Set Score button only for completed assessments */}
                                                        {candidate.status === 'completed' && (
                                                            <Button
                                                                onClick={() => handleViewAnswers(candidate)}
                                                                className="flex items-center gap-2  border-2 border-secondary-c text-secondary-c hover:bg-secondary-c hover:text-white"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                View Answers & Set Score
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>



                <QuizReviewAndScoring
                    open={quizReview}
                    quiz={data}
                    onClose={() => setQuizReview(false)}
                    candidate={passCandidate}
                />

            </div>

        </DashboardLayout>
    );
}

export default Quiz;