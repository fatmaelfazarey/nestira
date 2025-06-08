
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LoginSecuritySection } from './LoginSecuritySection';
import { UserProfileSection } from './UserProfileSection';
import { CompanyInfoSection } from './CompanyInfoSection';
import { PlatformPreferencesSection } from './PlatformPreferencesSection';
import { NavigationLinksSection } from './NavigationLinksSection';

export function ProfileSettingsContent() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isIndividualRecruiter, setIsIndividualRecruiter] = useState(false);

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    setHasUnsavedChanges(false);
    // TODO: Implement save functionality
  };

  const handleFieldChange = () => {
    setHasUnsavedChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account preferences and company information</p>
          </div>
        </div>
        
        {/* Save Button - Sticky on mobile */}
        <div className="hidden lg:block">
          <Button 
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Login & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Login & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LoginSecuritySection onChange={handleFieldChange} />
            </CardContent>
          </Card>

          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UserProfileSection onChange={handleFieldChange} />
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CompanyInfoSection 
                isIndividualRecruiter={isIndividualRecruiter}
                setIsIndividualRecruiter={setIsIndividualRecruiter}
                onChange={handleFieldChange}
              />
            </CardContent>
          </Card>

          {/* Platform Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Platform Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformPreferencesSection onChange={handleFieldChange} />
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
          className="w-full bg-orange-600 hover:bg-orange-700 shadow-lg"
          size="lg"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
