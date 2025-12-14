import { User } from "../types";

const API_BASE_URL = "http://localhost:8000";

interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'ngrok-skip-browser-warning': '1',
            },
            body: formData
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ detail: 'Login failed' }));
            throw new Error(errorData.detail || 'Login failed');
        }

        const data = await res.json();
        if (data.access_token) {
            localStorage.setItem('auth_token', data.access_token);
        }
        return data;
    },

    async register(email: string, password: string, fullName: string): Promise<User> {
        const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '1',
            },
            body: JSON.stringify({
                email,
                password,
                full_name: fullName
            })
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ detail: 'Registration failed' }));
            throw new Error(errorData.detail || 'Registration failed');
        }

        return res.json();
    },

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_session'); // Legacy mock cleanup
    },

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    }
};
