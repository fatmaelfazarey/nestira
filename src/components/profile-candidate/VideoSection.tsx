
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Video, Play, Upload, CheckCircle, Clock, Star } from "lucide-react";
// import { useState } from "react";

// interface VideoSectionProps {
//   data: {
//     hasVideo: boolean;
//     videoUrl?: string;
//     recordingDate?: string;
//     status: 'not_started' | 'recording' | 'uploaded' | 'approved';
//   };
//   onChange: (data: any) => void;
// }

// export function VideoSection({ data, onChange }: VideoSectionProps) {
//   const [isRecording, setIsRecording] = useState(false);

//   const handleStartRecording = () => {
//     setIsRecording(true);
//     // Simulate recording process
//     setTimeout(() => {
//       setIsRecording(false);
//       onChange({
//         ...data,
//         hasVideo: true,
//         status: 'uploaded',
//         recordingDate: new Date().toISOString()
//       });
//     }, 3000);
//   };

//   const getStatusBadge = () => {
//     switch (data?.status) {
//       case 'uploaded':
//         return <Badge variant="secondary-c" className="bg-blue-50 text-blue-700 border-blue-200">
//           <Clock className="w-3 h-3 mr-1" />
//           Under Review
//         </Badge>;
//       case 'approved':
//         return <Badge variant="secondary-c" className="bg-green-50 text-green-700 border-green-200">
//           <CheckCircle className="w-3 h-3 mr-1" />
//           Approved
//         </Badge>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="animate-fade-in rounded-xl">
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-xl flex items-center gap-2">
//           <Video className="w-5 h-5 text-secondary-c" />
//           Introduction Video
//         </CardTitle>
//         {getStatusBadge()}
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="p-4 bg-info-light rounded-lg border border-info/20">
//           <div className="flex items-start gap-3">
//             <Star className="w-5 h-5 text-info mt-0.5" />
//             <div>
//               <p className="text-sm font-medium text-info mb-2">
//                 Stand out with a personal introduction
//               </p>
//               <p className="text-sm text-info/80">
//                 Record a 60-90 second video introducing yourself, your experience, and what you're looking for. 
//                 Videos get 3x more employer views!
//               </p>
//             </div>
//           </div>
//         </div>

//         {!data?.hasVideo ? (
//           <div className="text-center py-8">
//             <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Video className="w-8 h-8 text-secondary-c" />
//             </div>
//             <h3 className="text-lg font-medium mb-2">Record Your Introduction</h3>
//             <p className="text-muted-c-foreground mb-6">
//               Share your story and make a great first impression
//             </p>

//             <div className="space-y-3 mb-6">
//               <div className="flex items-center justify-center gap-2 text-sm text-muted-c-foreground">
//                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                 <span>60-90 seconds recommended</span>
//               </div>
//               <div className="flex items-center justify-center gap-2 text-sm text-muted-c-foreground">
//                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                 <span>Professional background lighting preferred</span>
//               </div>
//               <div className="flex items-center justify-center gap-2 text-sm text-muted-c-foreground">
//                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                 <span>Clear audio and stable camera</span>
//               </div>
//             </div>

//             <div className="flex gap-3 justify-center">
//               <Button 
//                 onClick={handleStartRecording}
//                 disabled={isRecording}
//                 className="bg-secondary-c hover:bg-secondary-c-hover text-secondary-c-foreground"
//               >
//                 {isRecording ? (
//                   <>
//                     <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-2"></div>
//                     Recording...
//                   </>
//                 ) : (
//                   <>
//                     <Video className="w-4 h-4 mr-2" />
//                     Start Recording
//                   </>
//                 )}
//               </Button>
//               <Button variant="outline" >
//                 <Upload className="w-4 h-4 mr-2" />
//                 Upload Video
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-6">
//             <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircle className="w-8 h-8 text-success" />
//             </div>
//             <h3 className="text-lg font-medium mb-2">Video Uploaded!</h3>
//             <p className="text-muted-c-foreground mb-4">
//               Your introduction video is ready and will be reviewed shortly.
//             </p>

//             <div className="flex gap-3 justify-center">
//               <Button variant="outline" size="sm">
//                 <Play className="w-4 h-4 mr-2" />
//                 Preview
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Upload className="w-4 h-4 mr-2" />
//                 Replace
//               </Button>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }




import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Upload, CheckCircle, Clock, Star } from "lucide-react";
import { useRef, useState } from "react";
import { IP } from "@/store/Path";
import { useAuth } from "@/contexts/AuthContext";

interface VideoSectionProps {
  data: {
    hasVideo: boolean;
    videoUrl?: string;
    recordingDate?: string;
    status: "not_started" | "recording" | "uploaded" | "approved";
  };
  onChange: (data: any) => void;
}

export function VideoSection({ data, onChange }: VideoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useAuth();

  const [path, setPah] = useState();
  /* ================= Upload Handler ================= */

  const uploadVideo = async (file: File) => {
    try {
      setUploading(true);
      if (!currentUser) {
        console.warn("No current user found");
        return { success: false };
      }
      console.log('file uploded', file)
      const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;
      const url = `${IP}/api/candidate/upload-video`;

      const formData = new FormData();
      formData.append("video", file);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Authorization': token,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      console.log('result => ', result);
      setPah(result.videoPath);
      onChange({
        ...data,
        hasVideo: true,
        videoUrl: result.videoPath,
        status: "uploaded",
        recordingDate: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Video upload error:", error);
      alert("Failed to upload video");
    } finally {
      setUploading(false);
    }
  };
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setPreview(URL.createObjectURL(file)); // الفيديو يظهر فورًا
    uploadVideo(file); // ترسلي الفيديو للباك
  };


  /* ================= Badge ================= */

  const getStatusBadge = () => {
    switch (data?.status) {
      case "uploaded":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      default:
        return null;
    }
  };

  /* ================= UI ================= */

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          <Video className="w-5 h-5 text-secondary-c" />
          Introduction Video
        </CardTitle>
        {getStatusBadge()}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Info */}
        <div className="p-4 bg-info-light rounded-lg border">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-info mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-2">
                Stand out with a personal introduction
              </p>
              <p className="text-sm opacity-80">
                Record a 60–90 second video introducing yourself.
              </p>
            </div>
          </div>
        </div>

        {/* Hidden Input */}
        {/* <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadVideo(file);
          }}
        /> */}

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileChange(file);
          }}
        />


        {/* ================= NO VIDEO ================= */}
        {!data?.hasVideo ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-secondary-c/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-secondary-c" />
            </div>

            <h3 className="text-lg font-medium mb-2">
              Upload Your Introduction Video
            </h3>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Video"}
              </Button>
            </div>
          </div>
        ) : (
          /* ================= VIDEO UPLOADED ================= */
          <div className="text-center py-6 space-y-4">
            {/* <video
              src={path ? `${IP}${path}` : `${IP}${data.videoUrl}`}
              controls
              className="w-full rounded-lg"
            /> */}
            <video
              src={preview || (path ? `${IP}${path}` : `${IP}${data.videoUrl}`)}
              controls
              className="w-full rounded-lg"
            />


            <div className="flex gap-3 justify-center">
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
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
