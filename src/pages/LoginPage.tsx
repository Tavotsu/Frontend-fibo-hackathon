import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContent } from '../components/templates/LoginContent';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <LoginContent
            onLoginSuccess={() => navigate('/app')}
            onBack={() => navigate('/')}
            onNavigateSignup={() => navigate('/signup')}
            onForgotPassword={() => navigate('/forgot-password')}
        />
    );
};
