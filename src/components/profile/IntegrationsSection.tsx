
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Video, Calendar, Mail, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface IntegrationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onConnect: () => void;
  isConnected: boolean;
  isRTL: boolean;
}

const IntegrationItem: React.FC<IntegrationItemProps> = ({ icon, title, description, onConnect, isConnected, isRTL }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white/50 shadow-sm transition-all hover:shadow-md">
      <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>
        <div className={`${isRTL ? 'text-right' : ''} space-y-1`}>
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            {!isConnected && (
              <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                {t('required')}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Button onClick={onConnect} variant={isConnected ? 'outline' : 'default'} className={cn(
        "whitespace-nowrap",
        !isConnected && "bg-blue-600 hover:bg-blue-700 text-white",
      )}>
        <LinkIcon className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {isConnected ? t('disconnect') : t('connect')}
      </Button>
    </div>
  );
};

export function IntegrationsSection({ onChange }: { onChange: () => void }) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [connected, setConnected] = useState({
    meet: false,
    calendar: false,
    gmail: false,
  });

  const handleConnect = (integration: keyof typeof connected) => {
    setConnected(prev => ({ ...prev, [integration]: !prev[integration] }));
    onChange();
    console.log(`${integration} connection toggled`);
  };
  
  const integrations = [
    {
      id: 'meet' as const,
      icon: <Video className="w-6 h-6 text-green-600" />,
      title: 'Google Meet',
      description: t('googleMeetDesc'),
    },
    {
      id: 'calendar' as const,
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      title: 'Google Calendar',
      description: t('googleCalendarDesc'),
    },
    {
      id: 'gmail' as const,
      icon: <Mail className="w-6 h-6 text-red-600" />,
      title: 'Gmail',
      description: t('gmailDesc'),
    },
  ];
  
  return (
    <div className="space-y-4">
      {integrations.map(integration => (
        <IntegrationItem
          key={integration.id}
          icon={integration.icon}
          title={integration.title}
          description={integration.description}
          isConnected={connected[integration.id]}
          onConnect={() => handleConnect(integration.id)}
          isRTL={isRTL}
        />
      ))}
    </div>
  );
}
