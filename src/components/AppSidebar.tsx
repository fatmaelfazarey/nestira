
import {
  Calendar,
  Grid2X2,
  Inbox,
  Settings,
  User,
  Plus,
  File,
  List,
  Check,
  Bell,
  BookOpen,
  HelpCircle,
  CreditCard,
  Users,
  PenTool,
  FileSignature
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
    label: "Hiring",
    items: [
      {
        title: "Talent Pool",
        url: "/talent-pool",
        icon: User,
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
        title: "Quiz Designer",
        url: "/quiz-builder",
        icon: Check,
        badge: null
      },
      {
        title: "Interview Preparation Designer",
        url: "/interview-questions",
        icon: File,
        badge: null
      },
      {
        title: "Job Offer Designer",
        url: "/offer-templates",
        icon: FileSignature,
        badge: null
      },
      {
        title: "Nesti-Sign",
        url: "/nesti-sign",
        icon: PenTool,
        badge: null
      },
      {
        title: "Email Alerts",
        url: "/email-alerts",
        icon: Bell,
        badge: null
      }
    ]
  },
  {
    label: "Account",
    items: [
      {
        title: "User Guide",
        url: "/user-guide",
        icon: BookOpen,
        badge: null
      },
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
      <Sidebar className="border-r border-gray-200">
        <SidebarHeader className="p-4">
          <Button 
            className="bg-accent hover:bg-accent/90 text-white w-full"
            onClick={() => setIsJobModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Job Post
          </Button>
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          {navigationSections.map((section) => (
            <SidebarGroup key={section.label}>
              <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className="hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary">
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto bg-accent text-white text-xs px-2 py-1 rounded-full">
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

        <SidebarFooter className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Powered by Nestira
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
