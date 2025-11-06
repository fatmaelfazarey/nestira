
// import SignUp from "./components/auth/SignUp";
// import Login from "./components/auth/Login";
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AuthProvider from "@/contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import UploadResumeToAutoFill from "./components/UploadResumeToAutoFill";
import TakeAssessment from "./pages/TakeAssessment";

// Lazy load Employer Pages
const Index = lazy(() => import("./pages/Index"));
const Inbox = lazy(() => import("./pages/Inbox"));
const TalentPool = lazy(() => import("./pages/TalentPool"));
const UnlockedTalents = lazy(() => import("./pages/UnlockedTalents"));
const Folders = lazy(() => import("./pages/Folders"));
const JobPosts = lazy(() => import("./pages/JobPosts"));
const RecruitmentBoard = lazy(() => import("./pages/RecruitmentBoard"));
const Interviews = lazy(() => import("./pages/Interviews"));
const QuizBuilder = lazy(() => import("./pages/QuizBuilder"));
const QuizTaking = lazy(() => import("./pages/QuizTaking"));
const InterviewQuestions = lazy(() => import("./pages/InterviewQuestions"));
const OfferTemplates = lazy(() => import("./pages/OfferTemplates"));
const Billing = lazy(() => import("./pages/Billing"));
const Referrals = lazy(() => import("./pages/Referrals"));
const BlogReports = lazy(() => import("./pages/BlogReports"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const EmailAlertsSettings = lazy(() => import("./pages/EmailAlertsSettings"));
const NestiSign = lazy(() => import("./pages/NestiSign"));
const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
const Quiz = lazy(() => import("./pages/Quiz"));

// Lazy load Candidate Pages
const Applications = lazy(() => import("./pages/Applications"));
const Assessments = lazy(() => import("./pages/Assessments"));
const InterviewsCandidate = lazy(() => import("./pages/InterviewsCandidate"));
const Profile = lazy(() => import("./pages/ProfileCandidate"));
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const ATSResume = lazy(() => import("./pages/ATSResume"));
const Blog = lazy(() => import("./pages/Blog"));
const JobBrowser = lazy(() => import("./pages/JobBrowser"));
const CandidateDashboard = lazy(() => import("./components/CandidateDashboard"));

// Lazy load Layouts
const EmployerLayout = lazy(() => import("./components/EmployerLayout"));
const CandidateLayout = lazy(() => import("./components/CandidateLayout"));

// Lazy load Landing/Auth pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const HomePage = lazy(() => import("./components/Landing Page/Home/HomePage"));
const JobsPage = lazy(() => import("./components/Landing Page/Jobs/JobsPage"));
const AboutPage = lazy(() => import("./components/Landing Page/About/AboutPage"));
const Contact = lazy(() => import("./components/Landing Page/Contact/Contact"));
const MainLogin = lazy(() => import("./pages/MainLogin"));
const MainSign = lazy(() => import("./pages/MainSign"));
const SignAsCandidate = lazy(() => import("./components/auth/SignAsCandidate"));
const SignAsEmployer = lazy(() => import("./components/auth/SignAsEmployer"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));

// Shared
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-secondary-c"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster position="top-center" />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Landing Pages */}
                <Route path="/" element={<LandingPage />}>
                  <Route index element={<HomePage />} />
                  {/* <Route path="jobs" element={<JobsPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<Contact />} /> */}

                </Route>

                {/* Auth Pages */}
                {/* <Route path="/up" element={<UploadResumeToAutoFill />} /> */}
                <Route path="/login" element={<MainLogin />} />
                <Route path="/signup" element={<MainSign />} />
                <Route path="signup/candidate" element={<SignAsCandidate />} />
                <Route path="signup/employer" element={<SignAsEmployer />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />

                {/* Employer Routes */}
                <Route path="/employer/*" element={
                  <ProtectedRoute allowedRoles={["employer"]}>
                    <EmployerLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Index />} />
                  <Route path="inbox" element={<Inbox />} />
                  <Route path="talent-pool" element={<TalentPool />} />
                  <Route path="unlocked-talents" element={<UnlockedTalents />} />
                  <Route path="folders" element={<Folders />} />
                  <Route path="job-posts" element={<JobPosts />} />
                  <Route path="recruitment-board" element={<RecruitmentBoard />} />
                  <Route path="interviews" element={<Interviews />} />
                  <Route path="quiz-builder" element={<QuizBuilder />} />
                  <Route path="quiz-builder/:quizId" element={<Quiz />} />
                  {/* <Route path="quiz/:quizId" element={<QuizTaking />} /> */}
                  <Route path="interview-questions" element={<InterviewQuestions />} />
                  <Route path="offer-templates" element={<OfferTemplates />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="referrals" element={<Referrals />} />
                  <Route path="blog" element={<BlogReports />} />
                  <Route path="help" element={<HelpCenter />} />
                  <Route path="email-alerts" element={<EmailAlertsSettings />} />
                  <Route path="nesti-sign" element={<NestiSign />} />
                  <Route path="profile-settings" element={<ProfileSettings />} />
                  <Route path="candidate-profile/:Uid" element={<Profile />} />

                </Route>

                {/* Candidate Routes */}
                <Route path="/candidate/*" element={
                  <ProtectedRoute allowedRoles={["candidate"]}>
                    <CandidateLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<CandidateDashboard />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="assessments" element={<Assessments />} />
                  {/* <Route path="take-assessment/:assessmentId" element={<TakeAssessment />} /> */}
                  <Route path="interviews" element={<InterviewsCandidate />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="saved" element={<SavedJobs />} />
                  <Route path="ats-resume" element={<ATSResume />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="jobs" element={<JobBrowser />} />

                </Route>

                <Route
                  path="/candidate/take-assessment/:assessmentId"
                  element={
                    <ProtectedRoute allowedRoles={["candidate"]}>
                      <TakeAssessment />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all */}
                <Route path="/not-access" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
