


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from "sonner";
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, ArrowLeft, Share2, Eye, Calendar } from 'lucide-react';
import { Loader2, AlertCircle } from 'lucide-react';
import { IP } from '@/store/Path';

// Types for the API response
interface Author {
    name: string;
    avatar?: string;
}

interface SingleArticle {
    id: number;
    type: string;
    title: string;
    excerpt: string;
    content: string;
    image_path: string;
    read_time: string | null;
    views: string;
    is_new: number;
    is_trending: number;
    target_audience: string[];
    topics: string[];
    created_at: string;
    time_ago: string;
    author?: Author;
}

interface ApiResponse {
    success: boolean;
    data: SingleArticle[];
}

const SingleArticle = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<SingleArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedArticles, setRelatedArticles] = useState<SingleArticle[]>([]);

    // Color mappings
    const audienceColorMap: { [key: string]: string } = {
        "Hiring Manager": "bg-sky-500 text-white border-sky-600",
        "Finance Candidate": "bg-lime-500 text-lime-950 border-lime-600",
        "Students": "bg-purple-500 text-white border-purple-600",
        "Developers": "bg-orange-500 text-white border-orange-600",
        "IT Professionals": "bg-teal-500 text-white border-teal-600"
    };

    const topicColorMap: { [key: string]: string } = {
        "AI in Finance": "bg-blue-100 text-blue-800 border-blue-200",
        "Career Growth": "bg-green-100 text-green-800 border-green-200",
        "MENA/GCC Focus": "bg-purple-100 text-purple-800 border-purple-200",
        "Remote Work": "bg-pink-100 text-pink-800 border-pink-200",
        "Salary Trends": "bg-yellow-100 text-yellow-800 border-yellow-200",
        "Skills & Hiring": "bg-indigo-100 text-indigo-800 border-indigo-200",
        "Survey Report": "bg-red-100 text-red-800 border-red-200",
        "Cybersecurity": "bg-gray-100 text-gray-800 border-gray-200",
        "AI": "bg-teal-100 text-teal-800 border-teal-200",
        "Networking": "bg-amber-100 text-amber-800 border-amber-200"
    };

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

    // Update page title and meta tags
    useEffect(() => {
        if (article) {
            document.title = `${article.title} | Nestira Blog`;

            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', article.excerpt || article.title);

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
            updateMetaTag('og:description', article.excerpt || article.title);
            updateMetaTag('og:image', `${IP}/${article.image_path}`);
            updateMetaTag('og:url', window.location.href);
            updateMetaTag('og:type', 'article');

            const structuredData = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "description": article.excerpt || article.title,
                "image": `${IP}/${article.image_path}`,
                "datePublished": article.created_at,
                "author": article.author ? {
                    "@type": "Person",
                    "name": article.author.name
                } : undefined,
                "publisher": {
                    "@type": "Organization",
                    "name": "Nestira",
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

            const existingScript = document.getElementById('article-structured-data');
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.id = 'article-structured-data';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        return () => {
            document.title = 'Nestira';
        };
    }, [article]);

    // Fetch single article data
    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${IP}/api/blog-articles/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch article: ${response.status}`);
                }

                const data: ApiResponse = await response.json();

                if (data.success && data.data && data.data.length > 0) {
                    const articleData = data.data[0];

                    const processedArticle = {
                        ...articleData,
                        topics: articleData.topics || [],
                        target_audience: articleData.target_audience || [],
                        content: articleData.content || `
                            <p>${articleData.excerpt}</p>
                            <p>This article provides insights into ${articleData.title}. 
                            For more detailed information, please contact our team.</p>
                        `
                    };

                    setArticle(processedArticle);

                    // Fetch related articles
                    try {
                        const allArticlesResponse = await fetch(`${IP}/api/blog-articles`);
                        if (allArticlesResponse.ok) {
                            const allArticlesData = await allArticlesResponse.json();
                            if (allArticlesData.success) {
                                const related = allArticlesData.data
                                    .filter((item: SingleArticle) => item.id !== parseInt(id))
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

    // Share article function
    const shareArticle = async () => {
        if (article && navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
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

    // Loading state
    if (loading) {
        return (
            <div className="p-responsive">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-4">
                        <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto" />
                        <p className="text-gray-600 text-lg">Loading article...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !article) {
        return (
            <div className="p-responsive">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-4 max-w-md">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                        <h2 className="text-xl font-semibold text-gray-900">Article Not Found</h2>
                        <p className="text-gray-600">{error || 'The article you are looking for does not exist.'}</p>
                        <div className="flex gap-4 justify-center mt-4">
                            <Button onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/blog-reports">
                                    Back to Blog
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const topics = article.topics || [];
    const targetAudience = article.target_audience || [];

    return (
        <div className="p-responsive">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Button asChild variant="ghost" className="mb-6">
                    <Link to="/blog-reports" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </Button>

                {/* Article Header */}
                <header className="mb-8">
                    {topics.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {topics.map(topic => (
                                <Badge
                                    key={topic}
                                    variant="secondary"
                                    className={`text-sm ${topicColorMap[topic] || 'bg-gray-100 text-gray-800'}`}
                                >
                                    {topic}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
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
                            <span>{article.read_time || '5 min'} read</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{article.views || '0'} views</span>
                        </div>

                        {article.author && (
                            <div className="flex items-center gap-2">
                                {article.author.avatar && (
                                    <img
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                        className="w-6 h-6 rounded-full"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                )}
                                <span>By {article.author.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {targetAudience.map(audience => (
                            <Badge
                                key={audience}
                                className={`font-semibold ${audienceColorMap[audience] || 'bg-gray-100 text-gray-800'}`}
                            >
                                {audience}
                            </Badge>
                        ))}

                        {article.is_new === 1 && (
                            <Badge className="bg-accent text-accent-foreground">
                                New
                            </Badge>
                        )}

                        {article.is_trending === 1 && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                🔥 Trending
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
                {/* <div className="  max-w-none mb-12">
                  {article.content}
                </div> */}

               

                {/* Article Content */}
                <article className="prose prose-lg max-w-none mb-12">
                    {article.content ? (
                        <div
                            dangerouslySetInnerHTML={{ __html: article.content }}
                            className="article-content"
                        />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Content not available.</p>
                            <p className="text-gray-400 mt-2">This article doesn't have detailed content yet.</p>
                        </div>
                    )}
                </article>

                {/* Share Section */}
                {/* <div className="flex items-center justify-between py-6 border-t border-b border-gray-200 mb-8">
                    <div>
                        <h3 className="font-semibold text-gray-900">Share this article</h3>
                        <p className="text-sm text-gray-600">Help others discover this content</p>
                    </div>
                    <Button onClick={shareArticle} className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                </div> */}


                {relatedArticles.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedArticles.map(related => (
                                <Link to={`/blog-reports/${related.id}`} key={related.id} className="block">
                                    <Card className="flex flex-col group hover:shadow-2xl transition-all duration-500 ease-out rounded-xl overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden">
                                            <AspectRatio ratio={16 / 9}>
                                                <img
                                                    src={related.image_path}
                                                    alt={related.title}
                                                    className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/nestira-uploads/101ed80f-9435-4448-b400-3662735a2cb1.png";
                                                    }}
                                                />
                                            </AspectRatio>

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex items-center gap-2">
                                                {related.is_new === 1 && (
                                                    <Badge className="bg-accent text-accent-foreground border-accent-foreground/20 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                                                        New
                                                    </Badge>
                                                )}
                                                {related.is_trending === 1 && (
                                                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                                                        🔥 Trending
                                                    </Badge>
                                                )}

                                                <Badge className="bg-blue-500 text-white border-transparent shadow-lg">
                                                    {typeDisplayNames[related.type] || related.type}
                                                </Badge>
                                            </div>

                                            {/* Title Section */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-500 group-hover:-translate-y-1">
                                                {related.target_audience && related.target_audience.length > 0 && (
                                                    <Badge
                                                        className={`mb-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${audienceColorMap[related.target_audience[0] as keyof typeof audienceColorMap] || 'bg-gray-100 text-gray-800'}`}
                                                    >
                                                        {related.target_audience[0]}
                                                    </Badge>
                                                )}
                                                <CardTitle className="text-lg font-bold leading-tight text-white drop-shadow-lg group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                                                    {related.title}
                                                </CardTitle>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <CardContent className="p-5 flex-grow flex flex-col">
                                            {/* Topics */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {related.topics && related.topics.map(topic => (
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
                                                {related.excerpt}
                                            </p>

                                            {/* Footer */}
                                            <CardFooter className="p-0 mt-auto">
                                                <div className="flex items-center justify-between w-full text-xs text-gray-500 border-t border-gray-100 pt-3 group-hover:text-gray-600 transition-colors duration-300">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Clock className="w-3.5 h-3.5 group-hover:text-blue-500 transition-colors duration-300" />
                                                        {related.read_time || '5 min'}
                                                        {related.views && related.views !== "0" && (
                                                            <span className="ml-2">• {related.views} views</span>
                                                        )}
                                                    </span>
                                                    <span className="font-medium group-hover:text-green-600 transition-colors duration-300">
                                                        {related.time_ago}
                                                    </span>
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

export default SingleArticle;