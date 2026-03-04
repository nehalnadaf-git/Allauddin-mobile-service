"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight, Smartphone, BatteryFull, Droplets, Cpu,
    RotateCcw, Plug, Wrench, Volume2, Camera,
    HardDrive, Signal, Shield, CircleDot, RectangleHorizontal,
} from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import Link from "next/link";

const iconMap: Record<string, any> = {
    Smartphone, BatteryFull, Plug, RotateCcw, Droplets,
    Cpu, Wrench, Volume2, Camera, HardDrive, Signal,
    Shield, CircleDot, RectangleHorizontal,
};

function resolveService(service: any): { Icon: any } {
    if (service.iconName && iconMap[service.iconName]) {
        return { Icon: iconMap[service.iconName] };
    }
    const n = (service.name || "").toLowerCase();
    if (n.includes("screen") || n.includes("display")) return { Icon: Smartphone };
    if (n.includes("battery")) return { Icon: BatteryFull };
    if (n.includes("charg") || n.includes("port")) return { Icon: Plug };
    if (n.includes("speaker") || n.includes("mic") || n.includes("audio")) return { Icon: Volume2 };
    if (n.includes("software") || n.includes("flash") || n.includes("boot")) return { Icon: RotateCcw };
    if (n.includes("water") || n.includes("liquid")) return { Icon: Droplets };
    if (n.includes("camera") || n.includes("lens")) return { Icon: Camera };
    if (n.includes("motherboard") || n.includes("board")) return { Icon: Cpu };
    if (n.includes("signal") || n.includes("network") || n.includes("sim")) return { Icon: Signal };
    if (n.includes("data") || n.includes("recovery")) return { Icon: HardDrive };
    if (n.includes("back") || n.includes("panel") || n.includes("glass")) return { Icon: RectangleHorizontal };
    if (n.includes("button") || n.includes("power")) return { Icon: CircleDot };
    return { Icon: Wrench };
}

export default function ServicesPreview() {
    const services = useQuery(api.services.listVisible);
    const settings = useQuery(api.settings.get);

    const handleBookRepair = (service: any) => {
        const num = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "916363278962";
        const msg = [
            `*Repair Booking Request*`,
            ``,
            `*Service:* ${service.name}`,
            ``,
            `Please confirm my booking slot. Thank you!`,
        ].join("\n");
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    if (!services || services.length === 0) return null;

    const displayServices = services.slice(0, 6);

    return (
        <section
            className="relative overflow-hidden py-[72px] md:py-[104px]"
            id="services"
            style={{ background: "linear-gradient(180deg, #F4F3FF 0%, #FFFFFF 100%)" }}
        >
            {/* Subtle background orbs */}
            <div className="absolute top-0 left-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)", transform: "translateX(-50%) translateY(-30%)" }} />

            <div className="container-max mx-auto px-4 relative z-10">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12 md:mb-16 flex flex-col items-center"
                >
                    {/* Label pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)" }}>
                        <Wrench size={12} style={{ color: "#7C3AED" }} />
                        <span className="font-poppins font-semibold text-[11px] tracking-[0.08em] uppercase" style={{ color: "#7C3AED" }}>Our Expertise</span>
                    </div>
                    <h2
                        className="font-bricolage font-bold text-[#1A1035] mb-4"
                        style={{ fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "-0.02em" }}
                    >
                        What We Fix
                    </h2>
                    <p
                        className="font-dm text-[15px] md:text-[17px] max-w-[500px] mx-auto text-center leading-[1.65]"
                        style={{ color: "#6B7280" }}
                    >
                        From cracked screens to dead motherboards — we handle it all with precision and care.
                    </p>
                </motion.div>

                {/* ── Cards Grid ── */}
                <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6 mb-6 md:mb-14">
                    {displayServices.map((service: any, index: number) => {
                        const { Icon } = resolveService(service);
                        return (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.3) }}
                                className="group relative flex-shrink-0 w-[272px] md:w-auto snap-center flex flex-col overflow-hidden rounded-[22px]"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid rgba(124,58,237,0.1)",
                                    boxShadow: "0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = "translateY(-5px)";
                                    el.style.boxShadow = "0 20px 52px rgba(124,58,237,0.16), 0 4px 12px rgba(0,0,0,0.06)";
                                    el.style.borderColor = "rgba(124,58,237,0.22)";
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.transform = "translateY(0)";
                                    el.style.boxShadow = "0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)";
                                    el.style.borderColor = "rgba(124,58,237,0.1)";
                                }}
                            >
                                {/* Dark gradient header zone */}
                                <div
                                    className="relative flex items-center justify-between px-6 pt-6 pb-8 overflow-hidden"
                                    style={{ background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 100%)" }}
                                >
                                    {/* Ambient glow */}
                                    <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />

                                    {/* Glowing icon badge */}
                                    <div
                                        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(109,40,217,0.5))",
                                            border: "1px solid rgba(167,139,250,0.35)",
                                            boxShadow: "0 6px 24px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                                        }}
                                    >
                                        <Icon size={24} color="#E9D5FF" strokeWidth={1.7} />
                                    </div>

                                    {/* Service number badge */}
                                    <span
                                        className="relative z-10 font-bricolage font-extrabold text-[12px] w-7 h-7 rounded-full flex items-center justify-center"
                                        style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)", color: "rgba(167,139,250,0.9)" }}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Wave edge */}
                                <div style={{ marginTop: "-1px" }}>
                                    <svg viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "24px", display: "block" }}>
                                        <path d="M0 0 C100 24, 300 24, 400 0 L400 0 L0 0 Z" fill="#2D1B69" />
                                        <path d="M0 0 C100 24, 300 24, 400 0" stroke="rgba(167,139,250,0.15)" strokeWidth="1" fill="none" />
                                    </svg>
                                </div>

                                {/* Card body */}
                                <div className="flex flex-col flex-1 px-6 pb-6 pt-3">
                                    <h3
                                        className="font-bricolage font-bold text-[#1A1035] mb-2 leading-tight transition-colors duration-200 group-hover:text-[#7C3AED]"
                                        style={{ fontSize: "clamp(15px, 2vw, 17px)", letterSpacing: "-0.01em" }}
                                    >
                                        {service.name}
                                    </h3>
                                    {service.description && (
                                        <p
                                            className="font-dm leading-relaxed flex-1"
                                            style={{ fontSize: "13.5px", color: "#6B7280", lineHeight: 1.65 }}
                                        >
                                            {service.description}
                                        </p>
                                    )}

                                    {/* Book CTA */}
                                    <button
                                        onClick={() => handleBookRepair(service)}
                                        className="mt-5 flex items-center gap-1.5 font-poppins font-semibold text-[13px] transition-all duration-200 hover:gap-2.5 active:scale-95"
                                        style={{ color: "#7C3AED" }}
                                    >
                                        Book Repair
                                        <ArrowRight size={13} />
                                    </button>

                                    {/* Hover underline sweep */}
                                    <div
                                        className="mt-4 h-[2px] w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: "linear-gradient(90deg, #7C3AED, #A78BFA, transparent)" }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── View All CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center"
                >
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2.5 font-poppins font-semibold text-[15px] px-10 py-4 rounded-full text-white transition-all hover:-translate-y-0.5 active:scale-95 group"
                        style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 8px 28px rgba(124,58,237,0.35)" }}
                    >
                        View All Services
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
