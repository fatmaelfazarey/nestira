// import { useState, useRef } from "react";
// import { ResumeBuilderHeader } from "@/components/ats-resume/ResumeBuilderHeader";
// import { PersonalInfoSection } from "@/components/ats-resume/PersonalInfoSection";
// import { ExperienceSection } from "@/components/ats-resume/ExperienceSection";
// import { EducationSection } from "@/components/ats-resume/EducationSection";
// import { SkillsSection } from "@/components/ats-resume/SkillsSection";
// import { ProgressTracker } from "@/components/ats-resume/ProgressTracker";
// import { toast } from "sonner";
// import { ATSOptimizationTips } from "@/components/ats-resume/ATSOptimizationTips";
// import { ActionsPanel } from "@/components/ats-resume/ActionsPanel";
// import { ATSScoreCard } from "@/components/ats-resume/ATSScoreCard";
// import { AIAssistant } from "@/components/ats-resume/AIAssistant";
// import { ResumePreview } from "@/components/ats-resume/ResumePreview";
// import { useCandidateStore } from "@/store/candidate store/CandidateStore";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// interface ResumeData {
//   jobTitle: string;
//   personalInfo: {
//     fullName: string;
//     email: string;
//     phone: string;
//     location: string;
//     summary: string;
//     linkedin: string;
//     portfolio: string;
//   };
//   experience: Array<{
//     title: string;
//     company: string;
//     location: string;
//     startDate: string;
//     endDate: string;
//     current: boolean;
//     description: string;
//   }>;
//   education: Array<{
//     degree: string;
//     institution: string;
//     graduationYear: string;
//     gpa?: string;
//   }>;
//   skills: {
//     technical: string[];
//     software: string[];
//     certifications: string[];
//     languages: string[];
//   };
// }

// interface MatchJobData {
//   jobDescription: string;
//   cvFile: File | null;
//   cvFileName: string;
//   isProcessing: boolean;
// }

// export default function ATSResume() {
//   const [buildMode, setBuildMode] = useState<'none' | 'scratch' | 'upload'>('none');
//   const [showPreview, setShowPreview] = useState(false);
//   const [atsScore, setAtsScore] = useState(0);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const { downloadCV, JobMatching } = useCandidateStore();

//   const [resumeData, setResumeData] = useState<ResumeData>({
//     jobTitle: '',
//     personalInfo: {
//       fullName: '',
//       email: '',
//       phone: '',
//       location: '',
//       summary: '',
//       linkedin: '',
//       portfolio: ''
//     },
//     experience: [],
//     education: [],
//     skills: {
//       technical: [],
//       software: [],
//       certifications: [],
//       languages: []
//     }
//   });

//   const [matchJobData, setMatchJobData] = useState<MatchJobData>({
//     jobDescription: '',
//     cvFile: null,
//     cvFileName: '',
//     isProcessing: false
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle job title change
//   const handleJobTitleChange = (jobTitle: string) => {
//     setResumeData(prev => ({
//       ...prev,
//       jobTitle
//     }));
//     setAtsScore(calculateATSScore());
//   };

//   const calculateProgress = () => {
//     let completedSections = 0;
//     const totalSections = 5;

//     if (resumeData.jobTitle) {
//       completedSections++;
//     }

//     if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.summary) {
//       completedSections++;
//     }

//     if (resumeData.experience.length > 0) {
//       completedSections++;
//     }

//     if (resumeData.education.length > 0) {
//       completedSections++;
//     }

//     if (resumeData.skills.technical.length > 0 || resumeData.skills.software.length > 0) {
//       completedSections++;
//     }

//     return Math.round((completedSections / totalSections) * 100);
//   };

//   const calculateATSScore = () => {
//     let score = 0;

//     if (resumeData.jobTitle) score += 10;

//     if (resumeData.personalInfo.fullName) score += 5;
//     if (resumeData.personalInfo.email) score += 5;
//     if (resumeData.personalInfo.phone) score += 5;
//     if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) score += 10;

//     if (resumeData.experience.length > 0) score += 10;
//     if (resumeData.experience.some(exp => exp.description && exp.description.length > 50)) score += 15;

//     const totalSkills = resumeData.skills.technical.length + resumeData.skills.software.length;
//     if (totalSkills >= 5) score += 15;
//     if (totalSkills >= 10) score += 10;

//     if (resumeData.education.length > 0) score += 10;

