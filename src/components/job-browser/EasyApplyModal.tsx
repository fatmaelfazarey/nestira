
// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   FileText,
//   Upload,
//   Briefcase,
//   DollarSign,
//   TrendingUp,
//   X,
//   Send,
//   CheckCircle,
//   Mic,
//   Video,
//   MessageSquare,
//   Edit
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { applyForJob } from "@/store/candidate store/store";

// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   matchScore: number;
// }

// interface EasyApplyModalProps {
//   job: Job | null;
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (jobId: number) => void;
// }

// // Mock profile data - in real app, this would come from profile context/API
// const mockProfileData = {
//   fullName: "Sarah Johnson",
//   email: "sarah.johnson@email.com",
//   phone: "+971 50 123 4567",
//   location: "Dubai, UAE",
//   resume: "Sarah_Johnson_Resume.pdf",
//   preferredTitles: ["Financial Analyst", "Investment Analyst", "Risk Analyst"],
//   expectedSalary: "AED 15,000 - 22,000",
//   workMode: "Hybrid",
//   summary: "Experienced financial analyst with 5+ years in investment banking and risk management. CFA Level 2 candidate with expertise in financial modeling and market analysis.",
//   skills: ["Financial Modeling", "Excel/VBA", "Risk Assessment", "Bloomberg Terminal", "Python"],
//   certifications: ["CFA Level 1", "FRM Part 1"],
//   availability: "Available immediately"
// };

// export function EasyApplyModal({ job, open, onClose, onSubmit }: EasyApplyModalProps) {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     fullName: mockProfileData.fullName,
//     email: mockProfileData.email,
//     phone: mockProfileData.phone,
//     location: mockProfileData.location,
//     message: "",
//     messageType: "text" as "text" | "voice" | "video",
//     consent: false
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [applicationError, setApplicationError] = useState<string | null>(null);

//   if (!job) return null;



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.consent) {
//       toast({
//         title: "Consent Required",
//         description: "Please consent to share your profile with the recruiter",
//         variant: "destructive",
//       });
//       return;
//     }

//     const apply = await applyForJob(job.id, formData, setApplicationError)
//     console.log('formData : ', formData)
//     if (apply.success) {
//       toast({
//         title: "✅ Application Sent Successfully!",
//         description: `Your application for ${job.title} at ${job.company} has been submitted.`,
//       });
//     } else {
//       toast({
//         title: "Faild to apply!",
//         description: applicationError,
//       });
//     }

//     setIsSubmitting(true);

//     // Simulate API call
//     // await new Promise(resolve => setTimeout(resolve, 1500));

//     onSubmit(job.id);
//     onClose();

//     // toast({
//     //   title: "✅ Application Sent Successfully!",
//     //   description: `Your application for ${job.title} at ${job.company} has been submitted.`,
//     // });

//     setIsSubmitting(false);
//   };

//   const getMatchScoreColor = (score: number) => {
//     if (score >= 85) return "text-success";
//     if (score >= 60) return "text-warning";
//     return "text-destructive";
//   };

//   const handleMessageTypeChange = (type: "text" | "voice" | "video") => {
//     setFormData(prev => ({ ...prev, messageType: type, message: "" }));
//   };

//   const handleEditProfile = () => {
//     // Navigate to profile page
//     window.location.href = '/profile';
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader className="space-y-4">
//           <div className="flex items-center justify-between">
//             <DialogTitle className="text-xl font-semibold">
//               Easy Apply
//             </DialogTitle>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClose}
//               className="hover:bg-secondary-c/10"
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Match Score */}
//           <div className="flex items-center justify-center">
//             <Badge
//               className={`${getMatchScoreColor(job.matchScore)} bg-background border-2 px-4 py-2 text-sm font-semibold`}
//             >
//               <TrendingUp className="w-4 h-4 mr-2" />
//               {job.matchScore}% Match for this role
//             </Badge>
//           </div>

