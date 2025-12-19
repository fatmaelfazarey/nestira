
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Badge } from '@/components/ui/badge';
// // // import { CreditCard, Download, CheckCircle, ArrowUpCircle, Star, XCircle } from 'lucide-react';
// // // import { cn } from '@/lib/utils';
// // // import { useEffect, useState } from 'react';
// // // import { useEmployerStore } from '@/store/employer store/EmployerStore';

// // // const Billing = () => {
// // //   const { getAllPlans } = useEmployerStore();
// // //   const [plans, setPlans] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);

// // //   const invoices = [
// // //     { id: 4, date: '2025-07-01', amount: '$99.00', status: 'Upcoming' },
// // //     { id: 3, date: '2025-06-01', amount: '$99.00', status: 'Pending' },
// // //     { id: 2, date: '2025-05-01', amount: '$99.00', status: 'Paid' },
// // //     { id: 1, date: '2025-04-01', amount: '$99.00', status: 'Paid' },
// // //   ];

// // //   const getStatusBadgeClass = (status: string) => {
// // //     switch (status) {
// // //       case 'Paid':
// // //         return 'bg-green-100 text-green-800 border-green-200/60';
// // //       case 'Pending':
// // //         return 'bg-yellow-100 text-yellow-800 border-yellow-200/60';
// // //       case 'Upcoming':
// // //         return 'bg-blue-100 text-blue-800 border-blue-200/60';
// // //       default:
// // //         return 'bg-gray-100 text-gray-800';
// // //     }
// // //   };

// // //   // Transform backend plans to match frontend structure
// // //   const transformPlans = (backendPlans: any[]) => {
// // //     console.log('Transforming plans:', backendPlans);
// // //     return backendPlans.map(plan => {
// // //       const is_active = false; // You'll need to get this from your user subscription data

// // //       // Handle features - both included and excluded
// // //       const includedFeatures = plan.features?.included?.map((feature: string) =>
// // //         feature.trim() || 'Feature included'
// // //       ) || ['No features listed'];

// // //       const excludedFeatures = plan.features?.excluded?.map((feature: string) =>
// // //         feature.trim() || 'Feature not included'
// // //       ) || [];

// // //       let cta = 'Upgrade Plan';
// // //       if (is_active) {
// // //         cta = 'Current Plan';
// // //       } else if (plan.name.toLowerCase() === 'free') {
// // //         cta = 'Get Started';
// // //       }

// // //       // Format validity period
// // //       let validityText = 'Custom';
// // //       if (plan.validityPeriod === null) {
// // //         validityText = 'Unlimited';
// // //       } else if (plan.validityPeriod === 1) {
// // //         validityText = '1 month';
// // //       } else if (plan.validityPeriod > 1) {
// // //         validityText = `${plan.validityPeriod} months`;
// // //       }

// // //       return {
// // //         id: plan.planId,
// // //         name: plan.name.charAt(0).toUpperCase() + plan.name.slice(1),
// // //         price: `$${parseFloat(plan.price).toFixed(2)}`,
// // //         period: 'month',
// // //         includedFeatures,
// // //         excludedFeatures,
// // //         cta,
// // //         is_active,
// // //         isPopular: plan.isPopular,
// // //         description: plan.description,
// // //         validityPeriod: plan.validityPeriod,
// // //         validityText,
// // //         limits: plan.limits
// // //       };
// // //     });
// // //   };

// // //   const availablePlans = plans ? transformPlans(plans) : [];

// // //   useEffect(() => {
// // //     fetchPlans();
// // //   }, []);

// // //   const fetchPlans = async () => {
// // //     console.log('Fetching plans...');
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const result = await getAllPlans();
// // //       console.log('API Response:', result);

