/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
        spacemono: ['Space Mono', 'monospace'],
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
