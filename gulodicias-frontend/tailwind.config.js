module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'body': ['Roboto']
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
