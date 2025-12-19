// // import { useState } from 'react';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent } from '@/components/ui/card';
// // import { Badge } from '@/components/ui/badge';
// // import { CreditCard, Calendar, Lock, CheckCircle, Loader2, X } from 'lucide-react';
// // import { cn } from '@/lib/utils';
// // import { useEmployerStore } from '@/store/employer store/EmployerStore';

// // interface PaymentDialogProps {
// //     open: boolean;
// //     onOpenChange: (open: boolean) => void;
// //     selectedPlan: TransformedPlan | null;
// //     onPaymentSuccess?: () => void;
// // }

// // interface PaymentData {
// //     cardNumber: string;
// //     expiryDate: string;
// //     cvv: string;
// //     cardHolder: string;
// // }

// // export const PaymentDialog: React.FC<PaymentDialogProps> = ({
// //     open,
// //     onOpenChange,
// //     selectedPlan,
// //     onPaymentSuccess
// // }) => {
// //     const { currentUser } = useEmployerStore();
// //     const [loading, setLoading] = useState(false);
// //     const [paymentData, setPaymentData] = useState<PaymentData>({
// //         cardNumber: '',
// //         expiryDate: '',
// //         cvv: '',
// //         cardHolder: ''
// //     });
// //     const [errors, setErrors] = useState<Partial<PaymentData>>({});

// //     const validateForm = (): boolean => {
// //         const newErrors: Partial<PaymentData> = {};

// //         // Card number validation (16 digits)
// //         if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
// //             newErrors.cardNumber = 'Please enter a valid 16-digit card number';
// //         }

// //         // Expiry date validation (MM/YY format)
// //         if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
// //             newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
// //         }

// //         // CVV validation (3-4 digits)
// //         if (!paymentData.cvv.match(/^\d{3,4}$/)) {
// //             newErrors.cvv = 'Please enter a valid CVV';
// //         }

// //         // Card holder validation
// //         if (!paymentData.cardHolder.trim()) {
// //             newErrors.cardHolder = 'Please enter card holder name';
// //         }

// //         setErrors(newErrors);
// //         return Object.keys(newErrors).length === 0;
// //     };

// //     const handleInputChange = (field: keyof PaymentData, value: string) => {
// //         setPaymentData(prev => ({
// //             ...prev,
// //             [field]: value
// //         }));

// //         // Clear error when user starts typing
// //         if (errors[field]) {
// //             setErrors(prev => ({
// //                 ...prev,
// //                 [field]: undefined
// //             }));
// //         }
// //     };

// //     const formatCardNumber = (value: string) => {
// //         const cleaned = value.replace(/\D/g, '');
// //         const groups = cleaned.match(/.{1,4}/g);
// //         return groups ? groups.join(' ').slice(0, 19) : '';
// //     };

// //     const formatExpiryDate = (value: string) => {
// //         const cleaned = value.replace(/\D/g, '');
// //         if (cleaned.length >= 3) {
// //             return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
// //         }
// //         return cleaned;
// //     };

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();

// //         if (!validateForm() || !selectedPlan) {
// //             return;
// //         }

// //         setLoading(true);

// //         try {
// //             // Simulate API call to process payment
// //             await processPayment();

// //             // Call backend to subscribe to plan
// //             const result = await subscribeToPlan(selectedPlan.id);

// //             if (result.success) {
// //                 onPaymentSuccess?.();
// //                 onOpenChange(false);
// //                 // Reset form
// //                 setPaymentData({
// //                     cardNumber: '',
// //                     expiryDate: '',
// //                     cvv: '',
// //                     cardHolder: ''
// //                 });
// //             } else {
// //                 throw new Error(result.message || 'Failed to subscribe to plan');
// //             }
// //         } catch (error: any) {
// //             console.error('Payment failed:', error);
// //             alert(error.message || 'Payment failed. Please try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const processPayment = (): Promise<void> => {
// //         return new Promise((resolve, reject) => {
// //             setTimeout(() => {
// //                 // Simulate payment processing - in real app, integrate with Stripe/Payment gateway
// //                 const isSuccess = Math.random() > 0.2; // 80% success rate for demo
// //                 if (isSuccess) {
// //                     resolve();
// //                 } else {
// //                     reject(new Error('Payment processing failed. Please check your card details.'));
// //                 }
// //             }, 2000);
// //         });
// //     };

