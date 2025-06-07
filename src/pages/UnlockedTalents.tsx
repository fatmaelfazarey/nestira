
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Star, MapPin, Briefcase, Calendar, DollarSign, Grid2X2, LayoutList, Download, Mail, Phone, CheckCircle } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';

const UnlockedTalents = () => {
  const [currentView, setCurrentView] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());

  // Mock data for unlocked candidates - in a real app this would come from your state management
  const unlockedCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      country: "AE",
      experience: "8 years",
      score: 92,
      status: "Available",
      tags: ["CPA", "Excel Expert", "Financial Analysis"],
      industryExperience: ["Banking", "FMCG", "Tech"],
      financeSubfields: ["Financial Planning", "Budget Management", "Cost Analysis"],
      softwareTools: ["SAP", "Oracle", "QuickBooks", "Tableau"],
      certifications: ["CPA", "CFA Level 2", "FRM"],
      photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
      phone: "+971 50 123 4567",
      yearsOfExperience: 8,
      education: "MBA Finance, American University of Dubai",
      summary: "Experienced finance professional with 8+ years in financial planning, analysis, and team leadership.",
      profileAdded: "2024-01-15",
      salaryExpectation: "120,000 - 150,000 AED",
      unlockedDate: "2024-01-20"
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      title: "Accounting Manager",
      location: "Riyadh, Saudi Arabia",
      country: "SA",
      experience: "6 years",
      score: 90,
      status: "Shortlisted",
      tags: ["SAP", "IFRS", "Team Leadership"],
      industryExperience: ["Real Estate", "Retail"],
      financeSubfields: ["Management Accounting", "IFRS Compliance", "Team Leadership"],
      softwareTools: ["SAP", "Microsoft Dynamics", "Excel Advanced"],
      certifications: ["ACCA", "IFRS Certificate"],
      photo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face",
      email: "fatima.alzahra@email.com",
      phone: "+966 50 123 4567",
      yearsOfExperience: 6,
      education: "Master's in Accounting, King Saud University",
      summary: "Strategic accounting manager with expertise in SAP implementation and IFRS compliance.",
      profileAdded: "2024-03-10",
      salaryExpectation: "180,000 - 220,000 SAR",
      unlockedDate: "2024-03-15"
    }
  ];

  const getCountryFlag = (countryCode) => {
    const flags = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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

  const handleExportProfiles = () => {
    // Mock export functionality
    console.log('Exporting unlocked profiles...');
  };

  const renderGridView = () => (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unlockedCandidates.map(candidate => (
          <Card key={candidate.id} className="hover:shadow-lg transition-all duration-300 border-green-200 bg-green-50/30">
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleFavorite(candidate.id)} 
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

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {candidate.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Contact Information</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <a href={`mailto:${candidate.email}`} className="hover:text-accent">
                      {candidate.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3" />
                    <a href={`tel:${candidate.phone}`} className="hover:text-accent">
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
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  View Full Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );

  const renderTableView = () => (
    <TooltipProvider>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Unlocked Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unlockedCandidates.map(candidate => (
              <TableRow key={candidate.id} className="bg-green-50/30">
                <TableCell>
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
                    </div>
                  </div>
                </TableCell>
                <TableCell>{candidate.title}</TableCell>
                <TableCell>{candidate.location}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
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
                  <div className="space-y-1">
                    <div className="text-sm">
                      <a href={`mailto:${candidate.email}`} className="hover:text-accent">
                        {candidate.email}
                      </a>
                    </div>
                    <div className="text-sm">
                      <a href={`tel:${candidate.phone}`} className="hover:text-accent">
                        {candidate.phone}
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{formatDate(candidate.unlockedDate)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleFavorite(candidate.id)} 
                      className="text-yellow-500 hover:text-yellow-600 p-1"
                    >
                      <Star className={`w-4 h-4 ${favorites.has(candidate.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </TooltipProvider>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              Unlocked Talents
              <CheckCircle className="w-8 h-8 text-green-500" />
            </h1>
            <p className="text-gray-600">Manage all your unlocked candidate profiles</p>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="text-green-800 font-semibold text-lg">{unlockedCandidates.length}</span>
                <span className="text-green-600 text-sm ml-1">Unlocked Profiles</span>
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

            {/* Export Button */}
            <Button 
              onClick={handleExportProfiles}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-bold border-0 shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Export Profiles
            </Button>
          </div>
        </div>

        {unlockedCandidates.length > 0 ? (
          currentView === 'grid' ? renderGridView() : renderTableView()
        ) : (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No unlocked talents yet.</p>
            <p className="text-gray-400">Start unlocking candidates from the Talent Pool to see them here.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UnlockedTalents;
