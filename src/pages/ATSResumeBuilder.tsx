// import React, { useState } from 'react';
// import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { resumeSchema, ResumeFormData } from '../components/Admin components/cv/resume-schema';
// import { jsPDF } from 'jspdf';
// import { toast } from 'sonner';
// // import { v4 as uuidv4 } from 'uuid';

// // ShadCN Components (already in your dependencies)
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Plus, Trash2, Download, Eye, Save, Check } from 'lucide-react';

// export const ATSResumeBuilder: React.FC = () => {
//     const [previewMode, setPreviewMode] = useState(false);
//     const [atsScore, setAtsScore] = useState(0);

//     const methods = useForm<ResumeFormData>({
//         resolver: zodResolver(resumeSchema),
//         defaultValues: {
//             personalInfo: {
//                 fullName: '',
//                 jobTitle: '',
//                 email: '',
//                 phone: '',
//                 location: '',
//                 linkedin: '',
//                 portfolio: '',
//             },
//             workExperience: [
//                 {
//                     id: crypto.randomUUID(),
//                     company: '',
//                     jobTitle: '',
//                     startDate: '',
//                     endDate: '',
//                     current: false,
//                     description: '',
//                     achievements: [''],
//                 },
//             ],
//             education: [
//                 {
//                     id: crypto.randomUUID(),
//                     institution: '',
//                     degree: '',
//                     field: '',
//                     graduationYear: '',
//                     gpa: '',
//                     honors: '',
//                 },
//             ],
//             skills: {
//                 technical: [''],
//                 soft: [''],
//                 tools: [''],
//                 certifications: [''],
//             },
//             professionalSummary: '',
//             atsKeywords: [],
//             targetJobTitle: '',
//         },
//     });

//     const {
//         register,
//         control,
//         handleSubmit,
//         watch,
//         formState: { errors, isSubmitting },
//     } = methods;

//     const workExperienceFields = useFieldArray({
//         control,
//         name: 'workExperience',
//     });

//     const educationFields = useFieldArray({
//         control,
//         name: 'education',
//     });

//     // Calculate ATS Score
//     const calculateATSScore = (data: ResumeFormData) => {
//         let score = 0;
//         const totalPossible = 100;

//         // Check for required sections
//         if (data.personalInfo.jobTitle) score += 10;
//         if (data.workExperience.length > 0) score += 20;
//         if (data.education.length > 0) score += 10;
//         if (data.skills.technical.length > 3) score += 15;
//         if (data.professionalSummary.length > 50) score += 10;

//         // Check for action verbs in work experience
//         const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'increased', 'reduced'];
//         const allDescriptions = data.workExperience.map(exp => exp.description).join(' ');
//         const hasActionVerbs = actionVerbs.some(verb => allDescriptions.toLowerCase().includes(verb));
//         if (hasActionVerbs) score += 15;

//         // Check for quantifiable achievements
//         const hasQuantifiable = /\d+%|\$|\d+\+|\d+\s(year|month)/i.test(allDescriptions);
//         if (hasQuantifiable) score += 10;

//         // Check for keyword matching (simplified)
//         if (data.atsKeywords && data.atsKeywords.length > 5) score += 10;

//         return Math.min(score, totalPossible);
//     };

//     // Generate PDF with ATS-friendly formatting
//     const generatePDF = (data: ResumeFormData) => {
//         const doc = new jsPDF();
//         const margin = 20;
//         let yPos = margin;
//         const pageWidth = doc.internal.pageSize.width;
//         const contentWidth = pageWidth - (2 * margin);

//         // Set font for better ATS compatibility
//         doc.setFont('helvetica', 'normal');

//         // Header Section
//         doc.setFontSize(24);
//         doc.setFont('helvetica', 'bold');
//         doc.text(data.personalInfo.fullName.toUpperCase(), margin, yPos);
//         yPos += 10;

//         doc.setFontSize(12);
//         doc.setFont('helvetica', 'normal');
//         doc.text(data.personalInfo.jobTitle, margin, yPos);
//         yPos += 5;

//         const contactInfo = [
//             data.personalInfo.email,
//             data.personalInfo.phone,
//             data.personalInfo.location,
//             data.personalInfo.linkedin,
//             data.personalInfo.portfolio,
//         ].filter(Boolean).join(' | ');

//         doc.setFontSize(10);
//         doc.text(contactInfo, margin, yPos);
//         yPos += 15;

//         // Professional Summary
//         if (data.professionalSummary) {
//             doc.setFontSize(14);
//             doc.setFont('helvetica', 'bold');
//             doc.text('PROFESSIONAL SUMMARY', margin, yPos);
//             yPos += 7;

//             doc.setFontSize(11);
//             doc.setFont('helvetica', 'normal');
//             const summaryLines = doc.splitTextToSize(data.professionalSummary, contentWidth);
//             doc.text(summaryLines, margin, yPos);
//             yPos += (summaryLines.length * 6) + 10;
//         }

//         // Skills Section (Important for ATS)
//         doc.setFontSize(14);
//         doc.setFont('helvetica', 'bold');
//         doc.text('TECHNICAL SKILLS', margin, yPos);
//         yPos += 7;