// //     const subscribeToPlan = async (planId: number): Promise<{ success: boolean; message?: string }> => {
// //         if (!currentUser) {
// //             return { success: false, message: 'User not authenticated' };
// //         }

// //         const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

// //         try {
// //             const response = await fetch('/api/subscribe', { // Update with your actual endpoint
// //                 method: 'POST',
// //                 headers: {
// //                     Authorization: token,
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     planId,
// //                     paymentData: {
// //                         // In real app, don't send raw card data - use payment token from Stripe/etc
// //                         last4: paymentData.cardNumber.slice(-4),
// //                         expiry: paymentData.expiryDate
// //                     }
// //                 })
// //             });

// //             const result = await response.json();
// //             return result;
// //         } catch (error: any) {
// //             return { success: false, message: error.message };
// //         }
// //     };

// //     if (!selectedPlan) return null;

// //     return (
// //         <Dialog open={open} onOpenChange={onOpenChange}>
// //             <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto">
// //                 <DialogHeader>
// //                     <div className="flex items-center justify-between">
// //                         <div>
// //                             <DialogTitle className="text-xl font-bold">
// //                                 Upgrade to {selectedPlan.name}
// //                             </DialogTitle>
// //                             <DialogDescription>
// //                                 Complete your payment to start using {selectedPlan.name} features
// //                             </DialogDescription>
// //                         </div>
// //                         <Button
// //                             variant="ghost"
// //                             size="icon"
// //                             onClick={() => onOpenChange(false)}
// //                             className="h-8 w-8"
// //                         >
// //                             <X className="h-4 w-4" />
// //                         </Button>
// //                     </div>
// //                 </DialogHeader>

// //                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
// //                     {/* Order Summary */}
// //                     <Card className="bg-gray-50 border-gray-200">
// //                         <CardContent className="p-4">
// //                             <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

// //                             <div className="space-y-3">
// //                                 <div className="flex justify-between items-center">
// //                                     <span className="text-gray-600">Plan</span>
// //                                     <span className="font-semibold">{selectedPlan.name}</span>
// //                                 </div>

// //                                 <div className="flex justify-between items-center">
// //                                     <span className="text-gray-600">Billing Cycle</span>
// //                                     <span className="font-semibold">
// //                                         {selectedPlan.period === 'month' ? 'Monthly' : selectedPlan.validityText}
// //                                     </span>
// //                                 </div>

// //                                 <div className="flex justify-between items-center">
// //                                     <span className="text-gray-600">Amount</span>
// //                                     <span className="font-semibold">{selectedPlan.price}</span>
// //                                 </div>

// //                                 <div className="border-t pt-3 mt-3">
// //                                     <div className="flex justify-between items-center text-lg font-bold">
// //                                         <span>Total</span>
// //                                         <span>{selectedPlan.price}</span>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             {/* Plan Features Preview */}
// //                             <div className="mt-6">
// //                                 <h4 className="font-semibold text-sm mb-3">What you'll get:</h4>
// //                                 <ul className="space-y-2">
// //                                     {selectedPlan.includedFeatures.slice(0, 3).map((feature, index) => (
// //                                         <li key={index} className="flex items-center gap-2 text-sm">
// //                                             <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
// //                                             <span className="text-gray-700">{feature}</span>
// //                                         </li>
// //                                     ))}
// //                                     {selectedPlan.includedFeatures.length > 3 && (
// //                                         <li className="text-sm text-gray-500">
// //                                             +{selectedPlan.includedFeatures.length - 3} more features
// //                                         </li>
// //                                     )}
// //                                 </ul>
// //                             </div>
// //                         </CardContent>
// //                     </Card>

// //                     {/* Payment Form */}
// //                     <div>
// //                         <form onSubmit={handleSubmit} className="space-y-4">
// //                             <div className="space-y-2">
// //                                 <Label htmlFor="cardHolder">Card Holder Name</Label>
// //                                 <Input
// //                                     id="cardHolder"
// //                                     placeholder="John Doe"
// //                                     value={paymentData.cardHolder}
// //                                     onChange={(e) => handleInputChange('cardHolder', e.target.value)}
// //                                     className={cn(errors.cardHolder && 'border-red-500')}
// //                                 />
// //                                 {errors.cardHolder && (
// //                                     <p className="text-red-500 text-sm">{errors.cardHolder}</p>
// //                                 )}
// //                             </div>

