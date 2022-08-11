import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'

export default defineConfig({
  attributify: true,
  preflight: {
    safelist: 'h1 h2 h3',
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open SansVariable', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        sm: '10px',
        base: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '32px',
      },
      screens: {
        print: { raw: 'print' },
      },
    },
  },
})
