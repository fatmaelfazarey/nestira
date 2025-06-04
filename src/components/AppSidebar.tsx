
import {
  Calendar,
  Grid2X2,
  Inbox,
  Settings,
  User,
  Plus,
  File,
  List,
  Check
} from "lucide-react";
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
        title: "Interview Questions",
        url: "/interview-questions",
        icon: File,
        badge: null
      },
      {
        title: "Offer Templates",
        url: "/offer-templates",
        icon: File,
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
        icon: Settings,
        badge: null
      },
      {
        title: "Referrals",
        url: "/referrals",
        icon: User,
        badge: null
      }
    ]
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <Button className="bg-accent hover:bg-accent/90 text-white w-full">
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
                      <a href={item.url} className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary">
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto bg-accent text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <SidebarMenuButton asChild>
            <a href="/blog" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary">
              <File className="w-4 h-4" />
              <span>Blog & Reports</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenuButton asChild>
            <a href="/help" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary">
              <Settings className="w-4 h-4" />
              <span>Help Center</span>
            </a>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