//     if (resumeData.jobTitle) {
//       const commonKeywords = ['manager', 'analyst', 'developer', 'engineer', 'specialist', 'director'];
//       const jobTitleLower = resumeData.jobTitle.toLowerCase();
//       const matchedKeywords = commonKeywords.filter(keyword => jobTitleLower.includes(keyword));
//       score += Math.min(5, matchedKeywords.length);
//     }

//     return Math.min(100, score);
//   };

//   const handlePersonalInfoChange = (field: string, value: string) => {
//     setResumeData(prev => ({
//       ...prev,
//       personalInfo: { ...prev.personalInfo, [field]: value }
//     }));
//     setAtsScore(calculateATSScore());
//   };

//   const handleExperienceChange = (experiences: any[]) => {
//     setResumeData(prev => ({ ...prev, experience: experiences }));
//     setAtsScore(calculateATSScore());
//   };

//   const handleEducationChange = (education: any[]) => {
//     setResumeData(prev => ({ ...prev, education }));
//     setAtsScore(calculateATSScore());
//   };

//   const handleSkillsChange = (category: string, skillList: string[]) => {
//     setResumeData(prev => ({
//       ...prev,
//       skills: { ...prev.skills, [category]: skillList }
//     }));
//     setAtsScore(calculateATSScore());
//   };

//   const handleBuildFromScratch = () => {
//     setBuildMode('scratch');
//     toast.success("Started building resume from scratch");
//   };

//   const handleUploadCV = () => {
//     setBuildMode('upload');
//   };

//   const handleCVParsed = (parsedData: Partial<ResumeData>) => {
//     setResumeData(prev => ({
//       jobTitle: parsedData.jobTitle || prev.jobTitle,
//       personalInfo: { ...prev.personalInfo, ...parsedData.personalInfo },
//       experience: parsedData.experience || prev.experience,
//       education: parsedData.education || prev.education,
//       skills: { ...prev.skills, ...parsedData.skills }
//     }));
//     setBuildMode('scratch');
//     setAtsScore(calculateATSScore());
//     toast.success("CV parsed successfully! Review and edit the extracted information.");
//   };

//   const handlePreview = () => {
//     setShowPreview(true);
//   };

//   const handleDownloadPDF = async () => {
//     if (!resumeData.personalInfo.fullName) {
//       toast.error("Please enter your name before downloading");
//       return;
//     }

//     if (!resumeData.personalInfo.email) {
//       toast.error("Please enter your email before downloading");
//       return;
//     }

//     setIsDownloading(true);
//     try {
//       toast.loading("Generating PDF...");
//       await downloadCV(resumeData, "pdf");
//       toast.success("PDF downloaded successfully!");
//     } catch (error) {
//       toast.error("Failed to download PDF. Please try again.");
//       console.error("Download error:", error);
//     } finally {
//       setIsDownloading(false);
//       toast.dismiss();
//     }
//   };

//   const handleDownloadDOCX = async () => {
//     if (!resumeData.personalInfo.fullName) {
//       toast.error("Please enter your name before downloading");
//       return;
//     }

//     if (!resumeData.personalInfo.email) {
//       toast.error("Please enter your email before downloading");
//       return;
//     }

//     setIsDownloading(true);
//     try {
//       toast.loading("Generating Word document...");
//       await downloadCV(resumeData, "docx");
//       toast.success("Word document downloaded successfully!");
//     } catch (error) {
//       toast.error("Failed to download Word document. Please try again.");
//       console.error("Download error:", error);
//     } finally {
//       setIsDownloading(false);
//       toast.dismiss();
//     }
//   };

//   const handleAISummaryGenerated = (summary: string) => {
//     handlePersonalInfoChange('summary', summary);
//     toast.success("AI-generated summary added!");
//   };

//   const handleAISkillsSuggested = (suggestedSkills: string[]) => {
//     const newSkills = suggestedSkills.slice(0, 3);
//     setResumeData(prev => ({
//       ...prev,
//       skills: {
//         ...prev.skills,
//         technical: [...prev.skills.technical, ...newSkills]
//       }
//     }));
//     setAtsScore(calculateATSScore());
//     toast.success("AI-suggested skills added!");
//   };

//   const handleSaveToProfile = () => {
//     toast.success("Resume saved to your candidate profile!");
//   };

//   const handleJobDescriptionChange = (jobDescription: string) => {
//     setMatchJobData(prev => ({
//       ...prev,
//       jobDescription
//     }));
//   };

