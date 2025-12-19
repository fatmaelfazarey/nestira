// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, TrendingUp, Users, FileText, Briefcase, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, CheckCircle, PuzzleIcon, Activity, Unlock, Eye, Target, BarChart3, UserCheck, AlertCircle, CreditCard, Send, Video, Mail, Plus } from "lucide-react";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { useEffect, useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link } from "react-router-dom";
// import { useTranslation } from "@/hooks/useTranslation";
// import { CircularProgress } from "@/components/ui/circular-progress";
// import { useAuth } from "@/contexts/AuthContext";
// import { IP } from "@/store/Path";
// import { Skeleton } from "@/components/ui/skeleton";

// // Types for backend data
// interface PlanLimit {
//   feature: string;
//   value: number;
//   is_unlimited: number;
// }

// interface CurrentPlan {
//   planId: number;
//   name: string;
//   price: string;
//   limits: PlanLimit[];
// }

// interface RecruiterStatistics {
//   posted_jobs: number;
//   jobs_views: string;
//   jobs_applications: string;
//   unlocked_candidates: number;
//   invitations_sent: number;
//   quizzes: number;
//   folders: number;
//   interviews: number;
//   total_applicants: string;
//   current_plan: CurrentPlan;
// }

// interface JobAnalytics {
//   views: number;
//   applications: number;
//   title: string;
// }

// interface DashboardData {
//   statistics: RecruiterStatistics | null;
//   jobAnalytics: JobAnalytics[] | null;
//   isLoading: boolean;
//   error: string | null;
// }

// const chartConfig = {
//   views: {
//     label: "Job Views",
//     color: "hsl(220, 70%, 50%)"
//   },
//   applications: {
//     label: "Applications",
//     color: "hsl(28, 95%, 53%)"
//   },
//   conversion: {
//     label: "Conversion Rate",
//     color: "hsl(142, 70%, 45%)"
//   }
// };

// // Helper function to get plan limit by feature
// const getPlanLimit = (plan: CurrentPlan | null, feature: string): number => {
//   if (!plan || !plan.limits) return 0; // Default fallback
//   const limit = plan.limits.find(limit => limit.feature === feature);
//   return limit ? limit.value : 0; // Default to 5 if feature not found
// };

// export function DashboardOverview() {
//   const { userData, currentUser } = useAuth();
//   const [userName, setUserName] = useState('');
//   const [showProfileViewsModal, setShowProfileViewsModal] = useState(false);
//   const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
//   const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false);
//   const [newMemberName, setNewMemberName] = useState('');
//   const [newMemberEmail, setNewMemberEmail] = useState('');
//   const [dashboardData, setDashboardData] = useState<DashboardData>({
//     statistics: null,
//     jobAnalytics: null,
//     isLoading: true,
//     error: null
//   });

//   const { t } = useTranslation();

//   // Generate KPI data from backend statistics
//   const getKpiData = (stats: RecruiterStatistics | null) => [{
//     title: "Total Jobs",
//     value: stats?.posted_jobs.toString() || "0",
//     subtitle: "All jobs posted",
//     icon: Briefcase,
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//     isPositive: true,
//     clickAction: "job-posts"
//   }, {
//     title: "Applications Received",
//     value: stats?.jobs_applications || "0",
//     subtitle: "Total applications",
//     icon: FileText,
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//     isPositive: true,
//     clickAction: "recruitment-board"
//   }, {
//     title: "Avg Applications per Job",
//     value: stats?.posted_jobs ? (parseInt(stats.jobs_applications) / stats.posted_jobs).toFixed(1) : "0",
//     subtitle: "Per job posted",
//     icon: TrendingUp,
//     color: "text-orange-600",
//     bgColor: "bg-orange-50",
//     isPositive: true,
//     clickAction: "recruitment-board"
//   }, {
//     title: "Unlocked Candidates",
//     value: stats?.unlocked_candidates.toString() || "0",
//     subtitle: "Total unlocked profiles",
//     icon: Unlock,
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50",
//     isPositive: true,
//     clickAction: "unlocked-talents"
//   }, {
//     title: "Interviews Scheduled",
//     value: stats?.interviews.toString() || "0",
//     subtitle: "Upcoming interviews",
//     icon: Calendar,
//     color: "text-teal-600",
//     bgColor: "bg-teal-50",
//     isPositive: true,
//     clickAction: "interviews"
//   }];

