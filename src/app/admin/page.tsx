"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
    Package, FolderOpen, Star, Image, ArrowRight,
    Clock, TrendingUp, ShoppingBag, CheckCircle, Activity, Wrench,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
});

function StatCard({
    label, value, icon: Icon, color, sub, href, delay = 0,
}: {
    label: string; value: number | string; icon: any; color: string; sub?: string; href: string; delay?: number;
}) {
    return (
        <motion.div {...fadeUp(delay)}>
            <Link href={href} className="block group">
                <div
                    className="rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(124,58,237,0.14)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(124,58,237,0.06)";
                    }}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ background: color, boxShadow: `0 4px 12px ${color}66` }}
                        >
                            <Icon size={20} className="text-white" />
                        </div>
                        <ArrowRight
                            size={16}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                            style={{ color: "rgba(124,58,237,0.3)" }}
                        />
                    </div>
                    <p className="font-bricolage font-bold text-3xl" style={{ color: "white", letterSpacing: "-0.02em" }}>
                        {value}
                    </p>
                    <p className="font-dm text-[13px] font-medium mt-1" style={{ color: "#6B7280" }}>{label}</p>
                    {sub && (
                        <p className="font-dm text-[11px] mt-1" style={{ color: "#A78BFA" }}>{sub}</p>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}

function QuickAction({ label, href, icon: Icon, color, delay = 0 }: {
    label: string; href: string; icon: any; color: string; delay?: number;
}) {
    return (
        <motion.div {...fadeUp(delay)}>
            <Link
                href={href}
                className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#F5F3FF";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "white";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.08)";
                }}
            >
                <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: color }}
                >
                    <Icon size={16} className="text-white" />
                </div>
                <span className="font-dm font-medium text-[14px]" style={{ color: "white" }}>{label}</span>
                <ChevronRightIcon className="ml-auto transition-transform group-hover:translate-x-0.5" />
            </Link>
        </motion.div>
    );
}

function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} style={{ color: "rgba(124,58,237,0.3)" }}>
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function formatTime(ts: number) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

const ACTION_COLORS: Record<string, string> = {
    "Product Added": "linear-gradient(135deg,#7C3AED,#A78BFA)",
    "Product Updated": "linear-gradient(135deg,#2563EB,#60A5FA)",
    "Product Deleted": "linear-gradient(135deg,#DC2626,#F87171)",
    "Settings Updated": "linear-gradient(135deg,#059669,#34D399)",
    "Review Approved": "linear-gradient(135deg,#D97706,#FCD34D)",
    "Review Rejected": "linear-gradient(135deg,#DC2626,#F87171)",
};

