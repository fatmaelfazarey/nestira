import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Play, 
  Clock, 
  Users, 
  FileText, 
  MessageSquare, 
  Search,
  BookOpen,
  HelpCircle,
  ChevronsUpDown
} from "lucide-react";
import { useState } from "react";

const UserGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Getting Started with Nestira",
      purpose: "Learn the basics of setting up your recruitment workflow, from company profile to your first job post.",
      video: {
        thumbnail: "/placeholder.svg",
        duration: "5:30",
      },
      steps: [
        "Navigate to Settings from the sidebar",
        "Click on Company Profile and fill in your details",
        "Click 'Create Job Post' from the dashboard",
        "Use our AI assistant to write a compelling description",
        "Publish your first job post and start receiving applications",
      ],
      category: "basics",
    },
    {
      id: 2,
      title: "Creating Effective Job Posts",
      purpose: "A step-by-step guide to posting your job listings that attract the right talent.",
      video: {
        thumbnail: "/placeholder.svg",
        duration: "8:45",
      },
      steps: [
        "Click 'Create Job Post' from the dashboard",
        "Choose job category and type",
        "Write compelling job title and description",
        "Set requirements and qualifications",
        "Configure application process and questions",
        "Review and publish your job post"
      ],
      category: "hiring",
    },
    {
      id: 3,
      title: "Managing Your Talent Pool & Screening Candidates",
      purpose: "Organize, filter, and screen candidates effectively to find the best fit for your roles.",
      video: {
        thumbnail: "/placeholder.svg",
        duration: "6:20",
      },
      steps: [
        "Go to Recruitment Board to see incoming applications",
        "Review candidate profiles and AI-powered scores",
        "Use AI search to filter candidates based on your needs",
        "Move candidates through your custom pipeline stages",
        "Shortlist the most promising candidates for interviews",
      ],
      category: "hiring",
    },
    {
      id: 4,
      title: "Setting Up Interviews",
      purpose: "Learn how to schedule and manage candidate interviews seamlessly within Nestira.",
      video: {
        thumbnail: "/placeholder.svg",
        duration: "7:15",
      },
      steps: [
        "From a candidate's profile, click 'Schedule Interview'",
        "Select interview type (phone, video, in-person)",
        "Choose date and time slots",
        "Add interviewers from your team",
        "Include interview questions or an agenda",
        "Send the invitation to the candidate and team",
      ],
      category: "interviews",
    },
    {
      id: 5,
      title: "Using the Quiz Designer",
      purpose: "Create custom assessments and quizzes to evaluate candidate skills objectively.",
      video: {
        thumbnail: "/placeholder.svg",
        duration: "9:10",
      },
      steps: [
        "Navigate to 'Quiz Builder' from the tools section",
        "Click 'Create New Quiz'",
        "Give your quiz a title and description",
        "Add questions of various types (multiple choice, open-ended)",
        "Set scoring rules and passing grades",
        "Assign the quiz to candidates from their profiles",
      ],
      category: "tools",
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      purpose: "Understand your recruitment performance with our powerful analytics and reporting tools.",
      video: {
        thumbnail: "/placeholder.svg",
        duration: "4:50",
      },
      steps: [
        "Go to the 'Reports' section in your dashboard",
        "View key metrics like time-to-hire and source effectiveness",
        "Analyze your recruitment funnel performance",
        "Filter reports by job, department, or time period",
        "Export reports to share with your team",
      ],
      category: "tools",
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

  const filteredArticles = articles.filter(article => 
    selectedCategory === "all" || article.category === selectedCategory
  );

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

        {/* Help Articles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Help Articles
            </CardTitle>
            <CardDescription>
              In-depth guides to help you master every feature of Nestira.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden flex flex-col">
                  <div className="relative">
                    <img 
                      src={article.video.thumbnail} 
                      alt={article.title}
                      className="w-full h-40 object-cover bg-gray-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Button size="icon" className="rounded-full h-12 w-12">
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {article.video.duration}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{article.purpose}</p>

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          <span>Step-by-step Guide</span>
                          <ChevronsUpDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <div className="space-y-3 pl-2">
                          {article.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm rounded-full flex items-center justify-center mt-1">
                                {stepIndex + 1}
                              </div>
                              <p className="text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </Card>
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
