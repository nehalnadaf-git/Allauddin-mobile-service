"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

// ── Minimal line SVG Icons ────────────────────────────────────────────────────

const IconExpert = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
        <path d="M20.59 21a8 8 0 1 0-17.18 0" />
        <path d="M16 17l2 2 4-4" />
    </svg>
);

const IconCraft = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M11 3l-4 6h10l-4-6" />
        <path d="M2 9h20" />
    </svg>
);

const IconTransparent = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const IconCustomers = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────

const ITEMS = [
    {
        icon: IconExpert,
        stat: "10+",
        unit: "Years",
        label: "Expert Technicians",
        description: "Trained professionals across all major brands",
    },
    {
        icon: IconCraft,
        stat: "100%",
        unit: "Genuine",
        label: "Premium Craftsmanship",
        description: "Original parts, surgical precision, zero shortcuts",
    },
    {
        icon: IconTransparent,
        stat: "₹0",
        unit: "Hidden Fees",
        label: "Transparent Process",
        description: "Clear diagnosis and honest pricing every time",
    },
    {
        icon: IconCustomers,
        stat: "5K+",
        unit: "Customers",
        label: "Happy Customers",
        description: "Trusted since 2012 across Hubli & beyond",
    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function TrustBannerStrip() {
    const trustItems = useQuery(api.trustItems.listVisible);
    void trustItems;

    return (
        <section
            className="relative overflow-hidden py-14 md:py-20"
            style={{ background: "linear-gradient(135deg, #1A1035 0%, #1E1547 50%, #1A1035 100%)" }}
        >
            {/* Ambient top violet glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.25), transparent)" }} />

            {/* Background orb */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] rounded-full blur-[160px]"
                    style={{ background: "rgba(124,58,237,0.07)" }} />
            </div>

            <div className="container-max mx-auto px-4 relative z-10">

                {/* ── Desktop: horizontal strip with dividers ── */}
                <div className="hidden md:flex items-stretch divide-x divide-white/[0.06]">
                    {ITEMS.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="group flex-1 flex flex-col items-center text-center px-6 py-2 cursor-default"
                            >
                                {/* Icon circle */}
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        background: "rgba(167,139,250,0.1)",
                                        border: "1px solid rgba(167,139,250,0.2)",
                                        color: "#A78BFA",
                                        boxShadow: "0 0 20px rgba(167,139,250,0)",
                                        transition: "box-shadow 0.35s, background 0.35s",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(167,139,250,0.35)";
                                        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.18)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(167,139,250,0)";
                                        (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.1)";
                                    }}
                                >
                                    <Icon />
                                </div>

                                {/* Stat number */}
                                <div className="mb-1.5">
                                    <span
                                        className="font-bricolage font-extrabold leading-none"
                                        style={{
                                            fontSize: "clamp(28px, 3.5vw, 38px)",
                                            background: "linear-gradient(135deg, #FFFFFF 40%, #A78BFA 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                    >
                                        {item.stat}
                                    </span>
                                    <span
                                        className="font-dm font-medium ml-1.5 text-[13px]"
                                        style={{ color: "#A78BFA" }}
                                    >
                                        {item.unit}
                                    </span>
                                </div>

                                {/* Label */}
                                <p className="font-poppins font-semibold text-white text-[14px] mb-2 leading-tight">
                                    {item.label}
                                </p>

                                {/* Description */}
                                <p className="font-dm text-[13px] leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.42)" }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── Mobile: 2-col clean cards ── */}
                <div className="grid grid-cols-2 gap-3 md:hidden">
                    {ITEMS.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col items-start p-4 rounded-[16px]"
                                style={{
                                    background: "rgba(255,255,255,0.035)",
                                    border: "1px solid rgba(167,139,250,0.1)",
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
                                    style={{
                                        background: "rgba(167,139,250,0.12)",
                                        border: "1px solid rgba(167,139,250,0.18)",
                                        color: "#A78BFA",
                                    }}
                                >
                                    <Icon />
                                </div>

                                {/* Stat */}
                                <span
                                    className="font-bricolage font-extrabold leading-none mb-1"
                                    style={{
                                        fontSize: "26px",
                                        background: "linear-gradient(135deg, #FFFFFF 40%, #A78BFA 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {item.stat}
                                </span>
                                <span className="font-dm text-[11px] mb-2" style={{ color: "#A78BFA" }}>
                                    {item.unit}
                                </span>

                                {/* Label */}
                                <p className="font-poppins font-semibold text-white text-[13px] mb-1 leading-tight">
                                    {item.label}
                                </p>

                                {/* Description */}
                                <p className="font-dm text-[11.5px] leading-relaxed"
                                    style={{ color: "rgba(255,255,255,0.4)" }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
