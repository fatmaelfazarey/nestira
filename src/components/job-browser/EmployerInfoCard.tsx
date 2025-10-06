
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Building, 
  Users, 
  MapPin, 
  ExternalLink, 
  MessageCircle,
  CheckCircle,
  Globe,
  Linkedin
} from "lucide-react";

interface EmployerProfile {
  type: "individual" | "company";
  name: string;
  companyName?: string;
  logo?: string;
  industry?: string;
  companySize?: string;
  location?: string;
  description?: string;
  isVerified: boolean;
  linkedinUrl?: string;
  websiteUrl?: string;
  allowMessages?: boolean;
}

interface EmployerInfoCardProps {
  employer: EmployerProfile;
  compact?: boolean;
}

export function EmployerInfoCard({ employer, compact = false }: EmployerInfoCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSizeLabel = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      "1-10": "1-10 Employees",
      "11-50": "11-50 Employees", 
      "51-200": "51-200 Employees",
      "201-500": "201-500 Employees",
      "501-1000": "501-1000 Employees",
      "1000+": "1000+ Employees"
    };
    return sizeMap[size] || size;
  };

  const displayName = employer.type === "individual" 
    ? employer.name 
    : employer.companyName || employer.name;

  return (
    <Card className="bg-card/50 border-border-c/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employer.logo} alt={displayName} />
            <AvatarFallback className="bg-primary-c/10 text-primary-c font-semibold">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">
                {employer.type === "individual" ? "About the Recruiter" : "About the Hiring Company"}
              </h3>
              {employer.isVerified && (
                <Badge className="bg-success/20 text-success border-success/30 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Recruiter/Company Name */}
        <div className="flex items-center gap-2">
          {employer.type === "individual" ? (
            <>
              <div>
                <p className="font-medium text-foreground">{employer.name}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  Independent Recruiter
                </Badge>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-c-foreground" />
                  <span className="font-medium text-foreground">{displayName}</span>
                  {employer.linkedinUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => window.open(employer.linkedinUrl, '_blank')}
                    >
                      <Linkedin className="w-3 h-3 text-[#0077B5]" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Industry & Company Size */}
        {(employer.industry || employer.companySize) && (
          <div className="space-y-2">
            {employer.industry && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-c-foreground">Industry:</span>
                <span className="text-foreground">{employer.industry}</span>
              </div>
            )}
            {employer.companySize && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-c-foreground" />
                <Badge variant="secondary-c" className="text-xs">
                  {getSizeLabel(employer.companySize)}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        {employer.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-c-foreground" />
            <span className="text-foreground">{employer.location}</span>
          </div>
        )}

        {/* Company Description */}
        {employer.description && !compact && (
          <div className="pt-2 border-t border-border-c/50">
            <p className="text-sm text-foreground/90 leading-relaxed">
              "{employer.description}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          {employer.allowMessages && (
            <Button variant="outline" size="sm" className="text-xs">
              <MessageCircle className="w-3 h-3 mr-1" />
              Message Recruiter
            </Button>
          )}
          {employer.websiteUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => window.open(employer.websiteUrl, '_blank')}
            >
              <Globe className="w-3 h-3 mr-1" />
              Company Website
            </Button>
          )}
        </div>

        {/* Trust Badge */}
        {employer.isVerified && (
          <div className="bg-success/5 border border-success/20 rounded-md p-2 mt-3">
            <p className="text-xs text-success/80 text-center">
              ✅ Verified employers improve your chances of getting noticed faster
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
