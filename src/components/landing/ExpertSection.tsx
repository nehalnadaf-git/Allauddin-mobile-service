"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, HeartHandshake, Wrench } from "lucide-react";

export default function ExpertSection() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #F8F7FF 0%, #ffffff 100%)" }}>
            {/* Background decorative blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-100/60 rounded-full blur-[100px] pointer-events-none" />

            <div className="container-max mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* ══ Image Card Column ══ */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mx-auto lg:mx-0 max-w-[420px] w-full pb-8"
                    >
                        {/* Main card */}
                        <div
                            className="relative rounded-[40px] overflow-hidden"
                            style={{
                                background: "linear-gradient(145deg, #1A1035, #2D1B69)",
                                boxShadow: "0 40px 80px -20px rgba(124,58,237,0.4), 0 20px 40px -10px rgba(0,0,0,0.2)",
                            }}
                        >
                            {/* Decorative top accent bar */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-violet-400 via-violet-500 to-indigo-500" />

                            {/* Profile image */}
                            <div className="relative h-[380px] sm:h-[420px] lg:h-[460px]">
                                <img
                                    src="/profile/profile-image.png"
                                    alt="Allauddin Nadaf - Expert Mobile Repair Specialist"
                                    className="w-full h-full object-cover object-[center_20%]"
                                />
                                {/* Gradient fade at bottom */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-28 sm:h-36"
                                    style={{ background: "linear-gradient(to top, #1A1035 5%, transparent 100%)" }}
                                />
                            </div>

                            {/* Name + title — clean, no stats */}
                            <div className="px-7 pb-8 pt-3 relative z-10">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <h3 className="font-bricolage font-black text-white text-[28px] leading-none tracking-tight">
                                            Allauddin Nadaf
                                        </h3>
                                        <p className="font-dm text-[#A78BFA] text-[13px] font-semibold tracking-widest uppercase mt-1.5">
                                            Founder &amp; Master Technician
                                        </p>
                                    </div>
                                    {/* Verified shield badge */}
                                    <div
                                        className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                                        style={{ background: "rgba(124,58,237,0.25)", border: "1px solid rgba(124,58,237,0.35)" }}
                                    >
                                        <ShieldCheck size={20} className="text-[#A78BFA]" />
                                    </div>
                                </div>

                                {/* Thin separator line */}
                                <div className="mt-5 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

                                {/* Tagline */}
                                <p className="mt-4 font-dm text-[13px] text-white/50 leading-relaxed">
                                    Hubli&apos;s trusted mobile repair expert since 2012 — known for precision, honesty &amp; care.
                                </p>
                            </div>
                        </div>

                        {/* Floating "Certified Repair" pill — properly sized for mobile */}
                        <motion.div
                            animate={{ y: [-3, 3, -3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-0 left-4 right-4 md:left-[-20px] md:right-auto flex items-center gap-3 px-4 py-3 rounded-2xl"
                            style={{
                                background: "white",
                                border: "1px solid rgba(124,58,237,0.12)",
                                boxShadow: "0 12px 32px -8px rgba(124,58,237,0.25)",
                            }}
                        >
                            <div className="w-8 h-8 rounded-xl bg-violet/10 flex items-center justify-center flex-shrink-0">
                                <Wrench size={15} className="text-violet" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-bricolage font-bold text-[#1A1035] text-[13px] leading-none whitespace-nowrap">Certified Repair</p>
                                <p className="font-dm text-[11px] text-[#64748B] mt-0.5 whitespace-nowrap">Specialist since 2012</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ══ Content Column ══ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-violet/5 border border-violet/10">
                            <Award size={13} className="text-violet" />
                            <span className="text-violet font-dm text-[12px] font-bold uppercase tracking-wider">Meet the Expert</span>
                        </div>

                        <h2
                            className="font-bricolage font-bold text-[#1A1035] leading-tight mb-6"
                            style={{ fontSize: "clamp(30px, 5vw, 46px)", letterSpacing: "-0.02em" }}
                        >
                            Precision Repair. <br />
                            <span className="text-violet">Genuine Care.</span>
                        </h2>

                        <p className="font-dm text-[16px] md:text-[18px] text-[#64748B] leading-relaxed mb-10 max-w-[480px]">
                            &ldquo;I founded Allauddin Mobile Service with a single mission — to give every customer the most honest, expert repair service possible. Your device is in safe hands.&rdquo;
                        </p>

                        <div className="space-y-4">
                            {[
                                {
                                    icon: <ShieldCheck className="text-violet" size={20} />,
                                    title: "Personal Accountability",
                                    desc: "I personally oversee complex repairs — zero compromise on quality."
                                },
                                {
                                    icon: <HeartHandshake className="text-violet" size={20} />,
                                    title: "Transparent Honesty",
                                    desc: "No hidden charges, no unnecessary work. Just what your device truly needs."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex gap-4 p-5 rounded-2xl"
                                    style={{
                                        background: "white",
                                        border: "1px solid rgba(124,58,237,0.08)",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.1)" }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bricolage font-bold text-[17px] text-[#1A1035] mb-1">{item.title}</h4>
                                        <p className="font-dm text-[14px] text-[#64748B] leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