// //                             <div className="space-y-2">
// //                                 <Label htmlFor="cardNumber">Card Number</Label>
// //                                 <div className="relative">
// //                                     <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //                                     <Input
// //                                         id="cardNumber"
// //                                         placeholder="1234 5678 9012 3456"
// //                                         value={formatCardNumber(paymentData.cardNumber)}
// //                                         onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
// //                                         className={cn('pl-10', errors.cardNumber && 'border-red-500')}
// //                                         maxLength={19}
// //                                     />
// //                                 </div>
// //                                 {errors.cardNumber && (
// //                                     <p className="text-red-500 text-sm">{errors.cardNumber}</p>
// //                                 )}
// //                             </div>

// //                             <div className="grid grid-cols-2 gap-4">
// //                                 <div className="space-y-2">
// //                                     <Label htmlFor="expiryDate">Expiry Date</Label>
// //                                     <div className="relative">
// //                                         <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //                                         <Input
// //                                             id="expiryDate"
// //                                             placeholder="MM/YY"
// //                                             value={formatExpiryDate(paymentData.expiryDate)}
// //                                             onChange={(e) => handleInputChange('expiryDate', e.target.value)}
// //                                             className={cn('pl-10', errors.expiryDate && 'border-red-500')}
// //                                             maxLength={5}
// //                                         />
// //                                     </div>
// //                                     {errors.expiryDate && (
// //                                         <p className="text-red-500 text-sm">{errors.expiryDate}</p>
// //                                     )}
// //                                 </div>

// //                                 <div className="space-y-2">
// //                                     <Label htmlFor="cvv">CVV</Label>
// //                                     <div className="relative">
// //                                         <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //                                         <Input
// //                                             id="cvv"
// //                                             placeholder="123"
// //                                             value={paymentData.cvv}
// //                                             onChange={(e) => handleInputChange('cvv', e.target.value)}
// //                                             className={cn('pl-10', errors.cvv && 'border-red-500')}
// //                                             maxLength={4}
// //                                         />
// //                                     </div>
// //                                     {errors.cvv && (
// //                                         <p className="text-red-500 text-sm">{errors.cvv}</p>
// //                                     )}
// //                                 </div>
// //                             </div>

// //                             {/* Security Notice */}
// //                             <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
// //                                 <div className="flex items-start gap-2">
// //                                     <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
// //                                     <p className="text-sm text-blue-700">
// //                                         Your payment information is secure and encrypted. We never store your card details.
// //                                     </p>
// //                                 </div>
// //                             </div>

// //                             {/* Action Buttons */}
// //                             <div className="flex gap-3 pt-4">
// //                                 <Button
// //                                     type="button"
// //                                     variant="outline"
// //                                     onClick={() => onOpenChange(false)}
// //                                     className="flex-1"
// //                                     disabled={loading}
// //                                 >
// //                                     Cancel
// //                                 </Button>
// //                                 <Button
// //                                     type="submit"
// //                                     disabled={loading}
// //                                     className="flex-1 bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90"
// //                                 >
// //                                     {loading ? (
// //                                         <>
// //                                             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
// //                                             Processing...
// //                                         </>
// //                                     ) : (
// //                                         <>
// //                                             <CreditCard className="w-4 h-4 mr-2" />
// //                                             Pay {selectedPlan.price}
// //                                         </>
// //                                     )}
// //                                 </Button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             </DialogContent>
// //         </Dialog>
// //     );
// // };



// import { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { CreditCard, Calendar, Lock, CheckCircle, Loader2, X, Shield, Zap, Star } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { useEmployerStore } from '@/store/employer store/EmployerStore';

// interface PaymentDialogProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     selectedPlan: TransformedPlan | null;
//     onPaymentSuccess?: () => void;
// }

// interface PaymentData {
//     cardNumber: string;
//     expiryDate: string;
//     cvv: string;
//     cardHolder: string;
//     zipCode?: string;
// }

