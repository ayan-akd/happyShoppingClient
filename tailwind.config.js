/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grn: "#59815B",
        ylw: "#FAC827",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [require("daisyui")],
};
