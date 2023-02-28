/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      bonavoy_bg: '#FFFFFF',
      black: '#0A0521',
      purple: '#0d736f',
      grayPrimary: '#8E9294',
    },
    fontFamily: {
      sans: 'Unbounded',
    },
    extend: {},
  },
  plugins: [],
};