//   const handleCVFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (file.type !== 'application/pdf') {
//       toast.error('Please upload a PDF file only');
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) { // 10MB limit
//       toast.error('File size should be less than 10MB');
//       return;
//     }

//     setMatchJobData(prev => ({
//       ...prev,
//       cvFile: file,
//       cvFileName: file.name
//     }));
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       const file = files[0];

//       if (file.type !== 'application/pdf') {
//         toast.error('Please upload a PDF file only');
//         return;
//       }

//       if (file.size > 10 * 1024 * 1024) {
//         toast.error('File size should be less than 10MB');
//         return;
//       }

//       setMatchJobData(prev => ({
//         ...prev,
//         cvFile: file,
//         cvFileName: file.name
//       }));
//     }
//   };

//   const handleJobMatching = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!matchJobData.jobDescription.trim()) {
//       toast.error('Please enter a job description');
//       return;
//     }

//     if (!matchJobData.cvFile) {
//       toast.error('Please upload your CV');
//       return;
//     }

//     setMatchJobData(prev => ({ ...prev, isProcessing: true }));

//     try {
//       toast.loading('Analyzing job match...');
//       const result = await JobMatching(matchJobData);
//       // Create FormData to send both text and file
//       //       // result {
//       //     "success": true,
//       //     "data": {
//       //         "matchPercentage": 30,
//       //         "missingSkills": [
//       //             "Node js",
//       //             "React",
//       //             "SQL",
//       //             "Python",
//       //             "DEPI",
//       //             "ITI",
//       //             "CIA"
//       //         ],
//       //         "improvements": [
//       //             "Update the CV to include relevant experience in investment banking, as the job description requires 0-0 years of relevant experience in this field.",
//       //             "Highlight any certifications or relevant projects that could be considered industry-relevant.",
//       //             "Improve communication skills and provide examples of how you have demonstrated these in previous roles or projects.",
//       //             "Consider mentioning any leadership or mentoring experiences, as these are part of the job responsibilities."
//       //         ],
//       //         "summary": "The CV has a low match percentage due to the lack of required skills and experience in investment banking, Node.js, React, SQL, Python, DEPI, ITI, and CIA. The candidate has strong front-end development skills but needs to tailor their application to the specific requirements of the job."
//       //     }
//       // }

//       toast.dismiss();
//       toast.success('Job matching analysis completed!');

//       console.log('Match analysis result:', result);


//       setBuildMode('scratch');

//     } catch (error) {
//       console.error('Job matching error:', error);
//       toast.dismiss();
//       toast.error(error instanceof Error ? error.message : 'Failed to analyze job match. Please try again.');
//     } finally {
//       setMatchJobData(prev => ({ ...prev, isProcessing: false }));
//     }
//   };

//   const handleResetUpload = () => {
//     setMatchJobData({
//       jobDescription: '',
//       cvFile: null,
//       cvFileName: '',
//       isProcessing: false
//     });
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-7xl mx-auto">
//         <ResumeBuilderHeader
//           onBuildFromScratch={handleBuildFromScratch}
//           onUploadCV={handleUploadCV}
//           onPreview={handlePreview}
//           onDownload={handleDownloadPDF}
//           atsScore={atsScore}
//           isDownloading={isDownloading}
//         />

//         {buildMode === 'upload' && (
//           <div className="mt-8">
//             <form onSubmit={handleJobMatching} className="space-y-6 max-w-3xl mx-auto">
//               {/* Job Description */}
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 <h3 className="text-lg font-semibold text-foreground mb-4">Job Matching Analysis</h3>

//                 <div className="mb-6">
//                   <label htmlFor="jobDescription" className="block text-sm font-medium text-foreground mb-2">
//                     Job Description *
//                   </label>
//                   <Textarea
//                     id="jobDescription"
//                     value={matchJobData.jobDescription}
//                     onChange={(e) => handleJobDescriptionChange(e.target.value)}
//                     placeholder="Paste the complete job description including requirements, responsibilities, and qualifications..."
//                     className="w-full min-h-[200px] px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                     required
//                     disabled={matchJobData.isProcessing}
//                   />
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     Copy and paste the exact job description for accurate matching analysis.
//                   </p>
//                 </div>

//                 {/* CV Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Your CV (PDF) *
//                   </label>

//                   <div
//                     className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${matchJobData.isProcessing
//                       ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
//                       : 'border-gray-300 hover:border-primary cursor-pointer'
//                       }`}
//                     onDragOver={handleDragOver}
//                     onDrop={handleDrop}
//                     onClick={() => !matchJobData.isProcessing && fileInputRef.current?.click()}
//                   >
//                     <input
//                       type="file"
//                       ref={fileInputRef}
//                       className="hidden"
//                       accept=".pdf,application/pdf"
//                       onChange={handleCVFileChange}
//                       disabled={matchJobData.isProcessing}
//                     />

//                     {matchJobData.isProcessing ? (
//                       <div className="flex flex-col items-center justify-center">
//                         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
//                         <p className="text-sm font-medium text-foreground">Processing...</p>
//                         <p className="text-xs text-muted-foreground mt-1">Sending CV to server for analysis</p>
//                       </div>
//                     ) : matchJobData.cvFileName ? (
//                       <div className="space-y-3">
//                         <div className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center">
//                           <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="font-medium text-foreground truncate">{matchJobData.cvFileName}</p>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             ✓ Ready for analysis
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             Size: {(matchJobData.cvFile?.size || 0) / 1024 / 1024} MB
//                           </p>
//                         </div>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="sm"
//                           onClick={handleResetUpload}
//                           className="mt-2"
//                         >
//                           Change File
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
//                           <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
//                           </svg>
//                         </div>
//                         <div>
//                           <p className="font-medium text-foreground">
//                             <span className="text-primary">Click to upload</span> or drag and drop
//                           </p>
//                           <p className="text-sm text-muted-foreground mt-1">PDF only (Max 10MB)</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <p className="mt-3 text-sm text-muted-foreground">
//                     Upload your CV in PDF format. We'll process it on our server and analyze how well it matches the job description.
//                   </p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 justify-end">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setBuildMode('none')}
//                   disabled={matchJobData.isProcessing}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={!matchJobData.jobDescription.trim() || !matchJobData.cvFile || matchJobData.isProcessing}
//                   className="min-w-[120px]"
//                 >
//                   {matchJobData.isProcessing ? (
//                     <>
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     'Analyze Match'
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         )}

