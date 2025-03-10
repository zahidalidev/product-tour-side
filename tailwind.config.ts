import type { Config } from 'tailwindcss'
import typographyPlugin from '@tailwindcss/typography'

const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

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
  vermilion: {
    '00': '#060000',
    '01': '#200302',
    '02': '#410604',
    '07': '#F34E3F',
    '08': '#FF7867',
    '11': '#FFF3F0',
  },
  violet: {
    '00': '#030106',
    '01': '#120720',
    '02': '#291242',
    '06': '#914BDC',
    '07': '#A96AF3',
    '08': '#BE8CFF',
    '11': '#FAF4FF',
  },
  teal: {
    '00': '#000204',
    '01': '#001118',
    '02': '#002533',
    '07': '#00A0C8',
    '08': '#4DB8DA',
    '11': '#EAFCFF',
  },
  sggray: {
    100: '#F5F7FB',
    200: '#DBE2F0',
    300: '#A6B6D9',
    500: '#343A4D',
  },
  sgviolet: {
    300: '#CE9CFF',
    400: '#6112A3',
    500: '#A112FF',
    600: '#6112A3',
    700: '#270741',
    800: '#1E0632',
  },
  sop: {
    100: '#A599E9',
    500: '#4D21FC',
    700: '#2D2B55',
    800: '#1E1E3F',
  },
}

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,md}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-polysans)', 'system-ui'],
        display: ['var(--font-polysans)', { fontFeatureSettings: '"ss01"' }],
        mono: [
          'var(--font-polysans-mono)',
          'ui-monospace',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      fontWeight: {
        bulky: '700',
        mono: '500',
        slim: '400',
        thin: '300',
      },
      screens: {
        xs: '480px',
        md: '830px',
        mdi: { min: '1024px' },
        lg: '1124px',
      },
      maxWidth: {
        '8xl': '88rem',
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
        '0.1': '0.1px',
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
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'flash-background': 'flashBackground 1s ease-out',
        fadeOutSlow: 'fadeOut 1s ease-out',
        fadeIn: 'fadeIn 0.175s ease-in forwards',
        fadeInSlow: 'fadeIn 0.5s ease-in forwards',
        slideFadeIn: 'slideFadeIn 2s ease-in-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
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
        transparent: 'transparent',
        current: 'currentColor',
        'dark-bg': '#060000',
        'light-bg': '#fffcfc',
        link: {
          light: '#F34E3F',
          DEFAULT: '#FF7867',
        },
        'link-underline': '#002533',
        'link-underline-light': '#EAFCFF',
        black: '#060000',
        white: colors.white,
        'dark-bg-1': '#0e0808',
        'dark-bg-2': '#0e0808',
        'light-bg-1': '#FFF',
        'light-bg-2': '#FFF3F0',
        'light-bg-3': '#FFF3F0',
        'dark-border': '#262B38',
        'dark-border-2': '#343A4C',
        'light-border': '#E6EBF2',
        'light-border-2': '#DBE2F0',
        'dark-text-muted': '#fff3f0',
        'light-text-muted': '#060000',
        'dark-text-primary': '#FFF3F0',
        'dark-text-secondary': '#A9A9A9',
        blurple: '#DBDBFF',
        gray: colors.gray,
        amber: colors.amber,
        red: colors.red,
        sky: colors.sky,
        cyan: colors.cyan,
        blue: colors.blue,
        purple: colors.purple,
        indigo: colors.indigo,
        slate: colors.slate,
        yellow: colors.yellow,
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
          DEFAULT: '#060000',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        vermilion: {
          '00': '#060000',
          '01': '#200302',
          '02': '#410604',
          '07': '#F34E3F',
          '08': '#FF7867',
          '11': '#FFF3F0',
        },
        violet: {
          '00': '#030106',
          '01': '#120720',
          '02': '#291242',
          '06': '#914BDC',
          '07': '#A96AF3',
          '08': '#BE8CFF',
          '11': '#FAF4FF',
        },
        teal: {
          '00': '#000204',
          '01': '#001118',
          '02': '#002533',
          '07': '#00A0C8',
          '08': '#4DB8DA',
          '11': '#EAFCFF',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '2rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
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
    typographyPlugin,
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
