
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  CheckCircle,
  PuzzleIcon,
  TrendingUp
} from "lucide-react";

export function QuickActionsCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
      <div className="space-y-3">
        <Button className="w-full justify-start h-12 bg-accent hover:bg-accent/90 text-white">
          <Users className="w-4 h-4 mr-3" />
          Browse Talent Pool
        </Button>
        <Button variant="outline" className="w-full justify-start h-12">
          <CheckCircle className="w-4 h-4 mr-3" />
          Unlocked Talents
        </Button>
        <Button variant="outline" className="w-full justify-start h-12">
          <FileText className="w-4 h-4 mr-3" />
          Create Job Post
        </Button>
        <Button variant="outline" className="w-full justify-start h-12">
          <PuzzleIcon className="w-4 h-4 mr-3" />
          Quiz Builder
        </Button>
        <Button variant="outline" className="w-full justify-start h-12">
          <TrendingUp className="w-4 h-4 mr-3" />
          View Analytics
        </Button>
      </div>
    </Card>
  );
}
