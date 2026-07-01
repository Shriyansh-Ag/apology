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
        blush: {
          100: "#fff0f3",
          200: "#ffccd5",
          300: "#ffb3c1",
          400: "#ff8fa3",
          500: "#ff4d6d"
        },
        cream: "#fffdf9",
        peach: {
          100: "#ffedd5",
          300: "#fdba74"
        },
        lavender: {
          100: "#f3e8ff",
          300: "#d8b4fe"
        },
      },
      fontFamily: {
        sans: ["var(--font-quicksand)"],
        handwriting: ["var(--font-caveat)"],
      },
    },
  },
  plugins: [],
};
export default config;
