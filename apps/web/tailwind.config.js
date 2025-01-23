/** @type {import('tailwindcss').Config} */

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#ffffff",
          dark: "#1a1a1a",
        },
        content: {
          light: "#000000",
          dark: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
