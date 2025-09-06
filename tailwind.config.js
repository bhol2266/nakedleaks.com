module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      aspectRatio: {
        'custom': '16 / 11',
      },
      animation: {
        spii: 'wiggle 2s linear infinite',
        movement: 'movement 1s linear 1',
        colorModal: 'modal 0.5s ease-out 1',

      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        movement: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        modal: {
          '0%': { transform: 'translateY(1500px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      },


      screens: {
        "sm": "500px",
        'md': '750px',
        'lg': "1000px",
        '2xl': "1250px",
        '3xl': "1600px",
        '4xl': "1900px",

      },
      colors: {
        'github': '#24292F',
        'sb': '#454545'
      },
      fontFamily: {
        body: ['Pushster', 'cursive'],
        manrope: ['Manrope', 'sans-serif'],
        delius: ['Delius Unicase', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        DMsans: ['DM Sans', 'sans-serif'],
        Opensans: ['Open Sans', 'sans-serif'],
        Abhayalibre: ['Abhaya Libre', 'serif'],
        kalam: ['Kalam', 'cursive'],
        hindi: ['Jaldi', 'sans-serif'],
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')


  ]
}
