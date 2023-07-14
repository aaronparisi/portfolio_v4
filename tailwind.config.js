/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bgPrimary: "#F0F0F0",
          bgSecondary: "#CDD7D6",
          fgPrimary: "#06162B",
          fgSecondary: "#102542",
          accentPrimary: "#F87060",
          accentSecondary: "#D5756A"
        },
        dark: {
          bgPrimary: "#06162B",
          bgSecondary: "#102542",
          fgPrimary: "#F0F0F0",
          fgSecondary: "#CDD7D6",
          accentPrimary: "#F87060",
          accentSecondary: "#D5756A"
        }
      }
    },
  },
  plugins: [],
}

export default config
