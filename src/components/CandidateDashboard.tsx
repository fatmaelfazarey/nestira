import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Clock,
  CircleCheck,
  Star,
  User,
  Calendar,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext";
import { DashboardHeader } from "./DashboardHeader";


export default function CandidateDashboard() {
  const { userData } = useAuth();
  const usageStats = [
    {
      title: "Applications Submitted",
      current: 8,
      total: 25,
      percentage: 32,
      icon: FileText,
      bgColor: "bg-card-blue",
      borderColor: "border-info/30"
    },
    {
      title: "Assessments Completed",
      current: 5,
      total: 10,
      percentage: 50,
      icon: CircleCheck,
      bgColor: "bg-card-green",
      borderColor: "border-success/30"
    },
    {
      title: "Interview Requests",
      current: 3,
      total: 8,
      percentage: 38,
      icon: Calendar,
      bgColor: "bg-card-purple",
      borderColor: "border-warning/30"
    },
    {
      title: "Profile Views",
      current: 47,
      total: 100,
      percentage: 47,
      icon: User,
      bgColor: "bg-card-orange",
      borderColor: "border-earnings"
    },
    {
      title: "Saved Jobs",
      current: 12,
      total: 50,
      percentage: 24,
      icon: Star,
      bgColor: "bg-card-blue",
      borderColor: "border-primary-c/30"
    }
  ];

  const quickStats = [
    {
      title: "Active Applications",
      value: "8",
      subtitle: "Currently in review",
      bgColor: "bg-card-blue"
    },
    {
      title: "Interview Score",
      value: "8.5",
      subtitle: "Average rating",
      bgColor: "bg-card-green"
    },
    {
      title: "Response Rate",
      value: "65%",
      subtitle: "Above average",
      bgColor: "bg-card-purple"
    },
    {
      title: "Completion Rate",
      value: "92%",
      subtitle: "Profile completeness",
      bgColor: "bg-card-orange"
    },
    {
      title: "Next Interview",
      value: "2d",
      subtitle: "Goldman Sachs",
      bgColor: "bg-card-accent-c"
    }
  ];

  const recentActivity = [
    {
      action: "Application submitted",
      company: "JP Morgan Chase",
      role: "Financial Analyst",
      time: "2 hours ago",
      status: "pending"
    },
    {
      action: "Assessment completed",
      company: "Goldman Sachs",
      role: "Investment Banking Analyst",
      time: "1 day ago",
      status: "completed"
    },
    {
      action: "Profile viewed",
      company: "Morgan Stanley",
      role: "Risk Analyst",
      time: "2 days ago",
      status: "viewed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader role="candidate"/> */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-c-hover p-8 text-white animate-fade-in shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between md:flex-row flex-col">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userData?.basicInfo?.fullName} 👋</h1>
              <p className="text-primary-c-foreground/80 text-lg">
                You're making great progress on your finance career journey.
              </p>
            </div>
            <div className="text-right md:block flex justify-between items-center w-full md:w-fit">
              <p className="text-sm text-primary-c-foreground/60 mb-1">Profile Strength</p>
              <div className="flex items-center gap-3">
                <Progress value={92} className="w-24 h-2 bg-secondary/20" />
                <span className="text-2xl font-bold">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Usage Statistics */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {usageStats.map((stat, index) => (
              <Card
                key={stat.title}
                className={`${stat.bgColor} ${stat.borderColor} text-[8px] border-2 transition-all duration-200 hover:shadow-lg animate-slide-up rounded-xl`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-6 h-6 text-foreground" />
                    <span className="text-xl font-bold text-foreground">
                      {stat.percentage}%
                    </span>
                  </div>
                  <h5 className="font-medium mb-2 text-foreground">{stat.title}</h5>
                  <p className="text-sm text-foreground/70 mb-3">
                    {stat.current} / {stat.total}
                  </p>
                  <Progress value={stat.percentage} className="h-2 bg-primary" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {quickStats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`${stat.bgColor} transition-all duration-200 hover:shadow-md hover:scale-105 animate-scale-in rounded-xl border-2`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-sm text-foreground mb-2">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold mb-1 text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-foreground/70">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in rounded-xl shadow-sm border-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-foreground">Recent Activity</CardTitle>
                <Button variant="outline" size="sm" className="hover:bg-accent-c transition-colors duration-200">
                  <Clock className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-card hover:bg-accent-c/50 transition-colors duration-200 border"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === 'completed' ? 'bg-success-light text-success' :
                        activity.status === 'pending' ? 'bg-warning-light text-warning' :
                          'bg-info-light text-info'
                        }`}>
                        {activity.status === 'completed' ? <CircleCheck className="w-5 h-5" /> :
                          activity.status === 'pending' ? <Clock className="w-5 h-5" /> :
                            <User className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-c-foreground">
                          {activity.company} • {activity.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-c-foreground">{activity.time}</p>
                      <Badge
                        variant="secondary-c"
                        className={
                          activity.status === 'completed' ? 'bg-success-light text-success' :
                            activity.status === 'pending' ? 'bg-warning-light text-warning' :
                              'bg-info-light text-info'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="animate-fade-in rounded-xl shadow-sm border-2">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/candidate/jobs">
                  <Button className="w-full justify-start bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground transition-all duration-200 hover:scale-105">
                    <Plus className="w-4 h-4 " />
                    Browse New Jobs
                  </Button>
                </Link>
                <Link to="/candidate/assessments" className="inline-block w-full">
                  <Button variant="outline" className="w-full justify-start hover:bg-warning-light hover:text-warning hover:border-warning/50 transition-all duration-200">
                    <CircleCheck className="w-4 h-4 " />
                    Complete Assessment
                  </Button>
                </Link>
                <Link to="/candidate/profile" className="inline-block w-full">
                  <Button variant="outline" className="w-full justify-start hover:bg-info-light hover:text-info hover:border-info/50 transition-all duration-200">
                    <User className="w-4 h-4 " />
                    Update Profile
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200">
                  <Calendar className="w-4 h-4 " />
                  Schedule Mock Interview <span className="text-secondary-c text-[12px]"> (coming Soon) </span>
                </Button>
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card className="mt-6 animate-fade-in rounded-xl shadow-sm border-2">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Recommended for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md">
                  <h4 className="font-medium text-foreground mb-1">Senior Financial Analyst</h4>
                  <p className="text-sm text-muted-c-foreground mb-2">Goldman Sachs • New York</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-success-light text-success border-success/30">95% Match</Badge>
                    <span className="text-sm text-muted-c-foreground font-medium">$120k - $150k</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md">
                  <h4 className="font-medium text-foreground mb-1">Investment Banking Associate</h4>
                  <p className="text-sm text-muted-c-foreground mb-2">JP Morgan • London</p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-warning-light text-warning border-warning/30">88% Match</Badge>
                    <span className="text-sm text-muted-c-foreground font-medium">$140k - $180k</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
