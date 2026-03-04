"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Search, CheckCircle } from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

const ICON_MAP: Record<string, React.ReactNode> = {
    Smartphone: <Smartphone size={28} />,
    Search: <Search size={28} />,
    CheckCircle: <CheckCircle size={28} />,
    Wrench: <Search size={28} />,
};

const DEFAULT_STEPS = [
    {
        icon: "Smartphone",
        title: "Bring Your Phone",
        description: "Walk in or book via WhatsApp — open 10AM–8PM every single day",
    },
    {
        icon: "Search",
        title: "We Diagnose & Repair",
        description: "Expert technician checks your device and repairs with genuine components",
    },
    {
        icon: "CheckCircle",
        title: "Collect Your Phone",
        description: "Pick up your perfectly restored phone — same day for most repairs",
    },
];

const slideAnimations = [
    { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
    { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
];

const STEP_NUMS = ["01", "02", "03"];

export default function HowItWorks() {
    const stepsData = useQuery(api.howItWorksSteps.list);
    const steps = (stepsData && (stepsData as any[]).length > 0)
        ? stepsData as any[]
        : DEFAULT_STEPS;

    return (
        <section
            className="relative overflow-hidden py-[72px] md:py-[96px]"
            style={{ background: "#1E1547" }}
        >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute rounded-full blur-[120px]"
                    style={{ width: "40vw", height: "40vh", top: "20%", left: "60%", background: "rgba(124,58,237,0.15)", animation: "orb1 12s ease-in-out infinite" }} />
                <div className="absolute rounded-full blur-[100px]"
                    style={{ width: "30vw", height: "30vh", top: "60%", left: "10%", background: "rgba(109,40,217,0.1)", animation: "orb2 16s ease-in-out infinite" }} />
            </div>
            {/* Noise texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

            <div className="container-max mx-auto px-4 relative z-10">
                {/* Badge + Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 md:mb-16 flex flex-col items-center"
                >
                    <div
                        className="inline-flex items-center px-4 py-1.5 rounded-full mb-5"
                        style={{ background: "rgba(124,58,237,0.35)", border: "1px solid rgba(124,58,237,0.4)" }}
                    >
                        <span className="font-poppins font-semibold text-[11px] uppercase" style={{ color: "#A78BFA", letterSpacing: "0.06em" }}>
                            Getting Started
                        </span>
                    </div>

                    <h2 className="font-bricolage font-bold text-white" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.02em" }}>
                        How It Works
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="w-[48px] h-[3px] rounded-full mx-auto mt-4"
                        style={{ background: "#7C3AED", transformOrigin: "left center" }}
                    />
                    <p className="font-dm text-[15px] md:text-[17px] text-center mt-5" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px" }}>
                        Getting your phone fixed is simple
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative flex flex-col md:flex-row items-stretch justify-center gap-5">
                    {/* Dashed connecting line (desktop) */}
                    <div className="hidden md:block absolute top-[36px] left-[16%] right-[16%] h-[2px] z-0"
                        style={{ border: "none", borderTop: "2px dashed rgba(124,58,237,0.4)" }} />

                    {steps.map((step: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={slideAnimations[i % 3].initial}
                            whileInView={slideAnimations[i % 3].animate}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                            className="w-full md:flex-1 relative z-10 glass-card p-8 md:p-8 flex flex-col items-center text-center"
                        >
                            {/* Step number watermark */}
                            <span
                                className="absolute top-4 right-5 font-bricolage font-black select-none pointer-events-none"
                                style={{ fontSize: "80px", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}
                            >
                                {STEP_NUMS[i] || "0" + (i + 1)}
                            </span>

                            {/* Icon circle */}
                            <div
                                className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 relative z-10"
                                style={{
                                    background: "rgba(124,58,237,0.28)",
                                    color: "#A78BFA",
                                    boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                                }}
                            >
                                {ICON_MAP[step.icon] || <Smartphone size={28} />}
                            </div>

                            <h3 className="font-poppins font-semibold text-[18px] text-white mb-3 relative z-10" style={{ lineHeight: 1.3 }}>
                                {step.title}
                            </h3>
                            <p className="font-dm text-[15px] relative z-10" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
