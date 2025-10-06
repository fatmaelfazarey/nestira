import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Employer Pages
import Index from "./pages/Index";
import Inbox from "./pages/Inbox";
import TalentPool from "./pages/TalentPool";
import UnlockedTalents from "./pages/UnlockedTalents";
import Folders from "./pages/Folders";
import JobPosts from "./pages/JobPosts";
import RecruitmentBoard from "./pages/RecruitmentBoard";
import Interviews from "./pages/Interviews";
import QuizBuilder from "./pages/QuizBuilder";
import QuizTaking from "./pages/QuizTaking";
import InterviewQuestions from "./pages/InterviewQuestions";
import OfferTemplates from "./pages/OfferTemplates";
import Billing from "./pages/Billing";
import Referrals from "./pages/Referrals";
import BlogReports from "./pages/BlogReports";
import HelpCenter from "./pages/HelpCenter";
import EmailAlertsSettings from "./pages/EmailAlertsSettings";
import NestiSign from "./pages/NestiSign";
import ProfileSettings from "./pages/ProfileSettings";
import AuthProvider from "./contexts/AuthContext";
// Candidate Pages
import Applications from "./pages/Applications";
import Assessments from "./pages/Assessments";
import InterviewsCandidate from "./pages/InterviewsCandidate";
import Profile from "./pages/ProfileCandidate";
import SavedJobs from "./pages/SavedJobs";
import ATSResume from "./pages/ATSResume";
import Blog from "./pages/Blog";
import JobBrowser from "./pages/JobBrowser";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import EmployerLogin from "./components/auth/EmployerLogin";
import EmployerSignUp from "./components/auth/EmployerSignUp";

// Layouts
import EmployerLayout from "./components/EmployerLayout";
import CandidateLayout from "./components/CandidateLayout";
import CandidateDashboard from "./components/CandidateDashboard";

// Shared
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster position="top-center"  />
        <Sonner position="top-center"  />
        <BrowserRouter>
         <AuthProvider>
          <Routes>
            {/* Employer Routes */}
            <Route path="/*" element={<EmployerLayout />}>
              <Route index element={<Index />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="talent-pool" element={<TalentPool />} />
              <Route path="unlocked-talents" element={<UnlockedTalents />} />
              <Route path="folders" element={<Folders />} />
              <Route path="job-posts" element={<JobPosts />} />
              <Route path="recruitment-board" element={<RecruitmentBoard />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="quiz-builder" element={<QuizBuilder />} />
              <Route path="quiz/:quizId" element={<QuizTaking />} />
              <Route path="interview-questions" element={<InterviewQuestions />} />
              <Route path="offer-templates" element={<OfferTemplates />} />
              <Route path="billing" element={<Billing />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="blog" element={<BlogReports />} />
              <Route path="help" element={<HelpCenter />} />
              <Route path="email-alerts" element={<EmailAlertsSettings />} />
              <Route path="nesti-sign" element={<NestiSign />} />
              <Route path="profile-settings" element={<ProfileSettings />} />
              <Route path="signup" element={<EmployerSignUp />} />
              <Route path="login" element={<EmployerLogin />} />
            
            
            </Route>

            {/* Candidate Routes */}
            <Route path="/candidate/*" element={<CandidateLayout />}>
              <Route index element={<CandidateDashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route path="assessments" element={<Assessments />} />
              <Route path="interviews" element={<InterviewsCandidate />} />
              <Route path="profile" element={<Profile />} />
              <Route path="saved" element={<SavedJobs />} />
              <Route path="ats-resume" element={<ATSResume />} />
              <Route path="blog" element={<Blog />} />
              <Route path="jobs" element={<JobBrowser />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>

            {/* Root Route - Direct redirect to employer */}
            <Route path="/" element={<Navigate to="/" replace />} />

            {/* Catch all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
           </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;