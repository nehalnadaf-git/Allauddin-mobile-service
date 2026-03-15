"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SellYourMobileTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "#1E1547",
        paddingTop: "clamp(72px, 8vw, 96px)",
        paddingBottom: "clamp(72px, 8vw, 96px)",
      }}
    >
      {/* ── Noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.03,
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Animated violet orb ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "9999px",
          background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)",
          animation: "orbFloat 10s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-45%, -55%) scale(1.08); }
          66% { transform: translate(-55%, -45%) scale(0.95); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cardFloat2 {
          0%, 100% { transform: rotate(8deg) translateY(-16px) translateX(16px); }
          50% { transform: rotate(8deg) translateY(-24px) translateX(16px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <div className="container-max mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-10">

          {/* ══ LEFT — Text Content (55%) ══ */}
          <div
            className="flex-1 lg:max-w-[55%] w-full"
            style={{
              animation: visible ? "slideInLeft 550ms ease forwards" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            {/* Badge */}
            <div className="inline-flex mb-5">
              <span
                className="font-poppins font-semibold uppercase"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  color: "#A78BFA",
                  background: "rgba(124,58,237,0.35)",
                  borderRadius: "9999px",
                  padding: "6px 14px",
                }}
              >
                NEW FEATURE
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-bricolage mb-5 leading-[1.15] tracking-tight"
              style={{ fontWeight: 800, fontSize: "clamp(36px, 5vw, 52px)", letterSpacing: "-0.02em" }}
            >
              <span style={{ color: "#FFFFFF", display: "block" }}>Sell Your</span>
              <span style={{ color: "#A78BFA", display: "block" }}>Old Mobile.</span>
            </h2>

            {/* Description */}
            <p
              className="font-dm mb-7"
              style={{
                fontSize: "clamp(15px, 2vw, 17px)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                maxWidth: "480px",
              }}
            >
              Got a dead phone or old mobile lying around? Tell us about it in under 2 minutes.
              We will come back to you with the best price — no haggling, no hassle, direct on WhatsApp.
            </p>

            {/* Benefit Pills */}
            <div className="flex flex-wrap gap-[10px] mb-8">
              {[
                "✓ Dead Phones Accepted",
                "✓ All Brands Welcome",
                "✓ Instant WhatsApp Response",
                "✓ Best Price Guaranteed",
              ].map((pill) => (
                <span
                  key={pill}
                  className="font-dm"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "9999px",
                    padding: "8px 16px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/sell-your-mobile"
              className="inline-flex items-center justify-center font-poppins font-semibold text-white transition-all active:scale-[0.97] w-full sm:w-auto"
              style={{
                fontSize: "15px",
                height: "52px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
                padding: "0 32px",
                textDecoration: "none",
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(124,58,237,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(124,58,237,0.4)";
              }}
            >
              Get Best Price →
            </Link>
          </div>

          {/* ══ RIGHT — Visual Card Composition (45%) — hidden on mobile ══ */}
          <div
            className="hidden lg:flex flex-shrink-0 lg:max-w-[45%] w-full items-center justify-center relative"
            style={{
              animation: visible ? "slideInRight 550ms ease forwards" : "none",
              opacity: visible ? undefined : 0,
            }}
          >
            <div className="relative" style={{ width: "340px" }}>

              {/* ── Small floating badge — top right ── */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "16px",
                  padding: "12px 16px",
                  transform: "rotate(8deg) translateY(-16px) translateX(16px)",
                  zIndex: 10,
                  animation: "cardFloat2 5s ease-in-out infinite",
                  animationDelay: "0.8s",
                  whiteSpace: "nowrap",
                }}
              >
                <span className="font-poppins font-semibold text-white" style={{ fontSize: "13px" }}>
                  📱 Dead phones OK!
                </span>
              </div>

              {/* ── Main glassmorphism card ── */}
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "28px",
                  padding: "32px",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
                  animation: "cardFloat 4s ease-in-out infinite",
                }}
              >
                {/* Step rows */}
                {[
                  { num: "01", label: "Brand & Model", done: true },
                  { num: "02", label: "Phone Condition", done: true },
                  { num: "03", label: "Your Details", done: false },
                ].map((step, i) => (
                  <div key={step.num}>
                    <div
                      className="flex items-center gap-3"
                      style={{ padding: "16px 0" }}
                    >
                      <span
                        className="font-bricolage font-bold flex-shrink-0"
                        style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", minWidth: "24px" }}
                      >
                        {step.num}
                      </span>
                      <span
                        className="font-poppins font-medium flex-1"
                        style={{ fontSize: "15px", color: "#FFFFFF" }}
                      >
                        {step.label}
                      </span>
                      {/* Status icon */}
                      {step.done ? (
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "9999px",
                            background: "rgba(124,58,237,0.3)",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "9999px",
                            background: "rgba(255,255,255,0.1)",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="4" stroke="white" strokeWidth="1.5" />
                            <path d="M6 4v2.5l1.5 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {i < 2 && (
                      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
                    )}
                  </div>
                ))}

                {/* Bottom WhatsApp pill */}
                <div className="flex justify-center mt-5">
                  <span
                    className="font-dm"
                    style={{
                      fontSize: "13px",
                      color: "#A78BFA",
                      background: "rgba(124,58,237,0.3)",
                      borderRadius: "9999px",
                      padding: "8px 16px",
                      fontWeight: 500,
                    }}
                  >
                    💬 Sends directly to WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
