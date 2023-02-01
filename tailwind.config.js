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
      white: '#FFFAFA',
      black: '#0A0521',
      purple: '#5843BE',
      grayPrimary: '#8E9294',
    },
    fontFamily: {
      sans: 'Unbounded',
    },
    extend: {},
  },
  plugins: [],
};
