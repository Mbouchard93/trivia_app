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
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