//         {buildMode === 'scratch' && (
//           <>
//             <div className="mt-8">
//               <ProgressTracker progress={calculateProgress()} />
//             </div>

//             <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
//               {/* Main Content */}
//               <div className="lg:col-span-3 space-y-6">
//                 {/* Job Title Section */}
//                 <div className="bg-white rounded-lg shadow-sm border p-6">
//                   <div className="mb-4">
//                     <h2 className="text-lg font-semibold text-foreground mb-2">Target Job Title</h2>
//                     <p className="text-sm text-muted-foreground mb-4">
//                       Enter the specific job title you're applying for. This helps us optimize your resume for ATS systems.
//                     </p>
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <label htmlFor="jobTitle" className="block text-sm font-medium text-foreground mb-2">
//                         Desired Position *
//                       </label>
//                       <input
//                         id="jobTitle"
//                         type="text"
//                         value={resumeData.jobTitle}
//                         onChange={(e) => handleJobTitleChange(e.target.value)}
//                         placeholder="e.g., Senior Financial Analyst, Software Engineer, Marketing Manager"
//                         className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
//                       />
//                       <p className="mt-2 text-sm text-muted-foreground">
//                         Be specific. Use the exact title from the job description if possible.
//                       </p>
//                     </div>

//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         type="button"
//                         onClick={() => handleJobTitleChange("Financial Analyst")}
//                         className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
//                       >
//                         Financial Analyst
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => handleJobTitleChange("Software Developer")}
//                         className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
//                       >
//                         Software Developer
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => handleJobTitleChange("Marketing Manager")}
//                         className="px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
//                       >
//                         Marketing Manager
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => handleJobTitleChange("Project Manager")}
//                         className="px-3 py-1.5 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
//                       >
//                         Project Manager
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <PersonalInfoSection
//                   data={resumeData.personalInfo}
//                   onChange={handlePersonalInfoChange}
//                 />

//                 <ExperienceSection
//                   data={resumeData.experience}
//                   onChange={handleExperienceChange}
//                 />

//                 <EducationSection
//                   data={resumeData.education}
//                   onChange={handleEducationChange}
//                 />

//                 <SkillsSection
//                   data={resumeData.skills}
//                   onChange={handleSkillsChange}
//                 />
//               </div>

//               {/* Sidebar */}
//               <div className="lg:col-span-1 space-y-6">
//                 <AIAssistant
//                   onSummaryGenerated={handleAISummaryGenerated}
//                   onSkillsSuggested={handleAISkillsSuggested}
//                   currentSkills={resumeData.skills.technical}
//                   resumeData={resumeData}
//                   jobTitle={resumeData.jobTitle}
//                 />

