/** @format */
const colors = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      main: ['Microsoft JhengHei', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif'],
    },
    screens: {
      xxs: '321px',
      xs: '426px',
      sm: '641px',
      md: '769px',
      lg: '1025px',
      xl: '1281px',
      lxl: '1537px',
    },
    colors: {
      ...colors,
      main: '#951901',
      primary: {
        orange: '#fd8907',
        yellow: '#fef5d2',
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
