/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        greyMain: '#393939',
        greenVue: "#42b983",
        darkMode: "#121212",
        darkModeCard: "#202020"
      }
    },
  },
  variants: {
    extend: {
      lineClamp: ['hover']
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
