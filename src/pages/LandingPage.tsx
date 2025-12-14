import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingContent } from '../components/templates/LandingContent';
import { MobileSectionManager } from '../components/organisms/mobile/MobileSectionManager';
import { useSwipe } from '../hooks/useSwipe';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isExiting, setIsExiting] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const swipeHandlers = useSwipe({
        onSwipeLeft: () => {
            if (!isMobile) {
                // Desktop Swipe Logic if any (optional)
                setIsExiting(true);
                setTimeout(() => {
                    navigate('/login');
                }, 300);
            }
        },
        threshold: 50
    });

    if (isMobile) {
        return <MobileSectionManager />;
    }

    return (
        <LandingContent
            onNavigateLogin={() => navigate('/login')}
            onNavigateSignup={() => navigate('/signup')}
            swipeHandlers={swipeHandlers}
            isExiting={isExiting}
        />
    );
};