// // //       if (result.success) {
// // //         setPlans(result.data || []);
// // //       } else {
// // //         setError(result.message || 'Failed to fetch plans');
// // //       }
// // //     } catch (err: any) {
// // //       setError(err.message || 'Failed to fetch plans');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-64">
// // //         <div className="text-lg">Loading plans...</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="flex justify-center items-center min-h-64">
// // //         <div className="text-lg text-red-600">Error: {error}</div>
// // //         <Button onClick={fetchPlans} className="mt-4" variant="outline">
// // //           Retry
// // //         </Button>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div>
// // //       <div className="space-y-8">
// // //         <div className="flex justify-between items-center">
// // //           <div>
// // //             <h1 className="text-3xl font-bold text-gray-900">Billing & <span className="gradient-text">Subscription</span></h1>
// // //             <p className="text-gray-600">Manage your subscription and billing information</p>
// // //           </div>
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
// // //           <Card className="md:col-span-3">
// // //             <CardHeader>
// // //               <CardTitle>Usage This Month</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// // //                 <div className="text-center p-4 rounded-lg bg-blue-50">
// // //                   <div className="text-3xl font-bold text-blue-600">23</div>
// // //                   <div className="text-sm text-blue-800 font-medium">Job Posts</div>
// // //                   <div className="text-xs text-blue-500">of 50</div>
// // //                 </div>
// // //                 <div className="text-center p-4 rounded-lg bg-green-50">
// // //                   <div className="text-3xl font-bold text-green-600">156</div>
// // //                   <div className="text-sm text-green-800 font-medium">Candidates</div>
// // //                   <div className="text-xs text-green-500">Unlimited</div>
// // //                 </div>
// // //                 <div className="text-center p-4 rounded-lg bg-purple-50">
// // //                   <div className="text-3xl font-bold text-purple-600">45</div>
// // //                   <div className="text-sm text-purple-800 font-medium">Exports</div>
// // //                   <div className="text-xs text-purple-500">Unlimited</div>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           <Card className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
// // //             <CardHeader>
// // //               <CardTitle>Payment Method</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="flex items-center gap-4 mb-4 p-4 rounded-lg bg-white/60 border border-black/5 shadow-sm">
// // //                 <CreditCard className="w-12 h-12 text-blue-600" />
// // //                 <div>
// // //                   <p className="font-semibold text-lg text-gray-800">•••• •••• •••• 4242</p>
// // //                   <p className="text-sm text-gray-600">Expires 12/25</p>
// // //                 </div>
// // //               </div>
// // //               <Button variant="outline" className="w-full bg-white hover:bg-white/80 border-blue-200">Update Payment Method</Button>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         <Card className="bg-gradient-to-br from-gray-50 to-slate-100">
// // //           <CardHeader>
// // //             <CardTitle className="text-2xl font-semibold">Available Plans</CardTitle>
// // //             <p className="text-gray-600">Choose the plan that's right for you.</p>
// // //           </CardHeader>
// // //           <CardContent className="pt-6">
// // //             {availablePlans.length === 0 ? (
// // //               <div className="text-center py-8">
// // //                 <p className="text-gray-500">No plans available at the moment.</p>
// // //                 <Button
// // //                   onClick={fetchPlans}
// // //                   className="mt-4"
// // //                   variant="outline"
// // //                 >
// // //                   Retry Loading Plans
// // //                 </Button>
// // //               </div>
// // //             ) : (
// // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //                 {availablePlans.map((plan) => (
// // //                   <Card
// // //                     key={plan.id}
// // //                     className={cn(
// // //                       "flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-full",
// // //                       plan.is_active && "border-2 border-accent",
// // //                       plan.isPopular && "ring-2 ring-purple-600 ring-offset-2 shadow-lg shadow-purple-600/20"
// // //                     )}
// // //                   >
// // //                     {plan.is_active ? (
// // //                       <Badge className="absolute top-4 right-4 bg-accent text-white font-semibold">Current Plan</Badge>
// // //                     ) : plan.isPopular && (
// // //                       <Badge className="absolute top-4 right-4 bg-purple-600 text-white font-semibold border-purple-700">Most Popular</Badge>
// // //                     )}

// // //                     <CardHeader>
// // //                       <CardTitle className="text-xl">{plan.name}</CardTitle>
// // //                       <p className="text-3xl font-bold">{plan.price}<span className="text-sm font-normal text-gray-600">/{plan.period}</span></p>
// // //                       {plan.description && (
// // //                         <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
// // //                       )}
// // //                     </CardHeader>

// // //                     <CardContent className="flex flex-col flex-grow">
// // //                       {/* Included Features */}
// // //                       <div className="mb-6">
// // //                         <h4 className="text-sm font-semibold text-gray-900 mb-3">What's Included:</h4>
// // //                         <ul className="space-y-3">
// // //                           {plan.includedFeatures.map((feature: string, index: number) => (
// // //                             <li key={index} className="flex items-start gap-3">
// // //                               <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
// // //                               <span className="text-sm text-gray-700">{feature}</span>
// // //                             </li>
// // //                           ))}
// // //                         </ul>
// // //                       </div>

// // //                       {/* Excluded Features (only show if there are any) */}
// // //                       {plan.excludedFeatures.length > 0 && (
// // //                         <div className="mb-6">
// // //                           <h4 className="text-sm font-semibold text-gray-900 mb-3">Not Included:</h4>
// // //                           <ul className="space-y-3">
// // //                             {plan.excludedFeatures.map((feature: string, index: number) => (
// // //                               <li key={index} className="flex items-start gap-3">
// // //                                 <XCircle className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
// // //                                 <span className="text-sm text-gray-500">{feature}</span>
// // //                               </li>
// // //                             ))}
// // //                           </ul>
// // //                         </div>
// // //                       )}



// // //                       <Button
// // //                         className={`w-full mt-auto ${plan.cta === 'Upgrade Plan' ? 'bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg' : ''}`}
// // //                         variant={plan.is_active ? 'outline' : (plan.cta === 'Upgrade Plan' ? 'default' : 'secondary')}
// // //                         disabled={plan.is_active}
// // //                       >
// // //                         {plan.cta === 'Upgrade Plan' && <ArrowUpCircle className="w-4 h-4 mr-2" />}
// // //                         {plan.is_active && <Star className="w-4 h-4 mr-2" />}
// // //                         {plan.cta}
// // //                       </Button>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </CardContent>
// // //         </Card>

// // //         <Card>
// // //           <CardHeader>
// // //             <CardTitle>Invoice History</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="space-y-3">
// // //               {invoices.map((invoice) => (
// // //                 <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
// // //                   <div>
// // //                     <p className="font-medium">Invoice #{invoice.id}</p>
// // //                     <p className="text-sm text-gray-600">{invoice.date}</p>
// // //                   </div>
// // //                   <div className="flex items-center gap-3">
// // //                     <Badge className={cn("font-semibold", getStatusBadgeClass(invoice.status))}>{invoice.status}</Badge>
// // //                     <span className="font-medium">{invoice.amount}</span>
// // //                     <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
// // //                       <Download className="w-4 h-4" />
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Billing;






// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import { CreditCard, Download, CheckCircle, ArrowUpCircle, Star, XCircle, Loader2 } from 'lucide-react';
// // import { cn } from '@/lib/utils';
// // import { useEffect, useState } from 'react';
// // import { useEmployerStore } from '@/store/employer store/EmployerStore';

// // interface PlanLimit {
// //   plan_id: number;
// //   feature: string;
// //   value: number;
// //   is_unlimited: number;
// // }

// // interface PlanFeatures {
// //   excluded: string[];
// //   included: string[];
// // }

