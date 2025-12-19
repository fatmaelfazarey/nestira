
// import { useEffect, useState } from 'react';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { Upload, HelpCircle } from 'lucide-react';
// import { useTranslation } from '@/hooks/useTranslation';

// interface CompanyInfoSectionProps {
//   isIndividualRecruiter: boolean;
//   setIsIndividualRecruiter: (value: boolean) => void;
//   onChange: () => void;
//   currentUser: object;
//   setCurrentUser: object;
// }

// export function CompanyInfoSection({
//   isIndividualRecruiter,
//   setIsIndividualRecruiter,
//   onChange,
//   currentUser,
//   setCurrentUser
// }: CompanyInfoSectionProps) {
//   const { t } = useTranslation();
//   const [companyName, setCompanyName] = useState('Finance Gate Consulting');
//   const [companyLogo, setCompanyLogo] = useState('');
//   const [industry, setIndustry] = useState('');
//   const [websiteUrl, setWebsiteUrl] = useState('');
//   const [description, setDescription] = useState('');
//   const [companySize, setCompanySize] = useState('');
//   const [yearFounded, setYearFounded] = useState('');
//   const [companyType, setCompanyType] = useState('');
//   const [companyTypeOther, setCompanyTypeOther] = useState('');
//   const [industryOther, setIndustryOther] = useState('');
//   const [linkedinCompany, setLinkedinCompany] = useState('');
//   const [companyDocument, setCompanyDocument] = useState<File | null>(null);


//   useEffect(() => {

//     setCompanyName(currentUser?.companyInfo?.companyName);
//     setCompanyLogo(currentUser?.companyInfo?.companyLogo);
//     setIndustry(currentUser?.companyInfo?.industry);
//     setCompanySize(currentUser?.companyInfo?.companySize);
//     setCompanyType(currentUser?.companyInfo?.companyType);
//     setDescription(currentUser?.companyInfo?.description);
//     setLinkedinCompany(currentUser?.companyInfo?.linkedinUrl);
//     setCompanyDocument(currentUser?.companyInfo?.verificationDocument);
//     setWebsiteUrl(currentUser?.companyInfo?.websiteUrl);
//     setYearFounded(currentUser?.companyInfo?.yearFounded);


//   }, [currentUser]);

//   const industries = [
//     'Accounting & Auditing',
//     'Banking & Financial Services',
//     'Investment Banking',
//     'Asset Management',
//     'Insurance',
//     'Financial Technology (Fintech)',
//     'Trading & Securities',
//     'Corporate Finance',
//     'Tax & Advisory',
//     'Real Estate Finance',
//     'Private Equity & Venture Capital',
//     'Risk Management',
//     'Financial Consulting',
//     'Microfinance',
//     'Other Financial Services'
//   ];

//   const companySizes = [
//     { value: '1-10', label: '1-10 employees' },
//     { value: '11-50', label: '11-50 employees' },
//     { value: '51-200', label: '51-200 employees' },
//     { value: '200+', label: '200+ employees' }
//   ];

//   const companyTypes = [
//     'Startup',
//     'SME (Small & Medium Enterprise)',
//     'Local Company',
//     'Multinational Corporation',
//     'Other'
//   ];

//   const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCompanyLogo(e.target?.result as string);
//         onChange();
//         handleCompanyInfoChange('companyLogo', e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setCompanyDocument(file);
//       handleCompanyInfoChange('verificationDocument', file);
//       onChange();
//     }
//   };
//   const handleCompanyInfoChange = (field: string, value: string) => {
//     setCurrentUser(prev => ({
//       ...prev,
//       companyInfo: {
//         ...prev.companyInfo,
//         [field]: value,
//       },
//     }));
//   };
//   return (
//     <div className="space-y-6">
//       {/* Company Name & Logo */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="company-name" className="text-sm font-medium text-gray-900">
//             Company Name *
//           </Label>
//           <Input
//             id="company-name"
//             value={companyName}
//             onChange={(e) => {
//               const newName = e.target.value;
//               setCompanyName(newName);
//               handleCompanyInfoChange('companyName', newName);
//               onChange();
//             }}
//             placeholder="Enter your company name"
//             className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
//           />

