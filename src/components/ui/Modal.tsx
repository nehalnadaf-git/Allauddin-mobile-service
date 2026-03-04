"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto z-10"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border-grey">
                    <h3 className="font-poppins font-semibold text-lg text-deep-text">{title}</h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl bg-light-grey flex items-center justify-center text-muted hover:bg-border-grey hover:text-deep-text transition-all"
                        aria-label="Close modal"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">{children}</div>
            </motion.div>
        </div>
    );
}
