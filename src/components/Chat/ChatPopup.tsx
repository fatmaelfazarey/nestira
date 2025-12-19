// ChatPopup.tsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Send, MessageSquare, Trash2, AlertTriangle, MoreVertical } from 'lucide-react';
import MessageTypeSelector from './MessageTypeSelector';
import { addMessage, subscribeMessages, updateChatType, getChatType, markMessagesAsRead, deleteSingleMessage } from '@/services/chatService';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatPopupProps {
    currentUserId: string;
    otherUserId: string;
    otherUserName: string;
    otherUserTitle: string;
    profilePhoto: string;
    onClose: () => void;
    isOpen: boolean;
}

interface Message {
    id: string;
    senderId: string;
    message: string;
    timestamp: number;
    isEmployer: boolean;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
    currentUserId,
    otherUserId,
    otherUserName,
    otherUserTitle,
    profilePhoto,
    onClose,
    isOpen
}) => {
    const [chatType, setChatType] = useState<string>('work');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isFirstMessage, setIsFirstMessage] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState<Message | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deletingMessages, setDeletingMessages] = useState<Set<string>>(new Set());

    // Subscribe to messages and chat type
    // alert('chat open')
    useEffect(() => {
        if (!currentUserId || !isOpen) return;

        markMessagesAsRead(currentUserId, otherUserId);

        const unsubscribe = subscribeMessages(currentUserId, otherUserId,
            (firebaseMessages: any[], existingChatType?: string) => {

                // Set the chat type from Firebase
                if (existingChatType) {
                    setChatType(existingChatType);
                }

                // Transform Firebase messages to our Message format
                const transformedMessages: Message[] = firebaseMessages.map(msg => ({
                    id: msg.id,
                    senderId: msg.senderId,
                    message: msg.message,
                    timestamp: msg.timestamp,
                    isEmployer: msg.senderId === currentUserId
                })).sort((a, b) => a.timestamp - b.timestamp);

                setMessages(transformedMessages);

                // Check if this is the first message
                if (transformedMessages.length === 0) {
                    setIsFirstMessage(true);
                } else {
                    setIsFirstMessage(false);
                }
            });

        // Cleanup subscription on unmount or when dialog closes
        return () => unsubscribe();
    }, [currentUserId, otherUserId, isOpen]);

    // Load existing chat type when dialog opens
    useEffect(() => {
        const loadChatType = async () => {
            if (isOpen && currentUserId) {
                const existingType = await getChatType(currentUserId, otherUserId);
                setChatType(existingType);
            }
        };

        loadChatType();
    }, [currentUserId, otherUserId, isOpen]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Handle delete message
    const handleDeleteMessage = (message: Message) => {
        setMessageToDelete(message);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!messageToDelete || !currentUserId) return;

        setDeleting(true);
        setDeletingMessages(prev => new Set(prev).add(messageToDelete.id));

        try {
            const success = await deleteSingleMessage(
                currentUserId,
                otherUserId,
                messageToDelete.id
            );

            if (success) {
                // Remove message from state with animation
                setTimeout(() => {
                    setMessages(prev => prev.filter(msg => msg.id !== messageToDelete.id));
                    setDeletingMessages(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(messageToDelete.id);
                        return newSet;
                    });
                }, 300);
            } else {
                throw new Error('Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message. Please try again.');
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
            setMessageToDelete(null);
        }
    };

    const handleSendMessage = async () => {
        if (!message.trim() || !currentUserId) {
            alert('Message cannot be empty');
            return;
        }

        if (!currentUserId || currentUserId === 'undefined') {
            alert('You must be logged in to send messages');
            return;
        }

        try {
            console.log('Sending message with:', {
                currentUserId,
                otherUserId,
                message: message.trim(),
                chatType,
                isFirstMessage
            });

            if (isFirstMessage) {
                console.log('Setting chat type first...');
                await updateChatType(currentUserId, otherUserId, chatType);
            }

            console.log('Adding message...');
            await addMessage(currentUserId, otherUserId, message.trim(), chatType);

            setMessage('');

            if (isFirstMessage) {
                setIsFirstMessage(false);
            }

            console.log('Message sent successfully!');
        } catch (error: any) {
            console.error('Error sending message:', error);

            if (error.message?.includes('Permission denied')) {
                alert('Permission denied. Please check Firebase rules and make sure you are logged in.');
            } else if (error.message?.includes('offline')) {
                alert('Network error. Please check your internet connection.');
            } else {
                alert('Failed to send message. Please try again.');
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-orange-50 rounded-t-lg">
                    {/* <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {profilePhoto ? <img src={profilePhoto} /> : otherUserName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <DialogTitle className="font-semibold text-gray-900">
                                {otherUserName}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600">
                                {otherUserTitle}
                            </DialogDescription>
                        </div>
                    </div> */}

                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex-shrink-0">
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt={`${otherUserName}'s profile`}
                                    className="w-full h-full rounded-full object-cover border border-gray-200"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {otherUserName?.charAt(0).toUpperCase() || '?'}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <DialogTitle className="font-semibold text-gray-900 truncate">
                                {otherUserName || 'Unknown User'}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-gray-600 truncate">
                                {otherUserTitle || 'No title provided'}
                            </DialogDescription>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Type Selector - Show only for first message */}
                {isFirstMessage && (
                    <div className="p-4 border-b border-gray-200 bg-orange-25">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Select chat type:
                            </label>
                            <MessageTypeSelector
                                value={chatType}
                                onChange={setChatType}
                            />
                        </div>
                    </div>
                )}

                {/* Chat Type Badge - Show when not first message */}
                {!isFirstMessage && (
                    <div className="p-3 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Chat type:</span>
                            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-orange-500 `}>
                                {chatType.charAt(0).toUpperCase() + chatType.slice(1)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Chat Messages */}
                <div className="h-80 Hidescrollbar overflow-y-auto p-4 space-y-3 ">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <MessageSquare className="w-12 h-12 mb-2 text-gray-300" />
                            <p className="text-center">No messages yet. Start the conversation!</p>
                            {isFirstMessage && (
                                <p className="text-center text-sm mt-1">
                                    Select chat type and send your first message
                                </p>
                            )}
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.isEmployer ? 'justify-end' : 'justify-start'} group relative`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative transition-all duration-300 ${deletingMessages.has(msg.id)
                                        ? 'opacity-0 scale-95 -translate-x-4'
                                        : 'opacity-100 scale-100 translate-x-0'
                                        } ${msg.isEmployer
                                            ? `bg-orange-500 text-white rounded-br-none`
                                            : 'bg-white border border-gray-200 text-gray-900 rounded-bl-none'
                                        }`}
                                >
                                    <p className="text-sm pr-6">{msg.message}</p>
                                    <p className="text-xs opacity-70 mt-1 text-right">
                                        {formatTime(msg.timestamp)}
                                    </p>

                                    {/* Delete dropdown menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                className={`absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${msg.isEmployer
                                                    ? 'hover:bg-orange-600 text-white'
                                                    : 'hover:bg-gray-100 text-gray-600'
                                                    }`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <MoreVertical className="w-3 h-3" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteMessage(msg)}
                                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete Message
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
                    <div className="flex gap-2 justify-start items-center h-fit">
                        <div className="flex-1 h-fit">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                rows={1}
                            />
                        </div>

                        <button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-red-600">
                                <AlertTriangle className="w-5 h-5" />
                                Delete Message
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this message?
                                {messageToDelete?.isEmployer
                                    ? " This message will be deleted for both you and the recipient."
                                    : " This message will only be deleted from your view."
                                }
                            </DialogDescription>
                        </DialogHeader>
                        {messageToDelete && (
                            <div className="p-3 bg-gray-50 rounded-lg border">
                                <p className="text-sm text-gray-700">{messageToDelete.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatTime(messageToDelete.timestamp)}
                                </p>
                            </div>
                        )}
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
                                        Delete Message
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </DialogContent>
        </Dialog>
    );
};

export default ChatPopup;