//         doc.setFontSize(11);
//         doc.setFont('helvetica', 'normal');
//         const technicalSkills = data.skills.technical.filter(Boolean).join(', ');
//         const skillLines = doc.splitTextToSize(technicalSkills, contentWidth);
//         doc.text(skillLines, margin, yPos);
//         yPos += (skillLines.length * 6) + 15;

//         // Work Experience
//         doc.setFontSize(14);
//         doc.setFont('helvetica', 'bold');
//         doc.text('WORK EXPERIENCE', margin, yPos);
//         yPos += 10;

//         data.workExperience.forEach((exp, index) => {
//             if (yPos > 250) { // Page break check
//                 doc.addPage();
//                 yPos = margin;
//             }

//             doc.setFontSize(12);
//             doc.setFont('helvetica', 'bold');
//             doc.text(exp.jobTitle, margin, yPos);
//             yPos += 5;

//             doc.setFontSize(11);
//             doc.setFont('helvetica', 'normal');
//             doc.text(exp.company, margin, yPos);
//             yPos += 5;

//             const dateRange = exp.current
//                 ? `${exp.startDate} - Present`
//                 : `${exp.startDate} - ${exp.endDate}`;
//             doc.text(dateRange, margin, yPos);
//             yPos += 7;

//             const descLines = doc.splitTextToSize(exp.description, contentWidth);
//             doc.text(descLines, margin, yPos);
//             yPos += (descLines.length * 6) + 5;

//             // Achievements with bullets
//             exp.achievements?.forEach((achievement) => {
//                 if (achievement.trim()) {
//                     const bulletLines = doc.splitTextToSize(`• ${achievement}`, contentWidth - 5);
//                     doc.text(bulletLines, margin + 5, yPos);
//                     yPos += (bulletLines.length * 6);
//                 }
//             });
//             yPos += 10;
//         });

//         // Education
//         doc.setFontSize(14);
//         doc.setFont('helvetica', 'bold');
//         doc.text('EDUCATION', margin, yPos);
//         yPos += 10;

//         data.education.forEach((edu) => {
//             doc.setFontSize(11);
//             doc.setFont('helvetica', 'normal');
//             doc.text(`${edu.degree} in ${edu.field || 'Field'}`, margin, yPos);
//             yPos += 5;
//             doc.text(edu.institution, margin, yPos);
//             yPos += 5;
//             doc.text(edu.graduationYear, margin, yPos);
//             yPos += 10;
//         });

//         // ATS Optimization Section
//         if (data.atsKeywords && data.atsKeywords.length > 0) {
//             if (yPos > 270) {
//                 doc.addPage();
//                 yPos = margin;
//             }

//             doc.setFontSize(14);
//             doc.setFont('helvetica', 'bold');
//             doc.text('KEYWORDS', margin, yPos);
//             yPos += 7;

//             doc.setFontSize(10);
//             doc.setFont('helvetica', 'normal');
//             const keywords = data.atsKeywords.filter(Boolean).join(', ');
//             const keywordLines = doc.splitTextToSize(keywords, contentWidth);
//             doc.text(keywordLines, margin, yPos);
//         }

//         // Save PDF
//         const fileName = `ATS_Resume_${data.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`;
//         doc.save(fileName);
//         toast.success('PDF generated successfully!');
//     };

//     const onSubmit = async (data: ResumeFormData) => {
//         try {
//             const score = calculateATSScore(data);
//             setAtsScore(score);

//             if (previewMode) {
//                 generatePDF(data);
//             } else {
//                 // Save to localStorage or send to backend
//                 localStorage.setItem('resumeData', JSON.stringify(data));
//                 toast.success('Resume saved successfully!');

//                 // Show ATS score
//                 toast.info(`ATS Score: ${score}/100 - ${score >= 70 ? 'Excellent!' : score >= 50 ? 'Good' : 'Needs Improvement'}`);
//             }
//         } catch (error) {
//             toast.error('Error generating PDF');
//             console.error(error);
//         }
//     };

//     const loadSampleData = () => {
//         methods.reset({
//             personalInfo: {
//                 fullName: 'John Doe',
//                 jobTitle: 'Senior Frontend Developer',
//                 email: 'john.doe@email.com',
//                 phone: '(123) 456-7890',
//                 location: 'San Francisco, CA',
//                 linkedin: 'linkedin.com/in/johndoe',
//                 portfolio: 'johndoe.dev',
//             },
//             workExperience: [
//                 {
//                     id: crypto.randomUUID(),
//                     company: 'Tech Corp Inc.',
//                     jobTitle: 'Senior Frontend Developer',
//                     startDate: '2020-03',
//                     endDate: '2023-12',
//                     current: true,
//                     description: 'Led frontend development for multiple high-traffic web applications using React, TypeScript, and modern frontend technologies.',
//                     achievements: [
//                         'Improved application performance by 40% through code optimization',
//                         'Reduced bundle size by 30% using code splitting and lazy loading',
//                         'Mentored 3 junior developers in React best practices',
//                     ],
//                 },
//             ],
//             education: [
//                 {
//                     id: crypto.randomUUID(),
//                     institution: 'Stanford University',
//                     degree: 'Bachelor of Science',
//                     field: 'Computer Science',
//                     graduationYear: '2019',
//                     gpa: '3.8/4.0',
//                     honors: 'Summa Cum Laude',
//                 },
//             ],
//             skills: {
//                 technical: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL'],
//                 soft: ['Leadership', 'Communication', 'Problem Solving'],
//                 tools: ['Git', 'Docker', 'AWS', 'Jest', 'Webpack'],
//                 certifications: ['AWS Certified Developer', 'React Professional'],
//             },
//             professionalSummary: 'Experienced Frontend Developer with 5+ years of expertise in building scalable web applications using React and TypeScript. Proven track record of improving application performance and leading development teams. Strong advocate for clean code, testing, and modern development practices.',
//             atsKeywords: ['React', 'TypeScript', 'Frontend', 'JavaScript', 'Web Development', 'UI/UX'],
//             targetJobTitle: 'Senior Frontend Engineer',
//         });
//         toast.info('Sample data loaded. Fill in your details.');
//     };

