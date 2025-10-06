import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  FileText, 
  Star, 
  Calendar, 
  Square,
  CircleCheck,
  FileSpreadsheet,
  Search,
  Video,
  Zap,
  LogIn,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const mainNavItems = [
  { title: "Dashboard", url: "/candidate", icon: Square },
  { title: "My Applications", url: "/candidate/applications", icon: FileText },
  { title: "Assessments", url: "/candidate/assessments", icon: CircleCheck },
  { title: "Interview Schedule", url: "/candidate/interviews", icon: Calendar },
];

const accountNavItems = [
  { title: "Profile", url: "/candidate/profile", icon: User },
  { title: "Saved Jobs", url: "/candidate/saved", icon: Star },
  { title: "ATS Resume Maker", url: "/candidate/ats-resume", icon: FileSpreadsheet },
  { title: "Career Insights", url: "/candidate/blog", icon: FileText },
];

export function CandidateSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const getLinkClasses = (path: string) => {
    const base = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm  font-medium transition-all duration-200 hover:bg-accent-c/50 relative";
    return isActive(path) 
      ? `${base} bg-accent-c text-primary shadow-sm border-l-4 border-secondary-c` 
      : `${base} text-muted-foreground hover:text-primary-foreground hover:border-l-4 hover:border-secondary-c/50`;
  };

  const handleBrowseJobsClick = () => {
    navigate("/candidate/jobs");
  };

  const handleAuthAction = async () => {
    if (currentUser) {
      // Logout
      try {
        setLoggingOut(true);
        await logout();
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.success("Logged out successfully!");
        navigate("/candidate/");
      } catch (error: any) {
        toast.error(error.message || "Failed to logout");
      } finally {
        setLoggingOut(false);
      }
    } else {
      // Redirect to login
      navigate("/candidate/login");
    }
  };

  return (
   <div className="w-64 bg-primary border-r border-border-c flex flex-col h-screen sticky top-0 left-0 overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-border-c/20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <img 
              src="/lovable-uploads/b7d3bd2f-64c7-4971-a4e6-bd1f4e1b4de5.png" 
              alt="Nestira Finance Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h5 className="font-semibold text-primary-foreground">Nestira Finance</h5>
            <p className="text-xs text-primary-foreground/70">Powered by Nestira</p>
          </div>
        </div>
      </div>

      {/* Browse Jobs Button */}
      <div className="p-4 flex-shrink-0">
        <Button 
          onClick={handleBrowseJobsClick}
          className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground shadow-lg transition-all duration-200 hover:shadow-xl rounded-lg"
        >
          <Search className="w-4 h-4 mr-2" />
          Browse Jobs
        </Button>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="px-4 space-y-8 flex-1 overflow-y-auto">
        <div>
          <h3 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider mb-3">
            MAIN
          </h3>
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <li key={item.title}>
                <NavLink to={item.url} className={getLinkClasses(item.url)}>
                  <item.icon className="w-4 h-4" />
                  <span >{item.title}</span>
                  {item.title === "My Applications" && (
                    <Badge variant="secondary" className="ml-auto bg-secondary-c text-secondary-c-foreground text-xs">
                      3
                    </Badge>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-primary-c-foreground/60 uppercase tracking-wider mb-3">
            ACCOUNT
          </h3>
          <ul className="space-y-1">
            {accountNavItems.map((item) => (
              <li key={item.title}>
                <NavLink to={item.url} className={getLinkClasses(item.url)}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Video Introduction Banner */}
          <div className="mt-4">
            <div className="bg-card-blue rounded-xl p-4 border border-primary-c/10 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1 bg-success/20 text-success px-2 py-1 rounded-full text-xs font-medium mb-3">
                <Zap className="w-3 h-3" />
                5x more views!
              </div>

              <h3 className="font-bold text-primary-c text-sm mb-2">
                Stand Out with Introductory Videos!
              </h3>
              <p className="text-xs text-primary-c/70 leading-relaxed mb-4">
                Introduce yourself to employers with a personalized video. Highlight your skills, experience, and unique qualities.
              </p>

              <Button 
                className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground text-sm py-2 transition-all duration-200 hover:scale-105"
                size="sm"
              >
                <Video className="w-4 h-4 mr-2" />
                Try Now!
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login/Logout Button - Fixed at bottom */}
      <div className="p-4 border-t border-border-c/20 flex-shrink-0">
        <Button
          onClick={handleAuthAction}
          disabled={loggingOut}
          className={`w-full transition-all duration-200 ${
            currentUser
              ? "bg-secondary-c hover:opacity-[.8] text-destructive-foreground"
              : " hover:opacity-[.8] text-primary-c-foreground  bg-secondary-c"
          }`}
        >
          {loggingOut ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging out...
            </span>
          ) : currentUser ? (
            <>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </>
          )}
        </Button>
        
        {currentUser && (
          <p className="text-xs text-center text-primary-c-foreground/60 mt-2 truncate">
            {currentUser.email}
          </p>
        )}
      </div>
    </div>
  );
}