"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Wrench, Smartphone, BatteryFull, Plug, Volume2, RotateCcw,
    Droplets, Camera, RectangleHorizontal, CircleDot, HardDrive,
    Signal, Cpu, ShieldCheck, Clock, Star, ChevronRight, Zap, ArrowRight,
    PlusCircle, Check
} from "lucide-react";
import { useQuery, api } from "@/lib/mockBackend";
import { useRepairModal } from "@/lib/hooks/useRepairModal";
import { useCart } from "@/lib/cart";
import { toast } from "@/components/ui/Toast";
import ServiceHighlightBanner from "@/components/services/ServiceHighlightBanner";

const iconMap: Record<string, any> = {
    Smartphone, BatteryFull, Plug, Volume2, RotateCcw, Droplets,
    Camera, RectangleHorizontal, CircleDot, HardDrive, Signal, Cpu, Wrench,
};

const trustPills = [
    { icon: Star, label: "5★ Rated Service" },
    { icon: Zap, label: "Trusted by Hundreds" },
    { icon: ShieldCheck, label: "My Work Speaks Itself" },
    { icon: Clock, label: "Excellence Appreciated" },
];

export default function ServicesPage() {
    const services = useQuery(api.services.listVisible);
    const settings = useQuery(api.settings.get);
    const { openRepairModal } = useRepairModal();
    const { addItem } = useCart();
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

    // Directly open WhatsApp with the specific service pre-filled
    const handleBookRepair = (service: any) => {
        const num = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "916363278962";
        const price = service.startingPrice
            ? `\n💰 Starting Price: ₹${service.startingPrice}`
            : "";
        const msg = [
            `🔧 *Repair Booking Request*`,
            ``,
            `*Service:* ${service.name}${price}`,
            ``,
            `Please confirm my booking slot. Thank you!`,
        ].join("\n");
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
    };

    const handleAddService = (service: any) => {
        if (addedIds.has(service._id)) return;
        addItem({
            id: service._id,
            name: service.name,
            price: 0,
            originalPrice: 0,
            itemType: "service",
            startingPrice: service.startingPrice ?? undefined,
            offerType: "none",
        });
        toast(service.name, "cart");
        setAddedIds(prev => new Set(Array.from(prev).concat(service._id)));
        setTimeout(() => setAddedIds(prev => {
            const next = new Set(prev);
            next.delete(service._id);
            return next;
        }), 1200);
    };

    return (
        <div className="min-h-screen" style={{ background: "#F4F3FF" }}>

            {/* ── Hero ── */}
            <section
                className="relative overflow-hidden pt-28 pb-0 md:pt-36"
                style={{ background: "linear-gradient(160deg, #0F0A1E 0%, #1A1035 50%, #2D1B69 100%)" }}
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)", transform: "translate(20%, -30%)" }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)", transform: "translate(-20%, 30%)" }} />
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

                <div className="container-max mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}>
                            <Wrench size={13} style={{ color: "#A78BFA" }} />
                            <span className="font-poppins font-semibold text-[11px] tracking-[0.08em] uppercase" style={{ color: "#A78BFA" }}>Professional Repairs</span>
                        </div>
                        <h1 className="font-bricolage font-bold text-white mb-5 leading-[1.15]" style={{ fontSize: "clamp(32px, 6vw, 52px)", letterSpacing: "-0.02em" }}>
                            Our Repair Services
                        </h1>
                        <p className="font-dm text-[16px] md:text-[18px] max-w-[560px] mx-auto leading-[1.65] mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Expert repairs for all smartphone brands. Genuine parts, transparent pricing, and a 30-day warranty on every fix.
                        </p>
                        <button
                            onClick={openRepairModal}
                            className="inline-flex items-center gap-2.5 font-poppins font-semibold text-[15px] px-8 py-4 rounded-full text-white transition-all hover:-translate-y-0.5 active:scale-95 mb-12"
                            style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 8px 32px rgba(124,58,237,0.45)" }}
                        >
                            Book a Repair
                            <ChevronRight size={17} />
                        </button>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-0 w-full max-w-[540px] mx-auto">
                            {trustPills.map((pill, i) => (
                                <motion.div
                                    key={pill.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                                    className="flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-2xl text-center"
                                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                                >
                                    <pill.icon size={16} style={{ color: "#A78BFA" }} />
                                    <span className="font-dm text-[12px] font-medium leading-tight" style={{ color: "rgba(255,255,255,0.85)" }}>{pill.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Wave into light bg */}
                <div className="relative mt-10 -mb-1" style={{ height: "60px" }}>
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                        <path d="M0 60 C360 0, 1080 0, 1440 60 L1440 60 L0 60 Z" fill="#F4F3FF" />
                    </svg>
                </div>
            </section>

            {/* ── Services Grid ── */}
            <section className="pb-20 md:pb-28" style={{ background: "#F4F3FF" }}>
                <div className="container-max mx-auto px-4">

                    {/* Highlight banner */}
                    <div className="pt-8 mb-10">
                        <ServiceHighlightBanner />
                    </div>

                    {services && services.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {services.map((service: any, index: number) => {
                                const IconComponent = iconMap[service.iconName] || Wrench;
                                return (
                                    <motion.div
                                        key={service._id}
                                        initial={{ opacity: 0, y: 28 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
                                        className="group relative flex flex-col rounded-[22px] overflow-hidden"
                                        style={{
                                            background: "#FFFFFF",
                                            border: "1px solid rgba(124,58,237,0.1)",
                                            boxShadow: "0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                                        }}
                                        onMouseEnter={e => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.transform = "translateY(-4px)";
                                            el.style.boxShadow = "0 16px 48px rgba(124,58,237,0.18), 0 4px 12px rgba(0,0,0,0.06)";
                                            el.style.borderColor = "rgba(124,58,237,0.25)";
                                        }}
                                        onMouseLeave={e => {
                                            const el = e.currentTarget as HTMLElement;
                                            el.style.transform = "translateY(0)";
                                            el.style.boxShadow = "0 2px 20px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)";
                                            el.style.borderColor = "rgba(124,58,237,0.1)";
                                        }}
                                    >
                                        {/* ── Card header zone (dark gradient) ── */}
                                        <div
                                            className="relative flex items-center justify-between px-6 pt-6 pb-8 overflow-hidden"
                                            style={{
                                                background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 100%)",
                                            }}
                                        >
                                            {/* Subtle ambient glow in header */}
                                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)", transform: "translate(30%,-30%)" }} />

                                            {/* Icon badge */}
                                            <div
                                                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(109,40,217,0.5))",
                                                    border: "1px solid rgba(167,139,250,0.35)",
                                                    boxShadow: "0 6px 24px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                                                }}
                                            >
                                                <IconComponent size={24} color="#E9D5FF" strokeWidth={1.7} />
                                            </div>

                                            {/* Service number */}
                                            <span
                                                className="relative z-10 font-bricolage font-extrabold text-[12px] w-7 h-7 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: "rgba(167,139,250,0.15)",
                                                    border: "1px solid rgba(167,139,250,0.25)",
                                                    color: "rgba(167,139,250,0.9)",
                                                }}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Curved bottom edge of header */}
                                        <div style={{ marginTop: "-1px" }}>
                                            <svg viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "24px", display: "block" }}>
                                                <path d="M0 0 C100 24, 300 24, 400 0 L400 0 L0 0 Z" fill="#2D1B69" />
                                                <path d="M0 0 C100 24, 300 24, 400 0" stroke="rgba(167,139,250,0.15)" strokeWidth="1" fill="none" />
                                            </svg>
                                        </div>

                                        {/* ── Card body ── */}
                                        <div className="flex flex-col flex-1 px-6 pb-6 pt-3">
                                            <h3 className="font-bricolage font-bold text-[18px] text-[#1A1035] mb-2 leading-tight transition-colors duration-200 group-hover:text-[#7C3AED]">
                                                {service.name}
                                            </h3>
                                            {service.description && (
                                                <p className="font-dm text-[13.5px] leading-[1.65] mb-6" style={{ color: "#6B7280" }}>
                                                    {service.description}
                                                </p>
                                            )}

                                            {/* Footer row: CTA + Add to Cart */}
                                            <div className="mt-auto flex items-center justify-between gap-2">
                                                <button
                                                    onClick={() => handleBookRepair(service)}
                                                    className="flex items-center gap-1.5 font-poppins font-semibold text-[13px] transition-all duration-200 hover:gap-2.5 active:scale-95"
                                                    style={{ color: "#7C3AED" }}
                                                >
                                                    Book This Repair
                                                    <ArrowRight size={14} />
                                                </button>
                                                {/* + Add to Cart button */}
                                                <button
                                                    onClick={() => handleAddService(service)}
                                                    title="Add to cart"
                                                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-90"
                                                    style={
                                                        addedIds.has(service._id)
                                                            ? { background: "linear-gradient(135deg,#10B981,#059669)", boxShadow: "0 4px 12px rgba(16,185,129,0.4)" }
                                                            : { background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 4px 12px rgba(124,58,237,0.35)" }
                                                    }
                                                >
                                                    {addedIds.has(service._id)
                                                        ? <Check size={15} color="white" strokeWidth={2.5} />
                                                        : <PlusCircle size={15} color="white" strokeWidth={2} />
                                                    }
                                                </button>
                                            </div>

                                            {/* Bottom violet line */}
                                            <div
                                                className="mt-5 h-[2px] w-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ background: "linear-gradient(90deg, #7C3AED, #A78BFA, transparent)" }}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        // Skeleton loader
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-[22px] overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.1)" }}>
                                    <div className="h-24 skeleton" style={{ background: "linear-gradient(135deg, rgba(26,16,53,0.07), rgba(45,27,105,0.12))" }} />
                                    <div className="p-6">
                                        <div className="skeleton h-5 w-3/4 rounded mb-3" />
                                        <div className="skeleton h-4 w-full rounded mb-2" />
                                        <div className="skeleton h-4 w-4/5 rounded mb-6" />
                                        <div className="skeleton h-4 w-1/3 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom CTA card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="relative overflow-hidden rounded-[24px] mt-14 p-8 md:p-12 text-center"
                        style={{
                            background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 60%, #1A1035 100%)",
                            boxShadow: "0 20px 60px rgba(124,58,237,0.25)",
                        }}
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
                        <div className="relative z-10">
                            <p className="font-dm text-[12px] uppercase tracking-[0.1em] font-semibold mb-3" style={{ color: "rgba(167,139,250,0.8)" }}>
                                Not sure which service you need?
                            </p>
                            <h2 className="font-bricolage font-bold text-white mb-4 leading-tight" style={{ fontSize: "clamp(22px, 4vw, 32px)", letterSpacing: "-0.01em" }}>
                                We&apos;ll Diagnose It — Free of Charge
                            </h2>
                            <p className="font-dm text-[15px] max-w-[480px] mx-auto mb-8" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
                                Bring your phone in or book a slot. Our technicians will identify the issue at no cost, before you commit to any repair.
                            </p>
                            <button
                                onClick={openRepairModal}
                                className="inline-flex items-center gap-2.5 bg-white font-poppins font-semibold text-[15px] px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                                style={{ color: "#7C3AED", boxShadow: "0 6px 24px rgba(0,0,0,0.2)" }}
                            >
                                Book a Free Diagnosis
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
