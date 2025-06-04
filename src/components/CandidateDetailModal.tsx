
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, MapPin, Briefcase, Mail, Phone, Calendar, Download } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  experience: string;
  score: number;
  status: string;
  tags: string[];
  photo: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  education: string;
  summary: string;
}

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CandidateDetailModal({ 
  candidate, 
  isOpen, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}: CandidateDetailModalProps) {
  if (!candidate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Candidate Profile</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFavorite}
              className="text-yellow-500 hover:text-yellow-600"
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={candidate.photo} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.title}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium text-lg">{candidate.score}</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                {candidate.location}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-gray-500" />
                {candidate.experience} experience
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                {candidate.phone}
              </div>
            </div>

            <div>
              <Badge 
                variant={candidate.status === 'Available' ? 'default' : 'secondary'}
                className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
              >
                {candidate.status}
              </Badge>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-3">Professional Summary</h4>
              <p className="text-gray-700 leading-relaxed">{candidate.summary}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Skills & Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Education</h4>
              <p className="text-gray-700">{candidate.education}</p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="bg-accent hover:bg-accent/90">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
