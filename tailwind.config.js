/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#f8fafc',
        accent: '#10b981',
        error: '#ef4444',
        'neutral-text': '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
} 