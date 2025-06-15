
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const stepLabels = [
  "Job",
  "Template",
  "Customize",
  "Finalize"
];

export function StepTracker({ currentStep }: { currentStep: number }) {
  return (
    <nav className="flex items-center justify-center py-4 w-full mb-6">
      <ol className="flex flex-wrap gap-2 items-center">
        {stepLabels.map((step, idx) => (
          <li key={step} className={cn(
            "flex items-center text-base font-medium",
            currentStep > idx
              ? "text-accent"
              : currentStep === idx
                ? "text-primary"
                : "text-gray-400"
          )}>
            {currentStep > idx ? (
              <span className="flex items-center gap-1"><Check className="w-4 h-4" /> {step}</span>
            ) : (
              <span>{step}</span>
            )}
            {idx < stepLabels.length - 1 && (
              <span className="mx-2 text-gray-300">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
