/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        selfTaught: ['Yanone Kaffeesatz', 'sans-serif'],
        deepThought: ['Victor Mono', 'monospace'],
      },
      colors: {
        light: {
          bgPrimary: '#F0F0F0',
          bgSecondary: '#CDD7D6',
          fgPrimary: '#06162B',
          fgSecondary: '#102542',
          accentPrimary: '#98CE00',
          accentSecondary: '#94BD21',
        },
        dark: {
          bgPrimary: '#06162B',
          bgSecondary: '#102542',
          fgPrimary: '#F0F0F0',
          fgSecondary: '#CDD7D6',
          accentPrimary: '#98CE00',
          accentSecondary: '#94BD21',
        },
      },
    },
  },
  plugins: [],
};

export default config;
