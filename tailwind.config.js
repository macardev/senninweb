/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      colors: {
        black: '#0A0A0A',
        white: '#F5F5F5',
        gold: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D97706',
          600: '#B45309',
        },
        surface: {
          50:  '#141414',
          100: '#1A1A1A',
          200: '#222222',
          300: '#2A2A2A',
          400: '#333333',
        },
      },
      fontSize: {
        '8xl':  ['6rem',   { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '9xl':  ['7.5rem', { lineHeight: '1',    letterSpacing: '-0.04em' }],
        '10xl': ['9rem',   { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
    },
  },
  plugins: [],
}
