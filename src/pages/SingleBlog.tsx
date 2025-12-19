import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, ArrowLeft, Share2, Eye, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { IP } from '@/store/Path';

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
}

interface ApiResponse {
    success: boolean;
    data: BlogArticle[];
}

const SingleBlog = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<BlogArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<BlogArticle[]>([]);

    // Update page title and meta tags for SEO
    useEffect(() => {
        if (article) {
            document.title = `${article.title} | Career Insights`;

            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', article.description);

            // Update Open Graph tags
            const updateMetaTag = (property: string, content: string) => {
                let metaTag = document.querySelector(`meta[property="${property}"]`);
                if (!metaTag) {
                    metaTag = document.createElement('meta');
                    metaTag.setAttribute('property', property);
                    document.head.appendChild(metaTag);
                }
                metaTag.setAttribute('content', content);
            };

            updateMetaTag('og:title', article.title);
            updateMetaTag('og:description', article.description);
            updateMetaTag('og:image', `${IP}/${article.image_path}`);
            updateMetaTag('og:url', window.location.href);
            updateMetaTag('og:type', 'article');

            // Add structured data
            const structuredData = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "description": article.description,
                "image": `${IP}/${article.image_path}`,
                "datePublished": article.created_at,
                "publisher": {
                    "@type": "Organization",
                    "name": "Career Insights",
                    "logo": {
                        "@type": "ImageObject",
                        "url": `${window.location.origin}/logo.png`
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": window.location.href
                }
            };

            const existingScript = document.getElementById('blog-structured-data');
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.id = 'blog-structured-data';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        return () => {
            document.title = 'Career Insights';
        };
    }, [article]);

    // Fetch single article data
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${IP}/api/blogs/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch article: ${response.status}`);
                }

                const data: ApiResponse = await response.json();

                if (data.success && data.data && data.data.length > 0) {
                    const articleData = data.data[0];
                    setArticle(articleData);

                    // Fetch related articles
                    try {
                        const allArticlesResponse = await fetch(`${IP}/api/blogs`);
                        if (allArticlesResponse.ok) {
                            const allArticlesData = await allArticlesResponse.json();
                            if (allArticlesData.success) {
                                const related = allArticlesData.data
                                    .filter((item: BlogArticle) => item.id !== parseInt(id))
                                    .slice(0, 4);
                                setRelatedArticles(related);
                            }
                        }
                    } catch (relatedError) {
                        console.log('Error fetching related articles:', relatedError);
                    }
                } else {
                    throw new Error('Article not found');
                }
            } catch (err) {
                console.error('Error fetching article:', err);
                setError(err instanceof Error ? err.message : 'Failed to load article');
                toast.error("Failed to load article", {
                    description: "Please try again later."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const shareArticle = async () => {
        if (article && navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto" />
                    <p className="text-gray-600 text-lg">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4 max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                    <h2 className="text-xl font-semibold text-gray-900">Article Not Found</h2>
                    <p className="text-gray-600">{error || 'The article you are looking for does not exist.'}</p>
                    <div className="flex gap-4 justify-center mt-4">
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                        <Button asChild variant="outline">
                            <Link to="/blog">
                                Back to Blog
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Button asChild variant="ghost" className="mb-8">
                    <Link to="/career-insights" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </Button>

                {/* Article Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                            <Badge
                                key={tag}
                                className={tag === "New" ? "bg-orange-500 text-white" : "bg-green-500 text-white"}
                            >
                                {tag}
                            </Badge>
                        ))}
                        {article.trending === 1 && (
                            <Badge className="bg-red-500 text-white">
                                🔥 Trending
                            </Badge>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                        {article.title}
                    </h1>

                    <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                        {article.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.read_time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{article.time_ago}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <Badge className="bg-blue-600 text-white">
                            {article.category}
                        </Badge>
                        {article.secondary_category && (
                            <Badge variant="outline">
                                {article.secondary_category}
                            </Badge>
                        )}
                    </div>
                </header>

                {/* Featured Image */}
                {article.image_path && (
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                            <img
                                src={article.image_path}
                                alt={article.title}
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    e.currentTarget.src = "/nestira-uploads/101ed80f-9435-4448-b400-3662735a2cb1.png";
                                }}
                            />
                        </AspectRatio>
                    </div>
                )}

                {/* Article Content */}
                <article className="prose prose-lg max-w-none mb-12">
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content }}
                        className="article-content"
                    />
                </article>

                {/* Share Section */}
                {/* <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
                    <div>
                        <h3 className="font-semibold text-foreground">Share this article</h3>
                        <p className="text-sm text-muted-foreground">Help others discover this content</p>
                    </div>
                    <Button onClick={shareArticle} className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                </div> */}

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedArticles.map(related => (
                                <Link to={`/career-insights/${related.id}`} key={related.id} className="block">
                                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group">
                                        <div className="h-40 relative overflow-hidden">
                                            <img
                                                src={related.image_path}
                                                alt={related.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/nestira-uploads/101ed80f-9435-4448-b400-3662735a2cb1.png";
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            <div className="absolute top-4 left-4 flex gap-2">
                                                {related.tags.map(tag => (
                                                    <Badge
                                                        key={tag}
                                                        className={tag === "New" ? "bg-orange-500 text-white" : "bg-green-500 text-white"}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="absolute bottom-4 left-4 right-4">
                                                <Badge className="bg-green-600 text-white text-xs">
                                                    {related.category}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            <CardTitle className="text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {related.title}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {related.description}
                                            </p>
                                            <CardFooter className="p-0">
                                                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{related.read_time}</span>
                                                    </div>
                                                    <span>{related.time_ago}</span>
                                                </div>
                                            </CardFooter>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default SingleBlog;