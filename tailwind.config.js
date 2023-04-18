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
      primary: '#5D3FD3',
      background: '#ffffff',
      surface: '#ecebec',
      transparent: 'transparent',

      red: '#ff0000',
      black: '#37352f',
      white: '#FFFFFF',
      grayPrimary: '#8E9294',
      graySecondary: '#A3A6A8',
      grayTertiary: '#B8BABC',
      transparent: 'transparent',

      error: '#ff0000',
      gray: {
        DEFAULT: '#8D8F90',
        50: '#EAEAEB',
        100: '#E0E0E1',
        200: '#CBCCCC',
        300: '#B6B8B8',
        400: '#A2A3A4',
        500: '#8D8F90',
        600: '#717374',
        700: '#555758',
        800: '#3A3B3B',
        900: '#1E1E1F',
      },
    },
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        centered:
          'rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px',
      },
    },
  },
  plugins: [],
};
