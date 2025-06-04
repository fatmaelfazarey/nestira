
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  Upload, 
  FileText, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  Download,
  Eye,
  Plus,
  Users,
  Calendar
} from "lucide-react";
import { useState } from "react";

const NestiSign = () => {
  const [activeTab, setActiveTab] = useState("create");

  const documents = [
    {
      id: 1,
      name: "Employment Contract - John Doe",
      status: "pending",
      recipient: "john.doe@email.com",
      createdAt: "2024-06-03",
      dueDate: "2024-06-10",
      type: "contract"
    },
    {
      id: 2,
      name: "NDA Agreement - Sarah Smith",
      status: "signed",
      recipient: "sarah.smith@email.com",
      createdAt: "2024-06-01",
      signedAt: "2024-06-02",
      type: "nda"
    },
    {
      id: 3,
      name: "Offer Letter - Mike Johnson",
      status: "expired",
      recipient: "mike.johnson@email.com",
      createdAt: "2024-05-20",
      dueDate: "2024-05-27",
      type: "offer"
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Employment Contract",
      description: "Standard full-time employment agreement",
      fields: 8,
      lastUsed: "2024-06-01"
    },
    {
      id: 2,
      name: "Offer Letter",
      description: "Job offer letter template",
      fields: 6,
      lastUsed: "2024-05-30"
    },
    {
      id: 3,
      name: "NDA Agreement",
      description: "Non-disclosure agreement for candidates",
      fields: 4,
      lastUsed: "2024-05-28"
    },
    {
      id: 4,
      name: "Freelance Contract",
      description: "Contract for freelance/contractor positions",
      fields: 7,
      lastUsed: "2024-05-25"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'expired':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      signed: "default",
      pending: "secondary",
      expired: "destructive"
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <PenTool className="w-8 h-8 text-primary" />
              Nesti-Sign
            </h1>
            <p className="text-gray-600 mt-1">
              Create, send, and manage digital signature documents
            </p>
          </div>
          <Button className="sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Signatures</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create Document</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          {/* Create Document Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Document</CardTitle>
                <CardDescription>
                  Start by choosing how you'd like to create your document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Upload Document</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload a PDF or Word document to add signature fields
                    </p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Use Template</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Start with a pre-made template for common documents
                    </p>
                    <Button variant="outline">Browse Templates</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Document Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Document Title</label>
                      <Input placeholder="e.g., Employment Contract - John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Recipient Email</label>
                      <Input placeholder="candidate@email.com" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                    <Input placeholder="Please review and sign this document..." />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Create & Send
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Management</CardTitle>
                <CardDescription>
                  Track and manage all your signature documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(doc.status)}
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {doc.recipient}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Created: {doc.createdAt}
                              </span>
                              {doc.dueDate && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Due: {doc.dueDate}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(doc.status)}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>
                  Pre-built templates for common hiring documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        <FileText className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{template.fields} signature fields</span>
                        <span>Last used: {template.lastUsed}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Use Template</Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
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
