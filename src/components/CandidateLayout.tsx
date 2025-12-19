

// import { Outlet, useNavigate } from "react-router-dom";
// import { CandidateSidebar } from "@/components/CandidateSidebar";
// import { useEffect, useRef, useState } from "react";
// import { Settings, User } from "lucide-react";
// import { Button } from "./ui/button";
// // import { logo } from '../assets/logo.png';
// import logo from '@/assets/logo.png';
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// // import { SidebarProvider } from "./ui/sidebar";
// const CandidateLayout = () => {
//   const [isExpand, setIsExpand] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const sidebarRef = useRef(null);
//   const navigate = useNavigate();
//   // Detect screen size (only sets `isMobile`, not open state)
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 768px)");
//     setIsMobile(mediaQuery.matches);

//     const handleResize = (e) => setIsMobile(e.matches);
//     mediaQuery.addEventListener("change", handleResize);

//     return () => mediaQuery.removeEventListener("change", handleResize);
//   }, []);

//   // Close sidebar when clicking outside (mobile only)
//   useEffect(() => {
//     if (!isExpand) return;

//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsExpand(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isExpand]);

//   return (
//     <SidebarProvider>
//       <div className="h-screen flex bg-background relative w-full">
//         {/* Sidebar */}
//         <div
//           ref={sidebarRef}
//           className={`md:static absolute top-0 left-0 z-40 transition-all duration-300 
//           ${isExpand ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//         >
//           <CandidateSidebar />
//         </div>

//         {/* Main content */}
//         <div className="flex-1 h-full overflow-y-scroll w-full">
//           <header className="border-b bg-white p-responsive-sm shrink-0">
//             <div className="flex items-center justify-between gap-4 min-w-0">

//               <div
//                 className="flex items-center gap-4 min-w-0 cursor-pointer"
//                 onClick={() => setIsExpand((prev) => !prev)}
//               >
//                 <SidebarTrigger className="shrink-0" />
//                 <img
//                   src={logo}
//                   alt="Logo"
//                   className="h-8 sm:h-10 lg:h-12 shrink-0"
//                 />
//               </div>
//               <div className="flex items-center gap-2 sm:gap-4 min-w-0">

//                 {/* User Actions */}
//                 <div className="flex items-center gap-1 sm:gap-2 shrink-0">
//                   <Button

//                     variant="ghost"
//                     size="sm"
//                     onClick={() => navigate('profile')}
//                     type="button"
//                     className="cursor-pointer shrink-0"
//                     title="Settings"
//                   >
//                     <Settings className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => navigate('profile')}
//                     type="button"
//                     className="cursor-pointer shrink-0"
//                     title="Profile & Settings"
//                   >
//                     <User className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </header>

//           <div className="p-responsive ">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </SidebarProvider>


//   );
// };

// export default CandidateLayout;







import { Outlet, useNavigate } from "react-router-dom";
import { CandidateSidebar } from "@/components/CandidateSidebar";

import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { Settings, User } from "lucide-react";
import { Button } from "./ui/button";

const CandidateLayout = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">

        {/* Sidebar (Shadcn Official) */}
        <Sidebar >
          <CandidateSidebar />
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="border-b bg-white p-responsive-sm shrink-0">
            <div className="flex items-center justify-between gap-4 min-w-0">

              {/* Sidebar Trigger + Logo */}
              <div className="flex items-center gap-4 min-w-0">
                <SidebarTrigger className="shrink-0" />

                <img
                  src={logo}
                  alt="Logo"
                  className="h-8 sm:h-10 lg:h-12 shrink-0"
                />
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("profile")}
                  className="cursor-pointer shrink-0"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("profile")}
                  className="cursor-pointer shrink-0"
                  title="Profile & Settings"
                >
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-responsive">
            <Outlet />
          </main>

        </div>
      </div>
    </SidebarProvider>
  );
};

export default CandidateLayout;
