
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
      <div className="mb-8">
        <WelcomeSection />
      </div>

      {/* KPI Tracker - Horizontal Layout */}
      <div className="mb-8">
        <KpiTracker onKpiClick={handleKpiClick} />
      </div>

      {/* Recent Profile Views and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        {/* Recent Profile Views */}
        <div className="lg:col-span-1">
          <ProfileViewsCard onClick={() => setShowProfileViewsModal(true)} />
        </div>

        {/* Weekly Activity Chart */}
        <div className="lg:col-span-3">
          <WeeklyActivityChart />
        </div>
      </div>

      {/* Quick Actions and Resource Usage Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions */}
        <QuickActionsCard />

        {/* Resource Usage */}
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