// // interface BackendPlan {
// //   planId: number;
// //   name: string;
// //   description: string;
// //   price: string;
// //   features: PlanFeatures;
// //   validityPeriod: number | null;
// //   isPopular: boolean;
// //   limits: PlanLimit[];
// // }

// // interface TransformedPlan {
// //   id: number;
// //   name: string;
// //   price: string;
// //   period: string;
// //   includedFeatures: string[];
// //   excludedFeatures: string[];
// //   cta: string;
// //   is_active: boolean;
// //   isPopular: boolean;
// //   description: string;
// //   validityPeriod: number | null;
// //   validityText: string;
// //   limits: PlanLimit[];
// //   originalPrice: number;
// // }

// // const Billing = () => {
// //   const { getAllPlans } = useEmployerStore();
// //   const [plans, setPlans] = useState<BackendPlan[]>([]);
// //   const [currentPlanId, setCurrentPlanId] = useState<number | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const invoices = [
// //     { id: 4, date: '2025-07-01', amount: '$99.00', status: 'Upcoming' },
// //     { id: 3, date: '2025-06-01', amount: '$99.00', status: 'Pending' },
// //     { id: 2, date: '2025-05-01', amount: '$99.00', status: 'Paid' },
// //     { id: 1, date: '2025-04-01', amount: '$99.00', status: 'Paid' },
// //   ];

// //   const getStatusBadgeClass = (status: string) => {
// //     switch (status) {
// //       case 'Paid':
// //         return 'bg-green-100 text-green-800 border-green-200/60';
// //       case 'Pending':
// //         return 'bg-yellow-100 text-yellow-800 border-yellow-200/60';
// //       case 'Upcoming':
// //         return 'bg-blue-100 text-blue-800 border-blue-200/60';
// //       default:
// //         return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   // Transform backend plans to match frontend structure
// //   const transformPlans = (backendPlans: BackendPlan[], currentPlanId: number | null): TransformedPlan[] => {
// //     console.log('Transforming plans:', backendPlans);

// //     return backendPlans.map(plan => {
// //       const is_active = plan.planId === currentPlanId;

// //       // Handle features - clean up whitespace and empty strings
// //       const includedFeatures = plan.features?.included
// //         ?.map((feature: string) => feature.trim())
// //         .filter((feature: string) => feature.length > 0)
// //         || ['Basic features included'];

// //       const excludedFeatures = plan.features?.excluded
// //         ?.map((feature: string) => feature.trim())
// //         .filter((feature: string) => feature.length > 0)
// //         || [];

// //       // Determine CTA text
// //       let cta = 'Upgrade Plan';
// //       if (is_active) {
// //         cta = 'Current Plan';
// //       } else if (plan.name.toLowerCase() === 'free') {
// //         cta = 'Get Started';
// //       }

// //       // Format validity period
// //       let validityText = 'Custom';
// //       if (plan.validityPeriod === null) {
// //         validityText = 'Unlimited';
// //       } else if (plan.validityPeriod === 1) {
// //         validityText = '1 month';
// //       } else if (plan.validityPeriod > 1) {
// //         validityText = `${plan.validityPeriod} months`;
// //       }

// //       // Format price display
// //       const originalPrice = parseFloat(plan.price);
// //       const priceDisplay = originalPrice === 0 ? 'Free' : `$${originalPrice.toFixed(2)}`;

// //       return {
// //         id: plan.planId,
// //         name: plan.name.charAt(0).toUpperCase() + plan.name.slice(1),
// //         price: priceDisplay,
// //         period: plan.validityPeriod === 1 ? 'month' : 'custom',
// //         includedFeatures,
// //         excludedFeatures,
// //         cta,
// //         is_active,
// //         isPopular: plan.isPopular,
// //         description: plan.description,
// //         validityPeriod: plan.validityPeriod,
// //         validityText,
// //         limits: plan.limits,
// //         originalPrice
// //       };
// //     });
// //   };

// //   const availablePlans = plans.length > 0 ? transformPlans(plans, currentPlanId) : [];

// //   useEffect(() => {
// //     fetchPlans();
// //   }, []);

// //   const fetchPlans = async () => {
// //     console.log('Fetching plans...');
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const result = await getAllPlans();
// //       console.log('API Response:', result);

// //       if (result.success) {
// //         setPlans(result.data || []);
// //         setCurrentPlanId(result.currentPlanId || null);
// //       } else {
// //         setError(result.message || 'Failed to fetch plans');
// //       }
// //     } catch (err: any) {
// //       setError(err.message || 'Failed to fetch plans');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-64">
// //         <div className="flex flex-col items-center gap-3">
// //           <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
// //           <div className="text-lg text-gray-600">Loading plans...</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center min-h-64">
// //         <div className="text-center">
// //           <div className="text-lg text-red-600 mb-4">Error: {error}</div>
// //           <Button onClick={fetchPlans} className="mt-4" variant="outline">
// //             Retry
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50/30">
// //       <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Header Section */}
// //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
// //           <div className="flex-1">
// //             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
// //               Billing & <span className="gradient-text">Subscription</span>
// //             </h1>
// //             <p className="text-gray-600 mt-2 text-sm sm:text-base">
// //               Manage your subscription and billing information
// //             </p>
// //           </div>
// //           <Button
// //             onClick={fetchPlans}
// //             variant="outline"
// //             className="shrink-0"
// //             size="sm"
// //           >
// //             Refresh Plans
// //           </Button>
// //         </div>

