"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRepairModal } from "@/lib/hooks/useRepairModal";
import Link from "next/link";
import { ShieldCheck, Monitor, Cpu, Zap, Crosshair, CheckCircle } from "lucide-react";



const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function HeroSection() {
    const { openRepairModal } = useRepairModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    return (
        <section
            className="relative w-full min-h-[100svh] overflow-hidden flex items-center"
            style={{ background: "#F8F7FF" }}
        >
            {/* ── Background Image ── */}
            <div
                className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] md:h-[800px] pointer-events-none z-0 flex items-center justify-center opacity-[0.35]"
                style={{
                    maskImage: "radial-gradient(circle at center, black 30%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 70%)"
                }}
            >
                <div
                    id="hero-bg-layer"
                    className="w-full h-full"
                    style={{
                        backgroundImage: "url('/hero-repair-bg.png')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        filter: "contrast(110%)"
                    }}
                />
            </div>

            {/* ── Atmospheric gradient bloom ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: [
                        "radial-gradient(ellipse 80% 70% at 85% 85%, rgba(167,139,250,0.45) 0%, rgba(196,181,253,0.25) 30%, rgba(237,233,254,0.12) 60%, transparent 100%)",
                        "radial-gradient(ellipse 50% 40% at 10% 10%, rgba(196,181,253,0.20) 0%, transparent 70%)",
                    ].join(", "),
                }}
            />

            {/* ── Concentric ring lines inside bloom (SVG) ── */}
            <svg
                className="absolute pointer-events-none"
                style={{ right: "0", bottom: "0", width: "65%", height: "65%", opacity: 0.6 }}
                viewBox="0 0 600 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMaxYMax meet"
            >
                {/* Rings centered at bottom-right origin (600,500) */}
                {[120, 190, 265, 345].map((r, i) => (
                    <ellipse
                        key={i}
                        cx={600}
                        cy={500}
                        rx={r * 1.25}
                        ry={r}
                        stroke="rgba(124,58,237,0.06)"
                        strokeWidth="1"
                        fill="none"
                    />
                ))}
            </svg>

            {/* ── Dot-grid overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(rgba(124,58,237,0.04) 1.5px, transparent 1.5px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 py-32 lg:py-0 min-h-[100svh] flex items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center text-center">

                    {/* ── Text Column ── */}
                    <motion.div
                        className="w-full max-w-[800px] flex flex-col items-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate={mounted ? "visible" : "hidden"}
                    >
                        {/* Badge */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <div
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                                style={{
                                    background: "rgba(124,58,237,0.08)",
                                    border: "1px solid rgba(124,58,237,0.2)",
                                    boxShadow: "0 4px 12px rgba(124,58,237,0.05)",
                                }}
                            >
                                <ShieldCheck size={14} color="#7C3AED" />
                                <span
                                    className="font-poppins font-semibold text-[12px] uppercase tracking-[0.06em]"
                                    style={{ color: "#7C3AED" }}
                                >
                                    Hubli&apos;s #1 Premium Service
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.div variants={itemVariants} className="w-full">
                            <h1
                                className="font-bricolage font-extrabold leading-[1.1] mb-8"
                                style={{ fontSize: "clamp(40px, 8vw, 84px)", letterSpacing: "-0.04em" }}
                            >
                                <span style={{ color: "#0F0F0F" }}>Precision Repair,</span>
                                <br />
                                <span className="relative inline-block" style={{ color: "#7C3AED" }}>
                                    Genuine Care.
                                    {/* Stylish animated wave underline */}
                                    <motion.svg
                                        viewBox="0 0 300 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute left-0 right-0 w-full"
                                        style={{ bottom: "-10px", height: "18px", overflow: "visible" }}
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#A78BFA" />
                                                <stop offset="50%" stopColor="#7C3AED" />
                                                <stop offset="100%" stopColor="#6D28D9" />
                                            </linearGradient>
                                            <filter id="waveGlow">
                                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                                <feMerge>
                                                    <feMergeNode in="blur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        {/* Glow layer */}
                                        <motion.path
                                            d="M 0 10 C 40 2, 80 18, 120 9 C 160 0, 200 18, 240 9 C 270 3, 290 12, 300 9"
                                            stroke="rgba(167,139,250,0.4)"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                            fill="none"
                                            filter="url(#waveGlow)"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={mounted ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                        {/* Main wave */}
                                        <motion.path
                                            d="M 0 10 C 40 2, 80 18, 120 9 C 160 0, 200 18, 240 9 C 270 3, 290 12, 300 9"
                                            stroke="url(#waveGrad)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            fill="none"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={mounted ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                                            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                    </motion.svg>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={itemVariants}
                            className="font-dm text-[18px] md:text-[22px] mb-12 max-w-[640px] mx-auto text-center"
                            style={{ color: "#6B7280", lineHeight: 1.6 }}
                        >
                            Experience lightning-fast, master-level tech repairs right at Harsha Complex. Fast, reliable, and guaranteed.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                        >
                            <button
                                onClick={openRepairModal}
                                className="btn-primary flex items-center justify-center px-10 py-5 text-[16px] w-full sm:w-auto min-w-[220px] rounded-full shadow-lg shadow-violet/20 hover:shadow-xl hover:shadow-violet/30 transition-all font-semibold"
                            >
                                Book a Repair
                            </button>
                            <Link
                                href="/services"
                                className="btn-outline-dark flex items-center justify-center px-10 py-5 text-[16px] w-full sm:w-auto min-w-[220px] rounded-full border-2 border-near-black font-semibold hover:bg-near-black hover:text-white transition-all"
                            >
                                View All Services
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @keyframes floatGentle {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </section>
    );
}
