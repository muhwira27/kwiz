import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.3125rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.6875rem'],
      xl: ['1.375rem', '2.0625rem'],
      '2xl': ['1.875rem', '2.8125rem'],
      '3xl': ['2.0625rem', '3.125rem'],
    },
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {
      fontSize: {
        xxs: ['0.625rem', '0.9375rem'],
        lgx: ['1.25rem', '1.875rem'],
        xxl: ['1.5625rem', '2.375rem'],
      },
      colors: {
        'misty-blue': '#8692A6',
        'slate-grey': '#696F79',
        'stormy-sky': '#748194',
        'dusk-blue': '#7A7F89',
        'soft-white': '#FDFDFD',
        'charcoal': '#333333',
      },
      boxShadow: {
        custom1: '0px 15px 40px 5px #EDEDED',
        custom2: '0px 2px 64px -4px rgba(24, 39, 75, 0.14), 0px 2px 22px -6px rgba(24, 39, 75, 0.12)',
        custom3: '0px -53px 40px 5px rgba(0, 0, 0, 0.25) inset',
        custom4: '0px 2px 28.9px 8px rgba(24, 39, 75, 0.14), 0px 2px 19.2px 2px rgba(24, 39, 75, 0.12)',
      },
      borderRadius : {
        'large': '30px'
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
export default config
