/** @type {import('tailwindcss').Config} */
import config from './GlobalConfig';
module.exports = {
  prefix: '',
  mode: 'jit',
  darkMode: 'selector',
  content: ['./src/**/*.{html,ts}'],

  theme: {
    screens: { ...config.screens },
    extend: {
      colors: {
        "light-bg": "#fff",
        "dark-bg": "#191A1C",
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