//                 <ATSScoreCard
//                   score={atsScore}
//                   jobTitle={resumeData.jobTitle}
//                   resumeData={resumeData}
//                 />

//                 <ActionsPanel
//                   onPreview={handlePreview}
//                   onDownloadPDF={handleDownloadPDF}
//                   onDownloadDOCX={handleDownloadDOCX}
//                   onSaveToProfile={handleSaveToProfile}
//                   isDownloading={isDownloading}
//                 />

//                 <ATSOptimizationTips jobTitle={resumeData.jobTitle} />
//               </div>
//             </div>
//           </>
//         )}

//         {/* Preview Modal */}
//         {showPreview && (
//           <ResumePreview
//             resumeData={resumeData}
//             onClose={() => setShowPreview(false)}
//             onDownloadPDF={handleDownloadPDF}
//             onDownloadDOCX={handleDownloadDOCX}
//           />
//         )}

//         {buildMode === 'none' && (
//           <div className="mt-12 text-center">
//             <div className="max-w-2xl mx-auto">
//               <h2 className="text-2xl font-bold text-foreground mb-4">
//                 Build Your Career with AI-Powered Resumes
//               </h2>
//               <p className="text-muted-foreground mb-8">
//                 Our intelligent resume builder is designed to help you get past ATS systems and land interviews
//                 at top companies with AI assistance.
//               </p>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                 <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
//                   <div className="text-blue-600 text-2xl font-bold mb-2">95%</div>
//                   <div className="text-sm text-foreground">ATS Pass Rate</div>
//                 </div>
//                 <div className="p-6 bg-green-50 rounded-lg border border-green-200">
//                   <div className="text-green-600 text-2xl font-bold mb-2">3x</div>
//                   <div className="text-sm text-foreground">More Interviews</div>
//                 </div>
//                 <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
//                   <div className="text-yellow-600 text-2xl font-bold mb-2">AI</div>
//                   <div className="text-sm text-foreground">Powered Optimization</div>
//                 </div>
//               </div>

//               <div className="mt-8 flex justify-center gap-4">
//                 <button
//                   onClick={handleBuildFromScratch}
//                   className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
//                 >
//                   Build from Scratch
//                 </button>
//                 <button
//                   onClick={handleUploadCV}
//                   className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
//                 >
//                   Upload Existing CV
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














import { useState, useRef } from "react";
import { ResumeBuilderHeader } from "@/components/ats-resume/ResumeBuilderHeader";
import { PersonalInfoSection } from "@/components/ats-resume/PersonalInfoSection";
import { ExperienceSection } from "@/components/ats-resume/ExperienceSection";
import { EducationSection } from "@/components/ats-resume/EducationSection";
import { SkillsSection } from "@/components/ats-resume/SkillsSection";
import { ProgressTracker } from "@/components/ats-resume/ProgressTracker";
import { toast } from "sonner";
import { ATSOptimizationTips } from "@/components/ats-resume/ATSOptimizationTips";
import { ActionsPanel } from "@/components/ats-resume/ActionsPanel";
import { ATSScoreCard } from "@/components/ats-resume/ATSScoreCard";
import { AIAssistant } from "@/components/ats-resume/AIAssistant";
import { ResumePreview } from "@/components/ats-resume/ResumePreview";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JobMatchResults } from "@/components/ats-resume/JobMatchResults";
import { Card, CardContent } from "@/components/ui/card";

interface ResumeData {
  jobTitle: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin: string;
    portfolio: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    graduationYear: string;
    gpa?: string;
  }>;
  skills: {
    technical: string[];
    software: string[];
    certifications: string[];
    languages: string[];
  };
}

interface MatchJobData {
  jobDescription: string;
  cvFile: File | null;
  cvFileName: string;
  isProcessing: boolean;
}

interface MatchResult {
  matchPercentage: number;
  missingSkills: string[];
  improvements: string[];
  summary: string;
}

