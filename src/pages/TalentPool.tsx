
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Briefcase, Unlock } from 'lucide-react';

const TalentPool = () => {
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      experience: "8 years",
      score: 92,
      status: "Available",
      tags: ["CPA", "Excel Expert", "Financial Analysis"]
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      title: "Financial Analyst",
      location: "Cairo, Egypt",
      experience: "5 years",
      score: 88,
      status: "Interviewing",
      tags: ["Power BI", "SQL", "Risk Management"]
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      title: "Accounting Manager",
      location: "Riyadh, Saudi Arabia",
      experience: "6 years",
      score: 90,
      status: "Shortlisted",
      tags: ["SAP", "IFRS", "Team Leadership"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Talent Pool</h1>
            <p className="text-gray-600">Browse and filter finance professionals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Grid View</Button>
            <Button variant="outline">Table View</Button>
            <Button variant="outline">Kanban</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-600">{candidate.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{candidate.score}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {candidate.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {candidate.experience} experience
                </div>
                <div className="flex flex-wrap gap-1">
                  {candidate.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Badge 
                    variant={candidate.status === 'Available' ? 'default' : 'secondary'}
                    className={candidate.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {candidate.status}
                  </Badge>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Unlock className="w-4 h-4 mr-1" />
                    Unlock
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TalentPool;
