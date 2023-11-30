/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./theme/**/*.{js,ts,jsx,tsx,html,twig}",
    "./theme/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#464646",
        blackColor: {
          DEFAULT: "#231F20",
          50: "#1E1E1E",
          100: "#333333",
        },
        whiteColor: {
          DEFAULT: "#FFFFFF",
          50: "#DCDBD8",
          100: "#C6C6C6",
          200: "#ECECEC",
          300: "#E1E1E1",
          400: "#F7F7F7",
          500: "#dcdbd8",
          600: "#f6f6f6",
        },
        backdropBg: "#00000073",
        yellowColor: {
          DEFAULT: "#FFC700",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
