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
  DollarSign
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
import { JobCreationModal } from "./JobCreationModal";
import { NestiraRecruitModal } from "./NestiraRecruitModal";
import { NestiraRemoteModal } from "./NestiraRemoteModal";
import { useState } from "react";

// Navigation items organized by sections
const navigationSections = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Grid2X2,
        badge: null
      },
      {
        title: "Inbox",
        url: "/inbox",
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
        url: "/talent-pool",
        icon: User,
        badge: null
      },
      {
        title: "Unlocked Talents",
        url: "/unlocked-talents",
        icon: Users,
        badge: null
      },
      {
        title: "Job Posts",
        url: "/job-posts",
        icon: File,
        badge: null
      },
      {
        title: "Interviews",
        url: "/interviews",
        icon: Calendar,
        badge: null
      },
      {
        title: "Recruitment Board",
        url: "/recruitment-board",
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
        url: "/quiz-builder",
        icon: Check,
        badge: null
      },
      {
        title: "Blog & Reports",
        url: "/blog",
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
        url: "/billing",
        icon: CreditCard,
        badge: null
      },
      {
        title: "Referrals",
        url: "/referrals",
        icon: Users,
        badge: null
      },
      {
        title: "Settings",
        url: "/profile-settings",
        icon: Settings,
        badge: null
      },
      {
        title: "Help Center",
        url: "/help",
        icon: HelpCircle,
        badge: null
      }
    ]
  }
];

export function AppSidebar() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [isRemoteModalOpen, setIsRemoteModalOpen] = useState(false);

  return (
    <>
      <Sidebar className="border-r border-gray-200/60 bg-gradient-to-b from-slate-50 to-white">
        <SidebarHeader className="p-6 border-b border-gray-100">
          <Button 
            className="bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white w-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-3"
            onClick={() => setIsJobModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Job Post
          </Button>
        </SidebarHeader>
        
        <SidebarContent className="px-4 py-2">
          {navigationSections.map((section) => (
            <SidebarGroup key={section.label} className="mb-8">
              <SidebarGroupLabel className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-4 px-3">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5 hover:border-l-4 hover:border-accent transition-all duration-200 rounded-lg group py-3"
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-accent font-medium">
                          <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto bg-gradient-to-r from-accent to-orange-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm">
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
        </SidebarContent>

        <SidebarFooter className="p-3 relative overflow-hidden" style={{ backgroundColor: '#00102c' }}>
          {/* Orange circles background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-6 w-16 h-16 bg-orange-500/20 rounded-full"></div>
            <div className="absolute bottom-8 left-4 w-12 h-12 bg-orange-600/15 rounded-full"></div>
            <div className="absolute top-12 left-8 w-8 h-8 bg-orange-400/25 rounded-full"></div>
            <div className="absolute bottom-4 right-12 w-6 h-6 bg-orange-500/30 rounded-full"></div>
          </div>
          
          <div className="space-y-2 relative z-10">
            {/* Nestira Recruit */}
            <Button 
              onClick={() => setIsRecruitModalOpen(true)}
              className="w-full h-10 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            >
              <UserCheck className="w-4 h-4" />
              Let us hire for you →
            </Button>

            {/* Nestira Remote */}
            <Button 
              onClick={() => setIsRemoteModalOpen(true)}
              className="w-full h-10 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
            >
              <Building2 className="w-4 h-4" />
              Hire remotely. We manage →
            </Button>

            {/* Refer & Earn */}
            <Button asChild className="w-full h-10 bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-0">
              <Link to="/referrals" className="flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4" />
                Refer and get paid →
              </Link>
            </Button>
          </div>

          <div className="text-xs text-white text-center font-bold mt-4 relative z-10">
            Powered by <span className="text-orange-500 font-black">Nestira</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <JobCreationModal 
        open={isJobModalOpen} 
        onOpenChange={setIsJobModalOpen} 
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
