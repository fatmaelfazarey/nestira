
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  TrendingUp,
  MapPin,
  Calendar,
  Award,
  Code,
  BookOpen
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  country: string;
  currency: string;
  employmentType: string;
  workMode: string;
  postedDate: string;
  salary: string;
  tags: string[];
  description: string;
  requirements: string[];
  saved: boolean;
  savedDate?: string;
  deadline?: string;
  matchScore: number;
  matchDetails: {
    skillsMatched: string[];
    skillsMissing: string[];
    toolsMatched: string[];
    toolsMissing: string[];
    certificationsMatched: string[];
    certificationsMissing: string[];
    experienceMatch: boolean;
    locationMatch: boolean;
  };
}

interface MatchScoreDrawerProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

export function MatchScoreDrawer({ job, open, onClose }: MatchScoreDrawerProps) {
  if (!job) return null;

  const getMatchScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getSmartTips = () => {
    const tips = [];
    
    if (job.matchDetails.skillsMissing.length > 0) {
      tips.push(`Consider developing skills in: ${job.matchDetails.skillsMissing.join(', ')}`);
    }
    
    if (job.matchDetails.toolsMissing.length > 0) {
      tips.push(`Learn these tools to boost your profile: ${job.matchDetails.toolsMissing.join(', ')}`);
    }
    
    if (job.matchDetails.certificationsMissing.length > 0) {
      tips.push(`Pursue these certifications: ${job.matchDetails.certificationsMissing.join(', ')}`);
    }
    
    if (!job.matchDetails.locationMatch) {
      tips.push(`Consider relocating to ${job.location} or look for remote opportunities`);
    }

    if (tips.length === 0) {
      tips.push("You're an excellent match for this role! Focus on crafting a compelling application.");
    }
    
    return tips;
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp className={`w-6 h-6 ${getMatchScoreColor(job.matchScore)}`} />
            <div>
              <SheetTitle className="text-left">
                {job.matchScore}% Match Score
              </SheetTitle>
              <SheetDescription className="text-left">
                {job.title} at {job.company}
              </SheetDescription>
            </div>
          </div>
          
          <div className="w-full bg-muted-c rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                job.matchScore >= 85 ? 'bg-success' : 
                job.matchScore >= 60 ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${job.matchScore}%` }}
            />
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Skills Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-primary-c" />
              <h3 className="font-semibold text-foreground">Skills</h3>
            </div>
            
            {job.matchDetails.skillsMatched.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">Matched Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.matchDetails.skillsMatched.map((skill) => (
                    <Badge key={skill} className="bg-success/20 text-success border-success/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job.matchDetails.skillsMissing.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Missing Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.matchDetails.skillsMissing.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-destructive/30 text-destructive">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Tools Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-primary-c" />
              <h3 className="font-semibold text-foreground">Tools & Technologies</h3>
            </div>
            
            {job.matchDetails.toolsMatched?.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">Matched Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.matchDetails.toolsMatched.map((tool) => (
                    <Badge key={tool} className="bg-success/20 text-success border-success/30">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job.matchDetails.toolsMissing?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Missing Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.matchDetails.toolsMissing.map((tool) => (
                    <Badge key={tool} variant="outline" className="border-destructive/30 text-destructive">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Certifications Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary-c" />
              <h3 className="font-semibold text-foreground">Certifications</h3>
            </div>
            
            {job.matchDetails.certificationsMatched.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">Your Certifications</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.matchDetails.certificationsMatched.map((cert) => (
                    <Badge key={cert} className="bg-success/20 text-success border-success/30">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job.matchDetails.certificationsMissing.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Recommended Certifications</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.matchDetails.certificationsMissing.map((cert) => (
                    <Badge key={cert} variant="outline" className="border-destructive/30 text-destructive">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Experience & Location */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-c" />
                <span className="text-sm font-medium">Experience Level</span>
              </div>
              <div className="flex items-center gap-2">
                {job.matchDetails.experienceMatch ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
                <span className={job.matchDetails.experienceMatch ? "text-success" : "text-destructive"}>
                  {job.matchDetails.experienceMatch ? "Match" : "Gap"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-c" />
                <span className="text-sm font-medium">Location Preference</span>
              </div>
              <div className="flex items-center gap-2">
                {job.matchDetails.locationMatch ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
                <span className={job.matchDetails.locationMatch ? "text-success" : "text-destructive"}>
                  {job.matchDetails.locationMatch ? "Match" : "Different"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Smart Tips */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Smart Tips to Reach 100%</h3>
            </div>
            <div className="space-y-2">
              {getSmartTips().map((tip, index) => (
                <div key={index} className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={onClose}
              className="w-full"
            >
              Got it!
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
