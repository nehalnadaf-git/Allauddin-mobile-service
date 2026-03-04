"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRepairModal } from "@/lib/hooks/useRepairModal";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

export default function FloatingBookButton() {
    const { openRepairModal } = useRepairModal();
    const settings = useQuery(api.settings.get);

    const whatsappHref = settings
        ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hi, I want to book a repair!")}`
        : "#";

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-5 z-50"
        >
            {/* Desktop: Full pill "Book a Repair" */}
            <button
                onClick={openRepairModal}
                className="hidden md:flex items-center gap-2.5 text-white font-poppins font-semibold text-[14px] px-5 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95"
                style={{
                    background: "#25D366",
                    animation: "floatPulse 5s ease-in-out infinite",
                    boxShadow: "0 8px 24px rgba(37,211,102,0.45)",
                }}
                aria-label="Book a Repair"
            >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.543 5.877L.072 23.64l5.918-1.453A11.966 11.966 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.607-.502-5.11-1.375l-.362-.217-3.515.863.89-3.421-.236-.375C2.593 15.807 2 13.97 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Book a Repair
            </button>

            {/* Mobile: Icon-only 48px circle */}
            <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{
                    background: "#25D366",
                    animation: "floatPulse 5s ease-in-out infinite",
                    boxShadow: "0 8px 24px rgba(37,211,102,0.45)",
                }}
                aria-label="Book a Repair via WhatsApp"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.543 5.877L.072 23.64l5.918-1.453A11.966 11.966 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.864 0-3.607-.502-5.11-1.375l-.362-.217-3.515.863.89-3.421-.236-.375C2.593 15.807 2 13.97 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
            </a>
        </motion.div>
    );
}
