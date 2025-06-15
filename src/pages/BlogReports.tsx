
import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpen, TrendingUp, FileText, Clock, Download } from 'lucide-react';

const BlogReports = () => {
  const allContent = [
    {
      id: 'article-1',
      type: 'article',
      title: "2024 Finance Salary Trends in MENA",
      excerpt: "Comprehensive analysis of compensation trends across financial roles in the Middle East and North Africa.",
      category: "Salary Report",
      readTime: "8 min read",
      publishedAt: "2024-05-15",
      thumbnail: 'photo-1486312338219-ce68d2c6f44d',
      isNew: true,
      targetAudience: "Hiring Manager",
    },
    {
      id: 'article-2',
      type: 'article',
      title: "The Future of Remote Finance Teams",
      excerpt: "How distributed finance teams are reshaping the industry and what it means for hiring.",
      category: "Industry Insight",
      readTime: "6 min read",
      publishedAt: "2024-05-10",
      thumbnail: 'photo-1488590528505-98d2b5aba04b',
      isNew: true,
      targetAudience: "Candidate",
    },
    {
      id: 'article-3',
      type: 'article',
      title: "Essential Skills for Finance Professionals in 2024",
      excerpt: "The top technical and soft skills employers are looking for in finance candidates.",
      category: "Skills Guide",
      readTime: "5 min read",
      publishedAt: "2024-05-05",
      thumbnail: 'photo-1518770660439-4636190af475',
      isNew: false,
      targetAudience: "Candidate",
    },
    {
      id: 'report-1',
      type: 'report',
      title: "Q2 2024 Hiring Benchmark Report",
      excerpt: "Market insights and hiring metrics for the finance sector.",
      category: "Quarterly Report",
      downloadCount: "1.2K downloads",
      thumbnail: 'photo-1461749280684-dccba630e2f6',
      isNew: false,
      targetAudience: "Hiring Manager",
    },
    {
      id: 'article-4',
      type: 'article',
      title: 'AI in Financial Recruitment',
      excerpt: 'How AI is changing the landscape of finding and hiring top financial talent.',
      category: 'Industry Insight',
      readTime: '7 min read',
      publishedAt: '2024-04-28',
      thumbnail: 'photo-1649972904349-6e44c42644a7',
      isNew: false,
      targetAudience: "Hiring Manager",
    },
    {
      id: 'report-2',
      type: 'report',
      title: "Finance Skills Gap Analysis",
      excerpt: "Understanding the gap between required and available skills.",
      category: "Research Report",
      downloadCount: "890 downloads",
      thumbnail: 'photo-1486312338219-ce68d2c6f44d',
      isNew: false,
      targetAudience: "Hiring Manager",
    },
    {
      id: 'report-3',
      type: 'report',
      title: "Remote Work in Finance: 2024 Survey",
      excerpt: "Survey results on remote work preferences in finance roles.",
      category: "Survey Report",
      downloadCount: "650 downloads",
      thumbnail: 'photo-1488590528505-98d2b5aba04b',
      isNew: false,
      targetAudience: "Hiring Manager",
    }
  ];

  const [audienceFilter, setAudienceFilter] = useState('All');
  
  const audiences = ['All', 'Hiring Manager', 'Candidate'];

  const articles = allContent.filter(item => item.type === 'article');
  const reports = allContent.filter(item => item.type === 'report');

  const filteredArticles = articles.filter(item => {
    if (audienceFilter === 'All') return true;
    return item.targetAudience === audienceFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog & Reports</h1>
            <p className="text-gray-600">Finance hiring insights, trends, and resources</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{articles.length}</div>
              <div className="text-sm text-gray-600">Articles Published</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12K</div>
              <div className="text-sm text-gray-600">Monthly Readers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
              <div className="text-sm text-gray-600">Research Reports</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 pt-6">
          {/* Left Column: Articles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-2 mb-2 border-b pb-4">
              <span className="text-sm font-medium mr-2">Show content for:</span>
                {audiences.map(audience => (
                    <Button
                        key={audience}
                        variant={audienceFilter === audience ? 'default' : 'outline'}
                        onClick={() => setAudienceFilter(audience)}
                        className="rounded-full px-4 py-1 h-auto text-sm"
                    >
                        {audience}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map(item => (
                <Card key={item.id} className="overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 rounded-lg">
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img src={`/${item.thumbnail}.jpg`} alt={item.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                    </AspectRatio>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {item.isNew && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-accent-foreground/20">New</Badge>}
                    <div className="absolute bottom-0 p-4">
                        <Badge variant="secondary" className="mb-2">{item.targetAudience}</Badge>
                        <CardTitle className="text-lg font-bold leading-snug text-white group-hover:text-amber-300 transition-colors">{item.title}</CardTitle>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50/50 p-4 mt-auto">
                    <div className="flex items-center justify-between w-full text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {item.readTime}
                      </span>
                      <span>{item.publishedAt}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column: Reports */}
          <div className="lg:col-span-1 space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
              <p className="text-gray-600">In-depth analysis and data.</p>
            </div>
            
            <div className="space-y-4">
              {reports.map(item => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogReports;
