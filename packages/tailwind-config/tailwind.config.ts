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
        pretendard: [
          'var(--font-pretendard-kr)',
          'var(--font-pretendard-jp)',
          'var(--font-pretendard-std)',
        ],
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
          5: '#190F00',
          10: '#271900',
          20: '#412D00',
          30: '#5E4200',
          40: '#7C5800',
          50: '#9B6F00',
          60: '#BC8701',
          70: '#DAA227',
          80: '#FFC858',
          90: '#FFDEA7',
          100: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#FFD25F',
          foreground: 'hsl(var(--secondary-foreground))',
          5: '#190F00',
          10: '#251A03',
          20: '#3C2E14',
          30: '#544429',
          40: '#6D5C3E',
          50: '#877455',
          60: '#A28E6D',
          70: '#BEA885',
          80: '#DAC39F',
          90: '#F7DFB9',
          100: '#FFFFFF',
        },
        neutral: {
          0: '#000000',
          5: '#0F0C0C',
          10: '#14100C',
          20: '#3F3C39',
          30: '#635F59',
          40: '#96938E',
          50: '#CDC8C3',
          60: '#E9E4E0',
          70: '#EFEDEB',
          80: '#F5F2F0',
          90: '#FCFAF8',
          100: '#FFFFFF',
        },
        success: {
          5: '#0D3216',
          10: '#175A28',
          20: '#1D6D31',
          30: '#1F7735',
          40: '#248B3E',
          50: '#2FB350',
          60: '#3ECA61',
          70: '#76D98F',
          80: '#D6F4DE',
          90: '#EBF9EE',
        },
        error: {
          5: '#540003',
          10: '#7E0007',
          20: '#93000A',
          30: '#A80710',
          40: '#BA1A1A',
          50: '#DE3730',
          60: '#FF5449',
          70: '#FF897D',
          80: '#FFB4AB',
          90: '#FFDAD6',
        },
        outline: {
          DEFAULT: '#CDC8C3',
          variant: '#EFEDEB',
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
        'slide-in': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '70%': {
            transform: 'translateX(-5%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'slide-center': {
          '0%': {
            transform: 'translate(-50%, 100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translate(-50%, -50%)',
            opacity: '1',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeIn: 'fadeIn 200ms ease-in-out forwards',
        fadeOut: 'fadeOut 200ms ease-in-out forwards',
        'slide-in': 'slide-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
} as const;
