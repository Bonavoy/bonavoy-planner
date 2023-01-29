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
      lightBlue: '#2364AA',
      darkOrange: '#EA7317',
      white: '#FFFFFF',
      black: '#000000',
    },
    fontFamily: {
      sans: 'Unbounded',
    },
    extend: {},
  },
  plugins: [],
};
