/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '360px' },
        xs: { max: '460px' },
        s: { max: '680px' },
        sm: { max: '920px' },
        md: { max: '1060px' },
        ml: { max: '1220px' },
        l: { max: '1620px' },
      },
      colors: {
        brand_1: '#B1B2FF',
        brand_2: '#AAC4FF',
        brand_3: '#D2DAFF',
        brand_4: '#EEF1FF',
      },
      width: {
        1200: '1200px',
      },
      maxWidth: {
        1200: '1200px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
