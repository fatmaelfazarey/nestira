
import React from 'react';
import { Check } from 'lucide-react';

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
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${isCompleted ? 'bg-green-500 text-white' : ''}
                  ${isCurrent ? 'bg-[#ff5f1b] text-white' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-gray-200 text-gray-600' : ''}
                `}>
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isCurrent ? 'text-[#ff5f1b]' : 'text-gray-600'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
