const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors:{
      primary:"#77C720",
      'white': '#ffffff',
      'black': '#000000',
    }
  },
  plugins: [],
});