
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload } from 'lucide-react';

interface UserProfileSectionProps {
  onChange: () => void;
}

export function UserProfileSection({ onChange }: UserProfileSectionProps) {
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

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
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
          <Label htmlFor="role-position">Role/Position</Label>
          <Input
            id="role-position"
            value={rolePosition}
            onChange={(e) => {
              setRolePosition(e.target.value);
              onChange();
            }}
            placeholder="e.g., Senior Recruiter, HR Manager"
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
          <Label htmlFor="business-email">Business Email</Label>
          <Input
            id="business-email"
            type="email"
            value={businessEmail}
            onChange={(e) => {
              setBusinessEmail(e.target.value);
              onChange();
            }}
            placeholder="your.email@company.com"
          />
        </div>
      </div>
    </div>
  );
}
