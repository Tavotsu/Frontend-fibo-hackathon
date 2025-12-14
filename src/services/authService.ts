import { supabase } from "../lib/supabaseClient";
import { User } from "../types";

export const authService = {
    async login(email: string, password: string): Promise<{ access_token: string; user: any }> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw new Error(error.message);
        }

        if (data.session) {
            localStorage.setItem('auth_token', data.session.access_token);
            // Optional: Store user info if needed
            localStorage.setItem('user_info', JSON.stringify(data.user));
        }

        return {
            access_token: data.session?.access_token || "",
            user: data.user
        };
    },

    async register(email: string, password: string, fullName: string): Promise<any> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        // If session exists (auto-login enabled in Supabase), save token
        if (data.session) {
            localStorage.setItem('auth_token', data.session.access_token);
        }

        return data.user;
    },

    async resetPassword(email: string): Promise<void> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password', // Update if you have a route
        });

        if (error) {
            throw new Error(error.message);
        }
    },

    async logout() {
        await supabase.auth.signOut();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
    },

    getToken(): string | null {
        // Primary source: LocalStorage (synced by login)
        // Fallback: Check Supabase session (async, not doable here easily without refactor)
        return localStorage.getItem('auth_token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    },

    // Helper to get current user info
    getUser() {
        const userStr = localStorage.getItem('user_info');
        return userStr ? JSON.parse(userStr) : null;
    }
};

