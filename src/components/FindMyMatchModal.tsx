import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, CheckCircle, Target } from 'lucide-react';

interface JobPost {
  id: number;
  title: string;
  location: string;
  subfields: string[];
  requirements: string[];
  department: string;
  postedDate: string;
}

interface FindMyMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobSelected: (job: JobPost) => void;
}

export const FindMyMatchModal: React.FC<FindMyMatchModalProps> = ({
  isOpen,
  onClose,
  onJobSelected
}) => {
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  // Mock active job posts data
  const activeJobPosts: JobPost[] = [
    {
      id: 1,
      title: "Financial Analyst",
      location: "Dubai, UAE",
      subfields: ["Financial Planning", "Budget Management", "Data Analysis"],
      requirements: ["Excel Advanced", "Power BI", "3+ years experience", "Bachelor's degree"],
      department: "Finance",
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Senior Accounting Manager",
      location: "Riyadh, Saudi Arabia",
      subfields: ["Management Accounting", "IFRS Compliance", "Team Leadership"],
      requirements: ["SAP", "ACCA/CPA", "5+ years experience", "Team management"],
      department: "Accounting",
      postedDate: "2024-02-01"
    },
    {
      id: 3,
      title: "Finance Manager",
      location: "Cairo, Egypt",
      subfields: ["Financial Reporting", "Risk Management", "Strategic Planning"],
      requirements: ["CFA", "Financial modeling", "7+ years experience", "Leadership skills"],
      department: "Finance",
      postedDate: "2024-01-20"
    }
  ];

  const handleJobSelect = (job: JobPost) => {
    setSelectedJob(job);
  };

  const handleUseJobPost = () => {
    if (selectedJob) {
      onJobSelected(selectedJob);
      onClose();
      setSelectedJob(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Target className="w-5 h-5 text-orange-500" />
                Select a Job Post
              </DialogTitle>
              <p className="text-gray-600">Choose an active job posting to find AI-matched candidates</p>
            </div>
            
            {/* Header Action Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="px-4"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUseJobPost}
                disabled={!selectedJob}
                className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white px-6"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Use This Job Post
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 mt-6">
          {activeJobPosts.map((job) => (
            <Card 
              key={job.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedJob?.id === job.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => handleJobSelect(job)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {job.title}
                      {selectedJob?.id === job.id && (
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <span>Posted {formatDate(job.postedDate)}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Subfields:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.subfields.map((subfield) => (
                      <Badge key={subfield} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {subfield}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req) => (
                      <Badge key={req} variant="outline" className="bg-gray-50 text-gray-700">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
