// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { Progress } from "@/components/ui/progress";
// // import {
// //   FileText,
// //   Clock,
// //   CircleCheck,
// //   Star,
// //   User,
// //   Calendar,
// //   Plus
// // } from "lucide-react";
// // import { Link } from "react-router-dom"
// // import { useAuth } from "@/contexts/AuthContext";
// // import { DashboardHeader } from "./DashboardHeader";
// // import { IP } from "@/store/Path";
// // import { useEffect, useState } from "react";
// // import { Skeleton } from "@/components/ui/skeleton";

// // // Types for backend data
// // interface CandidateStatistics {
// //   applications: number;
// //   assessments: number;
// //   interviews: number;
// //   saved_jobs: number;
// //   invitations: number;
// //   total_assessment_score: number;
// // }

// // interface DashboardData {
// //   statistics: CandidateStatistics | null;
// //   isLoading: boolean;
// //   error: string | null;
// // }

// // export default function CandidateDashboard() {
// //   const { userData, currentUser } = useAuth();
// //   const [dashboardData, setDashboardData] = useState<DashboardData>({
// //     statistics: null,
// //     isLoading: true,
// //     error: null
// //   });

// //   // Generate usage stats from backend statistics - numbers only
// //   const getUsageStats = (stats: CandidateStatistics | null) => [{
// //     title: "Applications Submitted",
// //     value: stats?.applications || 0,
// //     icon: FileText,
// //     bgColor: "bg-card-blue",
// //     borderColor: "border-info/30"
// //   }, {
// //     title: "Assessments Completed",
// //     value: stats?.assessments || 0,
// //     icon: CircleCheck,
// //     bgColor: "bg-card-green",
// //     borderColor: "border-success/30"
// //   }, {
// //     title: "Interview Requests",
// //     value: stats?.interviews || 0,
// //     icon: Calendar,
// //     bgColor: "bg-card-purple",
// //     borderColor: "border-warning/30"
// //   },
// //   // {
// //   //   title: "Profile Views",
// //   //   value: 47, // Keeping this static as it's not in backend
// //   //   icon: User,
// //   //   bgColor: "bg-card-orange",
// //   //   borderColor: "border-earnings"
// //   // },
// //   {
// //     title: "Saved Jobs",
// //     value: stats?.saved_jobs || 0,
// //     icon: Star,
// //     bgColor: "bg-card-blue",
// //     borderColor: "border-primary-c/30"
// //   }];

// //   // Generate quick stats from backend statistics
// //   const getQuickStats = (stats: CandidateStatistics | null) => [{
// //     title: "Active Applications",
// //     value: stats?.applications?.toString() || "0",
// //     subtitle: "Currently in review",
// //     bgColor: "bg-card-blue"
// //   }, {
// //     title: "Assessment Score",
// //     value: stats?.total_assessment_score ? stats.total_assessment_score.toFixed(1) : "0.0",
// //     subtitle: "Average rating",
// //     bgColor: "bg-card-green"
// //   }, {
// //     title: "Response Rate",
// //     value: "65%",
// //     subtitle: "Above average",
// //     bgColor: "bg-card-purple"
// //   }, {
// //     title: "Completion Rate",
// //     value: "92%",
// //     subtitle: "Profile completeness",
// //     bgColor: "bg-card-orange"
// //   }, {
// //     title: "Interviews",
// //     value: stats?.interviews?.toString() || "0",
// //     subtitle: "Scheduled interviews",
// //     bgColor: "bg-card-accent-c"
// //   }];

// //   const recentActivity = [
// //     {
// //       action: "Application submitted",
// //       company: "JP Morgan Chase",
// //       role: "Financial Analyst",
// //       time: "2 hours ago",
// //       status: "pending"
// //     },
// //     {
// //       action: "Assessment completed",
// //       company: "Goldman Sachs",
// //       role: "Investment Banking Analyst",
// //       time: "1 day ago",
// //       status: "completed"
// //     },
// //     {
// //       action: "Profile viewed",
// //       company: "Morgan Stanley",
// //       role: "Risk Analyst",
// //       time: "2 days ago",
// //       status: "viewed"
// //     }
// //   ];

// //   const fetchCandidateStatistics = async () => {
// //     if (!currentUser) {
// //       console.warn("No current user found");
// //       setDashboardData(prev => ({ ...prev, error: "User not authenticated", isLoading: false }));
// //       return;
// //     }

// //     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
// //     const url = `${IP}/api/candidate/dashboard`;

// //     try {
// //       const response = await fetch(url, {
// //         method: "GET",
// //         headers: {
// //           Authorization: token,
// //           "Content-Type": "application/json",
// //         }
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         throw new Error(result.message || "Failed to get Candidate Statistics");
// //       }

// //       setDashboardData({
// //         statistics: result.data,
// //         isLoading: false,
// //         error: null
// //       });
// //     } catch (error: any) {
// //       const message = error.message || "Unexpected error occurred";
// //       console.error("Error getting Candidate Statistics:", message);
// //       setDashboardData(prev => ({ ...prev, error: message, isLoading: false }));
// //     }
// //   };


