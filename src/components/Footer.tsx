"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import { MessageCircle, Instagram, Facebook, Youtube, Twitter, Globe, Phone, MapPin } from "lucide-react";
import { useRepairModal } from "@/lib/hooks/useRepairModal";

const platformIcons: Record<string, React.ReactNode> = {
    WhatsApp: <MessageCircle size={18} />,
    Instagram: <Instagram size={18} />,
    Facebook: <Facebook size={18} />,
    YouTube: <Youtube size={18} />,
    "Twitter/X": <Twitter size={18} />,
    Custom: <Globe size={18} />,
};

const platformColors: Record<string, string> = {
    WhatsApp: "#25D366",
    Instagram: "#E4405F",
    Facebook: "#1877F2",
    YouTube: "#FF0000",
    "Twitter/X": "#1DA1F2",
    Custom: "#7C3AED",
};

export default function Footer() {
    const settings = useQuery(api.settings.get);
    const { openRepairModal } = useRepairModal();

    type SocialLink = { platform: string; url: string; isVisible: boolean; displayOrder: number };
    const visibleLinks: SocialLink[] = (settings?.socialLinks as SocialLink[] | undefined)
        ?.filter((l: SocialLink) => l.isVisible)
        .sort((a: SocialLink, b: SocialLink) => a.displayOrder - b.displayOrder) || [];

    const whatsappHref = `https://wa.me/${(settings?.whatsappNumber || "916363278962").replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi, I want to book a repair!")}`;

    return (
        <footer className="relative overflow-hidden text-white">

            {/* ── Footer CTA Band ── */}
            <div
                className="relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, #7C3AED 0%, #1A1035 100%)" }}
            >
                {/* Noise */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 20%, rgba(167,139,250,0.15) 0%, transparent 50%)" }} />

                <div className="container-max mx-auto px-4 py-[80px] md:py-[80px] text-center relative z-10">
                    <h2 className="font-bricolage font-bold text-[26px] md:text-[32px] text-white mb-4" style={{ letterSpacing: "-0.01em" }}>
                        Get Your Device Fixed Today
                    </h2>
                    <p className="font-dm text-[17px] mb-8 max-w-[480px] mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
                        Walk in or message us on WhatsApp. Same-day repairs, genuine parts, warranty included.
                    </p>
                    <button
                        onClick={openRepairModal}
                        className="inline-flex items-center justify-center bg-white font-poppins font-semibold text-[15px] px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                        style={{ color: "#7C3AED", boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
                    >
                        Book a Repair Now
                    </button>
                </div>
            </div>

            {/* ── Main Footer ── */}
            <div
                className="relative"
                style={{ background: "#1E1547", borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
                {/* Noise */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

                <div className="container-max mx-auto px-4 py-[72px] md:py-[72px] relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

                        {/* Column 1: Brand (40%) */}
                        <div className="md:col-span-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}>
                                    <span className="text-white font-poppins font-bold text-base">A</span>
                                </div>
                                <span className="font-bricolage font-bold text-[20px] text-white">
                                    {settings?.shopName || "Allauddin Mobile Service"}
                                </span>
                            </div>
                            <p className="font-dm italic text-[14px] mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                                Expert Phone Repair &amp; Premium Accessories
                            </p>

                            {/* Open Today pill */}
                            <div
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
                                style={{ background: "rgba(39,174,96,0.15)", border: "1px solid rgba(39,174,96,0.25)" }}
                            >
                                <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" style={{ animation: "statusPulse 2s ease-in-out infinite" }} />
                                <span className="font-dm font-medium text-[13px] text-white">
                                    Open Today: {settings?.workingHoursStart || "10:00"} – {settings?.workingHoursEnd || "20:00"}
                                </span>
                            </div>

                            {/* Social links */}
                            {visibleLinks.length > 0 && (
                                <div className="flex items-center gap-3 mt-2">
                                    {visibleLinks.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = platformColors[link.platform] || "#7C3AED"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                                            aria-label={link.platform}
                                        >
                                            {platformIcons[link.platform] || <Globe size={18} />}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Column 2: Quick Links (30%) */}
                        <div className="md:col-span-3">
                            <h4 className="font-poppins font-semibold text-[11px] uppercase mb-6" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
                                Quick Links
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    { href: "/", label: "Home" },
                                    { href: "/services", label: "Our Services" },
                                    { href: "/accessories", label: "Shop Accessories" },
                                    { href: whatsappHref, label: "Book a Repair", external: true },
                                ].map((link) => (
                                    <li key={link.label}>
                                        {link.external ? (
                                            <a href={link.href} target="_blank" rel="noopener noreferrer"
                                                className="font-dm text-[15px] transition-colors duration-200 hover:text-white min-h-[48px] flex items-center"
                                                style={{ color: "rgba(255,255,255,0.8)" }}>
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link href={link.href}
                                                className="font-dm text-[15px] transition-colors duration-200 hover:text-white min-h-[48px] flex items-center"
                                                style={{ color: "rgba(255,255,255,0.8)" }}>
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Get In Touch (30%) */}
                        <div className="md:col-span-4">
                            <h4 className="font-poppins font-semibold text-[11px] uppercase mb-6" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
                                Get In Touch
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="flex-shrink-0 mt-1" style={{ color: "#A78BFA" }} />
                                    <span className="font-dm text-[14px]" style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                                        {settings?.address || "Harsha Complex, Hubli, Karnataka, 580020"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="flex-shrink-0" style={{ color: "#A78BFA" }} />
                                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
                                        className="font-dm text-[14px] hover:text-white transition-colors"
                                        style={{ color: "rgba(255,255,255,0.8)" }}>
                                        {settings?.whatsappNumber || "+91 6363278962"}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe size={16} className="flex-shrink-0" style={{ color: "#A78BFA" }} />
                                    <span className="font-dm text-[14px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                                        {settings?.workingHoursStart || "10:00"} – {settings?.workingHoursEnd || "20:00"}, All Days
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer bottom bar */}
                    <div className="mt-12 pt-7 flex flex-col md:flex-row items-center justify-between gap-3"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <p className="font-dm text-[13px] text-center md:text-left" style={{ color: "rgba(255,255,255,0.4)" }}>
                            © 2025 {settings?.shopName || "Allauddin Mobile Service"}. All rights reserved.
                        </p>
                        <p className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Hubli, Karnataka
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
