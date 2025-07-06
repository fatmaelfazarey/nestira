import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Users, FileText, Briefcase, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, CheckCircle, PuzzleIcon, Activity, Unlock, Eye, Target, BarChart3, UserCheck, AlertCircle, CreditCard, Send, Video, Mail } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { CircularProgress } from "@/components/ui/circular-progress";

const kpiData = [{
  title: "Total Jobs",
  value: "2",
  subtitle: "All jobs posted",
  icon: Briefcase,
  color: "text-blue-600",
  bgColor: "bg-blue-50",
  isPositive: true,
  clickAction: "job-listings"
}, {
  title: "Applications Received",
  value: "3",
  subtitle: "Total applications",
  icon: FileText,
  color: "text-purple-600",
  bgColor: "bg-purple-50",
  isPositive: true,
  clickAction: "recruitment-board"
}, {
  title: "Avg Applications per Job",
  value: "1.5",
  subtitle: "Per job posted",
  icon: TrendingUp,
  color: "text-orange-600",
  bgColor: "bg-orange-50",
  isPositive: true,
  clickAction: "recruitment-board"
}, {
  title: "Unlocked Candidates",
  value: "1",
  subtitle: "Total unlocked profiles",
  icon: Unlock,
  color: "text-indigo-600",
  bgColor: "bg-indigo-50",
  isPositive: true,
  clickAction: "unlocked-talents"
}, {
  title: "Interviews Scheduled",
  value: "3",
  subtitle: "Upcoming interviews",
  icon: Calendar,
  color: "text-teal-600",
  bgColor: "bg-teal-50",
  isPositive: true,
  clickAction: "interviews"
}];

const activityData = [{
  day: "Mon",
  applications: 15,
  interviews: 8
}, {
  day: "Tue",
  applications: 12,
  interviews: 6
}, {
  day: "Wed",
  applications: 18,
  interviews: 12
}, {
  day: "Thu",
  applications: 25,
  interviews: 15
}, {
  day: "Fri",
  applications: 22,
  interviews: 10
}, {
  day: "Sat",
  applications: 15,
  interviews: 8
}, {
  day: "Sun",
  applications: 19,
  interviews: 14
}];

const interviewData = [{
  month: "Apr",
  count: 10
}, {
  month: "May",
  count: 11
}, {
  month: "Jun",
  count: 15
}, {
  month: "Jul",
  count: 12
}, {
  month: "Aug",
  count: 14
}, {
  month: "Sep",
  count: 9
}, {
  month: "Oct",
  count: 11
}];

const todayInterviews = [{
  time: "10:00 AM",
  candidate: "Sarah Ahmed",
  position: "Senior Financial Analyst"
}, {
  time: "2:00 PM",
  candidate: "Mohamed Hassan",
  position: "Finance Manager"
}, {
  time: "4:30 PM",
  candidate: "Layla Ibrahim",
  position: "Investment Associate"
}];

const recentProfileViews = [{
  name: "Karim Ahmed",
  location: "Giza, Egypt",
  timeAgo: "3 days ago",
  avatar: "K",
  views: 12
}, {
  name: "Omar Fathy Ahmed Huss...",
  location: "Alexandria, Egypt",
  timeAgo: "5 days ago",
  avatar: "O",
  views: 8
}, {
  name: "moamen abdulraouf",
  location: "Cairo, Egypt",
  timeAgo: "5 days ago",
  avatar: "M",
  views: 15
}, {
  name: "Elsayed Kewan",
  location: "Cairo, Egypt",
  timeAgo: "5 days ago",
  avatar: "E",
  views: 6
}, {
  name: "Yasser Khairy",
  location: "Cairo, Egypt",
  timeAgo: "5 days ago",
  avatar: "Y",
  views: 9
}];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "hsl(var(--primary))"
  },
  interviews: {
    label: "Interviews",
    color: "hsl(28, 95%, 53%)"
  },
  count: {
    label: "Interviews",
    color: "hsl(var(--primary))"
  }
};

const planUsageData = [{
  title: "Unlocked CVs",
  current: 13,
  total: 30,
  icon: Unlock,
  color: "text-blue-600",
  bgColor: "bg-blue-50"
}, {
  title: "Posted Jobs",
  current: 0,
  total: 2,
  icon: Briefcase,
  color: "text-green-600",
  bgColor: "bg-green-50"
}, {
  title: "Invitations Sent",
  current: 0,
  total: 10,
  icon: Send,
  color: "text-purple-600",
  bgColor: "bg-purple-50"
}, {
  title: "Video Credit",
  current: 0,
  total: 15,
  icon: Video,
  color: "text-orange-600",
  bgColor: "bg-orange-50"
}, {
  title: "Video Invitations Sent",
  current: 0,
  total: 10,
  icon: Mail,
  color: "text-indigo-600",
  bgColor: "bg-indigo-50"
}];

