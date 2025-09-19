// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ Shadows
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.2)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
      },

      // ✅ Keep your accent colors
      colors: {
        'accent-cyan': '#00b8d9',
        'accent-purple': '#9f7aea',
        'accent-pink': '#ec4899',
        'accent-success': '#10b981',
        'status-danger': '#ef4444',
        'status-warning': '#f59e0b',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      // ✅ Define theme-aware background utilities
      addUtilities({
        '.bg-surface-5': {
          'background-color': 'color-mix(in srgb, var(--surface-card) 5%, transparent)',
        },
        '.bg-surface-10': {
          'background-color': 'color-mix(in srgb, var(--surface-card) 10%, transparent)',
        },
        '.bg-surface-20': {
          'background-color': 'color-mix(in srgb, var(--surface-card) 20%, transparent)',
        },
        '.bg-surface-30': {
          'background-color': 'color-mix(in srgb, var(--surface-card) 30%, transparent)',
        },
        '.bg-surface-90': {
          'background-color': 'color-mix(in srgb, var(--surface-card) 90%, transparent)',
        },
        '.bg-surface-95': {
          'background-color': 'color-mix(in srgb, var(--surface-card) 95%, transparent)',
        },
      });

      // ✅ Define theme-aware border utilities
      addUtilities({
        '.border-surface-5': {
          'border-color': 'color-mix(in srgb, var(--border-color) 5%, transparent)',
        },
        '.border-surface-10': {
          'border-color': 'color-mix(in srgb, var(--border-color) 10%, transparent)',
        },
        '.border-surface-20': {
          'border-color': 'color-mix(in srgb, var(--border-color) 20%, transparent)',
        },
        '.border-surface-30': {
          'border-color': 'color-mix(in srgb, var(--border-color) 30%, transparent)',
        },
      });

      // ✅ Define theme-aware text utilities (optional)
      addUtilities({
        '.text-primary': {
          'color': 'var(--text-primary)',
        },
        '.text-secondary': {
          'color': 'var(--text-secondary)',
        },
        '.text-tertiary': {
          'color': 'var(--text-tertiary)',
        },
      });
      // In plugins section:
addUtilities({
  '.bg-surface-card': {
    'background-color': 'var(--surface-card)',
  },
  '.bg-surface-hover': {
    'background-color': 'var(--surface-hover)',
  },
  '.border-default': {
    'border-color': 'var(--border-color)',
  },
  '.border-strong': {
    'border-color': 'var(--border-strong)',
  },
  '.bg-card-accent-cyan': {
    'background-color': 'color-mix(in srgb, #00b8d9 5%, var(--surface-card))',
  },
  '.bg-card-accent-purple': {
    'background-color': 'color-mix(in srgb, #9f7aea 5%, var(--surface-card))',
  },
  '.bg-card-accent-pink': {
    'background-color': 'color-mix(in srgb, #ec4899 5%, var(--surface-card))',
  },
  '.bg-card-accent-green': {
    'background-color': 'color-mix(in srgb, #10b981 5%, var(--surface-card))',
  },
});
    },
  ],
};