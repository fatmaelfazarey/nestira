import { BlogArticle, ArticleReport, BlogsResponse } from './blogsService';

// Generate mock data
const generateMockBlogArticles = (count: number): BlogArticle[] => {
  const categories = ['Technology', 'Business', 'Health', 'Education', 'Lifestyle'];
  const tags = ['React', 'TypeScript', 'JavaScript', 'Web Development', 'AI', 'Cloud', 'Startup', 'Marketing'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    admin_uid: `admin_${Math.floor(Math.random() * 10) + 1}`,
    title: `Blog Article ${i + 1}: The Future of Web Development`,
    description: `This is a detailed description of blog article ${i + 1} discussing important topics in modern web development.`,
    content: `<h1>Blog Content ${i + 1}</h1><p>Full content here...</p>`,
    category: categories[Math.floor(Math.random() * categories.length)],
    secondary_category: categories[Math.floor(Math.random() * categories.length)],
    read_time: `${Math.floor(Math.random() * 15) + 5} min`,
    tags: Array.from({ length: 3 }, () => tags[Math.floor(Math.random() * tags.length)]),
    image_path: `https://picsum.photos/seed/blog${i + 1}/600/400`,
    trending: Math.random() > 0.7,
    is_published: Math.random() > 0.3,
    created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const generateMockArticleReports = (count: number): ArticleReport[] => {
  const types = ['Research Paper', 'Industry Report', 'Case Study', 'White Paper'];
  const topics = ['AI', 'Blockchain', 'Cybersecurity', 'Fintech', 'Healthcare', 'Education', 'Sustainability'];
  const audiences = ['Developers', 'Managers', 'Executives', 'Students', 'Researchers'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    admin_uid: `admin_${Math.floor(Math.random() * 10) + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    title: `${types[Math.floor(Math.random() * types.length)]} Report ${i + 1}: Market Analysis`,
    excerpt: `This report ${i + 1} provides comprehensive analysis of current market trends and future predictions.`,
    image_path: `https://picsum.photos/seed/report${i + 1}/600/400`,
    read_time: `${Math.floor(Math.random() * 20) + 10} min`,
    views: Math.floor(Math.random() * 10000),
    is_new: Math.random() > 0.8,
    is_trending: Math.random() > 0.7,
    is_published: Math.random() > 0.4,
    target_audience: Array.from({ length: 2 }, () => audiences[Math.floor(Math.random() * audiences.length)]),
    topics: Array.from({ length: 3 }, () => topics[Math.floor(Math.random() * topics.length)]),
    created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

class MockBlogsService {
  private blogArticles: BlogArticle[];
  private articleReports: ArticleReport[];

  constructor() {
    this.blogArticles = generateMockBlogArticles(15);
    this.articleReports = generateMockArticleReports(15);
  }

  async getAllBlogsAndReports(): Promise<BlogsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      blogArticles: [...this.blogArticles],
      articleReports: [...this.articleReports],
      totalBlogs: this.blogArticles.length,
      totalReports: this.articleReports.length
    };
  }

  async updateBlogPublishStatus(id: number, is_published: boolean): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.blogArticles.findIndex(blog => blog.id === id);
    if (index !== -1) {
      this.blogArticles[index].is_published = is_published;
    }
  }

  async updateReportPublishStatus(id: number, is_published: boolean): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.articleReports.findIndex(report => report.id === id);
    if (index !== -1) {
      this.articleReports[index].is_published = is_published;
    }
  }

  async addBlogArticle(blog: Omit<BlogArticle, 'id' | 'created_at'>): Promise<BlogArticle> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newBlog = {
      ...blog,
      id: this.blogArticles.length + 1,
      created_at: new Date().toISOString()
    };
    this.blogArticles.push(newBlog);
    return newBlog;
  }

  async addArticleReport(report: Omit<ArticleReport, 'id' | 'created_at'>): Promise<ArticleReport> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newReport = {
      ...report,
      id: this.articleReports.length + 1,
      created_at: new Date().toISOString()
    };
    this.articleReports.push(newReport);
    return newReport;
  }
}

export const mockBlogsService = new MockBlogsService();