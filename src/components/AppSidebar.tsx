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

        <SidebarFooter className="p-4 border-t border-gradient-to-r from-orange-200 to-pink-200 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
          <div className="space-y-3">
            {/* Nestira Recruit Box */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
              <Button asChild size="sm" className="w-full bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-200">
                <Link to="/talent-pool" className="flex items-center justify-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Let us hire for you →
                </Link>
              </Button>
            </div>

            {/* Nestira Remote Box */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
              <Button asChild size="sm" className="w-full bg-white text-red-700 hover:bg-red-50 font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-red-200">
                <Link to="/unlocked-talents" className="flex items-center justify-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Hire remotely. We manage →
                </Link>
              </Button>
            </div>

            {/* Refer & Earn Box */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
              <Button asChild size="sm" className="w-full bg-white text-orange-700 hover:bg-orange-50 font-bold shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-orange-200">
                <Link to="/referrals" className="flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Refer and get paid →
                </Link>
              </Button>
            </div>
          </div>

          <div className="text-xs text-white/80 text-center font-bold mt-6 bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
            Powered by <span className="text-white font-black">Nestira</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <JobCreationModal 
        open={isJobModalOpen} 
        onOpenChange={setIsJobModalOpen} 
      />
    </>
  );
}
