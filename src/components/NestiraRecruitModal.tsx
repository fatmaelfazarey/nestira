
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UserCheck, Calendar } from "lucide-react";
import { toast } from "sonner";

interface NestiraRecruitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NestiraRecruitModal({ open, onOpenChange }: NestiraRecruitModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleNeed: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in required fields");
      return;
    }
    toast.success("Form submitted! Please select a time to speak with us.");
    console.log("Nestira Recruit Form Data:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full h-[600px] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Left Side - Form (40%) */}
          <div className="w-2/5 p-8 bg-gradient-to-br from-slate-50 to-white border-r border-gray-100">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <UserCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <DialogTitle className="text-xl font-bold text-primary">
                  Let us hire for you
                </DialogTitle>
              </div>
              <p className="text-sm text-gray-600">
                Tell us what you need and we'll find the perfect talent for your team.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-11 border-gray-200 focus:border-accent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Best Email to Reach You At *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-11 border-gray-200 focus:border-accent"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone or WhatsApp
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-11 border-gray-200 focus:border-accent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleNeed" className="text-sm font-medium text-gray-700">
                  What are you hiring for?
                </Label>
                <Input
                  id="roleNeed"
                  type="text"
                  value={formData.roleNeed}
                  onChange={(e) => handleInputChange("roleNeed", e.target.value)}
                  className="h-11 border-gray-200 focus:border-accent"
                  placeholder="e.g., Senior React Developer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="min-h-[80px] border-gray-200 focus:border-accent resize-none"
                  placeholder="Any additional details about your hiring needs..."
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Confirm & Schedule
              </Button>
            </form>
          </div>

          {/* Right Side - Calendar (60%) */}
          <div className="w-3/5 bg-white flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-gray-900">Pick a time to speak with us →</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Choose a convenient time for a 15-minute discovery call
              </p>
            </div>
            
            <div className="flex-1 p-4">
              {/* Calendly Embed Placeholder */}
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Calendly Widget</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Replace this with your Calendly embed code
                  </p>
                  <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">
                    &lt;InlineWidget url="your-calendly-url" /&gt;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
