import {
  Grid2X2,
  Inbox,
  User,
  Plus,
  File,
  List,
  Check,
  Calendar,
  BookOpen,
  HelpCircle,
  CreditCard,
  Users,
  Settings,
  UserCheck,
  Building2,
  DollarSign,
  Folder,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NestiraRecruitModal } from "./NestiraRecruitModal";
import { NestiraRemoteModal } from "./NestiraRemoteModal";
import { RoleSelectionModal } from "./RoleSelectionModal";
import { JobCreationModal } from "./JobCreationModal";
import { InternshipCreationModal } from "./InternshipCreationModal";
import { useState } from "react";
import { toast } from "sonner";

// import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
// import { addIntern, addJob } from "@/store/employer store/store";
import { useEmployerStore } from "@/store/employer store/EmployerStore";

const token = localStorage.getItem("token")
// Navigation items organized by sections
const navigationSections = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/employer",
        icon: Grid2X2,
        badge: null
      },
      {
        title: "Inbox",
        url: "/employer/inbox",
        icon: Inbox,
        badge: "3"
      }
    ]
  },
  {
    label: "Hiring",
    items: [
      {
        title: "Talent Pool",
        url: "/employer/talent-pool",
        icon: User,
        badge: null
      },
      {
        title: "Unlocked Talents",
        url: "/employer/unlocked-talents",
        icon: Users,
        badge: null
      },
      {
        title: "Folders",
        url: "/employer/folders",
        icon: Folder,
        badge: null
      },
      {
        title: "Job Posts",
        url: "/employer/job-posts",
        icon: File,
        badge: null
      },
      {
        title: "Interviews",
        url: "/employer/interviews",
        icon: Calendar,
        badge: null
      },
      {
        title: "Recruitment Board",
        url: "/employer/recruitment-board",
        icon: List,
        badge: null
      }
    ]
  },
  {
    label: "Tools",
    items: [
      {
        title: "Quiz Builder",
        url: "/employer/quiz-builder",
        icon: Check,
        badge: null
      },
      {
        title: "Blog & Reports",
        url: "/employer/blog",
        icon: BookOpen,
        badge: null
      }
    ]
  },
  {
    label: "Account",
    items: [
      {
        title: "Billing",
        url: "/employer/billing",
        icon: CreditCard,
        badge: null
      },
      {
        title: "Referrals",
        url: "/employer/referrals",
        icon: Users,
        badge: null
      },
      {
        title: "Settings",
        url: token ? "/employer/profile-settings" : "/signup",
        icon: Settings,
        badge: null
      },
      {
        title: "Help Center",
        url: "/employer/help",
        icon: HelpCircle,
        badge: null
      }
    ]
  }
];
export function AppSidebar() {
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isRemoteModalOpen, setIsRemoteModalOpen] = useState(false);
  const [isRoleSelectionModalOpen, setIsRoleSelectionModalOpen] = useState(false);
  const [isJobCreationModalOpen, setIsJobCreationModalOpen] = useState(false);
  const [isInternshipCreationModalOpen, setIsInternshipCreationModalOpen] = useState(false);

  const { addIntern, addJob } = useEmployerStore()
  const { toast } = useToast();
  const [loggingOut, setLoggingOut] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async () => {
    if (currentUser) {
      // Logout
      try {
        setLoggingOut(true);
        await logout();
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        toast.success("Logged out successfully!");

        navigate("/");
      } catch (error: any) {
        toast.error(error.message || "Failed to logout");
      } finally {
        setLoggingOut(false);
      }
    } else {
      // Redirect to login
      navigate("/login");
    }
  };
  console.log({ token })
  const handlePostNewRole = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Post new role clicked from sidebar');
    setIsRoleSelectionModalOpen(true);
  };

  const handleRoleSelected = (roleType: 'job' | 'internship') => {
    console.log('Role selected:', roleType);
    if (roleType === 'job') {
      setIsJobCreationModalOpen(true);
    } else {
      setIsInternshipCreationModalOpen(true);
    }
  };

  const handleJobCreated = async (newJob: any) => {
    console.log('New job created from sidebar:', newJob);
    // alert("New job created from sidebar")
    // alert(newJob);
    await handleAddJobs(newJob);
    toast({
      title: "Job Posted Successfully!",
      description: `"${newJob.title}" has been posted and is now live.`,
    });
  };

  //#region add job to backend

  const [addJobsError, setAddJobsError] = useState<string | null>(null);
  const [addJobsLoading, SetAddJobsLoading] = useState(false);

  const handleAddJobs = async (job: any) => {
    if (job && job.title && job.description) {

      try {
        const addJobData = await addJob(job, setAddJobsError, SetAddJobsLoading);
        if (addJobData.success) {
          toast({
            title: "Job Posted Successfully!",
            description: `"${addJobData.data.job.title}" has been posted and is now live.`,
          });
        } else {
          toast({
            title: "Failed to add data. Make sure you are connected to the server.",
          });
          console.log('there is an error');
        }
      } catch (err) {
        console.log('error : ', err)
      }

    } else {
      toast.error('Fill out all input fields');
    }
  }

  const handleAddIntern = async (intern: any) => {
    if (intern && intern.title && intern.description) {

      try {
        const addInternData = await addIntern(intern);
        if (addInternData.success) {
          toast({
            title: "addInternData Posted Successfully!",
            description: `"${addInternData.data.job.title}" has been posted and is now live.`,
          });
        } else {
          toast({
            title: "Failed to add data. Make sure you are connected to the server.",
          });
          console.log('there is an error');
        }
      } catch (err) {
        console.log('error : ', err)
      }

    } else {
      toast.error('Fill out all input fields');
    }
  }

  ////#endregion

  const handleInternshipCreated = async (newInternship: any) => {
    console.log('New internship created from sidebar:', newInternship);


    await handleAddIntern(newInternship);


    // toast({
    //   title: "Internship Posted Successfully!",
    //   description: `"${newInternship.title}" internship has been posted and is now live.`,
    // });

  };

  return (
    <>
      <Sidebar className="border-r border-gray-200/60 bg-gradient-to-b from-slate-50 to-white min-w-0 shrink-0">
        <SidebarHeader className="p-responsive-sm border-b border-gray-100">
          <Button
            className="bg-accent hover:bg-accent/90 text-white w-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-3 min-w-0"
            onClick={handlePostNewRole}
            type="button"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="truncate">Post New Role</span>
          </Button>
        </SidebarHeader>

        <SidebarContent >

          <div className="px-2 sm:px-4 py-2 min-w-0">
            {navigationSections.map((section) => (
              <SidebarGroup key={section.label} className="mb-responsive">
                <SidebarGroupLabel className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-4 px-3 truncate">
                  {section.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className="hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5 hover:border-l-4 hover:border-accent transition-all duration-200 rounded-lg group py-3 min-w-0"
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-accent font-medium min-w-0">
                            <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                            <span className="text-responsive-sm truncate">{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto bg-gradient-to-r from-accent to-orange-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

          </div>

          <div className="p-3 relative  min-w-0" style={{ backgroundColor: '#00102c' }}>
            {/* Orange circles background decoration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 right-6 w-16 h-16 bg-orange-500/20 rounded-full"></div>
              <div className="absolute bottom-8 left-4 w-12 h-12 bg-orange-600/15 rounded-full"></div>
              <div className="absolute top-12 left-8 w-8 h-8 bg-orange-400/25 rounded-full"></div>
              <div className="absolute bottom-4 right-12 w-6 h-6 bg-orange-500/30 rounded-full"></div>
            </div>

            <div className="space-y-2 relative z-10 min-w-0">
              {/* Nestira Recruit */}
              <Button
                onClick={() => setIsRecruitModalOpen(true)}
                className="w-full h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0 min-w-0"
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">Let us hire for you →</span>
              </Button>

              {/* Nestira Remote */}
              <Button
                onClick={() => setIsRemoteModalOpen(true)}
                className="w-full h-10 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0 min-w-0"
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span className="truncate">Hire remotely. We manage →</span>
              </Button>

              {/* Refer & Earn */}
              <Button asChild className="w-full h-10 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0 min-w-0">
                <Link to="/employer/referrals" className="flex items-center justify-center gap-2 min-w-0">
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span className="truncate">Refer and get paid →</span>
                </Link>
              </Button>
            </div>

            <div className="text-xs text-white text-center font-bold mt-4 relative z-10 truncate">
              Powered by <span className="text-orange-500 font-black">Nestira</span>
            </div>
            {/* Login/Logout Button - Fixed at bottom */}
            <div className="p-4 border-t border-border-c/20 flex-shrink-0">
              <Button
                onClick={handleAuthAction}
                disabled={loggingOut}
                className={`w-full transition-all duration-200 ${currentUser
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
        </SidebarContent>
      </Sidebar>

      <RoleSelectionModal
        open={isRoleSelectionModalOpen}
        onOpenChange={setIsRoleSelectionModalOpen}
        onRoleSelected={handleRoleSelected}
      />

      <JobCreationModal
        open={isJobCreationModalOpen}
        onOpenChange={setIsJobCreationModalOpen}
        onJobCreated={handleJobCreated}
      />

      <InternshipCreationModal
        open={isInternshipCreationModalOpen}
        onOpenChange={setIsInternshipCreationModalOpen}
        onInternshipCreated={handleInternshipCreated}
      />

      <NestiraRecruitModal
        open={isRecruitModalOpen}
        onOpenChange={setIsRecruitModalOpen}
      />

      <NestiraRemoteModal
        open={isRemoteModalOpen}
        onOpenChange={setIsRemoteModalOpen}
      />

    </>
  );
}
