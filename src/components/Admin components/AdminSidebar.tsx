// // import React from 'react'

// // const AdminSidebar = () => {
// //     return (
// //         <div>
// //             AdminSidebar
// //         </div>
// //     )
// // }

// // export default AdminSidebar








// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
// import {
//     Sheet,
//     SheetContent,
//     SheetTrigger,
// } from '@/components/ui/sheet';
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from '@/components/ui/tooltip';
// import {
//     Home,
//     Users,
//     Briefcase,
//     User,
//     FileText,
//     CheckSquare,
//     Award,
//     TrendingUp,
//     Settings,
//     LogOut,
//     Menu,
//     ChevronLeft,
//     ChevronRight,
//     X,
//     MessageSquare,
//     HelpCircle,
//     CreditCard,
//     Shield,
//     Building,
//     BookOpen,
// } from 'lucide-react';

// const AdminSidebar = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     const navigationItems = [
//         {
//             name: 'Dashboard',
//             path: '/admin',
//             icon: <Home className="h-5 w-5" />,
//             description: 'Analytics overview',
//         },
//         {
//             name: 'Candidates',
//             path: '/admin/candidates',
//             icon: <Users className="h-5 w-5" />,
//             description: 'Candidate management',
//         },
//         {
//             name: 'Employers',
//             path: '/admin/employers',
//             icon: <Briefcase className="h-5 w-5" />,
//             description: 'Employer management',
//         },
//         {
//             name: 'Guests',
//             path: '/admin/guests',
//             icon: <User className="h-5 w-5" />,
//             description: 'Guest management',
//         },
//         {
//             name: 'Blogs',
//             path: '/admin/blogs',
//             icon: <FileText className="h-5 w-5" />,
//             description: 'Blog management',
//         },
//         {
//             name: 'Quizzes',
//             path: '/admin/quizzes',
//             icon: <CheckSquare className="h-5 w-5" />,
//             description: 'Quiz management',
//         },
//         {
//             name: 'Certifications',
//             path: '/admin/certifications',
//             icon: <Award className="h-5 w-5" />,
//             description: 'Certification management',
//         },
//         {
//             name: 'Industry Experience',
//             path: '/admin/industry-experience',
//             icon: <Building className="h-5 w-5" />,
//             description: 'Industry experience management',
//         },
//         {
//             name: 'Verification',
//             path: '/admin/very',
//             icon: <Shield className="h-5 w-5" />,
//             description: 'Candidate verification',
//         },
//         {
//             name: 'Meetings',
//             path: '/admin/meetings',
//             icon: <MessageSquare className="h-5 w-5" />,
//             description: 'Meeting management',
//         },
//         {
//             name: 'Plans',
//             path: '/admin/plans',
//             icon: <CreditCard className="h-5 w-5" />,
//             description: 'Subscription plans',
//         },
//         {
//             name: 'Help Center',
//             path: '/admin/help',
//             icon: <HelpCircle className="h-5 w-5" />,
//             description: 'Admin help center',
//         },
//     ];

//     const isActive = (path: string) => {
//         if (path === '/admin') {
//             return location.pathname === '/admin';
//         }
//         return location.pathname.startsWith(path);
//     };

//     const handleLogout = () => {
//         // Add logout logic here
//         localStorage.removeItem('token');
//         localStorage.removeItem('userRole');
//         navigate('/login');
//     };

//     // Desktop Sidebar
//     const DesktopSidebar = () => (
//         <aside
//             className={cn(
//                 "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300 ease-in-out flex flex-col",
//                 isCollapsed ? "w-20" : "w-64"
//             )}
//         >
//             {/* Logo Section */}
//             <div className="flex h-16 items-center justify-between border-b px-4">
//                 {!isCollapsed ? (
//                     <div className="flex items-center gap-2">
//                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
//                             <span className="font-bold text-primary-foreground">A</span>
//                         </div>
//                         <h1 className="text-lg font-semibold">Admin Panel</h1>
//                     </div>
//                 ) : (
//                     <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
//                         <span className="font-bold text-primary-foreground">A</span>
//                     </div>
//                 )}
//                 {/* <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setIsCollapsed(!isCollapsed)}
//                     className="hidden lg:flex"
//                 >
//                     {isCollapsed ? (
//                         <ChevronRight className="h-4 w-4" />
//                     ) : (
//                         <ChevronLeft className="h-4 w-4" />
//                     )}
//                 </Button> */}
//             </div>

