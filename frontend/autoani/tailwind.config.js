/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate')
  ],
}