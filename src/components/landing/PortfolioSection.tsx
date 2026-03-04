"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import { useStorageUrl } from "@/lib/hooks/useStorageUrl";

const PLACEHOLDERS = [
    {
        _id: "ph1",
        title: "Screen Replacement",
        description: "Shattered Samsung Galaxy screen replaced with original AMOLED. Crystal clear, touch-perfect.",
        imageUrlBefore: null,
        imageUrlAfter: null,
    },
    {
        _id: "ph2",
        title: "Battery Replacement",
        description: "Swollen iPhone battery replaced. Extended backup from 2 hours to a full day.",
        imageUrlBefore: null,
        imageUrlAfter: null,
    },
    {
        _id: "ph3",
        title: "Charging Port Repair",
        description: "OnePlus charging port cleaned and refitted. Charges at full speed again.",
        imageUrlBefore: null,
        imageUrlAfter: null,
    },
    {
        _id: "ph4",
        title: "Motherboard Repair",
        description: "Water-damaged Redmi motherboard restored. All functions working perfectly.",
        imageUrlBefore: null,
        imageUrlAfter: null,
    },
];

function PortfolioCard({ item, index }: { item: any; index: number }) {
    const hasImages = !!(item.imageUrlBefore || item.imageUrlAfter);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3), ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-[22px]"
            style={{
                background: "#FFFFFF",
                border: "1px solid rgba(124,58,237,0.1)",
                boxShadow: "0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-5px)";
                el.style.boxShadow = "0 20px 56px rgba(124,58,237,0.15), 0 4px 12px rgba(0,0,0,0.06)";
                el.style.borderColor = "rgba(124,58,237,0.2)";
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.05)";
                el.style.borderColor = "rgba(124,58,237,0.1)";
            }}
        >
            {/* ── Before / After image zone ── */}
            <div
                className="relative overflow-hidden flex"
                style={{ height: "230px" }}
            >
                {/* BEFORE half */}
                <div className="w-1/2 relative overflow-hidden">
                    {item.imageUrlBefore ? (
                        <img
                            src={item.imageUrlBefore}
                            alt="Before"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #1A1035, #2D1B69)" }}
                        >
                            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(167,139,250,0.15) 0%, transparent 65%)" }} />
                            <span className="font-bricolage font-black text-[64px] select-none relative z-10" style={{ color: "rgba(167,139,250,0.1)" }}>B</span>
                        </div>
                    )}
                    {/* BEFORE label */}
                    <div className="absolute top-3 left-3 z-10">
                        <span
                            className="font-poppins font-bold text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
                        >
                            Before
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                </div>

                {/* Divider + arrow */}
                <div
                    className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px z-10"
                    style={{ background: "linear-gradient(to bottom, transparent 10%, rgba(255,255,255,0.5) 50%, transparent 90%)" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                    style={{
                        background: "white",
                        boxShadow: "0 4px 20px rgba(124,58,237,0.3), 0 2px 6px rgba(0,0,0,0.12)",
                    }}
                >
                    <ArrowRight size={14} style={{ color: "#7C3AED" }} />
                </div>

                {/* AFTER half */}
                <div className="w-1/2 relative overflow-hidden">
                    {item.imageUrlAfter ? (
                        <img
                            src={item.imageUrlAfter}
                            alt="After"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #2D1B69, #1A1035)" }}
                        >
                            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 50%, rgba(124,58,237,0.25) 0%, transparent 65%)" }} />
                            <span className="font-bricolage font-black text-[64px] select-none relative z-10" style={{ color: "rgba(167,139,250,0.18)" }}>A</span>
                        </div>
                    )}
                    {/* AFTER label */}
                    <div className="absolute top-3 right-3 z-10">
                        <span
                            className="font-poppins font-bold text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 4px 12px rgba(124,58,237,0.4)" }}
                        >
                            After
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Card body ── */}
            <div className="flex flex-col flex-1 px-6 py-5">
                <h3
                    className="font-bricolage font-bold text-[#1A1035] mb-2 leading-tight transition-colors duration-200 group-hover:text-[#7C3AED]"
                    style={{ fontSize: "clamp(16px, 2.5vw, 18px)", letterSpacing: "-0.01em" }}
                >
                    {item.title}
                </h3>
                <p className="font-dm text-[13.5px] leading-[1.7]" style={{ color: "#6B7280" }}>
                    {item.description}
                </p>
                {/* Result confirmed pill */}
                <div className="mt-4 flex items-center gap-1.5">
                    <CheckCircle2 size={13} style={{ color: "#7C3AED", flexShrink: 0 }} />
                    <span className="font-dm text-[12px] font-medium" style={{ color: "#7C3AED" }}>
                        Repair confirmed successful
                    </span>
                </div>
            </div>

            {/* Bottom hover line */}
            <div
                className="h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                style={{ background: "linear-gradient(90deg, #7C3AED, #A78BFA, transparent)" }}
            />
        </motion.div>
    );
}

/** Resolves Convex storage IDs → CDN URLs and passes them into PortfolioCard */
function PortfolioItemResolver({ item, index }: { item: any; index: number }) {
    const beforeUrl = useStorageUrl(item.beforeImageStorageId);
    const afterUrl = useStorageUrl(item.afterImageStorageId);
    const resolved = {
        ...item,
        imageUrlBefore: item.imageUrlBefore ?? beforeUrl,
        imageUrlAfter: item.imageUrlAfter ?? afterUrl,
    };
    return <PortfolioCard item={resolved} index={index} />;
}

export default function PortfolioSection() {
    const portfolioItems = useQuery(api.portfolio.listVisible);

    const rawItems = portfolioItems && portfolioItems.length > 0
        ? (portfolioItems as any[])
        : [];

    const displayItems: any[] = [
        ...rawItems.slice(0, 4),
        ...PLACEHOLDERS.slice(0, Math.max(0, 4 - rawItems.length)),
    ];

    if (!portfolioItems) return null;

    return (
        <section
            className="relative overflow-hidden py-[72px] md:py-[104px]"
            id="portfolio"
            style={{ background: "#FFFFFF" }}
        >
            {/* Subtle dot-grid overlay */}
            <div className="absolute inset-0 pointer-events-none dot-grid-violet" />
            {/* Top-centre soft violet glow */}
            <div
                className="absolute top-0 left-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)", transform: "translateX(-50%) translateY(-40%)" }}
            />

            <div className="container-max mx-auto px-4 relative z-10">

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12 md:mb-16 flex flex-col items-center"
                >
                    {/* Label pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)" }}>
                        <Layers size={12} style={{ color: "#7C3AED" }} />
                        <span className="font-poppins font-semibold text-[11px] tracking-[0.08em] uppercase" style={{ color: "#7C3AED" }}>Our Portfolio</span>
                    </div>

                    <h2
                        className="font-bricolage font-bold text-[#1A1035] mb-4 leading-[1.15]"
                        style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em" }}
                    >
                        Our Work Speaks for Itself
                    </h2>
                    <p
                        className="font-dm text-[15px] md:text-[17px] max-w-[420px] mx-auto text-center leading-[1.65]"
                        style={{ color: "#6B7280" }}
                    >
                        Real repairs. Real results. Every device treated with genuine parts and expert hands.
                    </p>
                </motion.div>

                {/* 2×2 grid — 1 col on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {displayItems.map((item: any, i: number) => (
                        <PortfolioItemResolver key={item._id || i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
