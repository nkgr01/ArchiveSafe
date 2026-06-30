/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#1E40AF',
          hover: '#1D4ED8',
          active: '#1E3A8A',
        },
        surface: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
