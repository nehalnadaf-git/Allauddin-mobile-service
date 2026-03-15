import type { Metadata } from "next";
import SellForm from "@/components/sell/SellForm";

import HowSellingWorks from "@/components/sell/HowSellingWorks";

export const metadata: Metadata = {
  title: "Sell Your Mobile | Aladdin Mobile Service Hubli",
  description:
    "Sell your old or dead mobile in Hubli. Get the best price directly on WhatsApp from Aladdin Mobile Service.",
  openGraph: {
    title: "Sell Your Mobile | Aladdin Mobile Service Hubli",
    description:
      "Sell your old or dead mobile in Hubli. Get the best price directly on WhatsApp from Aladdin Mobile Service.",
    type: "website",
  },
};

export default function SellYourMobilePage() {
  return (
    <main>
      {/* ── Page Header ── */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          background: "#1E1547",
          minHeight: "clamp(170px, 20vw, 220px)",
          paddingTop: "clamp(112px, 14vw, 140px)",
          paddingBottom: "48px",
        }}
      >
        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            opacity: 0.03,
          }}
        />
        {/* Gradient mesh */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 80%, rgba(124,58,237,0.25) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 80% 20%, rgba(167,139,250,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 px-6 max-w-[640px]">
          {/* Badge */}
          <div className="inline-flex mb-4">
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
              SELL YOUR MOBILE
            </span>
          </div>

          {/* Heading with animated underline */}
          <h1
            className="font-bricolage font-bold text-white mb-4 relative inline-block"
            style={{
              fontSize: "clamp(30px, 5vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            Get Best Price For Your Phone
            <span
              className="absolute left-0 right-0 bottom-[-6px] h-[3px] rounded-full"
              style={{
                background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
                animation: "underlineDraw 0.8s ease forwards 0.3s",
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }}
            />
          </h1>

          <p
            className="font-dm mx-auto"
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.70)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Fill the form below and connect with us directly on WhatsApp.
            Takes under 2 minutes.
          </p>
        </div>

        <style>{`
          @keyframes underlineDraw {
            to { transform: scaleX(1); }
          }
        `}</style>
      </section>

      {/* ── Smart Sell Form ── */}
      <section
        className="relative"
        style={{
          background: "#F5F3FF",
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          paddingTop: "clamp(40px, 6vw, 64px)",
          paddingBottom: "clamp(60px, 8vw, 80px)",
        }}
      >
        <div className="mx-auto px-4" style={{ maxWidth: "680px" }}>
          <div
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(124,58,237,0.12)",
              borderRadius: "28px",
              boxShadow:
                "0 4px 32px rgba(124,58,237,0.10), 0 1px 8px rgba(0,0,0,0.05)",
              padding: "clamp(28px, 5vw, 48px)",
              overflow: "hidden",
            }}
          >
            <SellForm />
          </div>
        </div>
      </section>

      {/* ── How Selling Works (Upgraded) ── */}
      <HowSellingWorks />
    </main>
  );
}
