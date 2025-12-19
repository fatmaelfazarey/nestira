import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, Send, FileText, Filter, X, Loader2, AlertCircle } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NewsletterSubscription from '@/components/blog/NewsletterSubscription';
import { IP } from '@/store/Path';
import { Link } from 'react-router-dom';

const topicColorMap: {
  [key: string]: string;
} = {
  "AI in Finance": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700/50",
  "Career Growth": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/50",
  "MENA/GCC Focus": "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700/50",
  "Remote Work": "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-700/50",
  "Salary Trends": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700/50",
  "Skills & Hiring": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/50",
  "Survey Report": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/50",
  "Cybersecurity": "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-700/50",
  "AI": "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700/50",
  "Networking": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700/50"
};

const audienceColorMap: {
  [key: string]: string;
} = {
  "Hiring Manager": "bg-sky-500 text-white border-sky-600 dark:bg-sky-600 dark:border-sky-700",
  "Finance Candidate": "bg-lime-500 text-lime-950 border-lime-600 dark:bg-lime-600 dark:text-lime-950 dark:border-lime-700",
  "Students": "bg-purple-500 text-white border-purple-600 dark:bg-purple-600 dark:border-purple-700",
  "Developers": "bg-orange-500 text-white border-orange-600 dark:bg-orange-600 dark:border-orange-700",
  "IT Professionals": "bg-teal-500 text-white border-teal-600 dark:bg-teal-600 dark:border-teal-700"
};

// Types for the API response
interface BlogArticle {
  id: number;
  type: string;
  title: string;
  excerpt: string;
  image_path: string;
  read_time: string | null;
  views: string;
  is_new: number;
  is_trending: number;
  target_audience: string[];
  topics: string[];
  created_at: string;
  time_ago: string;
}

interface ApiResponse {
  success: boolean;
  data: BlogArticle[];
}