// //         {/* Usage Stats & Payment Method Grid */}
// //         {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
// //           <Card className="lg:col-span-3">
// //             <CardHeader>
// //               <CardTitle className="text-lg sm:text-xl">Usage This Month</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
// //                 <div className="text-center p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-100">
// //                   <div className="text-2xl sm:text-3xl font-bold text-blue-600">23</div>
// //                   <div className="text-sm text-blue-800 font-medium">Job Posts</div>
// //                   <div className="text-xs text-blue-500">of 50</div>
// //                 </div>
// //                 <div className="text-center p-3 sm:p-4 rounded-lg bg-green-50 border border-green-100">
// //                   <div className="text-2xl sm:text-3xl font-bold text-green-600">156</div>
// //                   <div className="text-sm text-green-800 font-medium">Candidates</div>
// //                   <div className="text-xs text-green-500">Unlimited</div>
// //                 </div>
// //                 <div className="text-center p-3 sm:p-4 rounded-lg bg-purple-50 border border-purple-100">
// //                   <div className="text-2xl sm:text-3xl font-bold text-purple-600">45</div>
// //                   <div className="text-sm text-purple-800 font-medium">Exports</div>
// //                   <div className="text-xs text-purple-500">Unlimited</div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
// //             <CardHeader>
// //               <CardTitle className="text-lg sm:text-xl">Payment Method</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="flex items-center gap-3 sm:gap-4 mb-4 p-3 sm:p-4 rounded-lg bg-white/60 border border-black/5 shadow-sm">
// //                 <CreditCard className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 flex-shrink-0" />
// //                 <div className="min-w-0 flex-1">
// //                   <p className="font-semibold text-base sm:text-lg text-gray-800 truncate">
// //                     •••• •••• •••• 4242
// //                   </p>
// //                   <p className="text-sm text-gray-600">Expires 12/25</p>
// //                 </div>
// //               </div>
// //               <Button 
// //                 variant="outline" 
// //                 className="w-full bg-white hover:bg-white/80 border-blue-200 text-sm sm:text-base"
// //                 size="sm"
// //               >
// //                 Update Payment Method
// //               </Button>
// //             </CardContent>
// //           </Card>
// //         </div> */}

// //         {/* Available Plans Section */}
// //         <Card className="bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200">
// //           <CardHeader className="text-center pb-4">
// //             <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold">
// //               Available Plans
// //             </CardTitle>
// //             <p className="text-gray-600 text-sm sm:text-base">
// //               Choose the plan that's right for you.
// //             </p>
// //           </CardHeader>
// //           <CardContent className="pt-2">
// //             {availablePlans.length === 0 ? (
// //               <div className="text-center py-12">
// //                 <p className="text-gray-500 text-lg mb-4">No plans available at the moment.</p>
// //                 <Button
// //                   onClick={fetchPlans}
// //                   className="mt-4"
// //                   variant="outline"
// //                 >
// //                   Retry Loading Plans
// //                 </Button>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
// //                 {availablePlans.map((plan) => (
// //                   <Card
// //                     key={plan.id}
// //                     className={cn(
// //                       "flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2",
// //                       "h-full transform hover:-translate-y-1",
// //                       plan.is_active
// //                         ? "border-accent shadow-lg shadow-accent/20"
// //                         : "border-gray-200 hover:border-gray-300",
// //                       plan.isPopular && "ring-2 ring-purple-500 ring-offset-2 shadow-xl shadow-purple-500/20 border-purple-500"
// //                     )}
// //                   >
// //                     {/* Plan Badges */}
// //                     <div className="absolute top-3 right-3 z-10">
// //                       {plan.is_active ? (
// //                         <Badge className="bg-accent text-white font-semibold px-3 py-1 text-xs">
// //                           Current Plan
// //                         </Badge>
// //                       ) : plan.isPopular ? (
// //                         <Badge className="bg-purple-600 text-white font-semibold border-purple-700 px-3 py-1 text-xs">
// //                           Most Popular
// //                         </Badge>
// //                       ) : null}
// //                     </div>

// //                     <CardHeader className="pb-4">
// //                       <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
// //                         {plan.name}
// //                       </CardTitle>
// //                       <div className="flex items-baseline gap-1 mt-2">
// //                         <span className="text-2xl sm:text-3xl font-bold text-gray-900">
// //                           {plan.price}
// //                         </span>
// //                         {plan.originalPrice > 0 && (
// //                           <span className="text-sm font-normal text-gray-600 ml-1">
// //                             /{plan.period}
// //                           </span>
// //                         )}
// //                       </div>
// //                       {plan.description && (
// //                         <p className="text-sm text-gray-600 mt-2 line-clamp-2">
// //                           {plan.description}
// //                         </p>
// //                       )}
// //                       {plan.validityText && plan.validityText !== 'Unlimited' && (
// //                         <Badge variant="outline" className="mt-2 w-fit text-xs">
// //                           {plan.validityText}
// //                         </Badge>
// //                       )}
// //                     </CardHeader>

// //                     <CardContent className="flex flex-col flex-grow pt-0">
// //                       {/* Included Features */}
// //                       <div className="mb-6 flex-1">
// //                         <h4 className="text-sm font-semibold text-gray-900 mb-3">
// //                           What's Included:
// //                         </h4>
// //                         <ul className="space-y-2">
// //                           {plan.includedFeatures.map((feature: string, index: number) => (
// //                             <li key={index} className="flex items-start gap-2">
// //                               <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
// //                               <span className="text-sm text-gray-700 leading-relaxed">
// //                                 {feature}
// //                               </span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       </div>

// //                       {/* Excluded Features */}
// //                       {plan.excludedFeatures.length > 0 && (
// //                         <div className="mb-6">
// //                           <h4 className="text-sm font-semibold text-gray-900 mb-3">
// //                             Not Included:
// //                           </h4>
// //                           <ul className="space-y-2">
// //                             {plan.excludedFeatures.map((feature: string, index: number) => (
// //                               <li key={index} className="flex items-start gap-2">
// //                                 <XCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
// //                                 <span className="text-sm text-gray-500 leading-relaxed">
// //                                   {feature}
// //                                 </span>
// //                               </li>
// //                             ))}
// //                           </ul>
// //                         </div>
// //                       )}

