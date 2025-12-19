// // import { DashboardLayout } from '@/components/DashboardLayout';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogDescription,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import {
//   Search,
//   Mail,
//   Star,
//   Archive,
//   Trash2,
//   Reply,
//   Forward,
//   MoreHorizontal,
//   Paperclip,
//   Flag,
//   Tag,
//   Check,
//   AlertTriangle
// } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { getUserChats, toggleStartChat, deleteChatForUser } from '@/services/chatService';
// // import { deleteChatForUser } from '@/services/chatService'; // Import the delete function
// import { useAuth } from '@/contexts/AuthContext';
// import ChatPopup from '@/components/Chat/ChatPopup';

// interface Chat {
//   sender: string;
//   role: string;
//   chatWith: string;
//   participant: string;
//   lastMessage: string;
//   lastTimestamp: number;
//   chatType: string;
//   createdAt: number;
//   lastMessageReaded: boolean;
//   isStart: boolean;
// }

// interface Message {
//   id: string;
//   sender: string;
//   subject: string;
//   preview: string;
//   time: string;
//   read: boolean;
//   starred: boolean;
//   priority: 'high' | 'normal' | 'low';
//   hasAttachment: boolean;
//   labels: string[];
//   content: string;
//   chatWith: string;
//   role: string;
//   chatType: string;
// }

// interface Label {
//   name: string;
//   color: string;
// }

// const initialLabels: Label[] = [
//   { name: "All", color: "bg-black" },
//   { name: "Work", color: "bg-red-500" },
//   { name: "Personal", color: "bg-green-500" },
//   { name: "Important", color: "bg-blue-500" },
//   { name: "Social", color: "bg-yellow-500" },
//   { name: "Promotions", color: "bg-purple-500" },
//   { name: "Support", color: "bg-orange-500" },
// ];

// const Inbox = () => {
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [allMessages, setAllMessages] = useState<Message[]>([]);
//   const [labels, setLabels] = useState(initialLabels);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [composeOpen, setComposeOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [chatPopupOpen, setChatPopupOpen] = useState(false);
//   const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
//   const [deleting, setDeleting] = useState(false);
//   const [deletingMessages, setDeletingMessages] = useState<Set<string>>(new Set());
//   const { currentUser } = useAuth();

//   // Convert timestamp to readable time
//   const formatTime = (timestamp: number) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     } else if (diffInHours < 48) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   // Convert chat data to message format
//   const convertChatToMessage = (chat: Chat, index: number): Message => {
//     return {
//       id: `chat-${index}-${chat.chatWith}`,
//       sender: chat.sender,
//       subject: chat.role || 'New Message',
//       preview: chat.lastMessage,
//       time: formatTime(chat.lastTimestamp),
//       read: chat.lastMessageReaded,
//       starred: chat.isStart,
//       priority: chat.chatType === 'Important' ? 'high' : 'normal',
//       hasAttachment: false,
//       labels: chat.chatType ? [chat.chatType] : [],
//       content: chat.lastMessage,
//       chatWith: chat.chatWith,
//       role: chat.role,
//       chatType: chat.chatType
//     };
//   };

//   const stats = [
//     { label: "Unread", value: messages.filter(message => !message.read).length },
//     { label: "Starred", value: messages.filter(message => message.starred).length },
//     { label: "Important", value: messages.filter(message => message.priority === 'high').length },
//   ];

//   const handleMessageClick = (message: Message) => {
//     setSelectedMessage(message);
//     setChatPopupOpen(true);

//     // Mark as read
//     setMessages(prevMessages =>
//       prevMessages.map(msg =>
//         msg.id === message.id ? { ...msg, read: true } : msg
//       )
//     );
//   };

//   const handleCloseChatPopup = () => {
//     setChatPopupOpen(false);
//     setSelectedMessage(null);
//   };

//   const toggleStar = (message: any) => {
//     console.log('message=====', message)
//     toggleStartChat(currentUser.uid, message.chatWith, !message.starred)
//     setMessages(prevMessages =>
//       prevMessages.map(msg =>
//         msg.id === message.id ? { ...msg, starred: !msg.starred } : msg
//       )
//     );
//   };

//   // Filter messages based on search query and selected label
//   const filteredMessages = messages.filter(message => {
//     const matchesSearch =
//       message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       message.preview.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesLabel = selectedLabel
//       ? message.chatType === selectedLabel || message.labels.includes(selectedLabel)
//       : true;

//     return matchesSearch && matchesLabel;
//   });

