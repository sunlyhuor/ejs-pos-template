/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js,ejs}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
          primary: "#E7E3F1",
          "on-primary": "#3A3C3E",
          secondary: "#FFBB00",
          "on-secondary": "#000000"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}