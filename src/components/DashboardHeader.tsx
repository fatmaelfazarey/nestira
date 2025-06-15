
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
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
        </div>

        <div className="flex items-center justify-center flex-1">
          <img src="/lovable-uploads/15ce39a5-675b-4eb2-8d98-088feb86b95d.png" alt="Logo" className="h-20" />
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search candidates, jobs..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-64 bg-white"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSettingsClick}
              type="button"
              className="cursor-pointer"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleProfileClick}
              type="button"
              className="cursor-pointer"
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
