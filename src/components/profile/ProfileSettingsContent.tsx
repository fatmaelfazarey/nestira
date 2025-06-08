
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginSecuritySection } from './LoginSecuritySection';
import { UserProfileSection } from './UserProfileSection';
import { CompanyInfoSection } from './CompanyInfoSection';
import { PlatformPreferencesSection } from './PlatformPreferencesSection';
import { NavigationLinksSection } from './NavigationLinksSection';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';

export function ProfileSettingsContent() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isIndividualRecruiter, setIsIndividualRecruiter] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    setHasUnsavedChanges(false);
    // TODO: Implement save functionality
  };

  const handleFieldChange = () => {
    setHasUnsavedChanges(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t('backToDashboard')}
              </Button>
            </Link>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-3xl font-bold text-gray-900">{t('profileAndSettings')}</h1>
              <p className="text-gray-600 mt-1">{t('manageAccountPreferences')}</p>
            </div>
          </div>
          
          {/* Save Button - Desktop */}
          <div className="hidden lg:block">
            <Button 
              onClick={handleSaveChanges}
              disabled={!hasUnsavedChanges}
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
            >
              <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('saveChanges')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Profile */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className={`text-xl font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  👤 {t('userProfile')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <UserProfileSection 
                  isIndividualRecruiter={isIndividualRecruiter}
                  setIsIndividualRecruiter={setIsIndividualRecruiter}
                  onChange={handleFieldChange} 
                />
              </CardContent>
            </Card>

            {/* Company Information - Only show if not individual recruiter */}
            {!isIndividualRecruiter && (
              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className={`text-xl font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    🏢 {t('companyInformation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <CompanyInfoSection 
                    isIndividualRecruiter={isIndividualRecruiter}
                    setIsIndividualRecruiter={setIsIndividualRecruiter}
                    onChange={handleFieldChange}
                  />
                </CardContent>
              </Card>
            )}

            {/* Platform Preferences */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className={`text-xl font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  🌐 {t('platformPreferences')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <PlatformPreferencesSection onChange={handleFieldChange} />
              </CardContent>
            </Card>

            {/* Login & Security - Moved to the end */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className={`text-xl font-semibold text-gray-900 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  🔐 {t('loginAndSecurity')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <LoginSecuritySection onChange={handleFieldChange} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <NavigationLinksSection />
          </div>
        </div>

        {/* Mobile Save Button - Sticky */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <Button 
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-xl"
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
