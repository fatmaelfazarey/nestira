import { Outlet } from "react-router-dom";
import { CandidateSidebar } from "@/components/CandidateSidebar";

const CandidateLayout = () => {
  return (
    <div className="min-h-screen flex bg-background ">
      <CandidateSidebar />
      <div className="flex-1">
        {/* <main className="container mx-auto py-6 px-4"> */}
          <Outlet />
        {/* </main> */}
      </div>
    </div>
  );
};

export default CandidateLayout;