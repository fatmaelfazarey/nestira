

// import React, { useState } from 'react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Sparkles, ArrowRight, Search, FileText, ChevronDown, Plus } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { FindMyMatchModal } from '@/components/FindMyMatchModal';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';

// // This should ideally be shared, but defining it here to avoid modifying other files.
// interface JobPost {
//   id: number;
//   title: string;
//   location: string;
//   subfields: string[];
//   requirements: string[];
//   department: string;
//   postedDate: string;
// }

// interface QuizPersonalizationProps {
//   onRoleSelected: (roleData: any) => void;
// }

// export function QuizPersonalization({ onRoleSelected }: QuizPersonalizationProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedRole, setSelectedRole] = useState('');
//   const [inputMethod, setInputMethod] = useState<'search' | 'jobpost' | 'dropdown' | null>(null);
//   const [customRole, setCustomRole] = useState('');

//   const handleJobSelected = (job: JobPost) => {
//     const roleData = {
//       title: job.title,
//       method: 'jobpost',
//       data: job
//     };
//     onRoleSelected(roleData);
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       const roleData = {
//         title: searchQuery,
//         method: 'search',
//         data: { searchQuery }
//       };
//       onRoleSelected(roleData);
//     }
//   };

//   const handleDropdownSelect = (value: string) => {
//     if (value === 'other') {
//       setSelectedRole('other');
//       setCustomRole('');
//     } else {
//       setSelectedRole(value);
//       const roleData = {
//         title: value,
//         method: 'dropdown',
//         data: { role: value }
//       };
//       onRoleSelected(roleData);
//     }
//   };

//   const handleCustomRoleSubmit = () => {
//     if (customRole.trim()) {
//       setSelectedRole(customRole);
//       const roleData = {
//         title: customRole,
//         method: 'custom',
//         data: { role: customRole }
//       };
//       onRoleSelected(roleData);
//     }
//   };

//   const roleOptions = [
//     "Senior Finance Manager",
//     "Financial Analyst",
//     "Accounting Manager",
//     "Tax Specialist",
//     "Audit Manager",
//     "Risk Manager",
//     "Budget Analyst",
//     "Treasury Analyst"
//   ];

//   const exampleQueries = [
//     "Finance manager with SAP experience in Dubai",
//     "CPA certified analyst with 5+ years experience",
//     "Accounting professional fluent in IFRS",
//     "Senior finance role, team leadership skills"
//   ];

//   return (
//     <>
//       <div className="space-y-8">
//         <div className="space-y-4">
//           <div className="text-center space-y-2">
//             <h2 className="text-3xl font-bold">What job role are you hiring for?</h2>
//             <p className="text-gray-600">Choose how you'd like to define the role to get personalized quiz recommendations</p>
//           </div>

//           {/* Method Selection Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* AI Talent Search */}
//             <Card
//               className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'search' ? 'ring-2 ring-blue-500 border-blue-200' : ''
//                 }`}
//               onClick={() => setInputMethod('search')}
//             >
//               <CardHeader className="pb-3">
//                 <div className="flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-blue-600" />
//                   <CardTitle className="text-lg">AI Talent Search</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Describe your ideal candidate in natural language
//                 </p>
//                 {inputMethod === 'search' && (
//                   <div className="space-y-3">
//                     <div className="flex gap-2 flex-col">

//                       <Input
//                         placeholder="Job title or Role"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                         className="flex-1"
//                       />
//                       <div className='flex gap-2'>
//                         <label>MCQ</label>
//                         <Input
//                           type='number'
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                           className="flex-1"
//                         />
//                       </div>
//                       <div className='flex gap-2'>
//                         <label>True False</label>
//                         <Input
//                           type='number'
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                           className="flex-1"
//                         />
//                       </div>
//                       <div className='flex gap-2'>
//                         <label>Short answer</label>
//                         <Input
//                           type='number'
//                           value={searchQuery}
//                           onChange={(e) => setSearchQuery(e.target.value)}
//                           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                           className="flex-1"
//                         />
//                       </div>
//                       <Textarea
//                         placeholder="e.g., Finance manager with 5+ years experience..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                         className="flex-1"
//                       />
//                       <Button
//                         onClick={handleSearch}
//                         disabled={!searchQuery.trim()}
//                         size="sm"
//                         variant="outline"
//                       >
//                         <Search className="w-4 h-4" />
//                       </Button>
//                     </div>
//                     {/* <div className="space-y-2">
//                       <p className="text-xs text-gray-500">Try these examples:</p>
//                       <div className="flex flex-wrap gap-1">
//                         {exampleQueries.map((example, index) => (
//                           <Badge
//                             key={index}
//                             variant="secondary"
//                             className="cursor-pointer hover:bg-blue-100 text-xs"
//                             onClick={() => setSearchQuery(example)}
//                           >
//                             {example}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div> */}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* From Job Post */}
//             <Card
//               className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'jobpost' ? 'ring-2 ring-green-500 border-green-200' : ''
//                 }`}
//               onClick={() => setInputMethod('jobpost')}
//             >
//               <CardHeader className="pb-3">
//                 <div className="flex items-center gap-2">
//                   <FileText className="w-5 h-5 text-green-600" />
//                   <CardTitle className="text-lg">From Job Post</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Select from your existing job postings
//                 </p>
//                 {inputMethod === 'jobpost' && (
//                   <Button
//                     onClick={() => setIsModalOpen(true)}
//                     variant="outline"
//                     className="w-full"
//                   >
//                     Browse Job Posts
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Role Dropdown */}
//             <Card
//               className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'dropdown' ? 'ring-2 ring-purple-500 border-purple-200' : ''
//                 }`}
//               onClick={() => setInputMethod('dropdown')}
//             >
//               <CardHeader className="pb-3">
//                 <div className="flex items-center gap-2">
//                   <ChevronDown className="w-5 h-5 text-purple-600" />
//                   <CardTitle className="text-lg">Select Role</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Pick from common finance & accounting roles
//                 </p>
//                 {inputMethod === 'dropdown' && (
//                   <div className="space-y-4">
//                     <Select
//                       value={selectedRole}
//                       onValueChange={handleDropdownSelect}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Choose a role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {roleOptions.map((role) => (
//                           <SelectItem key={role} value={role}>
//                             {role}
//                           </SelectItem>
//                         ))}
//                         <div className="px-2 py-1.5">
//                           <Separator className="my-2" />
//                           <SelectItem value="other" className="text-purple-600 font-medium">
//                             <div className="flex items-center gap-2">
//                               <Plus className="w-4 h-4" />
//                               Other (Write your own)
//                             </div>
//                           </SelectItem>
//                         </div>
//                       </SelectContent>
//                     </Select>

