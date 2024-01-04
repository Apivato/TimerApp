/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage:{
        'graphicImage': "url('/public/backgroundOnly.png')",
      },

    },
    screens: {
    'xs': '215px',
    // => @media (minwidth: 220px) {...}
    'sm': '270px',
    // => @media (minwidth: 3700px) {...}
    'md': '320px',
    // => @media (minwidth: 640px) {...}
    'lg': '430px',
    // => @media (minwidth: 1200px) {...}
    'xl': '655px',
    // => @media (minwidth: 1400px) {...}
    '2xl': '745px',
    // => @media (minwidth: 2000px) {...}
    '3xl': '935px',
    // => @media (minwidth: 2000px) {...}
    '4xl': '1080px',
    // => @media (minwidth: 2000px) {...}
    '5xl': '1300px',
    // => @media (minwidth: 2000px) {...}
    '6xl': '1500px',
    // => @media (minwidth: 2000px) {...}
  },
  fontSize: {
    base: '1rem',
    xxs : '2.55rem',
    xs: '3rem',
    sm: '3.75rem',
    md: '4.5rem',
    lg: '6rem',
    xl: '8rem',
    '2xl': '10rem',
    '3xl': '12.5rem',
    '4xl': '15rem',
    '5xl': '17.5rem',
    '6xl': '21rem',
  },
  },
  
  plugins: [],

}


