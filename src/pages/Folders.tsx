
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Folder, Plus, ArrowLeft, X, UserPlus, MapPin, Briefcase, Star, Users } from 'lucide-react';
import { FolderManagementButton } from '@/components/FolderManagementButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data for folders and their candidates
const mockFoldersData = [
  { 
    id: '1', 
    name: 'Logistics coordinator', 
    count: 3,
    candidates: [
      {
        id: 1,
        name: "Sarah Johnson",
        title: "Senior Logistics Coordinator",
        location: "New York, NY",
        experience: "5 years",
        score: 92,
        avatar: "/placeholder.svg",
        tags: ["Supply Chain", "Inventory Management", "SAP"]
      },
      {
        id: 2,
        name: "Mike Chen",
        title: "Logistics Manager",
        location: "Los Angeles, CA",
        experience: "7 years",
        score: 88,
        avatar: "/placeholder.svg",
        tags: ["Transportation", "Warehouse Operations", "Lean Six Sigma"]
      },
      {
        id: 3,
        name: "Emma Davis",
        title: "Supply Chain Analyst",
        location: "Chicago, IL",
        experience: "3 years",
        score: 85,
        avatar: "/placeholder.svg",
        tags: ["Data Analysis", "Forecasting", "Excel"]
      }
    ]
  },
  { 
    id: '2', 
    name: 'Finance Managers', 
    count: 2,
    candidates: [
      {
        id: 4,
        name: "David Wilson",
        title: "Finance Manager",
        location: "Boston, MA",
        experience: "8 years",
        score: 94,
        avatar: "/placeholder.svg",
        tags: ["Financial Planning", "Budget Management", "SAP"]
      },
      {
        id: 5,
        name: "Lisa Anderson",
        title: "Senior Finance Manager",
        location: "Seattle, WA",
        experience: "10 years",
        score: 96,
        avatar: "/placeholder.svg",
        tags: ["Financial Analysis", "Reporting", "Team Leadership"]
      }
    ]
  },
  { 
    id: '3', 
    name: 'Senior Analysts', 
    count: 4,
    candidates: [
      {
        id: 6,
        name: "John Smith",
        title: "Senior Financial Analyst",
        location: "Miami, FL",
        experience: "6 years",
        score: 90,
        avatar: "/placeholder.svg",
        tags: ["Financial Modeling", "Valuation", "Excel"]
      },
      {
        id: 7,
        name: "Rachel Green",
        title: "Senior Business Analyst",
        location: "Denver, CO",
        experience: "5 years",
        score: 87,
        avatar: "/placeholder.svg",
        tags: ["Process Improvement", "Data Analysis", "SQL"]
      },
      {
        id: 8,
        name: "Tom Brown",
        title: "Senior Data Analyst",
        location: "Austin, TX",
        experience: "4 years",
        score: 89,
        avatar: "/placeholder.svg",
        tags: ["Python", "Machine Learning", "Tableau"]
      },
      {
        id: 9,
        name: "Amy White",
        title: "Senior Market Analyst",
        location: "Portland, OR",
        experience: "7 years",
        score: 91,
        avatar: "/placeholder.svg",
        tags: ["Market Research", "Competitive Analysis", "PowerBI"]
      }
    ]
  },
  { 
    id: '4', 
    name: 'Remote Candidates', 
    count: 5,
    candidates: [
      {
        id: 10,
        name: "Alex Johnson",
        title: "Remote Finance Specialist",
        location: "Remote",
        experience: "4 years",
        score: 86,
        avatar: "/placeholder.svg",
        tags: ["Remote Work", "Financial Planning", "Quickbooks"]
      },
      {
        id: 11,
        name: "Maria Garcia",
        title: "Remote Accountant",
        location: "Remote",
        experience: "6 years",
        score: 88,
        avatar: "/placeholder.svg",
        tags: ["Accounting", "Tax Preparation", "Remote Collaboration"]
      },
      {
        id: 12,
        name: "Chris Lee",
        title: "Remote Data Analyst",
        location: "Remote",
        experience: "3 years",
        score: 84,
        avatar: "/placeholder.svg",
        tags: ["Data Analysis", "R", "Statistical Modeling"]
      },
      {
        id: 13,
        name: "Jessica Taylor",
        title: "Remote Project Manager",
        location: "Remote",
        experience: "8 years",
        score: 92,
        avatar: "/placeholder.svg",
        tags: ["Project Management", "Agile", "Team Leadership"]
      },
      {
        id: 14,
        name: "Kevin Miller",
        title: "Remote Business Analyst",
        location: "Remote",
        experience: "5 years",
        score: 89,
        avatar: "/placeholder.svg",
        tags: ["Requirements Analysis", "Process Mapping", "Stakeholder Management"]
      }
    ]
  },
  { 
    id: '5', 
    name: 'High Priority', 
    count: 2,
    candidates: [
      {
        id: 15,
        name: "Robert Kim",
        title: "VP of Finance",
        location: "San Francisco, CA",
        experience: "12 years",
        score: 98,
        avatar: "/placeholder.svg",
        tags: ["Executive Leadership", "Strategic Planning", "M&A"]
      },
      {
        id: 16,
        name: "Jennifer Liu",
        title: "Chief Financial Officer",
        location: "New York, NY",
        experience: "15 years",
        score: 99,
        avatar: "/placeholder.svg",
        tags: ["C-Level", "Financial Strategy", "Public Companies"]
      }
    ]
  }
];

