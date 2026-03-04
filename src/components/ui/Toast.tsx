"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ShoppingCart, X } from "lucide-react";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "cart";
}

let addToastFn: ((message: string, type: "success" | "error" | "cart") => void) | null = null;

export function toast(message: string, type: "success" | "error" | "cart" = "success") {
    addToastFn?.(message, type);
}

export function ToastContainer() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        addToastFn = (message: string, type: "success" | "error" | "cart") => {
            const id = Math.random().toString(36).slice(2);
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3500);
        };
        return () => { addToastFn = null; };
    }, []);

    return (
        <div className="fixed bottom-6 left-0 right-0 z-[300] flex flex-col-reverse items-center gap-2.5 pointer-events-none px-4">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, y: 16, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.94 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="pointer-events-auto w-full max-w-sm flex items-center gap-3 px-4 py-3.5 rounded-2xl"
                        style={
                            t.type === "cart"
                                ? {
                                    background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 100%)",
                                    border: "1px solid rgba(167,139,250,0.3)",
                                    boxShadow: "0 12px 40px rgba(124,58,237,0.35), 0 2px 8px rgba(0,0,0,0.2)",
                                }
                                : t.type === "success"
                                    ? {
                                        background: "linear-gradient(135deg, #064E3B, #065F46)",
                                        border: "1px solid rgba(52,211,153,0.3)",
                                        boxShadow: "0 12px 40px rgba(16,185,129,0.25), 0 2px 8px rgba(0,0,0,0.15)",
                                    }
                                    : {
                                        background: "linear-gradient(135deg, #7F1D1D, #991B1B)",
                                        border: "1px solid rgba(252,165,165,0.25)",
                                        boxShadow: "0 12px 40px rgba(239,68,68,0.25), 0 2px 8px rgba(0,0,0,0.15)",
                                    }
                        }
                    >
                        {/* Icon */}
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={
                                t.type === "cart"
                                    ? { background: "rgba(124,58,237,0.35)", border: "1px solid rgba(167,139,250,0.3)" }
                                    : t.type === "success"
                                        ? { background: "rgba(16,185,129,0.25)", border: "1px solid rgba(52,211,153,0.3)" }
                                        : { background: "rgba(239,68,68,0.25)", border: "1px solid rgba(252,165,165,0.25)" }
                            }
                        >
                            {t.type === "cart"
                                ? <ShoppingCart size={16} color="#E9D5FF" strokeWidth={2} />
                                : t.type === "success"
                                    ? <CheckCircle size={16} color="#6EE7B7" strokeWidth={2} />
                                    : <XCircle size={16} color="#FCA5A5" strokeWidth={2} />
                            }
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            {t.type === "cart" && (
                                <p className="font-poppins font-semibold text-[11px] text-purple-300 uppercase tracking-wider mb-0.5">
                                    Added to Cart
                                </p>
                            )}
                            <p className="font-dm text-[13px] text-white leading-snug truncate">
                                {t.message}
                            </p>
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                        >
                            <X size={12} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
