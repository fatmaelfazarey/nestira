
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

interface PersonalInfoSectionProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    portfolio?: string;
  };
  onChange: (field: string, value: string) => void;
}

export function PersonalInfoSection({ data, onChange }: PersonalInfoSectionProps) {
  const hasData = data.fullName || data.email || data.phone || data.location;
  const isValid = data.fullName && data.email && data.phone && data.summary;

  return (
    <CollapsibleSection
      title="Personal Information"
      icon={<User className="w-5 h-5 text-primary-c" />}
      defaultOpen={true}
      hasData={!!hasData}
      isValid={!!isValid}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Full Name *
            </label>
            <Input 
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Email *
            </label>
            <Input 
              type="email" 
              placeholder="john@email.com"
              value={data.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Phone *
            </label>
            <Input 
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Location
            </label>
            <Input 
              placeholder="New York, NY"
              value={data.location}
              onChange={(e) => onChange('location', e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              LinkedIn
            </label>
            <Input 
              placeholder="linkedin.com/in/johndoe"
              value={data.linkedin || ''}
              onChange={(e) => onChange('linkedin', e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Portfolio/Website
            </label>
            <Input 
              placeholder="www.johndoe.com"
              value={data.portfolio || ''}
              onChange={(e) => onChange('portfolio', e.target.value)}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Professional Summary *
          </label>
          <Textarea 
            placeholder="Write a compelling professional summary that highlights your finance expertise and career achievements..."
            className="min-h-[100px] transition-all duration-200 focus:shadow-sm"
            value={data.summary}
            onChange={(e) => onChange('summary', e.target.value)}
          />
          <p className="text-xs text-muted-c-foreground mt-1">
            Tip: Include 2-3 key achievements and relevant finance keywords
          </p>
        </div>
      </div>
    </CollapsibleSection>
  );
}
