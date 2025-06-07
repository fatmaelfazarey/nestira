
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  avatar?: string;
  skills: string[];
  experience: string;
}

interface QuizAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: any;
  onAssign: (quiz: any, candidateIds: string[]) => void;
}

// Mock unlocked candidates data
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    position: 'Financial Analyst',
    skills: ['Excel', 'Financial Modeling', 'SQL'],
    experience: '3 years'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    position: 'Investment Analyst',
    skills: ['Python', 'R', 'Financial Analysis'],
    experience: '5 years'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    position: 'Risk Analyst',
    skills: ['Risk Management', 'Excel', 'Statistics'],
    experience: '4 years'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@email.com',
    position: 'Portfolio Manager',
    skills: ['Portfolio Management', 'Bloomberg', 'Excel'],
    experience: '7 years'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    position: 'Financial Consultant',
    skills: ['Financial Planning', 'Excel', 'Presentation'],
    experience: '6 years'
  }
];

export function QuizAssignModal({ isOpen, onClose, quiz, onAssign }: QuizAssignModalProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCandidateToggle = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(candidate => candidate.id));
    }
  };

  const handleAssign = () => {
    if (selectedCandidates.length > 0) {
      onAssign(quiz, selectedCandidates);
      setSelectedCandidates([]);
      setSearchTerm('');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Assign Quiz: {quiz?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Search and Select All */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedCandidates.length === filteredCandidates.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>

          {/* Candidates List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No candidates found matching your search.
              </div>
            ) : (
              filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCandidates.includes(candidate.id)
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => handleCandidateToggle(candidate.id)}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => handleCandidateToggle(candidate.id)}
                    />
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{candidate.name}</h3>
                        <span className="text-sm text-gray-500">{candidate.experience}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{candidate.position}</p>
                      <p className="text-xs text-gray-500 mb-2">{candidate.email}</p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-gray-600">
              {selectedCandidates.length} candidate(s) selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleAssign}
                disabled={selectedCandidates.length === 0}
                className="bg-accent hover:bg-accent/90 text-white"
              >
                Assign Quiz ({selectedCandidates.length})
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
