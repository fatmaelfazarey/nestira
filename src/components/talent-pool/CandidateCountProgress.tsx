
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CandidateCountProgressProps {
  count: number;
  total: number;
}

export const CandidateCountProgress: React.FC<CandidateCountProgressProps> = ({ count, total }) => {
  const percentage = (count / total) * 100;
  let progressColor = 'bg-red-500';
  
  if (percentage > 70) {
    progressColor = 'bg-green-500';
  } else if (percentage > 30) {
    progressColor = 'bg-orange-500';
  }
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <Progress value={percentage} className="h-2" />
      </div>
      <span className="text-sm font-medium text-gray-700">
        {count} of {total}
      </span>
    </div>
  );
};
