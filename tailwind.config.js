// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'blink-slow': 'blink 1.5s infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
