import type { Config } from 'tailwindcss'

const plugin = require('tailwindcss/plugin')
const typography = require('@tailwindcss/typography')

const dlsColors = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    75: '#EBEBEB',
    100: '#F5F7FB',
    200: '#DBE2F0',
    300: '#A6B6D9',
    400: '#696B71',
    500: '#374151',
    600: '#1F2A37',
    700: '#111928',
    800: '#14171f',
  },
  blue: {
    100: '#DCFEFE',
    200: '#C7FFFF',
    300: '#00CBEC',
    400: '#00A1C7',
    500: '#005482',
  },
  vermillion: {
    100: '#FFDFDC',
    200: '#FFC9C9',
    300: '#FF5543',
    400: '#ED2E20',
    500: '#C22626',
  },
  lemon: {
    50: '#C9C9C9',
    100: '#FFFCB1',
    200: '#FFF2CF',
    300: '#FFDB45',
    400: '#FFC247',
    500: '#FF9933',
  },
  green: {
    100: '#D2FFF1',
    200: '#C4FFE8',
    300: '#8FEDCF',
    400: '#17AB52',
    500: '#1F7D45',
  },
  blurple: {
    100: '#EBE3FD',
    200: '#C9B3F9',
    300: '#A884F6',
    400: '#8552F2',
    500: '#6525EF',
    600: '#4D10D1',
  },
  violet: {
    100: '#EEDFFF',
    200: '#E8D1FF',
    300: '#CE9CFF',
    400: '#A112FF',
    500: '#820DDE',
    600: '#6112A3',
    700: '#270741',
    750: '#1e0632',
    800: '#160425',
  },
  cerise: {
    100: '#FFDFF5',
    200: '#FFD1F2',
    300: '#E1449A',
    400: '#D62687',
    500: '#C4147D',
    600: '#9E1769',
  },
}

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],
      },
      screens: {
        xs: '480px',
        md: '830px',
        mdi: { min: '1024px' },
        lg: '1124px',
      },

      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
      },

      borderWidth: {
        1: '1px',
        3: '3px',
        16: '16px',
      },

      keyframes: {
        flashBackground: {
          '0%': { background: '#FFF2CF' },
          '100%': { backgroundColor: 'none' },
        },
        fadeOutSlow: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      animation: {
        'flash-background': 'flashBackground 1s ease-out',
        fadeOutSlow: 'fadeOut 1s ease-out',
        fadeIn: 'fadeIn 0.175s ease-in forwards',
        fadeInSlow: 'fadeIn 0.5s ease-in forwards',
        slideFadeIn: 'slideFadeIn 2s ease-in-out',
      },
      dropShadow: {
        xl: `0px 0px 15px #A112FF}`,
        '2xl': `0px 0px 38px #A112FF}`,
      },
      boxShadow: {
        xl: `0px 0px 23px #A112FF}`,
        btn: `0px 0px 20px rgba(161, 18, 255, 0.7)`,
        modal: `0px 5px 23px rgba(0, 0, 0, 0.2)`,
        card: `0px 0px 20px -2px #A112FF80`,
        video: `0px 0px 40px 3px rgba(161, 18, 255, 0.50)`,
        cta: `0px 25px 50px -12px rgba(0, 0, 0, 0.25)`,
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }], // 12px / 18px
      sm: ['0.875rem', { lineHeight: '1.5' }], // 14px / 21px
      base: ['1rem', { lineHeight: '1.5' }], // 16px / 24px
      lg: ['1.125rem', { lineHeight: '1.5' }], // 18px / 27px
      xl: ['1.25rem', { lineHeight: '1.5' }], // 20px / 28px
      '2xl': ['1.5rem', { lineHeight: '1.4' }], // 24px / 34px
      '3xl': ['1.875rem', { lineHeight: '1.3' }], // 30px / 42px
      '4xl': ['2.25rem', { lineHeight: '1.2' }], // 36px / 43px
      '5xl': ['2.5rem', { lineHeight: '1.2' }], // 40px / 48px
      '6xl': ['3rem', { lineHeight: '1.2' }], // 48px / 58px
      '7xl': ['3.25rem', { lineHeight: '1.2' }], // 52px / 62px
      '8xl': ['3.875rem', { lineHeight: '1.2' }], // 72px / 74px
    },
    letterSpacing: {
      tightest: '-1px',
      tighter: '-0.5px',
      tight: '-0.25px',
      normal: '0px',
      wide: '0.25px',
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    typography,
    plugin(({ addBase }: { addBase: (base: Record<string, any>) => void }) => {
      const extractColors = (
        colors: Record<string, any>,
        colorGroup = ''
      ): Record<string, string> => {
        return Object.keys(colors).reduce(
          (previousColors: Record<string, string>, colorKey: string) => {
            const value = colors[colorKey]
            const cssVariable = colorGroup
              ? `--sg-color-${colorGroup}-${colorKey}`
              : `--sg-color-${colorKey}`

            const newColors: Record<string, string> =
              typeof value === 'string' ? { [cssVariable]: value } : extractColors(value, colorKey)

            return { ...previousColors, ...newColors }
          },
          {}
        )
      }

      addBase({
        ':root': extractColors(dlsColors),
      })
    }),
  ],
}
export default config
