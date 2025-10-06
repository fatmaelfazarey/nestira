
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Upload, MapPin } from "lucide-react";

interface BasicInfoSectionProps {
  data: any;
  onChange: (data: any) => void;
}

export function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  const updateField = (field: string, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const locations = [
    "Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE",
    "Riyadh, Saudi Arabia", "Jeddah, Saudi Arabia", "Dammam, Saudi Arabia",
    "Doha, Qatar", "Al Rayyan, Qatar",
    "Cairo, Egypt", "Alexandria, Egypt",
    "Kuwait City, Kuwait",
    "Manama, Bahrain",
    "Muscat, Oman"
  ];

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="w-5 h-5 text-secondary-c" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-secondary-c/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-secondary-c" />
          </div>
          <div className="flex-1">
            <Button 
              variant="outline"
              className="hover:bg-secondary-c/10 hover:text-secondary-c hover:border-secondary-c/50 transition-all duration-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            <p className="text-xs text-muted-c-foreground mt-1">JPG, PNG up to 2MB</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Full Name *
            </label>
            <Input 
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Enter your full name"
              className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Role / Desired Position *
            </label>
            <Input 
              value={data.role}
              onChange={(e) => updateField('role', e.target.value)}
              placeholder="e.g., Senior Financial Analyst"
              className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Phone Number *
            </label>
            <Input 
              value={data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+971 50 123 4567"
              className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Email Address *
            </label>
            <Input 
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="your.email@example.com"
              className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              Business Email
              <span className="text-xs text-muted-c-foreground ml-1">(optional)</span>
            </label>
            <Input 
              type="email"
              value={data.businessEmail}
              onChange={(e) => updateField('businessEmail', e.target.value)}
              placeholder="business.email@company.com"
              className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">
              LinkedIn or Portfolio URL
            </label>
            <Input 
              value={data.linkedin}
              onChange={(e) => updateField('linkedin', e.target.value)}
              placeholder="linkedin.com/in/yourprofile"
              className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location *
          </label>
          <Select value={data.location} onValueChange={(value) => updateField('location', value)}>
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-secondary-c/50">
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
