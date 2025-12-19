// // components/add-plan-dialog.tsx
// import { useState } from "react";
// import { X, Plus, Minus, Calendar, Infinity, Star } from "lucide-react";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";

// interface AddPlanDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onAddPlan: (plan: {
//     name: string;
//     description: string;
//     price: number;
//     validityPeriod: number;
//     isPopular: boolean;
//     limits: {
//       unlocked: { value: number; isUnlimited: boolean };
//       jobPosts: { value: number; isUnlimited: boolean };
//       invitations: { value: number; isUnlimited: boolean };
//       onlineAssessment: { value: number; isUnlimited: boolean };
//       onlineInterview: { value: number; isUnlimited: boolean };
//     };
//     features: {
//       included: string[];
//       excluded: string[];
//     };
//   }) => void;
// }

// export function AddPlanDialog({ open, onOpenChange, onAddPlan }: AddPlanDialogProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     price: 0,
//     description: "",
//     validityPeriod: null,
//     isPopular: false,
//     limits: {
//       unlocked: { value: 0, isUnlimited: false },
//       jobPosts: { value: 0, isUnlimited: false },
//       invitations: { value: 0, isUnlimited: false },
//       onlineAssessment: { value: 0, isUnlimited: false },
//       onlineInterview: { value: 0, isUnlimited: false }
//     },
//     features: {
//       included: [""],
//       excluded: [""]
//     }
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const planData = {
//       name: formData.name,
//       description: formData.description,
//       price: formData.price,
//       validityPeriod: formData.validityPeriod,
//       isPopular: formData.isPopular,
//       limits: formData.limits,
//       features: {
//         included: formData.features.included.filter(feature => feature.trim() !== ""),
//         excluded: formData.features.excluded.filter(feature => feature.trim() !== "")
//       }
//     };

//     onAddPlan(planData);

//     // Reset form
//     setFormData({
//       name: "",
//       price: 0,
//       description: "",
//       validityPeriod: 1,
//       isPopular: false,
//       limits: {
//         unlocked: { value: 0, isUnlimited: false },
//         jobPosts: { value: 0, isUnlimited: false },
//         invitations: { value: 0, isUnlimited: false },
//         onlineAssessment: { value: 0, isUnlimited: false },
//         onlineInterview: { value: 0, isUnlimited: false }
//       },
//       features: {
//         included: [""],
//         excluded: [""]
//       }
//     });
//   };

//   const updateLimitValue = (limitKey: keyof typeof formData.limits, value: number) => {
//     setFormData(prev => ({
//       ...prev,
//       limits: {
//         ...prev.limits,
//         [limitKey]: {
//           ...prev.limits[limitKey],
//           value: Math.max(0, value)
//         }
//       }
//     }));
//   };

//   const toggleUnlimited = (limitKey: keyof typeof formData.limits) => {
//     setFormData(prev => ({
//       ...prev,
//       limits: {
//         ...prev.limits,
//         [limitKey]: {
//           ...prev.limits[limitKey],
//           isUnlimited: !prev.limits[limitKey].isUnlimited
//         }
//       }
//     }));
//   };

//   const addFeature = (type: 'included' | 'excluded') => {
//     setFormData(prev => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [type]: [...prev.features[type], ""]
//       }
//     }));
//   };

//   const updateFeature = (type: 'included' | 'excluded', index: number, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [type]: prev.features[type].map((feature, i) => i === index ? value : feature)
//       }
//     }));
//   };

//   const removeFeature = (type: 'included' | 'excluded', index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [type]: prev.features[type].filter((_, i) => i !== index)
//       }
//     }));
//   };

//   const featureLimits = [
//     {
//       label: "Unlocked Features",
//       key: "unlocked" as keyof typeof formData.limits,
//       value: formData.limits.unlocked.value,
//       isUnlimited: formData.limits.unlocked.isUnlimited,
//       description: "Number of unlocked premium features"
//     },
//     {
//       label: "Job Posts",
//       key: "jobPosts" as keyof typeof formData.limits,
//       value: formData.limits.jobPosts.value,
//       isUnlimited: formData.limits.jobPosts.isUnlimited,
//       description: "Maximum job posts allowed"
//     },
//     {
//       label: "Invitations",
//       key: "invitations" as keyof typeof formData.limits,
//       value: formData.limits.invitations.value,
//       isUnlimited: formData.limits.invitations.isUnlimited,
//       description: "Candidate invitations per month"
//     },
//     {
//       label: "Online Assessments",
//       key: "onlineAssessment" as keyof typeof formData.limits,
//       value: formData.limits.onlineAssessment.value,
//       isUnlimited: formData.limits.onlineAssessment.isUnlimited,
//       description: "Online assessment tests"
//     },
//     {
//       label: "Online Interviews",
//       key: "onlineInterview" as keyof typeof formData.limits,
//       value: formData.limits.onlineInterview.value,
//       isUnlimited: formData.limits.onlineInterview.isUnlimited,
//       description: "Scheduled online interviews"
//     }
//   ];

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
//         <DialogHeader className="border-b border-gray-100 pb-4">
//           <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <div className="w-2 h-6 bg-secondary-c rounded-full"></div>
//             Create New Plan
//           </DialogTitle>
//           <DialogDescription className="text-gray-600">
//             Add a new subscription plan with specific features and limits
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-6 py-2">
//           {/* Basic Information */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//               <div className="w-1.5 h-1.5 bg-secondary-c rounded-full"></div>
//               Basic Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-sm font-medium text-gray-700">Plan Name *</Label>
//                 <Input
//                   id="name"
//                   placeholder="e.g., Professional"
//                   value={formData.name}
//                   onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//                   required
//                   className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="price" className="text-sm font-medium text-gray-700">Total Price ($) *</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   placeholder="0.00"
//                   value={formData.price}
//                   onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
//                   required
//                   className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
//               <Textarea
//                 id="description"
//                 placeholder="Brief description of this plan..."
//                 value={formData.description}
//                 onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                 rows={2}
//                 className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 resize-none"
//               />
//             </div>
//           </div>

//           {/* Validity Period */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <Label className="text-sm font-medium text-gray-900">Validity Period</Label>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2 flex-1">
//                 <Calendar className="h-4 w-4 text-secondary-c" />
//                 <Input
//                   type="number"
//                   min="1"
//                   placeholder="Number of months"
//                   value={formData.validityPeriod}
//                   onChange={(e) => setFormData(prev => ({ ...prev, validityPeriod: parseInt(e.target.value) || 1 }))}
//                   className="flex-1 bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
//                 />
//               </div>
//               <Badge className="bg-secondary-c/10 text-secondary-c border border-secondary-c/20 px-3 py-1 font-medium">
//                 {formData.validityPeriod} month{formData.validityPeriod > 1 ? 's' : ''}
//               </Badge>
//             </div>
//           </div>

//           {/* Feature Limits */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <Label className="text-sm font-medium text-gray-900">Feature Limits</Label>
//             <div className="space-y-3">
//               {featureLimits.map(({ label, key, value, isUnlimited, description }) => (
//                 <div key={key} className="flex items-center gap-4 justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
//                   <div className="flex items-center gap-4 flex-1 justify-between">
//                     <div className="min-w-[140px]">
//                       <Label className="text-sm font-medium text-gray-900">{label}</Label>
//                       <p className="text-xs text-gray-500">{description}</p>
//                     </div>

//                     {!isUnlimited && (
//                       <div className="flex items-center gap-2">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-secondary-c hover:text-secondary-c"
//                           onClick={() => updateLimitValue(key, value - 1)}
//                         >
//                           <Minus className="h-3 w-3" />
//                         </Button>
//                         <Badge variant="secondary" className="w-16 h-8 justify-center font-mono text-sm bg-white border border-gray-300 text-gray-900">
//                           {value}
//                         </Badge>
//                         <Button
//                           type="button"
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-secondary-c hover:text-secondary-c"
//                           onClick={() => updateLimitValue(key, value + 1)}
//                         >
//                           <Plus className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     )}

//                     {isUnlimited && (
//                       <Badge className="bg-secondary-c/10 text-secondary-c gap-1 border border-secondary-c/20">
//                         <Infinity className="h-3 w-3" />
//                         Unlimited
//                       </Badge>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Label htmlFor={`unlimited-${key}`} className="text-sm text-gray-600 cursor-pointer whitespace-nowrap">
//                       Unlimited
//                     </Label>
//                     <Switch
//                       id={`unlimited-${key}`}
//                       checked={isUnlimited}
//                       onCheckedChange={() => toggleUnlimited(key)}
//                       className="data-[state=checked]:bg-secondary-c"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Included Features */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label className="text-sm font-medium text-gray-900">Included Features</Label>
//                 <p className="text-xs text-gray-500">Features that are available in this plan</p>
//               </div>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => addFeature('included')}
//                 className="text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
//               >
//                 <Plus className="h-4 w-4 mr-1" />
//                 Add Included
//               </Button>
//             </div>

//             <div className="space-y-2">
//               {formData.features.included.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
//                     <Plus className="h-3 w-3 text-green-600" />
//                   </div>
//                   <Input
//                     placeholder="e.g., 10 job posts available"
//                     value={feature}
//                     onChange={(e) => updateFeature('included', index, e.target.value)}
//                     className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
//                   />
//                   {formData.features.included.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       onClick={() => removeFeature('included', index)}
//                       className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 border-gray-300"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Excluded Features */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label className="text-sm font-medium text-gray-900">Excluded Features</Label>
//                 <p className="text-xs text-gray-500">Features that are not available in this plan</p>
//               </div>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => addFeature('excluded')}
//                 className="text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
//               >
//                 <Plus className="h-4 w-4 mr-1" />
//                 Add Excluded
//               </Button>
//             </div>

//             <div className="space-y-2">
//               {formData.features.excluded.map((feature, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
//                     <X className="h-3 w-3 text-gray-400" />
//                   </div>
//                   <Input
//                     placeholder="e.g., Online assessments not available"
//                     value={feature}
//                     onChange={(e) => updateFeature('excluded', index, e.target.value)}
//                     className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
//                   />
//                   {formData.features.excluded.length > 1 && (
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       onClick={() => removeFeature('excluded', index)}
//                       className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 border-gray-300"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Settings */}
//           <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <h3 className="text-sm font-medium text-gray-900">Plan Settings</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
//                 <div className="space-y-0.5">
//                   <Label htmlFor="popular" className="text-sm font-medium cursor-pointer text-gray-900 flex items-center gap-2">
//                     <Star className="h-4 w-4 text-yellow-500" />
//                     Mark as Popular
//                   </Label>
//                   <p className="text-xs text-gray-600">Highlight this plan as recommended</p>
//                 </div>
//                 <Switch
//                   id="popular"
//                   checked={formData.isPopular}
//                   onCheckedChange={(checked) =>
//                     setFormData(prev => ({ ...prev, isPopular: checked }))
//                   }
//                   className="data-[state=checked]:bg-secondary-c"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="min-w-[80px] border-gray-300 text-gray-700 hover:bg-gray-50"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="bg-secondary-c hover:bg-secondary-c/90 text-white min-w-[120px] shadow-sm hover:shadow-md transition-all"
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Create Plan
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }





