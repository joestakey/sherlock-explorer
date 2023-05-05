/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      transitionProperty: {
        'filter': 'filter'
      },
      transitionDuration: {
        DEFAULT: '1000ms'
      }
    },
    screens: {
      'phone': '375px',
      'largePhone': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
  },
  variants: {
    extend: {
      // ...
     transitionDelay: ['hover', 'focus'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
