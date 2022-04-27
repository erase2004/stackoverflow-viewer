const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,pug}'
  ],
  theme: {
    colors: {
      ...colors,
      primary: colors.cyan,
      secondary: colors.gray
    },
    extend: {
    }
  },
  plugins: []
}
