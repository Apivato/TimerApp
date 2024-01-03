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
  screens: {
    'sm': '320px',
    // => @media (minwidth: 320px) {...}
    'md': '320px',
    // => @media (minwidth: 320px) {...}
    'lg': '1200px',
    // => @media (minwidth: 320px) {...}
    'xl': '320px',
    // => @media (minwidth: 320px) {...}
    '2xl': '320px',
    // => @media (minwidth: 320px) {...}
  },
  fontSize: {
    sm: '',
    base: '1rem',
    md: '',
    lg: '',
    xl: '',
    '2xl': '',
  },
  plugins: [],

}


