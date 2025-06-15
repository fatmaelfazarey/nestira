import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, Download, FileText, Filter, X } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const allAvailableTopics = [
  "AI in Finance",
  "Career Growth",
  "MENA/GCC Focus",
  "Remote Work",
  "Salary Trends",
  "Skills & Hiring",
  "Survey Report",
];

const topicColorMap: { [key: string]: string } = {
  "AI in Finance": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700/50",
  "Career Growth": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700/50",
  "MENA/GCC Focus": "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-700/50",
  "Remote Work": "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:border-pink-700/50",
  "Salary Trends": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700/50",
  "Skills & Hiring": "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/50",
  "Survey Report": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700/50",
};

const audienceColorMap: { [key: string]: string } = {
  "Hiring Manager": "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:border-sky-700/50",
  "Finance Candidate": "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-700/50",
};

const BlogReports = () => {
  const thumbnail = "/lovable-uploads/101ed80f-9435-4448-b400-3662735a2cb1.png";
  const allContent = [
    {
      id: 'article-1',
      type: 'article',
      title: "2024 Finance Salary Trends in MENA",
      excerpt: "Comprehensive analysis of compensation trends across financial roles in the Middle East and North Africa.",
      topics: ["Salary Trends", "MENA/GCC Focus"],
      readTime: "8 min read",
      publishedAt: "2024-05-15",
      thumbnail,
      isNew: true,
      targetAudience: "Hiring Manager",
      isTrending: true,
    },
    {
      id: 'article-2',
      type: 'article',
      title: "The Future of Remote Finance Teams",
      excerpt: "How distributed finance teams are reshaping the industry and what it means for hiring.",
      topics: ["Remote Work", "Skills & Hiring"],
      readTime: "6 min read",
      publishedAt: "2024-05-10",
      thumbnail,
      isNew: true,
      targetAudience: "Finance Candidate",
    },
    {
      id: 'article-3',
      type: 'article',
      title: "Essential Skills for Finance Professionals in 2024",
      excerpt: "The top technical and soft skills employers are looking for in finance candidates.",
      topics: ["Skills & Hiring", "Career Growth"],
      readTime: "5 min read",
      publishedAt: "2024-05-05",
      thumbnail,
      isNew: false,
      targetAudience: "Finance Candidate",
    },
    {
      id: 'report-1',
      type: 'report',
      title: "Q2 2024 Hiring Benchmark Report",
      excerpt: "Market insights and hiring metrics for the finance sector.",
      topics: ["Skills & Hiring", "MENA/GCC Focus"],
      downloadCount: "1.2K downloads",
      publishedAt: "2024-04-20",
      thumbnail,
      isNew: false,
      targetAudience: "Hiring Manager",
    },
    {
      id: 'report-2',
      type: 'report',
      title: "Finance Skills Gap Analysis",
      excerpt: "Understanding the gap between required and available skills.",
      topics: ["Skills & Hiring", "Career Growth"],
      downloadCount: "890 downloads",
      publishedAt: "2024-04-15",
      thumbnail,
      isNew: false,
      targetAudience: "Hiring Manager",
    },
    {
      id: 'article-4',
      type: 'article',
      title: 'AI in Financial Recruitment',
      excerpt: 'How AI is changing the landscape of finding and hiring top financial talent.',
      topics: ["AI in Finance", "Skills & Hiring"],
      readTime: '7 min read',
      publishedAt: '2024-04-28',
      thumbnail,
      isNew: false,
      targetAudience: "Hiring Manager",
      isTrending: true,
    },
    {
      id: 'survey-1',
      type: 'survey',
      title: "Remote Work in Finance: 2024 Survey",
      excerpt: "Survey results on remote work preferences in finance roles.",
      topics: ["Remote Work", "Survey Report"],
      readTime: "4 min read",
      publishedAt: "2024-03-25",
      thumbnail,
      isNew: false,
      targetAudience: "Finance Candidate",
    },
    {
      id: 'case-study-1',
      type: 'case-study',
      title: "Case Study: Scaling a FinTech Startup's Finance Team",
      excerpt: "How Company X grew its finance department by 500% in one year.",
      topics: ["Career Growth", "Skills & Hiring", "Survey Report", "AI in Finance", "Remote Work", "MENA/GCC Focus", "Salary Trends"],
      readTime: "9 min read",
      publishedAt: "2024-03-10",
      thumbnail,
      isNew: false,
      targetAudience: 'Hiring Manager',
    }
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  
  const audiences = ['Show All', 'Hiring Manager', 'Finance Candidate'];
  const contentTypes = [...new Set(allContent.map(item => item.type))];
  const allTopics = [...new Set(allContent.flatMap(item => item.topics))].sort();
  const typeDisplayNames: { [key: string]: string } = {
    'article': 'Blog',
    'report': 'Report',
    'survey': 'Survey',
    'case-study': 'Case Study'
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
    setSearchParams(newParams, { replace: true });
  };
  
  const filteredContent = useMemo(() => {
    let content = [...allContent];

    if (roleFilter !== 'Show All') {
      content = content.filter(item => item.targetAudience === roleFilter);
    }
    if (typeFilter.length > 0) {
      content = content.filter(item => typeFilter.includes(item.type));
    }
    if (topicFilter.length > 0) {
      content = content.filter(item => item.topics.some(topic => topicFilter.includes(topic)));
    }
    if (trendingFilter) {
      content.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    return content;
  }, [roleFilter, typeFilter, topicFilter, trendingFilter]);

  const articles = filteredContent.filter(item => item.type !== 'report');
  const reports = filteredContent.filter(item => item.type === 'report');

  const isFiltered = roleFilter !== 'Show All' || typeFilter.length > 0 || topicFilter.length > 0 || trendingFilter;

  return (
    <DashboardLayout>
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
                      onCheckedChange={(checked) => updateSearchParams('trending', checked ? 'true' : null)}
                    />
                  </div>
                  {isFiltered && (
                      <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs self-end sm:self-center" onClick={() => setSearchParams({}, { replace: true })}>
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
                    onValueChange={(value) => updateSearchParams('role', value === 'Show All' ? null : value)}
                    className="justify-start flex-wrap"
                  >
                    {audiences.map(audience => (
                      <ToggleGroupItem key={audience} value={audience} className="text-xs sm:text-sm">{audience}</ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Content Type</Label>
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    value={typeFilter}
                    onValueChange={(value) => updateSearchParams('types', value.join(','))}
                    className="justify-start flex-wrap"
                  >
                    {contentTypes.map(type => (
                      <ToggleGroupItem key={type} value={type} className="text-xs sm:text-sm">{typeDisplayNames[type]}</ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Topic Focus</Label>
                  <ToggleGroup
                      type="multiple"
                      variant="outline"
                      value={topicFilter}
                      onValueChange={(value) => updateSearchParams('topics', value.join(','))}
                      className="justify-start flex-wrap"
                    >
                      {allTopics.map(topic => (
                        <ToggleGroupItem key={topic} value={topic} className="text-xs sm:text-sm">{topic}</ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 pt-6">
          {/* Left Column: Articles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.length > 0 ? articles.map(item => (
                <Card key={item.id} className="overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 rounded-lg">
                  
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-2 left-4 flex items-center gap-2">
                      {item.isNew && <Badge className="bg-accent text-accent-foreground border-accent-foreground/20">New</Badge>}
                      {(item as any).isTrending && <Badge className="bg-green-600 text-white border-transparent">🔥 Trending</Badge>}
                    </div>
                    <div className="absolute bottom-0 p-4">
                        <Badge className={`mb-2 rounded-md font-bold shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 ${audienceColorMap[item.targetAudience as keyof typeof audienceColorMap] || 'bg-gray-100 text-gray-800'}`}>{item.targetAudience}</Badge>
                        <CardTitle className="text-lg font-bold leading-snug text-white group-hover:text-amber-300 transition-colors">{item.title}</CardTitle>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.topics.map(topic => (
                        <Badge key={topic} className={topicColorMap[topic] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'}>{topic}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50/50 p-4 mt-auto">
                    <div className="flex items-center justify-between w-full text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {'readTime' in item && item.readTime}
                      </span>
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </CardFooter>
                
                </Card>
              )) : <p className="text-gray-500 md:col-span-2">No articles match your criteria.</p>}
            </div>
          </div>

          {/* Right Column: Reports */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
              <p className="text-gray-600">In-depth analysis and data.</p>
            </div>
            
            <div className="space-y-4">
              {reports.length > 0 ? reports.map(item => (
                <Card key={item.id} className="flex items-center p-4 gap-4 hover:shadow-md transition-shadow duration-300">
                  
                  <div className="bg-blue-100 p-3 rounded-lg shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800 line-clamp-2 leading-tight">{item.title}</p>
                    {'downloadCount' in item && <span className="text-sm text-gray-500 font-medium">{item.downloadCount}</span>}
                  </div>
                  <Button variant="ghost" size="icon" className="text-accent hover:text-accent/80 shrink-0">
                    <Download className="w-5 h-5" />
                  </Button>
                
                </Card>
              )) : <p className="text-gray-500">No reports match your criteria.</p>}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogReports;
