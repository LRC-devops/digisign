/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "gold-900": "#7c6e4b",
        "gold-800": "#918158",
        "gold-700": "#a69364",
        "gold-600": "#baa671",
        "gold-500": '#cfb87d',
        "gold-400": '#d4bf8a',
        "gold-300": '#d9c697',
        "gold-200": '#ddcda4',
        "gold-100": '#e2d4b1',
        "green-900": "#577c5a",
        "green-800": "#669169",
        "green-700": "#74a678",
        "green-600": "#83ba87",
        "green-500": '#91cf96',
        "green-400": '#9cd4a1',
        "green-300": '#a7d9ab',
        "green-200": '#b2ddb6',
        "green-100": '#bde2c0',
        "cancel-500": "#ff4500",
        "cancel-900": "#992900",
        "temp-500": "#ffa726",
        "temp-900": "#996417",
      },
      keyframes: {
        pan: {
          from: { transform: 'translateX(-100)' },
          to: { transform: 'translateX(100)' }
        }
      }
    },
  },
  plugins: [],
}

