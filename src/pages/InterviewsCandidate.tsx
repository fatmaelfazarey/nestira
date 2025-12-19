import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  VideoIcon as Video,
  Phone,
  MapPin,
  Loader2,
  ExternalLink,
  Globe,
  Briefcase
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { IP } from "@/store/Path";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import LoadingState from "@/components/LoadingState"; 

interface Interview {
  id: number;
  employerName: string;
  employerPosition?: string;
  employerPhoto?: string;
  companyName: string;
  companyWebsite?: string;
  companyLinkedIn?: string;
  jobTitle: string;
  data: string;
  time: string;
  interviewType: string;
  interviewMode: string;
  meetingLink?: string;
  instructions?: string;
  status: string;
  result: string;
  isScheduled: number;
  duration_minutes?: number;
}

export default function Interviews() {
  const { currentUser } = useAuth();
  const path = `${IP}/api/candidate/`;

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getInterviews = async () => {
    if (!currentUser) {
      setError('User not authenticated');
      return { success: false, message: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);
    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${path}interviews`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': token,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch interviews: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setInterviews(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch interviews');
      }
      return data;
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to fetch interviews",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInterviews();
  }, [currentUser]);

  const getStatusBadge = (status: string, result: string) => {
    const statusConfig: { [key: string]: { text: string; color: string; bg: string } } = {
      scheduled: { text: "Scheduled", color: "text-blue-600", bg: "bg-blue-100" },
      in_progress: { text: "In Progress", color: "text-orange-600", bg: "bg-orange-100" },
      completed: { text: "Completed", color: "text-green-600", bg: "bg-green-100" },
      cancelled: { text: "Cancelled", color: "text-red-600", bg: "bg-red-100" },
      missing: { text: "Missing", color: "text-red-600", bg: "bg-red-100" },
      pending: { text: "Pending", color: "text-yellow-600", bg: "bg-yellow-100" }
    };

    const config = statusConfig[status] || statusConfig.pending;

    if (status === "completed") {
      if (result === "pass") {
        return { text: "Passed", color: "text-green-600", bg: "bg-green-100" };
      } else if (result === "fail") {
        return { text: "Failed", color: "text-red-600", bg: "bg-red-100" };
      }
    }

    return config;
  };

  const getFormatIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <Phone className="w-4 h-4" />;
      case "in-person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getInterviewTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      technical: "Technical Interview",
      personal: "Personal Interview",
      hr: "HR Interview",
      final: "Final Round Interview",
      screening: "Screening Interview",
      combined: "Combined Interview",
      general: "General Interview"
    };
    return typeMap[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter interviews
  const now = new Date();
  const upcomingInterviews = interviews.filter(interview => {
    const interviewDate = new Date(interview.data);
    return interviewDate >= now && interview.status === 'scheduled';
  });

  const pastInterviews = interviews.filter(interview => {
    const interviewDate = new Date(interview.data);
    return interviewDate < now || interview.status === 'completed' || interview.status === 'cancelled' || interview.status === 'missing';
  });

  // Calculate stats based on real data
  const stats = {
    upcoming: upcomingInterviews.length,
    completed: pastInterviews.filter(i => i.status === 'completed').length,
    successRate: pastInterviews.filter(i => i.status === 'completed').length > 0
      ? Math.round((pastInterviews.filter(i => i.result === 'pass').length / pastInterviews.filter(i => i.status === 'completed').length) * 100)
      : 0,
    thisWeek: upcomingInterviews.filter(interview => {
      const interviewDate = new Date(interview.data);
      const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return interviewDate <= oneWeekFromNow;
    }).length
  };

  // Interview Card Component for consistent styling
  const InterviewCard = ({ interview, isPast = false }: { interview: Interview; isPast?: boolean }) => {
    const statusBadge = getStatusBadge(interview.status, interview.result);

    return (
      <Card className="border hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02]">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left side: main information */}
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusBadge.bg} flex-shrink-0`}>
                <div className={statusBadge.color}>
                  {getFormatIcon(interview.interviewMode)}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Title and status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {interview.jobTitle}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-muted-foreground font-medium">
                        {interview.companyName}
                      </p>
                      <span className="text-muted-foreground">•</span>
                      <p className="text-muted-foreground font-medium">
                        {getInterviewTypeDisplay(interview.interviewType)}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${statusBadge.bg} ${statusBadge.color} flex-shrink-0`}>
                    {statusBadge.text}
                  </Badge>
                </div>

                {/* Interview information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground text-xs">Date & Time:</span>
                    <p className="font-medium text-foreground">
                      {formatDate(interview.data)} at {formatTime(interview.time)}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Duration:</span>
                    <p className="font-medium text-foreground">
                      {interview.duration_minutes || 30} minutes
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Mode:</span>
                    <p className="font-medium text-foreground capitalize">
                      {interview.interviewMode}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Type:</span>
                    <p className="font-medium text-foreground capitalize">
                      {interview.interviewType}
                    </p>
                  </div>
                </div>

                {/* Interviewer & Company Info */}
                <div className="rounded-lg bg-muted/20 p-4 mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Interview Details</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Interviewer Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Interviewer:</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <p className="text-sm text-foreground">{interview.employerName}
                        {interview.employerPosition && (
                          <span className="text-xs text-muted-foreground"> - {interview.employerPosition}</span>
                        )}
                        </p>
                      </div>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Company Links:</span>
                      </div>
                      <div className="ml-6 flex  items-center  gap-1">
                        {interview.companyWebsite && (
                          <a
                            href={interview.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 transition-colors"
                          >
                            Website -
                          </a>
                        )}
                        {interview.companyLinkedIn && (
                          <a
                            href={interview.companyLinkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            LinkedIn
                          </a>
                        )}
                        {!interview.companyWebsite && !interview.companyLinkedIn && (
                          <span className="text-xs text-muted-foreground italic">
                            No links provided
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                {interview.instructions && (
                  <div className="bg-muted/30 rounded-lg p-3">
                    <span className="text-sm font-medium text-muted-foreground">Instructions:</span>
                    <p className="text-sm text-foreground mt-1">
                      {interview.instructions}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Action Buttons */}
            {!isPast && (
              <div className="flex flex-col gap-2 w-full lg:w-48 flex-shrink-0">
                {(interview.interviewMode === 'video' || interview.interviewMode === 'audio') && interview.meetingLink && (
                  <Button
                    className="bg-secondary-c hover:bg-secondary-c/95 text-white"
                    size="sm"
                    onClick={() => window.open(interview.meetingLink, '_blank')}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Meeting
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Schedule</h1>
          <p className="text-muted-foreground">Manage your upcoming and past interviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200 animate-scale-in">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Upcoming</h3>

              <p className="text-3xl font-bold text-blue-600">{0 || stats.upcoming}</p>

            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Completed</h3>

              <p className="text-3xl font-bold text-green-600">{0 || stats.completed}</p>

            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Success Rate</h3>

              <p className="text-3xl font-bold text-yellow-600">{0 || stats.successRate}%</p>

            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">This Week</h3>

              <p className="text-3xl font-bold text-purple-600">{0 || stats.thisWeek}</p>

            </CardContent>
          </Card>
        </div>

        {/* Loading state for interviews only */}
        {loading ? (
          <LoadingState LoadingStateMessage="interviews..." />
        ) : error ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-destructive">Error loading interviews</p>
            <Button onClick={getInterviews} variant="outline">
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {/* Upcoming Interviews */}
            <Card className="mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  Upcoming Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingInterviews.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming interviews scheduled
                  </div>
                ) : (
                  upcomingInterviews.map((interview, index) => (
                    <InterviewCard
                      key={interview.id}
                      interview={interview}
                      isPast={false}
                    />
                  ))
                )}
              </CardContent>
            </Card>

            {/* Past Interviews */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                  Past Interviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pastInterviews.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No past interviews found
                  </div>
                ) : (
                  pastInterviews.map((interview, index) => (
                    <InterviewCard
                      key={interview.id}
                      interview={interview}
                      isPast={true}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}