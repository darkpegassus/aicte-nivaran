/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aicte: {
          navy: '#102A56',
          royal: '#174EA6',
          blue: '#2563EB',
          lightBlue: '#EAF2FF',
          bg: '#F5F7FB',
          surface: '#FFFFFF',
          textPrimary: '#17243A',
          textSecondary: '#64748B',
          border: '#E2E8F0',
          accentViolet: '#805AD5',
          accentRed: '#DC4C64',
          accentYellow: '#F2B544',
          accentGreen: '#16A36A',
        }
      },
      fontFamily: {
        // Linux Biolinum prioritized for official titles & institution banners
        biolinum: ['"Linux Biolinum"', '"Cinzel"', 'Georgia', 'serif'],
        // Google Sans prioritized for clean modern dashboard reading
        sans: ['"Google Sans"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(16, 42, 86, 0.06), 0 1px 2px 0 rgba(16, 42, 86, 0.04)',
        dropdown: '0 4px 6px -1px rgba(16, 42, 86, 0.1), 0 2px 4px -1px rgba(16, 42, 86, 0.06)',
      }
    },
  },
  plugins: [],
}