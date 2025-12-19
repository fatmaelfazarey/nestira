
// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft, Save, User, Building2, Shield, Puzzle, Download } from 'lucide-react';
// import { Link, useParams, useRouteLoaderData } from 'react-router-dom';
// import { LoginSecuritySection } from './LoginSecuritySection';
// import { UserProfileSection } from './UserProfileSection';
// import { CompanyInfoSection } from './CompanyInfoSection';
// import { NavigationLinksSection } from './NavigationLinksSection';
// import { useTranslation } from '@/hooks/useTranslation';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { IntegrationsSection } from './IntegrationsSection';
// import { useAuth } from '@/contexts/AuthContext';
// import { toast } from "sonner";
// import { useEmployerStore } from '@/store/employer store/EmployerStore';
// import { IP } from '@/store/Path';

// export function ProfileSettingsContent() {
//   const { Uid } = useParams();
//   const { currentUser, userData, loading, updateUserProfile, updateUserEmail, updateUserPassword, } = useAuth();

//   // console.log('userData', { userData })
//   // console.log('currentUser', { currentUser })
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const [isIndividualRecruiter, setIsIndividualRecruiter] = useState(false);
//   const { t } = useTranslation();
//   const { isRTL } = useLanguage();
//   const { sendCompanyDoctoBackend } = useEmployerStore();
//   //#region get data
//   const [profileData, setProfileData] = useState<any>({

//     personalInfo: {
//       businessEmail: "",
//       fullName: "",
//       phone: "",
//       profilePhoto: "",
//       rolePosition: "",
//     },
//     companyInfo: {
//       companyLogo: '',
//       companyName: '',
//       companySize: '',
//       companyType: '',
//       description: '',
//       industry: '',
//       linkedinUrl: '',
//       verificationDocument: '',
//       websiteUrl: '',
//       yearFounded: ''

//     },
//     integrations: {

//     },
//     security: {

//     }
//   });

//   const [loginSecurity, setLoginSecurity] = useState<any>({
//     email: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   })

//   //  connected: false,
//   useEffect(() => {
//     if (userData) {
//       setProfileData({
//         email: userData.email || '',
//         personalInfo: userData.personalInfo || {},
//         companyInfo: userData.companyInfo || {},
//         integrations: userData.integrations || {},
//         security: userData.security || {},
//       });

//     }
//   }, [userData]);


//   //#endregion


//   const handleSaveChanges = async () => {
//     console.log('Saving changes...');
//     setHasUnsavedChanges(false);
//     // TODO: Implement save functionality

//     console.log('profileData ----------------=>:', profileData);

//     try {
//       // if (profileData.companyInfo.verificationDocument) {
//       //   const fileUrl = await sendCompanyDoctoBackend(profileData.companyInfo.verificationDocument);
//       //   profileData.companyInfo.verificationDocument = fileUrl.filePath;
//       // }

//       if (profileData.companyInfo.verificationDocument instanceof File) {
//         const fileUrl = await sendCompanyDoctoBackend(profileData.companyInfo.verificationDocument);
//         profileData.companyInfo.verificationDocument = fileUrl.filePath; // نخزن path
//       }

//       const cleanedData = {
//         ...profileData,
//         companyInfo: {
//           ...profileData.companyInfo,
//           verificationDocument:
//             profileData.companyInfo.verificationDocument !== undefined ? profileData.companyInfo.verificationDocument : null
//         }
//       };
//       await updateUserProfile(cleanedData);
//       toast.success("Profile saved successfully!");
//     } catch (error) {
//       console.error("Error saving profile:", error);
//       toast.error("Failed to save profile");
//     } finally {
//       handleSecurityChange();
//     }

//   };


//   const handleSecurityChange = async () => {
//     console.log('loginSecurity :', loginSecurity);

