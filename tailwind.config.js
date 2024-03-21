/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors:{
         accent:{
        1:"hsl(var(--color-accent1)/<alpha-value>)",
        2:"hsl(var(--color-accent2)/<alpha-value>)",
      },
      primary:"hsl(var(--color-primary)/<alpha-value>)",
      secondary:"hsl(var(--color-secondary)/<alpha-value>)",
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