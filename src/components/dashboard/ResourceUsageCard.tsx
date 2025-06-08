
import { Card } from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";

export function ResourceUsageCard() {
  return (
    <Card className="p-6 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Resource Usage</h3>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Job Postings</span>
            </div>
            <span className="text-sm text-gray-600">2/3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '66.7%' }}></div>
          </div>
          <p className="text-xs text-gray-500">66.7%</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Candidates Unlocked</span>
            </div>
            <span className="text-sm text-gray-600">1/5</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <p className="text-xs text-gray-500">20.0%</p>
        </div>
      </div>
    </Card>
  );
}