//   const toggleMessageLabel = (messageId: string, labelName: string) => {
//     setMessages(prevMessages => {
//       return prevMessages.map(msg => {
//         if (msg.id === messageId) {
//           const hasLabel = msg.labels.includes(labelName);
//           const updatedLabels = hasLabel
//             ? msg.labels.filter(label => label !== labelName)
//             : [...msg.labels, labelName];
//           return { ...msg, labels: updatedLabels };
//         }
//         return msg;
//       });
//     });
//   };

//   // Handle label click to filter messages
//   const handleLabelClick = (labelName: string) => {
//     if (labelName == 'All') {
//       setSelectedLabel(null);
//       setMessages(allMessages);
//     } else {
//       setSelectedLabel(labelName);
//       const filteredByLabel = allMessages.filter(message =>
//         message.chatType === labelName || message.labels.includes(labelName)
//       );
//       setMessages(filteredByLabel);
//     }
//   };

//   // Handle delete chat
//   const handleDeleteChat = async (message: Message) => {
//     setMessageToDelete(message);
//     setDeleteDialogOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (!messageToDelete || !currentUser) return;

//     setDeleting(true);
//     setDeletingMessages(prev => new Set(prev).add(messageToDelete.id));

//     try {
//       const success = await deleteChatForUser(currentUser.uid, messageToDelete.chatWith);

//       if (success) {
//         // Remove message from state with animation
//         setTimeout(() => {
//           setMessages(prev => prev.filter(msg => msg.id !== messageToDelete.id));
//           setAllMessages(prev => prev.filter(msg => msg.id !== messageToDelete.id));
//           setDeletingMessages(prev => {
//             const newSet = new Set(prev);
//             newSet.delete(messageToDelete.id);
//             return newSet;
//           });
//         }, 300);
//       } else {
//         throw new Error('Failed to delete chat');
//       }
//     } catch (error) {
//       console.error('Error deleting chat:', error);
//       alert('Failed to delete chat. Please try again.');
//     } finally {
//       setDeleting(false);
//       setDeleteDialogOpen(false);
//       setMessageToDelete(null);
//     }
//   };

//   // Get unique chat types from all messages for dynamic labels
//   const getDynamicLabels = () => {
//     const chatTypes = [...new Set(allMessages.map(message => message.chatType).filter(Boolean))];
//     const existingLabelNames = labels.map(label => label.name);

//     const dynamicLabels = chatTypes
//       .filter(chatType => chatType && !existingLabelNames.includes(chatType))
//       .map(chatType => ({
//         name: chatType,
//         color: getColorForLabel(chatType)
//       }));

//     return [...labels, ...dynamicLabels];
//   };

//   // Helper function to assign colors to dynamic labels
//   const getColorForLabel = (labelName: string): string => {
//     const colorMap: { [key: string]: string } = {
//       'All': 'bg-black',
//       'Work': 'bg-red-500',
//       'Personal': 'bg-green-500',
//       'Important': 'bg-blue-500',
//       'Social': 'bg-yellow-500',
//       'Promotions': 'bg-purple-500',
//       'Support': 'bg-orange-500',
//     };

//     const defaultColors = [
//       'bg-pink-500',
//       'bg-indigo-500',
//       'bg-teal-500',
//       'bg-cyan-500',
//       'bg-amber-500',
//       'bg-lime-500'
//     ];

//     return colorMap[labelName] || defaultColors[Math.floor(Math.random() * defaultColors.length)];
//   };

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         setLoading(true);
//         const userChats = await getUserChats(currentUser.uid);
//         console.log('userChats -- ', userChats);

//         setChats(userChats);
//         const convertedMessages = userChats.map((chat: Chat, index: number) =>
//           convertChatToMessage(chat, index)
//         );

//         setMessages(convertedMessages);
//         setAllMessages(convertedMessages);
//       } catch (error) {
//         console.error('Error fetching chats: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUser?.uid) {
//       fetchChats();
//     }
//   }, [currentUser]);

