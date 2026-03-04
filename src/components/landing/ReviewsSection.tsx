"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, PenLine } from "lucide-react";
import { useQuery, useMutation } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";
import StarRating from "@/components/ui/StarRating";
import Modal from "@/components/ui/Modal";
import { toast } from "@/components/ui/Toast";

const DEFAULT_REVIEWS = [
    {
        _id: "r1",
        customerName: "Mohammed Arfan",
        reviewText: "My iPhone screen was completely shattered. Allauddin Mobile Service fixed it within 2 hours with a genuine screen. Works perfectly now — like brand new.",
        starRating: 5,
        submittedAt: "2026-02-10T10:00:00Z",
    },
    {
        _id: "r2",
        customerName: "Zainab Fatima",
        reviewText: "Very professional team. They diagnosed my Samsung battery problem in minutes and replaced it the same day. Transparent pricing, no hidden charges.",
        starRating: 5,
        submittedAt: "2026-02-14T10:00:00Z",
    },
    {
        _id: "r3",
        customerName: "Abdul Rashid",
        reviewText: "Got my OnePlus charging port repaired here. Fast service and genuine spare parts. The technician explained the issue clearly before starting the work.",
        starRating: 5,
        submittedAt: "2026-02-18T10:00:00Z",
    },
    {
        _id: "r4",
        customerName: "Ayesha Siddiqui",
        reviewText: "Fixed my water-damaged Redmi and recovered all my photos. I was worried about data loss but they took great care. Trust these guys completely!",
        starRating: 5,
        submittedAt: "2026-02-20T10:00:00Z",
    },
    {
        _id: "r5",
        customerName: "Imran Patel",
        reviewText: "Walked in with a dead Vivo phone, walked out with it fully working. Affordable pricing compared to other shops in Hubli. Very clean and professional setup.",
        starRating: 5,
        submittedAt: "2026-02-24T10:00:00Z",
    },
    {
        _id: "r6",
        customerName: "Ruqaiyya Shaikh",
        reviewText: "Quick, honest, and reliable. My Oppo speaker was not working at all. Fixed in 45 minutes for a very fair price. Staff was polite and kept me updated.",
        starRating: 5,
        submittedAt: "2026-02-27T10:00:00Z",
    },
];

function getInitials(name: string) {
    const parts = name.trim().split(" ");
    return parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : name.slice(0, 2).toUpperCase();
}

