import React from 'react'
import AdminSidebar from '../Admin components/AdminSidebar';
import AdminHeader from '../Admin components/AdminHeader';
interface AdminDashboardLayoutProps {
    children: React.ReactNode;
}
const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
    return (
        <>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-gray-50">
                <AdminSidebar />
                <main className="flex-1 flex flex-col backdrop-blur-sm min-w-0">
                    <AdminHeader />
                    <div className="flex-1 p-responsive overflow-x-auto">
                        <div className="w-full max-w-none mx-auto space-responsive-lg">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default AdminDashboardLayout
