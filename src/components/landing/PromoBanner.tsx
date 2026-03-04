"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

export default function PromoBanner() {
    const banner = useQuery(api.banners.getPromoLanding);

    if (!banner || !banner.isVisible) return null;

    return (
        <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "#1A1035" }}>
            {/* Rich Background Layering */}
            <div
                className="absolute inset-0 opacity-40"
                style={{ background: "radial-gradient(circle at 20% 50%, rgba(124,58,237,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(236,72,153,0.3) 0%, transparent 50%)" }}
            />

            {/* Noise overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            <div className="container-max mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[900px] mx-auto"
                >
                    {/* Special Label Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-sm">
                        <span className="text-[20px]">🎉</span>
                        <span className="font-poppins font-bold text-[11px] text-white uppercase tracking-[0.12em]">
                            Limited Time Offer
                        </span>
                    </div>

                    <h2
                        className="font-bricolage font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
                        style={{ fontSize: "clamp(32px, 6vw, 68px)" }}
                    >
                        {banner.headingText}
                    </h2>

                    {banner.subText && (
                        <p className="font-dm text-white/70 text-lg md:text-xl mb-12 max-w-[600px] mx-auto leading-relaxed">
                            {banner.subText}
                        </p>
                    )}

                    {banner.ctaLabel && (
                        <Link
                            href={banner.ctaLink || "/accessories"}
                            className="inline-flex items-center gap-3 rounded-full px-10 py-5 text-[16px] font-poppins font-bold bg-white text-violet hover:scale-105 transition-all shadow-xl shadow-black/20"
                        >
                            <ShoppingBag size={20} />
                            {banner.ctaLabel}
                        </Link>
                    )}
                </motion.div>
            </div>

            {/* Decorative Floating Dots */}
            <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-violet/40 blur-sm animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-3 h-3 rounded-full bg-pink-500/30 blur-md animate-bounce" style={{ animationDuration: '3s' }} />
        </section>
    );
}
