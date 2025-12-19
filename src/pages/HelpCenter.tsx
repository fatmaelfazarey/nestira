// import React, { useEffect, useState } from 'react';
// import HelpCenterBot from '@/components/HelpCenterBot';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   BookOpen,
//   ExternalLink,
//   Image
// } from "lucide-react";
// import { useEmployerStore } from '@/store/employer store/EmployerStore';

// const HelpCenter = () => {
//   const [selectedArticle, setSelectedArticle] = useState<any>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const { getHelpArticles } = useEmployerStore();

//   const articles = [
//     // //     {
//     // //       id: 1,
//     // //       title: "Getting Started with Nestira",
//     // //       purpose: "Learn the basics of setting up your recruitment workflow, from company profile to your first job post.",
//     // //       video: {
//     // //         thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
//     // //       },
//     // //       category: "basics",
//     // //       url: "https://nestira.com/blog/getting-started-with-nestira",
//     // //     },
//     // //     {
//     // //       id: 2,
//     // //       title: "Creating Effective Job Posts",
//     // //       purpose: "A step-by-step guide to posting your job listings that attract the right talent.",
//     // //       video: {
//     // //         thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
//     // //       },
//     // //       category: "hiring",
//     // //       url: "https://nestira.com/blog/creating-effective-job-posts",
//     // //     },
//     // //     {
//     // //       id: 3,
//     // //       title: "Managing Your Talent Pool & Screening Candidates",
//     // //       purpose: "Organize, filter, and screen candidates effectively to find the best fit for your roles.",
//     // //       video: {
//     // //         thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
//     // //       },
//     // //       category: "hiring",
//     // //       url: "https://nestira.com/blog/managing-talent-pool-screening-candidates",
//     // //     },
//     // //     {
//     // //       id: 4,
//     // //       title: "Setting Up Interviews",
//     // //       purpose: "Learn how to schedule and manage candidate interviews seamlessly within Nestira.",
//     // //       video: {
//     // //         thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
//     // //       },
//     // //       category: "interviews",
//     // //       url: "https://nestira.com/blog/setting-up-interviews",
//     // //     },
//     // //     {
//     // //       id: 5,
//     // //       title: "Using the Quiz Designer",
//     // //       purpose: "Create custom assessments and quizzes to evaluate candidate skills objectively.",
//     // //       video: {
//     // //         thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
//     // //       },
//     // //       category: "tools",
//     // //       url: "https://nestira.com/blog/using-the-quiz-designer",
//     // //     },
//     // //     {
//     // //       id: 6,
//     // //       title: "Analytics & Reporting",
//     // //       purpose: "Understand your recruitment performance with our powerful analytics and reporting tools.",
//     // //       video: {
//     // //         thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
//     // //       },
//     // //       category: "tools",
//     // //       url: "https://nestira.com/blog/analytics-reporting",
//     // //     },
//     {
//       id: 1,
//       title: "Getting Started with Nestira",
//       purpose: "Learn the basics of setting up your recruitment workflow, from company profile to your first job post.",
//       video: {
//         thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
//       },
//       category: "basics",
//       url: "https://nestira.com/blog/getting-started-with-nestira",
//       content: "This comprehensive guide will walk you through the initial setup process of Nestira. You'll learn how to create your company profile, set up team members, configure your recruitment workflow, and post your first job listing. We'll cover everything from basic navigation to advanced settings to get you started quickly.",
//       hasImage: true
//     },
//     {
//       id: 2,
//       title: "Creating Effective Job Posts",
//       purpose: "A step-by-step guide to posting your job listings that attract the right talent.",
//       video: {
//         thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
//       },
//       category: "hiring",
//       url: "https://nestira.com/blog/creating-effective-job-posts",
//       content: "Learn how to craft job posts that stand out and attract qualified candidates. This guide covers best practices for job titles, descriptions, requirements, and benefits. We'll also show you how to optimize your posts for better visibility and response rates.",
//       hasImage: true
//     },
//     {
//       id: 3,
//       title: "Advanced Analytics Guide",
//       purpose: "Deep dive into advanced analytics features and reporting capabilities.",
//       category: "analytics",
//       url: "https://nestira.com/blog/advanced-analytics",
//       content: "This guide covers all advanced analytics features including custom reports, data export, and performance tracking. Learn how to leverage data to improve your recruitment strategy.",
//       hasImage: false
//     },
//     {
//       id: 4,
//       title: "Setting Up Interviews",
//       purpose: "Learn how to schedule and manage candidate interviews seamlessly within Nestira.",
//       video: {
//         thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
//       },
//       category: "interviews",
//       url: "https://nestira.com/blog/setting-up-interviews",
//     },
//     {
//       id: 5,
//       title: "Using the Quiz Designer",
//       purpose: "Create custom assessments and quizzes to evaluate candidate skills objectively.",
//       video: {
//         thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
//       },
//       category: "tools",
//       url: "https://nestira.com/blog/using-the-quiz-designer",
//     },
//     {
//       id: 6,
//       title: "Analytics & Reporting",
//       purpose: "Understand your recruitment performance with our powerful analytics and reporting tools.",
//       video: {
//         thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
//       },
//       category: "tools",
//       url: "https://nestira.com/blog/analytics-reporting",
//     }
//   ];

