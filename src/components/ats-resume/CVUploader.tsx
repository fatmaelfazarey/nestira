
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useCandidateStore } from "@/store/candidate store/CandidateStore";

interface CVUploaderProps {
  onCVParsed: (data: any) => void;
  onParsingFailed?: () => void;
}

export function CVUploader({ onCVParsed, onParsingFailed }: CVUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { sendCVtoBackend } = useCandidateStore();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

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
      const uploadCV = await sendCVtoBackend(file);

      if (!uploadCV.success) {
        toast.error("Please upload a .pdf or .docx resume");
        toast.error(uploadCV.message);
      } else {
        toast(uploadCV.message);
      }

      // Simulate API call for CV parsing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate parsing success/failure (80% success rate for demo)
      const parsingSuccess = Math.random() > 0.2;

      if (!parsingSuccess) {
        throw new Error("Parsing failed");
      }

      // Mock parsed data optimized for MENA finance sector
      const mockParsedData = {
        personalInfo: {
          fullName: "Ahmed Al-Rashid",
          email: "ahmed.alrashid@email.com",
          phone: "+971 50 123 4567",
          location: "Dubai, UAE",
          linkedin: "linkedin.com/in/ahmed-alrashid",
          summary: "Senior Finance Professional with 8+ years of experience in investment banking and financial analysis across the MENA region. Expertise in Islamic finance, risk management, and cross-border-c M&A transactions. Fluent in Arabic and English with deep understanding of Gulf market dynamics."
        },
        experience: [
          {
            title: "Senior Financial Analyst",
            company: "Emirates NBD",
            location: "Dubai, UAE",
            startDate: "2020-01",
            endDate: "",
            current: true,
            description: "• Led financial modeling for Sukuk issuances worth AED 2B+\n• Developed risk assessment frameworks for regional corporate lending\n• Managed client relationships with high-net-worth individuals across GCC"
          },
          {
            title: "Investment Banking Associate",
            company: "First Abu Dhabi Bank",
            location: "Abu Dhabi, UAE",
            startDate: "2018-06",
            endDate: "2019-12",
            current: false,
            description: "• Executed M&A transactions in oil & gas sector worth $500M+\n• Prepared pitch materials for sovereign wealth fund investments\n• Conducted due diligence for cross-border-c acquisitions"
          }
        ],
        education: [
          {
            degree: "Master of Finance (Islamic Banking)",
            institution: "American University of Sharjah",
            graduationYear: "2018",
            gpa: "3.8"
          },
          {
            degree: "Bachelor of Business Administration",
            institution: "UAE University",
            graduationYear: "2016",
            gpa: "3.6"
          }
        ],
        skills: {
          technical: ["Islamic Finance", "Financial Modeling", "Risk Analysis", "Portfolio Management", "Sukuk Structuring"],
          software: ["Excel Advanced", "Bloomberg Terminal", "SAP", "Tableau", "Python", "MATLAB"],
          certifications: ["CFA Level III", "CIPA (Certified Islamic Professional Accountant)", "FRM"],
          languages: ["Arabic (Native)", "English (Fluent)", "French (Conversational)"]
        }
      };

      onCVParsed(mockParsedData);
      toast.success("Resume uploaded and parsed successfully!");

    } catch (error) {
      console.log("CV parsing failed:", error);

      // Show failure message with option to continue manually
      toast.error(
        <div className="space-y-2">
          <p className="font-medium">We couldn't auto-fill your resume this time</p>
          <p className="text-sm">You can continue filling in your profile manually.</p>
        </div>,
        { duration: 5000 }
      );

      // Call the failure callback to switch to manual mode
      if (onParsingFailed) {
        setTimeout(() => {
          onParsingFailed();
        }, 2000);
      }

    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="shadow-sm border-border-c animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary-c" />
          Upload Your Resume
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragActive
            ? 'border-secondary-c bg-secondary-c/5'
            : 'border-border-c hover:border-secondary-c/50'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-secondary-c mx-auto" />
              <div>
                <p className="text-lg font-medium text-foreground">Parsing your resume...</p>
                <p className="text-sm text-muted-c-foreground">Using AI to extract your information</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-muted-c-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  Drop your resume here or click to browse
                </p>
                <p className="text-sm text-muted-c-foreground mb-4">
                  Supports PDF, DOC, and DOCX files up to 5MB
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                  id="cv-upload"
                />
                <Button asChild className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground">
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-info-light rounded-lg border border-info/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-info mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-info mb-1">Optimized for finance professionals</p>
              <ul className="text-info/80 space-y-1">
                <li>• Smart extraction for MENA and Gulf finance roles</li>
                <li>• Recognizes Islamic finance terminology</li>
                <li>• Auto-detects regional qualifications (CFA, CIPA, etc.)</li>
                <li>• You can review and edit all extracted information</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
