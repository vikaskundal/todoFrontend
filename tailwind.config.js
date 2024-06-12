/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      width:{
        '3/10':'30%',
        '7/10':'70%'
      },
      colors:{
        'bg-blue-900':'#333399'
      }
    },
  },
  plugins: [],
}

