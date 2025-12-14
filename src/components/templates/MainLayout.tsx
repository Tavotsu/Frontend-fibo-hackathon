import React, { ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        // Theme logic is handled globally in App.tsx
        <div className="h-screen w-full transition-all duration-300">
            <div className="flex h-full w-full bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
                {children}
            </div>
        </div>
    );
};
