


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
    User, Mail, Phone, Lock, Building2, Globe, Upload,
    CheckCircle, AlertCircle, Image, FileText, Briefcase,
    CheckCircleIcon
} from 'lucide-react';

import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import GoogleLogin from '../GoogleLogin';


const SignAsEmployer = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [recruiterType, setRecruiterType] = useState<'individual' | 'company'>('company');
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Personal Info
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        rolePosition: '',
        phone: '',
        businessEmail: '',
        password: '',
        confirmPassword: ''
    });

    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>('');

    // Company Info
    const [companyInfo, setCompanyInfo] = useState({
        companyName: '',
        linkedinUrl: '',
        industry: '',
        websiteUrl: '',
        description: '',
        companySize: '',
        yearFounded: '',
        companyType: ''
    });

    const [companyLogo, setCompanyLogo] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>('');

    const [verificationDoc, setVerificationDoc] = useState<File | null>(null);

    const INDUSTRIES = [
        "Banking", "FMCG", "Tech", "Real Estate", "Investment",
        "Insurance", "Consulting", "Healthcare", "Energy", "Other"
    ];

    const COMPANY_TYPES = [
        "Startup", "SME", "Enterprise", "Multinational",
        "Consulting Firm", "Financial Institution", "Other"
    ];

    const COMPANY_SIZES = [
        "1-10", "11-50", "51-200", "200+"
    ];

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
                return;
            }
            setProfilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
            toast.success("Photo uploaded successfully");
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
                return;
            }
            setCompanyLogo(file);
            setLogoPreview(URL.createObjectURL(file));
            toast.success("Logo uploaded successfully");
        }
    };

    const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            setVerificationDoc(file);
            toast.success("Document uploaded successfully");
        }
    };

    const calculateProgress = () => {
        let progress = 0;

        // Personal Info (40%)
        if (personalInfo.fullName) progress += 10;
        if (personalInfo.phone) progress += 10;
        if (personalInfo.businessEmail) progress += 10;
        if (personalInfo.password && personalInfo.password === personalInfo.confirmPassword) progress += 10;

        // Company Info (60%) - if company type
        if (recruiterType === 'company') {
            if (companyInfo.companyName) progress += 15;
            if (companyInfo.linkedinUrl) progress += 15;
            if (companyInfo.industry) progress += 15;
            if (companyInfo.description) progress += 10;
            if (verificationDoc) progress += 5;
        } else {
            progress += 60; // Individual doesn't need company info
        }

        return Math.min(progress, 100);
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                if (!personalInfo.fullName || !personalInfo.businessEmail || !personalInfo.phone) {
                    return "Please fill all required fields";
                }
                if (!personalInfo.password || personalInfo.password.length < 6) {
                    return "Password must be at least 6 characters";
                }
                if (personalInfo.password !== personalInfo.confirmPassword) {
                    return "Passwords do not match";
                }
                return null;
            case 2:
                if (recruiterType === 'company') {
                    if (!companyInfo.companyName || !companyInfo.linkedinUrl || !companyInfo.industry) {
                        return "Please fill all required company fields";
                    }
                    if (!verificationDoc) {
                        return "Please upload company verification document";
                    }
                }
                return null;
            default:
                return null;
        }
    };

    const handleNext = () => {
        const error = validateStep(currentStep);
        if (error) {
            toast.error(error);
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        const error = validateStep(currentStep);
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(true);

        const profileData = {
            role: "recruiter" as const,
            recruiterType,
            personalInfo: {
                fullName: personalInfo.fullName,
                rolePosition: personalInfo.rolePosition,
                phone: personalInfo.phone,
                businessEmail: personalInfo.businessEmail,
                profilePhoto: ""
            },
            companyInfo: recruiterType === 'company' ? {
                companyName: companyInfo.companyName,
                companyLogo: "",
                linkedinUrl: companyInfo.linkedinUrl,
                industry: companyInfo.industry,
                websiteUrl: companyInfo.websiteUrl,
                description: companyInfo.description,
                companySize: companyInfo.companySize as any,
                yearFounded: companyInfo.yearFounded,
                companyType: companyInfo.companyType,
                verificationDocument: ""
            } : undefined,
            integrations: {
                googleMeet: { connected: false },
                googleCalendar: { connected: false },
                gmail: { connected: false }
            },
            security: {
                twoFactorEnabled: false
            },
            profileCompletion: calculateProgress()
        };

        try {
            await signup(personalInfo.businessEmail, personalInfo.password, profileData);
            toast.success('Account created successfully! Welcome aboard');

            setTimeout(() => {
                navigate('/employer');
            }, 500);
        } catch (error: any) {
            console.error("Signup error:", error);

            if (error.code === "auth/email-already-in-use") {
                toast.error("This email is already registered!");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email address!");
            } else if (error.code === "auth/weak-password") {
                toast.error("Password is too weak! Use at least 6 characters.");
            } else {
                toast.error(error.message || 'Failed to create account');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 m-auto w-full">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Employer Account</h1>
                        <p className="text-gray-600">Join our platform to find top finance talent</p>
                    </div>

                    {/* Progress Bar */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                                <span className="text-2xl font-bold text-blue-600">{calculateProgress()}%</span>
                            </div>
                            <Progress value={calculateProgress()} className="h-3" />
                            <div className="flex justify-between mt-4 text-xs text-gray-500">
                                <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>Personal Info</span>
                                <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>Company Details</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            {/* Recruiter Type */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        I am recruiting as:
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Card
                                            className={`cursor-pointer transition-all border-2 ${recruiterType === 'individual'
                                                ? 'border-blue-600 bg-blue-50 shadow-md'
                                                : 'border-gray-200 hover:border-blue-400 hover:shadow-sm'
                                                }`}
                                            onClick={() => {
                                                setRecruiterType('individual');
                                                // navigate('/candidate/signup')
                                            }}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <User className={`w-12 h-12 mx-auto mb-3 ${recruiterType === 'individual' ? 'text-blue-600' : 'text-gray-400'}`} />
                                                <h3 className="font-semibold text-lg mb-2">Individual Recruiter</h3>
                                                <p className="text-sm text-gray-600">Freelance HR or independent consultant</p>
                                                {recruiterType === 'individual' && (
                                                    <CheckCircle className="w-6 h-6 mx-auto mt-3 text-blue-600" />
                                                )}
                                            </CardContent>
                                        </Card>

                                        <Card
                                            className={`cursor-pointer transition-all border-2 ${recruiterType === 'company'
                                                ? 'border-blue-600 bg-blue-50 shadow-md'
                                                : 'border-gray-200 hover:border-blue-400 hover:shadow-sm'
                                                }`}
                                            onClick={() => setRecruiterType('company')}
                                        >
                                            <CardContent className="p-6 text-center">
                                                <Building2 className={`w-12 h-12 mx-auto mb-3 ${recruiterType === 'company' ? 'text-blue-600' : 'text-gray-400'}`} />
                                                <h3 className="font-semibold text-lg mb-2">Company Representative</h3>
                                                <p className="text-sm text-gray-600">Representing a company or organization</p>
                                                {recruiterType === 'company' && (
                                                    <CheckCircle className="w-6 h-6 mx-auto mt-3 text-blue-600" />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Personal Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Personal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                                            <p className="text-sm text-blue-700">
                                                <strong>Getting Started:</strong> Fill in your personal information. All fields marked with * are required.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Profile Photo */}
                                    <div>
                                        <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                                            <Image className="w-4 h-4" />
                                            Profile Photo
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                                                {photoPreview ? (
                                                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-12 h-12 text-gray-400" />
                                                )}
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    id="photo-upload"
                                                    accept="image/*"
                                                    onChange={handlePhotoUpload}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="photo-upload"
                                                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary-c hover:bg-secondary-c-hover text-white rounded-lg transition-colors"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Upload Photo
                                                </label>
                                                <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Full Name *</label>
                                            <Input
                                                value={personalInfo.fullName}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Role/Position</label>
                                            <Input
                                                value={personalInfo.rolePosition}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, rolePosition: e.target.value })}
                                                placeholder="e.g., HR Manager"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Phone Number *
                                            </label>
                                            <Input
                                                value={personalInfo.phone}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                                placeholder="+971 50 123 4567"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                Business Email *
                                            </label>
                                            <Input
                                                type="email"
                                                value={personalInfo.businessEmail}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, businessEmail: e.target.value })}
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold flex items-center gap-2">
                                                <Lock className="w-4 h-4" />
                                                Password *
                                            </label>
                                            <Input
                                                type="password"
                                                value={personalInfo.password}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
                                                placeholder="Min. 6 characters"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold flex items-center gap-2">
                                                <Lock className="w-4 h-4" />
                                                Confirm Password *
                                            </label>
                                            <Input
                                                type="password"
                                                value={personalInfo.confirmPassword}
                                                onChange={(e) => setPersonalInfo({ ...personalInfo, confirmPassword: e.target.value })}
                                                placeholder="Re-enter password"
                                            />
                                        </div>
                                    </div>

                                    {personalInfo.password && personalInfo.confirmPassword && (
                                        <div className="flex items-center gap-2 text-sm">
                                            {personalInfo.password === personalInfo.confirmPassword ? (
                                                <>
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    <span className="text-green-600">Passwords match</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="w-4 h-4 text-red-600" />
                                                    <span className="text-red-600">Passwords do not match</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button
                                    onClick={handleNext}
                                    className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground px-8"
                                >
                                    Continue to Company Info
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Company Information */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            {recruiterType === 'company' ? (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Building2 className="w-5 h-5 text-blue-600" />
                                            Company Information
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Company Logo */}
                                        <div>
                                            <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                                                <Image className="w-4 h-4" />
                                                Company Logo
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                                                    {logoPreview ? (
                                                        <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        <Building2 className="w-12 h-12 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="file"
                                                        id="logo-upload"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="logo-upload"
                                                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-secondary-c hover:bg-secondary-c-hover text-white rounded-lg transition-colors"
                                                    >
                                                        <Upload className="w-4 h-4" />
                                                        Upload Logo
                                                    </label>
                                                    <p className="text-xs text-gray-500 mt-1">Recommended: 200x200px, PNG or JPG</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Company Name *</label>
                                                <Input
                                                    value={companyInfo.companyName}
                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                                                    placeholder="Your Company Name"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    Industry *
                                                </label>
                                                <Select
                                                    value={companyInfo.industry}
                                                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, industry: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select your industry" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {INDUSTRIES.map((industry) => (
                                                            <SelectItem key={industry} value={industry}>
                                                                {industry}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Company LinkedIn URL *</label>
                                                <Input
                                                    value={companyInfo.linkedinUrl}
                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, linkedinUrl: e.target.value })}
                                                    placeholder="https://linkedin.com/company/..."
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">
                                                    <Globe className="w-4 h-4 inline mr-1" />
                                                    Website URL
                                                </label>
                                                <Input
                                                    value={companyInfo.websiteUrl}
                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, websiteUrl: e.target.value })}
                                                    placeholder="https://yourcompany.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold">Company Description</label>
                                            <Textarea
                                                value={companyInfo.description}
                                                onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                                                placeholder="Brief description of your company..."
                                                rows={4}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Company Size</label>
                                                <Select
                                                    value={companyInfo.companySize}
                                                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, companySize: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select size" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {COMPANY_SIZES.map((size) => (
                                                            <SelectItem key={size} value={size}>
                                                                {size} employees
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Year Founded</label>
                                                <Input
                                                    value={companyInfo.yearFounded}
                                                    onChange={(e) => setCompanyInfo({ ...companyInfo, yearFounded: e.target.value })}
                                                    placeholder="2020"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold">Company Type</label>
                                                <Select
                                                    value={companyInfo.companyType}
                                                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, companyType: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {COMPANY_TYPES.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Verification Document */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                Company Verification Document *
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:border-blue-400 transition-all">
                                                <input
                                                    type="file"
                                                    id="doc-upload"
                                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                                    onChange={handleDocUpload}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="doc-upload"
                                                    className="cursor-pointer flex flex-col items-center gap-3"
                                                >
                                                    {verificationDoc ? (
                                                        <>
                                                            <CheckCircle className="w-12 h-12 text-green-600" />
                                                            <div className="text-center">
                                                                <p className="font-medium text-gray-900">{verificationDoc.name}</p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {(verificationDoc.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Change Document
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload className="w-12 h-12 text-gray-400" />
                                                            <div className="text-center">
                                                                <p className="font-medium text-gray-900">Upload Document</p>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    PDF, DOC, DOCX, PNG, JPG format (Max 5MB)
                                                                </p>
                                                            </div>
                                                            <Button
                                                                type="button"
                                                                className="bg-secondary-c hover:bg-secondary-c-hover text-white"
                                                            >
                                                                Choose File
                                                            </Button>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                Upload your company brochure, profile, or verification document
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card>
                                    <CardContent className="p-8 text-center">
                                        <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Individual Recruiter Setup</h3>
                                        <p className="text-gray-600">
                                            As an individual recruiter, you don't need to provide company information.
                                            Click "Create Account" to complete your registration.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center">
                                <Button
                                    onClick={handleBack}
                                    variant="outline"
                                    className="px-6"
                                >
                                    Previous
                                </Button>

                                <Button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground px-8"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Creating Account...
                                        </span>
                                    ) : (
                                        <>
                                            Create Account
                                            <CheckCircleIcon className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Already have an account */}
                    <div className="text-center mt-8 text-sm text-gray-600">
                        <GoogleLogin role='employer' />
                        <p>
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-secondary-c hover:underline font-medium"
                            >
                                Sign In
                            </Link>
                        </p>
                        <p>Register as a Candidate <Link to="/signup/candidate" className="text-secondary-c hover:underline font-medium">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SignAsEmployer
