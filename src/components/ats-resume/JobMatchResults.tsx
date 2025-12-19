// components/ats-resume/JobMatchResults.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface JobMatchResultsProps {
    matchData: {
        matchPercentage: number;
        missingSkills: string[];
        improvements: string[];
        summary: string;
    };
    onApplySuggestions?: (missingSkills: string[]) => void;
    onStartBuilding?: () => void;
}

export function JobMatchResults({
    matchData,
    onApplySuggestions,
    onStartBuilding
}: JobMatchResultsProps) {
    const [appliedSkills, setAppliedSkills] = useState<string[]>([]);

    const getMatchColor = (percentage: number) => {
        if (percentage >= 70) return "text-green-600";
        if (percentage >= 40) return "text-yellow-600";
        return "text-red-600";
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 70) return "bg-green-500";
        if (percentage >= 40) return "bg-yellow-500";
        return "bg-red-500";
    };

    const handleApplySkill = (skill: string) => {
        if (!appliedSkills.includes(skill)) {
            setAppliedSkills([...appliedSkills, skill]);
            toast.success(`Added "${skill}" to your skills`);
        }
    };

    const handleApplyAllSkills = () => {
        if (onApplySuggestions) {
            onApplySuggestions(matchData.missingSkills);
        }
        setAppliedSkills([...matchData.missingSkills]);
        toast.success("All suggested skills added to your resume!");
    };

    return (
        <div className="space-y-6">
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                        <span>Job Match Analysis</span>
                        <Badge
                            variant="outline"
                            className={`text-lg font-bold ${getMatchColor(matchData.matchPercentage)}`}
                        >
                            {matchData.matchPercentage}% Match
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Match Score */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Match Score</span>
                            <span className="font-medium">{matchData.matchPercentage}%</span>
                        </div>
                        <Progress
                            value={matchData.matchPercentage}
                            className={`h-2 ${getProgressColor(matchData.matchPercentage)}`}
                        />
                        <p className="text-sm text-muted-foreground">
                            {matchData.matchPercentage >= 70
                                ? "Strong match! Your CV aligns well with the job requirements."
                                : matchData.matchPercentage >= 40
                                    ? "Moderate match. Consider making some improvements."
                                    : "Low match. Significant improvements needed to meet job requirements."
                            }
                        </p>
                    </div>

                    {/* Summary */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">Analysis Summary</h3>
                        <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                            {matchData.summary}
                        </p>
                    </div>

                    {/* Missing Skills */}
                    {matchData.missingSkills.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground">Missing Skills ({matchData.missingSkills.length})</h3>
                                {/* <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleApplyAllSkills}
                                    disabled={appliedSkills.length === matchData.missingSkills.length}
                                >
                                    {appliedSkills.length === matchData.missingSkills.length
                                        ? "All Applied"
                                        : "Add All Skills"}
                                </Button> */}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {matchData.missingSkills.map((skill, index) => (
                                    <Badge
                                        key={index}
                                        variant={appliedSkills.includes(skill) ? "default" : "outline"}
                                        className={`cursor-pointer transition-all ${appliedSkills.includes(skill)
                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                            }`}
                                        onClick={() => handleApplySkill(skill)}
                                    >
                                        {skill}
                                        {appliedSkills.includes(skill) && (
                                            <span className="ml-1">✓</span>
                                        )}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Click on skills to add them to your resume
                            </p>
                        </div>
                    )}

                    {/* Suggested Improvements */}
                    {matchData.improvements.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground">Suggested Improvements</h3>
                            <ul className="space-y-2">
                                {matchData.improvements.map((improvement, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <span className="text-primary mr-2 mt-1">•</span>
                                        <span className="text-muted-foreground">{improvement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                        <Button
                            variant="default"
                          
                            className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
                            onClick={onStartBuilding}
                        >
                            Start Building Resume
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.print()}
                        >
                            Export Report
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border shadow-sm bg-blue-50">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">💡 Tips for Better Matching</h3>
                    <ul className="space-y-1 text-sm text-blue-700">
                        <li>• Use exact keywords from the job description</li>
                        <li>• Quantify achievements with numbers and metrics</li>
                        <li>• Tailor your summary to the specific job</li>
                        <li>• Include all relevant certifications and tools</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}