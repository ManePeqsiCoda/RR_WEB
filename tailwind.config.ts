/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#0A0A0F',
          secondary: '#111120',
          tertiary:  '#1A1A2E',
          card:      '#13131F',
        },
        accent: {
          DEFAULT: '#CFAE3A',
          light:   '#E8C94A',
          dim:     'rgba(207,174,58,0.12)',
          border:  'rgba(207,174,58,0.15)',
        },
        electric: {
          DEFAULT: '#4A9EFF',
          dim:     'rgba(74,158,255,0.12)',
        },
        txt: {
          primary:   '#E8E6D8',
          secondary: '#9B9882',
          faint:     '#5A584A',
        },
        success: '#4ADE80',
        error:   '#F87171',
        warning: '#FBBF24',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        card:   '12px',
        button: '6px',
        input:  '8px',
      },
    },
  },
  plugins: [],
}

export default config
