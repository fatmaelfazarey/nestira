// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Upload, Edit, FileText, Star, User, Download, AlertCircle } from "lucide-react";
// import { CVUploader } from "@/components/ats-resume/CVUploader";
// import { ProfileForm } from "@/components/profile-candidate/ProfileForm";
// import { CVParsingModal } from "@/components/profile-candidate/CVParsingModal";
// import { ProfileCompletionCard } from "@/components/profile-candidate/ProfileCompletionCard";
// import { ProfileBoostCards } from "@/components/profile-candidate/ProfileBoostCards";
// import { Link, Navigate, useParams } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { toast } from "sonner";


// export default function Profile() {
//   const { Uid } = useParams();
//   console.log('----------Uid----------- :', Uid)
//   const { currentUser, userData, loading, updateUserProfile } = useAuth();
//   console.log({ userData })
//   const [inputMode, setInputMode] = useState<'select' | 'upload' | 'manual'>(
//     currentUser ? 'manual' : 'select'
//   );
//   const [showParsingModal, setShowParsingModal] = useState(false);
//   const [parsedData, setParsedData] = useState<any>(null);
//   const [saving, setSaving] = useState(false);

//   // // State محلي للتعديلات (يبدأ فاضي ويتملى من userData)
//   // const [profileData, setProfileData] = useState<any>({
//   //   basicInfo: {},
//   //   industry: { industries: [], subfields: [] },
//   //   summary: "",
//   //   coverLetter: "",
//   //   experience: [],
//   //   education: [],
//   //   skills: { technical: [], software: [], certifications: [], languages: [] },
//   //   video: { hasVideo: false, status: 'not_started' },
//   //   behavioral: { completed: false, status: 'not_started' },
//   //   preferences: {
//   //     jobTitles: [],
//   //     locations: [],
//   //     workType: "",
//   //     visaStatus: "",
//   //     noticePeriod: "",
//   //     salaryRange: { min: 0, max: 0, currency: "AED" }
//   //   }
//   // });
//   // State محلي للتعديلات (يبدأ فاضي ويتملى من userData)
//   const [profileData, setProfileData] = useState<any>({
//     basicInfo: {
//       fullName: "",
//       profilePhoto: "",
//       role: "",
//       email: "",
//       phone: "",
//       location: "",
//       businessEmail: "",
//       linkedin: ""
//     },
//     industry: { industries: [], subfields: [] },
//     summary: "",
//     coverLetter: "",
//     experience: [],
//     education: [],
//     skills: { technical: [], software: [], certifications: [], languages: [] },
//     video: { hasVideo: false, status: 'not_started' },
//     behavioral: { completed: false, status: 'not_started' },
//     preferences: {
//       jobTitles: [],
//       locations: [],
//       workType: "",
//       visaStatus: "",
//       noticePeriod: "",
//       salaryRange: { min: 0, max: 0, currency: "AED" }
//     }
//   });

//   useEffect(() => {
//     if (userData) {
//       setProfileData({
//         basicInfo: userData.basicInfo || {},
//         industry: userData.industry || { industries: [], subfields: [] },
//         summary: userData.summary || "",
//         coverLetter: userData.coverLetter || "",
//         experience: userData.experience || [],
//         education: userData.education || [],
//         skills: userData.skills || { technical: [], software: [], certifications: [], languages: [] },
//         video: userData.video || { hasVideo: false, status: 'not_started' },
//         behavioral: userData.behavioral || { completed: false, status: 'not_started' },
//         preferences: userData.preferences || {
//           jobTitles: [],
//           locations: [],
//           workType: "",
//           visaStatus: "",
//           noticePeriod: "",
//           salaryRange: { min: 0, max: 0, currency: "AED" }
//         }
//       });
//     }
//   }, [userData]);

//   const calculateCompletion = () => {
//     if (!profileData) return 0;

//     let completed = 0;
//     const total = 11;

//     if (profileData.basicInfo?.fullName) completed++;
//     if (profileData.basicInfo?.role) completed++;
//     if (profileData.basicInfo?.email) completed++;
//     if (profileData.industry?.industries?.length > 0) completed++;
//     if (profileData.summary) completed++;
//     if (profileData.coverLetter) completed++;
//     if (profileData.experience?.length > 0) completed++;
//     if (profileData.education?.length > 0) completed++;
//     if (profileData.skills?.technical?.length > 0) completed++;
//     if (profileData.video?.hasVideo) completed++;
//     if (profileData.behavioral?.completed) completed++;

