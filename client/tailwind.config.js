/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-main": "#2f2e43",
        "top1": '#FF4C4C',
        "top2": '#FF7F50',
        "top3": '#FFA500',
        "top4": '#FFD700',
        "top5": '#FFC107'
      }
    },
  },
  plugins: [],
}