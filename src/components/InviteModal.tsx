

// import React, { useEffect, useState } from 'react'
// import { useEmployerStore } from '@/store/employer store/EmployerStore';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Badge } from '@/components/ui/badge';
// import { Brain, X, FileText, Clock, Briefcase } from 'lucide-react';

// interface Job {
//     id: number;
//     title: string;
//     // Add other job properties as needed from your API response
// }

// interface Candidate {
//     name: string;
//     // Add other candidate properties
// }

// interface InviteModalProps {
//     showModal: boolean;
//     setShowModal: (show: boolean) => void;
//     candidate: Candidate;
// }

// const InviteModal: React.FC<InviteModalProps> = ({
//     showModal,
//     setShowModal,
//     candidate
// }) => {
//     const [jobs, setJobs] = useState<Job[]>([]);
//     const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
//     const { getAllJobsTitle } = useEmployerStore();

//     useEffect(() => {
//         if (showModal) {
//             fetchJobs();
//         }
//     }, [showModal]);

//     const fetchJobs = async () => {
//         try {
//             const data = await getAllJobsTitle(setSelectedJobs);
//             if (data && data.data) {
//                 setJobs(data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching jobs:', error);
//         }
//     };

//     const handleJobSelection = (jobId: number, checked: boolean) => {
//         if (checked) {
//             setSelectedJobs(prev => [...prev, jobId]);
//         } else {
//             setSelectedJobs(prev => prev.filter(id => id !== jobId));
//         }
//     };

//     const handleSelectAll = () => {
//         setSelectedJobs(jobs.map(job => job.id));
//     };

//     const handleDeselectAll = () => {
//         setSelectedJobs([]);
//     };

//     const removeSelectedJob = (jobId: number) => {
//         setSelectedJobs(prev => prev.filter(id => id !== jobId));
//     };

//     const handleAssignSelected = () => {
//         // Handle the assignment of selected jobs to the candidate
//         console.log('Selected jobs:', selectedJobs);
//         console.log('Candidate:', candidate.name);

//         // Add your API call here to assign jobs to candidate
//         // await assignJobsToCandidate(candidate.id, selectedJobs);

//         // Close modal after assignment
//         setShowModal(false);
//     };

//     const getSelectedJobTitles = () => {
//         return selectedJobs.map(jobId => {
//             const job = jobs.find(j => j.id === jobId);
//             return job ? job.title : '';
//         }).filter(Boolean);
//     };

//     return (
//         <div>
//             <Dialog open={showModal} onOpenChange={setShowModal}>
//                 <DialogContent className="max-w-3xl max-h-[90vh]">
//                     <div className="space-y-6">
//                         <div>
//                             <h3 className="text-lg font-semibold flex items-center gap-2">
//                                 <Briefcase className="w-5 h-5" />
//                                 Assign Jobs to {candidate.name}
//                             </h3>
//                             <p className="text-sm text-gray-600">Select one or more jobs to assign to this candidate</p>
//                         </div>

//                         {/* Select All/Deselect All */}
//                         <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-t border-b">
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={handleSelectAll}
//                                 disabled={selectedJobs.length === jobs.length}
//                             >
//                                 Select All
//                             </Button>
//                             <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={handleDeselectAll}
//                                 disabled={selectedJobs.length === 0}
//                             >
//                                 Deselect All
//                             </Button>
//                             <span className="text-sm text-gray-600">
//                                 {selectedJobs.length} of {jobs.length} selected
//                             </span>
//                         </div>

//                         {/* Selected Jobs Preview */}
//                         {selectedJobs.length > 0 && (
//                             <div className="space-y-2">
//                                 <h4 className="text-sm font-medium text-gray-700">Selected Jobs:</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                     {getSelectedJobTitles().map((title, index) => (
//                                         <Badge
//                                             key={selectedJobs[index]}
//                                             variant="secondary"
//                                             className="cursor-pointer hover:bg-red-100"
//                                             onClick={() => removeSelectedJob(selectedJobs[index])}
//                                         >
//                                             {title} <X className="w-3 h-3 ml-1" />
//                                         </Badge>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Jobs List */}
//                         <div className="space-y-3 max-h-96 overflow-y-auto">
//                             {jobs.map(job => (
//                                 <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
//                                     <div className="flex items-center gap-3">
//                                         <Checkbox
//                                             checked={selectedJobs.includes(job.id)}
//                                             onCheckedChange={(checked) =>
//                                                 handleJobSelection(job.id, checked as boolean)
//                                             }
//                                         />
//                                         <div className="flex-1">
//                                             <div className="flex items-center gap-2 mb-1">
//                                                 <FileText className="w-4 h-4 text-gray-500" />
//                                                 <h4 className="font-medium">{job.title}</h4>
//                                             </div>
//                                             <div className="flex items-center gap-4 text-sm text-gray-600">
//                                                 <span className="flex items-center gap-1">
//                                                     <Clock className="w-3 h-3" />
//                                                     Job ID: {job.id}
//                                                 </span>
//                                                 <Badge variant="outline" className="text-xs">
//                                                     Active
//                                                 </Badge>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}

//                             {jobs.length === 0 && (
//                                 <div className="text-center py-8 text-gray-500">
//                                     <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                                     <p>No jobs available</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Footer Actions */}
//                         <div className="flex justify-end gap-2 pt-4 border-t">
//                             <Button variant="outline" onClick={() => setShowModal(false)}>
//                                 Cancel
//                             </Button>
//                             <Button
//                                 className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white"
//                                 onClick={handleAssignSelected}
//                                 disabled={selectedJobs.length === 0}
//                             >
//                                 Assign Selected ({selectedJobs.length})
//                             </Button>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     )
// }

