/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#fdf6e3", // Classic cream paper
        paperDark: "#f0eade", // Slightly darker for contrast/borders
        ink: "#2c2c2c", // Charcoal for text
        inkLight: "#5a5a5a", // Lighter grey for subtitles
        accent: "#8b0000", // Deep crimson red for chapter numbers/links
      },
      fontFamily: {
        body: ['Lora', 'serif'],
        heading: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
      }
    },
  },
  plugins: [],
}
