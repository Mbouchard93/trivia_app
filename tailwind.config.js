/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        darkPurple: "#30094E",
        lightPurple: "#6E14B4",
        withe: "#fff",
        lightestPurple: "#EEE6F3",
        purple: "#C098DF",
        popPurple: "#6E14B3",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        "btn-primary": "6px 6px 2px 0px #FFF",
      },
    },
  },
  plugins: [],
};
