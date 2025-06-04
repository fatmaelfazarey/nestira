
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Search, Settings, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface DashboardHeaderProps {
  currentMode: 'hiring' | 'interview';
  onModeChange: (mode: 'hiring' | 'interview') => void;
}

export function DashboardHeader({ currentMode, onModeChange }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-white dark:bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div>
              <h1 className="font-semibold text-lg text-primary">Nestira Finance</h1>
              <p className="text-xs text-gray-500">powered by Nestira</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mode Switcher */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={currentMode === 'hiring' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('hiring')}
              className={`${
                currentMode === 'hiring' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary'
              }`}
            >
              Hiring Mode
            </Button>
            <Button
              variant={currentMode === 'interview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onModeChange('interview')}
              className={`${
                currentMode === 'interview' 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary'
              }`}
            >
              Interview Mode
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search candidates, jobs..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-64 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
