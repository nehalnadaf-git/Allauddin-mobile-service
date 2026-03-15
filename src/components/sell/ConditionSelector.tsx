"use client";

import React from "react";

interface ConditionOption {
  id: string;
  emoji: string;
  title: string;
  sub: string;
  borderColor: string;
  bgColor: string;
}

const CONDITIONS: ConditionOption[] = [
  {
    id: "Working Phone",
    emoji: "🟢",
    title: "Working Phone",
    sub: "Phone turns on, screen works, can make calls",
    borderColor: "#27AE60",
    bgColor: "rgba(39,174,96,0.05)",
  },
  {
    id: "Damaged But Working",
    emoji: "🟡",
    title: "Damaged But Working",
    sub: "Cracked screen, broken parts — but still turns on",
    borderColor: "#F5A623",
    bgColor: "rgba(245,166,35,0.05)",
  },
  {
    id: "Dead Phone",
    emoji: "🔴",
    title: "Dead Phone",
    sub: "Does not turn on at all — for parts or repair",
    borderColor: "#E74C3C",
    bgColor: "rgba(231,76,60,0.05)",
  },
  {
    id: "Broken Screen Only",
    emoji: "📱",
    title: "Broken Screen Only",
    sub: "Screen cracked or shattered — everything else works",
    borderColor: "#7C3AED",
    bgColor: "rgba(124,58,237,0.05)",
  },
];

interface ConditionSelectorProps {
  selected: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function ConditionSelector({ selected, onChange, error }: ConditionSelectorProps) {
  return (
    <div>
      <div className="flex flex-col gap-3">
        {CONDITIONS.map((cond) => {
          const isSelected = selected === cond.id;
          return (
            <button
              key={cond.id}
              type="button"
              onClick={() => onChange(cond.id)}
              className="flex items-center gap-4 text-left transition-all duration-200 active:scale-[0.99] cursor-pointer w-full"
              style={{
                background: isSelected ? cond.bgColor : "#FFFFFF",
                border: isSelected
                  ? `1.5px solid ${cond.borderColor}`
                  : "1.5px solid rgba(124,58,237,0.12)",
                borderLeft: isSelected ? `4px solid ${cond.borderColor}` : "1.5px solid rgba(124,58,237,0.12)",
                borderRadius: "18px",
                padding: "20px",
                transform: isSelected ? "translateY(-2px)" : undefined,
                boxShadow: isSelected ? `0 4px 16px ${cond.borderColor}22` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(124,58,237,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }
              }}
              aria-pressed={isSelected}
            >
              {/* Emoji */}
              <span style={{ fontSize: "26px", flexShrink: 0 }}>{cond.emoji}</span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-poppins font-semibold"
                  style={{ fontSize: "17px", color: "#0F0F0F" }}
                >
                  {cond.title}
                </p>
                <p className="font-dm" style={{ fontSize: "14px", color: "#6B7280", marginTop: "2px" }}>
                  {cond.sub}
                </p>
              </div>

              {/* Radio indicator */}
              <div
                className="flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "9999px",
                  border: isSelected ? `2px solid ${cond.borderColor}` : "2px solid rgba(124,58,237,0.2)",
                  background: isSelected ? cond.borderColor : "transparent",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      background: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p
          className="font-dm mt-2"
          style={{ fontSize: "13px", color: "#E74C3C", animation: "shake 300ms ease" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
