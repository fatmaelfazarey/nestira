
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
    },
    {
      id: 'article-3',
      type: 'article',
      title: "Essential Skills for Finance Professionals in 2024",
      excerpt: "The top technical and soft skills employers are looking for in finance candidates.",
      category: "Skills Guide",
      readTime: "5 min read",
      publishedAt: "2024-05-05",
      thumbnail: 'photo-1581091226825-a6a2a5aee158',
      isNew: false,
    },
    {
      id: 'report-1',
      type: 'report',
      title: "Q2 2024 Hiring Benchmark Report",
      excerpt: "Market insights and hiring metrics for the finance sector.",
      category: "Quarterly Report",
      downloadCount: "1.2K downloads",
      thumbnail: 'photo-1518770660439-4636190af475',
      isNew: false,
    },
    {
      id: 'article-4',
      type: 'article',
      title: 'AI in Financial Recruitment',
      excerpt: 'How AI is changing the landscape of finding and hiring top financial talent.',
      category: 'Industry Insight',
      readTime: '7 min read',
      publishedAt: '2024-04-28',
      thumbnail: 'photo-1485827404703-89b55fcc595e',
      isNew: false,
    },
    {
      id: 'report-2',
      type: 'report',
      title: "Finance Skills Gap Analysis",
      excerpt: "Understanding the gap between required and available skills.",
      category: "Research Report",
      downloadCount: "890 downloads",
      thumbnail: 'photo-1526374965328-7f61d4dc18c5',
      isNew: false,
    },
    {
      id: 'report-3',
      type: 'report',
      title: "Remote Work in Finance: 2024 Survey",
      excerpt: "Survey results on remote work preferences in finance roles.",
      category: "Survey Report",
      downloadCount: "650 downloads",
      thumbnail: 'photo-1531297484001-80022131f5a1',
      isNew: false,
    }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', ...Array.from(new Set(allContent.map(item => item.category)))];

  const filteredContent = allContent.filter(item => {
    if (activeFilter === 'All') return true;
    return item.category === activeFilter;
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
              <div className="text-2xl font-bold text-gray-900">24</div>
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
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Research Reports</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6 border-b pb-4">
          <span className="text-sm font-medium mr-2">Filter by category:</span>
            {categories.map(category => (
                <Button
                    key={category}
                    variant={activeFilter === category ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(category)}
                    className="rounded-full px-4 py-1 h-auto text-sm"
                >
                    {category}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map(item => (
            <Card key={item.id} className="overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 rounded-lg">
              <div className="relative">
                <AspectRatio ratio={16 / 9}>
                  <img src={`/${item.thumbnail}.jpg`} alt={item.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {item.isNew && <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-accent-foreground/20">New</Badge>}
                <div className="absolute bottom-0 p-4">
                    <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                    <CardTitle className="text-lg font-bold leading-snug text-white group-hover:text-amber-300 transition-colors">{item.title}</CardTitle>
                </div>
              </div>
              <CardContent className="p-4 flex-grow">
                <p className="text-sm text-gray-600 line-clamp-3">{item.excerpt}</p>
              </CardContent>
              <CardFooter className="bg-gray-50/50 p-4 mt-auto">
                {item.type === 'article' && 'readTime' in item && 'publishedAt' in item ? (
                  <div className="flex items-center justify-between w-full text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.readTime}
                    </span>
                    <span>{item.publishedAt}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    {'downloadCount' in item && <span className="text-sm text-gray-500 font-medium">{item.downloadCount}</span>}
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent/80 font-semibold">
                      Download PDF
                      <Download className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogReports;
