import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx'
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        circular: ['Circular Std', 'Arial', 'san-serif']
      },
      animation: {
        'fade-in-150': 'fade-in .15s linear forwards',
        'fade-in': 'fade-in .25s linear forwards',
        'fade-out-150': 'fade-out .15s linear forwards',
        'fade-out': 'fade-out .25s linear forwards',
        'fade-in-down-150': 'fade-in-down .15s linear 1',
        'fade-in-down': 'fade-in-down .25s linear 1',
        'fade-out-down-150': 'fade-out-down .15s linear 1',
        'fade-out-down': 'fade-out-down .25s linear 1',
        'fade-in-up-150': 'fade-in-up .15s linear 1',
        'fade-in-up': 'fade-in-up .25s linear 1',
        'fade-out-up-150': 'fade-out-up .15s linear 1',
        'fade-out-up': 'fade-out-up .25s linear 1',
        'fade-in-left-150': 'fade-in-left .15s linear 1',
        'fade-in-left': 'fade-in-left .25s linear 1',
        'fade-out-left-150': 'fade-out-left .15s linear 1',
        'fade-out-left': 'fade-out-left .25s linear 1',
        'fade-in-right-150': 'fade-in-right .15s linear 1',
        'fade-in-right': 'fade-in-right .25s linear 1',
        'fade-out-right-150': 'fade-out-right .15s linear 1',
        'fade-out-right': 'fade-out-right .25s linear 1',
        'rotate-360': 'rotate-360 2s linear infinite',
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both;'
      },
      keyframes: {
        'rotate-360': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out-down': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' }
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-out-left': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' }
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'fade-out-right': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(20px)' }
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0);' }
        }
      }
    }
  },

  plugins: [forms]
};