//                     {/* Show custom input when "Other" is selected */}
//                     {selectedRole === 'other' && (
//                       <div className="space-y-3 p-3 border border-dashed border-purple-200 rounded-lg bg-purple-50">
//                         <Label htmlFor="customRole">Enter Role Name</Label>
//                         <div className="flex gap-2">
//                           <Input
//                             id="customRole"
//                             placeholder="e.g., Chief Financial Officer, Financial Controller..."
//                             value={customRole}
//                             onChange={(e) => setCustomRole(e.target.value)}
//                             onKeyPress={(e) => e.key === 'Enter' && handleCustomRoleSubmit()}
//                             className="flex-1"
//                           />
//                           <Button
//                             onClick={handleCustomRoleSubmit}
//                             disabled={!customRole.trim()}
//                             size="sm"
//                             variant="outline"
//                           >
//                             <ArrowRight className="w-4 h-4" />
//                           </Button>
//                         </div>
//                         <p className="text-xs text-gray-500">
//                           Type any finance or accounting role not listed above
//                         </p>
//                       </div>
//                     )}

//                     {/* Show selected role when not "Other" */}
//                     {selectedRole && selectedRole !== 'other' && (
//                       <div className="p-3 border border-green-200 rounded-lg bg-green-50">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-sm text-gray-600">Selected Role:</p>
//                             <p className="font-medium text-green-700">{selectedRole}</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <FindMyMatchModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onJobSelected={handleJobSelected}
//       />
//     </>
//   );
// }








import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Sparkles, ArrowRight, Search, FileText, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FindMyMatchModal } from '@/components/FindMyMatchModal';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// This should ideally be shared, but defining it here to avoid modifying other files.
interface JobPost {
  id: number;
  title: string;
  location: string;
  subfields: string[];
  requirements: string[];
  department: string;
  postedDate: string;
}

interface QuizPersonalizationProps {
  onRoleSelected: (roleData: any) => void;
}

