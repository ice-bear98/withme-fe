/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "455px" },
        s: { max: "628px" },
        sm: { max: "840px" },
        md: { max: "1070px" },
        ml: { max: "1255px" },
        l: { max: "1600px" },
      },
      colors: {
        brand_1: "#B1B2FF",
        brand_2: "#AAC4FF",
        brand_3: "#D2DAFF",
        brand_4: "#EEF1FF",
      },
    },
  },
  plugins: [],
};