//   // Generate plan usage data from backend statistics
//   const getPlanUsageData = (stats: RecruiterStatistics | null) => [{
//     title: "Unlocked CVs",
//     current: stats?.unlocked_candidates || 0,
//     total: getPlanLimit(stats?.current_plan || null, "unlocked"),
//     icon: Unlock,
//     color: "text-blue-600",
//     bgColor: "bg-blue-50"
//   }, {
//     title: "Posted Jobs",
//     current: stats?.posted_jobs || 0,
//     total: getPlanLimit(stats?.current_plan || null, "jobPosts"),
//     icon: Briefcase,
//     color: "text-green-600",
//     bgColor: "bg-green-50"
//   }, {
//     title: "Invitations Sent",
//     current: stats?.invitations_sent || 0,
//     total: getPlanLimit(stats?.current_plan || null, "invitations"),
//     icon: Send,
//     color: "text-purple-600",
//     bgColor: "bg-purple-50"
//   }, {
//     title: "Quizzes Created",
//     current: stats?.quizzes || 0,
//     total: getPlanLimit(stats?.current_plan || null, "onlineAssessment"),
//     icon: PuzzleIcon,
//     color: "text-orange-600",
//     bgColor: "bg-orange-50"
//   }, {
//     title: "Folders Created",
//     current: stats?.folders || 0,
//     total: getPlanLimit(stats?.current_plan || null, "folders") , 
//     icon: FileText,
//     color: "text-indigo-600",
//     bgColor: "bg-indigo-50"
//   }, {
//     title: "Interviews Scheduled",
//     current: stats?.interviews || 0,
//     total: getPlanLimit(stats?.current_plan || null, "onlineInterview"),
//     icon: Calendar,
//     color: "text-red-600",
//     bgColor: "bg-red-50",
//     clickAction: "interviews"
//   }];

//   // Generate performance trend data from job analytics
//   const getPerformanceTrendData = (analytics: JobAnalytics[] | null) => {
//     if (!analytics || analytics.length === 0) {
//       return [{
//         metric: "No Data",
//         views: 0,
//         applications: 0
//       }];
//     }

//     // Use actual job analytics data from backend
//     return analytics.map(job => ({
//       metric: job.title.length > 10 ? `${job.title.substring(0, 10)}...` : job.title,
//       views: job.views,
//       applications: job.applications
//     }));
//   };

//   // Generate conversion rate data for pie chart
//   const getConversionData = (stats: RecruiterStatistics | null) => {
//     const views = parseInt(stats?.jobs_views || "0");
//     const applications = parseInt(stats?.jobs_applications || "0");
//     const conversionRate = views > 0 ? ((applications / views) * 100) : 0;

//     // Pie chart data for views vs applications - using same colors as line chart
//     const pieData = [
//       { name: 'Applications', value: applications, color: '#f97316' },
//       { name: 'Views Only', value: Math.max(0, views - applications), color: 'hsl(var(--primary))' }
//     ];

//     return {
//       pieData,
//       conversionRate: conversionRate.toFixed(1)
//     };
//   };

//   const handleKpiClick = (action: string) => {
//     console.log(`Navigating to ${action}`);
//   };

//   const handlePlanUsageClick = (action?: string) => {
//     if (action === 'interviews') {
//       setShowAnalyticsModal(true);
//     }
//   };

//   const fetchRecruiterStatistics = async () => {
//     if (!currentUser) {
//       console.warn("No current user found");
//       setDashboardData(prev => ({ ...prev, error: "User not authenticated", isLoading: false }));
//       return;
//     }

//     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
//     const url = `${IP}/api/employer/dashboard`;

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         }
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to get Recruiter Statistics");
//       }

//       setDashboardData(prev => ({
//         ...prev,
//         statistics: result.data,
//         isLoading: false,
//         error: null
//       }));
//     } catch (error: any) {
//       const message = error.message || "Unexpected error occurred";
//       console.error("Error getting Recruiter Statistics:", message);
//       setDashboardData(prev => ({ ...prev, error: message, isLoading: false }));
//     }
//   };

//   const fetchJobAnalytics = async () => {
//     if (!currentUser) {
//       console.warn("No current user found");
//       return;
//     }

//     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
//     const url = `${IP}/api/employer/dashboard/job-analytics`;

//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         }
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to get Job Analytics");
//       }

//       setDashboardData(prev => ({
//         ...prev,
//         jobAnalytics: result.data,
//         isLoading: false
//       }));
//     } catch (error: any) {
//       const message = error.message || "Unexpected error occurred";
//       console.error("Error getting Job Analytics:", message);
//       // Continue without job analytics data
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setDashboardData(prev => ({ ...prev, isLoading: true }));
//       setUserName(userData?.personalInfo?.fullName || '');
//       await Promise.all([
//         fetchRecruiterStatistics(),
//         fetchJobAnalytics()
//       ]);
//     };

//     fetchData();
//   }, [userData, currentUser]);

//   const kpiData = getKpiData(dashboardData.statistics);
//   const planUsageData = getPlanUsageData(dashboardData.statistics);
//   const performanceTrendData = getPerformanceTrendData(dashboardData.jobAnalytics);
//   const conversionData = getConversionData(dashboardData.statistics);

//   // Calculate conversion rate
//   const views = parseInt(dashboardData.statistics?.jobs_views || "0");
//   const applications = parseInt(dashboardData.statistics?.jobs_applications || "0");
//   const conversionRate = views > 0 ? ((applications / views) * 100).toFixed(1) : "0.0";

//   // Loading skeleton component
//   const SkeletonCard = () => (
//     <Card className="p-6">
//       <div className="flex items-center gap-2 mb-4">
//         <Skeleton className="h-5 w-5 rounded" />
//         <Skeleton className="h-6 w-40 rounded" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
//         {Array.from({ length: 6 }).map((_, i) => (
//           <div key={i} className="space-y-3">
//             <div className="flex items-center justify-between">
//               <Skeleton className="h-5 w-5 rounded" />
//               <Skeleton className="h-4 w-10 rounded" />
//             </div>
//             <Skeleton className="h-4 w-20 rounded" />
//             <Skeleton className="h-6 w-16 rounded" />
//             <Skeleton className="h-2 w-full rounded" />
//           </div>
//         ))}
//       </div>
//     </Card>
//   );

