/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#111111',
      },
      padding: {
        '5p': '5%',
        '5half': '2.5%',
      },
      fontFamily: {
        cinzel: ["Cinzel ", 'serif'],
        merri: ["Merriweather ", 'serif'],
      },
      fontWeight: {
        thin: '100',
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      screens: {
        watch: '300px',
        iphone: '500px',
        xl: '1000px',
        small: "400px"
      },

    },
  },
  plugins: [],
}