const BlogReports = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch data from backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${IP}/api/blog-articles`);

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          setArticles(data.data);
          console.log('Data loaded from backend:', data.data);
        } else {
          throw new Error('Failed to load articles');
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Failed to load articles');
        toast.error("Failed to load articles", {
          description: "Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Generate dynamic filters from backend data
  const allAudiences = [...new Set(articles.flatMap(item => item.target_audience))];
  const audiences = ['Show All', ...allAudiences];
  const contentTypes = [...new Set(articles.map(item => item.type))];
  const allTopics = [...new Set(articles.flatMap(item => item.topics))].sort();

  const typeDisplayNames: {
    [key: string]: string;
  } = {
    'article': 'Blog',
    'report': 'Report',
    'survey': 'Survey',
    'case-study': 'Case Study',
    'Article': 'Blog',
    'Report': 'Report',
    'Survey': 'Survey'
  };

  const roleFilter = searchParams.get('role') || 'Show All';
  const typeFilter = searchParams.get('types')?.split(',').filter(Boolean) || [];
  const topicFilter = searchParams.get('topics')?.split(',').filter(Boolean) || [];
  const trendingFilter = searchParams.get('trending') === 'true';

  const updateSearchParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, {
      replace: true
    });
  };


  const filteredContent = useMemo(() => {
    let content = [...articles];

    // Role filter (target_audience is array in backend)
    if (roleFilter !== 'Show All') {
      content = content.filter(item =>
        item.target_audience.includes(roleFilter)
      );
    }

    // Type filter
    if (typeFilter.length > 0) {
      content = content.filter(item => typeFilter.includes(item.type));
    }

    // Topic filter
    if (topicFilter.length > 0) {
      content = content.filter(item =>
        item.topics.some(topic => topicFilter.includes(topic))
      );
    }

    // Trending filter
    if (trendingFilter) {
      content = content.filter(item => item.is_trending === 1);
    }

    return content;
  }, [articles, roleFilter, typeFilter, topicFilter, trendingFilter]);

  const isFiltered = roleFilter !== 'Show All' || typeFilter.length > 0 || topicFilter.length > 0 || trendingFilter;

  // Loading state
  if (loading) {
    return (
      <div className="p-responsive">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto" />
            <p className="text-gray-600 text-lg">Loading articles...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-responsive">
        <div className="flex items-center justify-center min-h-[400px]">
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
      </div>
    );
  }

  return (
    <div className='p-responsive'>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog & Reports</h1>
          <p className="text-gray-600">Finance hiring insights, trends, and resources</p>
        </div>

        {/* Filters */}
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1" className="border bg-white border-orange-400 rounded-lg shadow-sm">
            <AccordionTrigger className="p-4 hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Filter className="w-5 h-5 text-orange-600" />
                </div>
                <span className="font-semibold text-gray-800">Filters & Sorting</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="trending-switch" className="font-medium whitespace-nowrap">🔥 Trending</Label>
                    <Switch
                      id="trending-switch"
                      checked={trendingFilter}
                      onCheckedChange={checked => updateSearchParams('trending', checked ? 'true' : null)}
                    />
                  </div>
                  {isFiltered && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto px-2 py-1 text-xs self-end sm:self-center"
                      onClick={() => setSearchParams({}, { replace: true })}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear Filters
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">I am a...</Label>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    value={roleFilter}
                    onValueChange={value => updateSearchParams('role', value === 'Show All' ? null : value)}
                    className="justify-start flex-wrap"
                  >
                    {audiences.map(audience => (
                      <ToggleGroupItem key={audience} value={audience} className="text-xs sm:text-sm">
                        {audience}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Content Type</Label>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    value={typeFilter}
                    onValueChange={value => updateSearchParams('types', value.join(','))}
                    className="justify-start flex-wrap"
                  >
                    {contentTypes.map(type => (
                      <ToggleGroupItem key={type} value={type} className="text-xs sm:text-sm">
                        {typeDisplayNames[type] || type}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Topic Focus</Label>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    value={topicFilter}
                    onValueChange={value => updateSearchParams('topics', value.join(','))}
                    className="justify-start flex-wrap"
                  >
                    {allTopics.map(topic => (
                      <ToggleGroupItem key={topic} value={topic} className="text-xs sm:text-sm">
                        {topic}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>


        <div className="flex flex-col lg:flex-row gap-8 w-full">

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
              {filteredContent.length > 0 ? filteredContent.map(item => (
                <Link to={`/blog-reports/${item.id}`} key={item.id}>

                  <Card
                    key={item.id}
                    className="flex flex-col group hover:shadow-2xl transition-all duration-500 ease-out rounded-xl overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={item.image_path}
                          alt={item.title}
                          className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                          onError={(e) => {
                            // Fallback image if the original fails to load
                            e.currentTarget.src = "/nestira-uploads/101ed80f-9435-4448-b400-3662735a2cb1.png";
                          }}
                        />
                      </AspectRatio>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {item.is_new === 1 && (
                          <Badge className="bg-accent text-accent-foreground border-accent-foreground/20 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            New
                          </Badge>
                        )}
                        {item.is_trending === 1 && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            🔥 Trending
                          </Badge>
                        )}

                        <Badge className="bg-blue-500 text-white border-transparent shadow-lg">
                          {typeDisplayNames[item.type] || item.type}
                        </Badge>
                      </div>

                      {/* Title Section */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 group-hover:-translate-y-1">
                        {item.target_audience.length > 0 && (
                          <Badge
                            className={`mb-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${audienceColorMap[item.target_audience[0] as keyof typeof audienceColorMap] || 'bg-gray-100 text-gray-800'
                              }`}
                          >
                            {item.target_audience[0]}
                          </Badge>
                        )}
                        <CardTitle className="text-lg font-bold leading-tight text-white drop-shadow-lg group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </CardTitle>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-5 flex-grow flex flex-col">
                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.topics.map(topic => (
                          <Badge
                            key={topic}
                            variant="secondary"
                            className="text-xs transition-all duration-300 hover:scale-105 hover:shadow-md"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 line-clamp-3 flex-grow mb-4 group-hover:text-gray-700 transition-colors duration-300">
                        {item.excerpt}
                      </p>

                      {/* Footer */}
                      <CardFooter className="p-0 mt-auto">
                        <div className="flex items-center justify-between w-full text-xs text-gray-500 border-t border-gray-100 pt-3 group-hover:text-gray-600 transition-colors duration-300">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 group-hover:text-blue-500 transition-colors duration-300" />
                            {item.read_time || '5 min'}
                            {item.views !== "0" && item.views !== "0" && (
                              <span className="ml-2">• {item.views} views</span>
                            )}
                          </span>
                          <span className="font-medium group-hover:text-green-600 transition-colors duration-300">
                            {item.time_ago}
                          </span>
                        </div>
                      </CardFooter>
                    </CardContent>
                  </Card>
                </Link>

              )) : (
                <div className="w-full text-center py-12 col-span-2">
                  <p className="text-gray-500 text-lg">
                    {articles.length === 0 ? 'No content available.' : 'No content matches your criteria.'}
                  </p>
                  {articles.length === 0 && (
                    <Button
                      onClick={() => window.location.reload()}
                      className="mt-4"
                    >
                      Try Again
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>


          <div className="lg:w-1/3 w-full flex-shrink-0 space-y-6 mt-6 lg:mt-0">
            <div className="transform hover:-translate-y-1 transition-transform duration-300">
              <NewsletterSubscription />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogReports;