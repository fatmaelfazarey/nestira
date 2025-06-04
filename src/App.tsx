
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inbox from "./pages/Inbox";
import TalentPool from "./pages/TalentPool";
import JobListings from "./pages/JobListings";
import RecruitmentBoard from "./pages/RecruitmentBoard";
import Interviews from "./pages/Interviews";
import QuizBuilder from "./pages/QuizBuilder";
import InterviewQuestions from "./pages/InterviewQuestions";
import OfferTemplates from "./pages/OfferTemplates";
import Billing from "./pages/Billing";
import Referrals from "./pages/Referrals";
import BlogReports from "./pages/BlogReports";
import HelpCenter from "./pages/HelpCenter";
import EmailAlertsSettings from "./pages/EmailAlertsSettings";
import UserGuide from "./pages/UserGuide";
import NestiSign from "./pages/NestiSign";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/talent-pool" element={<TalentPool />} />
          <Route path="/job-listings" element={<JobListings />} />
          <Route path="/recruitment-board" element={<RecruitmentBoard />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/quiz-builder" element={<QuizBuilder />} />
          <Route path="/interview-questions" element={<InterviewQuestions />} />
          <Route path="/offer-templates" element={<OfferTemplates />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/blog" element={<BlogReports />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/email-alerts" element={<EmailAlertsSettings />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/nesti-sign" element={<NestiSign />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
