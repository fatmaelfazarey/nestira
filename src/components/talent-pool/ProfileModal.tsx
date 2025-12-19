

// // // components/ProfileModal.tsx
// // import React from 'react';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// // import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { Button } from '@/components/ui/button';
// // import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// // import {
// //     Mail,
// //     Phone,
// //     MapPin,
// //     Globe,
// //     Briefcase,
// //     Calendar,
// //     Linkedin,
// //     BookOpen,
// //     GraduationCap,
// //     Code,
// //     Award,
// //     Languages,
// //     Building,
// //     FileText,
// //     X,
// //     MessageSquare
// // } from 'lucide-react';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { IP } from '@/store/Path';
// // import { toast } from 'sonner';
// // import { fetchCandidateById } from '@/services/cadidatesService';

// // interface ProfileModalProps {
// //     candidate: any;
// //     candidateId: any;
// //     isOpen: boolean;
// //     onClose: () => void;
// //     onStartChat: (candidate: any) => void;
// // }

// // const User = ({ className }: { className?: string }) => (
// //     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //     </svg>
// // );

// // const formatSalaryRange = (salaryRange: any) => {
// //     if (!salaryRange) return 'Not specified';

// //     const { min, max, currency } = salaryRange;
// //     if (min === 0 && max === 0) return 'Not specified';

// //     return `${min} - ${max} ${currency}`;
// // };

// // const handleDownloadCV = (candidate: any) => {
// //     if (candidate.cvData) {
// //         try {
// //             const url = `${process.env.NEXT_PUBLIC_IP || ''}/${candidate.cvData}`;

// //             const link = document.createElement('a');
// //             link.href = url;
// //             link.target = '_blank';
// //             link.rel = 'noopener noreferrer';

// //             const fileName = `CV_${candidate.name || 'candidate'}.pdf`;
// //             link.download = fileName;

// //             document.body.appendChild(link);
// //             link.click();
// //             document.body.removeChild(link);

// //             // toast.success('Download started');
// //         } catch (error) {
// //             console.error('Error downloading CV:', error);
// //             // toast.error('Failed to download CV');
// //         }
// //     } else {
// //         console.warn('No CV available for this candidate');
// //         // toast.warning('No CV available for this candidate');
// //     }
// // };

// // export const ProfileModal: React.FC<ProfileModalProps> = ({
// //     candidate,
// //     candidateId,
// //     isOpen,
// //     onClose,
// //     onStartChat
// // }) => {
// //     const { currentUser } = useAuth();

// //     const handleChatClick = () => {
// //         onStartChat(candidate);
// //         onClose(); // Close the profile modal
// //     };

// //     if (candidateId) {
// //         const candidate = await fetchCandidateById(candidateId);
// //     }

// //     if (!candidate) return null;
// //     if (candidateId) {

// //     }

// //     const transformCandidateData = (candidate: any) => {
// //         const location = candidate.basicInfo?.location || 'Unknown Location';
// //         const country = location.split(',')?.[1]?.trim() || 'EG';

// //         return {
// //             id: candidate.uid,
// //             name: candidate.basicInfo?.fullName || 'Unknown Candidate',
// //             title: candidate.basicInfo?.role || candidate.preferences?.jobTitles?.[0] || 'No Title',
// //             location: location,
// //             country: country,
// //             experience: candidate.experience?.[0]?.title || 'No Experience',
// //             score: calculateMatchingScore(candidate),
// //             status: 'Available',
// //             industryExperience: candidate.industry?.industries || [],
// //             financeSubfields: candidate.industry?.subfields || [],
// //             softwareTools: candidate.skills?.software || [],
// //             certifications: candidate.skills?.certifications || [],
// //             email: candidate.basicInfo?.email || candidate.email,
// //             phone: candidate.basicInfo?.phone || 'No Phone',
// //             photo: candidate.basicInfo?.profilePhoto || candidate.profilePhoto,
// //             unlockedDate: candidate.unlockedDate || new Date().toISOString(),
// //             salaryExpectation: formatSalaryRange(candidate.preferences?.salaryRange),
// //             cvData: candidate.cvData,
// //             cvUrl: candidate.cvUrl,
// //             rawData: candidate
// //         };
// //     };

// //     const calculateMatchingScore = (candidate: any) => {
// //         let score = 0;

// //         // Score based on profile completion
// //         if (candidate.profileCompletion === 100) score += 30;
// //         else if (candidate.profileCompletion >= 80) score += 20;
// //         else if (candidate.profileCompletion >= 60) score += 10;

// //         // Score based on experience
// //         if (candidate.experience && candidate.experience.length > 0) score += 25;

// //         // Score based on education
// //         if (candidate.education && candidate.education.length > 0) score += 20;

// //         // Score based on skills
// //         if (candidate.skills) {
// //             const totalSkills = [
// //                 ...(candidate.skills.software || []),
// //                 ...(candidate.skills.technical || []),
// //                 ...(candidate.skills.certifications || [])
// //             ].length;
// //             score += Math.min(totalSkills * 2, 25);
// //         }

// //         return Math.min(score, 100);
// //     };

// //     const formatSalaryRange = (salaryRange: any) => {
// //         if (!salaryRange) return 'Not specified';

// //         const { min, max, currency } = salaryRange;
// //         if (min === 0 && max === 0) return 'Not specified';

// //         return `${min} - ${max} ${currency}`;
// //     };
// //     const handleDownloadCV = (candidate: any) => {
// //         if (candidate.cvData) {
// //             try {
// //                 const url = `${IP}/${candidate.cvData}`;

// //                 const link = document.createElement('a');
// //                 link.href = url;
// //                 link.target = '_blank';
// //                 link.rel = 'noopener noreferrer';

// //                 const fileName = `CV_${candidate.name || 'candidate'}.pdf`;
// //                 link.download = fileName;

// //                 document.body.appendChild(link);
// //                 link.click();
// //                 document.body.removeChild(link);

// //                 toast.success('Download started');
// //             } catch (error) {
// //                 console.error('Error downloading CV:', error);
// //                 toast.error('Failed to download CV');
// //             }
// //         } else {
// //             toast.warning('No CV available for this candidate');
// //         }
// //     };

