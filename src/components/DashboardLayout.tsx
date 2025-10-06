
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col backdrop-blur-sm min-w-0">
          <DashboardHeader />
          <div className="flex-1 p-responsive overflow-x-auto">
            <div className="w-full max-w-none mx-auto space-responsive-lg">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