//             {/* Navigation */}
//             <ScrollArea className="flex-1 px-3 py-4">
//                 <nav className="space-y-1">
//                     <TooltipProvider delayDuration={0}>
//                         {navigationItems.map((item) => {
//                             const active = isActive(item.path);
//                             return (
//                                 <Tooltip key={item.name}>
//                                     <TooltipTrigger asChild>
//                                         <Button
//                                             variant={active ? "secondary" : "ghost"}
//                                             className={cn(
//                                                 "w-full justify-start h-12 px-3",
//                                                 isCollapsed ? "justify-center" : "justify-start"
//                                             )}
//                                             asChild
//                                         >
//                                             <Link to={item.path}>
//                                                 <div className={cn(
//                                                     "flex items-center gap-3",
//                                                     isCollapsed && "justify-center"
//                                                 )}>
//                                                     <span className={cn(
//                                                         active ? "text-primary" : "text-muted-foreground"
//                                                     )}>
//                                                         {item.icon}
//                                                     </span>
//                                                     {!isCollapsed && (
//                                                         <div className="flex-1 text-left">
//                                                             <span className="font-medium">{item.name}</span>
//                                                             <p className="text-xs text-muted-foreground mt-0.5">
//                                                                 {item.description}
//                                                             </p>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </Link>
//                                         </Button>
//                                     </TooltipTrigger>
//                                     {isCollapsed && (
//                                         <TooltipContent side="right">
//                                             <p>{item.name}</p>
//                                             <p className="text-xs text-muted-foreground">{item.description}</p>
//                                         </TooltipContent>
//                                     )}
//                                 </Tooltip>
//                             );
//                         })}
//                     </TooltipProvider>
//                 </nav>
//             </ScrollArea>

//             {/* Footer Section */}
//             <div className="border-t p-4">
//                 <TooltipProvider>
//                     <Tooltip>
//                         <TooltipTrigger asChild>
//                             <Button
//                                 variant="ghost"
//                                 className={cn(
//                                     "w-full justify-start h-12 px-3 mb-2",
//                                     isCollapsed ? "justify-center" : "justify-start"
//                                 )}
//                                 asChild
//                             >
//                                 <Link to="/admin/settings">
//                                     <Settings className={cn(
//                                         "h-5 w-5",
//                                         location.pathname === '/admin/settings' ? "text-primary" : "text-muted-foreground"
//                                     )} />
//                                     {!isCollapsed && (
//                                         <span className="ml-3">Settings</span>
//                                     )}
//                                 </Link>
//                             </Button>
//                         </TooltipTrigger>
//                         {isCollapsed && (
//                             <TooltipContent side="right">
//                                 <p>Settings</p>
//                                 <p className="text-xs text-muted-foreground">Account and profile management</p>
//                             </TooltipContent>
//                         )}
//                     </Tooltip>

//                     <Button
//                         variant="ghost"
//                         className={cn(
//                             "w-full justify-start h-12 px-3 text-destructive hover:text-destructive hover:bg-destructive/10",
//                             isCollapsed ? "justify-center" : "justify-start"
//                         )}
//                         onClick={handleLogout}
//                     >
//                         <LogOut className="h-5 w-5" />
//                         {!isCollapsed && <span className="ml-3">Logout</span>}
//                     </Button>
//                 </TooltipProvider>
//             </div>
//         </aside>
//     );

//     // Mobile Sidebar
//     const MobileSidebar = () => (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button
//                     variant="outline"
//                     size="icon"
//                     className="lg:hidden fixed top-4 left-4 z-50"
//                 >
//                     <Menu className="h-5 w-5" />
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="w-64 p-0">
//                 <div className="flex h-16 items-center border-b px-4">
//                     <div className="flex items-center gap-2">
//                         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
//                             <span className="font-bold text-primary-foreground">A</span>
//                         </div>
//                         <h1 className="text-lg font-semibold">Admin Panel</h1>
//                     </div>
//                 </div>
//                 <ScrollArea className="h-[calc(100vh-4rem)]">
//                     <nav className="space-y-1 p-3">
//                         {navigationItems.map((item) => {
//                             const active = isActive(item.path);
//                             return (
//                                 <Button
//                                     key={item.name}
//                                     variant={active ? "secondary" : "ghost"}
//                                     className="w-full justify-start h-12 px-3"
//                                     asChild
//                                 >
//                                     <Link to={item.path}>
//                                         <div className="flex items-center gap-3">
//                                             {item.icon}
//                                             <div className="flex-1 text-left">
//                                                 <span className="font-medium">{item.name}</span>
//                                                 <p className="text-xs text-muted-foreground mt-0.5">
//                                                     {item.description}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 </Button>
//                             );
//                         })}
//                     </nav>
//                     <Separator className="my-2" />
//                     <div className="p-3">
//                         <Button
//                             variant="ghost"
//                             className="w-full justify-start h-12 px-3 mb-2"
//                             asChild
//                         >
//                             <Link to="/admin/settings">
//                                 <Settings className="h-5 w-5 mr-3" />
//                                 <span>Settings</span>
//                             </Link>
//                         </Button>
//                         <Button
//                             variant="ghost"
//                             className="w-full justify-start h-12 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
//                             onClick={handleLogout}
//                         >
//                             <LogOut className="h-5 w-5 mr-3" />
//                             <span>Logout</span>
//                         </Button>
//                     </div>
//                 </ScrollArea>
//             </SheetContent>
//         </Sheet>
//     );

//     return (
//         <>
//             <MobileSidebar />
//             <DesktopSidebar />
//             {/* Spacer for desktop sidebar */}
//             <div className={cn(
//                 "hidden lg:block transition-all duration-300",
//                 isCollapsed ? "w-20" : "w-64"
//             )} />
//         </>
//     );
// };

