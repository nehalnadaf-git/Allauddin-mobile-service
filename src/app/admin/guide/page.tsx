"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Image as ImageIcon, Ruler, Monitor, Smartphone, AlertCircle, CheckCircle2, Info, Package } from "lucide-react";

export default function AdminGuidePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="font-bricolage font-bold text-[28px] text-[#1A1035] flex items-center gap-3">
                    <BookOpen size={28} className="text-[#7C3AED]" />
                    Admin Panel Guide
                </h1>
                <p className="font-dm text-[15px] text-[#6B7280]">
                    Everything you need to know about managing your website content, image sizes, and formatting.
                </p>
            </div>

            {/* General Guidelines Panel */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8"
                style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(124,58,237,0.1)",
                }}
            >
                <h2 className="font-bricolage font-bold text-[20px] text-[#1A1035] mb-6 flex items-center gap-2.5">
                    <Info size={20} className="text-[#A78BFA]" />
                    General Formatting Guidelines
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                            <CheckCircle2 size={18} className="text-[#22C55E] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-poppins font-semibold text-[14px] text-[#1F2937]">Keep titles short & punchy</p>
                                <p className="font-dm text-[13px] text-[#6B7280] mt-1">
                                    Long titles will truncate or break on mobile devices. Examples: "Screen Replacement" is better than "Complete LCD Touch Screen Replacement Service".
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CheckCircle2 size={18} className="text-[#22C55E] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-poppins font-semibold text-[14px] text-[#1F2937]">Use WebP or Compressed JPEGs</p>
                                <p className="font-dm text-[13px] text-[#6B7280] mt-1">
                                    Always compress images using tools like TinyPNG or Squoosh before uploading to keep the website blazing fast.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                            <AlertCircle size={18} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-poppins font-semibold text-[14px] text-[#1F2937]">Clear Backgrounds for Products</p>
                                <p className="font-dm text-[13px] text-[#6B7280] mt-1">
                                    Product images look best with pure white or transparent backgrounds. Do not upload images with messy backgrounds.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <AlertCircle size={18} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-poppins font-semibold text-[14px] text-[#1F2937]">Avoid Text in Images</p>
                                <p className="font-dm text-[13px] text-[#6B7280] mt-1">
                                    Do not "hardcode" textual information into banners. The website overlays text automatically for better SEO and mobile scaling.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Image Specs Table */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(124,58,237,0.1)",
                }}
            >
                <div className="p-6 md:p-8 pb-4">
                    <h2 className="font-bricolage font-bold text-[20px] text-[#1A1035] mb-2 flex items-center gap-2.5">
                        <ImageIcon size={20} className="text-[#A78BFA]" />
                        Required Image Dimensions
                    </h2>
                    <p className="font-dm text-[14px] text-[#6B7280]">
                        Follow these exact dimension guidelines to prevent your site from looking cropped or distorted.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-dm">
                        <thead className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-[13px] text-[#4B5563] uppercase tracking-wider">Section</th>
                                <th className="px-6 py-3 font-semibold text-[13px] text-[#4B5563] uppercase tracking-wider">Aspect Ratio</th>
                                <th className="px-6 py-3 font-semibold text-[13px] text-[#4B5563] uppercase tracking-wider">Recommended Size</th>
                                <th className="px-6 py-3 font-semibold text-[13px] text-[#4B5563] uppercase tracking-wider">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB]">
                            {[
                                {
                                    name: "Home Banners (Desktop)",
                                    ratio: "16:9 or 21:9",
                                    size: "1920 x 1080px",
                                    notes: "High-res required. Subject must be centered.",
                                    icon: Monitor
                                },
                                {
                                    name: "Home Banners (Mobile)",
                                    ratio: "9:16 or 3:4",
                                    size: "1080 x 1920px",
                                    notes: "Portrait orientation for mobile users.",
                                    icon: Smartphone
                                },
                                {
                                    name: "Products / Accessories",
                                    ratio: "1:1 (Square)",
                                    size: "800 x 800px",
                                    notes: "White or transparent background.",
                                    icon: Package
                                },
                                {
                                    name: "Portfolio / Work",
                                    ratio: "4:3 or 16:9",
                                    size: "1200 x 900px",
                                    notes: "Clear before/after or working shots.",
                                    icon: ImageIcon
                                },
                                {
                                    name: "Brand Logos",
                                    ratio: "Any (Auto-fit)",
                                    size: "400 x 200px",
                                    notes: "Must be transparent PNG or SVG.",
                                    icon: ImageIcon
                                },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#F5F3FF] flex items-center justify-center">
                                                <row.icon size={15} className="text-[#8B5CF6]" />
                                            </div>
                                            <span className="font-poppins font-semibold text-[14px] text-[#111827]">{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#6B7280]">
                                        {row.ratio}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-[14px] font-medium text-[#111827]">
                                            <Ruler size={14} className="text-[#A78BFA]" />
                                            {row.size}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-[#6B7280] max-w-[200px]">
                                        {row.notes}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
