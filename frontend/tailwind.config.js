/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",        /* Slate 50 - Crisp, cool white */
        surface: "#FFFFFF",           /* Solid White */
        primary: "#10B981",           /* Emerald 500 - Vibrant, Modern, Fresh */
        secondary: "#3B82F6",         /* Blue 500 - Trustworthy */
        accent: "#F97316",            /* Orange 500 - Energetic, appetizing */
        dark: "#0F172A",              /* Slate 900 */
        "text-main": "#1E293B",       /* Slate 800 */
        "text-muted": "#64748B",      /* Slate 500 */
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',                /* Tighter radii for industrial look */
        '3xl': '1.5rem',
      },
      boxShadow: {
        'solid': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'lifted': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
