"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const ICON_OPTIONS = ["MapPin", "Wrench", "CheckCircle", "Phone", "Clock", "Star", "MessageCircle", "Zap"];
const STEP_LABELS = ["Step 1 — Bring Your Phone", "Step 2 — We Diagnose & Repair", "Step 3 — Collect Your Phone"];

export default function AdminHowItWorksPage() {
    const steps = useQuery(api.howItWorksSteps.list);
    const updateStep = useMutation(api.howItWorksSteps.update);

    const [edits, setEdits] = useState<Record<string, any>>({});
    const [saved, setSaved] = useState<string | null>(null);

    const handleSave = async (step: any) => {
        await updateStep({ id: step._id, ...edits[step._id] });
        setSaved(step._id);
        setTimeout(() => setSaved(null), 2000);
    };

    return (
        <div className="p-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-poppins font-bold text-2xl text-white mb-2">How It Works</h1>
                <p className="font-dm text-white/60 text-sm mb-8">Edit the 3 steps shown in the How It Works section</p>

                <div className="space-y-4">
                    {steps?.map((step: any, index: number) => {
                        const form = edits[step._id] ? { ...step, ...edits[step._id] } : step;
                        return (
                            <div key={step._id} className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl">
                                <p className="font-poppins font-semibold text-sm text-primary mb-4">{STEP_LABELS[index]}</p>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-xs font-poppins font-medium text-white/60 uppercase tracking-wide mb-1">Icon</label>
                                        <select
                                            value={form.iconName}
                                            onChange={e => setEdits(prev => ({ ...prev, [step._id]: { ...prev[step._id], iconName: e.target.value } }))}
                                            className="w-full px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] font-dm text-sm outline-none focus:border-[#A78BFA] transition-all"
                                        >
                                            {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-poppins font-medium text-white/60 uppercase tracking-wide mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={form.title}
                                            onChange={e => setEdits(prev => ({ ...prev, [step._id]: { ...prev[step._id], title: e.target.value } }))}
                                            className="w-full px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] font-dm text-sm outline-none focus:border-[#A78BFA] transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-xs font-poppins font-medium text-white/60 uppercase tracking-wide mb-1">Description</label>
                                    <textarea
                                        rows={2}
                                        value={form.description}
                                        onChange={e => setEdits(prev => ({ ...prev, [step._id]: { ...prev[step._id], description: e.target.value } }))}
                                        className="w-full px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] font-dm text-sm outline-none focus:border-[#A78BFA] transition-all resize-none"
                                    />
                                </div>

                                <button
                                    onClick={() => handleSave(step)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-poppins font-semibold transition-all ${saved === step._id ? "bg-success text-white" : "bg-primary hover:hover:scale-[1.02] active:scale-[0.98] text-white"}`}
                                >
                                    <Save size={14} />
                                    {saved === step._id ? "Saved!" : "Save Step"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