// //     return (
// //         <Dialog open={isOpen} onOpenChange={onClose}>
// //             <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
// //                 <DialogHeader>
// //                     <div className="flex items-center justify-between">
// //                         <DialogTitle className="flex items-center gap-3">
// //                             <Avatar className="w-12 h-12">
// //                                 <AvatarImage src={candidate.photo} alt={candidate.name} />
// //                                 <AvatarFallback>{candidate.name?.charAt(0)}</AvatarFallback>
// //                             </Avatar>
// //                             <div>
// //                                 <div className="text-xl font-bold">{candidate.name}</div>
// //                                 <div className="text-sm text-gray-600">{candidate.title}</div>
// //                             </div>
// //                         </DialogTitle>
// //                         <Button
// //                             variant="ghost"
// //                             size="sm"
// //                             onClick={onClose}
// //                             className="h-8 w-8 p-0"
// //                         >
// //                             <X className="w-4 h-4" />
// //                         </Button>
// //                     </div>
// //                     <DialogDescription>
// //                         Full candidate profile and details
// //                     </DialogDescription>
// //                 </DialogHeader>

// //                 <div className="space-y-6">
// //                     {/* Basic Information */}
// //                     <Card>
// //                         <CardHeader>
// //                             <CardTitle className="flex items-center gap-2">
// //                                 <User className="w-5 h-5" />
// //                                 Basic Information
// //                             </CardTitle>
// //                         </CardHeader>
// //                         <CardContent className="space-y-4">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 <div className="space-y-2">
// //                                     <div className="flex items-center gap-2">
// //                                         <Mail className="w-4 h-4 text-gray-500" />
// //                                         <span className="font-medium">Email:</span>
// //                                         <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
// //                                             {candidate.email}
// //                                         </a>
// //                                     </div>
// //                                     <div className="flex items-center gap-2">
// //                                         <Phone className="w-4 h-4 text-gray-500" />
// //                                         <span className="font-medium">Phone:</span>
// //                                         <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">
// //                                             {candidate.phone}
// //                                         </a>
// //                                     </div>
// //                                     <div className="flex items-center gap-2">
// //                                         <MapPin className="w-4 h-4 text-gray-500" />
// //                                         <span className="font-medium">Location:</span>
// //                                         <span>{candidate.location}</span>
// //                                     </div>
// //                                 </div>
// //                                 <div className="space-y-2">
// //                                     <div className="flex items-center gap-2">
// //                                         <Globe className="w-4 h-4 text-gray-500" />
// //                                         <span className="font-medium">Visa Status:</span>
// //                                         <span>{candidate.rawData?.preferences?.visaStatus || 'Not specified'}</span>
// //                                     </div>
// //                                     <div className="flex items-center gap-2">
// //                                         <Briefcase className="w-4 h-4 text-gray-500" />
// //                                         <span className="font-medium">Work Type:</span>
// //                                         <span>{candidate.rawData?.preferences?.workType || 'Not specified'}</span>
// //                                     </div>
// //                                     <div className="flex items-center gap-2">
// //                                         <Calendar className="w-4 h-4 text-gray-500" />
// //                                         <span className="font-medium">Notice Period:</span>
// //                                         <span>{candidate.rawData?.preferences?.noticePeriod || 'Not specified'}</span>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {candidate.rawData?.basicInfo?.linkedin && (
// //                                 <div className="flex items-center gap-2">
// //                                     <Linkedin className="w-4 h-4 text-blue-600" />
// //                                     <span className="font-medium">LinkedIn:</span>
// //                                     <a
// //                                         href={candidate.rawData?.basicInfo.linkedin}
// //                                         target="_blank"
// //                                         rel="noopener noreferrer"
// //                                         className="text-blue-600 hover:underline"
// //                                     >
// //                                         {candidate.rawData?.basicInfo.linkedin}
// //                                     </a>
// //                                 </div>
// //                             )}
// //                         </CardContent>
// //                     </Card>

// //                     {/* Summary */}
// //                     {candidate.rawData?.summary && (
// //                         <Card>
// //                             <CardHeader>
// //                                 <CardTitle className="flex items-center gap-2">
// //                                     <BookOpen className="w-5 h-5" />
// //                                     Professional Summary
// //                                 </CardTitle>
// //                             </CardHeader>
// //                             <CardContent>
// //                                 <p className="text-gray-700 whitespace-pre-line">{candidate.rawData?.summary}</p>
// //                             </CardContent>
// //                         </Card>
// //                     )}

// //                     {/* Experience */}
// //                     {candidate.rawData?.experience && candidate.rawData?.experience.length > 0 && (
// //                         <Card>
// //                             <CardHeader>
// //                                 <CardTitle className="flex items-center gap-2">
// //                                     <Briefcase className="w-5 h-5" />
// //                                     Work Experience
// //                                 </CardTitle>
// //                             </CardHeader>
// //                             <CardContent className="space-y-4">
// //                                 {candidate.rawData?.experience.map((exp: any, index: number) => (
// //                                     <div key={index} className="border-l-4 border-blue-200 pl-4">
// //                                         <div className="flex justify-between items-start">
// //                                             <div>
// //                                                 <h4 className="font-semibold text-lg">{exp.title}</h4>
// //                                                 <p className="text-gray-600">{exp.company} • {exp.location}</p>
// //                                             </div>
// //                                             <div className="text-right text-sm text-gray-500">
// //                                                 <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
// //                                                 {exp.current && (
// //                                                     <Badge variant="outline" className="bg-green-50 text-green-700">
// //                                                         Current
// //                                                     </Badge>
// //                                                 )}
// //                                             </div>
// //                                         </div>
// //                                         {exp.achievements && exp.achievements.length > 0 && (
// //                                             <ul className="mt-2 space-y-1">
// //                                                 {exp.achievements.map((achievement: string, achIndex: number) => (
// //                                                     <li key={achIndex} className="text-sm text-gray-700 flex items-start gap-2">
// //                                                         <span className="text-blue-500 mt-1">•</span>
// //                                                         {achievement}
// //                                                     </li>
// //                                                 ))}
// //                                             </ul>
// //                                         )}
// //                                     </div>
// //                                 ))}
// //                             </CardContent>
// //                         </Card>
// //                     )}

// //                     {/* Education */}
// //                     {candidate.rawData?.education && candidate.rawData?.education.length > 0 && (
// //                         <Card>
// //                             <CardHeader>
// //                                 <CardTitle className="flex items-center gap-2">
// //                                     <GraduationCap className="w-5 h-5" />
// //                                     Education
// //                                 </CardTitle>
// //                             </CardHeader>
// //                             <CardContent className="space-y-4">
// //                                 {candidate.rawData?.education.map((edu: any, index: number) => (
// //                                     <div key={index} className="border-l-4 border-green-200 pl-4">
// //                                         <div className="flex justify-between items-start">
// //                                             <div>
// //                                                 <h4 className="font-semibold">{edu.degree}</h4>
// //                                                 <p className="text-gray-600">{edu.institution}</p>
// //                                             </div>
// //                                             <div className="text-right text-sm text-gray-500">
// //                                                 <p>{edu.startDate} - {edu.endDate}</p>
// //                                                 {edu.gpa && <p>GPA: {edu.gpa}</p>}
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </CardContent>
// //                         </Card>
// //                     )}

