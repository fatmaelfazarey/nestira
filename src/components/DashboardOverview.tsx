import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Users, FileText, Briefcase, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, CheckCircle, PuzzleIcon, Activity, Unlock, Eye, Target, BarChart3, UserCheck, AlertCircle, CreditCard, Send, Video, Mail, Plus } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
}, {
  title: "Profile Views",
  current: recentProfileViews.length,
  total: 50,
  icon: Eye,
  color: "text-indigo-600",
  bgColor: "bg-indigo-50",
  clickAction: "profile-views"
}];
const defaultTeamMembers = [{
  name: "Sarah Ahmed",
  avatar: "SA",
  color: "bg-blue-500"
}, {
  name: "Mohamed Hassan",
  avatar: "MH",
  color: "bg-green-500"
}, {
  name: "Layla Ibrahim",
  avatar: "LI",
  color: "bg-purple-500"
}, {
  name: "Omar Fathy",
  avatar: "OF",
  color: "bg-orange-500"
}, {
  name: "Karim Ahmed",
  avatar: "KA",
  color: "bg-teal-500"
}];
export function DashboardOverview() {
  const [showProfileViewsModal, setShowProfileViewsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const {
    t
  } = useTranslation();
  const handleKpiClick = (action: string) => {
    console.log(`Navigating to ${action}`);
  };
  const handlePlanUsageClick = (action?: string) => {
    if (action === 'profile-views') {
      setShowProfileViewsModal(true);
    }
  };
  const handleAddTeamMember = () => {
    if (newMemberName.trim()) {
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-teal-500', 'bg-red-500', 'bg-indigo-500', 'bg-pink-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const avatar = newMemberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
      const newMember = {
        name: newMemberName,
        avatar: avatar,
        color: randomColor
      };
      setTeamMembers([...teamMembers, newMember]);
      setNewMemberName('');
      setNewMemberEmail('');
      setShowAddTeamMemberModal(false);
    }
  };
  return <div className="space-responsive-lg">
      {/* Welcome Section */}
      <div className="p-responsive rounded-xl bg-primary text-primary-foreground border-accent/20 border shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/30 rounded-full opacity-60"></div>
        <div className="absolute top-16 -left-12 w-40 h-40 bg-accent/30 rounded-full opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent/20 p-2 rounded-lg shrink-0">
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-responsive-lg font-bold">Welcome back, Yasser!</h1>
          </div>
          <p className="text-responsive-sm text-slate-300">
            Here's what's happening with your hiring pipeline today.
          </p>
        </div>
      </div>

      {/* Plan Usage Section */}
      <Card className="p-responsive">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-5 h-5 text-gray-600 shrink-0" />
          <h2 className="text-responsive-lg font-semibold text-gray-900">Plan Usage</h2>
        </div>
        
        <div className="responsive-grid-3">
          {planUsageData.map(item => {
          const percentage = item.clickAction === 'profile-views' ? 100 : Math.round(item.current / item.total * 100);
          return <div key={item.title} className={`p-responsive-sm rounded-lg border border-gray-200 bg-white ${item.clickAction ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''}`} onClick={() => item.clickAction && handlePlanUsageClick(item.clickAction)}>
                <div className="flex items-center justify-between mb-3">
                  <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                  {item.clickAction !== 'profile-views' && <span className="text-responsive-sm font-medium text-gray-500">{percentage}%</span>}
                </div>
                <div className="space-y-2">
                  <h3 className="text-responsive-sm font-medium text-gray-700">{item.title}</h3>
                  {item.clickAction === 'profile-views' ? <p className="text-responsive-lg font-bold text-gray-900">{item.current}</p> : <p className="text-responsive-lg font-bold text-gray-900">
                      {item.current} / {item.total}
                    </p>}
                  {item.clickAction !== 'profile-views' && <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-300 ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-orange-500' : 'bg-blue-500'}`} style={{
                  width: `${percentage}%`
                }}></div>
                    </div>}
                </div>
              </div>;
        })}
        </div>
      </Card>

      {/* KPI Metrics Row with Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* KPI Metrics - Takes 3 columns on lg, 5 columns on xl */}
        <div className="lg:col-span-3 xl:col-span-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-[135px] mx-[4px] my-0">
          {kpiData.map((kpi, index) => <Card key={kpi.title} className={`p-2 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 ${kpi.bgColor} border-2`} onClick={() => handleKpiClick(kpi.clickAction)}>
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="p-1.5 rounded-lg bg-white/70 shrink-0">
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</h3>
                  <p className={`text-xs font-semibold ${kpi.color} opacity-90 leading-tight`}>{kpi.title}</p>
                  <p className={`text-xs ${kpi.color} opacity-70 leading-tight`}>{kpi.subtitle}</p>
                </div>
              </div>
            </Card>)}
        </div>

        {/* Quick Actions - Takes 1 column on lg and xl */}
        <Card className="lg:col-span-1 xl:col-span-1 p-responsive bg-orange-50 border border-orange-200 my-[38px] py-[33px] px-px mx-px">
          <h3 className="text-responsive-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600 shrink-0" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link to="/talent-pool">
              <Button className="justify-start h-12 bg-accent hover:bg-accent/90 text-white w-full text-responsive-sm">
                <Users className="w-4 h-4 mr-3 shrink-0" />
                Browse Talent Pool
              </Button>
            </Link>
            <Link to="/unlocked-talents">
              <Button variant="outline" className="justify-start h-12 w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 text-responsive-sm">
                <UserCheck className="w-4 h-4 mr-3 shrink-0" />
                Unlocked Talents
              </Button>
            </Link>
            <Link to="/job-listings">
              <Button variant="outline" className="justify-start h-12 w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 text-responsive-sm">
                <FileText className="w-4 h-4 mr-3 shrink-0" />
                Create Job Post
              </Button>
            </Link>
            <Link to="/quiz-builder">
              <Button variant="outline" className="justify-start h-12 w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 text-responsive-sm">
                <PuzzleIcon className="w-4 h-4 mr-3 shrink-0" />
                Quiz Builder
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Activity Chart - Takes 2 columns */}
        <Card className="xl:col-span-2 p-responsive">
          <div className="mb-6">
            <h3 className="text-responsive-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-500 shrink-0" />
              Weekly Activity
            </h3>
            <div className="flex-responsive">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                <span className="text-responsive-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500 shrink-0"></div>
                <span className="text-responsive-sm text-gray-600">Interviews</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart data={activityData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.8} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{
                fontSize: 12,
                fill: '#64748b'
              }} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} tick={{
                fontSize: 12,
                fill: '#64748b'
              }} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} cursor={{
                stroke: '#e2e8f0',
                strokeWidth: 1
              }} />
                <Line type="monotone" dataKey="applications" stroke="hsl(var(--primary))" strokeWidth={3} dot={{
                r: 5,
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                stroke: "#fff"
              }} activeDot={{
                r: 7,
                stroke: "hsl(var(--primary))",
                strokeWidth: 2,
                fill: "#fff"
              }} />
                <Line type="monotone" dataKey="interviews" stroke="#f97316" strokeWidth={3} dot={{
                r: 5,
                fill: "#f97316",
                strokeWidth: 2,
                stroke: "#fff"
              }} activeDot={{
                r: 7,
                stroke: "#f97316",
                strokeWidth: 2,
                fill: "#fff"
              }} />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        {/* Team Activity - Takes 1 column */}
        <Card className="xl:col-span-1 p-responsive bg-gray-50">
          <div className="text-center space-responsive">
            <h3 className="text-responsive-lg font-semibold text-gray-900">Team Activity</h3>
            
            {/* Team member avatars arranged in a scattered pattern */}
            <div className="relative h-32 mb-6 mx-auto max-w-60">
              {teamMembers.map((member, index) => <div key={member.name} className={`absolute w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white font-semibold text-sm shadow-lg hover:scale-110 transition-transform cursor-pointer`} style={{
              top: index === 0 ? '10px' : index === 1 ? '60px' : index === 2 ? '20px' : index === 3 ? '80px' : index === 4 ? '40px' : `${20 + index % 3 * 25}px`,
              left: index === 0 ? '20px' : index === 1 ? '60px' : index === 2 ? '140px' : index === 3 ? '180px' : index === 4 ? '100px' : `${40 + index % 4 * 35}px`
            }} title={member.name}>
                  {member.avatar}
                </div>)}
            </div>

            <div className="space-y-3">
              <p className="text-gray-600 text-responsive-sm">
                Your team members activity on different job posts will appear here
              </p>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-responsive-sm" onClick={() => setShowAddTeamMemberModal(true)}>
                <Plus className="w-4 h-4 mr-2 shrink-0" />
                Add Team Member
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Profile Views Modal */}
      <Dialog open={showProfileViewsModal} onOpenChange={setShowProfileViewsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 shrink-0" />
              Profile Views Analytics
            </DialogTitle>
          </DialogHeader>
          <div className="space-responsive">
            <div className="responsive-grid-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">50</div>
                <div className="text-responsive-sm text-blue-800">Total Views Today</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">348</div>
                <div className="text-responsive-sm text-green-800">This Week</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1,247</div>
                <div className="text-responsive-sm text-purple-800">This Month</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Detailed Profile Views</h4>
              {recentProfileViews.map((profile, index) => <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                      {profile.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{profile.name}</p>
                      <p className="text-responsive-sm text-gray-600 truncate">{profile.location}</p>
                      <p className="text-xs text-gray-500">{profile.timeAgo}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
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
              <TrendingUp className="w-5 h-5 shrink-0" />
              Analytics Dashboard
            </DialogTitle>
          </DialogHeader>
          <div className="space-responsive">
            {/* Key Metrics Overview */}
            <div className="responsive-grid-2">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <div className="text-responsive-sm text-blue-800">Total Profile Views</div>
                <div className="text-xs text-green-600 mt-1">↑ 23% vs last month</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-responsive-sm text-green-800">Applications Received</div>
                <div className="text-xs text-green-600 mt-1">↑ 15% vs last month</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">43</div>
                <div className="text-responsive-sm text-orange-800">Interviews Scheduled</div>
                <div className="text-xs text-red-600 mt-1">↓ 8% vs last month</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-responsive-sm text-purple-800">Candidates Hired</div>
                <div className="text-xs text-green-600 mt-1">↑ 33% vs last month</div>
              </div>
            </div>

            {/* Job Performance Analytics */}
            <div className="responsive-grid-2">
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  Top Performing Jobs
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">Senior Financial Analyst</p>
                      <p className="text-responsive-sm text-gray-600">Posted 5 days ago</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-gray-900">47</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">Finance Manager</p>
                      <p className="text-responsive-sm text-gray-600">Posted 3 days ago</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-gray-900">34</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">Investment Associate</p>
                      <p className="text-responsive-sm text-gray-600">Posted 8 days ago</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-gray-900">28</div>
                      <div className="text-xs text-gray-500">applications</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 shrink-0" />
                  Application Sources
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-responsive-sm font-medium">Direct Applications</span>
                    <span className="text-responsive-sm text-gray-600">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{
                    width: '45%'
                  }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-responsive-sm font-medium">Talent Pool Search</span>
                    <span className="text-responsive-sm text-gray-600">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{
                    width: '32%'
                  }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-responsive-sm font-medium">Referrals</span>
                    <span className="text-responsive-sm text-gray-600">23%</span>
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
                <Activity className="w-4 h-4 shrink-0" />
                Hiring Pipeline Performance
              </h4>
              <div className="responsive-grid">
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

      {/* Add Team Member Modal */}
      <Dialog open={showAddTeamMemberModal} onOpenChange={setShowAddTeamMemberModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 shrink-0" />
              Add Team Member
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memberName">Full Name</Label>
              <Input id="memberName" placeholder="Enter team member's name" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email Address</Label>
              <Input id="memberEmail" type="email" placeholder="Enter email address" value={newMemberEmail} onChange={e => setNewMemberEmail(e.target.value)} />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddTeamMemberModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleAddTeamMember} disabled={!newMemberName.trim()}>
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
}