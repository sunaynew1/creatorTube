/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fadeInSlow: 'fadeInSlow 1.5s ease-out forwards',
        fadeIn: "fadeIn 0.4s ease-in-out"
      },
      colors: {
        darkBg: '#121212',
        cardBg: '#1e1e1e',
        neon: '#00e5ff',
        zinc: {
                950: "#09090b"
        }
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        fadeInSlow: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
          'gradient-x': {
            '0%, 100%': { 'background-position': '0% 50%' },
            '50%': { 'background-position': '100% 50%' },
          }
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
      },


    },
  },
  plugins: [],
}

