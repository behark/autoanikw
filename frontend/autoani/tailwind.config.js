/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fcf1c9',
          200: '#f7e194',
          300: '#f1cc55',
          400: '#e9b626',
          500: '#D4AF37', // Primary gold
          600: '#B8941F', // Dark gold
          700: '#a0760b',
          800: '#845e0e',
          900: '#6f4e12',
        },
      },
    },
  },
  plugins: [],
}
