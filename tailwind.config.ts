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
        brand: {
          primary: {
            50: "var(--brand-primary-50)",
            100: "var(--brand-primary-100)",
            500: "var(--brand-primary-500)",
            600: "var(--brand-primary-600)",
            900: "var(--brand-primary-900)",
          },
          secondary: {
            500: "var(--brand-secondary-500)",
          },
          accent: "var(--brand-accent)",
          danger: "var(--brand-danger)",
        },
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
        },
        border: {
          primary: "var(--border-primary)",
          secondary: "var(--border-secondary)",
        },
      },
      fontFamily: {
        primary: "var(--font-primary)",
        mono: "var(--font-mono)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
      },
      minHeight: {
        touch: "var(--touch-target)",
      },
      height: {
        "btn-sm": "var(--button-height-sm)",
        "btn-md": "var(--button-height-md)",
        "btn-lg": "var(--button-height-lg)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
};

export default config;