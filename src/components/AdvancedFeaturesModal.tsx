
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Filter, X, Search, MapPin, Briefcase, GraduationCap, Languages, Globe, Users, Star, Calendar, DollarSign } from 'lucide-react';

interface AdvancedFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

export const AdvancedFeaturesModal: React.FC<AdvancedFeaturesModalProps> = ({
  isOpen,
  onClose,
  onApplyFilters
}) => {
  const [filters, setFilters] = useState({
    location: '',
    experienceRange: [0, 20],
    salaryRange: [0, 200000],
    skills: '',
    education: 'all',
    languages: [],
    availability: 'all',
    workMode: 'all',
    visaStatus: 'all',
    certifications: '',
    industryExperience: '',
    teamSize: 'all',
    managementExperience: false,
    remoteWork: false,
    immediateAvailability: false
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      experienceRange: [0, 20],
      salaryRange: [0, 200000],
      skills: '',
      education: 'all',
      languages: [],
      availability: 'all',
      workMode: 'all',
      visaStatus: 'all',
      certifications: '',
      industryExperience: '',
      teamSize: 'all',
      managementExperience: false,
      remoteWork: false,
      immediateAvailability: false
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between py-4">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Settings className="w-5 h-5 text-purple-500" />
                Advanced Filters
              </DialogTitle>
              <p className="text-gray-600">Fine-tune your candidate search with advanced filtering options</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleResetFilters} className="px-4">
                Reset All
              </Button>
              <Button variant="outline" onClick={onClose} className="px-4">
                Cancel
              </Button>
              <Button 
                onClick={handleApplyFilters}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 mt-6">
          {/* Location & Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location & Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter city, country, or region"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Years of Experience: {filters.experienceRange[0]} - {filters.experienceRange[1]} years</Label>
                  <Slider
                    value={filters.experienceRange}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, experienceRange: value }))}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Skills & Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="skills">Required Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., SAP, Excel, Financial Analysis"
                    value={filters.skills}
                    onChange={(e) => setFilters(prev => ({ ...prev, skills: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Education Level</Label>
                  <Select value={filters.education} onValueChange={(value) => setFilters(prev => ({ ...prev, education: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="professional">Professional Certification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  placeholder="e.g., CPA, ACCA, CFA"
                  value={filters.certifications}
                  onChange={(e) => setFilters(prev => ({ ...prev, certifications: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Work Mode</Label>
                  <Select value={filters.workMode} onValueChange={(value) => setFilters(prev => ({ ...prev, workMode: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Modes</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Availability</Label>
                  <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="2weeks">2 Weeks</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="3months">3+ Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Visa Status</Label>
                  <Select value={filters.visaStatus} onValueChange={(value) => setFilters(prev => ({ ...prev, visaStatus: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="citizen">Citizen</SelectItem>
                      <SelectItem value="permanent">Permanent Resident</SelectItem>
                      <SelectItem value="work-visa">Work Visa</SelectItem>
                      <SelectItem value="sponsorship">Need Sponsorship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Salary & Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Salary & Leadership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Salary Range: ${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}</Label>
                <Slider
                  value={filters.salaryRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, salaryRange: value }))}
                  max={200000}
                  step={5000}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Team Size Experience</Label>
                  <Select value={filters.teamSize} onValueChange={(value) => setFilters(prev => ({ ...prev, teamSize: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="individual">Individual Contributor</SelectItem>
                      <SelectItem value="small">Small Team (2-5)</SelectItem>
                      <SelectItem value="medium">Medium Team (6-15)</SelectItem>
                      <SelectItem value="large">Large Team (15+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Management Experience</Label>
                    <Switch
                      checked={filters.managementExperience}
                      onCheckedChange={(checked) => setFilters(prev => ({ ...prev, managementExperience: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Remote Work Experience</Label>
                    <Switch
                      checked={filters.remoteWork}
                      onCheckedChange={(checked) => setFilters(prev => ({ ...prev, remoteWork: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Immediate Availability</Label>
                    <Switch
                      checked={filters.immediateAvailability}
                      onCheckedChange={(checked) => setFilters(prev => ({ ...prev, immediateAvailability: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Industry Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Industry Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="industryExperience">Industry Sectors</Label>
                <Input
                  id="industryExperience"
                  placeholder="e.g., Banking, Healthcare, Technology, Manufacturing"
                  value={filters.industryExperience}
                  onChange={(e) => setFilters(prev => ({ ...prev, industryExperience: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