//   if (dashboardData.isLoading) {
//     return (
//       <div className="space-y-6">
//         {/* Welcome Section Skeleton */}
//         <div className="p-6 rounded-xl bg-gray-200 animate-pulse">
//           <div className="flex items-center gap-3 mb-3">
//             <Skeleton className="w-10 h-10 rounded-lg" />
//             <Skeleton className="h-6 w-64 rounded" />
//           </div>
//           <Skeleton className="h-4 w-96 rounded" />
//         </div>

//         {/* Plan Usage Skeleton */}
//         <SkeletonCard />

//         {/* KPI Metrics Skeleton */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Skeleton key={i} className="h-32 rounded-lg" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (dashboardData.error) {
//     return (
//       <div className="flex flex-col items-center justify-center p-12 text-center">
//         <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
//         <p className="text-gray-600 mb-6">{dashboardData.error}</p>
//         <Button onClick={fetchRecruiterStatistics} className="bg-blue-600 hover:bg-blue-700">
//           Try Again
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-responsive-lg">
//       {/* Welcome Section */}
//       <div className="p-responsive rounded-xl bg-primary text-primary-foreground border-accent/20 border shadow-lg relative overflow-hidden">
//         <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/30 rounded-full opacity-60"></div>
//         <div className="absolute top-16 -left-12 w-40 h-40 bg-accent/30 rounded-full opacity-60"></div>
//         <div className="relative z-10">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="bg-accent/20 p-2 rounded-lg shrink-0">
//               <Briefcase className="w-5 h-5 text-accent" />
//             </div>
//             <h1 className="text-responsive-lg font-bold">Welcome back, {userName}!</h1>
//           </div>
//           <p className="text-responsive-sm text-slate-300">
//             Here's what's happening with your hiring pipeline today.
//           </p>
//         </div>
//       </div>

//       {/* Plan Usage Section */}
//       <Card className="p-responsive">
//         <div className="flex items-center gap-2 mb-6">
//           <CreditCard className="w-5 h-5 text-gray-600 shrink-0" />
//           <h2 className="text-responsive-lg font-semibold text-gray-900">Plan Usage</h2>
//         </div>

//         <div className="responsive-grid-3">
//           {planUsageData.map((item) => {
//             const percentage = Math.round((item.current / item.total) * 100);
//             return (
//               <div
//                 key={item.title}
//                 className={`p-responsive-sm rounded-lg border border-gray-200 bg-white ${item.clickAction ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''}`}
//                 onClick={() => item.clickAction && handlePlanUsageClick(item.clickAction)}
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
//                   <span className="text-responsive-sm font-medium text-gray-500">{percentage}%</span>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="text-responsive-sm font-medium text-gray-700">{item.title}</h3>
//                   <p className="text-responsive-lg font-bold text-gray-900">
//                     {item.current} / {item.total}
//                   </p>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className={`h-2 rounded-full transition-all duration-300 ${percentage >= 80 ? 'bg-red-500' : percentage >= 60 ? 'bg-orange-500' : 'bg-green-500'}`}
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </Card>

