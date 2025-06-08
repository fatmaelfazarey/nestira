
import { useState } from "react";
import { WelcomeSection } from "./dashboard/WelcomeSection";
import { KpiTracker } from "./dashboard/KpiTracker";
import { ProfileViewsCard } from "./dashboard/ProfileViewsCard";
import { WeeklyActivityChart } from "./dashboard/WeeklyActivityChart";
import { QuickActionsCard } from "./dashboard/QuickActionsCard";
import { ResourceUsageCard } from "./dashboard/ResourceUsageCard";
import { ProfileViewsModal } from "./dashboard/ProfileViewsModal";

export function DashboardOverview() {
  const [showProfileViewsModal, setShowProfileViewsModal] = useState(false);

  const handleKpiClick = (action: string) => {
    console.log(`Navigating to ${action}`);
    // In a real app, this would use router navigation
    // For now, we'll just log the action
  };

  return (
    <div className="space-y-6 min-h-screen">
      {/* Welcome Section */}
      <section className="w-full">
        <WelcomeSection />
      </section>

      {/* KPI Tracker - Full Width */}
      <section className="w-full">
        <KpiTracker onKpiClick={handleKpiClick} />
      </section>

      {/* Profile Views and Charts Section */}
      <section className="w-full">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Recent Profile Views - Fixed width */}
          <div className="xl:col-span-1">
            <ProfileViewsCard onClick={() => setShowProfileViewsModal(true)} />
          </div>

          {/* Weekly Activity Chart - Takes remaining space */}
          <div className="xl:col-span-3">
            <WeeklyActivityChart />
          </div>
        </div>
      </section>

      {/* Quick Actions and Resource Usage Section */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <QuickActionsCard />
          </div>
          <div>
            <ResourceUsageCard />
          </div>
        </div>
      </section>

      {/* Profile Views Modal */}
      <ProfileViewsModal 
        open={showProfileViewsModal} 
        onOpenChange={setShowProfileViewsModal}
      />
    </div>
  );
}