// //   const fetchRecentActivity = async () => {
// //     if (!currentUser) {
// //       console.warn("No current user found");
// //       setDashboardData(prev => ({ ...prev, error: "User not authenticated", isLoading: false }));
// //       return;
// //     }

// //     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
// //     const url = `${IP}/api/candidate/dashboard/recent`;

// //     try {
// //       const response = await fetch(url, {
// //         method: "GET",
// //         headers: {
// //           Authorization: token,
// //           "Content-Type": "application/json",
// //         }
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         throw new Error(result.message || "Failed to get Candidate Statistics");
// //       }

// //       return result.data;
// //     } catch (error: any) {
// //       const message = error.message || "Unexpected error occurred";
// //       console.error("Error getting Candidate Statistics:", message);

// //     }
// //   };
// //   useEffect(() => {
// //     fetchCandidateStatistics();
// //   }, [currentUser]);

// //   const usageStats = getUsageStats(dashboardData.statistics);
// //   const quickStats = getQuickStats(dashboardData.statistics);

// //   // Loading skeleton component
// //   const SkeletonCard = () => (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
// //       {Array.from({ length: 5 }).map((_, i) => (
// //         <Skeleton key={i} className="h-32 rounded-xl" />
// //       ))}
// //     </div>
// //   );

// //   if (dashboardData.isLoading) {
// //     return (
// //       <div className="min-h-screen bg-background">
// //         {/* Hero Section Skeleton */}
// //         <div className="bg-gradient-to-r from-primary to-primary-c-hover p-8 text-white">
// //           <div className="max-w-7xl mx-auto">
// //             <div className="flex items-center justify-between md:flex-row flex-col">
// //               <div className="space-y-3">
// //                 <Skeleton className="h-8 w-64 rounded" />
// //                 <Skeleton className="h-6 w-96 rounded" />
// //               </div>
// //               <div className="space-y-2">
// //                 <Skeleton className="h-4 w-32 rounded" />
// //                 <div className="flex items-center gap-3">
// //                   <Skeleton className="h-2 w-24 rounded" />
// //                   <Skeleton className="h-8 w-12 rounded" />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="max-w-7xl mx-auto p-8 space-y-8">
// //           {/* Usage Statistics Skeleton */}
// //           <div>
// //             <Skeleton className="h-7 w-40 mb-6 rounded" />
// //             <SkeletonCard />
// //           </div>

// //           {/* Quick Stats Skeleton */}
// //           <SkeletonCard />

// //           {/* Main Content Grid Skeleton */}
// //           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
// //             <div className="lg:col-span-2 space-y-4">
// //               <Skeleton className="h-64 rounded-xl" />
// //             </div>
// //             <div className="space-y-6">
// //               <Skeleton className="h-48 rounded-xl" />
// //               <Skeleton className="h-64 rounded-xl" />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (dashboardData.error) {
// //     return (
// //       <div className="min-h-screen bg-background flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-red-500 text-6xl mb-4">⚠️</div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
// //           <p className="text-gray-600 mb-6">{dashboardData.error}</p>
// //           <Button onClick={fetchCandidateStatistics} className="bg-blue-600 hover:bg-blue-700">
// //             Try Again
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* <DashboardHeader role="candidate"/> */}
// //       {/* Hero Section */}
// //       <div className="bg-gradient-to-r from-primary to-primary-c-hover p-8 text-white animate-fade-in shadow-sm">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="flex items-center justify-between md:flex-row flex-col">
// //             <div>
// //               <h1 className="text-3xl font-bold mb-2">Welcome back, {userData?.basicInfo?.fullName} 👋</h1>
// //               <p className="text-primary-c-foreground/80 text-lg">
// //                 You're making great progress on your finance career journey.
// //               </p>
// //             </div>
// //             <div className="text-right md:block flex justify-between items-center w-full md:w-fit">
// //               <p className="text-sm text-primary-c-foreground/60 mb-1">Profile Strength</p>
// //               <div className="flex items-center gap-3">
// //                 <Progress value={92} className="w-24 h-2 bg-secondary/20" />
// //                 <span className="text-2xl font-bold">92%</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto p-8 space-y-8">
// //         {/* Usage Statistics - Numbers Only */}
// //         <div>
// //           <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Progress</h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {usageStats.map((stat, index) => (
// //               <Card
// //                 key={stat.title}
// //                 className={`${stat.bgColor} ${stat.borderColor} border-2 transition-all duration-200 hover:shadow-lg animate-slide-up rounded-xl`}
// //                 style={{ animationDelay: `${index * 100}ms` }}
// //               >
// //                 <CardContent className="p-6 text-center">
// //                   <div className="flex items-center justify-center mb-4">
// //                     <stat.icon className="w-8 h-8 text-foreground" />
// //                   </div>
// //                   <h5 className="font-medium mb-2 text-foreground text-sm">{stat.title}</h5>
// //                   <p className="text-3xl font-bold text-foreground">
// //                     {stat.value}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Quick Stats */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
// //           {quickStats.map((stat, index) => (
// //             <Card
// //               key={stat.title}
// //               className={`${stat.bgColor} transition-all duration-200 hover:shadow-md hover:scale-105 animate-scale-in rounded-xl border-2`}
// //               style={{ animationDelay: `${index * 100}ms` }}
// //             >
// //               <CardContent className="p-6 text-center">
// //                 <h3 className="font-medium text-sm text-foreground mb-2">
// //                   {stat.title}
// //                 </h3>
// //                 <p className="text-3xl font-bold mb-1 text-foreground">
// //                   {stat.value}
// //                 </p>
// //                 <p className="text-xs text-foreground/70">
// //                   {stat.subtitle}
// //                 </p>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>

