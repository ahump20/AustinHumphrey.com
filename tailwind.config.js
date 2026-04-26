export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Editorial dual-ground palette — v4 (2026-04-25)
           Cordovan + brass replaces burnt-orange site-wide.
           Old class names alias to new hex values for backward compat. */
        'paper': '#EFE7D6',
        'paper-deep': '#E5DAC2',
        'paper-edge': '#C9BDA3',
        'ink': '#181410',
        'ink-strong': '#0A0805',
        'ink-mute': '#5C4F40',
        'ink-ground': '#0B0908',
        'ink-ground-elev': '#141110',
        'bone-mute': '#B8AFA4',
        /* New canonical accents */
        'cordovan': '#6E1F26',
        'cordovan-glow': '#8E2A33',
        'cordovan-deep': '#4D1319',
        'brass': '#B7873A',
        'brass-deep': '#8C6628',
        /* Modern accent aliases */
        'accent-burnt': '#6E1F26',
        'accent-ember': '#8E2A33',
        'accent-emerald': '#1F4D46',
        'accent-gold': '#B7873A',
        /* Legacy tokens — point at new palette so old class strings keep working */
        'burnt-orange': '#6E1F26',
        'texas-soil': '#8C6628',
        'charcoal': '#1A1A1A',
        'midnight': '#0D0D0D',
        'ember': '#8E2A33',
        'bone': '#F5F0EB',
        'warm-gray': '#A89F95',
        'spectrum-blue': '#3B82F6',
        'nw-navy': '#1E3A5F',
        'ato-gold': '#D4A843',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        sans: ['Fraunces', 'Georgia', 'serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(110, 31, 38, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(110, 31, 38, 0.8), 0 0 40px rgba(110, 31, 38, 0.3)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};