// export default AdminSidebar;



import {
    Grid2X2,
    Inbox,
    User,
    Plus,
    File,
    List,
    Check,
    Calendar,
    BookOpen,
    HelpCircle,
    CreditCard,
    Users,
    Settings,
    UserCheck,
    Building2,
    DollarSign,
    Folder,
    LogIn,
    LogOut,
    Home,
    Briefcase,
    FileText,
    CheckSquare,
    Award,
    Building,
    Shield,
    MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { toast } from "sonner";

// import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
// import { addIntern, addJob } from "@/store/employer store/store";
import { useEmployerStore } from "@/store/employer store/EmployerStore";
import logo from '@/assets/56e3e265-35c1-4968-86ec-2a6c964c97ad.png';

const token = localStorage.getItem("token")
// Navigation items organized by sections
const navigationSections = [
    {
        label: "Admin",
        items: [
            { title: "Dashboard", url: "/admin", icon: Home, badge: null },
            { title: "Candidates", url: "/admin/candidates", icon: Users, badge: null },
            { title: "Employers", url: "/admin/employers", icon: Briefcase, badge: null },
            // { title: "Guests", url: "/admin/guests", icon: User, badge: null },
            { title: "Blogs", url: "/admin/blogs", icon: FileText, badge: null },
            { title: "Quizzes", url: "/admin/quizzes", icon: CheckSquare, badge: null },
            // { title: "Certifications", url: "/admin/certifications", icon: Award, badge: null },
            // { title: "Industry Experience", url: "/admin/industry-experience", icon: Building, badge: null },

            { title: "Meetings", url: "/admin/meetings", icon: MessageSquare, badge: null },
            { title: "Inbox", url: "/admin/inbox", icon: Inbox, badge: null },
            { title: "Plans", url: "/admin/plans", icon: CreditCard, badge: null },
            { title: "Help Center", url: "/admin/help", icon: HelpCircle, badge: null },
                  { title: "Profile", url: "/admin/profile", icon: User, badge: null },
        ]
    }
];

export default function AppSidebar() {

    const { toast } = useToast();
    const [loggingOut, setLoggingOut] = useState(false);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleAuthAction = async () => {
        if (currentUser) {
            // Logout
            try {
                setLoggingOut(true);
                await logout();
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                toast.success("Logged out successfully!");

                navigate("/");
            } catch (error: any) {
                toast.error(error.message || "Failed to logout");
            } finally {
                setLoggingOut(false);
            }
        } else {
            // Redirect to login
            navigate("/login");
        }
    };
    console.log({ token })






    //#region add job to backend


    ////#endregion



    return (
        <>
            <Sidebar className="border-r border-gray-200/60 bg-gradient-to-b from-slate-50 to-white min-w-0 shrink-0  p-responsive-sm ">
                <SidebarHeader className="p-responsive- border-b border-gray-100 text-secondary-c  ">
                    {/* <div
                        className="bg-accent hover:bg-accent/90 text-white w-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-3 min-w-0"


                    >

                        <span className="truncate">Admin Panal</span>
                    </div> */}
                    <div >
                        <img src={logo} alt='Nestira' width={200} loading='lazy' />
                    </div>
                    {/* <span>Admin Panal</span> */}
                </SidebarHeader>

                <SidebarContent >

                    <div className="px-2 sm:px-4 py-2 min-w-0">
                        {navigationSections.map((section) => (
                            <SidebarGroup key={section.label} className="mb-responsive">
                                <SidebarGroupLabel className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em] mb-4 px-3 truncate">
                                    {section.label}
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu className="space-y-1">
                                        {section.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    className="hover:bg-gradient-to-r hover:from-accent/10 hover:to-accent/5 hover:border-l-4 hover:border-accent transition-all duration-200 rounded-lg group py-3 min-w-0"
                                                >
                                                    <Link to={item.url} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-accent font-medium min-w-0">
                                                        <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200 shrink-0" />
                                                        <span className="text-responsive-sm truncate">{item.title}</span>
                                                        {item.badge && (
                                                            <span className="ml-auto bg-gradient-to-r from-accent to-orange-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm shrink-0">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))}

                    </div>

                    <div className="p-3 relative  min-w-0" >




                        {/* Login/Logout Button - Fixed at bottom */}
                        <div className="p-4 border-t border-border-c/20 flex-shrink-0">
                            <Button
                                onClick={handleAuthAction}
                                disabled={loggingOut}
                                className={`w-full transition-all duration-200 ${currentUser
                                    ? "bg-secondary-c hover:opacity-[.8] text-destructive-foreground"
                                    : " hover:opacity-[.8] text-primary-c-foreground  bg-secondary-c"
                                    }`}
                            >
                                {loggingOut ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Logging out...
                                    </span>
                                ) : currentUser ? (
                                    <>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Login
                                    </>
                                )}
                            </Button>

                            {currentUser && (
                                <p className="text-xs text-center text-primary-c-foreground/60 mt-2 truncate">
                                    {currentUser.email}
                                </p>
                            )}
                        </div>

                    </div>
                </SidebarContent>
            </Sidebar>



        </>
    );
}
