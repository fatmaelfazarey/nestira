
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Phone, 
  Mail, 
  Linkedin, 
  Calendar,
  Download,
  Eye,
  FileText,
  Award,
  User,
  MessageSquare,
  ChevronRight,
  GraduationCap,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { getCountryFlag } from '@/utils/talentPoolUtils';

interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  country: string;
  experience: string;
  salaryExpectation: string;
  industryExperience: string[];
  financeSubfields: string[];
  softwareTools: string[];
  certifications: string[];
  photo: string;
  score: number;
  email: string;
  phone: string;
  linkedin: string;
  availability: string;
  preferredRoleType: string;
  workAuthorization: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    graduationYear: string;
  }[];
  coverLetter: string;
  resume: string;
  notes: string;
  interviews: {
    date: string;
    interviewer: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    feedback: string;
  }[];
  applications: {
    jobTitle: string;
    dateApplied: string;
    status: 'pending' | 'reviewed' | 'offered' | 'rejected';
  }[];
}

interface ExpandedCandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
  isUnlocked?: boolean;
}

export const ExpandedCandidateModal: React.FC<ExpandedCandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite,
  isUnlocked = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={candidate.photo} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  {candidate.name}
                  <span>{getCountryFlag(candidate.country)}</span>
                </DialogTitle>
                <p className="text-gray-600">{candidate.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    <MapPin className="w-3 h-3 mr-1" />
                    {candidate.location}
                  </Badge>
                  <Badge variant="secondary">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {candidate.experience} experience
                  </Badge>
                  <Badge variant="secondary">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {candidate.salaryExpectation}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onToggleFavorite(candidate.id)}
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills & Education</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Full Name</p>
                        <p className="text-sm text-gray-600">{candidate.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Location</p>
                        <p className="text-sm text-gray-600">{candidate.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Email</p>
                        <p className="text-sm text-gray-600">
                          <a href={`mailto:${candidate.email}`} className="text-blue-500 hover:underline">
                            {candidate.email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-sm text-gray-600">{candidate.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">LinkedIn</p>
                        <p className="text-sm text-gray-600">
                          <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            View LinkedIn Profile
                          </a>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Availability</p>
                        <p className="text-sm text-gray-600">{candidate.availability}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Preferred Role Type</p>
                        <p className="text-sm text-gray-600">{candidate.preferredRoleType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Work Authorization</p>
                        <p className="text-sm text-gray-600">{candidate.workAuthorization}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      Application Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.applications.map((app, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{app.jobTitle}</p>
                          <p className="text-xs text-gray-500">Applied on {app.dateApplied}</p>
                        </div>
                        <div>
                          {app.status === 'pending' && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          {app.status === 'reviewed' && (
                            <Badge variant="secondary" className="text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Reviewed
                            </Badge>
                          )}
                          {app.status === 'offered' && (
                            <Badge className="bg-green-100 text-green-600 border-green-200 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Offered
                            </Badge>
                          )}
                          {app.status === 'rejected' && (
                            <Badge variant="destructive" className="text-xs">
                              <XCircle className="w-3 h-3 mr-1" />
                              Rejected
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{candidate.notes || 'No notes available for this candidate.'}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidate.industryExperience.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {candidate.industryExperience.map((exp, index) => (
                        <Badge key={index} variant="secondary">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No work experience listed for this candidate.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-red-600" />
                      Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No skills listed for this candidate.</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-yellow-600" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {candidate.education.length > 0 ? (
                      <div className="space-y-3">
                        {candidate.education.map((edu, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="font-medium text-sm">{edu.degree}</p>
                            <p className="text-xs text-gray-500">{edu.institution}, {edu.graduationYear}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">No education history listed for this candidate.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cover Letter Section */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Cover Letter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-red-100 rounded flex items-center justify-center">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Cover_Letter_Sarah_Johnson.pdf</p>
                            <p className="text-xs text-gray-500">142 KB • PDF</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        "I am writing to express my strong interest in the Senior Financial Analyst position at your company. With over 5 years of experience in financial analysis and a proven track record of delivering actionable insights..."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* CV/Resume Section */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-green-600" />
                      CV/Resume
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-green-100 rounded flex items-center justify-center">
                            <FileText className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Sarah_Johnson_Resume_2024.pdf</p>
                            <p className="text-xs text-gray-500">256 KB • PDF</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="mb-2"><strong>Summary:</strong> Experienced Financial Analyst with expertise in data analysis, financial modeling, and strategic planning.</p>
                        <p><strong>Last Updated:</strong> March 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-600" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Full Name</p>
                        <p className="text-gray-600">{candidate.name}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Location</p>
                        <p className="text-gray-600">{candidate.location}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Experience Level</p>
                        <p className="text-gray-600">{candidate.experience}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Availability</p>
                        <p className="text-gray-600">Available immediately</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Work Authorization</p>
                        <p className="text-gray-600">Authorized to work</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Preferred Role Type</p>
                        <p className="text-gray-600">Full-time, Remote</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications & Documents */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="w-5 h-5 text-orange-600" />
                      Certifications & Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {candidate.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                            <Award className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{cert}</p>
                            <p className="text-xs text-gray-500">Valid until 2025</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
