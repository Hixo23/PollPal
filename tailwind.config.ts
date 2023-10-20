import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      text: "#130e01",
      background: "#fffaeb",
      primary: "#ff8400",
      secondary: "#fff5d6",
      accent: "#cf4307",
    },
  },
  plugins: [],
};
export default config;