// interface SubscriptionRequest {
//     planId: number;
//     paymentData: {
//         cardNumber: string;
//         expiryDate: string;
//         cvv: string;
//         cardHolder: string;
//         zipCode?: string;
//         last4?: string;
//     };
// }

// export const PaymentDialog: React.FC<PaymentDialogProps> = ({
//     open,
//     onOpenChange,
//     selectedPlan,
//     onPaymentSuccess
// }) => {
//     const { planSubscriptions } = useEmployerStore();
//     const [loading, setLoading] = useState(false);
//     const [paymentData, setPaymentData] = useState<PaymentData>({
//         cardNumber: '',
//         expiryDate: '',
//         cvv: '',
//         cardHolder: '',
//         zipCode: ''
//     });
//     const [errors, setErrors] = useState<Partial<PaymentData>>({});

//     const validateForm = (): boolean => {
//         const newErrors: Partial<PaymentData> = {};

//         // Card number validation (16 digits)
//         if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
//             newErrors.cardNumber = 'Please enter a valid 16-digit card number';
//         }

//         // Expiry date validation (MM/YY format)
//         if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
//             newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
//         }

//         // CVV validation (3-4 digits)
//         if (!paymentData.cvv.match(/^\d{3,4}$/)) {
//             newErrors.cvv = 'Please enter a valid CVV';
//         }

//         // Card holder validation
//         if (!paymentData.cardHolder.trim()) {
//             newErrors.cardHolder = 'Please enter card holder name';
//         }

//         // Zip code validation (optional but if provided, validate)
//         if (paymentData.zipCode && !paymentData.zipCode.match(/^\d{5}(-\d{4})?$/)) {
//             newErrors.zipCode = 'Please enter a valid zip code';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleInputChange = (field: keyof PaymentData, value: string) => {
//         setPaymentData(prev => ({
//             ...prev,
//             [field]: value
//         }));

//         // Clear error when user starts typing
//         if (errors[field]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [field]: undefined
//             }));
//         }
//     };

//     const formatCardNumber = (value: string) => {
//         const cleaned = value.replace(/\D/g, '');
//         const groups = cleaned.match(/.{1,4}/g);
//         return groups ? groups.join(' ').slice(0, 19) : '';
//     };

//     const formatExpiryDate = (value: string) => {
//         const cleaned = value.replace(/\D/g, '');
//         if (cleaned.length >= 3) {
//             return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
//         }
//         return cleaned;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validateForm() || !selectedPlan) {
//             return;
//         }

//         setLoading(true);

//         try {
//             // Prepare subscription data with both plan ID and payment data
//             const subscriptionData: SubscriptionRequest = {
//                 planId: selectedPlan.id,
//                 paymentData: {
//                     cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
//                     expiryDate: paymentData.expiryDate,
//                     cvv: paymentData.cvv,
//                     cardHolder: paymentData.cardHolder,
//                     zipCode: paymentData.zipCode,
//                     last4: paymentData.cardNumber.slice(-4)
//                 }
//             };

//             // Call backend to subscribe to plan with payment data
//             // const result = await subscribeToPlan(subscriptionData);

//             if (result.success) {
//                 onPaymentSuccess?.();
//                 onOpenChange(false);
//                 // Reset form
//                 setPaymentData({
//                     cardNumber: '',
//                     expiryDate: '',
//                     cvv: '',
//                     cardHolder: '',
//                     zipCode: ''
//                 });
//             } else {
//                 throw new Error(result.message || 'Failed to subscribe to plan');
//             }
//         } catch (error: any) {
//             console.error('Payment failed:', error);
//             alert(error.message || 'Payment failed. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const subscribeToPlan = async (subscriptionData: SubscriptionRequest): Promise<{ success: boolean; message?: string }> => {
//     //     if (!currentUser) {
//     //         return { success: false, message: 'User not authenticated' };
//     //     }

//     //     const token = `Bearer ${currentUser.stsTokenManager.accessToken}`;

//     //     try {
//     //         const response = await fetch('/api/subscribe', { // Update with your actual endpoint
//     //             method: 'POST',
//     //             headers: {
//     //                 Authorization: token,
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify(subscriptionData)
//     //         });

//     //         if (!response.ok) {
//     //             throw new Error(`HTTP error! status: ${response.status}`);
//     //         }

