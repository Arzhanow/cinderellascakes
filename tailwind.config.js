/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', 'Inter', 'system-ui', 'sans-serif'],
        luxury: ['"Playfair Display"', 'serif'],
      },
      colors: {
        brand: {
          night: '#05010a',
          dusk: '#0a0814',
          blush: '#ffb0f7',
          lilac: '#bd93f9',
          accent: '#ff79c6',
          cyan: '#8be9fd',
        },
      },
      boxShadow: {
        'glow-primary': '0 20px 40px rgba(255, 121, 198, 0.35)',
        'glow-cta': '0 12px 30px rgba(233, 129, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
