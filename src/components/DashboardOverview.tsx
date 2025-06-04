
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText, 
  Download,
  Eye,
  Briefcase,
  Clock
} from "lucide-react";

const kpiData = [
  {
    title: "Total Jobs",
    value: "12",
    change: "+2 this week",
    icon: Briefcase,
    color: "text-primary"
  },
  {
    title: "Profile Views",
    value: "2,847",
    change: "+12% from last month",
    icon: Eye,
    color: "text-accent"
  },
  {
    title: "Recommended Candidates",
    value: "47",
    change: "8 new today",
    icon: Users,
    color: "text-success"
  },
  {
    title: "Data Exports",
    value: "156",
    change: "23 this month",
    icon: Download,
    color: "text-gray-600"
  }
];

const todayInterviews = [
  {
    time: "10:00 AM",
    candidate: "Sarah Ahmed",
    position: "Senior Financial Analyst",
    type: "Technical Interview"
  },
  {
    time: "2:00 PM",
    candidate: "Mohamed Hassan",
    position: "Finance Manager",
    type: "Final Interview"
  },
  {
    time: "4:30 PM",
    candidate: "Layla Ibrahim",
    position: "Investment Associate",
    type: "HR Interview"
  }
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Nestira Finance Team!</h1>
        <p className="text-white/80">Here's what's happening with your hiring pipeline today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
                <p className="text-xs text-gray-500 mt-1">{kpi.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Interviews */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Interviews</h3>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
          <div className="space-y-4">
            {todayInterviews.map((interview, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 min-w-0">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-sm">{interview.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{interview.candidate}</p>
                  <p className="text-sm text-gray-600 truncate">{interview.position}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                    {interview.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-accent hover:bg-accent/90 text-white">
              <Users className="w-4 h-4 mr-2" />
              Browse Talent Pool
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Create Job Post
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <p className="text-sm"><span className="font-medium">Ahmed Khalil</span> completed the technical assessment for Senior Accountant position</p>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <p className="text-sm">New candidate <span className="font-medium">Fatima Al-Zahra</span> applied for Finance Manager position</p>
            <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <p className="text-sm">Interview scheduled with <span className="font-medium">Omar Hassan</span> for tomorrow at 3:00 PM</p>
            <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
