import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#800020',
        'accent-gold': '#C5A059',
        'background-light': '#f8f5f6',
        'background-dark': '#230f14',
      },
      fontFamily: {
        display: ['Inter', 'Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [forms],
}

export default config
