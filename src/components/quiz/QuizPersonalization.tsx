import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FindMyMatchModal } from '@/components/FindMyMatchModal';

// This should ideally be shared, but defining it here to avoid modifying other files.
interface JobPost {
  id: number;
  title: string;
  location: string;
  subfields: string[];
  requirements: string[];
  department: string;
  postedDate: string;
}

export function QuizPersonalization() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  const handleJobSelected = (job: JobPost) => {
    const description = `Based on job post: ${job.title}\nLocation: ${job.location}\n\nKey skills and requirements:\n- ${job.requirements.join('\n- ')}\n\nSubfields:\n- ${job.subfields.join('\n- ')}`;
    setJobDescription(description);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Job details</h2>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-semibold text-lg">
              <Sparkles className="w-5 h-5 text-accent" />
              What job are you hiring for?
            </Label>
            <p className="text-sm text-muted-foreground">
              We'll use your job details to provide relevant suggestions as you build your assessment
            </p>
            <div className="pt-1 pb-2">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent" onClick={() => setIsModalOpen(true)}>
                    Choose from a job post
                    <ArrowRight />
                </Button>
            </div>
            <Textarea
              placeholder="Add a job description or enter your job requirements manually e.g. job title, key responsibilities, and must-have skills."
              className="min-h-[120px] border-accent/50 focus:border-accent ring-accent/20"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-lg">Job overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Job role *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Finance & Accounting Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial-analyst">Financial Analyst</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="bookkeeper">Bookkeeper</SelectItem>
                    <SelectItem value="controller">Controller</SelectItem>
                    <SelectItem value="cfo">Chief Financial Officer</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="tax-specialist">Tax Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Seniority *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select seniority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry-level">Entry-level</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid-level">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FindMyMatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobSelected={handleJobSelected}
      />
    </>
  );
}
