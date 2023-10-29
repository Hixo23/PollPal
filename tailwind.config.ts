import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

interface FlattenedColors {
  [key: string]: string;
}

type ColorValue = string | Record<string, string>;

const customPlugin = plugin(({ matchUtilities, theme }) => {
  const colors = theme("colors") as Record<string, ColorValue>;
  const flattenedColors = Object.entries(colors).reduce((acc, [key, value]) => {
    if (typeof value === "string") acc[key] = value;
    else {
      Object.entries(value).forEach(([number, color]) => {
        acc[`${key}-${number}`] = color;
      });
    }
    return acc;
  }, {} as FlattenedColors);

  matchUtilities(
    {
      "progress-bar": (value) => ({
        backgroundColor: value,
        "&::-webkit-progress-bar": {
          backgroundColor: value,
        },
      }),
      "progress-value": (value) => ({
        color: value,
        "&::-webkit-progress-value": {
          backgroundColor: value,
        },
        "&::-moz-progress-bar": {
          backgroundColor: value,
        },
      }),
    },
    {
      values: flattenedColors,
    },
  );
});

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
  plugins: [require("@tailwindcss/forms"), customPlugin],
};

export default config;
