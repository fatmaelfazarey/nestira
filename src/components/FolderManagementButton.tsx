
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Folder, Settings } from 'lucide-react';
import { FolderManagementModal } from './FolderManagementModal';

interface FolderManagementButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const FolderManagementButton: React.FC<FolderManagementButtonProps> = ({
  variant = 'outline',
  size = 'default',
  className = '',
  showIcon = true,
  children
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={`flex items-center gap-2 ${className}`}
      >
        {showIcon && <Folder className="w-4 h-4" />}
        {children || 'Manage Folders'}
      </Button>

      <FolderManagementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
