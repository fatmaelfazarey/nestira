import { useAdminStore } from '@/store/Admin store/AdminStore'
import React, { useEffect, useState, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Briefcase,
  FileText,
  DollarSign,
  TrendingUp,
  UserCheck,
  CreditCard,
  RefreshCw,
  Target,
  Shield,
  Mail,
  LockOpen,
  BarChart3,
  PieChart,
  LineChart as LineChartIcon,
  Calendar,
  ChevronRight,
  Zap,
  Eye,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  BarChart
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter
} from 'recharts'
import { useToast } from '@/components/ui/use-toast'
import { Progress } from '@/components/ui/progress'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import { adminSocket } from "@/socket/adminSocket";

interface DashboardMetrics {
  users: {
    total: number;
    employers: number;
    candidates: number;
    verifiedCandidates: number;
    pendingVerification: number;
  };
  revenue: {
    total: string;
    monthly: string;
  };
  subscriptions: {
    total: number;
    active: number;
    expired: number;
  };
  content: {
    jobs: number;
    applications: number;
    quizzes: number;
    invitations: number;
    unlocked: number;
  };
}

interface ChartData {
  usersOverTime: {
    labels: string[];
    data: number[];
  };
  jobsOverTime: {
    labels: string[];
    data: number[];
  };
  applicationsOverTime: {
    labels: string[];
    data: number[];
  };
  revenueOverTime: {
    labels: string[];
    data: number[];
  };
  jobsStatusDistribution: {
    labels: string[];
    data: number[];
  };
  plansWithSubscribersCount: Record<string, number>;
}

