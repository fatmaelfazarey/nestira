import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  VideoIcon as Video,
  Phone,
  MapPin
} from "lucide-react";

export default function Interviews() {
  const upcomingInterviews = [
    {
      id: 1,
      company: "Goldman Sachs",
      role: "Investment Banking Analyst",
      type: "Final Round",
      date: "2024-01-22",
      time: "14:00",
      duration: "60 mins",
      interviewer: "Sarah Johnson",
      interviewerTitle: "VP, Investment Banking",
      format: "Video Call",
      location: "Zoom",
      status: "Confirmed",
      statusColor: "text-success",
      statusBg: "bg-success/20"
    },
    {
      id: 2,
      company: "JP Morgan Chase",
      role: "Financial Analyst",
      type: "Technical Interview",
      date: "2024-01-25",
      time: "10:30",
      duration: "45 mins",
      interviewer: "Michael Chen",
      interviewerTitle: "Senior Director",
      format: "Phone Call",
      location: "+1 (555) 123-4567",
      status: "Pending Confirmation",
      statusColor: "text-warning",
      statusBg: "bg-warning/20"
    },
    {
      id: 3,
      company: "Morgan Stanley",
      role: "Risk Analyst",
      type: "Panel Interview",
      date: "2024-01-28",
      time: "15:30",
      duration: "90 mins",
      interviewer: "Multiple Interviewers",
      interviewerTitle: "Risk Management Team",
      format: "In-Person",
      location: "London Office",
      status: "Confirmed",
      statusColor: "text-success",
      statusBg: "bg-success/20"
    }
  ];

  const pastInterviews = [
    {
      id: 4,
      company: "Deutsche Bank",
      role: "Quantitative Analyst",
      type: "First Round",
      date: "2024-01-15",
      time: "11:00",
      interviewer: "Alex Thompson",
      result: "Progressed to Next Round",
      feedback: "Strong technical skills, good cultural fit",
      statusColor: "text-success",
      statusBg: "bg-success/20"
    },
    {
      id: 5,
      company: "Credit Suisse",
      role: "Portfolio Manager",
      type: "Behavioral Interview",
      date: "2024-01-12",
      time: "16:00",
      interviewer: "Lisa Wang",
      result: "Offer Extended",
      feedback: "Excellent communication and leadership potential",
      statusColor: "text-success",
      statusBg: "bg-success/20"
    }
  ];

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Video Call":
        return <Video className="w-4 h-4" />;
      case "Phone Call":
        return <Phone className="w-4 h-4" />;
      case "In-Person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Interview Schedule</h1>
          <p className="text-muted-c-foreground">Manage your upcoming and past interviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-secondary-c/10 border-secondary-c/20 animate-scale-in">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Upcoming</h3>
              <p className="text-3xl font-bold text-secondary-c">3</p>
            </CardContent>
          </Card>
          <Card className="bg-success/10 border-success/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Completed</h3>
              <p className="text-3xl font-bold text-success">8</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Success Rate</h3>
              <p className="text-3xl font-bold text-warning">75%</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-c/10 border-primary-c/20 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">This Week</h3>
              <p className="text-3xl font-bold text-primary-c">2</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Interviews */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="w-6 h-6 text-secondary-c" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <Card
                key={interview.id}
                className="border hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Main structure */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                    {/* Left side: main information */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                      {/* Icon */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${interview.statusBg} flex-shrink-0`}>
                        <div className={interview.statusColor}>
                          {getFormatIcon(interview.format)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        {/* Title and status */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 truncate">
                              {interview.role}
                            </h3>
                            <p className="text-muted-c-foreground font-medium text-sm sm:text-base truncate">
                              {interview.company} • {interview.type}
                            </p>
                          </div>
                          <Badge
                            className={`${interview.statusBg} ${interview.statusColor} hover:scale-105 transition-transform duration-200 flex-shrink-0 w-fit`}
                          >
                            {interview.status}
                          </Badge>
                        </div>

                        {/* Interview information */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-sm mb-4">
                          <div className="min-w-0">
                            <span className="text-muted-c-foreground block text-xs sm:text-sm">Date & Time:</span>
                            <p className="font-medium text-foreground text-sm sm:text-base truncate">{interview.date} at {interview.time}</p>
                          </div>
                          <div className="min-w-0">
                            <span className="text-muted-c-foreground block text-xs sm:text-sm">Duration:</span>
                            <p className="font-medium text-foreground text-sm sm:text-base">{interview.duration}</p>
                          </div>
                          <div className="min-w-0">
                            <span className="text-muted-c-foreground block text-xs sm:text-sm">Format:</span>
                            <p className="font-medium text-foreground text-sm sm:text-base">{interview.format}</p>
                          </div>
                          <div className="min-w-0">
                            <span className="text-muted-c-foreground block text-xs sm:text-sm">Location:</span>
                            <p className="font-medium text-foreground text-sm sm:text-base truncate">{interview.location}</p>
                          </div>
                        </div>

                        {/* Interviewer information */}
                        <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 text-sm">
                          <div className="flex items-center gap-1 xs:gap-2">
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-c-foreground flex-shrink-0" />
                            <span className="text-muted-c-foreground text-xs sm:text-sm">Interviewer:</span>
                            <span className="font-medium text-foreground text-xs sm:text-sm truncate">{interview.interviewer}</span>
                          </div>
                          <span className="text-muted-c-foreground hidden xs:inline">•</span>
                          <span className="text-muted-c-foreground text-xs sm:text-sm truncate">{interview.interviewerTitle}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: buttons */}
                    <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto justify-between lg:justify-start">
                      {interview.format === "Video Call" && (
                        <Button
                          className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 text-xs sm:text-sm whitespace-nowrap"
                          size="sm"
                        >
                          <Video className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Join Meeting
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200 text-xs sm:text-sm whitespace-nowrap"
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>

        </Card>

        {/* Past Interviews */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Clock className="w-6 h-6 text-muted-c-foreground" />
              Past Interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastInterviews.map((interview, index) => (
              <Card
                key={interview.id}
                className="border hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Main structure */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                    {/* Left side: Basic information */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                      {/* Icon */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${interview.statusBg} flex-shrink-0`}>
                        <div className={interview.statusColor}>
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        {/* Title and result */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 truncate">
                              {interview.role}
                            </h3>
                            <p className="text-muted-c-foreground font-medium text-sm sm:text-base truncate">
                              {interview.company} • {interview.type}
                            </p>
                          </div>
                          <Badge
                            className={`${interview.statusBg} ${interview.statusColor} hover:scale-105 transition-transform duration-200 flex-shrink-0 w-fit`}
                          >
                            {interview.result}
                          </Badge>
                        </div>

                        {/* Interview info */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-sm mb-3">
                          <div className="min-w-0">
                            <span className="text-muted-c-foreground block text-xs sm:text-sm">Date & Time:</span>
                            <p className="font-medium text-foreground text-sm sm:text-base truncate">
                              {interview.date} at {interview.time}
                            </p>
                          </div>
                          <div className="min-w-0">
                            <span className="text-muted-c-foreground block text-xs sm:text-sm">Interviewer:</span>
                            <p className="font-medium text-foreground text-sm sm:text-base truncate">
                              {interview.interviewer}
                            </p>
                          </div>
                        </div>

                        {/* Feedback section */}
                        <div className="bg-accent-c/30 rounded-lg p-3">
                          <span className="text-sm text-muted-c-foreground">Feedback:</span>
                          <p className="text-sm text-foreground mt-1 line-clamp-2 sm:line-clamp-3">
                            {interview.feedback}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Actions */}
                    <div className="flex lg:flex-col justify-end lg:justify-start w-full lg:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200 whitespace-nowrap w-full lg:w-auto justify-center"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>

        </Card>
      </div>
    </div>
  );
}