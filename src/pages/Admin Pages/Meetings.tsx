import { useAdminStore } from '@/store/Admin store/AdminStore';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, RefreshCw, Filter, User, Eye, CheckCircle2, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { fetchEmployerData } from '@/services/employerService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EmployerProfileView from '@/components/profile-employer/EmployerProfileView';

interface Meeting {
    id: number;
    employer_uid: string;
    fullName: string;
    email: string;
    phone: string;
    roleNeed: string | null;
    notes: string | null;
    type: string;
    isRead: number;
    created_at: string;
}

const Meetings = () => {
    const { getMeetings, setMeeingReaded } = useAdminStore();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();
    const [searchTerm, setSearchTerm] = useState('');
    const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');
    const [dateSort, setDateSort] = useState<'newest' | 'oldest'>('newest');
    const [activeTab, setActiveTab] = useState('all');

    const [selectedEmployer, setSelectedEmployer] = useState<any>(null);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    useEffect(() => {
        fetchMeetings();
    }, []);

    useEffect(() => {
        filterAndSortMeetings();
    }, [meetings, searchTerm, readFilter, dateSort, activeTab]);

    const fetchMeetings = async () => {
        await getMeetings(setMeetings, setLoading, setError);
    }

    const filterAndSortMeetings = () => {
        let filtered = meetings.filter(meeting => {
            // Search filter
            const matchesSearch = searchTerm === '' ||
                meeting.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (meeting.roleNeed && meeting.roleNeed.toLowerCase().includes(searchTerm.toLowerCase()));

            // Read status filter
            const matchesReadFilter = readFilter === 'all' ||
                (readFilter === 'read' && meeting.isRead === 1) ||
                (readFilter === 'unread' && meeting.isRead === 0);

            // Tab filter
            const matchesTab = activeTab === 'all' ||
                (activeTab === 'unread' && meeting.isRead === 0) ||
                (activeTab === 'remote' && meeting.type === 'remote_team_management') ||
                (activeTab === 'hiring' && meeting.type === 'hiring_requirements');

            return matchesSearch && matchesReadFilter && matchesTab;
        });

        // Date sorting
        filtered = filtered.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFilteredMeetings(filtered);
    }

    const handleSearch = () => {
        filterAndSortMeetings();
    }

    const handleResetFilters = () => {
        setSearchTerm('');
        setReadFilter('all');
        setDateSort('newest');
        setActiveTab('all');
    }

    // const handleViewProfile = async (meeting: Meeting) => {

    //     const data = await fetchEmployerData(meeting.employer_uid);
    //     console.log('data =>', data)
    //     console.log('View profile for:', meeting);
    //     toast.info(`Viewing profile for ${meeting.fullName}`);
    // }

    // Update the handleViewProfile function
    const handleViewProfile = async (meeting: Meeting) => {
        try {
            const data = await fetchEmployerData(meeting.employer_uid);
            console.log('data =>', data);
            setSelectedEmployer(data);
            setProfileDialogOpen(true);
            toast.info(`Viewing profile for ${meeting.fullName}`);
        } catch (error) {
            console.error('Error fetching employer data:', error);
            toast.error('Failed to load employer profile');
        }
    };
    const markAsRead = async (meetingId: number) => {
        try {
            setMeetings(prev => prev.map(meeting =>
                meeting.id === meetingId ? { ...meeting, isRead: 1 } : meeting
            ));
            await setMeeingReaded(meetingId);
            toast.success('Meeting marked as read');
        } catch (error) {
            toast.error('Failed to mark meeting as read');
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const getTypeBadgeVariant = (type: string) => {
        const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
            'remote_team_management': 'outline',
            'hiring_requirements': 'secondary',
            'technical_consultation': 'outline',
            'general': 'outline'
        };
        return variants[type] || 'outline';
    }

    const getStatusVariant = (isRead: number) => {
        return isRead === 0 ? 'default' : 'secondary';
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Card>
                    <CardHeader>
                        <div className="flex gap-4">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center space-x-4 py-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto">
                <Card className="border-destructive/50">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-destructive">Error loading meetings</h3>
                                <p className="text-sm text-muted-foreground">{error}</p>
                            </div>
                            <Button onClick={fetchMeetings} variant="outline">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Retry
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const hasActiveFilters = searchTerm !== '' || readFilter !== 'all' || dateSort !== 'newest' || activeTab !== 'all';

    return (
        <div className=" mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Meeting Requests</h1>
                <p className="text-muted-foreground">
                    Manage and review all meeting requests from candidates
                </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                {/* <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                    <TabsTrigger value="all">All Meetings</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="remote">Remote Team</TabsTrigger>
                    <TabsTrigger value="hiring">Hiring</TabsTrigger>
                </TabsList> */}

                <TabsContent value={activeTab} className="space-y-6">
                    {/* Search and Filters Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filters & Search
                            </CardTitle>
                            <CardDescription>
                                Refine your meeting requests using the filters below
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col lg:flex-row gap-4">
                                {/* Search Input */}
                                <div className="flex-1 flex gap-2">
                                    <Input
                                        placeholder="Search by name or role needed..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSearch} className='bg-secondary-c hover:opacity-90'>
                                        <Search className="w-4 h-4 mr-2" />
                                        Search
                                    </Button>
                                </div>

                                {/* Filters */}
                                <div className="flex gap-2">
                                    <Select value={readFilter} onValueChange={(value: 'all' | 'read' | 'unread') => setReadFilter(value)}>
                                        <SelectTrigger className="w-32">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="unread">Unread</SelectItem>
                                            <SelectItem value="read">Read</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select value={dateSort} onValueChange={(value: 'newest' | 'oldest') => setDateSort(value)}>
                                        <SelectTrigger className="w-40">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">Newest First</SelectItem>
                                            <SelectItem value="oldest">Oldest First</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        onClick={handleResetFilters}
                                        disabled={!hasActiveFilters}
                                        variant="outline"
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>

                            {/* Active Filters Indicator */}
                            {hasActiveFilters && (
                                <div className="flex items-center gap-2 mt-4 flex-wrap">
                                    <span className="text-sm text-muted-foreground">Active filters:</span>
                                    {searchTerm && (
                                        <Badge variant="secondary" className="flex items-center gap-1">
                                            <Search className="w-3 h-3" />
                                            "{searchTerm}"
                                        </Badge>
                                    )}
                                    {readFilter !== 'all' && (
                                        <Badge variant="secondary">
                                            Status: {readFilter}
                                        </Badge>
                                    )}
                                    {dateSort !== 'newest' && (
                                        <Badge variant="secondary">
                                            Sort: {dateSort === 'oldest' ? 'Oldest First' : 'Newest First'}
                                        </Badge>
                                    )}
                                    {activeTab !== 'all' && (
                                        <Badge variant="secondary">
                                            Tab: {activeTab}
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results Summary and Refresh */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{filteredMeetings.length}</span> of{' '}
                            <span className="font-semibold text-foreground">{meetings.length}</span> meetings
                        </div>
                        <Button onClick={fetchMeetings} variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {/* Meetings Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table className="rounded-xl overflow-hidden">
                                <TableHeader className="bg-secondary-c overflow-hidden">
                                    <TableRow>
                                        <TableHead className="w-20 text-white overflow-hidden">Status</TableHead>
                                        <TableHead className="text-white">Candidate</TableHead>
                                        <TableHead className="text-white">Contact</TableHead>
                                        <TableHead className="text-white">Role Needed</TableHead>
                                        <TableHead className="text-white">Meeting Type</TableHead>
                                        <TableHead className="text-white">Request Date</TableHead>
                                        <TableHead className="w-32 text-white">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredMeetings.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-32 text-center">
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <User className="w-12 h-12 text-muted-foreground/50" />
                                                    <div className="space-y-1">
                                                        <p className="font-medium">No meetings found</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Try adjusting your search or filters
                                                        </p>
                                                    </div>
                                                    {hasActiveFilters && (
                                                        <Button onClick={handleResetFilters} size="sm">
                                                            Clear all filters
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredMeetings.map((meeting) => (
                                            <TableRow
                                                key={meeting.id}
                                                className={meeting.isRead === 0 ? 'bg-secondary/50' : ''}
                                            >
                                                <TableCell>
                                                    <Badge
                                                        variant={getStatusVariant(meeting.isRead)}
                                                        className={meeting.isRead === 0 ? 'animate-pulse' : ''}
                                                    >
                                                        {meeting.isRead === 0 ? (
                                                            <span className="flex items-center gap-1">
                                                                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                                                New
                                                            </span>
                                                        ) : (
                                                            'Viewed'
                                                        )}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                                                {meeting.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="font-medium">{meeting.fullName}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="font-medium">{meeting.email}</div>
                                                        <div className="text-sm text-muted-foreground">{meeting.phone}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {meeting.roleNeed || (
                                                        <span className="text-muted-foreground italic">Not specified</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant='secondary'>
                                                        {meeting.type.replace(/_/g, ' ')}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                                        {formatDate(meeting.created_at)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            onClick={() => handleViewProfile(meeting)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 px-2"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        {meeting.isRead === 0 && (
                                                            <Button
                                                                onClick={() => markAsRead(meeting.id)}
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 px-2"
                                                            >
                                                                <CheckCircle2 className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Employer Profile</DialogTitle>
                    </DialogHeader>
                    {selectedEmployer && (
                        <EmployerProfileView employerData={selectedEmployer} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Meetings;