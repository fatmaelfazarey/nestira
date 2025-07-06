
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Folder } from 'lucide-react';
import { AddToFolderModal } from './AddToFolderModal';

interface AddToFolderButtonProps {
  candidate: any;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

export const AddToFolderButton: React.FC<AddToFolderButtonProps> = ({
  candidate,
  variant = 'outline',
  size = 'sm',
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
        {showIcon && <Plus className="w-4 h-4" />}
        {children || 'Add to Folder'}
      </Button>

      <AddToFolderModal
        candidate={candidate}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
