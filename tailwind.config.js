/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black and Gray Theme
        'theme': {
          'black': '#000000',
          'dark': '#0a0a0a',
          'darker': '#1a1a1a',
          'gray-900': '#111111',
          'gray-800': '#1f1f1f',
          'gray-700': '#2d2d2d',
          'gray-600': '#404040',
          'gray-500': '#525252',
          'gray-400': '#737373',
          'gray-300': '#a3a3a3',
          'gray-200': '#d4d4d4',
          'gray-100': '#f5f5f5',
          'white': '#ffffff',
        }
      },
    },
  },
  plugins: [],
}
