module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        'title':['Raleway' , 'serif']
      },
      colors:{
        'tomato':'#ff7c5b',
        'dark-blue':'rgb(6,26,58)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
