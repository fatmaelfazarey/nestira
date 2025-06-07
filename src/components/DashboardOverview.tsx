
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText, 
  Download,
  Eye,
  Briefcase,
  Clock,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
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
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const kpiData = [
  {
    title: "All Jobs",
    value: "17",
    change: "+2 this week",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    isPositive: true,
    moreInfo: "View More"
  },
  {
    title: "Total Candidates",
    value: "9011",
    change: "+12% from last month",
    icon: Users,
    color: "text-pink-600", 
    bgColor: "bg-pink-50",
    isPositive: true,
    moreInfo: "More Info"
  },
  {
    title: "Total Applications",
    value: "130",
    change: "8 new today",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50", 
    isPositive: true,
    moreInfo: "More Info"
  },
  {
    title: "Total Interviews",
    value: "26",
    change: "3 scheduled today",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isPositive: true,
    moreInfo: "More Info"
  },
  {
    title: "Total Hired",
    value: "12",
    change: "2 this month",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
    isPositive: true,
    moreInfo: "More Info"
  },
  {
    title: "Total Rejected",
    value: "08",
    change: "-20% vs last month",
    icon: Eye,
    color: "text-red-600",
    bgColor: "bg-red-50",
    isPositive: false,
    moreInfo: "More Info"
  }
];

const activityData = [
  { day: "01.07", applications: 15, interviews: 8 },
  { day: "02.07", applications: 12, interviews: 6 },
  { day: "03.07", applications: 18, interviews: 12 },
  { day: "04.07", applications: 25, interviews: 15 },
  { day: "05.07", applications: 22, interviews: 10 },
  { day: "06.07", applications: 15, interviews: 8 },
  { day: "07.07", applications: 19, interviews: 14 }
];

const profileViewData = [
  { day: "Oct 3", views: 7 },
  { day: "Oct 4", views: 6 },
  { day: "Oct 5", views: 4 },
  { day: "Oct 6", views: 9 },
  { day: "Oct 7", views: 8 },
  { day: "Oct 8", views: 6 }
];

const interviewData = [
  { month: "Apr", direct: 4, invited: 6 },
  { month: "May", direct: 8, invited: 3 },
  { month: "Jun", direct: 6, invited: 9 },
  { month: "Jul", direct: 7, invited: 5 },
  { month: "Aug", direct: 6, invited: 8 },
  { month: "Sep", direct: 5, invited: 4 },
  { month: "Oct", direct: 9, invited: 2 }
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

const recentEmails = [
  {
    name: "Esther Howard",
    subject: "Meeting scheduled",
    time: "1:24 PM",
    avatar: "EH"
  },
  {
    name: "Jane Cooper",
    subject: "Update on marketing campaign", 
    time: "12:32 PM",
    avatar: "JC"
  },
  {
    name: "Wade Warren",
    subject: "Designly 2.0 is about to launch",
    time: "Yesterday at 8:57 PM", 
    avatar: "WW"
  },
  {
    name: "Robert Fox",
    subject: "Meeting scheduled",
    time: "Yesterday at 8:49 PM",
    avatar: "RF"
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
  views: {
    label: "Profile Views",
    color: "hsl(var(--primary))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--primary))",
  },
  invited: {
    label: "Invited",
    color: "hsl(var(--accent))",
  }
};

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Nestira Finance Team!</h1>
        <p className="text-white/80">Here's what's happening with your hiring pipeline today.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <div className="flex items-center gap-1 text-xs">
                {kpi.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={kpi.isPositive ? "text-green-600" : "text-red-600"}>
                  {kpi.change}
                </span>
              </div>
              <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                {kpi.moreInfo} →
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm text-gray-600">Application Sent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span className="text-sm text-gray-600">Profile Viewed</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by</span>
              <Button variant="outline" size="sm">
                Last 7 days
              </Button>
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
                  strokeWidth={2}
                  fill="url(#colorApplications)"
                />
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Progress Circle */}
        <Card className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Progress</h3>
            <div className="flex justify-center mb-4">
              <CircularProgress value={75} size={120} />
            </div>
            <Button className="w-full">More details</Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile views</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-green-600">+60%</span>
                <span className="text-xs text-gray-500">Last 7 days</span>
              </div>
            </div>
          </div>
          <div className="h-48">
            <ChartContainer config={chartConfig}>
              <LineChart data={profileViewData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fill="url(#colorViews)"
                />
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Interview Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Interview</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-red-600">-20%</span>
                <span className="text-xs text-gray-500">6 month</span>
              </div>
            </div>
          </div>
          <div className="h-48">
            <ChartContainer config={chartConfig}>
              <BarChart data={interviewData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="direct" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                <Bar dataKey="invited" fill="hsl(var(--accent))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-gray-600">Direct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-sm text-gray-600">Invited</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Interviews */}
        <Card className="p-6">
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

        {/* Recent Emails */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent emails</h3>
          <div className="space-y-4">
            {recentEmails.map((email, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-orange-600 flex items-center justify-center text-white text-sm font-medium">
                  {email.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{email.name}</p>
                  <p className="text-sm text-gray-600 truncate">{email.subject}</p>
                </div>
                <span className="text-xs text-gray-500">{email.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="justify-start bg-accent hover:bg-accent/90 text-white">
            <Users className="w-4 h-4 mr-2" />
            Browse Talent Pool
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="w-4 h-4 mr-2" />
            Create Job Post
          </Button>
          <Button variant="outline" className="justify-start">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" className="justify-start">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </Card>

      {/* Account Balance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Balance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">264</div>
            <div className="text-sm text-gray-600">Purchased</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">250</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-600">Subscription(s) </span>
          <Button variant="link" className="h-auto p-0 text-sm text-blue-600">
            Expiry Dates
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