//       {/* KPI Metrics Row with Quick Actions */}
//       <div className="p-responsive flex flex-col lg:flex-row gap-4 lg:gap-auto w-full justify-center items-center">
//         {/* KPI Metrics - Takes 3 columns on lg, 5 columns on xl */}
//         <div className="flex flex-col xs:flex-row flex-wrap gap-3 lg:gap-4 w-fit h-fit pb-2">
//           {kpiData.map((kpi, index) => (
//             <div
//               key={kpi.title}
//               className={`p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 ${kpi.bgColor} border-2 rounded-lg h-fit min-h-[140px] sm:min-h-[160px] flex-1 min-w-[160px] sm:min-w-[180px] max-w-[250px] flex items-center justify-center`}
//               onClick={() => handleKpiClick(kpi.clickAction)}
//             >
//               <div className="flex flex-col items-center text-center space-y-1 w-full">
//                 <div className="p-1.5 rounded-lg bg-white/70 shrink-0">
//                   <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
//                 </div>
//                 <div className="space-y-0.5 min-w-0 w-full flex-1 flex flex-col justify-center">
//                   <h3 className={`text-sm xs:text-base sm:text-lg font-bold ${kpi.color} truncate w-full`}>{kpi.value}</h3>
//                   <p className={`text-xs font-semibold ${kpi.color} opacity-90 leading-tight truncate w-full`}>{kpi.title}</p>
//                   <p className={`text-xs ${kpi.color} opacity-70 leading-tight line-clamp-2 flex-1`}>{kpi.subtitle}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions - Takes 1 column on lg and xl */}
//         <div className="w-full lg:w-fit bg-orange-50 border border-orange-200 rounded-lg p-4 h-fit">
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
//             <Target className="w-5 h-5 text-orange-600 shrink-0" />
//             Quick Actions
//           </h3>
//           <div className="flex flex-col w-full lg:w-fit gap-3">
//             <Link to="talent-pool">
//               <button className="flex items-center justify-start h-fit bg-orange-600 hover:bg-orange-700 text-white w-full text-sm sm:text-base px-3 sm:px-4 rounded-md transition-colors py-1">
//                 <Users className="w-4 h-4 mr-3 shrink-0" />
//                 Browse Talent Pool
//               </button>
//             </Link>
//             <Link to="unlocked-talents">
//               <button className="flex items-center justify-start h-10 sm:h-12 w-full text-sm sm:text-base px-3 sm:px-4 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 transition-colors">
//                 <UserCheck className="w-4 h-4 mr-3 shrink-0" />
//                 Unlocked Talents
//               </button>
//             </Link>
//             <Link to="job-posts">
//               <button className="flex items-center justify-start h-10 sm:h-12 w-full text-sm sm:text-base px-3 sm:px-4 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 transition-colors">
//                 <FileText className="w-4 h-4 mr-3 shrink-0" />
//                 Create Job Post
//               </button>
//             </Link>
//             <Link to="quiz-builder">
//               <button className="flex items-center justify-start h-10 sm:h-12 w-full text-sm sm:text-base px-3 sm:px-4 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 transition-colors">
//                 <PuzzleIcon className="w-4 h-4 mr-3 shrink-0" />
//                 Quiz Builder
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section - Views vs Applications */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         {/* Performance Trend Chart - Using Real Job Analytics Data */}
//         <Card className="p-responsive">
//           <div className="mb-6">
//             <h3 className="text-responsive-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <TrendingUp className="w-5 h-5 text-green-500 shrink-0" />
//               Job Performance Analytics
//             </h3>
//             <div className="flex-responsive">
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
//                 <span className="text-responsive-sm text-gray-600">Applications</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-secondary-c shrink-0"></div>
//                 <span className="text-responsive-sm text-gray-600">Job Views</span>
//               </div>
//             </div>
//           </div>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <ChartContainer config={chartConfig} className="h-full w-full">
//                 <BarChart data={performanceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.8} />
//                   <XAxis
//                     dataKey="metric"
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12, fill: '#64748b' }}
//                     tickMargin={10}
//                   />
//                   <YAxis
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12, fill: '#64748b' }}
//                     tickMargin={10}
//                   />
//                   <ChartTooltip content={<ChartTooltipContent />} />
//                   <Bar dataKey="views" fill="#f97316" radius={[4, 4, 0, 0]} name="Views" />
//                   <Bar dataKey="applications" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Applications" />
//                 </BarChart>
//               </ChartContainer>
//             </ResponsiveContainer>
//           </div>
//         </Card>

//         {/* Conversion Rate Pie Chart */}
//         <Card className="p-responsive">
//           <div className="mb-6">
//             <h3 className="text-responsive-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
//               <TrendingUp className="w-5 h-5 text-green-500 shrink-0" />
//               Conversion Rate Analysis
//             </h3>
//             <p className="text-responsive-sm text-gray-600">
//               Relationship between job views and applications
//             </p>
//           </div>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <ChartContainer config={chartConfig} className="h-full w-full">
//                 <PieChart>
//                   <Pie
//                     data={conversionData.pieData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {conversionData.pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <ChartTooltip />
//                 </PieChart>
//               </ChartContainer>
//             </ResponsiveContainer>
//           </div>
//         </Card>
//       </div>

//       {/* Analytics Modal */}
//       <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
//         <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <TrendingUp className="w-5 h-5 shrink-0" />
//               Analytics Dashboard - Backend Data
//             </DialogTitle>
//           </DialogHeader>
//           <div className="space-responsive">
//             {/* Key Metrics Overview from Backend */}
//             <div className="responsive-grid-2">
//               <div className="text-center p-4 bg-blue-50 rounded-lg">
//                 <div className="text-2xl font-bold text-blue-600">{dashboardData.statistics?.jobs_views || "0"}</div>
//                 <div className="text-responsive-sm text-blue-800">Total Job Views</div>
//               </div>
//               <div className="text-center p-4 bg-green-50 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">{dashboardData.statistics?.jobs_applications || "0"}</div>
//                 <div className="text-responsive-sm text-green-800">Applications Received</div>
//               </div>
//               <div className="text-center p-4 bg-orange-50 rounded-lg">
//                 <div className="text-2xl font-bold text-orange-600">{dashboardData.statistics?.interviews || "0"}</div>
//                 <div className="text-responsive-sm text-orange-800">Interviews Scheduled</div>
//               </div>
//               <div className="text-center p-4 bg-purple-50 rounded-lg">
//                 <div className="text-2xl font-bold text-purple-600">{dashboardData.statistics?.unlocked_candidates || "0"}</div>
//                 <div className="text-responsive-sm text-purple-800">Unlocked Candidates</div>
//               </div>
//             </div>

