
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, FileText, Clock } from 'lucide-react';

const BlogReports = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "2024 Finance Salary Trends in MENA",
      excerpt: "Comprehensive analysis of compensation trends across financial roles in the Middle East and North Africa.",
      category: "Salary Report",
      readTime: "8 min read",
      publishedAt: "2024-05-15",
      featured: true
    },
    {
      id: 2,
      title: "The Future of Remote Finance Teams",
      excerpt: "How distributed finance teams are reshaping the industry and what it means for hiring.",
      category: "Industry Insight",
      readTime: "6 min read",
      publishedAt: "2024-05-10",
      featured: true
    },
    {
      id: 3,
      title: "Essential Skills for Finance Professionals in 2024",
      excerpt: "The top technical and soft skills employers are looking for in finance candidates.",
      category: "Skills Guide",
      readTime: "5 min read",
      publishedAt: "2024-05-05",
      featured: false
    }
  ];

  const reports = [
    {
      id: 1,
      title: "Q2 2024 Hiring Benchmark Report",
      description: "Market insights and hiring metrics for the finance sector",
      type: "Quarterly Report",
      downloadCount: "1.2K downloads"
    },
    {
      id: 2,
      title: "Finance Skills Gap Analysis",
      description: "Understanding the gap between required and available skills",
      type: "Research Report",
      downloadCount: "890 downloads"
    },
    {
      id: 3,
      title: "Remote Work in Finance: 2024 Survey",
      description: "Survey results on remote work preferences in finance roles",
      type: "Survey Report",
      downloadCount: "650 downloads"
    }
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredArticles.map((article) => (
                  <div key={article.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      {article.featured && (
                        <Badge className="bg-accent text-white">Featured</Badge>
                      )}
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <h3 className="font-semibold mt-2 mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span>{article.publishedAt}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{report.title}</h3>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{report.downloadCount}</span>
                      <button className="text-accent hover:text-accent/80 text-sm font-medium">
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Salary Reports', 'Industry Insights', 'Skills Guides', 'Market Trends', 'Best Practices'].map((category) => (
                    <div key={category} className="flex items-center justify-between py-2">
                      <span className="text-sm">{category}</span>
                      <Badge variant="secondary">{Math.floor(Math.random() * 10) + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogReports;
