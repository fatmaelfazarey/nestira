

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  ExternalLink,
  Loader2,
  AlertCircle,
  X
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { IP } from "@/store/Path";

interface BlogArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  secondary_category: string;
  read_time: string;
  created_at: string;
  time_ago: string;
  tags: string[];
  image_path: string;
  trending: number;
  target_audience?: string[];
  topics?: string[];
  type?: string; // Add type field for content type filtering
  experience_level?: string; // Add experience level field
}

interface ApiResponse {
  success: boolean;
  data: BlogArticle[];
}

export default function Blog() {
  const navigate = useNavigate();
  const [isTrendingEnabled, setIsTrendingEnabled] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState("Show All");
  const [selectedContentType, setSelectedContentType] = useState("Show All");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [email, setEmail] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${IP}/api/blogs`);

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          setArticles(data.data);
        } else {
          throw new Error('Failed to load articles');
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
        toast({
          title: "Failed to load articles",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  // Generate content types dynamically from articles
  const contentTypes = useMemo(() => {
    const types = new Set<string>();
    articles.forEach(article => {
      if (article.type) types.add(article.type);
    });
    return ["Show All", ...Array.from(types).sort()];
  }, [articles]);

  // Generate audiences dynamically from articles
  const audiences = useMemo(() => {
    const levels = new Set<string>();
    articles.forEach(article => {
      if (article.experience_level) {
        levels.add(article.experience_level);
      }
      if (article.target_audience) {
        article.target_audience.forEach(audience => levels.add(audience));
      }
    });
    return ["Show All", ...Array.from(levels).sort()];
  }, [articles]);

  // Generate topics dynamically from articles
  const topicFocus = useMemo(() => {
    const topics = new Set<string>();
    articles.forEach(article => {
      if (article.category) topics.add(article.category);
      if (article.secondary_category) topics.add(article.secondary_category);
      if (article.topics) article.topics.forEach(topic => topics.add(topic));
    });
    return Array.from(topics).sort();
  }, [articles]);

  // Filter articles based on current selections
  const filteredArticles = useMemo(() => {
    let filtered = [...articles];

    // Apply trending filter
    if (isTrendingEnabled) {
      filtered = filtered.filter(article => article.trending === 1);
    }

    // Apply audience filter (experience level)
    if (selectedAudience !== "Show All") {
      filtered = filtered.filter(article =>
        article.experience_level === selectedAudience ||
        (article.target_audience && article.target_audience.includes(selectedAudience))
      );
    }

    // Apply content type filter
    if (selectedContentType !== "Show All") {
      filtered = filtered.filter(article => article.type === selectedContentType);
    }

    // Apply topic filters
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(article =>
        selectedTopics.some(topic =>
          article.category === topic ||
          article.secondary_category === topic ||
          (article.topics && article.topics.includes(topic))
        )
      );
    }

    return filtered;
  }, [articles, isTrendingEnabled, selectedAudience, selectedContentType, selectedTopics]);

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

  const handleFullArticleClick = (article: BlogArticle) => {
    navigate(`/career-insights/${article.id}`);
  };

  const handleReportDownload = (report: any) => {
    setIsLoading(true);

    // Simulate download
    setTimeout(() => {
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

  // Check if any filters are active
  const isFiltered = isTrendingEnabled ||
    selectedAudience !== "Show All" ||
    selectedContentType !== "Show All" ||
    selectedTopics.length > 0;

  // Clear all filters
  const clearAllFilters = () => {
    setIsTrendingEnabled(false);
    setSelectedAudience("Show All");
    setSelectedContentType("Show All");
    setSelectedTopics([]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto" />
          <p className="text-gray-600 text-lg">Loading articles...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">Failed to load articles</h2>
          <p className="text-gray-600">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
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
                  <div className="ml-auto flex items-center gap-2">
                    {isFiltered && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-auto px-2 py-1 text-xs"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Clear All
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                    >
                      <ChevronDown className={`w-4 h-4 text-muted-c-foreground transition-transform ${isFiltersExpanded ? 'rotate-180' : ''}`} />
                    </Button>
                  </div>
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
                Showing {filteredArticles.length} of {articles.length} articles
                {isFiltered && (
                  <span className="ml-2">
                    •
                    {isTrendingEnabled && " Trending"}
                    {selectedAudience !== "Show All" && ` • ${selectedAudience}`}
                    {selectedContentType !== "Show All" && ` • ${selectedContentType}`}
                    {selectedTopics.length > 0 && ` • ${selectedTopics.join(", ")}`}
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
                  onClick={clearAllFilters}
                  className="mt-4"
                >
                  Clear All Filters
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
                    {/* Image Container */}
                    <div className="h-40 relative overflow-hidden">
                      <img
                        src={article.image_path}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/nestira-uploads/101ed80f-9435-4448-b400-3662735a2cb1.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

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
                        {article.trending === 1 && (
                          <Badge className="bg-red-500 text-white">
                            Trending
                          </Badge>
                        )}
                      </div>

                      {/* Content Type Badge */}
                      {article.type && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-blue-500 text-white text-xs">
                            {article.type}
                          </Badge>
                        </div>
                      )}

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
                        {article.secondary_category && (
                          <Badge variant="outline" className="text-xs">
                            {article.secondary_category}
                          </Badge>
                        )}
                        {article.experience_level && (
                          <Badge variant="secondary" className="text-xs">
                            {article.experience_level}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-c-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.read_time}</span>
                        </div>
                        <span>{article.time_ago}</span>
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
                        <span>{selectedArticle.read_time}</span>
                      </div>
                      <span>{selectedArticle.time_ago}</span>
                      <Badge variant="outline">{selectedArticle.category}</Badge>
                      {selectedArticle.type && (
                        <Badge variant="secondary">{selectedArticle.type}</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFullArticleClick(selectedArticle)}
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