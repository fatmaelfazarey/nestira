

// // ChatButton.tsx
// import React, { useEffect, useState } from 'react';
// import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
// import { MessageSquare } from 'lucide-react';
// import ChatPopup from './ChatPopup';
// import { useAuth } from '@/contexts/AuthContext';
// import { addMessage, subscribeMessages } from '@/services/chatService';

// interface ChatButtonProps {
//     otherUserId: string;
//     otherUserName: string;
//     otherUserTitle: string;
// }

// const ChatButton: React.FC<ChatButtonProps> = ({ otherUserId, otherUserName, otherUserTitle }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const { currentUser } = useAuth();

//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//                 <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
//                     <MessageSquare className="w-4 h-4" />
//                     <span>Start Chat</span>
//                 </button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 {currentUser && (
//                     <ChatPopup
//                         currentUserId={currentUser.uid}
//                         otherUserId={otherUserId}
//                         otherUserName={otherUserName}
//                         otherUserTitle={otherUserTitle}
//                         onClose={() => setIsOpen(false)}
//                     />
//                 )}
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ChatButton;