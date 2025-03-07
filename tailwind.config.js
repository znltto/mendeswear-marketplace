// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "mendes-orange": "#F28C38",
        "mendes-dark": "#1A2A3A",
        "mendes-accent": "#D4A017",
        "mendes-gray": "#4A5568",
        "mendes-light": "#F7FAFC",
        "mendes-white": "#FFFFFF",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(242, 140, 56, 0.2))",
        "gradient-section": "linear-gradient(180deg, #FFFFFF, #F7FAFC)",
      },
      fontFamily: {
        sans: ["'Montserrat', sans-serif"],
      },
    },
  },
  plugins: [],
};