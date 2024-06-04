/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  mode: 'jit',

  content: ['./src/**/*.{html,ts}'],

  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '940px',
      xl: '1100px',
      '2xl': '1200px',
    },
    extend: {
      colors: {
        primary: {
          50: '#FFC49B',
          100: '#F86E4C',
          200: '#D04C2E',
          300: '#A92811',
          400: '#820000',
          500: '#5F0000',
        },
        secondary: {
          100: '#050505',
        },
      },
    },
  },
};
