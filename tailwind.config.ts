import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const dlsColors = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    75: '#EBEBEB',
    100: '#F5F7FB',
    200: '#E4E9F4',
    300: '#A6B6D9',
    400: '#5E6E8C',
    500: '#374151',
    600: '#1F2A37',
    700: '#111928',
    800: '#14171f',
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
}

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      ...dlsColors,
      background: '#111111',
      foreground: '#ffffff',
      card: {
        DEFAULT: '#000000',
        foreground: '#ffffff',
      },
      popover: {
        DEFAULT: '#1a1a1a',
        foreground: '#ffffff',
      },
      primary: {
        DEFAULT: 'rgb(97 18 163)',
        foreground: '#ffffff',
      },
      secondary: {
        DEFAULT: '#a112ff',
        foreground: '#ffffff',
      },
      muted: {
        DEFAULT: '#503cdc',
        foreground: 'rgba(255, 255, 255, 0.5)',
      },
      accent: {
        DEFAULT: '#ff5543',
        foreground: '#ffffff',
      },
      destructive: {
        DEFAULT: '#ef6155',
        foreground: '#ffffff',
      },
      border: 'rgba(255, 255, 255, 0.1)',
      input: 'rgba(255, 255, 255, 0.1)',
      ring: '#a112ff',
      sidebar: '#111111',
      'sidebar-foreground': '#ffffff',
      'sidebar-accent': '#1a1a1a',
      'sidebar-accent-foreground': '#ffffff',
    }),
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.5' }],
      lg: ['1.125rem', { lineHeight: '1.5' }],
      xl: ['1.25rem', { lineHeight: '1.5' }],
      '2xl': ['1.5rem', { lineHeight: '1.4' }],
      '3xl': ['1.875rem', { lineHeight: '1.3' }],
      '4xl': ['2.25rem', { lineHeight: '1.2' }],
      '5xl': ['2.5rem', { lineHeight: '1.2' }],
      '6xl': ['3rem', { lineHeight: '1.2' }],
      '7xl': ['3.25rem', { lineHeight: '1.2' }],
      '8xl': ['3.875rem', { lineHeight: '1.2' }],
    },
    fontFamily: {
      sans: [
        'InterVariable',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ],
      mono: [
        'Roboto mono',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ],
      display: ['Space Grotesk'],
    },
    letterSpacing: {
      tightest: '-1px',
      tighter: '-0.5px',
      tight: '-0.25px',
      normal: '0px',
      wide: '0.25px',
    },
    extend: {
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
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'diagonal-float': 'diagonal-float 120s linear infinite',
        'border-line': 'border-line 30s linear infinite, border-line-rotate 30s step-end infinite, gradient-shift 5s linear infinite'
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.9' },
        },
        'diagonal-float': {
          '0%': { transform: 'translate(0, 0) scale(0)' },
          '10%': { transform: 'translate(0, 0) scale(1)' },
          '70%': { transform: 'translate(50vw, -50vh)' },
          '100%': { transform: 'translate(100vw, -100vh)' }
        },
        'border-line': {
          '0%': { 
            top: '0', 
            left: '0', 
          },
          '25%': { 
            top: '0', 
            left: '100%', 
          },
          '50%': { 
            top: '100%', 
            left: '100%', 
          },
          '75%': { 
            top: '100%', 
            left: '0', 
          },
          '100%': { 
            top: '0', 
            left: '0', 
          }
        },
        'border-line-rotate': {
          '0%, 50%': { 
            width: '120px',
            height: '2px',
            '--gradient-angle': '90deg'
          },
          '25%, 75%': { 
            width: '2px',
            height: '120px',
            '--gradient-angle': '0deg'
          }
        },
        'gradient-shift': {
          '0%': { 
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        }
      },
    },
  },
  plugins: [typography, require('tailwindcss-animate')],
}

export default config