export function QuizPersonalization({ onRoleSelected }: QuizPersonalizationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [inputMethod, setInputMethod] = useState<'search' | 'jobpost' | 'dropdown' | null>(null);
  const [customRole, setCustomRole] = useState('');

  // New states for AI quiz configuration
  const [jobTitle, setJobTitle] = useState('');
  const [mcqCount, setMcqCount] = useState(3);
  const [trueFalseCount, setTrueFalseCount] = useState(2);
  const [shortAnswerCount, setShortAnswerCount] = useState(1);
  const [jobDescription, setJobDescription] = useState('');

  const handleJobSelected = (job: JobPost) => {
    const roleData = {
      title: job.title,
      method: 'jobpost',
      data: job
    };
    onRoleSelected(roleData);
  };

  const handleSearch = () => {
    if (jobTitle.trim() || searchQuery.trim()) {
      const roleData = {
        title: jobTitle || searchQuery,
        method: 'search',
        data: {
          jobTitle,
          searchQuery,
          mcqCount,
          trueFalseCount,
          shortAnswerCount,
          jobDescription,
          questionTypes: {
            mcq: mcqCount,
            trueFalse: trueFalseCount,
            shortAnswer: shortAnswerCount
          },
          totalQuestions: mcqCount + trueFalseCount + shortAnswerCount
        }
      };

      console.log('AI Quiz Data:', roleData);
      onRoleSelected(roleData);

      // Reset form
      setJobTitle('');
      setMcqCount(3);
      setTrueFalseCount(2);
      setShortAnswerCount(1);
      setJobDescription('');
    }
  };

  const handleDropdownSelect = (value: string) => {
    if (value === 'other') {
      setSelectedRole('other');
      setCustomRole('');
    } else {
      setSelectedRole(value);
      const roleData = {
        title: value,
        method: 'dropdown',
        data: { role: value }
      };
      onRoleSelected(roleData);
    }
  };

  const handleCustomRoleSubmit = () => {
    if (customRole.trim()) {
      setSelectedRole(customRole);
      const roleData = {
        title: customRole,
        method: 'custom',
        data: { role: customRole }
      };
      onRoleSelected(roleData);
    }
  };

  const handleNumberInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue);
    } else if (value === '') {
      setter(0);
    }
  };

  const roleOptions = [
    "Senior Finance Manager",
    "Financial Analyst",
    "Accounting Manager",
    "Tax Specialist",
    "Audit Manager",
    "Risk Manager",
    "Budget Analyst",
    "Treasury Analyst"
  ];

  const exampleQueries = [
    "Finance manager with SAP experience in Dubai",
    "CPA certified analyst with 5+ years experience",
    "Accounting professional fluent in IFRS",
    "Senior finance role, team leadership skills"
  ];

  return (
    // <>
    //   <div className="space-y-8">
    //     <div className="space-y-4">
    //       <div className="text-center space-y-2">
    //         <h2 className="text-3xl font-bold">What job role are you hiring for?</h2>
    //         <p className="text-gray-600">Choose how you'd like to define the role to get personalized quiz recommendations</p>
    //       </div>

    //       {/* Method Selection Cards */}
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //         {/* AI Talent Search */}
    //         <Card
    //           className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'search' ? 'ring-2 ring-blue-500 border-blue-200' : ''
    //             }`}
    //           onClick={() => setInputMethod('search')}
    //         >
    //           <CardHeader className="pb-3">
    //             <div className="flex items-center gap-2">
    //               <Sparkles className="w-5 h-5 text-blue-600" />
    //               <CardTitle className="text-lg">AI Talent Search</CardTitle>
    //             </div>
    //           </CardHeader>
    //           <CardContent>
    //             <p className="text-sm text-gray-600 mb-3">
    //               Describe your ideal candidate in natural language
    //             </p>

    //             {inputMethod === 'search' && (
    //               <div className="space-y-4">
    //                 {/* Job Title Input */}
    //                 <div className="space-y-2">
    //                   <Label htmlFor="job-title" className="text-sm font-medium">
    //                     Job Title / Role Name *
    //                   </Label>
    //                   <Input
    //                     id="job-title"
    //                     placeholder="e.g., Senior Finance Manager, Financial Analyst..."
    //                     value={jobTitle}
    //                     onChange={(e) => setJobTitle(e.target.value)}
    //                     className="w-full"
    //                   />
    //                 </div>

    //                 {/* Question Type Counts */}
    //                 <div className="space-y-3">
    //                   <Label className="text-sm font-medium">Number of Questions</Label>

    //                   <div className="space-y-2">
    //                     {/* MCQ */}
    //                     <div className="flex items-center justify-between gap-2">
    //                       <Label htmlFor="mcq-count" className="text-sm min-w-[100px]">
    //                         MCQ Questions
    //                       </Label>
    //                       <div className="flex items-center gap-2 flex-1">
    //                         <Input
    //                           id="mcq-count"
    //                           type="number"
    //                           min="0"
    //                           max="20"
    //                           value={mcqCount}
    //                           onChange={(e) => handleNumberInputChange(setMcqCount, e.target.value)}
    //                           className="w-full"
    //                         />
    //                         <span className="text-sm text-gray-500">questions</span>
    //                       </div>
    //                     </div>

    //                     {/* True/False */}
    //                     <div className="flex items-center justify-between gap-2">
    //                       <Label htmlFor="true-false-count" className="text-sm min-w-[100px]">
    //                         True/False
    //                       </Label>
    //                       <div className="flex items-center gap-2 flex-1">
    //                         <Input
    //                           id="true-false-count"
    //                           type="number"
    //                           min="0"
    //                           max="20"
    //                           value={trueFalseCount}
    //                           onChange={(e) => handleNumberInputChange(setTrueFalseCount, e.target.value)}
    //                           className="w-full"
    //                         />
    //                         <span className="text-sm text-gray-500">questions</span>
    //                       </div>
    //                     </div>

    //                     {/* Short Answer */}
    //                     <div className="flex items-center justify-between gap-2">
    //                       <Label htmlFor="short-answer-count" className="text-sm min-w-[100px]">
    //                         Short Answer
    //                       </Label>
    //                       <div className="flex items-center gap-2 flex-1">
    //                         <Input
    //                           id="short-answer-count"
    //                           type="number"
    //                           min="0"
    //                           max="10"
    //                           value={shortAnswerCount}
    //                           onChange={(e) => handleNumberInputChange(setShortAnswerCount, e.target.value)}
    //                           className="w-full"
    //                         />
    //                         <span className="text-sm text-gray-500">questions</span>
    //                       </div>
    //                     </div>
    //                   </div>

    //                   {/* Total Questions Display */}
    //                   <div className="p-2 bg-blue-50 rounded border border-blue-100">
    //                     <div className="flex justify-between items-center">
    //                       <span className="text-sm font-medium text-blue-700">Total Questions:</span>
    //                       <span className="text-lg font-bold text-blue-600">
    //                         {mcqCount + trueFalseCount + shortAnswerCount}
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>

    //                 {/* Job Description */}
    //                 <div className="space-y-2">
    //                   <Label htmlFor="job-description" className="text-sm font-medium">
    //                     Job Description (Optional)
    //                   </Label>
    //                   {/* "Write a brief description of the job role, including key responsibilities, skills, and technologies used. Example: 'A Backend Developer responsible for building REST APIs using Node.js and Express, working with databases like MySQL, ensuring security and performance.'" */}

    //                   <Textarea
    //                     id="job-description"
    //                     placeholder="Example: 'A Backend Developer responsible for building REST APIs using Node.js and Express, working with databases like MySQL, ensuring security and performance."
    //                     value={jobDescription}
    //                     onChange={(e) => setJobDescription(e.target.value)}
    //                     rows={3}
    //                     className="w-full"
    //                   />
    //                   <p className="text-xs text-gray-500">
    //                     Write a brief description of the job role, including key responsibilities, skills, and technologies used, Helps AI generate more relevant and personalized questions
    //                   </p>
    //                 </div>

    //                 {/* Generate Button */}
    //                 <div className="pt-2">
    //                   <Button
    //                     onClick={handleSearch}
    //                     disabled={!jobTitle.trim()}
    //                     variant="outline"
    //                     className="w-full"
    //                   >
    //                     <Sparkles className="w-4 h-4 mr-2" />
    //                     Generate AI-Powered Quiz
    //                   </Button>
    //                   <p className="text-xs text-gray-500 text-center mt-2">
    //                     {mcqCount} MCQ • {trueFalseCount} True/False • {shortAnswerCount} Short Answer
    //                   </p>
    //                 </div>

    //                 {/* Examples Section */}
    //                 {/* <div className="space-y-2 pt-2 border-t">
    //                   <p className="text-xs text-gray-500">Try these examples:</p>
    //                   <div className="flex flex-wrap gap-1">
    //                     {exampleQueries.map((example, index) => (
    //                       <Badge
    //                         key={index}
    //                         variant="secondary"
    //                         className="cursor-pointer hover:bg-blue-100 text-xs"
    //                         onClick={() => {
    //                           setJobTitle(example.split(' ')[0] + ' ' + example.split(' ')[1]);
    //                           setJobDescription(example);
    //                         }}
    //                       >
    //                         {example.substring(0, 30)}...
    //                       </Badge>
    //                     ))}
    //                   </div>
    //                 </div> */}
    //               </div>
    //             )}

    //             {/* Initial state - when AI card is selected but not configured yet */}
    //             {inputMethod === 'search' && !jobTitle && (
    //               <div className="text-center py-4">
    //                 <Sparkles className="w-8 h-8 text-blue-300 mx-auto mb-2" />
    //                 <p className="text-sm text-gray-500">
    //                   Enter job details above to create a personalized AI quiz
    //                 </p>
    //               </div>
    //             )}
    //           </CardContent>
    //         </Card>

    //         {/* From Job Post */}
    //         <Card
    //           className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'jobpost' ? 'ring-2 ring-green-500 border-green-200' : ''
    //             }`}
    //           onClick={() => setInputMethod('jobpost')}
    //         >
    //           <CardHeader className="pb-3">
    //             <div className="flex items-center gap-2">
    //               <FileText className="w-5 h-5 text-green-600" />
    //               <CardTitle className="text-lg">From Job Post</CardTitle>
    //             </div>
    //           </CardHeader>
    //           <CardContent>
    //             <p className="text-sm text-gray-600 mb-3">
    //               Select from your existing job postings
    //             </p>
    //             {inputMethod === 'jobpost' && (
    //               <Button
    //                 onClick={() => setIsModalOpen(true)}
    //                 variant="outline"
    //                 className="w-full"
    //               >
    //                 Browse Job Posts
    //               </Button>
    //             )}
    //           </CardContent>
    //         </Card>

    //         {/* Role Dropdown */}
    //         <Card
    //           className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'dropdown' ? 'ring-2 ring-purple-500 border-purple-200' : ''
    //             }`}
    //           onClick={() => setInputMethod('dropdown')}
    //         >
    //           <CardHeader className="pb-3">
    //             <div className="flex items-center gap-2">
    //               <ChevronDown className="w-5 h-5 text-purple-600" />
    //               <CardTitle className="text-lg">Select Role</CardTitle>
    //             </div>
    //           </CardHeader>
    //           <CardContent>
    //             <p className="text-sm text-gray-600 mb-3">
    //               Pick from common finance & accounting roles
    //             </p>
    //             {inputMethod === 'dropdown' && (
    //               <div className="space-y-4">
    //                 <Select
    //                   value={selectedRole}
    //                   onValueChange={handleDropdownSelect}
    //                 >
    //                   <SelectTrigger>
    //                     <SelectValue placeholder="Choose a role" />
    //                   </SelectTrigger>
    //                   <SelectContent>
    //                     {roleOptions.map((role) => (
    //                       <SelectItem key={role} value={role}>
    //                         {role}
    //                       </SelectItem>
    //                     ))}
    //                     <div className="px-2 py-1.5">
    //                       <Separator className="my-2" />
    //                       <SelectItem value="other" className="text-purple-600 font-medium">
    //                         <div className="flex items-center gap-2">
    //                           <Plus className="w-4 h-4" />
    //                           Other (Write your own)
    //                         </div>
    //                       </SelectItem>
    //                     </div>
    //                   </SelectContent>
    //                 </Select>

    //                 {/* Show custom input when "Other" is selected */}
    //                 {selectedRole === 'other' && (
    //                   <div className="space-y-3 p-3 border border-dashed border-purple-200 rounded-lg bg-purple-50">
    //                     <Label htmlFor="customRole">Enter Role Name</Label>
    //                     <div className="flex gap-2">
    //                       <Input
    //                         id="customRole"
    //                         placeholder="e.g., Chief Financial Officer, Financial Controller..."
    //                         value={customRole}
    //                         onChange={(e) => setCustomRole(e.target.value)}
    //                         onKeyPress={(e) => e.key === 'Enter' && handleCustomRoleSubmit()}
    //                         className="flex-1"
    //                       />
    //                       <Button
    //                         onClick={handleCustomRoleSubmit}
    //                         disabled={!customRole.trim()}
    //                         size="sm"
    //                         variant="outline"
    //                       >
    //                         <ArrowRight className="w-4 h-4" />
    //                       </Button>
    //                     </div>
    //                     <p className="text-xs text-gray-500">
    //                       Type any finance or accounting role not listed above
    //                     </p>
    //                   </div>
    //                 )}

    //                 {/* Show selected role when not "Other" */}
    //                 {selectedRole && selectedRole !== 'other' && (
    //                   <div className="p-3 border border-green-200 rounded-lg bg-green-50">
    //                     <div className="flex items-center justify-between">
    //                       <div>
    //                         <p className="text-sm text-gray-600">Selected Role:</p>
    //                         <p className="font-medium text-green-700">{selectedRole}</p>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 )}
    //               </div>
    //             )}
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </div>
    //   </div>

    //   <FindMyMatchModal
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     onJobSelected={handleJobSelected}
    //   />
    // </>



    <>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">What job role are you hiring for?</h2>
            <p className="text-sm sm:text-base text-gray-600 px-2">
              Choose how you'd like to define the role to get personalized quiz recommendations
            </p>
          </div>

          {/* Method Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* AI Talent Search */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'search' ? 'ring-2 ring-blue-500 border-blue-200' : ''
                }`}
              onClick={() => setInputMethod('search')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <CardTitle className="text-base sm:text-lg">AI Talent Search</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Describe your ideal candidate in natural language
                </p>

                {inputMethod === 'search' && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Job Title Input */}
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="job-title" className="text-xs sm:text-sm font-medium">
                        Job Title / Role Name *
                      </Label>
                      <Input
                        id="job-title"
                        placeholder="e.g., Senior Finance Manager, Financial Analyst..."
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full text-sm sm:text-base"
                      />
                    </div>

                    {/* Question Type Counts */}
                    <div className="space-y-2 sm:space-y-3">
                      <Label className="text-xs sm:text-sm font-medium">Number of Questions</Label>

                      <div className="space-y-1 sm:space-y-2">
                        {/* MCQ */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                          <Label htmlFor="mcq-count" className="text-xs sm:text-sm sm:min-w-[100px]">
                            MCQ Questions
                          </Label>
                          <div className="flex items-center gap-1 sm:gap-2 flex-1">
                            <Input
                              id="mcq-count"
                              type="number"
                              min="0"
                              max="20"
                              value={mcqCount}
                              onChange={(e) => handleNumberInputChange(setMcqCount, e.target.value)}
                              className="w-full text-sm sm:text-base"
                            />
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">questions</span>
                          </div>
                        </div>

                        {/* True/False */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                          <Label htmlFor="true-false-count" className="text-xs sm:text-sm sm:min-w-[100px]">
                            True/False
                          </Label>
                          <div className="flex items-center gap-1 sm:gap-2 flex-1">
                            <Input
                              id="true-false-count"
                              type="number"
                              min="0"
                              max="20"
                              value={trueFalseCount}
                              onChange={(e) => handleNumberInputChange(setTrueFalseCount, e.target.value)}
                              className="w-full text-sm sm:text-base"
                            />
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">questions</span>
                          </div>
                        </div>

                        {/* Short Answer */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                          <Label htmlFor="short-answer-count" className="text-xs sm:text-sm sm:min-w-[100px]">
                            Short Answer
                          </Label>
                          <div className="flex items-center gap-1 sm:gap-2 flex-1">
                            <Input
                              id="short-answer-count"
                              type="number"
                              min="0"
                              max="10"
                              value={shortAnswerCount}
                              onChange={(e) => handleNumberInputChange(setShortAnswerCount, e.target.value)}
                              className="w-full text-sm sm:text-base"
                            />
                            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">questions</span>
                          </div>
                        </div>
                      </div>

                      {/* Total Questions Display */}
                      <div className="p-2 sm:p-3 bg-blue-50 rounded border border-blue-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium text-blue-700">Total Questions:</span>
                          <span className="text-base sm:text-lg font-bold text-blue-600">
                            {mcqCount + trueFalseCount + shortAnswerCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="job-description" className="text-xs sm:text-sm font-medium">
                        Job Description (Optional)
                      </Label>
                      <Textarea
                        id="job-description"
                        placeholder="Example: 'A Backend Developer responsible for building REST APIs using Node.js and Express, working with databases like MySQL, ensuring security and performance.'"
                        value={jobDescription }
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={3}
                        className="w-full xs:text-xs h-28 text-gray-500"
                      />
                      <p className="text-[10px] xs:text-xs text-gray-500">
                        Write a brief description of the job role, including key responsibilities, skills, and technologies used. Helps AI generate more relevant and personalized questions.
                      </p>
                    </div>

                    {/* Generate Button */}
                    <div className="pt-1 sm:pt-2">
                      <Button
                        onClick={handleSearch}
                        disabled={!jobTitle.trim()}
                        variant="outline"
                        className="w-full text-sm sm:text-base"
                      >
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Generate AI-Powered Quiz
                      </Button>
                      <p className="text-[10px] xs:text-xs text-gray-500 text-center mt-1 sm:mt-2">
                        {mcqCount} MCQ • {trueFalseCount} True/False • {shortAnswerCount} Short Answer
                      </p>
                    </div>
                  </div>
                )}

                {/* Initial state - when AI card is selected but not configured yet */}
                {inputMethod === 'search' && !jobTitle && (
                  <div className="text-center py-3 sm:py-4">
                    {/* <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-1 sm:mb-2" /> */}
                    <p className="text-xs sm:text-sm text-gray-500">
                      Enter job details above to create a personalized AI quiz
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* From Job Post */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'jobpost' ? 'ring-2 ring-green-500 border-green-200' : ''
                }`}
              onClick={() => setInputMethod('jobpost')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <CardTitle className="text-base sm:text-lg">From Job Post</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Select from your existing job postings
                </p>
                {inputMethod === 'jobpost' && (
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                  >
                    Browse Job Posts
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Role Dropdown */}
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${inputMethod === 'dropdown' ? 'ring-2 ring-purple-500 border-purple-200' : ''
                }`}
              onClick={() => setInputMethod('dropdown')}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <CardTitle className="text-base sm:text-lg">Select Role</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  Pick from common finance & accounting roles
                </p>
                {inputMethod === 'dropdown' && (
                  <div className="space-y-3 sm:space-y-4">
                    <Select
                      value={selectedRole}
                      onValueChange={handleDropdownSelect}
                    >
                      <SelectTrigger className="text-sm sm:text-base">
                        <SelectValue placeholder="Choose a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role} value={role} className="text-sm sm:text-base">
                            {role}
                          </SelectItem>
                        ))}
                        <div className="px-2 py-1.5">
                          <Separator className="my-2" />
                          <SelectItem value="other" className="text-purple-600 font-medium text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              Other (Write your own)
                            </div>
                          </SelectItem>
                        </div>
                      </SelectContent>
                    </Select>

                    {/* Show custom input when "Other" is selected */}
                    {selectedRole === 'other' && (
                      <div className="space-y-2 sm:space-y-3 p-2 sm:p-3 border border-dashed border-purple-200 rounded-lg bg-purple-50">
                        <Label htmlFor="customRole" className="text-xs sm:text-sm">Enter Role Name</Label>
                        <div className="flex gap-1 sm:gap-2">
                          <Input
                            id="customRole"
                            placeholder="e.g., Chief Financial Officer, Financial Controller..."
                            value={customRole}
                            onChange={(e) => setCustomRole(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCustomRoleSubmit()}
                            className="flex-1 text-sm sm:text-base"
                          />
                          <Button
                            onClick={handleCustomRoleSubmit}
                            disabled={!customRole.trim()}
                            size="sm"
                            variant="outline"
                            className="shrink-0"
                          >
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                        <p className="text-[10px] xs:text-xs text-gray-500">
                          Type any finance or accounting role not listed above
                        </p>
                      </div>
                    )}

                    {/* Show selected role when not "Other" */}
                    {selectedRole && selectedRole !== 'other' && (
                      <div className="p-2 sm:p-3 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600">Selected Role:</p>
                            <p className="font-medium text-green-700 text-sm sm:text-base">{selectedRole}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FindMyMatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobSelected={handleJobSelected}
      />
    </>


  );
}