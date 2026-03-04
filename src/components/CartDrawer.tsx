"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, Gift, Wrench, Package } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import { buildCashOrderLink, buildUpiOrderLink } from "@/lib/whatsapp";

export default function CartDrawer() {
    const { items, totalItems, totalAmount, isCartOpen, closeCart, increment, decrement, removeItem, clearCart } = useCart();
    const settings = useQuery(api.settings.get);

    const handleCashOrder = () => {
        if (!settings || items.length === 0) return;
        const link = buildCashOrderLink(settings.whatsappNumber, items, totalAmount);
        window.open(link, "_blank");
    };

    const handleUpiOrder = () => {
        if (!settings || items.length === 0) return;
        const { whatsappLink } = buildUpiOrderLink(
            settings.whatsappNumber,
            items,
            totalAmount,
            settings.upiId
        );
        window.open(whatsappLink, "_blank");
    };

    const paidItems = items.filter(i => !i.isFreeItem);
    const freeItemMap = Object.fromEntries(
        items.filter(i => i.isFreeItem).map(i => [i.pairedItemId, i])
    );

    const hasServices = paidItems.some(i => i.itemType === "service");
    const accessoriesTotal = items
        .filter(i => i.itemType === "product" && !i.isFreeItem)
        .reduce((sum, i) => sum + i.originalPrice * i.quantity, 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-50"
                        onClick={closeCart}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed top-0 right-0 h-full z-50 flex flex-col"
                        style={{
                            width: "min(420px, 92vw)",
                            background: "rgba(255,255,255,0.98)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            borderLeft: "1px solid rgba(124,58,237,0.15)",
                        }}
                    >
                        {/* ── Header ── */}
                        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
                            <div className="flex items-center gap-2.5">
                                <h2 className="font-poppins font-semibold text-xl text-[#0F0F0F]">Your Cart</h2>
                                {totalItems > 0 && (
                                    <span className="bg-primary text-white text-xs font-poppins font-bold px-2.5 py-0.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                                style={{ background: "rgba(0,0,0,0.05)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.10)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.05)"; }}
                                aria-label="Close cart"
                            >
                                <X size={18} className="text-[#0F0F0F]" />
                            </button>
                        </div>
                        <div className="section-divider flex-shrink-0" />

                        {/* ── Cart Items ── */}
                        <div className="flex-1 overflow-y-auto px-4 py-4">
                            {paidItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                                    <ShoppingBag size={64} className="text-border-dark" />
                                    <p className="font-poppins font-medium text-lg text-[#0F0F0F]">Your cart is empty</p>
                                    <p className="font-dm text-sm text-[#6B7280]">Add services or accessories to get started</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {paidItems.map((item) => {
                                        const freeItem = freeItemMap[item.id];
                                        const isService = item.itemType === "service";
                                        return (
                                            <div key={item.id} className="space-y-1.5">
                                                {/* ── Item Card ── */}
                                                <div
                                                    className="rounded-2xl overflow-hidden"
                                                    style={{
                                                        background: isService
                                                            ? "linear-gradient(135deg, rgba(26,16,53,0.04), rgba(45,27,105,0.07))"
                                                            : "rgba(0,0,0,0.025)",
                                                        border: isService
                                                            ? "1px solid rgba(124,58,237,0.14)"
                                                            : "1px solid rgba(0,0,0,0.06)",
                                                    }}
                                                >
                                                    {/* Top row: icon + name + delete */}
                                                    <div className="flex items-start gap-3 px-4 pt-4 pb-3">
                                                        {/* Icon badge */}
                                                        <div
                                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                                            style={{
                                                                background: isService
                                                                    ? "linear-gradient(135deg, #1A1035, #2D1B69)"
                                                                    : "rgba(124,58,237,0.08)",
                                                            }}
                                                        >
                                                            {isService
                                                                ? <Wrench size={15} color="#E9D5FF" />
                                                                : <Package size={15} style={{ color: "#7C3AED" }} />
                                                            }
                                                        </div>

                                                        {/* Name (full width, wraps naturally) */}
                                                        <div className="flex-1 min-w-0">
                                                            {/* Type badge */}
                                                            <span
                                                                className="inline-flex items-center gap-1 font-poppins font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full mb-1"
                                                                style={
                                                                    isService
                                                                        ? { background: "rgba(124,58,237,0.12)", color: "#7C3AED" }
                                                                        : { background: "rgba(0,0,0,0.06)", color: "#6B7280" }
                                                                }
                                                            >
                                                                {isService ? <Wrench size={8} /> : <Package size={8} />}
                                                                {isService ? "Repair Service" : "Accessory"}
                                                            </span>
                                                            {/* Full name — wraps, never truncates */}
                                                            <p className="font-dm font-semibold text-[14px] text-[#0F0F0F] leading-snug break-words">
                                                                {item.name}
                                                            </p>
                                                        </div>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="p-1.5 rounded-lg transition-colors flex-shrink-0"
                                                            style={{ color: "#9CA3AF" }}
                                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#EF4444"; }}
                                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; }}
                                                            aria-label="Remove item"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>

                                                    {/* Bottom row: price + quantity controls */}
                                                    <div
                                                        className="flex items-center justify-between px-4 pb-3"
                                                    >
                                                        {/* Price */}
                                                        <span className="font-poppins font-bold text-[15px] text-[#7C3AED]">
                                                            {isService
                                                                ? "Price on diagnosis"
                                                                : `₹${item.originalPrice * item.quantity}`
                                                            }
                                                        </span>

                                                        {/* Quantity controls — only for products */}
                                                        {!isService && (
                                                            <div
                                                                className="flex items-center gap-0 rounded-xl overflow-hidden"
                                                                style={{ border: "1.5px solid rgba(124,58,237,0.2)" }}
                                                            >
                                                                <button
                                                                    onClick={() => decrement(item.id)}
                                                                    className="w-9 h-9 flex items-center justify-center transition-colors"
                                                                    style={{ color: "#7C3AED" }}
                                                                    onMouseEnter={e => {
                                                                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                                                                    }}
                                                                    onMouseLeave={e => {
                                                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                                                    }}
                                                                    aria-label="Decrease"
                                                                >
                                                                    <Minus size={13} />
                                                                </button>
                                                                <span
                                                                    className="w-8 text-center font-poppins font-semibold text-[14px] text-[#0F0F0F]"
                                                                    style={{ borderLeft: "1px solid rgba(124,58,237,0.15)", borderRight: "1px solid rgba(124,58,237,0.15)" }}
                                                                >
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => increment(item.id)}
                                                                    className="w-9 h-9 flex items-center justify-center transition-colors"
                                                                    style={{ color: "#7C3AED" }}
                                                                    onMouseEnter={e => {
                                                                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                                                                    }}
                                                                    onMouseLeave={e => {
                                                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                                                    }}
                                                                    aria-label="Increase"
                                                                >
                                                                    <Plus size={13} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* BOGO Free Item Row */}
                                                {freeItem && (
                                                    <div
                                                        className="flex items-center gap-3 p-3 rounded-2xl ml-3"
                                                        style={{
                                                            background: "rgba(16,185,129,0.06)",
                                                            border: "1px solid rgba(16,185,129,0.2)",
                                                        }}
                                                    >
                                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                                            style={{ background: "rgba(16,185,129,0.12)" }}>
                                                            <Gift size={15} style={{ color: "#059669" }} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-dm font-medium text-[13px] text-[#0F0F0F] leading-snug break-words italic">
                                                                {freeItem.name}
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-0.5">
                                                                <span className="font-poppins font-bold text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded text-white"
                                                                    style={{ background: "#10B981" }}>
                                                                    FREE
                                                                </span>
                                                                <span className="font-poppins font-bold text-sm" style={{ color: "#059669" }}>₹0</span>
                                                                <span className="text-xs text-muted font-dm ml-auto">x{freeItem.quantity}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* ── Footer ── */}
                        {paidItems.length > 0 && (
                            <div className="flex-shrink-0">
                                <div className="section-divider" />
                                <div className="px-5 py-4 space-y-3">

                                    {/* Totals */}
                                    <div className="space-y-2">
                                        {hasServices && (
                                            <div className="flex items-center gap-2 py-2 px-3 rounded-xl"
                                                style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.1)" }}>
                                                <Wrench size={13} style={{ color: "#7C3AED", flexShrink: 0 }} />
                                                <span className="font-dm text-[#7C3AED] text-xs">
                                                    Repair price confirmed at shop after diagnosis
                                                </span>
                                            </div>
                                        )}
                                        {accessoriesTotal > 0 && (
                                            <div className="flex items-center justify-between px-1">
                                                <span className="font-dm text-[#6B7280] text-sm flex items-center gap-1.5">
                                                    <Package size={13} style={{ color: "#7C3AED" }} />
                                                    Accessories Total
                                                </span>
                                                <span className="font-poppins font-bold text-xl text-[#7C3AED]">₹{accessoriesTotal}</span>
                                            </div>
                                        )}
                                        {!hasServices && (
                                            <div className="flex justify-end">
                                                <span className="font-dm text-[#9CA3AF] text-xs">
                                                    {totalItems} item{totalItems !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Cash / Book button */}
                                    <button
                                        onClick={handleCashOrder}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 font-poppins font-semibold text-sm text-[#7C3AED] rounded-xl transition-all"
                                        style={{ border: "1.5px solid #7C3AED", background: "transparent" }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)"; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                    >
                                        <MessageCircle size={17} />
                                        {hasServices && accessoriesTotal === 0
                                            ? "Book via WhatsApp"
                                            : "Pay with Cash on Pickup"}
                                    </button>

                                    {accessoriesTotal > 0 && (
                                        <button
                                            onClick={handleUpiOrder}
                                            className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-poppins font-semibold text-sm rounded-xl transition-all"
                                            style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 4px 14px rgba(124,58,237,0.3)" }}
                                        >
                                            Pay via UPI — ₹{accessoriesTotal}
                                        </button>
                                    )}

                                    <button
                                        onClick={clearCart}
                                        className="w-full py-2 text-sm font-dm transition-colors"
                                        style={{ color: "#9CA3AF" }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#EF4444"; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#9CA3AF"; }}
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
