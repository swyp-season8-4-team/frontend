/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ['class'],
  content: [
    '../../apps/*/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      cursor: {
        'not-allowed': 'not-allowed',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard-kr)', 'var(--font-pretendard-jp)', 'var(--font-pretendard-std)'],
        recipeKorea: ['var(--font-recipe-korea)'],
      },
      spacing: {
        base: '1rem',
      },
      boxShadow: {
        base: '2px 2px 5px 1px #0000000D',
      },
      zIndex: {
        header: '50',
        modal: '40',
        bottomSheet: '30',
        sidebar: '30',
        navbar: '20',
        tag: '10',
      },
      scale: {
        '200': '2',
        '250': '2.5',
      },
      fontSize: {
        t14: '14px',
        t16: '16px',
        t18: '18px',
        t20: '20px',
        t22: '22px',
        t24: '24px',
        t26: '26px',
        t28: '28px',
        t30: '30px',
      },
      lineHeight: {},
      colors: {
        primary: {
          DEFAULT: '#FFB700',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#FFD25F',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        disabled: '#714115',
        page: '#F6F6F6',

        // shadcn 변수들
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        base: '20px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: 'fadeIn 200ms ease-in-out forwards',
        fadeOut: 'fadeOut 200ms ease-in-out forwards',
      },
    },
  },
} as const;