//             {/* Job Analytics Details */}
//             {dashboardData.jobAnalytics && dashboardData.jobAnalytics.length > 0 && (
//               <Card className="p-4">
//                 <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                   <BarChart3 className="w-4 h-4 shrink-0" />
//                   Detailed Job Analytics
//                 </h4>
//                 <div className="space-y-3">
//                   {dashboardData.jobAnalytics.map((job, index) => (
//                     <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                       <div className="min-w-0 flex-1">
//                         <p className="font-medium text-gray-900 truncate">{job.title}</p>
//                         <p className="text-sm text-gray-600">
//                           {job.views} views • {job.applications} applications
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-lg font-bold text-green-600">
//                           {job.views > 0 ? ((job.applications / job.views) * 100).toFixed(1) : 0}%
//                         </div>
//                         <div className="text-xs text-gray-500">Conversion</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Card>
//             )}

//             {/* Conversion Rate Summary */}
//             <Card className="p-4">
//               <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <Activity className="w-4 h-4 shrink-0" />
//                 Conversion Performance
//               </h4>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-blue-600">{dashboardData.statistics?.jobs_views || "0"}</div>
//                   <div className="text-xs text-gray-600">Total Views</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-orange-600">{dashboardData.statistics?.jobs_applications || "0"}</div>
//                   <div className="text-xs text-gray-600">Total Applications</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-green-600">{conversionRate}%</div>
//                   <div className="text-xs text-gray-600">Conversion Rate</div>
//                 </div>
//               </div>
//             </Card>

//             {/* Current Plan Details */}
//             <Card className="p-4">
//               <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <CreditCard className="w-4 h-4 shrink-0" />
//                 Current Plan: {dashboardData.statistics?.current_plan?.name?.toUpperCase() || "FREE"}
//               </h4>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-gray-900">${dashboardData.statistics?.current_plan?.price || "0.00"}</div>
//                   <div className="text-xs text-gray-600">Monthly Price</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-gray-900">{getPlanLimit(dashboardData.statistics?.current_plan || null, "jobPosts")}</div>
//                   <div className="text-xs text-gray-600">Job Limit</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-gray-900">{getPlanLimit(dashboardData.statistics?.current_plan || null, "invitations")}</div>
//                   <div className="text-xs text-gray-600">Invitations Limit</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-lg font-bold text-gray-900">{getPlanLimit(dashboardData.statistics?.current_plan || null, "unlocked")}</div>
//                   <div className="text-xs text-gray-600">Unlocked CVs Limit</div>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Add Team Member Modal */}
//       <Dialog open={showAddTeamMemberModal} onOpenChange={setShowAddTeamMemberModal}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Users className="w-5 h-5 shrink-0" />
//               Add Team Member
//             </DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="memberName">Full Name</Label>
//               <Input
//                 id="memberName"
//                 placeholder="Enter team member's name"
//                 value={newMemberName}
//                 onChange={e => setNewMemberName(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="memberEmail">Email Address</Label>
//               <Input
//                 id="memberEmail"
//                 type="email"
//                 placeholder="Enter email address"
//                 value={newMemberEmail}
//                 onChange={e => setNewMemberEmail(e.target.value)}
//               />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Users, FileText, Briefcase, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, CheckCircle, PuzzleIcon, Activity, Unlock, Eye, Target, BarChart3, UserCheck, AlertCircle, CreditCard, Send, Video, Mail, Plus } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { CircularProgress } from "@/components/ui/circular-progress";
import { useAuth } from "@/contexts/AuthContext";
import { IP } from "@/store/Path";
import { Skeleton } from "@/components/ui/skeleton";


interface CurrentPlan {
  unlocked: number;
  jobPosts: number;
  invitations: number;
  onlineAssessment: number;
  onlineInterview: string | number;
  folders?: number;
}

interface RecruiterStatistics {
  posted_jobs: number;
  jobs_views: string;
  jobs_applications: string;
  unlocked_candidates: number;
  invitations_sent: number;
  quizzes: number;
  folders: number;
  interviews: number;
  total_applicants: string;
  current_plan: CurrentPlan;
}

interface JobAnalytics {
  views: number;
  applications: number;
  title: string;
}

interface DashboardData {
  statistics: RecruiterStatistics | null;
  jobAnalytics: JobAnalytics[] | null;
  isLoading: boolean;
  error: string | null;
}

const chartConfig = {
  views: {
    label: "Job Views",
    color: "hsl(220, 70%, 50%)"
  },
  applications: {
    label: "Applications",
    color: "hsl(28, 95%, 53%)"
  },
  conversion: {
    label: "Conversion Rate",
    color: "hsl(142, 70%, 45%)"
  }
};

// Helper function to get plan 
const getPlanLimit = (plan: CurrentPlan | null, feature: string): string | number => {
  if (!plan) return 0;
  
  const limitMap: { [key: string]: any } = {
    'unlocked': plan.unlocked,
    'jobPosts': plan.jobPosts,
    'invitations': plan.invitations,
    'onlineAssessment': plan.onlineAssessment,
    'onlineInterview': plan.onlineInterview,
    'folders': plan.folders || "unlimited" // Default value since not in backend
  };

  const limit = limitMap[feature];
  if (limit === "unlimited") return "Infinity";
  return limit || 0;
};

// Helper function to calculate percentage for progress bar
const calculatePercentage = (current: number, total: string | number): number => {
  if (total === "Infinity") return 0;
  if (typeof total === 'string') return 0;
  return Math.round((current / total) * 100);
};

