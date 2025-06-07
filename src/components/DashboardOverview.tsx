
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
  PuzzleIcon
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

const kpiData = [
  {
    title: "All Jobs",
    value: "17",
    change: "+2 this week",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    isPositive: true
  },
  {
    title: "Total Candidates",
    value: "9,011",
    change: "+12% from last month",
    icon: Users,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    isPositive: true
  },
  {
    title: "Applications",
    value: "130",
    change: "8 new today",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50", 
    isPositive: true
  },
  {
    title: "Interviews",
    value: "26",
    change: "3 scheduled today",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isPositive: true
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
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Nestira Finance Team!</h1>
        <p className="text-white/80">Here's what's happening with your hiring pipeline today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="flex items-center gap-1 text-sm">
                {kpi.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={kpi.isPositive ? "text-green-600" : "text-red-600"}>
                  {kpi.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
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

        {/* Monthly Interviews */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Interviews</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600">+15%</span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>
          <div className="h-64">
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
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Interviews */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Today's Interviews</h3>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {todayInterviews.map((interview, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-sm">{interview.time}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{interview.candidate}</p>
                  <p className="text-sm text-gray-600">{interview.position}</p>
                </div>
              </div>
            ))}
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
              <PuzzleIcon className="w-4 h-4 mr-3" />
              Quiz Builder
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <FileText className="w-4 h-4 mr-3" />
              Create Job Post
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <TrendingUp className="w-4 h-4 mr-3" />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