// //         {/* Main Content Grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
// //           {/* Recent Activity */}
// //           <div className="lg:col-span-2">
// //             <Card className="animate-fade-in rounded-xl shadow-sm border-2">
// //               <CardHeader className="flex flex-row items-center justify-between">
// //                 <CardTitle className="text-xl text-foreground">Recent Activity</CardTitle>
// //                 <Button variant="outline" size="sm" className="hover:bg-accent-c transition-colors duration-200">
// //                   <Clock className="w-4 h-4 mr-2" />
// //                   View All
// //                 </Button>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {recentActivity.map((activity, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex items-center justify-between p-4 rounded-xl bg-card hover:bg-accent-c/50 transition-colors duration-200 border"
// //                   >
// //                     <div className="flex items-center gap-4">
// //                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === 'completed' ? 'bg-success-light text-success' :
// //                         activity.status === 'pending' ? 'bg-warning-light text-warning' :
// //                           'bg-info-light text-info'
// //                         }`}>
// //                         {activity.status === 'completed' ? <CircleCheck className="w-5 h-5" /> :
// //                           activity.status === 'pending' ? <Clock className="w-5 h-5" /> :
// //                             <User className="w-5 h-5" />}
// //                       </div>
// //                       <div>
// //                         <p className="font-medium text-foreground">{activity.action}</p>
// //                         <p className="text-sm text-muted-c-foreground">
// //                           {activity.company} • {activity.role}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <div className="text-right">
// //                       <p className="text-sm text-muted-c-foreground">{activity.time}</p>
// //                       <Badge
// //                         variant="secondary-c"
// //                         className={
// //                           activity.status === 'completed' ? 'bg-success-light text-success' :
// //                             activity.status === 'pending' ? 'bg-warning-light text-warning' :
// //                               'bg-info-light text-info'
// //                         }
// //                       >
// //                         {activity.status}
// //                       </Badge>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Quick Actions */}
// //           <div>
// //             <Card className="animate-fade-in rounded-xl shadow-sm border-2">
// //               <CardHeader>
// //                 <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <Link to="/candidate/jobs">
// //                   <Button className="w-full justify-start bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground transition-all duration-200 hover:scale-105">
// //                     <Plus className="w-4 h-4 " />
// //                     Browse New Jobs
// //                   </Button>
// //                 </Link>
// //                 <Link to="/candidate/assessments" className="inline-block w-full">
// //                   <Button variant="outline" className="w-full justify-start hover:bg-warning-light hover:text-warning hover:border-warning/50 transition-all duration-200">
// //                     <CircleCheck className="w-4 h-4 " />
// //                     Complete Assessment
// //                   </Button>
// //                 </Link>
// //                 <Link to="/candidate/profile" className="inline-block w-full">
// //                   <Button variant="outline" className="w-full justify-start hover:bg-info-light hover:text-info hover:border-info/50 transition-all duration-200">
// //                     <User className="w-4 h-4 " />
// //                     Update Profile
// //                   </Button>
// //                 </Link>
// //                 <Button variant="outline" className="w-full justify-start hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200">
// //                   <Calendar className="w-4 h-4 " />
// //                   Schedule Mock Interview <span className="text-secondary-c text-[12px]"> (coming Soon) </span>
// //                 </Button>
// //               </CardContent>
// //             </Card>

// //             {/* Job Recommendations */}
// //             <Card className="mt-6 animate-fade-in rounded-xl shadow-sm border-2">
// //               <CardHeader>
// //                 <CardTitle className="text-xl text-foreground">Recommended for You</CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md">
// //                   <h4 className="font-medium text-foreground mb-1">Senior Financial Analyst</h4>
// //                   <p className="text-sm text-muted-c-foreground mb-2">Goldman Sachs • New York</p>
// //                   <div className="flex items-center justify-between">
// //                     <Badge className="bg-success-light text-success border-success/30">95% Match</Badge>
// //                     <span className="text-sm text-muted-c-foreground font-medium">$120k - $150k</span>
// //                   </div>
// //                 </div>
// //                 <div className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md">
// //                   <h4 className="font-medium text-foreground mb-1">Investment Banking Associate</h4>
// //                   <p className="text-sm text-muted-c-foreground mb-2">JP Morgan • London</p>
// //                   <div className="flex items-center justify-between">
// //                     <Badge className="bg-warning-light text-warning border-warning/30">88% Match</Badge>
// //                     <span className="text-sm text-muted-c-foreground font-medium">$140k - $180k</span>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import {
//   FileText,
//   Clock,
//   CircleCheck,
//   Star,
//   User,
//   Calendar,
//   Plus
// } from "lucide-react";
// import { Link } from "react-router-dom"
// import { useAuth } from "@/contexts/AuthContext";
// import { DashboardHeader } from "./DashboardHeader";
// import { IP } from "@/store/Path";
// import { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// // Types for backend data
// interface CandidateStatistics {
//   applications: number;
//   assessments: number;
//   interviews: number;
//   saved_jobs: number;
//   invitations: number;
//   total_assessment_score: number;
// }

