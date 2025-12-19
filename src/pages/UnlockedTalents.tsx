
// UnlockedTalents.tsx
import { useState, useEffect } from 'react';
// import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Star, MapPin, Briefcase, Calendar, DollarSign, Grid2X2, LayoutList, Download, Mail, Phone, CheckCircle, Eye, FileText, Users, MessageSquare } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { IP } from '@/store/Path';
import { toast } from 'sonner';
import ProfileModal from '@/components/talent-pool/ProfileModal';
import ChatPopup from '@/components/Chat/ChatPopup';
import { useAuth } from '@/contexts/AuthContext';

// Utility functions
const getCountryFlag = (countryCode: string) => {
  const flags: { [key: string]: string } = {
    'EG': '🇪🇬',
    'PK': '🇵🇰',
    'AE': '🇦🇪',
    'SA': '🇸🇦',
    'US': '🇺🇸'
  };
  return flags[countryCode] || '';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculateMatchingScore = (candidate: any) => {
  let score = 0;

  // Score based on profile completion
  if (candidate.profileCompletion === 100) score += 30;
  else if (candidate.profileCompletion >= 80) score += 20;
  else if (candidate.profileCompletion >= 60) score += 10;

  // Score based on experience
  if (candidate.experience && candidate.experience.length > 0) score += 25;

  // Score based on education
  if (candidate.education && candidate.education.length > 0) score += 20;

  // Score based on skills
  if (candidate.skills) {
    const totalSkills = [
      ...(candidate.skills.software || []),
      ...(candidate.skills.technical || []),
      ...(candidate.skills.certifications || [])
    ].length;
    score += Math.min(totalSkills * 2, 25);
  }

  return Math.min(score, 100);
};

const formatSalaryRange = (salaryRange: any) => {
  if (!salaryRange) return 'Not specified';

  const { min, max, currency } = salaryRange;
  if (min === 0 && max === 0) return 'Not specified';

  return `${min} - ${max} ${currency}`;
};

const handleDownloadCV = (candidate: any) => {
  if (candidate.cvData) {
    try {
      const url = `${IP}/${candidate.cvData}`;

      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const fileName = `CV_${candidate.name || 'candidate'}.pdf`;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Download started');
    } catch (error) {
      console.error('Error downloading CV:', error);
      toast.error('Failed to download CV');
    }
  } else {
    toast.warning('No CV available for this candidate');
  }
};

const UnlockedTalents = () => {
  const [currentView, setCurrentView] = useState<'grid' | 'table'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [unlockedCandidates, setUnlockedCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const { unlockedCandidatesBackend } = useEmployerStore();
  const { currentUser } = useAuth();

  // Transform candidate data to match the component's expected structure
  const transformCandidateData = (candidate: any) => {
    console.log(' candidate ', candidate)
    const location = candidate.basicInfo?.location || 'Unknown Location';
    const country = location.split(',')?.[1]?.trim() || 'EG';

    return {
      id: candidate.uid,
      name: candidate.basicInfo?.fullName || 'Unknown Candidate',
      title: candidate.basicInfo?.role || candidate.preferences?.jobTitles?.[0] || 'No Title',
      location: location,
      country: country,
      experience: candidate.experience?.[0]?.title || 'No Experience',
      score: calculateMatchingScore(candidate),
      status: 'Available',
      industryExperience: candidate.industry?.industries || [],
      financeSubfields: candidate.industry?.subfields || [],
      softwareTools: candidate.skills?.software || [],
      certifications: candidate.skills?.certifications || [],
      email: candidate.basicInfo?.email || candidate.email,
      phone: candidate.basicInfo?.phone || 'No Phone',
      photo: candidate.basicInfo?.profilePhoto || candidate.profilePhoto,
      unlockedDate: candidate.unlockedDate || new Date().toISOString(),
      salaryExpectation: formatSalaryRange(candidate.preferences?.salaryRange),
      cvData: candidate.cvData,
      cvUrl: candidate.cvUrl,
      rawData: candidate,
      videoUrl: candidate.video.videoUrl
    };
  };

  // Load unlocked candidates
  useEffect(() => {
    const fetchUnlockedCandidates = async () => {
      try {
        const response = await unlockedCandidatesBackend();

        if (response.data && Array.isArray(response.data)) {
          const transformedCandidates = response.data.map(transformCandidateData);
          setUnlockedCandidates(transformedCandidates);
        } else {
          setUnlockedCandidates([]);
        }
      } catch (error) {
        console.error('Error fetching unlocked candidates:', error);
        setUnlockedCandidates([]);
      }
    };

    fetchUnlockedCandidates();
  }, []);

  // const toggleFavorite = (candidateId: string) => {
  //   const newFavorites = new Set(favorites);
  //   if (newFavorites.has(candidateId)) {
  //     newFavorites.delete(candidateId);
  //   } else {
  //     newFavorites.add(candidateId);
  //   }
  //   setFavorites(newFavorites);
  // };

  const handleViewProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleStartChat = (candidate: any) => {
    setSelectedCandidate(candidate);
    setShowChatPopup(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    // setSelectedCandidate(null);
  };

  const handleCloseChatPopup = () => {
    setShowChatPopup(false);
    setSelectedCandidate(null);
  };

  // Grid View Component
  const renderGridView = () => (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unlockedCandidates.map(candidate => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onViewProfile={handleViewProfile}
            onDownloadCV={handleDownloadCV}
            // onToggleFavorite={toggleFavorite}
            onStartChat={handleStartChat}
          // isFavorite={favorites.has(candidate.id)}
          />
        ))}
      </div>
    </TooltipProvider>
  );

  // Table View Component
  const renderTableView = () => (
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
                  <TableHead className="min-w-[80px]">Score</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Industry</TableHead>
                  <TableHead className="min-w-[120px]">Subfields</TableHead>
                  <TableHead className="min-w-[100px]">CV</TableHead>
                  <TableHead className="min-w-[100px]">Unlocked Date</TableHead>
                  <TableHead className="min-w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unlockedCandidates.map(candidate => (
                  <CandidateTableRow
                    key={candidate.id}
                    candidate={candidate}
                    onViewProfile={handleViewProfile}
                    onDownloadCV={handleDownloadCV}
                    // onToggleFavorite={toggleFavorite}
                    onStartChat={handleStartChat}
                  // isFavorite={favorites.has(candidate.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );

  return (
    // <DashboardLayout>
    <div>



      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-start flex-col md:flex-row gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-500" />
                <h1 className="text-3xl font-bold text-gray-900">Unlocked Talents</h1>
              </div>
              <p className="text-gray-600">Manage all your unlocked candidate profiles</p>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <span className="text-green-800 font-semibold text-lg">{unlockedCandidates.length}</span>
                  <span className="text-green-600 text-sm ml-1">Unlocked Profiles</span>
                </div>
                <div className="bg-yellow-100 px-4 py-2 rounded-lg">
                  <span className="text-yellow-800 font-semibold text-lg">{favorites.size}</span>
                  <span className="text-yellow-600 text-sm ml-1">Favorites</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Controls */}
              <div className="flex gap-2">
                <Button
                  variant={currentView === 'grid' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('grid')}
                  className="flex items-center gap-2"
                >
                  <Grid2X2 className="w-4 h-4" />
                  Grid
                </Button>
                <Button
                  variant={currentView === 'table' ? 'default' : 'outline'}
                  onClick={() => setCurrentView('table')}
                  className="flex items-center gap-2"
                >
                  <LayoutList className="w-4 h-4" />
                  Table
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          {unlockedCandidates.length > 0 ? (
            currentView === 'grid' ? renderGridView() : renderTableView()
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        candidate={selectedCandidate}
        isOpen={showProfileModal}
        onClose={handleCloseProfileModal}
        onStartChat={handleStartChat}
      />

      {/* Chat Popup */}
      {selectedCandidate && currentUser && (

        <ChatPopup
          currentUserId={currentUser.uid}
          otherUserId={selectedCandidate.id}
          otherUserName={selectedCandidate.name}
          otherUserTitle={selectedCandidate.title}
          isOpen={showChatPopup}
          onClose={handleCloseChatPopup}
        />
      )}
    </div>
    // </DashboardLayout>
  );
};

// Candidate Card Component
const CandidateCard = ({
  candidate,
  onViewProfile,
  onDownloadCV,
  onStartChat
}: {
  candidate: any;
  onViewProfile: (candidate: any) => void;
  onDownloadCV: (candidate: any) => void;

  onStartChat: (candidate: any) => void;

}) => (
  <Card className="hover:shadow-lg transition-all duration-300 border-green-200 bg-green-50/30 h-full">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CheckCircle className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <span>{candidate.name}</span>
              <span className="text-lg">{getCountryFlag(candidate.country)}</span>
            </CardTitle>
            <p className="text-sm text-gray-600">{candidate.title}</p>
            <p className="text-xs text-green-600 font-medium">
              Unlocked: {formatDate(candidate.unlockedDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <CircularProgress value={candidate.score} size={60} strokeWidth={4} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Matching Score: {candidate.score}%</p>
            </TooltipContent>
          </Tooltip>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(candidate.id)}
            className="text-yellow-500 hover:text-yellow-600 p-1"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button> */}
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
        {candidate.experience}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <DollarSign className="w-4 h-4" />
        {candidate.salaryExpectation}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Industry:</p>
          <div className="flex flex-wrap gap-1">
            {candidate.industryExperience?.slice(0, 3).map((industry: string) => (
              <Badge key={industry} variant="outline" className="text-xs">
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Subfields:</p>
          <div className="flex flex-wrap gap-1">
            {candidate.financeSubfields?.slice(0, 3).map((subfield: string) => (
              <Badge key={subfield} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                {subfield}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-gray-700 whitespace-nowrap">Tools:</p>
          <div className="flex flex-wrap gap-1">
            {candidate.softwareTools?.slice(0, 3).map((tool: string) => (
              <Badge key={tool} variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700">Contact Information</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-3 h-3" />
            <a href={`mailto:${candidate.email}`} className="hover:text-orange-600 truncate">
              {candidate.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-3 h-3" />
            <a href={`tel:${candidate.phone}`} className="hover:text-orange-600">
              {candidate.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2">
        <Badge
          variant={candidate.status === 'Available' ? 'default' : 'secondary'}
          className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
        >
          {candidate.status}
        </Badge>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDownloadCV(candidate)}
            disabled={!candidate.cvData}
          >
            <FileText className="w-3 h-3 mr-1" />
            CV
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStartChat(candidate)}
            className="flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" />
            Chat
          </Button>
          <Button
            size="sm"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => onViewProfile(candidate)}
          >
            <Eye className="w-3 h-3 mr-1" />
            View
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Candidate Table Row Component
const CandidateTableRow = ({
  candidate,
  onViewProfile,
  onDownloadCV,
  onStartChat

}: {
  candidate: any;
  onViewProfile: (candidate: any) => void;
  onDownloadCV: (candidate: any) => void;
  onStartChat: (candidate: any) => void;
}) => (
  <TableRow className="bg-green-50/30">
    <TableCell className="min-w-[150px]">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-8 h-8">
            <AvatarImage src={candidate.photo} alt={candidate.name} />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CheckCircle className="w-3 h-3 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
        </div>
        <div>
          <div className="font-medium flex items-center gap-2">
            {candidate.name}
            <span>{getCountryFlag(candidate.country)}</span>
          </div>
          <div className="text-sm text-gray-600">{candidate.title}</div>
        </div>
      </div>
    </TableCell>
    <TableCell>{candidate.title}</TableCell>
    <TableCell>{candidate.location}</TableCell>
    <TableCell>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <CircularProgress value={candidate.score} size={40} strokeWidth={3} showPercentage={true} compact={true} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Matching Score: {candidate.score}%</p>
        </TooltipContent>
      </Tooltip>
    </TableCell>
    <TableCell>
      <Badge
        variant={candidate.status === 'Available' ? 'default' : 'secondary'}
        className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
      >
        {candidate.status}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex flex-wrap gap-1">
        {candidate.industryExperience?.slice(0, 2).map((industry: string) => (
          <Badge key={industry} variant="outline" className="text-xs">
            {industry}
          </Badge>
        ))}
        {candidate.industryExperience?.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{candidate.industryExperience.length - 2}
          </Badge>
        )}
      </div>
    </TableCell>
    <TableCell>
      <div className="flex flex-wrap gap-1">
        {candidate.financeSubfields?.slice(0, 2).map((subfield: string) => (
          <Badge key={subfield} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
            {subfield}
          </Badge>
        ))}
        {candidate.financeSubfields?.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{candidate.financeSubfields.length - 2}
          </Badge>
        )}
      </div>
    </TableCell>
    <TableCell>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDownloadCV(candidate)}
        disabled={!candidate.cvData}
        className="flex items-center gap-1"
      >
        <FileText className="w-3 h-3" />
        CV
      </Button>
    </TableCell>
    <TableCell className="text-sm">{formatDate(candidate.unlockedDate)}</TableCell>
    <TableCell>
      <div className="flex gap-2">
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleFavorite(candidate.id)}
          className="text-yellow-500 hover:text-yellow-600 p-1"
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button> */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => onStartChat(candidate)}
          className="flex items-center gap-1"
        >
          <MessageSquare className="w-3 h-3" />
          Chat
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onViewProfile(candidate)}
        >
          View
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

// Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <p className="text-gray-500 text-lg">No unlocked talents yet.</p>
    <p className="text-gray-400">Start unlocking candidates from the Talent Pool to see them here.</p>
  </div>
);

export default UnlockedTalents;