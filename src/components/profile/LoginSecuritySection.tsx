
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Shield } from 'lucide-react';

interface LoginSecuritySectionProps {
  onChange: () => void;
}

export function LoginSecuritySection({ onChange }: LoginSecuritySectionProps) {
  const [email, setEmail] = useState('user@company.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    onChange();
  };

  const handlePasswordChange = (field: string, value: string) => {
    if (field === 'current') setCurrentPassword(value);
    else if (field === 'new') setNewPassword(value);
    else if (field === 'confirm') setConfirmPassword(value);
    onChange();
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <Separator />

      {/* Password Reset */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Change Password</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => handlePasswordChange('current', e.target.value)}
                placeholder="Enter current password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => handlePasswordChange('new', e.target.value)}
                placeholder="Enter new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                placeholder="Confirm new password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Two-Factor Authentication */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gray-600" />
          <div>
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
        </div>
        <Switch
          id="two-factor"
          checked={twoFactorEnabled}
          onCheckedChange={(checked) => {
            setTwoFactorEnabled(checked);
            onChange();
          }}
        />
      </div>
    </div>
  );
}
