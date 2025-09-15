/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'graphicImage': "url('/public/backgroundOnly.png')",
      },

    },
    screens: {
      'xs': '240px',
      // => @media (minwidth: 220px) {...}
      'sm': '295px',
      // => @media (minwidth: 3700px) {...}
      'md': '345px',
      // => @media (minwidth: 640px) {...}
      'lg': '450px',
      // => @media (minwidth: 1200px) {...}
      'xl': '600px',
      // => @media (minwidth: 1400px) {...}
      '2xl': '740px',
      // => @media (minwidth: 2000px) {...}
      '3xl': '920px',
      // => @media (minwidth: 2000px) {...}
      '4xl': '1090px',
      // => @media (minwidth: 2000px) {...}
      '5xl': '1270px',
      // => @media (minwidth: 2000px) {...}
      '6xl': '1520px',
      // => @media (minwidth: 2000px) {...}
    },
    fontSize: {
      base: ['1rem', '1rem'],
      xxs: ['2.55rem', '3rem'],
      xs: ['3rem', '3.45rem'],
      sm: ['3.75rem', '4.20rem'],
      md: ['4.5rem', '4.95rem'],
      lg: ['6rem', '6.45rem'],
      xl: ['8rem', '8.45rem'],
      '2xl': ['10rem', '10.45rem'],
      '3xl': ['12.5rem', '12.95rem'],
      '4xl': ['15rem', '15.45rem'],
      '5xl': ['17.5rem', '17.95rem'],
      '6xl': ['21rem', '21.45rem'],
      '7xl': ['24rem', '24.45rem'],
      '8xl': ['28rem', '28.45rem'],
    },
  },

  plugins: [],

}


