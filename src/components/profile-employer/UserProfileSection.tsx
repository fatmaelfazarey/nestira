
import { useEffect, useState } from 'react';
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
  currentUser: object;
  setCurrentUser: object;
}

export function UserProfileSection({ isIndividualRecruiter, setIsIndividualRecruiter, onChange, currentUser, setCurrentUser }: UserProfileSectionProps) {
  const [fullName, setFullName] = useState('Ahmed Hassan');
  console.log('currentUser : ', currentUser)
  // const [fullName, setFullName] = useState(currentUser?.personalInfo?.fullName || 'Ahmed Hassan');
  const [rolePosition, setRolePosition] = useState('Senior Recruiter');
  const [phoneNumber, setPhoneNumber] = useState('+20 123 456 7890');
  const [businessEmail, setBusinessEmail] = useState('ahmed@company.com');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [linkedinPersonal, setLinkedinPersonal] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    setFullName(currentUser?.personalInfo?.fullName);
    setRolePosition(currentUser?.personalInfo?.rolePosition)
    setPhoneNumber(currentUser?.personalInfo?.phone);
    setBusinessEmail(currentUser?.personalInfo?.businessEmail);
     setProfilePhoto(currentUser?.personalInfo?.profilePhoto);

  }, [currentUser]);

  console.log('currentUser : ', currentUser)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
        handlePersonalInfoChange('profilePhoto', e.target?.result as string)
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
  const handlePersonalInfoChange = (field: string, value: string) => {
    setCurrentUser(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };
  return (
    <div className="space-y-6">
      {/* User Type Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-900">I am recruiting as:</Label>
        <RadioGroup
          value={isIndividualRecruiter ? 'individual' : 'company'}
          onValueChange={handleUserTypeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="individual" id="individual" />
            <div>
              <Label htmlFor="individual" className="font-medium cursor-pointer">
                Individual Recruiter
              </Label>
              <p className="text-xs text-gray-500">Freelance HR or independent consultant</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="company" id="company" />
            <div>
              <Label htmlFor="company" className="font-medium cursor-pointer">
                Company Representative
              </Label>
              <p className="text-xs text-gray-500">Representing a company or organization</p>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Profile Photo */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={profilePhoto} alt={fullName} />
          <AvatarFallback className="text-lg font-semibold bg-orange-100 text-orange-600">
            {fullName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <Label htmlFor="profile-photo" className="text-sm font-medium">Profile Photo</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="profile-photo" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </label>
            </Button>
            <input
              id="profile-photo"
              type="file"
              accept="image/*"

              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-xs text-gray-500">JPG, PNG up to 2MB</span>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full-name" className="text-sm font-medium">Full Name *</Label>
          {/* <Input
            id="full-name"
            value={fullName}
            onChange={(e) => {
              setCurrentUser({ ...currentUser, [currentUser?.personalInfo?.fullName]: e.target.value })
              setFullName(e.target.value);
              onChange();
            }}
            placeholder="Enter your full name"
            className="h-9"
          /> */}
          <Input
            id="full-name"
            value={fullName}
            onChange={(e) => {
              const newName = e.target.value;
              setFullName(newName);
              handlePersonalInfoChange('fullName', newName);
              onChange();
            }}

            placeholder="Enter your full name"
            className="h-9"
          />

        </div>

        <div className="space-y-2">
          <Label htmlFor="role-position" className="text-sm font-medium">
            {isIndividualRecruiter ? 'Specialization' : 'Role/Position'}
          </Label>
          <Input
            id="role-position"
            value={rolePosition}
            onChange={(e) => {

              setRolePosition(e.target.value);
              handlePersonalInfoChange('rolePosition', e.target.value);

              onChange();
            }}
            placeholder={isIndividualRecruiter ? 'e.g., Finance Headhunter' : 'e.g., Senior Recruiter'}
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-number" className="text-sm font-medium">Phone Number</Label>
          <Input
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handlePersonalInfoChange('phone', e.target.value);
              onChange();
            }}
            placeholder="+20 XXX XXX XXXX"
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-email" className="text-sm font-medium">
            {isIndividualRecruiter ? 'Professional Email' : 'Business Email'}
          </Label>
          <Input
            id="business-email"
            type="email"
            value={businessEmail}
            onChange={(e) => {
              setBusinessEmail(e.target.value);
              setCurrentUser(pref => ({
                ...pref,
                email: e.target.value
              }))
              handlePersonalInfoChange('businessEmail', e.target.value);
              onChange();
            }}
            placeholder={isIndividualRecruiter ? 'your.email@domain.com' : 'your.email@company.com'}
            className="h-9"
          />
        </div>

        {/* Individual Recruiter Specific Fields */}
        {isIndividualRecruiter && (
          <>
            <div className="space-y-2">
              <Label htmlFor="linkedin-personal" className="text-sm font-medium">
                LinkedIn Profile URL *
              </Label>
              <Input
                id="linkedin-personal"
                value={linkedinPersonal}
                onChange={(e) => {
                  setLinkedinPersonal(e.target.value);
                  onChange();
                }}
                placeholder="https://linkedin.com/in/yourname"
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp-number" className="text-sm font-medium">
                WhatsApp Number *
              </Label>
              <Input
                id="whatsapp-number"
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  onChange();
                }}
                placeholder="+971 50 123 4567"
                className="h-9"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
