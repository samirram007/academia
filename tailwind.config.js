/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  daisyui: {
    themes: ["dark"],
  },
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },

      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },

    },
  },
  plugins: [require("daisyui")],
}