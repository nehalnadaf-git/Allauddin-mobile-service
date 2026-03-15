"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, X, MessageCircle, ArrowRight, Wrench, Phone, MapPin, Home, Settings, Package, Smartphone } from "lucide-react";
import { useRepairModal } from "@/lib/hooks/useRepairModal";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/accessories", label: "Accessories" },
    { href: "/sell-your-mobile", label: "Sell Mobile", badge: "NEW" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();
    const { openRepairModal } = useRepairModal();
    const { openCart, totalItems } = useCart();
    const settings = useQuery(api.settings.get);

    const whatsappHref = settings
        ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi! I would like to book a repair.")}`
        : "#";

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 20);

            if (currentScrollY < 10) {
                setVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setVisible(false);
            } else {
                // Scrolling up
                setVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Close menu on route change
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                    transform: visible ? "translateY(0)" : "translateY(-100%)",
                    opacity: visible ? 1 : 0,
                }}
            >
                <nav
                    className="pointer-events-auto w-full max-w-[900px] flex items-center justify-between px-5 py-3 transition-all duration-300"
                    style={{
                        background: scrolled
                            ? "rgba(255,255,255,0.82)"
                            : "rgba(255,255,255,0.65)",
                        backdropFilter: scrolled
                            ? "blur(32px) saturate(220%)"
                            : "blur(24px) saturate(200%)",
                        WebkitBackdropFilter: scrolled
                            ? "blur(32px) saturate(220%)"
                            : "blur(24px) saturate(200%)",
                        border: "1px solid rgba(255,255,255,0.8)",
                        boxShadow: scrolled
                            ? "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.95)"
                            : "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)",
                        borderRadius: "9999px",
                    }}
                >
                    {/* ── Logo ── */}
                    <Link href="/" className="flex items-center gap-2.5 min-w-0 flex-shrink">
                        <div
                            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-violet/30"
                            style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.25)" }}
                        >
                            <img
                                src="/profile/profile-image.png"
                                alt="Allauddin"
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <span className="font-poppins font-semibold text-[13px] sm:text-[15px] text-near-black truncate">
                            Allauddin Mobile Service
                        </span>
                    </Link>

                    {/* ── Desktop Nav Links ── */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative font-dm font-medium text-[14px] px-4 py-2 rounded-full transition-colors duration-200"
                                    style={{ color: isActive ? "#7C3AED" : "#374151" }}
                                >
                                    {link.label}
                                    {(link as any).badge && (
                                        <span
                                            className="absolute font-poppins font-bold"
                                            style={{
                                                top: "-2px",
                                                right: "-4px",
                                                fontSize: "9px",
                                                background: "#E74C3C",
                                                color: "#FFFFFF",
                                                borderRadius: "9999px",
                                                padding: "2px 5px",
                                                lineHeight: 1.2,
                                            }}
                                        >
                                            {(link as any).badge}
                                        </span>
                                    )}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-violet"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* ── Right: Cart + Hamburger (all screens) ── */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={openCart}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-black/5 active:scale-95"
                            style={{ color: "#374151" }}
                            aria-label="View cart"
                        >
                            <ShoppingCart size={20} />
                            {totalItems > 0 && (
                                <span
                                    className="absolute top-0.5 right-0.5 min-w-[17px] h-[17px] rounded-full flex items-center justify-center font-poppins font-bold text-[10px] text-white"
                                    style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 2px 6px rgba(124,58,237,0.5)" }}
                                >
                                    {totalItems > 9 ? "9+" : totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-black/5 active:scale-95"
                            style={{ color: "#374151" }}
                            aria-label="Open menu"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* ── Responsive Drawer Menu ── */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop overlay for desktop */}
                        <motion.div
                            key="menu-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                            className="hidden md:block fixed inset-0 z-[190] bg-[#0F0A1E]/40 backdrop-blur-md"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            key="menu-panel"
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 md:left-auto md:w-[460px] z-[200] flex flex-col overflow-hidden md:border-l md:border-white/10 md:shadow-2xl"
                            style={{ background: "linear-gradient(160deg, #0F0A1E 0%, #1A1035 55%, #2D1B69 100%)" }}
                        >
                            {/* Ambient orbs */}
                            <div className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                            <div className="absolute bottom-0 left-0 w-[220px] h-[220px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)", transform: "translate(-20%, 25%)" }} />
                            {/* Noise overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

                            {/* ── Header ── */}
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05, duration: 0.4 }}
                                className="relative z-10 flex items-center justify-end px-6 pt-8 pb-6"
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                            >
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90"
                                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
                                    aria-label="Close menu"
                                >
                                    <X size={18} />
                                </button>
                            </motion.div>

                            {/* ── Nav links ── */}
                            <nav className="relative z-10 flex flex-col px-5 pt-4 gap-1">
                                {[
                                    { href: "/", label: "Home", Icon: Home },
                                    { href: "/services", label: "Our Services", Icon: Settings },
                                    { href: "/accessories", label: "Shop Accessories", Icon: Package },
                                    { href: "/sell-your-mobile", label: "Sell Your Mobile", Icon: Smartphone, badge: "NEW" },
                                ].map((link, i) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.12 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all active:scale-[0.98]"
                                                style={{
                                                    background: isActive ? "rgba(124,58,237,0.18)" : "transparent",
                                                    border: isActive ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                                                }}
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                                                    style={{
                                                        background: isActive ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.06)",
                                                        border: `1px solid ${isActive ? "rgba(167,139,250,0.4)" : "rgba(255,255,255,0.08)"}`,
                                                    }}
                                                >
                                                    <link.Icon size={17} style={{ color: isActive ? "#A78BFA" : "rgba(255,255,255,0.55)" }} />
                                                </div>
                                                <span
                                                    className="font-poppins font-semibold text-[16px] flex-1 flex items-center gap-2"
                                                    style={{ color: isActive ? "#E9D5FF" : "rgba(255,255,255,0.82)" }}
                                                >
                                                    {link.label}
                                                    {(link as any).badge && (
                                                        <span
                                                            className="font-poppins font-bold"
                                                            style={{
                                                                fontSize: "9px",
                                                                background: "#E74C3C",
                                                                color: "#FFFFFF",
                                                                borderRadius: "9999px",
                                                                padding: "2px 6px",
                                                            }}
                                                        >
                                                            {(link as any).badge}
                                                        </span>
                                                    )}
                                                </span>
                                                <ArrowRight
                                                    size={15}
                                                    className="transition-all duration-200 group-hover:translate-x-1"
                                                    style={{ color: isActive ? "#A78BFA" : "rgba(255,255,255,0.2)" }}
                                                />
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* ── Book Repair CTA ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.4 }}
                                className="relative z-10 px-5 mt-4"
                            >
                                <button
                                    onClick={() => { setMenuOpen(false); openRepairModal(); }}
                                    className="w-full flex items-center justify-center gap-2.5 h-[52px] rounded-2xl font-poppins font-bold text-[15px] text-white transition-all active:scale-[0.97]"
                                    style={{
                                        background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
                                        boxShadow: "0 8px 28px rgba(124,58,237,0.45)",
                                    }}
                                >
                                    <Wrench size={17} />
                                    Book a Repair
                                </button>
                            </motion.div>

                            {/* ── Info strip ── */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.42, duration: 0.4 }}
                                className="relative z-10 mx-5 mt-4 px-4 py-4 rounded-2xl flex flex-col gap-2.5"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                            >
                                {/* Open status */}
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: "#22C55E" }} />
                                    <span className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>Open Daily · <span style={{ color: "rgba(255,255,255,0.75)" }}>10AM – 8PM</span></span>
                                </div>
                                {/* Location */}
                                <div className="flex items-center gap-2.5">
                                    <MapPin size={13} style={{ color: "rgba(167,139,250,0.7)", flexShrink: 0 }} />
                                    <span className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>Harsha Complex, Hubli, Karnataka</span>
                                </div>
                                {/* Phone */}
                                <div className="flex items-center gap-2.5">
                                    <Phone size={13} style={{ color: "rgba(167,139,250,0.7)", flexShrink: 0 }} />
                                    <span className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>+91 63632 78962</span>
                                </div>
                            </motion.div>

                            {/* ── WhatsApp ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="relative z-10 px-5 mt-4 pb-10"
                            >
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full h-[52px] rounded-2xl font-poppins font-semibold text-[15px] text-white transition-all active:scale-[0.97]"
                                    style={{
                                        background: "linear-gradient(135deg, #25D366, #1aA052)",
                                        boxShadow: "0 6px 24px rgba(37,211,102,0.3)",
                                    }}
                                >
                                    <MessageCircle size={18} />
                                    Message on WhatsApp
                                </a>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
