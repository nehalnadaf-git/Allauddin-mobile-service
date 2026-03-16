"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, MessageSquare, BadgeCheck } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: <ClipboardCheck size={28} />,
    title: "Submit Phone Details",
    body: "Tell us about your brand, model, and phone condition in under 2 minutes. It's fast, free, and secure.",
  },
  {
    num: "02",
    icon: <MessageSquare size={28} />,
    title: "Instant WhatsApp Review",
    body: "Your summary is sent directly to our master technicians for a professional valuation instantly.",
  },
  {
    num: "03",
    icon: <BadgeCheck size={28} />,
    title: "Get Our Best Offer",
    body: "We provide a premium price quote based on current market value. No haggling, just fair prices.",
  },
];

export default function HowSellingWorks() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#FFFFFF",
        backgroundImage: "radial-gradient(rgba(124,58,237,0.04) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
        paddingTop: "clamp(64px, 10vw, 100px)",
        paddingBottom: "clamp(64px, 10vw, 100px)",
      }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]" 
           style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)", transform: "translate(20%, -20%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03]" 
           style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)", transform: "translate(-20%, 20%)" }} />

      <div className="container-max mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
               style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
            <span className="font-poppins font-bold text-[10px] uppercase tracking-widest" style={{ color: "#7C3AED" }}>
              Our Process
            </span>
          </div>
          
          <h2 className="font-bricolage font-bold text-[#0F0F0F] mb-4" 
              style={{ fontSize: "clamp(32px, 5vw, 44px)", letterSpacing: "-0.03em" }}>
            How Selling Works
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-1 rounded-full bg-[#7C3AED] mx-auto mb-6"
          />
          
          <p className="font-dm text-[#6B7280] max-w-[540px] mx-auto" style={{ fontSize: "16px", lineHeight: 1.6 }}>
            We&apos;ve streamlined our trade-in process to be as simple and rewarding as possible. Get paid for your tech in three easy steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] z-0"
               style={{ borderTop: "2px dashed rgba(124,58,237,0.15)" }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group h-full"
            >
              <div className="premium-card h-full flex flex-col items-center text-center p-8 md:p-10 transition-all duration-300">
                {/* Step Number Watermark */}
                <span className="absolute top-4 right-6 font-bricolage font-black select-none pointer-events-none text-violet/5 group-hover:text-violet/10 transition-colors"
                      style={{ fontSize: "80px", lineHeight: 1 }}>
                  {step.num}
                </span>

                {/* Icon Container */}
                <div className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center mb-8 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                     style={{ 
                       background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                       color: "#FFFFFF",
                       boxShadow: "0 10px 24px rgba(124,58,237,0.25)"
                     }}>
                  {step.icon}
                </div>

                <h3 className="font-poppins font-bold text-[20px] text-[#0F0F0F] mb-4 relative z-10" style={{ letterSpacing: "-0.01em" }}>
                  {step.title}
                </h3>
                
                <p className="font-dm text-[#6B7280] relative z-10 text-[15px] leading-relaxed">
                  {step.body}
                </p>

                {/* Subtle Hover Accent */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7C3AED] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
