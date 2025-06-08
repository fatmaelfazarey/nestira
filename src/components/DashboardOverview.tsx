
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
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* KPI Tracker - Full Width */}
      <KpiTracker onKpiClick={handleKpiClick} />

      {/* Profile Views and Charts Section */}
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

      {/* Quick Actions and Resource Usage Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActionsCard />
        <ResourceUsageCard />
      </div>

      {/* Profile Views Modal */}
      <ProfileViewsModal 
        open={showProfileViewsModal} 
        onOpenChange={setShowProfileViewsModal}
      />
    </div>
  );
}
