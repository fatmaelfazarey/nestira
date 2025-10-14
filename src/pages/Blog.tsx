
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Filter,
  Clock,
  ChevronDown,
  Download,
  Mail,
  FileText,
  ExternalLink
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  secondaryCategory: string;
  readTime: string;
  date: string;
  tags: string[];
  bgImage: string;
  trending: boolean;
}

export default function Blog() {
  const [isTrendingEnabled, setIsTrendingEnabled] = useState(true);
  const [selectedAudience, setSelectedAudience] = useState("Show All");
  const [selectedContentType, setSelectedContentType] = useState("Blog");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [email, setEmail] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const blogArticles: BlogArticle[] = [
    {
      id: 1,
      title: "Finance Skills That Will Get You Hired in 2024",
      description: "Master these in-demand technical and soft skills to stand out in today's competitive finance job market.",
      content: "Full article content would go here...",
      category: "Skill Building",
      secondaryCategory: "Career Growth",
      readTime: "7 min read",
      date: "5/14/2024",
      tags: ["New", "Trending"],
      bgImage: "bg-gradient-to-br from-blue-400 to-green-400",
      trending: true
    },
    {
      id: 2,
      title: "Remote Finance Jobs: How to Position Yourself",
      description: "Essential strategies for landing remote finance positions and building your virtual professional brand.",
      content: "Full article content would go here...",
      category: "Remote Readiness",
      secondaryCategory: "Career Growth",
      readTime: "6 min read",
      date: "5/9/2024",
      tags: ["New"],
      bgImage: "bg-gradient-to-br from-pink-400 to-blue-400",
      trending: false
    },
    {
      id: 3,
      title: "Finance Salary Negotiation: Your 2024 Guide",
      description: "Data-driven insights and proven tactics to negotiate your best compensation package.",
      content: "Full article content would go here...",
      category: "Salary Insights",
      secondaryCategory: "Career Growth",
      readTime: "8 min read",
      date: "5/4/2024",
      tags: [],
      bgImage: "bg-gradient-to-br from-purple-400 to-pink-400",
      trending: true
    },
    {
      id: 4,
      title: "AI Interview Prep for Finance Professionals",
      description: "How AI is changing finance recruitment and how to prepare for AI-assisted interviews.",
      content: "Full article content would go here...",
      category: "Interview Prep",
      secondaryCategory: "AI in Finance",
      readTime: "5 min read",
      date: "4/27/2024",
      tags: ["Trending"],
      bgImage: "bg-gradient-to-br from-green-400 to-blue-400",
      trending: true
    },
    {
      id: 5,
      title: "Top Finance Certifications Worth Your Time",
      description: "Which certifications actually boost your career prospects and earning potential in 2024.",
      content: "Full article content would go here...",
      category: "Certifications & Tools",
      secondaryCategory: "Skill Building",
      readTime: "9 min read",
      date: "3/24/2024",
      tags: [],
      bgImage: "bg-gradient-to-br from-orange-400 to-red-400",
      trending: false
    },
    {
      id: 6,
      title: "Finance Resume That Gets Past ATS Systems",
      description: "Optimize your resume for applicant tracking systems while showcasing your finance expertise.",
      content: "Full article content would go here...",
      category: "Resume Tips",
      secondaryCategory: "Career Growth",
      readTime: "6 min read",
      date: "3/9/2024",
      tags: [],
      bgImage: "bg-gradient-to-br from-teal-400 to-green-400",
      trending: false
    }
  ];

  const reports = [
    {
      title: "2024 Finance Salary Report",
      description: "Comprehensive salary data across finance roles",
      downloads: "2.1K downloads",
      icon: FileText,
      url: "/reports/finance-salary-2024.pdf"
    },
    {
      title: "Remote Finance Career Guide",
      description: "Complete guide to building a remote finance career",
      downloads: "1.8K downloads",
      icon: FileText,
      url: "/reports/remote-finance-guide.pdf"
    }
  ];

  const contentTypes = ["Blog", "Report", "Survey", "Case Study"];
  const audiences = ["Show All", "Entry Level", "Mid-Level", "Senior Level"];
  const topicFocus = [
    "Skill Building", "Career Growth", "Remote Readiness",
    "Salary Insights", "Certifications & Tools", "Interview Prep",
    "Resume Tips", "AI in Finance"
  ];

  // Filter articles based on current selections
  const filteredArticles = useMemo(() => {
    let filtered = [...blogArticles];

    // Apply trending filter
    if (isTrendingEnabled) {
      filtered = filtered.filter(article => article.trending);
    }

    // Apply topic filters
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(article =>
        selectedTopics.some(topic =>
          article.category === topic ||
          article.secondaryCategory.includes(topic)
        )
      );
    }

    return filtered;
  }, [isTrendingEnabled, selectedTopics]);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleArticleClick = (article: BlogArticle) => {
    setSelectedArticle(article);
  };

  const handleReportDownload = (report: any) => {
    setIsLoading(true);

    // Simulate download
    setTimeout(() => {
      // In a real app, this would trigger an actual download
      window.open(report.url, '_blank');
      toast({
        title: "Download Started",
        description: `${report.title} is now downloading.`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed Successfully!",
        description: "You'll receive career tips and insights in your inbox.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Career Insights & Resources</h1>
          <p className="text-muted-c-foreground">Grow your finance career with expert insights and practical resources</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters & Sorting */}
            <Card className="mb-8 bg-card-blue">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary-c" />
                  <h2 className="text-lg font-semibold text-foreground">Filters & Sorting</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                    className="ml-auto"
                  >
                    <ChevronDown className={`w-4 h-4 text-muted-c-foreground transition-transform ${isFiltersExpanded ? 'rotate-180' : ''}`} />
                  </Button>
                </div>

                {isFiltersExpanded && (
                  <div className="space-y-6">
                    {/* Trending Toggle */}
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500">🔥</span>
                      <span className="font-medium">Trending</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsTrendingEnabled(!isTrendingEnabled)}
                        className="p-0 h-auto"
                      >
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${isTrendingEnabled ? 'bg-orange-500' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${isTrendingEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                        </div>
                      </Button>
                    </div>

                    {/* Experience Level Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Experience Level</h3>
                      <div className="flex flex-wrap gap-2">
                        {audiences.map((audience) => (
                          <Button
                            key={audience}
                            variant={selectedAudience === audience ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedAudience(audience)}
                            className={selectedAudience === audience ? "bg-primary-c text-primary-c-foreground" : ""}
                          >
                            {audience}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Content Type Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Content Type</h3>
                      <div className="flex flex-wrap gap-2">
                        {contentTypes.map((type) => (
                          <Button
                            key={type}
                            variant={selectedContentType === type ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedContentType(type)}
                            className={selectedContentType === type ? "bg-primary-c text-primary-c-foreground" : ""}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Topic Focus Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Topic Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        {topicFocus.map((topic) => (
                          <Button
                            key={topic}
                            variant={selectedTopics.includes(topic) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleTopicToggle(topic)}
                            className={selectedTopics.includes(topic) ? "bg-primary-c text-primary-c-foreground" : ""}
                          >
                            {topic}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-sm text-muted-c-foreground">
                Showing {filteredArticles.length} of {blogArticles.length} articles
                {selectedTopics.length > 0 && (
                  <span className="ml-2">
                    • Filtered by: {selectedTopics.join(", ")}
                  </span>
                )}
              </p>
            </div>

            {/* Blog Articles Grid */}
            {filteredArticles.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-c-foreground">No articles match your current filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTopics([]);
                    setIsTrendingEnabled(false);
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className={`h-40 ${article.bgImage} relative flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                          <span className="text-2xl font-bold text-white">📊</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {article.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className={tag === "New" ? "bg-orange-500 text-white" : "bg-green-500 text-white"}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Category badge at bottom */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-green-600 text-white text-xs">
                          {article.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary-c transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-c-foreground mb-4 line-clamp-2">
                        {article.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-muted-c-foreground mb-4">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.secondaryCategory}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-c-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reports Section */}
            <Card className="bg-card-green">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Career Resources
                </CardTitle>
                <p className="text-sm text-muted-c-foreground">Free guides and reports to boost your career.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <report.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground mb-1">
                        {report.title}
                      </h4>
                      <p className="text-xs text-muted-c-foreground mb-2">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-c-foreground">{report.downloads}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportDownload(report);
                          }}
                          disabled={isLoading}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {isLoading ? "..." : "Download"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-8 h-8 bg-white/20 rounded mb-3 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold mb-2">Advance Your Finance Career</h3>
                  <p className="text-sm text-white/90">
                    Join thousands of finance professionals who are getting career tips, salary benchmarks, and growth insights — straight to your inbox.
                  </p>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-white text-orange-600 hover:bg-white/90"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe for Candidate Tips"}
                  </Button>
                  <p className="text-xs text-white/70">
                    Career insights. Growth tips. Easy opt-out.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div>
                    <DialogTitle className="text-xl mb-2">{selectedArticle.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-c-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{selectedArticle.readTime}</span>
                      </div>
                      <span>{selectedArticle.date}</span>
                      <Badge variant="outline">{selectedArticle.category}</Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/blog/${selectedArticle.id}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Full Article
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <p className="text-muted-c-foreground text-lg leading-relaxed">
                  {selectedArticle.description}
                </p>

                <div className="bg-muted-c p-4 rounded-lg">
                  <p className="text-sm text-muted-c-foreground">
                    This is a preview. Click "Full Article" above to read the complete content.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
