// components/plans.tsx
import { useState, useEffect } from "react";
import { Plus, Users, Crown, Check, X, Edit, Trash2, Calendar, Infinity } from "lucide-react";
import { AddPlanDialog } from "@/components/Admin components/AddPlanDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAdminStore } from "@/store/Admin store/AdminStore";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  validityPeriod: number;
  isPopular: boolean;
  subscriptions_count: number;
  limits: {
    unlocked: { value: number; isUnlimited: boolean };
    jobPosts: { value: number; isUnlimited: boolean };
    invitations: { value: number; isUnlimited: boolean };
    onlineAssessment: { value: number; isUnlimited: boolean };
    onlineInterview: { value: number; isUnlimited: boolean };
  };
  features: {
    included: string[];
    excluded: string[];
  };
}

// Helper function to transform backend data to frontend format
const transformBackendPlan = (backendPlan: any): Plan => {
  // Extract limits from the array format to object format
  const limitsMap: any = {};
  backendPlan.limits.forEach((limit: any) => {
    limitsMap[limit.feature] = {
      value: limit.value,
      isUnlimited: Boolean(limit.is_unlimited)
    };
  });

  return {
    id: backendPlan.planId.toString(),
    name: backendPlan.name,
    description: backendPlan.description,
    price: parseFloat(backendPlan.price),
    validityPeriod: backendPlan.validityPeriod,
    isPopular: backendPlan.isPopular,
    subscriptions_count: backendPlan.subscriptionsCount,
    limits: {
      unlocked: limitsMap.unlocked || { value: 0, isUnlimited: false },
      jobPosts: limitsMap.jobPosts || { value: 0, isUnlimited: false },
      invitations: limitsMap.invitations || { value: 0, isUnlimited: false },
      onlineAssessment: limitsMap.onlineAssessment || { value: 0, isUnlimited: false },
      onlineInterview: limitsMap.onlineInterview || { value: 0, isUnlimited: false }
    },
    features: {
      included: backendPlan.features?.included || [],
      excluded: backendPlan.features?.excluded || []
    }
  };
};

function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addPlan, getAllPlans, deletePlan } = useAdminStore();

  // Fetch plans from backend on component mount
  useEffect(() => {
    fetchAllPlans();
  }, []);

  const fetchAllPlans = async () => {
    try {
      setLoading(true);
      const response = await getAllPlans();

      if (response.success && response.data) {
        // Transform backend data to frontend format
        const transformedPlans = response.data.map(transformBackendPlan);
        setPlans(transformedPlans);
      } else {
        toast.error('Failed to fetch plans');
        console.error('Failed to fetch plans:', response.message);
      }
    } catch (error) {
      toast.error('Error fetching plans');
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlan = async (newPlanData: {
    name: string;
    description: string;
    price: number;
    validityPeriod: number;
    isPopular: boolean;
    limits: {
      unlocked: { value: number; isUnlimited: boolean };
      jobPosts: { value: number; isUnlimited: boolean };
      invitations: { value: number; isUnlimited: boolean };
      onlineAssessment: { value: number; isUnlimited: boolean };
      onlineInterview: { value: number; isUnlimited: boolean };
    };
    features: {
      included: string[];
      excluded: string[];
    };
  }) => {
    console.log('New plan data to be sent to backend:', newPlanData);
    const addResponse = await addPlan(newPlanData);

    if (addResponse.success) {
      // Refresh the plans list after successful addition
      await fetchAllPlans();
      toast.success('Plan added successfully');
    } else {
      toast.error('Failed to add plan');
    }

    setIsDialogOpen(false);
  };

  const displayValue = (value: number, isUnlimited: boolean) => {
    if (isUnlimited) {
      return (
        <div className="flex items-center gap-1">
          <Infinity className="h-4 w-4" />
          <span>Unlimited</span>
        </div>
      );
    }
    return value;
  };

  // Helper function to check if online assessment is available
  const hasOnlineAssessment = (plan: Plan) => {
    return plan.limits.onlineAssessment.value > 0 || plan.limits.onlineAssessment.isUnlimited;
  };

  const deleteThisPlan = async (planId: any) => {
    const isDeleted = await deletePlan(planId);
    console.log('isDeleted ',isDeleted)
    if (isDeleted.success) {
      toast('plan deleted sucessfully')
    } else {
      toast(isDeleted.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-c mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
            <p className="text-gray-600 mt-1">Manage and monitor your subscription plans</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={fetchAllPlans}
              variant="outline"
              className="gap-2"
            >
              Refresh
            </Button>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-secondary-c hover:bg-secondary-c/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Plan
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No plans found</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 bg-secondary-c hover:bg-secondary-c/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Plan
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${plan.isPopular ? 'ring-2 ring-secondary-c border-secondary-c' : ''
                  }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-secondary-c text-white gap-1 px-3 py-1 text-xs font-medium">
                      <Crown className="h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4 pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        {plan.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${plan.price}
                        <span className="text-sm font-normal text-gray-600">/month</span>
                      </div>
                    </div>
                  </div>

                  {/* Validity Period */}
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">Validity Period</span>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">
                      {plan.validityPeriod} month{plan.validityPeriod > 1 ? 's' : ''}
                    </Badge>
                  </div>

                  {/* Subscribers */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Subscribers</span>
                    </div>
                    <Badge variant="secondary" className="bg-white text-gray-900 border">
                      {plan.subscriptions_count.toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-600">
                        {displayValue(plan.limits.unlocked.value, plan.limits.unlocked.isUnlimited)}
                      </div>
                      <div className="text-xs text-blue-800 font-medium">Features</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-600">
                        {displayValue(plan.limits.jobPosts.value, plan.limits.jobPosts.isUnlimited)}
                      </div>
                      <div className="text-xs text-green-800 font-medium">Job Posts</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-lg font-bold text-purple-600">
                        {displayValue(plan.limits.invitations.value, plan.limits.invitations.isUnlimited)}
                      </div>
                      <div className="text-xs text-purple-800 font-medium">Invitations</div>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm">What's Included</h4>
                    <div className="space-y-2">
                      {plan.features.included.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Excluded Features */}
                  {plan.features.excluded.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Not Included</h4>
                      <div className="space-y-2">
                        {plan.features.excluded.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <X className="h-3 w-3 text-gray-400" />
                            </div>
                            <span className="text-sm text-gray-500">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Online Assessment Status */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Online Assessment</span>
                    <Badge variant={hasOnlineAssessment(plan) ? "default" : "secondary"}
                      className={hasOnlineAssessment(plan) ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                      {hasOnlineAssessment(plan) ? "Available" : "Not Available"}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button onClick={() => deleteThisPlan(plan.id)} variant="outline" className="flex-1 gap-2" size="sm">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                    {/* <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <AddPlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddPlan={handleAddPlan}
      />
    </div>
  );
}

export default Plans;