
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
import { UserCheck, Calendar, X } from "lucide-react";
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

  const handleCalendarClick = () => {
    window.open("https://calendly.com/your-calendly-url", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[700px] p-0 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white/80 backdrop-blur-sm p-1"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Header spanning full width */}
        <div className="w-full px-8 py-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <UserCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
                Let us hire for you
              </DialogTitle>
              <p className="text-lg text-gray-600">
                Tell us what you need and we'll find the perfect talent for your team.
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full">
          {/* Left Side - Form (40%) */}
          <div className="w-2/5 p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-800">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-lg text-base"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-800">
                  Best Email to Reach You At *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-lg text-base"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-800">
                  Phone or WhatsApp
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-lg text-base"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleNeed" className="text-sm font-semibold text-gray-800">
                  What are you hiring for?
                </Label>
                <Input
                  id="roleNeed"
                  type="text"
                  value={formData.roleNeed}
                  onChange={(e) => handleInputChange("roleNeed", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-lg text-base"
                  placeholder="e.g., Senior React Developer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-semibold text-gray-800">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="min-h-[100px] border-2 border-gray-200 focus:border-emerald-500 rounded-lg resize-none text-base"
                  placeholder="Any additional details about your hiring needs..."
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
              >
                Confirm & Schedule
              </Button>
            </form>
          </div>

          {/* Right Side - Calendar (60%) */}
          <div className="w-3/5 bg-gradient-to-br from-gray-50 to-white flex flex-col">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-2">
                <Calendar className="w-6 h-6 text-cyan-500" />
                <h3 className="text-xl font-bold text-gray-900">Pick a time to speak with us →</h3>
              </div>
              <p className="text-gray-600 text-base">
                Choose a convenient time for a 15-minute discovery call
              </p>
            </div>
            
            <div 
              className="flex-1 p-8 cursor-pointer group transition-all duration-200 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-cyan-50"
              onClick={handleCalendarClick}
            >
              <div className="w-full h-full bg-white rounded-2xl border-2 border-dashed border-gray-300 group-hover:border-emerald-400 flex items-center justify-center transition-all duration-200 shadow-sm group-hover:shadow-md">
                <div className="text-center">
                  <Calendar className="w-16 h-16 text-gray-400 group-hover:text-emerald-500 mx-auto mb-4 transition-colors duration-200" />
                  <p className="text-gray-700 font-semibold text-lg mb-2 group-hover:text-emerald-600">Click to Open Calendar</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Book your 15-minute discovery call
                  </p>
                  <div className="bg-gray-100 group-hover:bg-emerald-100 px-4 py-2 rounded-lg inline-block transition-colors duration-200">
                    <code className="text-xs text-gray-600 group-hover:text-emerald-700">
                      calendly.com/your-url
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
