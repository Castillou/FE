/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#D896FF",
          "200": "#B434FF",
          "300": "#9929CC",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          "100": "rgba(216, 150, 255, 0.63)",
          "500": "#F85900",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        red: {
          "500": "#DC3644",
        },
        info: {
          "500": "#1A9EFE",
        },
        selected: {
          default: "#F0F0F0",
        },
        "gray-scale": {
          "0": "#FFFFFF",
          "100": "#EAEAEA",
          "200": "#A0A0A0",
          "300": "#676767",
          "400": "#333333",
          "500": "#191919",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        highlight: [
          "40px",
          {
            linHeight: "auto",
            fontWeight: 700,
          },
        ],
        banner: [
          "32px",
          {
            linHeight: "auto",
            fontWeight: 400,
          },
        ],
        title: [
          "32px",
          {
            linHeight: "auto",
            fontWeight: 600,
          },
        ],
        "sub-title": [
          "20px",
          {
            linHeight: "auto",
            fontWeight: 500,
          },
        ],
        body1: [
          "15px",
          {
            linHeight: "auto",
            fontWeight: 400,
          },
        ],
        body2: [
          "13px",
          {
            linHeight: "auto",
            fontWeight: 400,
          },
        ],
      },
      borderRadius: {
        none: "0",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "8px",
        lg: "var(--radius)",
        xl: "16px",
        full: "9999px",
        md: "calc(var(--radius) - 2px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
