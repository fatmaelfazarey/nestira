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
  Settings
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
        title: "Job Listings",
        url: "/job-listings",
        icon: File,
        badge: null
      },
      {
        title: "Recruitment Board",
        url: "/recruitment-board",
        icon: List,
        badge: null
      },
      {
        title: "Interviews",
        url: "/interviews",
        icon: Calendar,
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

        <SidebarFooter className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50">
          <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg text-center">
            <h4 className="font-semibold mb-2 text-sm">
              🤝 Know someone hiring? Send them our way.
            </h4>
            <p className="text-xs text-green-100 mb-3">
              We’ll handle the hiring. You get the thank-you (in cash). Perfect for recruiters, HR consultants, and team leads.
            </p>
            <Button asChild size="sm" className="w-full bg-white text-green-700 hover:bg-white/90 font-semibold">
                <Link to="/referrals">Refer & Earn</Link>
            </Button>
          </div>
          <div className="text-xs text-gray-400 text-center font-medium">
            Powered by <span className="text-accent font-semibold">Nestira</span>
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
