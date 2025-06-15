
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info, FileText, RotateCw } from 'lucide-react';
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

  const handleReset = () => {
    setJobDescription('');
  };

  const examplePrompts = [
    'Finance manager with SAP experience in Dubai',
    'CPA certified analyst with 5+ years experience',
    'Senior finance role, team leadership skills',
    'Accounting professional fluent in IFRS'
  ];

  return (
    <>
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-accent" />
                  AI-Powered Job Analysis
                </CardTitle>
                <CardDescription>
                  Describe your ideal candidate, or choose an existing job post. We'll analyze the details to suggest relevant tests.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="e.g., 'Finance manager with 5+ years experience in Dubai with strong financial modeling skills...'"
                  className="min-h-[150px] border-gray-300 focus:border-accent ring-accent/20"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Try these examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map(prompt => (
                      <Badge 
                        key={prompt} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-accent/10 text-xs"
                        onClick={() => setJobDescription(prompt)}
                      >
                        {prompt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={() => setIsModalOpen(true)}>
                  <FileText /> From Job Post
                </Button>
                <Button variant="outline" className="w-full" onClick={handleReset}>
                  <RotateCw /> Reset
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  <Label>Work arrangement *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Remote" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Job role location *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Worldwide" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Language of assessment *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="font-semibold text-lg flex items-center gap-1">
            Creation method <Info className="w-4 h-4 text-muted-foreground" />
          </h3>
          <RadioGroup defaultValue="build-own" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label htmlFor="template" className="block cursor-pointer rounded-lg border bg-card p-4 text-card-foreground shadow-sm hover:bg-accent/5 has-[input:checked]:border-accent has-[input:checked]:ring-1 has-[input:checked]:ring-accent">
              <div className="flex items-start gap-4">
                <RadioGroupItem value="template" id="template" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Using an Essential Skills Template</h4>
                    <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Free</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Evaluate essential skills applicable across job roles and industries.
                  </p>
                  <p className="text-sm font-semibold text-accent pt-2">See details</p>
                </div>
              </div>
            </Label>
            <Label htmlFor="build-own" className="block cursor-pointer rounded-lg border bg-card p-4 text-card-foreground shadow-sm hover:bg-accent/5 has-[input:checked]:border-accent has-[input:checked]:ring-1 has-[input:checked]:ring-accent">
              <div className="flex items-start gap-4">
                <RadioGroupItem value="build-own" id="build-own" />
                <div className="space-y-1 mt-1">
                  <h4 className="font-semibold">Building your own</h4>
                  <p className="text-sm text-muted-foreground">
                    Select your own tests and custom questions.
                  </p>
                </div>
              </div>
            </Label>
          </RadioGroup>
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
