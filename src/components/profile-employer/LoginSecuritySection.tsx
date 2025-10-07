
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Eye, EyeOff, Shield, Check, X, Smartphone, Mail } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface LoginSecuritySectionProps {
  onChange: () => void;
  currentUser: object;
  setCurrentUser: object
}

export function LoginSecuritySection({ onChange, currentUser, setCurrentUser }: LoginSecuritySectionProps) {
  const { t } = useTranslation();
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
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<'email' | 'app'>('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');

  useEffect(() => {
    setTwoFactorEnabled(currentUser?.security?.twoFactorEnabled);
  }, [currentUser])
  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return { strength: 'Weak', percentage: 33, color: 'bg-red-500' };
    if (score <= 4) return { strength: 'Medium', percentage: 66, color: 'bg-yellow-500' };
    return { strength: 'Strong', percentage: 100, color: 'bg-green-500' };
  };

  const passwordStrength = calculatePasswordStrength(newPassword);
  const passwordChecks = {
    length: newPassword.length >= 8,
    number: /\d/.test(newPassword),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  };

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

  const handleTwoFactorToggle = (checked: boolean) => {
    console.log('Two-factor toggle clicked:', checked);
    if (checked) {
      // Show setup when turning on
      setShowTwoFactorSetup(true);
    } else {
      // Turn off 2FA
      setTwoFactorEnabled(false);
      setShowTwoFactorSetup(false);
      setRecoveryCode('');
      setVerificationCode('');
    }
    onChange();
  };

  const setupTwoFactor = () => {
    console.log('Setting up 2FA with method:', twoFactorMethod);
    // Simulate 2FA setup
    setTwoFactorEnabled(true);
    setShowTwoFactorSetup(false);
    setRecoveryCode('ABC123-DEF456-GHI789');
    onChange();
  };

  const cancelTwoFactorSetup = () => {
    setShowTwoFactorSetup(false);
    setVerificationCode('');
    setTwoFactorMethod('email');
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

      {/* Enhanced Password Reset */}
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
            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Progress
                    value={passwordStrength.percentage}
                    className="flex-1 h-2"
                    indicatorClassName={passwordStrength.color}
                  />
                  <span className={`text-xs font-medium ${passwordStrength.strength === 'Strong' ? 'text-green-600' :
                    passwordStrength.strength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                    {passwordStrength.strength}
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordChecks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Minimum 8 characters
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordChecks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    At least 1 number
                  </div>
                  <div className={`flex items-center gap-1 ${passwordChecks.symbol ? 'text-green-600' : 'text-gray-400'}`}>
                    {passwordChecks.symbol ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    At least 1 symbol
                  </div>
                </div>
              </div>
            )}
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
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-red-600">Passwords do not match</p>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Enhanced Two-Factor Authentication */}
      <div className="space-y-4">
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
            checked={twoFactorEnabled || showTwoFactorSetup}
            onCheckedChange={handleTwoFactorToggle}
          />
        </div>

        {/* 2FA Setup Modal/Card */}
        {showTwoFactorSetup && (
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg">Set Up Two-Factor Authentication</CardTitle>
              <CardDescription>
                Choose your preferred method for receiving verification codes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Method Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant={twoFactorMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setTwoFactorMethod('email')}
                  className="h-16 flex-col gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email OTP
                </Button>
                <Button
                  variant={twoFactorMethod === 'app' ? 'default' : 'outline'}
                  onClick={() => setTwoFactorMethod('app')}
                  className="h-16 flex-col gap-2"
                >
                  <Smartphone className="w-5 h-5" />
                  Authenticator App
                </Button>
              </div>

              {/* Setup Instructions */}
              {twoFactorMethod === 'email' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    We'll send verification codes to your email: {email}
                  </p>
                  <div className="space-y-2">
                    <Label>Enter verification code sent to your email:</Label>
                    <InputOTP
                      maxLength={6}
                      value={verificationCode}
                      onChange={(value) => setVerificationCode(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              )}

              {twoFactorMethod === 'app' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">QR Code</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Enter verification code from your app:</Label>
                    <InputOTP
                      maxLength={6}
                      value={verificationCode}
                      onChange={(value) => setVerificationCode(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={setupTwoFactor}
                  disabled={verificationCode.length !== 6}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Enable 2FA
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelTwoFactorSetup}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recovery Code Display */}
        {twoFactorEnabled && recoveryCode && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">✓ Two-Factor Authentication Enabled</CardTitle>
              <CardDescription className="text-green-700">
                Your recovery code (save this in a secure place):
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                {recoveryCode}
              </div>
              <p className="text-xs text-green-600 mt-2">
                Use this code if you lose access to your {twoFactorMethod === 'email' ? 'email' : 'authenticator app'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
