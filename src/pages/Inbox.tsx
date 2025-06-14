import { DashboardLayout } from '@/components/DashboardLayout';
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
  Check
} from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
  priority: 'high' | 'normal' | 'low';
  hasAttachment: boolean;
  labels: string[];
  content: string;
}

interface Label {
  name: string;
  color: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    subject: "Meeting Tomorrow",
    preview: "Reminder about our meeting...",
    time: "10:00 AM",
    read: false,
    starred: true,
    priority: "normal",
    hasAttachment: false,
    labels: ["Work"],
    content: "Hi team, just a reminder about our meeting tomorrow at 10:00 AM to discuss the project progress."
  },
  {
    id: 2,
    sender: "Alice Smith",
    subject: "Project Update",
    preview: "Latest updates on the project...",
    time: "Yesterday",
    read: true,
    starred: false,
    priority: "high",
    hasAttachment: true,
    labels: ["Personal", "Important"],
    content: "Hello everyone, please find attached the latest updates on the project. Let me know if you have any questions."
  },
  {
    id: 3,
    sender: "Bob Johnson",
    subject: "New Feature Announcement",
    preview: "Exciting news about our new feature...",
    time: "2 days ago",
    read: true,
    starred: false,
    priority: "normal",
    hasAttachment: false,
    labels: [],
    content: "Hi all, I'm excited to announce the release of our new feature. Check it out and let us know what you think!"
  },
  {
    id: 4,
    sender: "Emily White",
    subject: "Feedback Request",
    preview: "We need your feedback on the new design...",
    time: "3 days ago",
    read: true,
    starred: false,
    priority: "low",
    hasAttachment: false,
    labels: [],
    content: "Hello team, we need your feedback on the new design. Please take a look and share your thoughts."
  },
  {
    id: 5,
    sender: "David Brown",
    subject: "Support Ticket",
    preview: "A new support ticket has been created...",
    time: "4 days ago",
    read: true,
    starred: false,
    priority: "normal",
    hasAttachment: true,
    labels: ["Support"],
    content: "Hi support team, a new support ticket has been created. Please take a look and assign it to the appropriate team member."
  },
];

const initialLabels: Label[] = [
  { name: "Work", color: "bg-red-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Important", color: "bg-blue-500" },
  { name: "Social", color: "bg-yellow-500" },
  { name: "Promotions", color: "bg-purple-500" },
  { name: "Support", color: "bg-orange-500" },
];

const Inbox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [labels, setLabels] = useState(initialLabels);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);

  const stats = [
    { label: "Unread", value: messages.filter(message => !message.read).length },
    { label: "Starred", value: messages.filter(message => message.starred).length },
    { label: "Important", value: messages.filter(message => message.priority === 'high').length },
  ];

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === message.id ? { ...msg, read: true } : msg
      )
    );
  };

  const toggleStar = (messageId: number) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMessageLabel = (messageId: number, labelName: string) => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
            <p className="text-gray-600">Stay connected and manage your communications</p>
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
                    {labels.map((label) => (
                      <div key={label.name} className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                          <span>{label.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Priority</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span>High</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span>Normal</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span>Low</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Messages</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        message.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                      } hover:bg-gray-50`}
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
                                  const label = labels.find(l => l.name === labelName);
                                  return label ? (
                                    <Badge key={labelName} variant="secondary" className="text-xs">
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
                              toggleStar(message.id);
                            }}
                          >
                            <Star 
                              className={`w-4 h-4 ${
                                message.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'
                              }`} 
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {selectedMessage && (
              <>
                <DialogHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-lg">{selectedMessage.subject}</DialogTitle>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Tag className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white p-2">
                          <div className="space-y-2">
                            {labels.map((label) => (
                              <button
                                key={label.name}
                                className="w-full flex items-center justify-between p-2 rounded hover:bg-gray-50 text-left"
                                onClick={() => toggleMessageLabel(selectedMessage.id, label.name)}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                                  <span className="text-sm">{label.name}</span>
                                </div>
                                {selectedMessage.labels.includes(label.name) && (
                                  <Check className="w-4 h-4 text-green-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button variant="outline" size="icon">
                        <Reply className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Forward className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span><strong>From:</strong> {selectedMessage.sender}</span>
                    <span><strong>To:</strong> you@company.com</span>
                    <span><strong>Date:</strong> {selectedMessage.time}</span>
                  </div>
                  {selectedMessage.labels.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {selectedMessage.labels.map((labelName) => {
                        const label = labels.find(l => l.name === labelName);
                        return label ? (
                          <Badge key={labelName} variant="secondary" className="text-xs">
                            <div className={`w-2 h-2 rounded-full ${label.color} mr-1`}></div>
                            {labelName}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  )}
                </DialogHeader>
                <div className="flex-1 overflow-auto">
                  <div className="prose max-w-none">
                    <p>{selectedMessage.content}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="space-y-4">
                    <Textarea placeholder="Type your reply..." rows={4} />
                    <div className="flex justify-between">
                      <Button variant="outline">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach
                      </Button>
                      <Button>Send Reply</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
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
    </DashboardLayout>
  );
};

export default Inbox;
