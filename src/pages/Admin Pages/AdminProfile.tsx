// AdminProfile.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    Loader2,
    Mail,
    User,
    Shield,
    Camera,
    Save,
    Key,
    Info,
    CheckCircle2,
    Upload,
    X,
    Trash2,
    AlertCircle,
    RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { auth, db } from "@/firebase";
import {
    doc,
    getDoc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore';
import {
    updateProfile,
    updateEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    sendEmailVerification,
    verifyBeforeUpdateEmail
} from 'firebase/auth';

// Define the admin data interface
interface AdminData {
    uid: string;
    email: string;
    fullName: string;
    role: string;
    rolePosition: string;
    profilePhoto?: string | null;
    createdAt: string;
    updatedAt: string;
}

// Validation schemas
const profileSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    rolePosition: z.string().min(1, 'Role position is required'),
});

const emailSchema = z.object({
    newEmail: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password is required'),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

// Function to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

// Function to compress image and reduce Base64 size
const compressImage = async (base64String: string, maxWidth = 400, maxHeight = 400, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64String;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // Fill white background for transparent images
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // Draw image
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to JPEG with quality
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

            resolve(compressedBase64);
        };

        img.onerror = () => {
            resolve(base64String);
        };
    });
};

const AdminProfile = () => {
    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [pendingEmail, setPendingEmail] = useState();
    const { currentUser } = useAuth();
    // console.log(currentUser)
    // Forms
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: '',
            rolePosition: '',
        },
    });

    const emailForm = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            newEmail: '',
            password: '',
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    // Fetch admin data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const user = currentUser;
                if (!user) {
                    throw new Error('No authenticated user found');
                }

                const adminDoc = await getDoc(doc(db, 'users', user.uid));

                if (adminDoc.exists()) {
                    const data = adminDoc.data() as AdminData;
                    setAdminData(data);

                    profileForm.reset({
                        fullName: data.fullName || '',
                        rolePosition: data.rolePosition || '',
                    });
                } else {
                    toast.error('Admin profile not found');
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
                toast.error('Failed to load admin profile');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    // Handle image selection
    const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error('Image size too large. Maximum 2MB allowed.');
                return;
            }

            // Check file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                toast.error('Please select an image file (JPEG, PNG, WebP)');
                return;
            }

            setImageFile(file);

            try {
                toast.info('Processing image...');

                // Convert to base64 and compress
                const base64 = await fileToBase64(file);
                const compressedBase64 = await compressImage(base64, 400, 400, 0.7);

                setSelectedImage(compressedBase64);
                toast.success('Image ready for upload');
            } catch (error) {
                console.error('Error processing image:', error);
                toast.error('Failed to process image');
                setImageFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    // Handle image upload
    const handleImageUpload = async () => {
        if (!selectedImage || !adminData?.uid) return;

        setUploadingImage(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user');

            // Store only in Firestore, not in Firebase Auth
            await updateDoc(doc(db, 'users', adminData.uid), {
                profilePhoto: selectedImage, // Store complete Base64 string
                updatedAt: serverTimestamp(),
            });

            // Update local state
            setAdminData(prev => prev ? { ...prev, profilePhoto: selectedImage } : null);

            toast.success('Profile image updated successfully', {
                description: 'Your image has been saved to the database.',
            });

            // Reset image states
            setSelectedImage(null);
            setImageFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error: any) {
            console.error('Error uploading image:', error);

            if (error.message?.includes('too long') || error.code === 'firestore/invalid-argument') {
                toast.error('Image is too large for storage. Please choose a smaller image.');
            } else {
                toast.error('Failed to update profile image');
            }
        } finally {
            setUploadingImage(false);
        }
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.info('Image selection cancelled');
    };

    // Remove existing profile photo
    const handleRemoveProfilePhoto = async () => {
        if (!adminData?.uid) return;

        setUpdating(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user');

            // Update Firestore only
            await updateDoc(doc(db, 'users', adminData.uid), {
                profilePhoto: null,
                updatedAt: serverTimestamp(),
            });

            // Update local state
            setAdminData(prev => prev ? { ...prev, profilePhoto: null } : null);

            toast.success('Profile image removed', {
                description: 'Your profile picture has been reset to default.',
            });
        } catch (error) {
            console.error('Error removing profile photo:', error);
            toast.error('Failed to remove profile image');
        } finally {
            setUpdating(false);
        }
    };

    // Update profile information
    const onProfileSubmit = async (data: ProfileFormValues) => {
        setUpdating(true);
        try {
            const user = auth.currentUser;
            if (!user || !adminData) throw new Error('No authenticated user');

            // Update Firestore
            await updateDoc(doc(db, 'users', adminData.uid), {
                fullName: data.fullName,
                rolePosition: data.rolePosition,
                updatedAt: serverTimestamp(),
            });

            // Update Firebase Auth profile (display name only)
            await updateProfile(user, {
                displayName: data.fullName,
            });

            // Update local state
            setAdminData(prev => prev ? {
                ...prev,
                fullName: data.fullName,
                rolePosition: data.rolePosition
            } : null);

            toast.success('Profile updated', {
                description: "Your changes have been saved successfully.",
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    // Update the email submit function
    const onEmailSubmit = async (data: EmailFormValues) => {
        setUpdating(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('No authenticated user');

            // Reauthenticate user first
            const credential = EmailAuthProvider.credential(
                user.email!,
                data.password
            );
            await reauthenticateWithCredential(user, credential);

            // Use verifyBeforeUpdateEmail - sends verification to NEW email only
            await verifyBeforeUpdateEmail(user, data.newEmail);

            // Store pending email in state
            setPendingEmail(data.newEmail);

            // Reset form
            emailForm.reset();

            toast.success('Verification email sent', {
                description: `Please check ${data.newEmail} and click the verification link to change your email.`,
                duration: 10000,
                action: {
                    label: 'Resend',
                    onClick: () => {
                        verifyBeforeUpdateEmail(user, data.newEmail)
                            .then(() => toast.info('Verification email resent'))
                            .catch(err => toast.error('Failed to resend'));
                    },
                },
            });

        } catch (error: any) {
            console.error('Error updating email:', error);

            switch (error.code) {
                case 'auth/requires-recent-login':
                    toast.error('Security verification required. Please sign in again.');
                    break;
                case 'auth/email-already-in-use':
                    toast.error('This email is already registered with another account.');
                    break;
                case 'auth/invalid-email':
                    toast.error('Please enter a valid email address.');
                    break;
                case 'auth/operation-not-allowed':
                    // If this error still occurs, we need to check Firebase project settings
                    toast.error('Email change is not enabled. Please contact support.');
                    break;
                default:
                    toast.error(error.message || 'Failed to send verification email');
            }
        } finally {
            setUpdating(false);
        }
    };

    // Function to check if email was updated after verification
    const checkEmailUpdateStatus = async () => {
        try {
            const user = auth.currentUser;
            if (!user || !pendingEmail) return;

            // Reload user to get latest email
            await user.reload();

            // Check if email has been updated
            if (user.email === pendingEmail) {
                // Update Firestore
                await updateDoc(doc(db, 'users', user.uid), {
                    email: user.email,
                    updatedAt: serverTimestamp(),
                });

                // Update local state
                setAdminData(prev => prev ? {
                    ...prev,
                    email: user.email!
                } : null);

                // Clear pending email
                setPendingEmail(null);

                toast.success('Email updated successfully!', {
                    description: 'Your email has been changed.',
                });

                return true;
            }

            toast.info('Email not changed yet', {
                description: 'Please click the verification link sent to your new email.',
            });
            return false;

        } catch (error) {
            console.error('Error checking email status:', error);
            toast.error('Failed to check email status');
            return false;
        }
    };

    // Add to useEffect to check on component mount
    useEffect(() => {
        const checkEmailOnMount = async () => {
            if (currentUser && pendingEmail) {
                await checkEmailUpdateStatus();
            }
        };

        checkEmailOnMount();
    }, [currentUser]);

    // Update password
    const onPasswordSubmit = async (data: PasswordFormValues) => {
        setUpdating(true);
        try {
            const user = auth.currentUser;
            if (!user || !user.email) throw new Error('No authenticated user');

            // Reauthenticate user
            const credential = EmailAuthProvider.credential(
                user.email,
                data.currentPassword
            );
            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, data.newPassword);

            passwordForm.reset();
            toast.success('Password updated', {
                description: 'Your password has been changed successfully.',
            });
        } catch (error: any) {
            console.error('Error updating password:', error);
            if (error.code === 'auth/requires-recent-login') {
                toast.error('Please sign in again to update your password');
            } else {
                toast.error(error.message || 'Failed to update password');
            }
        } finally {
            setUpdating(false);
        }
    };

    // Get the image source for Avatar component
    const getImageSrc = () => {
        if (selectedImage) {
            return selectedImage; // Use selected image preview
        }
        if (adminData?.profilePhoto) {
            return adminData.profilePhoto; // Use stored Base64 from Firestore
        }
        return undefined; // Fallback to initials
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Avatar fallback initials
    const getInitials = () => {
        if (!adminData?.fullName) return 'AD';
        return adminData.fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (!adminData) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <div className="h-12 w-12 mx-auto rounded-full bg-secondary/20 flex items-center justify-center">
                                <User className="h-6 w-6 text-secondary" />
                            </div>
                            <p className="text-muted-foreground">No admin data found</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className=" mx-auto  space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative group">
                    <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-white shadow-lg">
                        <AvatarImage
                            src={getImageSrc()}
                            alt={adminData.fullName}
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-secondary to-secondary/80 text-black">
                            {getInitials()}
                        </AvatarFallback>
                    </Avatar>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
                        aria-label="Change profile image"
                    >
                        <Camera className="h-6 w-6 text-white" />
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                        aria-label="Upload profile image"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{adminData.fullName}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge className="bg-secondary text-secondary-foreground">
                                <Shield className="h-3 w-3 mr-1" />
                                {adminData.role}
                            </Badge>
                            <Badge variant="outline">{adminData.rolePosition}</Badge>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{adminData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span className="text-muted-foreground">Account active since {formatDate(adminData.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Upload Section (if image selected) */}
            {selectedImage && (
                <Card className="border-secondary/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">New Profile Image Preview</CardTitle>
                        <CardDescription>
                            Review your new profile image before saving
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-lg overflow-hidden border-2 border-secondary">
                                    <img
                                        src={selectedImage}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                {imageFile && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        onClick={handleImageUpload}
                                        disabled={uploadingImage}
                                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                    >
                                        {uploadingImage ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Image
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={handleRemoveImage}
                                        disabled={uploadingImage}
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Image will be stored as Base64 format in Firestore
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Separator />

            {/* Profile Form */}
            <Card className="border-secondary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Edit Profile
                    </CardTitle>
                    <CardDescription>
                        Update your personal information, role position, and profile image
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Image Upload Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-medium mb-1">Profile Image</h3>
                                <p className="text-xs text-muted-foreground">
                                    Upload a new profile image (JPG, PNG, WebP, max 2MB)
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={!!selectedImage}
                                >
                                    <Camera className="h-4 w-4 mr-2" />
                                    Change Image
                                </Button>

                                {adminData.profilePhoto && !selectedImage && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRemoveProfilePhoto}
                                        disabled={updating || uploadingImage}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {adminData.profilePhoto && !selectedImage && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <AlertCircle className="h-3 w-3" />
                                <span>Current image is stored as Base64 data URL</span>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Profile Form Fields */}
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={profileForm.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your full name"
                                                    className="bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={profileForm.control}
                                    name="rolePosition"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Role Position</FormLabel>
                                                <div className="flex items-center gap-1 text-xs text-secondary">
                                                    <Info className="h-3 w-3" />
                                                    <span>Visible to users</span>
                                                </div>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter your role position"
                                                    className="bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        profileForm.reset({
                                            fullName: adminData.fullName || '',
                                            rolePosition: adminData.rolePosition || '',
                                        });
                                        handleRemoveImage();
                                    }}
                                    disabled={updating || uploadingImage}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={updating || uploadingImage}
                                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                >
                                    {updating || uploadingImage ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Email Update Card */}
                <Card className="border-secondary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Change Email Address
                        </CardTitle>
                        <CardDescription>
                            {pendingEmail ? (
                                <div className="space-y-2">
                                    <p>Verification sent to {pendingEmail}</p>
                                    <p className="text-sm text-secondary">
                                        Click the verification link in the new email to complete the change.
                                    </p>
                                </div>
                            ) : (
                                'Enter new email address. Verification link will be sent to the new email.'
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pendingEmail ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-secondary/10 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="h-5 w-5 text-secondary mt-0.5" />
                                        <div className="space-y-2">
                                            <h4 className="font-medium">Check Your New Email</h4>
                                            <p className="text-sm text-muted-foreground">
                                                We sent a verification link to <strong>{pendingEmail}</strong>.
                                                Click the link in that email to confirm your new email address.
                                            </p>
                                            <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                                                <li>• Check your spam folder if you don't see the email</li>
                                                <li>• The link expires in 24 hours</li>
                                                <li>• Your email will update automatically after verification</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        onClick={checkEmailUpdateStatus}
                                        className="flex-1 bg-secondary hover:bg-secondary/90"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Check Update Status
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setPendingEmail(null);
                                            emailForm.reset();
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </div>

                                <Button
                                    onClick={async () => {
                                        try {
                                            const user = auth.currentUser;
                                            if (user && pendingEmail) {
                                                await verifyBeforeUpdateEmail(user, pendingEmail);
                                                toast.success('Verification email resent');
                                            }
                                        } catch (error) {
                                            toast.error('Failed to resend verification');
                                        }
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="w-full"
                                >
                                    <RefreshCw className="h-3 w-3 mr-2" />
                                    Resend verification email
                                </Button>
                            </div>
                        ) : (
                            <Form {...emailForm}>
                                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                                    <div className="space-y-2">
                                        <FormField
                                            control={emailForm.control}
                                            name="newEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="new@example.com"
                                                            {...field}
                                                            className="bg-background"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={emailForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Current Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            {...field}
                                                            className="bg-background"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-xs">
                                                        For security verification
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-blue-600" />
                                            <p className="text-sm text-blue-700">
                                                Verification link will be sent to the new email address only.
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={updating}
                                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                    >
                                        {updating ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Sending Verification...
                                            </>
                                        ) : (
                                            'Send Verification to New Email'
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>

                {/* Password Update */}
                <Card className="border-secondary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Change Password
                        </CardTitle>
                        <CardDescription>
                            Set a new password for your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...passwordForm}>
                            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                                <FormField
                                    control={passwordForm.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={passwordForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="bg-background"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={updating}
                                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                                >
                                    {updating ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        'Update Password'
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default AdminProfile;












