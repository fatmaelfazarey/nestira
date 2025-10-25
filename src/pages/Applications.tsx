
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";

// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   FileText,
//   Clock,
//   CircleCheck,
//   User,
//   Calendar
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { myApplications } from "@/store/candidate store/store";

// export default function Applications() {
//   const [applications, setApplications] = useState([

//     // {
//     //   id: 2,
//     //   company_name: "JP Morgan Chase",
//     //   title: "Financial Analyst",
//     //   status: "Under Review",
//     //   created_at: "2024-01-12",
//     //   salary: "$120k - $150k",
//     //   location: "London, UK",
//     //   statusColor: "text-info",
//     //   statusBg: "bg-info-light"
//     // },
//     // {
//     //   id: 3,
//     //   company_name: "Morgan Stanley",
//     //   title: "Risk Management Associate",
//     //   status: "Applied",
//     //   created_at: "2024-01-10",
//     //   salary: "$110k - $140k",
//     //   location: "Singapore",
//     //   statusColor: "text-primary-c",
//     //   statusBg: "bg-accent-c"
//     // },
//     // {
//     //   id: 1,
//     //   company_name: "Goldman Sachs",
//     //   title: "Investment Banking Analyst",
//     //   status: "Interview Scheduled",
//     //   created_at: "2024-01-15",
//     //   salary: "$140k - $180k",
//     //   location: "New York, NY",
//     //   statusColor: "text-secondary-c",
//     //   statusBg: "bg-earnings"
//     // },
//     // {
//     //   id: 4,
//     //   company_name: "Deutsche Bank",
//     //   title: "Quantitative Analyst",
//     //   status: "Rejected",
//     //   created_at: "2024-01-08",
//     //   salary: "$130k - $160k",
//     //   location: "Frankfurt, Germany",
//     //   statusColor: "text-destructive",
//     //   statusBg: "bg-destructive/20"
//     // },
//     // {
//     //   id: 5,
//     //   company_name: "Credit Suisse",
//     //   title: "Portfolio Manager",
//     //   status: "Offer Received",
//     //   created_at: "2024-01-05",
//     //   salary: "$160k - $200k",
//     //   location: "Zurich, Switzerland",
//     //   statusColor: "text-success",
//     //   statusBg: "bg-success-light"
//     // }
//   ]);

//   //#region search jobs
//   const [filteredApplications, setFilteredApplications] = useState([])
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSort, setIsSort] = useState(false)

//   useEffect(() => {


//      fetchMyApplications();


//   },[])
//   const fetchMyApplications = async () => {
//     const res = await myApplications(setApplications);
//     if (!res.sucess) {
//       console.log(res.message)
//     }else{
//       setFilteredApplications(applications);
//     }
//   }
//   const handleSort = (shouldSort) => {
//     if (shouldSort) {
//       const sortedApp = [...applications].sort((a, b) => {
//         return new Date(b.created_at) - new Date(a.created_at);
//       });
//       setFilteredApplications(sortedApp);
//     } else {
//       setFilteredApplications(applications);
//     }
//   };

//   const handleFilterChange = (value: string) => {
//     setFilteredApplications(applications.filter(app => {
//       const matchesSearch = app.status == value;

//       return matchesSearch;
//     }));

//   }

//   useEffect(() => {
//     setFilteredApplications(applications.filter(app => {
//       const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase());

//       return matchesSearch;
//     }));
//   }, [searchTerm])

//   //#endregion

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Interview Scheduled":
//         return <Calendar className="w-4 h-4" />;
//       case "Under Review":
//         return <Clock className="w-4 h-4" />;
//       case "Offer Received":
//         return <CircleCheck className="w-4 h-4" />;
//       default:
//         return <FileText className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 animate-fade-in">
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
//           <p className="text-muted-c-foreground">Track and manage your job applications</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card className="bg-accent-c border-primary-c/10 animate-scale-in rounded-xl shadow-sm">
//             <CardContent className="p-6 text-center">
//               <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Total Applications</h3>
//               <p className="text-3xl font-bold text-secondary-c">8</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-earnings border-secondary-c/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '100ms' }}>
//             <CardContent className="p-6 text-center">
//               <h3 className="font-medium text-sm text-earnings-foreground/70 mb-2">Pending Review</h3>
//               <p className="text-3xl font-bold text-earnings-foreground">3</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-success-light border-success/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '200ms' }}>
//             <CardContent className="p-6 text-center">
//               <h3 className="font-medium text-sm text-success/70 mb-2">Interviews</h3>
//               <p className="text-3xl font-bold text-success">2</p>
//             </CardContent>
//           </Card>
//           <Card className="bg-info-light border-info/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '300ms' }}>
//             <CardContent className="p-6 text-center">
//               <h3 className="font-medium text-sm text-info/70 mb-2">Response Rate</h3>
//               <p className="text-3xl font-bold text-info">75%</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filters */}
//         <Card className="mb-6 animate-fade-in rounded-xl shadow-sm border-border-c/50">
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <Input
//                 placeholder="Search applications..."
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1 rounded-lg border-border-c/50 focus:border-secondary-c"
//               />

