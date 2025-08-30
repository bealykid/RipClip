/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'ripclip-cyan': '#00ffff',
        'ripclip-purple': '#b347d9',
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.15)', opacity: '0.8' },
        },
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 0.6s ease-in-out',
        'stagger-in': 'stagger-in 0.6s ease-out',
      },
    },
  },
  safelist: [
    "bg-green-500", "bg-yellow-500", "bg-red-500",
    "bg-green-400", "bg-yellow-400", "bg-red-400",
    "text-green-300", "text-yellow-300", "text-red-300",
    "text-green-400", "text-yellow-400", "text-red-400",
    "border-green-500", "border-yellow-500", "border-red-500",
    "border-cyan-400", "bg-cyan-500/20", "hover:bg-cyan-500/30",
    "border-gray-400", "bg-gray-500/20", "hover:bg-gray-500/30",
    "border-purple-400", "bg-purple-500/20", "hover:bg-purple-500/30",
    "shadow-cyan-500/30", "shadow-red-500/30", "shadow-yellow-500/30",
    "shadow-green-500/20", "shadow-yellow-500/20", "shadow-red-500/20",
    "bg-green-500/20", "bg-yellow-500/20", "bg-red-500/20",
    "border-green-400/30", "border-yellow-400/30", "border-red-400/30",
    "text-cyan-300", "text-gray-300", "text-purple-300",
    "ring-2", "ring-blue-500", "ring-white/20",
    "bg-blue-500/10", "bg-white/5", "bg-white/10", "bg-white/20",
    "animate-pulse", "scale-110", "scale-125", "hover:scale-110",
    "backdrop-blur-sm", "shadow-lg", "shadow-xl",
    "grid-cols-1", "grid-cols-2", "grid-cols-4", "md:grid-cols-2", "lg:grid-cols-4"
  ],
  plugins: [],
}

