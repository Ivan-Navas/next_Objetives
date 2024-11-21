import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        back: '#2f2f2f',
        font: '#1f1f1f',
        titles: "#BADE00",
        circle:"rgba(186, 222, 0, .2)",
        placeholder: "rgba(255,255,255,.5)",
        start: "#BAACDD",
        middle: "#87E5D3",
        end: "rgba(255,255,255,0)",
        semi: "rgba(0,0,0,.5)"
      },
      fontSize: {
        "7": '7px',
        "10": '10px',
        "12": '12px',
        "16": '16px',
        "20": '20px',
        "26": '26px',
        "30": '30px',
        "40": '40px',
        "60": '60px',
      },
      fontFamily: {
        roboto: ["Roboto", 'sans-serif'],
      },
      borderRadius: {
        "16": '16px',
        "100%": '100%'
      },
      borderColor: {
        input: 'linear-gradient(to right, rgba(186,172,221,1) 0%, rgba(135,229,211,1) 50%, rgba(255,255,255,0) 100%) 1',
        circle: 'rgba(186, 222, 0, .2)'
      },
      padding:{
        "2": '2px',
        "51": '51px',
        "86": '86px',
      },
      width:{
        "20": '20px',
        "40": '40px',
        "50": '50px',
        "60": '60px',
        "70": '70px',
        "76": '76px',
        "80": '80px',
        "90": '90px',
        "100": '100px',
        "110": '110px',
        "125": '125px',
        "448": '448px',
        "500": '500px',
        "600": '600px',
        "700": '700px'
      },
      height:{
        "20": '20px',
        "30": '30px',
        "32": '32px',
        "40": '40px',
        "50": '50px',
        "60": '60px',
        "70": '70px',
        "80": '80px',
        "90": '90px',
        "100": '100px',
        "110": '110px',
        "166": '166px',
        "200": '200px', 
        "600": '600px',
      },
      strokeWidth:{
        "10": '10px'
      },
      margin: {
        "3": "3px",
        "10": "10px",
        "12": "12px",
        "16": '16px',
        "21": "21px",
        "43": '43px',
        "78": '78px',
      },
      gridTemplateColumns:{
        or: '48% 4% 48% ',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex:{
        "1": "1"
      },
    },
  },
  plugins: [],
};
export default config;