// //                       {/* CTA Button */}
// //                       <Button
// //                         className={cn(
// //                           "w-full mt-auto transition-all duration-200 font-semibold",
// //                           plan.is_active
// //                             ? "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
// //                             : plan.cta === 'Upgrade Plan'
// //                               ? "bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg hover:shadow-xl"
// //                               : "bg-blue-600 hover:bg-blue-700 text-white"
// //                         )}
// //                         size="lg"
// //                         disabled={plan.is_active}
// //                       >
// //                         {plan.cta === 'Upgrade Plan' && <ArrowUpCircle className="w-4 h-4 mr-2" />}
// //                         {plan.is_active && <Star className="w-4 h-4 mr-2" />}
// //                         {plan.cta}
// //                       </Button>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>

// //         {/* Invoice History */}
// //         <Card>
// //           <CardHeader>
// //             <CardTitle className="text-lg sm:text-xl">Invoice History</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-3">
// //               {invoices.map((invoice) => (
// //                 <div
// //                   key={invoice.id}
// //                   className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors gap-3"
// //                 >
// //                   <div className="flex-1 min-w-0">
// //                     <p className="font-medium text-gray-900 truncate">Invoice #{invoice.id}</p>
// //                     <p className="text-sm text-gray-600">{invoice.date}</p>
// //                   </div>
// //                   <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
// //                     <Badge
// //                       className={cn(
// //                         "font-semibold text-xs sm:text-sm px-2 py-1",
// //                         getStatusBadgeClass(invoice.status)
// //                       )}
// //                     >
// //                       {invoice.status}
// //                     </Badge>
// //                     <span className="font-medium text-gray-900 text-sm sm:text-base min-w-[80px] text-right">
// //                       {invoice.amount}
// //                     </span>
// //                     <Button
// //                       variant="ghost"
// //                       size="icon"
// //                       className="text-gray-500 hover:text-gray-900 shrink-0"
// //                     >
// //                       <Download className="w-4 h-4" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Billing;






// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { CreditCard, Download, CheckCircle, ArrowUpCircle, Star, XCircle, Loader2 } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { useEffect, useState } from 'react';
// import { useEmployerStore } from '@/store/employer store/EmployerStore';
// import { PaymentDialog } from '@/components/Admin components/PaymentDialog';

// interface PlanLimit {
//   plan_id: number;
//   feature: string;
//   value: number;
//   is_unlimited: number;
// }

// interface PlanFeatures {
//   excluded: string[];
//   included: string[];
// }

// interface BackendPlan {
//   planId: number;
//   name: string;
//   description: string;
//   price: string;
//   features: PlanFeatures;
//   validityPeriod: number | null;
//   isPopular: boolean;
//   limits: PlanLimit[];
// }

// interface TransformedPlan {
//   id: number;
//   name: string;
//   price: string;
//   period: string;
//   includedFeatures: string[];
//   excludedFeatures: string[];
//   cta: string;
//   is_active: boolean;
//   isPopular: boolean;
//   description: string;
//   validityPeriod: number | null;
//   validityText: string;
//   limits: PlanLimit[];
//   originalPrice: number;
// }

// const Billing = () => {
//   const { getAllPlans ,subscriptionsHistory} = useEmployerStore();
//   const [plans, setPlans] = useState<BackendPlan[]>([]);
//   const [currentPlanId, setCurrentPlanId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState<TransformedPlan | null>(null);

//   const invoices = [
//     { id: 4, date: '2025-07-01', amount: '$99.00', status: 'Upcoming' },
//     { id: 3, date: '2025-06-01', amount: '$99.00', status: 'Pending' },
//     { id: 2, date: '2025-05-01', amount: '$99.00', status: 'Paid' },
//     { id: 1, date: '2025-04-01', amount: '$99.00', status: 'Paid' },
//   ];

//   const getStatusBadgeClass = (status: string) => {
//     switch (status) {
//       case 'Paid':
//         return 'bg-green-100 text-green-800 border-green-200/60';
//       case 'Pending':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-200/60';
//       case 'Upcoming':
//         return 'bg-blue-100 text-blue-800 border-blue-200/60';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Transform backend plans to match frontend structure
//   const transformPlans = (backendPlans: BackendPlan[], currentPlanId: number | null): TransformedPlan[] => {
//     console.log('Transforming plans:', backendPlans);

//     return backendPlans.map(plan => {
//       const is_active = plan.planId === currentPlanId;

//       // Handle features - clean up whitespace and empty strings
//       const includedFeatures = plan.features?.included
//         ?.map((feature: string) => feature.trim())
//         .filter((feature: string) => feature.length > 0)
//         || ['Basic features included'];

//       const excludedFeatures = plan.features?.excluded
//         ?.map((feature: string) => feature.trim())
//         .filter((feature: string) => feature.length > 0)
//         || [];

//       // Determine CTA text
//       let cta = 'Upgrade Plan';
//       if (is_active) {
//         cta = 'Current Plan';
//       } else if (plan.name.toLowerCase() === 'free') {
//         cta = 'Get Started';
//       }

//       // Format validity period
//       let validityText = 'Custom';
//       if (plan.validityPeriod === null) {
//         validityText = 'Unlimited';
//       } else if (plan.validityPeriod === 1) {
//         validityText = '1 month';
//       } else if (plan.validityPeriod > 1) {
//         validityText = `${plan.validityPeriod} months`;
//       }

//       // Format price display
//       const originalPrice = parseFloat(plan.price);
//       const priceDisplay = originalPrice === 0 ? 'Free' : `$${originalPrice.toFixed(2)}`;

