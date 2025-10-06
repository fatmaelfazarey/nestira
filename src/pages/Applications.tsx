
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Clock, 
  CircleCheck, 
  User,
  Calendar
} from "lucide-react";

export default function Applications() {
  const applications = [
    {
      id: 1,
      company: "Goldman Sachs",
      role: "Investment Banking Analyst",
      status: "Interview Scheduled",
      appliedDate: "2024-01-15",
      salary: "$140k - $180k",
      location: "New York, NY",
      statusColor: "text-secondary-c",
      statusBg: "bg-earnings"
    },
    {
      id: 2,
      company: "JP Morgan Chase",
      role: "Financial Analyst",
      status: "Under Review",
      appliedDate: "2024-01-12",
      salary: "$120k - $150k",
      location: "London, UK",
      statusColor: "text-info",
      statusBg: "bg-info-light"
    },
    {
      id: 3,
      company: "Morgan Stanley",
      role: "Risk Management Associate",
      status: "Applied",
      appliedDate: "2024-01-10",
      salary: "$110k - $140k",
      location: "Singapore",
      statusColor: "text-primary-c",
      statusBg: "bg-accent-c"
    },
    {
      id: 4,
      company: "Deutsche Bank",
      role: "Quantitative Analyst",
      status: "Rejected",
      appliedDate: "2024-01-08",
      salary: "$130k - $160k",
      location: "Frankfurt, Germany",
      statusColor: "text-destructive",
      statusBg: "bg-destructive/20"
    },
    {
      id: 5,
      company: "Credit Suisse",
      role: "Portfolio Manager",
      status: "Offer Received",
      appliedDate: "2024-01-05",
      salary: "$160k - $200k",
      location: "Zurich, Switzerland",
      statusColor: "text-success",
      statusBg: "bg-success-light"
    }
  ];

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
              <p className="text-3xl font-bold text-secondary-c">8</p>
            </CardContent>
          </Card>
          <Card className="bg-earnings border-secondary-c/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-earnings-foreground/70 mb-2">Pending Review</h3>
              <p className="text-3xl font-bold text-earnings-foreground">3</p>
            </CardContent>
          </Card>
          <Card className="bg-success-light border-success/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-success/70 mb-2">Interviews</h3>
              <p className="text-3xl font-bold text-success">2</p>
            </CardContent>
          </Card>
          <Card className="bg-info-light border-info/20 animate-scale-in rounded-xl shadow-sm" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-sm text-info/70 mb-2">Response Rate</h3>
              <p className="text-3xl font-bold text-info">75%</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 animate-fade-in rounded-xl shadow-sm border-border-c/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input 
                placeholder="Search applications..." 
                className="flex-1 rounded-lg border-border-c/50 focus:border-secondary-c"
              />
              <Button variant="outline" className="hover:bg-accent-c/50 transition-colors duration-200 rounded-lg border-border-c/50">
                Filter by Status
              </Button>
              <Button variant="outline" className="hover:bg-accent-c/50 transition-colors duration-200 rounded-lg border-border-c/50">
                Sort by Date
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application, index) => (
            <Card 
              key={application.id} 
              className="hover:shadow-lg transition-all duration-200 animate-slide-up hover:scale-[1.02] rounded-xl border-border-c/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${application.statusBg} shadow-sm`}>
                      <div className={application.statusColor}>
                        {getStatusIcon(application.status)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {application.role}
                          </h3>
                          <p className="text-muted-c-foreground font-medium">
                            {application.company} • {application.location}
                          </p>
                        </div>
                        <Badge 
                          className={`${application.statusBg} ${application.statusColor} hover:scale-105 transition-transform duration-200 rounded-lg px-3 py-1`}
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-c-foreground">
                        <span>Applied: {application.appliedDate}</span>
                        <span>•</span>
                        <span className="font-medium text-foreground">{application.salary}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-accent-c hover:text-primary-c hover:border-primary-c/50 transition-all duration-200 rounded-lg"
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {application.status === "Interview Scheduled" && (
                      <Button 
                        size="sm"
                        className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground hover:scale-105 transition-all duration-200 rounded-lg shadow-sm"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Join Interview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button 
            variant="outline"
            className="hover:bg-accent-c hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200 hover:scale-105 rounded-lg px-6 py-2"
          >
            Load More Applications
          </Button>
        </div>
      </div>
    </div>
  );
}
