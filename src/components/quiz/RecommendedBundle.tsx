
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

const NESTIRA_BUNDLES: Record<string, { label: string; skills: string[] }> = {
  "fp&a analyst": {
    label: "FP&A Analyst (Recommended by Nestira)",
    skills: ["Financial Math", "Budgeting", "Modeling", "Excel", "Communication"]
  },
  "accountant": {
    label: "Accountant (Recommended by Nestira)",
    skills: ["IFRS", "Excel", "Accounts Payable", "Accounts Receivable"]
  },
  "finance manager": {
    label: "Finance Manager (Recommended by Nestira)",
    skills: ["Budgeting", "Risk Analysis", "DISC", "Critical Thinking"]
  },
};

interface RecommendedBundleProps {
  jobTitle: string;
  onPreview: (skills: string[]) => void;
  onAdopt: (skills: string[]) => void;
}

export function RecommendedBundle({ jobTitle, onPreview, onAdopt }: RecommendedBundleProps) {
  const bundle = NESTIRA_BUNDLES[jobTitle.toLowerCase()];
  if (!bundle) return null;

  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col gap-2 pt-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-semibold">
            Recommended by Nestira for this role
          </Badge>
          <span className="font-semibold text-primary">{bundle.label}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {bundle.skills.map((s) => (
            <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => onPreview(bundle.skills)}>
            <Eye className="w-4 h-4 mr-1" /> Preview Questions
          </Button>
          <Button size="sm" onClick={() => onAdopt(bundle.skills)} className="bg-accent text-white">
            Use This Bundle
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
