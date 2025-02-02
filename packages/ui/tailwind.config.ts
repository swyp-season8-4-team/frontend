/** @type {import('tailwindcss').Config} */
import preset from "@repo/tailwind-config";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  presets: [preset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../apps/*/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [tailwindcssAnimate],
} as const;
