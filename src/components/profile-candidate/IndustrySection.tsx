
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, X } from "lucide-react";
import { useState } from "react";

interface IndustrySectionProps {
  data: {
    industries: string[];
    subfields: string[];
  };
  onChange: (data: any) => void;
}

const INDUSTRIES = [
  "Banking",
  "FMCG", 
  "Tech",
  "Real Estate",
  "Investment",
  "Insurance",
  "Consulting",
  "Healthcare",
  "Energy"
];

const SUBFIELDS = [
  "Financial Planning",
  "Budget Management", 
  "Cost Analysis",
  "Risk Management",
  "Investment Banking",
  "Portfolio Management",
  "Treasury",
  "Audit",
  "Tax Advisory",
  "Corporate Finance",
  "Credit Analysis",
  "Compliance"
];

export function IndustrySection({ data, onChange }: IndustrySectionProps) {
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [showAllSubfields, setShowAllSubfields] = useState(false);

  const toggleIndustry = (industry: string) => {
    const industries = data?.industries || [];
    const updated = industries.includes(industry)
      ? industries.filter(i => i !== industry)
      : [...industries, industry];
    
    onChange({
      ...data,
      industries: updated
    });
  };

  const toggleSubfield = (subfield: string) => {
    const subfields = data?.subfields || [];
    const updated = subfields.includes(subfield)
      ? subfields.filter(s => s !== subfield)
      : [...subfields, subfield];
    
    onChange({
      ...data,
      subfields: updated
    });
  };

  const removeIndustry = (industry: string) => {
    const industries = data?.industries || [];
    onChange({
      ...data,
      industries: industries.filter(i => i !== industry)
    });
  };

  const removeSubfield = (subfield: string) => {
    const subfields = data?.subfields || [];
    onChange({
      ...data,
      subfields: subfields.filter(s => s !== subfield)
    });
  };

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Building2 className="w-5 h-5 text-secondary-c" />
          Industry & Expertise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Industries */}
        {data?.industries?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-c-foreground mb-2">Selected Industries</h4>
            <div className="flex flex-wrap gap-2">
              {data.industries.map((industry) => (
                <Badge key={industry} variant="secondary-c" className="flex items-center gap-1">
                  {industry}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeIndustry(industry)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Industry Selection */}
        <div>
          <h4 className="text-sm font-medium mb-3">Industry</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {INDUSTRIES.slice(0, showAllIndustries ? INDUSTRIES.length : 6).map((industry) => (
              <Button
                key={industry}
                variant={data?.industries?.includes(industry) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleIndustry(industry)}
                className="transition-all duration-200"
              >
                {industry}
              </Button>
            ))}
          </div>
          {INDUSTRIES.length > 6 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllIndustries(!showAllIndustries)}
              className="text-secondary-c hover:text-secondary-c/80"
            >
              {showAllIndustries ? "Show Less" : `+${INDUSTRIES.length - 6} More`}
            </Button>
          )}
        </div>

        {/* Selected Subfields */}
        {data?.subfields?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-c-foreground mb-2">Selected Subfields</h4>
            <div className="flex flex-wrap gap-2">
              {data.subfields.map((subfield) => (
                <Badge key={subfield} variant="outline" className="flex items-center gap-1">
                  {subfield}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-destructive" 
                    onClick={() => removeSubfield(subfield)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Subfield Selection */}
        <div>
          <h4 className="text-sm font-medium mb-3">Subfields</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {SUBFIELDS.slice(0, showAllSubfields ? SUBFIELDS.length : 6).map((subfield) => (
              <Button
                key={subfield}
                variant={data?.subfields?.includes(subfield) ? "secondary-c" : "outline"}
                size="sm"
                onClick={() => toggleSubfield(subfield)}
                className="transition-all duration-200"
              >
                {subfield}
              </Button>
            ))}
          </div>
          {SUBFIELDS.length > 6 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAllSubfields(!showAllSubfields)}
              className="text-secondary-c hover:text-secondary-c/80"
            >
              {showAllSubfields ? "Show Less" : `+${SUBFIELDS.length - 6} More`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