// interface RecentActivityData {
//   applications: any;
//   assessments: any;
//   interviews: any;
// }

// interface DashboardData {
//   statistics: CandidateStatistics | null;
//   recentActivity: RecentActivityData | null;
//   isLoading: boolean;
//   error: string | null;
// }

// export default function CandidateDashboard() {
//   const { userData, currentUser } = useAuth();
//   const [dashboardData, setDashboardData] = useState<DashboardData>({
//     statistics: null,
//     recentActivity: null,
//     isLoading: true,
//     error: null
//   });

//   // Generate usage stats from backend statistics - numbers only
//   const getUsageStats = (stats: CandidateStatistics | null) => [{
//     title: "Applications Submitted",
//     value: stats?.applications || 0,
//     icon: FileText,
//     bgColor: "bg-card-blue",
//     borderColor: "border-info/30"
//   }, {
//     title: "Assessments Completed",
//     value: stats?.assessments || 0,
//     icon: CircleCheck,
//     bgColor: "bg-card-green",
//     borderColor: "border-success/30"
//   }, {
//     title: "Interview Requests",
//     value: stats?.interviews || 0,
//     icon: Calendar,
//     bgColor: "bg-card-purple",
//     borderColor: "border-warning/30"
//   }, {
//     title: "Saved Jobs",
//     value: stats?.saved_jobs || 0,
//     icon: Star,
//     bgColor: "bg-card-blue",
//     borderColor: "border-primary-c/30"
//   }];

//   // Generate quick stats from backend statistics
//   const getQuickStats = (stats: CandidateStatistics | null) => [{
//     title: "Active Applications",
//     value: stats?.applications?.toString() || "0",
//     subtitle: "Currently in review",
//     bgColor: "bg-card-blue"
//   }, {
//     title: "Assessment Score",
//     value: stats?.total_assessment_score ? stats.total_assessment_score.toFixed(1) : "0.0",
//     subtitle: "Average rating",
//     bgColor: "bg-card-green"
//   }, {
//     title: "Response Rate",
//     value: "65%",
//     subtitle: "Above average",
//     bgColor: "bg-card-purple"
//   }, {
//     title: "Completion Rate",
//     value: "92%",
//     subtitle: "Profile completeness",
//     bgColor: "bg-card-orange"
//   }, {
//     title: "Interviews",
//     value: stats?.interviews?.toString() || "0",
//     subtitle: "Scheduled interviews",
//     bgColor: "bg-card-accent-c"
//   }];

//   // Generate recent activity from backend data
//   const getRecentActivity = (recentData: RecentActivityData | null) => {
//     const activities = [];

//     // Add application activity
//     if (recentData?.applications) {
//       const app = recentData.applications;
//       activities.push({
//         action: "Application submitted",
//         company: app.company_name || "Unknown Company",
//         role: app.title || "Unknown Position",
//         time: new Date(app.created_at).toLocaleDateString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric'
//         }),
//         status: app.hiring_stage === 'interviewing' ? 'pending' :
//           app.hiring_stage === 'hired' ? 'completed' : 'pending',
//         type: 'application'
//       });
//     }

//     // Add assessment activity
//     if (recentData?.assessments) {
//       const assessment = recentData.assessments;
//       activities.push({
//         action: "Assessment completed",
//         company: "Assessment Center",
//         role: assessment.jobTitle || "Skill Assessment",
//         time: "Recently",
//         status: assessment.progress === 'completed' ? 'completed' : 'pending',
//         score: assessment.score,
//         type: 'assessment'
//       });
//     }

//     // Add interview activity
//     if (recentData?.interviews) {
//       const interview = recentData.interviews;
//       const interviewDate = new Date(interview.interview_date);
//       const now = new Date();

//       let status = 'pending';
//       if (interview.status === 'cancelled') status = 'cancelled';
//       else if (interviewDate < now) status = 'completed';
//       else status = 'pending';

//       activities.push({
//         action: "Interview scheduled",
//         company: "Hiring Company",
//         role: "Interview",
//         time: interviewDate.toLocaleDateString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric'
//         }),
//         status: status,
//         type: 'interview',
//         mode: interview.interview_mode
//       });
//     }

//     // Sort by time (most recent first) and limit to 3 items
//     return activities.slice(0, 3);
//   };

//   const fetchCandidateStatistics = async () => {
//     if (!currentUser) {
//       console.warn("No current user found");
//       setDashboardData(prev => ({ ...prev, error: "User not authenticated", isLoading: false }));
//       return;
//     }

//     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
//     const url = `${IP}/api/candidate/dashboard`;

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
//         throw new Error(result.message || "Failed to get Candidate Statistics");
//       }

//       setDashboardData(prev => ({
//         ...prev,
//         statistics: result.data,
//         isLoading: false,
//         error: null
//       }));
//     } catch (error: any) {
//       const message = error.message || "Unexpected error occurred";
//       console.error("Error getting Candidate Statistics:", message);
//       setDashboardData(prev => ({ ...prev, error: message, isLoading: false }));
//     }
//   };

