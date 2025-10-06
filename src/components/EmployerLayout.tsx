import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar"; // الـ sidebar الخاص بالـ employer

const EmployerLayout = () => {
  return (
    <SidebarProvider>
    <Outlet />
    </SidebarProvider>
  );
};

export default EmployerLayout;