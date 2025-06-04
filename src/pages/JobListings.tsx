
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Archive, BarChart3 } from 'lucide-react';

const JobListings = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      type: "Full-time",
      status: "Active",
      applications: 23,
      views: 156,
      posted: "3 days ago"
    },
    {
      id: 2,
      title: "Financial Analyst",
      location: "Riyadh, Saudi Arabia", 
      type: "Full-time",
      status: "Paused",
      applications: 12,
      views: 89,
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "Accounting Specialist",
      location: "Cairo, Egypt",
      type: "Contract",
      status: "Active",
      applications: 31,
      views: 203,
      posted: "5 days ago"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
            <p className="text-gray-600">Manage your job postings and track performance</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="w-4 h-4 mr-2" />
            Create New Job
          </Button>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <Badge 
                        variant={job.status === 'Active' ? 'default' : 'secondary'}
                        className={job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {job.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{job.location} • {job.type}</p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>{job.applications} applications</span>
                      <span>{job.views} views</span>
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobListings;
