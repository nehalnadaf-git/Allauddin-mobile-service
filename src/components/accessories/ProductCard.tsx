"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Gift, Eye, Package } from "lucide-react";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { toast } from "@/components/ui/Toast";

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        price: number;
        priceRange?: string;
        imageStorageId?: string;
        imageUrl?: string;
        description?: string;
        isInStock: boolean;
        offerType?: "none" | "discount" | "bogo";
        discountPercentage?: number;
        discountedPrice?: number;
    };
    category?: { name: string };
    index: number;
}

export default function ProductCard({ product, category, index }: ProductCardProps) {
    const { addItem } = useCart();
    const [justAdded, setJustAdded] = useState(false);
    const [hovered, setHovered] = useState(false);

    const isBogo = product.offerType === "bogo";
    const isDiscount = product.offerType === "discount" && !!product.discountPercentage;
    const effectivePrice = isDiscount && product.discountedPrice ? product.discountedPrice : product.price;

    const handleAddToCart = () => {
        if (!product.isInStock || justAdded) return;
        addItem({
            id: product._id,
            name: product.name,
            price: effectivePrice,
            originalPrice: effectivePrice,
            priceRange: product.priceRange,
            imageStorageId: product.imageStorageId,
            itemType: "product",
            offerType: product.offerType ?? "none",
        });
        setJustAdded(true);
        toast(product.name, "cart");
        setTimeout(() => setJustAdded(false), 1200);
    };

    const hasImage = !!(product.imageUrl || product.imageStorageId);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.28), ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex flex-col overflow-hidden rounded-[20px] group ${!product.isInStock ? "opacity-75" : ""}`}
            style={{
                background: "#FFFFFF",
                border: "1px solid rgba(124,58,237,0.1)",
                boxShadow: "0 2px 16px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={e => {
                setHovered(true);
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 16px 48px rgba(124,58,237,0.18), 0 4px 12px rgba(0,0,0,0.07)";
                el.style.borderColor = "rgba(124,58,237,0.22)";
            }}
            onMouseLeave={e => {
                setHovered(false);
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 2px 16px rgba(124,58,237,0.07), 0 1px 4px rgba(0,0,0,0.04)";
                el.style.borderColor = "rgba(124,58,237,0.1)";
            }}
        >
            {/* ── Image area ── */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
                {hasImage ? (
                    <img
                        src={product.imageUrl || `/api/storage/${product.imageStorageId}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        style={{ transition: "transform 0.7s ease" }}
                        loading="lazy"
                    />
                ) : (
                    // Premium placeholder when no image
                    <div
                        className="w-full h-full flex flex-col items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 100%)" }}
                    >
                        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 70% 20%, rgba(167,139,250,0.2) 0%, transparent 60%)" }} />
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(109,40,217,0.5))",
                                border: "1px solid rgba(167,139,250,0.3)",
                                boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                            }}
                        >
                            <Package size={24} color="#E9D5FF" strokeWidth={1.6} />
                        </div>
                        <span className="font-dm text-[11px] mt-3 font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>No image</span>
                    </div>
                )}

                {/* Offer badges */}
                {isDiscount && (
                    <span
                        className="absolute top-2.5 right-2.5 font-poppins font-bold text-[10px] px-2 py-1 rounded-lg z-10"
                        style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 4px 12px rgba(124,58,237,0.4)" }}
                    >
                        {product.discountPercentage}% OFF
                    </span>
                )}
                {isBogo && (
                    <span
                        className="absolute top-2.5 right-2.5 font-poppins font-bold text-[10px] text-center leading-tight px-2 py-1.5 rounded-lg z-10"
                        style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "white", boxShadow: "0 4px 12px rgba(245,158,11,0.4)" }}
                    >
                        BUY 1{"\n"}GET 1
                    </span>
                )}

                {/* Category badge */}
                {category && (
                    <span
                        className="absolute top-2.5 left-2.5 font-poppins font-semibold text-[10px] px-2.5 py-1 rounded-xl z-10"
                        style={{ background: "rgba(26,16,53,0.75)", color: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                        {category.name}
                    </span>
                )}

                {/* Quick-view hover overlay */}
                <AnimatePresence>
                    {hovered && product.isInStock && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="absolute inset-0 flex items-end justify-center pb-4 z-10"
                            style={{ background: "linear-gradient(to top, rgba(26,16,53,0.65) 0%, transparent 60%)" }}
                        >
                            <Link
                                href={`/accessories/${product._id}`}
                                className="flex items-center gap-1.5 font-poppins font-semibold text-[11px] px-4 py-2 rounded-full transition-all"
                                style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
                            >
                                <Eye size={12} />
                                Quick View
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Out of Stock overlay */}
                {!product.isInStock && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,5,20,0.5)", backdropFilter: "blur(2px)" }}>
                        <span className="font-poppins font-bold text-[12px] px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}>
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* ── Card body ── */}
            <div className="flex flex-col flex-1 p-3.5 md:p-4">
                {/* Name */}
                <h3 className="font-poppins font-semibold text-[13px] md:text-[14px] text-[#1A1035] mb-1 leading-snug line-clamp-2 group-hover:text-[#7C3AED] transition-colors duration-200">
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="font-dm text-[11px] md:text-[12px] leading-relaxed line-clamp-2 mb-2" style={{ color: "#9CA3AF" }}>
                        {product.description}
                    </p>
                )}

                {/* Price + CTA */}
                <div className="mt-auto pt-2">
                    {/* Price */}
                    {isDiscount && product.discountedPrice ? (
                        <div className="flex items-baseline gap-1.5 mb-2.5">
                            <span className="font-poppins font-bold text-[16px] md:text-[17px] text-[#7C3AED]">
                                ₹{product.discountedPrice}
                            </span>
                            <span className="font-dm text-[11px] line-through" style={{ color: "#D1D5DB" }}>
                                ₹{product.price}
                            </span>
                        </div>
                    ) : (
                        <p className="font-poppins font-bold text-[16px] md:text-[17px] text-[#7C3AED] mb-2.5">
                            {product.priceRange || `₹${product.price}`}
                        </p>
                    )}

                    {/* Add to Cart button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.isInStock}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-poppins font-semibold text-[12px] md:text-[13px] transition-all duration-200 active:scale-95 min-h-[40px]"
                        style={
                            justAdded
                                ? { background: "linear-gradient(135deg,#10B981,#059669)", color: "white", boxShadow: "0 4px 14px rgba(16,185,129,0.3)" }
                                : !product.isInStock
                                    ? { background: "rgba(0,0,0,0.06)", color: "#9CA3AF", cursor: "not-allowed" }
                                    : isBogo
                                        ? { background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "white", boxShadow: "0 4px 14px rgba(245,158,11,0.3)" }
                                        : { background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }
                        }
                    >
                        <AnimatePresence mode="wait">
                            {justAdded ? (
                                <motion.span key="added" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5">
                                    <Check size={13} /> Added!
                                </motion.span>
                            ) : isBogo ? (
                                <motion.span key="bogo" className="flex items-center gap-1.5">
                                    <Gift size={13} /> Add — Get 1 Free
                                </motion.span>
                            ) : (
                                <motion.span key="default" className="flex items-center gap-1.5">
                                    <ShoppingCart size={13} /> Add to Cart
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Bottom violet hover line */}
            <div
                className="h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                style={{ background: "linear-gradient(90deg, #7C3AED, #A78BFA, transparent)" }}
            />
        </motion.div>
    );
}
