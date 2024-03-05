import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { withUt } from 'uploadthing/tw'

export default withUt({
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        'slide-up': 'slideUp 1s linear',
      },
    },
  },
  plugins: [],
}) satisfies Config
