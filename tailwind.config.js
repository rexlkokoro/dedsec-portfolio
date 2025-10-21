/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#171717',
        card: '#21211F',
        accent: '#B3E10D',
        text: '#CECECE',
        subtext: '#888888'
      },
      fontFamily: {
        pixel: ['Nothing5x7', 'monospace']
      },
      boxShadow: {
        neon: '0 0 20px rgba(179, 225, 13, 0.4)',
      },
      dropShadow: {
        neon: '0 0 8px #B3E10D',
      }
    }
  },
  plugins: []
}
