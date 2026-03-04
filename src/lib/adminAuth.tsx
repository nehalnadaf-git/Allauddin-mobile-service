"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface AuthContextValue {
    token: string | null;
    username: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "aladdin-admin-token";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loginMutation = useMutation(api.auth.login);
    const logoutMutation = useMutation(api.auth.logout);
    const refreshMutation = useMutation(api.auth.refreshSession);
    const session = useQuery(api.auth.validateSession, token ? { token } : "skip");

    // Load token from storage
    useEffect(() => {
        const stored = localStorage.getItem(TOKEN_KEY);
        if (stored) setToken(stored);
        setIsLoading(false);
    }, []);

    // Validate session
    useEffect(() => {
        if (session === null && token) {
            localStorage.removeItem(TOKEN_KEY);
            setToken(null);
            setUsername(null);
        } else if (session) {
            setUsername(session.username);
        }
    }, [session, token]);

    // Auto-refresh session every minute on activity
    useEffect(() => {
        if (!token) return;
        let lastCall = 0;
        const throttledRefresh = () => {
            const now = Date.now();
            if (now - lastCall > 60000) {
                lastCall = now;
                refreshMutation({ token }).catch(() => { });
            }
        };
        window.addEventListener("click", throttledRefresh);
        window.addEventListener("keydown", throttledRefresh);
        return () => {
            window.removeEventListener("click", throttledRefresh);
            window.removeEventListener("keydown", throttledRefresh);
        };
    }, [token, refreshMutation]);

    const login = useCallback(async (u: string, p: string) => {
        const result = await loginMutation({ username: u, password: p });
        setToken(result.token);
        setUsername(result.username);
        localStorage.setItem(TOKEN_KEY, result.token);
    }, [loginMutation]);

    const logout = useCallback(async () => {
        if (token) await logoutMutation({ token }).catch(() => { });
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUsername(null);
    }, [token, logoutMutation]);

    const isAuthenticated = !!token && !!session;

    return (
        <AuthContext.Provider value={{ token, username, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
    return context;
}
