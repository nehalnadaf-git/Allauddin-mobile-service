"use client";

import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

const DEFAULT_BRANDS = [
    { name: "Samsung" },
    { name: "Apple" },
    { name: "OnePlus" },
    { name: "Vivo" },
    { name: "Oppo" },
    { name: "Realme" },
    { name: "Redmi" },
    { name: "Poco" },
    { name: "Nokia" },
];

export default function BrandsStrip() {
    const brandsData = useQuery(api.brands.list);
    const brands = (brandsData && (brandsData as any[]).length > 0)
        ? (brandsData as any[]).filter((b: any) => b.isVisible !== false)
        : DEFAULT_BRANDS;

    const doubled = [...brands, ...brands, ...brands, ...brands];

    return (
        <section
            className="py-[48px] md:py-[64px] relative overflow-hidden"
            style={{ background: "#FFFFFF" }}
        >
            {/* Violet dot-grid texture */}
            <div className="absolute inset-0 pointer-events-none dot-grid-violet" />

            <div className="container-max mx-auto px-4 mb-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h3
                        className="font-bricolage font-bold text-near-black"
                        style={{ fontSize: "clamp(20px, 3vw, 28px)", letterSpacing: "-0.02em" }}
                    >
                        Trusted to Repair All Major Brands
                    </h3>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-[36px] h-[3px] bg-violet rounded-full mx-auto mt-3"
                        style={{ transformOrigin: "left center" }}
                    />
                </motion.div>
            </div>

            {/* Marquee strip */}
            <div
                className="overflow-hidden max-w-5xl mx-auto relative z-10"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                }}
            >
                <div
                    className="brands-track py-4 flex gap-12 md:gap-20 items-center w-max"
                    style={{ animationDuration: "40s" }}
                >
                    {doubled.map((brand: any, i: number) => (
                        <div
                            key={i}
                            className="flex items-center justify-center flex-shrink-0 px-2 group cursor-default"
                        >
                            <span
                                className="font-poppins font-extrabold whitespace-nowrap"
                                style={{
                                    fontSize: "clamp(20px, 3.5vw, 26px)",
                                    letterSpacing: "-0.02em",
                                    color: "rgba(15,15,15,0.25)",
                                    transition: "color 0.3s",
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLElement).style.color = "#7C3AED";
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.color = "rgba(15,15,15,0.25)";
                                }}
                            >
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
