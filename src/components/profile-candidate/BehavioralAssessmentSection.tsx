
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Users, Shield, Target, CheckCircle, Clock, Play } from "lucide-react";
import { useState } from "react";

interface BehavioralAssessmentSectionProps {
  data: {
    completed: boolean;
    score?: number;
    traits?: string[];
    completedDate?: string;
    status: 'not_started' | 'in_progress' | 'completed';
    results?: {
      collaboration: number;
      processOriented: number;
      detailConscious: number;
      riskAware: number;
      teamDependent: number;
      structured: number;
    };
  };
  onChange: (data: any) => void;
}

export function BehavioralAssessmentSection({ data, onChange }: BehavioralAssessmentSectionProps) {
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = () => {
    setIsStarting(true);
    // Simulate assessment process
    setTimeout(() => {
      setIsStarting(false);
      onChange({
        ...data,
        completed: true,
        status: 'completed',
        score: 85,
        traits: ['Collaboration-Focused', 'Process-Oriented', 'Detail-Conscious', 'Risk-Aware', 'Team-Dependent', 'Structured'],
        completedDate: new Date().toISOString(),
        results: {
          collaboration: 90,
          processOriented: 85,
          detailConscious: 95,
          riskAware: 70,
          teamDependent: 80,
          structured: 88
        }
      });
    }, 5000);
  };

  const getStatusBadge = () => {
    switch (data?.status) {
      case 'in_progress':
        return <Badge variant="secondary-c" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </Badge>;
      case 'completed':
        return <Badge variant="secondary-c" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>;
      default:
        return null;
    }
  };

  const TraitBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-c-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="w-5 h-5 text-secondary-c" />
          Behavioral & Culture Fit
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-info-light rounded-lg border border-info/20">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-info mt-0.5" />
            <div>
              <p className="text-sm font-medium text-info mb-2">
                Unlock better job matches
              </p>
              <p className="text-sm text-info/80">
                Complete our behavioral assessment to help employers understand your work style and find roles 
                that match your personality and preferences.
              </p>
            </div>
          </div>
        </div>

        {!data?.completed ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-secondary-c" />
            </div>
            <h3 className="text-lg font-medium mb-2">Take Behavioral Assessment</h3>
            <p className="text-muted-c-foreground mb-6">
              15 minutes • Personality insights • Better job matching
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-success" />
                <span>Collaboration Style</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-success" />
                <span>Decision Making</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>Risk Tolerance</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span>Work Preferences</span>
              </div>
            </div>

            <Button 
              onClick={handleStartAssessment}
              disabled={isStarting}
              className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
              size="lg"
            >
              {isStarting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Starting Assessment...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Assessment
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Behavioral Summary */}
            <div className="p-4 bg-success/5 rounded-lg border border-success/20">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Behavioral Summary
              </h4>
              <p className="text-sm text-muted-c-foreground mb-3">
                Collaborative and integrity-driven professional who prefers clear processes, team input, 
                and supervisory guidance when making complex decisions.
              </p>
            </div>

            {/* Key Traits */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-secondary-c" />
                Key Traits
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.traits?.map((trait) => (
                  <Badge key={trait} variant="secondary-c" className="bg-secondary-c/10 text-secondary-c border-secondary-c/20">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Trait Indicators */}
            {data.results && (
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-secondary-c" />
                  Trait Indicators
                </h4>
                <div className="space-y-4">
                  <TraitBar label="Decision-Making Style" value={data.results.processOriented} color="green" />
                  <TraitBar label="Integrity Signal" value={data.results.detailConscious} color="green" />
                  <TraitBar label="Risk Tolerance" value={data.results.riskAware} color="orange" />
                  <TraitBar label="Peer Dependency" value={data.results.teamDependent} color="yellow" />
                </div>
              </div>
            )}

            {/* Culture Fit Snapshot */}
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                Culture Fit Snapshot
              </h4>
              <p className="text-sm text-purple-700 mb-3">
                Prefers structured, process-driven teams with clear expectations and collaborative decision-making.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-300 text-purple-700">Structured Teams</Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700">Cross-functional Work</Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700">Deadline-Driven</Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700">Role Clarity</Badge>
              </div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
