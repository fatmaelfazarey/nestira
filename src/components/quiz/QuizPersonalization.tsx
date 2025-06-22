
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Search, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FindMyMatchModal } from '@/components/FindMyMatchModal';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

interface QuizPersonalizationProps {
  onRoleSelected: (roleData: any) => void;
}

export function QuizPersonalization({ onRoleSelected }: QuizPersonalizationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [inputMethod, setInputMethod] = useState<'search' | 'jobpost' | 'dropdown' | null>(null);

  const handleJobSelected = (job: JobPost) => {
    const roleData = {
      title: job.title,
      method: 'jobpost',
      data: job
    };
    onRoleSelected(roleData);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const roleData = {
        title: searchQuery,
        method: 'search',
        data: { searchQuery }
      };
      onRoleSelected(roleData);
    }
  };

  const handleDropdownSelect = (value: string) => {
    setSelectedRole(value);
    const roleData = {
      title: value,
      method: 'dropdown',
      data: { role: value }
    };
    onRoleSelected(roleData);
  };

  const roleOptions = [
    "Senior Finance Manager",
    "Financial Analyst",
    "Accounting Manager",
    "Tax Specialist",
    "Audit Manager",
    "Risk Manager",
    "Budget Analyst",
    "Treasury Analyst"
  ];

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
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">What job role are you hiring for?</h2>
            <p className="text-gray-600">Choose how you'd like to define the role to get personalized quiz recommendations</p>
          </div>

          {/* Method Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AI Talent Search */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                inputMethod === 'search' ? 'ring-2 ring-blue-500 border-blue-200' : ''
              }`}
              onClick={() => setInputMethod('search')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">AI Talent Search</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Describe your ideal candidate in natural language
                </p>
                {inputMethod === 'search' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Finance manager with 5+ years experience..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSearch}
                        disabled={!searchQuery.trim()}
                        size="sm"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Try these examples:</p>
                      <div className="flex flex-wrap gap-1">
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
                )}
              </CardContent>
            </Card>

            {/* From Job Post */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                inputMethod === 'jobpost' ? 'ring-2 ring-green-500 border-green-200' : ''
              }`}
              onClick={() => setInputMethod('jobpost')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <CardTitle className="text-lg">From Job Post</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Select from your existing job postings
                </p>
                {inputMethod === 'jobpost' && (
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="w-full"
                  >
                    Browse Job Posts
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Role Dropdown */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                inputMethod === 'dropdown' ? 'ring-2 ring-purple-500 border-purple-200' : ''
              }`}
              onClick={() => setInputMethod('dropdown')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">Select Role</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Pick from common finance & accounting roles
                </p>
                {inputMethod === 'dropdown' && (
                  <Select onValueChange={handleDropdownSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CardContent>
            </Card>
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
