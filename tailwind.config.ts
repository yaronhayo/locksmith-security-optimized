import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'tall': { 'raw': '(min-height: 800px)' },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1E3A8A",
          foreground: "#FFFFFF",
          hover: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#FFA500",
          foreground: "#FFFFFF",
          hover: "#F59E0B",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        heading: {
          primary: "#1E3A8A",
          secondary: "#1E40AF",
          dark: "#1A1F2C",
          light: "#FFFFFF",
          neutral: "#8E9196",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "phone-ring": {
          '0%, 3%, 6%, 9%': { transform: 'rotate(0deg)' },
          '1.5%, 4.5%, 7.5%': { transform: 'rotate(-10deg)' },
          '2.25%, 5.25%, 8.25%': { transform: 'rotate(10deg)' },
          '10%, 100%': { transform: 'rotate(0deg)' }
        },
        "scale": {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        "slide-up": {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        "shine": {
          '0%': { backgroundPosition: '-100% center' },
          '5%': { backgroundPosition: '100% center' },
          '100%': { backgroundPosition: '100% center' }
        },
        "link-underline": {
          '0%': { width: '0%', left: '0' },
          '100%': { width: '100%', left: '0' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "phone-ring": "phone-ring 4s ease-in-out infinite",
        "scale": "scale 0.3s ease-in-out",
        "slide-up": "slide-up 0.2s ease-out forwards",
        "shine": "shine 8s ease-in-out infinite",
        "link-underline": "link-underline 0.3s ease-out forwards"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
