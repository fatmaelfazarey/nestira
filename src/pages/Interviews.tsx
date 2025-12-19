import { useState, useEffect } from 'react';
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
import { Clock, MapPin, User, Plus, Video, Calendar as CalendarIcon, Save, CalendarDays, Filter, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { IP } from '@/store/Path';
import { useAuth } from '@/contexts/AuthContext';
import LoadingState from '@/components/LoadingState';

// Types for better type safety
interface Interview {
  id: number;
  candidateId: string;
  candidateName: string;
  candidatePhoto: string;
  position: string;
  jobTitle: string;
  data: string | null;
  time: string | null;
  interviewType: string;
  interviewMode: string;
  meetingLink: string | null;
  instructions: string | null;
  status: string;
  result: string;
  isScheduled: number;
}

const Interviews = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedResult, setSelectedResult] = useState('');
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [interviewLoading, setInterviewLoading] = useState(true);
  const [interviewError, setInterviewError] = useState<string | null>(null);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filters, setFilters] = useState({
    interviewType: 'all',
    interviewMode: 'all',
    status: 'all',
    result: 'all'
  });

  const { toast } = useToast();
  const { currentUser } = useAuth();
  const path = `${IP}/api/employer/`;

  const [newInterview, setNewInterview] = useState({
    interviewDate: '',
    interviewTime: '',
    durationMinutes: '60',
    interviewMode: 'video',
    meetingLink: '',
    notes: '',
    interviewType: 'general'
  });

  // Helper function to compare dates ignoring time
  const isSameDate = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Helper function to format date to YYYY-MM-DD string
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fetch interviews from backend
  const getInterviews = async () => {
    if (!currentUser) {
      setInterviewError('User not authenticated');
      return { success: false, message: 'User not authenticated' };
    }

    setInterviewLoading(true);
    setInterviewError(null);
    const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
    const url = `${path}interviews`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': token,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch interviews: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success) {
        setInterviews(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch interviews');
      }
      return data;
    } catch (err: any) {
      console.error('Unexpected error:', err);
      setInterviewError(err.message);
      toast({
        title: "Error",
        description: "Failed to fetch interviews",
        variant: "destructive"
      });
    } finally {
      setInterviewLoading(false);
    }
  };

  useEffect(() => {
    getInterviews();
  }, []);

  // Helper function to format interview data for display
  const formatInterviewForDisplay = (interview: Interview) => {
    const isScheduled = interview.isScheduled === 1;

    // Extract date and time from the data field
    let displayDate = "Not Scheduled";
    let displayTime = "To be determined";
    let interviewDate: Date | null = null;

    if (interview.data) {
      interviewDate = new Date(interview.data);
      displayDate = interviewDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      displayTime = interview.time ?
        `${interview.time.substring(0, 5)} - ${calculateEndTime(interview.time, 60)}` :
        "Time not set";
    }

    // If interview is not scheduled, show placeholder data
    if (!isScheduled) {
      return {
        ...interview,
        displayDate: "Not Scheduled",
        displayTime: "To be determined",
        displayLocation: interview.interviewMode === 'video' ? 'Video Call' : 'In-Person',
        isVideoCall: interview.interviewMode === 'video',
        statusBadge: "Not Scheduled",
        badgeVariant: "secondary" as const,
        cardStyle: "border-gray-300 bg-gray-50", // Gray style for unscheduled
        interviewDate: null
      };
    }

    // If scheduled, format the actual data
    return {
      ...interview,
      displayDate,
      displayTime,
      interviewDate,
      displayLocation: interview.interviewMode === 'video' ? 'Video Call' : 'Audio Call',
      isVideoCall: interview.interviewMode === 'video',
      statusBadge: interview.status.charAt(0).toUpperCase() + interview.status.slice(1),
      badgeVariant: interview.status === 'scheduled' ? 'default' : 'secondary',
      cardStyle: "border-gray-200 bg-white" // White style for scheduled
    };
  };

  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = minutes + durationMinutes;
    const endHours = hours + Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
  };

  // Helper functions for date filtering
  const getTodayDate = (): Date => {
    return new Date();
  };

  const getWeekRange = () => {
    const today = date || new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return {
      start: startOfWeek,
      end: endOfWeek
    };
  };

  const getMonthRange = () => {
    const today = date || new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      start: startOfMonth,
      end: endOfMonth
    };
  };

  // Filter interviews based on active filters
  const filterInterviews = (interviewsToFilter: Interview[]) => {
    return interviewsToFilter.filter(interview => {
      if (filters.interviewType !== 'all' && interview.interviewType !== filters.interviewType) return false;
      if (filters.interviewMode !== 'all' && interview.interviewMode !== filters.interviewMode) return false;
      if (filters.status !== 'all' && interview.status !== filters.status) return false;
      if (filters.result !== 'all' && interview.result !== filters.result) return false;
      return true;
    });
  };

  // Filter interviews by selected date from calendar
  const filterInterviewsByDate = (interviewsToFilter: Interview[], selectedDate: Date) => {
    return interviewsToFilter.filter(interview => {
      if (interview.isScheduled === 0) return false;
      if (!interview.data) return false;

      const interviewDate = new Date(interview.data);
      return isSameDate(interviewDate, selectedDate);
    });
  };

  const handleInterviewCancel = async (interviewID: any) => {
    console.log('interviewID =>', interviewID);

    try {
      const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

      const url = `${path}interviews-cancel/${interviewID}`;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: 'cancelled'
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel interview: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        await getInterviews();

        toast({
          title: "Interview Cancelled",
          description: "Interview has been cancelled successfully",
        });
      } else {
        throw new Error(result.message || 'Failed to cancel interview');
      }
    } catch (error) {
      console.error('Error cancelling interview:', error);
      toast({
        title: "Error",
        description: `Failed to cancel interview: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  // Add this function to handle interview result updates
  const handleInterviewResultUpdate = async (interviewID: number, status: string, result?: string) => {
    try {
      const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
      const url = `${path}interviews-result/${interviewID}`;

      // Prepare update data
      const updateData: any = { status };

      // If status is completed, require result to be either 'pass' or 'fail'
      if (status === 'completed') {
        if (!result || (result !== 'pass' && result !== 'fail')) {
          toast({
            title: "Error",
            description: "Please select a result (pass or fail) for completed interviews",
            variant: "destructive"
          });
          return;
        }
        updateData.result = result;
      } else if (status === 'cancelled' || status === 'missing') {
        // For cancelled or missing interviews, set result to pending
        updateData.result = 'pending';
      }

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      console.log('updateData----', updateData)

      if (!response.ok) {
        throw new Error(`Failed to update interview: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        // Refresh interviews list
        await getInterviews();

        toast({
          title: "Interview Updated",
          description: `Interview has been ${status} successfully`,
        });
      } else {
        throw new Error(responseData.message || 'Failed to update interview');
      }
    } catch (error: any) {
      console.error('Error updating interview:', error);
      toast({
        title: "Error",
        description: `Failed to update interview: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  // Add this function to open the result update modal
  const openResultModal = (interview: Interview) => {
    setSelectedInterview(interview);
    setSelectedStatus(interview.status);
    setSelectedResult(interview.result);
    setIsResultModalOpen(true);
  };

  const handleScheduleInterview = async () => {
    if (!editingInterview) {
      toast({
        title: "Error",
        description: "No interview selected for scheduling",
        variant: "destructive"
      });
      return;
    }

    setScheduleLoading(true);

    try {
      const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
      const url = `${path}interviews/${editingInterview.id}`;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          interviewDate: newInterview.interviewDate,
          interviewTime: newInterview.interviewTime,
          durationMinutes: parseInt(newInterview.durationMinutes),
          interviewType: newInterview.interviewType,
          interviewMode: newInterview.interviewMode,
          meetingLink: newInterview.meetingLink,
          instructions: newInterview.notes,
          isScheduled: 1
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to schedule interview: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Refresh interviews list
        await getInterviews();

        setIsScheduleModalOpen(false);
        setEditingInterview(null);
        setNewInterview({
          interviewDate: '',
          interviewTime: '',
          durationMinutes: '60',
          interviewMode: 'video',
          meetingLink: '',
          notes: '',
          interviewType: 'general'
        });

        toast({
          title: "Interview Scheduled",
          description: "Interview has been scheduled successfully",
        });
      } else {
        throw new Error(result.message || 'Failed to schedule interview');
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast({
        title: "Error",
        description: `Failed to schedule interview: ${error.message}`,
        variant: "destructive"
      });
    } finally {
      setScheduleLoading(false);
    }
  };

  const openScheduleModal = (interview?: Interview) => {
    if (interview) {
      setEditingInterview(interview);
      setNewInterview({
        interviewDate: interview.data ? formatDateToString(new Date(interview.data)) : '',
        interviewTime: interview.time || '',
        durationMinutes: '60',
        interviewMode: interview.interviewMode,
        meetingLink: interview.meetingLink || '',
        notes: interview.instructions || '',
        interviewType: interview.interviewType
      });
    } else {
      setEditingInterview(null);
      setNewInterview({
        interviewDate: '',
        interviewTime: '',
        durationMinutes: '60',
        interviewMode: 'video',
        meetingLink: '',
        notes: '',
        interviewType: 'general'
      });
    }
    setIsScheduleModalOpen(true);
  };

  // Handle calendar date selection - filters interviews for selected date
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setShowCalendar(false);
  };

  // Get interviews for selected date from calendar
  const getInterviewsForSelectedDate = () => {
    if (!date) return [];
    return filterInterviewsByDate(interviews, date).map(formatInterviewForDisplay);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      interviewType: 'all',
      interviewMode: 'all',
      status: 'all',
      result: 'all'
    });
  };

  // Render loading state
  const renderLoadingState = () => (
    <LoadingState LoadingStateMessage='interviews...' />
  );

  // Render error state
  const renderErrorState = () => (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="text-red-500 mb-4">
          <CalendarIcon className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load interviews</h3>
        <p className="text-gray-500 mb-4">{interviewError}</p>
        <Button onClick={getInterviews} variant="outline">
          Try Again
        </Button>
      </CardContent>
    </Card>
  );

  // Render interview card - reusable component
  const renderInterviewCard = (interview: any) => {
    const isUnscheduled = interview.isScheduled === 0;
    const statusColors = {
      pass: 'bg-green-500 text-white',
      fail: 'bg-red-500 text-white',
      pending: 'bg-yellow-500 text-white'
    };
    return (
      <Card
        key={interview.id}
        className={`
          hover:shadow-md 
          transition-shadow 
          ${interview.cardStyle} 
          ${isUnscheduled ? 'cursor-pointer' : ''} 
          ${interview.status === 'cancelled' ? 'opacity-80 pointer-events-none' : ''}
        `}
        onClick={() => isUnscheduled && openScheduleModal(interview)}
      >
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarImage src={interview.candidatePhoto} alt={interview.candidateName} />
                  <AvatarFallback>{interview.candidateName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-lg font-medium truncate ${isUnscheduled ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                    {interview.candidateName}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{interview.position}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge
                      variant={interview.badgeVariant}
                      className={isUnscheduled ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
                    >
                      {isUnscheduled && <CalendarDays className="w-3 h-3 mr-1" />}
                      {interview.statusBadge}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {interview.interviewType}
                    </Badge>
                    <Badge variant="outline" className="text-xs truncate max-w-[120px]">
                      {interview.jobTitle}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={statusColors[interview.result] || 'bg-gray-300'}
                    >
                      {interview.result}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full sm:w-auto justify-end">
                {isUnscheduled ? (
                  <Button
                    size="sm"
                    className="bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2 w-full sm:w-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      openScheduleModal(interview);
                    }}
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span className="hidden xs:inline">Schedule Now</span>
                  </Button>
                ) : interview.meetingLink && interview.status !== 'cancelled' && interview.result === 'pending' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90 border-accent w-full sm:w-auto"
                    asChild
                  >
                    <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Video className="w-4 h-4" />
                      <span className="hidden xs:inline">Join Call</span>
                    </a>
                  </Button>
                ) : ''}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{interview.displayTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{interview.displayLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{interview.displayDate}</span>
              </div>
            </div>

            {interview.jobTitle && (
              <div className="text-sm text-gray-700 flex space-x-2 items-start">
                <span className="font-semibold text-gray-600">Interview for:</span>
                <span className="text-gray-900 line-clamp-2">{interview.jobTitle}</span>
              </div>
            )}

            {interview.instructions && (
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-gray-600 mb-1">Instructions:</p>
                <pre className="text-gray-900 line-clamp-2">{interview.instructions}</pre>
              </div>
            )}

            <div className="flex flex-wrap gap-2 justify-end">
              {!isUnscheduled && interview.status !== 'cancelled' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    openResultModal(interview);
                  }}
                  className="flex items-center gap-2 bg-accent text-white hover:bg-accent/90 border-accent w-full sm:w-auto"
                >
                  Update Result
                </Button>
              )}

              {interview.result === 'pending' && <Button
                variant="outline"
                size="sm"
                disabled={interview.status === 'cancelled'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleInterviewCancel(interview.id);
                }}
                className={`
                  text-red-600 
                  hover:text-red-700 
                  hover:bg-red-50
                  ${interview.status === 'cancelled' ? 'bg-red-50 text-gray-400' : ''}
                  disabled:opacity-50 
                  disabled:cursor-not-allowed 
                  disabled:hover:bg-red-50
                `}
              >
                {interview.status !== 'cancelled' ? 'Cancel' : 'Cancelled'}
              </Button>}

            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAllView = () => {
    if (interviewLoading) return renderLoadingState();
    if (interviewError) return renderErrorState();

    const filteredInterviews = filterInterviews(interviews).map(formatInterviewForDisplay);

    return (
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? filteredInterviews.map(renderInterviewCard) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No interviews found matching your filters.
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderDayView = () => {
    if (interviewLoading) return renderLoadingState();
    if (interviewError) return renderErrorState();

    const selectedDate = date || getTodayDate();
    const dayInterviews = filterInterviewsByDate(interviews, selectedDate);
    const filteredInterviews = filterInterviews(dayInterviews).map(formatInterviewForDisplay);

    return (
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? filteredInterviews.map(renderInterviewCard) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No interviews scheduled for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    if (interviewLoading) return renderLoadingState();
    if (interviewError) return renderErrorState();

    const weekRange = getWeekRange();
    const weekInterviews = interviews.filter(interview => {
      if (interview.isScheduled === 0) return false;
      if (!interview.data) return false;

      const interviewDate = new Date(interview.data);
      return interviewDate >= weekRange.start && interviewDate <= weekRange.end;
    });

    const filteredInterviews = filterInterviews(weekInterviews).map(formatInterviewForDisplay);

    return (
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? filteredInterviews.map(renderInterviewCard) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No interviews scheduled for this week.
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderMonthView = () => {
    if (interviewLoading) return renderLoadingState();
    if (interviewError) return renderErrorState();

    const monthRange = getMonthRange();
    const monthInterviews = interviews.filter(interview => {
      if (interview.isScheduled === 0) return false;
      if (!interview.data) return false;

      const interviewDate = new Date(interview.data);
      return interviewDate >= monthRange.start && interviewDate <= monthRange.end;
    });

    const filteredInterviews = filterInterviews(monthInterviews).map(formatInterviewForDisplay);

    return (
      <div className="space-y-4">
        {filteredInterviews.length > 0 ? filteredInterviews.map(renderInterviewCard) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No interviews scheduled for this month.
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Interviews</h1>
            <p className="text-gray-600 mt-1">Schedule and manage candidate interviews</p>
          </div>
          <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
            <DialogContent className="max-w-2xl w-[95vw] sm:w-full">
              <DialogHeader>
                <DialogTitle>
                  {editingInterview ? 'Schedule Interview' : 'Schedule New Interview'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="interviewDate">Date</Label>
                    <Input
                      id="interviewDate"
                      type="date"
                      value={newInterview.interviewDate}
                      onChange={(e) => setNewInterview({ ...newInterview, interviewDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="interviewTime">Time</Label>
                    <Input
                      id="interviewTime"
                      type="time"
                      value={newInterview.interviewTime}
                      onChange={(e) => setNewInterview({ ...newInterview, interviewTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                    <Select
                      value={newInterview.durationMinutes}
                      onValueChange={(value) => setNewInterview({ ...newInterview, durationMinutes: value })}
                    >
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
                    <Label htmlFor="interviewMode">Interview Mode</Label>
                    <Select
                      value={newInterview.interviewMode}
                      onValueChange={(value) => setNewInterview({ ...newInterview, interviewMode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="audio">Audio Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
                  <Input
                    id="meetingLink"
                    value={newInterview.meetingLink}
                    onChange={(e) => setNewInterview({ ...newInterview, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  />
                </div>

                <div>
                  <Label htmlFor="interviewType">Interview Type</Label>
                  <Select
                    value={newInterview.interviewType}
                    onValueChange={(value) => setNewInterview({ ...newInterview, interviewType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="combined">Combined</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={newInterview.notes}
                    onChange={(e) => setNewInterview({ ...newInterview, notes: e.target.value })}
                    placeholder="Additional notes for the interview"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleScheduleInterview}
                  className="w-full bg-secondary-c opacity-80 hover:opacity-100 transition-opacity duration-200"
                  disabled={!editingInterview || scheduleLoading}
                >
                  {scheduleLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingInterview ? 'Update Interview' : 'Schedule Interview'}
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Result Update Modal */}
        <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
          <DialogContent className="max-w-md w-[95vw] sm:w-full">
            <DialogHeader>
              <DialogTitle>Update Interview Result</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Candidate Info */}
              {selectedInterview && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedInterview.candidatePhoto} alt={selectedInterview.candidateName} />
                    <AvatarFallback>{selectedInterview.candidateName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedInterview.candidateName}</h4>
                    <p className="text-sm text-gray-600">{selectedInterview.position}</p>
                  </div>
                </div>
              )}

              {/* Status Selection */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) => {
                    setSelectedStatus(value);
                    // Reset result when status changes to completed
                    if (value === 'completed') {
                      setSelectedResult('');
                    } else if (value === 'cancelled' || value === 'missing') {
                      setSelectedResult('pending');
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="missing">Missing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Result Selection - Only show when status is completed */}
              {selectedStatus === 'completed' && (
                <div>
                  <Label htmlFor="result">Result *</Label>
                  <Select
                    value={selectedResult}
                    onValueChange={setSelectedResult}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Required for completed interviews</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsResultModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedInterview) {
                      handleInterviewResultUpdate(
                        selectedInterview.id,
                        selectedStatus,
                        selectedStatus === 'completed' ? selectedResult : undefined
                      );
                      setIsResultModalOpen(false);
                    }
                  }}
                  disabled={selectedStatus === 'completed' && !selectedResult}
                  className="flex-1 items-center gap-2 bg-accent text-white hover:bg-accent/90 border-accent w-full sm:w-auto"
                >
                  Update
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1 space-y-4">
            {/* Calendar Button */}
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <CalendarIcon className="w-4 h-4" />
              {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            </Button>

            {/* Calendar */}
            {showCalendar && (
              <Card>
                <CardContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="border-0"
                  />
                  {/* Show interviews for selected date */}
                  {date && (
                    <div className="p-4 border-t">
                      <h4 className="font-medium mb-2 text-sm">
                        Interviews for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </h4>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {getInterviewsForSelectedDate().length > 0 ? (
                          getInterviewsForSelectedDate().map(interview => (
                            <div key={interview.id} className="text-sm p-2 bg-gray-50 rounded flex items-center gap-2">
                              <Avatar className="w-6 h-6 flex-shrink-0">
                                <AvatarImage src={interview.candidatePhoto} alt={interview.candidateName} />
                                <AvatarFallback>{interview.candidateName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium truncate">{interview.candidateName}</div>
                                <div className="text-gray-500 text-xs truncate">{interview.displayTime}</div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 text-center py-2">
                            No interviews for this date
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4" />
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="ml-auto text-xs">
                    Reset
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="interviewType" className="text-sm">Interview Type</Label>
                    <Select
                      value={filters.interviewType}
                      onValueChange={(value) => setFilters({ ...filters, interviewType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="combined">Combined</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="interviewMode" className="text-sm">Interview Mode</Label>
                    <Select
                      value={filters.interviewMode}
                      onValueChange={(value) => setFilters({ ...filters, interviewMode: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-sm">Status</Label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => setFilters({ ...filters, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="missing">Missing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="result" className="text-sm">Result</Label>
                    <Select
                      value={filters.result}
                      onValueChange={(value) => setFilters({ ...filters, result: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Results</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="pass">Pass</SelectItem>
                        <SelectItem value="fail">Fail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <TabsList className="w-full sm:w-auto grid grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
                <div className="text-sm font-medium text-gray-700">
                  {date?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                {renderAllView()}
              </TabsContent>

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
    </div>
  );
};

export default Interviews;