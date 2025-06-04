
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, Send, Download, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const NestiSign = () => {
  const recentDocuments = [
    {
      id: 1,
      name: "Employment Agreement - John Doe",
      status: "completed",
      date: "2024-01-15",
      signers: 2
    },
    {
      id: 2,
      name: "NDA - Tech Startup Inc",
      status: "pending",
      date: "2024-01-14",
      signers: 1
    },
    {
      id: 3,
      name: "Offer Letter - Sarah Wilson",
      status: "draft",
      date: "2024-01-13",
      signers: 0
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Employment Contract",
      description: "Standard employment agreement template",
      category: "HR"
    },
    {
      id: 2,
      name: "Non-Disclosure Agreement",
      description: "Confidentiality agreement for candidates",
      category: "Legal"
    },
    {
      id: 3,
      name: "Offer Letter",
      description: "Job offer letter template",
      category: "HR"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800"><FileText className="w-3 h-3 mr-1" />Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nesti-Sign</h1>
            <p className="text-gray-600 mt-1">Digital signature solution for your hiring documents</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Document
          </Button>
        </div>

        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4">
              {recentDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-8 h-8 text-accent" />
                        <div>
                          <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-500">Created on {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(doc.status)}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{template.category}</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Signature Settings</CardTitle>
                <CardDescription>Configure your digital signature preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Default Signature Style</h4>
                    <p className="text-sm text-gray-500">Choose how your signature appears on documents</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Email Templates</h4>
                    <p className="text-sm text-gray-500">Customize signature request emails</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Security Settings</h4>
                    <p className="text-sm text-gray-500">Configure authentication requirements</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NestiSign;