export function DashboardOverview() {
  const { userData, currentUser } = useAuth();
  const [userName, setUserName] = useState('');
  const [showProfileViewsModal, setShowProfileViewsModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    statistics: null,
    jobAnalytics: null,
    isLoading: true,
    error: null
  });

  const { t } = useTranslation();

  // Generate KPI data from backend statistics
  const getKpiData = (stats: RecruiterStatistics | null) => [{
    title: "Total Jobs",
    value: stats?.posted_jobs.toString() || "0",
    subtitle: "All jobs posted",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    isPositive: true,
    clickAction: "job-posts"
  }, {
    title: "Applications Received",
    value: stats?.jobs_applications || "0",
    subtitle: "Total applications",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    isPositive: true,
    clickAction: "recruitment-board"
  }, {
    title: "Avg Applications per Job",
    value: stats?.posted_jobs ? (parseInt(stats.jobs_applications) / stats.posted_jobs).toFixed(1) : "0",
    subtitle: "Per job posted",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isPositive: true,
    clickAction: "recruitment-board"
  }, {
    title: "Unlocked Candidates",
    value: stats?.unlocked_candidates.toString() || "0",
    subtitle: "Total unlocked profiles",
    icon: Unlock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    isPositive: true,
    clickAction: "unlocked-talents"
  }, {
    title: "Interviews Scheduled",
    value: stats?.interviews.toString() || "0",
    subtitle: "Upcoming interviews",
    icon: Calendar,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    isPositive: true,
    clickAction: "interviews"
  }];

  // Generate plan usage data from backend statistics 
  const getPlanUsageData = (stats: RecruiterStatistics | null) => [{
    title: "Unlocked CVs",
    current: stats?.unlocked_candidates || 0,
    total: getPlanLimit(stats?.current_plan || null, "unlocked"),
    icon: Unlock,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  }, {
    title: "Posted Jobs",
    current: stats?.posted_jobs || 0,
    total: getPlanLimit(stats?.current_plan || null, "jobPosts"),
    icon: Briefcase,
    color: "text-green-600",
    bgColor: "bg-green-50"
  }, {
    title: "Invitations Sent",
    current: stats?.invitations_sent || 0,
    total: getPlanLimit(stats?.current_plan || null, "invitations"),
    icon: Send,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }, {
    title: "Quizzes Created",
    current: stats?.quizzes || 0,
    total: getPlanLimit(stats?.current_plan || null, "onlineAssessment"),
    icon: PuzzleIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }, {
    title: "Folders Created",
    current: stats?.folders || 0,
    total: getPlanLimit(stats?.current_plan || null, "folders"),
    icon: FileText,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50"
  }, {
    title: "Interviews Scheduled",
    current: stats?.interviews || 0,
    total: getPlanLimit(stats?.current_plan || null, "onlineInterview"),
    icon: Calendar,
    color: "text-red-600",
    bgColor: "bg-red-50",
    clickAction: "interviews"
  }];

  // Generate performance trend data from job analytics
  const getPerformanceTrendData = (analytics: JobAnalytics[] | null) => {
    if (!analytics || analytics.length === 0) {
      return [{
        metric: "No Data",
        views: 0,
        applications: 0
      }];
    }

    // Use actual job analytics data from backend
    return analytics.map(job => ({
      metric: job.title.length > 10 ? `${job.title.substring(0, 10)}...` : job.title,
      views: job.views,
      applications: job.applications
    }));
  };

  // Generate conversion rate data for pie chart
  const getConversionData = (stats: RecruiterStatistics | null) => {
    const views = parseInt(stats?.jobs_views || "0");
    const applications = parseInt(stats?.jobs_applications || "0");
    const conversionRate = views > 0 ? ((applications / views) * 100) : 0;

    // Pie chart data for views vs applications - using same colors as line chart
    const pieData = [
      { name: 'Applications', value: applications, color: '#f97316' },
      { name: 'Views Only', value: Math.max(0, views - applications), color: 'hsl(var(--primary))' }
    ];

    return {
      pieData,
      conversionRate: conversionRate.toFixed(1)
    };
  };

  const handleKpiClick = (action: string) => {
    console.log(`Navigating to ${action}`);
  };

  const handlePlanUsageClick = (action?: string) => {
    if (action === 'interviews') {
      setShowAnalyticsModal(true);
    }
  };

  const fetchRecruiterStatistics = async () => {
    if (!currentUser) {
      console.warn("No current user found");
      setDashboardData(prev => ({ ...prev, error: "User not authenticated", isLoading: false }));
      return;
    }

    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${IP}/api/employer/dashboard`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to get Recruiter Statistics");
      }

      setDashboardData(prev => ({
        ...prev,
        statistics: result.data,
        isLoading: false,
        error: null
      }));
    } catch (error: any) {
      const message = error.message || "Unexpected error occurred";
      console.error("Error getting Recruiter Statistics:", message);
      setDashboardData(prev => ({ ...prev, error: message, isLoading: false }));
    }
  };

  const fetchJobAnalytics = async () => {
    if (!currentUser) {
      console.warn("No current user found");
      return;
    }

    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${IP}/api/employer/dashboard/job-analytics`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to get Job Analytics");
      }

      setDashboardData(prev => ({
        ...prev,
        jobAnalytics: result.data,
        isLoading: false
      }));
    } catch (error: any) {
      const message = error.message || "Unexpected error occurred";
      console.error("Error getting Job Analytics:", message);
      // Continue without job analytics data
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setDashboardData(prev => ({ ...prev, isLoading: true }));
      setUserName(userData?.personalInfo?.fullName || '');
      await Promise.all([
        fetchRecruiterStatistics(),
        fetchJobAnalytics()
      ]);
    };

    fetchData();
  }, [userData, currentUser]);

  const kpiData = getKpiData(dashboardData.statistics);
  const planUsageData = getPlanUsageData(dashboardData.statistics);
  const performanceTrendData = getPerformanceTrendData(dashboardData.jobAnalytics);
  const conversionData = getConversionData(dashboardData.statistics);

  // Calculate conversion rate
  const views = parseInt(dashboardData.statistics?.jobs_views || "0");
  const applications = parseInt(dashboardData.statistics?.jobs_applications || "0");
  const conversionRate = views > 0 ? ((applications / views) * 100).toFixed(1) : "0.0";

  // Loading skeleton component
  const SkeletonCard = () => (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-6 w-40 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-10 rounded" />
            </div>
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-2 w-full rounded" />
          </div>
        ))}
      </div>
    </Card>
  );

  if (dashboardData.isLoading) {
    return (
      <div className="space-y-6">
        {/* Welcome Section Skeleton */}
        <div className="p-6 rounded-xl bg-gray-200 animate-pulse">
          <div className="flex items-center gap-3 mb-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-6 w-64 rounded" />
          </div>
          <Skeleton className="h-4 w-96 rounded" />
        </div>

        {/* Plan Usage Skeleton */}
        <SkeletonCard />

        {/* KPI Metrics Skeleton */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (dashboardData.error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
        <p className="text-gray-600 mb-6">{dashboardData.error}</p>
        <Button onClick={fetchRecruiterStatistics} className="bg-blue-600 hover:bg-blue-700">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-responsive-lg">
      {/* Welcome Section */}
      <div className="p-responsive rounded-xl bg-primary text-primary-foreground border-accent/20 border shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/30 rounded-full opacity-60"></div>
        <div className="absolute top-16 -left-12 w-40 h-40 bg-accent/30 rounded-full opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-accent/20 p-2 rounded-lg shrink-0">
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-responsive-lg font-bold">Welcome back, {userName}!</h1>
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
          {planUsageData.map((item) => {
            const percentage = calculatePercentage(item.current, item.total);
            const displayTotal = item.total === "Infinity" ? "∞" : item.total;
            
            return (
              <div
                key={item.title}
                className={`p-responsive-sm rounded-lg border border-gray-200 bg-white ${item.clickAction ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''}`}
                onClick={() => item.clickAction && handlePlanUsageClick(item.clickAction)}
              >
                <div className="flex items-center justify-between mb-3">
                  <item.icon className={`w-5 h-5 ${item.color} shrink-0`} />
                  <span className="text-responsive-sm font-medium text-gray-500">
                    {item.total === "Infinity" ? "∞" : `${percentage}%`}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-responsive-sm font-medium text-gray-700">{item.title}</h3>
                  <p className="text-responsive-lg font-bold text-gray-900">
                    {item.current} / {displayTotal}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    {item.total !== "Infinity" && (
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${percentage >= 80 ? 'bg-red-500' : percentage >= 60 ? 'bg-orange-500' : 'bg-green-500'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* KPI Metrics Row with Quick Actions */}
      <div className="p-responsive flex flex-col lg:flex-row gap-4 lg:gap-auto w-full justify-center items-center">
        {/* KPI Metrics - Takes 3 columns on lg, 5 columns on xl */}
        <div className="flex flex-col xs:flex-row flex-wrap gap-3 lg:gap-4 w-fit h-fit pb-2">
          {kpiData.map((kpi, index) => (
            <div
              key={kpi.title}
              className={`p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 ${kpi.bgColor} border-2 rounded-lg h-fit min-h-[140px] sm:min-h-[160px] flex-1 min-w-[160px] sm:min-w-[180px] max-w-[250px] flex items-center justify-center`}
              onClick={() => handleKpiClick(kpi.clickAction)}
            >
              <div className="flex flex-col items-center text-center space-y-1 w-full">
                <div className="p-1.5 rounded-lg bg-white/70 shrink-0">
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className="space-y-0.5 min-w-0 w-full flex-1 flex flex-col justify-center">
                  <h3 className={`text-sm xs:text-base sm:text-lg font-bold ${kpi.color} truncate w-full`}>{kpi.value}</h3>
                  <p className={`text-xs font-semibold ${kpi.color} opacity-90 leading-tight truncate w-full`}>{kpi.title}</p>
                  <p className={`text-xs ${kpi.color} opacity-70 leading-tight line-clamp-2 flex-1`}>{kpi.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions - Takes 1 column on lg and xl */}
        <div className="w-full lg:w-fit bg-orange-50 border border-orange-200 rounded-lg p-4 h-fit">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600 shrink-0" />
            Quick Actions
          </h3>
          <div className="flex flex-col w-full lg:w-fit gap-3">
            <Link to="talent-pool">
              <button className="flex items-center justify-start h-fit bg-orange-600 hover:bg-orange-700 text-white w-full text-sm sm:text-base px-3 sm:px-4 rounded-md transition-colors py-1">
                <Users className="w-4 h-4 mr-3 shrink-0" />
                Browse Talent Pool
              </button>
            </Link>
            <Link to="unlocked-talents">
              <button className="flex items-center justify-start h-10 sm:h-12 w-full text-sm sm:text-base px-3 sm:px-4 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 transition-colors">
                <UserCheck className="w-4 h-4 mr-3 shrink-0" />
                Unlocked Talents
              </button>
            </Link>
            <Link to="job-posts">
              <button className="flex items-center justify-start h-10 sm:h-12 w-full text-sm sm:text-base px-3 sm:px-4 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 transition-colors">
                <FileText className="w-4 h-4 mr-3 shrink-0" />
                Create Job Post
              </button>
            </Link>
            <Link to="quiz-builder">
              <button className="flex items-center justify-start h-10 sm:h-12 w-full text-sm sm:text-base px-3 sm:px-4 rounded-md border border-orange-300 text-orange-700 hover:bg-orange-100 hover:text-orange-800 transition-colors">
                <PuzzleIcon className="w-4 h-4 mr-3 shrink-0" />
                Quiz Builder
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Charts Section - Views vs Applications */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Performance Trend Chart - Using Real Job Analytics Data */}
        <Card className="p-responsive">
          <div className="mb-6">
            <h3 className="text-responsive-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500 shrink-0" />
              Job Performance Analytics
            </h3>
            <div className="flex-responsive">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shrink-0"></div>
                <span className="text-responsive-sm text-gray-600">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary-c shrink-0"></div>
                <span className="text-responsive-sm text-gray-600">Job Views</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart data={performanceTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.8} />
                  <XAxis
                    dataKey="metric"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickMargin={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickMargin={10}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="#f97316" radius={[4, 4, 0, 0]} name="Views" />
                  <Bar dataKey="applications" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Applications" />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Conversion Rate Pie Chart */}
        <Card className="p-responsive">
          <div className="mb-6">
            <h3 className="text-responsive-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500 shrink-0" />
              Conversion Rate Analysis
            </h3>
            <p className="text-responsive-sm text-gray-600">
              Relationship between job views and applications
            </p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={conversionData.pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {conversionData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Analytics Modal */}
      <Dialog open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 shrink-0" />
              Analytics Dashboard - Backend Data
            </DialogTitle>
          </DialogHeader>
          <div className="space-responsive">
            {/* Key Metrics Overview from Backend */}
            <div className="responsive-grid-2">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{dashboardData.statistics?.jobs_views || "0"}</div>
                <div className="text-responsive-sm text-blue-800">Total Job Views</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{dashboardData.statistics?.jobs_applications || "0"}</div>
                <div className="text-responsive-sm text-green-800">Applications Received</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{dashboardData.statistics?.interviews || "0"}</div>
                <div className="text-responsive-sm text-orange-800">Interviews Scheduled</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{dashboardData.statistics?.unlocked_candidates || "0"}</div>
                <div className="text-responsive-sm text-purple-800">Unlocked Candidates</div>
              </div>
            </div>

            {/* Job Analytics Details */}
            {dashboardData.jobAnalytics && dashboardData.jobAnalytics.length > 0 && (
              <Card className="p-4">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 shrink-0" />
                  Detailed Job Analytics
                </h4>
                <div className="space-y-3">
                  {dashboardData.jobAnalytics.map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">{job.title}</p>
                        <p className="text-sm text-gray-600">
                          {job.views} views • {job.applications} applications
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {job.views > 0 ? ((job.applications / job.views) * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-xs text-gray-500">Conversion</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Conversion Rate Summary */}
            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 shrink-0" />
                Conversion Performance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{dashboardData.statistics?.jobs_views || "0"}</div>
                  <div className="text-xs text-gray-600">Total Views</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{dashboardData.statistics?.jobs_applications || "0"}</div>
                  <div className="text-xs text-gray-600">Total Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{conversionRate}%</div>
                  <div className="text-xs text-gray-600">Conversion Rate</div>
                </div>
              </div>
            </Card>

            {/* Current Plan Details */}
            <Card className="p-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-4 h-4 shrink-0" />
                Current Plan Usage
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{dashboardData.statistics?.current_plan?.jobPosts || "0"}</div>
                  <div className="text-xs text-gray-600">Job Posts Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{dashboardData.statistics?.current_plan?.invitations || "0"}</div>
                  <div className="text-xs text-gray-600">Invitations Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{dashboardData.statistics?.current_plan?.unlocked || "0"}</div>
                  <div className="text-xs text-gray-600">Unlocked CVs Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {dashboardData.statistics?.current_plan?.onlineInterview === "unlimited" ? "∞" : dashboardData.statistics?.current_plan?.onlineInterview}
                  </div>
                  <div className="text-xs text-gray-600">Interviews Limit</div>
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
              <Input
                id="memberName"
                placeholder="Enter team member's name"
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email Address</Label>
              <Input
                id="memberEmail"
                type="email"
                placeholder="Enter email address"
                value={newMemberEmail}
                onChange={e => setNewMemberEmail(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}