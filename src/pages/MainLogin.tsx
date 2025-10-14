import GoogleLogin from '@/components/GoogleLogin';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const MainLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = await login(email, password);
            const token = await user.getIdToken();
            localStorage.setItem("token", token);

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                const role = userData.role || "recruiter";

                localStorage.setItem("role", role);

                toast.success("Login successful! Welcome back");

                setTimeout(() => {
                    if (role === "recruiter") {
                        navigate("/employer");
                    } else {
                        navigate("/candidate");
                    }
                }, 500);
            } else {
                toast.error("User data not found in database.");
            }
        } catch (err: any) {
            console.error("Login error:", err);

            if (err.code === "auth/user-not-found") {
                toast.error("No account found with this email.");
            } else if (err.code === "auth/wrong-password") {
                toast.error("Incorrect password. Please try again.");
            } else if (err.code === "auth/invalid-email") {
                toast.error("Invalid email address.");
            } else if (err.code === "auth/too-many-requests") {
                toast.error("Too many login attempts. Please try again later.");
            } else {
                toast.error("Failed to login. Please try again." || err.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex gap-8 justify-evenly w-full">
            {/* <AppSidebar /> */}
            <div className="w-[100%]">
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50">
                    <div className="w-full max-w-md">
                        <form
                            onSubmit={handleLogin}
                            className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-primary-c rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-primary-c-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-primary-c mb-2">
                                    Welcome Back
                                </h2>
                                <p className="text-muted-c-foreground">Sign in to continue to your account</p>
                            </div>

                            {/* Email Input */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold mb-2 text-primary-c">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full border border-border-c p-3 rounded-lg focus:ring-1 focus:ring-secondary-c focus:border-secondary-c outline-none transition-all bg-white text-primary-c"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2 text-primary-c">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full border border-border-c p-3 rounded-lg focus:ring-1 focus:ring-secondary-c focus:border-secondary-c outline-none transition-all pr-12 bg-white text-primary-c"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-c-foreground hover:text-primary-c"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right mb-6">
                                <Link to="/forget-password" className="text-sm text-secondary-c hover:text-secondary-c-hover hover:underline font-medium">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-secondary-c text-secondary-c-foreground py-3 rounded-lg hover:bg-secondary-c-hover transition duration-200 font-semibold shadow-lg hover:shadow-xl disabled:bg-muted-c disabled:cursor-not-allowed disabled:text-secondary-c flex items-center justify-center"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border border-white border-t-transparent rounded-full animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-border-c"></div>
                                <span className="px-4 text-sm text-muted-c-foreground">or</span>
                                <div className="flex-1 border-t border-border-c"></div>
                            </div>
                            <GoogleLogin />
                            {/* Sign Up Link */}
                            <p className="text-center text-sm text-muted-c-foreground my-2">
                                Don't have an account?{" "}
                                <a
                                    href="/signup"
                                    className="text-secondary-c hover:text-secondary-c-hover font-semibold hover:underline"
                                >
                                    Create Account
                                </a>
                            </p>

                        </form>

                        {/* Footer */}
                        <p className="text-center text-xs text-muted-c-foreground mt-6">
                            By signing in, you agree to our{" "}
                            <a href="#" className="text-secondary-c hover:underline">Terms of Service</a>
                            {" "}and{" "}
                            <a href="#" className="text-secondary-c hover:underline">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLogin
