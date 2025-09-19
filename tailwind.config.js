/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#42d3ff',     // bright accent (for highlights, markers, CTAs)
        secondary: '#0a0c1b',   // deep indigo-black (background start)
        accent: '#7c6cff',      // soft violet for emphasis
        text: '#e6e8ee',        // light neutral text
        gradient1: '#0a0c1b',   // gradient start (deep indigo)
        gradient2: '#1a2742',   // gradient end (subtle blue)
      },
    },
  },
  plugins: [],
};
