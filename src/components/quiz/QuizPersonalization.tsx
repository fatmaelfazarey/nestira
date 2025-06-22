
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Lock, Users, Target, Filter, FileText, RotateCcw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FindMyMatchModal } from '@/components/FindMyMatchModal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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
  const [creationMethod, setCreationMethod] = useState('build-your-own');
  const [searchQuery, setSearchQuery] = useState('');

  const handleJobSelected = (job: JobPost) => {
    const description = `Based on job post: ${job.title}\nLocation: ${job.location}\n\nKey skills and requirements:\n- ${job.requirements.join('\n- ')}\n\nSubfields:\n- ${job.subfields.join('\n- ')}`;
    setJobDescription(description);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log('Searching for:', searchQuery);
    }
  };

  const exampleQueries = [
    "Finance manager with SAP experience in Dubai",
    "CPA certified analyst with 5+ years experience",
    "Accounting professional fluent in IFRS",
    "Senior finance role, team leadership skills"
  ];

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Job details</h2>
          
          {/* Guidance Line */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-orange-600" />
            <p className="text-orange-800 font-medium">Search talents using one of the 3 methods below to show matching talents!</p>
          </div>

          {/* AI Talent Search Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI Talent Search</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Describe your ideal candidate... (e.g., 'Finance manager with 5+ years experience in Dubai with CPA certification')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQueries.map((example, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100 text-xs"
                      onClick={() => setSearchQuery(example)}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/3">
              <Button 
                className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white px-6 py-3 font-bold border-0 shadow-lg w-full h-12"
              >
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filters (3)
              </Button>
            </div>
            
            <div className="lg:w-1/3">
              <Button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-[#86e5a1] hover:bg-[#6dd387] text-[#00102c] px-6 py-3 font-bold border-0 shadow-lg w-full h-12"
              >
                <FileText className="w-5 h-5 mr-2" />
                From Job Post
              </Button>
            </div>

            <div className="lg:w-1/3">
              <Button 
                variant="outline"
                className="px-6 py-3 font-bold border-gray-300 hover:bg-gray-50 w-full h-12"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Total Talents in Nestira:</span>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300 font-bold">
                    3
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Matching Results:</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300 font-bold">
                    -
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-semibold text-lg">
              <Sparkles className="w-5 h-5 text-accent" />
              What job are you hiring for?
            </Label>
            <p className="text-sm text-muted-foreground">
              We'll use your job details to provide relevant suggestions as you build your assessment
            </p>
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

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-lg">Creation method</h3>
            <RadioGroup
              value={creationMethod}
              onValueChange={setCreationMethod}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <Label
                  htmlFor="template"
                  className={cn(
                    "flex h-full flex-col justify-between rounded-lg border bg-card text-card-foreground p-4 transition-all hover:border-accent cursor-pointer",
                    creationMethod === 'template' && "border-accent ring-2 ring-accent/20"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="template" id="template" className="mt-1 shrink-0" />
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Using an Essential Skills Template</span>
                        <Badge className="text-xs bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Free</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Evaluate essential skills applicable across job roles and industries.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-accent justify-start">See details</Button>
                    </div>
                  </div>
                </Label>
              </div>
              <div>
                <Label
                  htmlFor="build-your-own"
                  className={cn(
                    "flex h-full flex-col justify-between rounded-lg border bg-card text-card-foreground p-4 transition-all hover:border-accent cursor-pointer",
                    creationMethod === 'build-your-own' && "border-accent ring-2 ring-accent/20"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="build-your-own" id="build-your-own" className="mt-1 shrink-0" />
                    <div className="grid gap-1.5">
                      <span className="font-semibold">Building your own</span>
                      <p className="text-sm text-muted-foreground">
                        Select your own tests and custom questions.
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
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
