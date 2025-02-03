/** @type {import('tailwindcss').Config} */
import preset from "@repo/tailwind-config";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  presets: [preset],
  plugins: [tailwindcssAnimate],
} as const;
