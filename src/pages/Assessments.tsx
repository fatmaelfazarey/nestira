

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CircleCheck,
  Clock,
  Star,
  FileText,
  Calendar,
  XCircle
} from "lucide-react";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Assessment {
  id: number;
  quizId: number;
  title: string;
  description: string;
  questions_count: number;
  duration: string;
  status: string;
  progress: string;
  score: number | null;
  status_score: string;
  jobTitle: string;
  employerName: string;
  companyName: string;
  completedDate?: string;
  statusColor?: string;
  statusBg?: string;
  statusScoreColor?: string;
  statusScoreBg?: string;
}

export default function Assessments() {
  const { getAssessments } = useCandidateStore();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [assessmentsLoading, setAssessmentsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      // Pass the state setters as parameters to the store function
      const data = await getAssessments(setAssessments, setAssessmentsLoading);

      console.log('assessment data : ', data)
      if (!data || data.success === false) {
        toast.error('Failed to get assessments');
      } else {
        // Transform the data to add UI-specific properties
        const transformedAssessments = data.data.map((assessment: any) => ({
          ...assessment,
          statusColor: getStatusColor(assessment.status),
          statusBg: getStatusBg(assessment.status),
          statusScoreColor: getStatusScoreColor(assessment.status_score),
          statusScoreBg: getStatusScoreBg(assessment.status_score),
        }));

        setAssessments(transformedAssessments);
        toast.success('Assessments retrieved successfully');
      }
    } catch (error) {
      console.error('Error fetching assessments:', error);
      toast.error('Something went wrong while fetching assessments');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-primary-c";
      case "in-progress":
        return "text-warning";
      case "completed":
        return "text-success";
      case "scheduled":
        return "text-secondary-c";
      default:
        return "text-primary-c";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary-c/20";
      case "in-progress":
        return "bg-warning/20";
      case "completed":
        return "bg-success/20";
      case "scheduled":
        return "bg-secondary-c/20";
      default:
        return "bg-primary-c/20";
    }
  };

  // NEW: Get color for status_score
  const getStatusScoreColor = (statusScore: string) => {
    switch (statusScore?.toLowerCase()) {
      case "pass":
        return "text-success";
      case "failed":
        return "text-destructive";
      case "pending":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  // NEW: Get background color for status_score
  const getStatusScoreBg = (statusScore: string) => {
    switch (statusScore?.toLowerCase()) {
      case "pass":
        return "bg-success/20";
      case "failed":
        return "bg-destructive/20";
      case "pending":
        return "bg-warning/20";
      default:
        return "bg-muted/20";
    }
  };

  // NEW: Get icon for status_score
  const getStatusScoreIcon = (statusScore: string) => {
    switch (statusScore?.toLowerCase()) {
      case "pass":
        return <CircleCheck className="w-3 h-3" />;
      case "failed":
        return <XCircle className="w-3 h-3" />;
      case "pending":
        return <Clock className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
  };

  // NEW: Get display text for status_score
  const getDisplayStatusScore = (statusScore: string) => {
    switch (statusScore?.toLowerCase()) {
      case "pass":
        return "Passed";
      case "failed":
        return "Failed";
      case "pending":
        return "Pending Review";
      default:
        return statusScore;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CircleCheck className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "scheduled":
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getDisplayStatus = (status: string) => {
    switch (status) {
      case "active":
        return "Available";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "scheduled":
        return "Scheduled";
      default:
        return status;
    }
  };

  const getActionButton = (assessment: Assessment) => {
    switch (assessment.progress) {
      case "pending":
        return (
          <Button
            onClick={() => navigate(`/candidate/take-assessment/${assessment.id}`)}
            className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200">
            Start Assessment
          </Button>
        );
      case "in_progress":
        return (
          <Button
            variant="outline"
            onClick={() => navigate(`/candidate/take-assessment/${assessment.id}`)}
            className="hover:bg-warning/10 hover:text-warning hover:border-warning/50 transition-all duration-200"
          >
            Continue
          </Button>
        );
      // case "completed":
      //   return (
      //     <Button
      //       variant="outline"
      //       className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200"
      //     >
      //       View Results
      //     </Button>
      //   );
      default:
        return null;
    }
  };

  // Calculate stats based on actual data
  const completedCount = assessments.filter(a => a.status === "completed").length;
  const inProgressCount = assessments.filter(a => a.status === "in-progress").length;
  const availableCount = assessments.filter(a => a.status === "active").length;
  
  // NEW: Calculate status_score stats
  const passedCount = assessments.filter(a => a.status_score?.toLowerCase() === "pass").length;
  const failedCount = assessments.filter(a => a.status_score?.toLowerCase() === "failed").length;
  const pendingReviewCount = assessments.filter(a => a.status_score?.toLowerCase() === "pending").length;
  
  const scoredAssessments = assessments.filter(a => a.score !== null && a.score !== undefined);
  const averageScore = scoredAssessments.length > 0
    ? scoredAssessments.reduce((acc, curr) => acc + (curr.score || 0), 0) / scoredAssessments.length
    : 0;

  return (
    <div className="min-h-screen bg-background ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Assessments</h1>
          <p className="text-muted-c-foreground">Complete assessments to showcase your skills</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-success/10 border-success/20 animate-scale-in">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Completed</h3>
              <p className="text-3xl font-bold text-success">{completedCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-warning">{inProgressCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Available</h3>
              <p className="text-3xl font-bold text-primary-c">{availableCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary-c/10 border-secondary-c/20 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Avg Score</h3>
              <p className="text-3xl font-bold text-secondary-c">{Math.round(averageScore)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* NEW: Status Score Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-success/10 border-success/20 animate-scale-in">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Passed</h3>
              <p className="text-3xl font-bold text-success">{passedCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10 border-destructive/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Failed</h3>
              <p className="text-3xl font-bold text-destructive">{failedCount}</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Pending Review</h3>
              <p className="text-3xl font-bold text-warning">{pendingReviewCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 p-6 h-auto flex-col gap-2"
              >
                <Star className="w-6 h-6" />
                <span className="font-medium">Start Popular Assessment</span>
                <span className="text-xs opacity-80">Financial Analysis Skills</span>
              </Button>
              <Button
                variant="outline"
                className="hover:bg-primary/10 hover:text-primary hover:border-primary-c/50 transition-all duration-200 p-6 h-auto flex-col gap-2"
              >
                <Clock className="w-6 h-6" />
                <span className="font-medium">Resume Assessment</span>
                <span className="text-xs opacity-60">Risk Management Test</span>
              </Button>
              <Button
                variant="outline"
                className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200 p-6 h-auto flex-col gap-2"
              >
                <CircleCheck className="w-6 h-6" />
                <span className="font-medium">View Results</span>
                <span className="text-xs opacity-60">Latest completed tests</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assessments List */}
        <div className="space-y-4">
          {assessmentsLoading && (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-muted-c-foreground">Loading assessments...</p>
              </CardContent>
            </Card>
          )}
          {!assessmentsLoading && assessments.length === 0 && (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-muted-c-foreground">No assessments found.</p>
                <Button
                  onClick={fetchAssessments}
                  className="mt-4"
                  variant="outline"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
          {assessments?.map((assessment, index) => (
            <Card
              key={assessment.id}
              className="hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${assessment.statusBg}`}>
                      <div className={assessment.statusColor}>
                        {getStatusIcon(assessment.status)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {assessment.title}
                          </h3>
                          <p className="text-muted-c-foreground font-medium">
                            {assessment.description}
                          </p>
                          <p className="text-muted-c-foreground font-medium">
                            {assessment.employerName} • {assessment.companyName}
                          </p>
                        </div>
                        {/* Status Score Badge - Only show for completed assessments */}
                        {assessment.progress === 'completed' && assessment.status_score && (
                          <Badge
                            className={`${assessment.statusScoreBg} ${assessment.statusScoreColor} hover:scale-105 transition-transform duration-200 flex items-center gap-1`}
                          >
                            {getStatusScoreIcon(assessment.status_score)}
                            {getDisplayStatusScore(assessment.status_score)}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-c-foreground">Duration:</span>
                          <p className="font-medium text-foreground">{assessment.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-c-foreground">Questions:</span>
                          <p className="font-medium text-foreground">{assessment.questions_count}</p>
                        </div>
                        {assessment.progress === 'completed' && (
                          <>
                            <div>
                              <span className="text-muted-c-foreground">Score:</span>
                              <p className={`font-medium ${
                                assessment.score && assessment.score >= 70 ? 'text-success' : 
                                assessment.score && assessment.score >= 50 ? 'text-warning' : 
                                'text-destructive'
                              }`}>
                                {assessment.score ? assessment.score + '%' : '-'}
                              </p>
                            </div>
                            <div>
                              <span className="text-muted-c-foreground">Result:</span>
                              <div className="flex items-center gap-1">
                                <div className={assessment.statusScoreColor}>
                                  {getStatusScoreIcon(assessment.status_score)}
                                </div>
                                <span className={`font-medium ${assessment.statusScoreColor}`}>
                                  {getDisplayStatusScore(assessment.status_score)}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      {getActionButton(assessment)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Browse More */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 hover:scale-105"
          >
            Browse More Assessments
          </Button>
        </div>
      </div>
    </div>
  );
}