//     return (
//         <FormProvider {...methods}>
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//                 <Card className="max-w-6xl mx-auto">
//                     <CardHeader>
//                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                             <div>
//                                 <CardTitle className="text-3xl font-bold text-gray-900">
//                                     ATS-Optimized Resume Builder
//                                 </CardTitle>
//                                 <p className="text-gray-600 mt-2">
//                                     Create an ATS-friendly resume that gets noticed by recruiters
//                                 </p>
//                             </div>

//                             <div className="flex flex-wrap gap-2">
//                                 <Button
//                                     variant="outline"
//                                     onClick={loadSampleData}
//                                     className="flex items-center gap-2"
//                                 >
//                                     <Eye className="h-4 w-4" />
//                                     Load Sample
//                                 </Button>
//                                 <Button
//                                     variant={previewMode ? "default" : "outline"}
//                                     onClick={() => setPreviewMode(!previewMode)}
//                                     className="flex items-center gap-2"
//                                 >
//                                     {previewMode ? <Check className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                                     {previewMode ? 'Editing' : 'Preview'}
//                                 </Button>
//                                 <Button
//                                     onClick={handleSubmit(onSubmit)}
//                                     disabled={isSubmitting}
//                                     className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
//                                 >
//                                     <Download className="h-4 w-4" />
//                                     Generate PDF
//                                 </Button>
//                             </div>
//                         </div>

//                         {atsScore > 0 && (
//                             <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
//                                 <div className="flex items-center justify-between">
//                                     <div>
//                                         <h3 className="font-semibold text-gray-900">ATS Compatibility Score</h3>
//                                         <p className="text-sm text-gray-600">
//                                             {atsScore >= 70 ? 'Excellent! Your resume is highly ATS-friendly' :
//                                                 atsScore >= 50 ? 'Good, but could use some optimization' :
//                                                     'Needs improvement for better ATS compatibility'}
//                                         </p>
//                                     </div>
//                                     <div className="text-right">
//                                         <div className="text-3xl font-bold text-blue-600">{atsScore}/100</div>
//                                         <div className="text-sm text-gray-500">Score</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </CardHeader>

//                     <CardContent>
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//                             {/* Personal Information */}
//                             <section className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                                     Personal Information
//                                 </h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="space-y-2">
//                                         <Label htmlFor="fullName">Full Name *</Label>
//                                         <Input
//                                             id="fullName"
//                                             {...register('personalInfo.fullName')}
//                                             placeholder="John Doe"
//                                         />
//                                         {errors.personalInfo?.fullName && (
//                                             <p className="text-red-500 text-sm">{errors.personalInfo.fullName.message}</p>
//                                         )}
//                                     </div>
//                                     <div className="space-y-2">
//                                         <Label htmlFor="jobTitle">Target Job Title *</Label>
//                                         <Input
//                                             id="jobTitle"
//                                             {...register('personalInfo.jobTitle')}
//                                             placeholder="Senior Frontend Developer"
//                                         />
//                                         {errors.personalInfo?.jobTitle && (
//                                             <p className="text-red-500 text-sm">{errors.personalInfo.jobTitle.message}</p>
//                                         )}
//                                     </div>
//                                     <div className="space-y-2">
//                                         <Label htmlFor="email">Email *</Label>
//                                         <Input
//                                             id="email"
//                                             type="email"
//                                             {...register('personalInfo.email')}
//                                             placeholder="john@example.com"
//                                         />
//                                     </div>
//                                     <div className="space-y-2">
//                                         <Label htmlFor="phone">Phone *</Label>
//                                         <Input
//                                             id="phone"
//                                             {...register('personalInfo.phone')}
//                                             placeholder="(123) 456-7890"
//                                         />
//                                     </div>
//                                 </div>
//                             </section>

//                             {/* Professional Summary */}
//                             <section className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                                     Professional Summary
//                                 </h2>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="professionalSummary">
//                                         Write a compelling summary (50-500 characters) *
//                                     </Label>
//                                     <Textarea
//                                         id="professionalSummary"
//                                         {...register('professionalSummary')}
//                                         placeholder="Experienced developer with expertise in..."
//                                         rows={4}
//                                     />
//                                     <p className="text-sm text-gray-500">
//                                         Tip: Include keywords from the job description
//                                     </p>
//                                 </div>
//                             </section>

