"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Package, FolderOpen, Star, Image, Wrench,
    Settings, LogOut, Menu, X, ChevronRight, Megaphone, Tag,
    Shield, HelpCircle, Bell, Search, Zap, BookOpen
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/adminAuth";
import AdminLoginPage from "./login/page";

const NAV_GROUPS = [
    {
        label: "Overview",
        items: [
            { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
        ],
    },
    {
        label: "Content",
        items: [
            { href: "/admin/products", label: "Products", icon: Package },
            { href: "/admin/categories", label: "Categories", icon: FolderOpen },
            { href: "/admin/services", label: "Services", icon: Wrench },
            { href: "/admin/portfolio", label: "Portfolio", icon: Image },
            { href: "/admin/reviews", label: "Reviews", icon: Star },
        ],
    },
    {
        label: "Marketing",
        items: [
            { href: "/admin/banners", label: "Banners", icon: Megaphone },
            { href: "/admin/brands", label: "Brands", icon: Tag },
            { href: "/admin/trust", label: "Trust Strip", icon: Shield },
            { href: "/admin/howitworks", label: "How It Works", icon: HelpCircle },
        ],
    },
    {
        label: "System",
        items: [
            { href: "/admin/guide", label: "Guide", icon: BookOpen },
            { href: "/admin/settings", label: "Settings", icon: Settings },
        ],
    },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const { username, logout } = useAdminAuth();

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname.startsWith(href);

    return (
        <div className="flex flex-col h-full" style={{ background: "linear-gradient(180deg, #0F0A1E 0%, #130E2A 100%)" }}>
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "rgba(124,58,237,0.15)" }}>
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bricolage font-bold text-base text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}
                >
                    A
                </div>
                <div className="min-w-0">
                    <p className="font-bricolage font-bold text-[14px] text-white truncate">Allauddin MS</p>
                    <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <p className="font-dm text-[11px]" style={{ color: "rgba(167,139,250,0.7)" }}>Admin Panel</p>
                    </div>
                </div>
                {onClose && (
                    <button onClick={onClose} className="ml-auto p-1 text-white/40 hover:text-white transition-colors lg:hidden">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
                {NAV_GROUPS.map((group) => (
                    <div key={group.label}>
                        <p className="font-poppins font-semibold text-[10px] uppercase tracking-[0.1em] px-3 mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                            {group.label}
                        </p>
                        <div className="space-y-0.5">
                            {group.items.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href, (link as any).exact);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={onClose}
                                        className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-dm transition-all duration-200 group"
                                        style={{
                                            background: active ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(167,139,250,0.15))" : "transparent",
                                            color: active ? "#E9D5FF" : "rgba(255,255,255,0.5)",
                                            border: active ? "1px solid rgba(124,58,237,0.35)" : "1px solid transparent",
                                        }}
                                    >
                                        {active && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background: "#A78BFA" }} />
                                        )}
                                        <Icon size={16} style={{ color: active ? "#C4B5FD" : "rgba(255,255,255,0.35)" }} />
                                        <span className="font-medium">{link.label}</span>
                                        {active && <ChevronRight size={13} className="ml-auto" style={{ color: "rgba(196,181,253,0.5)" }} />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Footer */}
            <div className="px-3 py-3 border-t" style={{ borderColor: "rgba(124,58,237,0.12)" }}>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-poppins font-bold text-[13px] text-white uppercase"
                        style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)" }}
                    >
                        {username?.[0] || "A"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-dm text-[13px] font-medium text-white truncate">{username || "Admin"}</p>
                        <p className="font-dm text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>Administrator</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-dm transition-all duration-200 hover:bg-red-500/10"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                    <LogOut size={15} />
                    Sign Out
                </button>
            </div>
        </div>
    );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAdminAuth();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Derive page title from pathname
    const pageTitle = (() => {
        const map: Record<string, string> = {
            "/admin": "Dashboard",
            "/admin/products": "Products",
            "/admin/categories": "Categories",
            "/admin/reviews": "Reviews",
            "/admin/portfolio": "Portfolio",
            "/admin/services": "Services",
            "/admin/banners": "Banners",
            "/admin/brands": "Brands",
            "/admin/trust": "Trust Strip",
            "/admin/howitworks": "How It Works",
            "/admin/guide": "Admin Guide",
            "/admin/settings": "Settings",
        };
        return map[pathname] || "Admin";
    })();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#0F0A1E" }}>
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-bricolage font-bold text-xl text-white"
                        style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", boxShadow: "0 0 32px rgba(124,58,237,0.5)" }}
                    >
                        A
                    </div>
                    <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(124,58,237,0.3)", borderTopColor: "#7C3AED" }} />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return <AdminLoginPage />;

    return (
        <div className="min-h-screen flex" style={{ background: "#F8F7FF" }}>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] fixed top-0 left-0 h-full z-40 shadow-2xl"
                style={{ boxShadow: "4px 0 24px rgba(124,58,237,0.12)" }}>
                <Sidebar />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 lg:hidden"
                            style={{ background: "rgba(10,5,30,0.6)", backdropFilter: "blur(4px)" }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -260 }}
                            animate={{ x: 0 }}
                            exit={{ x: -260 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 left-0 bottom-0 w-[260px] z-50 lg:hidden shadow-2xl"
                        >
                            <Sidebar onClose={() => setMobileOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-[240px] xl:ml-[260px]">
                {/* Top Header */}
                <header className="sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 h-14 bg-white border-b" style={{ borderColor: "rgba(124,58,237,0.1)", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="p-2 rounded-xl transition-colors hover:bg-violet-50 lg:hidden"
                        style={{ color: "#7C3AED" }}
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                        <Zap size={14} style={{ color: "#A78BFA" }} />
                        <h1 className="font-poppins font-semibold text-[15px]" style={{ color: "#1A1035" }}>{pageTitle}</h1>
                    </div>

                    <div className="flex-1" />

                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ background: "#F5F3FF", border: "1px solid rgba(124,58,237,0.15)" }}>
                        <Search size={14} style={{ color: "#A78BFA" }} />
                        <span className="font-dm text-[13px]" style={{ color: "#9CA3AF" }}>Quick search...</span>
                    </div>

                    {/* Notification bell */}
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-violet-50" style={{ color: "#7C3AED", border: "1px solid rgba(124,58,237,0.15)" }}>
                        <Bell size={16} />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminAuthProvider>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminAuthProvider>
    );
}