// components/add-plan-dialog.tsx
import { useState } from "react";
import { X, Plus, Minus, Calendar, Infinity, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface AddPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlan: (plan: {
    name: string;
    description: string;
    price: number;
    validityPeriod: number | null; // Changed to allow null for unlimited
    isUnlimitedValidity: boolean; // Added new field
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
  }) => void;
}

export function AddPlanDialog({ open, onOpenChange, onAddPlan }: AddPlanDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    validityPeriod: 1,
    isUnlimitedValidity: false, // Added new state
    isPopular: false,
    limits: {
      unlocked: { value: 0, isUnlimited: false },
      jobPosts: { value: 0, isUnlimited: false },
      invitations: { value: 0, isUnlimited: false },
      onlineAssessment: { value: 0, isUnlimited: false },
      onlineInterview: { value: 0, isUnlimited: false }
    },
    features: {
      included: [""],
      excluded: [""]
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const planData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      validityPeriod: formData.isUnlimitedValidity ? null : formData.validityPeriod,
      isUnlimitedValidity: formData.isUnlimitedValidity,
      isPopular: formData.isPopular,
      limits: formData.limits,
      features: {
        included: formData.features.included.filter(feature => feature.trim() !== ""),
        excluded: formData.features.excluded.filter(feature => feature.trim() !== "")
      }
    };

    onAddPlan(planData);

    // Reset form
    setFormData({
      name: "",
      price: 0,
      description: "",
      validityPeriod: 1,
      isUnlimitedValidity: false,
      isPopular: false,
      limits: {
        unlocked: { value: 0, isUnlimited: false },
        jobPosts: { value: 0, isUnlimited: false },
        invitations: { value: 0, isUnlimited: false },
        onlineAssessment: { value: 0, isUnlimited: false },
        onlineInterview: { value: 0, isUnlimited: false }
      },
      features: {
        included: [""],
        excluded: [""]
      }
    });
  };

  const updateLimitValue = (limitKey: keyof typeof formData.limits, value: number) => {
    setFormData(prev => ({
      ...prev,
      limits: {
        ...prev.limits,
        [limitKey]: {
          ...prev.limits[limitKey],
          value: Math.max(0, value)
        }
      }
    }));
  };

  const toggleUnlimited = (limitKey: keyof typeof formData.limits) => {
    setFormData(prev => ({
      ...prev,
      limits: {
        ...prev.limits,
        [limitKey]: {
          ...prev.limits[limitKey],
          isUnlimited: !prev.limits[limitKey].isUnlimited
        }
      }
    }));
  };

  const toggleUnlimitedValidity = () => {
    setFormData(prev => ({
      ...prev,
      isUnlimitedValidity: !prev.isUnlimitedValidity
    }));
  };

  const updateValidityPeriod = (value: number) => {
    setFormData(prev => ({
      ...prev,
      validityPeriod: Math.max(1, value)
    }));
  };

  const addFeature = (type: 'included' | 'excluded') => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [type]: [...prev.features[type], ""]
      }
    }));
  };

  const updateFeature = (type: 'included' | 'excluded', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [type]: prev.features[type].map((feature, i) => i === index ? value : feature)
      }
    }));
  };

  const removeFeature = (type: 'included' | 'excluded', index: number) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [type]: prev.features[type].filter((_, i) => i !== index)
      }
    }));
  };

  const featureLimits = [
    {
      label: "Unlocked Features",
      key: "unlocked" as keyof typeof formData.limits,
      value: formData.limits.unlocked.value,
      isUnlimited: formData.limits.unlocked.isUnlimited,
      description: "Number of unlocked premium features"
    },
    {
      label: "Job Posts",
      key: "jobPosts" as keyof typeof formData.limits,
      value: formData.limits.jobPosts.value,
      isUnlimited: formData.limits.jobPosts.isUnlimited,
      description: "Maximum job posts allowed"
    },
    {
      label: "Invitations",
      key: "invitations" as keyof typeof formData.limits,
      value: formData.limits.invitations.value,
      isUnlimited: formData.limits.invitations.isUnlimited,
      description: "Candidate invitations per month"
    },
    {
      label: "Online Assessments",
      key: "onlineAssessment" as keyof typeof formData.limits,
      value: formData.limits.onlineAssessment.value,
      isUnlimited: formData.limits.onlineAssessment.isUnlimited,
      description: "Online assessment tests"
    },
    {
      label: "Online Interviews",
      key: "onlineInterview" as keyof typeof formData.limits,
      value: formData.limits.onlineInterview.value,
      isUnlimited: formData.limits.onlineInterview.isUnlimited,
      description: "Scheduled online interviews"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-6 bg-secondary-c rounded-full"></div>
            Create New Plan
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Add a new subscription plan with specific features and limits
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-2">
          {/* Basic Information */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-secondary-c rounded-full"></div>
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Plan Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Professional"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">Total Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  required
                  className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of this plan..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 resize-none"
              />
            </div>
          </div>

          {/* Validity Period */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-900">Validity Period</Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="unlimited-validity" className="text-sm text-gray-600 cursor-pointer whitespace-nowrap">
                  Unlimited Validity
                </Label>
                <Switch
                  id="unlimited-validity"
                  checked={formData.isUnlimitedValidity}
                  onCheckedChange={toggleUnlimitedValidity}
                  className="data-[state=checked]:bg-secondary-c"
                />
              </div>
            </div>
            
            {!formData.isUnlimitedValidity ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Calendar className="h-4 w-4 text-secondary-c" />
                  <Input
                    type="number"
                    min="1"
                    placeholder="Number of months"
                    value={formData.validityPeriod}
                    onChange={(e) => updateValidityPeriod(parseInt(e.target.value) || 1)}
                    className="flex-1 bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
                  />
                </div>
                <Badge className="bg-secondary-c/10 text-secondary-c border border-secondary-c/20 px-3 py-1 font-medium">
                  {formData.validityPeriod} month{formData.validityPeriod > 1 ? 's' : ''}
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-secondary-c/20">
                <div className="w-8 h-8 rounded-full bg-secondary-c/10 flex items-center justify-center flex-shrink-0">
                  <Infinity className="h-4 w-4 text-secondary-c" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Unlimited Validity</p>
                  <p className="text-xs text-gray-600">This plan never expires</p>
                </div>
              </div>
            )}
          </div>

          {/* Feature Limits */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <Label className="text-sm font-medium text-gray-900">Feature Limits</Label>
            <div className="space-y-3">
              {featureLimits.map(({ label, key, value, isUnlimited, description }) => (
                <div key={key} className="flex items-center gap-4 justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center gap-4 flex-1 justify-between">
                    <div className="min-w-[140px]">
                      <Label className="text-sm font-medium text-gray-900">{label}</Label>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>

                    {!isUnlimited && (
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-secondary-c hover:text-secondary-c"
                          onClick={() => updateLimitValue(key, value - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Badge variant="secondary" className="w-16 h-8 justify-center font-mono text-sm bg-white border border-gray-300 text-gray-900">
                          {value}
                        </Badge>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-secondary-c hover:text-secondary-c"
                          onClick={() => updateLimitValue(key, value + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    )}

                    {isUnlimited && (
                      <Badge className="bg-secondary-c/10 text-secondary-c gap-1 border border-secondary-c/20">
                        <Infinity className="h-3 w-3" />
                        Unlimited
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`unlimited-${key}`} className="text-sm text-gray-600 cursor-pointer whitespace-nowrap">
                      Unlimited
                    </Label>
                    <Switch
                      id={`unlimited-${key}`}
                      checked={isUnlimited}
                      onCheckedChange={() => toggleUnlimited(key)}
                      className="data-[state=checked]:bg-secondary-c"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included Features */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-900">Included Features</Label>
                <p className="text-xs text-gray-500">Features that are available in this plan</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addFeature('included')}
                className="text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Included
              </Button>
            </div>

            <div className="space-y-2">
              {formData.features.included.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
                    <Plus className="h-3 w-3 text-green-600" />
                  </div>
                  <Input
                    placeholder="e.g., 10 job posts available"
                    value={feature}
                    onChange={(e) => updateFeature('included', index, e.target.value)}
                    className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
                  />
                  {formData.features.included.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature('included', index)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 border-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Excluded Features */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-900">Excluded Features</Label>
                <p className="text-xs text-gray-500">Features that are not available in this plan</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addFeature('excluded')}
                className="text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Excluded
              </Button>
            </div>

            <div className="space-y-2">
              {formData.features.excluded.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <X className="h-3 w-3 text-gray-400" />
                  </div>
                  <Input
                    placeholder="e.g., Online assessments not available"
                    value={feature}
                    onChange={(e) => updateFeature('excluded', index, e.target.value)}
                    className="bg-white border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20"
                  />
                  {formData.features.excluded.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature('excluded', index)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 border-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900">Plan Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="space-y-0.5">
                  <Label htmlFor="popular" className="text-sm font-medium cursor-pointer text-gray-900 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Mark as Popular
                  </Label>
                  <p className="text-xs text-gray-600">Highlight this plan as recommended</p>
                </div>
                <Switch
                  id="popular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, isPopular: checked }))
                  }
                  className="data-[state=checked]:bg-secondary-c"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="min-w-[80px] border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-secondary-c hover:bg-secondary-c/90 text-white min-w-[120px] shadow-sm hover:shadow-md transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}