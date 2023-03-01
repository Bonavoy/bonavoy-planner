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
      primary: '#0d736f',
      background: '#ffffff',
      surface: '#ecebec',
      transparent: 'transparent',

      black: '#0A0521',
      white: '#FFFFFF',
      grayPrimary: '#8E9294',
    },
    fontFamily: {
      sans: 'Anybody',
    },
    extend: {},
  },
  plugins: [],
};
