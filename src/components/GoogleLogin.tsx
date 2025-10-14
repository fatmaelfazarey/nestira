import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
import { toast } from "sonner";

type GoogleLoginProps = {
    role?: "candidate" | "employer" | null;
};


export default function GoogleLogin({ role = null }: GoogleLoginProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const saveTokenToStorage = async (user: any) => {
        try {
            const token = await user.getIdToken();
            localStorage.setItem("token", token);
            console.log("Token saved to localStorage");
        } catch (tokenError) {
            console.error("Error saving token:", tokenError);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;

            // Save token to localStorage
            await saveTokenToStorage(user);

            // Check if user exists in Firestore
            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            // const token = await userCred.user.getIdToken();
            // localStorage.setItem("token", token);


            if (!role) {
                if (userSnapshot.exists()) {
                    // Existing user → redirect by role from Firestore
                    const userData = userSnapshot.data();
                    const userRole = userData.role;

                    console.log("Existing user role:", userRole);

                    switch (userRole) {
                        case "candidate":
                            localStorage.setItem("role", userRole);
                            toast.success("Login successful! Welcome back");
                            navigate("/candidate");
                            break;
                        case "recruiter":
                            localStorage.setItem("role", userRole);
                            toast.success("Login successful! Welcome back");
                            navigate("/employer");
                            break;
                        default:
                            navigate("/"); // Fallback for users with no role or invalid role
                    }
                } else {
                    toast.error("You don’t have an account yet. Please create your account to continue");
                    navigate("/signup");
                }
            }
            else {
                // New user → create user document
                if (role === 'candidate') {
                    // If role is provided via prop, use it
                    await setDoc(userRef, {
                        basicInfo: {
                            businessEmail: "",
                            email: user.email,
                            fullName: user.displayName,
                            phone: '',
                            photoURL: user.photoURL,
                        },
                        role: role,
                        createdAt: new Date(),
                        uid: user.uid,
                        email: user.email,
                    });

                    console.log("New user created with role:", role);
                    localStorage.setItem("role", role);
                    toast.success("Login successful! Welcome back");

                    navigate("/candidate/profile");

                } else if (role === 'employer') {
                    // If role is provided via prop, use it
                    await setDoc(userRef, {
                        personalInfo: {
                            businessEmail: user.email,
                            email: user.email,
                            fullName: user.displayName,
                            phone: '',
                            profilePhoto: user.photoURL,
                        },
                        role: 'recruiter',
                        createdAt: new Date(),
                        uid: user.uid,
                        email: user.email,
                    });

                    console.log("New user created with role:", role);
                    console.log("New user created with role:", role);
                    localStorage.setItem("role", 'recruiter');

                    navigate("/employer/profile-settings");
                } else {
                    // If no role is provided for new user, redirect to role selection
                    console.log("New user - no role provided, redirecting to role selection");
                    navigate("/");
                }
            }
        } catch (error: any) {
            console.error("Google login error:", error);

            // Handle specific error cases
            if (error.code === 'auth/popup-closed-by-user') {
                setError("Login cancelled");
            } else if (error.code === 'auth/popup-blocked') {
                setError("Popup was blocked by your browser. Please allow popups for this site.");
            } else if (error.code === 'auth/unauthorized-domain') {
                setError("This domain is not authorized for Google login.");
            } else {
                setError("Failed to sign in with Google. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[400px] mx-auto">
            <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full border border-secondary-c text-secondary-c py-3 rounded-lg transition duration-200 font-semibold disabled:bg-muted-c disabled:cursor-not-allowed disabled:text-secondary-c flex items-center justify-center gap-2 hover:bg-secondary-c hover:text-white"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Signing in...
                    </>
                ) : (
                    <>
                        <GoogleIcon />
                        Sign in with Google
                    </>
                )}
            </button>

            {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
        </div>
    );
}

// Simple Google icon component
const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);