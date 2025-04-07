/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
        './src.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
        './src/screen/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                // Primary color (Deep Blue - Main Brand Color)
                primary: {
                    50: '#E6F2FF',
                    100: '#CCE5FF',
                    200: '#99CBFF',
                    300: '#66B2FF',
                    400: '#3399FF',
                    500: '#1E90FF', // Original primary DEFAULT
                    600: '#1976D2', // Original primary dark
                    700: '#155EB3',
                    800: '#114993',
                    900: '#0D3473',
                    950: '#091F40',
                    foreground: '#FFFFFF', // Original primary light
                },

                // Secondary color (Electric Green)
                secondary: {
                    50: '#E6FFF2',
                    100: '#CCFFE6',
                    200: '#B2FFB2', // Original secondary light
                    300: '#66FF9D',
                    400: '#33FF8C',
                    500: '#00FF7F', // Original secondary DEFAULT
                    600: '#00B368', // Original secondary dark
                    700: '#009957',
                    800: '#007F47',
                    900: '#006638',
                    950: '#00331C',
                    foreground: '#000000', // Original secondary foreground
                },

                // Accent color (Electric Yellow)
                accent: {
                    50: '#FFFAE6',
                    100: '#FFF5CC',
                    200: '#FFE57F', // Original accent light
                    300: '#FFDB4D',
                    400: '#FFD31A',
                    500: '#FFD700', // Original accent DEFAULT
                    600: '#FFC107', // Original accent dark
                    700: '#D4A500',
                    800: '#AA8400',
                    900: '#806300',
                    950: '#403200',
                    foreground: '#000000', // Original accent foreground
                },

                // Background colors
                background: {
                    DEFAULT: '#FFFFFF', // Original card DEFAULT
                    secondary: '#E4E4E5', // Original card secondary
                },

                // Text colors
                text: {
                    DEFAULT: '#000000',
                    muted: '#86868E', // Original primary muted
                },

                // Special colors
                blue: {
                    DEFAULT: '#00BFFF', // Original river
                    foreground: '#FFFFFF',
                },

                // Standard UI colors
                border: '#E4E4E5',
                input: '#E4E4E5',
                ring: '#1E90FF',
                destructive: {
                    DEFAULT: '#FF4040',
                    foreground: '#FFFFFF',
                },
                muted: {
                    DEFAULT: '#F5F5F7',
                    foreground: '#86868E',
                },
                card: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#000000',
                },
            },
        },
    },
    plugins: [],
}
