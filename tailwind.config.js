/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage:{
        'graphicImage': "url('/src/background.png')",
      },
    }
  },
  plugins: [],
}

