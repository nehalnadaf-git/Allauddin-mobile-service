"use client";

import React from "react";

const BRANDS = [
  { name: "Samsung", emoji: "🔵" },
  { name: "Apple iPhone", emoji: "🍎" },
  { name: "OnePlus", emoji: "🔴" },
  { name: "Vivo", emoji: "🟦" },
  { name: "Oppo", emoji: "🟩" },
  { name: "Realme", emoji: "🟨" },
  { name: "Redmi", emoji: "🅡" },
  { name: "MI", emoji: "🔶" },
  { name: "Motorola", emoji: "〽️" },
  { name: "Nokia", emoji: "🟦" },
  { name: "iQOO", emoji: "🏁" },
  { name: "Poco", emoji: "⚡" },
  { name: "Infinix", emoji: "♾️" },
  { name: "Tecno", emoji: "🟧" },
  { name: "Google Pixel", emoji: "🌈" },
  { name: "Other", emoji: "📱" },
];

interface BrandSelectorProps {
  selectedBrand: string;
  customBrand: string;
  onBrandChange: (brand: string) => void;
  onCustomBrandChange: (val: string) => void;
  error?: string;
}

export default function BrandSelector({
  selectedBrand,
  customBrand,
  onBrandChange,
  onCustomBrandChange,
  error,
}: BrandSelectorProps) {
  return (
    <div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))" }}
      >
        {BRANDS.map((brand) => {
          const isSelected = selectedBrand === brand.name;
          return (
            <button
              key={brand.name}
              type="button"
              onClick={() => onBrandChange(brand.name)}
              className="relative flex flex-col items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.96] cursor-pointer"
              style={{
                background: isSelected ? "rgba(124,58,237,0.08)" : "#FFFFFF",
                border: isSelected
                  ? "2px solid #7C3AED"
                  : "1.5px solid rgba(124,58,237,0.15)",
                borderRadius: "16px",
                padding: "16px 8px",
                minHeight: "72px",
                transform: isSelected ? "translateY(-2px)" : undefined,
                boxShadow: isSelected
                  ? "0 4px 16px rgba(124,58,237,0.2)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.border = "1.5px solid rgba(124,58,237,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.04)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.border = "1.5px solid rgba(124,58,237,0.15)";
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }
              }}
              aria-pressed={isSelected}
            >
              {/* Selected checkmark */}
              {isSelected && (
                <div
                  className="absolute flex items-center justify-center"
                  style={{
                    top: "6px",
                    right: "6px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "9999px",
                    background: "#7C3AED",
                  }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              {/* Brand icon */}
              <span style={{ fontSize: "22px", lineHeight: 1 }}>{brand.emoji}</span>

              {/* Brand name */}
              <span
                className="font-poppins font-medium text-center leading-tight"
                style={{
                  fontSize: "12px",
                  color: isSelected ? "#7C3AED" : "#374151",
                  fontWeight: isSelected ? 600 : 500,
                  wordBreak: "break-word",
                }}
              >
                {brand.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* "Other" custom input */}
      {selectedBrand === "Other" && (
        <div className="mt-4">
          <input
            type="text"
            value={customBrand}
            onChange={(e) => onCustomBrandChange(e.target.value)}
            placeholder="Type your brand name"
            className="font-dm w-full transition-all duration-200"
            style={{
              fontSize: "15px",
              height: "52px",
              borderRadius: "14px",
              border: "1.5px solid rgba(124,58,237,0.25)",
              padding: "0 16px",
              outline: "none",
              color: "#0F0F0F",
              background: "#FFFFFF",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.border = "1.5px solid #7C3AED";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(124,58,237,0.1)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.border = "1.5px solid rgba(124,58,237,0.25)";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
          />
        </div>
      )}

      {error && (
        <p
          className="font-dm mt-2"
          style={{
            fontSize: "13px",
            color: "#E74C3C",
            animation: "shake 300ms ease",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
