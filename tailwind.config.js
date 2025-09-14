/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c6cff',
        secondary: '#121826',
        accent: '#42d3ff',
        text: '#e6e8ee',
        gradient1: '#7c6cff',
        gradient2: '#42d3ff',
      },
    },
  },
  plugins: [],
};

