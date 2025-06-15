import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, UserCheck, Calendar, Award, Copy } from 'lucide-react';

const Referrals = () => {
  const referralStats = {
    totalReferrals: 8,
    successfulReferrals: 3,
    pendingReferrals: 2,
    totalEarned: '$60'
  };

  const referralHistory = [
    { id: 1, email: 'company@example.com', status: 'Successful', reward: '$20', date: '2024-05-15' },
    { id: 2, email: 'startup@demo.com', status: 'Successful', reward: '$20', date: '2024-05-10' },
    { id: 3, email: 'business@test.com', status: 'Pending', reward: '$20', date: '2024-05-08' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 p-4 md:p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Referrals</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Whether it’s a company you trust or a manager in your network, send them our way. We’ll handle the hiring — you get the thank-you (in cash). Perfect for recruiters, HR consultants, and team leads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Total Referrals</p>
              <p className="text-2xl font-bold text-blue-600">{referralStats.totalReferrals}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Successful</p>
              <p className="text-2xl font-bold text-green-600">{referralStats.successfulReferrals}</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Pending</p>
              <p className="text-2xl font-bold text-purple-600">{referralStats.pendingReferrals}</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Total Earned</p>
              <p className="text-2xl font-bold text-orange-600">{referralStats.totalEarned}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Invite Others</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <Input placeholder="contact@example.com" className="flex-1" />
                  <Button className="bg-accent hover:bg-accent/90 text-white">
                    Send Invite
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Referral Link
                </label>
                <div className="flex gap-2">
                  <Input 
                    value="https://nestira.com/ref/your-unique-code" 
                    readOnly 
                    className="flex-1 bg-gray-50"
                  />
                  <Button variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Invite Someone</h4>
                    <p className="text-sm text-gray-600">Send invitations to people you know</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">They Sign Up</h4>
                    <p className="text-sm text-gray-600">When they join using your link</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Earn Rewards</h4>
                    <p className="text-sm text-gray-600">Get $20 for each successful referral</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referralHistory.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{referral.email}</p>
                    <p className="text-sm text-gray-600">{referral.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={referral.status === 'Successful' ? 'default' : 'secondary'} 
                      className={referral.status === 'Successful' ? 'bg-gray-900 text-white hover:bg-gray-800' : ''}
                    >
                      {referral.status}
                    </Badge>
                    <span className="font-medium">{referral.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
