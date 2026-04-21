import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Obsidian palette (raw)
        brand: {
          950: "#0D0720", 900: "#1A0E40", 800: "#2D1870", 700: "#4521A8",
          600: "#5B2DD4", 500: "#7048E8", 400: "#8B6FF0", 300: "#A892F5",
          200: "#C4B5FA", 100: "#E4DFFE",
        },
        aqua: {
          900: "#0C4A6E", 600: "#0284C7", 500: "#06B0D8",
          400: "#22D3EE", 300: "#67E8F9", 100: "#CFFAFE",
        },
        jade:   { 900: "#064E3B", 500: "#10B981", 400: "#34D399" },
        amber2: { 900: "#451A03", 500: "#F59E0B", 400: "#FBB03B" },
        rose2:  { 900: "#4C0519", 500: "#F43F5E", 400: "#FB7185" },
        bg: {
          void: "#050507", base: "#0A0A0F", surface: "#0F0F17",
          elevated: "#16161F", overlay: "#1E1E2A", highlight: "#252535",
        },
        neutral2: {
          50: "#FAFAFA", 100: "#F4F4F6", 200: "#E4E4E8", 300: "#C9C9D0",
          400: "#9898A6", 500: "#6B6B7A", 600: "#4A4A57", 700: "#32323C",
          800: "#1E1E28", 900: "#131319",
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        'xs':  ['11px', { lineHeight: '16px' }],
        'sm':  ['13px', { lineHeight: '20px' }],
        'base':['15px', { lineHeight: '24px' }],
        'lg':  ['17px', { lineHeight: '26px' }],
        'xl':  ['20px', { lineHeight: '30px' }],
        '2xl': ['24px', { lineHeight: '34px' }],
        '3xl': ['30px', { lineHeight: '40px' }],
        '4xl': ['36px', { lineHeight: '46px' }],
        '5xl': ['48px', { lineHeight: '56px' }],
        '6xl': ['64px', { lineHeight: '70px' }],
        '7xl': ['80px', { lineHeight: '86px' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #5B2DD4 0%, #7048E8 100%)',
        'gradient-aqua':  'linear-gradient(135deg, #06B0D8 0%, #22D3EE 100%)',
        'gradient-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
        'dot-pattern':    'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '28px 28px',
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        shimmer:    { "0%": { backgroundPosition: "-400px 0" }, "100%": { backgroundPosition: "400px 0" } },
        "fade-up":  { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float:      { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        "glow-pulse": { "0%,100%": { opacity: "0.3" }, "50%": { opacity: "0.7" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        shimmer:          "shimmer 1.4s ease-in-out infinite",
        "fade-up":        "fade-up 0.5s cubic-bezier(0.16,1,0.3,1)",
        float:            "float 3s ease-in-out infinite",
        "glow-pulse":     "glow-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
