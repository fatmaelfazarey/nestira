
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, User, Building2, Shield, Puzzle } from 'lucide-react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { LoginSecuritySection } from './LoginSecuritySection';
import { UserProfileSection } from './UserProfileSection';
import { CompanyInfoSection } from './CompanyInfoSection';
import { NavigationLinksSection } from './NavigationLinksSection';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import { IntegrationsSection } from './IntegrationsSection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

export function ProfileSettingsContent() {
  const { currentUser, userData, loading, updateUserProfile } = useAuth();
  console.log({ userData })
  // console.log('get user data is fffffffff' + { userData?.basicInfo?.fullName })
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isIndividualRecruiter, setIsIndividualRecruiter] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  //#region get data
  const [profileData, setProfileData] = useState<any>({
    email: '',
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
    integrations: {

    },
    security: {

    }
  });

  //  connected: false,
  useEffect(() => {
    if (userData) {
      setProfileData({
        email: userData.email || '',
        personalInfo: userData.personalInfo || {},
        companyInfo: userData.companyInfo || {},
        integrations: userData.integrations || {},
        security: userData.security || {},
      });


      console.log('dddddddddddddd', userData.personalInfo?.fullName);
    }
  }, [userData]);

  //#endregion


  const handleSaveChanges = async () => {
    console.log('Saving changes...');
    setHasUnsavedChanges(false);
    // TODO: Implement save functionality

    console.log('profileData :', profileData);
    try {
      await updateUserProfile(profileData);
      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {

    }

  };


  //   const handleSaveProfile = async () => {
  //   try {
  //     setSaving(true);
  //     await updateUserProfile(profileData);
  //     toast.success("Profile saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving profile:", error);
  //     toast.error("Failed to save profile");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleFieldChange = () => {
    setHasUnsavedChanges(true);
    // setProfileData(profileData);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Simplified Header */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t('backToDashboard')}
              </Button>
            </Link>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-2xl font-bold text-gray-900">{t('profileAndSettings')}</h1>
              <p className="text-gray-500 text-sm">{t('manageAccountPreferences')}</p>
            </div>
          </div>

          <Button
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('saveChanges')}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
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
                  setCurrentUser={setProfileData}
                  isIndividualRecruiter={isIndividualRecruiter}
                  setIsIndividualRecruiter={setIsIndividualRecruiter}
                  onChange={handleFieldChange}
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
                    setCurrentUser={setProfileData}
                    isIndividualRecruiter={isIndividualRecruiter}
                    setIsIndividualRecruiter={setIsIndividualRecruiter}
                    onChange={handleFieldChange}
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
                  setCurrentUser={setProfileData}
                  onChange={handleFieldChange} />
              </CardContent>
            </Card>

            {/* Simplified Login & Security */}
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
                  onChange={handleFieldChange} />
              </CardContent>
            </Card>
          </div>

          {/* Simplified Sidebar */}
          <div className="lg:col-span-1">
            <NavigationLinksSection />
          </div>
        </div>

        {/* Mobile Save Button */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
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
      </div>
    </div>
  );
}
