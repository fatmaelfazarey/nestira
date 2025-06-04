
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Calendar, Settings as SettingsIcon, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertSetting {
  id: string;
  label: string;
  enabled: boolean;
}

interface AlertSection {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  settings: AlertSetting[];
}

const EmailAlertsSettings = () => {
  const { toast } = useToast();
  
  const [frequency, setFrequency] = useState('immediately');
  const [alertSections, setAlertSections] = useState<AlertSection[]>([
    {
      title: 'Candidate Activity',
      icon: User,
      settings: [
        { id: 'new_match', label: 'A new applicant matches a job', enabled: true },
        { id: 'quiz_complete', label: 'A candidate completes an assigned quiz', enabled: true },
        { id: 'job_application', label: 'A candidate applies to your job', enabled: true },
        { id: 'candidate_message', label: 'A candidate sends a message', enabled: false },
        { id: 'video_update', label: 'A candidate submits a video intro or cover letter update', enabled: false }
      ]
    },
    {
      title: 'Interview & Progress',
      icon: Calendar,
      settings: [
        { id: 'interview_scheduled', label: 'Interview is scheduled (internal or by candidate)', enabled: true },
        { id: 'interview_rescheduled', label: 'Interview is rescheduled', enabled: true },
        { id: 'status_change', label: 'Candidate status changes (e.g., Interviewed → Offered)', enabled: true },
        { id: 'feedback_added', label: 'Feedback is added by your team', enabled: false }
      ]
    },
    {
      title: 'System & Reminders',
      icon: SettingsIcon,
      settings: [
        { id: 'weekly_report', label: 'Weekly hiring summary report', enabled: true },
        { id: 'job_expiring', label: 'Job listing about to expire', enabled: true },
        { id: 'unread_messages', label: 'Unread messages in inbox (daily reminder)', enabled: false },
        { id: 'low_credits', label: 'Remaining credits < 5', enabled: true },
        { id: 'quiz_credits_low', label: 'Quiz credits about to run out', enabled: true }
      ]
    }
  ]);

  const toggleSetting = (sectionIndex: number, settingId: string) => {
    setAlertSections(prev => prev.map((section, idx) => {
      if (idx === sectionIndex) {
        return {
          ...section,
          settings: section.settings.map(setting => 
            setting.id === settingId 
              ? { ...setting, enabled: !setting.enabled }
              : setting
          )
        };
      }
      return section;
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', { alertSections, frequency });
    toast({
      title: "Settings saved",
      description: "Your email alert preferences have been updated successfully.",
    });
  };

  const handleReset = () => {
    // Reset to default values
    setFrequency('immediately');
    setAlertSections([
      {
        title: 'Candidate Activity',
        icon: User,
        settings: [
          { id: 'new_match', label: 'A new applicant matches a job', enabled: true },
          { id: 'quiz_complete', label: 'A candidate completes an assigned quiz', enabled: true },
          { id: 'job_application', label: 'A candidate applies to your job', enabled: true },
          { id: 'candidate_message', label: 'A candidate sends a message', enabled: false },
          { id: 'video_update', label: 'A candidate submits a video intro or cover letter update', enabled: false }
        ]
      },
      {
        title: 'Interview & Progress',
        icon: Calendar,
        settings: [
          { id: 'interview_scheduled', label: 'Interview is scheduled (internal or by candidate)', enabled: true },
          { id: 'interview_rescheduled', label: 'Interview is rescheduled', enabled: true },
          { id: 'status_change', label: 'Candidate status changes (e.g., Interviewed → Offered)', enabled: true },
          { id: 'feedback_added', label: 'Feedback is added by your team', enabled: false }
        ]
      },
      {
        title: 'System & Reminders',
        icon: SettingsIcon,
        settings: [
          { id: 'weekly_report', label: 'Weekly hiring summary report', enabled: true },
          { id: 'job_expiring', label: 'Job listing about to expire', enabled: true },
          { id: 'unread_messages', label: 'Unread messages in inbox (daily reminder)', enabled: false },
          { id: 'low_credits', label: 'Remaining credits < 5', enabled: true },
          { id: 'quiz_credits_low', label: 'Quiz credits about to run out', enabled: true }
        ]
      }
    ]);
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values.",
    });
  };

  const getTotalEnabledCount = () => {
    return alertSections.reduce((total, section) => 
      total + section.settings.filter(setting => setting.enabled).length, 0
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[#ff5f1b]" />
            <h1 className="text-3xl font-bold text-gray-900">Email Alerts Settings</h1>
            <Badge variant="secondary" className="ml-2">
              {getTotalEnabledCount()} enabled
            </Badge>
          </div>
          <p className="text-gray-600">
            Choose which actions you'd like to be notified about via email.
          </p>
        </div>

        {/* Notification Frequency */}
        <Card className="border-l-4 border-l-[#ff5f1b]">
          <CardHeader>
            <CardTitle className="text-lg">Notification Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                How often would you like to receive notifications?
              </label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Alert Sections */}
        <div className="space-y-6">
          {alertSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            const enabledCount = section.settings.filter(s => s.enabled).length;
            
            return (
              <Card key={section.title} className="overflow-hidden">
                <CardHeader className="bg-gray-50/50">
                  <CardTitle className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#ff5f1b]" />
                    <span>{section.title}</span>
                    <Badge variant="outline" className="ml-auto">
                      {enabledCount} of {section.settings.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {section.settings.map((setting, settingIndex) => (
                      <div
                        key={setting.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
                      >
                        <label
                          htmlFor={setting.id}
                          className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                        >
                          {setting.label}
                        </label>
                        <Switch
                          id={setting.id}
                          checked={setting.enabled}
                          onCheckedChange={() => toggleSetting(sectionIndex, setting.id)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#ff5f1b] hover:bg-[#e54d15] text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmailAlertsSettings;
