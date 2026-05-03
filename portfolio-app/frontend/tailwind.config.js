/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff6b00',
        'primary-dark': '#cc5500',
        'primary-light': '#ff8c33',
        secondary: '#0a0a0a',
        accent: '#ffffff',
        dark: {
          100: '#1a1a1a',
          200: '#141414',
          300: '#0f0f0f',
          400: '#0a0a0a',
        },
        glass: 'rgba(255, 107, 0, 0.08)'
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        heading: ['"Clash Display"', '"Outfit"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          from: { textShadow: '0 0 10px #ff6b00, 0 0 20px #ff6b00' },
          to: { textShadow: '0 0 20px #ff6b00, 0 0 40px #ff6b00, 0 0 80px #ff6b00' }
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(255,107,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        'orange': '0 0 20px rgba(255, 107, 0, 0.3)',
        'orange-lg': '0 0 40px rgba(255, 107, 0, 0.4)',
        'glass': '0 8px 32px rgba(255, 107, 0, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      }
    }
  },
  plugins: []
}
