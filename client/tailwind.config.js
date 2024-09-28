/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glowing: {
          "0%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "400% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
      },
      animation: {
        glowing: "glowing 20s linear infinite",
      },
      colors: {
        glowGradient: {
          from: "#ff0000",
          via: "#ff7300",
          to: "#ff00c8",
        },
      },
    },
  },
  plugins: [],
};
