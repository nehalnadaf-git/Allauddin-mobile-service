"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

const themeStyles: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    blue: {
        bg: "from-[#7C3AED] to-[#6D28D9]",
        border: "border-transparent text-white",
        text: "text-white",
        badge: "bg-white/20 text-white",
    },
    gold: {
        bg: "from-gold/20 to-gold/5",
        border: "border-gold/30",
        text: "text-gold",
        badge: "bg-gold/15 text-gold",
    },
    red: {
        bg: "from-error/20 to-error/5",
        border: "border-error/30",
        text: "text-error",
        badge: "bg-error/15 text-error",
    },
};

export default function AccessoriesPromoBanner() {
    const banner = useQuery(api.banners.getPromoAccessories);

    if (!banner || !banner.isVisible) return null;



    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-[28px] p-6 md:p-10 flex items-center shadow-2xl mt-12 mb-4`}
            style={{
                background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 100%)",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5)",
            }}
        >
            {/* Ambient light effects */}
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-violet/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
                <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-violet to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet/20 border border-white/10">
                    <ShoppingBag size={36} className="text-white" />
                </div>

                <div className="text-center md:text-left flex-1">
                    <h3 className="font-bricolage font-bold text-white text-[24px] md:text-[32px] mb-3 leading-tight tracking-tight">
                        {banner.headingText || "Hot Deals on Accessories!"}
                    </h3>
                    {banner.subText && (
                        <p className="font-dm text-white/70 text-base md:text-lg max-w-[600px] leading-relaxed">
                            {banner.subText}
                        </p>
                    )}
                </div>

                <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                    <div className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white font-dm text-[11px] font-bold uppercase tracking-widest backdrop-blur-md">
                        Limited Time Offer
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
