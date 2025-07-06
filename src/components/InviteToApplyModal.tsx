
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Briefcase, MapPin, DollarSign } from 'lucide-react';

interface InviteToApplyModalProps {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
  onInvite: (candidate: any, jobId: string, message: string) => void;
}

const mockJobs = [
  {
    id: 'job-1',
    title: 'Senior Financial Analyst',
    department: 'Finance',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$80,000 - $100,000'
  },
  {
    id: 'job-2',
    title: 'Finance Manager',
    department: 'Finance',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$90,000 - $120,000'
  },
  {
    id: 'job-3',
    title: 'Accounting Specialist',
    department: 'Accounting',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60,000 - $75,000'
  }
];

export const InviteToApplyModal: React.FC<InviteToApplyModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onInvite
}) => {
  const [selectedJob, setSelectedJob] = useState('');
  const [message, setMessage] = useState(`Hi ${candidate?.name?.split(' ')[0]},

We're impressed with your background and think you'd be a great fit for this position. We'd love to have you apply and learn more about this opportunity.

Looking forward to hearing from you!

Best regards,
Hiring Team`);

  const handleInvite = () => {
    if (selectedJob) {
      onInvite(candidate, selectedJob, message);
      onClose();
    }
  };

  const selectedJobDetails = mockJobs.find(job => job.id === selectedJob);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Invite {candidate?.name?.split(' ')[0]} to Apply
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Selection */}
          <div className="space-y-2">
            <Label htmlFor="job-select">Select Job Position</Label>
            <Select value={selectedJob} onValueChange={setSelectedJob}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a job position..." />
              </SelectTrigger>
              <SelectContent>
                {mockJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{job.title}</span>
                      <span className="text-sm text-gray-500">{job.department} • {job.location}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Job Details */}
          {selectedJobDetails && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{selectedJobDetails.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {selectedJobDetails.department}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedJobDetails.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {selectedJobDetails.salary}
                  </div>
                </div>
                <Badge variant="outline" className="bg-white">
                  {selectedJobDetails.type}
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Invitation Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Write a personalized message..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleInvite}
              disabled={!selectedJob}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
