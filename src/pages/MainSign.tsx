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
    UserSearch,
    UserRoundPen
} from 'lucide-react';

import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';


const MainSign = () => {
    const [recruiterType, setRecruiterType] = useState<'individual' | 'company' | null>(null);
    const navigate = useNavigate();
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 ">
                <div className="max-w-5xl mx-auto h-[100vh] flex justify-center items-center flex-col">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Account Type</h1>
                        <p className="text-gray-600">Join our platform to connect talent with opportunity.</p>
                    </div>
                    {/* Recruiter Type */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserRoundPen className="w-5 h-5 text-blue-600" />
                                I’m joining as:
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
                                        navigate('/signup/candidate')
                                    }}
                                >
                                    <CardContent className="p-6 text-center">
                                        <UserSearch className={`w-12 h-12 mx-auto mb-3 ${recruiterType === 'individual' ? 'text-blue-600' : 'text-gray-400'}`} />
                                        <h3 className="font-semibold text-lg mb-2">Job Seeker</h3>
                                        <p className="text-sm text-gray-600">Looking for career opportunities and new challenges</p>
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
                                    onClick={() => {
                                        setRecruiterType('company');
                                        navigate('/signup/employer')
                                    }
                                    }
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

                </div>
            </div>

        </>
    );
}
export default MainSign