//   const fetchRecentActivity = async () => {
//     if (!currentUser) {
//       console.warn("No current user found");
//       return;
//     }

//     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
//     const url = `${IP}/api/candidate/dashboard/recent`;

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
//         throw new Error(result.message || "Failed to get Recent Activity");
//       }

//       setDashboardData(prev => ({
//         ...prev,
//         recentActivity: result.data,
//         isLoading: false
//       }));
//     } catch (error: any) {
//       const message = error.message || "Unexpected error occurred";
//       console.error("Error getting Recent Activity:", message);
//       // Continue without recent activity data
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setDashboardData(prev => ({ ...prev, isLoading: true }));
//       await Promise.all([
//         fetchCandidateStatistics(),
//         fetchRecentActivity()
//       ]);
//     };

//     fetchData();
//   }, [currentUser]);

//   const usageStats = getUsageStats(dashboardData.statistics);
//   const quickStats = getQuickStats(dashboardData.statistics);
//   const recentActivity = getRecentActivity(dashboardData.recentActivity);

//   // Loading skeleton component
//   const SkeletonCard = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {Array.from({ length: 4 }).map((_, i) => (
//         <Skeleton key={i} className="h-32 rounded-xl" />
//       ))}
//     </div>
//   );

//   if (dashboardData.isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         {/* Hero Section Skeleton */}
//         <div className="bg-gradient-to-r from-primary to-primary-c-hover p-8 text-white">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center justify-between md:flex-row flex-col">
//               <div className="space-y-3">
//                 <Skeleton className="h-8 w-64 rounded" />
//                 <Skeleton className="h-6 w-96 rounded" />
//               </div>
//               <div className="space-y-2">
//                 <Skeleton className="h-4 w-32 rounded" />
//                 <div className="flex items-center gap-3">
//                   <Skeleton className="h-2 w-24 rounded" />
//                   <Skeleton className="h-8 w-12 rounded" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto p-8 space-y-8">
//           {/* Usage Statistics Skeleton */}
//           <div>
//             <Skeleton className="h-7 w-40 mb-6 rounded" />
//             <SkeletonCard />
//           </div>

//           {/* Quick Stats Skeleton */}
//           <SkeletonCard />

