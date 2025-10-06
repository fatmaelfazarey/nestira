
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Edit, AlertCircle } from "lucide-react";

interface CVParsingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parsedData: any;
  onConfirm: (data: any) => void;
}

export function CVParsingModal({ isOpen, onClose, parsedData, onConfirm }: CVParsingModalProps) {
  const [editedData, setEditedData] = useState(parsedData);

  const handleConfirm = () => {
    onConfirm(editedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Resume Parsed Successfully!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-success-light rounded-lg border border-success/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-success mb-1">Review extracted information</p>
                <p className="text-success/80">
                  We've automatically extracted your information. Please review and edit any details before saving to your profile.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input 
                  value={editedData.personalInfo?.fullName || ""}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    personalInfo: { ...editedData.personalInfo, fullName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={editedData.personalInfo?.email || ""}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    personalInfo: { ...editedData.personalInfo, email: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input 
                  value={editedData.personalInfo?.phone || ""}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    personalInfo: { ...editedData.personalInfo, phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input 
                  value={editedData.personalInfo?.location || ""}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    personalInfo: { ...editedData.personalInfo, location: e.target.value }
                  })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={editedData.personalInfo?.summary || ""}
                onChange={(e) => setEditedData({
                  ...editedData,
                  personalInfo: { ...editedData.personalInfo, summary: e.target.value }
                })}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Experience Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Work Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {editedData.experience?.map((exp: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        value={exp.title}
                        placeholder="Job Title"
                        onChange={(e) => {
                          const newExp = [...editedData.experience];
                          newExp[index].title = e.target.value;
                          setEditedData({ ...editedData, experience: newExp });
                        }}
                      />
                      <Input 
                        value={exp.company}
                        placeholder="Company"
                        onChange={(e) => {
                          const newExp = [...editedData.experience];
                          newExp[index].company = e.target.value;
                          setEditedData({ ...editedData, experience: newExp });
                        }}
                      />
                    </div>
                    <Textarea 
                      value={exp.description}
                      placeholder="Job description and achievements"
                      className="mt-4 min-h-[80px]"
                      onChange={(e) => {
                        const newExp = [...editedData.experience];
                        newExp[index].description = e.target.value;
                        setEditedData({ ...editedData, experience: newExp });
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
            >
              Confirm & Save to Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
