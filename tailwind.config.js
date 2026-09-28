/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          darkest: '#050403',
          base: '#090705',
          card: '#0D0906',
          surface: '#140E0A',
          elevated: '#1A120D',
        },
        amber: {
          glow: 'rgba(255, 145, 55, 0.20)',
          subtle: 'rgba(255, 175, 90, 0.12)',
          highlight: '#FF9A3D',
          light: '#FFB15C',
          deep: '#E87524',
          dark: '#C85B12'
        },
        lux: {
          gold: '#E5A93C',
          orange: '#FF7A1A',
          border: 'rgba(255, 255, 255, 0.08)',
          borderLight: 'rgba(255, 255, 255, 0.14)',
          borderAmber: 'rgba(255, 154, 61, 0.25)',
          glass: 'rgba(255, 255, 255, 0.045)',
          glassHover: 'rgba(255, 255, 255, 0.08)',
          glassAmber: 'rgba(255, 154, 61, 0.08)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#F5F1EC',
          muted: '#B8B1AA',
          dim: '#77716B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(255, 154, 61, 0.2)',
        'glow-md': '0 0 30px rgba(255, 154, 61, 0.28)',
        'glow-lg': '0 0 50px rgba(255, 154, 61, 0.35)',
        'glow-gold': '0 0 30px rgba(229, 169, 60, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'phone-case': '0 25px 70px -15px rgba(0, 0, 0, 0.9), 0 0 45px rgba(255, 145, 55, 0.15)',
        'phone-inner': 'inset 0 0 4px 2px rgba(255, 255, 255, 0.08)',
        'titanium': '0 0 0 1.5px rgba(255, 255, 255, 0.12), 0 0 0 4px #1c1815, 0 20px 50px rgba(0,0,0,0.8)'
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '25px',
        '3xl': '35px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
