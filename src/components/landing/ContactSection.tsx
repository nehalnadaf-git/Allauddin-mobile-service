"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

function isOpenNow(start: string, end: string): boolean {
    try {
        const now = new Date();
        const h = now.getHours(), m = now.getMinutes();
        const [sh, sm] = start.replace(/[^0-9:]/g, "").split(":").map(Number);
        const [eh, em] = end.replace(/[^0-9:]/g, "").split(":").map(Number);
        const nowMin = h * 60 + m, startMin = (sh || 10) * 60 + (sm || 0), endMin = (eh || 20) * 60 + (em || 0);
        return nowMin >= startMin && nowMin < endMin;
    } catch { return false; }
}

export default function ContactSection() {
    const settings = useQuery(api.settings.get);
    const whatsappLink = settings ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}` : "#";
    const open = settings ? isOpenNow(settings.workingHoursStart, settings.workingHoursEnd) : false;

    const formatPhone = (phone: string) => {
        const cleaned = (phone || "").replace(/[^\d+]/g, '');
        const match = cleaned.match(/^(\+91)(\d{5})(\d{5})$/);
        if (match) return `${match[1]} ${match[2]} ${match[3]}`;
        return phone || "+91 99999 99999";
    };

    const contactRows = [
        {
            icon: <MapPin size={18} color="#7C3AED" />,
            content: settings?.address || "Harsha Complex, Hubli, Karnataka",
        },
        {
            icon: <Phone size={18} color="#7C3AED" />,
            content: formatPhone(settings?.whatsappNumber || "+919999999999"),
        },
        {
            icon: <Clock size={18} color="#7C3AED" />,
            content: `${settings?.workingHoursStart || "10:00"} – ${settings?.workingHoursEnd || "20:00"}, All Days`,
        },
    ];

    return (
        <section
            className="relative overflow-hidden py-[64px] md:py-[96px]"
            id="contact"
            style={{ background: "#FFFFFF" }}
        >
            {/* Violet dot-grid */}
            <div className="absolute inset-0 pointer-events-none dot-grid-violet" />

            <div className="container-max mx-auto px-4 relative z-10">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <h2 className="font-bricolage font-bold text-near-black" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.02em" }}>
                        Find Us Here
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-[48px] h-[3px] bg-violet rounded-full mt-4"
                        style={{ transformOrigin: "left center" }}
                    />
                </motion.div>

                {/* Contact card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="max-w-[600px] mx-auto"
                >
                    <div
                        className="p-8 md:p-12 rounded-[24px]"
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid rgba(124,58,237,0.1)",
                            boxShadow: "0 2px 16px rgba(124,58,237,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                        }}
                    >
                        <h3 className="font-bricolage font-bold text-[28px] text-near-black mb-6 relative inline-block">
                            {settings?.shopName || "Allauddin Mobile Service"}
                            <span className="absolute -bottom-2 left-0 w-12 h-[3px] rounded-full bg-violet" />
                        </h3>

                        {/* Contact rows */}
                        <div className="space-y-4 mt-8">
                            {contactRows.map((row, i) => (
                                <div key={i} className="flex items-center gap-4" style={{ minHeight: "56px" }}>
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(124,58,237,0.08)" }}
                                    >
                                        {row.icon}
                                    </div>
                                    <span className="font-dm text-[16px] text-dark-grey" style={{ lineHeight: 1.5 }}>
                                        {row.content}
                                    </span>
                                </div>
                            ))}

                            {/* Open Now indicator */}
                            {open && (
                                <div className="flex items-center gap-3 mt-2">
                                    <span
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{
                                            background: "#27AE60",
                                            boxShadow: "0 0 0 0 rgba(39,174,96,0.4)",
                                            animation: "statusPulse 2s ease-in-out infinite",
                                        }}
                                    />
                                    <span className="font-dm font-medium text-[14px]" style={{ color: "#27AE60" }}>
                                        Open Now
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* WhatsApp CTA */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp flex items-center justify-center gap-2.5 w-full text-[15px] mt-6 h-[52px]"
                        >
                            <MessageCircle size={20} />
                            Message on WhatsApp
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
