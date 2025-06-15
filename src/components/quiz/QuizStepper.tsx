
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Step {
  id: number;
  name: string;
}

interface QuizStepperProps {
  steps: Step[];
  currentStep: number;
}

export function QuizStepper({ steps, currentStep }: QuizStepperProps) {
  return (
    <nav className="flex items-center space-x-1 sm:space-x-2" aria-label="Progress">
      {steps.map((step, stepIdx) => (
        <React.Fragment key={step.name}>
          <div className="flex items-center">
            <span
              className={cn(
                'flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm',
                step.id === currentStep
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-gray-600',
              )}
            >
              {step.id}
            </span>
            <span
              className={cn(
                'ml-2 sm:ml-3 text-xs sm:text-sm font-medium',
                step.id === currentStep ? 'text-accent' : 'text-gray-600'
              )}
            >
              {step.name}
            </span>
          </div>
          {stepIdx < steps.length - 1 ? (
            <ChevronRight className="h-5 w-5 text-gray-300 mx-1 sm:mx-2" aria-hidden="true" />
          ) : null}
        </React.Fragment>
      ))}
    </nav>
  );
}
