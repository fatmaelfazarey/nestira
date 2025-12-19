// // components/admin-candidate-verification.tsx
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import {
//     Mail,
//     CheckCircle,
//     Trash2,
//     MoreVertical,
//     User,
//     Briefcase,
//     GraduationCap,
//     MapPin,
//     Eye
// } from 'lucide-react';
// import { toast } from 'sonner';

// import { Candidate, fetchCandidates, verifyCandidate, deleteCandidate } from '@/services/cadidatesService';
// import { useAdminStore } from '@/store/Admin store/AdminStore';
// import { useNavigate } from 'react-router-dom';



// // Candidate View Modes
// type ViewMode = 'table' | 'grid';

// // Custom hooks for better organization
// const useCandidates = () => {
//     const [candidates, setCandidates] = useState<Candidate[]>([]);
//     const [loading, setLoading] = useState(true);

//     const loadCandidates = async () => {
//         try {
//             setLoading(true);
//             const candidatesData = await fetchCandidates();
//             setCandidates(candidatesData);
//         } catch (error) {
//             console.error("Error loading candidates:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {
//         candidates,
//         loading,
//         loadCandidates,
//         setCandidates
//     };
// };

// const useCandidateActions = (refreshCandidates: () => void) => {
//     const { generateCandidatesEmbeddings } = useAdminStore();
//     const navigate = useNavigate();

//     const handleVerify = async (candidateId: string) => {
//         try {
//             await verifyCandidate(candidateId);
//             await generateCandidatesEmbeddings(candidateId);
//             refreshCandidates();
//         } catch (error) {
//             console.error('Error verifying candidate:', error);
//         }
//     };

//     const handleDelete = async (candidateId: string) => {
//         if (!confirm('Are you sure you want to delete this candidate?')) return;

//         try {
//             await deleteCandidate(candidateId);
//             refreshCandidates();
//         } catch (error) {
//             console.error('Error deleting candidate:', error);
//         }
//     };

//     const sendEmail = (candidate: Candidate) => {
//         const subject = 'Profile Verification Required';
//         const body = `Dear ${candidate.basicInfo.fullName}, please complete your profile verification.`;
//         window.open(`mailto:${candidate.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
//         toast.info('Email client opened');
//     };

//     const viewProfile = (candidate: Candidate) => {
//         console.log('Viewing profile:', candidate);
//         toast.info(`Viewing profile of ${candidate.basicInfo.fullName}`);
//         navigate(`/admin/candidate-profile/${candidate.id}`);
      
//     };

//     return {
//         handleVerify,
//         handleDelete,
//         sendEmail,
//         viewProfile
//     };
// };

// // Helper functions
// const formatDate = (date: any): string => {
//     if (!date) return 'N/A';

//     if (date && typeof date === 'object') {
//         if ('toDate' in date) {
//             return date.toDate().toLocaleDateString();
//         } else if (date instanceof Date) {
//             return date.toLocaleDateString();
//         }
//     }
//     return 'N/A';
// };

// const getCompletionVariant = (completion: number) => {
//     if (completion >= 80) return "default";
//     if (completion >= 50) return "secondary";
//     return "outline";
// };

// // Sub-components for better organization
// const CandidateAvatar: React.FC<{ candidate: Candidate; size?: 'sm' | 'md' | 'lg' }> = ({
//     candidate,
//     size = 'md'
// }) => {
//     const sizes = {
//         sm: 'w-8 h-8',
//         md: 'w-10 h-10',
//         lg: 'w-12 h-12'
//     };

//     const profilePhoto = candidate.basicInfo.profilePhoto || candidate.profilePhoto;

//     return profilePhoto ? (
//         <img
//             src={profilePhoto}
//             alt={candidate.basicInfo.fullName}
//             className={`${sizes[size]} rounded-full object-cover`}
//         />
//     ) : (
//         <div className={`${sizes[size]} rounded-full bg-muted flex items-center justify-center`}>
//             <User className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} text-muted-foreground`} />
//         </div>
//     );
// };

// const CandidateInfo: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
//     <div className="flex items-center space-x-3">
//         <CandidateAvatar candidate={candidate} />
//         <div className="min-w-0 flex-1">
//             <div className="font-medium truncate">{candidate.basicInfo.fullName}</div>
//             <div className="text-sm text-muted-foreground truncate">
//                 {candidate.basicInfo.role || candidate.preferences?.jobTitles?.[0] || 'No role specified'}
//             </div>
//         </div>
//     </div>
// );

// const ContactInfo: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
//     <div>
//         <div className="text-sm truncate">{candidate.email}</div>
//         <div className="text-sm text-muted-foreground">
//             {candidate.basicInfo.phone || 'No phone'}
//         </div>
//     </div>
// );

// const CompletionBadge: React.FC<{ completion: number }> = ({ completion }) => (
//     <div className="flex items-center space-x-2">
//         <div className="w-full bg-muted rounded-full h-2">
//             <div
//                 className="bg-primary h-2 rounded-full transition-all"
//                 style={{ width: `${completion}%` }}
//             />
//         </div>
//         <span className="text-sm min-w-[40px]">{completion}%</span>
//     </div>
// );

// const ActionDropdown: React.FC<{
//     candidate: Candidate;
//     onVerify: (id: string) => void;
//     onDelete: (id: string) => void;
//     onEmail: (candidate: Candidate) => void;
//     onViewProfile: (candidate: Candidate) => void;
// }> = ({ candidate, onVerify, onDelete, onEmail, onViewProfile }) => (
//     <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                 <MoreVertical className="w-4 h-4" />
//             </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => onViewProfile(candidate)}>
//                 <Eye className="w-4 h-4 mr-2" />
//                 View Profile
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onVerify(candidate.id)}>
//                 <CheckCircle className="w-4 h-4 mr-2" />
//                 Verify
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onEmail(candidate)}>
//                 <Mail className="w-4 h-4 mr-2" />
//                 Send Email
//             </DropdownMenuItem>
//             <DropdownMenuItem
//                 onClick={() => onDelete(candidate.id)}
//                 className="text-destructive focus:text-destructive"
//             >
//                 <Trash2 className="w-4 h-4 mr-2" />
//                 Delete
//             </DropdownMenuItem>
//         </DropdownMenuContent>
//     </DropdownMenu>
// );

