import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Mail, CheckCircle, Trash2, MoreVertical, User, Briefcase, GraduationCap, MapPin, Eye, Search, Filter, Check, X, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Candidate, fetchCandidates, verifyCandidate } from '@/services/cadidatesService';
import { useAdminStore } from '@/store/Admin store/AdminStore';
import { useNavigate } from 'react-router-dom';
import ChatPopup from '@/components/Chat/ChatPopup';
import { useAuth } from '@/contexts/AuthContext';
import EmailPopup from '@/components/Admin components/EmailPopup';

// Types
type VerificationFilter = 'all' | 'verified' | 'unverified';

// Custom hooks for better organization
const useCandidates = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);

    const loadCandidates = async () => {
        try {
            setLoading(true);
            const candidatesData = await fetchCandidates();
            setCandidates(candidatesData);
        } catch (error) {
            console.error("Error loading candidates:", error);
            toast.error("Failed to load candidates");
        } finally {
            setLoading(false);
        }
    };

    return {
        candidates,
        loading,
        loadCandidates,
        setCandidates
    };
};

const useCandidateActions = (refreshCandidates: () => void) => {
    const { generateCandidatesEmbeddings, sendVerificationMail, deleteCandidate } = useAdminStore();
    const navigate = useNavigate();

    const handleVerify = async (candidate: Candidate) => {
        try {
            await verifyCandidate(candidate.id);
            await generateCandidatesEmbeddings(candidate.id);
            await sendVerificationMail(candidate.id, {
                recipientName: candidate.basicInfo.fullName,
                recipientEmail: candidate.email
            });
            refreshCandidates();
            toast.success("Candidate verified successfully");
        } catch (error) {
            console.error('Error verifying candidate:', error);
            toast.error("Failed to verify candidate");
        }
    };

    const handleDelete = async (candidateId: string) => {
        if (!confirm('Are you sure you want to delete this candidate?')) return;

        try {
            await deleteCandidate(candidateId);
            refreshCandidates();
            toast.success("Candidate deleted successfully");
        } catch (error) {
            console.error('Error deleting candidate:', error);
            toast.error("Failed to delete candidate");
        }
    };

    const viewProfile = (candidate: Candidate) => {
        navigate(`/admin/candidate-profile/${candidate.id}`);
    };

    return {
        handleVerify,
        handleDelete,
        viewProfile
    };
};

// Helper functions
const formatDate = (date: any): string => {
    if (!date) return 'N/A';

    if (date && typeof date === 'object') {
        if ('toDate' in date) {
            return date.toDate().toLocaleDateString();
        } else if (date instanceof Date) {
            return date.toLocaleDateString();
        }
    }
    return 'N/A';
};

