
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Unlock } from 'lucide-react';

interface LockedSectionProps {
  title: string;
  description: string;
  unlockText?: string;
  onUnlock: () => void;
}

export const LockedSection: React.FC<LockedSectionProps> = ({ 
  title, 
  description, 
  unlockText = "Unlock Profile",
  onUnlock
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-8 text-center space-y-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
      <Lock className="w-8 h-8 text-gray-400" />
    </div>
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 max-w-md">{description}</p>
    </div>
    <Button 
      onClick={onUnlock}
      className="bg-accent hover:bg-accent/90"
    >
      <Unlock className="w-4 h-4 mr-2" />
      {unlockText}
    </Button>
  </div>
);
