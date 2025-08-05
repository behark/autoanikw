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
        secondary: {
          50: 'rgb(250, 250, 252)',
          100: 'rgb(244, 244, 248)',
          200: 'rgb(232, 232, 238)',
          300: 'rgb(210, 210, 220)',
          400: 'rgb(170, 170, 190)',
          500: 'rgb(130, 130, 150)',
          600: 'rgb(98, 98, 122)',
          700: 'rgb(74, 74, 96)',
          800: 'rgb(48, 48, 64)',
          900: 'rgb(32, 32, 44)',
        },
      },
    },
  },
  plugins: [],
}
