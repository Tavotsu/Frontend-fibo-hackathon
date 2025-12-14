import React, { useState } from 'react';
import { ArrowLeft, Loader2, Mail, Key } from 'lucide-react';
import { Button } from '../atoms/actions/Button';

interface ForgotPasswordContentProps {
    onBack: () => void;
    onResetSuccess: () => void;
}

export const ForgotPasswordContent: React.FC<ForgotPasswordContentProps> = ({
    onBack,
    onResetSuccess
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onResetSuccess();
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
                <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>

            <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
                            <Key className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
                        <p className="text-zinc-400 text-sm mt-1 text-center">Enter your email and we'll send you instructions to reset your password.</p>
                    </div>

                    <form onSubmit={handleReset} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full h-10 bg-zinc-950/50 border border-zinc-800 rounded-lg pl-10 pr-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 mt-4 text-base font-medium shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Sending link...
                                </span>
                            ) : "Send Reset Link"}
                        </Button>
                    </form>
                </div>
            </div>

        </div>
    );
};