//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="company-logo" className="text-sm font-medium text-gray-900">
//             Company Logo
//           </Label>
//           <div className="flex items-center gap-4">
//             {companyLogo && (
//               <img
//                 src={companyLogo}
//                 alt="Company Logo"
//                 className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
//               />
//             )}
//             <div className="flex-1">
//               <Button variant="outline" size="sm" asChild className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-500">
//                 <label htmlFor="company-logo" className="cursor-pointer">
//                   <Upload className="w-4 h-4 mr-2" />
//                   Upload Logo
//                 </label>
//               </Button>
//               <input
//                 id="company-logo"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoUpload}
//                 className="hidden"
//               />
//               <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px, PNG or JPG</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Company LinkedIn URL only */}
//       <div className="grid grid-cols-1 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="linkedin-company" className="text-sm font-medium text-gray-900">
//             Company LinkedIn URL *
//           </Label>
//           <Input
//             id="linkedin-company"
//             value={linkedinCompany}
//             onChange={(e) => {
//               setLinkedinCompany(e.target.value);
//               handleCompanyInfoChange('linkedinUrl', e.target.value);
//               onChange();
//             }}
//             placeholder="https://linkedin.com/company/yourcompany"
//             className="border-gray-200 focus:border-orange-500  focus:ring-orange-200"
//             required
//           />
//         </div>
//       </div>

//       {/* Industry & Website */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="industry" className="text-sm font-medium text-gray-900">
//             Industry *
//           </Label>
//           <Select value={industry} onValueChange={(value) => {
//             setIndustry(value);
//             handleCompanyInfoChange('industry', value);
//             onChange();
//           }}>
//             <SelectTrigger className="border-gray-200 focus:border-orange-500">
//               <SelectValue placeholder="Select your industry" />
//             </SelectTrigger>
//             <SelectContent>
//               {industries.map((ind) => (
//                 <SelectItem key={ind} value={ind}>
//                   {ind}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {industry === 'Other Financial Services' && (
//             <div className="mt-2">
//               <Input
//                 value={industryOther}
//                 onChange={(e) => {
//                   setIndustryOther(e.target.value);
//                   onChange();
//                 }}
//                 placeholder="Please specify your industry"
//                 className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
//                 required
//               />
//             </div>
//           )}
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="website-url" className="text-sm font-medium text-gray-900">
//             Website URL
//           </Label>
//           <Input
//             id="website-url"
//             value={websiteUrl}
//             onChange={(e) => {
//               setWebsiteUrl(e.target.value);
//               handleCompanyInfoChange('websiteUrl', e.target.value);

//               onChange();
//             }}
//             placeholder="https://www.yourcompany.com"
//             className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
//           />
//         </div>
//       </div>

//       {/* Description */}
//       <div className="space-y-2">
//         <Label htmlFor="description" className="text-sm font-medium text-gray-900">
//           Company Description
//         </Label>
//         <Textarea
//           id="description"
//           value={description}
//           onChange={(e) => {
//             setDescription(e.target.value);
//             handleCompanyInfoChange('description', e.target.value);
//             onChange();
//           }}
//           placeholder="Brief description about your company, services, or expertise in finance & accounting recruitment..."
//           rows={3}
//           className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
//         />
//       </div>

//       {/* Company Size */}
//       <div className="space-y-3">
//         <Label className="text-sm font-medium text-gray-900">Company Size</Label>
//         <RadioGroup value={companySize} onValueChange={(value) => {
//           setCompanySize(value);
//           handleCompanyInfoChange('companySize', value);
//           onChange();
//         }}>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {companySizes.map((size) => (
//               <div key={size.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
//                 <RadioGroupItem value={size.value} id={size.value} className="border-orange-600 text-orange-600" />
//                 <Label htmlFor={size.value} className="text-sm font-normal cursor-pointer">
//                   {size.label}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </RadioGroup>
//       </div>

//       {/* Year Founded & Company Type */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <Label htmlFor="year-founded" className="text-sm font-medium text-gray-900">
//             Year Founded
//           </Label>
//           <Input
//             id="year-founded"
//             value={yearFounded}
//             onChange={(e) => {
//               setYearFounded(e.target.value);
//               handleCompanyInfoChange('yearFounded', e.target.value);
//               onChange();
//             }}
//             placeholder="e.g., 2020"
//             type="number"
//             min="1900"
//             max={new Date().getFullYear()}
//             className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="company-type" className="text-sm font-medium text-gray-900">
//             Company Type
//           </Label>
//           <Select value={companyType} onValueChange={(value) => {
//             setCompanyType(value);
//             handleCompanyInfoChange('companyType', value);
//             onChange();
//           }}>
//             <SelectTrigger className="border-gray-200 focus:border-orange-500">
//               <SelectValue placeholder="Select company type" />
//             </SelectTrigger>
//             <SelectContent>
//               {companyTypes.map((type) => (
//                 <SelectItem key={type} value={type}>
//                   {type}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {companyType === 'Other' && (
//             <div className="mt-2">
//               <Input
//                 value={companyTypeOther}
//                 onChange={(e) => {
//                   setCompanyTypeOther(e.target.value);
//                   handleCompanyInfoChange('companyType', e.target.value);
//                   onChange();
//                 }}
//                 placeholder="Please specify company type"
//                 className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
//                 required
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Company Profile Document Upload - Now Mandatory */}
//       <div className="space-y-2">
//         <div className="flex items-center gap-2">
//           <Label htmlFor="company-profile" className="text-sm font-medium text-gray-900">
//             Company Profile or Verification Document *
//           </Label>
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger>
//                 <HelpCircle className="w-4 h-4 text-gray-400" />
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>Required for verification before posting jobs.</p>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="sm" asChild className="border-orange-200 text-orange-600 hover:bg-orange-50  hover:text-orange-500">
//             <label htmlFor="company-profile" className="cursor-pointer">
//               <Upload className="w-4 h-4 mr-2" />
//               {companyDocument ? 'Change Document' : 'Upload Document'}
//             </label>
//           </Button>
//           <input
//             id="company-profile"
//             type="file"
//             accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
//             onChange={handleDocumentUpload}
//             className="hidden"
//             required
//           />
//           <span className="text-sm text-gray-500">PDF, DOC, DOCX, PNG, JPG format</span>
//         </div>
//         {companyDocument && (
//           <p className="text-sm text-green-600 font-medium">
//             ✓ {companyDocument.name} uploaded
//           </p>
//         )}
//         <p className="text-xs text-gray-500">Upload your company brochure, profile, or detailed information document</p>
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, HelpCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface CompanyInfoSectionProps {
  isIndividualRecruiter: boolean;
  setIsIndividualRecruiter: (value: boolean) => void;
  onChange: () => void;
  currentUser: object;
  setCurrentUser: object;
  isViewMode?: boolean;
}

