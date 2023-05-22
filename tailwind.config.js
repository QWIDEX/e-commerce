/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        'sm-md': "840px",
        'sm-sm': "576px"
      },
      colors: {
        'slightly-yellow': '#fbebb5',
        'yellow-50': "rgb(255, 249, 229)",
        'FAF4F4': "#FAF4F4"
      },
      width: {
        '1131px': "1131px"
      },
      maxWidth: {
        'laptop': "1440px",
        "681px": "681px",
        '445px': "445px",
        "242px": "242px",
        "287px": "287px",
        "74%": "74%"
      },
      height: {
        "1000px": "1000px",
        "672px": "672px",
        "1100px": '1100px'
      },
      minWidth: {
        "361px": "361px"
      }
    },
  },
  plugins: [],
}
