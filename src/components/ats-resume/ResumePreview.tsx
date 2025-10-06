
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Download, FileText } from "lucide-react";

interface ResumePreviewProps {
  resumeData: any;
  onClose: () => void;
}

export function ResumePreview({ resumeData, onClose }: ResumePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border-c">
          <h2 className="text-lg font-semibold text-foreground">Resume Preview</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Download DOCX
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <div className="bg-white text-black max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-primary-c text-primary-c-foreground p-6">
              <h1 className="text-2xl font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
              <div className="text-sm space-y-1">
                <p>{resumeData.personalInfo.email} • {resumeData.personalInfo.phone}</p>
                <p>{resumeData.personalInfo.location}</p>
                {resumeData.personalInfo.linkedin && (
                  <p>{resumeData.personalInfo.linkedin}</p>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary */}
              {resumeData.personalInfo.summary && (
                <section>
                  <h2 className="text-lg font-bold text-primary-c border-b border-primary-c/20 pb-1 mb-3">
                    Professional Summary
                  </h2>
                  <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
                </section>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-primary-c border-b border-primary-c/20 pb-1 mb-3">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp: any, index: number) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <span className="text-sm text-gray-600">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="font-medium text-secondary-c mb-1">{exp.company}</p>
                        {exp.location && <p className="text-sm text-gray-600 mb-2">{exp.location}</p>}
                        {exp.description && (
                          <div className="text-sm leading-relaxed whitespace-pre-line">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-primary-c border-b border-primary-c/20 pb-1 mb-3">
                    Education
                  </h2>
                  <div className="space-y-2">
                    {resumeData.education.map((edu: any, index: number) => (
                      <div key={index} className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-sm">{edu.institution}</p>
                        </div>
                        <div className="text-right text-sm">
                          <p>{edu.graduationYear}</p>
                          {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              <section>
                <h2 className="text-lg font-bold text-primary-c border-b border-primary-c/20 pb-1 mb-3">
                  Skills & Competencies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {resumeData.skills.technical.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Technical Skills</h4>
                      <p>{resumeData.skills.technical.join(', ')}</p>
                    </div>
                  )}
                  {resumeData.skills.software.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Software & Tools</h4>
                      <p>{resumeData.skills.software.join(', ')}</p>
                    </div>
                  )}
                  {resumeData.skills.certifications.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Certifications</h4>
                      <p>{resumeData.skills.certifications.join(', ')}</p>
                    </div>
                  )}
                  {resumeData.skills.languages.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1">Languages</h4>
                      <p>{resumeData.skills.languages.join(', ')}</p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
