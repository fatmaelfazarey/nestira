import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Eye, Clock, TrendingUp, Calendar, Edit, Trash2, Filter, Network, FileText, BarChart, Loader2 } from 'lucide-react';
import AddBlogDialog from '@/components/Admin components/Blogs/AddBlogDialog';
import AddReportDialog from '@/components/Admin components/Blogs/AddReportDialog';
import { useAdminStore } from '@/store/Admin store/AdminStore';
import { useNavigate } from 'react-router-dom';

interface BlogItem {
    id: number;
    title: string;
    description: string;
    content: string | null;
    category: string;
    secondary_category?: string;
    read_time: string;
    tags: string[];
    image_path: string | null;
    trending: number;
    created_at: string;
    is_published: number;
    time_ago: string;
}

interface ArticleItem {
    id: number;
    type: string;
    title: string;
    excerpt: string;
    content: string | null;
    image_path: string | null;
    read_time: string | null;
    views: number;
    is_new: number;
    is_trending: number;
    target_audience: string[];
    topics: string[];
    created_at: string;
    is_published: number;
    time_ago: string;
    admin_uid?: string;
}

const Blogs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'blogs' | 'reports'>('blogs');
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [reports, setReports] = useState<ArticleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [addBlogOpen, setAddBlogOpen] = useState(false);
    const [addReportOpen, setAddReportOpen] = useState(false);
    const { getBlogs, getArticles, deleteBlog, deleteArticle } = useAdminStore();
    const navigate = useNavigate();

    const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
    const [editingReport, setEditingReport] = useState<ArticleItem | null>(null);

    // Function to load blogs
    const loadBlogs = () => {
        setLoading(true);
        getBlogs(
            (data: any) => {
                if (data?.success && data.data) {
                    setBlogs(Array.isArray(data.data) ? data.data : []);
                } else {
                    setBlogs([]);
                    console.warn('Blogs data is null or empty');
                }
                setLoading(false);
            },
            () => setLoading(false),
            (error: any) => {
                toast({
                    title: 'Error',
                    description: `Failed to load blogs: ${error}`,
                    variant: 'destructive',
                });
                setBlogs([]);
                setLoading(false);
            }
        );
    };

    // Function to load reports
    const loadReports = () => {
        setLoading(true);
        getArticles(
            (data: any) => {
                if (data?.success && data.data) {
                    setReports(Array.isArray(data.data) ? data.data : []);
                } else {
                    setReports([]);
                    console.warn('Reports data is null or empty');
                }
                setLoading(false);
            },
            () => setLoading(false),
            (error: any) => {
                toast({
                    title: 'Error',
                    description: `Failed to load reports: ${error}`,
                    variant: 'destructive',
                });
                setReports([]);
                setLoading(false);
            }
        );
    };

    // Load both blogs and reports
    const loadData = () => {
        setLoading(true);
        loadBlogs();
        loadReports();
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleEditBlog = (blog: BlogItem) => {
        setEditingBlog(blog);
        setAddBlogOpen(true);
    };

    const handleEditReport = (report: ArticleItem) => {
        setEditingReport(report);
        setAddReportOpen(true);
    };

    const handleCloseBlogDialog = () => {
        setAddBlogOpen(false);
        setEditingBlog(null);
        loadBlogs(); // Refresh blogs after dialog closes
    };

    const handleCloseReportDialog = () => {
        setAddReportOpen(false);
        setEditingReport(null);
        loadReports(); // Refresh reports after dialog closes
    };

    const handlePublishBlog = async (id: number, is_published: number) => {
        try {
            // Update local state immediately
            setBlogs(prev => prev.map(blog =>
                blog.id === id ? { ...blog, is_published } : blog
            ));

            toast({
                title: 'Success',
                description: `Blog ${is_published === 1 ? 'published' : 'unpublished'} successfully`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update blog status',
                variant: 'destructive',
            });
            loadBlogs(); // Reload if error
        }
    };

    const handleUpdateReportStatus = async (id: number, field: 'is_published' | 'is_new' | 'is_trending', value: number) => {
        try {
            // Update local state immediately
            setReports(prev => prev.map(report =>
                report.id === id ? { ...report, [field]: value } : report
            ));

            toast({
                title: 'Success',
                description: `Report ${field.replace('_', ' ')} updated`,
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update report status',
                variant: 'destructive',
            });
            loadReports(); // Reload if error
        }
    };

    const handlePublishReport = async (id: number, is_published: number) => {
        await handleUpdateReportStatus(id, 'is_published', is_published);
    };

    const handleNewStatus = async (id: number, is_new: number) => {
        await handleUpdateReportStatus(id, 'is_new', is_new);
    };

    const handleTrendingStatus = async (id: number, is_trending: number) => {
        await handleUpdateReportStatus(id, 'is_trending', is_trending);
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'article': return <FileText className="h-4 w-4" />;
            case 'report': return <BarChart className="h-4 w-4" />;
            case 'survey': return <Network className="h-4 w-4" />;
            case 'case-study': return <FileText className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const handleDeleteBlog = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const result = await deleteBlog(id);
            if (result?.success) {
                toast({
                    title: 'Success',
                    description: 'Blog deleted successfully',
                });
                loadBlogs();
            } else {
                throw new Error(result?.message || 'Failed to delete blog');
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete blog',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteArticle = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this article?')) {
            return;
        }

        try {
            const result = await deleteArticle(id);
            if (result?.success) {
                toast({
                    title: 'Success',
                    description: 'Article deleted successfully',
                });
                loadReports();
            } else {
                throw new Error(result?.message || 'Failed to delete article');
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete article',
                variant: 'destructive',
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">Loading blogs and reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Blogs & Reports</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your blog articles and research reports
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setEditingBlog(null);
                            setAddBlogOpen(true);
                        }}
                        className="flex-1 sm:flex-none"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Blog
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setEditingReport(null);
                            setAddReportOpen(true);
                        }}
                        className="flex-1 sm:flex-none"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Report
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="blogs" className="space-y-6" onValueChange={(v) => setActiveTab(v as any)}>
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="blogs" className="text-sm sm:text-base">
                        Blog Articles ({blogs.length})
                    </TabsTrigger>
                    <TabsTrigger value="reports" className="text-sm sm:text-base">
                        Reports ({reports.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="blogs" className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                                <Filter className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Filter
                            </Button>
                            <Badge variant="secondary" className="text-xs sm:text-sm">
                                {blogs.filter(b => b.is_published === 1).length} Published
                            </Badge>
                            <Badge variant="secondary" className="text-xs sm:text-sm">
                                {blogs.filter(b => b.trending === 1).length} Trending
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {blogs.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">No blogs found</h3>
                                <p className="text-muted-foreground mt-2">Add your first blog to get started</p>
                            </div>
                        ) : (
                            blogs.map((blog) => (
                                <Card key={blog.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative h-40 sm:h-48 w-full">
                                        <img
                                            src={blog.image_path || 'https://via.placeholder.com/400x250?text=No+Image'}
                                            alt={blog.title}
                                            className="object-cover w-full h-full"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                                            {blog.trending === 1 && (
                                                <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                                                    <TrendingUp className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                                                    Trending
                                                </Badge>
                                            )}
                                            {blog.is_published === 0 && (
                                                <Badge variant="outline" className="bg-background/80 text-xs">
                                                    Draft
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <CardTitle className="text-base sm:text-lg line-clamp-2 mb-1 truncate">
                                                    {blog.title}
                                                </CardTitle>
                                                <Badge variant="outline" className="text-xs mb-2 truncate">
                                                    {blog.category}
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardDescription className="line-clamp-2 text-sm sm:text-base">
                                            {blog.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pb-2 sm:pb-3 px-3 sm:px-6 flex-grow">
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {blog.tags.slice(0, 3).map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            {blog.tags.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{blog.tags.length - 3} more
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {blog.read_time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(blog.created_at)}
                                            </span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-2 sm:pt-3 px-3 sm:px-6 border-t">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-xs text-muted-foreground truncate">
                                                {blog.time_ago}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                                                    onClick={() => navigate(`/career-insights/${blog.id}`)}
                                                    title="View"
                                                >
                                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                                                    onClick={() => handleEditBlog(blog)}
                                                    title="Edit"
                                                >
                                                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive"
                                                    title="Delete"
                                                    onClick={() => handleDeleteBlog(blog.id)}
                                                >
                                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                                <Filter className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                Filter
                            </Button>
                            <Badge variant="secondary" className="text-xs sm:text-sm">
                                {reports.filter(r => r.is_published === 1).length} Published
                            </Badge>
                            <Badge variant="secondary" className="text-xs sm:text-sm">
                                {reports.filter(r => r.is_new === 1).length} New
                            </Badge>
                            <Badge variant="secondary" className="text-xs sm:text-sm">
                                {reports.filter(r => r.is_trending === 1).length} Trending
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {reports.length === 0 ? (
                            <div className="col-span-full text-center py-12">
                                <BarChart className="h-12 w-12 mx-auto text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-semibold">No reports found</h3>
                                <p className="text-muted-foreground mt-2">Add your first report to get started</p>
                            </div>
                        ) : (
                            reports.map((report) => (
                                <Card key={report.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative h-40 sm:h-48 w-full">
                                        <img
                                            src={report.image_path || 'https://via.placeholder.com/400x250?text=No+Image'}
                                            alt={report.title}
                                            className="object-cover w-full h-full"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                                            {report.is_new === 1 && (
                                                <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                                                    <Network className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                                                    New
                                                </Badge>
                                            )}
                                            {report.is_trending === 1 && (
                                                <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                                                    <TrendingUp className="mr-1 h-2 w-2 sm:h-3 sm:w-3" />
                                                    Trending
                                                </Badge>
                                            )}
                                            {report.is_published === 0 && (
                                                <Badge variant="outline" className="bg-background/80 text-xs">
                                                    Draft
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-primary">
                                                        {getTypeIcon(report.type)}
                                                    </span>
                                                    <Badge variant="outline" className="capitalize text-xs truncate">
                                                        {report.type}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-base sm:text-lg line-clamp-2 truncate">
                                                    {report.title}
                                                </CardTitle>
                                            </div>
                                        </div>
                                        <CardDescription className="line-clamp-2 text-sm sm:text-base">
                                            {report.excerpt}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pb-2 sm:pb-3 px-3 sm:px-6 flex-grow">
                                        <div className="space-y-3">
                                            {report.topics.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <span className="text-xs font-medium">Topics:</span>
                                                    {report.topics.slice(0, 2).map((topic, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {topic}
                                                        </Badge>
                                                    ))}
                                                    {report.topics.length > 2 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{report.topics.length - 2} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}

                                            {report.target_audience.length > 0 && (
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <span className="text-xs font-medium">Audience:</span>
                                                    {report.target_audience.slice(0, 2).map((audience, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {audience}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mt-4">
                                            {report.read_time && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {report.read_time}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {report.views.toLocaleString()} views
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(report.created_at)}
                                            </span>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-2 sm:pt-3 px-3 sm:px-6 border-t">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-xs text-muted-foreground truncate">
                                                {report.time_ago}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                                                    onClick={() => navigate(`/blog-reports/${report.id}`)}
                                                    title="View"
                                                >
                                                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                                                    onClick={() => handleEditReport(report)}
                                                    title="Edit"
                                                >
                                                    <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive"
                                                    title="Delete"
                                                    onClick={() => handleDeleteArticle(report.id)}
                                                >
                                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>

            {/* Dialogs */}
            <AddBlogDialog
                open={addBlogOpen}
                onOpenChange={handleCloseBlogDialog}
                onSuccess={() => {
                    loadBlogs();
                    toast({
                        title: 'Success',
                        description: 'Blog operation completed successfully',
                    });
                }}
                edit={editingBlog}
            />
            <AddReportDialog
                open={addReportOpen}
                onOpenChange={handleCloseReportDialog}
                onSuccess={() => {
                    loadReports();
                    toast({
                        title: 'Success',
                        description: 'Report operation completed successfully',
                    });
                }}
                edit={editingReport}
            />
        </div>
    );
};

export default Blogs;