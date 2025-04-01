/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src.{js,jsx,ts,tsx}","./src/components/**/*.{js,jsx,ts,tsx}","./src/screen/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E90FF', // Deep Blue (Main Brand Color)
          light: '#FFFFFF', // White text on primary background
          light: '#64B5F6', // Lighter variation
          dark: '#1976D2', // Darker variation
          muted: '#86868E',
        },
        secondary: {
          DEFAULT: '#00FF7F', // Electric Green (Complementary/Background)
          foreground: '#000000', // Black text on secondary background
          light: '#B2FFB2',
          dark: '#00B368',
        },
        accent: {
          DEFAULT: '#FFD700', // Electric Yellow (Highlights, Emphasis)
          foreground: '#000000', // Black text on accent background
          light: '#FFE57F',
          dark: '#FFC107',
        },

        river: '#00BFFF', //light blue for the river.
      },
    },
  },
  plugins: [],
}