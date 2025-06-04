
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, ChevronDown } from 'lucide-react';

const RecruitmentBoard = () => {
  // Recruitment stages
  const stages = [
    {
      id: 'new',
      title: 'New',
      candidates: [
        { id: 1, name: 'Sarah Johnson', score: 92, hasNotes: true },
        { id: 2, name: 'Ahmed Hassan', score: 88, hasNotes: true },
      ]
    },
    {
      id: 'pre-screened',
      title: 'Pre-Screened',
      candidates: [
        { id: 3, name: 'Fatima Al-Zahra', score: 90, hasNotes: true },
        { id: 4, name: 'Omar Khan', score: 85, hasNotes: false },
      ]
    },
    {
      id: 'shortlisted',
      title: 'Shortlisted',
      candidates: [
        { id: 5, name: 'Layla Mahmoud', score: 93, hasNotes: true },
      ]
    },
    {
      id: 'interviewing',
      title: 'Interviewing',
      candidates: [
        { id: 6, name: 'Sami Yusuf', score: 91, hasNotes: true },
      ]
    },
    {
      id: 'offer',
      title: 'Offer',
      candidates: []
    },
    {
      id: 'hired',
      title: 'Hired',
      candidates: [
        { id: 7, name: 'Zainab Ali', score: 95, hasNotes: true },
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recruitment Board</h1>
            <p className="text-gray-600">Manage your recruitment pipeline</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              Financial Analyst <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline">Filter</Button>
            <Button className="bg-accent hover:bg-accent/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <div className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-100 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{stage.title}</h3>
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                      {stage.candidates.length}
                    </span>
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="p-3 space-y-3">
                    {stage.candidates.map((candidate) => (
                      <Card key={candidate.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{candidate.name}</h4>
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                                {candidate.score}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              {candidate.hasNotes ? (
                                <span className="flex items-center gap-1">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 14H14V21H21V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 7V3H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 7V3H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 3H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 21H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 3L3 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21 3L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                  Cover Letter
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Button variant="ghost" className="w-full border border-dashed border-gray-300 text-gray-500 hover:text-gray-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Candidate
                    </Button>
                  </div>
                </ScrollArea>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruitmentBoard;
