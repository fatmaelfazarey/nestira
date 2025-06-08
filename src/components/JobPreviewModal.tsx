
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Users, DollarSign, Award, Globe } from 'lucide-react';

interface JobPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobData: {
    title: string;
    function: string;
    level: string;
    industry: string;
    location: string;
    experience: string;
    skills: string[];
    certifications: string[];
    employmentType: string;
    workMode: string;
    description: string;
    salary: string;
    languages: string[];
    visaStatus: string[];
  };
}

export function JobPreviewModal({ open, onOpenChange, jobData }: JobPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{jobData.title || 'Job Preview'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Header Section */}
          <div className="flex flex-wrap gap-3">
            {jobData.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{jobData.location}</span>
              </div>
            )}
            {jobData.employmentType && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{jobData.employmentType}</span>
              </div>
            )}
            {jobData.workMode && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{jobData.workMode}</span>
              </div>
            )}
            {jobData.salary && (
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>{jobData.salary}</span>
              </div>
            )}
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobData.function && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Job Function</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{jobData.function}</p>
                </CardContent>
              </Card>
            )}

            {jobData.level && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Career Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{jobData.level}</p>
                </CardContent>
              </Card>
            )}

            {jobData.industry && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Industry</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{jobData.industry}</p>
                </CardContent>
              </Card>
            )}

            {jobData.experience && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Experience Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">{jobData.experience}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Skills & Requirements */}
          {(jobData.skills.length > 0 || jobData.certifications.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Skills & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobData.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {jobData.certifications.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Preferred Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobData.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Languages & Visa Status */}
          {(jobData.languages.length > 0 || jobData.visaStatus.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Language & Visa Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobData.languages.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobData.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {jobData.visaStatus.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Accepted Visa Status</h4>
                    <div className="flex flex-wrap gap-2">
                      {jobData.visaStatus.map((status, index) => (
                        <Badge key={index} variant="outline">{status}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Job Description */}
          {jobData.description && (
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{jobData.description}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-accent hover:bg-accent/90">
            Continue Editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