// //                     {/* Skills */}
// //                     <Card>
// //                         <CardHeader>
// //                             <CardTitle className="flex items-center gap-2">
// //                                 <Code className="w-5 h-5" />
// //                                 Skills & Technologies
// //                             </CardTitle>
// //                         </CardHeader>
// //                         <CardContent className="space-y-4">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 {candidate.rawData?.skills?.software && candidate.rawData?.skills.software.length > 0 && (
// //                                     <div>
// //                                         <h4 className="font-semibold mb-2 flex items-center gap-2">
// //                                             <Code className="w-4 h-4" />
// //                                             Software & Tools
// //                                         </h4>
// //                                         <div className="flex flex-wrap gap-2">
// //                                             {candidate.rawData?.skills.software.map((skill: string, index: number) => (
// //                                                 <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
// //                                                     {skill}
// //                                                 </Badge>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 )}

// //                                 {candidate.rawData?.skills?.technical && candidate.rawData?.skills.technical.length > 0 && (
// //                                     <div>
// //                                         <h4 className="font-semibold mb-2 flex items-center gap-2">
// //                                             <Award className="w-4 h-4" />
// //                                             Technical Skills
// //                                         </h4>
// //                                         <div className="flex flex-wrap gap-2">
// //                                             {candidate.rawData?.skills.technical.map((skill: string, index: number) => (
// //                                                 <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
// //                                                     {skill}
// //                                                 </Badge>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 {candidate.rawData?.skills?.certifications && candidate.rawData?.skills.certifications.length > 0 && (
// //                                     <div>
// //                                         <h4 className="font-semibold mb-2 flex items-center gap-2">
// //                                             <Award className="w-4 h-4" />
// //                                             Certifications
// //                                         </h4>
// //                                         <div className="flex flex-wrap gap-2">
// //                                             {candidate.rawData?.skills.certifications.map((cert: string, index: number) => (
// //                                                 <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
// //                                                     {cert}
// //                                                 </Badge>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 )}

// //                                 {candidate.rawData?.skills?.languages && candidate.rawData?.skills.languages.length > 0 && (
// //                                     <div>
// //                                         <h4 className="font-semibold mb-2 flex items-center gap-2">
// //                                             <Languages className="w-4 h-4" />
// //                                             Languages
// //                                         </h4>
// //                                         <div className="flex flex-wrap gap-2">
// //                                             {candidate.rawData?.skills.languages.map((lang: string, index: number) => (
// //                                                 <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700">
// //                                                     {lang}
// //                                                 </Badge>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Industry & Preferences */}
// //                     <Card>
// //                         <CardHeader>
// //                             <CardTitle className="flex items-center gap-2">
// //                                 <Building className="w-5 h-5" />
// //                                 Industry & Preferences
// //                             </CardTitle>
// //                         </CardHeader>
// //                         <CardContent className="space-y-4">
// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 <div>
// //                                     <h4 className="font-semibold mb-2">Industries</h4>
// //                                     <div className="flex flex-wrap gap-2">
// //                                         {candidate.rawData?.industry?.industries?.map((industry: string, index: number) => (
// //                                             <Badge key={index} variant="outline">
// //                                                 {industry}
// //                                             </Badge>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                                 <div>
// //                                     <h4 className="font-semibold mb-2">Subfields</h4>
// //                                     <div className="flex flex-wrap gap-2">
// //                                         {candidate.rawData?.industry?.subfields?.map((subfield: string, index: number) => (
// //                                             <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
// //                                                 {subfield}
// //                                             </Badge>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                                 <div>
// //                                     <h4 className="font-semibold mb-2">Preferred Job Titles</h4>
// //                                     <div className="flex flex-wrap gap-2">
// //                                         {candidate.rawData?.preferences?.jobTitles?.map((title: string, index: number) => (
// //                                             <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
// //                                                 {title}
// //                                             </Badge>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                                 <div>
// //                                     <h4 className="font-semibold mb-2">Salary Expectations</h4>
// //                                     <p className="text-gray-700">
// //                                         {formatSalaryRange(candidate.rawData?.preferences?.salaryRange)}
// //                                     </p>
// //                                 </div>
// //                             </div>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Actions */}
// //                     <div className="flex justify-end gap-3 pt-4 border-t">
// //                         <Button
// //                             variant="outline"
// //                             onClick={() => handleDownloadCV(candidate)}
// //                             disabled={!candidate.cvData}
// //                             className="flex items-center gap-2"
// //                         >
// //                             <FileText className="w-4 h-4" />
// //                             Download CV
// //                         </Button>

// //                         {currentUser && (
// //                             <Button
// //                                 onClick={handleChatClick}
// //                                 className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
// //                             >
// //                                 <MessageSquare className="w-4 h-4" />
// //                                 Start Chat
// //                             </Button>
// //                         )}

// //                         <Button
// //                             onClick={onClose}
// //                             variant="outline"
// //                             className="flex items-center gap-2"
// //                         >
// //                             Close
// //                         </Button>
// //                     </div>
// //                 </div>
// //             </DialogContent>
// //         </Dialog>
// //     );
// // };

// // export default ProfileModal;












// // components/ProfileModal.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import {
//     Mail,
//     Phone,
//     MapPin,
//     Globe,
//     Briefcase,
//     Calendar,
//     Linkedin,
//     BookOpen,
//     GraduationCap,
//     Code,
//     Award,
//     Languages,
//     Building,
//     FileText,
//     X,
//     MessageSquare,
//     Download
// } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { IP } from '@/store/Path';
// import { toast } from 'sonner';
// import { fetchCandidateById } from '@/services/cadidatesService';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// interface ProfileModalProps {
//     candidate?: any; // إختياري - البيانات الجاهزة
//     candidateId?: string; // إختياري - ID فقط
//     isOpen: boolean;
//     onClose: () => void;
//     onStartChat?: (candidate: any) => void;
// }

// // واجهة للبيانات المحولة
// interface TransformedCandidate {
//     id: string;
//     name: string;
//     title: string;
//     location: string;
//     country: string;
//     experience: string;
//     score: number;
//     status: string;
//     industryExperience: string[];
//     financeSubfields: string[];
//     softwareTools: string[];
//     certifications: string[];
//     email: string;
//     phone: string;
//     photo: string;
//     unlockedDate: string;
//     salaryExpectation: string;
//     cvData?: string;
//     cvUrl?: string;
//     rawData: any;
// }

// const User = ({ className }: { className?: string }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
// );