//               <Select onValueChange={(value) => handleFilterChange(value)}>
//                 <SelectTrigger className="w-full sm:w-[180px]">
//                   <SelectValue placeholder="Filter by Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectItem value="Applied">Applied</SelectItem>
//                     <SelectItem value="Under Review">Under Review</SelectItem>
//                     <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
//                     <SelectItem value="Rejected">Rejected</SelectItem>
//                     <SelectItem value="Offer Received">Offer Received</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   const newSortState = !isSort;
//                   setIsSort(newSortState);
//                   handleSort(newSortState);
//                 }}
//                 className={`hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 ${isSort ? 'text-white bg-secondary-c' : ''}`}
//               >
//                 Sort by Date
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Applications List */}
//         <div className="space-y-4">
//           {filteredApplications?.length === 0 ?
//             <div className="text-center py-12">
//               <p className="text-muted-c-foreground text-lg">No Applications were found that match your search.</p>
//             </div>
//             : filteredApplications.map((application, index) => (
//               <Card
//                 key={application.id}
//                 className="hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02] rounded-xl border-border-c/50"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <CardContent className="p-6">
//                   {/* Main structure */}
//                   <div className="flex items-center justify-between md:flex-row flex-col gap-4">

//                     {/* Left side: main information */}
//                     <div className="flex items-center gap-4 flex-1 w-full">
//                       {/* Icon */}
//                       <div
//                         className={`w-12 h-12 rounded-xl flex items-center justify-center ${application.statusBg} shadow-sm flex-shrink-0`}
//                       >
//                         <div className={application.statusColor}>
//                           {getStatusIcon(application.status)}
//                         </div>
//                       </div>

//                       {/* Details */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
//                           <div className="min-w-0">
//                             <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
//                               {application.title}
//                             </h3>
//                             <p className="text-muted-c-foreground font-medium truncate">
//                               {application.company_name} • {application.location}
//                             </p>
//                           </div>

//                           {/* Status badge - visible at the top on small screens */}
//                           <Badge
//                             className={`${application.statusBg} ${application.statusColor} hover:scale-105 transition-transform duration-200 rounded-lg px-3 py-1 flex-shrink-0 md:hidden`}
//                           >
//                             {application.status}
//                           </Badge>
//                         </div>

//                         <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-muted-c-foreground">
//                           <span>Applied: {application.created_at}</span>
//                           <span className="hidden xs:inline">•</span>
//                           <span className="font-medium text-foreground">{application.salary}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right side: buttons and status */}
//                     <div className="flex flex-row md:flex-col items-center gap-2 w-full md:w-auto justify-between md:justify-start">
//                       {/* Status badge - visible on medium and large screens */}
//                       <Badge
//                         className={`${application.statusBg} ${application.statusColor} hover:scale-105 transition-transform duration-200 rounded-lg px-3 py-1 flex-shrink-0 hidden md:flex`}
//                       >
//                         {application.status}
//                       </Badge>

//                       {/* Action buttons */}
//                       <div className="flex flex-row md:flex-col gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="hover:bg-accent-c hover:text-primary-c hover:border-primary-c/50 transition-all duration-200 rounded-lg whitespace-nowrap"
//                         >
//                           <User className="w-4 h-4 mr-2" />
//                           View Details
//                         </Button>

//                         {application.status === "Interview Scheduled" && (
//                           <Button
//                             size="sm"
//                             className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 rounded-lg shadow-sm whitespace-nowrap"
//                           >
//                             <Calendar className="w-4 h-4 mr-2" />
//                             Join Interview
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//         </div>

