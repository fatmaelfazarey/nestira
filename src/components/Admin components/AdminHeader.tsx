// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Separator } from '@/components/ui/separator';
// import {
//   Bell,
//   User,
//   Settings,
//   HelpCircle,
//   LogOut,
//   Search,
//   ChevronDown,
//   Mail,
//   Sun,
//   Moon,
//   CheckCircle,
//   Calendar,
//   DollarSign,
//   Shield,
// } from 'lucide-react';
// import { useTheme } from 'next-themes';

// const AdminHeader = () => {
//   const navigate = useNavigate();
//   const { theme, setTheme } = useTheme();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notificationsOpen, setNotificationsOpen] = useState(false);

//   const notificationsRef = useRef<HTMLDivElement>(null);

//   // Mock user data
//   const user = {
//     name: 'Admin User',
//     email: 'admin@example.com',
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
//     initials: 'AU',
//     role: 'Administrator',
//   };

//   // Mock notifications
//   const notifications = [
//     {
//       id: 1,
//       title: 'New Candidate Registered',
//       message: 'John Doe has registered as a candidate',
//       time: '10 min ago',
//       read: false,
//       type: 'candidate',
//       icon: <User className="h-4 w-4 text-green-600" />,
//     },
//     {
//       id: 2,
//       title: 'Meeting Scheduled',
//       message: 'Meeting with Tech Corp at 2:00 PM',
//       time: '1 hour ago',
//       read: true,
//       type: 'meeting',
//       icon: <Calendar className="h-4 w-4 text-blue-600" />,
//     },
//     {
//       id: 3,
//       title: 'Payment Received',
//       message: 'Subscription payment from ABC Company',
//       time: '3 hours ago',
//       read: false,
//       type: 'payment',
//       icon: <DollarSign className="h-4 w-4 text-purple-600" />,
//     },
//     {
//       id: 4,
//       title: 'Verification Required',
//       message: '5 candidate profiles need verification',
//       time: '5 hours ago',
//       read: true,
//       type: 'verification',
//       icon: <Shield className="h-4 w-4 text-amber-600" />,
//     },
//   ];

//   const unreadCount = notifications.filter(n => !n.read).length;

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');
//     navigate('/login');
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       // Implement search
//       console.log('Searching for:', searchQuery);
//     }
//   };

//   // Close notifications when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
//         setNotificationsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="flex h-16 items-center px-4 md:px-6 justify-between">
//         {/* Mobile sidebar spacer */}
//         <div className="lg:hidden w-12 " />

//         {/* Search Bar */}
//         <form onSubmit={handleSearch} className="flex-1 max-w-xl">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search candidates, employers, or anything..."
//               className="pl-10 w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </form>

//         {/* Right Side Actions */}
//         <div className="flex items-center gap-2 ml-4">
//           {/* Theme Toggle */}
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//                 >
//                   {theme === 'dark' ? (
//                     <Sun className="h-5 w-5" />
//                   ) : (
//                     <Moon className="h-5 w-5" />
//                   )}
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent>
//                 {theme === 'dark' ? 'Light mode' : 'Dark mode'}
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>

//           {/* Notifications */}
//           <div className="relative" ref={notificationsRef}>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setNotificationsOpen(!notificationsOpen)}
//               className="relative"
//             >
//               <Bell className="h-5 w-5" />
//               {unreadCount > 0 && (
//                 <Badge
//                   variant="destructive"
//                   className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
//                 >
//                   {unreadCount}
//                 </Badge>
//               )}
//             </Button>

//             {notificationsOpen && (
//               <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-popover shadow-lg z-50">
//                 <div className="p-4 border-b">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold">Notifications</h3>
//                     <Button variant="ghost" size="sm" className="h-auto p-0">
//                       <span className="text-sm text-primary">Mark all as read</span>
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="max-h-96 overflow-y-auto">
//                   {notifications.map((notification) => (
//                     <div
//                       key={notification.id}
//                       className={cn(
//                         "p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors",
//                         !notification.read && "bg-muted/30"
//                       )}
//                       onClick={() => {
//                         // Handle notification click
//                         setNotificationsOpen(false);
//                       }}
//                     >
//                       <div className="flex items-start gap-3">
//                         <div className="mt-0.5">{notification.icon}</div>
//                         <div className="flex-1 space-y-1">
//                           <h4 className="font-medium text-sm">
//                             {notification.title}
//                           </h4>
//                           <p className="text-sm text-muted-foreground">
//                             {notification.message}
//                           </p>
//                           <div className="flex items-center justify-between">
//                             <span className="text-xs text-muted-foreground">
//                               {notification.time}
//                             </span>
//                             {!notification.read && (
//                               <div className="h-2 w-2 rounded-full bg-primary" />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="p-3 text-center border-t">
//                   <Link
//                     to="/admin/notifications"
//                     className="text-sm text-primary hover:underline"
//                     onClick={() => setNotificationsOpen(false)}
//                   >
//                     View all notifications
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* User Profile Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-9 w-9 rounded-full">
//                 <Avatar className="h-9 w-9">
//                   <AvatarImage src={user.avatar} alt={user.name} />
//                   <AvatarFallback>{user.initials}</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">{user.name}</p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     {user.email}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuGroup>
//                 <DropdownMenuItem asChild>
//                   <Link to="/admin/profile">
//                     <User className="mr-2 h-4 w-4" />
//                     <span>My Profile</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/admin/settings">
//                     <Settings className="mr-2 h-4 w-4" />
//                     <span>Account Settings</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/admin/help">
//                     <HelpCircle className="mr-2 h-4 w-4" />
//                     <span>Help & Support</span>
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;






import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Mail,
} from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';

const AdminHeader = () => {
  const navigate = useNavigate();

  // // Mock user data
  // const user = {
  //   name: 'Admin User',
  //   email: 'admin@careerconnect.com',
  //   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  //   initials: 'AU',
  //   role: 'Administrator',
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userRole');
  //   navigate('/login');
  // };

  // const handleSettingsClick = () => {
  //   navigate('/admin/settings');
  // };

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  // const handleHelpClick = () => {
  //   navigate('/admin/help');
  // };

  return (
    <header className="border-b bg-white p-responsive-sm shrink-0 sticky top-0 z-40">
      <div className="flex items-center justify-between gap-4 min-w-0">
        <div className="flex items-center gap-4 min-w-0">
          <SidebarTrigger className="shrink-0" />
          <img
            src="/nestira-uploads/15ce39a5-675b-4eb2-8d98-088feb86b95d.png"
            alt="Logo"
            className="h-8 sm:h-10 lg:h-12 shrink-0"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              type="button"
              className="cursor-pointer shrink-0"
              title="Profile & Settings"
            >
              <User className="w-4 h-4" />
            </Button>
          {/* Search - Hide on very small screens */}
          {/* <div className="relative hidden sm:block min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 shrink-0" />
            <input
              type="text"
              placeholder="Search candidates, jobs..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full max-w-64 bg-white text-responsive-sm min-w-0"
            />
          </div> */}

          {/* Mobile Search Button */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="sm:hidden shrink-0"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </Button> */}

          {/* Notifications */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative shrink-0"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Notifications</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    Mark all as read
                  </Button>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-60 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="flex flex-col items-start p-3">
                    <div className="flex items-start gap-2 w-full">
                      <div className="mt-1">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Notification {i}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This is a sample notification message
                        </p>
                        <span className="text-xs text-muted-foreground mt-2 block">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-center">
                <Link to="/admin/notifications" className="text-sm text-accent hover:underline">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* User Profile Dropdown */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto shrink-0">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-accent text-white">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleHelpClick}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;