/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
  colors: {
    // Your existing primary scale
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },

    // ADD THESE (theme tokens from globals.css)
    border: "hsl(var(--border))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    card: "hsl(var(--card))",
    "card-foreground": "hsl(var(--card-foreground))",
    secondary: "hsl(var(--secondary))",
    "secondary-foreground": "hsl(var(--secondary-foreground))",
    muted: "hsl(var(--muted))",
    "muted-foreground": "hsl(var(--muted-foreground))",
    accent: "hsl(var(--accent))",
    "accent-foreground": "hsl(var(--accent-foreground))",
    "primary-foreground": "hsl(var(--primary-foreground))",
  },

  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)",
  },

  animation: {
    'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    'bounce-soft': 'bounce 1s ease-in-out infinite',
    'shimmer': 'shimmer 2s linear infinite',
  },

  keyframes: {
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
  },

  backgroundImage: {
    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
  },

  backdropBlur: {
    xs: '2px',
  },
},
  },
  plugins: [],
}
