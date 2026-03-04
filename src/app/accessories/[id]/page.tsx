"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ShoppingCart, Check, ArrowLeft, Package, Tag,
    Gift, BadgeCheck, ShieldCheck,
} from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import { useCart } from "@/lib/cart";
import { toast } from "@/components/ui/Toast";
import Link from "next/link";
import { useState } from "react";
import { useStorageUrl } from "@/lib/hooks/useStorageUrl";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { addItem } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    const product = useQuery(api.products.get, { id: id as any });
    const categories = useQuery(api.categories.listVisible);

    const isLoading = product === undefined;
    const notFound = product === null;

    const category = categories?.find((c: any) => c._id === product?.categoryId);
    const isBogo = product?.offerType === "bogo";
    const isDiscount = product?.offerType === "discount" && !!product?.discountPercentage;
    const effectivePrice = isDiscount && product?.discountedPrice ? product.discountedPrice : product?.price ?? 0;

    const handleAddToCart = () => {
        if (!product || !product.isInStock || justAdded) return;
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
        setTimeout(() => setJustAdded(false), 1400);
    };

    const resolvedStorageUrl = useStorageUrl(product?.imageStorageId);
    const hasImage = !!((product as any)?.imageUrl || resolvedStorageUrl);
    const imageUrl = (product as any)?.imageUrl || resolvedStorageUrl;

    return (
        <div className="min-h-screen" style={{ background: "#F4F3FF" }}>

            {/* Top spacer for navbar */}
            <div className="h-24" />

            {/* Back button */}
            <div className="container-max mx-auto px-4 mb-6">
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 font-dm text-[14px] transition-colors"
                    style={{ color: "#7C3AED" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#6D28D9")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#7C3AED")}
                >
                    <ArrowLeft size={16} />
                    Back to Accessories
                </button>
            </div>

            {/* ── Loading skeleton ── */}
            {isLoading && (
                <div className="container-max mx-auto px-4 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-4xl mx-auto">
                        <div className="skeleton rounded-3xl" style={{ aspectRatio: "1/1" }} />
                        <div className="space-y-4 pt-4">
                            <div className="skeleton h-5 w-24 rounded-full" />
                            <div className="skeleton h-9 w-3/4 rounded-xl" />
                            <div className="skeleton h-4 w-full rounded" />
                            <div className="skeleton h-4 w-5/6 rounded" />
                            <div className="skeleton h-10 w-1/3 rounded-xl mt-4" />
                            <div className="skeleton h-14 w-full rounded-2xl mt-6" />
                        </div>
                    </div>
                </div>
            )}

            {/* ── 404 state ── */}
            {notFound && (
                <div className="container-max mx-auto px-4 pb-20 text-center py-24">
                    <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                        style={{ background: "linear-gradient(135deg,#1A1035,#2D1B69)", boxShadow: "0 8px 32px rgba(124,58,237,0.2)" }}
                    >
                        <Package size={32} color="#E9D5FF" strokeWidth={1.5} />
                    </div>
                    <p className="font-bricolage font-bold text-[22px] text-[#1A1035] mb-2">Product not found</p>
                    <p className="font-dm text-[14px] mb-6" style={{ color: "#9CA3AF" }}>
                        This product may have been removed or the link is invalid.
                    </p>
                    <Link
                        href="/accessories"
                        className="inline-flex items-center gap-2 font-poppins font-semibold text-[13px] px-6 py-2.5 rounded-full text-white"
                        style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
                    >
                        <ArrowLeft size={15} /> Browse Accessories
                    </Link>
                </div>
            )}

            {/* ── Product Detail ── */}
            {product && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="container-max mx-auto px-4 pb-24"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">

                        {/* ── Image ── */}
                        <div
                            className="relative rounded-3xl overflow-hidden"
                            style={{
                                aspectRatio: "1/1",
                                background: hasImage ? undefined : "linear-gradient(135deg, #1A1035 0%, #2D1B69 100%)",
                                boxShadow: "0 24px 60px rgba(124,58,237,0.18), 0 4px 16px rgba(0,0,0,0.08)",
                            }}
                        >
                            {hasImage ? (
                                <img
                                    src={imageUrl!}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                                    <div className="absolute inset-0 pointer-events-none"
                                        style={{ background: "radial-gradient(circle at 70% 20%, rgba(167,139,250,0.2) 0%, transparent 60%)" }} />
                                    <div
                                        className="w-20 h-20 rounded-3xl flex items-center justify-center"
                                        style={{ background: "rgba(124,58,237,0.4)", border: "1px solid rgba(167,139,250,0.4)", boxShadow: "0 0 40px rgba(124,58,237,0.4)" }}
                                    >
                                        <Package size={36} color="#E9D5FF" strokeWidth={1.5} />
                                    </div>
                                    <span className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.4)" }}>No image available</span>
                                </div>
                            )}

                            {/* Offer badge overlay */}
                            {isDiscount && (
                                <span
                                    className="absolute top-4 left-4 font-poppins font-bold text-[12px] px-3 py-1.5 rounded-xl text-white"
                                    style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 4px 12px rgba(124,58,237,0.5)" }}
                                >
                                    {product.discountPercentage}% OFF
                                </span>
                            )}
                            {isBogo && (
                                <span
                                    className="absolute top-4 left-4 font-poppins font-bold text-[11px] text-center leading-tight px-3 py-2 rounded-xl text-white"
                                    style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", boxShadow: "0 4px 12px rgba(245,158,11,0.5)" }}
                                >
                                    BUY 1 GET 1
                                </span>
                            )}
                            {!product.isInStock && (
                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,5,20,0.55)", backdropFilter: "blur(4px)" }}>
                                    <span
                                        className="font-poppins font-bold text-[14px] px-5 py-2.5 rounded-full"
                                        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}
                                    >
                                        Out of Stock
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* ── Info ── */}
                        <div className="flex flex-col pt-2">

                            {/* Category + badges row */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {category && (
                                    <span
                                        className="inline-flex items-center gap-1.5 font-poppins font-semibold text-[11px] px-3 py-1 rounded-full"
                                        style={{ background: "rgba(124,58,237,0.1)", color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)" }}
                                    >
                                        <Tag size={10} /> {category.name}
                                    </span>
                                )}
                                {isBogo && (
                                    <span className="inline-flex items-center gap-1.5 font-poppins font-semibold text-[11px] px-3 py-1 rounded-full text-white"
                                        style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)" }}>
                                        <Gift size={10} /> Buy 1 Get 1 Free
                                    </span>
                                )}
                                {isDiscount && (
                                    <span className="inline-flex items-center gap-1.5 font-poppins font-semibold text-[11px] px-3 py-1 rounded-full text-white"
                                        style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                                        <BadgeCheck size={10} /> {product.discountPercentage}% Off
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h1
                                className="font-bricolage font-bold text-[#1A1035] leading-tight mb-3"
                                style={{ fontSize: "clamp(24px, 4vw, 36px)", letterSpacing: "-0.02em" }}
                            >
                                {product.name}
                            </h1>

                            {/* Description */}
                            {product.description && (
                                <p className="font-dm text-[15px] leading-relaxed mb-6" style={{ color: "#64748B" }}>
                                    {product.description}
                                </p>
                            )}

                            {/* Price */}
                            <div className="mb-6">
                                {isDiscount && product.discountedPrice ? (
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-bricolage font-bold text-[36px] text-[#7C3AED]">
                                            ₹{product.discountedPrice}
                                        </span>
                                        <span className="font-dm text-[18px] line-through" style={{ color: "#D1D5DB" }}>
                                            ₹{product.price}
                                        </span>
                                        <span
                                            className="font-poppins font-bold text-[12px] px-2.5 py-1 rounded-lg text-white"
                                            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}
                                        >
                                            Save ₹{product.price - product.discountedPrice}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-bricolage font-bold text-[36px] text-[#7C3AED]">
                                        {product.priceRange || `₹${product.price}`}
                                    </span>
                                )}
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                {[
                                    { icon: <ShieldCheck size={13} />, text: "Genuine Quality" },
                                    { icon: <BadgeCheck size={13} />, text: "In-store pickup" },
                                ].map((b, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-dm text-[12px] font-medium"
                                        style={{ background: "white", border: "1px solid rgba(124,58,237,0.1)", color: "#64748B", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                                    >
                                        <span style={{ color: "#7C3AED" }}>{b.icon}</span> {b.text}
                                    </div>
                                ))}
                            </div>

                            {/* Add to Cart button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.isInStock}
                                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-poppins font-bold text-[15px] transition-all duration-200 active:scale-[0.98]"
                                style={
                                    justAdded
                                        ? { background: "linear-gradient(135deg,#10B981,#059669)", color: "white", boxShadow: "0 8px 24px rgba(16,185,129,0.35)" }
                                        : !product.isInStock
                                            ? { background: "rgba(0,0,0,0.06)", color: "#9CA3AF", cursor: "not-allowed" }
                                            : isBogo
                                                ? { background: "linear-gradient(135deg,#F59E0B,#D97706)", color: "white", boxShadow: "0 8px 24px rgba(245,158,11,0.35)" }
                                                : { background: "linear-gradient(135deg,#7C3AED,#6D28D9)", color: "white", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }
                                }
                            >
                                {justAdded ? (
                                    <><Check size={18} /> Added to Cart!</>
                                ) : isBogo ? (
                                    <><Gift size={18} /> Add — Get 1 Free</>
                                ) : (
                                    <><ShoppingCart size={18} /> Add to Cart</>
                                )}
                            </button>

                            {!product.isInStock && (
                                <p className="mt-3 text-center font-dm text-[13px]" style={{ color: "#9CA3AF" }}>
                                    Currently out of stock — check back soon.
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
