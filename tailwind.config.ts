import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#0f172a", // Dark slate for headers/footers
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
          500: "#64748b",
        },
        accent: {
          600: "#0d9488", // Darker teal
          500: "#14b8a6", // Bright teal (matches screenshot)
          400: "#2dd4bf", // Lighter teal
        },
        surface: {
          900: "#111827", // Dark background for dark sections
          800: "#1f2937",
          700: "#374151",
          600: "#4b5563",
          500: "#6b7280",
          400: "#9ca3af",
          300: "#d1d5db",
          200: "#e5e7eb",
          100: "#f3f4f6",
          50: "#f9fafb",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Arial Narrow", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 15px rgba(20, 184, 166, 0.3)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 25px rgba(20, 184, 166, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
