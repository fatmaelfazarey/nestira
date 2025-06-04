
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User, Plus, Video, Calendar as CalendarIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Interviews = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newInterview, setNewInterview] = useState({
    candidateId: '',
    position: '',
    date: '',
    time: '',
    duration: '60',
    location: 'Video Call',
    interviewer: '',
    notes: ''
  });
  const { toast } = useToast();
  
  // Candidate data from talent pool
  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Finance Manager",
      location: "Dubai, UAE",
      country: "AE",
      experience: "8 years",
      score: 92,
      status: "Available",
      tags: ["CPA", "Excel Expert", "Financial Analysis"],
      photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      email: "sarah.johnson@email.com",
      phone: "+971 50 123 4567"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      title: "Financial Analyst",
      location: "Cairo, Egypt",
      country: "EG",
      experience: "5 years",
      score: 88,
      status: "Interviewing",
      tags: ["Power BI", "SQL", "Risk Management"],
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
      email: "ahmed.hassan@email.com",
      phone: "+20 10 123 4567"
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      title: "Accounting Manager",
      location: "Riyadh, Saudi Arabia",
      country: "SA",
      experience: "6 years",
      score: 90,
      status: "Shortlisted",
      tags: ["SAP", "IFRS", "Team Leadership"],
      photo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face",
      email: "fatima.alzahra@email.com",
      phone: "+966 50 123 4567"
    }
  ];

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateId: 1,
      candidateName: "Sarah Johnson",
      candidatePhoto: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
      position: "Senior Finance Manager",
      time: "10:00 AM - 11:00 AM",
      location: "Video Call",
      interviewer: "Ahmed Rashid (CFO)",
      isVideoCall: true,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      candidateId: 3,
      candidateName: "Fatima Al-Zahra",
      candidatePhoto: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=100&h=100&fit=crop&crop=face",
      position: "Accounting Manager",
      time: "1:00 PM - 2:00 PM",
      location: "Office - Meeting Room 2",
      interviewer: "Layla Ahmed (HR Director)",
      isVideoCall: false,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      candidateId: 2,
      candidateName: "Omar Khan",
      candidatePhoto: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face",
      position: "Financial Analyst",
      time: "3:30 PM - 4:30 PM",
      location: "Video Call",
      interviewer: "Ahmed Rashid (CFO)",
      isVideoCall: true,
      date: new Date().toISOString().split('T')[0]
    }
  ]);

  const getCountryFlag = (countryCode) => {
    const flags = {
      'AE': '🇦🇪',
      'EG': '🇪🇬',
      'SA': '🇸🇦'
    };
    return flags[countryCode] || '🌍';
  };

  const handleScheduleInterview = () => {
    const selectedCandidate = candidates.find(c => c.id === parseInt(newInterview.candidateId));
    if (!selectedCandidate) return;

    const interview = {
      id: interviews.length + 1,
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name,
      candidatePhoto: selectedCandidate.photo,
      position: newInterview.position || selectedCandidate.title,
      time: `${newInterview.time} - ${calculateEndTime(newInterview.time, parseInt(newInterview.duration))}`,
      location: newInterview.location,
      interviewer: newInterview.interviewer,
      isVideoCall: newInterview.location === 'Video Call',
      date: newInterview.date
    };

    setInterviews([...interviews, interview]);
    setIsScheduleModalOpen(false);
    setNewInterview({
      candidateId: '',
      position: '',
      date: '',
      time: '',
      duration: '60',
      location: 'Video Call',
      interviewer: '',
      notes: ''
    });

    toast({
      title: "Interview Scheduled",
      description: `Interview with ${selectedCandidate.name} has been scheduled for ${newInterview.date} at ${newInterview.time}`,
    });
  };

  const calculateEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endMinutes = minutes + durationMinutes;
    const endHours = hours + Math.floor(endMinutes / 60);
    const finalMinutes = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  const renderDayView = () => {
    const selectedDateStr = date?.toISOString().split('T')[0];
    const dayInterviews = interviews.filter(interview => interview.date === selectedDateStr);

    return (
      <div className="space-y-4">
        {dayInterviews.length > 0 ? dayInterviews.map((interview) => (
          <Card key={interview.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={interview.candidatePhoto} alt={interview.candidateName} />
                      <AvatarFallback>{interview.candidateName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{interview.candidateName}</h3>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                    </div>
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
        )) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No interviews scheduled for this day.
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayStr = day.toISOString().split('T')[0];
          const dayInterviews = interviews.filter(interview => interview.date === dayStr);
          
          return (
            <div key={index} className="border rounded-lg p-2 min-h-[100px]">
              <div className="text-sm font-medium mb-2">
                {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
              </div>
              <div className="space-y-1">
                {dayInterviews.map(interview => (
                  <div key={interview.id} className="text-xs bg-accent text-white p-1 rounded">
                    {interview.time.split(' - ')[0]} {interview.candidateName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border-0"
        />
        <div className="space-y-2">
          <h4 className="font-medium">Interviews this month:</h4>
          {interviews.map(interview => (
            <div key={interview.id} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
              <Avatar className="w-6 h-6">
                <AvatarImage src={interview.candidatePhoto} alt={interview.candidateName} />
                <AvatarFallback>{interview.candidateName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{interview.candidateName}</span>
              <span className="text-gray-500">-</span>
              <span>{interview.date}</span>
              <span>{interview.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interviews</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="candidate">Candidate</Label>
                  <Select value={newInterview.candidateId} onValueChange={(value) => setNewInterview({...newInterview, candidateId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      {candidates.map(candidate => (
                        <SelectItem key={candidate.id} value={candidate.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={candidate.photo} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{candidate.name}</span>
                            <span className="text-sm text-gray-500">- {candidate.title}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newInterview.position}
                    onChange={(e) => setNewInterview({...newInterview, position: e.target.value})}
                    placeholder="Position title"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newInterview.date}
                      onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newInterview.time}
                      onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select value={newInterview.duration} onValueChange={(value) => setNewInterview({...newInterview, duration: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="90">1.5 hours</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select value={newInterview.location} onValueChange={(value) => setNewInterview({...newInterview, location: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Video Call">Video Call</SelectItem>
                        <SelectItem value="Office - Meeting Room 1">Office - Meeting Room 1</SelectItem>
                        <SelectItem value="Office - Meeting Room 2">Office - Meeting Room 2</SelectItem>
                        <SelectItem value="Office - Conference Room">Office - Conference Room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="interviewer">Interviewer</Label>
                  <Input
                    id="interviewer"
                    value={newInterview.interviewer}
                    onChange={(e) => setNewInterview({...newInterview, interviewer: e.target.value})}
                    placeholder="Interviewer name and title"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={newInterview.notes}
                    onChange={(e) => setNewInterview({...newInterview, notes: e.target.value})}
                    placeholder="Additional notes for the interview"
                  />
                </div>

                <Button onClick={handleScheduleInterview} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
              
              <TabsContent value="day" className="mt-0">
                {renderDayView()}
              </TabsContent>
              
              <TabsContent value="week" className="mt-0">
                {renderWeekView()}
              </TabsContent>
              
              <TabsContent value="month" className="mt-0">
                {renderMonthView()}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;
