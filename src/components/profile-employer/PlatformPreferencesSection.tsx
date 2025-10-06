
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Globe, Bell, Monitor, Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

interface PlatformPreferencesSectionProps {
  onChange: () => void;
}

export function PlatformPreferencesSection({ onChange }: PlatformPreferencesSectionProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
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
          <Globe className="w-4 h-4 text-orange-600" />
          <Label className="text-sm font-medium text-gray-900">{t('languagePreference')}</Label>
        </div>
        <RadioGroup value={language} onValueChange={(value: 'english' | 'arabic') => {
          setLanguage(value);
          onChange();
        }}>
          <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
            <RadioGroupItem value="english" id="english" className="border-orange-600 text-orange-600" />
            <Label htmlFor="english" className="cursor-pointer">{t('english')}</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
            <RadioGroupItem value="arabic" id="arabic" className="border-orange-600 text-orange-600" />
            <Label htmlFor="arabic" className="cursor-pointer">{t('arabic')}</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Interface Mode */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-orange-600" />
          <Label className="text-sm font-medium text-gray-900">{t('interfaceMode')}</Label>
        </div>
        <RadioGroup value={interfaceMode} onValueChange={(value) => {
          setInterfaceMode(value);
          onChange();
        }}>
          <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
            <RadioGroupItem value="light" id="light" className="border-orange-600 text-orange-600" />
            <Sun className="w-4 h-4 text-orange-600 ml-2" />
            <Label htmlFor="light" className="cursor-pointer">{t('lightMode')}</Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-orange-200 transition-colors">
            <RadioGroupItem value="dark" id="dark" className="border-orange-600 text-orange-600" />
            <Moon className="w-4 h-4 text-gray-600 ml-2" />
            <Label htmlFor="dark" className="cursor-pointer">{t('darkMode')}</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Notification Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-orange-600" />
          <Label className="text-sm font-medium text-gray-900">{t('notificationSettings')}</Label>
        </div>
        
        <div className="space-y-4 pl-6">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="email-updates" className="font-medium text-gray-900">{t('emailUpdates')}</Label>
              <p className="text-sm text-gray-500">{t('emailUpdatesDesc')}</p>
            </div>
            <Switch
              id="email-updates"
              checked={emailUpdates}
              onCheckedChange={(checked) => {
                setEmailUpdates(checked);
                onChange();
              }}
              className="data-[state=checked]:bg-orange-600"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="reminders" className="font-medium text-gray-900">{t('reminders')}</Label>
              <p className="text-sm text-gray-500">{t('remindersDesc')}</p>
            </div>
            <Switch
              id="reminders"
              checked={reminders}
              onCheckedChange={(checked) => {
                setReminders(checked);
                onChange();
              }}
              className="data-[state=checked]:bg-orange-600"
            />
          </div>

          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="job-matches" className="font-medium text-gray-900">{t('jobMatches')}</Label>
              <p className="text-sm text-gray-500">{t('jobMatchesDesc')}</p>
            </div>
            <Switch
              id="job-matches"
              checked={jobMatches}
              onCheckedChange={(checked) => {
                setJobMatches(checked);
                onChange();
              }}
              className="data-[state=checked]:bg-orange-600"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Autosave */}
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
        <div>
          <Label htmlFor="autosave" className="font-medium text-gray-900">{t('autosave')}</Label>
          <p className="text-sm text-gray-500">{t('autosaveDesc')}</p>
        </div>
        <Switch
          id="autosave"
          checked={autosave}
          onCheckedChange={(checked) => {
            setAutosave(checked);
            onChange();
          }}
          className="data-[state=checked]:bg-orange-600"
        />
      </div>
    </div>
  );
}