//   const dynamicLabels = getDynamicLabels();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg">Loading messages...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
//           <p className="text-gray-600">Stay connected and manage your communications</p>
//           {selectedLabel && (
//             <div className="flex items-center gap-2 mt-2">
//               <Badge variant="secondary" className="text-xs">
//                 Filtered by: {selectedLabel}
//               </Badge>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => {
//                   setSelectedLabel(null);
//                   setMessages(allMessages);
//                 }}
//                 className="h-6 px-2 text-xs"
//               >
//                 Clear filter
//               </Button>
//             </div>
//           )}
//         </div>
//         <Button onClick={() => setComposeOpen(true)}>
//           <Mail className="w-4 h-4 mr-2" />
//           Compose
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {stats.map((stat) => (
//           <Card key={stat.label}>
//             <CardHeader>
//               <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stat.value}</div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//         <div className="lg:col-span-1 space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-base font-medium">Filters</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h4 className="text-sm font-medium mb-2">Search</h4>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     placeholder="Search messages..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium mb-2">Labels</h4>
//                 <div className="space-y-2">
//                   {dynamicLabels.map((label) => (
//                     <div
//                       key={label.name}
//                       className={`flex items-center justify-between p-1 rounded cursor-pointer transition-colors ${selectedLabel === label.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
//                         }`}
//                       onClick={() => handleLabelClick(label.name)}
//                     >
//                       <label className="flex items-center gap-2 cursor-pointer flex-1">
//                         <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
//                         <span className={selectedLabel === label.name ? 'font-semibold text-blue-700' : ''}>
//                           {label.name}
//                         </span>
//                       </label>
//                       {selectedLabel === label.name && (
//                         <Check className="w-4 h-4 text-blue-600" />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="lg:col-span-3 space-y-6">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-base font-medium">
//                 Messages
//                 {selectedLabel && (
//                   <span className="text-sm font-normal text-gray-600 ml-2">
//                     (Filtered by: {selectedLabel})
//                   </span>
//                 )}
//               </CardTitle>
//               {/* <div className="flex items-center gap-2">
//                 <Button variant="outline" size="sm">
//                   <Archive className="w-4 h-4 mr-2" />
//                   Archive
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Trash2 className="w-4 h-4 mr-2" />
//                   Delete
//                 </Button>
//               </div> */}
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 {filteredMessages.length === 0 ? (
//                   <div className="text-center py-8 text-gray-500">
//                     <p>
//                       {searchQuery || selectedLabel
//                         ? 'No messages found matching your criteria.'
//                         : 'No messages found.'
//                       }
//                     </p>
//                     {(searchQuery || selectedLabel) && (
//                       <Button
//                         variant="outline"
//                         className="mt-2"
//                         onClick={() => {
//                           setSearchQuery('');
//                           setSelectedLabel(null);
//                           setMessages(allMessages);
//                         }}
//                       >
//                         Clear filters
//                       </Button>
//                     )}
//                   </div>
//                 ) : (
//                   filteredMessages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${message.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
//                         } hover:bg-gray-50 ${deletingMessages.has(message.id)
//                           ? 'opacity-0 scale-95 -translate-x-4'
//                           : 'opacity-100 scale-100 translate-x-0'
//                         }`}
//                       onClick={() => handleMessageClick(message)}
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-1">
//                             <span className={`font-medium ${!message.read ? 'font-bold' : ''}`}>
//                               {message.sender}
//                             </span>
//                             {message.priority === 'high' && (
//                               <Flag className="w-4 h-4 text-red-500" />
//                             )}
//                             {message.hasAttachment && (
//                               <Paperclip className="w-4 h-4 text-gray-400" />
//                             )}
//                             {message.labels.length > 0 && (
//                               <div className="flex gap-1">
//                                 {message.labels.map((labelName) => {
//                                   const label = dynamicLabels.find(l => l.name === labelName);
//                                   return label ? (
//                                     <Badge
//                                       key={labelName}
//                                       variant="secondary"
//                                       className="text-xs cursor-pointer hover:bg-gray-200"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleLabelClick(labelName);
//                                       }}
//                                     >
//                                       <div className={`w-2 h-2 rounded-full ${label.color} mr-1`}></div>
//                                       {labelName}
//                                     </Badge>
//                                   ) : null;
//                                 })}
//                               </div>
//                             )}
//                           </div>
//                           <div className={`text-sm ${!message.read ? 'font-semibold' : 'text-gray-700'} mb-1`}>
//                             {message.subject}
//                           </div>
//                           <div className="text-sm text-gray-600 line-clamp-2">
//                             {message.preview}
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 ml-4">
//                           <span className="text-xs text-gray-500">
//                             {message.time}
//                           </span>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleStar(message);
//                             }}
//                             className="p-1 hover:bg-gray-100 rounded transition-colors"
//                           >
//                             <Star
//                               className={`w-4 h-4 ${message.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'
//                                 }`}
//                             />
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDeleteChat(message);
//                             }}
//                             className="p-1 hover:bg-red-50 rounded transition-colors group"
//                             title="Delete chat"
//                           >
//                             <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Chat Popup */}
//       {selectedMessage && (
//         <ChatPopup
//           currentUserId={currentUser.uid}
//           otherUserId={selectedMessage.chatWith}
//           otherUserName={selectedMessage.sender}
//           otherUserTitle={selectedMessage.role}
//           onClose={handleCloseChatPopup}
//           isOpen={chatPopupOpen}
//         />
//       )}

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2 text-red-600">
//               <AlertTriangle className="w-5 h-5" />
//               Delete Chat
//             </DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete this chat with <strong>{messageToDelete?.sender}</strong>?
//               This action cannot be undone and will permanently remove the chat from your inbox.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter className="flex gap-2 sm:gap-0">
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//               disabled={deleting}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={confirmDelete}
//               disabled={deleting}
//               className="flex items-center gap-2"
//             >
//               {deleting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="w-4 h-4" />
//                   Delete Chat
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={composeOpen} onOpenChange={() => setComposeOpen(false)}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Compose New Message</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//               <Input placeholder="Recipient's email address" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
//               <Input placeholder="Subject of the message" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
//               <Textarea placeholder="Type your message..." rows={6} />
//             </div>
//             <div className="flex justify-end">
//               <Button>Send Message</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Inbox;


// import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Search,
    Mail,
    Star,
    Archive,
    Trash2,
    Reply,
    Forward,
    MoreHorizontal,
    Paperclip,
    Flag,
    Tag,
    Check,
    AlertTriangle
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserChats, toggleStartChat, deleteChatForUser } from '@/services/chatService';
// import { deleteChatForUser } from '@/services/chatService'; // Import the delete function
import { useAuth } from '@/contexts/AuthContext';
import ChatPopup from '@/components/Chat/ChatPopup';

interface Chat {
    sender: string;
    role: string;
    profilePhoto: string;
    chatWith: string;
    participant: string;
    lastMessage: string;
    lastTimestamp: number;
    chatType: string;
    createdAt: number;
    lastMessageReaded: boolean;
    isStart: boolean;
}

interface Message {
    id: string;
    sender: string;
    profilePhoto: string;
    subject: string;
    preview: string;
    time: string;
    read: boolean;
    starred: boolean;
    priority: 'high' | 'normal' | 'low';
    hasAttachment: boolean;
    labels: string[];
    content: string;
    chatWith: string;
    role: string;
    chatType: string;
}

interface Label {
    name: string;
    color: string;
}

const initialLabels: Label[] = [
    { name: "All", color: "bg-black" },
    { name: "Work", color: "bg-red-500" },
    { name: "Personal", color: "bg-green-500" },
    { name: "Important", color: "bg-blue-500" },
    { name: "Social", color: "bg-yellow-500" },
    { name: "Promotions", color: "bg-purple-500" },
    { name: "Support", color: "bg-orange-500" },
];

const Inbox = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const [labels, setLabels] = useState(initialLabels);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [composeOpen, setComposeOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chatPopupOpen, setChatPopupOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deletingMessages, setDeletingMessages] = useState<Set<string>>(new Set());
    const { currentUser } = useAuth();

    // Convert timestamp to readable time
    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    // Convert chat data to message format
    const convertChatToMessage = (chat: Chat, index: number): Message => {
        console.log('chat=>', chat)
        return {
            id: `chat-${index}-${chat.chatWith}`,
            sender: chat.sender,
            subject: chat.role || 'New Message',
            profilePhoto: chat.profilePhoto || '',
            preview: chat.lastMessage,
            time: formatTime(chat.lastTimestamp),
            read: chat.lastMessageReaded,
            starred: chat.isStart,
            priority: chat.chatType === 'Important' ? 'high' : 'normal',
            hasAttachment: false,
            labels: chat.chatType ? [chat.chatType] : [],
            content: chat.lastMessage,
            chatWith: chat.chatWith,
            role: chat.role,
            chatType: chat.chatType
        };
    };

    const stats = [
        { label: "Unread", value: messages.filter(message => !message.read).length },
        { label: "Starred", value: messages.filter(message => message.starred).length },
        { label: "Important", value: messages.filter(message => message.priority === 'high').length },
    ];

    const handleMessageClick = (message: Message) => {
        setSelectedMessage(message);
        setChatPopupOpen(true);

        // Mark as read
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === message.id ? { ...msg, read: true } : msg
            )
        );
    };

    const handleCloseChatPopup = () => {
        setChatPopupOpen(false);
        setSelectedMessage(null);
    };

    const toggleStar = (message: any) => {
        console.log('message=====', message)
        toggleStartChat(currentUser.uid, message.chatWith, !message.starred)
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.id === message.id ? { ...msg, starred: !msg.starred } : msg
            )
        );
    };

    // Filter messages based on search query and selected label
    const filteredMessages = messages.filter(message => {
        const matchesSearch =
            message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.preview.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLabel = selectedLabel
            ? message.chatType === selectedLabel || message.labels.includes(selectedLabel)
            : true;

        return matchesSearch && matchesLabel;
    });

    const toggleMessageLabel = (messageId: string, labelName: string) => {
        setMessages(prevMessages => {
            return prevMessages.map(msg => {
                if (msg.id === messageId) {
                    const hasLabel = msg.labels.includes(labelName);
                    const updatedLabels = hasLabel
                        ? msg.labels.filter(label => label !== labelName)
                        : [...msg.labels, labelName];
                    return { ...msg, labels: updatedLabels };
                }
                return msg;
            });
        });
    };

    // Handle label click to filter messages
    const handleLabelClick = (labelName: string) => {
        if (labelName == 'All') {
            setSelectedLabel(null);
            setMessages(allMessages);
        } else {
            setSelectedLabel(labelName);
            const filteredByLabel = allMessages.filter(message =>
                message.chatType === labelName || message.labels.includes(labelName)
            );
            setMessages(filteredByLabel);
        }
    };

    // Handle delete chat
    const handleDeleteChat = async (message: Message) => {
        setMessageToDelete(message);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!messageToDelete || !currentUser) return;

        setDeleting(true);
        setDeletingMessages(prev => new Set(prev).add(messageToDelete.id));

        try {
            const success = await deleteChatForUser(currentUser.uid, messageToDelete.chatWith);

            if (success) {
                // Remove message from state with animation
                setTimeout(() => {
                    setMessages(prev => prev.filter(msg => msg.id !== messageToDelete.id));
                    setAllMessages(prev => prev.filter(msg => msg.id !== messageToDelete.id));
                    setDeletingMessages(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(messageToDelete.id);
                        return newSet;
                    });
                }, 300);
            } else {
                throw new Error('Failed to delete chat');
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('Failed to delete chat. Please try again.');
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
            setMessageToDelete(null);
        }
    };

    // Get unique chat types from all messages for dynamic labels
    const getDynamicLabels = () => {
        const chatTypes = [...new Set(allMessages.map(message => message.chatType).filter(Boolean))];
        const existingLabelNames = labels.map(label => label.name);

        const dynamicLabels = chatTypes
            .filter(chatType => chatType && !existingLabelNames.includes(chatType))
            .map(chatType => ({
                name: chatType,
                color: getColorForLabel(chatType)
            }));

        return [...labels, ...dynamicLabels];
    };

    // Helper function to assign colors to dynamic labels
    const getColorForLabel = (labelName: string): string => {
        const colorMap: { [key: string]: string } = {
            'All': 'bg-black',
            'Work': 'bg-red-500',
            'Personal': 'bg-green-500',
            'Important': 'bg-blue-500',
            'Social': 'bg-yellow-500',
            'Promotions': 'bg-purple-500',
            'Support': 'bg-orange-500',
        };

        const defaultColors = [
            'bg-pink-500',
            'bg-indigo-500',
            'bg-teal-500',
            'bg-cyan-500',
            'bg-amber-500',
            'bg-lime-500'
        ];

        return colorMap[labelName] || defaultColors[Math.floor(Math.random() * defaultColors.length)];
    };

    useEffect(() => {
        const fetchChats = async () => {
            try {
                setLoading(true);
                const userChats = await getUserChats(currentUser.uid);
                console.log('userChats -- ', userChats);

                setChats(userChats);
                const convertedMessages = userChats.map((chat: Chat, index: number) =>
                    convertChatToMessage(chat, index)
                );

                setMessages(convertedMessages);
                setAllMessages(convertedMessages);
            } catch (error) {
                console.error('Error fetching chats: ', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.uid) {
            fetchChats();
        }
    }, [currentUser]);

    const dynamicLabels = getDynamicLabels();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading messages...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
                    <p className="text-gray-600">Stay connected and manage your communications</p>
                    {selectedLabel && (
                        <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                                Filtered by: {selectedLabel}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setSelectedLabel(null);
                                    setMessages(allMessages);
                                }}
                                className="h-6 px-2 text-xs"
                            >
                                Clear filter
                            </Button>
                        </div>
                    )}
                </div>
                <Button onClick={() => setComposeOpen(true)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Compose
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label}>
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">Search</h4>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search messages..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium mb-2">Labels</h4>
                                <div className="space-y-2">
                                    {dynamicLabels.map((label) => (
                                        <div
                                            key={label.name}
                                            className={`flex items-center justify-between p-1 rounded cursor-pointer transition-colors ${selectedLabel === label.name ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                                }`}
                                            onClick={() => handleLabelClick(label.name)}
                                        >
                                            <label className="flex items-center gap-2 cursor-pointer flex-1">
                                                <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                                                <span className={selectedLabel === label.name ? 'font-semibold text-blue-700' : ''}>
                                                    {label.name}
                                                </span>
                                            </label>
                                            {selectedLabel === label.name && (
                                                <Check className="w-4 h-4 text-blue-600" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">
                                Messages
                                {selectedLabel && (
                                    <span className="text-sm font-normal text-gray-600 ml-2">
                                        (Filtered by: {selectedLabel})
                                    </span>
                                )}
                            </CardTitle>
                            {/* <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div> */}
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {filteredMessages.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>
                                            {searchQuery || selectedLabel
                                                ? 'No messages found matching your criteria.'
                                                : 'No messages found.'
                                            }
                                        </p>
                                        {(searchQuery || selectedLabel) && (
                                            <Button
                                                variant="outline"
                                                className="mt-2"
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setSelectedLabel(null);
                                                    setMessages(allMessages);
                                                }}
                                            >
                                                Clear filters
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    filteredMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${message.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                                                } hover:bg-gray-50 ${deletingMessages.has(message.id)
                                                    ? 'opacity-0 scale-95 -translate-x-4'
                                                    : 'opacity-100 scale-100 translate-x-0'
                                                }`}
                                            onClick={() => handleMessageClick(message)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`font-medium ${!message.read ? 'font-bold' : ''}`}>
                                                            {message.sender}
                                                        </span>
                                                        {message.priority === 'high' && (
                                                            <Flag className="w-4 h-4 text-red-500" />
                                                        )}
                                                        {message.hasAttachment && (
                                                            <Paperclip className="w-4 h-4 text-gray-400" />
                                                        )}
                                                        {message.labels.length > 0 && (
                                                            <div className="flex gap-1">
                                                                {message.labels.map((labelName) => {
                                                                    const label = dynamicLabels.find(l => l.name === labelName);
                                                                    return label ? (
                                                                        <Badge
                                                                            key={labelName}
                                                                            variant="secondary"
                                                                            className="text-xs cursor-pointer hover:bg-gray-200"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleLabelClick(labelName);
                                                                            }}
                                                                        >
                                                                            <div className={`w-2 h-2 rounded-full ${label.color} mr-1`}></div>
                                                                            {labelName}
                                                                        </Badge>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={`text-sm ${!message.read ? 'font-semibold' : 'text-gray-700'} mb-1`}>
                                                        {message.subject}
                                                    </div>
                                                    <div className="text-sm text-gray-600 line-clamp-2">
                                                        {message.preview}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <span className="text-xs text-gray-500">
                                                        {message.time}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleStar(message);
                                                        }}
                                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                    >
                                                        <Star
                                                            className={`w-4 h-4 ${message.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'
                                                                }`}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteChat(message);
                                                        }}
                                                        className="p-1 hover:bg-red-50 rounded transition-colors group"
                                                        title="Delete chat"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Chat Popup */}
            {selectedMessage && (
                <ChatPopup
                    currentUserId={currentUser.uid}
                    otherUserId={selectedMessage.chatWith}
                    otherUserName={selectedMessage.sender}
                    profilePhoto={selectedMessage.profilePhoto}
                    otherUserTitle={selectedMessage.role}
                    onClose={handleCloseChatPopup}
                    isOpen={chatPopupOpen}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            Delete Chat
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this chat with <strong>{messageToDelete?.sender}</strong>?
                            This action cannot be undone and will permanently remove the chat from your inbox.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deleting}
                            className="flex items-center gap-2"
                        >
                            {deleting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete Chat
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={composeOpen} onOpenChange={() => setComposeOpen(false)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Compose New Message</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <Input placeholder="Recipient's email address" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <Input placeholder="Subject of the message" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <Textarea placeholder="Type your message..." rows={6} />
                        </div>
                        <div className="flex justify-end">
                            <Button>Send Message</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Inbox;