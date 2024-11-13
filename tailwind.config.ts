import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    extend: {
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'diagonal-float': 'diagonal-float 120s linear infinite', // Increased from 50s to 80s
        'border-line': 'border-line 20s linear infinite, border-line-rotate 20s step-end infinite, gradient-shift 5s linear infinite'
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
      colors: {
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
          DEFAULT: '#6112a3',
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
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