//       return {
//         id: plan.planId,
//         name: plan.name.charAt(0).toUpperCase() + plan.name.slice(1),
//         price: priceDisplay,
//         period: plan.validityPeriod === 1 ? 'month' : 'custom',
//         includedFeatures,
//         excludedFeatures,
//         cta,
//         is_active,
//         isPopular: plan.isPopular,
//         description: plan.description,
//         validityPeriod: plan.validityPeriod,
//         validityText,
//         limits: plan.limits,
//         originalPrice
//       };
//     });
//   };

//   const availablePlans = plans.length > 0 ? transformPlans(plans, currentPlanId) : [];

//   useEffect(() => {
//     fetchPlans();
//     fetchSubscriptionsHistory();
//   }, []);

//   const fetchSubscriptionsHistory = async()=>{
//     const response = await subscriptionsHistory();

//     console.log('response  subscriptionsHistory ',response)
//   }

//   const fetchPlans = async () => {
//     console.log('Fetching plans...');
//     setLoading(true);
//     setError(null);
//     try {
//       const result = await getAllPlans();
//       console.log('API Response:', result);

//       if (result.success) {
//         setPlans(result.data || []);
//         setCurrentPlanId(result.currentPlanId || null);
//       } else {
//         setError(result.message || 'Failed to fetch plans');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch plans');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpgradeClick = (plan: TransformedPlan) => {
//     setSelectedPlan(plan);
//     setPaymentDialogOpen(true);
//   };

//   const handlePaymentSuccess = () => {
//     // Refresh plans to update current plan
//     fetchPlans();
//     // Show success message
//     alert('Payment successful! Your plan has been upgraded.');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//           <div className="text-lg text-gray-600">Loading plans...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-center">
//           <div className="text-lg text-red-600 mb-4">Error: {error}</div>
//           <Button onClick={fetchPlans} className="mt-4" variant="outline">
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50/30">
//       <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//           <div className="flex-1">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
//               Billing & <span className="gradient-text">Subscription</span>
//             </h1>
//             <p className="text-gray-600 mt-2 text-sm sm:text-base">
//               Manage your subscription and billing information
//             </p>
//           </div>
//           <Button
//             onClick={fetchPlans}
//             variant="outline"
//             className="shrink-0"
//             size="sm"
//           >
//             Refresh Plans
//           </Button>
//         </div>

//         {/* Available Plans Section */}
//         <Card className="bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200">
//           <CardHeader className="text-center pb-4">
//             <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold">
//               Available Plans
//             </CardTitle>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Choose the plan that's right for you.
//             </p>
//           </CardHeader>
//           <CardContent className="pt-2">
//             {availablePlans.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg mb-4">No plans available at the moment.</p>
//                 <Button
//                   onClick={fetchPlans}
//                   className="mt-4"
//                   variant="outline"
//                 >
//                   Retry Loading Plans
//                 </Button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
//                 {availablePlans.map((plan) => (
//                   <Card
//                     key={plan.id}
//                     className={cn(
//                       "flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2",
//                       "h-full transform hover:-translate-y-1",
//                       plan.is_active
//                         ? "border-accent shadow-lg shadow-accent/20"
//                         : "border-gray-200 hover:border-gray-300",
//                       plan.isPopular && "ring-2 ring-purple-500 ring-offset-2 shadow-xl shadow-purple-500/20 border-purple-500"
//                     )}
//                   >
//                     {/* Plan Badges */}
//                     <div className="absolute top-3 right-3 z-10">
//                       {plan.is_active ? (
//                         <Badge className="bg-accent text-white font-semibold px-3 py-1 text-xs">
//                           Current Plan
//                         </Badge>
//                       ) : plan.isPopular ? (
//                         <Badge className="bg-purple-600 text-white font-semibold border-purple-700 px-3 py-1 text-xs">
//                           Most Popular
//                         </Badge>
//                       ) : null}
//                     </div>

//                     <CardHeader className="pb-4">
//                       <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
//                         {plan.name}
//                       </CardTitle>
//                       <div className="flex items-baseline gap-1 mt-2">
//                         <span className="text-2xl sm:text-3xl font-bold text-gray-900">
//                           {plan.price}
//                         </span>
//                         {plan.originalPrice > 0 && (
//                           <span className="text-sm font-normal text-gray-600 ml-1">
//                             /{plan.period}
//                           </span>
//                         )}
//                       </div>
//                       {plan.description && (
//                         <p className="text-sm text-gray-600 mt-2 line-clamp-2">
//                           {plan.description}
//                         </p>
//                       )}
//                       {plan.validityText && plan.validityText !== 'Unlimited' && (
//                         <Badge variant="outline" className="mt-2 w-fit text-xs">
//                           {plan.validityText}
//                         </Badge>
//                       )}
//                     </CardHeader>

