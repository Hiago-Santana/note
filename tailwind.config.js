/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'ph': '340px',
      // => @media (min-width: 340px) { ... }
  
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
  
      'md': '800px',
      // => @media (min-width: 800px) { ... }
  
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
  
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
  
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },

  plugins: [],
}
