import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef6ee",
          100: "#d7ead8",
          200: "#b0d5b2",
          300: "#82ba86",
          400: "#579a5e",
          500: "#3a7d42",
          600: "#2c6433",
          700: "#245029",
          800: "#1c3f21",
          900: "#123016",
        },
        leaf: {
          400: "#8bc34a",
          500: "#6cb32e",
          600: "#549425",
        },
        carrot: {
          400: "#ffb84d",
          500: "#ff9e2c",
          600: "#f5810a",
        },
        tomato: {
          400: "#ef5350",
          500: "#e53935",
          600: "#c62828",
        },
        cream: "#faf8f2",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
