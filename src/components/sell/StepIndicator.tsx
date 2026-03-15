"use client";

import React from "react";

const STEPS = [
  { label: "Brand" },
  { label: "Condition" },
  { label: "Details" },
  { label: "Review" },
];

interface StepIndicatorProps {
  currentStep: number; // 1-based
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <>
      {/* ── Desktop: dots + labels ── */}
      <div className="hidden sm:flex items-center justify-center mb-8">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-1.5">
                {/* Dot */}
                <div
                  className="flex items-center justify-center transition-all duration-300"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9999px",
                    background: isCompleted
                      ? "#27AE60"
                      : isActive
                      ? "#7C3AED"
                      : "rgba(124,58,237,0.12)",
                    border: isActive
                      ? "2px solid #7C3AED"
                      : isCompleted
                      ? "2px solid #27AE60"
                      : "2px solid rgba(124,58,237,0.15)",
                    boxShadow: isActive ? "0 0 0 4px rgba(124,58,237,0.12)" : "none",
                  }}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <span
                      className="font-poppins font-semibold"
                      style={{
                        fontSize: "13px",
                        color: isActive ? "#FFFFFF" : "rgba(124,58,237,0.5)",
                      }}
                    >
                      {stepNum}
                    </span>
                  )}
                </div>
                {/* Label */}
                <span
                  className="font-dm transition-all duration-300"
                  style={{
                    fontSize: "12px",
                    color: isActive ? "#7C3AED" : "#9CA3AF",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting line — not after last */}
              {i < STEPS.length - 1 && (
                <div
                  className="flex-1 mx-2 transition-all duration-500"
                  style={{
                    height: "2px",
                    background:
                      stepNum < currentStep
                        ? "#27AE60"
                        : "rgba(124,58,237,0.15)",
                    marginBottom: "18px",
                    maxWidth: "80px",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Mobile: text only ── */}
      <div className="sm:hidden text-center mb-6">
        <span
          className="font-poppins font-semibold"
          style={{ fontSize: "14px", color: "#7C3AED" }}
        >
          Step {currentStep} of {STEPS.length}
        </span>
        <span className="font-dm ml-2" style={{ fontSize: "14px", color: "#6B7280" }}>
          — {STEPS[currentStep - 1]?.label}
        </span>
      </div>
    </>
  );
}