export default function AdminDashboard() {
    const products = useQuery(api.products.list);
    const categories = useQuery(api.categories.listAll);
    const reviews = useQuery(api.reviews.listAdmin);
    const portfolio = useQuery(api.portfolio.listAll);
    const activityLog = useQuery(api.activityLog.getRecent);

    const pendingReviews = (reviews as any[])?.filter((r: any) => r.status === "pending").length || 0;
    const approvedReviews = (reviews as any[])?.filter((r: any) => r.status === "approved").length || 0;

    const stats = [
        {
            label: "Total Products", value: products?.length || 0, icon: Package,
            color: "linear-gradient(135deg,#7C3AED,#A78BFA)", href: "/admin/products",
            sub: `${(products as any[])?.filter((p: any) => p.isInStock).length || 0} in stock`,
            delay: 0,
        },
        {
            label: "Categories", value: categories?.length || 0, icon: FolderOpen,
            color: "linear-gradient(135deg,#059669,#34D399)", href: "/admin/categories",
            sub: `${(categories as any[])?.filter((c: any) => c.isVisible).length || 0} visible`,
            delay: 0.05,
        },
        {
            label: "Pending Reviews", value: pendingReviews, icon: Star,
            color: "linear-gradient(135deg,#D97706,#FCD34D)", href: "/admin/reviews",
            sub: `${approvedReviews} approved`,
            delay: 0.1,
        },
        {
            label: "Portfolio Items", value: portfolio?.length || 0, icon: Image,
            color: "linear-gradient(135deg,#0EA5E9,#38BDF8)", href: "/admin/portfolio",
            sub: `${(portfolio as any[])?.filter((p: any) => p.isVisible).length || 0} visible`,
            delay: 0.15,
        },
    ];

    const quickActions = [
        { label: "Add New Product", href: "/admin/products", icon: Package, color: "linear-gradient(135deg,#7C3AED,#A78BFA)", delay: 0.1 },
        { label: "Manage Services", href: "/admin/services", icon: Wrench, color: "linear-gradient(135deg,#0EA5E9,#38BDF8)", delay: 0.15 },
        { label: "Review Queue", href: "/admin/reviews", icon: Star, color: "linear-gradient(135deg,#D97706,#FCD34D)", delay: 0.2 },
        { label: "Add Portfolio", href: "/admin/portfolio", icon: Image, color: "linear-gradient(135deg,#059669,#34D399)", delay: 0.25 },
        { label: "Site Settings", href: "/admin/settings", icon: ShoppingBag, color: "linear-gradient(135deg,#DC2626,#F87171)", delay: 0.3 },
        { label: "Manage Banners", href: "/admin/banners", icon: TrendingUp, color: "linear-gradient(135deg,#7C3AED,#C4B5FD)", delay: 0.35 },
    ];

    return (
        <div className="max-w-6xl mx-auto">

            {/* Welcome Banner */}
            <motion.div
                {...fadeUp(0)}
                className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-8"
                style={{
                    background: "linear-gradient(135deg, white 0%, #2D1B69 60%, #3B1FA0 100%)",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.25)",
                }}
            >
                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", transform: "translate(-20%,30%)" }} />

                <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity size={14} style={{ color: "#A78BFA" }} />
                            <span className="font-poppins text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ color: "#A78BFA" }}>
                                Live Dashboard
                            </span>
                        </div>
                        <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-white" style={{ letterSpacing: "-0.02em" }}>
                            Welcome back, Admin 👋
                        </h2>
                        <p className="font-dm text-[14px] mt-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                            Allauddin Mobile Service · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                    </div>
                    {pendingReviews > 0 && (
                        <Link
                            href="/admin/reviews"
                            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                        >
                            <Star size={15} fill="currentColor" style={{ color: "#FCD34D" }} />
                            <span className="font-poppins font-semibold text-[13px]">{pendingReviews} pending review{pendingReviews > 1 ? "s" : ""}</span>
                            <ArrowRight size={14} />
                        </Link>
                    )}
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <motion.div {...fadeUp(0.2)} className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-poppins font-semibold text-[15px]" style={{ color: "white" }}>Quick Actions</h3>
                    </div>
                    <div className="space-y-2">
                        {quickActions.map((action) => (
                            <QuickAction key={action.href} {...action} />
                        ))}
                    </div>
                </motion.div>

                {/* Activity Feed */}
                <motion.div {...fadeUp(0.25)} className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-poppins font-semibold text-[15px]" style={{ color: "white" }}>Recent Activity</h3>
                        <span className="font-dm text-[12px]" style={{ color: "#A78BFA" }}>Live feed</span>
                    </div>

                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                        }}
                    >
                        {activityLog && (activityLog as any[]).length > 0 ? (
                            <div className="divide-y" style={{ borderColor: "rgba(124,58,237,0.06)" }}>
                                {(activityLog as any[]).slice(0, 8).map((entry: any, i: number) => (
                                    <motion.div
                                        key={entry._id}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03 + 0.3 }}
                                        className="flex items-center gap-3.5 px-5 py-3.5"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: ACTION_COLORS[entry.action] || "linear-gradient(135deg,#7C3AED,#A78BFA)" }}
                                        >
                                            <CheckCircle size={13} className="text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-dm text-[13px] font-medium truncate" style={{ color: "white" }}>
                                                {entry.action}
                                            </p>
                                            <p className="font-dm text-[12px] truncate" style={{ color: "#9CA3AF" }}>
                                                {entry.details}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 flex-shrink-0">
                                            <Clock size={11} style={{ color: "#D1D5DB" }} />
                                            <span className="font-dm text-[11px]" style={{ color: "#9CA3AF" }}>
                                                {formatTime(entry.timestamp)}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                                    style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(167,139,250,0.05))" }}
                                >
                                    <Activity size={20} style={{ color: "#A78BFA" }} />
                                </div>
                                <p className="font-dm text-[14px] font-medium" style={{ color: "#6B7280" }}>No activity yet</p>
                                <p className="font-dm text-[12px] mt-1" style={{ color: "#9CA3AF" }}>Actions will appear here as you manage your store</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
