"use client";

import React from "react";
import { useQuery } from "@/lib/mockBackend";
import { api } from "@/lib/mockBackend";

const DEFAULT_ITEMS = [
    "⚡ Same-Day Repairs Available",
    "🔧 All Brands Repaired",
    "📍 Harsha Complex, Hubli",
    "🕐 Open 10AM – 8PM Daily",
    "✅ 30-Day Quality Warranty",
    "💳 Cash & UPI Accepted",
];

export default function AnnouncementTicker() {
    const banner = useQuery(api.banners.getTicker);

    if (banner && !banner.isVisible) return null;

    const text = banner?.headingText || "";
    const items = text
        ? text.split("◆").map((s: string) => s.trim()).filter(Boolean)
        : DEFAULT_ITEMS;

    // Duplicate for seamless loop
    const doubled = [...items, ...items];

    return (
        <div
            className="ticker-bar w-full overflow-hidden flex-shrink-0 select-none"
            style={{ height: 36, backgroundColor: "#7C3AED" }}
        >
            <div
                className="ticker-track flex items-center h-full"
                onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
                onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
            >
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-3 px-5 whitespace-nowrap font-dm font-medium text-white"
                        style={{ fontSize: "13px", letterSpacing: "0.04em" }}
                        aria-hidden={i >= items.length}
                    >
                        {item}
                        <span className="opacity-50 text-xs">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
