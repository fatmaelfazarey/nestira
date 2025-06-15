
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Info } from 'lucide-react';

export function QuizPersonalization() {
  return (
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
          <Textarea
            placeholder="Add a job description or enter your job requirements manually e.g. job title, key responsibilities, and must-have skills."
            className="min-h-[120px] border-accent/50 focus:border-accent ring-accent/20"
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
    </div>
  );
}
