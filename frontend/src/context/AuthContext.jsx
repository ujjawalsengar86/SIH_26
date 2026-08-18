import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'lca_jwt_token';
const USER_EMAIL_KEY = 'lca_user_email';
const USER_NAME_KEY = 'lca_user_name';

/**
 * Simple helper to check if a JWT token is expired without external library
 */
function isJwtExpired(token) {
    if (!token) return true;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false; // if non-standard or opaque, assume valid until rejected
        const payload = JSON.parse(atob(parts[1]));
        if (!payload.exp) return false;
        return Date.now() >= payload.exp * 1000;
    } catch {
        return false;
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
    const [user, setUser] = useState(() => {
        const email = localStorage.getItem(USER_EMAIL_KEY);
        const name = localStorage.getItem(USER_NAME_KEY);
        return email ? { email, name: name || email } : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        if (savedToken) {
            if (isJwtExpired(savedToken)) {
                // Token has expired
                logout();
            } else {
                setToken(savedToken);
                const email = localStorage.getItem(USER_EMAIL_KEY);
                const name = localStorage.getItem(USER_NAME_KEY);
                if (email) {
                    setUser({ email, name: name || email });
                }
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const response = await authApi.login(credentials);
        if (response && response.token) {
            const receivedToken = response.token;
            setToken(receivedToken);
            localStorage.setItem(TOKEN_KEY, receivedToken);
            
            const userInfo = {
                email: credentials.email,
                name: credentials.name || credentials.email.split('@')[0],
            };
            setUser(userInfo);
            localStorage.setItem(USER_EMAIL_KEY, userInfo.email);
            localStorage.setItem(USER_NAME_KEY, userInfo.name);
            return response;
        }
        throw new Error('No authentication token returned by the server.');
    };

    const register = async (userData) => {
        const response = await authApi.register(userData);
        return response;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_EMAIL_KEY);
        localStorage.removeItem(USER_NAME_KEY);
    };

    const isAuthenticated = Boolean(token && !isJwtExpired(token));

    const value = {
        token,
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
