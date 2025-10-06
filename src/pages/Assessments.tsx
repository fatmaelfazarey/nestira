import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CircleCheck, 
  Clock, 
  Star,
  FileText,
  Calendar
} from "lucide-react";

export default function Assessments() {
  const assessments = [
    {
      id: 1,
      title: "Financial Analysis Skills",
      company: "Goldman Sachs",
      type: "Technical Assessment",
      duration: "45 mins",
      questions: 25,
      status: "Completed",
      score: 89,
      completedDate: "2024-01-15",
      statusColor: "text-success",
      statusBg: "bg-success/20"
    },
    {
      id: 2,
      title: "Risk Management Fundamentals",
      company: "JP Morgan Chase",
      type: "Knowledge Test",
      duration: "30 mins",
      questions: 20,
      status: "In Progress",
      score: null,
      completedDate: null,
      statusColor: "text-warning",
      statusBg: "bg-warning/20"
    },
    {
      id: 3,
      title: "Excel & Data Analysis",
      company: "Morgan Stanley",
      type: "Practical Test",
      duration: "60 mins",
      questions: 15,
      status: "Available",
      score: null,
      completedDate: null,
      statusColor: "text-primary-c",
      statusBg: "bg-primary-c/20"
    },
    {
      id: 4,
      title: "Investment Banking Case Study",
      company: "Deutsche Bank",
      type: "Case Study",
      duration: "90 mins",
      questions: 8,
      status: "Completed",
      score: 92,
      completedDate: "2024-01-12",
      statusColor: "text-success",
      statusBg: "bg-success/20"
    },
    {
      id: 5,
      title: "Quantitative Reasoning",
      company: "Credit Suisse",
      type: "Aptitude Test",
      duration: "40 mins",
      questions: 30,
      status: "Scheduled",
      score: null,
      completedDate: "2024-01-20",
      statusColor: "text-secondary-c",
      statusBg: "bg-secondary-c/20"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CircleCheck className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Scheduled":
        return <Calendar className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActionButton = (assessment: any) => {
    switch (assessment.status) {
      case "Available":
        return (
          <Button 
            className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200"
          >
            Start Assessment
          </Button>
        );
      case "In Progress":
        return (
          <Button 
            variant="outline"
            className="hover:bg-warning/10 hover:text-warning hover:border-warning/50 transition-all duration-200"
          >
            Continue
          </Button>
        );
      case "Scheduled":
        return (
          <Button 
            variant="outline"
            className="hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200"
          >
            View Schedule
          </Button>
        );
      case "Completed":
        return (
          <Button 
            variant="outline"
            className="hover:bg-success/10 hover:text-success hover:border-success/50 transition-all duration-200"
          >
            View Results
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
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
              <p className="text-3xl font-bold text-success">5</p>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-warning">2</p>
            </CardContent>
          </Card>
          <Card className="bg-primary/10 border-primary/20 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Available</h3>
              <p className="text-3xl font-bold text-primary-c">8</p>
            </CardContent>
          </Card>
          <Card className="bg-secondary-c/10 border-secondary-c/20 animate-scale-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Avg Score</h3>
              <p className="text-3xl font-bold text-secondary-c">87%</p>
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
          {assessments.map((assessment, index) => (
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
                            {assessment.company} • {assessment.type}
                          </p>
                        </div>
                        <Badge 
                          className={`${assessment.statusBg} ${assessment.statusColor} hover:scale-105 transition-transform duration-200`}
                        >
                          {assessment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-c-foreground">Duration:</span>
                          <p className="font-medium text-foreground">{assessment.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-c-foreground">Questions:</span>
                          <p className="font-medium text-foreground">{assessment.questions}</p>
                        </div>
                        {assessment.score && (
                          <div>
                            <span className="text-muted-c-foreground">Score:</span>
                            <p className="font-medium text-success">{assessment.score}%</p>
                          </div>
                        )}
                        {assessment.completedDate && (
                          <div>
                            <span className="text-muted-c-foreground">
                              {assessment.status === "Scheduled" ? "Scheduled:" : "Completed:"}
                            </span>
                            <p className="font-medium text-foreground">{assessment.completedDate}</p>
                          </div>
                        )}
                      </div>

                      {assessment.status === "In Progress" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-c-foreground">Progress</span>
                            <span className="text-sm font-medium text-warning">60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    {getActionButton(assessment)}
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