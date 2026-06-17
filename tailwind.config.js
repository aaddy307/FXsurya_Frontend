/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#1F1F1F",
      },
      colors: {
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#111111",
          light: "#161616",
        },
        accent: {
          gold: "#F5A623",
          "gold-hover": "#FFD166",
        },
        border: "#1F1F1F",
        success: "#22C55E",
        danger: "#EF4444",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;