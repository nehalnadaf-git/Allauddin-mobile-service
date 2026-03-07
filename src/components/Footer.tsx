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

    type SocialLink = { platform: string; url: string; isVisible: boolean; displayOrder: number };
    const visibleLinks: SocialLink[] = (settings?.socialLinks as SocialLink[] | undefined)
        ?.filter((l: SocialLink) => l.isVisible)
        .sort((a: SocialLink, b: SocialLink) => a.displayOrder - b.displayOrder) || [];

    const whatsappHref = `https://wa.me/${(settings?.whatsappNumber || "916363278962").replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi, I want to book a repair!")}`;

    return (
        <footer className="relative overflow-hidden text-white">


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
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-[52px] h-[52px] rounded-full overflow-hidden flex-shrink-0"
                                    style={{ border: "2px solid rgba(167,139,250,0.4)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}
                                >
                                    <img
                                        src="/profile/profile-image.png"
                                        alt="Founder"
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="font-bricolage font-bold text-[22px] text-white tracking-tight leading-none mb-1.5">
                                        {settings?.shopName || "Allauddin Mobile Service"}
                                    </h3>
                                    <p className="font-dm text-[12px] font-medium tracking-wide uppercase" style={{ color: "rgba(167,139,250,0.9)" }}>Founder · Master Technician</p>
                                </div>
                            </div>
                            <p className="font-dm text-[15px] leading-relaxed mb-7 pr-4 md:pr-10" style={{ color: "rgba(255,255,255,0.7)" }}>
                                Expert phone repair and premium accessories. We bring devices back to life with genuine care and precision.
                            </p>

                            {/* Open Today pill */}
                            <div
                                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7 shadow-sm"
                                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                            >
                                <span className="relative flex w-2.5 h-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-green-500"></span>
                                </span>
                                <span className="font-dm font-medium text-[13.5px] text-green-50">
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
