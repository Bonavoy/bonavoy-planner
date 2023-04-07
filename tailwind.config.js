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
      primary: '#473BF0',
      background: '#ffffff',
      surface: '#ecebec',
      transparent: 'transparent',

      black: '#0A0521',
      white: '#FFFFFF',
      grayPrimary: '#8E9294',
      graySecondary: '#A3A6A8',
      grayTertiary: '#B8BABC',
      transparent: 'transparent',
    },
    fontFamily: {
      // sans: 'Anybody',
      sans: ['Open Sans', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
