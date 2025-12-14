import React, { useState } from 'react';
import { ArrowLeft, Loader2, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/actions/Button';

interface LoginContentProps {
    onLoginSuccess: () => void;
    onBack: () => void;
    // onNavigateSignup is optional now as we use Link directly for robust navigation
    onNavigateSignup?: () => void;
}

export const LoginContent: React.FC<LoginContentProps> = ({
    onLoginSuccess,
    onBack,
    onNavigateSignup
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate auth delay
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-gradient-to-b from-primary/10 to-transparent blur-[120px] opacity-50" />
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
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
                            <Lock className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                        <p className="text-zinc-400 text-sm mt-1">Sign in to your BrandAI account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full h-10 bg-zinc-950/50 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none"
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
                                    placeholder="••••••••"
                                    className="w-full h-10 bg-zinc-950/50 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-zinc-400 transition-colors">
                                <input type="checkbox" className="rounded bg-zinc-800 border-zinc-700 text-primary focus:ring-0" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="hover:text-primary transition-colors">Forgot password?</a>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 mt-4 text-base font-medium shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
                                </span>
                            ) : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-zinc-500">
                        Don't have an account?
                        <button
                            type="button"
                            className="text-blue-500 font-bold hover:text-blue-400 hover:underline ml-1 relative z-50 pointer-events-auto cursor-pointer bg-transparent border-none p-2 -my-2 inline-flex items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onNavigateSignup) onNavigateSignup();
                            }}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};
