import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { withUt } from 'uploadthing/tw'

export default withUt({
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {
        primary:
          '0 0.3259259164px 0.7333333492px 0 rgba(0,0,0,.12), 0 1.5407407284px 2.8666665554px 0 rgba(0,0,0,.07), 0 4px 9px 0 rgba(0,0,0,.05)',
      },
      colors: {
        'bg-main': '#fff',
        'text-main': '#000',
        'button-primary': '#000',
        'button-alt': 'color(display-p3 0 0.50588 0.94902)',
        'button-alt-hover': 'color(display-p3 0.01569 0.35294 0.76863)',
        'button-alt-active': 'color(display-p3 0.01569 0.35294 0.76863)',
        'button-alt-secondary-hover': 'color(display-p3 0.91765 0.94902 1)',
        'button-primary-text': '#fff',
        'button-primary-hover': '#333',
        'border-main': '#000',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        josefinSans: ['var(--font-josefin-sans)'],
      },
      gridTemplateColumns: {
        card: 'repeat(auto-fill,minmax(min(240px, 100%), 1fr));',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        heroEnter: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        'slide-up': 'slideUp 1s linear',
        'hero-enter': 'heroEnter .6s both',
      },
    },
  },
  plugins: [],
}) satisfies Config
