/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto",
        poppins: "Poppins",
      },
      screen: {
        sm: "375px",
        md: "684px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
