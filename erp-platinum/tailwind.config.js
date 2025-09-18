// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ Define custom shadows
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.2)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
      },

      // ✅ Define background colors (for glass effect)
      backgroundColor: {
        'surface-card': {
          DEFAULT: 'var(--surface-card)',
          5: 'color-mix(in srgb, var(--surface-card) 5%, transparent)',
          10: 'color-mix(in srgb, var(--surface-card) 10%, transparent)',
        },
      },

      // ✅ Define text colors
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
      },

      // ✅ Define border colors
      borderColor: {
        DEFAULT: 'var(--border-color)',
      },

      // Keep your accent colors
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
  plugins: [],
};