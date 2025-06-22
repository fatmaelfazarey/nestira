
import React from 'react';

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
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.id <= currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}
              >
                <span className="text-sm font-medium">{step.id}</span>
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 h-px bg-gray-300"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
