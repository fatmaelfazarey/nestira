import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar"; 
import { DashboardLayout } from "./DashboardLayout";


const EmployerLayout = () => {
  return (
    <SidebarProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>

    </SidebarProvider>
  );
};

export default EmployerLayout;