// // Main Table View Component
// const TableView: React.FC<{
//     candidates: Candidate[];
//     onVerify: (id: string) => void;
//     onDelete: (id: string) => void;
//     onEmail: (candidate: Candidate) => void;
//     onViewProfile: (candidate: Candidate) => void;
// }> = ({ candidates, onVerify, onDelete, onEmail, onViewProfile }) => (
//     <div className="border rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//             <table className="w-full min-w-[800px]">
//                 <thead>
//                     <tr className="border-b bg-muted/50">
//                         <th className="text-left p-4 font-medium">Candidate</th>
//                         <th className="text-left p-4 font-medium">Contact</th>
//                         <th className="text-left p-4 font-medium">Profile Completion</th>
//                         <th className="text-left p-4 font-medium">Created</th>
//                         <th className="text-left p-4 font-medium">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {candidates.map((candidate) => (
//                         <tr key={candidate.id} className="border-b hover:bg-muted/50 transition-colors">
//                             <td className="p-4">
//                                 <CandidateInfo candidate={candidate} />
//                             </td>
//                             <td className="p-4">
//                                 <ContactInfo candidate={candidate} />
//                             </td>
//                             <td className="p-4">
//                                 <CompletionBadge completion={candidate.profileCompletion} />
//                             </td>
//                             <td className="p-4 text-sm">
//                                 {formatDate(candidate.createdAt)}
//                             </td>
//                             <td className="p-4">
//                                 <ActionDropdown
//                                     candidate={candidate}
//                                     onVerify={onVerify}
//                                     onDelete={onDelete}
//                                     onEmail={onEmail}
//                                     onViewProfile={onViewProfile}
//                                 />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
// );

// // Grid View Component
// const GridView: React.FC<{
//     candidates: Candidate[];
//     onVerify: (id: string) => void;
//     onDelete: (id: string) => void;
//     onEmail: (candidate: Candidate) => void;
//     onViewProfile: (candidate: Candidate) => void;
// }> = ({ candidates, onVerify, onDelete, onEmail, onViewProfile }) => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {candidates.map((candidate) => (
//             <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
//                 <CardHeader className="pb-3">
//                     <div className="flex items-start justify-between">
//                         <CandidateInfo candidate={candidate} />
//                         <Badge variant={getCompletionVariant(candidate.profileCompletion)}>
//                             {candidate.profileCompletion}%
//                         </Badge>
//                     </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                     <div className="space-y-2">
//                         <div className="flex items-center text-sm text-muted-foreground">
//                             <Mail className="w-4 h-4 mr-2" />
//                             <span className="truncate">{candidate.email}</span>
//                         </div>
//                         {candidate.basicInfo.phone && (
//                             <div className="flex items-center text-sm text-muted-foreground">
//                                 <span className="w-4 h-4 mr-2">📱</span>
//                                 {candidate.basicInfo.phone}
//                             </div>
//                         )}
//                         {candidate.basicInfo.location && (
//                             <div className="flex items-center text-sm text-muted-foreground">
//                                 <MapPin className="w-4 h-4 mr-2" />
//                                 {candidate.basicInfo.location}
//                             </div>
//                         )}
//                     </div>