//     if (loginSecurity.currentPassword && loginSecurity.email) {
//       try {
//         await updateUserEmail(loginSecurity.currentPassword, loginSecurity.email);
//         toast.success("email saved successfully!");
//       } catch (error) {
//         console.error("Error saving email:", error);
//         toast.error("Failed to save email");
//       }
//     } else if (loginSecurity.currentPassword && loginSecurity.newPassword && loginSecurity.confirmPassword && (loginSecurity.newPassword === loginSecurity.confirmPassword)) {
//       try {
//         await updateUserPassword(loginSecurity.currentPassword, loginSecurity.newPassword);
//         toast.success("password saved successfully!");
//       } catch (error) {
//         console.error("Error saving password:", error);
//         toast.error("Failed to save password");
//       }
//     }


//     else {
//       toast.error("Make sure to enter the new email , current password and new password.");
//     }





//   }

//   // const handleDownloadDoc = async () => {

//   //   const documentPath = profileData.companyInfo.verificationDocument;

//   //   alert(documentPath)
//   //   if (!documentPath) return null;

//   //   if (documentPath.startsWith('/')) {
//   //     return `${IP}${documentPath}`;
//   //   }

//   //   return documentPath;

//   // }

//   const handleDownloadDoc = async () => {
//     const documentPath = profileData.companyInfo.verificationDocument;

//     if (!documentPath) {
//       toast.error("No document available for download");
//       return;
//     }
//     const downloadUrl = documentPath.startsWith('/')
//       ? `${IP}${documentPath}`
//       : documentPath;

//     try {
//       const link = document.createElement('a');
//       link.href = downloadUrl;

//       const fileName = downloadUrl.split('/').pop() || 'document';
//       link.download = fileName;

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error("Error downloading document:", error);
//       toast.error("Failed to download document");
//     }
//   };



//   const handleFieldChange = () => {
//     setHasUnsavedChanges(true);

//     // setProfileData(profileData);
//   };

//   return (
//     <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 ${isRTL ? 'rtl' : 'ltr'}`}>
//       <div className="container mx-auto px-4 py-8 space-y-8">
//         {/* Simplified Header */}

//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
//             <Link to="/">
//               <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
//                 <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
//                 <span className="hidden sm:inline">{t('backToDashboard')}</span>
//                 <span className="sm:hidden">{t('back')}</span>
//               </Button>
//             </Link>
//             <div className={isRTL ? 'text-right' : ''}>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('profileAndSettings')}</h1>
//               <p className="text-gray-500 text-xs sm:text-sm">{t('manageAccountPreferences')}</p>
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             onClick={handleDownloadDoc}
//             className="hover:bg-secondary-c-foreground hover:text-secondary-c hover:border-secondary-c"
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Download  Document
//           </Button>
//           <Button
//             onClick={handleSaveChanges}
//             disabled={!hasUnsavedChanges}
//             className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
//           >
//             <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
//             {t('saveChanges')}
//           </Button>
//         </div>
//         <div className="flex lg:flex-row flex-col gap-6">
//           {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
//           {/* Main Content */}
//           <div className="flex-4 space-y-6">
//             {/* Simplified User Profile */}
//             <Card className="border-l-4 border-blue-500">
//               <CardHeader className="pb-4">
//                 <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                   <User className="w-5 h-5 text-blue-600" />
//                   {t('userProfile')}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <UserProfileSection
//                   currentUser={profileData}
//                   setCurrentUser={setProfileData}
//                   isIndividualRecruiter={isIndividualRecruiter}
//                   setIsIndividualRecruiter={setIsIndividualRecruiter}
//                   onChange={handleFieldChange}
//                 />
//               </CardContent>
//             </Card>

//             {/* Simplified Company Information */}
//             {!isIndividualRecruiter && (
//               <Card className="border-l-4 border-green-500">
//                 <CardHeader className="pb-4">
//                   <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                     <Building2 className="w-5 h-5 text-green-600" />
//                     {t('companyInformation')}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="pt-0">
//                   <CompanyInfoSection
//                     currentUser={profileData}
//                     setCurrentUser={setProfileData}
//                     isIndividualRecruiter={isIndividualRecruiter}
//                     setIsIndividualRecruiter={setIsIndividualRecruiter}
//                     onChange={handleFieldChange}
//                   />
//                 </CardContent>
//               </Card>
//             )}