export default function ATSResume() {
  const [buildMode, setBuildMode] = useState<'none' | 'scratch' | 'upload'>('none');
  const [showPreview, setShowPreview] = useState(false);
  const [atsScore, setAtsScore] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [showMatchResults, setShowMatchResults] = useState(false);
  
  const { downloadCV, JobMatching } = useCandidateStore();

  const [resumeData, setResumeData] = useState<ResumeData>({
    jobTitle: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      linkedin: '',
      portfolio: ''
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      software: [],
      certifications: [],
      languages: []
    }
  });

  const [matchJobData, setMatchJobData] = useState<MatchJobData>({
    jobDescription: '',
    cvFile: null,
    cvFileName: '',
    isProcessing: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle job title change
  const handleJobTitleChange = (jobTitle: string) => {
    setResumeData(prev => ({
      ...prev,
      jobTitle
    }));
    setAtsScore(calculateATSScore());
  };

  const calculateProgress = () => {
    let completedSections = 0;
    const totalSections = 5;

    if (resumeData.jobTitle) {
      completedSections++;
    }

    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.summary) {
      completedSections++;
    }

    if (resumeData.experience.length > 0) {
      completedSections++;
    }

    if (resumeData.education.length > 0) {
      completedSections++;
    }

    if (resumeData.skills.technical.length > 0 || resumeData.skills.software.length > 0) {
      completedSections++;
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  const calculateATSScore = () => {
    let score = 0;

    if (resumeData.jobTitle) score += 10;

    if (resumeData.personalInfo.fullName) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50) score += 10;

    if (resumeData.experience.length > 0) score += 10;
    if (resumeData.experience.some(exp => exp.description && exp.description.length > 50)) score += 15;

    const totalSkills = resumeData.skills.technical.length + resumeData.skills.software.length;
    if (totalSkills >= 5) score += 15;
    if (totalSkills >= 10) score += 10;

    if (resumeData.education.length > 0) score += 10;

    if (resumeData.jobTitle) {
      const commonKeywords = ['manager', 'analyst', 'developer', 'engineer', 'specialist', 'director'];
      const jobTitleLower = resumeData.jobTitle.toLowerCase();
      const matchedKeywords = commonKeywords.filter(keyword => jobTitleLower.includes(keyword));
      score += Math.min(5, matchedKeywords.length);
    }

    return Math.min(100, score);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
    setAtsScore(calculateATSScore());
  };

  const handleExperienceChange = (experiences: any[]) => {
    setResumeData(prev => ({ ...prev, experience: experiences }));
    setAtsScore(calculateATSScore());
  };

  const handleEducationChange = (education: any[]) => {
    setResumeData(prev => ({ ...prev, education }));
    setAtsScore(calculateATSScore());
  };

  const handleSkillsChange = (category: string, skillList: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skillList }
    }));
    setAtsScore(calculateATSScore());
  };

  const handleBuildFromScratch = () => {
    setBuildMode('scratch');
    toast.success("Started building resume from scratch");
  };

  const handleUploadCV = () => {
    setBuildMode('upload');
    setMatchResult(null);
    setShowMatchResults(false);
  };

  const handleCVParsed = (parsedData: Partial<ResumeData>) => {
    setResumeData(prev => ({
      jobTitle: parsedData.jobTitle || prev.jobTitle,
      personalInfo: { ...prev.personalInfo, ...parsedData.personalInfo },
      experience: parsedData.experience || prev.experience,
      education: parsedData.education || prev.education,
      skills: { ...prev.skills, ...parsedData.skills }
    }));
    setBuildMode('scratch');
    setAtsScore(calculateATSScore());
    toast.success("CV parsed successfully! Review and edit the extracted information.");
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    if (!resumeData.personalInfo.fullName) {
      toast.error("Please enter your name before downloading");
      return;
    }

    if (!resumeData.personalInfo.email) {
      toast.error("Please enter your email before downloading");
      return;
    }

    setIsDownloading(true);
    try {
      toast.loading("Generating PDF...");
      await downloadCV(resumeData, "pdf");
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download PDF. Please try again.");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
      toast.dismiss();
    }
  };

  const handleDownloadDOCX = async () => {
    if (!resumeData.personalInfo.fullName) {
      toast.error("Please enter your name before downloading");
      return;
    }

    if (!resumeData.personalInfo.email) {
      toast.error("Please enter your email before downloading");
      return;
    }

    setIsDownloading(true);
    try {
      toast.loading("Generating Word document...");
      await downloadCV(resumeData, "docx");
      toast.success("Word document downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download Word document. Please try again.");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
      toast.dismiss();
    }
  };

  const handleAISummaryGenerated = (summary: string) => {
    handlePersonalInfoChange('summary', summary);
    toast.success("AI-generated summary added!");
  };

  const handleAISkillsSuggested = (suggestedSkills: string[]) => {
    const newSkills = suggestedSkills.slice(0, 3);
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        technical: [...prev.skills.technical, ...newSkills]
      }
    }));
    setAtsScore(calculateATSScore());
    toast.success("AI-suggested skills added!");
  };

  const handleSaveToProfile = () => {
    toast.success("Resume saved to your candidate profile!");
  };

  const handleJobDescriptionChange = (jobDescription: string) => {
    setMatchJobData(prev => ({
      ...prev,
      jobDescription
    }));
  };

  const handleCVFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size should be less than 10MB');
      return;
    }

    setMatchJobData(prev => ({
      ...prev,
      cvFile: file,
      cvFileName: file.name
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];

      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file only');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB');
        return;
      }

      setMatchJobData(prev => ({
        ...prev,
        cvFile: file,
        cvFileName: file.name
      }));
    }
  };

  const handleJobMatching = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!matchJobData.jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    if (!matchJobData.cvFile) {
      toast.error('Please upload your CV');
      return;
    }

    setMatchJobData(prev => ({ ...prev, isProcessing: true }));

    try {
      toast.loading('Analyzing job match...');
      
      // Create FormData to send to backend
      const formData = new FormData();
      formData.append('jobDescription', matchJobData.jobDescription);
      formData.append('cvFile', matchJobData.cvFile);
      
      // Call the JobMatching function from store
      const result = await JobMatching(matchJobData);
      
      toast.dismiss();
      
      if (result.success) {
        toast.success('Job matching analysis completed!');
        
        // Store the match result and show results
        setMatchResult(result.data);
        setShowMatchResults(true);
        
        console.log('Match analysis result:', result);
      } else {
        toast.error('Failed to analyze job match. Please try again.');
      }

    } catch (error) {
      console.error('Job matching error:', error);
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : 'Failed to analyze job match. Please try again.');
    } finally {
      setMatchJobData(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleResetUpload = () => {
    setMatchJobData({
      jobDescription: '',
      cvFile: null,
      cvFileName: '',
      isProcessing: false
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplySuggestedSkills = (skills: string[]) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        technical: [...prev.skills.technical, ...skills.filter(skill => 
          !prev.skills.technical.includes(skill)
        )]
      }
    }));
    setAtsScore(calculateATSScore());
    toast.success(`Added ${skills.length} skills to your resume`);
  };

  const handleStartBuildingFromMatch = () => {
    setBuildMode('scratch');
    setShowMatchResults(false);
    toast.success("Now building your optimized resume!");
  };

  const handleBackToUpload = () => {
    setShowMatchResults(false);
    setMatchResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <ResumeBuilderHeader
          onBuildFromScratch={handleBuildFromScratch}
          onUploadCV={handleUploadCV}
          onPreview={handlePreview}
          onDownload={handleDownloadPDF}
          atsScore={atsScore}
          isDownloading={isDownloading}
        />

        {/* Show Job Match Results */}
        {showMatchResults && matchResult && (
          <div className="mt-8  mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Job Match Analysis Results</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleBackToUpload}
                >
                  Back to Upload
                </Button>
                <Button
                  variant="default"
                  className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
                  onClick={handleStartBuildingFromMatch}
                >
                  Start Building Resume
                </Button>
              </div>
            </div>
            
            <JobMatchResults
              matchData={matchResult}
              onApplySuggestions={handleApplySuggestedSkills}
              onStartBuilding={handleStartBuildingFromMatch}
            />
            
            {/* Original Job Description for reference */}
            <div className="mt-6">
              <Card className="border">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">Original Job Description</h3>
                  <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg max-h-60 overflow-y-auto">
                    {matchJobData.jobDescription}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Upload Form (only show when not viewing results) */}
        {buildMode === 'upload' && !showMatchResults && (
          <div className="mt-8">
            <form onSubmit={handleJobMatching} className="space-y-6 max-w-3xl mx-auto">
              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Job Matching Analysis</h3>

                <div className="mb-6">
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-foreground mb-2">
                    Job Description *
                  </label>
                  <Textarea
                    id="jobDescription"
                    value={matchJobData.jobDescription}
                    onChange={(e) => handleJobDescriptionChange(e.target.value)}
                    placeholder="Paste the complete job description including requirements, responsibilities, and qualifications..."
                    className="w-full min-h-[200px] px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    required
                    disabled={matchJobData.isProcessing}
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Copy and paste the exact job description for accurate matching analysis.
                  </p>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your CV (PDF) *
                  </label>

                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${matchJobData.isProcessing
                      ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                      : 'border-gray-300 hover:border-primary cursor-pointer'
                      }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => !matchJobData.isProcessing && fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".pdf,application/pdf"
                      onChange={handleCVFileChange}
                      disabled={matchJobData.isProcessing}
                    />

                    {matchJobData.isProcessing ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
                        <p className="text-sm font-medium text-foreground">Processing...</p>
                        <p className="text-xs text-muted-foreground mt-1">Sending CV to server for analysis</p>
                      </div>
                    ) : matchJobData.cvFileName ? (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground truncate">{matchJobData.cvFileName}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            ✓ Ready for analysis
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Size: {(matchJobData.cvFile?.size || 0) / 1024 / 1024} MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleResetUpload}
                          className="mt-2"
                        >
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            <span className="text-primary">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">PDF only (Max 10MB)</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Upload your CV in PDF format. We'll process it on our server and analyze how well it matches the job description.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setBuildMode('none')}
                  disabled={matchJobData.isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!matchJobData.jobDescription.trim() || !matchJobData.cvFile || matchJobData.isProcessing}
                
                  className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
                >
                  {matchJobData.isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Analyze Match'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {buildMode === 'scratch' && (
          <>
            <div className="mt-8">
              <ProgressTracker progress={calculateProgress()} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Job Title Section */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-foreground mb-2">Target Job Title</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter the specific job title you're applying for. This helps us optimize your resume for ATS systems.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="jobTitle" className="block text-sm font-medium text-foreground mb-2">
                        Desired Position *
                      </label>
                      <input
                        id="jobTitle"
                        type="text"
                        value={resumeData.jobTitle}
                        onChange={(e) => handleJobTitleChange(e.target.value)}
                        placeholder="e.g., Senior Financial Analyst, Software Engineer, Marketing Manager"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Be specific. Use the exact title from the job description if possible.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleJobTitleChange("Financial Analyst")}
                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        Financial Analyst
                      </button>
                      <button
                        type="button"
                        onClick={() => handleJobTitleChange("Software Developer")}
                        className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        Software Developer
                      </button>
                      <button
                        type="button"
                        onClick={() => handleJobTitleChange("Marketing Manager")}
                        className="px-3 py-1.5 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        Marketing Manager
                      </button>
                      <button
                        type="button"
                        onClick={() => handleJobTitleChange("Project Manager")}
                        className="px-3 py-1.5 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        Project Manager
                      </button>
                    </div>
                  </div>
                </div>

                <PersonalInfoSection
                  data={resumeData.personalInfo}
                  onChange={handlePersonalInfoChange}
                />

                <ExperienceSection
                  data={resumeData.experience}
                  onChange={handleExperienceChange}
                />

                <EducationSection
                  data={resumeData.education}
                  onChange={handleEducationChange}
                />

                <SkillsSection
                  data={resumeData.skills}
                  onChange={handleSkillsChange}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <AIAssistant
                  onSummaryGenerated={handleAISummaryGenerated}
                  onSkillsSuggested={handleAISkillsSuggested}
                  currentSkills={resumeData.skills.technical}
                  resumeData={resumeData}
                  jobTitle={resumeData.jobTitle}
                />

                <ATSScoreCard
                  score={atsScore}
                  jobTitle={resumeData.jobTitle}
                  resumeData={resumeData}
                />

                <ActionsPanel
                  onPreview={handlePreview}
                  onDownloadPDF={handleDownloadPDF}
                  onDownloadDOCX={handleDownloadDOCX}
                  onSaveToProfile={handleSaveToProfile}
                  isDownloading={isDownloading}
                />

                <ATSOptimizationTips jobTitle={resumeData.jobTitle} />
              </div>
            </div>
          </>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <ResumePreview
            resumeData={resumeData}
            onClose={() => setShowPreview(false)}
            onDownloadPDF={handleDownloadPDF}
            onDownloadDOCX={handleDownloadDOCX}
          />
        )}

        {buildMode === 'none' && (
          <div className="mt-12 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Build Your Career with AI-Powered Resumes
              </h2>
              <p className="text-muted-foreground mb-8">
                Our intelligent resume builder is designed to help you get past ATS systems and land interviews
                at top companies with AI assistance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-2xl font-bold mb-2">95%</div>
                  <div className="text-sm text-foreground">ATS Pass Rate</div>
                </div>
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-green-600 text-2xl font-bold mb-2">3x</div>
                  <div className="text-sm text-foreground">More Interviews</div>
                </div>
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-yellow-600 text-2xl font-bold mb-2">AI</div>
                  <div className="text-sm text-foreground">Powered Optimization</div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={handleBuildFromScratch}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Build from Scratch
                </button>
                <button
                  onClick={handleUploadCV}
                  className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Upload Existing CV
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}