function formatDate(raw: string) {
    const d = raw ? new Date(raw) : new Date();
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ReviewsSection() {
    const reviewsData = useQuery(api.reviews.listApproved);
    const reviews = reviewsData && (reviewsData as any[]).length > 0 ? reviewsData : DEFAULT_REVIEWS;
    const submitReview = useMutation(api.reviews.submit);
    const [isModalOpen, setModalOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !text.trim() || rating === 0) return;
        setIsSubmitting(true);
        try {
            await submitReview({ customerName: name.trim(), reviewText: text.trim(), starRating: rating });
            setSubmitted(true);
            toast("Review submitted! It will appear after approval.", "success");
            setTimeout(() => {
                setModalOpen(false); setSubmitted(false);
                setName(""); setText(""); setRating(0);
            }, 2500);
        } catch {
            toast("Failed to submit review. Please try again.", "error");
        }
        setIsSubmitting(false);
    };

    const scroll = (dir: "left" | "right") => {
        scrollRef.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
    };

    const avgRating = reviews && reviews.length > 0
        ? (reviews.reduce((sum: number, r: any) => sum + (Number(r.starRating) || 5), 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <section
            className="relative overflow-hidden py-[72px] md:py-[104px]"
            id="reviews"
            style={{ background: "linear-gradient(160deg, #0F0A1E 0%, #1A1035 50%, #2D1B69 100%)" }}
        >
            {/* Ambient orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)", transform: "translate(30%, -40%)" }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)", transform: "translate(-20%, 30%)" }} />
            {/* Noise */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

            <div className="container-max mx-auto px-4 relative z-10">

                {/* ── Section header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14"
                >
                    <div>
                        {/* Label pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.22)" }}>
                            <Star size={12} fill="#A78BFA" stroke="none" />
                            <span className="font-poppins font-semibold text-[11px] tracking-[0.08em] uppercase" style={{ color: "#A78BFA" }}>Customer Reviews</span>
                        </div>
                        <h2
                            className="font-bricolage font-bold text-white leading-[1.15]"
                            style={{ fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em" }}
                        >
                            What Our Customers Say
                        </h2>
                    </div>

                    {/* Rating summary — right side */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={16} fill="#F59E0B" stroke="none" />
                            ))}
                        </div>
                        <span className="font-poppins font-bold text-white text-[20px]">{avgRating}</span>
                        <span className="font-dm text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                            / 5 · {reviews?.length || 0} reviews
                        </span>
                    </div>
                </motion.div>

                {/* ── Scroll arrows + cards ── */}
                {reviews && reviews.length > 0 ? (
                    <div className="relative group -mx-4 md:mx-0">
                        {/* Left arrow */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                            style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {/* Right arrow */}
                        <button
                            onClick={() => scroll("right")}
                            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                            style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                        >
                            <ChevronRight size={18} />
                        </button>

                        {/* Left edge gradient fade */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none hidden md:block"
                            style={{ background: "linear-gradient(to right, #1A1035 0%, transparent 100%)" }}
                        />
                        {/* Right edge gradient fade — shows on all screens to hint more cards */}
                        <div
                            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to left, #1A1035 0%, transparent 100%)" }}
                        />

                        <div
                            ref={scrollRef}
                            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-2 px-4 md:px-0"
                            style={{ overflowY: "hidden", touchAction: "pan-x" }}
                        >
                            {reviews.map((review: any, index: number) => (
                                <motion.div
                                    key={review._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: Math.min(index * 0.07, 0.3), duration: 0.45 }}
                                    className="flex-shrink-0 snap-start flex flex-col rounded-[20px] cursor-default"
                                    style={{
                                        width: "clamp(280px, 80vw, 340px)",
                                        background: "#FFFFFF",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        boxShadow: "0 4px 32px rgba(0,0,0,0.18)",
                                    }}
                                >
                                    {/* Card top: quote icon + stars */}
                                    <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(124,58,237,0.08)" }}>
                                        <div
                                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.12)" }}
                                        >
                                            <Quote size={15} style={{ color: "#7C3AED" }} />
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star
                                                    key={s}
                                                    size={13}
                                                    fill={s <= (review.starRating || 5) ? "#F59E0B" : "transparent"}
                                                    stroke={s <= (review.starRating || 5) ? "none" : "rgba(0,0,0,0.15)"}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review text */}
                                    <div className="px-6 py-5 flex-1">
                                        <p className="font-dm text-[14px] leading-[1.75]" style={{ color: "#374151" }}>
                                            "{review.reviewText}"
                                        </p>
                                    </div>

                                    {/* Card bottom: avatar + name + date */}
                                    <div className="flex items-center justify-between px-6 pb-5 pt-3" style={{ borderTop: "1px solid rgba(124,58,237,0.07)" }}>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                                            >
                                                <span className="font-poppins font-bold text-[12px] text-white">
                                                    {getInitials(review.customerName || "C")}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-poppins font-semibold text-[13px] text-[#1A1035] leading-none">
                                                    {review.customerName || "Customer"}
                                                </p>
                                                <p className="font-dm text-[11px] mt-0.5" style={{ color: "#9CA3AF" }}>
                                                    Verified Customer
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-dm text-[11px]" style={{ color: "#9CA3AF" }}>
                                            {formatDate(review.submittedAt)}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-center font-dm py-12" style={{ color: "rgba(255,255,255,0.4)" }}>
                        No reviews yet. Be the first!
                    </p>
                )}

                {/* ── Write a Review CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex justify-center mt-10"
                >
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2.5 font-poppins font-semibold text-[14px] px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            color: "white",
                            border: "1px solid rgba(255,255,255,0.18)",
                        }}
                    >
                        <PenLine size={15} />
                        Write a Review
                    </button>
                </motion.div>
            </div>

            {/* ── Write Review Modal ── */}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Write a Review">
                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(124,58,237,0.1)" }}>
                                <Star size={28} fill="#7C3AED" stroke="none" />
                            </div>
                            <h4 className="font-poppins font-semibold text-lg text-[#1A1035] mb-2">Thank You!</h4>
                            <p className="font-dm text-[14px]" style={{ color: "#6B7280" }}>Your review has been submitted and will appear after approval.</p>
                        </motion.div>
                    ) : (
                        <motion.form initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block font-dm font-medium text-[13px] mb-1.5" style={{ color: "#6B7280" }}>Your Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="admin-input" placeholder="Enter your name" />
                            </div>
                            <div>
                                <label className="block font-dm font-medium text-[13px] mb-1.5" style={{ color: "#6B7280" }}>Rating</label>
                                <StarRating rating={rating} onChange={setRating} interactive size={28} />
                            </div>
                            <div>
                                <label className="block font-dm font-medium text-[13px] mb-1.5" style={{ color: "#6B7280" }}>Your Review</label>
                                <textarea value={text} onChange={e => setText(e.target.value)} required rows={4} className="admin-input resize-none" style={{ height: "auto" }} placeholder="Tell us about your experience..." />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting || !name.trim() || !text.trim() || rating === 0}
                                className="btn-primary w-full py-3.5 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Submitting…" : "Submit Review"}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </Modal>
        </section>
    );
}