//     //         const result = await response.json();
//     //         return result;
//     //     } catch (error: any) {
//     //         console.error('Subscription error:', error);
//     //         return { 
//     //             success: false, 
//     //             message: error.message || 'Network error occurred. Please try again.' 
//     //         };
//     //     }
//     // };

//     if (!selectedPlan) return null;

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-0">
//                 <div className="grid grid-cols-1 lg:grid-cols-2">
//                     {/* Left Side - Order Summary */}
//                     <div className="bg-gradient-to-br from-secondary-c to-yellow-600 text-white p-6 lg:p-8">
//                         <DialogHeader className="text-left space-y-4">
//                             <div className="flex items-center gap-3">
//                                 <div className="p-2 bg-white/20 rounded-lg">
//                                     <Zap className="h-6 w-6" />
//                                 </div>
//                                 <div>
//                                     <DialogTitle className="text-2xl font-bold text-white">
//                                         Upgrade to {selectedPlan.name}
//                                     </DialogTitle>
//                                     <DialogDescription className="text-blue-100">
//                                         Complete your payment to unlock premium features
//                                     </DialogDescription>
//                                 </div>
//                             </div>
//                         </DialogHeader>

//                         {/* Plan Highlights */}
//                         <div className="mt-8 space-y-6">
//                             <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                                 <div className="flex items-center justify-between mb-3">
//                                     <span className="text-lg font-semibold">Order Summary</span>
//                                     {selectedPlan.isPopular && (
//                                         <Badge className="bg-yellow-400 text-blue-900 hover:bg-yellow-400">
//                                             <Star className="w-3 h-3 mr-1" />
//                                             Popular
//                                         </Badge>
//                                     )}
//                                 </div>
                                
//                                 <div className="space-y-3">
//                                     <div className="flex justify-between items-center py-2 border-b border-white/20">
//                                         <span className="text-blue-100">Plan</span>
//                                         <span className="font-semibold text-lg">{selectedPlan.name}</span>
//                                     </div>
                                    
//                                     <div className="flex justify-between items-center py-2 border-b border-white/20">
//                                         <span className="text-blue-100">Billing Cycle</span>
//                                         <span className="font-semibold">
//                                             {selectedPlan.period === 'month' ? 'Monthly' : selectedPlan.validityText}
//                                         </span>
//                                     </div>
                                    
//                                     <div className="flex justify-between items-center py-2 border-b border-white/20">
//                                         <span className="text-blue-100">Amount</span>
//                                         <span className="font-semibold text-xl">{selectedPlan.price}</span>
//                                     </div>

//                                     {/* <div className="pt-3 mt-2 border-t border-white/30">
//                                         <div className="flex justify-between items-center text-xl font-bold">
//                                             <span>Total Due</span>
//                                             <span className="text-2xl">{selectedPlan.price}</span>
//                                         </div>
//                                     </div> */}
//                                 </div>
//                             </div>

//                             {/* Features Preview */}
//                             <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//                                 <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
//                                     <CheckCircle className="w-5 h-5 text-green-300" />
//                                     What you'll get:
//                                 </h4>
//                                 <ul className="space-y-3">
//                                     {selectedPlan.includedFeatures.map((feature, index) => (
//                                         <li key={index} className="flex items-start gap-3">
//                                             <div className="w-2 h-2 bg-green-300 rounded-full mt-2 flex-shrink-0" />
//                                             <span className="text-blue-100 leading-relaxed">{feature}</span>
//                                         </li>
//                                     ))}
//                                     {/* {selectedPlan.includedFeatures.length > 4 && (
//                                         <li className="text-blue-200 text-sm pl-5">
//                                             +{selectedPlan.includedFeatures.length - 4} more features
//                                         </li>
//                                     )} */}
//                                 </ul>
//                             </div>

//                             {/* Security Badge */}
//                             {/* <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
//                                 <Shield className="w-4 h-4" />
//                                 <span>Secure SSL Encryption • 256-bit Security</span>
//                             </div> */}
//                         </div>
//                     </div>

