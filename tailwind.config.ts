import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bf-text": "var(--text)",
        "bf-bg": "var(--background)",
        "bf-primary": "var(--primary)",
        "bf-accent": "var(--accent)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#00067f",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#333333",
              foreground: "#ffffff",
            },
            focus: "#00067f",
            foreground: "#ffffff",
          },
        },
        light: {
          colors: {
            primary: {
              DEFAULT: "#0070F0",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#e7e6e6",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
};
export default config;
