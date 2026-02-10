import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F9FAFB",
        secondary: "#16A34A",
        accent: "#F97316",
        error: "#DC2626",
        background: "#F8FAFC",
        button_bg: "#1E7F5C",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Inter", "sans-serif"], // Example custom utility name
      },
    },
  },
  plugins: [],
};
