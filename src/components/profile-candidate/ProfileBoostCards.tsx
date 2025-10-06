
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Star, Eye, TrendingUp } from "lucide-react";

export function ProfileBoostCards() {
  return (
    <div className="space-y-4">
      {/* Video Introduction Card */}
      <Card className="bg-gradient-to-r from-secondary-c/10 to-primary-c/10 border-secondary-c/30 animate-scale-in rounded-xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-secondary-c/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-secondary-c" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Stand Out with Video</h4>
              <p className="text-sm text-muted-c-foreground">Add a 60-second intro</p>
            </div>
          </div>
          <Button 
            size="sm" 
            className="w-full bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
          >
            Record Introduction
          </Button>
        </CardContent>
      </Card>

      {/* Profile Visibility Card */}
      <Card className="animate-scale-in rounded-xl" style={{ animationDelay: '100ms' }}>
        <CardContent className="p-4">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-primary-c/10 rounded-full flex items-center justify-center mx-auto">
              <Eye className="w-6 h-6 text-primary-c" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Profile Views</h4>
              <p className="text-2xl font-bold text-primary-c">127</p>
              <p className="text-xs text-muted-c-foreground">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="animate-scale-in rounded-xl" style={{ animationDelay: '200ms' }}>
        <CardContent className="p-4 space-y-3">
          <h4 className="font-semibold text-foreground">Quick Actions</h4>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start hover:bg-success/10 hover:text-success hover:border-success/50"
            >
              <Star className="w-4 h-4 mr-2" />
              Take Skills Assessment
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Profile Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
