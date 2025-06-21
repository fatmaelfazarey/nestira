
import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
      <DialogContent className="max-w-5xl w-full max-h-[90vh] p-0 overflow-hidden rounded-2xl">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 z-50 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg hover:bg-white transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Full Width Header */}
        <div className="w-full px-8 py-8 bg-gradient-to-br from-emerald-400 via-emerald-500 to-cyan-600 text-white">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-4xl font-bold mb-3 text-white">
                Let us hire for you
              </DialogTitle>
              <p className="text-xl text-emerald-50 font-medium">
                Tell us what you need and we'll find the perfect talent for your team.
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex min-h-[500px]">
          {/* Left Side - Form */}
          <div className="w-2/5 p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-bold text-gray-800">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl text-base font-medium"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-bold text-gray-800">
                  Best Email to Reach You At *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl text-base font-medium"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-bold text-gray-800">
                  Phone or WhatsApp
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl text-base font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleNeed" className="text-sm font-bold text-gray-800">
                  What are you hiring for?
                </Label>
                <Input
                  id="roleNeed"
                  type="text"
                  value={formData.roleNeed}
                  onChange={(e) => handleInputChange("roleNeed", e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl text-base font-medium"
                  placeholder="e.g., Senior React Developer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-bold text-gray-800">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="min-h-[100px] border-2 border-gray-200 focus:border-emerald-500 rounded-xl resize-none text-base font-medium"
                  placeholder="Any additional details about your hiring needs..."
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
              >
                Confirm & Schedule
              </Button>
            </form>
          </div>

          {/* Right Side - Calendar */}
          <div className="w-3/5 bg-gradient-to-br from-gray-50 to-emerald-50/30 flex flex-col">
            <div className="p-8 border-b border-emerald-100">
              <div className="flex items-center gap-4 mb-3">
                <Calendar className="w-7 h-7 text-emerald-600" />
                <h3 className="text-2xl font-bold text-gray-900">Pick a time to speak with us →</h3>
              </div>
              <p className="text-gray-600 text-lg font-medium">
                Choose a convenient time for a 15-minute discovery call
              </p>
            </div>
            
            <div 
              className="flex-1 p-8 cursor-pointer group"
              onClick={handleCalendarClick}
            >
              <div className="w-full h-full bg-white rounded-3xl border-3 border-dashed border-emerald-200 group-hover:border-emerald-400 flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl hover:scale-[1.02]">
                <div className="text-center p-8">
                  <Calendar className="w-20 h-20 text-emerald-400 group-hover:text-emerald-600 mx-auto mb-6 transition-colors duration-300" />
                  <p className="text-gray-800 font-bold text-2xl mb-3 group-hover:text-emerald-700">Click to Open Calendar</p>
                  <p className="text-gray-600 text-lg mb-6 font-medium">
                    Book your 15-minute discovery call
                  </p>
                  <div className="bg-emerald-50 group-hover:bg-emerald-100 px-6 py-3 rounded-xl inline-block transition-colors duration-300 border border-emerald-200">
                    <code className="text-sm text-emerald-700 font-bold">
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
