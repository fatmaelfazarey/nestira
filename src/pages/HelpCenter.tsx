
import { DashboardLayout } from '@/components/DashboardLayout';
import HelpCenterBot from '@/components/HelpCenterBot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
} from "lucide-react";

const HelpCenter = () => {
  const articles = [
    {
      id: 1,
      title: "Getting Started with Nestira",
      purpose: "Learn the basics of setting up your recruitment workflow, from company profile to your first job post.",
      video: {
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      },
      category: "basics",
      url: "https://nestira.com/blog/getting-started-with-nestira",
    },
    {
      id: 2,
      title: "Creating Effective Job Posts",
      purpose: "A step-by-step guide to posting your job listings that attract the right talent.",
      video: {
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
      },
      category: "hiring",
      url: "https://nestira.com/blog/creating-effective-job-posts",
    },
    {
      id: 3,
      title: "Managing Your Talent Pool & Screening Candidates",
      purpose: "Organize, filter, and screen candidates effectively to find the best fit for your roles.",
      video: {
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      },
      category: "hiring",
      url: "https://nestira.com/blog/managing-talent-pool-screening-candidates",
    },
    {
      id: 4,
      title: "Setting Up Interviews",
      purpose: "Learn how to schedule and manage candidate interviews seamlessly within Nestira.",
      video: {
        thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
      },
      category: "interviews",
      url: "https://nestira.com/blog/setting-up-interviews",
    },
    {
      id: 5,
      title: "Using the Quiz Designer",
      purpose: "Create custom assessments and quizzes to evaluate candidate skills objectively.",
      video: {
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      },
      category: "tools",
      url: "https://nestira.com/blog/using-the-quiz-designer",
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      purpose: "Understand your recruitment performance with our powerful analytics and reporting tools.",
      video: {
        thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
      },
      category: "tools",
      url: "https://nestira.com/blog/analytics-reporting",
    }
  ];

  const categoryStyles: Record<string, string> = {
    basics: "bg-blue-100 text-blue-800 border-blue-200/60 hover:bg-blue-100/80",
    hiring: "bg-green-100 text-green-800 border-green-200/60 hover:bg-green-100/80",
    interviews: "bg-indigo-100 text-indigo-800 border-indigo-200/60 hover:bg-indigo-100/80",
    tools: "bg-amber-100 text-amber-800 border-amber-200/60 hover:bg-amber-100/80",
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div className="w-full">
          <HelpCenterBot />
        </div>
        
        <Separator className="my-8" />
        
        {/* Help Articles */}
        <Card className="shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
          <CardHeader className="pb-4 bg-purple-50/50">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-800">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Help Articles
            </CardTitle>
            <CardDescription className="text-purple-700">
              In-depth guides to help you master every feature of Nestira.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.length > 0 ? articles.map((article) => (
                <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block group rounded-lg">
                  <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-accent">
                    <div className="relative">
                      <img 
                        src={article.video.thumbnail} 
                        alt={article.title}
                        className="w-full h-40 object-cover bg-gray-100"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600">{article.purpose}</p>
                      </div>
                      <div className="mt-4">
                        <Badge className={`font-medium capitalize ${categoryStyles[article.category] || 'bg-gray-100 text-gray-800'}`}>
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </a>
              )) : (
                <p className="text-gray-500 md:col-span-2 lg:col-span-3 text-center">No articles available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HelpCenter;
