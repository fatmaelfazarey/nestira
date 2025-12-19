import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Search,
    MessageCircle,
    Clock,
    User,
    Bot,
    Send,
    ArrowLeft,
    Filter,
    MoreVertical,
    Shield,
    Zap,
    Mail,
    Star,
    CheckCircle2,
    Trash2,
    Plus,
    FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
    getHelpChatsForEmployer,
    subscribeMessages,
    markMessagesAsRead,
    sendAdminReply,
    getChatHistory,
    deleteHelpChatForBothUsers
} from '@/services/chatService';
import HelpArticleForm from '@/components/Admin components/HelpArticleForm';
import { toast } from 'sonner';
import { useAdminStore } from '@/store/Admin store/AdminStore';

interface Chat {
    chatWithId: string;
    participantName: string;
    role: string;
    lastMessage: string;
    lastTimestamp: number;
    chatType: string;
    createdAt: number;
    lastMessageReaded: boolean;
    unreadCount: number;
}

interface Message {
    id: string;
    senderId: string;
    message: string;
    timestamp: number;
    read: boolean;
    isHuman: boolean;
}

const AdminHelpCenter = () => {
    const { currentUser } = useAuth();
    const currentUserId = currentUser.uid;
    const { addHelpArticle } = useAdminStore();

    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [filterUnread, setFilterUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);



    // Load all help chats for admin
    useEffect(() => {
        if (!currentUserId) return;

        const loadChats = async () => {
            setLoading(true);
            try {
                const helpChats = await getHelpChatsForEmployer(currentUserId);
                setChats(helpChats);
            } catch (error) {
                console.error('Error loading chats:', error);
            } finally {
                setLoading(false);
            }
        };

        loadChats();
        const interval = setInterval(loadChats, 30000);
        return () => clearInterval(interval);
    }, [currentUserId]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle chat deletion
    const handleDeleteChat = async (chat: Chat, event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }

        const confirmMessage = `Are you sure you want to delete this chat with ${chat.participantName}?\n\nThis will permanently remove the conversation for both you and the employer. This action cannot be undone.`;

        if (!window.confirm(confirmMessage)) {
            return;
        }

        try {
            const success = await deleteHelpChatForBothUsers(currentUserId, chat.chatWithId);

            if (success) {
                // Remove from local state
                setChats(prevChats => prevChats.filter(c => c.chatWithId !== chat.chatWithId));

                // Clear selection if deleted chat was selected
                if (selectedChat?.chatWithId === chat.chatWithId) {
                    setSelectedChat(null);
                    setMessages([]);
                }

                console.log('Chat deleted successfully');
            } else {
                alert('Failed to delete chat. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            alert('Error deleting chat. Please try again.');
        }
    };

    // Select chat and load messages
    const handleSelectChat = async (chat: Chat) => {
        setSelectedChat(chat);
        setMessagesLoading(true);

        try {
            await markMessagesAsRead(currentUserId, chat.chatWithId);
            const chatHistory = await getChatHistory(currentUserId, chat.chatWithId);
            setMessages(chatHistory);

            const unsubscribe = subscribeMessages(
                currentUserId,
                chat.chatWithId,
                (firebaseMessages: any[]) => {
                    const transformedMessages: Message[] = firebaseMessages.map(msg => ({
                        id: msg.id,
                        senderId: msg.senderId,
                        message: msg.message,
                        timestamp: msg.timestamp,
                        read: msg.read,
                        isHuman: msg.isHuman
                    })).sort((a, b) => a.timestamp - b.timestamp);

                    setMessages(transformedMessages);
                }
            );

            // Update unread count in local state
            setChats(prevChats =>
                prevChats.map(c =>
                    c.chatWithId === chat.chatWithId
                        ? { ...c, unreadCount: 0, lastMessageReaded: true }
                        : c
                )
            );

            return () => unsubscribe();
        } catch (error) {
            console.error('Error loading chat:', error);
        } finally {
            setMessagesLoading(false);
        }
    };

    // Send message as admin
    const handleSendMessage = async () => {
        if (!newMessage.trim() || !currentUserId || !selectedChat) return;

        try {
            await sendAdminReply(selectedChat.chatWithId, newMessage.trim());
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Handle Enter key press for sending messages
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };


    // Handle saving new article
    const handleSaveArticle = async (article: HelpArticle) => {
        try {
            // Here you would typically save to your database
            console.log('Saving article:', article);

            // Example save logic (replace with your actual API call)
            // await saveHelpArticle(article);

            const addArticle = await addHelpArticle(article);
            if (addArticle.success) {
                toast('Article created successfully!');
            }
            // alert('Article created successfully!');

            // Reset form state
            setIsArticleFormOpen(false);
        } catch (error) {
            console.error('Error saving article:', error);
            alert('Error creating article. Please try again.');
        }
    };

    // Filter chats based on search and unread filter
    const filteredChats = chats.filter(chat => {
        const matchesSearch = chat.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUnread = filterUnread ? chat.unreadCount > 0 : true;
        return matchesSearch && matchesUnread;
    });

    // Format time for display
    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format date for display
    const formatDate = (timestamp: number) => {
        const now = new Date();
        const messageDate = new Date(timestamp);
        const diffTime = now.getTime() - messageDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return messageDate.toLocaleDateString();
    };

    // Get user initials for avatar
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (

        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary-c to-secondary-c/80 bg-clip-text text-black">
                                Support Dashboard
                            </h1>
                            <p className="text-gray-600 mt-2 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-secondary-c" />
                                Manage employer support requests and help articles
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => setIsArticleFormOpen(true)}
                                className="bg-secondary-c hover:bg-secondary-c/90 shadow-lg transition-all duration-200"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                <FileText className="w-4 h-4 mr-1" />
                                Add Help Article
                            </Button>
                            {/* <Badge variant="secondary" className="px-3 py-1 bg-secondary-c text-white">
                                <Zap className="w-3 h-3 mr-1" />
                                {chats.filter(chat => chat.unreadCount > 0).length} Unread
                            </Badge>
                            <div className="w-8 h-8 bg-secondary-c rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div> */}
                        </div>
                    </div>
                </div>


                <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">

                    {/* Chats List Sidebar */}
                    <Card className="lg:w-96 flex flex-col border-0 shadow-lg bg-white">
                        <CardHeader className="border-b bg-white rounded-t-lg flex-shrink-0">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                                    <MessageCircle className="w-5 h-5 text-secondary-c" />
                                    Conversations
                                    <Badge variant="secondary" className="bg-secondary-c/10 text-secondary-c border-0">
                                        {filteredChats.length}
                                    </Badge>
                                </CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={filterUnread ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setFilterUnread(!filterUnread)}
                                        className={`h-8 px-3 ${filterUnread
                                            ? 'bg-secondary-c text-white hover:bg-secondary-c/90'
                                            : 'border-secondary-c/20 text-secondary-c hover:bg-secondary-c/5'
                                            }`}
                                    >
                                        <Filter className="w-3 h-3 mr-1" />
                                        Unread
                                    </Button>
                                </div>
                            </div>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search conversations..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-gray-50 border-gray-200 focus:border-secondary-c focus:ring-secondary-c/20"
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-0 min-h-0">
                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-2">
                                    {loading ? (
                                        // Loading skeleton
                                        <div className="space-y-3">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="p-4 rounded-lg border border-gray-200 bg-white animate-pulse">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : filteredChats.length === 0 ? (
                                        // Empty state
                                        <div className="text-center py-12 text-gray-500">
                                            <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                            <p className="font-medium text-gray-600">No conversations found</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {filterUnread ? 'No unread messages' : 'No support requests yet'}
                                            </p>
                                        </div>
                                    ) : (
                                        // Chats list
                                        filteredChats.map((chat) => (
                                            <div
                                                key={chat.chatWithId}
                                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${selectedChat?.chatWithId === chat.chatWithId
                                                    ? 'border-secondary-c bg-secondary-c/5 shadow-md'
                                                    : 'border-transparent bg-white hover:border-secondary-c/30 hover:shadow-md'
                                                    }`}
                                                onClick={() => handleSelectChat(chat)}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                                        <div className="relative">
                                                            <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                                                                <AvatarFallback className={`${chat.unreadCount > 0
                                                                    ? 'bg-secondary-c text-white'
                                                                    : 'bg-gray-100 text-gray-600'
                                                                    }`}>
                                                                    {getInitials(chat.participantName)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            {chat.unreadCount > 0 && (
                                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-c rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                                    <span className="text-xs font-bold text-white">
                                                                        {chat.unreadCount}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <h3 className="font-semibold text-gray-900 truncate text-sm">
                                                                    {chat.participantName}
                                                                </h3>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="text-xs bg-secondary-c/10 text-secondary-c border-0"
                                                                >
                                                                    Employer
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                                                {chat.lastMessage || "No messages yet"}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Clock className="w-3 h-3 text-gray-400" />
                                                                <span className="text-xs text-gray-500 font-medium">
                                                                    {formatDate(chat.lastTimestamp)} • {formatTime(chat.lastTimestamp)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action buttons */}
                                                    <div className="flex items-center gap-2">
                                                        {selectedChat?.chatWithId === chat.chatWithId && (
                                                            <CheckCircle2 className="w-4 h-4 text-secondary-c flex-shrink-0" />
                                                        )}
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            onClick={(e) => handleDeleteChat(chat, e)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Chat Messages Area */}
                    <Card className="flex-1 flex flex-col border-0 shadow-lg bg-white min-h-0 ">
     
                        <CardHeader className="border-b bg-gradient-to-r from-secondary-c to-secondary-c/90 text-white flex-shrink-0 p-4">
                            {selectedChat ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setSelectedChat(null)}
                                            className="lg:hidden text-white hover:bg-white/20"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                        </Button>
                                        <Avatar className="w-10 h-10 border-2 border-white/20">
                                            <AvatarFallback className="bg-white/20 text-white">
                                                {getInitials(selectedChat.participantName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-white text-lg">
                                                {selectedChat.participantName}
                                            </CardTitle>

                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-white hover:bg-white/20"
                                            onClick={() => handleDeleteChat(selectedChat)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>

                                    </div>
                                </div>
                            ) : (
                                <CardTitle className="text-center text-white">
                                    Select a conversation
                                </CardTitle>
                            )}
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col p-0 bg-gray-50/50 min-h-0">
                            {selectedChat ? (
                                <>
        
                                    <ScrollArea className="flex-1">
                                        <div className="p-6">
                                            {messagesLoading ? (
                                                <div className="flex justify-center items-center h-32">
                                                    <div className="flex items-center gap-2 text-gray-500">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary-c"></div>
                                                        <span>Loading messages...</span>
                                                    </div>
                                                </div>
                                            ) : messages.length === 0 ? (
                                                <div className="text-center py-16 text-gray-500">
                                                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                                    <p className="font-medium text-gray-600">No messages yet</p>
                                                    <p className="text-sm text-gray-500 mt-1">Start the conversation with this employer</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    {messages.map((message, index) => {
                                                        const showDate = index === 0 ||
                                                            new Date(message.timestamp).toDateString() !==
                                                            new Date(messages[index - 1].timestamp).toDateString();

                                                        return (
                                                            <div key={message.id}>
                                                                {showDate && (
                                                                    <div className="flex justify-center my-6">
                                                                        <Badge variant="secondary" className="bg-white text-gray-600 text-xs border shadow-sm">
                                                                            {new Date(message.timestamp).toLocaleDateString('en-US', {
                                                                                weekday: 'long',
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric'
                                                                            })}
                                                                        </Badge>
                                                                    </div>
                                                                )}
                                                                <div className={`flex gap-3 ${message.senderId === currentUserId
                                                                    ? 'justify-end'
                                                                    : 'justify-start'
                                                                    }`}>
                                                                    {message.senderId !== currentUserId && (
                                                                        <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-white shadow-sm">
                                                                            <AvatarFallback className={
                                                                                message.isHuman
                                                                                    ? 'bg-blue-100 text-blue-600'
                                                                                    : 'bg-gray-100 text-gray-600'
                                                                            }>
                                                                                {message.isHuman ? (
                                                                                    <User className="w-3 h-3" />
                                                                                ) : (
                                                                                    <Bot className="w-3 h-3" />
                                                                                )}
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                    )}
                                                                    <div className="flex flex-col gap-1 max-w-[75%]">
                                                                        <div
                                                                            className={`rounded-2xl p-4 shadow-sm ${message.senderId === currentUserId
                                                                                ? 'bg-secondary-c text-white rounded-br-md'
                                                                                : message.isHuman
                                                                                    ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                                                                                    : 'bg-gray-50 border border-gray-100 text-gray-700 rounded-bl-md'
                                                                                }`}
                                                                        >
                                                                            <p className="text-sm leading-relaxed whitespace-pre-line">
                                                                                {message.message}
                                                                            </p>
                                                                        </div>
                                                                        <div className={`flex items-center gap-2 text-xs ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                                                                            }`}>
                                                                            <span className={`${message.senderId === currentUserId ? 'text-secondary-c' : 'text-gray-500'
                                                                                }`}>
                                                                                {formatTime(message.timestamp)}
                                                                            </span>
                                                                            {message.senderId !== currentUserId && (
                                                                                <Badge
                                                                                    variant="secondary"
                                                                                    className={`text-xs border-0 ${message.isHuman
                                                                                        ? 'bg-blue-100 text-blue-700'
                                                                                        : 'bg-gray-100 text-gray-600'
                                                                                        }`}
                                                                                >
                                                                                    {message.isHuman ? 'Employer' : 'AI Assistant'}
                                                                                </Badge>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    {message.senderId === currentUserId && (
                                                                        <Avatar className="w-8 h-8 flex-shrink-0 border-2 border-white shadow-sm">
                                                                            <AvatarFallback className="bg-secondary-c text-white">
                                                                                <Shield className="w-3 h-3" />
                                                                            </AvatarFallback>
                                                                        </Avatar>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    <div ref={messagesEndRef} />
                                                </div>
                                            )}
                                        </div>
                                    </ScrollArea>

                      
                                    <div className="border-t bg-white/80 backdrop-blur-sm p-6 flex-shrink-0">
                                        <div className="flex gap-3">
                                            <div className="flex-1 relative">
                                                <Input
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    placeholder="Type your response..."
                                                    onKeyPress={handleKeyPress}
                                                    className="pr-12 h-12 rounded-2xl border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-secondary-c focus:border-transparent"
                                                />
                                            </div>
                                            <Button
                                                onClick={handleSendMessage}
                                                disabled={!newMessage.trim()}
                                                className="h-12 px-6 rounded-2xl bg-secondary-c hover:bg-secondary-c/90 shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Send className="w-4 h-4 mr-2" />
                                                Send
                                            </Button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-3 text-center">
                                            You are responding as <strong className="text-secondary-c">Support Admin</strong>
                                        </p>
                                    </div>
                                </>
                            ) : (
       
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-12">
                                    <div className="text-center max-w-md">
                                        <div className="w-24 h-24 bg-secondary-c rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                            <MessageCircle className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-700 mb-3">
                                            Support Dashboard
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Select a conversation from the list to start helping employers.
                                            You can respond to their queries and provide support in real-time.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Help Article Form Popup */}
                <HelpArticleForm
                    isOpen={isArticleFormOpen}
                    onClose={() => setIsArticleFormOpen(false)}
                    onSave={handleSaveArticle}
                />
            </div>
        </div>
    );
};

export default AdminHelpCenter;