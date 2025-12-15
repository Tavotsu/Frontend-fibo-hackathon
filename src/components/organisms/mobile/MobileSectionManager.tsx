
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingContent } from '../../templates/LandingContent';
import { LoginContent } from '../../templates/LoginContent';
import { SignUpContent } from '../../templates/SignUpContent';
import { ForgotPasswordContent } from '../../templates/ForgotPasswordContent';
import { HomePage } from '../../../pages/HomePage'; // Importing HomePage as App Content
import { useSwipe } from '../../../hooks/useSwipe';

export const MobileSectionManager: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<'landing' | 'login' | 'signup' | 'forgot-password' | 'app'>('landing');

    // Swipe handlers attached to the slider container or specific areas
    const swipeHandlers = useSwipe({
        onSwipeLeft: () => {
            if (activeSection === 'landing') {
                setActiveSection('login');
            }
        },
        onSwipeRight: () => {
            if (activeSection === 'login') {
                setActiveSection('landing');
            }
        },
        threshold: 50
    });

    const handleLoginSuccess = () => {
        setActiveSection('app');
    };

    if (activeSection === 'app') {
        return (
            <div className="animate-in fade-in duration-500 w-full h-full absolute inset-0 z-50">
                <HomePage />
            </div>
        );
    }

    if (activeSection === 'signup') {
        return (
            <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full absolute inset-0 z-50 bg-zinc-950">
                <SignUpContent
                    onBack={() => setActiveSection('landing')}
                    onNavigateLogin={() => setActiveSection('login')}
                    onSignUpSuccess={handleLoginSuccess}
                />
            </div>
        );
    }

    if (activeSection === 'forgot-password') {
        return (
            <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full absolute inset-0 z-50 bg-zinc-950">
                <ForgotPasswordContent
                    onBack={() => setActiveSection('login')}
                    onResetSuccess={() => {
                        setActiveSection('login');
                    }}
                />
            </div>
        );
    }

    return (
        <div className="w-full h-screen overflow-hidden relative" {...swipeHandlers}>
            {/* Slider Container: 200% width for 2 screens side-by-side */}
            <div
                className="w-[200%] h-full flex transition-transform duration-200 ease-out"
                style={{
                    transform: activeSection === 'login' ? 'translateX(-50%)' : 'translateX(0)'
                }}
            >
                {/* Landing Section (First 50%) */}
                <div className="w-1/2 h-full relative">
                    <LandingContent
                        onNavigateLogin={() => setActiveSection('login')}
                        onNavigateSignup={() => setActiveSection('signup')}
                        swipeHandlers={null} // Handled by wrapper
                        isExiting={false} // Deprecated prop, kept for interface compat or remove later
                    />
                </div>

                {/* Login Section (Second 50%) */}
                <div className="w-1/2 h-full relative">
                    <LoginContent
                        onLoginSuccess={handleLoginSuccess}
                        onBack={() => setActiveSection('landing')}
                        onNavigateSignup={() => setActiveSection('signup')}
                        onForgotPassword={() => setActiveSection('forgot-password')}
                    />
                </div>
            </div>
        </div>
    );
};

