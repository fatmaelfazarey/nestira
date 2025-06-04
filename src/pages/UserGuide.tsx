
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare, 
  Search,
  BookOpen,
  Video,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useState } from "react";

const UserGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const videoTutorials = [
    {
      id: 1,
      title: "Getting Started with Nestira",
      description: "Learn the basics of setting up your recruitment workflow",
      duration: "5:30",
      thumbnail: "/placeholder.svg",
      category: "basics",
      completed: false
    },
    {
      id: 2,
      title: "Creating Your First Job Post",
      description: "Step-by-step guide to posting your first job listing",
      duration: "8:45",
      thumbnail: "/placeholder.svg",
      category: "hiring",
      completed: true
    },
    {
      id: 3,
      title: "Managing Your Talent Pool",
      description: "Organize and filter candidates effectively",
      duration: "6:20",
      thumbnail: "/placeholder.svg",
      category: "hiring",
      completed: false
    },
    {
      id: 4,
      title: "Setting Up Interviews",
      description: "Schedule and manage candidate interviews",
      duration: "7:15",
      thumbnail: "/placeholder.svg",
      category: "interviews",
      completed: false
    },
    {
      id: 5,
      title: "Using Quiz Designer",
      description: "Create custom assessments for candidates",
      duration: "9:10",
      thumbnail: "/placeholder.svg",
      category: "tools",
      completed: false
    }
  ];

  const stepByStepGuides = [
    {
      title: "Setting Up Your Company Profile",
      steps: [
        "Navigate to Settings from the sidebar",
        "Click on Company Profile",
        "Upload your company logo and banner",
        "Fill in company description and values",
        "Add contact information and social links"
      ],
      category: "basics"
    },
    {
      title: "Creating Effective Job Posts",
      steps: [
        "Click 'Create Job Post' from the dashboard",
        "Choose job category and type",
        "Write compelling job title and description",
        "Set requirements and qualifications",
        "Configure application process and questions",
        "Review and publish your job post"
      ],
      category: "hiring"
    },
    {
      title: "Screening Candidates",
      steps: [
        "Go to Recruitment Board",
        "Review incoming applications",
        "Use AI search to filter candidates",
        "Move candidates through pipeline stages",
        "Schedule interviews with qualified candidates"
      ],
      category: "hiring"
    }
  ];

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

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "basics", label: "Getting Started" },
    { value: "hiring", label: "Hiring Process" },
    { value: "interviews", label: "Interviews" },
    { value: "tools", label: "Tools & Features" }
  ];

  const filteredTutorials = videoTutorials.filter(tutorial => 
    selectedCategory === "all" || tutorial.category === selectedCategory
  );

  const filteredGuides = stepByStepGuides.filter(guide =>
    selectedCategory === "all" || guide.category === selectedCategory
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Guide</h1>
            <p className="text-gray-600 mt-2">
              Learn how to make the most of Nestira's recruitment platform
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tutorials and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
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

        {/* Video Tutorials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Video Tutorials
            </CardTitle>
            <CardDescription>
              Watch step-by-step video guides to master Nestira
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.title}
                      className="w-full h-32 object-cover bg-gray-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button size="sm" className="rounded-full">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {tutorial.duration}
                    </div>
                    {tutorial.completed && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{tutorial.title}</h3>
                    <p className="text-sm text-gray-600">{tutorial.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step-by-Step Guides */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Step-by-Step Guides
            </CardTitle>
            <CardDescription>
              Detailed written instructions for key tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredGuides.map((guide, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg mb-3">{guide.title}</h3>
                  <div className="space-y-2">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                  {index < filteredGuides.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
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
                  <MessageSquare className="w-4 h-4" />
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
