import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "side-light": "#15171a",
        "side-light-second": "#232629",
        "side-light-text": "#e4e4e4",
        "side-text-color": "#505256",
        "side-dark": "#0c0f12",
        "side-hover-text": "#989898",
        "card-dark": "#0a0a0a",
        purp: "#9c27b0",
        light: "#eeeff0",
        dark: "#12161b",
      },
    },
  },
  plugins: [],
};
export default config;