const Dashboard = () => {
  const { getAdminDashboardMetrics, getAdminDashboardCharts } = useAdminStore();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [charts, setCharts] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [jobsCount, setJobsCount] = useState();
  const [quizzesCount, setQuizzesCount] = useState();

  const [applicationsCount, setApplicationsCount] = useState();
  const [invitationsCount, setInvitationsCount] = useState();
  const [unlockedCount, setUnlockedCount] = useState();

  const [newSubscriptions, setNewSubscriptions] = useState({});
  const [users, setUsers] = useState({});
  const [newRevenueOverTimeChart, setNewRevenueOverTimeChart] = useState()

  const PRIMARY_COLOR = '#3b82f6';
  const SECONDARY_COLOR = '#10b981';
  const COLORS = [PRIMARY_COLOR, 'secondary-c', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b'];

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [metricsData, chartsData] = await Promise.all([
        getAdminDashboardMetrics(),
        getAdminDashboardCharts()
      ]);

      if (metricsData?.success) {
        setMetrics(metricsData.data);
      }

      if (chartsData?.success) {
        setCharts(chartsData.data);
      }
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //#region Socket
  useEffect(() => {
    adminSocket.connect();

    adminSocket.on("connect", () => {
      adminSocket.emit("dashboard:join");
    });

    adminSocket.on("job:count", (data) => {
      console.log("Total jobs updated:", data.totalJobs);
      setJobsCount(data.totalJobs);

      if (!data) return;

      // update users
      if (data.totalJobs) {
        setJobsCount(data.totalJobs);
      }

      // update usersOverTime chart
      if (data.jobsOverTime?.labels?.length === data.jobsOverTime.data?.length) {
        setCharts(prev => prev ? { ...prev, jobsOverTime: data.jobsOverTime } : prev);
      }

    });

    adminSocket.on("quizzes:count", (data) => {
      console.log("Total quizzes updated:", data.totalQuizzes);
      setQuizzesCount(data.totalQuizzes);
    });

    adminSocket.on("applications:count", (data) => {
      console.log("Total Applications updated:", data);
      setApplicationsCount(data.totalApplications);

      if (!data) return;

      // update users
      if (data.totalApplications) {
        setApplicationsCount(data.totalApplications);
      }

      // update usersOverTime chart
      if (data.applicationsOverTime?.labels?.length === data.applicationsOverTime.data?.length) {
        setCharts(prev => prev ? { ...prev, applicationsOverTime: data.applicationsOverTime } : prev);
      }
    });

    adminSocket.on("invitations:count", (data) => {
      console.log("Total Invitations updated:", data.totalInvitations);
      setInvitationsCount(data.totalInvitations);
    });

    adminSocket.on("unlocked:count", (data) => {
      console.log("Total Unlocked updated:", data.totalUnlocked);
      setUnlockedCount(data.totalUnlocked);
    });

    adminSocket.on("newUser:count", handleNewUserUpdate);

    // CHARTS 
    adminSocket.on("adminDashboard:update", handleDashboardUpdate);

    adminSocket.on("jobStage:count", (data) => {
      console.log("jobStage updated:", data.jobsStatusDistribution);

      if (!data) return;
      // update usersOverTime chart
      if (data.jobsStatusDistribution?.labels?.length === data.jobsStatusDistribution.data?.length) {
        setCharts(prev => prev ? { ...prev, jobsStatusDistribution: data.jobsStatusDistribution } : prev);
      }

    });

    return () => {
      adminSocket.off("job:count");
      adminSocket.off("quizzes:count");
      adminSocket.off("applications:count");
      adminSocket.off("invitations:count");
      adminSocket.off("unlocked:count");

      // adminSocket.off("newSubscriptions:count");
      adminSocket.off("newUser:count");
      adminSocket.off("revenueChart:count");
      adminSocket.off("planSubscribers:count");
      adminSocket.off("adminDashboard:update", handleDashboardUpdate);

      adminSocket.off("jobStage:count");
      adminSocket.disconnect();
    };
  }, []);


  const handleDashboardUpdate = (payload: {
    newSubscriptionsData?: any;
    newRevenueOverTime?: ChartData["revenueOverTime"];
    plansWithSubscribersCount?: ChartData["plansWithSubscribersCount"];
  }) => {
    if (!payload) return;
    setNewSubscriptions(payload.newSubscriptionsData);
    setCharts(prev => {
      if (!prev) return prev;

      return {
        ...prev,

        // update revenue chart لو موجود
        ...(payload.newRevenueOverTime &&
          payload.newRevenueOverTime.labels?.length ===
          payload.newRevenueOverTime.data?.length && {
          revenueOverTime: payload.newRevenueOverTime,
        }),

        // update plans subscribers
        ...(payload.plansWithSubscribersCount && {
          plansWithSubscribersCount: payload.plansWithSubscribersCount,
        }),
      };
    });
  };

  const handleNewUserUpdate = (data: {
    users?: any;
    usersOverTime?: ChartData["usersOverTime"];
  }) => {
    if (!data) return;

    // update users
    if (data.users) {
      setUsers(data.users);
    }

    // update usersOverTime chart
    if (data.usersOverTime?.labels?.length === data.usersOverTime.data?.length) {
      setCharts(prev => prev ? { ...prev, usersOverTime: data.usersOverTime } : prev);
    }
  };

  //#endregion

  const downloadDashboardAsPDF = async () => {
    if (!dashboardRef.current) return;

    try {
      setDownloading(true);
      const toastId = toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your dashboard report...",
        duration: 5000,
      });


      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`);

      toast({
        title: "PDF Downloaded Successfully",
        description: "Your dashboard report has been saved",
        variant: "default",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF report",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  // Data formatting functions
  const formatRevenueData = () => {
    if (!charts?.revenueOverTime) return [];
    return charts.revenueOverTime.labels.map((label, index) => ({
      name: label,
      revenue: charts.revenueOverTime.data[index]
    }));
  };

  const formatUsersData = () => {
    if (!charts?.usersOverTime) return [];
    return charts.usersOverTime.labels.map((label, index) => ({
      name: label,
      users: charts.usersOverTime.data[index]
    }));
  };

  const formatJobsData = () => {
    if (!charts?.jobsOverTime) return [];
    return charts.jobsOverTime.labels.map((label, index) => ({
      name: label,
      jobs: charts.jobsOverTime.data[index]
    }));
  };

  const formatApplicationsData = () => {
    if (!charts?.applicationsOverTime) return [];
    return charts.applicationsOverTime.labels.map((label, index) => ({
      name: label,
      applications: charts.applicationsOverTime.data[index]
    }));
  };

  const formatJobsDistributionData = () => {
    if (!charts?.jobsStatusDistribution) return [];
    return charts.jobsStatusDistribution.labels.map((label, index) => ({
      name: label,
      value: charts.jobsStatusDistribution.data[index]
    }));
  };

  const formatSubscriptionData = () => {
    if (!charts?.plansWithSubscribersCount) return [];
    return Object.entries(charts.plansWithSubscribersCount).map(([name, value]) => ({
      name,
      value,
      fill: COLORS[Object.keys(charts.plansWithSubscribersCount).indexOf(name) % COLORS.length]
    }));
  };

  if (loading) {
    return (
      <div className=" space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-9 w-56 mb-2" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="border shadow-sm">
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dashboardRef} className="bg- space-y-6 bg-gradient-to-br from-gray-50/50 to-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Comprehensive overview of platform performance</p>
        </div>

        <div className="flex items-center gap-3">
          {/* <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 daysش
            <ChevronRight className="w-4 h-4" />
          </Button> */}
          <Button
            onClick={fetchData}
            variant="outline"
            size="icon"
            disabled={refreshing}
            className="relative overflow-hidden"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing && (
              <div className="absolute inset-0 bg-primary/10 animate-pulse" />
            )}
          </Button>
          <Button
            onClick={downloadDashboardAsPDF}
            variant="default"
            size="sm"
            disabled={downloading}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            <Download className={`w-4 h-4 ${downloading ? 'animate-pulse' : ''}`} />
            {downloading ? 'Generating PDF...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid - Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                Total Users
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">{users?.total || metrics?.users.total || 0}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">Employers</div>
                <div className="text-xl font-bold text-blue-600">{users?.employers || metrics?.users.employers || 0}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">Candidates</div>
                <div className="text-xl font-bold text-green-600">{users?.candidates || metrics?.users.candidates || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-green-500/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                Revenue
              </CardTitle>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                <TrendingUp className="w-3 h-3 mr-1" />
                Revenue
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">${newSubscriptions?.totalRevenue || metrics?.revenue.total || '0.00'}</div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">Monthly</div>
                <div className="text-xl font-bold text-green-600">${newSubscriptions?.currentMonthRevenue || metrics?.revenue.monthly || '0.00'}</div>
              </div>
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions */}
        <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-purple-500/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                Subscriptions
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">{newSubscriptions?.totalSubscriptions || metrics?.subscriptions.total || 0}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">Active</div>
                <div className="text-xl font-bold text-green-600">{newSubscriptions?.activeSubscriptions || metrics?.subscriptions.active || 0}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-600">Expired</div>
                <div className="text-xl font-bold text-red-600">{newSubscriptions?.expiredSubscriptions || metrics?.subscriptions.expired || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Overview */}
        <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-amber-500/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                </div>
                Content Overview
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">{jobsCount || metrics?.content.jobs || 0}</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{jobsCount || metrics?.content.jobs || 0}</div>
                <div className="text-xs text-gray-600">Jobs</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{applicationsCount || metrics?.content.applications || 0}</div>
                <div className="text-xs text-gray-600">Applications</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Content Metrics - Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Jobs Card */}
        <Card className="lg:col-span-1 group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-blue-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              Total Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-blue-600 mb-2">
              {jobsCount || metrics?.content.jobs || 0}
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                Posted Jobs
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Applications Card */}
        <Card className="lg:col-span-1 group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-green-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <FileText className="w-4 h-4 text-green-600" />
              </div>
              Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-green-600 mb-2">
              {applicationsCount || metrics?.content.applications || 0}
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                Job Applications
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quizzes Card */}
        <Card className="lg:col-span-1 group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-purple-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-purple-600 mb-2">
              {quizzesCount || metrics?.content.quizzes || 0}
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                Available Quizzes
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Invitations Card */}
        <Card className="lg:col-span-1 group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-amber-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                <Mail className="w-4 h-4 text-amber-600" />
              </div>
              Invitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-amber-600 mb-2">
              {invitationsCount || metrics?.content.invitations || 0}
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                Sent Invitations
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Unlocked Content Card */}
        <Card className="lg:col-span-1 group hover:shadow-lg transition-all duration-300 border border-gray-200/80 hover:border-emerald-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <LockOpen className="w-4 h-4 text-emerald-600" />
              </div>
              Unlocked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-emerald-600 mb-2">
              {unlockedCount || metrics?.content.unlocked || 0}
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="text-xs">
                Unlocked Content
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Verification Stats - Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Candidate Verification */}
        <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors" style={{ backgroundColor: `${SECONDARY_COLOR}20` }}>
                <UserCheck className="w-4 h-4" style={{ color: SECONDARY_COLOR }} />
              </div>
              Candidate Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold" style={{ color: SECONDARY_COLOR }}>{users?.verifiedCandidates || metrics?.users.verifiedCandidates || 0}</div>
                  <div className="text-sm text-gray-600">Verified Candidates</div>
                </div>
                <div className="p-3 rounded-xl" style={{
                  background: `linear-gradient(135deg, ${SECONDARY_COLOR}, ${SECONDARY_COLOR}80)`
                }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verification Rate</span>
                  <span className="font-medium" style={{ color: SECONDARY_COLOR }}>
                    {((users?.verifiedCandidates || metrics?.users.verifiedCandidates || 0) / (users?.candidates || metrics?.users.candidates || 1) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={(users?.verifiedCandidates || metrics?.users.verifiedCandidates || 0) / (users?.candidates || metrics?.users.candidates || 1) * 100}
                  className="h-2"
                  style={{
                    backgroundColor: `${SECONDARY_COLOR}20`,
                    ['--progress-background' as any]: SECONDARY_COLOR,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                <Eye className="w-4 h-4 text-amber-600" />
              </div>
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-amber-600">{users?.pendingVerification || metrics?.users.pendingVerification || 0}</div>
                  <div className="text-sm text-gray-600">Pending Verification</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-400 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">To Review</div>
                  <div className="text-lg font-bold">{users?.pendingVerification || metrics?.users.pendingVerification || 0}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Completion</div>
                  <div className="text-lg font-bold">
                    {((users?.pendingVerification || metrics?.users.verifiedCandidates || 0) / (users?.candidates || metrics?.users.candidates || 1) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <LineChartIcon className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2">
              <PieChart className="w-4 h-4" />
              Distribution
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="gap-1">
              <Zap className="w-3 h-3" />
              Live Data
            </Badge>
          </div>
        </div>

        {/* Overview Charts */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Revenue Over Time
                </CardTitle>
                <CardDescription>Monthly revenue progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formatRevenueData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        formatter={(value) => [`$${value}`, 'Revenue']}
                        contentStyle={{
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Users Chart */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Users Over Time
                </CardTitle>
                <CardDescription>Monthly user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={formatUsersData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Bar
                        dataKey="users"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#1d4ed8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Charts */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Jobs Activity */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Jobs Over Time
                </CardTitle>
                <CardDescription>Daily job postings activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formatJobsData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="jobs"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Applications Over Time - Daily application submissions */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Applications Over Time
                </CardTitle>
                <CardDescription>Daily application submissions with trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={formatApplicationsData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        label={{
                          value: 'Applications',
                          angle: -90,
                          position: 'insideLeft',
                          offset: 10
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value, name) => {
                          if (name === 'applications') return [value, 'Daily Applications'];
                          if (name === 'avg') return [value, '7-Day Average'];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="applications"
                        name="Daily Applications"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        opacity={0.8}
                        barSize={30}
                      />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        name="Trend Line"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Scatter
                        dataKey="applications"
                        name="Data Points"
                        fill="#10b981"
                        shape="circle"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-sm font-medium text-gray-600">Peak Day</div>
                    <div className="text-lg font-bold text-green-600">
                      {formatApplicationsData().reduce((max, day) => day.applications > max.applications ? day : max).name}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-sm font-medium text-gray-600">Total Week</div>
                    <div className="text-lg font-bold text-blue-600">
                      {formatApplicationsData().reduce((sum, day) => sum + day.applications, 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Distribution Charts */}
        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Status Distribution */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Job Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={formatJobsDistributionData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {formatJobsDistributionData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, 'Jobs']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>


            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Subscription Plans Distribution
                </CardTitle>
                <CardDescription>Subscribers count per plan type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={formatSubscriptionData()}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {formatSubscriptionData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.fill || COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip formatter={(value) => [value, 'Subscribers']} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>

                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-600">Total Subscribers</div>
                    <div className="text-lg font-bold text-purple-600">
                      {formatSubscriptionData().reduce((sum, plan) => sum + plan.value, 0)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {formatSubscriptionData().map((plan, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: plan.fill || COLORS[index % COLORS.length] }}
                          />
                          <span>{plan.name}</span>
                        </div>
                        <div className="font-medium">{plan.value} subscribers</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Section */}
      {/* <Card className="bg-gradient-to-r from-gray-50 to-white border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5" />
            Platform Summary
          </CardTitle>
          <CardDescription>Key performance indicators at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg bg-white">
              <div className="text-sm font-medium text-gray-600 mb-1">User Growth</div>
              <div className="text-2xl font-bold text-green-600">
                +{((charts?.usersOverTime.data[charts.usersOverTime.data.length - 1] || 0) - (charts?.usersOverTime.data[0] || 0))}
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-white">
              <div className="text-sm font-medium text-gray-600 mb-1">Avg. Applications/Day</div>
              <div className="text-2xl font-bold text-blue-600">
                {(formatApplicationsData().reduce((sum, day) => sum + day.applications, 0) / formatApplicationsData().length).toFixed(1)}
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-white">
              <div className="text-sm font-medium text-gray-600 mb-1">Active Rate</div>
              <div className="text-2xl font-bold text-purple-600">
                {((metrics?.subscriptions.active || 0) / (metrics?.subscriptions.total || 1) * 100).toFixed(0)}%
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-white">
              <div className="text-sm font-medium text-gray-600 mb-1">Verification Rate</div>
              <div className="text-2xl font-bold" style={{ color: SECONDARY_COLOR }}>
                {((metrics?.users.verifiedCandidates || 0) / (metrics?.users.candidates || 1) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Outlet />
    </div>
  );
}

export default Dashboard;