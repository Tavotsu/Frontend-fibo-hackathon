import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Lock, Mail, User } from 'lucide-react';
import { Button } from '../atoms/actions/Button';

interface SignUpContentProps {
    onBack: () => void;
    onNavigateLogin: () => void;
    onSignUpSuccess: () => void;
}

export const SignUpContent: React.FC<SignUpContentProps> = ({
    onBack,
    onNavigateLogin,
    onSignUpSuccess
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate auth delay
        setTimeout(() => {
            setIsLoading(false);
            onSignUpSuccess();
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-b from-blue-600/10 to-transparent blur-[120px] opacity-50" />
            </div>

            <button
                onClick={onBack}
                className="absolute top-6 left-6 text-zinc-500 hover:text-white flex items-center gap-2 transition-colors z-20"
            >
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-primary rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
                        <p className="text-zinc-400 text-sm mt-1">Join BrandAI today</p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    className="w-full h-10 bg-zinc-950/50 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full h-10 bg-zinc-950/50 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Create a password"
                                    className="w-full h-10 bg-zinc-950/50 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="text-xs text-zinc-500 pt-2">
                            By creating an account, you agree to our <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a> and <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>.
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 mt-4 text-base font-medium shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-500"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                                </span>
                            ) : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-zinc-500">
                        {/* Modified Link to span for callback usage or allow Link if using router on desktop */}
                        Already have an account?
                        <span
                            className="text-blue-500 hover:underline cursor-pointer ml-1"
                            onClick={onNavigateLogin}
                        >
                            Sign In
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};
