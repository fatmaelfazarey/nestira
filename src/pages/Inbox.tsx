
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Clock, User } from 'lucide-react';

const Inbox = () => {
  const messages = [
    {
      id: 1,
      from: "Sarah Johnson",
      subject: "Application for Senior Finance Manager Position",
      time: "2 hours ago",
      unread: true,
      type: "application"
    },
    {
      id: 2,
      from: "System",
      subject: "Interview reminder: Tomorrow at 2 PM",
      time: "4 hours ago",
      unread: true,
      type: "reminder"
    },
    {
      id: 3,
      from: "Ahmed Hassan",
      subject: "Thank you for the interview opportunity",
      time: "1 day ago",
      unread: false,
      type: "application"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600">Manage candidate messages and system notifications</p>
        </div>

        <div className="grid gap-4">
          {messages.map((message) => (
            <Card key={message.id} className={`cursor-pointer hover:shadow-md transition-shadow ${message.unread ? 'border-l-4 border-l-accent' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {message.type === 'application' ? <User className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.from}
                        </span>
                        {message.unread && <Badge variant="secondary" className="bg-accent text-white">New</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">{message.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {message.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;
