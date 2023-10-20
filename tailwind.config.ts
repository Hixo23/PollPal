import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#f9fbfb",
        background: "#fffaeb",
        primary: "#ff8400",
        secondary: "#fff5d6",
        accent: "#cf4307",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
