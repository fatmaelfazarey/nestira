
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Star, MapPin, Briefcase, Unlock, DollarSign } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { formatBlurredName, getCountryFlag } from '@/utils/talentPoolUtils';

interface CandidateGridViewProps {
  sortedCandidates: any[];
  isRevealed: boolean;
  scoreVisibility: any;
  favorites: Set<number>;
  unlockedCandidates: Set<number>;
  onToggleFavorite: (id: number) => void;
  onUnlock: (candidate: any) => void;
}

export const CandidateGridView: React.FC<CandidateGridViewProps> = ({
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCandidates.map(candidate => {
          const isUnlocked = unlockedCandidates.has(candidate.id);
          const shouldBlur = !isRevealed;
          
          return (
            <Card key={candidate.id} className="hover:shadow-lg transition-all duration-300 relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12 blur-sm">
                        <AvatarImage src={candidate.photo} alt={candidate.name} />
                        <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-full flex items-center justify-center">
                        <Unlock className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="transition-all duration-500">
                          {formatBlurredName(candidate.name)}
                        </span>
                        <span className="text-lg">{getCountryFlag(candidate.country)}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          {isRevealed && scoreVisibility.showScores ? (
                            <div className={`transition-all duration-500 ${scoreVisibility.isAnimating ? 'animate-scale-in' : ''}`}>
                              <CircularProgress value={candidate.score} size={60} strokeWidth={4} />
                            </div>
                          ) : (
                            <div className="relative">
                              <CircularProgress value={0} size={60} strokeWidth={4} className="opacity-30" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs text-gray-400 text-center">Hidden</span>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onToggleFavorite(candidate.id)} 
                      className="text-yellow-500 hover:text-yellow-600 p-1"
                    >
                      <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {candidate.experience} experience
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  {candidate.salaryExpectation}
                </div>

                <div className="flex items-center gap-2.5">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Industry:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.industryExperience.map((industry: string) => (
                      <Badge 
                        key={industry} 
                        variant="outline" 
                        className={`text-xs ${shouldBlur ? 'blur-sm opacity-50' : ''}`}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Subfields:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.financeSubfields.map((subfield: string) => (
                      <Badge 
                        key={subfield} 
                        variant="outline" 
                        className={`text-xs bg-blue-50 text-blue-700 border-blue-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}
                      >
                        {subfield}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Tools:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.softwareTools.map((tool: string) => (
                      <Badge 
                        key={tool} 
                        variant="outline" 
                        className={`text-xs bg-purple-50 text-purple-700 border-purple-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Certs:</p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.certifications.map((cert: string) => (
                      <Badge 
                        key={cert} 
                        variant="outline" 
                        className={`text-xs bg-green-50 text-green-700 border-green-200 ${shouldBlur ? 'blur-sm opacity-50' : ''}`}
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <Badge 
                    variant={candidate.status === 'Available' ? 'default' : 'secondary'} 
                    className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {candidate.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-accent hover:bg-accent/90" 
                    onClick={() => onUnlock(candidate)}
                  >
                    <Unlock className="w-4 h-4 mr-1" />
                    Unlock
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
