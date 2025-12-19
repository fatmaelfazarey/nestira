import { fetchAllRecruiters } from '@/services/employerService';
import React, { useEffect, useState, useMemo } from 'react';
import { Search, SortAsc, SortDesc, User, Calendar, Building, MessageSquare, Eye, Trash2, Mail, Phone, Briefcase, Filter, MoreVertical, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStore } from '@/store/Admin store/AdminStore';
import ChatPopup from '@/components/Chat/ChatPopup';
import { useAuth } from '@/contexts/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';

interface StaticJobData {
    recruiterId: string;
    numberOfJobs: number;
}

interface Recruiter {
    id: string;
    uid: string;
    email: string;
    role: string;
    recruiterType?: string;
    isActive?: boolean;
    profileCompletion?: number;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    personalInfo: {
        fullName: string;
        rolePosition?: string;
        phone?: string;
        businessEmail?: string;
        profilePhoto?: string;
    };
    companyInfo?: {
        companyName?: string;
        companyType?: string;
        companySize?: string;
        industry?: string;
        websiteUrl?: string;
        yearFounded?: string;
    };
    numberOfJobs?: number;
}

const Employers = () => {
    const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchRole, setSearchRole] = useState('');
    const [sortConfig, setSortConfig] = useState<{
        key: 'name' | 'joinDate';
        direction: 'asc' | 'desc';
    }>({ key: 'name', direction: 'asc' });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
    const [staticJobsData, setStaticJobsData] = useState<StaticJobData[]>([]);
    const [showChatPopup, setShowChatPopup] = useState(false);
    const [chatRecruiter, setChatRecruiter] = useState<Recruiter | null>(null);

    const { RecruitersJobsCount } = useAdminStore();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecruitersData();
        fetchRecruitersJobsCount();
    }, []);

    useEffect(() => {
        if (staticJobsData.length > 0 && recruiters.length > 0) {
            const updatedRecruiters = recruiters.map(recruiter => {
                const jobData = staticJobsData.find(job => job.recruiterId === recruiter.id);
                return {
                    ...recruiter,
                    numberOfJobs: jobData?.numberOfJobs || 0
                };
            });
            setRecruiters(updatedRecruiters);
        }
    }, [staticJobsData, recruiters.length]);

    const fetchRecruitersData = async () => {
        try {
            setLoading(true);
            const recruiterList = await fetchAllRecruiters();
            setRecruiters(recruiterList);
        } catch (error) {
            toast.error('Failed to fetch recruiters');
            console.error('Error fetching recruiters:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecruitersJobsCount = async () => {
        try {
            const result = await RecruitersJobsCount();
            if (result.success) {
                setStaticJobsData(result.data);
            } else {
                toast.error('Failed to fetch jobs count');
            }
        } catch (error) {
            toast.error('Error fetching jobs count');
            console.error('Error fetching jobs count:', error);
        }
    };

    const getRecruiterJobCount = (recruiterId: string): number => {
        const jobData = staticJobsData.find(job => job.recruiterId === recruiterId);
        return jobData?.numberOfJobs || 0;
    };

    const handleSort = (key: 'name' | 'joinDate') => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleViewProfile = (recruiter: Recruiter) => {
        navigate(recruiter.uid)
        console.log('View profile:', recruiter);
        toast.success(`Viewing ${recruiter.personalInfo.fullName}'s profile`);
    };

    const handleChat = (recruiter: Recruiter) => {
        setChatRecruiter(recruiter);
        setShowChatPopup(true);
    };

    const handleCloseChatPopup = () => {
        setShowChatPopup(false);
        setChatRecruiter(null);
    };

    const handleDelete = (recruiter: Recruiter) => {
        setSelectedRecruiter(recruiter);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedRecruiter) return;

        try {
            toast.success(`Recruiter ${selectedRecruiter.personalInfo.fullName} deleted successfully`);
            setDeleteDialogOpen(false);
            setSelectedRecruiter(null);
            await fetchRecruitersData();
        } catch (error) {
            toast.error('Failed to delete recruiter');
        }
    };

    const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
        try {
            const date = new Date(timestamp.seconds * 1000);
            return format(date, 'dd MMM yyyy');
        } catch (error) {
            return 'Invalid date';
        }
    };

    const getInitials = (name: string) => {
        if (!name) return 'NA';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const filteredAndSortedRecruiters = useMemo(() => {
        let result = [...recruiters];

        if (searchTerm) {
            result = result.filter(recruiter =>
                recruiter.personalInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recruiter.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (searchRole) {
            result = result.filter(recruiter =>
                recruiter.personalInfo?.rolePosition?.toLowerCase().includes(searchRole.toLowerCase())
            );
        }

        result.sort((a, b) => {
            let aValue: string | number = '';
            let bValue: string | number = '';

            if (sortConfig.key === 'name') {
                aValue = a.personalInfo?.fullName?.toLowerCase() || '';
                bValue = b.personalInfo?.fullName?.toLowerCase() || '';
            } else if (sortConfig.key === 'joinDate') {
                aValue = a.createdAt?.seconds || 0;
                bValue = b.createdAt?.seconds || 0;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [recruiters, searchTerm, searchRole, sortConfig]);

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <div className="mb-8">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between py-4 border-b">
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <Skeleton className="h-8 w-24" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Recruiters Management</h1>
                <p className="text-muted-foreground mt-2">
                    Manage and view all recruiters in the system
                </p>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Recruiters List</CardTitle>
                    <CardDescription>
                        Search, filter, and manage all recruiters
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Filter by role position..."
                                value={searchRole}
                                onChange={(e) => setSearchRole(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="w-[25%]">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSort('name')}
                                            className="font-medium hover:bg-transparent px-0 h-auto"
                                        >
                                            Personal Info
                                            {sortConfig.key === 'name' && (
                                                sortConfig.direction === 'asc' ?
                                                    <SortAsc className="ml-2 h-4 w-4" /> :
                                                    <SortDesc className="ml-2 h-4 w-4" />
                                            )}
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[15%]">Contact</TableHead>
                                    <TableHead className="w-[15%]">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleSort('joinDate')}
                                            className="font-medium hover:bg-transparent px-0 h-auto"
                                        >
                                            Join Date
                                            {sortConfig.key === 'joinDate' && (
                                                sortConfig.direction === 'asc' ?
                                                    <SortAsc className="ml-2 h-4 w-4" /> :
                                                    <SortDesc className="ml-2 h-4 w-4" />
                                            )}
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[15%]">Company</TableHead>
                                    <TableHead className="w-[10%]">Type</TableHead>
                                    <TableHead className="w-[8%]">Jobs</TableHead>
                                    <TableHead className="w-[12%] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAndSortedRecruiters.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <User className="h-12 w-12 text-muted-foreground mb-4" />
                                                <h3 className="text-lg font-medium">No recruiters found</h3>
                                                <p className="text-muted-foreground mt-1">
                                                    {searchTerm || searchRole ? 'Try adjusting your search filters' : 'No recruiters in the system yet'}
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredAndSortedRecruiters.map((recruiter) => {
                                        const jobCount = getRecruiterJobCount(recruiter.id);
                                        // console.log(recruiter.personalInfo?.profilePhoto)

                                        return (
                                            <TableRow key={recruiter.id} className="hover:bg-muted/50">
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border">
                                                            <AvatarImage
                                                                src={recruiter.personalInfo?.profilePhoto}
                                                                alt={recruiter.personalInfo?.fullName}
                                                            />
                                                            <AvatarFallback className="bg-secondary-c text-white">
                                                                {getInitials(recruiter.personalInfo?.fullName || '')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium flex items-center gap-2">
                                                                {recruiter.personalInfo?.fullName || 'No Name'}
                                                                {/* {recruiter.isActive ? (
                                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                                ) : (
                                                                    <XCircle className="h-3 w-3 text-red-500" />
                                                                )} */}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                                <Briefcase className="h-3 w-3" />
                                                                {recruiter.personalInfo?.rolePosition || 'No role specified'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                            <Mail className="h-3 w-3" />
                                                            <span className="truncate">{recruiter.email}</span>
                                                        </div>
                                                        {recruiter.personalInfo?.phone && (
                                                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                                <Phone className="h-3 w-3" />
                                                                {recruiter.personalInfo.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        {formatDate(recruiter.createdAt)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {recruiter.companyInfo?.companyName ? (
                                                        <div className="flex items-center gap-2">
                                                            <Building className="h-4 w-4 text-muted-foreground" />
                                                            <span className="truncate">{recruiter.companyInfo.companyName}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">No company</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {recruiter.recruiterType || 'N/A'}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                        {jobCount}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleViewProfile(recruiter)}>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleChat(recruiter)}>
                                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                                Start Chat
                                                            </DropdownMenuItem>
                                                            {/* {recruiter.companyInfo?.websiteUrl && (
                                                                <DropdownMenuItem onClick={() => window.open(recruiter.companyInfo?.websiteUrl, '_blank')}>
                                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                                    Visit Website
                                                                </DropdownMenuItem>
                                                            )} */}
                                                            {recruiter.companyInfo?.websiteUrl && (
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        let url = recruiter.companyInfo.websiteUrl;
                                                                        if (!/^https?:\/\//i.test(url)) {
                                                                            url = 'https://' + url;
                                                                        }
                                                                        window.open(url, '_blank');
                                                                    }}
                                                                >
                                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                                    Visit Website
                                                                </DropdownMenuItem>
                                                            )}


                                                            {/* <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() => handleDelete(recruiter)}
                                                                className="text-red-600 focus:text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete Recruiter
                                                            </DropdownMenuItem> */}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredAndSortedRecruiters.length} of {recruiters.length} recruiters
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the recruiter
                            account for {selectedRecruiter?.personalInfo?.fullName} and remove all
                            their data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {chatRecruiter && currentUser && (
                <ChatPopup
                    currentUserId={currentUser.uid}
                    otherUserId={chatRecruiter.id}
                    profilePhoto={chatRecruiter.personalInfo.profilePhoto}
                    otherUserName={chatRecruiter.personalInfo?.fullName}
                    otherUserTitle={chatRecruiter.personalInfo?.rolePosition}
                    isOpen={showChatPopup}
                    onClose={handleCloseChatPopup}
                />
            )}
        </div>
    );
};

export default Employers;