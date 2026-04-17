export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Editorial dual-ground palette */
        'paper': '#ECE3D2',
        'paper-deep': '#E1D6BF',
        'paper-edge': '#C9BDA3',
        'ink': '#1B1714',
        'ink-strong': '#0E0B09',
        'ink-mute': '#6B5F52',
        'ink-ground': '#0B0908',
        'ink-ground-elev': '#141110',
        'bone-mute': '#B8AFA4',
        'accent-burnt': '#BF5700',
        'accent-ember': '#E86A2D',
        'accent-emerald': '#1F4D46',
        'accent-gold': '#C9A14A',
        /* Legacy tokens retained for not-yet-rebuilt sections */
        'burnt-orange': '#BF5700',
        'texas-soil': '#8B4513',
        'charcoal': '#1A1A1A',
        'midnight': '#0D0D0D',
        'ember': '#FF6B35',
        'bone': '#F5F0EB',
        'warm-gray': '#A89F95',
        'spectrum-blue': '#3B82F6',
        'nw-navy': '#1E3A5F',
        'ato-gold': '#D4A843',
      },
      fontFamily: {
        display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        sans: ['Fraunces', 'Cormorant Garamond', 'serif'],
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
          '0%, 100%': { boxShadow: '0 0 8px rgba(191, 87, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(191, 87, 0, 0.8), 0 0 40px rgba(191, 87, 0, 0.3)' },
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