//                     <CardContent className="flex flex-col flex-grow pt-0">
//                       {/* Included Features */}
//                       <div className="mb-6 flex-1">
//                         <h4 className="text-sm font-semibold text-gray-900 mb-3">
//                           What's Included:
//                         </h4>
//                         <ul className="space-y-2">
//                           {plan.includedFeatures.map((feature: string, index: number) => (
//                             <li key={index} className="flex items-start gap-2">
//                               <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
//                               <span className="text-sm text-gray-700 leading-relaxed">
//                                 {feature}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       {/* Excluded Features */}
//                       {plan.excludedFeatures.length > 0 && (
//                         <div className="mb-6">
//                           <h4 className="text-sm font-semibold text-gray-900 mb-3">
//                             Not Included:
//                           </h4>
//                           <ul className="space-y-2">
//                             {plan.excludedFeatures.map((feature: string, index: number) => (
//                               <li key={index} className="flex items-start gap-2">
//                                 <XCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
//                                 <span className="text-sm text-gray-500 leading-relaxed">
//                                   {feature}
//                                 </span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* CTA Button */}
//                       <Button
//                         onClick={() => handleUpgradeClick(plan)}
//                         className={cn(
//                           "w-full mt-auto transition-all duration-200 font-semibold",
//                           plan.is_active
//                             ? "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
//                             : plan.cta === 'Upgrade Plan'
//                               ? "bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg hover:shadow-xl"
//                               : "bg-blue-600 hover:bg-blue-700 text-white"
//                         )}
//                         size="lg"
//                         disabled={plan.is_active}
//                       >
//                         {plan.cta === 'Upgrade Plan' && <ArrowUpCircle className="w-4 h-4 mr-2" />}
//                         {plan.is_active && <Star className="w-4 h-4 mr-2" />}
//                         {plan.cta}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Invoice History */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg sm:text-xl">Invoice History</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {invoices.map((invoice) => (
//                 <div
//                   key={invoice.id}
//                   className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors gap-3"
//                 >
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-900 truncate">Invoice #{invoice.id}</p>
//                     <p className="text-sm text-gray-600">{invoice.date}</p>
//                   </div>
//                   <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
//                     <Badge
//                       className={cn(
//                         "font-semibold text-xs sm:text-sm px-2 py-1",
//                         getStatusBadgeClass(invoice.status)
//                       )}
//                     >
//                       {invoice.status}
//                     </Badge>
//                     <span className="font-medium text-gray-900 text-sm sm:text-base min-w-[80px] text-right">
//                       {invoice.amount}
//                     </span>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="text-gray-500 hover:text-gray-900 shrink-0"
//                     >
//                       <Download className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Payment Dialog */}
//       <PaymentDialog
//         open={paymentDialogOpen}
//         onOpenChange={setPaymentDialogOpen}
//         selectedPlan={selectedPlan}
//         onPaymentSuccess={handlePaymentSuccess}
//       />
//     </div>
//   );
// };

// export default Billing;







import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, CheckCircle, ArrowUpCircle, Star, XCircle, Loader2, Calendar, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useEmployerStore } from '@/store/employer store/EmployerStore';
import { PaymentDialog } from '@/components/Admin components/PaymentDialog';

interface PlanLimit {
  plan_id: number;
  feature: string;
  value: number;
  is_unlimited: number;
}

interface PlanFeatures {
  excluded: string[];
  included: string[];
}

interface BackendPlan {
  planId: number;
  name: string;
  description: string;
  price: string;
  features: PlanFeatures;
  validityPeriod: number | null;
  isPopular: boolean;
  limits: PlanLimit[];
}

interface TransformedPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  includedFeatures: string[];
  excludedFeatures: string[];
  cta: string;
  is_active: boolean;
  isPopular: boolean;
  description: string;
  validityPeriod: number | null;
  validityText: string;
  limits: PlanLimit[];
  originalPrice: number;
}

interface SubscriptionHistory {
  name: string;
  description: string;
  price: string;
  validity_period: number | null;
  start_date: string;
  end_date: string | null;
  is_active: number;
}

