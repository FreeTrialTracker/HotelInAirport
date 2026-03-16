/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0B2A44',
          hover: '#082136',
        },
        action: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
        },
        info: {
          DEFAULT: '#3B82F6',
          hover: '#336FCE',
        },
        warning: {
          DEFAULT: '#EF4444',
          hover: '#D63B3B',
        },
        neutral: {
          DEFAULT: '#6B7280',
          hover: '#565C67',
        },
      },
    },
  },
  plugins: [],
};
