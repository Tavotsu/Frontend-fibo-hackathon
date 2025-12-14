import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpContent } from '../components/templates/SignUpContent';

export const SignUpPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <SignUpContent
            onBack={() => navigate('/')}
            onNavigateLogin={() => navigate('/login')}
            onSignUpSuccess={() => navigate('/app')}
        />
    );
};
