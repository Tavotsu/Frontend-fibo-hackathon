import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
    className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        // Load user from local storage
        const storedUser = localStorage.getItem('user_session');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
            }
        } else {
            // Fallback for demo/existing session without re-login
            setUser({ name: "Usuario", email: "guest@marketech.ai" });
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleLogout = () => {
        localStorage.removeItem('user_session');
        navigate('/login');
    };

    if (!user) return null; // Or show a login button if we were checking auth state globally

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors group outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="User Menu"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-white leading-none">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="hidden md:block text-left mr-1">
                    {/* Mobile usually just shows avatar or handled differently, but sidebar is width-constrained */}
                    {/* Keeping it simple for the icon request */}
                </div>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="p-3 border-b border-zinc-800 bg-zinc-900/50">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                    </div>

                    <div className="p-1">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
