import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
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
  Mail, 
  Clock, 
  User, 
  Star, 
  Send as SendIcon, 
  Trash, 
  Search,
  Paperclip,
  Reply,
  Forward,
  Archive,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useState } from 'react';

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('bg-blue-500');
  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);
  const [labels, setLabels] = useState([
    { name: 'Nestira Team', color: 'bg-blue-500', count: 3 },
    { name: 'Candidates', color: 'bg-green-500', count: 4 },
  ]);

  const categories = [
    { name: 'Inbox', icon: Mail, count: 5, active: true },
    { name: 'Starred', icon: Star, count: 2 },
    { name: 'Sent', icon: SendIcon, count: 0 },
    { name: 'Drafts', icon: Mail, count: 1 },
    { name: 'Spam', icon: Mail, count: 0 },
    { name: 'Trash', icon: Trash, count: 0 },
  ];

  const messages = [
    {
      id: 1,
      from: "Emily Carter",
      email: "e.carter@company.com",
      subject: "Update on Team Meeting",
      preview: "Please see the new agenda for tomorrow's team meeting attached.",
      time: "Oct 14, 9:00 AM",
      unread: true,
      type: "team",
      label: "Team",
      avatar: "EC",
      fullContent: "Dear Team,\n\nPlease see the new agenda for tomorrow's team meeting attached. We'll be discussing the quarterly reports and upcoming project timelines.\n\nBest regards,\nEmily Carter",
      attachments: ["Team_Meeting_Agenda_Q4.pdf"]
    },
    {
      id: 2,
      from: "Lucas Green",
      email: "lucas.green@email.com",
      subject: "Re: Interview Schedule",
      preview: "Thank you for the opportunity! Confirming my interview for the 20th at 2 PM.",
      time: "Oct 13, 5:15 PM",
      unread: true,
      type: "candidate",
      label: "Candidate",
      avatar: "LG",
      fullContent: "Dear Hiring Team,\n\nThank you for the opportunity! I'm confirming my interview scheduled for the 20th at 2 PM. I'm looking forward to discussing how my experience in data analysis can contribute to your team.\n\nPlease let me know if you need any additional information before our meeting.\n\nBest regards,\nLucas Green",
      attachments: []
    },
    {
      id: 3,
      from: "Sarah Johnson",
      email: "s.johnson@company.com",
      subject: "Monthly Performance Review",
      preview: "Attached is the monthly performance review file for your department.",
      time: "Oct 12, 3:00 PM",
      unread: false,
      type: "team",
      label: "Team",
      avatar: "SJ",
      fullContent: "Hi Team,\n\nAttached is the monthly performance review file for your department. Please review the metrics and let me know if you have any questions or concerns.\n\nThe review covers performance indicators from September and includes recommendations for October.\n\nThanks,\nSarah Johnson",
      attachments: ["Monthly_Performance_Review_Sept.xlsx"]
    },
    {
      id: 4,
      from: "Michael Brown",
      email: "m.brown@email.com",
      subject: "Application Status Inquiry",
      preview: "I am writing to inquire about the status of my application for the position of Data Analyst.",
      time: "Oct 11, 10:30 AM",
      unread: false,
      type: "candidate",
      label: "Candidate",
      avatar: "MB",
      fullContent: "Dear Hiring Manager,\n\nI am writing to inquire about the status of my application for the position of Data Analyst that I submitted two weeks ago.\n\nI remain very interested in this opportunity and would appreciate any updates you can provide regarding the selection process.\n\nThank you for your time and consideration.\n\nSincerely,\nMichael Brown",
      attachments: []
    },
    {
      id: 5,
      from: "System",
      email: "system@company.com",
      subject: "Interview reminder: Tomorrow at 2 PM",
      preview: "Reminder: You have an interview scheduled with Lucas Green tomorrow at 2 PM.",
      time: "Oct 10, 4:00 PM",
      unread: false,
      type: "system",
      label: "System",
      avatar: "SY",
      fullContent: "Interview Reminder\n\nYou have an interview scheduled with:\n- Candidate: Lucas Green\n- Position: Data Analyst\n- Date: Tomorrow\n- Time: 2:00 PM\n- Location: Conference Room B\n\nPlease ensure you have reviewed the candidate's resume and prepared your questions.\n\nBest regards,\nHR System",
      attachments: ["Lucas_Green_Resume.pdf"]
    }
  ];

  const handleAddLabel = () => {
    if (newLabelName.trim()) {
      setLabels([...labels, { 
        name: newLabelName, 
        color: newLabelColor, 
        count: 0 
      }]);
      setNewLabelName('');
      setNewLabelColor('bg-blue-500');
      setIsAddLabelOpen(false);
    }
  };

  const colorOptions = [
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
    { name: 'Pink', value: 'bg-pink-500' },
  ];

  const handleReply = () => {
    if (replyText.trim()) {
      console.log('Sending reply:', replyText);
      setReplyText('');
    }
  };

  const getLabelColor = (label) => {
    switch (label) {
      case 'Team': return 'bg-blue-500 text-white';
      case 'Candidate': return 'bg-green-500 text-white';
      case 'System': return 'bg-gray-500 text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-80px)] bg-white">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50">
          <div className="p-4">
            <Button className="w-full bg-accent hover:bg-accent/90 text-white">
              <Mail className="w-4 h-4 mr-2" />
              Compose
            </Button>
          </div>
          
          <div className="px-4 pb-4">
            <div className="space-y-1">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    category.active ? 'bg-accent/10 text-accent font-medium' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  {category.count > 0 && (
                    <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Labels
              </div>
              <Dialog open={isAddLabelOpen} onOpenChange={setIsAddLabelOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                    <Plus className="w-3 h-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Label</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Label Name</label>
                      <Input
                        placeholder="Enter label name"
                        value={newLabelName}
                        onChange={(e) => setNewLabelName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Color</label>
                      <div className="flex gap-2 flex-wrap">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            onClick={() => setNewLabelColor(color.value)}
                            className={`w-8 h-8 rounded-full ${color.value} ${
                              newLabelColor === color.value ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                            }`}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddLabelOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddLabel}>
                        Add Label
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-1">
              {labels.map((label) => (
                <div key={label.name} className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${label.color}`}></div>
                    <span className="text-sm text-gray-700">{label.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{label.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="w-96 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search email" className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">5 from 36</span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-blue-50 border-l-4 border-l-accent' : ''
                } ${message.unread ? 'bg-white' : 'bg-gray-50'}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {message.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium text-sm ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.from}
                        </span>
                        <Badge className={`text-xs px-2 py-0 ${getLabelColor(message.label)}`}>
                          {message.label}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className={`text-sm mb-1 ${message.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">{message.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium text-gray-900">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {selectedMessage.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{selectedMessage.from}</span>
                      <Badge className={`text-xs px-2 py-0 ${getLabelColor(selectedMessage.label)}`}>
                        {selectedMessage.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                    <p className="text-xs text-gray-500">{selectedMessage.time}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="bg-white rounded-lg p-4 mb-4">
                  <div className="whitespace-pre-wrap text-gray-700 mb-4">
                    {selectedMessage.fullContent}
                  </div>
                  
                  {selectedMessage.attachments.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                      {selectedMessage.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reply Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Button variant="outline" size="sm">
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Forward className="w-4 h-4 mr-2" />
                      Forward
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="mb-3"
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4 mr-2" />
                      Attach
                    </Button>
                    <Button onClick={handleReply} className="bg-accent hover:bg-accent/90 text-white">
                      <SendIcon className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">Select a message to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;