//                     {/* Right Side - Payment Form */}
//                     <div className="bg-white p-6 lg:p-8">
//                         <div className="flex justify-between items-center mb-6">
//                             <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={() => onOpenChange(false)}
//                                 className="h-8 w-8 text-gray-400 hover:text-gray-600"
//                             >
//                                 <X className="h-4 w-4" />
//                             </Button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Card Holder */}
//                             <div className="space-y-3">
//                                 <Label htmlFor="cardHolder" className="text-sm font-medium text-gray-700">
//                                     Card Holder Name
//                                 </Label>
//                                 <Input
//                                     id="cardHolder"
//                                     placeholder="John Doe"
//                                     value={paymentData.cardHolder}
//                                     onChange={(e) => handleInputChange('cardHolder', e.target.value)}
//                                     className={cn(
//                                         "h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
//                                         errors.cardHolder && "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                     )}
//                                     disabled={loading}
//                                 />
//                                 {errors.cardHolder && (
//                                     <p className="text-red-500 text-sm flex items-center gap-1">
//                                         <X className="w-3 h-3" />
//                                         {errors.cardHolder}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Card Number */}
//                             <div className="space-y-3">
//                                 <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
//                                     Card Number
//                                 </Label>
//                                 <div className="relative">
//                                     <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                                     <Input
//                                         id="cardNumber"
//                                         placeholder="1234 5678 9012 3456"
//                                         value={formatCardNumber(paymentData.cardNumber)}
//                                         onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
//                                         className={cn(
//                                             "h-12 pl-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
//                                             errors.cardNumber && "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                         )}
//                                         maxLength={19}
//                                         disabled={loading}
//                                     />
//                                 </div>
//                                 {errors.cardNumber && (
//                                     <p className="text-red-500 text-sm flex items-center gap-1">
//                                         <X className="w-3 h-3" />
//                                         {errors.cardNumber}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Expiry & CVV */}
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="space-y-3">
//                                     <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
//                                         Expiry Date
//                                     </Label>
//                                     <div className="relative">
//                                         <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                                         <Input
//                                             id="expiryDate"
//                                             placeholder="MM/YY"
//                                             value={formatExpiryDate(paymentData.expiryDate)}
//                                             onChange={(e) => handleInputChange('expiryDate', e.target.value)}
//                                             className={cn(
//                                                 "h-12 pl-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
//                                                 errors.expiryDate && "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                             )}
//                                             maxLength={5}
//                                             disabled={loading}
//                                         />
//                                     </div>
//                                     {errors.expiryDate && (
//                                         <p className="text-red-500 text-sm flex items-center gap-1">
//                                             <X className="w-3 h-3" />
//                                             {errors.expiryDate}
//                                         </p>
//                                     )}
//                                 </div>

//                                 <div className="space-y-3">
//                                     <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
//                                         CVV
//                                     </Label>
//                                     <div className="relative">
//                                         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                                         <Input
//                                             id="cvv"
//                                             placeholder="123"
//                                             value={paymentData.cvv}
//                                             onChange={(e) => handleInputChange('cvv', e.target.value)}
//                                             className={cn(
//                                                 "h-12 pl-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
//                                                 errors.cvv && "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                             )}
//                                             maxLength={4}
//                                             disabled={loading}
//                                         />
//                                     </div>
//                                     {errors.cvv && (
//                                         <p className="text-red-500 text-sm flex items-center gap-1">
//                                             <X className="w-3 h-3" />
//                                             {errors.cvv}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Zip Code (Optional) */}
//                             <div className="space-y-3">
//                                 <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
//                                     ZIP Code <span className="text-gray-400 text-xs">(Optional)</span>
//                                 </Label>
//                                 <Input
//                                     id="zipCode"
//                                     placeholder="12345"
//                                     value={paymentData.zipCode}
//                                     onChange={(e) => handleInputChange('zipCode', e.target.value)}
//                                     className={cn(
//                                         "h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
//                                         errors.zipCode && "border-red-500 focus:border-red-500 focus:ring-red-500"
//                                     )}
//                                     disabled={loading}
//                                 />
//                                 {errors.zipCode && (
//                                     <p className="text-red-500 text-sm flex items-center gap-1">
//                                         <X className="w-3 h-3" />
//                                         {errors.zipCode}
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Security Notice */}
//                             <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                                 <div className="flex items-start gap-3">
//                                     <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                                     <div>
//                                         <p className="font-semibold text-green-800 text-sm">Secure Payment</p>
//                                         <p className="text-green-700 text-sm mt-1">
//                                             Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex gap-3 pt-4">
//                                 <Button
//                                     type="button"
//                                     variant="outline"
//                                     onClick={() => onOpenChange(false)}
//                                     className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50"
//                                     disabled={loading}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                                             Processing Payment...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <CreditCard className="w-5 h-5 mr-2" />
//                                             Pay {selectedPlan.price}
//                                         </>
//                                     )}
//                                 </Button>
//                             </div>