// export default InviteModal;
import React, { useEffect, useState } from 'react'
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, FileText, Briefcase, Search, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
    id: number;
    title: string;
}

interface Candidate {
    name: string;
}

interface InviteModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    candidate: Candidate;
}

const InviteModal: React.FC<InviteModalProps> = ({
    showModal,
    setShowModal,
    candidate
}) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { getAllJobsTitle, sendInvitation } = useEmployerStore();

    useEffect(() => {
        if (showModal) {
            fetchJobs();
        }
    }, [showModal]);

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const data = await getAllJobsTitle(setJobs);
            if (data && data.success && data.data) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter jobs based on search
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleJobSelection = (jobId: number, checked: boolean) => {
        if (checked) {
            setSelectedJobs(prev => [...prev, jobId]);
        } else {
            setSelectedJobs(prev => prev.filter(id => id !== jobId));
        }
    };

    const handleSelectAll = () => {
        setSelectedJobs(filteredJobs.map(job => job.id));
    };

    const handleDeselectAll = () => {
        setSelectedJobs([]);
    };

    const removeSelectedJob = (jobId: number) => {
        setSelectedJobs(prev => prev.filter(id => id !== jobId));
    };

    const handleAssignSelected = async () => {
        console.log('Selected jobs:', selectedJobs);
        console.log('Candidate:', candidate.name);

        const send = await sendInvitation(candidate.id, selectedJobs);
        if (send.success) {
            toast.success(`Invitation sent to ${candidate.name}!`);
        }
        // Add your API call here to assign jobs to candidate
        // await assignJobsToCandidate(candidate.id, selectedJobs);

        setShowModal(false);
        setSelectedJobs([]);
        setSearchTerm('');
    };

    const getSelectedJobTitles = () => {
        return selectedJobs.map(jobId => {
            const job = jobs.find(j => j.id === jobId);
            return job ? job.title : '';
        }).filter(Boolean);
    };

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-2xl max-h-[80vh] p-0 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm border">
                                <Briefcase className="w-5 h-5 text-[#ff5f1b]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Invite {candidate.name} to Apply
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Select job positions from your available listings
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-[calc(80vh-140px)]">
                    {/* Search Bar */}
                    <div className="p-4 border-b bg-white">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search job titles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Selection Controls */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSelectAll}
                                disabled={selectedJobs.length === filteredJobs.length || filteredJobs.length === 0}
                                className="text-xs"
                            >
                                Select All
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDeselectAll}
                                disabled={selectedJobs.length === 0}
                                className="text-xs"
                            >
                                Deselect All
                            </Button>
                            <span className="text-sm text-gray-600">
                                {selectedJobs.length} of {filteredJobs.length} selected
                            </span>
                        </div>
                        {selectedJobs.length > 0 && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                                <Sparkles className="w-3 h-3 mr-1" />
                                {selectedJobs.length} selected
                            </Badge>
                        )}
                    </div>

                    {/* Selected Jobs Preview */}
                    {selectedJobs.length > 0 && (
                        <div className="p-4 bg-blue-50 border-b">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                <h4 className="text-sm font-medium text-blue-900">Selected Jobs:</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {getSelectedJobTitles().map((title, index) => (
                                    <Badge
                                        key={selectedJobs[index]}
                                        variant="secondary"
                                        className="bg-white text-blue-700 border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors group"
                                        onClick={() => removeSelectedJob(selectedJobs[index])}
                                    >
                                        {title}
                                        <X className="w-3 h-3 ml-1 group-hover:text-red-500 transition-colors" />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Jobs List */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {isLoading ? (
                                // Loading State
                                <div className="space-y-2">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div key={item} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 animate-pulse">
                                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                            <div className="flex-1">
                                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredJobs.length > 0 ? (
                                // Jobs List - Simple and Clean
                                filteredJobs.map(job => (
                                    <div
                                        key={job.id}
                                        className={`flex items-center gap-3 p-3 border rounded-lg transition-all duration-200 ${selectedJobs.includes(job.id)
                                            ? 'bg-orange-50 border-orange-200 shadow-sm'
                                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                            }`}
                                    >
                                        <Checkbox
                                            checked={selectedJobs.includes(job.id)}
                                            onCheckedChange={(checked) =>
                                                handleJobSelection(job.id, checked as boolean)
                                            }
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <h4 className="font-medium text-gray-900 truncate">
                                                    {job.title}
                                                </h4>
                                            </div>
                                            {/* <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>ID: {job.id}</span>
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                                    Active
                                                </Badge>
                                            </div> */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Empty State
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Briefcase className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <h3 className="text-base font-medium text-gray-900 mb-1">
                                        {searchTerm ? 'No jobs found' : 'No jobs available'}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {searchTerm
                                            ? `No jobs match "${searchTerm}"`
                                            : 'There are no job positions available at the moment.'
                                        }
                                    </p>
                                    {searchTerm && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            Clear Search
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t bg-white">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                {selectedJobs.length > 0 ? (
                                    <span>
                                        Ready to invite to {selectedJobs.length} job{selectedJobs.length !== 1 ? 's' : ''}
                                    </span>
                                ) : (
                                    <span>Select jobs to continue</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedJobs([]);
                                        setSearchTerm('');
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-[#ff5f1b] hover:bg-[#e5551a] text-white"
                                    onClick={handleAssignSelected}
                                    disabled={selectedJobs.length === 0}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Send Invitation ({selectedJobs.length})
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal;