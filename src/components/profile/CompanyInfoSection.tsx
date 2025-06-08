
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Building2 } from 'lucide-react';

interface CompanyInfoSectionProps {
  isIndividualRecruiter: boolean;
  setIsIndividualRecruiter: (value: boolean) => void;
  onChange: () => void;
}

export function CompanyInfoSection({ 
  isIndividualRecruiter, 
  setIsIndividualRecruiter, 
  onChange 
}: CompanyInfoSectionProps) {
  const [companyName, setCompanyName] = useState('Finance Gate Consulting');
  const [companyLogo, setCompanyLogo] = useState('');
  const [industry, setIndustry] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [yearFounded, setYearFounded] = useState('');
  const [companyType, setCompanyType] = useState('');

  const industries = [
    'Accounting & Auditing',
    'Banking & Financial Services',
    'Investment Management',
    'Insurance',
    'Trading & Securities',
    'Fintech',
    'Real Estate Finance',
    'Corporate Finance',
    'Tax & Advisory',
    'Other'
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '200+', label: '200+ employees' }
  ];

  const companyTypes = [
    'Startup',
    'SME',
    'Local Company',
    'Multinational',
    'Other'
  ];

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result as string);
        onChange();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Individual Recruiter Toggle */}
      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-orange-600" />
          <div>
            <Label htmlFor="individual-toggle">I'm hiring as an individual recruiter</Label>
            <p className="text-sm text-gray-600">Hide company fields if you work independently</p>
          </div>
        </div>
        <Switch
          id="individual-toggle"
          checked={isIndividualRecruiter}
          onCheckedChange={(checked) => {
            setIsIndividualRecruiter(checked);
            onChange();
          }}
        />
      </div>

      {/* Company Fields - Hidden if individual recruiter */}
      {!isIndividualRecruiter && (
        <div className="space-y-6">
          {/* Company Name & Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name *</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  onChange();
                }}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-logo">Company Logo</Label>
              <div className="flex items-center gap-4">
                {companyLogo && (
                  <img 
                    src={companyLogo} 
                    alt="Company Logo" 
                    className="w-12 h-12 object-cover rounded-lg border"
                  />
                )}
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="company-logo" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </label>
                </Button>
                <input
                  id="company-logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">Recommended: 200x200px, PNG or JPG</p>
            </div>
          </div>

          {/* Industry & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={(value) => {
                setIndustry(value);
                onChange();
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                value={websiteUrl}
                onChange={(e) => {
                  setWebsiteUrl(e.target.value);
                  onChange();
                }}
                placeholder="https://www.company.com"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                onChange();
              }}
              placeholder="Brief description about your company or services..."
              rows={3}
            />
          </div>

          {/* Company Size */}
          <div className="space-y-3">
            <Label>Company Size</Label>
            <RadioGroup value={companySize} onValueChange={(value) => {
              setCompanySize(value);
              onChange();
            }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {companySizes.map((size) => (
                  <div key={size.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={size.value} id={size.value} />
                    <Label htmlFor={size.value} className="text-sm font-normal">
                      {size.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Year Founded & Company Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year-founded">Year Founded</Label>
              <Input
                id="year-founded"
                value={yearFounded}
                onChange={(e) => {
                  setYearFounded(e.target.value);
                  onChange();
                }}
                placeholder="e.g., 2020"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-type">Company Type</Label>
              <Select value={companyType} onValueChange={(value) => {
                setCompanyType(value);
                onChange();
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  {companyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Company Profile Upload */}
          <div className="space-y-2">
            <Label htmlFor="company-profile">Company Profile (Optional)</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="company-profile" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Profile
                </label>
              </Button>
              <input
                id="company-profile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onChange}
                className="hidden"
              />
              <span className="text-sm text-gray-500">PDF or DOC format</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
