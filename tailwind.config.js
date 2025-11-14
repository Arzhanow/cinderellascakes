/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        sans: ['"Manrope"', 'Inter', 'system-ui', 'sans-serif'],
        luxury: ['"Playfair Display"', 'serif'],
      },
      colors: {
        brand: {
          night: 'rgb(var(--color-brand-night) / <alpha-value>)',
          dusk: 'rgb(var(--color-brand-dusk) / <alpha-value>)',
          blush: 'rgb(var(--color-brand-blush) / <alpha-value>)',
          lilac: 'rgb(var(--color-brand-lilac) / <alpha-value>)',
          accent: 'rgb(var(--color-brand-accent) / <alpha-value>)',
          cyan: 'rgb(var(--color-brand-cyan) / <alpha-value>)',
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
