
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
    'Investment Banking',
    'Asset Management',
    'Insurance',
    'Financial Technology (Fintech)',
    'Trading & Securities',
    'Corporate Finance',
    'Tax & Advisory',
    'Real Estate Finance',
    'Private Equity & Venture Capital',
    'Risk Management',
    'Financial Consulting',
    'Microfinance',
    'Other Financial Services'
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '200+', label: '200+ employees' }
  ];

  const companyTypes = [
    'Startup',
    'SME (Small & Medium Enterprise)',
    'Local Company',
    'Multinational Corporation',
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
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-orange-600" />
          <div>
            <Label htmlFor="individual-toggle" className="font-medium text-gray-900">
              I'm hiring as an individual recruiter
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Toggle this if you work independently as a freelance HR, headhunter, or talent consultant
            </p>
          </div>
        </div>
        <Switch
          id="individual-toggle"
          checked={isIndividualRecruiter}
          onCheckedChange={(checked) => {
            setIsIndividualRecruiter(checked);
            onChange();
          }}
          className="data-[state=checked]:bg-orange-600"
        />
      </div>

      {/* Company Fields - Hidden if individual recruiter */}
      {!isIndividualRecruiter && (
        <div className="space-y-6">
          {/* Company Name & Logo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-sm font-medium text-gray-900">
                Company Name *
              </Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  onChange();
                }}
                placeholder="Enter your company name"
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-logo" className="text-sm font-medium text-gray-900">
                Company Logo
              </Label>
              <div className="flex items-center gap-4">
                {companyLogo && (
                  <img 
                    src={companyLogo} 
                    alt="Company Logo" 
                    className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <Button variant="outline" size="sm" asChild className="border-orange-200 text-orange-600 hover:bg-orange-50">
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
                  <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px, PNG or JPG</p>
                </div>
              </div>
            </div>
          </div>

          {/* Industry & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium text-gray-900">
                Industry *
              </Label>
              <Select value={industry} onValueChange={(value) => {
                setIndustry(value);
                onChange();
              }}>
                <SelectTrigger className="border-gray-200 focus:border-orange-500">
                  <SelectValue placeholder="Select your industry" />
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
              <Label htmlFor="website-url" className="text-sm font-medium text-gray-900">
                Website URL
              </Label>
              <Input
                id="website-url"
                value={websiteUrl}
                onChange={(e) => {
                  setWebsiteUrl(e.target.value);
                  onChange();
                }}
                placeholder="https://www.yourcompany.com"
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-900">
              Company Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                onChange();
              }}
              placeholder="Brief description about your company, services, or expertise in finance & accounting recruitment..."
              rows={3}
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
            />
          </div>

          {/* Company Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900">Company Size</Label>
            <RadioGroup value={companySize} onValueChange={(value) => {
              setCompanySize(value);
              onChange();
            }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {companySizes.map((size) => (
                  <div key={size.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
                    <RadioGroupItem value={size.value} id={size.value} className="border-orange-600 text-orange-600" />
                    <Label htmlFor={size.value} className="text-sm font-normal cursor-pointer">
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
              <Label htmlFor="year-founded" className="text-sm font-medium text-gray-900">
                Year Founded
              </Label>
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
                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company-type" className="text-sm font-medium text-gray-900">
                Company Type
              </Label>
              <Select value={companyType} onValueChange={(value) => {
                setCompanyType(value);
                onChange();
              }}>
                <SelectTrigger className="border-gray-200 focus:border-orange-500">
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
            <Label htmlFor="company-profile" className="text-sm font-medium text-gray-900">
              Company Profile Document (Optional)
            </Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="border-orange-200 text-orange-600 hover:bg-orange-50">
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
              <span className="text-sm text-gray-500">PDF, DOC, or DOCX format</span>
            </div>
            <p className="text-xs text-gray-500">Upload your company brochure, profile, or detailed information document</p>
          </div>
        </div>
      )}
    </div>
  );
}