//   useEffect(() => {
//     fetchHelpArticles();
//   }, [])

//   const fetchHelpArticles = async () => {
//     const respose = await getHelpArticles();
//     console.log('help articles esponse :', respose);
//   }
//   const categoryStyles: Record<string, string> = {
//     basics: "bg-blue-100 text-blue-800 border-blue-200/60 hover:bg-blue-100/80",
//     hiring: "bg-green-100 text-green-800 border-green-200/60 hover:bg-green-100/80",
//     interviews: "bg-indigo-100 text-indigo-800 border-indigo-200/60 hover:bg-indigo-100/80",
//     tools: "bg-amber-100 text-amber-800 border-amber-200/60 hover:bg-amber-100/80",
//     analytics: "bg-purple-100 text-purple-800 border-purple-200/60 hover:bg-purple-100/80",
//   };

//   // Gradient backgrounds for articles without images
//   const gradientBackgrounds = [
//     "bg-gradient-to-br from-blue-50 to-blue-100",
//     "bg-gradient-to-br from-green-50 to-green-100",
//     "bg-gradient-to-br from-purple-50 to-purple-100",
//     "bg-gradient-to-br from-orange-50 to-orange-100",
//     "bg-gradient-to-br from-indigo-50 to-indigo-100",
//     "bg-gradient-to-br from-pink-50 to-pink-100"
//   ];

//   const getGradientBackground = (articleId: number) => {
//     return gradientBackgrounds[articleId % gradientBackgrounds.length];
//   };

//   const handleCardClick = (article: any) => {
//     setSelectedArticle(article);
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedArticle(null);
//   };

//   const handleExternalLink = () => {
//     if (selectedArticle?.url) {
//       window.open(selectedArticle.url, '_blank', 'noopener,noreferrer');
//       handleCloseDialog();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="space-y-8">
//         <div className="w-full">
//           <HelpCenterBot />
//         </div>

//         <Separator className="my-8" />

//         {/* Help Articles */}
//         <Card className="shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
//           <CardHeader className="pb-4 bg-purple-50/50">
//             <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-800">
//               <BookOpen className="w-5 h-5 text-purple-600" />
//               Help Articles
//             </CardTitle>
//             <CardDescription className="text-purple-700">
//               In-depth guides to help you master every feature of Nestira.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6">
//             {/* Responsive Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
//               {articles.length > 0 ? articles.map((article) => (
//                 <div
//                   key={article.id}
//                   className="block group rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
//                   onClick={() => handleCardClick(article)}
//                 >
//                   <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-accent border-2">
//                     <div className="relative">
//                       {article.video?.thumbnail ? (
//                         <img
//                           src={article.video.thumbnail}
//                           alt={article.title}
//                           className="w-full h-40 sm:h-48 object-cover bg-gray-100"
//                         />
//                       ) : (
//                         <div className={`w-full h-40 sm:h-48 flex items-center justify-center ${getGradientBackground(article.id)}`}>
//                           <div className="text-center p-4">
//                             <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
//                             <span className="text-sm text-gray-600 font-medium">{article.title}</span>
//                           </div>
//                         </div>
//                       )}
//                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
//                     </div>
//                     <div className="p-4 sm:p-5 flex flex-col flex-grow">
//                       <div className="flex-grow">
//                         <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{article.title}</h3>
//                         <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">{article.purpose}</p>
//                       </div>
//                       <div className="mt-3 sm:mt-4">
//                         <Badge className={`font-medium capitalize ${categoryStyles[article.category] || 'bg-gray-100 text-gray-800'}`}>
//                           {article.category}
//                         </Badge>
//                       </div>
//                     </div>
//                   </Card>
//                 </div>
//               )) : (
//                 <p className="text-gray-500 sm:col-span-2 lg:col-span-3 text-center">No articles available.</p>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Dialog for Article Details */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0">
//           {selectedArticle && (
//             <>
//               <DialogHeader className="p-6 pb-4 flex-shrink-0">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Badge className={`font-medium capitalize ${categoryStyles[selectedArticle.category] || 'bg-gray-100 text-gray-800'}`}>
//                       {selectedArticle.category}
//                     </Badge>
//                   </div>
//                 </div>
//                 <DialogTitle className="text-2xl font-bold mt-2">
//                   {selectedArticle.title}
//                 </DialogTitle>
//                 <DialogDescription className="text-base mt-2">
//                   {selectedArticle.purpose}
//                 </DialogDescription>
//               </DialogHeader>

