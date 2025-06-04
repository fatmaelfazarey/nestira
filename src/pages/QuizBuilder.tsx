
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Play } from 'lucide-react';

const QuizBuilder = () => {
  const quizzes = [
    { id: 1, title: 'Financial Analysis Basics', questions: 15, duration: '30 min', status: 'Active' },
    { id: 2, title: 'Excel for Finance', questions: 20, duration: '45 min', status: 'Draft' },
    { id: 3, title: 'Risk Management', questions: 12, duration: '25 min', status: 'Active' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quiz Builder</h1>
            <p className="text-gray-600">Create and manage assessment quizzes</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create New Quiz
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{quiz.questions} questions</span>
                  <span>{quiz.duration}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    quiz.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {quiz.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuizBuilder;
