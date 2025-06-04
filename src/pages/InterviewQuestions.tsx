
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const InterviewQuestions = () => {
  const questionCategories = [
    { name: 'Technical', count: 45, color: 'bg-blue-100 text-blue-800' },
    { name: 'Behavioral', count: 32, color: 'bg-green-100 text-green-800' },
    { name: 'Finance Specific', count: 28, color: 'bg-purple-100 text-purple-800' },
    { name: 'Leadership', count: 15, color: 'bg-orange-100 text-orange-800' },
  ];

  const recentQuestions = [
    { id: 1, question: 'Explain the difference between NPV and IRR', category: 'Technical', difficulty: 'Medium' },
    { id: 2, question: 'How do you handle tight deadlines?', category: 'Behavioral', difficulty: 'Easy' },
    { id: 3, question: 'What is your experience with financial modeling?', category: 'Finance Specific', difficulty: 'Hard' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interview Questions</h1>
            <p className="text-gray-600">Manage your interview question bank</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10" placeholder="Search questions..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {questionCategories.map((category) => (
            <Card key={category.name}>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                <div className="text-sm text-gray-600 mt-1">{category.name}</div>
                <Badge className={`mt-2 ${category.color}`}>
                  {category.name}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuestions.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.question}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant={item.difficulty === 'Hard' ? 'destructive' : item.difficulty === 'Medium' ? 'default' : 'secondary'}>
                        {item.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InterviewQuestions;
