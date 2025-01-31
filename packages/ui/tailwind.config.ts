/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "@repo/ui/**/*.{ts,tsx}",
    "@repo/ui/**/**/*.{ts,tsx}",
    "../../apps/desserbee-web/src/**/*.{ts,tsx}",
    "../../apps/desserbee-web/app/**/*.{ts,tsx}",
    "../../apps/desserbee-web/.storybook/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        base: "1rem", // 기본 여백 - 16px
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          //DEFAULT: "hsl(var(--primary))", // shadcn 값
          DEFAULT: "#FFC227",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          // DEFAULT: "hsl(var(--secondary))", // shadcn 값
          DEFAULT: "#D5852C", //
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          // DEFAULT: "hsl(var(--accent))", // shadcn 값
          DEFAULT: "#6CD323",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} as const;
