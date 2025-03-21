/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/*.{tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/components/*.tsx"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }