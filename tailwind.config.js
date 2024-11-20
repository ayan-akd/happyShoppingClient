/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'grn': '#59815B',
      },
    },
  },
  plugins: [require("daisyui")],
};
