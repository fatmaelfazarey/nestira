
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Pencil } from "lucide-react";

interface QuizMethodSelectorProps {
  selected: "smart" | "manual";
  onChange: (v: "smart" | "manual") => void;
}

export function QuizMethodSelector({ selected, onChange }: QuizMethodSelectorProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <Card
        className={`flex-1 cursor-pointer transition-colors ${
          selected === "smart"
            ? "border-accent shadow-lg bg-accent/5"
            : "hover:border-accent"
        }`}
        onClick={() => onChange("smart")}
        tabIndex={0}
      >
        <CardContent className="flex flex-col items-start gap-3 p-6">
          <div className="flex items-center gap-2 text-accent font-semibold text-lg">
            <Sparkles className="w-6 h-6" />
            Use Smart Template <span className="ml-2 rounded-full bg-green-100 text-green-600 px-2 py-0.5 text-xs font-medium">Recommended</span>
          </div>
          <div className="text-gray-700 text-sm">
            Auto-generates the quiz bundle based on your job title with questions tailored by Nestira Finance.
          </div>
        </CardContent>
      </Card>
      <Card
        className={`flex-1 cursor-pointer transition-colors ${
          selected === "manual"
            ? "border-accent shadow-lg bg-accent/5"
            : "hover:border-accent"
        }`}
        onClick={() => onChange("manual")}
        tabIndex={0}
      >
        <CardContent className="flex flex-col items-start gap-3 p-6">
          <div className="flex items-center gap-2 text-purple-800 font-semibold text-lg">
            <Pencil className="w-6 h-6" />
            Build My Own
          </div>
          <div className="text-gray-700 text-sm">
            Start from scratch or mix, remove, and edit any assessments to match your exact needs.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