// Sub-components for better organization
const CandidateAvatar: React.FC<{ candidate: Candidate; size?: 'sm' | 'md' | 'lg' }> = ({
    candidate,
    size = 'md'
}) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const profilePhoto = candidate.basicInfo.profilePhoto || candidate.profilePhoto;

    return profilePhoto ? (
        <img
            src={profilePhoto}
            alt={candidate.basicInfo.fullName}
            className={`${sizes[size]} rounded-full object-cover border-2 ${candidate.isVerified ? 'border-green-500' : 'border-secondary-c/50'
                }`}
        />
    ) : (
        <div className={`${sizes[size]} rounded-full bg-secondary-c/10 flex items-center justify-center border-2 ${candidate.isVerified ? 'border-green-500' : 'border-secondary-c/50'
            }`}>
            <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} text-secondary-c`} />
        </div>
    );
};

const VerificationBadge: React.FC<{ isVerified: boolean }> = ({ isVerified }) => (
    <Badge
        variant={isVerified ? "default" : "outline"}
        className={`${isVerified
            ? 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200'
            : 'bg-secondary-c/10 text-secondary-c border-secondary-c/20'
            } font-medium`}
    >
        {isVerified ? (
            <>
                <Check className="w-3 h-3 mr-1" />
                Verified
            </>
        ) : (
            <>
                <X className="w-3 h-3 mr-1" />
                Unverified
            </>
        )}
    </Badge>
);

const CandidateInfo: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div className="flex items-center space-x-3">
        <CandidateAvatar candidate={candidate} />
        <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
                <span className="font-medium truncate text-gray-900">{candidate.basicInfo.fullName}</span>
                <VerificationBadge isVerified={candidate.isVerified} />
            </div>
            <div className="text-sm text-gray-500 truncate">
                {candidate.basicInfo.role || candidate.preferences?.jobTitles?.[0] || 'No role specified'}
            </div>
        </div>
    </div>
);

const ContactInfo: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div>
        <div className="text-sm truncate text-gray-700">{candidate.email}</div>
        <div className="text-sm text-gray-500">
            {candidate.basicInfo.phone || 'No phone'}
        </div>
    </div>
);

const CompletionBadge: React.FC<{ completion: number }> = ({ completion }) => (
    <div className="flex items-center space-x-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className={`h-2 rounded-full transition-all ${completion >= 80 ? 'bg-green-500' :
                    completion >= 50 ? 'bg-secondary-c' : 'bg-orange-500'
                    }`}
                style={{ width: `${completion}%` }}
            />
        </div>
        <span className="text-sm min-w-[40px] font-medium">{completion}%</span>
    </div>
);

const ActionDropdown: React.FC<{
    candidate: Candidate;
    onVerify: (candidate: Candidate) => void;
    onDelete: (id: string) => void;
    onEmail: (candidate: Candidate) => void;
    onViewProfile: (candidate: Candidate) => void;
    onStartChat: (candidate: Candidate) => void;
}> = ({ candidate, onVerify, onDelete, onEmail, onViewProfile, onStartChat }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => onViewProfile(candidate)} className="cursor-pointer">
                <Eye className="w-4 h-4 mr-2" />
                View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStartChat(candidate)} className="cursor-pointer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
            </DropdownMenuItem>
            {!candidate.isVerified && (
                <DropdownMenuItem onClick={() => onVerify(candidate)} className="cursor-pointer">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify
                </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onEmail(candidate)} className="cursor-pointer">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
            </DropdownMenuItem>




            {!candidate.isVerified && (
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => onDelete(candidate.id)}
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Candidate
                    </DropdownMenuItem>
                </>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
);

// Search and Filter Bar Component
const SearchFilterBar: React.FC<{
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filter: VerificationFilter;
    onFilterChange: (value: VerificationFilter) => void;
    totalCandidates: number;
    verifiedCount: number;
    unverifiedCount: number;
}> = ({
    searchQuery,
    onSearchChange,
    filter,
    onFilterChange,
    totalCandidates,
    verifiedCount,
    unverifiedCount
}) => (
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 md:items-center w-full">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search candidates by name..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9 border-gray-300 focus:border-secondary-c"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                        <Button
                            variant={filter === 'all' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onFilterChange('all')}
                            className={`px-3 ${filter === 'all'
                                ? 'bg-secondary-c text-white hover:bg-secondary-c/90 shadow-sm'
                                : 'text-gray-700 hover:text-secondary-c'
                                }`}
                        >
                            All ({totalCandidates})
                        </Button>
                        <Button
                            variant={filter === 'verified' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onFilterChange('verified')}
                            className={`px-3 ${filter === 'verified'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200'
                                : 'text-gray-700 hover:text-green-700'
                                }`}
                        >
                            Verified ({verifiedCount})
                        </Button>
                        <Button
                            variant={filter === 'unverified' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onFilterChange('unverified')}
                            className={`px-3 ${filter === 'unverified'
                                ? 'bg-secondary-c/10 text-secondary-c hover:bg-secondary-c/20 border-secondary-c/20'
                                : 'text-gray-700 hover:text-secondary-c'
                                }`}
                        >
                            Unverified ({unverifiedCount})
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

// Stats Component
const StatsOverview: React.FC<{
    total: number;
    verified: number;
    unverified: number;
}> = ({ total, verified, unverified }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-secondary-c/20 shadow-sm">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Candidates</p>
                        <p className="text-2xl font-bold text-gray-900">{total}</p>
                    </div>
                    <div className="p-3 rounded-full bg-secondary-c/10">
                        <User className="w-6 h-6 text-secondary-c" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="border-green-200 shadow-sm">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Verified</p>
                        <p className="text-2xl font-bold text-green-700">{verified}</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-100">
                        <Check className="w-6 h-6 text-green-700" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="border-secondary-c/30 shadow-sm">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Unverified</p>
                        <p className="text-2xl font-bold text-secondary-c">{unverified}</p>
                    </div>
                    <div className="p-3 rounded-full bg-secondary-c/10">
                        <X className="w-6 h-6 text-secondary-c" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
);

// Main Table View Component
const TableView: React.FC<{
    candidates: Candidate[];
    onVerify: (candidate: Candidate) => void;
    onDelete: (id: string) => void;
    onEmail: (candidate: Candidate) => void;
    onViewProfile: (candidate: Candidate) => void;
    onStartChat: (candidate: Candidate) => void;
}> = ({ candidates, onVerify, onDelete, onEmail, onViewProfile, onStartChat }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b bg-secondary-c ">
                        <th className="text-left px-4 py-2 font-medium text-white">Candidate</th>
                        <th className="text-left px-4 py-2 font-medium text-white">Contact</th>
                        <th className="text-left px-4 py-2 font-medium text-white">Status</th>
                        <th className="text-left px-4 py-2 font-medium text-white min-w-40">Profile Completion</th>
                        <th className="text-left px-4 py-2 font-medium text-white">Created</th>
                        <th className="text-left px-4 py-2 font-medium text-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((candidate) => (
                        <tr key={candidate.id} className="border-b hover:bg-secondary-c/5 transition-colors">
                            <td className="p-4">
                                <CandidateInfo candidate={candidate} />
                            </td>
                            <td className="p-4">
                                <ContactInfo candidate={candidate} />
                            </td>
                            <td className="p-4">
                                <VerificationBadge isVerified={candidate.isVerified} />
                            </td>
                            <td className="p-4">
                                <CompletionBadge completion={candidate.profileCompletion} />
                            </td>
                            <td className="p-4 text-sm text-gray-600">
                                {formatDate(candidate.createdAt)}
                            </td>
                            <td className="p-4">
                                <ActionDropdown
                                    candidate={candidate}
                                    onVerify={onVerify}
                                    onDelete={onDelete}
                                    onEmail={onEmail}
                                    onViewProfile={onViewProfile}
                                    onStartChat={onStartChat}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

// Loading Component
const LoadingState: React.FC = () => (
    <div className="flex items-center justify-center h-64">
        <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary-c mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading candidates...</p>
        </div>
    </div>
);

// Empty State Component
const EmptyState: React.FC<{ filter: VerificationFilter }> = ({ filter }) => (
    <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12">
            <User className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'No candidates found' :
                    filter === 'verified' ? 'No verified candidates' :
                        'No unverified candidates'}
            </h3>
            <p className="text-gray-600 text-center">
                {filter === 'all' ? 'There are no candidates in the system yet.' :
                    filter === 'verified' ? 'All candidates are currently unverified.' :
                        'All candidates are verified. Great job!'}
            </p>
        </CardContent>
    </Card>
);

// Main Component
export const Candidates: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<VerificationFilter>('all');
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [showChatPopup, setShowChatPopup] = useState(false);

    // Add email popup state
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [emailCandidate, setEmailCandidate] = useState<Candidate | null>(null);

    const { candidates, loading, loadCandidates } = useCandidates();
    const { handleVerify, handleDelete, viewProfile } = useCandidateActions(loadCandidates);

    const { currentUser } = useAuth();

    const user = currentUser;

    useEffect(() => {
        loadCandidates();
    }, []);

    const handleStartChat = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
        setShowChatPopup(true);
    };

    const handleCloseChatPopup = () => {
        setShowChatPopup(false);
        setSelectedCandidate(null);
    };

    // Add these functions for email handling
    const handleEmailClick = (candidate: Candidate) => {
        setEmailCandidate(candidate);
        setShowEmailPopup(true);
    };

    const handleEmailClose = () => {
        setShowEmailPopup(false);
        setEmailCandidate(null);
    };

    const handleEmailSent = () => {
        toast.success('Email sent successfully');
    };

    // Filter and search logic
    const filteredCandidates = useMemo(() => {
        let result = candidates;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(candidate =>
                candidate.basicInfo.fullName.toLowerCase().includes(query) ||
                candidate.email.toLowerCase().includes(query)
            );
        }

        // Apply verification filter
        if (filter === 'verified') {
            result = result.filter(candidate => candidate.isVerified);
        } else if (filter === 'unverified') {
            result = result.filter(candidate => !candidate.isVerified);
        }

        return result;
    }, [candidates, searchQuery, filter]);

    // Calculate stats
    const stats = useMemo(() => {
        const verifiedCount = candidates.filter(c => c.isVerified).length;
        const unverifiedCount = candidates.filter(c => !c.isVerified).length;

        return {
            total: candidates.length,
            verified: verifiedCount,
            unverified: unverifiedCount
        };
    }, [candidates]);

    if (loading) return <LoadingState />;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Candidate Management</h1>
                    <p className="text-gray-600">
                        Manage and verify candidate profiles
                    </p>
                </div>
            </div>

            {/* Stats Overview */}
            <StatsOverview
                total={stats.total}
                verified={stats.verified}
                unverified={stats.unverified}
            />

            {/* Search and Filter Bar */}
            <SearchFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filter={filter}
                onFilterChange={setFilter}
                totalCandidates={stats.total}
                verifiedCount={stats.verified}
                unverifiedCount={stats.unverified}
            />

            {/* Chat Popup */}
            {selectedCandidate && (
                <ChatPopup
                    currentUserId={user.uid}
                    otherUserId={selectedCandidate.id}
                    profilePhoto={selectedCandidate.basicInfo.profilePhoto}
                    otherUserName={selectedCandidate.basicInfo.fullName}
                    otherUserTitle={selectedCandidate.basicInfo.role || 'Candidate'}
                    isOpen={showChatPopup}
                    onClose={handleCloseChatPopup}
                />
            )}

            {/* Email Popup */}
            {emailCandidate && (
                <EmailPopup
                    candidate={emailCandidate}
                    isOpen={showEmailPopup}
                    onClose={handleEmailClose}
                    onEmailSent={handleEmailSent}
                />
            )}

            {/* Content */}
            {filteredCandidates.length === 0 ? (
                <EmptyState filter={filter} />
            ) : (
                <TableView
                    candidates={filteredCandidates}
                    onVerify={handleVerify}
                    onDelete={handleDelete}
                    onEmail={handleEmailClick} // Updated to use handleEmailClick
                    onViewProfile={viewProfile}
                    onStartChat={handleStartChat}
                />
            )}
        </div>
    );
};

export default Candidates;