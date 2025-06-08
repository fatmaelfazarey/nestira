
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";

const recentProfileViews = [
  {
    name: "Karim Ahmed",
    location: "Giza, Egypt",
    timeAgo: "3 days ago",
    avatar: "K",
    views: 12
  },
  {
    name: "Omar Fathy Ahmed Huss...",
    location: "Alexandria, Egypt", 
    timeAgo: "5 days ago",
    avatar: "O",
    views: 8
  },
  {
    name: "moamen abdulraouf",
    location: "Cairo, Egypt",
    timeAgo: "5 days ago", 
    avatar: "M",
    views: 15
  },
  {
    name: "Elsayed Kewan",
    location: "Cairo, Egypt",
    timeAgo: "5 days ago",
    avatar: "E",
    views: 6
  },
  {
    name: "Yasser Khairy",
    location: "Cairo, Egypt",
    timeAgo: "5 days ago",
    avatar: "Y",
    views: 9
  }
];

interface ProfileViewsCardProps {
  onClick: () => void;
}

export function ProfileViewsCard({ onClick }: ProfileViewsCardProps) {
  return (
    <Card 
      className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50">
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-900">Recent Profile Views</h3>
        </div>
        <div className="space-y-2">
          {recentProfileViews.slice(0, 5).map((profile, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {profile.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900 truncate">{profile.name}</p>
                  <p className="text-xs text-gray-500">{profile.timeAgo}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900">{profile.views}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export { recentProfileViews };