export function DashboardOverview() {
  const [showProfileViewsModal, setShowProfileViewsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const {
    t
  } = useTranslation();

  const handleKpiClick = (action: string) => {
    console.log(`Navigating to ${action}`);
    // In a real app, this would use router navigation
    // For now, we'll just log the action
  };

  return <div className="space-y-6">
      {/* Welcome Section */}
      <div className="p-6 rounded-xl bg-primary text-primary-foreground border-accent/20 border shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/30 rounded-full opacity-60"></div>
        <div className="absolute top-16 -left-12 w-40 h-40 bg-accent/30 rounded-full opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent/20 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-2xl font-bold">Welcome back, Yasser!</h1>
          </div>
          <p className="text-sm text-slate-300">
            Here's what's happening with your hiring pipeline today.
          </p>
        </div>
      </div>

      {/* Plan Usage Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Plan Usage</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {planUsageData.map(item => {
          const percentage = Math.round(item.current / item.total * 100);
          return <div key={item.title} className="p-4 rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm font-medium text-gray-500">{percentage}%</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">{item.title}</h3>
                  <p className="text-lg font-bold text-gray-900">
                    {item.current} / {item.total}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-300 ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-orange-500' : 'bg-blue-500'}`} style={{
                  width: `${percentage}%`
                }}></div>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </Card>

      {/* KPI Metrics and Recent Profile Views Row */}
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
        {/* KPI Metrics - Takes 5/6 of the space */}
        <div className="xl:col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpiData.map(kpi => <Card key={kpi.title} className={`p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 ${kpi.bgColor} border-2`} onClick={() => handleKpiClick(kpi.clickAction)}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`p-3 rounded-lg bg-white/70`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</h3>
                    <p className={`text-sm font-semibold ${kpi.color} opacity-90`}>{kpi.title}</p>
                    <p className={`text-xs ${kpi.color} opacity-70`}>{kpi.subtitle}</p>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>

        {/* Recent Profile Views - Takes 1/6 of the space */}
        <Card className="xl:col-span-1 p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105" onClick={() => setShowProfileViewsModal(true)}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50">
                <Eye className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">Recent Profile Views</h3>
            </div>
            <div className="space-y-2">
              {recentProfileViews.slice(0, 5).map((profile, index) => <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {profile.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-gray-900 truncate">{profile.name}</p>
                      <p className="text-xs text-gray-500">{profile.timeAgo}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{profile.views}</span>
                </div>)}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Quick Actions Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Activity Chart - Takes 2/3 of the space */}
        <Card className="p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              Weekly Activity
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">Interviews</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ChartContainer config={chartConfig}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{
                fontSize: 12,
                fill: '#666'
              }} />
                <YAxis axisLine={false} tickLine={false} tick={{
                fontSize: 12,
                fill: '#666'
              }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="applications" stroke="var(--color-applications)" strokeWidth={3} dot={{
                r: 4
              }} />
                <Line type="monotone" dataKey="interviews" stroke="var(--color-interviews)" strokeWidth={3} dot={{
                r: 4
              }} />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Quick Actions - Takes 1/3 of the space */}
        <Card className="p-6 bg-orange-50 border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link to="/talent-pool">
              <Button className="justify-start h-12 bg-accent hover:bg-accent/90 text-white w-full">
                <Users className="w-4 h-4 mr-3" />
                Browse Talent Pool
              </Button>
            </Link>
            <Link to="/unlocked-talents">
              <Button variant="outline" className="justify-start h-12 w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800">
                <UserCheck className="w-4 h-4 mr-3" />
                Unlocked Talents
              </Button>
            </Link>
            <Link to="/job-listings">
              <Button variant="outline" className="justify-start h-12 w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800">
                <FileText className="w-4 h-4 mr-3" />
                Create Job Post
              </Button>
            </Link>
            <Link to="/quiz-builder">
              <Button variant="outline" className="justify-start h-12 w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800">
                <PuzzleIcon className="w-4 h-4 mr-3" />
                Quiz Builder
              </Button>
            </Link>
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
              {recentProfileViews.map((profile, index) => <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                </div>)}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Modal */}
      <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Analytics Dashboard
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <div className="text-sm text-blue-800">Total Profile Views</div>
                <div className="text-xs text-green-600 mt-1">↑ 23% vs last month</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-800">Applications Received</div>
                <div className="text-xs text-green-600 mt-1">↑ 15% vs last month</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">43</div>
                <div className="text-sm text-orange-800">Interviews Scheduled</div>
                <div className="text-xs text-red-600 mt-1">↓ 8% vs last month</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-sm text-purple-800">Candidates Hired</div>
                <div className="text-xs text-green-600 mt-1">↑ 33% vs last month</div>
              </div>
            </div>

            {/* Job Performance Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Top Performing Jobs
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Senior Financial Analyst</p>
                      <p className="text-sm text-gray-600">Posted 5 days ago</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">47</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Finance Manager</p>
                      <p className="text-sm text-gray-600">Posted 3 days ago</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">34</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Investment Associate</p>
                      <p className="text-sm text-gray-600">Posted 8 days ago</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">28</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Application Sources
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Direct Applications</span>
                    <span className="text-sm text-gray-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{
                    width: '45%'
                  }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Talent Pool Search</span>
                    <span className="text-sm text-gray-600">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{
                    width: '32%'
                  }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Referrals</span>
                    <span className="text-sm text-gray-600">23%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{
                    width: '23%'
                  }}></div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Time-to-Hire Analytics */}
            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Hiring Pipeline Performance
              </h4>
              <div className="grid grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">156</div>
                  <div className="text-xs text-gray-600">Applications</div>
                  <div className="text-xs text-green-600">100%</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">78</div>
                  <div className="text-xs text-gray-600">Screening</div>
                  <div className="text-xs text-gray-600">50%</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">43</div>
                  <div className="text-xs text-gray-600">Interviews</div>
                  <div className="text-xs text-gray-600">27.6%</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">18</div>
                  <div className="text-xs text-gray-600">Final Round</div>
                  <div className="text-xs text-gray-600">11.5%</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-600">Hired</div>
                  <div className="text-xs text-green-600">7.7%</div>
                </div>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}