const Billing = () => {
  const { getAllPlans, subscriptionsHistory } = useEmployerStore();
  const [plans, setPlans] = useState<BackendPlan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TransformedPlan | null>(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState<SubscriptionHistory[]>([]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200/60';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200/60';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200/60';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanStatus = (subscription: SubscriptionHistory) => {
    if (subscription.is_active === 1) {
      return 'Active';
    }
    
    const endDate = subscription.end_date ? new Date(subscription.end_date) : null;
    const now = new Date();
    
    if (endDate && endDate < now) {
      return 'Expired';
    }
    
    return 'Active';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return numericPrice === 0 ? 'Free' : `$${numericPrice.toFixed(2)}`;
  };

  const formatValidityPeriod = (validityPeriod: number | null) => {
    if (validityPeriod === null) return 'Unlimited';
    if (validityPeriod === 1) return '1 month';
    return `${validityPeriod} months`;
  };

  // Transform backend plans to match frontend structure
  const transformPlans = (backendPlans: BackendPlan[], currentPlanId: number | null): TransformedPlan[] => {
    console.log('Transforming plans:', backendPlans);

    return backendPlans.map(plan => {
      const is_active = plan.planId === currentPlanId;

      // Handle features - clean up whitespace and empty strings
      const includedFeatures = plan.features?.included
        ?.map((feature: string) => feature.trim())
        .filter((feature: string) => feature.length > 0)
        || ['Basic features included'];

      const excludedFeatures = plan.features?.excluded
        ?.map((feature: string) => feature.trim())
        .filter((feature: string) => feature.length > 0)
        || [];

      // Determine CTA text
      let cta = 'Upgrade Plan';
      if (is_active) {
        cta = 'Current Plan';
      } else if (plan.name.toLowerCase() === 'free') {
        cta = 'Get Started';
      }

      // Format validity period
      let validityText = 'Custom';
      if (plan.validityPeriod === null) {
        validityText = 'Unlimited';
      } else if (plan.validityPeriod === 1) {
        validityText = '1 month';
      } else if (plan.validityPeriod > 1) {
        validityText = `${plan.validityPeriod} months`;
      }

      // Format price display
      const originalPrice = parseFloat(plan.price);
      const priceDisplay = originalPrice === 0 ? 'Free' : `$${originalPrice.toFixed(2)}`;

      return {
        id: plan.planId,
        name: plan.name.charAt(0).toUpperCase() + plan.name.slice(1),
        price: priceDisplay,
        period: plan.validityPeriod === 1 ? 'month' : 'custom',
        includedFeatures,
        excludedFeatures,
        cta,
        is_active,
        isPopular: plan.isPopular,
        description: plan.description,
        validityPeriod: plan.validityPeriod,
        validityText,
        limits: plan.limits,
        originalPrice
      };
    });
  };

  const availablePlans = plans.length > 0 ? transformPlans(plans, currentPlanId) : [];

  useEffect(() => {
    fetchPlans();
    fetchSubscriptionsHistory();
  }, []);

  const fetchSubscriptionsHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await subscriptionsHistory();
      console.log('response subscriptionsHistory ', response);

      if (response.success) {
        setSubscriptionHistory(response.data || []);
      } else {
        console.error('Failed to fetch subscription history:', response.message);
      }
    } catch (error) {
      console.error('Error fetching subscription history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchPlans = async () => {
    console.log('Fetching plans...');
    setLoading(true);
    setError(null);
    try {
      const result = await getAllPlans();
      console.log('API Response:', result);

      if (result.success) {
        setPlans(result.data || []);
        setCurrentPlanId(result.currentPlanId || null);
      } else {
        setError(result.message || 'Failed to fetch plans');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeClick = (plan: TransformedPlan) => {
    setSelectedPlan(plan);
    setPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    // Refresh plans and history to update current plan
    fetchPlans();
    fetchSubscriptionsHistory();
    // Show success message
    alert('Payment successful! Your plan has been upgraded.');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <div className="text-lg text-gray-600">Loading plans...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">Error: {error}</div>
          <Button onClick={fetchPlans} className="mt-4" variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Billing & <span className="gradient-text">Subscription</span>
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Manage your subscription and billing information
            </p>
          </div>
          <Button
            onClick={() => {
              fetchPlans();
              fetchSubscriptionsHistory();
            }}
            variant="outline"
            className="shrink-0"
            size="sm"
          >
            Refresh
          </Button>
        </div>

        {/* Available Plans Section */}
        <Card className="bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              Available Plans
            </CardTitle>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose the plan that's right for you.
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            {availablePlans.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No plans available at the moment.</p>
                <Button
                  onClick={fetchPlans}
                  className="mt-4"
                  variant="outline"
                >
                  Retry Loading Plans
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {availablePlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={cn(
                      "flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2",
                      "h-full transform hover:-translate-y-1",
                      plan.is_active
                        ? "border-accent shadow-lg shadow-accent/20"
                        : "border-gray-200 hover:border-gray-300",
                      plan.isPopular && "ring-2 ring-purple-500 ring-offset-2 shadow-xl shadow-purple-500/20 border-purple-500"
                    )}
                  >
                    {/* Plan Badges */}
                    <div className="absolute top-3 right-3 z-10">
                      {plan.is_active ? (
                        <Badge className="bg-accent text-white font-semibold px-3 py-1 text-xs">
                          Current Plan
                        </Badge>
                      ) : plan.isPopular ? (
                        <Badge className="bg-purple-600 text-white font-semibold border-purple-700 px-3 py-1 text-xs">
                          Most Popular
                        </Badge>
                      ) : null}
                    </div>

                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
                        {plan.name}
                      </CardTitle>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        {plan.originalPrice > 0 && (
                          <span className="text-sm font-normal text-gray-600 ml-1">
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {plan.description}
                        </p>
                      )}
                      {plan.validityText && plan.validityText !== 'Unlimited' && (
                        <Badge variant="outline" className="mt-2 w-fit text-xs">
                          {plan.validityText}
                        </Badge>
                      )}
                    </CardHeader>

                    <CardContent className="flex flex-col flex-grow pt-0">
                      {/* Included Features */}
                      <div className="mb-6 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                          What's Included:
                        </h4>
                        <ul className="space-y-2">
                          {plan.includedFeatures.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700 leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Excluded Features */}
                      {plan.excludedFeatures.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            Not Included:
                          </h4>
                          <ul className="space-y-2">
                            {plan.excludedFeatures.map((feature: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <XCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-500 leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button
                        onClick={() => handleUpgradeClick(plan)}
                        className={cn(
                          "w-full mt-auto transition-all duration-200 font-semibold",
                          plan.is_active
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                            : plan.cta === 'Upgrade Plan'
                              ? "bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white shadow-lg hover:shadow-xl"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                        )}
                        size="lg"
                        disabled={plan.is_active}
                      >
                        {plan.cta === 'Upgrade Plan' && <ArrowUpCircle className="w-4 h-4 mr-2" />}
                        {plan.is_active && <Star className="w-4 h-4 mr-2" />}
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Subscription History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {historyLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                <span className="text-gray-600">Loading subscription history...</span>
              </div>
            ) : subscriptionHistory.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No subscription history found</p>
                <p className="text-gray-400 text-sm mt-2">Your subscription history will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptionHistory.map((subscription, index) => {
                  const status = getPlanStatus(subscription);
                  const is_active = subscription.is_active === 1;
                  
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg transition-colors gap-4",
                        is_active 
                          ? "bg-blue-50 border-blue-200" 
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {subscription.name}
                          </h3>
                          {is_active && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Current Plan
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {subscription.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Started: {formatDate(subscription.start_date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {subscription.end_date 
                                ? `Ends: ${formatDate(subscription.end_date)}`
                                : 'No expiration'
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Validity: {formatValidityPeriod(subscription.validity_period)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                        <div className="text-right">
                          <Badge
                            className={cn(
                              "font-semibold text-xs sm:text-sm px-3 py-1 mb-2",
                              getStatusBadgeClass(status)
                            )}
                          >
                            {status}
                          </Badge>
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(subscription.price)}
                          </div>
                        </div>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-gray-900 shrink-0"
                          title="Download receipt"
                        >
                          <Download className="w-4 h-4" />
                        </Button> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        selectedPlan={selectedPlan}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Billing;