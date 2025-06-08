
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Briefcase,
  Calendar,
  CheckCircle,
  Activity,
  Unlock
} from "lucide-react";

const kpiData = [
  {
    title: "Total Jobs",
    value: "2",
    subtitle: "All jobs posted",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    isPositive: true,
    clickAction: "job-listings"
  },
  {
    title: "Active Jobs",
    value: "2",
    subtitle: "Currently running",
    icon: Activity,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    isPositive: true,
    clickAction: "recruitment-board"
  },
  {
    title: "Closed Jobs",
    value: "0",
    subtitle: "Completed jobs",
    icon: CheckCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50", 
    isPositive: true,
    clickAction: "job-listings"
  },
  {
    title: "Total Applications",
    value: "3",
    subtitle: "All applications received",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    isPositive: true,
    clickAction: "recruitment-board"
  },
  {
    title: "Avg Applications",
    value: "1.5",
    subtitle: "Per job",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isPositive: true,
    clickAction: "recruitment-board"
  },
  {
    title: "Unlocked Candidates",
    value: "1",
    subtitle: "Total unlocked profiles",
    icon: Unlock,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    isPositive: true,
    clickAction: "unlocked-talents"
  },
  {
    title: "Avg Daily Unlocks",
    value: "0.0",
    subtitle: "Last 30 days",
    icon: Calendar,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    isPositive: false,
    clickAction: "talent-pool"
  }
];

interface KpiTrackerProps {
  onKpiClick: (action: string) => void;
}

export function KpiTracker({ onKpiClick }: KpiTrackerProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 p-4 bg-white rounded-lg border">
        {kpiData.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div 
              key={kpi.title} 
              className={`${kpi.bgColor} rounded-lg p-3 text-center cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 min-w-0 flex flex-col items-center justify-center`}
              onClick={() => onKpiClick(kpi.clickAction)}
            >
              <IconComponent className={`w-5 h-5 mb-2 ${kpi.color}`} />
              <p className="text-xs font-medium text-gray-700 mb-1 truncate w-full text-center">{kpi.title}</p>
              <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
