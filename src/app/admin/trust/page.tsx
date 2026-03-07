"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const ICON_OPTIONS = ["Wrench", "Zap", "CheckCircle", "Shield", "Star", "ThumbsUp", "Clock", "MapPin"];

export default function AdminTrustPage() {
    const trustItems = useQuery(api.trustItems.listAll);
    const updateItem = useMutation(api.trustItems.update);
    const toggleItem = useMutation(api.trustItems.toggleVisibility);

    const [edits, setEdits] = useState<Record<string, any>>({});
    const [saved, setSaved] = useState<string | null>(null);

    const handleSave = async (item: any) => {
        await updateItem({ id: item._id, ...edits[item._id] });
        setSaved(item._id);
        setTimeout(() => setSaved(null), 2000);
    };

    return (
        <div className="p-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-poppins font-bold text-2xl text-deep-text mb-2">Trust Banner Strip</h1>
                <p className="font-dm text-muted text-sm mb-8">Edit the 4 trust indicators shown below the hero section</p>

                <div className="space-y-4">
                    {trustItems?.map((item: any) => {
                        const form = edits[item._id] ? { ...item, ...edits[item._id] } : item;

                        return (
                            <div key={item._id} className="bg-white rounded-2xl p-5 card-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-poppins font-semibold text-sm text-deep-text">Trust Item {item.displayOrder + 1}</span>
                                    <button
                                        onClick={() => toggleItem({ id: item._id, isVisible: !item.isVisible })}
                                        className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-poppins font-semibold transition-all ${item.isVisible ? "bg-success/10 text-success" : "bg-muted/10 text-muted"}`}
                                    >
                                        {item.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                                        {item.isVisible ? "Visible" : "Hidden"}
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="block text-xs font-poppins font-medium text-muted uppercase tracking-wide mb-1">Icon</label>
                                        <select
                                            value={form.iconName}
                                            onChange={e => setEdits(prev => ({ ...prev, [item._id]: { ...prev[item._id], iconName: e.target.value } }))}
                                            className="w-full px-3 py-2.5 rounded-xl border border-border-grey font-dm text-sm outline-none focus:border-primary transition-all"
                                        >
                                            {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-poppins font-medium text-muted uppercase tracking-wide mb-1">Label</label>
                                        <input
                                            type="text"
                                            value={form.label}
                                            onChange={e => setEdits(prev => ({ ...prev, [item._id]: { ...prev[item._id], label: e.target.value } }))}
                                            className="w-full px-3 py-2.5 rounded-xl border border-border-grey font-dm text-sm outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="block text-xs font-poppins font-medium text-muted uppercase tracking-wide mb-1">Description</label>
                                    <input
                                        type="text"
                                        value={form.description}
                                        onChange={e => setEdits(prev => ({ ...prev, [item._id]: { ...prev[item._id], description: e.target.value } }))}
                                        className="w-full px-3 py-2.5 rounded-xl border border-border-grey font-dm text-sm outline-none focus:border-primary transition-all"
                                    />
                                </div>

                                <button
                                    onClick={() => handleSave(item)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-poppins font-semibold transition-all ${saved === item._id ? "bg-success text-white" : "bg-primary hover:bg-hover-blue text-white"}`}
                                >
                                    <Save size={14} />
                                    {saved === item._id ? "Saved!" : "Save"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