//     return Math.round((completed / total) * 100);
//   };

//   const handleCVParsed = (data: any) => {
//     setParsedData(data);
//     setShowParsingModal(true);
//   };

//   const handleConfirmParsedData = async (confirmedData: any) => {
//     try {
//       setSaving(true);
//       await updateUserProfile(confirmedData);
//       setShowParsingModal(false);
//       setInputMode('manual');
//       toast.success("Profile updated from resume successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleParsingFailed = () => {
//     setInputMode('manual');
//     toast.error("Failed to parse resume. Please try manual entry.");
//   };

//   const handleSaveProfile = async () => {
//     try {
//       setSaving(true);
//       await updateUserProfile(profileData);
//       toast.success("Profile saved successfully!");
//     } catch (error) {
//       console.error("Error saving profile:", error);
//       toast.error("Failed to save profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Redirect to login if not authenticated
//   if (!currentUser && inputMode === 'manual') {
//     return <Navigate to="/login" replace />;
//   }

//   if (inputMode === 'select' && !currentUser) {
//     return (
//       <div className="min-h-screen bg-background p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12 animate-fade-in">
//             <h1 className="text-4xl font-bold text-foreground mb-4">Build Your Profile</h1>
//             <p className="text-xl text-muted-c-foreground mb-8">
//               Get noticed by top employers in the MENA and Gulf finance sector
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//             {/* Upload Resume Option */}
//             <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-secondary-c/50 animate-fade-in">
//               <CardHeader className="text-center pb-4">
//                 <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-c/20 transition-colors">
//                   <Upload className="w-8 h-8 text-secondary-c" />
//                 </div>
//                 <CardTitle className="text-xl text-foreground">Upload Resume to Auto-Fill</CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-muted-c-foreground mb-6">
//                   Upload your PDF or DOCX resume and we'll automatically extract your information using AI.
//                 </p>
//                 <div className="space-y-3 text-sm text-muted-c-foreground mb-6">
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-2 h-2 bg-success rounded-full"></div>
//                     <span>Supports PDF, DOC, and DOCX</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-2 h-2 bg-success rounded-full"></div>
//                     <span>Smart extraction for finance roles</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-2 h-2 bg-success rounded-full"></div>
//                     <span>Preview before saving</span>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => setInputMode('upload')}
//                   className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
//                   size="lg"
//                 >
//                   Choose This Option
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Manual Entry Option */}
//             <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary-c/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
//               <CardHeader className="text-center pb-4">
//                 <div className="w-16 h-16 bg-primary-c/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-c/20 transition-colors">
//                   <Edit className="w-8 h-8 text-primary-c" />
//                 </div>
//                 <CardTitle className="text-xl text-foreground">Build Profile Manually</CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <p className="text-muted-c-foreground mb-6">
//                   Fill out your profile step by step with our guided form, optimized for finance professionals.
//                 </p>
//                 <div className="space-y-3 text-sm text-muted-c-foreground mb-6">
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-2 h-2 bg-success rounded-full"></div>
//                     <span>Guided step-by-step process</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-2 h-2 bg-success rounded-full"></div>
//                     <span>Smart suggestions for finance roles</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-2 h-2 bg-success rounded-full"></div>
//                     <span>Full control over your data</span>
//                   </div>
//                 </div>
//                 <Link to="/candidate/signup">
//                   <Button
//                     variant="outline"
//                     className="w-full hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50"
//                     size="lg"
//                   >
//                     Choose This Option
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
//             <p className="text-sm text-muted-c-foreground">
//               Don't worry, you can always edit your information later
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Upload Mode
//   if (inputMode === 'upload') {
//     return (
//       <div className="min-h-screen bg-background p-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center gap-4 mb-8">
//             <Button
//               variant="ghost"
//               onClick={() => setInputMode(currentUser ? 'manual' : 'select')}
//               className="hover:bg-muted-c"
//             >
//               ← Back
//             </Button>
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Upload Your Resume</h1>
//               <p className="text-muted-c-foreground">We'll extract your information automatically</p>
//             </div>
//           </div>

//           <CVUploader
//             onCVParsed={handleCVParsed}
//             onParsingFailed={handleParsingFailed}
//           />

