"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, Zap } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

export default function AdminLoginPage() {
    const { login, isAuthenticated } = useAdminAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    if (isAuthenticated) {
        if (typeof window !== "undefined") window.location.href = "/admin";
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await login(username, password);
            window.location.href = "/admin";
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ background: "linear-gradient(160deg, #0F0A1E 0%, white 50%, #2D1B69 100%)" }}
        >
            {/* Ambient orbs */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)", transform: "translate(30%,-30%)" }} />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)", transform: "translate(-20%,20%)" }} />

            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[400px]"
            >
                {/* Card */}
                <div
                    className="rounded-[28px] overflow-hidden"
                    style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2)" }}
                >
                    {/* Dark header */}
                    <div
                        className="relative px-8 pt-8 pb-6 overflow-hidden"
                        style={{ background: "linear-gradient(135deg, white 0%, #2D1B69 100%)" }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />

                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-10 h-10 rounded-2xl flex items-center justify-center font-bricolage font-bold text-[18px] text-white"
                                style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", boxShadow: "0 4px 20px rgba(124,58,237,0.5)" }}
                            >
                                A
                            </div>
                            <div>
                                <p className="font-bricolage font-bold text-[15px] text-white">Allauddin MS</p>
                                <p className="font-dm text-[11px]" style={{ color: "rgba(167,139,250,0.7)" }}>Admin Panel</p>
                            </div>
                        </div>

                        <h1 className="font-bricolage font-bold text-[26px] text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                            Sign in to manage<br />your store
                        </h1>
                        <p className="font-dm text-[13px] mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Enter your credentials to continue
                        </p>

                        {/* Progress bar decoration */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #7C3AED, #A78BFA, transparent)" }} />
                    </div>

                    {/* White form area */}
                    <div className="bg-[rgba(255,255,255,0.03)] px-8 py-7">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-2.5 p-3.5 rounded-xl"
                                    style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)" }}
                                >
                                    <Lock size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                                    <p className="font-dm text-[13px] text-red-600">{error}</p>
                                </motion.div>
                            )}

                            {/* Username */}
                            <div>
                                <label className="block font-dm text-[12px] font-semibold tracking-wide uppercase mb-2" style={{ color: "#6B7280" }}>
                                    Username
                                </label>
                                <div className="relative">
                                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#A78BFA" }} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-[14px] font-dm outline-none transition-all"
                                        style={{
                                            background: "#0F0A1E",
                                            border: "1.5px solid rgba(124,58,237,0.15)",
                                            color: "white",
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                                        onBlur={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.15)"; e.target.style.boxShadow = "none"; }}
                                        placeholder="Enter username"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block font-dm text-[12px] font-semibold tracking-wide uppercase mb-2" style={{ color: "#6B7280" }}>
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#A78BFA" }} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-12 py-3 rounded-xl text-[14px] font-dm outline-none transition-all"
                                        style={{
                                            background: "#0F0A1E",
                                            border: "1.5px solid rgba(124,58,237,0.15)",
                                            color: "white",
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)"; }}
                                        onBlur={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.15)"; e.target.style.boxShadow = "none"; }}
                                        placeholder="Enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                        style={{ color: "#9CA3AF" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "#7C3AED")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !username || !password}
                                className="w-full py-3.5 rounded-xl font-poppins font-semibold text-[14px] text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                style={{
                                    background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                                    boxShadow: username && password ? "0 6px 20px rgba(124,58,237,0.4)" : "none",
                                }}
                            >
                                <Zap size={15} />
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <p className="text-center font-dm text-[11px] mt-5" style={{ color: "#9CA3AF" }}>
                            Secure admin access · Allauddin Mobile Service
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
