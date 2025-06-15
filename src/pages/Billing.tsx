
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, CheckCircle } from 'lucide-react';

const Billing = () => {
  const currentPlan = {
    name: 'Professional',
    price: '$99',
    period: 'month',
    features: ['Up to 50 job posts', 'Unlimited candidates', 'Advanced analytics', 'Priority support']
  };

  const invoices = [
    { id: 1, date: '2024-05-01', amount: '$99.00', status: 'Paid' },
    { id: 2, date: '2024-04-01', amount: '$99.00', status: 'Paid' },
    { id: 3, date: '2024-03-01', amount: '$99.00', status: 'Paid' },
  ];

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-gray-600">Manage your subscription and billing information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
                    <p className="text-gray-600">
                      {currentPlan.price}/{currentPlan.period}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">23</div>
                    <div className="text-sm text-gray-600">Job Posts</div>
                    <div className="text-xs text-gray-500">of 50</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">Candidates</div>
                    <div className="text-xs text-gray-500">Unlimited</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">45</div>
                    <div className="text-sm text-gray-600">Exports</div>
                    <div className="text-xs text-gray-500">Unlimited</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Update Payment Method</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.isCurrent ? 'border-2 border-primary' : ''}`}>
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
                      className={`w-full mt-auto ${plan.cta === 'Upgrade Plan' ? 'bg-accent hover:bg-accent/90 text-white' : ''}`}
                      variant={plan.isCurrent ? 'outline' : (plan.cta === 'Upgrade Plan' ? 'default' : 'secondary')}
                      disabled={plan.isCurrent}
                    >
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
                <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Invoice #{invoice.id}</p>
                    <p className="text-sm text-gray-600">{invoice.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                    <span className="font-medium">{invoice.amount}</span>
                    <Button variant="ghost" size="sm">
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
