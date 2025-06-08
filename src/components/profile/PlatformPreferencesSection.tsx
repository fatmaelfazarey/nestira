
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Globe, Bell, Monitor, Moon, Sun } from 'lucide-react';

interface PlatformPreferencesSectionProps {
  onChange: () => void;
}

export function PlatformPreferencesSection({ onChange }: PlatformPreferencesSectionProps) {
  const [language, setLanguage] = useState('english');
  const [interfaceMode, setInterfaceMode] = useState('light');
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [jobMatches, setJobMatches] = useState(false);
  const [autosave, setAutosave] = useState(true);

  return (
    <div className="space-y-6">
      {/* Language Preference */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <Label>Language Preference</Label>
        </div>
        <RadioGroup value={language} onValueChange={(value) => {
          setLanguage(value);
          onChange();
        }}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="english" id="english" />
            <Label htmlFor="english">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="arabic" id="arabic" />
            <Label htmlFor="arabic">العربية (Arabic)</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Interface Mode */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-gray-600" />
          <Label>Interface Mode</Label>
        </div>
        <RadioGroup value={interfaceMode} onValueChange={(value) => {
          setInterfaceMode(value);
          onChange();
        }}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Sun className="w-4 h-4 text-gray-600" />
            <Label htmlFor="light">Light Mode</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Moon className="w-4 h-4 text-gray-600" />
            <Label htmlFor="dark">Dark Mode</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Notification Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-600" />
          <Label>Notification Settings</Label>
        </div>
        
        <div className="space-y-4 pl-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-updates">Email Updates</Label>
              <p className="text-sm text-gray-500">Receive platform updates and news</p>
            </div>
            <Switch
              id="email-updates"
              checked={emailUpdates}
              onCheckedChange={(checked) => {
                setEmailUpdates(checked);
                onChange();
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminders">Reminders</Label>
              <p className="text-sm text-gray-500">Interview reminders and deadlines</p>
            </div>
            <Switch
              id="reminders"
              checked={reminders}
              onCheckedChange={(checked) => {
                setReminders(checked);
                onChange();
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="job-matches">Job Matches</Label>
              <p className="text-sm text-gray-500">Notifications for relevant candidates</p>
            </div>
            <Switch
              id="job-matches"
              checked={jobMatches}
              onCheckedChange={(checked) => {
                setJobMatches(checked);
                onChange();
              }}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Autosave */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="autosave">Autosave</Label>
          <p className="text-sm text-gray-500">Automatically save changes as you type</p>
        </div>
        <Switch
          id="autosave"
          checked={autosave}
          onCheckedChange={(checked) => {
            setAutosave(checked);
            onChange();
          }}
        />
      </div>
    </div>
  );
}