const Folders = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [folders, setFolders] = useState(mockFoldersData);
  const navigate = useNavigate();

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  const handleRemoveCandidate = (candidateId) => {
    if (!selectedFolder) return;
    
    const updatedFolders = folders.map(folder => {
      if (folder.id === selectedFolder.id) {
        const updatedCandidates = folder.candidates.filter(c => c.id !== candidateId);
        const updatedFolder = {
          ...folder,
          candidates: updatedCandidates,
          count: updatedCandidates.length
        };
        setSelectedFolder(updatedFolder);
        return updatedFolder;
      }
      return folder;
    });
    
    setFolders(updatedFolders);
    toast.success('Candidate removed from folder');
  };

  const handleAddCandidate = () => {
    // Navigate to talent pool with folder context
    navigate('/talent-pool', { state: { fromFolder: selectedFolder?.name } });
    toast.info(`Redirecting to Talent Pool to add candidates to "${selectedFolder?.name}"`);
  };

  const handleAddCandidateFromList = () => {
    navigate('/talent-pool');
    toast.info('Redirecting to Talent Pool to add candidates');
  };

  if (selectedFolder) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={handleBackToFolders}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Folders
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                  <Folder className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedFolder.name}</h1>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {selectedFolder.candidates.length} candidates
                  </p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleAddCandidate} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <UserPlus className="w-4 h-4" />
              Add Candidate
            </Button>
          </div>

          {/* Candidates Grid */}
          {selectedFolder.candidates.length === 0 ? (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-white border-dashed border-2">
              <div className="max-w-sm mx-auto">
                <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                  <Folder className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates yet</h3>
                <p className="text-gray-600 mb-6">Start building your talent pool by adding candidates to this folder</p>
                <Button onClick={handleAddCandidate} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add First Candidate
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedFolder.candidates.map((candidate) => (
                <Card key={candidate.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50 hover:from-blue-50/30 hover:to-indigo-50/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="w-14 h-14 ring-2 ring-white shadow-lg">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-200 text-blue-700 font-semibold text-lg">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-900 truncate text-lg">{candidate.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCandidate(candidate.id)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Briefcase className="w-3 h-3" />
                        <span>{candidate.experience}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-600 fill-current" />
                          <span className="font-semibold text-yellow-700 text-sm">{candidate.score}%</span>
                        </div>
                        <span className="text-xs text-gray-500">match</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {candidate.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-0">
                          {tag}
                        </Badge>
                      ))}
                      {candidate.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs border-dashed bg-white/50">
                          +{candidate.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Folders Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Folders
              </h1>
              <p className="text-gray-600 mt-1">Organize and manage your talent pipeline</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleAddCandidateFromList}
                className="flex items-center gap-2 border-2 hover:bg-gray-50"
              >
                <UserPlus className="w-4 h-4" />
                Browse Candidates
              </Button>
              <FolderManagementButton className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                Manage Folders
              </FolderManagementButton>
            </div>
          </div>

          {/* Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <Card 
                key={folder.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50/80 hover:from-blue-50/50 hover:to-indigo-50/50 hover:scale-105"
                onClick={() => handleFolderClick(folder)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-300 transition-all duration-300">
                        <Folder className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-0 font-semibold px-3 py-1"
                      >
                        {folder.count}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-900 transition-colors">
                        {folder.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {folder.count} {folder.count === 1 ? 'candidate' : 'candidates'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {folders.length === 0 && (
            <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-white border-dashed border-2">
              <div className="max-w-sm mx-auto">
                <div className="p-4 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                  <Folder className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No folders yet</h3>
                <p className="text-gray-600 mb-6">Create your first folder to start organizing candidates</p>
                <FolderManagementButton className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Folder
                </FolderManagementButton>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Folders;
