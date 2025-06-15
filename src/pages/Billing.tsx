import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, CheckCircle, ArrowUpCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const Billing = () => {
  const invoices = [
    { id: 4, date: '2025-07-01', amount: '$99.00', status: 'Upcoming' },
    { id: 3, date: '2025-06-01', amount: '$99.00', status: 'Pending' },
    { id: 2, date: '2025-05-01', amount: '$99.00', status: 'Paid' },
    { id: 1, date: '2025-04-01', amount: '$99.00', status: 'Paid' },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200/60';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200/60';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200/60';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const availablePlans = [
    {
      name: 'Starter',
      price: '$29',
      period: 'month',
      features: ['Up to 10 job posts', 'Basic candidate search', 'Standard analytics', 'Email support'],
      cta: 'Downgrade Plan',
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'month',
      features: ['Up to 50 job posts', 'Unlimited candidates', 'Advanced analytics', 'Priority support'],
      cta: 'Current Plan',
      isCurrent: true,
    },
    {
      name: 'Business',
      price: '$249',
      period: 'month',
      features: ['Unlimited job posts', 'AI candidate matching', 'Team collaboration tools', 'Dedicated account manager'],
      cta: 'Upgrade Plan',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & <span className="gradient-text">Subscription</span></h1>
            <p className="text-gray-600">Manage your subscription and billing information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-blue-50">
                  <div className="text-3xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-blue-800 font-medium">Job Posts</div>
                  <div className="text-xs text-blue-500">of 50</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-green-50">
                  <div className="text-3xl font-bold text-green-600">156</div>
                  <div className="text-sm text-green-800 font-medium">Candidates</div>
                  <div className="text-xs text-green-500">Unlimited</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-purple-50">
                  <div className="text-3xl font-bold text-purple-600">45</div>
                  <div className="text-sm text-purple-800 font-medium">Exports</div>
                  <div className="text-xs text-purple-500">Unlimited</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4 p-4 rounded-lg bg-white/60 border border-black/5 shadow-sm">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-lg text-gray-800">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-white hover:bg-white/80 border-blue-200">Update Payment Method</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-gray-50 to-slate-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Available Plans</CardTitle>
            <p className="text-gray-600">Choose the plan that's right for you.</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={cn(
                    "flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full",
                    plan.isCurrent && "border-2 border-accent",
                    plan.name === 'Business' && "ring-2 ring-purple-600 ring-offset-2 shadow-lg shadow-purple-600/20"
                  )}
                >
                  {plan.isCurrent ? (
                    <Badge className="absolute top-4 right-4 bg-accent text-white font-semibold">Current Plan</Badge>
                  ) : plan.name === 'Business' && (
                    <Badge className="absolute top-4 right-4 bg-purple-600 text-white font-semibold border-purple-700">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-3xl font-bold">{plan.price}<span className="text-sm font-normal text-gray-600">/{plan.period}</span></p>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-auto ${plan.cta === 'Upgrade Plan' ? 'bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg' : ''}`}
                      variant={plan.isCurrent ? 'outline' : (plan.cta === 'Upgrade Plan' ? 'default' : 'secondary')}
                      disabled={plan.isCurrent}
                    >
                      {plan.cta === 'Upgrade Plan' && <ArrowUpCircle />}
                      {plan.isCurrent && <Star />}
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-600">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={cn("font-semibold", getStatusBadgeClass(invoice.status))}>{invoice.status}</Badge>
                    <span className="font-medium">{invoice.amount}</span>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
                      <Download className="w-4 h-4" />
                    </Button>
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

export default Billing;