//                             {/* Payment Icons */}
//                             <div className="flex justify-center items-center gap-4 pt-4 border-t border-gray-200">
//                                 <div className="text-xs text-gray-500">We accept</div>
//                                 <div className="flex gap-2">
//                                     <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
//                                     <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
//                                     <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">PP</div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };




import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, Lock, CheckCircle, Loader2, X, Shield, Zap, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEmployerStore } from '@/store/employer store/EmployerStore';

interface PaymentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedPlan: TransformedPlan | null;
    onPaymentSuccess?: () => void;
}

interface PaymentData {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
    zipCode?: string;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
    open,
    onOpenChange,
    selectedPlan,
    onPaymentSuccess
}) => {
    const { planSubscriptions } = useEmployerStore();
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentData>({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
        zipCode: ''
    });
    const [errors, setErrors] = useState<Partial<PaymentData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<PaymentData> = {};

        // Card number validation (16 digits)
        if (!paymentData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        // Expiry date validation (MM/YY format)
        if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
            newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
        }

        // CVV validation (3-4 digits)
        if (!paymentData.cvv.match(/^\d{3,4}$/)) {
            newErrors.cvv = 'Please enter a valid CVV';
        }

        // Card holder validation
        if (!paymentData.cardHolder.trim()) {
            newErrors.cardHolder = 'Please enter card holder name';
        }

        // Zip code validation (optional but if provided, validate)
        if (paymentData.zipCode && !paymentData.zipCode.match(/^\d{5}(-\d{4})?$/)) {
            newErrors.zipCode = 'Please enter a valid zip code';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof PaymentData, value: string) => {
        setPaymentData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ').slice(0, 19) : '';
    };

    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 3) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !selectedPlan) {
            return;
        }

        setLoading(true);

        try {
            // Prepare payment data for the API
            const paymentPayload = {
                cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
                expiryDate: paymentData.expiryDate,
                cvv: paymentData.cvv,
                cardHolder: paymentData.cardHolder,
                zipCode: paymentData.zipCode || '',
                last4: paymentData.cardNumber.slice(-4)
            };

            // Call the planSubscriptions function from the store
            const result = await planSubscriptions(paymentPayload, selectedPlan.id);

            if (result?.success) {
                onPaymentSuccess?.();
                onOpenChange(false);
                // Reset form
                setPaymentData({
                    cardNumber: '',
                    expiryDate: '',
                    cvv: '',
                    cardHolder: '',
                    zipCode: ''
                });
            } else {
                throw new Error(result?.message || 'Failed to subscribe to plan');
            }
        } catch (error: any) {
            console.error('Payment failed:', error);
            alert(error.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!selectedPlan) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto p-0 border-0 shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Order Summary */}
                    <div className="bg-gradient-to-br from-secondary-c to-secondary-c/90 text-white p-6 lg:p-8">
                        <DialogHeader className="text-left space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <div>
                                    <DialogTitle className="text-2xl font-bold text-white">
                                        Upgrade to {selectedPlan.name}
                                    </DialogTitle>
                                    <DialogDescription className="text-white/80">
                                        Complete your payment to unlock premium features
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {/* Plan Highlights */}
                        <div className="mt-8 space-y-6">
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-semibold">Order Summary</span>
                                    {selectedPlan.isPopular && (
                                        <Badge className="bg-yellow-400 text-gray-900 hover:bg-yellow-400">
                                            <Star className="w-3 h-3 mr-1" />
                                            Popular
                                        </Badge>
                                    )}
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                                        <span className="text-white/80">Plan</span>
                                        <span className="font-semibold text-lg">{selectedPlan.name}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                                        <span className="text-white/80">Billing Cycle</span>
                                        <span className="font-semibold">
                                            {selectedPlan.period === 'month' ? 'Monthly' : selectedPlan.validityText}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                                        <span className="text-white/80">Amount</span>
                                        <span className="font-semibold text-xl">{selectedPlan.price}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Features Preview */}
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                                <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-300" />
                                    What you'll get:
                                </h4>
                                <ul className="space-y-3">
                                    {selectedPlan.includedFeatures.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-green-300 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-white/90 leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Security Badge */}
                            <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
                                <Shield className="w-4 h-4" />
                                <span>Secure SSL Encryption • 256-bit Security</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Payment Form */}
                    <div className="bg-white p-6 lg:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Payment Details</h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onOpenChange(false)}
                                className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Card Holder */}
                            <div className="space-y-3">
                                <Label htmlFor="cardHolder" className="text-sm font-medium text-gray-700">
                                    Card Holder Name
                                </Label>
                                <Input
                                    id="cardHolder"
                                    placeholder="John Doe"
                                    value={paymentData.cardHolder}
                                    onChange={(e) => handleInputChange('cardHolder', e.target.value)}
                                    className={cn(
                                        "h-12 px-4 border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 transition-colors",
                                        errors.cardHolder && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    )}
                                    disabled={loading}
                                />
                                {errors.cardHolder && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        <X className="w-3 h-3" />
                                        {errors.cardHolder}
                                    </p>
                                )}
                            </div>

                            {/* Card Number */}
                            <div className="space-y-3">
                                <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                                    Card Number
                                </Label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formatCardNumber(paymentData.cardNumber)}
                                        onChange={(e) => handleInputChange('cardNumber', e.target.value.replace(/\s/g, ''))}
                                        className={cn(
                                            "h-12 pl-11 border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 transition-colors",
                                            errors.cardNumber && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                        )}
                                        maxLength={19}
                                        disabled={loading}
                                    />
                                </div>
                                {errors.cardNumber && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        <X className="w-3 h-3" />
                                        {errors.cardNumber}
                                    </p>
                                )}
                            </div>

                            {/* Expiry & CVV */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <Label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
                                        Expiry Date
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="expiryDate"
                                            placeholder="MM/YY"
                                            value={formatExpiryDate(paymentData.expiryDate)}
                                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                            className={cn(
                                                "h-12 pl-11 border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 transition-colors",
                                                errors.expiryDate && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                            )}
                                            maxLength={5}
                                            disabled={loading}
                                        />
                                    </div>
                                    {errors.expiryDate && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="w-3 h-3" />
                                            {errors.expiryDate}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                                        CVV
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="cvv"
                                            placeholder="123"
                                            value={paymentData.cvv}
                                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                                            className={cn(
                                                "h-12 pl-11 border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 transition-colors",
                                                errors.cvv && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                            )}
                                            maxLength={4}
                                            disabled={loading}
                                        />
                                    </div>
                                    {errors.cvv && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            <X className="w-3 h-3" />
                                            {errors.cvv}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Zip Code (Optional) */}
                            <div className="space-y-3">
                                <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                                    ZIP Code <span className="text-gray-400 text-xs">(Optional)</span>
                                </Label>
                                <Input
                                    id="zipCode"
                                    placeholder="12345"
                                    value={paymentData.zipCode}
                                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                                    className={cn(
                                        "h-12 border-gray-300 focus:border-secondary-c focus:ring-secondary-c/20 transition-colors",
                                        errors.zipCode && "border-red-500 focus:border-red-500 focus:ring-red-500"
                                    )}
                                    disabled={loading}
                                />
                                {errors.zipCode && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        <X className="w-3 h-3" />
                                        {errors.zipCode}
                                    </p>
                                )}
                            </div>

                            {/* Security Notice */}
                            <div className="bg-secondary-c/10 border border-secondary-c/20 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <Shield className="w-5 h-5 text-secondary-c mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-secondary-c text-sm">Secure Payment</p>
                                        <p className="text-secondary-c/80 text-sm mt-1">
                                            Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 h-12 bg-secondary-c hover:bg-secondary-c/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Pay {selectedPlan.price}
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Payment Icons */}
                            <div className="flex justify-center items-center gap-4 pt-4 border-t border-gray-200">
                                <div className="text-xs text-gray-500">We accept</div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                                    <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                                    <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">PP</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};