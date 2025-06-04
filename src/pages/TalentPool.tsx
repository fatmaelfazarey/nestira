
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Star, MapPin, Briefcase, Unlock, Search, Filter, ChevronDown } from 'lucide-react';
import { CandidateDetailModal } from '@/components/CandidateDetailModal';

const TalentPool = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceRange, setExperienceRange] = useState([0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillsFilter, setSkillsFilter] = useState('all');
  const [scoreRange, setScoreRange] = useState([0]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      experience: "8 years",
      score: 92,
      status: "Available",
      tags: ["CPA", "Excel Expert", "Financial Analysis"],
      photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
      phone: "+971 50 123 4567",
      yearsOfExperience: 8,
      education: "MBA Finance, American University of Dubai",
      summary: "Experienced finance professional with 8+ years in financial planning, analysis, and team leadership. Proven track record in implementing cost-saving initiatives and driving strategic financial decisions in multinational corporations."
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      title: "Financial Analyst",
      location: "Cairo, Egypt",
      experience: "5 years",
      score: 88,
      status: "Interviewing",
      tags: ["Power BI", "SQL", "Risk Management"],
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
      email: "ahmed.hassan@email.com",
      phone: "+20 10 123 4567",
      yearsOfExperience: 5,
      education: "Bachelor's in Finance, Cairo University",
      summary: "Detail-oriented financial analyst specializing in data analysis, risk assessment, and financial modeling. Expert in Power BI and SQL with strong analytical skills."
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      title: "Accounting Manager",
      location: "Riyadh, Saudi Arabia",
      experience: "6 years",
      score: 90,
      status: "Shortlisted",
      tags: ["SAP", "IFRS", "Team Leadership"],
      photo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face",
      email: "fatima.alzahra@email.com",
      phone: "+966 50 123 4567",
      yearsOfExperience: 6,
      education: "Master's in Accounting, King Saud University",
      summary: "Strategic accounting manager with expertise in SAP implementation, IFRS compliance, and team leadership. Successfully managed accounting teams of 15+ members."
    }
  ];

  const allSkills = Array.from(new Set(candidates.flatMap(c => c.tags)));

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === 'all' || candidate.location.includes(locationFilter);
    const matchesExperience = experienceRange[0] === 0 || candidate.yearsOfExperience >= experienceRange[0];
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesSkills = skillsFilter === 'all' || candidate.tags.includes(skillsFilter);
    const matchesScore = scoreRange[0] === 0 || candidate.score >= scoreRange[0];
    
    return matchesSearch && matchesLocation && matchesExperience && matchesStatus && matchesSkills && matchesScore;
  });

  const handleUnlock = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const toggleFavorite = (candidateId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(candidateId)) {
      newFavorites.delete(candidateId);
    } else {
      newFavorites.add(candidateId);
    }
    setFavorites(newFavorites);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
            <p className="text-gray-600">Browse and filter finance professionals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Grid View</Button>
            <Button variant="outline">Table View</Button>
            <Button variant="outline">Kanban</Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Main filters */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Dubai">Dubai, UAE</SelectItem>
                    <SelectItem value="Cairo">Cairo, Egypt</SelectItem>
                    <SelectItem value="Riyadh">Riyadh, Saudi Arabia</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  </SelectContent>
                </Select>

                <Collapsible open={showMoreFilters} onOpenChange={setShowMoreFilters}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                      <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>

              {/* Collapsible additional filters */}
              <Collapsible open={showMoreFilters} onOpenChange={setShowMoreFilters}>
                <CollapsibleContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
                    {/* Experience Slider */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Years of Experience: {experienceRange[0]}+ years
                      </label>
                      <Slider
                        value={experienceRange}
                        onValueChange={setExperienceRange}
                        max={15}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Skills Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Skills</label>
                      <Select value={skillsFilter} onValueChange={setSkillsFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Skills" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Skills</SelectItem>
                          {allSkills.map((skill) => (
                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Matching Score Slider */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Minimum Score: {scoreRange[0]}%
                      </label>
                      <Slider
                        value={scoreRange}
                        onValueChange={setScoreRange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={candidate.photo} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <p className="text-sm text-gray-600">{candidate.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(candidate.id)}
                      className="text-yellow-500 hover:text-yellow-600 p-1"
                    >
                      <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-sm">
                      {candidate.score}
                    </div>
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
                <div className="flex flex-wrap gap-1">
                  {candidate.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Badge 
                    variant={candidate.status === 'Available' ? 'default' : 'secondary'}
                    className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {candidate.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-accent hover:bg-accent/90"
                    onClick={() => handleUnlock(candidate)}
                  >
                    <Unlock className="w-4 h-4 mr-1" />
                    Unlock
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your filters.</p>
          </div>
        )}

        <CandidateDetailModal
          candidate={selectedCandidate}
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          isFavorite={selectedCandidate ? favorites.has(selectedCandidate.id) : false}
          onToggleFavorite={() => selectedCandidate && toggleFavorite(selectedCandidate.id)}
        />
      </div>
    </DashboardLayout>
  );
};

export default TalentPool;
