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
      },
      keyframes: {
        questionJump: {
          '0%': { top: '0em' },
          '40%': { top: '0em' },
          '43%': { top: '-0.9em' },
          '46%': { top: '0em' },
          '48%': { top: '-0.4em' },
          '50%': { top: '0em' },
          '100%': { top: '0em' },
        },
      },
      animation: {
        questionJump: 'questionJump 4s infinite linear',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}