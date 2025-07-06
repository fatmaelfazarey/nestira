
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Brain, Target, Zap, TrendingUp, Filter, Users, Star } from 'lucide-react';

interface AdvancedFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: string;
}

interface AdvancedFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeatureSelected: (feature: AdvancedFeature) => void;
}

export const AdvancedFeaturesModal: React.FC<AdvancedFeaturesModalProps> = ({
  isOpen,
  onClose,
  onFeatureSelected
}) => {
  const [selectedFeature, setSelectedFeature] = useState<AdvancedFeature | null>(null);

  const advancedFeatures: AdvancedFeature[] = [
    {
      id: 'ai-matching',
      title: 'AI Skill Matching',
      description: 'Use advanced AI algorithms to match candidates based on skill compatibility and potential',
      icon: <Brain className="w-5 h-5" />,
      color: 'bg-blue-500',
      action: 'Enable AI Matching'
    },
    {
      id: 'predictive-scoring',
      title: 'Predictive Success Scoring',
      description: 'Predict candidate success probability based on historical data and performance patterns',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-green-500',
      action: 'Run Predictive Analysis'
    },
    {
      id: 'smart-filtering',
      title: 'Smart Filtering',
      description: 'Apply intelligent filters that learn from your hiring patterns and preferences',
      icon: <Filter className="w-5 h-5" />,
      color: 'bg-purple-500',
      action: 'Apply Smart Filters'
    },
    {
      id: 'talent-insights',
      title: 'Talent Market Insights',
      description: 'Get real-time insights on talent availability, salary trends, and market competition',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-orange-500',
      action: 'View Market Insights'
    },
    {
      id: 'batch-operations',
      title: 'Batch Operations',
      description: 'Perform bulk actions on multiple candidates simultaneously for efficient processing',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-indigo-500',
      action: 'Start Batch Process'
    },
    {
      id: 'performance-boost',
      title: 'Performance Boost',
      description: 'Optimize search performance and enhance candidate discovery with advanced algorithms',
      icon: <Zap className="w-5 h-5" />,
      color: 'bg-yellow-500',
      action: 'Boost Performance'
    }
  ];

  const handleFeatureSelect = (feature: AdvancedFeature) => {
    setSelectedFeature(feature);
  };

  const handleUseFeature = () => {
    if (selectedFeature) {
      onFeatureSelected(selectedFeature);
      onClose();
      setSelectedFeature(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between py-4">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Settings className="w-5 h-5 text-purple-500" />
                Advanced Features
              </DialogTitle>
              <p className="text-gray-600">Unlock powerful tools to enhance your talent search</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="px-4">
                Cancel
              </Button>
              <Button 
                onClick={handleUseFeature} 
                disabled={!selectedFeature} 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                <Star className="w-4 h-4 mr-2" />
                Use Feature
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {advancedFeatures.map(feature => (
              <Card 
                key={feature.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedFeature?.id === feature.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => handleFeatureSelect(feature)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`${feature.color} text-white p-2 rounded-lg`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {feature.title}
                        {selectedFeature?.id === feature.id && (
                          <Star className="w-4 h-4 text-purple-500 fill-current" />
                        )}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{feature.description}</p>
                  <Badge 
                    variant="outline" 
                    className={`${feature.color.replace('bg-', 'text-')} border-current`}
                  >
                    {feature.action}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
