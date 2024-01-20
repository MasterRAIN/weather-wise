/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'form': '500px',
      },
      width: {
        'form': '800px',
      }
    },
  },
  plugins: [],
}

