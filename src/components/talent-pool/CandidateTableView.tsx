
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Star, Unlock } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { formatBlurredName, getCountryFlag } from '@/utils/talentPoolUtils';

interface CandidateTableViewProps {
  sortedCandidates: any[];
  isRevealed: boolean;
  scoreVisibility: any;
  favorites: Set<number>;
  unlockedCandidates: Set<number>;
  onToggleFavorite: (id: number) => void;
  onUnlock: (candidate: any) => void;
}

export const CandidateTableView: React.FC<CandidateTableViewProps> = ({
  sortedCandidates,
  isRevealed,
  scoreVisibility,
  favorites,
  unlockedCandidates,
  onToggleFavorite,
  onUnlock
}) => {
  return (
    <TooltipProvider>
      <div className="w-full overflow-hidden">
        <Card className="w-full">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Candidate</TableHead>
                  <TableHead className="min-w-[120px]">Title</TableHead>
                  <TableHead className="min-w-[100px]">Location</TableHead>
                  <TableHead className="min-w-[80px]">Experience</TableHead>
                  <TableHead className="min-w-[80px]">Score</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Industry</TableHead>
                  <TableHead className="min-w-[120px]">Subfields</TableHead>
                  <TableHead className="min-w-[120px]">Tools</TableHead>
                  <TableHead className="min-w-[120px]">Certifications</TableHead>
                  <TableHead className="min-w-[120px]">Salary</TableHead>
                  <TableHead className="min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCandidates.map(candidate => {
                  const isUnlocked = unlockedCandidates.has(candidate.id);
                  const shouldBlurName = !isRevealed && !isUnlocked;
                  const shouldBlurSkills = !isRevealed && !isUnlocked;
                  
                  return (
                    <TableRow key={candidate.id}>
                      <TableCell className="min-w-[150px]">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className={`w-8 h-8 transition-all duration-500 ${shouldBlurName ? 'blur-sm' : ''}`}>
                              <AvatarImage src={candidate.photo} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {shouldBlurName && (
                              <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-full flex items-center justify-center">
                                <Unlock className="w-3 h-3 text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2 transition-all duration-500">
                              {shouldBlurName ? formatBlurredName(candidate.name) : candidate.name}
                              <span>{getCountryFlag(candidate.country)}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">{candidate.title}</TableCell>
                      <TableCell className="min-w-[100px]">{candidate.location}</TableCell>
                      <TableCell className="min-w-[80px]">{candidate.experience}</TableCell>
                      <TableCell className="min-w-[80px]">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              {isRevealed && scoreVisibility.showScores ? (
                                <div className={`transition-all duration-500 ${scoreVisibility.isAnimating ? 'animate-scale-in' : ''}`}>
                                  <CircularProgress value={candidate.score} size={40} strokeWidth={3} showPercentage={true} compact={true} />
                                </div>
                              ) : (
                                <div className="relative">
                                  <CircularProgress value={0} size={40} strokeWidth={3} className="opacity-30" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs text-gray-400">-</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {isRevealed && scoreVisibility.showScores 
                                ? `Matching Score: ${candidate.score}%` 
                                : 'Use filters, job post, or AI search to reveal match'}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="min-w-[80px]">
                        <Badge 
                          variant={candidate.status === 'Available' ? 'default' : 'secondary'} 
                          className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {candidate.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <div className="flex flex-wrap gap-1">
                          {candidate.industryExperience.slice(0, 2).map((industry: string) => (
                            <Badge key={industry} variant="outline" className={`text-xs ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              {industry}
                            </Badge>
                          ))}
                          {candidate.industryExperience.length > 2 && (
                            <Badge variant="outline" className={`text-xs ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              +{candidate.industryExperience.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <div className="flex flex-wrap gap-1">
                          {candidate.financeSubfields.slice(0, 2).map((subfield: string) => (
                            <Badge key={subfield} variant="outline" className={`text-xs bg-blue-50 text-blue-700 border-blue-200 ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              {subfield}
                            </Badge>
                          ))}
                          {candidate.financeSubfields.length > 2 && (
                            <Badge variant="outline" className={`text-xs ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              +{candidate.financeSubfields.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <div className="flex flex-wrap gap-1">
                          {candidate.softwareTools.slice(0, 2).map((tool: string) => (
                            <Badge key={tool} variant="outline" className={`text-xs bg-purple-50 text-purple-700 border-purple-200 ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              {tool}
                            </Badge>
                          ))}
                          {candidate.softwareTools.length > 2 && (
                            <Badge variant="outline" className={`text-xs ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              +{candidate.softwareTools.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <div className="flex flex-wrap gap-1">
                          {candidate.certifications.slice(0, 2).map((cert: string) => (
                            <Badge key={cert} variant="outline" className={`text-xs bg-green-50 text-green-700 border-green-200 ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              {cert}
                            </Badge>
                          ))}
                          {candidate.certifications.length > 2 && (
                            <Badge variant="outline" className={`text-xs ${shouldBlurSkills ? 'blur-sm opacity-50' : ''}`}>
                              +{candidate.certifications.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px] text-sm">{candidate.salaryExpectation}</TableCell>
                      <TableCell className="min-w-[100px]">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => onToggleFavorite(candidate.id)} 
                            className="text-yellow-500 hover:text-yellow-600 p-1"
                          >
                            <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                          </Button>
                          {!isUnlocked ? (
                            <Button 
                              size="sm" 
                              className="bg-accent hover:bg-accent/90" 
                              onClick={() => onUnlock(candidate)}
                            >
                              <Unlock className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 text-xs">
                              Unlocked
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};
