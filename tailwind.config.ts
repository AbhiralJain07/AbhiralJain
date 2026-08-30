import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        background: "#0b0b0c",
        foreground: "#f5f5f7",
        accent: "#00e5ff", // Electric Neon Cyan
        cardBg: "#121214",
        borderDark: "#222226",
      },
    },
  },
  plugins: [],
};
export default config;
