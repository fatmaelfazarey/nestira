import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, MessageCircle, Book, Mail, Phone } from 'lucide-react';
import HelpCenterBot from '@/components/HelpCenterBot';
const HelpCenter = () => {
  const faqCategories = [{
    title: "Getting Started",
    articles: ["How to create your first job posting", "Setting up your company profile", "Understanding candidate scoring", "Inviting team members"]
  }, {
    title: "Billing & Subscription",
    articles: ["Changing your subscription plan", "Understanding usage limits", "Payment methods and billing", "Refund policies"]
  }, {
    title: "Candidate Management",
    articles: ["How to shortlist candidates", "Using the recruitment board", "Sending interview invitations", "Exporting candidate data"]
  }];
  const recentTickets = [{
    id: 1,
    subject: "Question about candidate scoring",
    status: "Resolved",
    date: "2024-05-15"
  }, {
    id: 2,
    subject: "Unable to export candidate list",
    status: "In Progress",
    date: "2024-05-14"
  }, {
    id: 3,
    subject: "Billing inquiry",
    status: "Resolved",
    date: "2024-05-12"
  }];
  return <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600">Get help and support for your hiring needs</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              
              <Input className="pl-10 py-3" placeholder="Search for help articles..." />
            </div>
          </CardContent>
        </Card>

        {/* AI Help Bot Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <HelpCenterBot />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <Book className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Knowledge Base</h3>
                <p className="text-sm text-gray-600 mb-4">Browse our comprehensive help articles</p>
                <Button variant="outline" className="w-full">Browse Articles</Button>
              </CardContent>
            </Card>
            
            
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">Send us a detailed message</p>
                <Button variant="outline" className="w-full">Send Email</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        
      </div>
    </DashboardLayout>;
};
export default HelpCenter;