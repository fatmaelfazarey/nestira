import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Briefcase, Calendar, DollarSign, Eye, Download, X } from 'lucide-react';
import { useState } from 'react';

interface Candidate {
  id: number;
  name: string;
  title: string;
  location: string;
  country: string;
  experience: string;
  score: number;
  status: string;
  tags: string[];
  industryExperience: string[];
  financeSubfields: string[];
  softwareTools: string[];
  certifications: string[];
  photo: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  education: string;
  summary: string;
  profileAdded: string;
  salaryExpectation: string;
}

interface ExpandedCandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ExpandedCandidateModal = ({ candidate, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  if (!candidate) return null;

  const getCountryFlag = (countryCode) => {
    const flags = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦',
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex h-full">
          {/* Left Side - Photo */}
          <div className="w-1/3 bg-gray-50 flex items-center justify-center p-8">
            <Avatar className="w-48 h-48">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback className="text-4xl">{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Right Side - Information */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                    <span className="text-2xl">{getCountryFlag(candidate.country)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onToggleFavorite}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <p className="text-lg text-gray-600 mt-1">{candidate.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience} experience
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {candidate.salaryExpectation}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Separator />

              {/* Cover Letter - Moved to top */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start border-[#ff5f1b] text-[#ff5f1b] hover:bg-[#ff5f1b] hover:text-white"
                  onClick={() => setShowCoverLetter(!showCoverLetter)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Cover Letter
                </Button>
                {showCoverLetter && (
                  <div className="bg-gray-50 p-3 rounded-lg text-xs leading-relaxed">
                    Dear Hiring Manager,<br/><br/>
                    I am writing to express my strong interest in the Senior Finance Manager position. With over 8 years of progressive experience...
                  </div>
                )}
              </div>

              <Separator />

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> {candidate.email}</p>
                  <p><span className="font-medium">Phone:</span> {candidate.phone}</p>
                </div>
              </div>

              <Separator />

              {/* Professional Summary */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Professional Summary</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{candidate.summary}</p>
              </div>

              <Separator />

              {/* Experience & Education */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Experience</h4>
                  <p className="text-sm text-gray-700">{candidate.yearsOfExperience} years</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Education</h4>
                  <p className="text-sm text-gray-700">{candidate.education}</p>
                </div>
              </div>

              <Separator />

              {/* Download CV - Updated */}
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
