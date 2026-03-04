import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand violet
        primary: "#7C3AED",
        violet: {
          DEFAULT: "#7C3AED",
          deep: "#6D28D9",
          light: "#8B5CF6",
          lavender: "#A78BFA",
          pale: "#C4B5FD",
          ghost: "#EDE9FE",
          mist: "#F5F3FF",
          soft: "#DDD6FE",
          border: "rgba(124,58,237,0.12)",
        },
        // Legacy aliases
        "hover-blue": "#6D28D9",
        navy: "#0F0F0F",
        midnight: "#FFFFFF",
        "surface-dark": "#F5F3FF",
        "border-dark": "rgba(124,58,237,0.12)",
        // Dark section backgrounds (deep violet, never grey-black)
        "dark-1": "#1A1035",
        "dark-2": "#1E1547",
        "dark-3": "#251C55",
        "dark-4": "#2D2260",
        // Text
        "near-black": "#0F0F0F",
        "dark-grey": "#374151",
        "deep-text": "#0F0F0F",
        muted: "#6B7280",
        "blue-grey": "#94A3B8",
        "medium-grey": "#6B7280",
        // Light surfaces
        "off-white": "#F5F3FF",
        "light-grey": "#F0F4F8",
        "border-light": "#E5E7EB",
        "border-grey": "#D1D5DB",
        // Accents
        gold: "#F5A623",
        success: "#27AE60",
        whatsapp: "#25D366",
        error: "#E74C3C",
      },
      fontFamily: {
        bricolage: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
        dm: ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "xs": ["0.8125rem", { lineHeight: "1.5" }],   // 13px
        "sm": ["0.9375rem", { lineHeight: "1.6" }],   // 15px
        "base": ["1rem", { lineHeight: "1.65" }],  // 16px
        "md": ["1.125rem", { lineHeight: "1.6" }],   // 18px
        "lg": ["1.375rem", { lineHeight: "1.4" }],   // 22px
        "xl": ["1.75rem", { lineHeight: "1.3" }],   // 28px
        "2xl": ["2.25rem", { lineHeight: "1.2" }],   // 36px
        "3xl": ["2.75rem", { lineHeight: "1.15" }],  // 44px
        "4xl": ["4rem", { lineHeight: "1.1" }],   // 64px
      },
      borderRadius: {
        "xs": "6px",
        "sm": "10px",
        "md": "14px",
        "lg": "20px",
        "xl": "24px",
        "2xl": "32px",
        "full": "9999px",
      },
      boxShadow: {
        "card": "0 2px 16px rgba(124,58,237,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 16px 48px rgba(124,58,237,0.18), 0 4px 12px rgba(124,58,237,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(124,58,237,0.25)",
        "glass-hover": "0 20px 60px rgba(0,0,0,0.45), 0 4px 20px rgba(124,58,237,0.35)",
        "button": "0 4px 14px rgba(124,58,237,0.4), 0 2px 4px rgba(124,58,237,0.2)",
        "button-hover": "0 8px 24px rgba(124,58,237,0.55)",
        "modal": "0 24px 80px rgba(124,58,237,0.22), 0 8px 24px rgba(0,0,0,0.12)",
        "float": "0 8px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.15)",
        "navbar": "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
        "glow-violet": "0 0 0 3px rgba(124,58,237,0.4), 0 8px 24px rgba(124,58,237,0.3)",
      },
      maxWidth: {
        "site": "1200px",
      },
      animation: {
        "orb-1": "orb1 12s ease-in-out infinite",
        "orb-2": "orb2 16s ease-in-out infinite",
        "orb-3": "orb3 20s ease-in-out infinite",
        "ticker": "tickerScroll 35s linear infinite",
        "brands": "brandsScroll 35s linear infinite",
        "float-pulse": "floatPulse 5s ease-in-out infinite",
        "nav-pulse": "navPulse 5s ease-in-out infinite",
        "chevron-bob": "chevronBob 1.5s ease-in-out infinite",
        "shimmer": "shimmer 1.5s linear infinite",
        "status": "statusPulse 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "slide-right": "slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) forwards",
        "slide-out": "slideOutRight 0.25s cubic-bezier(0.4,0,0.2,1) forwards",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "draw-line": "drawLine 0.6s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        orb1: {
          "0%, 100%": { transform: "translate(0%,0%) scale(1)" },
          "33%": { transform: "translate(5%,-8%) scale(1.1)" },
          "66%": { transform: "translate(-3%,5%) scale(0.95)" },
        },
        orb2: {
          "0%, 100%": { transform: "translate(0%,0%) scale(1)" },
          "33%": { transform: "translate(-6%,4%) scale(1.05)" },
          "66%": { transform: "translate(4%,-6%) scale(1.1)" },
        },
        orb3: {
          "0%, 100%": { transform: "translate(0%,0%) scale(1)" },
          "50%": { transform: "translate(3%,6%) scale(0.9)" },
        },
        tickerScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        brandsScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floatPulse: {
          "0%": { boxShadow: "0 8px 24px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0.6)" },
          "70%": { boxShadow: "0 8px 24px rgba(37,211,102,0.45), 0 0 0 16px rgba(37,211,102,0)" },
          "100%": { boxShadow: "0 8px 24px rgba(37,211,102,0.45), 0 0 0 0 rgba(37,211,102,0)" },
        },
        navPulse: {
          "0%, 85%, 100%": { boxShadow: "0 4px 14px rgba(124,58,237,0.4), 0 2px 4px rgba(124,58,237,0.2)" },
          "90%": { boxShadow: "0 4px 14px rgba(124,58,237,0.4), 0 0 0 8px rgba(124,58,237,0), 0 2px 4px rgba(124,58,237,0.2)" },
          "92%": { boxShadow: "0 6px 20px rgba(124,58,237,0.6), 0 0 0 0 rgba(124,58,237,0), 0 2px 6px rgba(124,58,237,0.3)" },
        },
        chevronBob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        statusPulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "60%": { transform: "scale(1.2)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        drawLine: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
      },
      backdropBlur: { "glass": "24px" },
    },
  },
  plugins: [],
};

export default config;
