/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {scale: {
      '120': '1.20',
      '130': '1.30',
    },},
  },
  plugins: [],
}

