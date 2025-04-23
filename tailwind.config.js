/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#FFFFF0',
        'pale-gold': '#E6BE8A',
        'celestial-blue': '#7CB9E8'
      },
    },
  },
  plugins: [],
}