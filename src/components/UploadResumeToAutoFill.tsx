// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Upload, Edit, FileText, Star, User, Download, AlertCircle, X } from "lucide-react";
// import { CVUploader } from "@/components/ats-resume/CVUploader";
// import { ProfileForm } from "@/components/profile-candidate/ProfileForm";
// import { CVParsingModal } from "@/components/profile-candidate/CVParsingModal";
// import { ProfileCompletionCard } from "@/components/profile-candidate/ProfileCompletionCard";
// import { ProfileBoostCards } from "@/components/profile-candidate/ProfileBoostCards";
// import { Link, Navigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { toast } from "sonner";
// import { Close } from "@radix-ui/react-toast";

// const UploadResumeToAutoFill = () => {
//     // const { currentUser, userData, loading, updateUserProfile } = useAuth();
//     // console.log({ userData })
//     const [inputMode, setInputMode] = useState(false)
//     const [showParsingModal, setShowParsingModal] = useState(false);
//     const [parsedData, setParsedData] = useState<any>(null);
//     const [close, setClose] = useState(false);

//     const handleCVParsed = (data: any) => {
//         setParsedData(data);
//         setShowParsingModal(true);
//     };





//     // Upload Mode
//     if (inputMode) {
//         return (
//             <div className="w-full h-[100vh]  flex justify-center items-center">
//                 <div className="max-w-[500px] w-full ">
//                     <div className="flex  w-full justify-end mb-8">

//                         <Button
//                             variant="outline"
//                             onClick={() => { setInputMode(false); setClose(true); }}
//                             className=""
//                         >
//                             <X />
//                         </Button>


//                     </div>

//                     <CVUploader
//                         onCVParsed={handleCVParsed}
//                     // onParsingFailed={handleParsingFailed}
//                     />

//                     {/* {showParsingModal && parsedData && (
//                         <CVParsingModal
//                             isOpen={showParsingModal}
//                             onClose={() => setShowParsingModal(false)}
//                             parsedData={parsedData}
//                         // onConfirm={handleConfirmParsedData}
//                         />
//                     )} */}
//                 </div>
//             </div>
//         );
//     }
//     return (!close) && (
//         <div className="w-full h-[100vh] bg-white/30 backdrop-blur-sm flex justify-center items-center">
//             <div className="max-w-[500px] w-full ">
//                 {/* Upload Resume Option */}
//                 <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-secondary-c/50 animate-fade-in ">
//                     <div className="flex  w-full justify-end p-4">

//                         <Button
//                             variant="outline"
//                             onClick={() => { setInputMode(false); setClose(true); }}
//                             className=""
//                         >
//                             <X />
//                         </Button>
//                     </div>
//                     <CardHeader className="text-center pb-4">
//                         <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-c/20 transition-colors">
//                             <Upload className="w-8 h-8 text-secondary-c" />
//                         </div>
//                         <CardTitle className="text-xl text-foreground">Upload Resume to Auto-Fill</CardTitle>
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <p className="text-muted-c-foreground mb-6">
//                             Upload your PDF or DOCX resume and we'll automatically extract your information using AI.
//                         </p>
//                         <div className="space-y-3 text-sm text-muted-c-foreground mb-6">
//                             <div className="flex items-center justify-center gap-2">
//                                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                                 <span>Supports PDF, DOC, and DOCX</span>
//                             </div>
//                             <div className="flex items-center justify-center gap-2">
//                                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                                 <span>Smart extraction for finance roles</span>
//                             </div>
//                             <div className="flex items-center justify-center gap-2">
//                                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                                 <span>Preview before saving</span>
//                             </div>
//                         </div>

//                         <Button
//                             onClick={() => setInputMode(true)}
//                             className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground mb-4"
//                             size="lg"
//                         >
//                             Upload Resume
//                         </Button>
//                         <Button
//                             variant="outline"
//                             onClick={() => setClose(true)}
//                             className="w-full"
//                             size="lg"
//                         >
//                             Fill Manually
//                         </Button>
//                     </CardContent>
//                 </Card>

//             </div>

//         </div>
//     )
// }

// export default UploadResumeToAutoFill



import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Edit, FileText, Star, User, Download, AlertCircle, X } from "lucide-react";
import { CVUploader } from "@/components/ats-resume/CVUploader";
import { ProfileForm } from "@/components/profile-candidate/ProfileForm";
import { CVParsingModal } from "@/components/profile-candidate/CVParsingModal";
import { ProfileCompletionCard } from "@/components/profile-candidate/ProfileCompletionCard";
import { ProfileBoostCards } from "@/components/profile-candidate/ProfileBoostCards";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Close } from "@radix-ui/react-toast";

const UploadResumeToAutoFill = () => {
    const [inputMode, setInputMode] = useState(false)
    const [showParsingModal, setShowParsingModal] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    const [close, setClose] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleCVParsed = (data: any) => {
        setParsedData(data);
        setShowParsingModal(true);
    };

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setClose(true);
                setInputMode(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Upload Mode
    if (inputMode) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                <div ref={modalRef} className="max-w-[500px] w-full bg-white rounded-lg shadow-lg">
                    <div className="flex w-full justify-end p-4">
                        <Button
                            variant="outline"
                            onClick={() => { setInputMode(false); setClose(true); }}
                            className=""
                        >
                            <X />
                        </Button>
                    </div>
                    <div className="px-6 pb-6">
                        <CVUploader
                            onCVParsed={handleCVParsed}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (!close) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div ref={modalRef} className="max-w-[500px] w-full">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-secondary-c/50 animate-fade-in">
                    <div className="flex w-full justify-end p-4">
                        <Button
                            variant="outline"
                            onClick={() => { setClose(true); }}
                            className=""
                        >
                            <X />
                        </Button>
                    </div>
                    <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-c/20 transition-colors">
                            <Upload className="w-8 h-8 text-secondary-c" />
                        </div>
                        <CardTitle className="text-xl text-foreground">Upload Resume to Auto-Fill</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-muted-c-foreground mb-6">
                            Upload your PDF or DOCX resume and we'll automatically extract your information using AI.
                        </p>
                        <div className="space-y-3 text-sm text-muted-c-foreground mb-6">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span>Supports PDF, DOC, and DOCX</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span>Smart extraction for finance roles</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                <span>Preview before saving</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setInputMode(true)}
                            className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground mb-4"
                            size="lg"
                        >
                            Upload Resume
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setClose(true)}
                            className="w-full"
                            size="lg"
                        >
                            Fill Manually
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UploadResumeToAutoFill