//               {/* Content Area with Scroll */}
//               <div className="flex-1 overflow-y-auto px-6">
//                 {/* Thumbnail or Gradient Background */}
//                 {selectedArticle.video?.thumbnail ? (
//                   <div className="relative rounded-lg overflow-hidden mb-6">
//                     <img
//                       src={selectedArticle.video.thumbnail}
//                       alt={selectedArticle.title}
//                       className="w-full h-48 sm:h-56 object-cover bg-gray-100"
//                     />
//                   </div>
//                 ) : (
//                   <div className={`relative rounded-lg overflow-hidden mb-6 h-48 sm:h-56 flex items-center justify-center ${getGradientBackground(selectedArticle.id)}`}>
//                     <div className="text-center p-6">
//                       <Image className="w-16 h-16 mx-auto mb-3 text-gray-500" />
//                       <span className="text-lg font-semibold text-gray-700">{selectedArticle.title}</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Article Content */}
//                 <div className="space-y-4 pb-6">
//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-3 text-lg">Article Content</h3>
//                     <p className="text-gray-700 leading-relaxed text-base">
//                       {selectedArticle.content}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="border-t p-6 bg-gray-50 flex-shrink-0">
//                 <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
//                   <Button
//                     variant="outline"
//                     onClick={handleCloseDialog}
//                     className="w-full sm:w-auto"
//                   >
//                     Close
//                   </Button>
//                   <Button
//                     onClick={handleExternalLink}
//                     className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
//                   >
//                     <ExternalLink className="w-4 h-4 mr-2" />
//                     Read Full Article
//                   </Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default HelpCenter;







import React, { useEffect, useState } from 'react';
import HelpCenterBot from '@/components/HelpCenterBot';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ExternalLink,
  Image,
  Loader2
} from "lucide-react";
import { useEmployerStore } from '@/store/employer store/EmployerStore';

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  url?: string;
}