//                             {/* Work Experience */}
//                             <section className="space-y-6">
//                                 <div className="flex justify-between items-center">
//                                     <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                                         Work Experience
//                                     </h2>
//                                     <Button
//                                         type="button"
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={() => workExperienceFields.append({
//                                             id: crypto.randomUUID(),
//                                             company: '',
//                                             jobTitle: '',
//                                             startDate: '',
//                                             endDate: '',
//                                             current: false,
//                                             description: '',
//                                             achievements: [''],
//                                         })}
//                                     >
//                                         <Plus className="h-4 w-4 mr-2" />
//                                         Add Experience
//                                     </Button>
//                                 </div>

//                                 {workExperienceFields.fields.map((field, index) => (
//                                     <Card key={field.id} className="relative">
//                                         <CardContent className="pt-6">
//                                             <div className="absolute top-4 right-4">
//                                                 <Button
//                                                     type="button"
//                                                     variant="ghost"
//                                                     size="sm"
//                                                     onClick={() => workExperienceFields.remove(index)}
//                                                 >
//                                                     <Trash2 className="h-4 w-4 text-red-500" />
//                                                 </Button>
//                                             </div>

//                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                 <div className="space-y-2">
//                                                     <Label htmlFor={`workExperience.${index}.company`}>Company *</Label>
//                                                     <Input
//                                                         {...register(`workExperience.${index}.company`)}
//                                                         placeholder="Tech Corp Inc."
//                                                     />
//                                                 </div>
//                                                 <div className="space-y-2">
//                                                     <Label htmlFor={`workExperience.${index}.jobTitle`}>Job Title *</Label>
//                                                     <Input
//                                                         {...register(`workExperience.${index}.jobTitle`)}
//                                                         placeholder="Senior Developer"
//                                                     />
//                                                 </div>
//                                                 <div className="space-y-2">
//                                                     <Label>Start Date</Label>
//                                                     <Input
//                                                         type="month"
//                                                         {...register(`workExperience.${index}.startDate`)}
//                                                     />
//                                                 </div>
//                                                 <div className="space-y-2">
//                                                     <Label>End Date</Label>
//                                                     <Input
//                                                         type="month"
//                                                         {...register(`workExperience.${index}.endDate`)}
//                                                     />
//                                                 </div>
//                                             </div>

//                                             <div className="mt-4 space-y-2">
//                                                 <Label htmlFor={`workExperience.${index}.description`}>
//                                                     Description * (Use action verbs and quantify achievements)
//                                                 </Label>
//                                                 <Textarea
//                                                     {...register(`workExperience.${index}.description`)}
//                                                     placeholder="Led development of... Increased performance by 30%..."
//                                                     rows={3}
//                                                 />
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//                                 ))}
//                             </section>

//                             {/* Skills Section */}
//                             <section className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                                     Skills & Technologies
//                                 </h2>
//                                 <div className="space-y-4">
//                                     <div className="space-y-2">
//                                         <Label>Technical Skills * (Comma separated)</Label>
//                                         <Textarea
//                                             {...register('skills.technical')}
//                                             placeholder="React, TypeScript, Node.js, Python, AWS"
//                                             rows={2}
//                                         />
//                                         <p className="text-sm text-gray-500">
//                                             Most important for ATS. Match job description keywords.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </section>

//                             {/* ATS Keywords */}
//                             <section className="space-y-4">
//                                 <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
//                                     ATS Optimization
//                                 </h2>
//                                 <div className="space-y-2">
//                                     <Label>Keywords for ATS (Comma separated)</Label>
//                                     <Textarea
//                                         {...register('atsKeywords')}
//                                         placeholder="Add specific keywords from job descriptions"
//                                         rows={2}
//                                     />
//                                     <p className="text-sm text-gray-500">
//                                         These keywords help your resume pass through ATS filters
//                                     </p>
//                                 </div>
//                             </section>

//                             {/* Action Buttons */}
//                             <div className="flex justify-end gap-4 pt-6 border-t">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={() => methods.reset()}
//                                 >
//                                     Clear All
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
//                                     size="lg"
//                                 >
//                                     <Download className="h-5 w-5 mr-2" />
//                                     Generate & Download PDF
//                                 </Button>
//                             </div>
//                         </form>
//                     </CardContent>
//                 </Card>

//                 {/* ATS Tips Section */}
//                 <Card className="max-w-6xl mx-auto mt-6">
//                     <CardHeader>
//                         <CardTitle className="text-lg font-semibold">ATS Optimization Tips</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <ul className="space-y-2 text-sm text-gray-600">
//                             <li className="flex items-start gap-2">
//                                 <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                                 <span>Use standard section headings (Experience, Education, Skills)</span>
//                             </li>
//                             <li className="flex items-start gap-2">
//                                 <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                                 <span>Include keywords from the job description</span>
//                             </li>
//                             <li className="flex items-start gap-2">
//                                 <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                                 <span>Use bullet points and action verbs (Managed, Developed, Created)</span>
//                             </li>
//                             <li className="flex items-start gap-2">
//                                 <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                                 <span>Quantify achievements with numbers and percentages</span>
//                             </li>
//                             <li className="flex items-start gap-2">
//                                 <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
//                                 <span>Avoid tables, columns, and graphics</span>
//                             </li>
//                         </ul>
//                     </CardContent>
//                 </Card>
//             </div>
//         </FormProvider>
//     );
// };

// export default ATSResumeBuilder;







import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema, ResumeFormData } from '../components/Admin components/cv/resume-schema';
import { toast } from 'sonner';

// ShadCN Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Lucide Icons
import {
  Plus,
  Trash2,
  Download,
  Eye,
  Save,
  Check,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Star,
  Lightbulb,
  AlertCircle,
  FileText,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Link,
  ChevronRight,
  Sparkles,
  Target
} from 'lucide-react';

export const ATSResumeBuilderUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [completionProgress, setCompletionProgress] = useState(0);
  const [showTips, setShowTips] = useState(true);

  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
      },
      workExperience: [
        {
          id: crypto.randomUUID(),
          company: '',
          jobTitle: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: [''],
        },
      ],
      education: [
        {
          id: crypto.randomUUID(),
          institution: '',
          degree: '',
          field: '',
          graduationYear: '',
          gpa: '',
          honors: '',
        },
      ],
      skills: {
        technical: [''],
        soft: [''],
        tools: [''],
        certifications: [''],
      },
      professionalSummary: '',
      atsKeywords: [],
      targetJobTitle: '',
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = methods;

  const workExperienceFields = useFieldArray({
    control,
    name: 'workExperience',
  });

  const educationFields = useFieldArray({
    control,
    name: 'education',
  });

  const skillsTechnicalFields = useFieldArray({
    control,
    name: 'skills.technical',
  });

  // Calculate completion progress
  const calculateProgress = () => {
    const formValues = watch();
    let filledFields = 0;
    let totalFields = 0;

    // Personal Info
    Object.values(formValues.personalInfo).forEach(value => {
      totalFields++;
      if (value && value.toString().trim().length > 0) filledFields++;
    });

    // Work Experience
    formValues.workExperience.forEach(exp => {
      ['company', 'jobTitle', 'description'].forEach(field => {
        totalFields++;
        if (exp[field as keyof typeof exp]?.toString().trim().length > 0) filledFields++;
      });
    });

    // Education
    formValues.education.forEach(edu => {
      ['institution', 'degree'].forEach(field => {
        totalFields++;
        if (edu[field as keyof typeof edu]?.toString().trim().length > 0) filledFields++;
      });
    });

    // Skills
    if (formValues.skills.technical.some(skill => skill.trim().length > 0)) filledFields++;
    totalFields++;

    // Professional Summary
    totalFields++;
    if (formValues.professionalSummary.trim().length > 0) filledFields++;

    const progress = Math.round((filledFields / totalFields) * 100);
    setCompletionProgress(progress);
    return progress;
  };

  // ATS Score Calculation
  const calculateATSScore = () => {
    const data = watch();
    let score = 0;

    // Basic completeness
    if (data.personalInfo.jobTitle) score += 10;
    if (data.workExperience.length > 0) score += 20;
    if (data.education.length > 0) score += 10;

    // Skills density
    if (data.skills.technical.filter(s => s.trim().length > 0).length > 5) score += 15;

    // Summary quality
    if (data.professionalSummary.length > 100) score += 10;

    // Action verbs check
    const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'increased', 'reduced', 'led', 'improved'];
    const allDescriptions = data.workExperience.map(exp => exp.description).join(' ');
    const hasActionVerbs = actionVerbs.some(verb => allDescriptions.toLowerCase().includes(verb));
    if (hasActionVerbs) score += 15;

    // Quantifiable achievements
    const hasQuantifiable = /\d+%|\$|\d+\+|\d+\s(year|month)/i.test(allDescriptions);
    if (hasQuantifiable) score += 10;

    // Keywords
    if (data.atsKeywords && data.atsKeywords.length > 3) score += 10;

    return Math.min(score, 100);
  };

  const onSubmit = async (data: ResumeFormData) => {
    try {
      const score = calculateATSScore();
      toast.success(`CV جاهز للتحميل! درجة التوافق: ${score}/100`);
      // Here you would generate the PDF
    } catch (error) {
      toast.error('حدث خطأ، حاول مرة أخرى');
    }
  };

  // Auto-calculate progress on form changes
  React.useEffect(() => {
    const subscription = watch(() => calculateProgress());
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  ATS Resume Builder
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    <Sparkles className="h-3 w-3 mr-1" />
                    ATS-Optimized
                  </Badge>
                </h1>
                <p className="text-gray-600 mt-2">
                  أنشئ سيرة ذاتية متوافقة مع أنظمة التتبع الآلي (ATS) بسهولة
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTips(!showTips)}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  {showTips ? 'إخفاء النصائح' : 'عرض النصائح'}
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Download className="h-4 w-4" />
                  تحميل CV
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  اكتمال النموذج: {completionProgress}%
                </span>
                <span className="text-sm font-medium text-gray-700">
                  درجة ATS: {calculateATSScore()}/100
                </span>
              </div>
              <Progress value={completionProgress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>ابدأ</span>
                <span>اكتمل تقريبًا</span>
                <span>جاهز للتحميل!</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form - Left 2/3 */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-5 mb-4">
                      <TabsTrigger value="personal" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">معلومات شخصية</span>
                      </TabsTrigger>
                      <TabsTrigger value="summary" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">ملخص</span>
                      </TabsTrigger>
                      <TabsTrigger value="experience" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span className="hidden sm:inline">خبرة</span>
                      </TabsTrigger>
                      <TabsTrigger value="education" className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        <span className="hidden sm:inline">تعليم</span>
                      </TabsTrigger>
                      <TabsTrigger value="skills" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        <span className="hidden sm:inline">مهارات</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Personal Info Tab */}
                    <TabsContent value="personal" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              الاسم الكامل *
                            </Label>
                            <Input
                              {...register('personalInfo.fullName')}
                              placeholder="أحمد محمد علي"
                              className={errors.personalInfo?.fullName ? 'border-red-500' : ''}
                            />
                            {errors.personalInfo?.fullName && (
                              <p className="text-red-500 text-sm">{errors.personalInfo.fullName.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4" />
                              المسمى الوظيفي *
                            </Label>
                            <Input
                              {...register('personalInfo.jobTitle')}
                              placeholder="مطور واجهات أمامية أول"
                              className={errors.personalInfo?.jobTitle ? 'border-red-500' : ''}
                            />
                            {errors.personalInfo?.jobTitle && (
                              <p className="text-red-500 text-sm">{errors.personalInfo.jobTitle.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              البريد الإلكتروني *
                            </Label>
                            <Input
                              type="email"
                              {...register('personalInfo.email')}
                              placeholder="ahmed.ali@email.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              رقم الهاتف *
                            </Label>
                            <Input
                              {...register('personalInfo.phone')}
                              placeholder="+201012345678"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              المكان
                            </Label>
                            <Input
                              {...register('personalInfo.location')}
                              placeholder="القاهرة، مصر"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              لينكدإن
                            </Label>
                            <Input
                              {...register('personalInfo.linkedin')}
                              placeholder="linkedin.com/in/ahmed-ali"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                              <Link className="h-4 w-4" />
                              الموقع الإلكتروني
                            </Label>
                            <Input
                              {...register('personalInfo.portfolio')}
                              placeholder="ahmedali.dev"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Professional Summary Tab */}
                    <TabsContent value="summary" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-lg font-semibold">الملخص المهني</Label>
                          <Badge variant="outline" className="text-xs">
                            {watch('professionalSummary')?.length || 0}/500 حرف
                          </Badge>
                        </div>
                        <Textarea
                          {...register('professionalSummary')}
                          placeholder="أكتب ملخصًا مهنيًا قويًا يصف خبراتك وإنجازاتك... مثال: 'مطور واجهات أمامية بخبرة 5 سنوات في بناء تطبيقات ويب معقدة باستخدام React و TypeScript. متخصص في تحسين الأداء وتجربة المستخدم...'"
                          className="min-h-[200px] resize-none"
                          maxLength={500}
                        />
                        <div className="text-sm text-gray-500 space-y-2">
                          <p className="flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            <strong>نصائح لملخص ATS فعال:</strong>
                          </p>
                          <ul className="list-disc list-inside space-y-1 pr-4">
                            <li>أبدأ بالمسمى الوظيفي وعدد سنوات الخبرة</li>
                            <li>أذكر التقنيات الرئيسية التي تتقنها</li>
                            <li>أضف إنجازات قابلة للقياس</li>
                            <li>استخدم كلمات مفتاحية من الوصف الوظيفي</li>
                          </ul>
                        </div>
                      </div>

                      {/* ATS Keywords */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          الكلمات المفتاحية لـ ATS
                        </Label>
                        <Textarea
                          {...register('atsKeywords')}
                          placeholder="أدخل الكلمات المفتاحية (مفصولة بفواصل): React, TypeScript, Frontend Development, Web Applications, UI/UX..."
                          className="min-h-[100px]"
                        />
                        <div className="flex flex-wrap gap-2">
                          {watch('atsKeywords')?.split(',').filter(k => k.trim()).map((keyword, index) => (
                            <Badge key={index} variant="secondary">
                              {keyword.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Work Experience Tab */}
                    <TabsContent value="experience" className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">الخبرة العملية</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => workExperienceFields.append({
                            id: crypto.randomUUID(),
                            company: '',
                            jobTitle: '',
                            startDate: '',
                            endDate: '',
                            current: false,
                            description: '',
                            achievements: [''],
                          })}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          إضافة خبرة
                        </Button>
                      </div>

                      {workExperienceFields.fields.map((field, index) => (
                        <Card key={field.id} className="relative border-dashed border-2">
                          <CardContent className="pt-6">
                            <div className="absolute top-4 left-4">
                              <Badge variant="outline">#{index + 1}</Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => workExperienceFields.remove(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                              <div className="space-y-2">
                                <Label>اسم الشركة *</Label>
                                <Input
                                  {...register(`workExperience.${index}.company`)}
                                  placeholder="شركة تك المصري"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>المسمى الوظيفي *</Label>
                                <Input
                                  {...register(`workExperience.${index}.jobTitle`)}
                                  placeholder="مطور واجهات أمامية أول"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>تاريخ البدء</Label>
                                <Input
                                  type="month"
                                  {...register(`workExperience.${index}.startDate`)}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label>تاريخ الانتهاء</Label>
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor={`current-${index}`} className="text-sm">ما زلت أعمل هنا</Label>
                                    <Switch
                                      id={`current-${index}`}
                                      {...register(`workExperience.${index}.current`)}
                                    />
                                  </div>
                                </div>
                                <Input
                                  type="month"
                                  {...register(`workExperience.${index}.endDate`)}
                                  disabled={watch(`workExperience.${index}.current`)}
                                />
                              </div>
                            </div>

                            <div className="mt-4 space-y-2">
                              <Label className="flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                الوصف والإنجازات *
                                <Badge variant="outline" className="text-xs">
                                  ATS Tip: استخدم أفعال قوية
                                </Badge>
                              </Label>
                              <Textarea
                                {...register(`workExperience.${index}.description`)}
                                placeholder="وصف الوظيفة والإنجازات... مثال: 'قاد تطوير منصة تجارة إلكترونية باستخدام React و TypeScript... زادت الأداء بنسبة 40%... درست فريق مكون من 3 مطورين...'"
                                rows={3}
                              />

                              {/* Achievements */}
                              <div className="mt-4">
                                <Label className="text-sm font-medium">الإنجازات المحددة (اختياري)</Label>
                                <div className="space-y-2 mt-2">
                                  {[0, 1, 2].map((achIndex) => (
                                    <div key={achIndex} className="flex items-center gap-2">
                                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                      <Input
                                        placeholder={`إنجاز ${achIndex + 1}... مثال: 'حسنت وقت تحميل التطبيق بنسبة 60%'`}
                                        className="flex-1"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    {/* Education Tab */}
                    <TabsContent value="education" className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">التعليم والمؤهلات</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => educationFields.append({
                            id: crypto.randomUUID(),
                            institution: '',
                            degree: '',
                            field: '',
                            graduationYear: '',
                            gpa: '',
                            honors: '',
                          })}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          إضافة مؤهل
                        </Button>
                      </div>

                      {educationFields.fields.map((field, index) => (
                        <Card key={field.id} className="relative">
                          <CardContent className="pt-6">
                            <div className="absolute top-4 right-4">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => educationFields.remove(index)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>اسم المؤسسة التعليمية *</Label>
                                <Input
                                  {...register(`education.${index}.institution`)}
                                  placeholder="جامعة القاهرة"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>الدرجة العلمية *</Label>
                                <Select onValueChange={(value) => setValue(`education.${index}.degree`, value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر الدرجة" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="بكالوريوس">بكالوريوس</SelectItem>
                                    <SelectItem value="ماجستير">ماجستير</SelectItem>
                                    <SelectItem value="دكتوراه">دكتوراه</SelectItem>
                                    <SelectItem value="دبلوم">دبلوم</SelectItem>
                                    <SelectItem value="شهادة">شهادة</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>التخصص</Label>
                                <Input
                                  {...register(`education.${index}.field`)}
                                  placeholder="هندسة الحاسبات"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>سنة التخرج</Label>
                                <Input
                                  type="number"
                                  min="1900"
                                  max="2099"
                                  step="1"
                                  {...register(`education.${index}.graduationYear`)}
                                  placeholder="2020"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>المعدل التراكمي (GPA)</Label>
                                <Input
                                  {...register(`education.${index}.gpa`)}
                                  placeholder="3.7/4.0"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>التكريمات (اختياري)</Label>
                                <Input
                                  {...register(`education.${index}.honors`)}
                                  placeholder="مرتبة الشرف الأولى"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    {/* Skills Tab */}
                    <TabsContent value="skills" className="space-y-6">
                      <div className="space-y-6">
                        {/* Technical Skills */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <Label className="text-lg font-semibold flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              المهارات التقنية *
                              <Badge className="bg-blue-100 text-blue-800">
                                أهم قسم لـ ATS
                              </Badge>
                            </Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => skillsTechnicalFields.append('')}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              إضافة مهارة
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {skillsTechnicalFields.fields.map((field, index) => (
                              <div key={field.id} className="relative">
                                <Input
                                  {...register(`skills.technical.${index}`)}
                                  placeholder="مثال: React"
                                  className="pr-8"
                                />
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute left-1 top-1 h-6 w-6 p-0"
                                    onClick={() => skillsTechnicalFields.remove(index)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {watch('skills.technical').filter(skill => skill.trim().length > 0).map((skill, index) => (
                              <Badge key={index} variant="default" className="text-sm">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Soft Skills */}
                        <div className="space-y-4">
                          <Label className="text-lg font-semibold">المهارات الشخصية</Label>
                          <div className="flex flex-wrap gap-2">
                            {['قيادة الفريق', 'التواصل', 'حل المشكلات', 'العمل الجماعي', 'إدارة الوقت'].map((skill) => (
                              <Button
                                key={skill}
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const current = watch('skills.soft') || [];
                                  if (!current.includes(skill)) {
                                    setValue('skills.soft', [...current, skill]);
                                  }
                                }}
                              >
                                {skill}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        {/* Certifications */}
                        <div className="space-y-4">
                          <Label className="text-lg font-semibold flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            الشهادات والدورات
                          </Label>
                          <div className="space-y-2">
                            {[0, 1, 2].map((index) => (
                              <Input
                                key={index}
                                {...register(`skills.certifications.${index}`)}
                                placeholder={`شهادة ${index + 1}... مثال: AWS Certified Developer`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>

            {/* Sidebar - Right 1/3 */}
            <div className="space-y-6">
              {/* Tips Card */}
              {showTips && (
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      نصائح لـ ATS
                    </CardTitle>
                    <CardDescription>
                      اجعل سيرتك الذاتية متوافقة مع الأنظمة الآلية
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">استخدم تنسيق نصي بسيط بدون جداول أو صور</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">أضف الكلمات المفتاحية من الوصف الوظيفي</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">استخدم أفعال قوية مثل: طورت، قمت، حققت</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">أضف أرقام وإحصائيات لإنجازاتك</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Preview Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    معاينة سريعة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">{watch('personalInfo.fullName') || 'الاسم الكامل'}</h4>
                    <p className="text-sm text-gray-600">{watch('personalInfo.jobTitle') || 'المسمى الوظيفي'}</p>
                    <p className="text-xs text-gray-500">{watch('personalInfo.location') || 'المكان'}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">الخبرات:</h5>
                    <div className="space-y-1">
                      {watch('workExperience')?.slice(0, 2).map((exp, index) => (
                        <div key={index} className="text-xs">
                          <span className="font-medium">{exp.jobTitle || 'المسمى الوظيفي'}</span>
                          <span className="text-gray-500"> • {exp.company || 'الشركة'}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">المهارات:</h5>
                    <div className="flex flex-wrap gap-1">
                      {watch('skills.technical')?.slice(0, 6).filter(skill => skill.trim()).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ATS Score Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    تقرير ATS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600">{calculateATSScore()}</div>
                    <div className="text-sm text-gray-500">من 100</div>
                    <Progress value={calculateATSScore()} className="h-2 mt-2" />
                  </div>

                  <div className="space-y-3">
                    {calculateATSScore() < 50 && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          سيرتك الذاتية تحتاج تحسينًا لتتوافق مع ATS
                        </AlertDescription>
                      </Alert>
                    )}

                    {calculateATSSscore() >= 50 && calculateATSScore() < 80 && (
                      <Alert variant="default">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          جيد! يمكنك تحسين النقاط باتباع النصائح
                        </AlertDescription>
                      </Alert>
                    )}

                    {calculateATSScore() >= 80 && (
                      <Alert className="bg-green-50 border-green-200">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-sm text-green-700">
                          ممتاز! سيرتك الذاتية متوافقة تمامًا مع ATS
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      const score = calculateATSScore();
                      let message = '';
                      if (score < 50) message = 'أضف المزيد من الكلمات المفتاحية والإنجازات';
                      else if (score < 80) message = 'حاول تحسين الملخص وإضافة إحصائيات';
                      else message = 'أنت على المسار الصحيح!';
                      toast.info(message);
                    }}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    اقتراحات للتحسين
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      // Auto-fill sample data
                      const sampleData: Partial<ResumeFormData> = {
                        personalInfo: {
                          fullName: 'أحمد محمد علي',
                          jobTitle: 'مطور واجهات أمامية أول',
                          email: 'ahmed.ali@email.com',
                          phone: '+201012345678',
                          location: 'القاهرة، مصر',
                          linkedin: 'linkedin.com/in/ahmed-ali',
                          portfolio: 'ahmedali.dev',
                        },
                        professionalSummary: 'مطور واجهات أمامية بخبرة 5 سنوات في بناء تطبيقات ويب معقدة باستخدام React و TypeScript. متخصص في تحسين الأداء وتجربة المستخدم. قاد فريق مكون من 4 مطورين في مشاريع ناجحة حققت زيادة في الإيرادات بنسبة 30%.',
                      };
                      Object.keys(sampleData).forEach((key) => {
                        // @ts-ignore
                        setValue(key, sampleData[key]);
                      });
                      toast.success('تم تحميل البيانات النموذجية');
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    تعبئة تلقائية (نموذج)
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const text = `
                        الاسم: ${watch('personalInfo.fullName')}
                        الوظيفة: ${watch('personalInfo.jobTitle')}
                        الملخص: ${watch('professionalSummary')?.substring(0, 100)}...
                        الخبرات: ${watch('workExperience')?.length || 0}
                        المهارات: ${watch('skills.technical')?.filter(s => s.trim()).length || 0}
                      `;
                      navigator.clipboard.writeText(text);
                      toast.success('تم نسخ البيانات');
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    نسخ البيانات
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      Object.keys(watch()).forEach((key) => {
                        // @ts-ignore
                        if (typeof watch(key) === 'object') {
                          // @ts-ignore
                          Object.keys(watch(key)).forEach((subKey) => {
                            // @ts-ignore
                            setValue(`${key}.${subKey}`, '');
                          });
                        } else {
                          // @ts-ignore
                          setValue(key, '');
                        }
                      });
                      toast.info('تم مسح جميع الحقول');
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    مسح الكل
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
            <div className="text-sm text-gray-600">
              <p>💡 <strong>تذكر:</strong> أنظمة ATS تفضل السير الذاتية النصية البسيطة</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  const data = methods.getValues();
                  localStorage.setItem('resumeDraft', JSON.stringify(data));
                  toast.success('تم الحفظ مؤقتًا');
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                حفظ مسودة
              </Button>

              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid || completionProgress < 30}
                className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {isValid ? 'تحميل السيرة الذاتية' : 'أكمل البيانات المطلوبة'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ATSResumeBuilderUI;