//           {showParsingModal && parsedData && (
//             <CVParsingModal
//               isOpen={showParsingModal}
//               onClose={() => setShowParsingModal(false)}
//               parsedData={parsedData}
//               onConfirm={handleConfirmParsedData}
//             />
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Manual/Edit mode - Main Profile View
//   const completionPercentage = userData?.profileCompletion || calculateCompletion();

//   return (
//     <div className="min-h-screen bg-background p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8 animate-fade-in md:flex-row flex-col">
//           <div className="flex items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">
//                 My Profile
//               </h1>
//               <p className="text-muted-c-foreground">
//                 {userData?.basicInfo?.fullName ? `Welcome back, ${userData.basicInfo.fullName}` : 'Build your standout finance profile'}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 flex-wrap">
//             <Button
//               variant="outline"
//               className="hover:bg-secondary-c-foreground hover:text-secondary-c hover:border-secondary-c"
//               onClick={() => setInputMode('upload')}
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               Upload Resume
//             </Button>
//             <Button
//               variant="outline"
//               className="hover:bg-secondary-c-foreground hover:text-secondary-c hover:border-secondary-c"
//             >
//               <Download className="w-4 h-4 mr-2" />
//               Download Resume
//             </Button>
//             <Button
//               onClick={handleSaveProfile}
//               disabled={saving}
//               className="bg-secondary-c hover:bg-secondary-c-hover text-white"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </Button>
//             {/* <div className="flex items-center gap-2">
//               <Progress value={completionPercentage} className="w-20 h-2" />
//               <span className="text-sm font-medium text-secondary-c">{completionPercentage}% Complete</span>
//             </div> */}
//           </div>
//         </div>

//         {/* Warning if profile is incomplete */}
//         {completionPercentage < 70 && (
//           <Card className="mb-6 border-amber-200 bg-amber-50">
//             <CardContent className="p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium text-amber-900">
//                     Complete your profile to increase visibility
//                   </p>
//                   <p className="text-sm text-amber-700 mt-1">
//                     Profiles with {completionPercentage < 50 ? '50%' : '70%'}+ completion get 3x more views from recruiters
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Main Profile Form */}
//           <div className="lg:col-span-3">
//             <ProfileForm
//               profileData={profileData}
//               onProfileDataChange={setProfileData}
//             />
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <ProfileCompletionCard completion={completionPercentage} />
//             <ProfileBoostCards />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Edit, FileText, Star, User, Download, AlertCircle, Eye, EyeOff } from "lucide-react";
import { CVUploader } from "@/components/ats-resume/CVUploader";
import { ProfileForm } from "@/components/profile-candidate/ProfileForm";
import { CVParsingModal } from "@/components/profile-candidate/CVParsingModal";
import { ProfileCompletionCard } from "@/components/profile-candidate/ProfileCompletionCard";
import { ProfileBoostCards } from "@/components/profile-candidate/ProfileBoostCards";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust import path as needed
import { useCandidateStore } from "@/store/candidate store/CandidateStore";

// import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
// import { auth, db } from "../firebase";

