
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Upload, CheckCircle, Clock, Star } from "lucide-react";
import { useState } from "react";

interface VideoSectionProps {
  data: {
    hasVideo: boolean;
    videoUrl?: string;
    recordingDate?: string;
    status: 'not_started' | 'recording' | 'uploaded' | 'approved';
  };
  onChange: (data: any) => void;
}

export function VideoSection({ data, onChange }: VideoSectionProps) {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording process
    setTimeout(() => {
      setIsRecording(false);
      onChange({
        ...data,
        hasVideo: true,
        status: 'uploaded',
        recordingDate: new Date().toISOString()
      });
    }, 3000);
  };

  const getStatusBadge = () => {
    switch (data?.status) {
      case 'uploaded':
        return <Badge variant="secondary-c" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="w-3 h-3 mr-1" />
          Under Review
        </Badge>;
      case 'approved':
        return <Badge variant="secondary-c" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="animate-fade-in rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <Video className="w-5 h-5 text-secondary-c" />
          Introduction Video
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-info-light rounded-lg border border-info/20">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-info mt-0.5" />
            <div>
              <p className="text-sm font-medium text-info mb-2">
                Stand out with a personal introduction
              </p>
              <p className="text-sm text-info/80">
                Record a 60-90 second video introducing yourself, your experience, and what you're looking for. 
                Videos get 3x more employer views!
              </p>
            </div>
          </div>
        </div>

        {!data?.hasVideo ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-secondary-c" />
            </div>
            <h3 className="text-lg font-medium mb-2">Record Your Introduction</h3>
            <p className="text-muted-c-foreground mb-6">
              Share your story and make a great first impression
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-c-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>60-90 seconds recommended</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-c-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Professional background lighting preferred</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-c-foreground">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Clear audio and stable camera</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleStartRecording}
                disabled={isRecording}
                className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
              >
                {isRecording ? (
                  <>
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-2"></div>
                    Recording...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Start Recording
                  </>
                )}
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-medium mb-2">Video Uploaded!</h3>
            <p className="text-muted-c-foreground mb-4">
              Your introduction video is ready and will be reviewed shortly.
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Replace
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