// // دالة تحويل البيانات
// const transformCandidateData = (candidateData: any): TransformedCandidate | null => {
//     if (!candidateData) return null;

//     const location = candidateData.basicInfo?.location || 'Unknown Location';
//     const country = location.split(',')?.[1]?.trim() || 'EG';

//     return {
//         id: candidateData.uid || candidateData.id,
//         name: candidateData.basicInfo?.fullName || 'Unknown Candidate',
//         title: candidateData.basicInfo?.role || candidateData.preferences?.jobTitles?.[0] || 'No Title',
//         location: location,
//         country: country,
//         experience: candidateData.experience?.[0]?.title || 'No Experience',
//         score: calculateMatchingScore(candidateData),
//         status: 'Available',
//         industryExperience: candidateData.industry?.industries || [],
//         financeSubfields: candidateData.industry?.subfields || [],
//         softwareTools: candidateData.skills?.software || [],
//         certifications: candidateData.skills?.certifications || [],
//         email: candidateData.basicInfo?.email || candidateData.email,
//         phone: candidateData.basicInfo?.phone || 'No Phone',
//         photo: candidateData.basicInfo?.profilePhoto || candidateData.profilePhoto,
//         unlockedDate: new Date().toISOString(),
//         salaryExpectation: formatSalaryRange(candidateData.preferences?.salaryRange),
//         cvData: candidateData.cvData,
//         cvUrl: candidateData.cvUrl,
//         rawData: candidateData
//     };
// };

// // حساب درجة المطابقة
// const calculateMatchingScore = (candidate: any): number => {
//     let score = 0;

//     if (candidate.profileCompletion === 100) score += 30;
//     else if (candidate.profileCompletion >= 80) score += 20;
//     else if (candidate.profileCompletion >= 60) score += 10;

//     if (candidate.experience && candidate.experience.length > 0) score += 25;
//     if (candidate.education && candidate.education.length > 0) score += 20;

//     if (candidate.skills) {
//         const totalSkills = [
//             ...(candidate.skills.software || []),
//             ...(candidate.skills.technical || []),
//             ...(candidate.skills.certifications || [])
//         ].length;
//         score += Math.min(totalSkills * 2, 25);
//     }

//     return Math.min(score, 100);
// };

// // تنسيق الراتب
// const formatSalaryRange = (salaryRange: any): string => {
//     if (!salaryRange) return 'Not specified';

//     const { min, max, currency } = salaryRange;
//     if (min === 0 && max === 0) return 'Not specified';

//     return `${min} - ${max} ${currency}`;
// };

// export const ProfileModal: React.FC<ProfileModalProps> = ({
//     candidate: initialCandidate,
//     candidateId,
//     isOpen,
//     onClose,
//     onStartChat
// }) => {
//     const { currentUser } = useAuth();
//     const [candidate, setCandidate] = useState<TransformedCandidate | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [isActionsFixed, setIsActionsFixed] = useState(false);
//     const dialogContentRef = useRef<HTMLDivElement>(null);
//     const contentRef = useRef<HTMLDivElement>(null);

