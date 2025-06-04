
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Copy } from 'lucide-react';

const OfferTemplates = () => {
  const templates = [
    { 
      id: 1, 
      name: 'Senior Financial Analyst', 
      type: 'Full-time', 
      lastModified: '2 days ago',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Finance Manager', 
      type: 'Full-time', 
      lastModified: '1 week ago',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'Contract Analyst', 
      type: 'Contract', 
      lastModified: '3 days ago',
      status: 'Draft'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offer Templates</h1>
            <p className="text-gray-600">Create and manage job offer templates</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="w-8 h-8 text-gray-400" />
                  <Badge variant={template.status === 'Active' ? 'default' : 'secondary'}>
                    {template.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <div className="text-sm text-gray-600">
                  <p>{template.type}</p>
                  <p>Modified {template.lastModified}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Template Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">Dynamic Fields</h4>
                  <p className="text-sm text-gray-600">Auto-populate candidate and company details</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Copy className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">Version Control</h4>
                  <p className="text-sm text-gray-600">Track changes and maintain template history</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OfferTemplates;
