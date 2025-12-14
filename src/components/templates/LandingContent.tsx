import React, { useState } from 'react';
import { ArrowRight, Aperture, Youtube, Zap, Monitor, ChevronLeft } from 'lucide-react';
import { Button } from '../atoms/actions/Button';

interface LandingContentProps {
    onNavigateLogin: () => void;
    onNavigateSignup: () => void;
    // For mobile swipe
    swipeHandlers?: any;
    isExiting?: boolean;
}

export const LandingContent: React.FC<LandingContentProps> = ({
    onNavigateLogin,
    onNavigateSignup,
    swipeHandlers,
    // isExiting prop is no longer used for internal transform, 
    // but kept in signature if needed for other visual cues or until cleaned up
    isExiting = false
}) => {
    return (
        <div
            className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 relative overflow-hidden flex flex-col touch-none"
            {...swipeHandlers}
        >

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[120px] mix-blend-screen" />
            </div>

            {/* Navbar */}
            <nav className="relative z-10 w-full px-6 py-6 flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg shadow-lg shadow-blue-500/20">
                        <Aperture className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">BrandAI</span>
                </div>
                <div className="flex items-center gap-4 hidden md:flex">
                    <Button
                        variant="ghost"
                        onClick={onNavigateLogin}
                        className="text-zinc-300 hover:text-white font-medium"
                    >
                        Sign In
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto mt-10 md:mt-20 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-700 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-medium text-zinc-200 tracking-wide">Next Gen AI Product Branding</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 pb-2 animate-in fade-in zoom-in-95 duration-1000 text-white">
                    Intelligent Branding for<br /> <span className="text-blue-500">Modern Products.</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    Elevate your product identity with AI. Generate consistent, high-fidelity marketing assets
                    tailored to your brand's unique voice and aesthetic in seconds.
                </p>

                {/* Desktop Buttons */}
                <div className="hidden md:flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Button
                        size="lg"
                        onClick={onNavigateSignup}
                        className="h-14 px-8 text-lg rounded-full shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary),0.5)] transition-all duration-300 bg-white text-black hover:bg-zinc-200 border-none font-bold"
                    >
                        Start Branding Free
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="h-14 px-8 text-lg rounded-full text-zinc-400 hover:text-zinc-200"
                    >
                        <Youtube className="w-5 h-5 mr-2" />
                        See Examples
                    </Button>
                </div>

                {/* Mobile Swipe to Login Indicator */}
                <div className="md:hidden flex flex-col items-center gap-2 mt-8 animate-pulse">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30">
                        <ChevronLeft className="w-8 h-8 text-blue-500 animate-bounce-left" />
                    </div>
                    <span className="text-sm font-medium text-blue-400 tracking-wider uppercase">Swipe Left to Log In</span>
                </div>

                {/* Feature Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    {[
                        { icon: Zap, title: "Smart Product Placement", desc: "Instantly visualize your product in any environment with photorealistic lighting." },
                        { icon: Monitor, title: "Brand Identity Control", desc: "Maintain perfect consistency across all generated assets with our RAG engine." },
                        { icon: Aperture, title: "Infinite Creative Variations", desc: "Generate thousands of on-brand marketing creatives from a single product shot." }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md hover:bg-zinc-900/80 transition-colors text-left group hover:border-zinc-700">
                            <div className="w-12 h-12 rounded-lg bg-zinc-800/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-zinc-700">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-zinc-300">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="w-full text-center py-8 text-zinc-600 text-xs z-10">
                © 2025 Marketech Inc. All rights reserved.
            </footer>
        </div>
    );
};
