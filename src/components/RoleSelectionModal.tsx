
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap, Plus } from 'lucide-react';

interface RoleSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleSelected: (roleType: 'job' | 'internship') => void;
}

export function RoleSelectionModal({ open, onOpenChange, onRoleSelected }: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole as 'job' | 'internship');
      onOpenChange(false);
    }
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Plus className="w-6 h-6 text-accent" />
            What are you hiring for?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <RadioGroup value={selectedRole} onValueChange={handleRoleChange} className="space-y-4">
            <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'job' ? 'ring-2 ring-accent border-accent' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="job" id="job" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="job" className="cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <span className="text-lg font-semibold">Full-time / Part-time Job</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Post permanent or temporary positions with competitive salaries, benefits, and career growth opportunities.
                      </p>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all hover:shadow-md ${selectedRole === 'internship' ? 'ring-2 ring-accent border-accent' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <RadioGroupItem value="internship" id="internship" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="internship" className="cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <GraduationCap className="w-5 h-5 text-green-600" />
                        <span className="text-lg font-semibold">Internship</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Offer learning opportunities for students and fresh graduates with mentorship, skill development, and potential conversion paths.
                      </p>
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleContinue}
              disabled={!selectedRole}
              className="bg-accent hover:bg-accent/90"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
