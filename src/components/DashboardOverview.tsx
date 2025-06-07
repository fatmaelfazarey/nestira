import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText, 
  Briefcase,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle,
  PuzzleIcon,
  Activity,
  Unlock,
  Eye
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const kpiData = [
  {
    title: "Total Jobs",
    value: "2",
    subtitle: "All jobs posted",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    isPositive: true
  },
  {
    title: "Active Jobs",
    value: "2",
    subtitle: "Currently running",
    icon: Activity,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    isPositive: true
  },
  {
    title: "Closed Jobs",
    value: "0",
    subtitle: "Completed jobs",
    icon: CheckCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50", 
    isPositive: true
  },
  {
    title: "Total Applications",
    value: "3",
    subtitle: "All applications received",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    isPositive: true
  },
  {
    title: "Avg Applications",
    value: "1.5",
    subtitle: "Per job",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isPositive: true
  },
  {
    title: "Unlocked Candidates",
    value: "1",
    subtitle: "Total unlocked profiles",
    icon: Unlock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    isPositive: true
  },
  {
    title: "Avg Daily Unlocks",
    value: "0.0",
    subtitle: "Last 30 days",
    icon: Calendar,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    isPositive: false
  }
];

const activityData = [
  { day: "Mon", applications: 15, interviews: 8 },
  { day: "Tue", applications: 12, interviews: 6 },
  { day: "Wed", applications: 18, interviews: 12 },
  { day: "Thu", applications: 25, interviews: 15 },
  { day: "Fri", applications: 22, interviews: 10 },
  { day: "Sat", applications: 15, interviews: 8 },
  { day: "Sun", applications: 19, interviews: 14 }
];

const interviewData = [
  { month: "Apr", count: 10 },
  { month: "May", count: 11 },
  { month: "Jun", count: 15 },
  { month: "Jul", count: 12 },
  { month: "Aug", count: 14 },
  { month: "Sep", count: 9 },
  { month: "Oct", count: 11 }
];

const todayInterviews = [
  {
    time: "10:00 AM",
    candidate: "Sarah Ahmed",
    position: "Senior Financial Analyst"
  },
  {
    time: "2:00 PM", 
    candidate: "Mohamed Hassan",
    position: "Finance Manager"
  },
  {
    time: "4:30 PM",
    candidate: "Layla Ibrahim", 
    position: "Investment Associate"
  }
];

const recentProfileViews = [
  {
    name: "Karim Ahmed",
    location: "Giza, Egypt",
    timeAgo: "3 days ago",
    avatar: "K",
    views: 12
  },
  {
    name: "Omar Fathy Ahmed Huss...",
    location: "Alexandria, Egypt", 
    timeAgo: "5 days ago",
    avatar: "O",
    views: 8
  },
  {
    name: "moamen abdulraouf",
    location: "Cairo, Egypt",
    timeAgo: "5 days ago", 
    avatar: "M",
    views: 15
  },
  {
    name: "Elsayed Kewan",
    location: "Cairo, Egypt",
    timeAgo: "5 days ago",
    avatar: "E",
    views: 6
  },
  {
    name: "Yasser Khairy",
    location: "Cairo, Egypt",
    timeAgo: "5 days ago",
    avatar: "Y",
    views: 9
  }
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
  interviews: {
    label: "Interviews", 
    color: "hsl(var(--accent))",
  },
  count: {
    label: "Interviews",
    color: "hsl(var(--primary))",
  }
};

export function DashboardOverview() {
  const [showProfileViewsModal, setShowProfileViewsModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Nestira Finance Team!</h1>
        <p className="text-white/80">Here's what's happening with your hiring pipeline today.</p>
      </div>

      {/* KPI Cards Grid with Recent Profile Views */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-gray-900">{kpi.value}</h3>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-xs text-gray-500">{kpi.subtitle}</p>
            </div>
          </Card>
        ))}

        {/* Recent Profile Views Card */}
        <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-indigo-50">
              <Eye className="w-6 h-6 text-indigo-600" />
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowProfileViewsModal(true)}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Recent Profile Views</h3>
            <div className="space-y-3">
              {recentProfileViews.slice(0, 3).map((profile, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {profile.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{profile.name}</p>
                  </div>
                  <div className="text-xs font-semibold text-gray-900">{profile.views}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-sm text-gray-600">Interviews</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ChartContainer config={chartConfig}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <Button className="justify-start h-12 bg-accent hover:bg-accent/90 text-white">
              <Users className="w-4 h-4 mr-3" />
              Browse Talent Pool
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <CheckCircle className="w-4 h-4 mr-3" />
              Unlocked Talents
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <FileText className="w-4 h-4 mr-3" />
              Create Job Post
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <PuzzleIcon className="w-4 h-4 mr-3" />
              Quiz Builder
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <TrendingUp className="w-4 h-4 mr-3" />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Resource Usage</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Job Postings</span>
                </div>
                <span className="text-sm text-gray-600">2/3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '66.7%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">66.7%</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Candidates Unlocked</span>
                </div>
                <span className="text-sm text-gray-600">1/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">20.0%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Views Modal */}
      <Dialog open={showProfileViewsModal} onOpenChange={setShowProfileViewsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Profile Views Analytics
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">50</div>
                <div className="text-sm text-blue-800">Total Views Today</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">348</div>
                <div className="text-sm text-green-800">This Week</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-sm text-purple-800">This Month</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Detailed Profile Views</h4>
              {recentProfileViews.map((profile, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {profile.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{profile.name}</p>
                      <p className="text-sm text-gray-600">{profile.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{profile.views}</div>
                    <div className="text-xs text-gray-500">views</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
