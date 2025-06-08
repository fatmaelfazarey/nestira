
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload } from 'lucide-react';

interface UserProfileSectionProps {
  isIndividualRecruiter: boolean;
  setIsIndividualRecruiter: (value: boolean) => void;
  onChange: () => void;
}

export function UserProfileSection({ isIndividualRecruiter, setIsIndividualRecruiter, onChange }: UserProfileSectionProps) {
  const [fullName, setFullName] = useState('Ahmed Hassan');
  const [rolePosition, setRolePosition] = useState('Senior Recruiter');
  const [phoneNumber, setPhoneNumber] = useState('+20 123 456 7890');
  const [businessEmail, setBusinessEmail] = useState('ahmed@company.com');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        onChange();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserTypeChange = (value: string) => {
    const isIndividual = value === 'individual';
    setIsIndividualRecruiter(isIndividual);
    onChange();
  };

  return (
    <div className="space-y-6">
      {/* User Type Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">I am recruiting as:</Label>
        <RadioGroup 
          value={isIndividualRecruiter ? 'individual' : 'company'} 
          onValueChange={handleUserTypeChange}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="individual" id="individual" />
            <div className="flex-1">
              <Label htmlFor="individual" className="font-medium cursor-pointer">
                Individual Recruiter
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                I'm a freelance HR, headhunter, or independent talent consultant
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="company" id="company" />
            <div className="flex-1">
              <Label htmlFor="company" className="font-medium cursor-pointer">
                Company Representative
              </Label>
              <p className="text-sm text-gray-500 mt-1">
                I'm representing a company or organization
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t pt-6">
        {/* Profile Photo */}
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profilePhoto} alt={fullName} />
            <AvatarFallback className="text-lg font-semibold bg-orange-100 text-orange-600">
              {fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <Label htmlFor="profile-photo">Profile Photo</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="profile-photo" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </label>
              </Button>
              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-sm text-gray-500">JPG, PNG up to 2MB</span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name *</Label>
            <Input
              id="full-name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                onChange();
              }}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-position">
              {isIndividualRecruiter ? 'Specialization/Service' : 'Role/Position'}
            </Label>
            <Input
              id="role-position"
              value={rolePosition}
              onChange={(e) => {
                setRolePosition(e.target.value);
                onChange();
              }}
              placeholder={isIndividualRecruiter ? 'e.g., Finance Headhunter, Accounting Specialist' : 'e.g., Senior Recruiter, HR Manager'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <Input
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                onChange();
              }}
              placeholder="+20 XXX XXX XXXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-email">
              {isIndividualRecruiter ? 'Professional Email' : 'Business Email'}
            </Label>
            <Input
              id="business-email"
              type="email"
              value={businessEmail}
              onChange={(e) => {
                setBusinessEmail(e.target.value);
                onChange();
              }}
              placeholder={isIndividualRecruiter ? 'your.email@domain.com' : 'your.email@company.com'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
