/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#44194A',       // Dark purple
        secondary: '#B7ADB8',     // light purple
        grey:{
          light:'#EFEFEF', 
          medium:'#D9D9D9',
        }, 
      },
      fontFamily: {
        sans: ['Inter', 'poppins', 'system-ui'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(200px)', opacity: '0' },
          '20%': { transform: 'translateX(0)', opacity: '1' },
          '90%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateY(200px)' },
        },
      },
      animation: {
        slideIn: 'slideIn 3s ease-out',
      },
    },
  },
  plugins: [],
};
