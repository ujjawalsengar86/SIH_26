/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          850: "#079447",
          900: "#087a39",
          950: "#056b32",
        },
        ink: "#102018",
        mist: "#f4fbf6",
      },
    },
  },

  plugins: [],
};