//           {/* Main Content Grid Skeleton */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//             <div className="lg:col-span-2 space-y-4">
//               <Skeleton className="h-64 rounded-xl" />
//             </div>
//             <div className="space-y-6">
//               <Skeleton className="h-48 rounded-xl" />
//               <Skeleton className="h-64 rounded-xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (dashboardData.error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
//           <p className="text-gray-600 mb-6">{dashboardData.error}</p>
//           <Button onClick={fetchCandidateStatistics} className="bg-blue-600 hover:bg-blue-700">
//             Try Again
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const fetchRecommendedJobs = async () => {

//     if (!currentUser) {
//       console.warn('No current user found');
//       return { success: false, message: 'User not authenticated' };
//     }

//     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

//     const url = `${IP}/api/candidate/jobs`;
//     // const token = `Bearer ${localStorage.getItem('token')}`;
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           'Authorization': token,
//           'Content-Type': 'application/json',
//         }
//       });
//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(`Failed to fetch jobs: ${errorMessage}`);
//       }
//       const data = await response.json();

//       return data;

//     } catch (error) {
//       if (error instanceof Error) {
//         console.error('Error fetching jobs:', error.message);
//       } else {
//         console.error('Unexpected error:', error);
//       }

//     }
//   }


//   return (
//     <div className="min-h-screen bg-background">
//       {/* <DashboardHeader role="candidate"/> */}
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-primary to-primary-c-hover p-8 text-white animate-fade-in shadow-sm">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between md:flex-row flex-col">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">Welcome back, {userData?.basicInfo?.fullName} 👋</h1>
//               <p className="text-primary-c-foreground/80 text-lg">
//                 You're making great progress on your finance career journey.
//               </p>
//             </div>
//             <div className="text-right md:block flex justify-between items-center w-full md:w-fit">
//               <p className="text-sm text-primary-c-foreground/60 mb-1">Profile Strength</p>
//               <div className="flex items-center gap-3">
//                 <Progress value={92} className="w-24 h-2 bg-secondary/20" />
//                 <span className="text-2xl font-bold">92%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-8 space-y-8">
//         {/* Usage Statistics - Numbers Only */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Progress</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {usageStats.map((stat, index) => (
//               <Card
//                 key={stat.title}
//                 className={`${stat.bgColor} ${stat.borderColor} border-2 transition-all duration-200 hover:shadow-lg animate-slide-up rounded-xl`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <CardContent className="p-6 text-center">
//                   <div className="flex items-center justify-center mb-4">
//                     <stat.icon className="w-8 h-8 text-foreground" />
//                   </div>
//                   <h5 className="font-medium mb-2 text-foreground text-sm">{stat.title}</h5>
//                   <p className="text-3xl font-bold text-foreground">
//                     {stat.value}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//           {quickStats.map((stat, index) => (
//             <Card
//               key={stat.title}
//               className={`${stat.bgColor} transition-all duration-200 hover:shadow-md hover:scale-105 animate-scale-in rounded-xl border-2`}
//               style={{ animationDelay: `${index * 100}ms` }}
//             >
//               <CardContent className="p-6 text-center">
//                 <h3 className="font-medium text-sm text-foreground mb-2">
//                   {stat.title}
//                 </h3>
//                 <p className="text-3xl font-bold mb-1 text-foreground">
//                   {stat.value}
//                 </p>
//                 <p className="text-xs text-foreground/70">
//                   {stat.subtitle}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//           {/* Recent Activity */}
//           <div className="lg:col-span-2">
//             <Card className="animate-fade-in rounded-xl shadow-sm border-2">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-xl text-foreground">Recent Activity</CardTitle>
//                 <Button variant="outline" size="sm" className="hover:bg-accent-c transition-colors duration-200">
//                   <Clock className="w-4 h-4 mr-2" />
//                   View All
//                 </Button>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {recentActivity.length > 0 ? (
//                   recentActivity.map((activity, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between p-4 rounded-xl bg-card hover:bg-accent-c/50 transition-colors duration-200 border"
//                     >
//                       <div className="flex items-center gap-4">
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === 'completed' ? 'bg-success-light text-success' :
//                           activity.status === 'cancelled' ? 'bg-error-light text-error' :
//                             'bg-warning-light text-warning'
//                           }`}>
//                           {activity.type === 'application' ? <FileText className="w-5 h-5" /> :
//                             activity.type === 'assessment' ? <CircleCheck className="w-5 h-5" /> :
//                               <Calendar className="w-5 h-5" />}
//                         </div>
//                         <div>
//                           <p className="font-medium text-foreground">{activity.action}</p>
//                           <p className="text-sm text-muted-c-foreground">
//                             {activity.company} • {activity.role}
//                           </p>
//                           {activity.score && (
//                             <p className="text-xs text-green-600 mt-1">
//                               Score: {activity.score}%
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm text-muted-c-foreground">{activity.time}</p>
//                         <Badge
//                           variant="secondary-c"
//                           className={
//                             activity.status === 'completed' ? 'bg-success-light text-success' :
//                               activity.status === 'cancelled' ? 'bg-error-light text-error' :
//                                 'bg-warning-light text-warning'
//                           }
//                         >
//                           {activity.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 text-muted-c-foreground">
//                     <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
//                     <p>No recent activity found</p>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Actions */}
//           <div>
//             <Card className="animate-fade-in rounded-xl shadow-sm border-2">
//               <CardHeader>
//                 <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <Link to="/candidate/jobs">
//                   <Button className="w-full justify-start bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground transition-all duration-200 hover:scale-105">
//                     <Plus className="w-4 h-4 " />
//                     Browse New Jobs
//                   </Button>
//                 </Link>
//                 <Link to="/candidate/assessments" className="inline-block w-full">
//                   <Button variant="outline" className="w-full justify-start hover:bg-warning-light hover:text-warning hover:border-warning/50 transition-all duration-200">
//                     <CircleCheck className="w-4 h-4 " />
//                     Complete Assessment
//                   </Button>
//                 </Link>
//                 <Link to="/candidate/profile" className="inline-block w-full">
//                   <Button variant="outline" className="w-full justify-start hover:bg-info-light hover:text-info hover:border-info/50 transition-all duration-200">
//                     <User className="w-4 h-4 " />
//                     Update Profile
//                   </Button>
//                 </Link>
//                 <Button variant="outline" className="w-full justify-start hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50 transition-all duration-200">
//                   <Calendar className="w-4 h-4 " />
//                   Schedule Mock Interview <span className="text-secondary-c text-[12px]"> (coming Soon) </span>
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Job Recommendations */}
//             <Card className="mt-6 animate-fade-in rounded-xl shadow-sm border-2">
//               <CardHeader>
//                 <CardTitle className="text-xl text-foreground">Recommended for You</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md">
//                   <h4 className="font-medium text-foreground mb-1">Senior Financial Analyst</h4>
//                   <p className="text-sm text-muted-c-foreground mb-2">Goldman Sachs • New York</p>
//                   <div className="flex items-center justify-between">
//                     <Badge className="bg-success-light text-success border-success/30">95% Match</Badge>
//                     <span className="text-sm text-muted-c-foreground font-medium">$120k - $150k</span>
//                   </div>
//                 </div>
//                 <div className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md">
//                   <h4 className="font-medium text-foreground mb-1">Investment Banking Associate</h4>
//                   <p className="text-sm text-muted-c-foreground mb-2">JP Morgan • London</p>
//                   <div className="flex items-center justify-between">
//                     <Badge className="bg-warning-light text-warning border-warning/30">88% Match</Badge>
//                     <span className="text-sm text-muted-c-foreground font-medium">$140k - $180k</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









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
import { IP } from "@/store/Path";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Types for backend data
interface CandidateStatistics {
  applications: number;
  assessments: number;
  interviews: number;
  saved_jobs: number;
  invitations: number;
  total_assessment_score: number;
}

interface RecentActivityData {
  applications: any;
  assessments: any;
  interviews: any;
}

