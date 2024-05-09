/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "",
  mode: "jit",

  content: ["./src/**/*.{html,ts}"],

  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "940px",
      xl: "1200px",
      "2xl": "1400px",
    },
  },
};