export function CompanyInfoSection({
  isIndividualRecruiter,
  setIsIndividualRecruiter,
  onChange,
  currentUser,
  setCurrentUser,
  isViewMode = false
}: CompanyInfoSectionProps) {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [industry, setIndustry] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [yearFounded, setYearFounded] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [companyTypeOther, setCompanyTypeOther] = useState('');
  const [industryOther, setIndustryOther] = useState('');
  const [linkedinCompany, setLinkedinCompany] = useState('');
  const [companyDocument, setCompanyDocument] = useState<File | null>(null);

  useEffect(() => {
    setCompanyName(currentUser?.companyInfo?.companyName || '');
    setCompanyLogo(currentUser?.companyInfo?.companyLogo || '');
    setIndustry(currentUser?.companyInfo?.industry || '');
    setCompanySize(currentUser?.companyInfo?.companySize || '');
    setCompanyType(currentUser?.companyInfo?.companyType || '');
    setDescription(currentUser?.companyInfo?.description || '');
    setLinkedinCompany(currentUser?.companyInfo?.linkedinUrl || '');
    setCompanyDocument(currentUser?.companyInfo?.verificationDocument || null);
    setWebsiteUrl(currentUser?.companyInfo?.websiteUrl || '');
    setYearFounded(currentUser?.companyInfo?.yearFounded || '');
    setCompanyTypeOther(currentUser?.companyInfo?.companyTypeOther || '');
    setIndustryOther(currentUser?.companyInfo?.industryOther || '');
  }, [currentUser]);

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
    if (isViewMode) return;

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyLogo(e.target?.result as string);
        onChange();
        handleCompanyInfoChange('companyLogo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isViewMode) return;

    const file = event.target.files?.[0];
    if (file) {
      setCompanyDocument(file);
      handleCompanyInfoChange('verificationDocument', file);
      onChange();
    }
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    if (isViewMode) return;

    setCurrentUser(prev => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        [field]: value,
      },
    }));
  };

  const handleChangeWrapper = (value: string, setter: any, field?: string) => {
    if (isViewMode) return;

    setter(value);
    if (field) {
      handleCompanyInfoChange(field, value);
    }
    onChange();
  };

  const getCompanySizeLabel = (value: string) => {
    const size = companySizes.find(s => s.value === value);
    return size ? size.label : value;
  };

  return (
    <div className="space-y-6">
      {/* Company Name & Logo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company-name" className="text-sm font-medium text-gray-900">
            Company Name *
          </Label>
          {isViewMode ? (
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-gray-900">{companyName || '-'}</span>
            </div>
          ) : (
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => handleChangeWrapper(e.target.value, setCompanyName, 'companyName')}
              placeholder="Enter your company name"
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
            />
          )}
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
              {isViewMode ? (
                <div className="text-sm text-gray-600">
                  {companyLogo ? "Company logo uploaded" : "No company logo"}
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-500">
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
                    disabled={isViewMode}
                  />
                </>
              )}
              <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px, PNG or JPG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company LinkedIn URL only */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="linkedin-company" className="text-sm font-medium text-gray-900">
            Company LinkedIn URL *
          </Label>
          {isViewMode ? (
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-gray-900">{linkedinCompany || '-'}</span>
            </div>
          ) : (
            <Input
              id="linkedin-company"
              value={linkedinCompany}
              onChange={(e) => handleChangeWrapper(e.target.value, setLinkedinCompany, 'linkedinUrl')}
              placeholder="https://linkedin.com/company/yourcompany"
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
              required
            />
          )}
        </div>
      </div>

      {/* Industry & Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium text-gray-900">
            Industry *
          </Label>
          {isViewMode ? (
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-gray-900">
                {industry === 'Other Financial Services' && industryOther
                  ? industryOther
                  : industry || '-'
                }
              </span>
            </div>
          ) : (
            <>
              <Select
                value={industry}
                onValueChange={(value) => handleChangeWrapper(value, setIndustry, 'industry')}
                disabled={isViewMode}
              >
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
              {industry === 'Other Financial Services' && (
                <div className="mt-2">
                  <Input
                    value={industryOther}
                    onChange={(e) => handleChangeWrapper(e.target.value, setIndustryOther, 'industryOther')}
                    placeholder="Please specify your industry"
                    className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                    required
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website-url" className="text-sm font-medium text-gray-900">
            Website URL
          </Label>
          {isViewMode ? (
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-gray-900">{websiteUrl || '-'}</span>
            </div>
          ) : (
            <Input
              id="website-url"
              value={websiteUrl}
              onChange={(e) => handleChangeWrapper(e.target.value, setWebsiteUrl, 'websiteUrl')}
              placeholder="https://www.yourcompany.com"
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
            />
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium text-gray-900">
          Company Description
        </Label>
        {isViewMode ? (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 min-h-[80px]">
            <span className="text-gray-900 whitespace-pre-wrap">{description || '-'}</span>
          </div>
        ) : (
          <Textarea
            id="description"
            value={description}
            onChange={(e) => handleChangeWrapper(e.target.value, setDescription, 'description')}
            placeholder="Brief description about your company, services, or expertise in finance & accounting recruitment..."
            rows={3}
            className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
          />
        )}
      </div>

      {/* Company Size */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">Company Size</Label>
        {isViewMode ? (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <span className="text-gray-900">{getCompanySizeLabel(companySize) || '-'}</span>
          </div>
        ) : (
          <RadioGroup
            value={companySize}
            onValueChange={(value) => handleChangeWrapper(value, setCompanySize, 'companySize')}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {companySizes.map((size) => (
                <div key={size.value} className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
                  <RadioGroupItem
                    value={size.value}
                    id={size.value}
                    className="border-orange-600 text-orange-600"
                    disabled={isViewMode}
                  />
                  <Label htmlFor={size.value} className="text-sm font-normal cursor-pointer">
                    {size.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        )}
      </div>

      {/* Year Founded & Company Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="year-founded" className="text-sm font-medium text-gray-900">
            Year Founded
          </Label>
          {isViewMode ? (
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-gray-900">{yearFounded || '-'}</span>
            </div>
          ) : (
            <Input
              id="year-founded"
              value={yearFounded}
              onChange={(e) => handleChangeWrapper(e.target.value, setYearFounded, 'yearFounded')}
              placeholder="e.g., 2020"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-type" className="text-sm font-medium text-gray-900">
            Company Type
          </Label>
          {isViewMode ? (
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <span className="text-gray-900">
                {companyType === 'Other' && companyTypeOther
                  ? companyTypeOther
                  : companyType || '-'
                }
              </span>
            </div>
          ) : (
            <>
              <Select
                value={companyType}
                onValueChange={(value) => handleChangeWrapper(value, setCompanyType, 'companyType')}
                disabled={isViewMode}
              >
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
              {companyType === 'Other' && (
                <div className="mt-2">
                  <Input
                    value={companyTypeOther}
                    onChange={(e) => handleChangeWrapper(e.target.value, setCompanyTypeOther, 'companyTypeOther')}
                    placeholder="Please specify company type"
                    className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                    required
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Company Profile Document Upload - Now Mandatory */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="company-profile" className="text-sm font-medium text-gray-900">
            Company Profile or Verification Document *
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Required for verification before posting jobs.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          {isViewMode ? (
            <div className="text-sm text-gray-600">
              {companyDocument ? "Document uploaded" : "No document uploaded"}
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-500"
                disabled={isViewMode}
              >
                <label htmlFor="company-profile" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {companyDocument ? 'Change Document' : 'Upload Document'}
                </label>
              </Button>
              <input
                id="company-profile"
                type="file"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={handleDocumentUpload}
                className="hidden"
                disabled={isViewMode}
                required={!isViewMode}
              />
            </>
          )}
          <span className="text-sm text-gray-500">PDF, DOC, DOCX, PNG, JPG format</span>
        </div>
        {companyDocument && (
          <p className="text-sm text-green-600 font-medium">
            ✓ {companyDocument.name || "Document"} uploaded
          </p>
        )}
        <p className="text-xs text-gray-500">Upload your company brochure, profile, or detailed information document</p>
      </div>
    </div>
  );
}