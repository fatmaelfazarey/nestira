
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, MapPin, Clock, DollarSign, X, Plus } from "lucide-react";
import { useState } from "react";

interface JobPreferencesSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function JobPreferencesSection({ data, onChange }: JobPreferencesSectionProps) {
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const updateField = (field: string, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const addJobTitle = () => {
    if (newJobTitle.trim()) {
      const updated = [...(data.jobTitles || []), newJobTitle.trim()];
      updateField('jobTitles', updated);
      setNewJobTitle('');
    }
  };

  const removeJobTitle = (index: number) => {
    const updated = data.jobTitles.filter((_: any, i: number) => i !== index);
    updateField('jobTitles', updated);
  };

  const addLocation = () => {
    if (newLocation.trim()) {
      const updated = [...(data.locations || []), newLocation.trim()];
      updateField('locations', updated);
      setNewLocation('');
    }
  };

  const removeLocation = (index: number) => {
    const updated = data.locations.filter((_: any, i: number) => i !== index);
    updateField('locations', updated);
  };

  const getCurrencyByLocation = (location: string) => {
    if (location.includes('UAE') || location.includes('Dubai') || location.includes('Abu Dhabi')) return 'AED';
    if (location.includes('Saudi') || location.includes('Riyadh')) return 'SAR';
    if (location.includes('Qatar') || location.includes('Doha')) return 'QAR';
    if (location.includes('Egypt') || location.includes('Cairo')) return 'EGP';
    if (location.includes('Kuwait')) return 'KWD';
    if (location.includes('Bahrain')) return 'BHD';
    if (location.includes('Oman')) return 'OMR';
    return 'USD';
  };

  const jobTitleSuggestions = [
    "Financial Analyst", "Senior Financial Analyst", "Investment Banking Associate",
    "Portfolio Manager", "Risk Analyst", "Credit Analyst", "Treasury Analyst",
    "Finance Manager", "CFO", "Financial Controller", "Investment Advisor"
  ];

  const locationSuggestions = [
    "Dubai, UAE", "Riyadh, Saudi Arabia", "Doha, Qatar", "Kuwait City, Kuwait",
    "Abu Dhabi, UAE", "Jeddah, Saudi Arabia", "Cairo, Egypt", "Manama, Bahrain"
  ];

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Settings className="w-5 h-5 text-secondary-c" />
          Job Preferences
          <Badge variant="outline" className="ml-2 text-xs">Optional</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preferred Job Titles */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Preferred Job Titles</label>
          <div className="flex gap-2">
            <Input 
              placeholder="Add job title..."
              value={newJobTitle}
              onChange={(e) => setNewJobTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addJobTitle()}
              className="flex-1 focus:ring-2 focus:ring-secondary-c/50"
            />
            <Button 
              size="sm"
              onClick={addJobTitle}
              className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {jobTitleSuggestions.slice(0, 4).map((title) => (
              <Button
                key={title}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!data.jobTitles?.includes(title)) {
                    updateField('jobTitles', [...(data.jobTitles || []), title]);
                  }
                }}
                className="text-xs hover:bg-secondary-c/10 hover:text-secondary-c"
                disabled={data.jobTitles?.includes(title)}
              >
                + {title}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.jobTitles?.map((title: string, index: number) => (
              <Badge key={index} variant="secondary-c" className="flex items-center gap-1">
                {title}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-destructive" 
                  onClick={() => removeJobTitle(index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Preferred Locations */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Preferred Locations
          </label>
          <div className="flex gap-2">
            <Input 
              placeholder="Add location..."
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addLocation()}
              className="flex-1 focus:ring-2 focus:ring-secondary-c/50"
            />
            <Button 
              size="sm"
              onClick={addLocation}
              className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {locationSuggestions.slice(0, 4).map((location) => (
              <Button
                key={location}
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!data.locations?.includes(location)) {
                    updateField('locations', [...(data.locations || []), location]);
                  }
                }}
                className="text-xs hover:bg-secondary-c/10 hover:text-secondary-c"
                disabled={data.locations?.includes(location)}
              >
                + {location}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.locations?.map((location: string, index: number) => (
              <Badge key={index} variant="secondary-c" className="flex items-center gap-1">
                {location}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-destructive" 
                  onClick={() => removeLocation(index)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Work Type and Employment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Work Type</label>
            <Select value={data.workType} onValueChange={(value) => updateField('workType', value)}>
              <SelectTrigger className="focus:ring-2 focus:ring-secondary-c/50">
                <SelectValue placeholder="Select work type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Visa Status</label>
            <Select value={data.visaStatus} onValueChange={(value) => updateField('visaStatus', value)}>
              <SelectTrigger className="focus:ring-2 focus:ring-secondary-c/50">
                <SelectValue placeholder="Select visa status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Valid Work Visa">Valid Work Visa</SelectItem>
                <SelectItem value="Citizen">Citizen</SelectItem>
                <SelectItem value="Resident">Resident</SelectItem>
                <SelectItem value="Visit Visa">Visit Visa</SelectItem>
                <SelectItem value="Sponsorship Required">Sponsorship Required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Notice Period
            </label>
            <Select value={data.noticePeriod} onValueChange={(value) => updateField('noticePeriod', value)}>
              <SelectTrigger className="focus:ring-2 focus:ring-secondary-c/50">
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Immediate">Immediate</SelectItem>
                <SelectItem value="15 days">15 days</SelectItem>
                <SelectItem value="30 days">30 days</SelectItem>
                <SelectItem value="60 days">60 days</SelectItem>
                <SelectItem value="90 days">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Salary Range */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Expected Salary Range
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Input 
                type="number"
                placeholder="Min"
                value={data.salaryRange?.min || ''}
                onChange={(e) => updateField('salaryRange', { 
                  ...data.salaryRange, 
                  min: parseInt(e.target.value) || 0 
                })}
                className="focus:ring-2 focus:ring-secondary-c/50"
              />
            </div>
            <div>
              <Input 
                type="number"
                placeholder="Max"
                value={data.salaryRange?.max || ''}
                onChange={(e) => updateField('salaryRange', { 
                  ...data.salaryRange, 
                  max: parseInt(e.target.value) || 0 
                })}
                className="focus:ring-2 focus:ring-secondary-c/50"
              />
            </div>
            <div>
              <Select 
                value={data.salaryRange?.currency} 
                onValueChange={(value) => updateField('salaryRange', { 
                  ...data.salaryRange, 
                  currency: value 
                })}
              >
                <SelectTrigger className="focus:ring-2 focus:ring-secondary-c/50">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AED">AED</SelectItem>
                  <SelectItem value="SAR">SAR</SelectItem>
                  <SelectItem value="QAR">QAR</SelectItem>
                  <SelectItem value="EGP">EGP</SelectItem>
                  <SelectItem value="KWD">KWD</SelectItem>
                  <SelectItem value="BHD">BHD</SelectItem>
                  <SelectItem value="OMR">OMR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-xs text-muted-c-foreground">
            Monthly salary range. Leave blank if you prefer not to specify.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
