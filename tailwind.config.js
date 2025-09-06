/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        whatsapp: {
          primary: '#25D366',
          dark: '#075E54',
          light: '#DCF8C6',
          gray: '#E5E5EA',
          background: '#000000'
        }
      },
      fontFamily: {
        system: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      spacing: {
        'chat': '60px'
      }
    },
  },
  plugins: [],
};
