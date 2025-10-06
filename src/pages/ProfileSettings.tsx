
import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ProfileSettingsContent } from '@/components/profile-employer/ProfileSettingsContent';

const ProfileSettings = () => {
  console.log('ProfileSettings page loaded');
  
  return (
    <DashboardLayout>
      <ProfileSettingsContent />
    </DashboardLayout>
  );
};

export default ProfileSettings;
