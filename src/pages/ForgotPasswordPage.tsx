import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordContent } from '../components/templates/ForgotPasswordContent';

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <ForgotPasswordContent
            onBack={() => navigate('/login')}
            onResetSuccess={() => {
                // Could show a toast or navigate to a "check email" page
                // For now, let's just go back to login with maybe a query param or state if we had a toast system
                // but simpler for now:
                alert("If an account exists, a reset link has been sent.");
                navigate('/login');
            }}
        />
    );
};