//     // Effect لتحميل البيانات
//     useEffect(() => {
//         const loadCandidate = async () => {
//             if (initialCandidate) {
//                 // إذا كان لدينا candidate مباشرة
//                 // const transformed = transformCandidateData(initialCandidate);
//                 setCandidate(initialCandidate);
//             } else if (candidateId) {
//                 // إذا كان لدينا ID فقط، نذهب لجلب البيانات
//                 setLoading(true);
//                 try {
//                     const candidateData = await fetchCandidateById(candidateId);
//                     if (candidateData) {
//                         const transformed = transformCandidateData(candidateData);
//                         setCandidate(transformed);
//                     } else {
//                         toast.error('Candidate not found');
//                         onClose();
//                     }
//                 } catch (error) {
//                     console.error('Error fetching candidate:', error);
//                     toast.error('Failed to load candidate profile');
//                     onClose();
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         if (isOpen) {
//             loadCandidate();
//         } else {
//             // Reset عندما يغلق المودال
//             setCandidate(null);
//         }
//     }, [isOpen, candidateId, initialCandidate, onClose]);

//     // Effect للتعامل مع التمرير
//     useEffect(() => {
//         const handleScroll = () => {
//             if (dialogContentRef.current && contentRef.current) {
//                 const scrollTop = dialogContentRef.current.scrollTop;
//                 const contentHeight = contentRef.current.offsetHeight;
//                 const dialogHeight = dialogContentRef.current.offsetHeight;

//                 // إذا كنا قرب النهاية، نثبت الأزرار
//                 setIsActionsFixed(scrollTop + dialogHeight >= contentHeight - 100);
//             }
//         };

//         const dialogContent = dialogContentRef.current;
//         if (dialogContent) {
//             dialogContent.addEventListener('scroll', handleScroll);
//             return () => dialogContent.removeEventListener('scroll', handleScroll);
//         }
//     }, [candidate]); // نضيف candidate ك dependency لأنها تتغير

//     // تحميل السيرة الذاتية
//     const handleDownloadCV = () => {
//         if (!candidate?.cvData) {
//             toast.warning('No CV available for this candidate');
//             return;
//         }

//         try {
//             const cvUrl = candidate.cvData.startsWith('http')
//                 ? candidate.cvData
//                 : `${IP}/${candidate.cvData}`;

//             const link = document.createElement('a');
//             link.href = cvUrl;
//             link.target = '_blank';
//             link.rel = 'noopener noreferrer';

//             const fileName = `CV_${candidate.name?.replace(/\s+/g, '_') || 'candidate'}.pdf`;
//             link.download = fileName;

//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);

//             toast.success('CV download started');
//         } catch (error) {
//             console.error('Error downloading CV:', error);
//             toast.error('Failed to download CV');
//         }
//     };

//     // تحميل البروفايل كـ PDF
//     const handleDownloadAsPDF = async () => {
//         if (!contentRef.current || !candidate) return;

//         try {
//             toast.info('Generating PDF...');

//             const content = contentRef.current;
//             const canvas = await html2canvas(content, {
//                 scale: 2,
//                 useCORS: true,
//                 logging: false,
//                 backgroundColor: '#ffffff'
//             });

//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a4');

//             const imgWidth = 210; // عرض A4 بالمليمتر
//             const pageHeight = 297; // ارتفاع A4 بالمليمتر
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             let heightLeft = imgHeight;
//             let position = 0;

//             pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;

//             while (heightLeft >= 0) {
//                 position = heightLeft - imgHeight;
//                 pdf.addPage();
//                 pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//                 heightLeft -= pageHeight;
//             }

//             const fileName = `Profile_${candidate.name?.replace(/\s+/g, '_') || 'candidate'}_${new Date().toISOString().split('T')[0]}.pdf`;
//             pdf.save(fileName);

//             toast.success('PDF downloaded successfully');
//         } catch (error) {
//             console.error('Error generating PDF:', error);
//             toast.error('Failed to generate PDF');
//         }
//     };

//     const handleChatClick = () => {
//         if (onStartChat && candidate) {
//             onStartChat(candidate);
//             onClose();
//         }
//     };

//     if (loading) {
//         return (
//             <Dialog open={isOpen} onOpenChange={onClose}>
//                 <DialogContent className="max-w-4xl">
//                     <div className="flex items-center justify-center h-64">
//                         <div className="text-center">
//                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
//                             <p className="mt-4 text-gray-600">Loading candidate profile...</p>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         );
//     }

//     if (!candidate) return null;

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent
//                 className="max-w-4xl max-h-[90vh] overflow-hidden"
//                 ref={dialogContentRef}
//             >
//                 <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
//                     <div className="flex items-center justify-between">
//                         <DialogTitle className="flex items-center gap-3">
//                             <Avatar className="w-12 h-12">
//                                 <AvatarImage src={candidate.photo} alt={candidate.name} />
//                                 <AvatarFallback>{candidate.name?.charAt(0)}</AvatarFallback>
//                             </Avatar>
//                             <div>
//                                 <div className="text-xl font-bold">{candidate.name}</div>
//                                 <div className="text-sm text-gray-600">{candidate.title}</div>
//                             </div>
//                         </DialogTitle>
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={onClose}
//                             className="h-8 w-8 p-0"
//                         >
//                             <X className="w-4 h-4" />
//                         </Button>
//                     </div>
//                     <DialogDescription>
//                         Full candidate profile and details
//                     </DialogDescription>
//                 </DialogHeader>

//                 {/* محتوى البروفايل */}
//                 <div
//                     className="overflow-y-auto max-h-[calc(90vh-200px)] pr-4"
//                     ref={contentRef}
//                 >
//                     <div className="space-y-6 pt-4">
//                         {/* Basic Information */}
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <User className="w-5 h-5" />
//                                     Basic Information
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="space-y-2">
//                                         <div className="flex items-center gap-2">
//                                             <Mail className="w-4 h-4 text-gray-500" />
//                                             <span className="font-medium">Email:</span>
//                                             <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
//                                                 {candidate.email}
//                                             </a>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Phone className="w-4 h-4 text-gray-500" />
//                                             <span className="font-medium">Phone:</span>
//                                             <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">
//                                                 {candidate.phone}
//                                             </a>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <MapPin className="w-4 h-4 text-gray-500" />
//                                             <span className="font-medium">Location:</span>
//                                             <span>{candidate.location}</span>
//                                         </div>
//                                     </div>
//                                     <div className="space-y-2">
//                                         <div className="flex items-center gap-2">
//                                             <Globe className="w-4 h-4 text-gray-500" />
//                                             <span className="font-medium">Visa Status:</span>
//                                             <span>{candidate.rawData?.preferences?.visaStatus || 'Not specified'}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Briefcase className="w-4 h-4 text-gray-500" />
//                                             <span className="font-medium">Work Type:</span>
//                                             <span>{candidate.rawData?.preferences?.workType || 'Not specified'}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <Calendar className="w-4 h-4 text-gray-500" />
//                                             <span className="font-medium">Notice Period:</span>
//                                             <span>{candidate.rawData?.preferences?.noticePeriod || 'Not specified'}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {candidate.rawData?.basicInfo?.linkedin && (
//                                     <div className="flex items-center gap-2">
//                                         <Linkedin className="w-4 h-4 text-blue-600" />
//                                         <span className="font-medium">LinkedIn:</span>
//                                         <a
//                                             href={candidate.rawData?.basicInfo.linkedin}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-600 hover:underline"
//                                         >
//                                             {candidate?.rawData?.basicInfo?.linkedin}
//                                         </a>
//                                     </div>
//                                 )}
//                             </CardContent>
//                         </Card>

//                         {/* Summary */}
//                         {candidate.rawData?.summary && (
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <BookOpen className="w-5 h-5" />
//                                         Professional Summary
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <p className="text-gray-700 whitespace-pre-line">{candidate.rawData?.summary}</p>
//                                 </CardContent>
//                             </Card>
//                         )}

//                         {/* Experience */}
//                         {candidate.rawData?.experience && candidate.rawData?.experience.length > 0 && (
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <Briefcase className="w-5 h-5" />
//                                         Work Experience
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     {candidate.rawData?.experience.map((exp: any, index: number) => (
//                                         <div key={index} className="border-l-4 border-blue-200 pl-4">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h4 className="font-semibold text-lg">{exp.title}</h4>
//                                                     <p className="text-gray-600">{exp.company} • {exp.location}</p>
//                                                 </div>
//                                                 <div className="text-right text-sm text-gray-500">
//                                                     <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
//                                                     {exp.current && (
//                                                         <Badge variant="outline" className="bg-green-50 text-green-700">
//                                                             Current
//                                                         </Badge>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             {exp.achievements && exp.achievements.length > 0 && (
//                                                 <ul className="mt-2 space-y-1">
//                                                     {exp.achievements.map((achievement: string, achIndex: number) => (
//                                                         <li key={achIndex} className="text-sm text-gray-700 flex items-start gap-2">
//                                                             <span className="text-blue-500 mt-1">•</span>
//                                                             {achievement}
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </CardContent>
//                             </Card>
//                         )}

//                         {/* Education */}
//                         {candidate.rawData?.education && candidate.rawData?.education.length > 0 && (
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <GraduationCap className="w-5 h-5" />
//                                         Education
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     {candidate.rawData?.education.map((edu: any, index: number) => (
//                                         <div key={index} className="border-l-4 border-green-200 pl-4">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <h4 className="font-semibold">{edu.degree}</h4>
//                                                     <p className="text-gray-600">{edu.institution}</p>
//                                                 </div>
//                                                 <div className="text-right text-sm text-gray-500">
//                                                     <p>{edu.startDate} - {edu.endDate}</p>
//                                                     {edu.gpa && <p>GPA: {edu.gpa}</p>}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </CardContent>
//                             </Card>
//                         )}

//                         {/* Skills */}
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <Code className="w-5 h-5" />
//                                     Skills & Technologies
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {candidate.rawData?.skills?.software && candidate.rawData?.skills.software.length > 0 && (
//                                         <div>
//                                             <h4 className="font-semibold mb-2 flex items-center gap-2">
//                                                 <Code className="w-4 h-4" />
//                                                 Software & Tools
//                                             </h4>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {candidate.rawData?.skills.software.map((skill: string, index: number) => (
//                                                     <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
//                                                         {skill}
//                                                     </Badge>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}

//                                     {candidate.rawData?.skills?.technical && candidate.rawData?.skills.technical.length > 0 && (
//                                         <div>
//                                             <h4 className="font-semibold mb-2 flex items-center gap-2">
//                                                 <Award className="w-4 h-4" />
//                                                 Technical Skills
//                                             </h4>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {candidate.rawData?.skills.technical.map((skill: string, index: number) => (
//                                                     <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
//                                                         {skill}
//                                                     </Badge>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {candidate.rawData?.skills?.certifications && candidate.rawData?.skills.certifications.length > 0 && (
//                                         <div>
//                                             <h4 className="font-semibold mb-2 flex items-center gap-2">
//                                                 <Award className="w-4 h-4" />
//                                                 Certifications
//                                             </h4>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {candidate.rawData?.skills.certifications.map((cert: string, index: number) => (
//                                                     <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
//                                                         {cert}
//                                                     </Badge>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}

//                                     {candidate.rawData?.skills?.languages && candidate.rawData?.skills.languages.length > 0 && (
//                                         <div>
//                                             <h4 className="font-semibold mb-2 flex items-center gap-2">
//                                                 <Languages className="w-4 h-4" />
//                                                 Languages
//                                             </h4>
//                                             <div className="flex flex-wrap gap-2">
//                                                 {candidate.rawData?.skills.languages.map((lang: string, index: number) => (
//                                                     <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700">
//                                                         {lang}
//                                                     </Badge>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </CardContent>
//                         </Card>

//                         {/* Industry & Preferences */}
//                         <Card>
//                             <CardHeader>
//                                 <CardTitle className="flex items-center gap-2">
//                                     <Building className="w-5 h-5" />
//                                     Industry & Preferences
//                                 </CardTitle>
//                             </CardHeader>
//                             <CardContent className="space-y-4">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <h4 className="font-semibold mb-2">Industries</h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {candidate.rawData?.industry?.industries?.map((industry: string, index: number) => (
//                                                 <Badge key={index} variant="outline">
//                                                     {industry}
//                                                 </Badge>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold mb-2">Subfields</h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {candidate.rawData?.industry?.subfields?.map((subfield: string, index: number) => (
//                                                 <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
//                                                     {subfield}
//                                                 </Badge>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <h4 className="font-semibold mb-2">Preferred Job Titles</h4>
//                                         <div className="flex flex-wrap gap-2">
//                                             {candidate.rawData?.preferences?.jobTitles?.map((title: string, index: number) => (
//                                                 <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
//                                                     {title}
//                                                 </Badge>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <h4 className="font-semibold mb-2">Salary Expectations</h4>
//                                         <p className="text-gray-700">
//                                             {formatSalaryRange(candidate.rawData?.preferences?.salaryRange)}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </div>

//                 {/* الأزرار الثابتة */}
//                 <div className={`sticky bottom-0 bg-white pt-4 border-t mt-4 transition-all duration-300 ${isActionsFixed ? 'shadow-lg' : ''}`}>
//                     <div className="flex justify-end gap-3">
//                         <Button
//                             variant="outline"
//                             onClick={handleDownloadAsPDF}
//                             className="flex items-center gap-2"
//                         >
//                             <Download className="w-4 h-4" />
//                             Download as PDF
//                         </Button>

//                         <Button
//                             variant="outline"
//                             onClick={handleDownloadCV}
//                             disabled={!candidate.cvData}
//                             className="flex items-center gap-2"
//                         >
//                             <FileText className="w-4 h-4" />
//                             Download CV
//                         </Button>

//                         {currentUser && onStartChat && (
//                             <Button
//                                 onClick={handleChatClick}
//                                 className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
//                             >
//                                 <MessageSquare className="w-4 h-4" />
//                                 Start Chat
//                             </Button>
//                         )}

//                         <Button
//                             onClick={onClose}
//                             variant="outline"
//                             className="flex items-center gap-2"
//                         >
//                             Close
//                         </Button>
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ProfileModal;













// components/ProfileModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Briefcase,
    Calendar,
    Linkedin,
    BookOpen,
    GraduationCap,
    Code,
    Award,
    Languages,
    Building,
    FileText,
    X,
    MessageSquare,
    Download,
    VideoIcon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { IP } from '@/store/Path';
import { toast } from 'sonner';
import { fetchCandidateById } from '@/services/cadidatesService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ChatPopup from '../Chat/ChatPopup';

interface ProfileModalProps {
    candidate?: any; // Optional - Preloaded data
    candidateId?: string; // Optional - Only ID
    isOpen: boolean;
    onClose: () => void;
    onStartChat?: (candidate: any) => void; // Optional - For external chat handling
}

// Interface for transformed data
interface TransformedCandidate {
    id: string;
    name: string;
    title: string;
    location: string;
    country: string;
    experience: string;
    score: number;
    status: string;
    industryExperience: string[];
    financeSubfields: string[];
    softwareTools: string[];
    certifications: string[];
    email: string;
    phone: string;
    photo: string;
    unlockedDate: string;
    salaryExpectation: string;
    cvData?: string;
    cvUrl?: string;
    rawData: any;
    videoUrl: string;
}

// Helper function to ensure data is an array
const safeArray = (data: any): any[] => {
    if (Array.isArray(data)) return data;
    return [];
};

// User icon component
const User = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

// Transform candidate data
const transformCandidateData = (candidateData: any): TransformedCandidate | null => {
    if (!candidateData) return null;

    const location = candidateData.basicInfo?.location || 'Unknown Location';
    const country = location.split(',')?.[1]?.trim() || 'EG';
    const experienceArray = safeArray(candidateData.experience);
    const jobTitlesArray = safeArray(candidateData.preferences?.jobTitles);

    return {
        id: candidateData.uid || candidateData.id,
        name: candidateData.basicInfo?.fullName || 'Unknown Candidate',
        title: candidateData.basicInfo?.role ||
            (jobTitlesArray.length > 0 ? jobTitlesArray[0] : 'No Title'),
        location: location,
        country: country,
        experience: experienceArray.length > 0 ? experienceArray[0]?.title : 'No Experience',
        score: calculateMatchingScore(candidateData),
        status: 'Available',
        industryExperience: safeArray(candidateData.industry?.industries),
        financeSubfields: safeArray(candidateData.industry?.subfields),
        softwareTools: safeArray(candidateData.skills?.software),
        certifications: safeArray(candidateData.skills?.certifications),
        email: candidateData.basicInfo?.email || candidateData.email,
        phone: candidateData.basicInfo?.phone || 'No Phone',
        photo: candidateData.basicInfo?.profilePhoto || candidateData.profilePhoto,
        unlockedDate: new Date().toISOString(),
        salaryExpectation: formatSalaryRange(candidateData.preferences?.salaryRange),
        cvData: candidateData.cvData,
        cvUrl: candidateData.cvUrl,
        rawData: candidateData,
        videoUrl: candidateData.video?.videoUrl
    };
};

// Calculate matching score
const calculateMatchingScore = (candidate: any): number => {
    let score = 0;

    if (candidate.profileCompletion === 100) score += 30;
    else if (candidate.profileCompletion >= 80) score += 20;
    else if (candidate.profileCompletion >= 60) score += 10;

    if (Array.isArray(candidate.experience) && candidate.experience.length > 0) score += 25;
    if (Array.isArray(candidate.education) && candidate.education.length > 0) score += 20;

    if (candidate.skills) {
        const totalSkills = [
            ...safeArray(candidate.skills.software),
            ...safeArray(candidate.skills.technical),
            ...safeArray(candidate.skills.certifications)
        ].length;
        score += Math.min(totalSkills * 2, 25);
    }

    return Math.min(score, 100);
};

// Format salary range
const formatSalaryRange = (salaryRange: any): string => {
    if (!salaryRange) return 'Not specified';

    const { min, max, currency } = salaryRange;
    if (min === 0 && max === 0) return 'Not specified';

    return `${min} - ${max} ${currency}`;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
    candidate: initialCandidate,
    candidateId,
    isOpen,
    onClose,
    onStartChat
}) => {
    const { currentUser } = useAuth();
    const [candidate, setCandidate] = useState<TransformedCandidate | null>(null);
    const [loading, setLoading] = useState(false);
    const [isActionsFixed, setIsActionsFixed] = useState(false);
    const [showChatPopup, setShowChatPopup] = useState(false);
    const dialogContentRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    console.log('candidateId ========= >',candidateId)
    // Effect to load candidate data
    useEffect(() => {
        const loadCandidate = async () => {
            if (initialCandidate) {
                // const transformed = transformCandidateData(initialCandidate);
                setCandidate(initialCandidate);
            } else if (candidateId) {
                setLoading(true);
                try {
                    const candidateData = await fetchCandidateById(candidateId);
                    if (candidateData) {
                        const transformed = transformCandidateData(candidateData);
                        setCandidate(transformed);
                    } else {
                        toast.error('Candidate not found');
                        onClose();
                    }
                } catch (error) {
                    console.error('Error fetching candidate:', error);
                    toast.error('Failed to load candidate profile');
                    onClose();
                } finally {
                    setLoading(false);
                }
            }
        };

        if (isOpen) {
            loadCandidate();
        } else {
            setCandidate(null);
            setShowChatPopup(false); // Close chat popup when modal closes
        }
    }, [isOpen, candidateId, initialCandidate, onClose]);

    // Effect for scroll handling
    useEffect(() => {
        const handleScroll = () => {
            if (dialogContentRef.current && contentRef.current) {
                const scrollTop = dialogContentRef.current.scrollTop;
                const contentHeight = contentRef.current.offsetHeight;
                const dialogHeight = dialogContentRef.current.offsetHeight;

                setIsActionsFixed(scrollTop + dialogHeight >= contentHeight - 100);
            }
        };

        const dialogContent = dialogContentRef.current;
        if (dialogContent) {
            dialogContent.addEventListener('scroll', handleScroll);
            return () => dialogContent.removeEventListener('scroll', handleScroll);
        }
    }, [candidate]);

    // Handle CV download
    const handleDownloadCV = () => {
        if (!candidate?.cvData) {
            toast.warning('No CV available for this candidate');
            return;
        }

        try {
            const cvUrl = candidate.cvData.startsWith('http')
                ? candidate.cvData
                : `${IP}/${candidate.cvData}`;

            const link = document.createElement('a');
            link.href = cvUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            const fileName = `CV_${candidate.name?.replace(/\s+/g, '_') || 'candidate'}.pdf`;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success('CV download started');
        } catch (error) {
            console.error('Error downloading CV:', error);
            toast.error('Failed to download CV');
        }
    };

    // Handle PDF download (captures entire content)
    const handleDownloadAsPDF = async () => {
        if (!candidate) return;

        try {
            toast.info('Generating PDF...');

            // Create a temporary container with all content
            const tempContainer = document.createElement('div');
            tempContainer.style.width = '800px';
            tempContainer.style.padding = '20px';
            tempContainer.style.backgroundColor = '#ffffff';

            // Clone the entire content
            const content = contentRef.current;
            if (content) {
                const clone = content.cloneNode(true) as HTMLElement;
                clone.style.overflow = 'visible';
                clone.style.maxHeight = 'none';
                tempContainer.appendChild(clone);

                // Add header with candidate info
                const header = document.createElement('div');
                header.style.marginBottom = '20px';
                header.style.borderBottom = '2px solid #e5e7eb';
                header.style.paddingBottom = '20px';
                header.innerHTML = `
                    <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">${candidate.name}</h1>
                    <h2 style="font-size: 18px; color: #6b7280; margin-bottom: 16px;">${candidate.title}</h2>
                    <p style="font-size: 14px; color: #374151;">Generated on ${new Date().toLocaleDateString()}</p>
                `;
                tempContainer.insertBefore(header, tempContainer.firstChild);

                document.body.appendChild(tempContainer);

                const canvas = await html2canvas(tempContainer, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });

                document.body.removeChild(tempContainer);

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');

                const imgWidth = 190; // A4 width minus margins
                const pageHeight = 277; // A4 height minus margins
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                let heightLeft = imgHeight;
                let position = 10; // Top margin

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                const fileName = `Profile_${candidate.name?.replace(/\s+/g, '_') || 'candidate'}_${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(fileName);

                toast.success('PDF downloaded successfully');
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF');
        }
    };


    // Handle chat click

    const handleChatClick = () => {
        if (onStartChat && candidate) {
            // If external chat handler is provided

            //  setShowChatPopup(true);
            onStartChat(candidate);
            onClose();
        } else if (candidate && currentUser) {
            // Open internal chat popup
            setShowChatPopup(true);
            onClose();
        }
    };

    const handleCloseChatPopup = () => {
        setShowChatPopup(false);
    };

    // const handleChatClick = () => {
    //     if (onStartChat && candidate) {
    //         // If external chat handler is provided
    //                 setShowChatPopup(true);
    //         onStartChat(candidate);
    //         onClose();
    //     } else if (candidate && currentUser) {
    //         // Open internal chat popup
    //         setShowChatPopup(true);
    //     }
    // };

    // // Handle chat popup close
    // const handleCloseChatPopup = () => {
    //     setShowChatPopup(false);
    // };

    if (loading) {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading candidate profile...</p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!candidate) return null;

    // Extract arrays from raw data for easier access
    const experienceArray = safeArray(candidate.rawData?.experience);
    const educationArray = safeArray(candidate.rawData?.education);
    const softwareArray = safeArray(candidate.rawData?.skills?.software);
    const technicalArray = safeArray(candidate.rawData?.skills?.technical);
    const certificationsArray = safeArray(candidate.rawData?.skills?.certifications);
    const languagesArray = safeArray(candidate.rawData?.skills?.languages);
    const industriesArray = safeArray(candidate.rawData?.industry?.industries);
    const subfieldsArray = safeArray(candidate.rawData?.industry?.subfields);
    const jobTitlesArray = safeArray(candidate.rawData?.preferences?.jobTitles);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent
                    className="max-w-4xl max-h-[90vh] overflow-hidden"
                    ref={dialogContentRef}
                >
                    <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={candidate.photo} alt={candidate.name} />
                                    <AvatarFallback>{candidate.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-xl font-bold">{candidate.name}</div>
                                    <div className="text-sm text-gray-600">{candidate.title}</div>
                                </div>
                            </DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="h-8 w-8 p-0"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <DialogDescription>
                            Full candidate profile and details
                        </DialogDescription>
                    </DialogHeader>

                    <div
                        className="overflow-y-auto max-h-[calc(90vh-200px)] pr-4"
                        ref={contentRef}
                    >
                        <div className="space-y-6 pt-4">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Basic Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">Email:</span>
                                                <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">
                                                    {candidate.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">Phone:</span>
                                                <a href={`tel:${candidate.phone}`} className="text-blue-600 hover:underline">
                                                    {candidate.phone}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">Location:</span>
                                                <span>{candidate.location}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">Visa Status:</span>
                                                <span>{candidate.rawData?.preferences?.visaStatus || 'Not specified'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">Work Type:</span>
                                                <span>{candidate.rawData?.preferences?.workType || 'Not specified'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-500" />
                                                <span className="font-medium">Notice Period:</span>
                                                <span>{candidate.rawData?.preferences?.noticePeriod || 'Not specified'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {candidate.rawData?.basicInfo?.linkedin && (
                                        <div className="flex items-center gap-2">
                                            <Linkedin className="w-4 h-4 text-blue-600" />
                                            <span className="font-medium">LinkedIn:</span>
                                            <a
                                                href={candidate.rawData.basicInfo.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {candidate.rawData.basicInfo.linkedin}
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Vedio */}

                            {candidate.videoUrl && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <VideoIcon className="w-5 h-5" />
                                            Introduction Video
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>

                                        <video
                                            src={`${IP}${candidate.videoUrl}`}
                                            controls
                                            className="w-full rounded-lg"
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Summary */}
                            {candidate.rawData?.summary && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" />
                                            Professional Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 whitespace-pre-line">{candidate.rawData.summary}</p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Experience */}
                            {experienceArray.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Briefcase className="w-5 h-5" />
                                            Work Experience
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {experienceArray.map((exp: any, index: number) => (
                                            <div key={index} className="border-l-4 border-blue-200 pl-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold text-lg">{exp.title}</h4>
                                                        <p className="text-gray-600">{exp.company} • {exp.location}</p>
                                                    </div>
                                                    <div className="text-right text-sm text-gray-500">
                                                        <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                                                        {exp.current && (
                                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                                Current
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                                                    <ul className="mt-2 space-y-1">
                                                        {exp.achievements.map((achievement: string, achIndex: number) => (
                                                            <li key={achIndex} className="text-sm text-gray-700 flex items-start gap-2">
                                                                <span className="text-blue-500 mt-1">•</span>
                                                                {achievement}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Education */}
                            {educationArray.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <GraduationCap className="w-5 h-5" />
                                            Education
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {educationArray.map((edu: any, index: number) => (
                                            <div key={index} className="border-l-4 border-green-200 pl-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold">{edu.degree}</h4>
                                                        <p className="text-gray-600">{edu.institution}</p>
                                                    </div>
                                                    <div className="text-right text-sm text-gray-500">
                                                        <p>{edu.startDate} - {edu.endDate}</p>
                                                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Skills */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Code className="w-5 h-5" />
                                        Skills & Technologies
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {softwareArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Code className="w-4 h-4" />
                                                    Software & Tools
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {softwareArray.map((skill: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {technicalArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Award className="w-4 h-4" />
                                                    Technical Skills
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {technicalArray.map((skill: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {certificationsArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Award className="w-4 h-4" />
                                                    Certifications
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {certificationsArray.map((cert: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                                                            {cert}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {languagesArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Languages className="w-4 h-4" />
                                                    Languages
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {languagesArray.map((lang: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700">
                                                            {lang}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Industry & Preferences */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building className="w-5 h-5" />
                                        Industry & Preferences
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {industriesArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Industries</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {industriesArray.map((industry: string, index: number) => (
                                                        <Badge key={index} variant="outline">
                                                            {industry}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {subfieldsArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Subfields</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {subfieldsArray.map((subfield: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                                                            {subfield}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {jobTitlesArray.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Preferred Job Titles</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {jobTitlesArray.map((title: string, index: number) => (
                                                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                                                            {title}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <h4 className="font-semibold mb-2">Salary Expectations</h4>
                                            <p className="text-gray-700">
                                                {formatSalaryRange(candidate.rawData?.preferences?.salaryRange)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Fixed Actions Bar */}
                    <div className={`sticky bottom-0 bg-white pt-4 border-t mt-4 transition-all duration-300 ${isActionsFixed ? 'shadow-lg' : ''}`}>
                        <div className="flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={handleDownloadAsPDF}
                                className="flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Profile as PDF
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleDownloadCV}
                                disabled={!candidate.cvData}
                                className="flex items-center gap-2"
                            >
                                <FileText className="w-4 h-4" />
                                Download CV
                            </Button>

                            {currentUser && (
                                <Button
                                    onClick={handleChatClick}
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Start Chat
                                </Button>
                            )}

                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="flex items-center gap-2"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Chat Popup */}
            {candidate && currentUser && showChatPopup && (
                <ChatPopup
                    currentUserId={currentUser.uid}
                    otherUserId={candidate.id}
                    profilePhoto={candidate.photo}
                    otherUserName={candidate.name}
                    otherUserTitle={candidate.title}
                    isOpen={showChatPopup}
                    onClose={handleCloseChatPopup}
                />
            )}
        </>
    );
};

export default ProfileModal;