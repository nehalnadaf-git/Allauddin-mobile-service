"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, MessageCircle, Wrench, Phone, CheckCircle } from "lucide-react";
import { useRepairModal } from "@/lib/hooks/useRepairModal";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

// ─── Step config ─────────────────────────────────────────────────────────────
const STEPS = ["choice", "brand", "model", "problem", "customProblem", "urgency", "details"] as const;
type Step = typeof STEPS[number];

const BRANDS = ["Samsung", "Apple", "OnePlus", "Vivo", "Oppo", "Realme", "Redmi", "Poco", "Nokia", "Other"];
const PROBLEMS = [
    "Cracked/Broken Screen",
    "Battery Draining Fast",
    "Not Charging",
    "Camera Issue",
    "Speaker/Mic Problem",
    "Water Damage",
    "Won't Turn On",
    "No Network/Signal",
    "Overheating",
    "Other Issue",
];
const URGENCY_OPTIONS = [
    { label: "Express", sub: "Ready in 1–2 hrs", icon: "⚡" },
    { label: "Standard", sub: "Ready same day", icon: "🕐" },
    { label: "Flexible", sub: "Ready in 1–2 days", icon: "📅" },
];

// ─── Selector chip ───────────────────────────────────────────────────────────
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-poppins font-medium transition-all duration-200 min-h-[48px] active:scale-95"
            style={
                selected
                    ? { background: "#7C3AED", color: "white", boxShadow: "0 4px 14px rgba(124,58,237,0.35)" }
                    : { background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.2)", color: "#4B5563" }
            }
        >
            {label}
        </button>
    );
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
export default function RepairBookingModal() {
    const { isOpen: isRepairModalOpen, closeRepairModal } = useRepairModal();
    const settings = useQuery(api.settings.get);

    const [step, setStep] = useState<Step>("choice");
    const [direction, setDir] = useState(1);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [problem, setProblem] = useState("");
    const [customProblem, setCustomProblem] = useState("");
    const [urgency, setUrgency] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    // Only show customProblem step in progress when "Other Issue" is picked
    const progressSteps = STEPS.filter(s => s !== "choice" && (s !== "customProblem" || problem === "Other Issue"));
    const progressIdx = progressSteps.indexOf(step as any);

    const goTo = (next: Step) => {
        setDir(STEPS.indexOf(next) > STEPS.indexOf(step) ? 1 : -1);
        setStep(next);
    };

    const reset = () => {
        setStep("choice"); setDir(1);
        setBrand(""); setModel(""); setProblem("");
        setCustomProblem(""); setUrgency(""); setName(""); setPhone("");
    };

    const handleClose = () => { reset(); closeRepairModal(); };

    const handleDirectWhatsApp = () => {
        const num = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "916363278962";
        window.open(`https://wa.me/${num}?text=${encodeURIComponent("Hi! I need help with my phone.")}`, "_blank");
        handleClose();
    };

    const handleSend = () => {
        const num = settings?.whatsappNumber?.replace(/[^0-9]/g, "") || "916363278962";
        const finalProblem = problem === "Other Issue" ? customProblem || "Other Issue" : problem;
        const msg = [
            `*Repair Booking Request*`,
            ``,
            `*Device:* ${brand} ${model}`,
            `*Problem:* ${finalProblem}`,
            `*Urgency:* ${urgency}`,
            name && `*Name:* ${name}`,
            phone && `*Contact:* ${phone}`,
        ].filter(Boolean).join("\n");
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
        handleClose();
    };

    // ── Render each step ─────────────────────────────────────────────────────
    const renderStep = () => {
        switch (step) {
            case "choice":
                return (
                    <div className="flex flex-col gap-3">
                        <p className="font-dm text-[14px] mb-1 text-center" style={{ color: "#6B7280" }}>
                            How would you like to proceed?
                        </p>

                        {/* Chat Directly */}
                        <button
                            onClick={handleDirectWhatsApp}
                            className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
                            style={{ background: "rgba(37,211,102,0.06)", border: "1.5px solid rgba(37,211,102,0.25)" }}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 6px 16px rgba(37,211,102,0.35)" }}>
                                <MessageCircle size={22} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-poppins font-semibold text-[15px] text-[#111827] mb-0.5">Chat Directly</p>
                                <p className="font-dm text-[13px] text-[#6B7280] leading-snug">Open WhatsApp and describe your problem yourself</p>
                            </div>
                            <ChevronRight size={18} style={{ color: "#25D366", flexShrink: 0 }} />
                        </button>

                        {/* Guided Form */}
                        <button
                            onClick={() => goTo("brand")}
                            className="flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
                            style={{ background: "rgba(124,58,237,0.06)", border: "1.5px solid rgba(124,58,237,0.25)" }}
                        >
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 6px 16px rgba(124,58,237,0.35)" }}>
                                <Wrench size={22} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-poppins font-semibold text-[15px] text-[#111827] mb-0.5">Describe Your Problem</p>
                                <p className="font-dm text-[13px] text-[#6B7280] leading-snug">Step-by-step guided form — takes 60 seconds</p>
                            </div>
                            <ChevronRight size={18} style={{ color: "#7C3AED", flexShrink: 0 }} />
                        </button>
                    </div>
                );

            case "brand":
                return (
                    <div>
                        <p className="font-dm text-[14px] text-[#6B7280] mb-4">Select your phone brand</p>
                        <div className="grid grid-cols-2 gap-2">
                            {BRANDS.map(b => (
                                <Chip key={b} label={b} selected={brand === b} onClick={() => setBrand(b)} />
                            ))}
                        </div>
                    </div>
                );

            case "model":
                return (
                    <div>
                        <p className="font-dm text-[14px] text-[#6B7280] mb-4 text-center">Enter your {brand} model</p>
                        <input
                            autoFocus
                            type="text"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            placeholder={`e.g. ${brand === "Apple" ? "iPhone 15 Pro" : brand === "Samsung" ? "Galaxy S23" : "Enter model"}`}
                            className="w-full px-4 py-4 rounded-xl text-[15px] font-dm outline-none transition-all duration-200 text-[#111827] placeholder-[#9CA3AF] text-center"
                            style={{
                                background: "rgba(124,58,237,0.04)",
                                border: "1.5px solid rgba(124,58,237,0.2)",
                            }}
                            onFocus={e => {
                                (e.target as HTMLElement).style.borderColor = "#7C3AED";
                                (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
                            }}
                            onBlur={e => {
                                (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                                (e.target as HTMLElement).style.boxShadow = "none";
                            }}
                        />
                    </div>
                );

            case "customProblem":
                return (
                    <div>
                        <p className="font-dm text-[14px] text-[#6B7280] mb-4 text-center">Describe your issue in your own words</p>
                        <textarea
                            autoFocus
                            value={customProblem}
                            onChange={e => setCustomProblem(e.target.value)}
                            placeholder="e.g. My phone screen flickers when I scroll…"
                            rows={4}
                            className="w-full px-4 py-4 rounded-xl text-[15px] font-dm outline-none transition-all duration-200 text-[#111827] placeholder-[#9CA3AF] resize-none"
                            style={{
                                background: "rgba(124,58,237,0.04)",
                                border: "1.5px solid rgba(124,58,237,0.2)",
                            }}
                            onFocus={e => {
                                (e.target as HTMLElement).style.borderColor = "#7C3AED";
                                (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
                            }}
                            onBlur={e => {
                                (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                                (e.target as HTMLElement).style.boxShadow = "none";
                            }}
                        />
                        <p className="font-dm text-[12px] text-[#9CA3AF] mt-2 text-center">The more detail you add, the faster we can help!</p>
                    </div>
                );

            case "problem":
                return (
                    <div>
                        <p className="font-dm text-[14px] text-[#6B7280] mb-4 text-center">What&apos;s the issue?</p>
                        <div className="grid grid-cols-1 gap-2">
                            {PROBLEMS.map(p => (
                                <Chip key={p} label={p} selected={problem === p} onClick={() => setProblem(p)} />
                            ))}
                        </div>
                    </div>
                );

            case "urgency":
                return (
                    <div>
                        <p className="font-dm text-[14px] text-[#6B7280] mb-4">How quickly do you need it?</p>
                        <div className="flex flex-col gap-3">
                            {URGENCY_OPTIONS.map(u => (
                                <button
                                    key={u.label}
                                    onClick={() => setUrgency(u.label)}
                                    className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
                                    style={
                                        urgency === u.label
                                            ? { background: "rgba(124,58,237,0.08)", border: "2px solid #7C3AED" }
                                            : { background: "rgba(124,58,237,0.04)", border: "1.5px solid rgba(124,58,237,0.15)" }
                                    }
                                >
                                    <span className="text-2xl flex-shrink-0">{u.icon}</span>
                                    <div className="flex-1">
                                        <p className="font-poppins font-semibold text-[15px] text-[#111827]">{u.label}</p>
                                        <p className="font-dm text-[13px] text-[#6B7280]">{u.sub}</p>
                                    </div>
                                    {urgency === u.label && (
                                        <CheckCircle size={20} style={{ color: "#7C3AED", flexShrink: 0 }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case "details":
                return (
                    <div>
                        <p className="font-dm text-[14px] text-[#6B7280] mb-4">Optional — helps us prepare before you arrive</p>

                        {/* Summary */}
                        <div className="rounded-2xl p-4 mb-5" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                            <p className="font-dm text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1.5 font-medium">Booking Summary</p>
                            <p className="font-poppins font-semibold text-[14px] text-[#1A1035]">
                                {brand} {model}
                            </p>
                            <p className="font-dm text-[13px] text-[#6B7280] mt-0.5">{problem} · {urgency}</p>
                        </div>

                        <div className="space-y-3">
                            <div className="relative">
                                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name (optional)"
                                    className="w-full pl-11 pr-4 py-4 rounded-xl text-[15px] font-dm outline-none transition-all duration-200 text-[#111827] placeholder-[#9CA3AF]"
                                    style={{ background: "rgba(124,58,237,0.04)", border: "1.5px solid rgba(124,58,237,0.2)" }}
                                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "#7C3AED"; (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                                    onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                                />
                            </div>
                            <div className="relative">
                                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="Phone number (optional)"
                                    className="w-full pl-11 pr-4 py-4 rounded-xl text-[15px] font-dm outline-none transition-all duration-200 text-[#111827] placeholder-[#9CA3AF]"
                                    style={{ background: "rgba(124,58,237,0.04)", border: "1.5px solid rgba(124,58,237,0.2)" }}
                                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "#7C3AED"; (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                                    onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                                />
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const canNext = (): boolean => {
        switch (step) {
            case "brand": return !!brand;
            case "model": return model.trim().length >= 2;
            case "problem": return !!problem;
            case "customProblem": return customProblem.trim().length >= 3;
            case "urgency": return !!urgency;
            default: return true;
        }
    };

    const handleNext = () => {
        if (step === "problem") {
            goTo(problem === "Other Issue" ? "customProblem" : "urgency");
        } else if (step === "customProblem") {
            goTo("urgency");
        } else {
            const nextMap: Partial<Record<Step, Step>> = {
                brand: "model", model: "problem", urgency: "details",
            };
            if (nextMap[step]) goTo(nextMap[step]!);
            else handleSend();
        }
    };

    const handleBack = () => {
        if (step === "urgency" && problem === "Other Issue") {
            goTo("customProblem");
        } else {
            const prevMap: Partial<Record<Step, Step>> = {
                brand: "choice", model: "brand", problem: "model",
                customProblem: "problem", urgency: "problem", details: "urgency",
            };
            if (prevMap[step]) goTo(prevMap[step]!);
        }
    };

    return (
        <AnimatePresence>
            {isRepairModalOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50"
                        style={{ background: "rgba(10,5,30,0.6)", backdropFilter: "blur(8px)" }}
                        onClick={handleClose}
                    />

                    {/* Bottom sheet on mobile / centered dialog on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 60 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className={[
                            "fixed z-50 flex flex-col",
                            // Mobile: full-width bottom sheet
                            "inset-x-0 bottom-0 rounded-t-[28px]",
                            // Desktop sm+: floating centered card
                            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[480px] sm:rounded-[28px]",
                        ].join(" ")}
                        style={{
                            background: "#FFFFFF",
                            boxShadow: "0 -8px 48px rgba(124,58,237,0.2), 0 24px 64px rgba(0,0,0,0.35)",
                            maxHeight: "85dvh",
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* ── Premium Dark Header ── */}
                        <div
                            className="relative flex-shrink-0 overflow-hidden rounded-t-[28px]"
                            style={{
                                background: "linear-gradient(135deg, #1A1035 0%, #2D1B69 60%, #1A1035 100%)",
                                padding: "14px 16px 0",
                            }}
                        >
                            {/* Ambient glow orbs */}
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
                            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

                            {/* Noise texture */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

                            {/* Drag handle — mobile only */}
                            <div className="flex justify-center mb-3 sm:hidden">
                                <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                            </div>

                            {/* Close button — absolute top-right */}
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-90 z-20"
                                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
                                aria-label="Close"
                            >
                                <X size={17} />
                            </button>

                            {/* Header row */}
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                {/* Glowing icon badge */}
                                <div
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(109,40,217,0.4))",
                                        border: "1px solid rgba(167,139,250,0.3)",
                                        boxShadow: "0 0 20px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                                    }}
                                >
                                    <Wrench size={18} style={{ color: "#E9D5FF" }} />
                                </div>
                                <div className="text-center">
                                    <h2 className="font-bricolage font-bold text-[20px] text-white leading-tight" style={{ letterSpacing: "-0.01em" }}>Book a Repair</h2>
                                    <p className="font-dm text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        {step === "choice" ? "Fast · Reliable · Guaranteed" : `Step ${progressIdx + 1} of ${progressSteps.length}`}
                                    </p>
                                </div>
                            </div>

                            {/* Progress bar */}
                            {step !== "choice" && (
                                <div className="relative z-10 mt-4 flex gap-1.5">
                                    {progressSteps.map((s, i) => (
                                        <div
                                            key={s}
                                            className="flex-1 h-[3px] rounded-full transition-all duration-500"
                                            style={{
                                                background: i < progressIdx
                                                    ? "#A78BFA"
                                                    : i === progressIdx
                                                        ? "#E9D5FF"
                                                        : "rgba(255,255,255,0.15)",
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Wave transition into white body */}
                            <div className="relative z-10 mt-4 -mx-4" style={{ height: "20px" }}>
                                <svg viewBox="0 0 440 20" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                                    <path d="M0 20 C110 0, 330 0, 440 20 L440 20 L0 20 Z" fill="white" />
                                </svg>
                            </div>
                        </div>

                        {/* Step content — scrollable */}
                        <div className="flex-1 overflow-y-auto px-5 py-5" style={{ overscrollBehavior: "contain" }}>
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction > 0 ? -24 : 24 }}
                                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    {renderStep()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer nav */}
                        {step !== "choice" && (
                            <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(124,58,237,0.08)" }}>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleBack}
                                        className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl font-poppins font-medium text-[14px] transition-all active:scale-95"
                                        style={{ background: "rgba(124,58,237,0.06)", color: "#4B5563", border: "1px solid rgba(124,58,237,0.15)" }}
                                    >
                                        <ChevronLeft size={16} />
                                        Back
                                    </button>

                                    <button
                                        onClick={handleNext}
                                        disabled={!canNext()}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-poppins font-semibold text-[15px] text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                        style={{
                                            background: step === "details" ? "linear-gradient(135deg, #25D366, #128C7E)" : "linear-gradient(135deg, #7C3AED, #6D28D9)",
                                            boxShadow: canNext()
                                                ? (step === "details" ? "0 6px 20px rgba(37,211,102,0.35)" : "0 6px 20px rgba(124,58,237,0.35)")
                                                : "none",
                                        }}
                                    >
                                        {step === "details" ? (
                                            <>
                                                <MessageCircle size={17} />
                                                Send to WhatsApp
                                            </>
                                        ) : (
                                            <>
                                                Next
                                                <ChevronRight size={17} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Safe area bottom padding for iOS */}
                        <div className="flex-shrink-0 sm:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }} />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
