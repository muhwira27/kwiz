import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xs: ['12px', '18px'],
      sm: ['14px', '21px'],
      base: ['16px', '24px'],
      lg: ['18px', '27px'],
      xl: ['22px', '33px'],
      '2xl': ['30px', '45px'],
      '3xl': ['33px', '50px'],
    },
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {
      fontSize: {
        xxs: ['10px', '15px'],
        lgx: ['20px', '30px'],
        xxl: ['25px', '38px'],
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
