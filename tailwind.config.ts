import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#7C5CFF",
        secondary: "#00D4FF",
        bg: "#0A0A0A",
        surface: "#111111",
        "surface-2": "#161616",
        muted: "#A1A1AA",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #7C5CFF, #00D4FF)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(124,92,255,0.15), rgba(0,212,255,0.15))",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "float-slow": "float 8s ease-in-out infinite 1s",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "cursor-glow": "cursor-glow 0.1s ease",
        "border-flow": "border-flow 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "slide-up": {
          from: { transform: "translateY(30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,92,255,0.3)",
        "glow-cyan": "0 0 40px rgba(0,212,255,0.2)",
        "glow-sm": "0 0 20px rgba(124,92,255,0.2)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
