"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, ShoppingBag, X } from "lucide-react";

import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import ProductCard from "@/components/accessories/ProductCard";

export default function AccessoriesPage() {
    const products = useQuery(api.products.listVisible);
    const categories = useQuery(api.categories.listVisible);
    const settings = useQuery(api.settings.get);

    const [activeOffer, setActiveOffer] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter((p: any) => {
            const matchesOffer = !activeOffer || p.offerType === activeOffer;
            const matchesSearch =
                !searchQuery ||
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());
            return matchesOffer && matchesSearch;
        });
    }, [products, activeOffer, searchQuery]);

    const activeCount = filteredProducts.length;

    return (
        <div className="min-h-screen" style={{ background: "#F4F3FF" }}>

            {/* ── Hero ── */}
            <section
                className="relative overflow-hidden pt-28 pb-0 md:pt-36"
                style={{ background: "linear-gradient(160deg, #0F0A1E 0%, #1A1035 50%, #2D1B69 100%)" }}
            >
                {/* Ambient orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)", transform: "translate(20%, -30%)" }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 65%)", transform: "translate(-20%, 30%)" }} />
                {/* Noise */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

                <div className="container-max mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}>
                            <ShoppingBag size={13} style={{ color: "#A78BFA" }} />
                            <span className="font-poppins font-semibold text-[11px] tracking-[0.08em] uppercase" style={{ color: "#A78BFA" }}>Shop</span>
                        </div>

                        <h1 className="font-bricolage font-bold text-white mb-4 leading-[1.15]" style={{ fontSize: "clamp(30px, 6vw, 48px)", letterSpacing: "-0.02em" }}>
                            Mobile Accessories
                        </h1>
                        <p className="font-dm text-[16px] md:text-[17px] max-w-[500px] mx-auto leading-[1.65] mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
                            Premium gear for every device. Genuine quality, fair prices, available in‑store.
                        </p>

                        {/* In-store notice */}
                        {settings?.inStoreNoticeVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-2"
                                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                            >
                                <Info size={14} style={{ color: "#A78BFA", flexShrink: 0 }} />
                                <span className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.8)" }}>
                                    {settings.inStoreNoticeText || "In-store collection only — no home delivery"}
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Wave into content */}
                <div className="relative mt-10 -mb-1" style={{ height: "60px" }}>
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                        <path d="M0 60 C360 0, 1080 0, 1440 60 L1440 60 L0 60 Z" fill="#F4F3FF" />
                    </svg>
                </div>
            </section>

            {/* ── Filter Bar ── */}
            <div
                style={{
                    background: "rgba(244,243,255,0.98)",
                    borderBottom: "1px solid rgba(124,58,237,0.1)",
                    boxShadow: "0 4px 24px rgba(124,58,237,0.06)",
                }}
            >
                <div className="container-max mx-auto px-4 py-3">
                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                        <button
                            onClick={() => setActiveOffer(null)}
                            className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-poppins font-semibold transition-all duration-200 whitespace-nowrap"
                            style={
                                activeOffer === null
                                    ? { background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }
                                    : { background: "rgba(124,58,237,0.08)", color: "#7C3AED" }
                            }
                        >
                            All Products
                        </button>
                        {[
                            { id: "discount", name: "Discount Offers" },
                            { id: "bogo", name: "Buy 1 Get 1" }
                        ].map((offer) => (
                            <button
                                key={offer.id}
                                onClick={() => setActiveOffer(activeOffer === offer.id ? null : offer.id)}
                                className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-poppins font-semibold transition-all duration-200 whitespace-nowrap"
                                style={
                                    activeOffer === offer.id
                                        ? { background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }
                                        : { background: "rgba(124,58,237,0.08)", color: "#7C3AED" }
                                }
                            >
                                {offer.name}
                            </button>
                        ))}
                    </div>

                    {/* Search + result count */}
                    <div className="flex items-center gap-3 mt-2">
                        <div className="relative flex-1">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search accessories…"
                                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-[13px] font-dm outline-none transition-all duration-300"
                                style={{
                                    border: "1.5px solid rgba(124,58,237,0.15)",
                                    background: "white",
                                    color: "#1A1035",
                                }}
                                onFocus={e => {
                                    (e.target as HTMLElement).style.borderColor = "#7C3AED";
                                    (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
                                }}
                                onBlur={e => {
                                    (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.15)";
                                    (e.target as HTMLElement).style.boxShadow = "none";
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                                    style={{ color: "#9CA3AF" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "#7C3AED")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <span className="font-dm text-[12px] flex-shrink-0 font-medium" style={{ color: "#9CA3AF" }}>
                            {activeCount} item{activeCount !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Product Grid ── */}
            <section className="py-8 md:py-12" style={{ background: "#F4F3FF" }}>
                <div className="container-max mx-auto px-4">
                    <AnimatePresence mode="wait">
                        {products === undefined ? (
                            // Skeleton
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
                            >
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="rounded-[20px] overflow-hidden" style={{ background: "white", border: "1px solid rgba(124,58,237,0.08)" }}>
                                        <div className="skeleton" style={{ aspectRatio: "1/1" }} />
                                        <div className="p-3.5">
                                            <div className="skeleton h-4 w-3/4 rounded mb-2" />
                                            <div className="skeleton h-3 w-full rounded mb-1" />
                                            <div className="skeleton h-3 w-2/3 rounded mb-4" />
                                            <div className="skeleton h-5 w-1/3 rounded mb-3" />
                                            <div className="skeleton h-9 w-full rounded-xl" />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : filteredProducts.length > 0 ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
                            >
                                {filteredProducts.map((product: any, index: number) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        category={categories?.find((c: any) => c._id === product.categoryId)}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24"
                            >
                                <div
                                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                                    style={{ background: "linear-gradient(135deg,#1A1035,#2D1B69)", boxShadow: "0 8px 32px rgba(124,58,237,0.2)" }}
                                >
                                    <ShoppingBag size={32} color="#E9D5FF" strokeWidth={1.5} />
                                </div>
                                <p className="font-bricolage font-bold text-[20px] text-[#1A1035] mb-2">
                                    No products found
                                </p>
                                <p className="font-dm text-[14px] mb-6" style={{ color: "#9CA3AF" }}>
                                    Try a different category or search term
                                </p>
                                {(activeOffer || searchQuery) && (
                                    <button
                                        onClick={() => { setActiveOffer(null); setSearchQuery(""); }}
                                        className="font-poppins font-semibold text-[13px] px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                                        style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
}
