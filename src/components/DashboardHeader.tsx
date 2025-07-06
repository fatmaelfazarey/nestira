
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DashboardHeader() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    console.log('Profile clicked - navigating to settings');
    navigate('/profile-settings');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked - navigating to settings');
    navigate('/profile-settings');
  };

  return (
    <header className="border-b bg-white p-responsive-sm shrink-0">
      <div className="flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-4 min-w-0">
          <SidebarTrigger className="shrink-0" />
          <img 
            src="/lovable-uploads/15ce39a5-675b-4eb2-8d98-088feb86b95d.png" 
            alt="Logo" 
            className="h-8 sm:h-10 lg:h-12 shrink-0" 
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Search - Hide on very small screens */}
          <div className="relative hidden sm:block min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 shrink-0" />
            <input
              type="text"
              placeholder="Search candidates, jobs..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full max-w-64 bg-white text-responsive-sm min-w-0"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSettingsClick}
              type="button"
              className="cursor-pointer shrink-0"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleProfileClick}
              type="button"
              className="cursor-pointer shrink-0"
              title="Profile & Settings"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