//             {/* Simplified Integrations */}
//             <Card className="border-l-4 border-purple-500">
//               <CardHeader className="pb-4">
//                 <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                   <Puzzle className="w-5 h-5 text-purple-600" />
//                   {t('integrations')}
//                 </CardTitle>
//                 <CardDescription className="text-sm text-gray-600">{t('integrationsDesc')}</CardDescription>
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <IntegrationsSection
//                   currentUser={profileData}
//                   setCurrentUser={setProfileData}
//                   onChange={handleFieldChange} />
//               </CardContent>
//             </Card>

//             {/* Simplified Login & Security */}
//             <Card className="border-l-4 border-orange-500">
//               <CardHeader className="pb-4">
//                 <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
//                   <Shield className="w-5 h-5 text-orange-600" />
//                   {t('loginAndSecurity')}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="pt-0">
//                 <LoginSecuritySection
//                   currentUser={profileData}
//                   setCurrentUser={setProfileData}
//                   setLoginSecurity={setLoginSecurity}
//                   onChange={handleFieldChange} />
//               </CardContent>
//             </Card>
//           </div>

//           {/* Simplified Sidebar */}
//           <div className="flex-1">
//             <NavigationLinksSection />
//           </div>
//         </div>

//         {/* Mobile Save Button */}
//         <div className="lg:hidden block">
//           <Button
//             onClick={handleSaveChanges}
//             disabled={!hasUnsavedChanges}
//             className="w-full bg-orange-600 hover:bg-orange-700 text-white"
//             size="lg"
//           >
//             <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
//             {t('saveChanges')}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, User, Building2, Shield, Puzzle, Download, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { LoginSecuritySection } from './LoginSecuritySection';
import { UserProfileSection } from './UserProfileSection';
import { CompanyInfoSection } from './CompanyInfoSection';
import { NavigationLinksSection } from './NavigationLinksSection';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntegrationsSection } from './IntegrationsSection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { IP } from '@/store/Path';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export function ProfileSettingsContent() {
  const { Uid } = useParams();
  const { currentUser, userData, loading, updateUserProfile, updateUserEmail, updateUserPassword } = useAuth();

  // View mode logic - Same pattern as Profile component
  const isViewMode = !!Uid;
  const [viewModeData, setViewModeData] = useState(null);
  const [viewModeLoading, setViewModeLoading] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isIndividualRecruiter, setIsIndividualRecruiter] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { sendCompanyDoctoBackend } = useEmployerStore();

  //#region get data
  const [profileData, setProfileData] = useState<any>({
    personalInfo: {
      businessEmail: "",
      fullName: "",
      phone: "",
      profilePhoto: "",
      rolePosition: "",
    },
    companyInfo: {
      companyLogo: '',
      companyName: '',
      companySize: '',
      companyType: '',
      description: '',
      industry: '',
      linkedinUrl: '',
      verificationDocument: '',
      websiteUrl: '',
      yearFounded: ''
    },
    integrations: {},
    security: {}
  });

  const [loginSecurity, setLoginSecurity] = useState<any>({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch data based on mode - Same pattern as Profile component
  useEffect(() => {
    const fetchData = async () => {
      if (isViewMode && Uid) {
        // View mode: Fetch data by UID
        setViewModeLoading(true);
        try {
          const userDoc = await getDoc(doc(db, "users", Uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setViewModeData(userData);

            // Set profile data from fetched user
            setProfileData({
              email: userData.email || '',
              personalInfo: userData.personalInfo || {},
              companyInfo: userData.companyInfo || {},
              integrations: userData.integrations || {},
              security: userData.security || {},
            });

            // Check if individual recruiter
            if (userData.companyInfo?.companyName === 'Individual Recruiter' ||
              userData.isIndividualRecruiter) {
              setIsIndividualRecruiter(true);
            }
          } else {
            toast.error("User not found");
            setProfileData({
              email: '',
              personalInfo: {},
              companyInfo: {},
              integrations: {},
              security: {}
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user data");
        } finally {
          setViewModeLoading(false);
        }
      } else if (userData && !isViewMode) {
        // Edit mode: Use current user's data
        setProfileData({
          email: userData.email || '',
          personalInfo: userData.personalInfo || {},
          companyInfo: userData.companyInfo || {},
          integrations: userData.integrations || {},
          security: userData.security || {},
        });

        // Check if individual recruiter
        if (userData.companyInfo?.companyName === 'Individual Recruiter' ||
          userData.isIndividualRecruiter) {
          setIsIndividualRecruiter(true);
        }
      }
    };

    fetchData();
  }, [Uid, isViewMode, userData]);

  //#endregion

  const handleSaveChanges = async () => {
    if (isViewMode) {
      toast.info("View mode is active - changes cannot be saved");
      return;
    }

    console.log('Saving changes...');
    setHasUnsavedChanges(false);

    console.log('profileData ----------------=>:', profileData);

    try {
      if (profileData.companyInfo.verificationDocument instanceof File) {
        const fileUrl = await sendCompanyDoctoBackend(profileData.companyInfo.verificationDocument);
        profileData.companyInfo.verificationDocument = fileUrl.filePath;
      }

      const cleanedData = {
        ...profileData,
        companyInfo: {
          ...profileData.companyInfo,
          verificationDocument:
            profileData.companyInfo.verificationDocument !== undefined ? profileData.companyInfo.verificationDocument : null
        }
      };
      await updateUserProfile(cleanedData);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      handleSecurityChange();
    }
  };

  const handleSecurityChange = async () => {
    if (isViewMode) return;

    console.log('loginSecurity :', loginSecurity);

    if (loginSecurity.currentPassword && loginSecurity.email) {
      try {
        await updateUserEmail(loginSecurity.currentPassword, loginSecurity.email);
        toast.success("email saved successfully!");
      } catch (error) {
        console.error("Error saving email:", error);
        toast.error("Failed to save email");
      }
    } else if (loginSecurity.currentPassword && loginSecurity.newPassword && loginSecurity.confirmPassword && (loginSecurity.newPassword === loginSecurity.confirmPassword)) {
      try {
        await updateUserPassword(loginSecurity.currentPassword, loginSecurity.newPassword);
        toast.success("password saved successfully!");
      } catch (error) {
        console.error("Error saving password:", error);
        toast.error("Failed to save password");
      }
    } else {
      toast.error("Make sure to enter the new email , current password and new password.");
    }
  };

  // const handleDownloadDoc = async () => {
  //   const documentPath = profileData.companyInfo.verificationDocument;

  //   if (!documentPath) {
  //     toast.error("No document available for download");
  //     return;
  //   }
  //   const downloadUrl = documentPath.startsWith('/')
  //     ? `${IP}${documentPath}`
  //     : documentPath;

  //   try {
  //     const link = document.createElement('a');
  //     link.href = downloadUrl;

  //     const fileName = downloadUrl.split('/').pop() || 'document';
  //     link.download = fileName;

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading document:", error);
  //     toast.error("Failed to download document");
  //   }
  // };



  const handleDownloadDoc = async () => {

    const documentUrl = getVerificationDocumentUrl();

    if (!documentUrl) {
      toast.error('No verification document available');
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
      link.download = `verification-${profileData.companyInfo.companyName}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up URL
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);
      toast.success('Document downloaded successfully');

    } catch (error: any) {
      console.error('Error downloading PDF:', error);
      toast.error(error.message || 'Failed to download verification document');
    }
  };

  const getVerificationDocumentUrl = () => {
    const documentPath = profileData.companyInfo.verificationDocument;

    if (!documentPath) return null;

    if (documentPath.startsWith('/')) {
      return `${IP}${documentPath}`;
    }

    return documentPath;
  };
  const handleFieldChange = () => {
    if (isViewMode) {
      toast.warning("Cannot edit in view mode");
      return;
    }
    setHasUnsavedChanges(true);
  };

  // Show loading state - Same pattern as Profile component
  if (loading || viewModeLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {viewModeLoading ? "Loading user profile..." : "Loading your profile..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className=" mx-auto space-y-8">
        {/* Simplified Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to={isViewMode ? "/admin/employers" : "/employer"}>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                <span className="hidden sm:inline">
                  {isViewMode ? "Back to Admin" : t('backToDashboard')}
                </span>
                <span className="sm:hidden">{t('back')}</span>
              </Button>
            </Link>
            <div className={isRTL ? 'text-right' : ''}>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {isViewMode ? "User Profile" : t('profileAndSettings')}
                </h1>
                {isViewMode && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    <Eye className="w-3 h-3" />
                    <span>View Only</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">
                {isViewMode
                  ? `Viewing ${profileData?.personalInfo?.fullName || 'user'} profile`
                  : t('manageAccountPreferences')
                }
              </p>
            </div>
          </div>

          {profileData.companyInfo.verificationDocument && (
            <Button
              variant="outline"
              onClick={handleDownloadDoc}
              className="hover:bg-secondary-c-foreground hover:text-secondary-c hover:border-secondary-c"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Document
            </Button>
          )}

          {!isViewMode && (
            <Button
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges}
              className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
            >
              <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('saveChanges')}
            </Button>
          )}
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
          {/* Main Content */}
          <div className={`${isViewMode ? 'w-full' : 'flex-4'} space-y-6`}>
            {/* Simplified User Profile */}
            <Card className="border-l-4 border-blue-500">
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <User className="w-5 h-5 text-blue-600" />
                  {t('userProfile')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <UserProfileSection
                  currentUser={profileData}
                  setCurrentUser={isViewMode ? undefined : setProfileData}
                  isIndividualRecruiter={isIndividualRecruiter}
                  setIsIndividualRecruiter={isViewMode ? undefined : setIsIndividualRecruiter}
                  onChange={handleFieldChange}
                  isViewMode={isViewMode}
                />
              </CardContent>
            </Card>

            {/* Simplified Company Information */}
            {!isIndividualRecruiter && (
              <Card className="border-l-4 border-green-500">
                <CardHeader className="pb-4">
                  <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Building2 className="w-5 h-5 text-green-600" />
                    {t('companyInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CompanyInfoSection
                    currentUser={profileData}
                    setCurrentUser={isViewMode ? undefined : setProfileData}
                    isIndividualRecruiter={isIndividualRecruiter}
                    setIsIndividualRecruiter={isViewMode ? undefined : setIsIndividualRecruiter}
                    onChange={handleFieldChange}
                    isViewMode={isViewMode}
                  />
                </CardContent>
              </Card>
            )}

            {/* Simplified Integrations */}
            <Card className="border-l-4 border-purple-500">
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Puzzle className="w-5 h-5 text-purple-600" />
                  {t('integrations')}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">{t('integrationsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <IntegrationsSection
                  currentUser={profileData}
                  setCurrentUser={isViewMode ? undefined : setProfileData}
                  onChange={handleFieldChange}
                  isViewMode={isViewMode}
                />
              </CardContent>
            </Card>

            {/* Simplified Login & Security - Hide in view mode */}
            {!isViewMode && (
              <Card className="border-l-4 border-orange-500">
                <CardHeader className="pb-4">
                  <CardTitle className={`text-lg font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Shield className="w-5 h-5 text-orange-600" />
                    {t('loginAndSecurity')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <LoginSecuritySection
                    currentUser={profileData}
                    setCurrentUser={setProfileData}
                    setLoginSecurity={setLoginSecurity}
                    onChange={handleFieldChange}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Simplified Sidebar - Hide in view mode */}
          {!isViewMode && (
            <div className="flex-1">
              <NavigationLinksSection />
            </div>
          )}
        </div>

        {/* Mobile Save Button - Only show in edit mode */}
        {!isViewMode && (
          <div className="lg:hidden block">
            <Button
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              size="lg"
            >
              <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('saveChanges')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}