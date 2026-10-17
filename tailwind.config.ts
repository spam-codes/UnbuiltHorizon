import type { Config } from "tailwindcss";

// Central design tokens. Change a color/font here and it propagates
// everywhere in the site — components should never hardcode raw hex values.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A", // primary background
        surface: "#151515", // raised panels / cards
        surface2: "#1D1C18", // secondary panel tint (warm black)
        signal: "#F5C518", // primary yellow accent
        "signal-dim": "#D4A912", // hover/active yellow
        "signal-soft": "#3A331A", // yellow tint on dark, for subtle fills
        bone: "#F5F5F0", // primary text on dark
        mute: "#8F8C82", // secondary text
        line: "#2A2924", // hairline borders
      },
      fontFamily: {
        display: [
          '"Space Grotesk"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        body: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(245,197,24,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        "dash-draw": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
      },
      animation: {
        "dash-draw": "dash-draw 2.4s ease-out forwards",
        "pulse-node": "pulse-node 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
