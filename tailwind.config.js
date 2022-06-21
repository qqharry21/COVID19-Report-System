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
      main: '#4472c4',
      primary: {
        orange: '#fd8907',
        red: '#951901',
      },
    },
    extend: {
      animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar-hide')],
};
