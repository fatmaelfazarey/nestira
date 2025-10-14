import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const { resetPassword } = useAuth();
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(email);
            toast.success("Reset email sent successfully");
            console.log("Reset email sent successfully");
        } catch (error) {
            console.error("Error sending reset email:", error);
            toast.error("Error sending reset email:");
        }
    }
    return (
        <div className="flex gap-8 justify-evenly w-full">

            <div className="w-[100%]">
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50">
                    <div className="w-full max-w-md">
                        <form
                            onSubmit={handleReset}
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
                                    Reset Password
                                </h2>
                                <p className="text-muted-c-foreground">Enter your email to continue resetting your password</p>
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





                            {/* Login Button */}
                            <button
                                type="submit"

                                className="w-full bg-secondary-c text-secondary-c-foreground py-3 rounded-lg hover:bg-secondary-c-hover transition duration-200 font-semibold shadow-lg hover:shadow-xl disabled:bg-muted-c disabled:cursor-not-allowed disabled:text-secondary-c flex items-center justify-center"
                            >
                                Reset
                            </button>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-border-c"></div>
                                <span className="px-4 text-sm text-muted-c-foreground">or</span>
                                <div className="flex-1 border-t border-border-c"></div>
                            </div>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm text-muted-c-foreground">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-secondary-c hover:text-secondary-c-hover font-semibold hover:underline"
                                >
                                    Create Account
                                </Link>
                            </p>
                            <p className="text-center text-sm text-muted-c-foreground">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-secondary-c hover:text-secondary-c-hover font-semibold hover:underline"
                                >
                                    Login
                                </Link>
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

export default ForgetPassword