//                     <div className="space-y-2">
//                         <div className="flex items-center text-sm">
//                             <Briefcase className="w-4 h-4 mr-2" />
//                             <span className="font-medium">Experience:</span>
//                             <span className="ml-1 text-muted-foreground">
//                                 {candidate.experience?.length || 0} position(s)
//                             </span>
//                         </div>
//                         <div className="flex items-center text-sm">
//                             <GraduationCap className="w-4 h-4 mr-2" />
//                             <span className="font-medium">Education:</span>
//                             <span className="ml-1 text-muted-foreground">
//                                 {candidate.education?.length || 0} degree(s)
//                             </span>
//                         </div>
//                     </div>

//                     <div className="flex justify-between pt-2">
//                         <Button
//                             size="sm"
//                             onClick={() => onViewProfile(candidate)}
//                             variant="outline"
//                             className="flex-1 mr-2"
//                         >
//                             <Eye className="w-4 h-4 mr-1" />
//                             View
//                         </Button>
//                         <Button
//                             size="sm"
//                             onClick={() => onVerify(candidate.id)}
//                             className="flex-1 mr-2"
//                         >
//                             <CheckCircle className="w-4 h-4 mr-1" />
//                             Verify
//                         </Button>
//                         <Button
//                             size="sm"
//                             variant="destructive"
//                             onClick={() => onDelete(candidate.id)}
//                         >
//                             <Trash2 className="w-4 h-4" />
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         ))}
//     </div>
// );

// // Loading Component
// const LoadingState: React.FC = () => (
//     <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-2 text-muted-foreground">Loading candidates...</p>
//         </div>
//     </div>
// );

// // Empty State Component
// const EmptyState: React.FC = () => (
//     <Card>
//         <CardContent className="flex flex-col items-center justify-center py-12">
//             <CheckCircle className="w-16 h-16 text-muted-foreground mb-4" />
//             <h3 className="text-lg font-medium mb-2">No candidates pending verification</h3>
//             <p className="text-muted-foreground text-center">
//                 All candidate profiles have been verified. Check back later for new submissions.
//             </p>
//         </CardContent>
//     </Card>
// );

// // Main Component
// export const AdminCandidateVerification: React.FC<AdminCandidateVerificationProps> = () => {
//     const [viewMode, setViewMode] = useState<ViewMode>('table');
//     const { candidates, loading, loadCandidates } = useCandidates();
//     const { handleVerify, handleDelete, sendEmail, viewProfile } = useCandidateActions(loadCandidates);

//     useEffect(() => {
//         loadCandidates();
//     }, []);

//     if (loading) return <LoadingState />;

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <div>
//                     <p className="text-3xl font-bold tracking-tight text-left">Candidate Verification</p>
//                     <p className="text-muted-foreground">
//                         Manage and verify candidate profiles ({candidates.length} pending)
//                     </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <Button
//                         variant={viewMode === 'table' ? 'default' : 'outline'}
//                         onClick={() => setViewMode('table')}
//                         size="sm"
//                     >
//                         Table View
//                     </Button>
//                     <Button
//                         variant={viewMode === 'grid' ? 'default' : 'outline'}
//                         onClick={() => setViewMode('grid')}
//                         size="sm"
//                     >
//                         Grid View
//                     </Button>
//                 </div>
//             </div>

//             {/* Content */}
//             {candidates.length === 0 ? (
//                 <EmptyState />
//             ) : viewMode === 'table' ? (
//                 <TableView
//                     candidates={candidates}
//                     onVerify={handleVerify}
//                     onDelete={handleDelete}
//                     onEmail={sendEmail}
//                     onViewProfile={viewProfile}
//                 />
//             ) : (
//                 <GridView
//                     candidates={candidates}
//                     onVerify={handleVerify}
//                     onDelete={handleDelete}
//                     onEmail={sendEmail}
//                     onViewProfile={viewProfile}
//                 />
//             )}
//         </div>
//     );
// };

// export default AdminCandidateVerification;