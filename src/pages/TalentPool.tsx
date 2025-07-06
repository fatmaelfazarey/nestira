
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Users, 
  Filter, 
  Grid3X3, 
  List, 
  Search,
  Star,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Eye,
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
  AlertCircle,
  Shuffle,
  FileText,
  Trophy,
  Lightbulb,
  Download,
  Settings,
  SlidersHorizontal,
  Plus,
  X,
  Unlock,
  UserPlus,
  Mail,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageSquare,
  RefreshCw,
  BookOpen,
  Calculator,
  Building2,
  Factory,
  Code2
} from "lucide-react";
import { AICandidateSearch } from "@/components/AICandidateSearch";
import { FilterSidebar } from "@/components/FilterSidebar";
import { CandidateGridView } from "@/components/talent-pool/CandidateGridView";
import { CandidateTableView } from "@/components/talent-pool/CandidateTableView";
import { CandidateCountProgress } from "@/components/talent-pool/CandidateCountProgress";
import { CandidatePreviewModal } from "@/components/CandidatePreviewModal";
import { ExpandedCandidateModal } from "@/components/ExpandedCandidateModal";
import { useTalentPoolState } from "@/hooks/useTalentPoolState";
import { candidatesData } from "@/data/candidatesData";
import { CircularProgress } from "@/components/ui/circular-progress";

const TalentPool = () => {
  const {
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    scoreVisibility,
    setScoreVisibility,
    favorites,
    setFavorites,
    unlockedCandidates,
    setUnlockedCandidates,
    selectedCandidate,
    setSelectedCandidate,
    showCandidateModal,
    setShowCandidateModal,
    isRevealed,
    setIsRevealed
  } = useTalentPoolState();

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewCandidate, setPreviewCandidate] = useState(null);
  const [showExpandedModal, setShowExpandedModal] = useState(false);
  const [expandedCandidate, setExpandedCandidate] = useState(null);

  const filteredCandidates = useMemo(() => {
    return candidatesData.filter(candidate => {
      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(candidate.location)) {
        return false;
      }
      
      // Experience filter
      if (filters.experience.length > 0 && !filters.experience.includes(candidate.experience)) {
        return false;
      }
      
      // Industry filter
      if (filters.industry.length > 0) {
        const hasMatchingIndustry = candidate.industryExperience.some(industry => 
          filters.industry.includes(industry)
        );
        if (!hasMatchingIndustry) return false;
      }
      
      // Skills filter
      if (filters.skills.length > 0) {
        const candidateSkills = [
          ...candidate.financeSubfields,
          ...candidate.softwareTools,
          ...candidate.certifications
        ];
        const hasMatchingSkill = filters.skills.some(skill => 
          candidateSkills.includes(skill)
        );
        if (!hasMatchingSkill) return false;
      }
      
      // Salary filter
      if (filters.salaryRange.length === 2) {
        const [min, max] = filters.salaryRange;
        const candidateSalary = parseInt(candidate.salaryExpectation.replace(/[^0-9]/g, ''));
        if (candidateSalary < min * 1000 || candidateSalary > max * 1000) {
          return false;
        }
      }
      
      return true;
    });
  }, [filters]);

  const sortedCandidates = useMemo(() => {
    const candidates = [...filteredCandidates];
    
    switch (sortBy) {
      case 'score':
        return candidates.sort((a, b) => b.score - a.score);
      case 'experience':
        return candidates.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
      case 'name':
        return candidates.sort((a, b) => a.name.localeCompare(b.name));
      case 'recent':
        return candidates.sort((a, b) => new Date(b.profileAdded).getTime() - new Date(a.profileAdded).getTime());
      default:
        return candidates;
    }
  }, [filteredCandidates, sortBy]);

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
        toast.success("Removed from favorites");
      } else {
        newFavorites.add(id);
        toast.success("Added to favorites");
      }
      return newFavorites;
    });
  };

  const handleRevealScores = () => {
    setScoreVisibility(prev => ({ ...prev, isAnimating: true }));
    setIsRevealed(true);
    
    setTimeout(() => {
      setScoreVisibility(prev => ({ 
        ...prev, 
        showScores: true, 
        isAnimating: false 
      }));
      toast.success("Match scores revealed! 🎉");
    }, 500);
  };

  const handleUnlock = (candidate: any) => {
    setUnlockedCandidates(prev => new Set(prev).add(candidate.id));
    toast.success(`${candidate.name}'s profile unlocked!`);
  };

  const handleViewProfile = (candidate: any) => {
    setExpandedCandidate(candidate);
    setShowExpandedModal(true);
  };

  const handleInviteToApply = (candidate: any) => {
    toast.success(`Invitation sent to ${candidate.name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Filter Sidebar - Simplified props */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <h3 className="font-semibold mb-4">Filters</h3>
          {/* Simplified filter sidebar content */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
                <p className="text-gray-600 mt-1">Discover and connect with top finance professionals</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant={isRevealed ? "default" : "outline"}
                  onClick={handleRevealScores}
                  disabled={isRevealed}
                  className={isRevealed ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {isRevealed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Scores Revealed
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Reveal Match Scores
                    </>
                  )}
                </Button>
                
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-white shadow-sm' : ''}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className={viewMode === 'table' ? 'bg-white shadow-sm' : ''}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Search and Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                {/* Simplified AI Search */}
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">AI Candidate Search</h3>
                  <p className="text-sm text-gray-600">Search for candidates using natural language</p>
                </div>
              </div>
              <div>
                {/* Simplified Progress */}
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Candidates Found</h3>
                  <p className="text-2xl font-bold">{sortedCandidates.length}</p>
                </div>
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Match Score</SelectItem>
                    <SelectItem value="experience">Experience Level</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="recent">Recently Added</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {sortedCandidates.length} of {candidatesData.length} candidates
              </div>
            </div>
          </div>

          {/* Candidates Display */}
          {viewMode === 'grid' ? (
            <CandidateGridView
              sortedCandidates={sortedCandidates}
              isRevealed={isRevealed}
              scoreVisibility={scoreVisibility}
              favorites={favorites}
              unlockedCandidates={unlockedCandidates}
              onToggleFavorite={handleToggleFavorite}
              onUnlock={handleUnlock}
              onViewProfile={handleViewProfile}
              onInviteToApply={handleInviteToApply}
            />
          ) : (
            <CandidateTableView
              sortedCandidates={sortedCandidates}
              isRevealed={isRevealed}
              scoreVisibility={scoreVisibility}
              favorites={favorites}
              unlockedCandidates={unlockedCandidates}
              onToggleFavorite={handleToggleFavorite}
              onUnlock={handleUnlock}
              onViewProfile={handleViewProfile}
              onInviteToApply={handleInviteToApply}
            />
          )}
        </div>
      </div>

      {/* Expanded Candidate Modal */}
      <ExpandedCandidateModal
        candidate={expandedCandidate}
        isOpen={showExpandedModal}
        onClose={() => setShowExpandedModal(false)}
        isFavorite={expandedCandidate ? favorites.has(expandedCandidate.id) : false}
        onToggleFavorite={() => expandedCandidate && handleToggleFavorite(expandedCandidate.id)}
        onUnlock={handleUnlock}
        onInviteToApply={handleInviteToApply}
        isUnlocked={expandedCandidate ? unlockedCandidates.has(expandedCandidate.id) : false}
      />
    </div>
  );
};

export default TalentPool;
