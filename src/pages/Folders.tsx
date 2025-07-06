
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Folder, Plus, ArrowLeft, X, UserPlus, MapPin, Briefcase, Star } from 'lucide-react';
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
                <Folder className="w-6 h-6 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedFolder.name}</h1>
                  <p className="text-gray-600">{selectedFolder.candidates.length} candidates</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleAddCandidate} className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add Candidate
            </Button>
          </div>

          {/* Candidates Grid */}
          {selectedFolder.candidates.length === 0 ? (
            <Card className="p-8">
              <div className="text-center">
                <Folder className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates in this folder</h3>
                <p className="text-gray-600 mb-4">Add candidates to this folder to organize your talent pool</p>
                <Button onClick={handleAddCandidate}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add First Candidate
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedFolder.candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
                          <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCandidate(candidate.id)}
                        className="text-gray-400 hover:text-red-500 shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
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
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{candidate.score}%</span>
                        <span className="text-sm text-gray-600">match</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {candidate.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {candidate.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{candidate.tags.length - 2}
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
              <h1 className="text-3xl font-bold text-gray-900">Folders</h1>
              <p className="text-gray-600">Organize your candidates into folders</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleAddCandidateFromList}
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Candidates
              </Button>
              <FolderManagementButton>
                <Plus className="w-4 h-4 mr-2" />
                Manage Folders
              </FolderManagementButton>
            </div>
          </div>

          {/* Folders List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <Card 
                key={folder.id} 
                className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-200"
                onClick={() => handleFolderClick(folder)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Folder className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{folder.name}</h3>
                        <p className="text-sm text-gray-600">{folder.count} candidates</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-50">
                      {folder.count}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {folders.length === 0 && (
            <Card className="p-8">
              <div className="text-center">
                <Folder className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No folders created yet</h3>
                <p className="text-gray-600 mb-4">Create folders to organize your candidates</p>
                <FolderManagementButton>
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
