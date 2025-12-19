import React from 'react'
import { SidebarProvider } from '../ui/sidebar';
import AdminDashboardLayout from './AdminDashboardLayout';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <SidebarProvider>
            <AdminDashboardLayout>
                <Outlet />
            </AdminDashboardLayout>

        </SidebarProvider>
    );
};


export default AdminLayout