//         {/* Load More */}
//         <div className="text-center mt-8">
//           <Button
//             variant="outline"
//             className="hover:bg-accent-c hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 hover:scale-105 rounded-lg px-6 py-2"
//           >
//             Load More Applications
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }





import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FileText,
  Clock,
  CircleCheck,
  User,
  Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
// import { myApplications } from "@/store/candidate store/store";
import { EasyApplyModal } from "@/components/job-browser/EasyApplyModal";
import { JobDetailsDialog } from "@/components/job-browser/JobDetailsDialog";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSort, setIsSort] = useState(false);

  const [showEasyApply, setShowEasyApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  const { myApplications } = useCandidateStore();
  useEffect(() => {
    fetchMyApplications();
  }, []);

  // Helper function to map backend hiring_stage to frontend status
  const mapHiringStageToStatus = (hiringStage: string): string => {
    const statusMap = {
      'pending': 'Applied',
      'under_review': 'Under Review',
      'interview_scheduled': 'Interview Scheduled',
      'rejected': 'Rejected',
      'offer_extended': 'Offer Received',
      'hired': 'Offer Received'
    };
    return statusMap[hiringStage] || 'Applied';
  };

  // Helper function to format salary
  const formatSalary = (salary: any, compensation: any): string => {
    if (salary) {
      return `${salary.currency} ${salary.min} - ${salary.max} ${salary.period}`;
    }
    if (compensation) {
      return `${compensation.currency} ${compensation.monthly_stipend} monthly stipend`;
    }
    return 'Salary not specified';
  };

  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    const colorMap = {
      'Applied': 'text-primary-c',
      'Under Review': 'text-info',
      'Interview Scheduled': 'text-secondary-c',
      'Rejected': 'text-destructive',
      'Offer Received': 'text-success'
    };
    return colorMap[status] || 'text-primary-c';
  };

  // Helper function to get status background color
  const getStatusBg = (status: string): string => {
    const bgMap = {
      'Applied': 'bg-accent-c',
      'Under Review': 'bg-info-light',
      'Interview Scheduled': 'bg-earnings',
      'Rejected': 'bg-destructive/20',
      'Offer Received': 'bg-success-light'
    };
    return bgMap[status] || 'bg-accent-c';
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const fetchMyApplications = async () => {
    const res = await myApplications(setApplications);

    if (res.success && res.data) {
      // Transform the raw API data in the component

      const transformedApplications = res.data.map((app: any) => (
        {
          id: app.id,
          company_name: app.company_name || app.companyInfo?.companyName,
          title: app.title,
          status: mapHiringStageToStatus(app.hiring_stage),
          created_at: formatDate(app.ja_created_at),
          salary: formatSalary(app.salary, app.compensation),
          location: app.location,
          statusColor: getStatusColor(mapHiringStageToStatus(app.hiring_stage)),
          statusBg: getStatusBg(mapHiringStageToStatus(app.hiring_stage)),
          originalData: app // Keep original data for details,


        }));

      setApplications(transformedApplications);
      setFilteredApplications(transformedApplications);
    } else {
      console.log(res.message);
    }
  };

  const handleSort = (shouldSort: boolean) => {
    if (shouldSort) {
      const sortedApp = [...applications].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setFilteredApplications(sortedApp);
    } else {
      setFilteredApplications(applications);
    }
  };

  const handleFilterChange = (value: string) => {
    if (value === "all") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === value));
    }
  };

  useEffect(() => {
    const filtered = applications.filter(app => {
      const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company_name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    setFilteredApplications(filtered);
  }, [searchTerm, applications]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Interview Scheduled":
        return <Calendar className="w-4 h-4" />;
      case "Under Review":
        return <Clock className="w-4 h-4" />;
      case "Offer Received":
        return <CircleCheck className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Calculate stats from actual data
  const totalApplications = applications.length;
  const pendingReview = applications.filter(app =>
    app.status === 'Applied' || app.status === 'Under Review'
  ).length;
  const interviews = applications.filter(app =>
    app.status === 'Interview Scheduled'
  ).length;
  const responseRate = totalApplications > 0 ?
    Math.round((interviews / totalApplications) * 100) : 0;


  // const handleViewDetails = (job) => {
  //   setSelectedJob(job);
  //   setShowJobDetails(true);
  // };
  const handleSubmitApplication = () => {

  }
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-muted-c-foreground">Track and manage your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-accent-c border-primary-c/10 animate-scale-in rounded-xl shadow-sm">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-muted-c-foreground mb-2">Total Applications</h3>
              <p className="text-3xl font-bold text-secondary-c">{totalApplications}</p>
            </CardContent>
          </Card>
          <Card className="bg-earnings border-secondary-c/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-earnings-foreground/70 mb-2">Pending Review</h3>
              <p className="text-3xl font-bold text-earnings-foreground">{pendingReview}</p>
            </CardContent>
          </Card>
          <Card className="bg-success-light border-success/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-success/70 mb-2">Interviews</h3>
              <p className="text-3xl font-bold text-success">{interviews}</p>
            </CardContent>
          </Card>
          <Card className="bg-info-light border-info/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-info/70 mb-2">Response Rate</h3>
              <p className="text-3xl font-bold text-info">{responseRate}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 animate-fade-in rounded-xl shadow-sm border-border-c/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 rounded-lg border-border-c/50 focus:border-secondary-c"
              />

              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Applications</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Offer Received">Offer Received</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  const newSortState = !isSort;
                  setIsSort(newSortState);
                  handleSort(newSortState);
                }}
                className={`hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 ${isSort ? 'text-white bg-secondary-c' : ''}`}
              >
                Sort by Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-c-foreground text-lg">
                {applications.length === 0 ? 'No applications found.' : 'No applications match your search.'}
              </p>
            </div>
          ) : (
            filteredApplications.map((application, index) => (
              <Card
                key={application.id}
                className="hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02] rounded-xl border-border-c/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between md:flex-row flex-col gap-4">
                    {/* Left side: main information */}
                    <div className="flex items-center gap-4 flex-1 w-full">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${application.statusBg} shadow-sm flex-shrink-0`}
                      >
                        <div className={application.statusColor}>
                          {getStatusIcon(application.status)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-lg text-foreground mb-1 truncate">
                              {application.title}
                            </h3>
                            <p className="text-muted-c-foreground font-medium truncate">
                              {application.company_name} • {application.location}
                            </p>
                          </div>

                          {/* Status badge - visible at the top on small screens */}
                          <Badge
                            className={`${application.statusBg} ${application.statusColor} hover:scale-105 transition-transform duration-200 rounded-lg px-3 py-1 flex-shrink-0 md:hidden`}
                          >
                            {application.status}
                          </Badge>
                        </div>

                        <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 text-sm text-muted-c-foreground">
                          <span>Applied: {application.created_at}</span>
                          <span className="hidden xs:inline">•</span>
                          <span className="font-medium text-foreground">{application.salary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: buttons and status */}
                    <div className="flex flex-row md:flex-col items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                      {/* Status badge - visible on medium and large screens */}
                      <Badge
                        className={`${application.statusBg} ${application.statusColor} hover:scale-105 transition-transform duration-200 rounded-lg px-3 py-1 flex-shrink-0 hidden md:flex`}
                      >
                        {application.status}
                      </Badge>

                      {/* Action buttons */}
                      <div className="flex flex-row md:flex-col gap-2">
                        <Button
                          variant="outline"
                          onClick={() => { setSelectedJob(application.originalData); setShowEasyApply(true); }}
                          size="sm"
                          className="hover:bg-accent-c hover:text-primary-c hover:border-primary-c/50 transition-all duration-200 rounded-lg whitespace-nowrap"
                        >
                          <User className="w-4 h-4 mr-2" />
                          View Details
                        </Button>

                        {application.status === "Interview Scheduled" && (
                          <Button
                            size="sm"
                            className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 rounded-lg shadow-sm whitespace-nowrap"
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Join Interview
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {applications.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="hover:bg-accent-c hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 hover:scale-105 rounded-lg px-6 py-2"
            >
              Load More Applications
            </Button>
          </div>
        )}
      </div>
      <EasyApplyModal
        job={selectedJob}
        open={showEasyApply}
        onClose={() => setShowEasyApply(false)}
        onSubmit={handleSubmitApplication}
        isView={true}
      />
      {/* Job Details Dialog
      <JobDetailsDialog
        job={selectedJob}
        open={showEasyApply}
        onClose={() => setshowEasyApply(false)}
        onSave={null}
        onApply={null}
      /> */}
    </div>
  );
}