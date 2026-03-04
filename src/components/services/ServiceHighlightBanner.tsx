"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Star, ArrowRight, Zap } from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import { useRepairModal } from "@/lib/hooks/useRepairModal";

export default function ServiceHighlightBanner() {
    const banner = useQuery(api.banners.getServiceHighlight);
    const { openRepairModal } = useRepairModal();

    if (!banner || !banner.isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[22px] mb-12 w-full"
            style={{
                background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 55%, #1A1035 100%)",
                border: "1px solid rgba(167,139,250,0.2)",
                boxShadow: "0 16px 48px rgba(124,58,237,0.25), 0 2px 8px rgba(0,0,0,0.12)",
            }}
        >
            {/* Ambient glow orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.22) 0%, transparent 65%)", transform: "translate(30%,-40%)" }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)", transform: "translate(-20%,30%)" }} />

            {/* Noise texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Subtle horizontal shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)" }} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8 p-6 md:p-8">

                {/* Left: Icon + text */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Glowing icon badge */}
                    <div
                        className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(109,40,217,0.5))",
                            border: "1px solid rgba(167,139,250,0.35)",
                            boxShadow: "0 0 24px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                        }}
                    >
                        <Wrench size={22} color="#E9D5FF" strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0">
                        {/* Label pill */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2" style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)" }}>
                            <Star size={10} style={{ color: "#FCD34D" }} fill="#FCD34D" />
                            <span className="font-poppins font-semibold text-[10px] tracking-[0.07em] uppercase" style={{ color: "rgba(167,139,250,0.9)" }}>
                                Most Popular
                            </span>
                        </div>
                        <p className="font-bricolage font-bold text-white leading-[1.3]" style={{ fontSize: "clamp(16px, 2.5vw, 20px)" }}>
                            {banner.headingText || "Screen Replacement — Starting ₹500"}
                        </p>
                        <p className="font-dm text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                            Genuine display · 30-day warranty · Same-day service
                        </p>
                    </div>
                </div>

                {/* Right: CTA button */}
                <button
                    onClick={openRepairModal}
                    className="group flex-shrink-0 flex items-center gap-2.5 font-poppins font-semibold text-[14px] px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                    style={{
                        background: "#FFFFFF",
                        color: "#7C3AED",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    }}
                >
                    {banner.ctaLabel || "Book This Repair"}
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
            </div>
        </motion.div>
    );
}
