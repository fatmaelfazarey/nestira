
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  HelpCircle,
} from "lucide-react";

const UserGuide = () => {
  const commonQuestions = [
    {
      question: "How do I customize email notifications?",
      answer: "Go to Email Alerts in the Tools section to configure which events trigger notifications.",
      category: "settings"
    },
    {
      question: "Can I export candidate data?",
      answer: "Yes, you can export candidate information from the Talent Pool page using the export feature.",
      category: "data"
    },
    {
      question: "How does the AI candidate search work?",
      answer: "The AI search uses natural language processing to match your requirements with candidate profiles and skills.",
      category: "ai"
    },
    {
      question: "What file formats are supported for resumes?",
      answer: "We support PDF, DOC, DOCX files for resume uploads. Maximum file size is 10MB.",
      category: "uploads"
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Guide</h1>
            <p className="text-gray-600 mt-2">
              Learn how to make the most of Nestira's recruitment platform
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Quick Start
            </CardTitle>
            <CardDescription>
              New to Nestira? Start here to get up and running quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">1. Set Up Profile</h3>
                <p className="text-sm text-gray-600">Configure your company profile and preferences</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">2. Create Job Post</h3>
                <p className="text-sm text-gray-600">Post your first job and start receiving applications</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">3. Manage Candidates</h3>
                <p className="text-sm text-gray-600">Review applications and schedule interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Q&A */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Quick answers to common questions about using Nestira
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Ask any question about Nestira..."
                  className="flex-1"
                />
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
              </div>
              
              <div className="space-y-4">
                {commonQuestions.map((qa, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{qa.question}</h4>
                        <p className="text-gray-600 text-sm">{qa.answer}</p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {qa.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserGuide;
