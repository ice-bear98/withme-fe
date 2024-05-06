/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '360px' },
        s: { max: '620px' },
        sm: { max: '840px' },
        md: { max: '1080px' },
        ml: { max: '1200px' },
        l: { max: '1600px' },
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
