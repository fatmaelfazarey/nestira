

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";

interface CVUploaderProps {
    onCVParsed: (data: any) => void;
    onParsingFailed?: () => void;
}

// Component for file upload input
const FileUploadInput = ({ onFileSelect, isLoading }: { onFileSelect: (file: File) => void, isLoading: boolean }) => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            onFileSelect(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onFileSelect(file);
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                    ? "border-secondary-c bg-secondary-c/10"
                    : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    disabled={isLoading}
                />

                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">
                        {isLoading ? "Processing..." : "Drop your resume here or click to browse"}
                    </p>
                    <p className="text-sm text-gray-500">
                        Supports PDF, DOC, and DOCX files (max 5MB)
                    </p>
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-secondary-c border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600">Parsing your resume...</span>
                </div>
            )}
        </div>
    );
};

const UploadResumeToAutoFill = ({ onCVParsed, onParsingFailed }: CVUploaderProps) => {
    const [inputMode, setInputMode] = useState(false);
    const [showParsingModal, setShowParsingModal] = useState(false);
    const [parsedData, setParsedData] = useState<any>(null);
    const [close, setClose] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { signWithCv, generateCandidatesEmbeddings } = useCandidateStore();

    const handleCVParsed = (data: any) => {
        setParsedData(data);
        setShowParsingModal(true);
        onCVParsed(data);
        setClose(true)
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

    const handleFile = async (file: File) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        // File validation
        if (file.size > maxSize) {
            toast.error("File size must be less than 5MB");
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload a .pdf or .docx resume");
            return;
        }

        setIsUploading(true);

        try {
            const uploadResult = await signWithCv(file);

            console.log('====== uploadResult ===> ', uploadResult);


            if (!uploadResult.success) {
                toast.error(uploadResult.message || "Upload failed");
                throw new Error("Upload failed");
            }
            // if (uploadResult.success) {
            //     console.log('====== generateCandidatesEmbeddings ===> ', generateCandidatesEmbeddings);
            //     const emb = await generateCandidatesEmbeddings();
            //     if (emb.success) {
            //         toast.success("embeding done successfully!");
            //     }
            // }

            if (!uploadResult.cvData) {
                console.warn('No CV data received from backend');
                toast.error("No data extracted from resume");
                throw new Error("No CV data");
            }

            console.log('====== Parsed CV Data ===> ', uploadResult.cvData);

            handleCVParsed(uploadResult.cvData);
            setInputMode(false);
            toast.success("Resume uploaded and parsed successfully!");


        } catch (error) {
            console.error("CV processing failed:", error);

            toast.error(
                <div className="space-y-2">
                    <p className="font-medium">We couldn't auto-fill your resume this time</p>
                    <p className="text-sm">You can continue filling in your profile manually.</p>
                </div>,
                { duration: 5000 }
            );

            if (onParsingFailed) {
                onParsingFailed();
                setClose(true)
            }

        } finally {
            setIsUploading(false);
        }
    };

    if (close) {
        return null;
    }

    // Upload Mode
    if (inputMode) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
                <div ref={modalRef} className="max-w-[500px] w-full bg-white rounded-lg shadow-lg">
                    <div className="flex w-full justify-end p-4">
                        <Button
                            variant="outline"
                            onClick={() => { setInputMode(false); }}
                            className=""
                            disabled={isUploading}
                        >
                            <X />
                        </Button>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                            <p className="text-gray-600">We'll extract your information automatically</p>
                        </div>
                        <FileUploadInput
                            onFileSelect={handleFile}
                            isLoading={isUploading}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Main Upload Modal
    return (
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
    );
}

export default UploadResumeToAutoFill;