interface JobRecommendation {
  id: number;
  title: string;
  employer_data: {
    id: string;
    companySize: string;
    location: string;
    companyType: string;
    description: string;
    industry: string;
    linkedinUrl: string;
    websiteUrl: string;
    yearFounded: string;
  };
  company: string;
  country: string;
  currency: string;
  employmentType: string;
  workMode: string;
  postedDate: string;
  salary: string;
  tags: string[];
  description: string;
  requirements: string[];
  saved: boolean;
  matchScore: number;
  matchDetails: {
    skillsMatched: string[];
    skillsMissing: string[];
    toolsMatched: string[];
    toolsMissing: string[];
    certificationsMatched: string[];
    certificationsMissing: string[];
    locationMatch: boolean;
    experienceMatch: boolean;
  };
}

interface DashboardData {
  statistics: CandidateStatistics | null;
  recentActivity: RecentActivityData | null;
  recommendedJobs: JobRecommendation[] | null;
  isLoading: boolean;
  error: string | null;
}

export default function CandidateDashboard() {
  const { userData, currentUser } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    statistics: null,
    recentActivity: null,
    recommendedJobs: null,
    isLoading: true,
    error: null
  });

  // Generate usage stats from backend statistics - numbers only
  const getUsageStats = (stats: CandidateStatistics | null) => [{
    title: "Applications Submitted",
    value: stats?.applications || 0,
    icon: FileText,
    bgColor: "bg-card-blue",
    borderColor: "border-info/30"
  }, {
    title: "Assessments Completed",
    value: stats?.assessments || 0,
    icon: CircleCheck,
    bgColor: "bg-card-green",
    borderColor: "border-success/30"
  }, {
    title: "Interview Requests",
    value: stats?.interviews || 0,
    icon: Calendar,
    bgColor: "bg-card-purple",
    borderColor: "border-warning/30"
  }, {
    title: "Saved Jobs",
    value: stats?.saved_jobs || 0,
    icon: Star,
    bgColor: "bg-card-blue",
    borderColor: "border-primary-c/30"
  }];

  // Generate quick stats from backend statistics
  const getQuickStats = (stats: CandidateStatistics | null) => [{
    title: "Active Applications",
    value: stats?.applications?.toString() || "0",
    subtitle: "Currently in review",
    bgColor: "bg-card-blue"
  }, {
    title: "Assessment Score",
    value: stats?.total_assessment_score ? stats.total_assessment_score.toFixed(1) : "0.0",
    subtitle: "Average rating",
    bgColor: "bg-card-green"
  }, {
    title: "Response Rate",
    value: "65%",
    subtitle: "Above average",
    bgColor: "bg-card-purple"
  }, {
    title: "Completion Rate",
    value: "92%",
    subtitle: "Profile completeness",
    bgColor: "bg-card-orange"
  }, {
    title: "Interviews",
    value: stats?.interviews?.toString() || "0",
    subtitle: "Scheduled interviews",
    bgColor: "bg-card-accent-c"
  }];

  // Generate recent activity from backend data
  const getRecentActivity = (recentData: RecentActivityData | null) => {
    const activities = [];

    // Add application activity
    if (recentData?.applications) {
      const app = recentData.applications;
      activities.push({
        action: "Application submitted",
        company: app.company_name || "Unknown Company",
        role: app.title || "Unknown Position",
        time: new Date(app.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        status: app.hiring_stage === 'interviewing' ? 'pending' :
          app.hiring_stage === 'hired' ? 'completed' : 'pending',
        type: 'application'
      });
    }

    // Add assessment activity
    if (recentData?.assessments) {
      const assessment = recentData.assessments;
      activities.push({
        action: "Assessment completed",
        company: "Assessment Center",
        role: assessment.jobTitle || "Skill Assessment",
        time: "Recently",
        status: assessment.progress === 'completed' ? 'completed' : 'pending',
        score: assessment.score,
        type: 'assessment'
      });
    }

    // Add interview activity
    if (recentData?.interviews) {
      const interview = recentData.interviews;
      const interviewDate = new Date(interview.interview_date);
      const now = new Date();

      let status = 'pending';
      if (interview.status === 'cancelled') status = 'cancelled';
      else if (interviewDate < now) status = 'completed';
      else status = 'pending';

      activities.push({
        action: "Interview scheduled",
        company: "Hiring Company",
        role: "Interview",
        time: interviewDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        status: status,
        type: 'interview',
        mode: interview.interview_mode
      });
    }

    // Sort by time (most recent first) and limit to 3 items
    return activities.slice(0, 3);
  };

  // Get top 2 jobs with highest matchScore
  const getTopRecommendedJobs = (jobs: JobRecommendation[] | null) => {
    if (!jobs || jobs.length === 0) return [];

    // Sort jobs by matchScore in descending order and take top 2
    return jobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 2);
  };

  // Get badge color based on match score
  const getMatchBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-success-light text-success border-success/30';
    if (score >= 60) return 'bg-warning-light text-warning border-warning/30';
    return 'bg-error-light text-error border-error/30';
  };

  const fetchCandidateStatistics = async () => {
    if (!currentUser) {
      console.warn("No current user found");
      setDashboardData(prev => ({ ...prev, error: "User not authenticated", isLoading: false }));
      return;
    }

    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${IP}/api/candidate/dashboard`;

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
        throw new Error(result.message || "Failed to get Candidate Statistics");
      }

      setDashboardData(prev => ({
        ...prev,
        statistics: result.data,
        isLoading: false,
        error: null
      }));
    } catch (error: any) {
      const message = error.message || "Unexpected error occurred";
      console.error("Error getting Candidate Statistics:", message);
      setDashboardData(prev => ({ ...prev, error: message, isLoading: false }));
    }
  };

  const fetchRecentActivity = async () => {
    if (!currentUser) {
      console.warn("No current user found");
      return;
    }

    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${IP}/api/candidate/dashboard/recent`;

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
        throw new Error(result.message || "Failed to get Recent Activity");
      }

      setDashboardData(prev => ({
        ...prev,
        recentActivity: result.data,
        isLoading: false
      }));
    } catch (error: any) {
      const message = error.message || "Unexpected error occurred";
      console.error("Error getting Recent Activity:", message);
      // Continue without recent activity data
    }
  };

  const fetchRecommendedJobs = async () => {
    if (!currentUser) {
      console.warn('No current user found');
      return;
    }

    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${IP}/api/candidate/jobs`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch jobs: ${errorMessage}`);
      }

      const result = await response.json();

      if (result.success) {
        setDashboardData(prev => ({
          ...prev,
          recommendedJobs: result.data,
          isLoading: false
        }));
      }
    } catch (error) {
      console.error('Error fetching recommended jobs:', error);
      // Continue without recommended jobs
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setDashboardData(prev => ({ ...prev, isLoading: true }));
      await Promise.all([
        fetchCandidateStatistics(),
        fetchRecentActivity(),
        fetchRecommendedJobs()
      ]);
    };

    fetchData();
  }, [currentUser]);

  const usageStats = getUsageStats(dashboardData.statistics);
  const quickStats = getQuickStats(dashboardData.statistics);
  const recentActivity = getRecentActivity(dashboardData.recentActivity);
  const topRecommendedJobs = getTopRecommendedJobs(dashboardData.recommendedJobs);

  // Loading skeleton component
  const SkeletonCard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-xl" />
      ))}
    </div>
  );

  if (dashboardData.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-r from-primary to-primary-c-hover p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between md:flex-row flex-col">
              <div className="space-y-3">
                <Skeleton className="h-8 w-64 rounded" />
                <Skeleton className="h-6 w-96 rounded" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 w-24 rounded" />
                  <Skeleton className="h-8 w-12 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Usage Statistics Skeleton */}
          <div>
            <Skeleton className="h-7 w-40 mb-6 rounded" />
            <SkeletonCard />
          </div>

          {/* Quick Stats Skeleton */}
          <SkeletonCard />

          {/* Main Content Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-64 rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (dashboardData.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">{dashboardData.error}</p>
          <Button onClick={fetchCandidateStatistics} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

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
        {/* Usage Statistics - Numbers Only */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {usageStats.map((stat, index) => (
              <Card
                key={stat.title}
                className={`${stat.bgColor} ${stat.borderColor} border-2 transition-all duration-200 hover:shadow-lg animate-slide-up rounded-xl`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <stat.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h5 className="font-medium mb-2 text-foreground text-sm">{stat.title}</h5>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
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
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-card hover:bg-accent-c/50 transition-colors duration-200 border"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === 'completed' ? 'bg-success-light text-success' :
                          activity.status === 'cancelled' ? 'bg-error-light text-error' :
                            'bg-warning-light text-warning'
                          }`}>
                          {activity.type === 'application' ? <FileText className="w-5 h-5" /> :
                            activity.type === 'assessment' ? <CircleCheck className="w-5 h-5" /> :
                              <Calendar className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-c-foreground">
                            {activity.company} • {activity.role}
                          </p>
                          {activity.score && (
                            <p className="text-xs text-green-600 mt-1">
                              Score: {activity.score}%
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-c-foreground">{activity.time}</p>
                        <Badge
                          variant="secondary-c"
                          className={
                            activity.status === 'completed' ? 'bg-success-light text-success' :
                              activity.status === 'cancelled' ? 'bg-error-light text-error' :
                                'bg-warning-light text-warning'
                          }
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-c-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity found</p>
                  </div>
                )}
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
                {topRecommendedJobs.length > 0 ? (
                  topRecommendedJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-xl border-2 border-border-c hover:border-secondary-c/50 bg-card transition-all duration-200 cursor-pointer hover:shadow-md"
                    >
                      <h4 className="font-medium text-foreground mb-1">{job.title}</h4>
                      <p className="text-sm text-muted-c-foreground mb-2">
                        {job.company} • {job.country}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={getMatchBadgeColor(job.matchScore)}>
                          {job.matchScore}% Match
                        </Badge>
                        <span className="text-sm text-muted-c-foreground font-medium">
                          {job.salary !== "Not specified" ? job.salary : "Salary not specified"}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {job.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags.length > 3 && (
                          <span className="text-xs text-muted-c-foreground">
                            +{job.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-c-foreground">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No job recommendations available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}