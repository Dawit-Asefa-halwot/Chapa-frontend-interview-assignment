// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const config = {
  corePlugins: {
    preflight: true, // Ensure this is enabled
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#059669',
          700: '#047857',
        },
        danger: {
          600: '#dc2626',
          700: '#b91c1c',
        }
      },
    },
  },
  plugins: [],
};

export default config;
