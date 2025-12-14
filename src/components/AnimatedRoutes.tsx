import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HomePage } from '../pages/HomePage';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-zinc-950"
        >
            {children}
        </motion.div>
    );
};

export const AnimatedRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <LandingPage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PageTransition>
                            <LoginPage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <PageTransition>
                            <ForgotPasswordPage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PageTransition>
                            <SignUpPage />
                        </PageTransition>
                    }
                />
                <Route
                    path="/app"
                    element={
                        <PageTransition>
                            <HomePage />
                        </PageTransition>
                    }
                />
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};