export default function Profile() {
  const { Uid } = useParams();
  // console.log('----------Uid----------- :', Uid);
  const { currentUser, userData, loading, updateUserProfile } = useAuth();
  // console.log('currentUser:=>',currentUser.uid );

  const [isViewMode, setIsViewMode] = useState(false);
  const [viewModeData, setViewModeData] = useState(null);
  const [viewModeLoading, setViewModeLoading] = useState(false);

  const [inputMode, setInputMode] = useState<'select' | 'upload' | 'manual'>(
    currentUser ? 'manual' : 'select'
  );
  const [showParsingModal, setShowParsingModal] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const { getCV } = useCandidateStore();

  // State محلي للتعديلات
  const [profileData, setProfileData] = useState<any>({
    basicInfo: {
      fullName: "",
      profilePhoto: "",
      role: "",
      email: "",
      phone: "",
      location: "",
      businessEmail: "",
      linkedin: ""
    },
    industry: { industries: [], subfields: [] },
    summary: "",
    coverLetter: "",
    experience: [],
    education: [],
    skills: { technical: [], software: [], certifications: [], languages: [] },
    video: { hasVideo: false, status: 'not_started' },
    behavioral: { completed: false, status: 'not_started' },
    preferences: {
      jobTitles: [],
      locations: [],
      workType: "",
      visaStatus: "",
      noticePeriod: "",
      salaryRange: { min: 0, max: 0, currency: "AED" }
    }
  });

  // Fetch candidate data when in view mode (Uid provided)
  useEffect(() => {
    const fetchCandidateData = async () => {
      if (Uid) {
        setIsViewMode(true);
        setViewModeLoading(true);
        try {
          const candidateDoc = await getDoc(doc(db, "users", Uid));
          if (candidateDoc.exists()) {
            const candidateData = candidateDoc.data();
            setViewModeData(candidateData);
            setProfileData({
              basicInfo: candidateData.basicInfo || {},
              industry: candidateData.industry || { industries: [], subfields: [] },
              summary: candidateData.summary || "",
              coverLetter: candidateData.coverLetter || "",
              experience: candidateData.experience || [],
              education: candidateData.education || [],
              skills: candidateData.skills || { technical: [], software: [], certifications: [], languages: [] },
              video: candidateData.video || { hasVideo: false, status: 'not_started' },
              behavioral: candidateData.behavioral || { completed: false, status: 'not_started' },
              preferences: candidateData.preferences || {
                jobTitles: [],
                locations: [],
                workType: "",
                visaStatus: "",
                noticePeriod: "",
                salaryRange: { min: 0, max: 0, currency: "AED" }
              }
            });
          } else {
            toast.error("Candidate profile not found");
          }
        } catch (error) {
          console.error("Error fetching candidate data:", error);
          toast.error("Failed to load candidate profile");
        } finally {
          setViewModeLoading(false);
        }
      } else {
        setIsViewMode(false);
        // Normal mode - load logged in user data
        if (userData) {
          setProfileData({
            basicInfo: userData.basicInfo || {},
            industry: userData.industry || { industries: [], subfields: [] },
            summary: userData.summary || "",
            coverLetter: userData.coverLetter || "",
            experience: userData.experience || [],
            education: userData.education || [],
            skills: userData.skills || { technical: [], software: [], certifications: [], languages: [] },
            video: userData.video || { hasVideo: false, status: 'not_started' },
            behavioral: userData.behavioral || { completed: false, status: 'not_started' },
            preferences: userData.preferences || {
              jobTitles: [],
              locations: [],
              workType: "",
              visaStatus: "",
              noticePeriod: "",
              salaryRange: { min: 0, max: 0, currency: "AED" }
            }
          });
        }
      }
    };

    fetchCandidateData();
  }, [Uid, userData]);

  const calculateCompletion = () => {
    if (!profileData) return 0;

    let completed = 0;
    const total = 11;

    if (profileData.basicInfo?.fullName) completed++;
    if (profileData.basicInfo?.role) completed++;
    if (profileData.basicInfo?.email) completed++;
    if (profileData.industry?.industries?.length > 0) completed++;
    if (profileData.summary) completed++;
    if (profileData.coverLetter) completed++;
    if (profileData.experience?.length > 0) completed++;
    if (profileData.education?.length > 0) completed++;
    if (profileData.skills?.technical?.length > 0) completed++;
    if (profileData.video?.hasVideo) completed++;
    if (profileData.behavioral?.completed) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleCVParsed = (data: any) => {
    setParsedData(data);
    setShowParsingModal(true);
  };

  const handleConfirmParsedData = async (confirmedData: any) => {
    try {
      setSaving(true);
      await updateUserProfile(confirmedData);
      setShowParsingModal(false);
      setInputMode('manual');
      toast.success("Profile updated from resume successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleParsingFailed = () => {
    setInputMode('manual');
    toast.error("Failed to parse resume. Please try manual entry.");
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await updateUserProfile(profileData);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  // Loading State
  if (loading || viewModeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {viewModeLoading ? "Loading candidate profile..." : "Loading your profile..."}
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated and not in view mode
  if (!currentUser && !isViewMode && inputMode === 'manual') {
    return <Navigate to="/login" replace />;
  }

  if (inputMode === 'select' && !currentUser && !isViewMode) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">Build Your Profile</h1>
            <p className="text-xl text-muted-c-foreground mb-8">
              Get noticed by top employers in the MENA and Gulf finance sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Upload Resume Option */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-secondary-c/50 animate-fade-in">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-c/20 transition-colors">
                  <Upload className="w-8 h-8 text-secondary-c" />
                </div>
                <CardTitle className="text-xl text-foreground">Upload Resume to Auto-Fill</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-c-foreground mb-6">
                  Upload your PDF or DOCX resume and we'll automatically extract your information using AI.
                </p>
                <div className="space-y-3 text-sm text-muted-c-foreground mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Supports PDF, DOC, and DOCX</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Smart extraction for finance roles</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Preview before saving</span>
                  </div>
                </div>
                <Button
                  onClick={() => setInputMode('upload')}
                  className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
                  size="lg"
                >
                  Choose This Option
                </Button>
              </CardContent>
            </Card>

            {/* Manual Entry Option */}
            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary-c/50 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary-c/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-c/20 transition-colors">
                  <Edit className="w-8 h-8 text-primary-c" />
                </div>
                <CardTitle className="text-xl text-foreground">Build Profile Manually</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-c-foreground mb-6">
                  Fill out your profile step by step with our guided form, optimized for finance professionals.
                </p>
                <div className="space-y-3 text-sm text-muted-c-foreground mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Guided step-by-step process</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Smart suggestions for finance roles</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Full control over your data</span>
                  </div>
                </div>
                <Link to="/candidate/signup">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50"
                    size="lg"
                  >
                    Choose This Option
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <p className="text-sm text-muted-c-foreground">
              Don't worry, you can always edit your information later
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Upload Mode (only available in normal mode)
  if (inputMode === 'upload' && !isViewMode) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => setInputMode(currentUser ? 'manual' : 'select')}
              className="hover:bg-muted-c"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Upload Your Resume</h1>
              <p className="text-muted-c-foreground">We'll extract your information automatically</p>
            </div>
          </div>

          <CVUploader
            onCVParsed={handleCVParsed}
            onParsingFailed={handleParsingFailed}
          />

          {showParsingModal && parsedData && (
            <CVParsingModal
              isOpen={showParsingModal}
              onClose={() => setShowParsingModal(false)}
              parsedData={parsedData}
              onConfirm={handleConfirmParsedData}
            />
          )}
        </div>
      </div>
    );
  }

  // Manual/Edit mode - Main Profile View
  const completionPercentage = isViewMode
    ? calculateCompletion()
    : (userData?.profileCompletion || calculateCompletion());


  const handleDownloadCV = async () => {
    if (isViewMode) {
      const success = await getCV(Uid);
      if (success) {
        console.log("CV downloaded successfully");
      }
    } else {
      const success = await getCV(currentUser.uid);
      if (success) {
        console.log("CV downloaded successfully");
      }
    }

  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in md:flex-row flex-col">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${isViewMode ? 'bg-blue-100' : 'bg-secondary-c/10'}`}>
              {isViewMode ? (
                <Eye className="w-6 h-6 text-blue-600" />
              ) : (
                <User className="w-6 h-6 text-secondary-c" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isViewMode ? "Candidate Profile" : "My Profile"}
              </h1>
              <p className="text-muted-c-foreground">
                {isViewMode
                  ? `Viewing ${profileData.basicInfo?.fullName || 'candidate'} profile`
                  : (userData?.basicInfo?.fullName ? `Welcome back, ${userData.basicInfo.fullName}` : 'Build your standout finance profile')
                }
              </p>
            </div>
          </div>

          {!isViewMode ? (
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                className="hover:bg-secondary-c-foreground hover:text-secondary-c hover:border-secondary-c"
                onClick={() => setInputMode('upload')}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadCV}
                className="hover:bg-secondary-c-foreground hover:text-secondary-c hover:border-secondary-c"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-secondary-c hover:bg-secondary-c-hover text-white"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                View Only
              </div>
              <Button
                variant="outline"
                onClick={handleDownloadCV}
                className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>
          )}
        </div>

        {/* Warning if profile is incomplete - only show in normal mode */}
        {!isViewMode && completionPercentage < 70 && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Complete your profile to increase visibility
                  </p>
                  <p className="text-sm text-amber-700 mt-1">
                    Profiles with {completionPercentage < 50 ? '50%' : '70%'}+ completion get 3x more views from recruiters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Profile Form */}
          <div className="lg:col-span-3">
            <ProfileForm
              profileData={profileData}
              onProfileDataChange={isViewMode ? undefined : setProfileData}
              isViewMode={isViewMode}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileCompletionCard
              completion={completionPercentage}
              isViewMode={isViewMode}
            />
            {!isViewMode && <ProfileBoostCards />}
          </div>
        </div>
      </div>
    </div>
  );
}