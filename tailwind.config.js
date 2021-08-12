const colors = require("tailwindcss/colors");

module.exports = {
  prefix: "",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      blue: colors.sky,
      green: colors.green,
      yellow: colors.amber,
      primary: "#00a99d",
      accent: "#b471ff",
      danger: "#ff0033",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