const HelpCenter = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { getHelpArticles } = useEmployerStore();

  const categoryStyles: Record<string, string> = {
    "Job Posting": "bg-blue-100 text-blue-800 border-blue-200/60 hover:bg-blue-100/80",
    "Getting Started": "bg-green-100 text-green-800 border-green-200/60 hover:bg-green-100/80",
    "basics": "bg-blue-100 text-blue-800 border-blue-200/60 hover:bg-blue-100/80",
    "hiring": "bg-green-100 text-green-800 border-green-200/60 hover:bg-green-100/80",
    "interviews": "bg-indigo-100 text-indigo-800 border-indigo-200/60 hover:bg-indigo-100/80",
    "tools": "bg-amber-100 text-amber-800 border-amber-200/60 hover:bg-amber-100/80",
    "analytics": "bg-purple-100 text-purple-800 border-purple-200/60 hover:bg-purple-100/80",
  };

  // Gradient backgrounds for articles without images
  const gradientBackgrounds = [
    "bg-gradient-to-br from-blue-50 to-blue-100",
    "bg-gradient-to-br from-green-50 to-green-100",
    "bg-gradient-to-br from-purple-50 to-purple-100",
    "bg-gradient-to-br from-orange-50 to-orange-100",
    "bg-gradient-to-br from-indigo-50 to-indigo-100",
    "bg-gradient-to-br from-pink-50 to-pink-100"
  ];

  const getGradientBackground = (articleId: number) => {
    return gradientBackgrounds[articleId % gradientBackgrounds.length];
  };

  useEffect(() => {
    fetchHelpArticles();
  }, []);

  const fetchHelpArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getHelpArticles();
      console.log('Help articles response:', response);

      if (response.success && response.data) {
        // Transform backend data to match our frontend structure
        const transformedArticles: Article[] = response.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          description: article.description,
          category: article.category,
          imageUrl: article.imageUrl,
          content: article.content,
          createdAt: article.createdAt,
          // You can add a default URL or keep it empty
          url: `https://nestira.com/blog/${article.title.toLowerCase().replace(/\s+/g, '-')}`
        }));
        
        setArticles(transformedArticles);
      } else {
        setError('Failed to load articles');
      }
    } catch (err) {
      console.error('Error fetching help articles:', err);
      setError('Error loading articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (article: Article) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedArticle(null);
  };

  // const handleExternalLink = () => {
  //   if (selectedArticle?.url) {
  //     window.open(selectedArticle.url, '_blank', 'noopener,noreferrer');
  //     handleCloseDialog();
  //   }
  // };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
          <p className="mt-2 text-gray-600">Loading help articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="space-y-8">
          <div className="w-full">
            <HelpCenterBot />
          </div>
          <Separator className="my-8" />
          <div className="text-center py-12 text-gray-500">
            <p className="text-red-500">{error}</p>
            <Button 
              onClick={fetchHelpArticles} 
              className="mt-4 bg-purple-600 hover:bg-purple-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8">
        <div className="w-full">
          <HelpCenterBot />
        </div>

        <Separator className="my-8" />

        {/* Help Articles */}
        <Card className="shadow-sm border-l-4 border-l-purple-500 bg-purple-50/30">
          <CardHeader className="pb-4 bg-purple-50/50">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-purple-800">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Help Articles
            </CardTitle>
            <CardDescription className="text-purple-700">
              In-depth guides to help you master every feature of Nestira.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
              {articles.length > 0 ? articles.map((article) => (
                <div
                  key={article.id}
                  className="block group rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                  onClick={() => handleCardClick(article)}
                >
                  <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-accent border-2">
                    <div className="relative">
                      {article.imageUrl ? (
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-40 sm:h-48 object-cover bg-gray-100"
                        />
                      ) : (
                        <div className={`w-full h-40 sm:h-48 flex items-center justify-center ${getGradientBackground(article.id)}`}>
                          <div className="text-center p-4">
                            <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <span className="text-sm text-gray-600 font-medium">{article.title}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">{article.description}</p>
                      </div>
                      <div className="flex justify-between items-center mt-3 sm:mt-4">
                        <Badge className={`font-medium capitalize ${categoryStyles[article.category] || 'bg-gray-100 text-gray-800'}`}>
                          {article.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatDate(article.createdAt)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              )) : (
                <div className="sm:col-span-2 lg:col-span-3 text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-medium">No articles available</p>
                  <p className="text-sm text-gray-400 mt-1">Check back later for new help articles</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for Article Details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0">
          {selectedArticle && (
            <>
              <DialogHeader className="p-6 pb-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`font-medium capitalize ${categoryStyles[selectedArticle.category] || 'bg-gray-100 text-gray-800'}`}>
                      {selectedArticle.category}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {formatDate(selectedArticle.createdAt)}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold mt-2">
                  {selectedArticle.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedArticle.description}
                </DialogDescription>
              </DialogHeader>

              {/* Content Area with Scroll */}
              <div className="flex-1 overflow-y-auto px-6">
                {/* Thumbnail or Gradient Background */}
                {selectedArticle.imageUrl ? (
                  <div className="relative rounded-lg overflow-hidden mb-6">
                    <img
                      src={selectedArticle.imageUrl}
                      alt={selectedArticle.title}
                      className="w-full h-48 sm:h-56 object-cover bg-gray-100"
                    />
                  </div>
                ) : (
                  <div className={`relative rounded-lg overflow-hidden mb-6 h-48 sm:h-56 flex items-center justify-center ${getGradientBackground(selectedArticle.id)}`}>
                    <div className="text-center p-6">
                      <Image className="w-16 h-16 mx-auto mb-3 text-gray-500" />
                      <span className="text-lg font-semibold text-gray-700">{selectedArticle.title}</span>
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="space-y-4 pb-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">Article Content</h3>
                    <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                      {selectedArticle.content}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t p-6 bg-gray-50 flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handleCloseDialog}
                    className="w-full sm:w-auto"
                  >
                    Close
                  </Button>
                  {/* {selectedArticle.url && (
                    <Button
                      onClick={handleExternalLink}
                      className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Button>
                  )} */}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpCenter;