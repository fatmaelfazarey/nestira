
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  PuzzleIcon, 
  CreditCard, 
  HelpCircle,
  ArrowRight 
} from 'lucide-react';

export function NavigationLinksSection() {
  const navigationLinks = [
    {
      title: 'Homepage',
      description: 'Back to main dashboard',
      icon: Home,
      href: '/',
      color: 'text-blue-600'
    },
    {
      title: 'My Jobs',
      description: 'Manage job postings',
      icon: Briefcase,
      href: '/job-listings',
      color: 'text-green-600'
    },
    {
      title: 'My Assessments',
      description: 'Quiz builder & management',
      icon: PuzzleIcon,
      href: '/quiz-builder',
      color: 'text-purple-600'
    },
    {
      title: 'Billing',
      description: 'Subscription & payments',
      icon: CreditCard,
      href: '/billing',
      color: 'text-orange-600'
    },
    {
      title: 'Help Center',
      description: 'Support & documentation',
      icon: HelpCircle,
      href: '/help',
      color: 'text-gray-600'
    }
  ];

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Quick Navigation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {navigationLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            <Button 
              variant="ghost" 
              className="w-full justify-start h-auto p-3 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <link.icon className={`w-4 h-4 ${link.color}`} />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{link.title}</div>
                    <div className="text-xs text-gray-500">{link.description}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
