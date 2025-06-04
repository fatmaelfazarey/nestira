
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, User, Plus, Video, Calendar as CalendarIcon } from 'lucide-react';

const Interviews = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const interviews = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Senior Finance Manager",
      time: "10:00 AM - 11:00 AM",
      location: "Video Call",
      interviewer: "Ahmed Rashid (CFO)",
      isVideoCall: true
    },
    {
      id: 2,
      candidateName: "Fatima Al-Zahra",
      position: "Accounting Manager",
      time: "1:00 PM - 2:00 PM",
      location: "Office - Meeting Room 2",
      interviewer: "Layla Ahmed (HR Director)",
      isVideoCall: false
    },
    {
      id: 3,
      candidateName: "Omar Khan",
      position: "Financial Analyst",
      time: "3:30 PM - 4:30 PM",
      location: "Video Call",
      interviewer: "Ahmed Rashid (CFO)",
      isVideoCall: true
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border-0"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="day" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
                <div className="text-sm font-medium">
                  {date?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              
              <TabsContent value="day" className="mt-0 space-y-4">
                {interviews.map((interview) => (
                  <Card key={interview.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">{interview.candidateName}</h3>
                            <p className="text-sm text-gray-600">{interview.position}</p>
                          </div>
                          <div className="flex items-center">
                            {interview.isVideoCall ? (
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                Join Call
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                Add to Calendar
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {interview.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {interview.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4 text-gray-400" />
                            {interview.interviewer}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">View Profile</Button>
                          <Button variant="ghost" size="sm">Reschedule</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="week" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-gray-500">
                      Weekly view will be implemented soon.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="month" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center text-gray-500">
                      Monthly view will be implemented soon.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;