//           <div className="text-center">
//             <p className="text-muted-c-foreground">
//               Applying for <span className="font-medium text-foreground">{job.title}</span> at{" "}
//               <span className="font-medium text-foreground">{job.company}</span>
//             </p>
//           </div>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//                 <User className="w-5 h-5 text-primary-c" />
//                 Basic Information
//               </h3>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={handleEditProfile}
//                 className="flex items-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit Profile
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="location">Location</Label>
//                 <Input
//                   id="location"
//                   value={formData.location}
//                   onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Resume Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//               <FileText className="w-5 h-5 text-primary-c" />
//               Resume
//             </h3>

//             <div className="flex items-center justify-between p-4 bg-muted-c/30 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <FileText className="w-8 h-8 text-primary-c" />
//                 <div>
//                   <p className="font-medium text-foreground">{mockProfileData.resume}</p>
//                   <p className="text-sm text-muted-c-foreground">Last updated: Jan 15, 2024</p>
//                 </div>
//               </div>
//               <Button variant="outline" size="sm" type="button">
//                 <Upload className="w-4 h-4 mr-2" />
//                 Replace
//               </Button>
//             </div>
//           </div>

//           <Separator />

//           {/* Job Preferences */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//               <Briefcase className="w-5 h-5 text-primary-c" />
//               Job Preferences
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Preferred Titles</Label>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                   {mockProfileData.preferredTitles.slice(0, 2).map((title) => (
//                     <Badge key={title} variant="secondary-c" className="text-xs">
//                       {title}
//                     </Badge>
//                   ))}
//                   {mockProfileData.preferredTitles?.length > 2 && (
//                     <Badge variant="secondary-c" className="text-xs">
//                       +{mockProfileData.preferredTitles.length - 2} more
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Expected Salary</Label>
//                 <p className="text-sm font-medium text-foreground mt-2">{mockProfileData.expectedSalary}</p>
//               </div>
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Work Mode</Label>
//                 <p className="text-sm font-medium text-foreground mt-2">{mockProfileData.workMode}</p>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Quick Preview */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground">Quick Preview</h3>

//             <div className="bg-muted-c/30 rounded-lg p-4 space-y-3">
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Professional Summary</Label>
//                 <p className="text-sm text-foreground mt-1">{mockProfileData.summary}</p>
//               </div>

//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Key Skills</Label>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                   {mockProfileData.skills.slice(0, 5).map((skill) => (
//                     <Badge key={skill} variant="outline" className="text-xs">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Certifications</Label>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                   {mockProfileData.certifications.map((cert) => (
//                     <Badge key={cert} className="text-xs bg-primary-c/20 text-primary-c">
//                       {cert}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Availability</Label>
//                 <p className="text-sm font-medium text-success mt-1">{mockProfileData.availability}</p>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Message to Recruiter */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//               <Mail className="w-5 h-5 text-primary-c" />
//               Message to Recruiter
//             </h3>

//             {/* Message Type Selection */}
//             <div className="flex items-center gap-2 mb-4">
//               <Button
//                 type="button"
//                 variant={formData.messageType === "text" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleMessageTypeChange("text")}
//                 className="flex items-center gap-2"
//               >
//                 <MessageSquare className="w-4 h-4" />
//                 Text
//               </Button>
//               <Button
//                 type="button"
//                 variant={formData.messageType === "voice" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleMessageTypeChange("voice")}
//                 className="flex items-center gap-2"
//               >
//                 <Mic className="w-4 h-4" />
//                 Voice Note
//               </Button>
//               <Button
//                 type="button"
//                 variant={formData.messageType === "video" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleMessageTypeChange("video")}
//                 className="flex items-center gap-2"
//               >
//                 <Video className="w-4 h-4" />
//                 Video
//               </Button>
//             </div>

//             {/* Message Input Based on Type */}
//             <div className="space-y-2">
//               {formData.messageType === "text" && (
//                 <Textarea
//                   placeholder="Write your message to the recruiter..."
//                   value={formData.message}
//                   onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
//                   rows={3}
//                   className="bg-muted-c/30"
//                 />
//               )}

//               {formData.messageType === "voice" && (
//                 <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
//                   <div className="text-center">
//                     <Mic className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-c-foreground mb-4">Record a voice message</p>
//                     <Button type="button" variant="outline" size="sm">
//                       <Mic className="w-4 h-4 mr-2" />
//                       Start Recording
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {formData.messageType === "video" && (
//                 <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
//                   <div className="text-center">
//                     <Video className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-c-foreground mb-4">Record a video message</p>
//                     <Button type="button" variant="outline" size="sm">
//                       <Video className="w-4 h-4 mr-2" />
//                       Start Recording
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <Separator />

//           {/* Consent */}
//           <div className="flex items-start space-x-2">
//             <Checkbox
//               id="consent"
//               checked={formData.consent}
//               onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
//             />
//             <div className="grid gap-1.5 leading-none">
//               <Label
//                 htmlFor="consent"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 I consent to share my profile and documents with the recruiter
//               </Label>
//               <p className="text-xs text-muted-c-foreground">
//                 Your information will only be shared with the hiring company for this specific role.
//               </p>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center gap-3 pt-4">
//             <Button
//               type="submit"
//               disabled={!formData.consent || isSubmitting}
//               className="flex-1 bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
//                   Sending Application...
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Application
//                 </>
//               )}
//             </Button>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

//#region stable but not view mode


// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   FileText,
//   Upload,
//   Briefcase,
//   DollarSign,
//   TrendingUp,
//   X,
//   Send,
//   CheckCircle,
//   Mic,
//   Video,
//   MessageSquare,
//   Edit,
//   Trash2
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { applyForJob } from "@/store/candidate store/store";
// import { useAuth } from "@/contexts/AuthContext";

// interface Job {
//   id: number;
//   title: string;
//   company: string;
//   matchScore: number;
// }

// interface EasyApplyModalProps {
//   job: Job | null;
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (jobId: number) => void;
//   isView: Boolean
// }



// export function EasyApplyModal({ job, open, onClose, onSubmit, isView = false }: EasyApplyModalProps) {
//   const { currentUser, userData, loading, updateUserProfile } = useAuth();
//   console.log('userData : ', userData)
//   console.log('currentUser : ', currentUser)
//   if (isView) {
//     console.log('-----JOB----:', job)
//   }


//   // Mock profile data - in real app, this would come from profile context/API
//   const mockProfileData = {
//     fullName: userData.basicInfo.fullName || '',
//     email: userData.basicInfo.email || '',
//     phone: userData.basicInfo.phone || '',
//     location: userData.basicInfo.location || '',
//     resume: userData.cv_file || "Upload your CV in PDF format",
//     preferredTitles: userData?.preferences?.jobTitles || [],
//     expectedSalary: userData?.preferences?.salaryRange?.min + ' - ' + userData?.preferences?.salaryRange?.max + ' ' + userData?.preferences?.salaryRange?.currency || "AED 15,000 - 22,000",
//     workMode: userData?.preferences?.workType || "Hybrid",
//     summary: userData.summary,
//     skills: userData?.skills?.technical,
//     certifications: userData?.skills?.certifications,
//     availability: "Available immediately"
//   };
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     fullName: mockProfileData.fullName,
//     email: mockProfileData.email,
//     phone: mockProfileData.phone,
//     location: mockProfileData.location,
//     message: "",
//     messageType: "text" as "text" | "voice" | "video",
//     consent: false,
//     resume: mockProfileData.resume,
//     resumeFile: null as File | null
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [applicationError, setApplicationError] = useState<string | null>(null);

//   if (!job) return null;

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Validate file type
//       const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//       if (!allowedTypes.includes(file.type)) {
//         toast({
//           title: "Invalid File Type",
//           description: "Please upload a PDF or Word document",
//           variant: "destructive",
//         });
//         return;
//       }

//       // Validate file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         toast({
//           title: "File Too Large",
//           description: "Please upload a file smaller than 5MB",
//           variant: "destructive",
//         });
//         return;
//       }

//       setFormData(prev => ({
//         ...prev,
//         resume: file.name,
//         resumeFile: file
//       }));

//       toast({
//         title: "✅ Resume Updated",
//         description: `${file.name} has been successfully uploaded`,
//       });
//     }
//   };

//   const handleRemoveResume = () => {
//     setFormData(prev => ({
//       ...prev,
//       resume: mockProfileData.resume,
//       resumeFile: null
//     }));

//     toast({
//       title: "Resume Removed",
//       description: "Default resume has been restored",
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.consent) {
//       toast({
//         title: "Consent Required",
//         description: "Please consent to share your profile with the recruiter",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Create FormData for file upload
//       const formDataToSend = new FormData();
//       formDataToSend.append('jobId', job.id.toString());
//       formDataToSend.append('fullName', formData.fullName);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('phone', formData.phone);
//       formDataToSend.append('location', formData.location);
//       formDataToSend.append('messageType', formData.messageType);
//       formDataToSend.append('message_text', formData.message);
//       formDataToSend.append('consent', formData.consent.toString());

//       // Append resume file if uploaded
//       if (formData.resumeFile) {
//         formDataToSend.append('cv_file', formData.resumeFile);
//       } else if (formData.resume) {
//         // If no new file, send the existing resume filename
//         formDataToSend.append('cv_filename', formData.resume);
//       }

//       // Call applyForJob with FormData object
//       const apply = await applyForJob(job.id, formDataToSend, setApplicationError);

//       console.log('Application submitted for job:', job.id);

//       if (apply?.success) {
//         toast({
//           title: "✅ Application Sent Successfully!",
//           description: `Your application for ${job.title} at ${job.company} has been submitted.`,
//         });
//         onSubmit(job.id);
//         onClose();
//       } else {
//         toast({
//           title: "Failed to apply!",
//           description: applicationError || "An error occurred while submitting your application",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error('Application error:', error.message);
//       toast({
//         title: "Application Failed",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getMatchScoreColor = (score: number) => {
//     if (score >= 85) return "text-success";
//     if (score >= 60) return "text-warning";
//     return "text-destructive";
//   };

//   const handleMessageTypeChange = (type: "text" | "voice" | "video") => {
//     setFormData(prev => ({ ...prev, messageType: type, message: "" }));
//   };

//   const handleEditProfile = () => {
//     // Navigate to profile page
//     window.location.href = 'profile';
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader className="space-y-4">
//           <div className="flex items-center justify-between">
//             <DialogTitle className="text-xl font-semibold">
//               Easy Apply
//             </DialogTitle>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={onClose}
//               className="hover:bg-secondary-c/10"
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Match Score */}
//           <div className="flex items-center justify-center">
//             <Badge
//               className={`${getMatchScoreColor(job.matchScore)} bg-background border-2 px-4 py-2 text-sm font-semibold`}
//             >
//               <TrendingUp className="w-4 h-4 mr-2" />
//               {job.matchScore}% Match for this role
//             </Badge>
//           </div>

//           <div className="text-center">
//             <p className="text-muted-c-foreground">
//               Applying for <span className="font-medium text-foreground">{job.title}</span> at{" "}
//               <span className="font-medium text-foreground">{job.company}</span>
//             </p>
//           </div>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Info Section */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//                 <User className="w-5 h-5 text-primary-c" />
//                 Basic Information
//               </h3>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={handleEditProfile}
//                 className="flex items-center gap-2"
//               >
//                 <Edit className="w-4 h-4" />
//                 Edit Profile
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="location">Location</Label>
//                 <Input
//                   id="location"
//                   value={formData.location}
//                   onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
//                   className="bg-muted-c/30"
//                 />
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Resume Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//               <FileText className="w-5 h-5 text-primary-c" />
//               Resume
//             </h3>

//             <div className="flex items-center justify-between p-4 bg-muted-c/30 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <FileText className="w-8 h-8 text-primary-c" />
//                 <div>
//                   <p className="font-medium text-foreground">{formData.resume}</p>
//                   <p className="text-sm text-muted-c-foreground">
//                     {formData.resumeFile ?
//                       `New upload: ${(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB` :
//                       "Last updated: Jan 15, 2024"}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Input
//                   type="file"
//                   id="resume-upload"
//                   accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                 />
//                 <Label htmlFor="resume-upload" className="cursor-pointer">
//                   <Button variant="outline" size="sm" type="button" asChild>
//                     <span>
//                       <Upload className="w-4 h-4 mr-2" />
//                       {formData.resumeFile ? "Change" : "Replace"}
//                     </span>
//                   </Button>
//                 </Label>
//                 {formData.resumeFile && (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     type="button"
//                     onClick={handleRemoveResume}
//                     className="text-destructive hover:text-destructive"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 )}
//               </div>
//             </div>

//             <div className="text-xs text-muted-c-foreground">
//               <p>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
//             </div>
//           </div>

//           <Separator />

//           {/* Job Preferences */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//               <Briefcase className="w-5 h-5 text-primary-c" />
//               Job Preferences
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Preferred Titles</Label>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                   {mockProfileData.preferredTitles.slice(0, 2).map((title) => (
//                     <Badge key={title} variant="secondary-c" className="text-xs">
//                       {title}
//                     </Badge>
//                   ))}
//                   {mockProfileData.preferredTitles?.length > 2 && (
//                     <Badge variant="secondary-c" className="text-xs">
//                       +{mockProfileData.preferredTitles.length - 2} more
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Expected Salary</Label>
//                 <p className="text-sm font-medium text-foreground mt-2">{mockProfileData.expectedSalary}</p>
//               </div>
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Work Mode</Label>
//                 <p className="text-sm font-medium text-foreground mt-2">{mockProfileData.workMode}</p>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Quick Preview */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground">Quick Preview</h3>

//             <div className="bg-muted-c/30 rounded-lg p-4 space-y-3">
//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Professional Summary</Label>
//                 <p className="text-sm text-foreground mt-1">{mockProfileData.summary}</p>
//               </div>

//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Key Skills</Label>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                   {mockProfileData?.skills?.slice(0, 5).map((skill) => (
//                     <Badge key={skill} variant="outline" className="text-xs">
//                       {skill}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Certifications</Label>
//                 <div className="flex flex-wrap gap-1 mt-2">
//                   {mockProfileData.certifications?.map((cert) => (
//                     <Badge key={cert} className="text-xs bg-primary-c/20 text-primary-c">
//                       {cert}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <Label className="text-sm text-muted-c-foreground">Availability</Label>
//                 <p className="text-sm font-medium text-success mt-1">{mockProfileData.availability}</p>
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Message to Recruiter */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
//               <Mail className="w-5 h-5 text-primary-c" />
//               Message to Recruiter
//             </h3>

//             {/* Message Type Selection */}
//             <div className="flex items-center gap-2 mb-4">
//               <Button
//                 type="button"
//                 variant={formData.messageType === "text" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleMessageTypeChange("text")}
//                 className="flex items-center gap-2"
//               >
//                 <MessageSquare className="w-4 h-4" />
//                 Text
//               </Button>
//               <Button
//                 type="button"
//                 variant={formData.messageType === "voice" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleMessageTypeChange("voice")}
//                 className="flex items-center gap-2"
//               >
//                 <Mic className="w-4 h-4" />
//                 Voice Note
//               </Button>
//               <Button
//                 type="button"
//                 variant={formData.messageType === "video" ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => handleMessageTypeChange("video")}
//                 className="flex items-center gap-2"
//               >
//                 <Video className="w-4 h-4" />
//                 Video
//               </Button>
//             </div>

//             {/* Message Input Based on Type */}
//             <div className="space-y-2">
//               {formData.messageType === "text" && (
//                 <Textarea
//                   placeholder="Write your message to the recruiter..."
//                   value={formData.message}
//                   onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
//                   rows={3}
//                   className="bg-muted-c/30"
//                 />
//               )}

//               {formData.messageType === "voice" && (
//                 <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
//                   <div className="text-center">
//                     <Mic className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-c-foreground mb-4">Record a voice message</p>
//                     <Button type="button" variant="outline" size="sm">
//                       <Mic className="w-4 h-4 mr-2" />
//                       Start Recording
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               {formData.messageType === "video" && (
//                 <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
//                   <div className="text-center">
//                     <Video className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-c-foreground mb-4">Record a video message</p>
//                     <Button type="button" variant="outline" size="sm">
//                       <Video className="w-4 h-4 mr-2" />
//                       Start Recording
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <Separator />

//           {/* Consent */}
//           <div className="flex items-start space-x-2">
//             <Checkbox
//               id="consent"
//               checked={formData.consent}
//               onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
//             />
//             <div className="grid gap-1.5 leading-none">
//               <Label
//                 htmlFor="consent"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//               >
//                 I consent to share my profile and documents with the recruiter
//               </Label>
//               <p className="text-xs text-muted-c-foreground">
//                 Your information will only be shared with the hiring company for this specific role.
//               </p>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex items-center gap-3 pt-4">
//             <Button
//               type="submit"
//               disabled={!formData.consent || isSubmitting}
//               className="flex-1 bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
//                   Sending Application...
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Application
//                 </>
//               )}
//             </Button>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

//#endregion


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Upload,
  Briefcase,
  DollarSign,
  TrendingUp,
  X,
  Send,
  CheckCircle,
  Mic,
  Video,
  MessageSquare,
  Edit,
  Trash2,
  Calendar,
  Building,
  MapPinIcon,
  BookOpen,
  Languages,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { applyForJob } from "@/store/candidate store/store";
import { useAuth } from "@/contexts/AuthContext";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";

interface Job {
  id: number;
  title: string;
  company: string;
  matchScore: number;
}

interface ApplicationData {
  id: number;
  user_id: string;
  job_id: number;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  messageType: string;
  message_text: string;
  media_url: string | null;
  cv_file: any;
  cv_filename: string;
  consent: number;
  hiring_stage: string;
  status: string;
  created_at: string;
  assessmentScore: number | null;
  title: string;
  description: string;
  job_function: string;
  career_level: string;
  industry: string;
  work_mode: string;
  employment_type: string;
  experience_required: {
    max: string;
    min: string;
  };
  salary: {
    max: number;
    min: number;
    period: string;
    currency: string;
  };
  required_skills: string[];
  preferred_skills: string[];
  required_certifications: string[];
  preferred_certifications: string[];
  languages: string[];
  visa_requirements: string[];
  gender_preference: string;
  benefits: any[];
  application_deadline: string | null;
  updated_at: string;
  score: number;
  type: string;
  company_name: string | null;
  company_website: string | null;
  duration: any;
  compensation: any;
  mentorship_available: number;
  conversion_to_fulltime: number;
  applications: number;
  views: number;
  employer_uid: string;
}

interface EasyApplyModalProps {
  job: Job | ApplicationData | null;
  open: boolean;
  onClose: () => void;
  onSubmit?: (jobId: number) => void;
  isView?: boolean;
}

export function EasyApplyModal({ job, open, onClose, onSubmit, isView = false }: EasyApplyModalProps) {
  const { currentUser, userData, loading, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const { applyForJob } = useCandidateStore();
  // Mock profile data - in real app, this would come from profile context/API
  const mockProfileData = {
    fullName: userData?.basicInfo?.fullName || '',
    email: userData?.basicInfo?.email || '',
    phone: userData?.basicInfo?.phone || '',
    location: userData?.basicInfo?.location || '',
    resume: userData?.cv_file || "Upload your CV in PDF format",
    preferredTitles: userData?.preferences?.jobTitles || [],
    expectedSalary: userData?.preferences?.salaryRange?.min + ' - ' + userData?.preferences?.salaryRange?.max + ' ' + userData?.preferences?.salaryRange?.currency || "AED 15,000 - 22,000",
    workMode: userData?.preferences?.workType || "Hybrid",
    summary: userData?.summary,
    skills: userData?.skills?.technical,
    certifications: userData?.skills?.certifications,
    availability: "Available immediately"
  };

  const [formData, setFormData] = useState({
    fullName: mockProfileData.fullName,
    email: mockProfileData.email,
    phone: mockProfileData.phone,
    location: mockProfileData.location,
    message: "",
    messageType: "text" as "text" | "voice" | "video",
    consent: false,
    resume: mockProfileData.resume,
    resumeFile: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationError, setApplicationError] = useState<string | null>(null);

  if (!job) return null;

  // Helper function to check if job is ApplicationData (view mode)
  const isApplicationData = (job: any): job is ApplicationData => {
    return isView && job && 'user_id' in job;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format salary for display
  const formatSalaryDisplay = (salary: any) => {
    if (!salary) return 'Not specified';
    return `${salary.currency} ${salary.min} - ${salary.max} ${salary.period}`;
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-yellow-100 text-yellow-800',
      'interview_scheduled': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800',
      'offer_extended': 'bg-green-100 text-green-800',
      'hired': 'bg-green-100 text-green-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Get status display text
  const getStatusDisplay = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': 'Applied',
      'under_review': 'Under Review',
      'interview_scheduled': 'Interview Scheduled',
      'rejected': 'Rejected',
      'offer_extended': 'Offer Received',
      'hired': 'Hired'
    };
    return statusMap[status] || status;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isView) return; // Disable in view mode

    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file.name,
        resumeFile: file
      }));

      toast({
        title: "✅ Resume Updated",
        description: `${file.name} has been successfully uploaded`,
      });
    }
  };

  const handleRemoveResume = () => {
    if (isView) return; // Disable in view mode

    setFormData(prev => ({
      ...prev,
      resume: mockProfileData.resume,
      resumeFile: null
    }));

    toast({
      title: "Resume Removed",
      description: "Default resume has been restored",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isView) {
      e.preventDefault();
      return; // Disable submission in view mode
    }

    e.preventDefault();

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please consent to share your profile with the recruiter",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', job.id.toString());
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('messageType', formData.messageType);
      formDataToSend.append('message_text', formData.message);
      formDataToSend.append('consent', formData.consent.toString());

      if (formData.resumeFile) {
        formDataToSend.append('cv_file', formData.resumeFile);
      } else if (formData.resume) {
        formDataToSend.append('cv_filename', formData.resume);
      }

      const apply = await applyForJob(job.id, formDataToSend, setApplicationError);

      if (apply?.success) {
        toast({
          title: "✅ Application Sent Successfully!",
          description: `Your application for ${job.title} at ${job.company} has been submitted.`,
        });
        onSubmit?.(job.id);
        onClose();
      } else {
        toast({
          title: "Failed to apply!",
          description: applicationError || "An error occurred while submitting your application",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Application error:', error);
      toast({
        title: "Application Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const handleMessageTypeChange = (type: "text" | "voice" | "video") => {
    if (isView) return; // Disable in view mode
    setFormData(prev => ({ ...prev, messageType: type, message: "" }));
  };

  const handleEditProfile = () => {
    window.location.href = 'profile';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {isView ? "Application Details" : "Easy Apply"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-secondary-c/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Application Status (View Mode) */}
          {isView && isApplicationData(job) && (
            <div className="flex items-center justify-between">
              <Badge className={`${getStatusColor(job.hiring_stage)} px-3 py-1 text-sm font-medium`}>
                {getStatusDisplay(job.hiring_stage)}
              </Badge>
              <div className="text-sm text-muted-c-foreground">
                Applied on: {formatDate(job.ja_created_at)}
              </div>
            </div>
          )}

          {/* Match Score (Apply Mode) */}
          {!isView && (
            <div className="flex items-center justify-center">
              <Badge
                className={`${getMatchScoreColor(job.matchScore)} bg-background border-2 px-4 py-2 text-sm font-semibold`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {job.matchScore}% Match for this role
              </Badge>
            </div>
          )}

          <div className="text-center">
            <p className="text-muted-c-foreground">
              {isView ? (
                <>Application for <span className="font-medium text-foreground">{job.title}</span></>
              ) : (
                <>Applying for <span className="font-medium text-foreground">{job.title}</span> at{" "}
                  <span className="font-medium text-foreground">{job.company_name || job.companyInfo?.companyName}</span></>
              )}
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details Section (View Mode) */}
          {isView && isApplicationData(job) && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary-c" />
                  Job Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Company:</span>
                      <span>{job.company_name || job.companyInfo?.companyName|| 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Job Function:</span>
                      <span>{job.job_function || job.companyInfo?.job_function}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Industry:</span>
                      <span>{job.industry || job.companyInfo?.industry} </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Work Mode:</span>
                      <span>{job.work_mode}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Salary:</span>
                      <span>{formatSalaryDisplay(job.salary)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Experience:</span>
                      <span>{job.experience_required?.min} - {job.experience_required?.max}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-muted-c-foreground" />
                      <span className="font-medium">Languages:</span>
                      <span>{job.languages?.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Required Skills</Label>
                  <div className="flex flex-wrap gap-1">
                    {job.required_skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Job Description</Label>
                  <div className="bg-muted-c/30 rounded-lg p-4 text-sm">
                    {job.description?.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Basic Info Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary-c" />
                Basic Information
              </h3>
              {!isView && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleEditProfile}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={isView && isApplicationData(job) ? job.fullName : formData.fullName}
                  onChange={(e) => !isView && setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="bg-muted-c/30"
                  readOnly={isView}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={isView && isApplicationData(job) ? job.email : formData.email}
                  onChange={(e) => !isView && setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-muted-c/30"
                  readOnly={isView}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={isView && isApplicationData(job) ? job.phone : formData.phone}
                  onChange={(e) => !isView && setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-muted-c/30"
                  readOnly={isView}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={isView && isApplicationData(job) ? job.location : formData.location}
                  onChange={(e) => !isView && setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="bg-muted-c/30"
                  readOnly={isView}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Resume Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-c" />
              Resume
            </h3>

            <div className="flex items-center justify-between p-4 bg-muted-c/30 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary-c" />
                <div>
                  <p className="font-medium text-foreground">
                    {isView && isApplicationData(job) ? job.cv_filename : formData.resume}
                  </p>
                  <p className="text-sm text-muted-c-foreground">
                    {isView ? "Submitted with application" :
                      formData.resumeFile ? `New upload: ${(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB` :
                        "Last updated: Jan 15, 2024"}
                  </p>
                </div>
              </div>
              {!isView && (
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Label htmlFor="resume-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" type="button" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        {formData.resumeFile ? "Change" : "Replace"}
                      </span>
                    </Button>
                  </Label>
                  {formData.resumeFile && (
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={handleRemoveResume}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {!isView && (
              <div className="text-xs text-muted-c-foreground">
                <p>Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Message to Recruiter */}
          {isView && isApplicationData(job) && job.message_text && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary-c" />
                  Message to Recruiter
                </h3>
                <div className="bg-muted-c/30 rounded-lg p-4">
                  <p className="text-sm">{job.message_text}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Message to Recruiter (Apply Mode) */}
          {!isView && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary-c" />
                Message to Recruiter
              </h3>

              {/* Message Type Selection */}
              <div className="flex items-center gap-2 mb-4">
                <Button
                  type="button"
                  variant={formData.messageType === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMessageTypeChange("text")}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Text
                </Button>
                <Button
                  type="button"
                  variant={formData.messageType === "voice" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMessageTypeChange("voice")}
                  className="flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Voice Note
                </Button>
                <Button
                  type="button"
                  variant={formData.messageType === "video" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleMessageTypeChange("video")}
                  className="flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Video
                </Button>
              </div>

              {/* Message Input Based on Type */}
              <div className="space-y-2">
                {formData.messageType === "text" && (
                  <Textarea
                    placeholder="Write your message to the recruiter..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="bg-muted-c/30"
                  />
                )}

                {formData.messageType === "voice" && (
                  <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
                    <div className="text-center">
                      <Mic className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-c-foreground mb-4">Record a voice message</p>
                      <Button type="button" variant="outline" size="sm">
                        <Mic className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    </div>
                  </div>
                )}

                {formData.messageType === "video" && (
                  <div className="flex items-center justify-center p-8 bg-muted-c/30 rounded-lg border-2 border-dashed border-muted-c-foreground/20">
                    <div className="text-center">
                      <Video className="w-12 h-12 text-muted-c-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-c-foreground mb-4">Record a video message</p>
                      <Button type="button" variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Consent (Apply Mode Only) */}
          {!isView && (
            <>
              <Separator />
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, consent: checked as boolean }))}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to share my profile and documents with the recruiter
                  </Label>
                  <p className="text-xs text-muted-c-foreground">
                    Your information will only be shared with the hiring company for this specific role.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Submit Button (Apply Mode Only) */}
          {!isView && (
            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={!formData.consent || isSubmitting}
                className="flex-1 bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending Application...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Application
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          )}

          {/* Close Button (View Mode Only) */}
          {isView && (
            <div className="flex justify-end pt-4">
              <Button type="button" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}