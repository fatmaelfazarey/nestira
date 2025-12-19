import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Calendar,
  User,
  Shield,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  ExternalLink,
  Eye,
  Briefcase,
  Users,
  Clock,
  Award,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { IP } from '@/store/Path';
import { useAuth } from '@/contexts/AuthContext';

// Interface for employer data structure
interface EmployerData {
  id: string;
  uid: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  companyInfo: {
    companySize: string;
    description: string;
    linkedinUrl: string;
    verificationDocument: string;
    websiteUrl: string;
    yearFounded: string;
    industry: string;
    companyName: string;
    companyLogo: string;
    companyType: string;
  };
  integrations: {
    googleCalendar: { connected: boolean };
    gmail: { connected: boolean };
    googleMeet: { connected: boolean };
  };
  recruiterType: string;
  profileCompletion: number;
  isActive: boolean;
  email: string;
  personalInfo: {
    rolePosition: string;
    fullName: string;
    businessEmail: string;
    profilePhoto: string;
    phone: string;
  };
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  role: string;
  security: {
    twoFactorEnabled: boolean;
  };
}

interface EmployerProfileViewProps {
  employerData: EmployerData;
  onClose?: () => void;
}

const EmployerProfileView: React.FC<EmployerProfileViewProps> = ({ employerData, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState({ view: false, download: false });
  const { currentUser } = useAuth();

  // Format Firestore timestamp to readable date
  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get color for profile completion progress bar
  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'bg-green-500';
    if (completion >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get status text for profile completion
  const getCompletionStatus = (completion: number) => {
    if (completion >= 80) return 'Excellent';
    if (completion >= 60) return 'Good';
    if (completion >= 40) return 'Fair';
    return 'Poor';
  };

  // Get appropriate icon for company size
  const getCompanySizeIcon = (size: string) => {
    if (size.includes('1-10')) return <Users className="w-4 h-4" />;
    if (size.includes('11-50')) return <Users className="w-4 h-4" />;
    if (size.includes('51-200')) return <Users className="w-4 h-4" />;
    if (size.includes('201-500')) return <Users className="w-4 h-4" />;
    return <Users className="w-4 h-4" />;
  };

  // Construct full URL for verification document
  const getVerificationDocumentUrl = () => {
    const documentPath = employerData.companyInfo.verificationDocument;

    if (!documentPath) return null;

    if (documentPath.startsWith('/')) {
      return `${IP}${documentPath}`;
    }

    return documentPath;
  };

  // Handle viewing verification document
  const handleViewVerification = async () => {
    if (isLoading.view) return;

    setIsLoading(prev => ({ ...prev, view: true }));
    const documentUrl = getVerificationDocumentUrl();

    if (!documentUrl) {
      toast.error('No verification document available');
      setIsLoading(prev => ({ ...prev, view: false }));
      return;
    }

    try {
      const token = currentUser?.stsTokenManager?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(documentUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load document: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();

      if (blob.type !== 'application/pdf') {
        throw new Error('Invalid document format');
      }

      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');

      // Clean up URL after 10 seconds
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);

    } catch (error: any) {
      console.error('Error loading PDF:', error);
      toast.error(error.message || 'Failed to load verification document');
    } finally {
      setIsLoading(prev => ({ ...prev, view: false }));
    }
  };

  // Handle downloading verification document
  const handleDownloadVerification = async () => {
    if (isLoading.download) return;

    setIsLoading(prev => ({ ...prev, download: true }));
    const documentUrl = getVerificationDocumentUrl();

    if (!documentUrl) {
      toast.error('No verification document available');
      setIsLoading(prev => ({ ...prev, download: false }));
      return;
    }

    try {
      const token = currentUser?.stsTokenManager?.accessToken;
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(documentUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download document: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();

      if (blob.type !== 'application/pdf') {
        throw new Error('Invalid document format');
      }

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `verification-${employerData.companyInfo.companyName}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up URL
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);
      toast.success('Document downloaded successfully');

    } catch (error: any) {
      console.error('Error downloading PDF:', error);
      toast.error(error.message || 'Failed to download verification document');
    } finally {
      setIsLoading(prev => ({ ...prev, download: false }));
    }
  };

  return (
    <div className="max-h-[85vh] overflow-y-auto">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        {/* Header Section with Company Information */}
        <CardHeader className="bg-gradient-to-r from-secondary-c to-blue-600 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-20 w-20 border-4 border-white/20 shadow-lg">
                  <AvatarImage 
                    src={employerData.companyInfo.companyLogo || employerData.personalInfo.profilePhoto} 
                    alt={`${employerData.companyInfo.companyName} logo`}
                  />
                  <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                    {employerData.companyInfo.companyName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <CardTitle className="text-2xl lg:text-3xl flex items-center gap-2">
                    <Building2 className="w-6 h-6 lg:w-7 lg:h-7" />
                    {employerData.companyInfo.companyName}
                  </CardTitle>
                  <CardDescription className="text-white/90 text-base">
                    <span className="flex items-center gap-2 flex-wrap">
                      <Briefcase className="w-4 h-4" />
                      {employerData.personalInfo.rolePosition}
                      <span className="text-white/70">•</span>
                      <span className="capitalize">{employerData.recruiterType}</span>
                      <span className="text-white/70">•</span>
                      <span className="capitalize">{employerData.companyInfo.industry}</span>
                    </span>
                  </CardDescription>
                </div>
              </div>

              {/* Status and Profile Completion */}
              <div className="flex flex-col items-end gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Badge variant={employerData.isActive ? "default" : "secondary"} className="text-xs px-3 py-1">
                    {employerData.isActive ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </Badge>
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                    {employerData.role}
                  </Badge>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm text-white/90">Profile Completion</span>
                    <span className="text-white font-semibold">{employerData.profileCompletion}%</span>
                  </div>
                  <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getCompletionColor(employerData.profileCompletion)} transition-all duration-500`}
                      style={{ width: `${employerData.profileCompletion}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/70">{getCompletionStatus(employerData.profileCompletion)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex rounded-none border-b bg-muted/50 p-0">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                <User className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger
                value="verification"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                <Award className="w-4 h-4 mr-2" />
                Verification
              </TabsTrigger>
              <TabsTrigger
                value="integrations"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4"
              >
                <Shield className="w-4 h-4 mr-2" />
                Integrations
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab - Personal and Company Information */}
            <TabsContent value="overview" className="p-6 space-y-6 m-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-muted">
                        <AvatarImage 
                          src={employerData.personalInfo.profilePhoto} 
                          alt={employerData.personalInfo.fullName}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {employerData.personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-semibold text-lg">{employerData.personalInfo.fullName}</p>
                        <Badge variant="secondary" className="text-xs">
                          {employerData.personalInfo.rolePosition}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Business Email</p>
                          <p className="text-sm">{employerData.personalInfo.businessEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Phone className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Phone Number</p>
                          <p className="text-sm">{employerData.personalInfo.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Mail className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Account Email</p>
                          <p className="text-sm">{employerData.email}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Company Snapshot Card */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary" />
                      Company Snapshot
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getCompanySizeIcon(employerData.companyInfo.companySize)}
                          Size
                        </div>
                        <p className="font-semibold">{employerData.companyInfo.companySize}</p>
                      </div>

                      <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="w-4 h-4" />
                          Type
                        </div>
                        <p className="font-semibold">{employerData.companyInfo.companyType}</p>
                      </div>

                      <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          Founded
                        </div>
                        <p className="font-semibold">{employerData.companyInfo.yearFounded}</p>
                      </div>

                      <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Award className="w-4 h-4" />
                          Industry
                        </div>
                        <p className="font-semibold">{employerData.companyInfo.industry}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={employerData.companyInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Website
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={employerData.companyInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Account Timeline Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Account Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Calendar className="w-4 h-4" />
                        Member Since
                      </div>
                      <p className="font-semibold">{formatDate(employerData.createdAt)}</p>
                    </div>

                    <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Calendar className="w-4 h-4" />
                        Last Updated
                      </div>
                      <p className="font-semibold">{formatDate(employerData.updatedAt)}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-mono break-all">
                      <span className="font-semibold">User ID:</span> {employerData.uid}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Company Tab - Detailed Company Information */}
            <TabsContent value="company" className="p-6 space-y-6 m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Company Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed bg-muted/30 p-4 rounded-lg border-l-4 border-primary">
                    {employerData.companyInfo.description}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Company Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries({
                      'Company Name': employerData.companyInfo.companyName,
                      'Industry': employerData.companyInfo.industry,
                      'Company Type': employerData.companyInfo.companyType,
                      'Company Size': employerData.companyInfo.companySize,
                      'Year Founded': employerData.companyInfo.yearFounded,
                      'Recruiter Type': employerData.recruiterType,
                    }).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b">
                        <span className="text-sm font-medium text-muted-foreground">{key}</span>
                        <span className="font-semibold text-right">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Online Presence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={employerData.companyInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Company Website
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    </Button>

                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={employerData.companyInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        View LinkedIn Profile
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Verification Tab - Document Management */}
            <TabsContent value="verification" className="p-6 space-y-6 m-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    Company Verification
                  </CardTitle>
                  <CardDescription>
                    Verification documents submitted by the company
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-semibold">Company Verification Document</p>
                        <p className="text-sm text-muted-foreground">PDF Document</p>
                        {employerData.companyInfo.verificationDocument && (
                          <p className="text-xs text-blue-600 mt-1">
                            Path: {employerData.companyInfo.verificationDocument}
                          </p>
                        )}
                      </div>
                    </div>

                    {employerData.companyInfo.verificationDocument && (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleViewVerification}
                          className="flex items-center gap-2"
                          disabled={isLoading.view}
                        >
                          {isLoading.view ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                          {isLoading.view ? 'Loading...' : 'View Document'}
                        </Button>
                        <Button
                          onClick={handleDownloadVerification}
                          variant="outline"
                          className="flex items-center gap-2"
                          disabled={isLoading.download}
                        >
                          {isLoading.download ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          {isLoading.download ? 'Downloading...' : 'Download'}
                        </Button>
                      </div>
                    )}
                  </div>

                  {employerData.companyInfo.verificationDocument ? (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-semibold">Verification Document Available</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        The company has submitted their verification documents for review.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 text-yellow-600">
                        <FileText className="w-5 h-5" />
                        <span className="font-semibold">No Verification Document</span>
                      </div>
                      <p className="text-sm text-yellow-600 mt-1">
                        This company has not yet submitted verification documents.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{employerData.profileCompletion}%</div>
                      <div className="text-sm text-blue-600">Profile Completion</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {employerData.companyInfo.verificationDocument ? 'Yes' : 'No'}
                      </div>
                      <div className="text-sm text-green-600">Documents Submitted</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {employerData.isActive ? 'Active' : 'Inactive'}
                      </div>
                      <div className="text-sm text-purple-600">Account Status</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations Tab - Connected Services and Security */}
            <TabsContent value="integrations" className="p-6 space-y-6 m-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Integration Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(employerData.integrations).map(([key, integration]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            integration.connected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {integration.connected ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {integration.connected ? 'Connected' : 'Not Connected'}
                            </p>
                          </div>
                        </div>
                        <Badge variant={integration.connected ? "default" : "secondary"}>
                          {integration.connected ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          employerData.security.twoFactorEnabled ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            {employerData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={employerData.security.twoFactorEnabled ? "default" : "secondary"}>
                        {employerData.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Security Recommendations</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {!employerData.security.twoFactorEnabled && (
                          <li>• Enable two-factor authentication for better security</li>
                        )}
                        <li>• Regularly update account credentials</li>
                        <li>• Monitor connected integrations</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerProfileView;