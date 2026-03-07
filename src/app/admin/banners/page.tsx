"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface BannerEditorProps {
    type: string;
    label: string;
    fields: Array<{ key: string; label: string; type?: "text" | "textarea" | "select"; options?: string[] }>;
}

function BannerEditor({ type, label, fields }: BannerEditorProps) {
    const banner = useQuery(api.banners.getByType, { type });
    const updateBanner = useMutation(api.banners.update);
    const toggleVisibility = useMutation(api.banners.toggleVisibility);

    const [form, setForm] = useState<any>(null);
    const [saved, setSaved] = useState(false);

    const data = form ?? banner;

    if (!banner && !form) return null;

    const handleSave = async () => {
        await updateBanner({ type, ...data });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl mb-6">
            <div className="flex items-center justify-between mb-5">
                <h3 className="font-poppins font-semibold text-lg text-white">{label}</h3>
                <button
                    onClick={() => toggleVisibility({ type, isVisible: !data?.isVisible })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-poppins font-medium transition-all ${data?.isVisible ? "bg-success/10 text-success" : "bg-muted/10 text-white/60"}`}
                >
                    {data?.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                    {data?.isVisible ? "Visible" : "Hidden"}
                </button>
            </div>

            <div className="space-y-4">
                {fields.map(field => (
                    <div key={field.key}>
                        <label className="block text-xs font-poppins font-medium text-white/60 uppercase tracking-wide mb-1.5">
                            {field.label}
                        </label>
                        {field.type === "textarea" ? (
                            <textarea
                                rows={3}
                                value={data?.[field.key] ?? ""}
                                onChange={e => setForm({ ...(data || {}), [field.key]: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] font-dm text-sm outline-none focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            />
                        ) : field.type === "select" ? (
                            <select
                                value={data?.[field.key] ?? ""}
                                onChange={e => setForm({ ...(data || {}), [field.key]: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] font-dm text-sm outline-none focus:border-[#A78BFA] transition-all"
                            >
                                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={data?.[field.key] ?? ""}
                                onChange={e => setForm({ ...(data || {}), [field.key]: e.target.value })}
                                className="w-full px-3 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] font-dm text-sm outline-none focus:border-[#A78BFA] focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={handleSave}
                className={`mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-poppins font-semibold transition-all ${saved ? "bg-success text-white" : "bg-primary hover:hover:scale-[1.02] active:scale-[0.98] text-white"}`}
            >
                <Save size={15} />
                {saved ? "Saved!" : "Save Changes"}
            </button>
        </div>
    );
}

export default function AdminBannersPage() {
    return (
        <div className="p-6 max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-poppins font-bold text-2xl text-white mb-2">Banner Management</h1>
                <p className="font-dm text-white/60 text-sm mb-8">Edit and toggle visibility of all banners across the site</p>

                <BannerEditor
                    type="ticker"
                    label="Announcement Ticker Bar"
                    fields={[{ key: "headingText", label: "Ticker Text", type: "textarea" }]}
                />
                <BannerEditor
                    type="promo_landing"
                    label="Landing Page Promo Banner"
                    fields={[
                        { key: "headingText", label: "Heading" },
                        { key: "subText", label: "Sub Text" },
                        { key: "ctaLabel", label: "Button Label" },
                        { key: "ctaLink", label: "Button Link (e.g. /accessories)" },
                    ]}
                />
                <BannerEditor
                    type="service_highlight"
                    label="Services Page Highlight Banner"
                    fields={[
                        { key: "headingText", label: "Heading" },
                        { key: "subText", label: "Sub Text" },
                        { key: "ctaLabel", label: "Button Label" },
                    ]}
                />
                <BannerEditor
                    type="promo_accessories"
                    label="Accessories Page Promo Banner"
                    fields={[
                        { key: "headingText", label: "Heading" },
                        { key: "subText", label: "Sub Text" },
                        { key: "colorTheme", label: "Color Theme", type: "select", options: ["blue", "gold", "red"] },
                    ]}
                />
            </motion.div>
        </div>
    );
}
